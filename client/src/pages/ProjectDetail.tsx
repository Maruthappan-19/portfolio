import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, CheckCircle2, AlertCircle, Layers, Maximize2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ImageModal } from '../components/ImageModal';
import { GithubIcon } from '../components/SocialIcons';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  const projectIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  const project = PORTFOLIO_DATA.projects[projectIndex];

  if (!project) {
    return <Navigate to="/#work" replace />;
  }

  const nextProjectIndex = (projectIndex + 1) % PORTFOLIO_DATA.projects.length;
  const nextProject = PORTFOLIO_DATA.projects[nextProjectIndex];

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20">
      {/* Back button */}
      <div className="max-w-site mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all work
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-site mx-auto px-6 md:px-12 pb-12">
        <div className="max-w-4xl">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-3">
            {project.category}
          </span>
          <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            {project.title}
          </h1>
          <p className="font-serif font-light text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(189,167,115,0.3)]"
              >
                <GithubIcon className="w-4 h-4" /> View GitHub Repository <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-surface-border bg-surface-subtle text-white font-medium text-sm hover:border-accent hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Launch Site <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Metadata Specification Bar — Matching Jameson Nuss case study specs */}
      <section className="max-w-site mx-auto px-6 md:px-12 py-10 border-y border-surface-border bg-surface-subtle/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">Team / Context</h4>
            <p className="text-sm md:text-base font-medium text-white">{project.context}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">Project Role</h4>
            <p className="text-sm md:text-base font-medium text-white">{project.role}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">Implementation Status</h4>
            <p className="text-sm md:text-base font-medium text-accent">{project.status}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">Tech & Tools</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs bg-surface border border-surface-border text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <div className="max-w-site mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column: Problem, Solution & Narrative */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem & Solution */}
            <div className="jameson-card p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border">
              <h2 className="font-serif font-light text-2xl md:text-3xl text-white mb-4">Problem Statement</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {project.problemStatement}
              </p>

              <h2 className="font-serif font-light text-2xl md:text-3xl text-white mb-4">Proposed Solution</h2>
              <p className="text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Architecture & Workflow */}
            <div className="jameson-card p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-accent" />
                <h2 className="font-serif font-light text-2xl md:text-3xl text-white">Technical Architecture & Workflow</h2>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 font-mono text-sm bg-black p-4 rounded-xl border border-surface-border break-words overflow-x-auto">
                {project.architecture}
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">Individual Engineering Contribution</h3>
              <p className="text-text-secondary leading-relaxed">
                {project.contribution}
              </p>
            </div>

            {/* Key Features */}
            <div className="jameson-card p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border">
              <h2 className="font-serif font-light text-2xl md:text-3xl text-white mb-6">Key Engineering Features</h2>
              <ul className="space-y-4">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm md:text-base leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Challenges & Verification Note */}
            <div className="jameson-card p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border">
              <h2 className="font-serif font-light text-2xl md:text-3xl text-white mb-4">Technical Challenges Addressed</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {project.challenges}
              </p>

              <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm text-text-secondary">
                  <span className="font-semibold text-white block mb-0.5">Verification & Implementation Notes</span>
                  {project.verifiedDetails}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Screenshot Gallery with Click to Enlarge */}
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:sticky lg:top-28">
              <h3 className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-4">
                Project Screenshots & Previews
              </h3>
              <p className="text-xs text-text-muted mb-4">Click any screenshot to view in full resolution.</p>

              <div className="space-y-5">
                {project.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage({ src: item.src, caption: item.caption })}
                    className="jameson-card group relative cursor-pointer rounded-jameson overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <div className="jameson-frame">
                      <img
                        src={item.src}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3.5 h-3.5 text-accent" /> Enlarge
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-surface text-[12px] text-text-secondary border-t border-surface-border">
                      {item.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Project Pagination Banner — Matching Jameson Nuss */}
      <section className="max-w-site mx-auto px-6 md:px-12 py-16 border-t border-surface-border">
        <Link
          to={`/work/${nextProject.slug}`}
          className="jameson-card group block p-8 md:p-12 rounded-jameson bg-surface-card border border-surface-border"
        >
          <span className="text-xs uppercase tracking-widest text-text-secondary font-semibold block mb-2">
            Next Project
          </span>
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl text-white group-hover:text-accent transition-colors">
              {nextProject.shortTitle}
            </h3>
            <div className="w-12 h-12 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black transition-all">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
          <p className="font-serif font-light text-lg md:text-xl text-text-secondary mt-2">{nextProject.summary}</p>
        </Link>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          title={project.shortTitle}
          caption={selectedImage.caption}
        />
      )}
    </div>
  );
};
