import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sessions } from '../data';
import { useProgress } from '../hooks/useProgress';
import { Button, Card, Badge } from './ui';
import { Play, Trophy, ChevronLeft, Sparkles, Copy, Check } from 'lucide-react';

export function Home() {
  const { state, getSessionProgress } = useProgress();
  const lastSessionId = state.lastSessionId;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copySessionLink = (sessionId: string) => {
    const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
    const url = `${baseUrl}/#/session/${sessionId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(sessionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <section className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#16305A] to-[#0A1729] p-8 sm:p-12 border border-[#0060F0]/20">
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl bg-white/5 shadow-2xl">
              <img src="logo-vertical.png" alt="Kids Coding Hub" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <Badge color="gold">Python Future Builders — Level 1</Badge>
              <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Kids Coding Hub</h1>
              <p className="mt-2 max-w-2xl text-lg text-white/70">
                منصة تحديات تفاعلية لتثبيت حصص Python. ابدأ رحلتك من الصفر حتى بناء أول برامجك.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {lastSessionId && (
                  <Link to={`/session/${lastSessionId}`}>
                    <Button size="lg" className="animate-pulse-glow">
                      <Sparkles className="h-5 w-5" />
                      متابعة من حيث توقفت
                    </Button>
                  </Link>
                )}
                <Link to={`/session/${sessions[0].id}`}>
                  <Button size="lg" variant={lastSessionId ? 'secondary' : 'primary'}>
                    <Play className="h-5 w-5" />
                    ابدأ الرحلة
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#0060F0]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#F04800]/10 blur-3xl" />
        </section>

        {/* Sessions Grid */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#F0A800]" />
            <h2 className="text-2xl font-bold text-white">الحصص المتاحة</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => {
              const progress = getSessionProgress(session.id);
              const total = session.missions.length;
              const completed = progress.completedMissions.length;
              const percent = Math.round((completed / total) * 100);
              const started = progress.completedMissions.length > 0 || progress.projectCompleted;

              return (
                <Card key={session.id} className="group relative flex flex-col gap-4 transition-all hover:border-[#0060F0]/50 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white shadow-lg"
                      style={{ backgroundColor: session.badgeColor }}
                    >
                      {session.number}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copySessionLink(session.id)}
                        className="flex items-center gap-1 rounded-lg bg-[#0A1729]/60 px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        title="نسخ رابط الحصة"
                      >
                        {copiedId === session.id ? (
                          <Check className="h-3.5 w-3.5 text-[#27C93F]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        <span className="hidden sm:inline">{copiedId === session.id ? 'تم' : 'نسخ'}</span>
                      </button>
                      {progress.bossCompleted && (
                        <Badge color="gold" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          {session.badgeName}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{session.titleAr}</h3>
                    <p className="text-sm text-white/50 font-en">{session.titleEn}</p>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">{session.description}</p>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>التقدم</span>
                      <span>{completed}/{total}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#0A1729]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%`, backgroundColor: session.badgeColor }}
                      />
                    </div>
                    <Link to={`/session/${session.id}`} className="block">
                      <Button variant={started ? 'secondary' : 'primary'} className="w-full" size="sm">
                        {started ? 'متابعة' : 'ابدأ'}
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
