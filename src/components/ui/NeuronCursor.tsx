import React, { useEffect, useState, useRef } from 'react';

export const NeuronCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [lagPos, setLagPos] = useState({ x: -100, y: -100 });
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const lastPos = useRef({ x: -100, y: -100 });
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        setIsIdle(true);
      }, 15000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });
      lastPos.current = { x, y };
      resetIdle();

      // Add to trail occasionally
      setTrail((prev) => [
        { x, y, id: Date.now() + Math.random() },
        ...prev.slice(0, 3),
      ]);

      // Detect hover target
      const target = document.elementFromPoint(x, y);
      if (target) {
        const interactive = target.closest('a, button, [data-cursor], input, textarea');
        if (interactive) {
          const customLabel = interactive.getAttribute('data-cursor');
          if (customLabel) {
            setHoverLabel(customLabel);
          } else if (interactive.tagName === 'A') {
            setHoverLabel('VISIT');
          } else if (interactive.tagName === 'BUTTON') {
            setHoverLabel('CLICK');
          } else {
            setHoverLabel('INTERACT');
          }
        } else {
          setHoverLabel(null);
        }
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    resetIdle();

    // Spring lag animation frame loop
    let rafId: number;
    const animateLag = () => {
      setLagPos((prev) => ({
        x: prev.x + (lastPos.current.x - prev.x) * 0.22,
        y: prev.y + (lastPos.current.y - prev.y) * 0.22,
      }));
      rafId = requestAnimationFrame(animateLag);
    };
    rafId = requestAnimationFrame(animateLag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice || pos.x < 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Neural Trail */}
      {trail.map((t, idx) => (
        <div
          key={t.id}
          className="fixed rounded-full bg-[#5CFFC2] transition-opacity duration-300"
          style={{
            left: t.x - 2,
            top: t.y - 2,
            width: 4,
            height: 4,
            opacity: 0.35 / (idx + 1),
            transform: `scale(${1 - idx * 0.2})`,
          }}
        />
      ))}

      {/* Outer Spring Ring */}
      <div
        className={`fixed flex items-center justify-center rounded-full transition-[border-color,background-color,transform] duration-150 ${
          isPressed ? 'scale-75' : hoverLabel ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: lagPos.x - 20,
          top: lagPos.y - 20,
          width: 40,
          height: 40,
          border: hoverLabel
            ? '1.5px solid rgba(92, 255, 194, 0.9)'
            : '1px solid rgba(92, 255, 194, 0.35)',
          backgroundColor: hoverLabel
            ? 'rgba(92, 255, 194, 0.08)'
            : 'transparent',
          boxShadow: hoverLabel
            ? '0 0 16px rgba(92, 255, 194, 0.3)'
            : 'none',
        }}
      >
        {hoverLabel && (
          <span className="text-[8px] font-mono tracking-widest text-[#5CFFC2] font-semibold uppercase">
            {hoverLabel}
          </span>
        )}
      </div>

      {/* Core Neuron Dot */}
      <div
        className={`fixed rounded-full bg-[#5CFFC2] shadow-[0_0_10px_#5CFFC2] transition-opacity duration-200 ${
          isIdle ? 'opacity-30' : 'opacity-100'
        }`}
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
        }}
      />

      {/* Idle Sleeping Indicator */}
      {isIdle && (
        <div
          className="fixed font-mono text-[10px] text-[#8E93A8] opacity-60 tracking-wider"
          style={{
            left: pos.x + 12,
            top: pos.y - 12,
          }}
        >
          z z z
        </div>
      )}
    </div>
  );
};
