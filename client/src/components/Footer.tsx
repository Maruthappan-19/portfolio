import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './SocialIcons';
import { LikeButton } from './LikeButton';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-border bg-black text-white pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-site mx-auto">
        {/* Main CTA Section */}
        <div className="max-w-2xl mb-20 scroll-reveal">
          <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 text-white">
            Let’s Build Together
          </h2>
          <p className="font-serif font-light text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
            Feel free to email me with your questions, project ideas or just to say hello!
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(189,167,115,0.25)]"
            >
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-surface-border bg-surface-subtle text-white text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </div>

        {/* Interactive Community Like Section */}
        <div className="mb-16">
          <LikeButton />
        </div>

        {/* Secondary Links & Socials */}
        <div className="pt-12 border-t border-surface-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-text-muted scroll-reveal delay-150">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-3">Connect</h4>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={PORTFOLIO_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-secondary hover:text-[#25D366] transition-colors"
                title="Connect on WhatsApp"
              >
                <WhatsappIcon className="w-4 h-4 text-[#25D366]" /> WhatsApp
              </a>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
              >
                <FileText className="w-4 h-4" /> View Resume (PDF)
              </a>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
