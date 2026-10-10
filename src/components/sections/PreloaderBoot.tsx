import React, { useEffect, useState } from 'react';

interface PreloaderBootProps {
  onComplete: () => void;
}

export const PreloaderBoot: React.FC<PreloaderBootProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(0);

  // Shapes: circle, square, triangle, star
  const shapes = ['circle', 'square', 'triangle', 'star'];

  useEffect(() => {
    if (sessionStorage.getItem('paper_sun_booted')) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('paper_sun_booted', 'true');
            onComplete();
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 5;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    setShapeIndex(Math.min(Math.floor((progress / 100) * 4), 3));
  }, [progress]);

  const handleSkip = () => {
    sessionStorage.setItem('paper_sun_booted', 'true');
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#FFFDF8] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
      title="Click or press any key to skip"
    >
      <div className="flex flex-col items-center max-w-sm w-full space-y-8 text-center">
        {/* Shape Shifter Morphing Graphic */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-[#FF6A00] drop-shadow-[4px_4px_0_#1C1208] transition-transform duration-200"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {shapeIndex === 0 && (
              /* Circle */
              <circle cx="50" cy="50" r="42" stroke="#1C1208" strokeWidth="4" />
            )}
            {shapeIndex === 1 && (
              /* Rounded Square */
              <rect x="12" y="12" width="76" height="76" rx="16" stroke="#1C1208" strokeWidth="4" />
            )}
            {shapeIndex === 2 && (
              /* Triangle */
              <polygon points="50,12 88,86 12,86" stroke="#1C1208" strokeWidth="4" strokeLinejoin="round" />
            )}
            {shapeIndex === 3 && (
              /* Star */
              <polygon points="50,8 62,38 94,38 68,58 78,88 50,70 22,88 32,58 6,38 38,38" stroke="#1C1208" strokeWidth="3" strokeLinejoin="round" />
            )}
          </svg>
        </div>

        {/* Rolling Odometer Counter & Paper Tag */}
        <div className="space-y-2">
          <div className="text-5xl font-black font-mono tracking-tighter text-[#1C1208]">
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-2xl text-[#FF6A00]">%</span>
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6A58]">
            Setting the Sun &amp; Cutting Paper...
          </div>
        </div>

        {/* Paper Cut Progress Bar */}
        <div className="w-48 bg-[#FFF3E3] h-3 rounded-full border-2 border-[#1C1208] overflow-hidden p-0.5 shadow-sticker-sm">
          <div
            className="bg-[#FF6A00] h-full rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-[11px] font-mono text-[#7B6A58]">
          Click anywhere or press any key to skip [ESC]
        </div>
      </div>
    </div>
  );
};
