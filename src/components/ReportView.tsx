import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSessionById } from '../data';
import { useProgress } from '../hooks/useProgress';
import { Button, Card, Badge, Hearts } from './ui';
import { Star, Gem, RotateCcw, Printer, BookOpen, Code2, Map, AlertTriangle, CheckCircle, PartyPopper } from 'lucide-react';

export function ReportView() {
  const { id } = useParams<{ id: string }>();
  const session = id ? getSessionById(id) : undefined;
  const { getSessionProgress, viewReport, resetSession } = useProgress();
  const progress = session ? getSessionProgress(session.id) : null;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (session) {
      viewReport(session.id);
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [session, viewReport]);

  if (!session || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1729] text-white">
        <h1 className="text-2xl font-bold">الحصة غير موجودة</h1>
      </div>
    );
  }

  const completedCount = progress.completedMissions.length;
  const totalMissions = session.missions.length;
  const strongestConcept = session.learningGoals[0];
  const reviewConcept = progress.mistakes.length > 0 ? progress.mistakes[0] : 'لا يوجد خطأ مسجل';
  const completedDate = progress.completedAt ? new Date(progress.completedAt).toLocaleDateString('ar-EG') : new Date().toLocaleDateString('ar-EG');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0A1729] stars-bg px-4 py-6 print:bg-white print:text-black">
      <div className="mx-auto max-w-4xl">
        <Card className="print-card">
          <div className="text-center">
            {showConfetti && (
              <div className="animate-bounce text-4xl">
                <PartyPopper className="mx-auto h-12 w-12 text-[#F0A800]" />
              </div>
            )}
            <Badge color="gold">Mission Report</Badge>
            <h1 className="mt-4 text-3xl font-bold text-white print:text-black">{session.titleAr}</h1>
            <p className="text-white/50 print:text-gray-600 font-en">{session.titleEn}</p>
            <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white/5 p-2">
              <img src="robot.png" alt="Robot Mascot" className="h-full w-full object-contain" />
            </div>
            <h2 className="mt-3 text-xl font-bold" style={{ color: session.badgeColor }}>{session.badgeName}</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#0A1729]/60 p-4 text-center print:bg-gray-100">
              <div className="mb-1 text-sm text-white/50 print:text-gray-600">الطالب</div>
              <div className="text-lg font-bold text-white print:text-black">{progress.nickname || 'مستكشف Python'}</div>
            </div>
            <div className="rounded-xl bg-[#0A1729]/60 p-4 text-center print:bg-gray-100">
              <div className="mb-1 text-sm text-white/50 print:text-gray-600">تاريخ الإكمال</div>
              <div className="text-lg font-bold text-white print:text-black">{completedDate}</div>
            </div>
            <div className="rounded-xl bg-[#0A1729]/60 p-4 text-center print:bg-gray-100">
              <div className="mb-1 text-sm text-white/50 print:text-gray-600">المهمات</div>
              <div className="text-lg font-bold text-white print:text-black">{completedCount}/{totalMissions}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl bg-[#0060F0]/10 p-4">
              <Star className="h-6 w-6 text-[#F0A800]" />
              <div>
                <div className="text-xs text-white/50 print:text-gray-600">XP</div>
                <div className="text-xl font-bold text-white print:text-black">{progress.xp}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#0060F0]/10 p-4">
              <Gem className="h-6 w-6 text-[#0060F0]" />
              <div>
                <div className="text-xs text-white/50 print:text-gray-600">جواهر</div>
                <div className="text-xl font-bold text-white print:text-black">{progress.gems}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#0060F0]/10 p-4">
              <Hearts count={progress.hearts} />
              <div>
                <div className="text-xs text-white/50 print:text-gray-600">قلوب</div>
                <div className="text-xl font-bold text-white print:text-black">{progress.hearts}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#0060F0]/10 p-4">
              <AlertTriangle className="h-6 w-6 text-[#F04800]" />
              <div>
                <div className="text-xs text-white/50 print:text-gray-600">محاولات</div>
                <div className="text-xl font-bold text-white print:text-black">{progress.attempts}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="!bg-[#27C93F]/10 !border-[#27C93F]/30">
              <div className="mb-2 flex items-center gap-2 text-[#27C93F]">
                <CheckCircle className="h-5 w-5" />
                <h3 className="font-bold">أقوى مفهوم</h3>
              </div>
              <p className="text-white/80 print:text-black">{strongestConcept}</p>
            </Card>
            <Card className="!bg-[#F04800]/10 !border-[#F04800]/30">
              <div className="mb-2 flex items-center gap-2 text-[#F04800]">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-bold">يحتاج مراجعة</h3>
              </div>
              <p className="text-white/80 print:text-black">{reviewConcept}</p>
            </Card>
          </div>

          {progress.mistakes.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-bold text-white print:text-black">أخطاء مختصرة للمراجعة</h3>
              <ul className="space-y-2">
                {progress.mistakes.map((m, i) => (
                  <li key={i} className="rounded-xl bg-[#0A1729]/60 p-3 text-white/80 print:bg-gray-100 print:text-black">{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold text-white print:text-black">حالة المشروع</h3>
            <div className="rounded-xl bg-[#0A1729]/60 p-4 print:bg-gray-100">
              {progress.projectCompleted ? (
                <div className="flex items-center gap-2 text-[#27C93F]">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-bold">تم إكمال المشروع: {session.project.title}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#F0A800]">
                  <AlertTriangle className="h-5 w-5" />
                  <span>المشروع لم يُكتمل بعد.</span>
                </div>
              )}
            </div>
          </div>

          <div className="no-print mt-8 flex flex-wrap gap-3">
            <Button onClick={handlePrint} variant="secondary">
              <Printer className="h-4 w-4" /> طباعة التقرير
            </Button>
            <Link to={`/session/${session.id}/boss`}>
              <Button variant="gold">
                <RotateCcw className="h-4 w-4" /> إعادة الـBoss
              </Button>
            </Link>
            <Link to={`/session/${session.id}/project`}>
              <Button variant="secondary">
                <Code2 className="h-4 w-4" /> فتح المشروع
              </Button>
            </Link>
            <Link to={`/session/${session.id}/map`}>
              <Button>
                <Map className="h-4 w-4" /> العودة للخريطة
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => { if (confirm('هل تريد إعادة تعيين تقدم هذه الحصة؟')) resetSession(session.id); }}>
              <RotateCcw className="h-4 w-4" /> إعادة الحصة
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
