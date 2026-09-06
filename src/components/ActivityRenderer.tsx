import { useState, useEffect } from 'react';
import type { Mission, BossRound, FeedbackItem, Choice } from '../types';
import { Button, Card, CodeBlock, Badge } from './ui';
import { runPython, outputsMatch } from '../utils/pythonSim';
import { Lightbulb, CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface ActivityRendererProps {
  activity: Mission | BossRound;
  mode: 'mission' | 'boss';
  onComplete: (xp: number, gems: number) => void;
  onNext?: () => void;
  onStateChange?: (correct: boolean) => void;
  onAttempt?: () => void;
  onHint?: () => void;
}

export function ActivityRenderer({ activity, mode, onComplete, onNext, onStateChange, onAttempt, onHint }: ActivityRendererProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sorted, setSorted] = useState<string[]>([]);
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [fills, setFills] = useState<Record<string, string>>({});
  const [code, setCode] = useState('');
  const [prediction, setPrediction] = useState('');
  const [reflection, setReflection] = useState('');
  const [categoryAssignments, setCategoryAssignments] = useState<Record<string, string>>({});
  const [traceAnswers, setTraceAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<FeedbackItem | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState<{ xp: number; gems: number } | null>(null);
  const [pairOptions, setPairOptions] = useState<string[]>([]);

  // Determine initial code/text state
  useEffect(() => {
    if ('codeInput' in activity && activity.codeInput) {
      setCode(activity.codeInput);
    } else if ('buggyCode' in activity && activity.buggyCode) {
      setCode(activity.buggyCode);
    } else if ('repairedCode' in activity && activity.repairedCode) {
      setCode(activity.repairedCode);
    } else if ('fillTemplate' in activity && activity.fillTemplate) {
      setCode(activity.fillTemplate);
    } else if ('predictCode' in activity && activity.predictCode) {
      setCode(activity.predictCode);
    } else {
      setCode('');
    }
    setSorted(activity.type === 'sequence-builder' && 'sequenceItems' in activity ? [...(activity.sequenceItems || [])].sort(() => Math.random() - 0.5) : []);
    setPlacedBlocks([]);
    setMatches({});
    setFills({});
    setCategoryAssignments({});
    setTraceAnswers({});
    setSelected([]);
    setPrediction('');
    setReflection('');
    setFeedback(null);
    setHintsUsed(0);
    setAttempts(0);
    setShowHint(false);
    setRunOutput(null);
    setRunError(null);
    setIsCorrect(false);
    setEarnedRewards(null);
    const pairs = 'pairs' in activity ? activity.pairs || [] : [];
    setPairOptions(pairs.length > 0 ? [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5) : []);
  }, [activity]);

  const getFeedbackFor = (key: string): FeedbackItem => {
    return activity.feedback[key] || activity.feedback.default;
  };

  const handleCheck = () => {
    setAttempts((a) => a + 1);
    onAttempt?.();
    let correct = false;
    let fbKey = 'default';

    switch (activity.type) {
      case 'multiple-choice':
      case 'concept':
      case 'mixed-challenge': {
        const correctIds = (activity as Mission).correctChoiceIds || [];
        correct = selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));
        fbKey = correct ? ((activity as Mission).feedback.success ? 'success' : (selected[0] || 'success')) : 'default';
        break;
      }
      case 'multi-select': {
        const correctIds = (activity as Mission).correctChoiceIds || [];
        correct = selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'true-false-fix': {
        const choices = (activity as Mission).choices || [];
        const correctIds = choices.filter((c) => c.correct).map((c) => c.id);
        correct = selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'predict-output': {
        const expected = (activity as Mission).expectedOutput || '';
        correct = outputsMatch(prediction, expected);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'run-compare': {
        const expected = (activity as Mission).expectedOutput || '';
        const sim = runPython(code);
        setRunOutput(sim.output);
        setRunError(sim.error);
        if (sim.error) {
          correct = false;
        } else {
          correct = outputsMatch(prediction, expected) && outputsMatch(sim.output, expected);
        }
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'value-trace': {
        const expected = (activity as Mission).expectedOutput || '';
        correct = outputsMatch(prediction, expected);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'sequence-builder': {
        const expectedSeq = (activity as Mission).correctSequence || [];
        correct = JSON.stringify(sorted) === JSON.stringify(expectedSeq);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'category-sort': {
        const items = (activity as Mission).categoryItems || [];
        correct = items.every((item) => categoryAssignments[item.id] === item.category);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'code-blocks': {
        const expectedOrder = (activity as Mission).correctBlockOrder || [];
        correct = JSON.stringify(placedBlocks) === JSON.stringify(expectedOrder);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'fill-gap': {
        const cf = (activity as Mission).correctFills || {};
        const af = (activity as Mission).acceptableFills || {};
        correct = Object.keys(cf).every((k) => {
          const val = fills[k]?.trim().toLowerCase();
          if (!val) return false;
          if (val === cf[k].toLowerCase()) return true;
          return af[k]?.some((a) => a.toLowerCase() === val);
        });
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'bug-hunter':
      case 'code-repair': {
        const expected = (activity as Mission).expectedOutput || '';
        const repaired = 'repairedCode' in activity ? (activity as Mission).repairedCode : '';
        const sim = runPython(code);
        setRunOutput(sim.output);
        setRunError(sim.error);
        if (sim.error) {
          correct = false;
        } else if (expected) {
          correct = outputsMatch(sim.output, expected);
        } else if (repaired) {
          // Compare normalized code to expected repair
          const normUser = code.replace(/\s+/g, ' ').trim();
          const normRepaired = repaired.replace(/\s+/g, ' ').trim();
          correct = normUser === normRepaired;
        } else {
          correct = true;
        }
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'match-pairs': {
        const pairs = (activity as Mission).pairs || [];
        correct = pairs.every((p) => matches[p.left] === p.right);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'input-simulator': {
        const expected = (activity as Mission).expectedOutput || '';
        correct = outputsMatch(prediction, expected);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'boundary-test': {
        const expected = (activity as Mission).expectedOutput || '';
        correct = outputsMatch(prediction, expected);
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'mini-project':
      case 'guided-practice': {
        const sim = runPython(code);
        setRunOutput(sim.output);
        setRunError(sim.error);
        const expected = (activity as Mission).expectedOutput || '';
        const printCount = (code.match(/print\s*\(/g) || []).length;
        const isMiniProject = activity.type === 'mini-project';
        const hasMinimumPrints = isMiniProject ? printCount >= 2 : printCount >= 1;
        const noPlaceholders = !sim.output.includes('...') && !code.includes('...');
        correct = sim.success && (expected ? outputsMatch(sim.output, expected) : (sim.output.trim().length > 0 && hasMinimumPrints && noPlaceholders));
        fbKey = correct ? 'success' : 'default';
        break;
      }
      case 'reflection': {
        correct = reflection.trim().length >= 10;
        fbKey = correct ? 'success' : 'default';
        break;
      }
      default:
        correct = false;
    }

    const fb = getFeedbackFor(fbKey);
    setFeedback(fb);
    setIsCorrect(correct);

    if (correct) {
      const firstTry = attempts === 0;
      const afterHint = hintsUsed > 0;
      let xp = firstTry ? 20 : afterHint ? 5 : 10;
      let gems = firstTry ? 5 : afterHint ? 1 : 2;
      if (mode === 'boss') {
        xp = 20;
        gems = 5;
      }
      onComplete(xp, gems);
      onStateChange?.(true);
      setEarnedRewards({ xp, gems });
    } else {
      onStateChange?.(false);
    }
  };

  const handleHint = () => {
    if (hintsUsed < activity.hints.length) {
      setHintsUsed((h) => h + 1);
      setShowHint(true);
      onHint?.();
    }
  };

  const renderChoices = (multi = false) => {
    const choices = (activity as Mission).choices || [];
    return (
      <div className="space-y-3">
        {choices.map((choice: Choice) => {
          const isSelected = selected.includes(choice.id);
          return (
            <button
              key={choice.id}
              onClick={() => {
                if (multi) {
                  setSelected((prev) => (prev.includes(choice.id) ? prev.filter((id) => id !== choice.id) : [...prev, choice.id]));
                } else {
                  setSelected([choice.id]);
                }
              }}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-right transition-all ${
                isSelected
                  ? 'border-[#0060F0] bg-[#0060F0]/20'
                  : 'border-white/10 bg-[#0A1729]/50 hover:border-white/30'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                  multi ? 'border-2' : 'rounded-full border-2'
                } ${isSelected ? 'border-[#0060F0] bg-[#0060F0] text-white' : 'border-white/30'}`}
              >
                {isSelected && (multi ? <CheckCircle className="h-3.5 w-3.5" /> : <div className="h-2 w-2 rounded-full bg-white" />)}
              </div>
              <span className="text-white/90">{choice.text}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderSequenceBuilder = () => {
    return (
      <div className="space-y-3">
        {sorted.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-3 rounded-xl border border-[#0060F0]/30 bg-[#0A1729]/70 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0060F0]/20 text-sm font-bold text-[#0060F0]">
              {index + 1}
            </span>
            <span className="flex-1 text-white/90">{item}</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  if (index === 0) return;
                  const newSorted = [...sorted];
                  [newSorted[index - 1], newSorted[index]] = [newSorted[index], newSorted[index - 1]];
                  setSorted(newSorted);
                }}
                className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
                disabled={index === 0}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (index === sorted.length - 1) return;
                  const newSorted = [...sorted];
                  [newSorted[index], newSorted[index + 1]] = [newSorted[index + 1], newSorted[index]];
                  setSorted(newSorted);
                }}
                className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
                disabled={index === sorted.length - 1}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCategorySort = () => {
    const items = (activity as Mission).categoryItems || [];
    const categories = (activity as Mission).categories || [];
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0A1729]/50 p-4 sm:flex-row sm:items-center">
            <span className="flex-1 text-white/90 font-mono text-lg">{item.text}</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryAssignments((prev) => ({ ...prev, [item.id]: cat }))}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    categoryAssignments[item.id] === cat
                      ? 'border-[#0060F0] bg-[#0060F0]/20 text-white'
                      : 'border-white/20 text-white/70 hover:border-white/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCodeBlocks = () => {
    const blocks = (activity as Mission).codeBlocks || [];
    return (
      <div className="space-y-4">
        <div className="flex min-h-[80px] flex-wrap gap-2 rounded-xl border border-dashed border-[#0060F0]/40 bg-[#0A1729]/50 p-4">
          {placedBlocks.length === 0 && <span className="text-white/40">اضغط على القطع بالترتيب</span>}
          {placedBlocks.map((blockId, idx) => {
            const block = blocks.find((b) => b.id === blockId);
            return (
              <span key={`${blockId}-${idx}`} className="rounded-lg bg-[#0060F0]/20 px-3 py-1.5 font-mono text-sm text-white">
                {block?.text}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => setPlacedBlocks((prev) => [...prev, block.id])}
              className="rounded-lg border border-white/20 bg-[#16305A] px-3 py-2 font-mono text-sm text-white hover:border-[#0060F0]"
            >
              {block.text}
            </button>
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPlacedBlocks([])}>
          <RotateCcw className="h-4 w-4" /> إعادة
        </Button>
      </div>
    );
  };

  const renderFillGap = () => {
    const template = (activity as Mission).fillTemplate || '';
    const parts = template.split(/(___+)/g);
    let fillIndex = 0;
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-[#0060F0]/20 bg-[#0A1729] p-4 font-mono text-lg leading-loose text-white code-box">
          {parts.map((part, i) => {
            if (part.startsWith('___')) {
              fillIndex++;
              const key = `f${fillIndex}`;
              return (
                <input
                  key={i}
                  type="text"
                  value={fills[key] || ''}
                  onChange={(e) => setFills((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="mx-1 inline-block min-w-[160px] rounded border-b-2 border-[#0060F0] bg-[#16305A] px-3 py-1 text-center text-white focus:outline-none"
                />
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>
      </div>
    );
  };

  const renderMatchPairs = () => {
    const pairs = (activity as Mission).pairs || [];
    const leftItems = pairs.map((p) => p.left);
    const rightItems = pairOptions.length > 0 ? pairOptions : pairs.map((p) => p.right);
    return (
      <div className="space-y-4">
        {leftItems.map((left) => (
          <div key={left} className="rounded-xl border border-white/10 bg-[#0A1729]/50 p-4">
            <div className="mb-3 text-center text-lg font-mono font-bold text-[#F0A800]">{left}</div>
            <div className="grid grid-cols-2 gap-2">
              {rightItems.map((right) => (
                <button
                  key={right}
                  onClick={() => setMatches((prev) => ({ ...prev, [left]: right }))}
                  className={`rounded-lg border px-3 py-3 text-center text-sm font-bold transition-all ${
                    matches[left] === right
                      ? 'border-[#0060F0] bg-[#0060F0] text-white'
                      : 'border-white/20 bg-[#16305A] text-white/80 hover:border-[#0060F0]/50'
                  }`}
                >
                  {right}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCodeArea = (readOnly = false) => {
    return (
      <div className="space-y-3">
        <textarea
          dir="ltr"
          value={code}
          onChange={(e) => !readOnly && setCode(e.target.value)}
          readOnly={readOnly}
          rows={8}
          className={`code-box w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] p-4 font-mono text-sm text-white placeholder-white/30 focus:border-[#0060F0] focus:outline-none ${readOnly ? 'opacity-80 cursor-not-allowed' : ''}`}
          placeholder="اكتب كود Python هنا..."
        />
        {runOutput !== null && (
          <div className={`rounded-xl border p-4 ${runError ? 'border-[#F04800]/30 bg-[#F04800]/10' : 'border-[#27C93F]/30 bg-[#0A1729]'}`}>
            <div className={`mb-2 text-xs font-bold ${runError ? 'text-[#F04800]' : 'text-[#27C93F]'}`}>
              {runError ? 'خطأ في التشغيل (محاكاة)' : 'Output (محاكاة)'}
            </div>
            <pre className="code-box whitespace-pre-wrap font-mono text-sm text-white/90">{runError || runOutput || '(لا يوجد output)'}</pre>
          </div>
        )}
      </div>
    );
  };

  const renderActivity = () => {
    switch (activity.type) {
      case 'concept':
      case 'multiple-choice':
      case 'mixed-challenge':
        return renderChoices(false);
      case 'multi-select':
        return renderChoices(true);
      case 'true-false-fix':
        return renderChoices(true);
      case 'predict-output':
      case 'value-trace':
      case 'boundary-test':
      case 'input-simulator':
        return (
          <div className="space-y-4">
            {'predictCode' in activity && activity.predictCode && <CodeBlock code={activity.predictCode} />}
            {'traceVariables' in activity && activity.traceVariables && (
              <div className="space-y-3">
                {activity.traceVariables.map((tv) => (
                  <Card key={tv.name} className="!p-4">
                    <div className="mb-2 text-sm text-white/60">المتغير <span className="font-mono text-[#F0A800]">{tv.name}</span></div>
                    <div className="flex flex-wrap gap-2">
                      {tv.steps.map((step, idx) => (
                        <span key={idx} className="rounded-lg bg-[#0A1729] px-3 py-1 font-mono text-sm text-white/80">{step}</span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <label className="text-xs text-white/50">القيمة النهائية</label>
                      <input
                        type="text"
                        value={traceAnswers[tv.name] || ''}
                        onChange={(e) => setTraceAnswers((prev) => ({ ...prev, [tv.name]: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1729] px-3 py-2 font-mono text-white"
                        placeholder="القيمة النهائية"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#F0A800]">إجابتك (Output المتوقع)</label>
              <textarea
                dir="ltr"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                rows={4}
                className="code-box w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] p-4 font-mono text-sm text-white placeholder-white/30 focus:border-[#0060F0] focus:outline-none"
                placeholder="اكتب الـOutput المتوقع هنا..."
              />
            </div>
          </div>
        );
      case 'run-compare':
        return (
          <div className="space-y-4">
            {'predictCode' in activity && activity.predictCode && <CodeBlock code={activity.predictCode} />}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#F0A800]">توقعك قبل التشغيل</label>
              <textarea
                dir="ltr"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                rows={3}
                className="code-box w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] p-4 font-mono text-sm text-white placeholder-white/30 focus:border-[#0060F0] focus:outline-none"
                placeholder="التوقع..."
              />
            </div>
            {renderCodeArea(true)}
          </div>
        );
      case 'sequence-builder':
        return renderSequenceBuilder();
      case 'category-sort':
        return renderCategorySort();
      case 'code-blocks':
        return renderCodeBlocks();
      case 'fill-gap':
        return renderFillGap();
      case 'bug-hunter':
      case 'code-repair':
        return (
          <div className="space-y-4">
            {'buggyCode' in activity && activity.buggyCode && (
              <div>
                <div className="mb-2 text-sm text-white/50">الكود الأصلي</div>
                <CodeBlock code={activity.buggyCode} />
              </div>
            )}
            {renderCodeArea()}
          </div>
        );
      case 'match-pairs':
        return renderMatchPairs();
      case 'mini-project':
      case 'guided-practice':
        return renderCodeArea();
      case 'reflection':
        return (
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] p-4 text-right text-white placeholder-white/30 focus:border-[#0060F0] focus:outline-none"
            placeholder="اكتب إجابتك هنا..."
          />
        );
      default:
        return <div className="text-white/50">نوع النشاط غير مدعوم في هذه العرضة.</div>;
    }
  };

  const isCheckDisabled = () => {
    switch (activity.type) {
      case 'multiple-choice':
      case 'multi-select':
      case 'true-false-fix':
      case 'concept':
      case 'mixed-challenge':
        return selected.length === 0;
      case 'predict-output':
      case 'value-trace':
      case 'boundary-test':
      case 'input-simulator':
        return prediction.trim().length === 0;
      case 'sequence-builder':
        return sorted.length === 0;
      case 'category-sort':
        return Object.keys(categoryAssignments).length < ((activity as Mission).categoryItems?.length || 0);
      case 'code-blocks':
        return placedBlocks.length === 0;
      case 'fill-gap':
        return Object.keys(fills).length < Object.keys((activity as Mission).correctFills || {}).length;
      case 'match-pairs':
        return Object.keys(matches).length < ((activity as Mission).pairs?.length || 0);
      case 'reflection':
        return reflection.trim().length < 5;
      case 'bug-hunter':
      case 'code-repair':
      case 'mini-project':
      case 'guided-practice':
      case 'run-compare':
        return code.trim().length === 0;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {'primmTag' in activity && activity.primmTag && (
        <Badge color="orange" className="mb-2">{activity.primmTag}</Badge>
      )}
      {activity.explanation && <p className="text-white/80 leading-relaxed">{activity.explanation}</p>}
      {'example' in activity && activity.example && (
        <Card className="!p-4">
          {activity.example.code && (
            <>
              <div className="mb-2 text-xs text-white/50">مثال</div>
              <CodeBlock code={activity.example.code} />
            </>
          )}
          {activity.example.output && (
            <>
              <div className="mt-3 mb-2 text-xs text-[#27C93F]">Output</div>
              <pre className="code-box rounded-lg bg-[#0A1729] p-3 font-mono text-sm text-white/90">{activity.example.output}</pre>
            </>
          )}
          {activity.example.note && <p className="mt-2 text-sm text-white/60">{activity.example.note}</p>}
        </Card>
      )}
      {activity.question && <p className="text-lg font-semibold text-white">{activity.question}</p>}

      {renderActivity()}

      {showHint && hintsUsed > 0 && (
          <div className="animate-slide-up rounded-xl border border-[#F0A800]/30 bg-[#F0A800]/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <img src="robot.png" alt="Robot" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex items-center gap-2 text-[#F0A800]">
              <Lightbulb className="h-5 w-5" />
              <span className="font-bold">تلميح {hintsUsed}</span>
            </div>
          </div>
          <p className="text-white/80">{activity.hints[hintsUsed - 1]?.text}</p>
        </div>
      )}

      {feedback && (
        <div
          className={`animate-slide-up rounded-xl border p-4 ${
            feedback.correct
              ? 'border-[#27C93F]/30 bg-[#27C93F]/10'
              : 'border-[#F04800]/30 bg-[#F04800]/10'
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            {feedback.correct ? (
              <img src="robot.png" alt="Robot" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <XCircle className="h-8 w-8 text-[#F04800]" />
            )}
            <span className={`font-bold ${feedback.correct ? 'text-[#27C93F]' : 'text-[#F04800]'}`}>
              {feedback.correct ? 'إجابة صحيحة' : 'لنراجع معًا'}
            </span>
          </div>
          <div className="space-y-2 text-white/80">
            <p><strong>ماذا حدث؟</strong> {feedback.what}</p>
            <p><strong>لماذا؟</strong> {feedback.why}</p>
            <p><strong>الخطوة التالية:</strong> {feedback.nextStep}</p>
            {earnedRewards && (
              <p className="mt-2 font-bold text-[#F0A800]">
                +{earnedRewards.xp} XP | +{earnedRewards.gems} جواهر
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCheck} disabled={isCheckDisabled() || isCorrect}>
          تحقق
        </Button>
        <Button variant="secondary" onClick={handleHint} disabled={hintsUsed >= activity.hints.length}>
          <Lightbulb className="h-4 w-4" />
          تلميح ({activity.hints.length - hintsUsed})
        </Button>
        {isCorrect && onNext && (
          <Button variant="gold" onClick={onNext}>
            التالي
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
