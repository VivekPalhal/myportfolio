import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Shuffle, Sparkles, ExternalLink } from 'lucide-react';
import { skillsData, PROFICIENCY_LABELS, Skill, SkillCategory } from '../../content/skills';
import { certificationsData } from '../../content/certifications';

export const SynapsesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | SkillCategory>('all');
  const [peeledId, setPeeledId] = useState<string | null>(null);
  const [scatterAngle, setScatterAngle] = useState<{ [id: string]: number }>({});
  const [flippedCertId, setFlippedCertId] = useState<string | null>(null);

  const filteredSkills = skillsData.filter((skill) =>
    activeFilter === 'all' ? true : skill.category === activeFilter
  );

  // Shake it button to randomize sticker tilt angles
  const handleShake = () => {
    const newAngles: { [id: string]: number } = {};
    skillsData.forEach((s) => {
      newAngles[s.id] = (Math.random() - 0.5) * 16;
    });
    setScatterAngle(newAngles);
  };

  return (
    <section id="stickers" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-[#1C1208]">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] mb-12">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            03 // THE STICKER WALL
          </span>
          <span>·</span>
          <span>SKILLS &amp; HONEST PROFICIENCY</span>
        </div>
        <span>FLAT DIE-CUT STICKERS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1C1208]">
            My sticker collection <br />
            <span className="text-[#FF6A00]">Of tools and craft.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7B6A58] max-w-xl">
            Peel any sticker to see where I used it in real apps and events. No inflated bars: honest 1-4 dot meters.
          </p>
        </div>

        {/* Shake Button */}
        <button
          onClick={handleShake}
          className="px-4 py-2 rounded-xl bg-[#FFF3E3] hover:bg-[#FFC999] text-[#1C1208] border-2 border-[#1C1208] font-bold text-xs shadow-sticker-sm hover:shadow-sticker-pressed flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <Shuffle className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Shake it! (Scatter Stickers)</span>
        </button>
      </div>

      {/* Filter Shelf Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 border-b-2 border-[#1C1208] pb-4">
        {[
          { id: 'all', label: 'All Stickers' },
          { id: 'languages', label: 'Languages' },
          { id: 'cloud-tools', label: 'Cloud & Developer Tools' },
          { id: 'competencies', label: 'People & Architecture' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as 'all' | SkillCategory)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border-2 border-[#1C1208] transition-all ${
              activeFilter === tab.id
                ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                : 'bg-[#FFFDF8] text-[#1C1208] hover:bg-[#FFF3E3] shadow-sticker-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* The Sticker Wall Grid */}
      <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-3xl p-6 sm:p-10 shadow-sticker mb-20 relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => {
            const rot = scatterAngle[skill.id] !== undefined ? scatterAngle[skill.id] : ((idx % 5) - 2) * 2.5;
            const isPeeled = peeledId === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setPeeledId(skill.id)}
                onMouseLeave={() => setPeeledId(null)}
                style={{ transform: `rotate(${rot}deg)` }}
                className={`p-4 rounded-2xl border-2 border-[#1C1208] transition-all duration-200 cursor-pointer select-none relative group ${
                  isPeeled
                    ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-lg scale-105 z-20'
                    : 'bg-[#FFFDF8] text-[#1C1208] shadow-sticker hover:bg-[#FFF3E3]'
                }`}
                data-cursor="PEEL"
              >
                {/* Sticker Dog-Ear Peel Corner */}
                <div
                  className={`absolute top-0 right-0 w-5 h-5 transition-transform duration-200 ${
                    isPeeled
                      ? 'border-b-2 border-l-2 border-[#1C1208] bg-[#FFC999]'
                      : 'border-b-2 border-l-2 border-[#1C1208] bg-[#FFF3E3]'
                  }`}
                  style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
                />

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-base">{skill.name}</h3>

                  {/* 1-4 Dot Meter */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((dot) => (
                      <span
                        key={dot}
                        className={`w-2 h-2 rounded-full border border-[#1C1208] ${
                          dot <= skill.ringScore
                            ? isPeeled
                              ? 'bg-[#FFFDF8]'
                              : 'bg-[#FF6A00]'
                            : isPeeled
                            ? 'bg-[#E24E00]'
                            : 'bg-[#FFF3E3]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs font-mono font-bold mb-3">
                  <span>{PROFICIENCY_LABELS[skill.level]}</span>
                  <span className="opacity-80 font-normal"> · {skill.statusNote}</span>
                </div>

                {/* Peel Reveal Context Note */}
                <div
                  className={`text-xs p-2 rounded-lg border font-mono leading-relaxed transition-colors ${
                    isPeeled
                      ? 'bg-[#E24E00] border-[#FFFDF8]/40 text-[#FFFDF8]'
                      : 'bg-[#FFF3E3] border-[#1C1208]/20 text-[#1C1208]'
                  }`}
                >
                  {skill.context}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications Ticket Marquee */}
      <div className="border-t-2 border-[#1C1208] pt-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono font-bold text-[#FF6A00] uppercase mb-1">
              ⭐ TICKET STUBS // MARQUEE
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1C1208]">
              Certifications &amp; Practical Sim Badges
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#7B6A58] hidden sm:inline">
            CLICK TICKET TO FLIP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.map((cert) => {
            const isFlipped = flippedCertId === cert.id;
            return (
              <div
                key={cert.id}
                onClick={() => setFlippedCertId(isFlipped ? null : cert.id)}
                className={`p-5 rounded-2xl border-2 border-[#1C1208] transition-all cursor-pointer shadow-sticker ${
                  isFlipped
                    ? 'bg-[#FF6A00] text-[#FFFDF8]'
                    : 'bg-[#FFF3E3] hover:bg-[#FFC999] text-[#1C1208]'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-mono font-bold mb-2">
                  <span className={isFlipped ? 'text-[#FFFDF8]' : 'text-[#FF6A00]'}>
                    {cert.issuer}
                  </span>
                  <span>{cert.date}</span>
                </div>

                <h4 className="font-black text-base mb-2 leading-snug">
                  {cert.title}
                </h4>

                <p className={`text-xs leading-relaxed mb-4 ${isFlipped ? 'text-[#FFFDF8]' : 'text-[#7B6A58]'}`}>
                  {cert.summary}
                </p>

                <div className="pt-2 border-t border-current flex items-center justify-between text-xs font-mono font-bold">
                  <span>{isFlipped ? 'Back' : 'Verified'}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
