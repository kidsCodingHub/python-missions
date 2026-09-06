export interface SimResult {
  output: string;
  error: string | null;
  success: boolean;
}

export interface RunOptions {
  inputs?: string[];
}

type Value = string | number | boolean;

class Interpreter {
  private vars: Record<string, Value> = {};
  private output: string[] = [];
  private inputs: string[] = [];
  private inputIndex = 0;

  constructor(inputs: string[] = []) {
    this.inputs = [...inputs];
  }

  run(code: string): SimResult {
    const lines = code.split('\n');
    let i = 0;
    try {
      while (i < lines.length) {
        i = this.executeLine(lines, i);
      }
      return { output: this.output.join('\n'), error: null, success: true };
    } catch (e) {
      return { output: this.output.join('\n'), error: String(e), success: false };
    }
  }

  private executeLine(lines: string[], startIdx: number): number {
    let i = startIdx;
    while (i < lines.length && !lines[i].trim()) i++;
    if (i >= lines.length) return i;

    const raw = lines[i];
    const commentIdx = raw.indexOf('#');
    const line = commentIdx >= 0 ? raw.slice(0, commentIdx) : raw;
    if (!line.trim()) return i + 1;

    const indent = raw.length - raw.trimStart().length;
    const trimmed = line.trim();

    // if statement
    if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
      const condStr = trimmed.slice(3, -1);
      const cond = this.evalExpression(condStr);
      i++;
      const ifBlock: string[] = [];
      const elseBlock: string[] = [];
      let inElse = false;

      while (i < lines.length) {
        const nextRaw = lines[i];
        const nextTrim = nextRaw.trim();
        const nextIndent = nextRaw.length - nextRaw.trimStart().length;
        if (nextTrim === '') {
          i++;
          continue;
        }
        if (nextIndent <= indent) {
          if (nextTrim.startsWith('else:') && nextIndent === indent) {
            inElse = true;
            i++;
            continue;
          }
          break;
        }
        if (inElse) elseBlock.push(nextRaw);
        else ifBlock.push(nextRaw);
        i++;
      }

      const block = cond ? ifBlock : elseBlock;
      const sub = new Interpreter(this.inputs.slice(this.inputIndex));
      sub.vars = { ...this.vars };
      const res = sub.run(block.join('\n'));
      this.inputIndex += sub.inputIndex;
      if (res.error) throw new Error(res.error);
      this.output.push(...res.output.split('\n').filter((l) => l !== ''));
      this.vars = { ...this.vars, ...sub.vars };
      return i;
    }

    // else: alone is invalid
    if (trimmed === 'else:') {
      throw new Error('SyntaxError: invalid syntax');
    }

    // Assignment
    const assignMatch = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const name = assignMatch[1];
      const expr = assignMatch[2];
      this.vars[name] = this.evalExpression(expr);
      return i + 1;
    }

    // print(...)
    if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
      const inner = trimmed.slice(6, -1);
      this.execPrint(inner);
      return i + 1;
    }

    // input() as standalone (no effect)
    if (trimmed.startsWith('input(') && trimmed.endsWith(')')) {
      this.readInput();
      return i + 1;
    }

    throw new Error(`SyntaxError: invalid syntax: ${trimmed}`);
  }

  private readInput(): string {
    if (this.inputIndex < this.inputs.length) {
      return this.inputs[this.inputIndex++];
    }
    return '0';
  }

  private execPrint(inner: string) {
    let sep = ' ';
    let end = '\n';
    let exprPart = inner;

    // parse sep and end keywords at end
    const sepEndMatch = inner.match(/^(.*?),?\s*(sep\s*=\s*["']([^"']*)["'])?\s*(,\s*end\s*=\s*["']([^"']*)["'])?\s*$/);
    if (sepEndMatch) {
      exprPart = sepEndMatch[1] || '';
      if (sepEndMatch[3] !== undefined) sep = sepEndMatch[3];
      if (sepEndMatch[5] !== undefined) end = sepEndMatch[5];
    }

    const parts = this.splitArgs(exprPart);
    const values = parts.map((p) => this.evalExpression(p));
    const text = values.map((v) => this.formatValue(v)).join(sep) + end;

    if (end === '\\n') {
      this.output.push(values.map((v) => this.formatValue(v)).join(sep));
    } else if (end === '') {
      if (this.output.length > 0) {
        this.output[this.output.length - 1] += values.map((v) => this.formatValue(v)).join(sep);
      } else {
        this.output.push(values.map((v) => this.formatValue(v)).join(sep));
      }
    } else {
      this.output.push(...text.split('\n'));
    }
  }

  private splitArgs(expr: string): string[] {
    const parts: string[] = [];
    let current = '';
    let depth = 0;
    let inString: string | null = null;
    let escape = false;

    for (const ch of expr) {
      if (escape) {
        current += '\\' + ch;
        escape = false;
        continue;
      }
      if (ch === '\\' && inString) {
        escape = true;
        continue;
      }
      if ((ch === '"' || ch === "'") && !inString) {
        inString = ch;
        current += ch;
        continue;
      }
      if (ch === inString) {
        inString = null;
        current += ch;
        continue;
      }
      if (inString) {
        current += ch;
        continue;
      }
      if (ch === '(' || ch === '[' || ch === '{') {
        depth++;
        current += ch;
        continue;
      }
      if (ch === ')' || ch === ']' || ch === '}') {
        depth--;
        current += ch;
        continue;
      }
      if (ch === ',' && depth === 0) {
        if (current.trim()) parts.push(current.trim());
        current = '';
        continue;
      }
      current += ch;
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  private formatValue(v: Value): string {
    if (typeof v === 'boolean') return String(v);
    if (typeof v === 'number') return String(v);
    return v;
  }

  private evalExpression(expr: string): Value {
    expr = expr.trim();

    // f-string
    if (expr.startsWith('f"') || expr.startsWith("f'")) {
      return this.evalFString(expr);
    }

    // string literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return this.unescapeString(expr.slice(1, -1));
    }

    // bool
    if (expr === 'True') return true;
    if (expr === 'False') return false;

    // number
    if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);
    if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);

    // function call
    const funcCallMatch = expr.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)$/);
    if (funcCallMatch) {
      const func = funcCallMatch[1];
      const argsStr = funcCallMatch[2].trim();
      const args = argsStr ? this.splitArgs(argsStr).map((a) => this.evalExpression(a)) : [];
      return this.callFunction(func, args);
    }

    // variable
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(expr)) {
      if (!(expr in this.vars)) throw new Error(`NameError: name '${expr}' is not defined`);
      return this.vars[expr];
    }

    // Parenthesized
    if (expr.startsWith('(') && expr.endsWith(')')) {
      return this.evalExpression(expr.slice(1, -1));
    }

    // Binary expression
    return this.evalBinary(expr);
  }

  private evalFString(expr: string): string {
    const content = expr.slice(2, -1);
    let result = '';
    let current = '';
    let braceDepth = 0;

    for (let i = 0; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{' && content[i + 1] !== '{') {
        if (braceDepth === 0) {
          result += this.unescapeString(current);
          current = '';
        }
        braceDepth++;
        continue;
      }
      if (ch === '}' && braceDepth > 0) {
        braceDepth--;
        if (braceDepth === 0) {
          const val = this.evalExpression(current);
          result += this.formatValue(val);
          current = '';
        }
        continue;
      }
      current += ch;
    }
    result += this.unescapeString(current);
    return result;
  }

  private unescapeString(s: string): string {
    return s
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');
  }

  private callFunction(name: string, args: Value[]): Value {
    if (name === 'int') {
      if (args.length !== 1) throw new Error('TypeError: int() takes one argument');
      const v = args[0];
      if (typeof v === 'string') {
        const n = parseInt(v, 10);
        if (isNaN(n)) throw new Error(`ValueError: invalid literal for int() with base 10: '${v}'`);
        return n;
      }
      if (typeof v === 'number') return Math.floor(v);
      throw new Error('TypeError: int() argument must be a string or number');
    }
    if (name === 'float') {
      if (args.length !== 1) throw new Error('TypeError: float() takes one argument');
      const v = args[0];
      if (typeof v === 'string') {
        const n = parseFloat(v);
        if (isNaN(n)) throw new Error(`ValueError: could not convert string to float: '${v}'`);
        return n;
      }
      if (typeof v === 'number') return v;
      throw new Error('TypeError: float() argument must be a string or number');
    }
    if (name === 'str') {
      if (args.length !== 1) throw new Error('TypeError: str() takes one argument');
      return this.formatValue(args[0]);
    }
    if (name === 'type') {
      if (args.length !== 1) throw new Error('TypeError: type() takes one argument');
      const v = args[0];
      if (typeof v === 'boolean') return "<class 'bool'>";
      if (typeof v === 'number') return Number.isInteger(v) ? "<class 'int'>" : "<class 'float'>";
      if (typeof v === 'string') return "<class 'str'>";
      return "<class 'unknown'>";
    }
    if (name === 'input') {
      return this.readInput();
    }
    throw new Error(`NameError: name '${name}' is not defined`);
  }

  private evalBinary(expr: string): Value {
    // Tokenize expression respecting strings/parens
    const tokens = this.tokenizeExpr(expr);
    const parsed = this.parseExpression(tokens, 0);
    if (parsed.error) throw new Error(parsed.error);
    if (parsed.nextIndex !== tokens.length) throw new Error('SyntaxError: invalid syntax');
    return parsed.value;
  }

  private tokenizeExpr(expr: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inString: string | null = null;
    let escape = false;

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      const nextCh = expr[i + 1];

      if (escape) {
        current += '\\' + ch;
        escape = false;
        continue;
      }
      if (ch === '\\' && inString) {
        escape = true;
        continue;
      }
      if ((ch === '"' || ch === "'") && !inString) {
        if (current.trim()) tokens.push(current.trim());
        current = ch;
        inString = ch;
        continue;
      }
      if (ch === inString) {
        current += ch;
        inString = null;
        tokens.push(current);
        current = '';
        continue;
      }
      if (inString) {
        current += ch;
        continue;
      }

      if ((ch === '=' && nextCh === '=') || (ch === '!' && nextCh === '=') ||
          (ch === '>' && nextCh === '=') || (ch === '<' && nextCh === '=') ||
          (ch === '/' && nextCh === '/') || (ch === '*' && nextCh === '*')) {
        if (current.trim()) tokens.push(current.trim());
        tokens.push(ch + nextCh);
        current = '';
        i++;
        continue;
      }

      if ('()=+-*/%<>!'.includes(ch)) {
        if (current.trim()) tokens.push(current.trim());
        tokens.push(ch);
        current = '';
        continue;
      }

      if (ch === ' ' || ch === '\t') {
        if (current.trim()) tokens.push(current.trim());
        current = '';
        continue;
      }

      current += ch;
    }
    if (current.trim()) tokens.push(current.trim());
    return tokens;
  }

  private parseExpression(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    return this.parseOr(tokens, start);
  }

  private parseOr(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parseAnd(tokens, start);
    if (res.error) return res;
    while (res.nextIndex < tokens.length && tokens[res.nextIndex] === 'or') {
      const right = this.parseAnd(tokens, res.nextIndex + 1);
      if (right.error) return right;
      res = { value: Boolean(res.value) || Boolean(right.value), nextIndex: right.nextIndex };
    }
    return res;
  }

  private parseAnd(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parseComparison(tokens, start);
    if (res.error) return res;
    while (res.nextIndex < tokens.length && tokens[res.nextIndex] === 'and') {
      const right = this.parseComparison(tokens, res.nextIndex + 1);
      if (right.error) return right;
      res = { value: Boolean(res.value) && Boolean(right.value), nextIndex: right.nextIndex };
    }
    return res;
  }

  private parseComparison(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parseAddSub(tokens, start);
    if (res.error) return res;
    const ops = ['==', '!=', '>=', '<=', '>', '<'];
    while (res.nextIndex < tokens.length && ops.includes(tokens[res.nextIndex])) {
      const op = tokens[res.nextIndex];
      const right = this.parseAddSub(tokens, res.nextIndex + 1);
      if (right.error) return right;
      const a = res.value;
      const b = right.value;
      if (op === '==') res = { value: a === b, nextIndex: right.nextIndex };
      else if (op === '!=') res = { value: a !== b, nextIndex: right.nextIndex };
      else if (op === '>') res = { value: (a as number) > (b as number), nextIndex: right.nextIndex };
      else if (op === '<') res = { value: (a as number) < (b as number), nextIndex: right.nextIndex };
      else if (op === '>=') res = { value: (a as number) >= (b as number), nextIndex: right.nextIndex };
      else if (op === '<=') res = { value: (a as number) <= (b as number), nextIndex: right.nextIndex };
    }
    return res;
  }

  private parseAddSub(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parseMulDivMod(tokens, start);
    if (res.error) return res;
    while (res.nextIndex < tokens.length && (tokens[res.nextIndex] === '+' || tokens[res.nextIndex] === '-')) {
      const op = tokens[res.nextIndex];
      const right = this.parseMulDivMod(tokens, res.nextIndex + 1);
      if (right.error) return right;
      const a = res.value;
      const b = right.value;
      if (op === '+') {
        if (typeof a === 'string' && typeof b === 'string') {
          res = { value: a + b, nextIndex: right.nextIndex };
        } else if (typeof a === 'number' && typeof b === 'number') {
          res = { value: a + b, nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for +' };
        }
      } else {
        if (typeof a === 'number' && typeof b === 'number') {
          res = { value: a - b, nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for -' };
        }
      }
    }
    return res;
  }

  private parseMulDivMod(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parsePower(tokens, start);
    if (res.error) return res;
    while (res.nextIndex < tokens.length && (tokens[res.nextIndex] === '*' || tokens[res.nextIndex] === '/' || tokens[res.nextIndex] === '//' || tokens[res.nextIndex] === '%')) {
      const op = tokens[res.nextIndex];
      const right = this.parsePower(tokens, res.nextIndex + 1);
      if (right.error) return right;
      const a = res.value;
      const b = right.value;
      if (op === '*') {
        if (typeof a === 'string' && typeof b === 'number') {
          res = { value: a.repeat(b), nextIndex: right.nextIndex };
        } else if (typeof a === 'number' && typeof b === 'number') {
          res = { value: a * b, nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for *' };
        }
      } else if (op === '/') {
        if (typeof a === 'number' && typeof b === 'number') {
          res = { value: a / b, nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for /' };
        }
      } else if (op === '//') {
        if (typeof a === 'number' && typeof b === 'number') {
          res = { value: Math.floor(a / b), nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for //' };
        }
      } else if (op === '%') {
        if (typeof a === 'number' && typeof b === 'number') {
          res = { value: a % b, nextIndex: right.nextIndex };
        } else {
          return { value: 0, nextIndex: right.nextIndex, error: 'TypeError: unsupported operand type(s) for %' };
        }
      }
    }
    return res;
  }

  private parsePower(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    let res = this.parseUnary(tokens, start);
    if (res.error) return res;
    if (res.nextIndex < tokens.length && tokens[res.nextIndex] === '**') {
      const right = this.parsePower(tokens, res.nextIndex + 1);
      if (right.error) return right;
      res = { value: Math.pow(res.value as number, right.value as number), nextIndex: right.nextIndex };
    }
    return res;
  }

  private parseUnary(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    if (start < tokens.length && tokens[start] === 'not') {
      const res = this.parseUnary(tokens, start + 1);
      if (res.error) return res;
      return { value: !Boolean(res.value), nextIndex: res.nextIndex };
    }
    return this.parsePrimary(tokens, start);
  }

  private parsePrimary(tokens: string[], start: number): { value: Value; nextIndex: number; error?: string } {
    if (start >= tokens.length) return { value: '', nextIndex: start, error: 'Unexpected end of expression' };
    const tok = tokens[start];

    if (tok.startsWith('"') || tok.startsWith("'")) {
      return { value: this.unescapeString(tok.slice(1, -1)), nextIndex: start + 1 };
    }
    if (tok === 'True') return { value: true, nextIndex: start + 1 };
    if (tok === 'False') return { value: false, nextIndex: start + 1 };
    if (/^-?\d+\.\d+$/.test(tok)) return { value: parseFloat(tok), nextIndex: start + 1 };
    if (/^-?\d+$/.test(tok)) return { value: parseInt(tok, 10), nextIndex: start + 1 };

    if (tok === '(') {
      let depth = 1;
      let idx = start + 1;
      let inner = '';
      while (idx < tokens.length && depth > 0) {
        if (tokens[idx] === '(') depth++;
        if (tokens[idx] === ')') depth--;
        if (depth > 0) inner += (inner ? ' ' : '') + tokens[idx];
        idx++;
      }
      if (depth !== 0) return { value: 0, nextIndex: idx, error: 'SyntaxError: expected )' };
      const val = this.evalExpression(inner);
      return { value: val, nextIndex: idx };
    }

    // function call
    if (start + 1 < tokens.length && tokens[start + 1] === '(') {
      const funcName = tok;
      let idx = start + 2;
      const args: Value[] = [];
      let currentArg = '';
      let depth = 0;
      while (idx < tokens.length && !(tokens[idx] === ')' && depth === 0)) {
        if (tokens[idx] === '(') depth++;
        if (tokens[idx] === ')') depth--;
        if (tokens[idx] === ',' && depth === 0) {
          if (currentArg.trim()) args.push(this.evalExpression(currentArg.trim()));
          currentArg = '';
        } else {
          currentArg += (currentArg ? ' ' : '') + tokens[idx];
        }
        idx++;
      }
      if (currentArg.trim()) args.push(this.evalExpression(currentArg.trim()));
      if (idx >= tokens.length || tokens[idx] !== ')') {
        return { value: 0, nextIndex: idx, error: 'SyntaxError: expected )' };
      }
      return { value: this.callFunction(funcName, args), nextIndex: idx + 1 };
    }

    // variable
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(tok)) {
      if (!(tok in this.vars)) return { value: 0, nextIndex: start + 1, error: `NameError: name '${tok}' is not defined` };
      return { value: this.vars[tok], nextIndex: start + 1 };
    }

    return { value: 0, nextIndex: start + 1, error: `SyntaxError: invalid syntax: ${tok}` };
  }
}

export function runPython(code: string, options: RunOptions = {}): SimResult {
  const interpreter = new Interpreter(options.inputs);
  return interpreter.run(code);
}

export function normalizeOutput(output: string): string {
  return output
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function outputsMatch(actual: string, expected: string): boolean {
  return normalizeOutput(actual) === normalizeOutput(expected);
}
