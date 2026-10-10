import React, { useState } from 'react';
import { BookOpen, Github, ExternalLink, Smartphone, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { projectsData } from '../../content/projects';
import { SnapShareCaseStudyModal } from '../case/SnapShareCaseStudyModal';

export const BuildsSection: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(false);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  const projects = projectsData;

  return (
    <section id="deck" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-[#1C1208] bg-[#FFF3E3]/30">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] mb-12">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            04 // THE DECK
          </span>
          <span>·</span>
          <span>PROJECTS &amp; SYSTEMS</span>
        </div>
        <span>SHUFFLEABLE CARDS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1C1208]">
            Things I've built, <br />
            <span className="text-[#FF6A00]">And things still in the oven.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7B6A58] max-w-xl">
            A deck of physical paper cards and live systems. Click "Explore Case Study" to view the interactive subway map.
          </p>
        </div>

        {/* Deck Navigation Tabs */}
        <div className="flex items-center gap-2">
          {projects.map((proj, idx) => (
            <button
              key={proj.slug}
              onClick={() => setActiveDeckIndex(idx)}
              className={`px-3 py-1.5 rounded-lg border-2 border-[#1C1208] text-xs font-mono font-bold transition-all ${
                activeDeckIndex === idx
                  ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                  : 'bg-[#FFFDF8] text-[#1C1208] hover:bg-[#FFC999] shadow-sticker-sm'
              }`}
            >
              0{idx + 1}. {proj.title}
            </button>
          ))}
        </div>
      </div>

      {/* The Active Project Card Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: SnapShare (Flagship) */}
        <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-3xl p-6 sm:p-8 shadow-sticker flex flex-col justify-between relative group">
          <div>
            <div className="flex items-center justify-between mb-4">
              {/* Rubber Stamp */}
              <span className="px-2.5 py-0.5 rounded bg-[#FF6A00] text-[#FFFDF8] border-2 border-[#1C1208] text-xs font-mono font-black -rotate-3 shadow-sticker-sm">
                IN PROGRESS (68%)
              </span>
              <span className="text-xs font-mono font-bold text-[#7B6A58]">01 / 03</span>
            </div>

            {/* Simulated 3-Phone Frame Mockup (Upload -> Feed -> Profile) */}
            <div className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-2xl p-4 mb-6 shadow-sticker-sm">
              <div className="text-[11px] font-mono font-bold text-[#7B6A58] mb-2 border-b border-[#1C1208]/20 pb-1 flex justify-between">
                <span>📱 SnapShare Mobile UI</span>
                <span className="text-[#FF6A00]">REST + Mongo</span>
              </div>

              {/* 3 mini phone frames */}
              <div className="grid grid-cols-3 gap-2 my-2">
                <div className="bg-[#FFFDF8] border border-[#1C1208] rounded-lg p-2 text-center text-[10px] font-mono shadow-sm">
                  <div className="font-bold text-[#1C1208]">1. Upload</div>
                  <div className="text-[#7B6A58] text-[9px] mt-1">Image Picker</div>
                </div>
                <div className="bg-[#FFFDF8] border border-[#1C1208] rounded-lg p-2 text-center text-[10px] font-mono shadow-sm">
                  <div className="font-bold text-[#FF6A00]">2. Feed</div>
                  <div className="text-[#7B6A58] text-[9px] mt-1">Likes &amp; Snaps</div>
                </div>
                <div className="bg-[#FFFDF8] border border-[#1C1208] rounded-lg p-2 text-center text-[10px] font-mono shadow-sm">
                  <div className="font-bold text-[#1C1208]">3. Profile</div>
                  <div className="text-[#7B6A58] text-[9px] mt-1">Cloud Avatar</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#1C1208] mb-2">SnapShare</h3>
            <p className="text-xs sm:text-sm text-[#7B6A58] leading-relaxed mb-6">
              Instagram/Snapchat-inspired photo sharing web app. Secure Firebase Auth token verification, Node.js/Express multipart pipeline, and MongoDB Atlas persistence.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Node.js', 'Express', 'MongoDB', 'Firebase', 'Cloud Storage'].map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#FFF3E3] border border-[#1C1208] text-[11px] font-mono font-bold text-[#1C1208]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#1C1208] flex items-center gap-3">
            <button
              onClick={() => setSelectedCaseStudy(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-bold text-xs border-2 border-[#1C1208] shadow-sticker-sm hover:shadow-sticker-pressed flex items-center justify-center gap-2 transition-all"
              data-cursor="CASE"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Case Study</span>
            </button>

            <a
              href="https://github.com/vivekpalhal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] shadow-sticker-sm transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-[#1C1208]" />
            </a>
          </div>
        </div>

        {/* Card 2: Paper Sun Portfolio (Meta-Card with Mini Sun) */}
        <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-3xl p-6 sm:p-8 shadow-sticker flex flex-col justify-between relative group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded bg-[#FFF3E3] text-[#1C1208] border-2 border-[#1C1208] text-xs font-mono font-black rotate-2 shadow-sticker-sm">
                STAMP: PRODUCTION (100%)
              </span>
              <span className="text-xs font-mono font-bold text-[#7B6A58]">02 / 03</span>
            </div>

            {/* Inception Mini Sun Preview */}
            <div className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-2xl p-6 mb-6 shadow-sticker-sm flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6A00] border-2 border-[#1C1208] shadow-sticker flex items-center justify-center mb-2 animate-bounce">
                ☀️
              </div>
              <div className="text-xs font-bold font-mono text-[#1C1208]">Paper Sun Engine</div>
              <div className="text-[10px] text-[#7B6A58]">Real-time sundial long shadows</div>
            </div>

            <h3 className="text-2xl font-black text-[#1C1208] mb-2">Paper Sun</h3>
            <p className="text-xs sm:text-sm text-[#7B6A58] leading-relaxed mb-6">
              A light, flat 2D portfolio engineered with zero WebGL and zero slop. Features a cursor that acts as the sun, casting dynamic shadows across typography in real-time.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {['React 19', 'TypeScript', 'Tailwind', 'CSS Sundial', 'SVG Folds'].map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#FFF3E3] border border-[#1C1208] text-[11px] font-mono font-bold text-[#1C1208]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#1C1208] flex items-center gap-3">
            <a
              href="#origin"
              className="flex-1 py-3 px-4 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] text-[#1C1208] font-bold text-xs border-2 border-[#1C1208] shadow-sticker-sm hover:shadow-sticker-pressed flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#FF6A00]" />
              <span>Currently Exploring</span>
            </a>

            <a
              href="https://github.com/vivekpalhal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] shadow-sticker-sm transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-[#1C1208]" />
            </a>
          </div>
        </div>

        {/* Card 3: API Flow Prober / Next Build */}
        <div className="bg-[#FFFDF8] border-2 border-dashed border-[#1C1208] rounded-3xl p-6 sm:p-8 shadow-sticker-sm flex flex-col justify-between relative group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208] text-xs font-mono font-bold">
                IN THE OVEN (45%)
              </span>
              <span className="text-xs font-mono font-bold text-[#7B6A58]">03 / 03</span>
            </div>

            {/* Striped Scanning Orange Bar */}
            <div className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-2xl p-6 mb-6 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-[#FF6A00]">
                &gt; next build loading...
              </div>
              <div className="w-full bg-[#FFFDF8] h-3 rounded-full border border-[#1C1208] overflow-hidden p-0.5">
                <div className="bg-[#FF6A00] h-full w-[45%] rounded-full" />
              </div>
              <div className="text-[10px] text-[#7B6A58] font-mono">Postman Student Expert Suite</div>
            </div>

            <h3 className="text-2xl font-black text-[#1C1208] mb-2">API Flow Prober</h3>
            <p className="text-xs sm:text-sm text-[#7B6A58] leading-relaxed mb-6">
              Automated Newman CLI assertion suite validating REST contracts, JWT headers, and schema integrity for microservices.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Postman', 'JavaScript', 'Newman CLI', 'GCP Run'].map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#FFF3E3] border border-[#1C1208] text-[11px] font-mono font-bold text-[#1C1208]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#1C1208] flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58]">
            <span>STATUS: ACTIVE SPRINT</span>
            <span className="text-[#FF6A00]">COMING SOON</span>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <SnapShareCaseStudyModal onClose={() => setSelectedCaseStudy(false)} />
      )}
    </section>
  );
};
