import React from 'react';

interface SideProgressRailProps {
  activeSection: string;
}

export const SideProgressRail: React.FC<SideProgressRailProps> = ({ activeSection }) => {
  const sections = [
    { id: 'origin', num: '01', label: 'ORIGIN' },
    { id: 'desk', num: '02', label: 'THE DESK' },
    { id: 'stickers', num: '03', label: 'STICKERS' },
    { id: 'deck', num: '04', label: 'THE DECK' },
    { id: 'timeline', num: '05', label: 'TIMELINE' },
    { id: 'contact', num: '06', label: 'CONTACT' },
  ];

  const handleClick = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center py-4"
      aria-label="Section navigation rail"
    >
      {/* Background vertical dotted thread */}
      <div className="absolute top-2 bottom-2 w-0.5 border-l-2 border-dashed border-[#FFC999]" />

      <div className="flex flex-col items-center gap-7 relative">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              title={`${sec.num} ${sec.label}`}
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Sun-dot for active section */}
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 border-[#1C1208] transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FF6A00] scale-125 shadow-sticker-sm'
                    : 'bg-[#FFF3E3] group-hover:bg-[#FFC999]'
                }`}
              />

              {/* Hover label */}
              <div
                className={`absolute right-7 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border border-[#1C1208] ${
                  isActive
                    ? 'opacity-100 text-[#FFFDF8] bg-[#1C1208] shadow-sticker-sm translate-x-0'
                    : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#1C1208] bg-[#FFF3E3]'
                }`}
              >
                {sec.num} · {sec.label}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
