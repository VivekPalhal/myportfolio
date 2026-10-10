import React, { useEffect, useRef, useState } from 'react';

interface LongShadowTextProps {
  children: React.ReactNode;
  className?: string;
  steps?: number;
  shadowColor?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  id?: string;
}

export const LongShadowText: React.FC<LongShadowTextProps> = ({
  children,
  className = '',
  steps = 8,
  shadowColor = '#FF6A00',
  as: Component = 'span',
  id,
}) => {
  const elemRef = useRef<HTMLElement | null>(null);
  const [textShadow, setTextShadow] = useState('');

  useEffect(() => {
    let rafId: number;

    const updateShadow = () => {
      const el = elemRef.current;
      if (!el) {
        rafId = requestAnimationFrame(updateShadow);
        return;
      }

      const rect = el.getBoundingClientRect();
      // Check if visible in viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        rafId = requestAnimationFrame(updateShadow);
        return;
      }

      // Read global sun position from CSS vars or default
      const sunXStr = document.documentElement.style.getPropertyValue('--sun-x') || `${window.innerWidth / 2}px`;
      const sunYStr = document.documentElement.style.getPropertyValue('--sun-y') || `100px`;
      const sunX = parseFloat(sunXStr) || window.innerWidth / 2;
      const sunY = parseFloat(sunYStr) || 100;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Vector from Sun to Element center
      const dx = centerX - sunX;
      const dy = centerY - sunY;
      const dist = Math.hypot(dx, dy) || 1;

      // Normalize unit vector
      const ux = dx / dist;
      const uy = dy / dist;

      // Shadow length: clamped between 10px and 38px
      const length = Math.min(Math.max(dist * 0.04, 8), 32);

      // Construct stepped hard shadow
      const shadows: string[] = [];
      for (let i = 1; i <= steps; i++) {
        const factor = (i / steps) * length;
        const sx = (ux * factor).toFixed(1);
        const sy = (uy * factor).toFixed(1);
        shadows.push(`${sx}px ${sy}px 0 ${shadowColor}`);
      }

      // Also add an ink outline/anchor layer for crisp readability
      shadows.unshift(`1px 1px 0 #1C1208`);

      setTextShadow(shadows.join(', '));
      rafId = requestAnimationFrame(updateShadow);
    };

    rafId = requestAnimationFrame(updateShadow);
    return () => cancelAnimationFrame(rafId);
  }, [steps, shadowColor]);

  const Comp = Component as any;

  return (
    <Comp
      ref={elemRef}
      id={id}
      className={`transition-[text-shadow] duration-75 select-none ${className}`}
      style={{ textShadow }}
      data-shadow="true"
    >
      {children}
    </Comp>
  );
};
