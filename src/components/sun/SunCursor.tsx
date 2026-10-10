import React, { useEffect, useState, useRef } from 'react';

interface SunCursorProps {
  onSunBurst?: () => void;
  isSunset?: boolean;
}

export const SunCursor: React.FC<SunCursorProps> = ({ isSunset = false }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [lagPos, setLagPos] = useState({ x: -100, y: -100 });
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [raysBurst, setRaysBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  const lastPos = useRef({ x: window.innerWidth / 2, y: 150 });
  const velocity = useRef({ vx: 0, vy: 0 });
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    // Initialize CSS vars with sane default
    document.documentElement.style.setProperty('--sun-x', `${window.innerWidth / 2}px`);
    document.documentElement.style.setProperty('--sun-y', `160px`);

    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        setIsIdle(true);
      }, 7000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      velocity.current = {
        vx: x - lastPos.current.x,
        vy: y - lastPos.current.y,
      };
      setPos({ x, y });
      lastPos.current = { x, y };
      resetIdle();

      // Update global CSS variables for long-shadow calculations
      document.documentElement.style.setProperty('--sun-x', `${x}px`);
      document.documentElement.style.setProperty('--sun-y', `${y}px`);

      // Hover target inspection
      const target = document.elementFromPoint(x, y);
      if (target) {
        const interactive = target.closest('a, button, [data-cursor], input, textarea');
        if (interactive) {
          const custom = interactive.getAttribute('data-cursor');
          if (custom) {
            setHoverLabel(custom);
          } else if (interactive.tagName === 'A') {
            setHoverLabel('OPEN');
          } else if (interactive.tagName === 'BUTTON') {
            setHoverLabel('CLICK');
          } else {
            setHoverLabel('VIEW');
          }
        } else {
          setHoverLabel(null);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      // Ray burst
      setRaysBurst((prev) => [
        ...prev.slice(-2),
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setRaysBurst((prev) => prev.filter((r) => Date.now() - r.id < 600));
      }, 600);
    };

    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    resetIdle();

    // Smooth spring lag loop with squash & stretch
    let rafId: number;
    const animate = () => {
      setLagPos((prev) => {
        const dx = lastPos.current.x - prev.x;
        const dy = lastPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2,
        };
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice || pos.x < 0) return null;

  // Calculate squash & stretch
  const speed = Math.hypot(velocity.current.vx, velocity.current.vy);
  const angle = Math.atan2(velocity.current.vy, velocity.current.vx) * (180 / Math.PI);
  const stretchX = Math.min(1 + speed * 0.015, 1.35);
  const stretchY = Math.max(1 - speed * 0.01, 0.75);

  const sunYOffset = isSunset || isIdle ? 40 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* 6 Burst Rays on Click */}
      {raysBurst.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none"
          style={{ left: burst.x, top: burst.y }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute w-1 h-3.5 bg-[#FF6A00] rounded-full animate-ping"
              style={{
                transform: `rotate(${deg}deg) translateY(-22px)`,
                transformOrigin: 'center center',
              }}
            />
          ))}
        </div>
      ))}

      {/* The Sun Disc Cursor */}
      <div
        className={`fixed flex items-center justify-center rounded-full transition-[width,height,background-color,border-radius,transform] duration-150 ${
          isPressed
            ? 'scale-90 bg-[#E24E00]'
            : isSunset || isIdle
            ? 'bg-[#FFC999] opacity-80'
            : 'bg-[#FF6A00]'
        }`}
        style={{
          left: lagPos.x - (hoverLabel ? 28 : 15),
          top: lagPos.y - (hoverLabel ? 28 : 15) + sunYOffset,
          width: hoverLabel ? 56 : 30,
          height: hoverLabel ? 56 : 30,
          boxShadow: isSunset
            ? '0 0 0 2px #E24E00'
            : '3px 3px 0 #1C1208',
          transform: hoverLabel
            ? 'scale(1)'
            : `rotate(${angle}deg) scale(${stretchX}, ${stretchY})`,
        }}
      >
        {hoverLabel ? (
          <span className="text-[9px] font-mono tracking-wider text-[#FFFDF8] font-bold uppercase select-none px-1 text-center">
            {hoverLabel}
          </span>
        ) : (
          /* Little smiling sun face */
          <div className="relative w-4 h-4 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#1C1208] absolute left-0.5 top-1" />
            <span className="w-1 h-1 rounded-full bg-[#1C1208] absolute right-0.5 top-1" />
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
        )}
      </div>

      {/* Idle Sun Sleeping 'zzz' */}
      {isIdle && (
        <div
          className="fixed font-mono text-[11px] font-bold text-[#E24E00] tracking-wider animate-bounce"
          style={{
            left: lagPos.x + 18,
            top: lagPos.y - 18,
          }}
        >
          z z z
        </div>
      )}
    </div>
  );
};
