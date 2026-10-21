import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Briefcase,
  User,
  Award,
  Mail,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { WhatsappIcon, LinkedinIcon, GithubIcon } from './SocialIcons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Detect active section if on homepage
      if (location.pathname === '/') {
        const sections = ['home', 'work', 'about', 'experience', 'contact'];
        const scrollPosition = window.scrollY + 160;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open; unlock when closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', targetId: 'home', icon: Home, badge: null },
    { name: 'Work', targetId: 'work', icon: Briefcase, badge: '3 Projects' },
    { name: 'About', targetId: 'about', icon: User, badge: null },
    { name: 'Experience', targetId: 'experience', icon: Award, badge: null },
    { name: 'Certifications', targetId: 'certifications', icon: ShieldCheck, badge: '12 Verified' },
    { name: 'Contact', targetId: 'contact', icon: Mail, badge: null },
  ];

  const handleNavClick = (targetId: string) => {
    // Unlock body scroll immediately before navigating
    document.body.style.overflow = '';
    setIsOpen(false);

    if (targetId === 'certifications') {
      navigate('/certifications');
      return;
    }

    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        // Small timeout allows drawer to unmount and body overflow to reset cleanly
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        window.history.replaceState(null, '', `#${targetId}`);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-black/95 backdrop-blur-xl border-b border-surface-border/80 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-site mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled || isOpen ? 'h-16' : 'h-16 md:h-20'
        }`}
      >
        {/* Monogram Brand */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1 text-left shrink-0 touch-manipulation"
          aria-label="Maruthappan M — Home"
        >
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(189,167,115,0.35)] transition-all duration-300">
            <svg
              className="w-5 h-5 text-accent group-hover:scale-105 transition-transform duration-200"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 74V26L50 52L76 26V74"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 p-1.5 rounded-full bg-surface-card/60 border border-surface-border/40 backdrop-blur-md" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              location.pathname === '/' &&
              (activeSection === item.targetId || (item.targetId === 'home' && (!activeSection || activeSection === 'home')));
            return (
              <button
                type="button"
                key={item.name}
                onClick={() => handleNavClick(item.targetId)}
                className={`relative px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-accent bg-accent/15 border border-accent/40 shadow-[0_0_15px_rgba(189,167,115,0.2)]'
                    : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.name}
              </button>
            );
          })}
          <a
            href={PORTFOLIO_DATA.personal.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full border border-surface-border text-white hover:border-accent hover:text-accent transition-all duration-200 flex items-center gap-1.5 ml-1 bg-surface-subtle"
          >
            Resume <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Medium Screen View: Essential links + Resume + Menu button */}
        <div className="hidden md:flex lg:hidden items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('work')}
            className={`text-sm font-medium transition-colors ${activeSection === 'work' ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
          >
            About
          </button>
          <a
            href={PORTFOLIO_DATA.personal.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border border-surface-border text-accent"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-surface-subtle touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Mobile Menu Burger Button (< 768px) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2.5 rounded-xl text-white bg-surface-subtle/80 border border-surface-border hover:border-accent/60 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent relative z-50 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center shadow-md"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-accent animate-in fade-in duration-150" />
          ) : (
            <Menu className="w-6 h-6 text-white animate-in fade-in duration-150" />
          )}
        </button>
      </div>

      {/* Mobile & Tablet Full-Screen Drawer Menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/98 backdrop-blur-2xl border-t border-surface-border px-5 py-6 flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-200"
          style={{ height: 'calc(100dvh - 4rem)' }}
        >
          {/* Navigation Section Cards (Ultra High Contrast) */}
          <nav className="flex flex-col gap-2.5 pt-2" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.targetId;
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.targetId)}
                  className={`group w-full text-left transition-all py-3.5 px-4 rounded-2xl border flex items-center justify-between touch-manipulation min-h-[56px] shadow-sm ${
                    isActive
                      ? 'bg-accent/15 border-accent text-accent shadow-[0_0_20px_rgba(189,167,115,0.2)]'
                      : 'bg-[#121212] border-surface-border text-white hover:border-accent/40 hover:bg-[#181818] active:bg-[#202020]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isActive
                          ? 'bg-accent text-black border-accent'
                          : 'bg-surface-subtle text-accent border-surface-border group-hover:border-accent/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-base font-semibold tracking-tight transition-colors ${
                        isActive ? 'text-accent' : 'text-white group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-accent text-black border-accent'
                            : 'bg-surface-subtle text-accent border-accent/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? 'text-accent' : 'text-white/40 group-hover:text-white'
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Prominent High-Contrast Resume CTA */}
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-3 py-4 rounded-2xl bg-accent text-black font-bold text-sm hover:bg-accent-hover transition-all touch-manipulation min-h-[52px] shadow-[0_0_25px_rgba(189,167,115,0.35)]"
            >
              <span>View Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>

          {/* Recruiter Quick Connect Card */}
          <div className="mt-6 pt-5 border-t border-surface-border space-y-3">
            <div className="p-4 rounded-2xl bg-[#121212] border border-surface-border flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <p className="text-white font-semibold text-sm truncate">{PORTFOLIO_DATA.personal.name}</p>
                <p className="text-accent text-xs font-mono truncate">{PORTFOLIO_DATA.personal.email}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-black transition-all touch-manipulation min-w-[42px] min-h-[42px] flex items-center justify-center"
                  title="Chat on WhatsApp"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-subtle text-white border border-surface-border hover:border-accent hover:text-accent transition-colors touch-manipulation min-w-[42px] min-h-[42px] flex items-center justify-center"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-subtle text-white border border-surface-border hover:border-accent hover:text-accent transition-colors touch-manipulation min-w-[42px] min-h-[42px] flex items-center justify-center"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
