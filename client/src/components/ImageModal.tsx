import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-surface-card border border-surface-border rounded-jameson overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-surface-border bg-surface">
          <div className="min-w-0 pr-3">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate">{title}</h3>
            {caption && <p className="text-xs text-text-secondary mt-0.5 truncate">{caption}</p>}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white p-1 rounded-lg hover:bg-surface-subtle transition-colors"
              title="Open full size in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-text-secondary hover:text-accent hover:bg-surface-subtle transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image View */}
        <div className="overflow-auto p-4 md:p-6 flex items-center justify-center bg-black/60">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[76vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
