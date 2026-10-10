import React, { useState } from 'react';
import { X, ExternalLink, Github, Check, Shield, Server, Smartphone, Key, HardDrive, Database } from 'lucide-react';
import { projectsData } from '../../content/projects';

interface SnapShareCaseStudyModalProps {
  onClose: () => void;
}

export const SnapShareCaseStudyModal: React.FC<SnapShareCaseStudyModalProps> = ({ onClose }) => {
  const project = projectsData[0];
  const [activeTab, setActiveTab] = useState<'subway' | 'overview' | 'challenges' | 'roadmap'>('subway');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1208]/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF8] border-3 border-[#1C1208] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-sticker-lg relative my-auto overflow-hidden">
        {/* Top Paper Header Bar */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[#1C1208] bg-[#FFF3E3]">
          <div className="flex items-center gap-3">
            {/* Rubber Stamp Badge */}
            <div className="px-2.5 py-1 rounded bg-[#FF6A00] text-[#FFFDF8] border-2 border-[#1C1208] text-xs font-mono font-bold -rotate-2 shadow-sticker-sm">
              STAMP: IN PROGRESS (68%)
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1C1208]">
                {project.title} — System Architecture
              </h3>
              <p className="text-xs font-mono text-[#7B6A58]">{project.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border-2 border-[#1C1208] bg-[#FFFDF8] hover:bg-[#FFC999] text-[#1C1208] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-[#1C1208] bg-[#FFFDF8] px-5 gap-2 overflow-x-auto text-xs font-mono font-bold">
          {[
            { id: 'subway', label: '🚇 Subway-Map Architecture' },
            { id: 'overview', label: '📋 Problem & Features' },
            { id: 'challenges', label: '⚡ Engineering Challenges' },
            { id: 'roadmap', label: '🗺️ Roadmap Milestones' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-3 border-b-4 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#FF6A00] text-[#FF6A00]'
                  : 'border-transparent text-[#7B6A58] hover:text-[#1C1208]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#1C1208]">
          {/* TAB 1: SUBWAY MAP ARCHITECTURE */}
          {activeTab === 'subway' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-black text-[#1C1208] mb-1">
                  Subway-Map Architecture: How Data Travels
                </h4>
                <p className="text-xs font-mono text-[#7B6A58]">
                  Orange subway lines connect client upload streams, Firebase JWT verification, and Cloud Storage buckets.
                </p>
              </div>

              {/* Subway Line Graphic */}
              <div className="p-6 rounded-2xl bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker-sm relative overflow-hidden">
                {/* Visual Subway Track Line */}
                <div className="relative py-8">
                  <div className="absolute top-1/2 left-4 right-4 h-3 bg-[#FF6A00] -translate-y-1/2 rounded-full border border-[#1C1208]" />

                  {/* Subway Stations */}
                  <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { icon: Smartphone, name: 'Station 1: Client', desc: 'Picker & Upload', code: 'HTML/JS' },
                      { icon: Key, name: 'Station 2: Firebase', desc: 'JWT Token Verify', code: 'Auth 2.0' },
                      { icon: Server, name: 'Station 3: Express', desc: 'MIME Buffers', code: 'Node.js' },
                      { icon: HardDrive, name: 'Station 4: Storage', desc: 'Binary Bucket', code: 'Cloud CDN' },
                      { icon: Database, name: 'Station 5: Mongo', desc: 'Feed Documents', code: 'Atlas DB' },
                    ].map((station, sIdx) => {
                      const Icon = station.icon;
                      return (
                        <div
                          key={sIdx}
                          className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-xl p-3 shadow-sticker-sm flex flex-col items-center text-center z-10"
                        >
                          <div className="w-9 h-9 rounded-full bg-[#FF6A00] border-2 border-[#1C1208] text-[#FFFDF8] flex items-center justify-center mb-2 shadow-sticker-sm">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-xs text-[#1C1208]">{station.name}</div>
                          <div className="text-[10px] text-[#7B6A58]">{station.desc}</div>
                          <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFF3E3] border border-[#1C1208] text-[#FF6A00] font-bold">
                            {station.code}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Train Schedule Explainer */}
                <div className="mt-4 p-4 rounded-xl bg-[#FFFDF8] border-2 border-[#1C1208] text-xs font-mono space-y-1.5">
                  <div className="font-bold text-[#FF6A00] uppercase">
                    🚂 Subway Line Protocols:
                  </div>
                  <div>1. Client acquires verified Firebase Auth token upon Google sign-in.</div>
                  <div>2. FormData buffer transfers via secure Bearer header to Express.js server.</div>
                  <div>3. Middleware checks MIME image signature to reject invalid binaries.</div>
                  <div>4. Image binary streams to Cloud Storage; MongoDB records author, likes, and image URL.</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-black text-[#1C1208] mb-2">The Idea Behind SnapShare</h4>
                <p className="leading-relaxed text-[#7B6A58]">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-base font-black text-[#1C1208] mb-3">Implemented Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] flex items-start gap-2.5 shadow-sticker-sm"
                    >
                      <Check className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-[#1C1208]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHALLENGES */}
          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-[#1C1208]">Real Engineering Problems Solved</h4>
              <div className="space-y-3">
                {project.challenges?.map((chall, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] shadow-sticker-sm space-y-1"
                  >
                    <div className="text-xs font-mono font-bold text-[#FF6A00]">
                      CHALLENGE 0{idx + 1}
                    </div>
                    <p className="text-xs text-[#1C1208] leading-relaxed">{chall}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-[#1C1208]">Production Milestones</h4>
              <div className="space-y-3">
                {project.roadmap?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border-2 border-[#1C1208] flex items-center justify-between text-xs ${
                      item.completed
                        ? 'bg-[#FFFDF8] shadow-sticker-sm text-[#1C1208]'
                        : item.current
                        ? 'bg-[#FFC999] font-bold shadow-sticker text-[#1C1208]'
                        : 'bg-[#FFF3E3] text-[#7B6A58]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full border border-[#1C1208] ${item.completed ? 'bg-[#FF6A00]' : item.current ? 'bg-[#FF6A00] animate-ping' : 'bg-[#FFFDF8]'}`} />
                      <span>{item.milestone}</span>
                    </div>
                    <span className="font-mono text-[11px] uppercase font-bold">
                      {item.completed ? 'COMPLETED' : item.current ? 'IN PROGRESS' : 'QUEUED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t-2 border-[#1C1208] bg-[#FFF3E3] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono font-bold text-[#7B6A58]">
            REPOSITORY: PUBLIC · LICENSE: MIT
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vivekpalhal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] flex items-center gap-2 shadow-sticker-sm transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-xs font-bold text-[#FFFDF8] border-2 border-[#1C1208] shadow-sticker-sm transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
