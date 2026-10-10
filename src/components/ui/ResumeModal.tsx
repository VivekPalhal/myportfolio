import React from 'react';
import { X, Printer, ExternalLink } from 'lucide-react';
import { profileData } from '../../content/profile';
import { skillsData, PROFICIENCY_LABELS } from '../../content/skills';
import { projectsData } from '../../content/projects';
import { experienceData } from '../../content/experience';
import { certificationsData } from '../../content/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1208]/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#FFFDF8] border-3 border-[#1C1208] rounded-3xl shadow-sticker-lg flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-[#1C1208] bg-[#FFF3E3] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6A00] border border-[#1C1208]" />
            <span className="text-sm font-black text-[#1C1208]">
              Vivek_Palhal_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] shadow-sticker-sm flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#7B6A58] hover:text-[#1C1208] hover:bg-[#FFC999] transition-colors border border-transparent hover:border-[#1C1208]"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet (Light Paper Sheet) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#FFFDF8] text-[#1C1208]">
          {/* Header */}
          <div className="border-b-2 border-[#1C1208] pb-6">
            <h1 className="text-3xl font-black tracking-tight text-[#1C1208]">
              {profileData.name}
            </h1>
            <p className="text-sm font-mono font-bold text-[#FF6A00] mt-1">
              {profileData.tagline}
            </p>
            <div className="mt-3 text-xs font-mono font-bold text-[#7B6A58] flex flex-wrap gap-x-4 gap-y-1">
              <span>📍 {profileData.location}</span>
              <span>✉️ {profileData.email}</span>
              <span>🔗 linkedin.com/in/vivekpalhal</span>
              <span>💻 github.com/vivekpalhal</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-black text-[#FF6A00] tracking-wider uppercase mb-3">
              EDUCATION
            </h2>
            <div className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-xl p-4 shadow-sticker-sm space-y-1">
              <div className="flex justify-between items-start text-sm font-black text-[#1C1208]">
                <span>{profileData.education.institution}</span>
                <span className="font-mono text-xs font-bold text-[#7B6A58]">{profileData.education.period}</span>
              </div>
              <div className="text-xs text-[#FF6A00] font-bold">
                {profileData.education.degree} in {profileData.education.field}
              </div>
              <div className="text-xs text-[#7B6A58] pt-1 font-medium">
                Semester 1 CGPA: <strong className="text-[#1C1208]">7.54</strong> · Semester 2 CGPA: <strong className="text-[#FF6A00]">8.00</strong> (Upward Trajectory)
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-black text-[#FF6A00] tracking-wider uppercase mb-3">
              TECHNICAL PROJECTS
            </h2>
            <div className="space-y-3">
              {projectsData.map((proj) => (
                <div key={proj.slug} className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-xl p-4 shadow-sticker-sm space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-black text-[#1C1208]">{proj.title}</span>
                    <span className="text-[11px] font-mono font-bold text-[#FF6A00] uppercase">{proj.status}</span>
                  </div>
                  <div className="text-xs text-[#7B6A58] leading-relaxed">
                    {proj.summary}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#1C1208]">
                    <span className="text-[#FF6A00]">Technologies: </span>
                    {proj.stack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Leadership */}
          <div>
            <h2 className="text-xs font-mono font-black text-[#FF6A00] tracking-wider uppercase mb-3">
              LEADERSHIP &amp; EXPERIENCE
            </h2>
            <div className="space-y-3">
              {experienceData.map((item) => (
                <div key={item.id} className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-xl p-4 shadow-sticker-sm space-y-1.5">
                  <div className="flex justify-between items-start text-xs font-black text-[#1C1208]">
                    <span>{item.role} — <span className="text-[#7B6A58] font-normal">{item.org}</span></span>
                    <span className="font-mono text-[#FF6A00]">{item.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#7B6A58] space-y-1">
                    {item.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-mono font-black text-[#FF6A00] tracking-wider uppercase mb-3">
              TECHNICAL SKILLS &amp; PROFICIENCIES
            </h2>
            <div className="bg-[#FFF3E3] border-2 border-[#1C1208] rounded-xl p-4 text-xs font-medium space-y-1.5 shadow-sticker-sm">
              <div>
                <strong className="text-[#1C1208]">Languages: </strong>
                <span className="text-[#7B6A58]">C, Python, C++, HTML5, CSS3, JavaScript (Basic → growing)</span>
              </div>
              <div>
                <strong className="text-[#1C1208]">Cloud &amp; Developer Tools: </strong>
                <span className="text-[#7B6A58]">Google Cloud Platform, Postman, Git, GitHub, VS Code</span>
              </div>
              <div>
                <strong className="text-[#1C1208]">Core Competencies: </strong>
                <span className="text-[#7B6A58]">System Architecture, Project Management, Team Coordination, Event Planning &amp; Management</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-black text-[#FF6A00] tracking-wider uppercase mb-3">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker-sm">
                  <div className="font-black text-[#1C1208]">{cert.title}</div>
                  <div className="text-[11px] text-[#7B6A58] font-mono font-bold">{cert.issuer} ({cert.date})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
