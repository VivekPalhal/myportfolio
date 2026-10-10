import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, ArrowUp, Sparkles, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../content/profile';
import { LongShadowText } from '../sun/LongShadow';

interface TransmitSectionProps {
  onOpenResume: () => void;
}

export const TransmitSection: React.FC<TransmitSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isFolding, setIsFolding] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF6A00', '#FFC999', '#1C1208', '#FFA21F'],
      });
    } catch {
      // safe
    }

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsFolding(true);

    // Simulate paper plane folding & flight
    setTimeout(() => {
      setIsFolding(false);
      setDelivered(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6A00', '#FFC999', '#FFF3E3'],
        });
      } catch {
        // safe
      }
    }, 1200);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-[#1C1208] bg-[#FFF3E3]/40">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] mb-12">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FFC999] text-[#1C1208] border border-[#1C1208]">
            06 // SEND A PAPER PLANE
          </span>
          <span>·</span>
          <span>CONNECT &amp; COMMENCE</span>
        </div>
        <span>WARM MAILBOX</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Headline with Sun Shadow Underline & Quick Actions */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1C1208] leading-[1.05]">
              Let's build <br />
              <span>Something </span>
              <span className="text-[#FF6A00] inline-block">
                <LongShadowText steps={6} shadowColor="#E24E00">
                  Bright.
                </LongShadowText>
              </span>
            </h2>
            <p className="mt-4 text-base text-[#7B6A58] leading-relaxed max-w-md">
              Have an internship, a hackathon invitation, or a collaboration idea?
              Fold a message into a paper airplane and send it over.
            </p>
          </div>

          {/* Quick Copy Email Box */}
          <div className="bg-[#FFFDF8] border-2 border-[#1C1208] rounded-2xl p-5 shadow-sticker space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7B6A58] block">
              📬 DIRECT INBOX
            </span>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="font-mono text-sm font-bold text-[#1C1208] truncate select-all">
                {profileData.email}
              </span>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-xs font-bold text-[#FFFDF8] border-2 border-[#1C1208] shadow-sticker-sm hover:shadow-sticker-pressed flex items-center justify-center gap-2 transition-all shrink-0"
                data-cursor="COPY"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#FFFDF8]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied ✓' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* External Social Buttons & Resume PDF */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] shadow-sticker-sm flex items-center gap-2 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#FF6A00]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FFC999] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] shadow-sticker-sm flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4 text-[#1C1208]" />
              <span>GitHub</span>
            </a>

            <button
              onClick={onOpenResume}
              className="px-4 py-2.5 rounded-xl bg-[#FFC999] hover:bg-[#FFA21F] border-2 border-[#1C1208] text-xs font-bold text-[#1C1208] shadow-sticker-sm flex items-center gap-2 transition-colors"
              data-cursor="RESUME"
            >
              <FileText className="w-4 h-4 text-[#FF6A00]" />
              <span>Preview Resume (PDF)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Paper Airplane Form */}
        <div className="lg:col-span-6 bg-[#FFFDF8] border-2 border-[#1C1208] rounded-3xl p-6 sm:p-8 shadow-sticker relative">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7B6A58] border-b-2 border-[#1C1208] pb-3 mb-6">
            <span className="flex items-center gap-2 text-[#1C1208]">
              <span>✈️</span>
              <span>NOTEPAPER DISPATCH</span>
            </span>
            <span>AIRMAIL STAMP</span>
          </div>

          {delivered ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FF6A00] border-2 border-[#1C1208] text-[#FFFDF8] flex items-center justify-center mx-auto shadow-sticker animate-bounce">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-[#1C1208]">Paper Plane Delivered!</h3>
              <p className="font-mono text-xs font-bold text-[#FF6A00]">
                &gt; Delivered. I'll read your note and reply soon.
              </p>
              <button
                onClick={() => {
                  setDelivered(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-mono font-bold text-[#1C1208] bg-[#FFF3E3] hover:bg-[#FFC999] border-2 border-[#1C1208] rounded-xl shadow-sticker-sm"
              >
                Fold another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#1C1208] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] focus:bg-[#FFFDF8] focus:border-[#FF6A00] focus:outline-none text-xs text-[#1C1208] placeholder-[#7B6A58] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#1C1208] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] focus:bg-[#FFFDF8] focus:border-[#FF6A00] focus:outline-none text-xs text-[#1C1208] placeholder-[#7B6A58] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#1C1208] mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity, hackathon invite, or coffee chat"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] focus:bg-[#FFFDF8] focus:border-[#FF6A00] focus:outline-none text-xs text-[#1C1208] placeholder-[#7B6A58] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#1C1208] mb-1.5">
                  Your Note *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note on this paper..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF3E3] border-2 border-[#1C1208] focus:bg-[#FFFDF8] focus:border-[#FF6A00] focus:outline-none text-xs text-[#1C1208] placeholder-[#7B6A58] font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isFolding}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-[#FFFDF8] font-black text-sm border-2 border-[#1C1208] shadow-sticker hover:shadow-sticker-pressed flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                data-cursor="FLY"
              >
                <Send className="w-4 h-4" />
                <span>{isFolding ? 'Folding Paper Plane...' : 'Fold & Launch Paper Plane'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Flat Campus Skyline Footer Decoration */}
      <div className="pt-8 border-t-2 border-[#1C1208] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-[#7B6A58]">
        <div className="flex items-center gap-2">
          <span>☀️</span>
          <span>Made by Vivek in Chhatrapati Sambhajinagar · Paper Sun v2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Try pressing [⌘K]</span>
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-[#1C1208] hover:text-[#FF6A00] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF6A00]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
