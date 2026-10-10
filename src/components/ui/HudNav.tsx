import React, { useState, useEffect } from 'react';
import { FileText, Search, Sun, Zap, Moon } from 'lucide-react';

interface HudNavProps {
  quickRead: boolean;
  onToggleQuickRead: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onToggleSunset: () => void;
  isSunset: boolean;
  activeSection: string;
}

export const HudNav: React.FC<HudNavProps> = ({
  quickRead,
  onToggleQuickRead,
  onOpenCommandPalette,
  onOpenResume,
  onToggleSunset,
  isSunset,
  activeSection,
}) => {
  const [istTime, setIstTime] = useState('');
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Origin', href: '#origin', id: 'origin' },
    { label: 'The Desk', href: '#desk', id: 'desk' },
    { label: 'Stickers', href: '#stickers', id: 'stickers' },
    { label: 'The Deck', href: '#deck', id: 'deck' },
    { label: 'Timeline', href: '#timeline', id: 'timeline' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FFFDF8]/90 backdrop-blur-md border-b-2 border-[#1C1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Blinking Sun Face */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#origin"
            onMouseEnter={() => setIsWinking(true)}
            onMouseLeave={() => setIsWinking(false)}
            className="flex items-center gap-2 group"
            data-cursor="HOME"
          >
            {/* Flat Orange Sun Logo with Animated Face */}
            <div className="w-8 h-8 rounded-full bg-[#FF6A00] border-2 border-[#1C1208] flex items-center justify-center shadow-sticker-sm group-hover:scale-105 transition-transform">
              <div className="relative w-4 h-4 flex items-center justify-center">
                {/* Left eye */}
                <span className="w-1 h-1 rounded-full bg-[#1C1208] absolute left-0.5 top-1" />
                {/* Right eye (winks on hover) */}
                {isWinking ? (
                  <span className="w-1.5 h-0.5 bg-[#1C1208] absolute right-0.5 top-1.5 rounded-full" />
                ) : (
                  <span className="w-1 h-1 rounded-full bg-[#1C1208] absolute right-0.5 top-1" />
                )}
                {/* Smile */}
                <svg
                  className="w-2.5 h-1.5 absolute bottom-0.5 text-[#1C1208]"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M 1 1 Q 5 5 9 1" />
                </svg>
              </div>
            </div>

            <span className="text-base sm:text-lg font-black tracking-tight text-[#1C1208] whitespace-nowrap">
              VIVEK PALHAL
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#7B6A58]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#FF6A00]'
                    : 'hover:text-[#1C1208]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF6A00] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions & Utility Toggles */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live IST clock */}
          <span className="hidden lg:inline text-xs font-mono font-medium text-[#7B6A58] mr-1">
            {istTime}
          </span>

          {/* Sunset Toggle */}
          <button
            onClick={onToggleSunset}
            className={`p-2 rounded-lg border-2 border-[#1C1208] transition-colors ${
              isSunset ? 'bg-[#FFC999]' : 'bg-[#FFF3E3] hover:bg-[#FFC999]'
            }`}
            title={isSunset ? 'Sunrise Mode' : 'Sunset Mode'}
            aria-label="Toggle Sunset"
          >
            {isSunset ? <Sun className="w-4 h-4 text-[#FF6A00]" /> : <Moon className="w-4 h-4 text-[#1C1208]" />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono font-bold text-[#1C1208] bg-[#FFF3E3] hover:bg-[#FFC999] rounded-lg border-2 border-[#1C1208] transition-colors"
            title="Command Palette (Cmd+K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Quick Read Toggle */}
          <button
            onClick={onToggleQuickRead}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-[#1C1208] transition-all whitespace-nowrap ${
              quickRead
                ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                : 'bg-[#FFF3E3] text-[#1C1208] hover:bg-[#FFC999] shadow-sticker-sm'
            }`}
            title="Toggle Quick Read (Recruiter Summary)"
          >
            <Zap className={`w-3.5 h-3.5 ${quickRead ? 'fill-current' : ''}`} />
            <span>{quickRead ? 'Paper World' : 'Quick Read'}</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#FFFDF8] bg-[#FF6A00] hover:bg-[#E24E00] rounded-lg border-2 border-[#1C1208] shadow-sticker-sm hover:shadow-sticker-pressed transition-all whitespace-nowrap"
            data-cursor="RESUME"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume ↓</span>
          </button>
        </div>
      </div>
    </header>
  );
};
