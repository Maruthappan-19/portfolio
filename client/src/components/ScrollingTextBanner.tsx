import React from 'react';

interface ScrollingTextBannerProps {
  className?: string;
  items?: string[];
  speedSeconds?: number;
}

const DEFAULT_ITEMS = [
  'Java & Python Engineering',
  'LoRa Emergency Mesh',
  'Distributed Systems',
  'Applied AI & LLMs',
  'Embedded Firmware & ESP32',
  'Full-Stack Architecture',
  'Data Structures & Algorithms',
  'FastAPI & Spring Boot',
  'Offline Communication Protocols',
  'Clean Code & Scalable Design'
];

export const ScrollingTextBanner: React.FC<ScrollingTextBannerProps> = ({
  className = '',
  items = DEFAULT_ITEMS,
  speedSeconds = 35
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-surface-border/50 bg-black/40 backdrop-blur-sm py-4 select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      aria-label="Technical focus ticker"
    >
      <div
        className="animate-marquee-track flex items-center gap-8 cursor-default"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {/* Render twice for seamless continuous scroll loop */}
        {[...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-text-secondary hover:text-white transition-colors shrink-0"
          >
            <span className="hover:text-accent transition-colors">{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_rgba(189,167,115,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
