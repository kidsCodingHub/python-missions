import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { ActivityRenderer } from './ActivityRenderer';
import { Button, Card, Badge } from './ui';
import { Trophy, ArrowLeft } from 'lucide-react';

export function BossView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = id ? getSessionById(id) : undefined;
  const { getSessionProgress, completeBoss } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [currentRound, setCurrentRound] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState(false);

  if (!session || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white">
        <h1 className="text-2xl font-bold">الحصة غير موجودة</h1>
      </div>
    );
  }

  const rounds = session.bossRounds;
  const round = rounds[currentRound];

  const handleRoundComplete = () => {
    if (!roundCorrect) return;
    if (currentRound < rounds.length - 1) {
      setCurrentRound((r) => r + 1);
      setRoundCorrect(false);
    } else {
      completeBoss(session.id);
      navigate(`/session/${session.id}/report`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge color="orange">Boss Challenge</Badge>
            <h1 className="mt-2 text-2xl font-bold text-white">{session.badgeName}</h1>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#16305A] px-4 py-2">
            <Trophy className="h-5 w-5 text-[#F0A800]" />
            <span className="font-bold text-white">{currentRound + 1} / {rounds.length}</span>
          </div>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#16305A]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F04800] to-[#F0A800] transition-all duration-500"
            style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
          />
        </div>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F04800] text-white font-bold">
              {currentRound + 1}
            </div>
            <h2 className="text-xl font-bold text-white">{round.title}</h2>
          </div>
          <ActivityRenderer
            activity={round}
            mode="boss"
            onComplete={() => {
              // Boss rewards handled once at completion
            }}
            onStateChange={(correct) => setRoundCorrect(correct)}
          />
          <div className="mt-6 flex justify-end">
            <Button onClick={handleRoundComplete} variant="gold" disabled={!roundCorrect}>
              {currentRound < rounds.length - 1 ? 'الجولة التالية' : 'إنهاء Boss'}
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
