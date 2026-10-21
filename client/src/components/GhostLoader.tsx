import React, { useState, useEffect } from 'react';

export const GhostLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Smooth progress counter simulation from 0 to 100%
    const startTime = performance.now();
    const duration = 950; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * 100);
      setProgress(current);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => setLoaded(true), 150);
        setTimeout(() => setRemoved(true), 900);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  if (removed) return null;

  // Path length for SVG "M" monogram: approximately 220 units
  const pathLength = 220;
  const strokeOffset = pathLength - (progress / 100) * pathLength;

  return (
    <div
      className={`ghost-loader fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        loaded ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={loaded}
    >
      {/* Background ambient radial glow pulsing with progress */}
      <div
        className="absolute w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0.2 + (progress / 100) * 0.4 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        {/* Monogram Box with Real-time Animated Path Drawing */}
        <div className="relative w-20 h-20 rounded-2xl bg-[#0d0d0d] border border-surface-border flex items-center justify-center shadow-2xl transition-all duration-500">
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: progress > 80 ? '0 0 45px rgba(189, 167, 115, 0.4)' : 'none',
              border: progress > 90 ? '1px solid rgba(189, 167, 115, 0.6)' : '1px solid transparent',
            }}
          />

          <svg
            className="w-10 h-10 text-accent transition-transform duration-300"
            style={{ transform: progress === 100 ? 'scale(1.06)' : 'scale(1)' }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 74V26L50 52L76 26V74"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: strokeOffset,
                transition: 'stroke-dashoffset 0.05s linear',
              }}
            />
          </svg>
        </div>

        {/* Typographic Label */}
        <div className="text-center">
          <span className="font-serif font-light text-2xl tracking-[0.25em] text-white uppercase block transition-all duration-700">
            Maruthappan M
          </span>
        </div>

        {/* Minimalist 2px Shimmer Progress Line */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-accent transition-all duration-75 ease-out shadow-[0_0_12px_rgba(189,167,115,0.85)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
