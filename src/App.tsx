/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SunCursor } from './components/sun/SunCursor';
import { HudNav } from './components/ui/HudNav';
import { SideProgressRail } from './components/ui/SideProgressRail';
import { PreloaderBoot } from './components/sections/PreloaderBoot';
import { HeroSection } from './components/sections/HeroSection';
import { MindSection } from './components/sections/MindSection';
import { SynapsesSection } from './components/sections/SynapsesSection';
import { BuildsSection } from './components/sections/BuildsSection';
import { SignalPathSection } from './components/sections/SignalPathSection';
import { TransmitSection } from './components/sections/TransmitSection';
import { QuickScanView } from './components/views/QuickScanView';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/ui/ResumeModal';
import { useEasterEggs } from './hooks/useEasterEggs';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState<boolean>(false);
  const [quickRead, setQuickRead] = useState<boolean>(() => {
    return localStorage.getItem('paper_sun_quick_read') === 'true';
  });
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isSunset, setIsSunset] = useState(false);
  const [activeSection, setActiveSection] = useState('origin');
  const [planeSquadron, setPlaneSquadron] = useState(false);

  const { supernovaActive, toastMessage, triggerSupernova } = useEasterEggs();

  // Handle Cmd+K keyboard shortcut and P key for Paper Planes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key.toLowerCase() === 'p' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        setPlaneSquadron(true);
        setTimeout(() => setPlaneSquadron(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (quickRead) return;

    const sections = ['origin', 'desk', 'stickers', 'deck', 'timeline', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [quickRead]);

  const toggleQuickRead = () => {
    const next = !quickRead;
    setQuickRead(next);
    localStorage.setItem('paper_sun_quick_read', String(next));
  };

  const toggleSunset = () => {
    setIsSunset((prev) => !prev);
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isSunset ? 'bg-[#FFC999]' : 'bg-[#FFFDF8]'
      } text-[#1C1208] selection:bg-[#FF6A00] selection:text-[#FFFDF8]`}
    >
      {/* Sector 00: Boot Preloader (Shape Shifter) */}
      {!bootCompleted && (
        <PreloaderBoot onComplete={() => setBootCompleted(true)} />
      )}

      {/* The Sun-Cursor (Follows pointer, casts real-time long shadows) */}
      {!quickRead && <SunCursor isSunset={isSunset} />}

      {/* Top Bar HUD Navigation */}
      <HudNav
        quickRead={quickRead}
        onToggleQuickRead={toggleQuickRead}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onToggleSunset={toggleSunset}
        isSunset={isSunset}
        activeSection={activeSection}
      />

      {/* Side Progress Rail */}
      {!quickRead && <SideProgressRail activeSection={activeSection} />}

      {/* Main Paper Content World */}
      <main className="relative z-10">
        {quickRead ? (
          <QuickScanView
            onOpenResume={() => setIsResumeModalOpen(true)}
            onExitQuickScan={toggleQuickRead}
          />
        ) : (
          <>
            {/* 01: ORIGIN (Hero with Sundial Shadows & Split-Flap) */}
            <HeroSection onOpenResume={() => setIsResumeModalOpen(true)} />

            {/* 02: THE DESK (About, 2D Objects, & Growing Plant CGPA) */}
            <MindSection />

            {/* 03: THE STICKER WALL (Skills & Flip Tickets) */}
            <SynapsesSection />

            {/* 04: THE DECK (SnapShare & Subway Map Architecture) */}
            <BuildsSection />

            {/* 05: THE ORANGE THREAD (Marker Ribbon Timeline) */}
            <SignalPathSection />

            {/* 06: SEND A PAPER PLANE (Contact & Mailbox) */}
            <TransmitSection onOpenResume={() => setIsResumeModalOpen(true)} />
          </>
        )}
      </main>

      {/* Paper Plane Squadron Flight Easter Egg (triggered by pressing 'P') */}
      {planeSquadron && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[1, 2, 3, 4, 5].map((plane) => (
            <div
              key={plane}
              className="absolute text-2xl text-[#FF6A00] animate-planeFlight select-none"
              style={{
                top: `${15 * plane}%`,
                left: '-10%',
                animationDuration: `${1.8 + plane * 0.3}s`,
              }}
            >
              ✈️
            </div>
          ))}
        </div>
      )}

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleQuickScan={toggleQuickRead}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onSupernova={triggerSupernova}
      />

      {/* Resume PDF Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#1C1208] shadow-sticker text-xs font-mono font-bold text-[#1C1208] flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
