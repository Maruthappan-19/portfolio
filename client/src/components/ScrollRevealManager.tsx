import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollRevealManager — Cinematic "otherwise full black" line-by-line scroll reveal.
 *
 * Behavior:
 * 1. Content below viewport (or below the fold before scrolling) is strictly PURE BLACK (opacity 0, blur 8px).
 * 2. As the user scrolls down, each element/line enters the reveal zone individually and slowly fades in.
 * 3. With line-by-line delay classes (text-appear-d1, text-appear-d2, delay-100, delay-200),
 *    each heading, subtitle, paragraph, and card reveals one after another.
 * 4. When an element is scrolled back below the viewport, it returns to pure black so subsequent scrolls reveal it again.
 */
export const ScrollRevealManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const elements = document.querySelectorAll<HTMLElement>(
        '.scroll-reveal, .text-appear, .text-scroll-reveal'
      );

      elements.forEach((el) => {
        // Hero elements inside #home are always visible on the homepage
        if (el.closest('#home')) {
          el.classList.add('is-visible');
          return;
        }

        const rect = el.getBoundingClientRect();

        // If at the very top of the homepage without hash: everything below #home is strictly black
        if (pathname === '/' && scrollY < 20 && !hash) {
          el.classList.remove('is-visible');
          return;
        }

        // Within reveal zone: top has entered viewport (with 40px buffer) and bottom is in or above viewport
        const inRevealZone = rect.top < viewportHeight - 40 && rect.bottom > 0;
        const isAboveViewport = rect.bottom <= 0;
        const isBelowViewport = rect.top >= viewportHeight;

        if (inRevealZone || isAboveViewport) {
          el.classList.add('is-visible');
        } else if (isBelowViewport) {
          // Strictly pure black when below the viewport
          el.classList.remove('is-visible');
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkVisibility);
        ticking = true;
      }
    };

    // IntersectionObserver for element-by-element triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.closest('#home')) {
            entry.target.classList.add('is-visible');
            return;
          }

          if (entry.isIntersecting) {
            // Only reveal if user has scrolled past top OR has hash target
            if (pathname !== '/' || window.scrollY >= 20 || hash) {
              entry.target.classList.add('is-visible');
            }
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Below viewport: strictly reset to black
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    const init = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        '.scroll-reveal, .text-appear, .text-scroll-reveal'
      );

      elements.forEach((el) => {
        if (!el.closest('#home')) {
          el.classList.remove('is-visible');
        }
        observer.observe(el);
      });

      checkVisibility();
    };

    // Initialize after DOM paint
    const timer = setTimeout(init, 80);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname, hash]);

  return null;
};
