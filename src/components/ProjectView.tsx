import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { Button, Card, Badge } from './ui';
import { runPython, normalizeOutput } from '../utils/pythonSim';
import { Play, CheckCircle, Save, Copy, ArrowLeft, Lightbulb, CheckSquare } from 'lucide-react';

export function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = id ? getSessionById(id) : undefined;
  const { getSessionProgress, completeProject } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [code, setCode] = useState(session?.project.starterCode || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean }[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (session && progress?.projectCode) {
      setCode(progress.projectCode);
    }
  }, [session, progress?.projectCode]);

  if (!session || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white">
        <h1 className="text-2xl font-bold">الحصة غير موجودة</h1>
      </div>
    );
  }

  const project = session.project;

  const checkTestCase = (tc: typeof project.testCases[0]) => {
    const res = runPython(code, { inputs: tc.inputs });
    if (!res.success) return false;
    if (!tc.expectedOutput) return true;
    // Substring match: expected output must appear in actual output
    return normalizeOutput(res.output).includes(normalizeOutput(tc.expectedOutput));
  };

  const runAndGetResults = () => {
    const results = project.testCases.map((tc) => {
      return { id: tc.id, passed: checkTestCase(tc) };
    });
    setTestResults(results);

    // Also run with first test case inputs to get general output
    const general = runPython(code, { inputs: project.testCases[0]?.inputs });
    setOutput(general.output);
    setError(general.error);
    return { results, generalError: general.error };
  };

  const handleRun = () => {
    runAndGetResults();
  };

  const handleCheck = () => {
    const { generalError } = runAndGetResults();
    const allPassed = project.testCases.every(checkTestCase);
    if (allPassed && !generalError) {
      completeProject(session.id, code);
    }
  };

  const handleSave = () => {
    completeProject(session.id, code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allPassed = testResults.length > 0 && testResults.every((r) => r.passed) && !error;

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge color="gold">مشروع الحصة</Badge>
            <h1 className="mt-2 text-2xl font-bold text-white">{project.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/session/${session.id}/map`}>
              <Button variant="ghost" size="sm">الخريطة</Button>
            </Link>
            {progress.projectCompleted && (
              <Link to={`/session/${session.id}/boss`}>
                <Button variant="gold" size="sm">Boss Challenge</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <h2 className="mb-2 text-lg font-bold text-white">المطلوب</h2>
              <p className="text-white/80">{project.requirement}</p>
            </Card>

            <Card>
              <h2 className="mb-3 text-lg font-bold text-white">مخطط Input → Process → Output</h2>
              <div className="grid gap-3">
                <div className="rounded-xl bg-[#0A1729]/60 p-3">
                  <span className="text-xs font-bold text-[#0060F0]">INPUT</span>
                  <p className="text-sm text-white/80">{project.inputProcessOutput.input}</p>
                </div>
                <div className="rounded-xl bg-[#0A1729]/60 p-3">
                  <span className="text-xs font-bold text-[#F0A800]">PROCESS</span>
                  <p className="text-sm text-white/80">{project.inputProcessOutput.process}</p>
                </div>
                <div className="rounded-xl bg-[#0A1729]/60 p-3">
                  <span className="text-xs font-bold text-[#27C93F]">OUTPUT</span>
                  <p className="text-sm text-white/80">{project.inputProcessOutput.output}</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="mb-3 text-lg font-bold text-white">معايير النجاح</h2>
              <ul className="space-y-2">
                {project.successCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-[#0060F0]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {project.hints.length > 0 && (
              <Card>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="mb-3 flex items-center gap-2 text-lg font-bold text-[#F0A800]"
                >
                  <Lightbulb className="h-5 w-5" />
                  تلميحات
                </button>
                {showHints && (
                  <ul className="space-y-2">
                    {project.hints.map((h, i) => (
                      <li key={i} className="rounded-lg bg-[#0A1729]/60 p-3 text-white/80">{h.text}</li>
                    ))}
                  </ul>
                )}
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Code Editor</h2>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  {copied ? 'تم النسخ' : 'نسخ'}
                </Button>
              </div>
              <textarea
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="code-box w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] p-4 font-mono text-sm text-white focus:border-[#0060F0] focus:outline-none"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={handleRun} variant="secondary">
                  <Play className="h-4 w-4" /> Run (محاكاة)
                </Button>
                <Button onClick={handleCheck}>
                  <CheckCircle className="h-4 w-4" /> Check
                </Button>
                <Button onClick={handleSave} variant="ghost">
                  <Save className="h-4 w-4" /> Save
                </Button>
              </div>
            </Card>

            {(output || error) && (
              <Card>
                <h3 className="mb-2 text-sm font-bold text-white/70">Console Output</h3>
                {error ? (
                  <div className="rounded-lg bg-[#F04800]/10 p-3 text-[#F04800]">{error}</div>
                ) : (
                  <pre className="code-box max-h-60 overflow-auto rounded-lg bg-[#0A1729] p-3 font-mono text-sm text-white/90">{output || '(no output)'}</pre>
                )}
              </Card>
            )}

            {testResults.length > 0 && (
              <Card>
                <h3 className="mb-3 text-sm font-bold text-white/70">Test Cases</h3>
                <div className="space-y-2">
                  {project.testCases.map((tc) => {
                    const result = testResults.find((r) => r.id === tc.id);
                    return (
                      <div key={tc.id} className="rounded-lg bg-[#0A1729]/60 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white/90">{tc.description || `اختبار ${tc.id}`}</span>
                          {result?.passed ? (
                            <Badge color="green">ناجح</Badge>
                          ) : (
                            <Badge color="red">يحتاج مراجعة</Badge>
                          )}
                        </div>
                        {tc.inputs && tc.inputs.length > 0 && (
                          <div className="mt-2 text-xs text-white/50">
                            المدخلات: <span className="font-mono text-white/70">{tc.inputs.join('، ')}</span>
                          </div>
                        )}
                        {tc.expectedOutput && (
                          <div className="mt-1 text-xs text-white/50">
                            المتوقع: <span className="font-mono text-white/70">{tc.expectedOutput}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {(allPassed || progress.projectCompleted) && (
                  <div className="mt-4 animate-slide-up rounded-xl border border-[#27C93F]/30 bg-[#27C93F]/10 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-[#27C93F]" />
                    <p className="font-bold text-[#27C93F]">ممتاز! اجتزتَ معايير المشروع.</p>
                    <p className="mt-1 text-sm text-white/70">+50 XP | +10 جواهر</p>
                    <Button onClick={() => navigate(`/session/${session.id}/boss`)} variant="gold" className="mt-3">
                      انتقل لـ Boss Challenge
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
