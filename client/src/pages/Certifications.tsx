import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Maximize2,
  ShieldCheck,
  Trophy,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Certificate } from '../data/portfolioData';
import { ImageModal } from '../components/ImageModal';

type FilterCategory = 'all' | 'internship' | 'industry' | 'hackathon' | 'academic';

export const Certifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories: { key: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Credentials', icon: <Award className="w-3.5 h-3.5" /> },
    { key: 'internship', label: 'Internships', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { key: 'industry', label: 'Industry & Contests', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { key: 'hackathon', label: 'Hackathons', icon: <Trophy className="w-3.5 h-3.5" /> },
    { key: 'academic', label: 'Academic & NPTEL', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ];

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'all') return PORTFOLIO_DATA.certificates;
    return PORTFOLIO_DATA.certificates.filter((cert) => cert.category === activeFilter);
  }, [activeFilter]);

  const getCategoryCount = (cat: FilterCategory) => {
    if (cat === 'all') return PORTFOLIO_DATA.certificates.length;
    return PORTFOLIO_DATA.certificates.filter((c) => c.category === cat).length;
  };

  const getCategoryBadge = (category: Certificate['category']) => {
    switch (category) {
      case 'internship':
        return { label: 'Internship', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'hackathon':
        return { label: 'Hackathon', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      case 'industry':
        return { label: 'Industry', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'academic':
        return { label: 'Academic', color: 'bg-accent/15 text-accent border-accent/30' };
      default:
        return { label: 'Credential', color: 'bg-surface-subtle text-text-secondary border-surface-border' };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 sm:pt-32 pb-24">
      <div className="max-w-site mx-auto px-6 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/#experience"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-3">
            Verified Industry Credentials & Honors
          </span>
          <h1 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl text-white tracking-tight mb-4">
            Certifications.
          </h1>
          <p className="font-serif font-light text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed">
            A comprehensive record of {PORTFOLIO_DATA.certificates.length} verified credentials spanning Generative AI,
            cloud networking, competitive hackathons, and high-percentile academic distinctions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 pb-4 border-b border-surface-border/60">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.key);
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent text-black font-semibold shadow-[0_0_20px_rgba(189,167,115,0.3)]'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:border-accent/50 hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-surface-subtle text-text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mb-20">
          {filteredCerts.map((cert) => {
            const badge = getCategoryBadge(cert.category);
            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="jameson-card group cursor-pointer flex flex-col justify-between rounded-jameson bg-surface-card border border-surface-border hover:border-accent/50 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div>
                  {/* Thumbnail Frame */}
                  <div className="jameson-frame relative aspect-[16/10] w-full bg-[#080808] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <div className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/20 shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5 text-accent" />
                        <span>Inspect Full Document</span>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="font-medium text-text-secondary truncate pr-2">{cert.issuer}</span>
                      <span className="shrink-0">{cert.date}</span>
                    </div>

                    <h3 className="font-serif font-light text-lg sm:text-xl text-white group-hover:text-accent transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {cert.distinction && (
                      <p className="text-xs sm:text-sm text-accent/95 leading-relaxed pt-0.5">
                        {cert.distinction}
                      </p>
                    )}
                  </div>
                </div>

                {cert.credentialId && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-surface-border/40 text-[11px] font-mono text-text-muted flex items-center justify-between">
                    <span>ID: {cert.credentialId}</span>
                    <span className="text-accent group-hover:underline inline-flex items-center gap-1 text-[11px] font-sans">
                      Verify <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Connect / Contact */}
        <div className="p-8 md:p-12 rounded-jameson bg-surface-card border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white">
              Need verified credential validation?
            </h3>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              All certificates and project demonstrations are available for verification during recruitment and interviews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(189,167,115,0.25)]"
            >
              <Mail className="w-4 h-4" /> Get in Touch
            </Link>
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-surface-border bg-surface-subtle text-white font-medium text-sm hover:border-accent hover:text-accent transition-colors"
            >
              View Resume (PDF) <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Full Resolution Interactive Image Modal */}
      {selectedCert && (
        <ImageModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          imageSrc={selectedCert.image}
          title={selectedCert.title}
          caption={`${selectedCert.issuer} • ${selectedCert.date}${
            selectedCert.distinction ? ` — ${selectedCert.distinction}` : ''
          }`}
        />
      )}
    </div>
  );
};

export default Certifications;
