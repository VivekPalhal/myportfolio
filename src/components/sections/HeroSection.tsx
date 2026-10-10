import React, { useState, useEffect } from 'react';
import { ArrowDown, FileText, Send, Sparkles } from 'lucide-react';
import { profileData } from '../../content/profile';
import { LongShadowText } from '../sun/LongShadow';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const roles = profileData.roles;

  // Split-flap mechanical role board
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFlipping(false);
      }, 250);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      id="origin"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Paper Header Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono font-bold text-[#7B6A58] border-b-2 border-[#1C1208] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            EDITION 01
          </span>
          <span>·</span>
          <span>{profileData.location}</span>
        </div>

        {/* Sunrise status chip */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-[#1C1208] font-bold">{profileData.availability}</span>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="my-auto py-10 relative">
        {/* Decorative Floating Paper Stickers (Doodles) */}
        <div className="hidden sm:block absolute -top-4 right-10 z-10">
          <div className="px-3 py-1.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker rotate-6 hover:rotate-0 transition-transform cursor-grab active:cursor-grabbing select-none text-xs font-bold font-mono">
            ☀️ Good Morning!
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-12 right-24 z-10">
          <div className="px-3 py-1 rounded-full bg-[#FFC999] border-2 border-[#1C1208] shadow-sticker -rotate-6 hover:rotate-0 transition-transform cursor-grab text-xs font-bold text-[#1C1208] select-none">
            ⭐ 100% Flat 2D
          </div>
        </div>

        {/* Lead subhead */}
        <div className="inline-block px-3 py-1 rounded-md bg-[#FFF3E3] border-2 border-[#1C1208] text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sticker-sm">
          👋 Hi, I'm Vivek Palhal
        </div>

        {/* Giant Display Name with Real-Time Sundial Long Shadows */}
        <div className="py-2">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tight leading-[0.88] text-[#1C1208]">
            <div className="overflow-visible">
              <LongShadowText steps={10} shadowColor="#FF6A00">
                VIVEK
              </LongShadowText>
            </div>
            <div className="overflow-visible mt-2 sm:mt-4">
              <LongShadowText steps={10} shadowColor="#FF6A00">
                PALHAL
              </LongShadowText>
            </div>
          </h1>
        </div>

        {/* Split-Flap Airport Mechanical Role Board */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7B6A58]">
            Role:
          </span>
          <div
            className={`inline-block px-4 py-2 bg-[#1C1208] text-[#FFFDF8] rounded-lg border-2 border-[#1C1208] shadow-sticker-sm font-mono text-sm sm:text-lg font-bold transition-transform duration-200 ${
              isFlipping ? 'scale-y-0 opacity-40' : 'scale-y-100 opacity-100'
            }`}
          >
            {roles[roleIndex]}
          </div>
        </div>

        {/* Editorial Short Hook */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#1C1208] leading-relaxed">
          Second-year B.Tech in Artificial Intelligence &amp; Data Science at CSMSS Chh. Shahu College of Engineering.
          Building responsive web apps, mastering cloud pipelines, and bringing student communities together.
        </p>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#deck"
            className="px-6 py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-bold text-sm border-2 border-[#1C1208] shadow-sticker hover:shadow-sticker-pressed transition-all flex items-center gap-2"
            data-cursor="WORK"
          >
            <span>See my work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="px-6 py-3.5 rounded-xl bg-[#FFF3E3] hover:bg-[#FFC999] text-[#1C1208] font-bold text-sm border-2 border-[#1C1208] shadow-sticker hover:shadow-sticker-pressed transition-all flex items-center gap-2"
            data-cursor="RESUME"
          >
            <FileText className="w-4 h-4 text-[#FF6A00]" />
            <span>Resume ↓</span>
          </button>

          <a
            href="#contact"
            className="px-5 py-3 rounded-xl bg-transparent hover:bg-[#FFF3E3] text-[#1C1208] font-bold text-sm transition-colors flex items-center gap-2"
          >
            <span>Say Hello</span>
            <Send className="w-3.5 h-3.5 text-[#FF6A00]" />
          </a>
        </div>
      </div>

      {/* Bottom Scroll Cue with Paper Airplane */}
      <div className="flex items-center justify-between border-t-2 border-[#1C1208] pt-4 text-xs font-mono font-bold text-[#7B6A58]">
        <div className="flex items-center gap-3">
          <span>LAT {profileData.coordinates}</span>
          <span className="hidden sm:inline">· CHHATRAPATI SAMBHAJINAGAR</span>
        </div>

        <a
          href="#desk"
          className="flex items-center gap-2 text-[#1C1208] hover:text-[#FF6A00] transition-colors group"
        >
          <span>EXPLORE THE DESK</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#FF6A00]" />
        </a>
      </div>
    </section>
  );
};
