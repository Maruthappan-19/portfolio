import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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

  // Lock body scroll when mobile drawer is open
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

  const navItems = [
    { name: 'Home', targetId: 'home' },
    { name: 'Work', targetId: 'work' },
    { name: 'About', targetId: 'about' },
    { name: 'Experience', targetId: 'experience' },
    { name: 'Certifications', targetId: 'certifications' },
    { name: 'Contact', targetId: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    if (targetId === 'certifications') {
      navigate('/certifications');
      return;
    }
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
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
          ? 'bg-black/90 backdrop-blur-xl border-b border-surface-border/80 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-site mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Monogram Brand — Clean minimalist icon matching jamesonnuss.com */}
        <button
          onClick={() => handleNavClick('home')}
          className="group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1 text-left shrink-0"
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

        {/* Desktop Navigation — All specific categories cleanly presented with Active Pill */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 p-1.5 rounded-full bg-surface-card/60 border border-surface-border/40 backdrop-blur-md" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              location.pathname === '/' &&
              (activeSection === item.targetId || (item.targetId === 'home' && (!activeSection || activeSection === 'home')));
            return (
              <button
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

        {/* Medium Screen View: Essential links + Resume */}
        <div className="hidden md:flex lg:hidden items-center gap-4">
          <button
            onClick={() => handleNavClick('work')}
            className={`text-sm font-medium transition-colors ${activeSection === 'work' ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
          >
            Work
          </button>
          <button
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
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-surface-subtle"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-surface-subtle focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black/98 backdrop-blur-2xl border-t border-surface-border p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col gap-3 pt-4" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.targetId)}
                  className={`text-left text-lg font-semibold tracking-tight transition-colors py-2 px-3 rounded-xl border flex items-center justify-between ${
                    isActive
                      ? 'bg-accent/15 border-accent/40 text-accent'
                      : 'border-transparent text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
              );
            })}
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 py-3 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-colors"
            >
              View Resume (PDF) <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>

          <div className="py-5 border-t border-surface-border text-text-muted text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">{PORTFOLIO_DATA.personal.name}</p>
                <p className="text-text-muted text-xs">{PORTFOLIO_DATA.personal.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-black transition-all"
                  title="WhatsApp"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-subtle text-white border border-surface-border hover:border-accent hover:text-accent transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-surface-subtle text-white border border-surface-border hover:border-accent hover:text-accent transition-colors"
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
