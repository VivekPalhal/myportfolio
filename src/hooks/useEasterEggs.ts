import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../lib/sound';

export function useEasterEggs() {
  const [supernovaActive, setSupernovaActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerSupernova = () => {
    sound.playSupernova();
    setSupernovaActive(true);
    setToastMessage('☀️ Sun Burst Activated! The Paper World Shimmers');

    try {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#FF6A00', '#FFC999', '#1C1208', '#FFA21F', '#FFF3E3'],
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      setSupernovaActive(false);
    }, 6000);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const typedBuffer: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Konami Code
      if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          triggerSupernova();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      // Check typed word "hire"
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        typedBuffer.push(e.key.toLowerCase());
        if (typedBuffer.length > 10) typedBuffer.shift();
        if (typedBuffer.join('').endsWith('hire')) {
          sound.playNodeIgnite(800);
          setToastMessage('🎉 Excellent decision! 😄 Initiating connection...');
          try {
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
          } catch {
            // safe
          }
          setTimeout(() => setToastMessage(null), 4000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    supernovaActive,
    toastMessage,
    triggerSupernova,
    clearToast: () => setToastMessage(null),
  };
}
