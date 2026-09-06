import { Link, useParams } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { sessions } from '../data';
import { Hearts, Stat } from './ui';
import { Gem, Star, Home, ChevronLeft } from 'lucide-react';

export function Header({ showBack = true }: { showBack?: boolean }) {
  const { id } = useParams<{ id: string }>();
  const { state } = useProgress();
  const session = id ? sessions.find((s) => s.id === id) : undefined;
  const progress = session ? (state.progress[session.id] || null) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#0060F0]/20 bg-[#0A1729]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="logo.png" alt="Kids Coding Hub" className="h-10 w-auto rounded-lg object-contain" />
          </Link>
          {showBack && session && (
            <Link
              to={`/session/${session.id}/map`}
              className="mr-1 flex items-center gap-1 rounded-lg px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white"
              title="خريطة الحصة"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">خريطة الحصة</span>
            </Link>
          )}
          {!session && showBack && (
            <Link
              to="/"
              className="mr-1 flex items-center gap-1 rounded-lg px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white"
              title="الرئيسية"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">الرئيسية</span>
            </Link>
          )}
        </div>

        {progress && (
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Stat icon={<Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="XP" value={progress.xp} color="#F0A800" />
            <Stat icon={<Gem className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="جواهر" value={progress.gems} color="#0060F0" />
            <Hearts count={progress.hearts} />
          </div>
        )}
        {!progress && session && (
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Stat icon={<Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="XP" value={0} color="#F0A800" />
            <Stat icon={<Gem className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="جواهر" value={0} color="#0060F0" />
            <Hearts count={3} />
          </div>
        )}
      </div>
    </header>
  );
}
