import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LikeButtonProps {
  className?: string;
  variant?: 'badge' | 'card' | 'compact';
}

const STORAGE_KEY = 'maruthappan_genuine_liked_v1';
const LOCAL_COUNT_KEY = 'maruthappan_genuine_like_count_v1';
const BASELINE_LIKES = 13; // Genuine initial count starting at 13
const API_NAMESPACE = 'maruthappan-genuine-site';
const API_KEY = 'likes';

export const LikeButton: React.FC<LikeButtonProps> = ({ className = '', variant = 'card' }) => {
  const [likes, setLikes] = useState<number>(BASELINE_LIKES);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [justLiked, setJustLiked] = useState<boolean>(false);

  useEffect(() => {
    // Clean up old legacy keys that held previous test counts
    try {
      localStorage.removeItem('maruthappan_portfolio_liked');
      localStorage.removeItem('maruthappan_portfolio_like_count');
    } catch {
      // Ignore if localStorage unavailable
    }

    // 1. Check if this visitor already liked in this session/browser
    const savedLiked = localStorage.getItem(STORAGE_KEY) === 'true';
    setHasLiked(savedLiked);

    const cachedCount = localStorage.getItem(LOCAL_COUNT_KEY);
    if (cachedCount) {
      const parsed = parseInt(cachedCount, 10);
      if (!isNaN(parsed) && parsed >= BASELINE_LIKES) {
        setLikes(parsed);
      }
    }

    // 2. Fetch genuine live counter from public API
    const fetchLiveLikes = async () => {
      try {
        const response = await fetch(`https://abacus.jasoncameron.dev/get/${API_NAMESPACE}/${API_KEY}`);
        if (response.ok) {
          const data = await response.json();
          if (typeof data.value === 'number') {
            const genuineTotal = BASELINE_LIKES + data.value;
            setLikes(genuineTotal);
            localStorage.setItem(LOCAL_COUNT_KEY, genuineTotal.toString());
          }
        }
      } catch {
        // Silently preserve baseline/cached count
      }
    };

    fetchLiveLikes();
  }, []);

  const handleLike = async () => {
    if (hasLiked) return;

    // Genuine user click: increment count by exactly 1
    const newCount = likes + 1;
    setHasLiked(true);
    setAnimating(true);
    setJustLiked(true);
    setLikes(newCount);

    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(LOCAL_COUNT_KEY, newCount.toString());

    setTimeout(() => setAnimating(false), 800);
    setTimeout(() => setJustLiked(false), 3000);

    // Record the single genuine hit to the public API
    try {
      await fetch(`https://abacus.jasoncameron.dev/hit/${API_NAMESPACE}/${API_KEY}`);
    } catch {
      // LocalStorage already recorded the increment locally
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleLike}
        disabled={hasLiked}
        aria-label="Like this portfolio"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
          hasLiked
            ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(189,167,115,0.3)] cursor-default'
            : 'bg-surface-subtle border-surface-border text-text-secondary hover:border-accent hover:text-white cursor-pointer active:scale-95'
        } ${className}`}
      >
        <Heart
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            hasLiked ? 'fill-accent text-accent' : ''
          } ${animating ? 'scale-125' : ''}`}
        />
        <span className="text-xs font-semibold tabular-nums">{likes.toLocaleString()}</span>
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 sm:p-8 rounded-jameson bg-surface-card border border-surface-border hover:border-accent/40 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left group">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Community Appreciation
            </span>
          </div>
          <h4 className="font-serif font-light text-xl sm:text-2xl text-white">
            Enjoying this portfolio?
          </h4>
          <p className="text-xs sm:text-sm text-text-secondary max-w-md">
            Click the heart to leave some love. Every genuine visitor's like helps inspire continued engineering!
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg ${
              hasLiked
                ? 'bg-accent text-black shadow-[0_0_25px_rgba(189,167,115,0.4)] cursor-default'
                : 'bg-surface-subtle border border-surface-border hover:border-accent text-white hover:text-accent shadow-[0_0_20px_rgba(0,0,0,0.5)] active:scale-95 cursor-pointer'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-300 ${
                hasLiked ? 'fill-black text-black' : 'text-accent group-hover:scale-110'
              } ${animating ? 'scale-150 animate-bounce' : ''}`}
            />
            <span className="text-sm font-bold tabular-nums">
              {likes.toLocaleString()} {likes === 1 ? 'Like' : 'Likes'}
            </span>
          </button>

          {/* Celebratory toast when liked */}
          {justLiked && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-black text-xs font-bold whitespace-nowrap shadow-xl animate-fade-in flex items-center gap-1">
              <span>❤️ Thank you for the love!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
