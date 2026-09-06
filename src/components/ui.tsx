import { cn } from '../utils/cn';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export function Button({ className, children, variant = 'primary', size = 'md', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold'; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const variants = {
    primary: 'bg-[#0060F0] hover:bg-[#1a75ff] text-white shadow-lg shadow-blue-900/30',
    secondary: 'bg-[#16305A] hover:bg-[#1e3f75] text-white border border-[#0060F0]/30',
    outline: 'border-2 border-[#0060F0] text-[#0060F0] hover:bg-[#0060F0]/10',
    ghost: 'text-white/80 hover:bg-white/10',
    danger: 'bg-[#E53E3E] hover:bg-red-600 text-white',
    gold: 'bg-[#F0A800] hover:bg-[#ffb81a] text-[#0A1729] font-bold',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-5 py-3 text-base min-h-[48px]',
    lg: 'px-7 py-3.5 text-lg min-h-[52px]',
    xl: 'px-10 py-4 text-xl min-h-[56px]',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-[#0060F0]/20 bg-[#16305A]/80 p-6 backdrop-blur-sm shadow-xl', className)}>
      {children}
    </div>
  );
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre
      className={cn(
        'code-box overflow-x-auto rounded-xl bg-[#0A1729] p-4 text-sm leading-relaxed text-[#9AA5F0] border border-[#0060F0]/20 font-mono',
        className
      )}
    >
      <code>{code}</code>
    </pre>
  );
}

export function Badge({ children, className, color = 'royal' }: { children: ReactNode; className?: string; color?: 'royal' | 'orange' | 'gold' | 'green' | 'red' }) {
  const colors = {
    royal: 'bg-[#0060F0]/20 text-[#0060F0] border-[#0060F0]/30',
    orange: 'bg-[#F04800]/20 text-[#F04800] border-[#F04800]/30',
    gold: 'bg-[#F0A800]/20 text-[#F0A800] border-[#F0A800]/30',
    green: 'bg-[#27C93F]/20 text-[#27C93F] border-[#27C93F]/30',
    red: 'bg-[#E53E3E]/20 text-[#E53E3E] border-[#E53E3E]/30',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold', colors[color], className)}>
      {children}
    </span>
  );
}

export function Stat({ icon, label, value, color = 'white' }: { icon: ReactNode; label: string; value: string | number; color?: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-[#0A1729]/60 px-2 py-1.5 border border-white/5 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2">
      <span style={{ color }}>{icon}</span>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[9px] text-white/50 uppercase tracking-wider sm:text-[10px]">{label}</span>
        <span className="text-sm font-bold text-white sm:text-base">{value}</span>
      </div>
    </div>
  );
}

export function Hearts({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <svg
          key={i}
          className={cn('h-4 w-4 transition-colors sm:h-5 sm:w-5', i < count ? 'text-[#F04800]' : 'text-white/20')}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
