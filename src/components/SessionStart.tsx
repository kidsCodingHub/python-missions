import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { Button, Card, Badge } from './ui';
import { Play, Map, Target, CheckCircle, Copy, Check } from 'lucide-react';

export function SessionStart() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = id ? getSessionById(id) : undefined;
  const { getSessionProgress, setNickname } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [name, setName] = useState(progress?.nickname || '');
  const [copied, setCopied] = useState(false);

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A1729] text-white">
        <h1 className="text-2xl font-bold">الحصة غير موجودة</h1>
        <Link to="/" className="mt-4 text-[#0060F0]">العودة للرئيسية</Link>
      </div>
    );
  }

  const hasProgress = progress && (progress.completedMissions.length > 0 || progress.projectCompleted);
  const canContinue = hasProgress;

  const handleStart = () => {
    if (name.trim()) setNickname(session.id, name.trim());
    navigate(`/session/${session.id}/map`);
  };

  const handleContinue = () => {
    if (name.trim()) setNickname(session.id, name.trim());
    if (!progress) {
      navigate(`/session/${session.id}/map`);
      return;
    }
    const allMissionsDone = progress.completedMissions.length >= session.missions.length;
    if (allMissionsDone && progress.projectCompleted && progress.bossCompleted) {
      navigate(`/session/${session.id}/report`);
    } else if (allMissionsDone && !progress.projectCompleted) {
      navigate(`/session/${session.id}/project`);
    } else if (allMissionsDone && progress.projectCompleted && !progress.bossCompleted) {
      navigate(`/session/${session.id}/boss`);
    } else if (progress.lastMissionId) {
      navigate(`/session/${session.id}/mission/${progress.lastMissionId}`);
    } else {
      navigate(`/session/${session.id}/map`);
    }
  };

  const copyLink = () => {
    const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
    const url = `${baseUrl}/#/session/${session.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#0060F0]/10 blur-3xl" />
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2">
              <Badge color="gold">الحصة {session.number} من 96</Badge>
              <button
                onClick={copyLink}
                className="flex items-center gap-1 rounded-lg bg-[#0A1729]/60 px-3 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#27C93F]" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'تم النسخ' : 'نسخ الرابط'}
              </button>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{session.titleAr}</h1>
            <p className="mt-2 text-lg text-white/50 font-en">{session.titleEn}</p>

            <div className="mx-auto my-6 flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl">
              <img src="logo-vertical.png" alt="Kids Coding Hub" className="h-full w-full object-cover" />
            </div>

            <p className="mx-auto max-w-xl text-white/70">{session.description}</p>

            <div className="mt-8 text-right">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
                <Target className="h-5 w-5 text-[#0060F0]" />
                ما سيتعلمه الطالب
              </h3>
              <ul className="space-y-2">
                {session.learningGoals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-xl bg-[#0A1729]/50 p-3 text-white/80">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#27C93F]" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <div className="text-right">
                <label className="mb-2 block text-sm font-semibold text-white/80">اسمك أو Nickname (اختياري)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك المختصر"
                  className="w-full rounded-xl border border-[#0060F0]/30 bg-[#0A1729] px-4 py-3 text-right text-white placeholder-white/30 focus:border-[#0060F0] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleStart} size="lg" className="flex-1">
                  <Play className="h-5 w-5" />
                  ابدأ المهمة
                </Button>
                {canContinue && (
                  <Button onClick={handleContinue} variant="secondary" size="lg" className="flex-1 animate-pulse-glow">
                    <Map className="h-5 w-5" />
                    متابعة من حيث توقفت
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
