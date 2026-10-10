import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Flag, Megaphone, CheckCircle2, Award, Sparkles, Send } from 'lucide-react';
import { experienceData, ExperienceItem, ExperienceCategory } from '../../content/experience';

export const SignalPathSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | ExperienceCategory>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = experienceData.filter((item) =>
    filter === 'all' ? true : item.category === filter
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-[#1C1208]">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] mb-12">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            05 // THE ORANGE THREAD
          </span>
          <span>·</span>
          <span>TIMELINE &amp; CAMPUS LEADERSHIP</span>
        </div>
        <span>DRAWN MARKER RIBBON</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1C1208]">
            One orange ribbon, <br />
            <span className="text-[#FF6A00]">Many leadership adventures.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7B6A58] max-w-xl">
            A continuous thread of student mobilization, hackathon promotion, and enterprise consulting problem-solving.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'leadership', label: 'Campus Leadership' },
            { id: 'tech', label: 'Tech & Consulting' },
            { id: 'program', label: 'Cloud Programs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | ExperienceCategory)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-[#1C1208] transition-all ${
                filter === tab.id
                  ? 'bg-[#FF6A00] text-[#FFFDF8] shadow-sticker-pressed'
                  : 'bg-[#FFFDF8] text-[#1C1208] hover:bg-[#FFF3E3] shadow-sticker-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Continuous Marker Ribbon Timeline */}
      <div className="relative border-l-4 border-[#FF6A00] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {filteredItems.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              {/* Push-Pin on Ribbon */}
              <div
                className={`absolute -left-[34px] sm:-left-[50px] top-1.5 w-5 h-5 rounded-full border-2 border-[#1C1208] flex items-center justify-center transition-transform ${
                  item.isCurrent
                    ? 'bg-[#FF6A00] scale-110 shadow-sticker-sm'
                    : 'bg-[#FFF3E3] group-hover:bg-[#FFC999]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C1208]" />
              </div>

              {/* Sticky Note Card */}
              <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-6 shadow-sticker space-y-4 hover:bg-[#FFF3E3]/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1C1208] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-[#1C1208]">
                        {item.role}
                      </h3>
                      {item.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FF6A00] text-[#FFFDF8] border border-[#1C1208] text-[10px] font-mono font-black animate-pulse">
                          NOW
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-[#FF6A00] mt-0.5">
                      {item.org}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B6A58]">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>{item.period}</span>
                    {item.location && <span>· {item.location}</span>}
                  </div>
                </div>

                <p className="text-sm text-[#7B6A58] leading-relaxed">
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 text-xs text-[#1C1208] font-medium">
                  {item.bullets.slice(0, isExpanded ? item.bullets.length : 2).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-black">✦</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Badges */}
                <div className="pt-3 border-t border-[#1C1208]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsApplied.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-[#FFF3E3] border border-[#1C1208] text-[11px] font-mono font-bold text-[#1C1208]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {item.metrics && (
                    <div className="font-mono text-xs font-black text-[#FF6A00] bg-[#FFF3E3] px-2 py-0.5 rounded border border-[#1C1208]">
                      {item.metrics}
                    </div>
                  )}
                </div>

                {item.bullets.length > 2 && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs font-mono font-bold text-[#FF6A00] hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>{isExpanded ? 'Show less' : `Show all ${item.bullets.length} bullets`}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Paper Airplane Marker Tip to Contact */}
        <div className="pt-4 relative">
          <div className="absolute -left-[34px] sm:-left-[50px] top-6 w-5 h-5 rounded-full border-2 border-dashed border-[#FF6A00] bg-[#FFF3E3] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
          </div>

          <div className="p-6 rounded-2xl border-2 border-dashed border-[#FF6A00] bg-[#FFFDF8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sticker-sm">
            <div>
              <div className="text-base font-black text-[#1C1208] flex items-center gap-2">
                <span>Next Station: Software Engineering / Cloud Internship</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFC999] border border-[#1C1208] text-[#1C1208]">
                  2026/27
                </span>
              </div>
              <p className="text-xs text-[#7B6A58] mt-1">
                Looking for an ambitious team where I can build real web architectures and cloud pipelines.
              </p>
            </div>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-bold text-xs border-2 border-[#1C1208] shadow-sticker-sm flex items-center gap-2 whitespace-nowrap transition-all"
            >
              <span>Send Paper Plane</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
