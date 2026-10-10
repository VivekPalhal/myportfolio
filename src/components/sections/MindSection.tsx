import React, { useState } from 'react';
import { Laptop, BookOpen, Coffee, MapPin, Sparkles, TrendingUp, Check } from 'lucide-react';
import { profileData } from '../../content/profile';

export const MindSection: React.FC = () => {
  const [activeDeskItem, setActiveDeskItem] = useState<'laptop' | 'notebook' | 'chai' | 'postcard'>('notebook');

  return (
    <section id="desk" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-[#1C1208] bg-[#FFF3E3]/40">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] mb-12">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            02 // THE DESK
          </span>
          <span>·</span>
          <span>ABOUT &amp; EDUCATION</span>
        </div>
        <span>FLAT 2D VIEW FROM ABOVE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Narrative with Highlighter Marker Swipes & Flat Desk Items */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1C1208] leading-tight">
              A sunny desk where <br />
              <span className="text-[#FF6A00]">Software and community meet.</span>
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#1C1208] leading-relaxed">
            <p>
              I am a second-year B.Tech student in{' '}
              <strong className="underline decoration-[#FF6A00] decoration-2 font-bold">
                Artificial Intelligence &amp; Data Science
              </strong>{' '}
              at CSMSS Chh. Shahu College of Engineering in Chhatrapati Sambhajinagar.
            </p>
            <p>
              My desk is filled with code and connection. On any given day, I work on{' '}
              <span className="highlight-marker font-semibold">cloud computing</span> with GCP and{' '}
              <span className="highlight-marker font-semibold">API development</span> in Node.js and Postman.
              At the same time, as an active{' '}
              <span className="highlight-marker font-semibold">campus leader</span>, I coordinate technical workshops
              and hackathons connecting hundreds of engineering peers.
            </p>
          </div>

          {/* Interactive 2D Illustrated Desk Items */}
          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-6 shadow-sticker space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58]">
              <span className="text-[#1C1208] flex items-center gap-1.5">
                <span>🖥️</span>
                <span>DESK OBJECTS // TAP TO INSPECT</span>
              </span>
              <span>FOUR PHYSICAL ARTIFACTS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Laptop */}
              <button
                onClick={() => setActiveDeskItem('laptop')}
                className={`p-3 rounded-xl border-2 border-[#1C1208] text-center transition-all ${
                  activeDeskItem === 'laptop'
                    ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                    : 'bg-[#FFF3E3] hover:bg-[#FFC999] shadow-sticker-sm text-[#1C1208]'
                }`}
              >
                <div className="text-2xl mb-1">💻</div>
                <div className="text-xs font-bold font-mono">Laptop</div>
              </button>

              {/* Notebook */}
              <button
                onClick={() => setActiveDeskItem('notebook')}
                className={`p-3 rounded-xl border-2 border-[#1C1208] text-center transition-all ${
                  activeDeskItem === 'notebook'
                    ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                    : 'bg-[#FFF3E3] hover:bg-[#FFC999] shadow-sticker-sm text-[#1C1208]'
                }`}
              >
                <div className="text-2xl mb-1">📓</div>
                <div className="text-xs font-bold font-mono">Notebook</div>
              </button>

              {/* Chai */}
              <button
                onClick={() => setActiveDeskItem('chai')}
                className={`p-3 rounded-xl border-2 border-[#1C1208] text-center transition-all ${
                  activeDeskItem === 'chai'
                    ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                    : 'bg-[#FFF3E3] hover:bg-[#FFC999] shadow-sticker-sm text-[#1C1208]'
                }`}
              >
                <div className="text-2xl mb-1">☕</div>
                <div className="text-xs font-bold font-mono">Hot Chai</div>
              </button>

              {/* Postcard */}
              <button
                onClick={() => setActiveDeskItem('postcard')}
                className={`p-3 rounded-xl border-2 border-[#1C1208] text-center transition-all ${
                  activeDeskItem === 'postcard'
                    ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                    : 'bg-[#FFF3E3] hover:bg-[#FFC999] shadow-sticker-sm text-[#1C1208]'
                }`}
              >
                <div className="text-2xl mb-1">📮</div>
                <div className="text-xs font-bold font-mono">Postcard</div>
              </button>
            </div>

            {/* Desk Item Inspector Sheet */}
            <div className="p-4 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] text-xs font-mono text-[#1C1208]">
              {activeDeskItem === 'laptop' && (
                <div>
                  <div className="font-bold text-sm text-[#FF6A00] mb-1">
                    &gt; VS Code + Git + Node Terminal
                  </div>
                  <p>
                    Writing clean modular code in C, Python, JavaScript, and building SnapShare image streams.
                  </p>
                </div>
              )}
              {activeDeskItem === 'notebook' && (
                <div>
                  <div className="font-bold text-sm text-[#FF6A00] mb-1">
                    &gt; CSMSS Chh. Shahu College of Engineering
                  </div>
                  <p>
                    B.Tech AI &amp; Data Science (2025–2029). Class representative, technical notes, and system architecture sketches.
                  </p>
                </div>
              )}
              {activeDeskItem === 'chai' && (
                <div>
                  <div className="font-bold text-sm text-[#FF6A00] mb-1">
                    &gt; Powered by Masala Chai
                  </div>
                  <p>
                    Fueling late-night hackathon preparations, cultural fest committee meetings, and deep debugging sessions.
                  </p>
                </div>
              )}
              {activeDeskItem === 'postcard' && (
                <div>
                  <div className="font-bold text-sm text-[#FF6A00] mb-1">
                    &gt; Postmarked: Chhatrapati Sambhajinagar
                  </div>
                  <p>
                    Historic heritage city of Maharashtra, India (19.8762° N, 75.3433° E). Heart of student engineering talent.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: CGPA Growing Plant & Ticket Stubs */}
        <div className="lg:col-span-5 space-y-6">
          {/* CGPA Growing Plant Card */}
          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-6 shadow-sticker space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] border-b-2 border-[#1C1208] pb-3">
              <span className="flex items-center gap-1.5 text-[#1C1208]">
                <span>🌱</span>
                <span>CGPA "GROWING PLANT"</span>
              </span>
              <span className="text-[#FF6A00] font-black">+0.46 TRAJECTORY</span>
            </div>

            {/* Flat SVG Sprout Illustration */}
            <div className="py-4 flex flex-col items-center">
              <svg className="w-full h-36 overflow-visible" viewBox="0 0 280 120">
                {/* Desk Surface Line */}
                <line x1="10" y1="105" x2="270" y2="105" stroke="#1C1208" strokeWidth="3" strokeLinecap="round" />

                {/* Pot 1 (Sem 1) */}
                <path d="M 50,105 L 55,80 L 85,80 L 90,105 Z" fill="#FFC999" stroke="#1C1208" strokeWidth="2.5" />
                {/* Sprout 1 */}
                <path d="M 70,80 Q 60,60 70,52 Q 80,60 70,80" fill="#FFA21F" stroke="#1C1208" strokeWidth="2" />
                <text x="70" y="42" fill="#1C1208" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  7.54
                </text>
                <text x="70" y="118" fill="#7B6A58" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Sem 1
                </text>

                {/* Pot 2 (Sem 2 - Taller with Orange Fruit!) */}
                <path d="M 140,105 L 145,80 L 175,80 L 180,105 Z" fill="#FF6A00" stroke="#1C1208" strokeWidth="2.5" />
                {/* Stem 2 */}
                <path d="M 160,80 Q 155,45 160,25" fill="none" stroke="#1C1208" strokeWidth="3" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M 160,50 Q 140,40 148,55 Q 160,50 160,50" fill="#FFA21F" stroke="#1C1208" strokeWidth="2" />
                <path d="M 160,40 Q 180,30 172,45 Q 160,40 160,40" fill="#FFA21F" stroke="#1C1208" strokeWidth="2" />
                {/* Orange Fruit */}
                <circle cx="160" cy="20" r="10" fill="#FF6A00" stroke="#1C1208" strokeWidth="2.5" />
                <text x="160" y="7" fill="#1C1208" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                  8.00 ⭐
                </text>
                <text x="160" y="118" fill="#1C1208" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  Sem 2
                </text>

                {/* Pot 3 (Sem 3 - Future dotted pot) */}
                <path d="M 230,105 L 235,80 L 265,80 L 270,105 Z" fill="#FFF3E3" stroke="#1C1208" strokeWidth="2" strokeDasharray="3 3" />
                <text x="250" y="96" fill="#7B6A58" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Sem 3-8
                </text>
                <text x="250" y="118" fill="#7B6A58" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Future
                </text>
              </svg>

              <div className="mt-2 text-xs font-mono font-bold text-center text-[#1C1208]">
                "Still growing" — Consistent semester-over-semester acceleration.
              </div>
            </div>
          </div>

          {/* Perforated Stat Tickets */}
          <div className="grid grid-cols-2 gap-3">
            {profileData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-xl p-3.5 shadow-sticker-sm relative overflow-hidden"
              >
                {/* Little ticket punch hole on left */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FFF3E3] border-2 border-[#1C1208]" />

                <div className="text-2xl sm:text-3xl font-black font-mono text-[#FF6A00] pl-2">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#1C1208] pl-2 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-[#7B6A58] pl-2">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
