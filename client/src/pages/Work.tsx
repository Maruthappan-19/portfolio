import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Sparkles, Radio, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

export const Work: React.FC = () => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'nexusguard':
        return <Shield className="w-5 h-5 text-accent" />;
      case 'meshwave':
        return <Radio className="w-5 h-5 text-accent" />;
      case 'snapsense-ai':
        return <Sparkles className="w-5 h-5 text-accent" />;
      default:
        return <Sparkles className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-site mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-14 md:mb-20">
          <h1 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-4">
            Recent{' '}
            <span className="jameson-link text-white">work</span>.
          </h1>
          <p className="font-serif font-light text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed">
            A selection of 3 core projects across backend engineering, distributed hardware communications,
            multilingual information retrieval, and agentic AI systems.
          </p>
        </div>

        {/* 3 Featured Projects Minimized Sleek Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PORTFOLIO_DATA.projects.map((project: Project) => (
            <Link
              key={project.id}
              to={`/work/${project.slug}`}
              className="jameson-card group flex flex-col justify-between rounded-jameson overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <div>
                {/* Minimized Thumbnail Container with 16:9 Widescreen Ratio & Inset Framing */}
                <div className="jameson-frame relative aspect-[16/9] w-full overflow-hidden bg-[#080808] flex items-center justify-center">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-contain object-center p-2 sm:p-2.5 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/80 backdrop-blur-md border border-white/10 text-white">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Meta Content */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {getIcon(project.slug)}
                    <span className="truncate">{project.role}</span>
                  </div>

                  <h2 className="font-serif font-light text-xl md:text-2xl text-white group-hover:text-accent transition-colors mb-2 line-clamp-1">
                    {project.shortTitle}
                  </h2>

                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.summary}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-subtle border border-surface-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[11px] text-text-muted">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                  View case study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* "More work available upon request." callout */}
        <div className="p-8 md:p-12 rounded-jameson bg-surface-card border border-dashed border-surface-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif font-light text-2xl md:text-3xl text-white mb-2">
              More work available{' '}
              <a href="/#contact" className="jameson-link">
                upon request
              </a>
              .
            </h3>
            <p className="text-text-secondary text-sm md:text-base">
              Additional course projects, algorithmic simulations, and code repositories are available to discuss.
            </p>
          </div>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-subtle border border-surface-border text-white text-sm font-medium hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4" /> Get in touch
          </a>
        </div>
      </div>
    </div>
  );
};
