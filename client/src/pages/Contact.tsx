import React, { useState } from 'react';
import { Phone, MapPin, Copy, Check, FileText, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-site mx-auto px-6 md:px-12">
        {/* Header — Matching Jameson Nuss */}
        <div className="max-w-3xl mb-16">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-3">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Get in touch.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Feel free to email me with your questions, project ideas or just to say hello!
            I am currently open to entry-level software engineering and developer opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">Email</span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy address
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-xl md:text-2xl font-bold text-white hover:text-accent transition-colors block mb-2 break-all"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <p className="text-xs text-text-muted">
                Best way to reach me. Typically respond within 24 hours.
              </p>
            </div>

            {/* Phone & Location */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">Phone</h4>
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                    className="text-base font-medium text-white hover:text-accent transition-colors"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">Location</h4>
                  <p className="text-base font-medium text-white">{PORTFOLIO_DATA.personal.location}</p>
                </div>
              </div>
            </div>

            {/* Socials & Resume */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border">
              <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-4">
                Profiles & Credentials
              </h4>
              <div className="space-y-3">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.resumePdf}
                  download
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Download Resume (PDF)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Email Composer */}
          <div className="lg:col-span-7">
            <ContactForm idPrefix="contact-page" />
          </div>
        </div>
      </div>
    </div>
  );
};
