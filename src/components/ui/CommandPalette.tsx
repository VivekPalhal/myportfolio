import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Mail, Github, Linkedin, Zap, Sun, Compass, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../content/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleQuickScan: () => void;
  onOpenResume: () => void;
  onSupernova: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleQuickScan,
  onOpenResume,
  onSupernova,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setEasterEggMessage(null);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    onClose();
    navigator.clipboard.writeText(profileData.email);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#FF6A00', '#FFC999', '#1C1208'] });
    } catch {
      // safe
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'sec-origin',
      title: 'Navigate: 01 // Origin (Hero)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('origin'),
    },
    {
      id: 'sec-desk',
      title: 'Navigate: 02 // The Desk (About & CGPA)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('desk'),
    },
    {
      id: 'sec-stickers',
      title: 'Navigate: 03 // Stickers (Skills Wall)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('stickers'),
    },
    {
      id: 'sec-deck',
      title: 'Navigate: 04 // The Deck (SnapShare & Subway Map)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('deck'),
    },
    {
      id: 'sec-timeline',
      title: 'Navigate: 05 // The Ribbon (Experience Timeline)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('timeline'),
    },
    {
      id: 'sec-contact',
      title: 'Navigate: 06 // Send Paper Plane (Contact & Mail)',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'act-resume',
      title: 'View / Download Official Resume (PDF)',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-copy-email',
      title: 'Copy Email: vivekpalhal07@gmail.com',
      category: 'Actions',
      icon: Mail,
      action: copyEmail,
    },
    {
      id: 'act-quickscan',
      title: 'Toggle Quick Read Mode',
      category: 'Actions',
      icon: Zap,
      action: () => {
        onClose();
        onToggleQuickScan();
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile (@vivekpalhal)',
      category: 'External',
      icon: Github,
      action: () => {
        onClose();
        window.open(profileData.socials.github, '_blank');
      },
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: Linkedin,
      action: () => {
        onClose();
        window.open(profileData.socials.linkedin, '_blank');
      },
    },
    {
      id: 'act-surprise',
      title: 'Trigger Sun Burst Easter Egg',
      category: 'Delight',
      icon: Sparkles,
      action: () => {
        onClose();
        onSupernova();
      },
    },
  ];

  // Easter eggs detection in query
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q === 'sudo') {
      setEasterEggMessage('vivek is not in the sudoers file. This incident will be reported.');
    } else if (q === 'hire') {
      setEasterEggMessage('Great choice! 🧡 Connecting your invitation...');
      try {
        confetti({ particleCount: 60, spread: 80, colors: ['#FF6A00', '#FFC999', '#FFA21F'] });
      } catch {
        // safe
      }
    } else {
      setEasterEggMessage(null);
    }
  }, [query]);

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#1C1208]/75 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#FFFDF8] border-3 border-[#1C1208] rounded-3xl shadow-sticker-lg overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-2 border-[#1C1208] bg-[#FFF3E3]">
          <Search className="w-5 h-5 text-[#FF6A00]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump... (or try 'hire', 'sudo')"
            className="flex-1 bg-transparent text-sm text-[#1C1208] placeholder-[#7B6A58] focus:outline-none font-mono font-bold"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7B6A58] hover:text-[#1C1208]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Easter Egg Notice */}
        {easterEggMessage && (
          <div className="p-3 bg-[#FFC999] border-b-2 border-[#1C1208] text-xs font-mono font-bold text-[#1C1208] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#1C1208]" />
            <span>&gt; {easterEggMessage}</span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono font-bold text-[#7B6A58]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors border-2 ${
                    isSelected
                      ? 'bg-[#FF6A00] text-[#FFFDF8] border-[#1C1208] shadow-sticker-sm'
                      : 'text-[#1C1208] border-transparent hover:bg-[#FFF3E3]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FFFDF8]' : 'text-[#FF6A00]'}`} />
                    <span className="font-bold">{cmd.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-[#FFFDF8]' : 'text-[#7B6A58]'}`}>
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#FFF3E3] border-t-2 border-[#1C1208] flex items-center justify-between text-[11px] font-mono font-bold text-[#7B6A58]">
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span>[ESC] to close</span>
        </div>
      </div>
    </div>
  );
};
