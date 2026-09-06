import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { ActivityRenderer } from './ActivityRenderer';
import { Button, Card, Badge } from './ui';
import { AlertCircle, Lock, CheckCircle } from 'lucide-react';

export function MissionView() {
  const { id, missionId } = useParams<{ id: string; missionId: string }>();
  const navigate = useNavigate();
  const session = id ? getSessionById(id) : undefined;
  const mission = session?.missions.find((m) => m.id === missionId);
  const { getSessionProgress, completeMission, recordAttempt, useHint, loseHeart, recordMistake } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [hasWrongAnswer, setHasWrongAnswer] = useState(false);

  useEffect(() => {
    setHasWrongAnswer(false);
  }, [missionId]);

  if (!session || !mission || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white px-4">
        <Card className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[#F04800]" />
          <h1 className="text-2xl font-bold">المهمة غير موجودة</h1>
          <p className="mt-2 text-white/60">قد تكون المهمة مقفلة أو الرابط غير صحيح.</p>
          <Link to={session ? `/session/${session.id}/map` : '/'} className="mt-6 inline-block">
            <Button>العودة لخريطة الحصة</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const missionIndex = session.missions.findIndex((m) => m.id === mission.id);
  const isLocked = missionIndex > 0 && !progress.completedMissions.includes(session.missions[missionIndex - 1].id);

  if (isLocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white px-4">
        <Card className="text-center max-w-md">
          <Lock className="mx-auto mb-4 h-12 w-12 text-[#F0A800]" />
          <h1 className="text-2xl font-bold">المهمة مقفّلة</h1>
          <p className="mt-2 text-white/60">أكمل المهمة السابقة أولًا لفتح هذه المهمة.</p>
          <Link to={`/session/${session.id}/map`} className="mt-6 inline-block">
            <Button>العودة لخريطة الحصة</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isCompleted = progress.completedMissions.includes(mission.id);
  const nextMission = session.missions[missionIndex + 1];
  const prevMission = session.missions[missionIndex - 1];

  const handleComplete = (xp: number, gems: number) => {
    if (!isCompleted) {
      completeMission(session.id, mission.id, xp, gems);
    }
  };

  const handleNext = () => {
    if (nextMission) {
      navigate(`/session/${session.id}/mission/${nextMission.id}`);
    } else {
      navigate(`/session/${session.id}/project`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>الحصة {session.number}</span>
              <span>/</span>
              <span>المهمة {mission.order}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">{mission.title}</h1>
          </div>
          <Badge color={isCompleted ? 'green' : 'royal'} className="self-start">
            {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : null}
            {isCompleted ? ' مكتملة' : ' قيد التنفيذ'}
          </Badge>
        </div>

        <Card>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#F0A800]">الهدف</h2>
            <p className="text-white/80">{mission.goal}</p>
          </div>
          <ActivityRenderer
            activity={mission}
            mode="mission"
            onComplete={handleComplete}
            onNext={handleNext}
            onAttempt={() => {
              recordAttempt(session.id);
            }}
            onHint={() => {
              useHint(session.id);
            }}
            onStateChange={(correct) => {
              if (!correct) {
                if (hasWrongAnswer) {
                  loseHeart(session.id);
                }
                setHasWrongAnswer(true);
                recordMistake(session.id, mission.title);
              }
            }}
          />
        </Card>

        <div className="mt-6 flex justify-between">
          {prevMission ? (
            <Link to={`/session/${session.id}/mission/${prevMission.id}`}>
              <Button variant="ghost">المهمة السابقة</Button>
            </Link>
          ) : (
            <div />
          )}
          {isCompleted && nextMission && (
            <Link to={`/session/${session.id}/mission/${nextMission.id}`}>
              <Button variant="secondary">المهمة التالية</Button>
            </Link>
          )}
          {isCompleted && !nextMission && (
            <Link to={`/session/${session.id}/project`}>
              <Button variant="gold">الانتقال للمشروع</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
