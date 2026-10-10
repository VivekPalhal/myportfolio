import React from 'react';
import { FileText, Mail, Github, Linkedin, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../content/profile';
import { skillsData, PROFICIENCY_LABELS } from '../../content/skills';
import { projectsData } from '../../content/projects';
import { experienceData } from '../../content/experience';
import { certificationsData } from '../../content/certifications';

interface QuickScanViewProps {
  onOpenResume: () => void;
  onExitQuickScan: () => void;
}

export const QuickScanView: React.FC<QuickScanViewProps> = ({ onOpenResume, onExitQuickScan }) => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Recruiter Banner */}
      <div className="p-4 rounded-2xl bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-[#FF6A00] fill-current" />
          <div>
            <div className="text-sm font-black text-[#1C1208]">
              Quick Read Mode Active (Recruiter Fast Track)
            </div>
            <div className="text-xs text-[#7B6A58] font-medium">
              High-density, low-motion summary readable in under 60 seconds.
            </div>
          </div>
        </div>

        <button
          onClick={onExitQuickScan}
          className="px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-bold text-xs border-2 border-[#1C1208] shadow-sticker-sm transition-colors self-start sm:self-auto shrink-0"
        >
          Return to Paper Sun World
        </button>
      </div>

      {/* 1. Header Profile */}
      <div className="border-b-2 border-[#1C1208] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1C1208] tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-base font-bold text-[#FF6A00] font-mono mt-1">
            {profileData.tagline}
          </p>
          <div className="mt-2 text-xs font-mono font-bold text-[#7B6A58] flex flex-wrap items-center gap-3">
            <span>📍 {profileData.location}</span>
            <span>·</span>
            <span className="text-[#FF6A00]">● {profileData.availability}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenResume}
            className="px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-black text-xs border-2 border-[#1C1208] shadow-sticker-sm flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
          </button>
          <a
            href={`mailto:${profileData.email}`}
            className="px-4 py-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] shadow-sticker-sm flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#FF6A00]" />
            <span>Email</span>
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] shadow-sticker-sm text-[#1C1208]"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] shadow-sticker-sm text-[#1C1208]"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. Executive Summary */}
      <div className="space-y-2">
        <h2 className="text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider">
          01 // Executive Summary
        </h2>
        <p className="text-sm text-[#1C1208] leading-relaxed max-w-3xl">
          {profileData.summary}
        </p>
      </div>

      {/* 3. Education & Upward CGPA */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider">
          02 // Education &amp; Upward CGPA
        </h2>
        <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-5 shadow-sticker-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="text-base font-black text-[#1C1208]">
              {profileData.education.institution}
            </div>
            <div className="text-xs text-[#FF6A00] font-mono font-bold mt-0.5">
              {profileData.education.degree} in {profileData.education.field} ({profileData.education.period})
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold border-t sm:border-t-0 sm:border-l-2 border-[#1C1208] pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[#7B6A58] block">Sem 1</span>
              <span className="text-[#1C1208]">7.54 CGPA</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#FF6A00]" />
            <div>
              <span className="text-[#7B6A58] block">Sem 2</span>
              <span className="text-[#FF6A00]">8.00 CGPA (+0.46)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Skills Table */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider">
          03 // Verified Skills (Honest Levels)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-4 shadow-sticker-sm space-y-2">
            <div className="text-xs font-mono font-bold text-[#FF6A00]">Languages</div>
            <div className="space-y-1.5 text-xs font-medium">
              {skillsData.filter(s => s.category === 'languages').map(s => (
                <div key={s.id} className="flex justify-between items-center text-[#1C1208]">
                  <span>{s.name}</span>
                  <span className="text-[#7B6A58] font-mono text-[11px]">{PROFICIENCY_LABELS[s.level]} ({s.ringScore}/4)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-4 shadow-sticker-sm space-y-2">
            <div className="text-xs font-mono font-bold text-[#FF6A00]">Cloud &amp; Tools</div>
            <div className="space-y-1.5 text-xs font-medium">
              {skillsData.filter(s => s.category === 'cloud-tools').map(s => (
                <div key={s.id} className="flex justify-between items-center text-[#1C1208]">
                  <span>{s.name}</span>
                  <span className="text-[#7B6A58] font-mono text-[11px]">{PROFICIENCY_LABELS[s.level]} ({s.ringScore}/4)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-4 shadow-sticker-sm space-y-2">
            <div className="text-xs font-mono font-bold text-[#FF6A00]">Core Competencies</div>
            <div className="space-y-1.5 text-xs font-medium">
              {skillsData.filter(s => s.category === 'competencies').map(s => (
                <div key={s.id} className="flex justify-between items-center text-[#1C1208]">
                  <span>{s.name}</span>
                  <span className="text-[#7B6A58] font-mono text-[11px]">{PROFICIENCY_LABELS[s.level]} ({s.ringScore}/4)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Projects */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider">
          04 // Projects
        </h2>
        <div className="space-y-3">
          {projectsData.slice(0, 2).map((proj) => (
            <div key={proj.slug} className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-5 shadow-sticker-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-base text-[#1C1208]">{proj.title}</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
                  {proj.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#7B6A58] leading-relaxed">{proj.summary}</p>
              <div className="text-[11px] font-mono font-bold text-[#1C1208]">
                <span className="text-[#FF6A00]">Stack: </span>{proj.stack.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Timeline */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider">
          05 // Leadership &amp; Experience
        </h2>
        <div className="space-y-2.5">
          {experienceData.map((item) => (
            <div key={item.id} className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-xl p-4 shadow-sticker-sm">
              <div className="flex justify-between items-center">
                <div className="font-black text-sm text-[#1C1208]">{item.role} — {item.org}</div>
                <div className="text-xs font-mono font-bold text-[#FF6A00]">{item.period}</div>
              </div>
              <p className="text-xs text-[#7B6A58] mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
