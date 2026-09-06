import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { Button, Card, Badge } from './ui';
import { Lock, CheckCircle, Play, Trophy, Gem, Star, Heart, AlertCircle, Copy, Check } from 'lucide-react';

export function MissionMap() {
  const { id } = useParams<{ id: string }>();
  const session = id ? getSessionById(id) : undefined;
  const { getSessionProgress } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (!session) return;
    const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
    const url = `${baseUrl}/#/session/${session.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!session || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[#F04800]" />
          <h1 className="text-2xl font-bold">الحصة غير موجودة</h1>
          <Link to="/" className="mt-4 inline-block text-[#0060F0]">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const totalMissions = session.missions.length;
  const completed = progress.completedMissions.length;
  const percent = Math.min(100, Math.round((completed / totalMissions) * 100));

  const isMissionAvailable = (missionId: string, index: number) => {
    if (progress.completedMissions.includes(missionId)) return true;
    if (index === 0) return true;
    const prevMission = session.missions[index - 1];
    return progress.completedMissions.includes(prevMission.id);
  };

  const isLocked = (missionId: string, index: number) => !isMissionAvailable(missionId, index);

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Card className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge color="gold">الحصة {session.number}</Badge>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1 rounded-lg bg-[#0A1729]/60 px-3 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-[#27C93F]" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'تم النسخ' : 'نسخ الرابط'}
                </button>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-white">{session.titleAr}</h1>
              <p className="text-sm text-white/50 font-en">{session.titleEn}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 rounded-xl bg-[#0A1729] px-3 py-2 text-[#F0A800]">
                <Star className="h-4 w-4" />
                <span className="font-bold">{progress.xp}</span>
              </div>
              <div className="flex items-center gap-1 rounded-xl bg-[#0A1729] px-3 py-2 text-[#0060F0]">
                <Gem className="h-4 w-4" />
                <span className="font-bold">{progress.gems}</span>
              </div>
              <div className="flex items-center gap-1 rounded-xl bg-[#0A1729] px-3 py-2 text-[#F04800]">
                <Heart className="h-4 w-4" />
                <span className="font-bold">{progress.hearts}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-white/70">
              <span>تقدم المهمات</span>
              <span>{completed}/{totalMissions} ({percent}%)</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-[#0A1729]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0060F0] to-[#F0A800] transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </Card>

        <div className="relative mb-8">
          <div className="absolute right-8 top-0 bottom-0 w-1 bg-[#16305A] sm:right-10" />
          <div className="space-y-4">
            {session.missions.map((mission, index) => {
              const isCompleted = progress.completedMissions.includes(mission.id);
              const locked = isLocked(mission.id, index);
              return (
                <div
                  key={mission.id}
                  className={`relative flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                    locked
                      ? 'border-white/10 bg-[#0A1729]/50 opacity-60'
                      : isCompleted
                      ? 'border-[#27C93F]/30 bg-[#27C93F]/10'
                      : 'border-[#0060F0]/30 bg-[#16305A]/80 hover:border-[#0060F0]/60'
                  }`}
                >
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 sm:h-14 sm:w-14 ${
                      isCompleted
                        ? 'border-[#27C93F] bg-[#27C93F] text-white'
                        : locked
                        ? 'border-white/20 bg-[#0A1729] text-white/30'
                        : 'border-[#0060F0] bg-[#0060F0] text-white'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : locked ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{mission.title}</h3>
                    <p className="text-sm text-white/60">{mission.goal}</p>
                  </div>
                  {locked ? (
                    <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/50">مقفّلة</span>
                  ) : (
                    <Link to={`/session/${session.id}/mission/${mission.id}`}>
                      <Button size="sm" variant={isCompleted ? 'secondary' : 'primary'}>
                        {isCompleted ? 'مراجعة' : 'ابدأ'}
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className={`text-center ${!progress.projectCompleted ? 'opacity-80' : ''}`}>
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0A800]/20 text-[#F0A800]">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-bold text-white">المشروع</h3>
            <p className="mb-4 text-sm text-white/60">{session.project.title}</p>
            <Link to={`/session/${session.id}/project`}>
              <Button variant="secondary" size="sm" className="w-full">
                {progress.projectCompleted ? 'مراجعة المشروع' : 'افتح المشروع'}
              </Button>
            </Link>
          </Card>

          <Card className={`text-center ${!progress.bossCompleted ? 'opacity-80' : ''}`}>
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F04800]/20 text-[#F04800]">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-bold text-white">Boss Challenge</h3>
            <p className="mb-4 text-sm text-white/60">{session.badgeName}</p>
            <Link to={`/session/${session.id}/boss`}>
              <Button variant="gold" size="sm" className="w-full" disabled={!progress.projectCompleted}>
                {progress.bossCompleted ? 'إعادة Boss' : 'تحدى الـBoss'}
              </Button>
            </Link>
          </Card>

          <Card className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27C93F]/20 text-[#27C93F]">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-bold text-white">التقرير النهائي</h3>
            <p className="mb-4 text-sm text-white/60">راجع إنجازاتك</p>
            <Link to={`/session/${session.id}/report`}>
              <Button size="sm" className="w-full" variant="secondary">
                عرض التقرير
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
