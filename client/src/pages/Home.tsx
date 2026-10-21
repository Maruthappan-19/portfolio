import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Shield,
  Radio,
  Sparkles,
  FileText,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  Copy,
  Check,
  Phone,
  MapPin,
  Quote,
  Compass,
  Puzzle,
  Languages,
  Star
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Certificate, Project } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../components/SocialIcons';
import { ImageModal } from '../components/ImageModal';
import { ContactForm } from '../components/ContactForm';

export const Home: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  // Scroll to hash on route change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  // Stagger hero elements on load; below content managed by ScrollRevealManager
  useEffect(() => {
    const heroElements = document.querySelectorAll('#home .text-appear, #home .scroll-reveal');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, 80 + index * 120);
    });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case 'nexusguard':
        return <Shield className="w-5 h-5 text-accent" />;
      case 'meshwave':
        return <Radio className="w-5 h-5 text-accent" />;
      case 'snapsense-ai':
        return <Sparkles className="w-5 h-5 text-accent" />;
      default:
        return <Code2 className="w-5 h-5 text-accent" />;
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 text-accent fill-accent" />
        ))}
        {hasHalf && (
          <div className="relative w-3.5 h-3.5">
            <Star className="w-3.5 h-3.5 text-accent/30" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-accent/30" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      {/* 1. HERO / CLEAN PROFILE SECTION (#home) */}
      <section id="home" className="max-w-site mx-auto px-6 md:px-12 pt-8 pb-20 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-14">
          {/* Profile Picture — Substantial size proportioned to balance the vertical presence of the intro content */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:w-[420px] xl:w-[450px] shrink-0 text-appear mx-auto lg:mx-0">
            <div className="relative w-full rounded-jameson overflow-hidden border border-surface-border bg-surface-card shadow-2xl group">
              <img
                src={PORTFOLIO_DATA.personal.profilePicWeb}
                alt={PORTFOLIO_DATA.personal.name}
                className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Profile Intro — Jameson Nuss editorial layout and high-contrast typography */}
          <div className="flex-1 min-w-0 space-y-6">
            <div>
              <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-3 text-appear text-appear-d1">
                Software Engineer & Systems Builder
              </span>
              <h1 className="font-serif font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.18] mb-4 text-appear text-appear-d2 break-words">
                Hello, I’m Maruthappan, an Aspiring Software Engineer with a passion for high-performance systems and AI.
              </h1>
              <p className="font-serif font-light text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed text-appear text-appear-d3">
                {PORTFOLIO_DATA.personal.headline}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-subtle border border-surface-border text-xs sm:text-sm text-accent font-medium text-appear text-appear-d4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span>Open to entry-level software & embedded engineering opportunities</span>
            </div>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl text-appear text-appear-d4">
              Passionate about building clean, dependable digital systems—from agentic fraud detection
              and distributed off-grid hardware communication to multilingual semantic search.
            </p>

            {/* Essential Links with Volt Hover */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-appear text-appear-d5">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-[0_0_20px_rgba(189,167,115,0.3)] hover:shadow-[0_0_30px_rgba(189,167,115,0.5)]"
              >
                View Featured Work <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-surface-border bg-surface-subtle text-white font-medium text-sm hover:border-accent hover:text-accent transition-colors duration-200"
              >
                <FileText className="w-4 h-4" /> View Resume (PDF)
              </a>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-surface-border bg-surface-subtle text-white hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-surface-border bg-surface-subtle text-white hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED WORK SECTION (#work) */}
      <section id="work" className="max-w-site mx-auto px-6 md:px-12 py-20 border-t border-surface-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-white text-appear">
              Recent{' '}
              <span className="jameson-link text-white">
                work
              </span>
              .
            </h2>
            <p className="font-serif font-light text-lg md:text-xl text-text-secondary mt-2 max-w-xl leading-relaxed text-appear text-appear-d1">
              A selection of 3 core engineering projects spanning backend systems, distributed hardware communications, and agentic AI.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted text-appear text-appear-d2">
            3 Featured Projects
          </span>
        </div>

        {/* Minimized 3-Project Sleek Grid with SquareRefresh Inset Framing Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PORTFOLIO_DATA.projects.map((project: Project, idx) => (
            <Link
              key={project.id}
              to={`/work/${project.slug}`}
              className={`jameson-card group flex flex-col justify-between rounded-jameson overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent scroll-reveal ${
                idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : ''
              }`}
            >
              <div>
                {/* Minimized Thumbnail Container with 16:9 Widescreen Ratio & Inset Framing */}
                <div className="jameson-frame relative aspect-[16/9] w-full overflow-hidden bg-[#080808] flex items-center justify-center">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
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

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {getProjectIcon(project.slug)}
                    <span className="truncate">{project.role}</span>
                  </div>
                  <h3 className="font-serif font-light text-xl md:text-2xl text-white group-hover:text-accent transition-colors mb-2 line-clamp-1">
                    {project.shortTitle}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.summary}
                  </p>
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

        {/* Callout: "More work available upon request." */}
        <div className="p-8 md:p-10 rounded-jameson bg-surface-card border border-dashed border-surface-border flex flex-col sm:flex-row items-center justify-between gap-6 scroll-reveal">
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-light text-2xl md:text-3xl text-white mb-1">
              More work available{' '}
              <a href="#contact" className="jameson-link">
                upon request
              </a>
              .
            </h4>
            <p className="text-text-secondary text-xs sm:text-sm">
              Additional course modules, algorithmic simulations, and code repositories are available to discuss.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-subtle border border-surface-border text-white text-xs sm:text-sm font-medium hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 3. ABOUT & CAPABILITIES SECTION (#about, includes #skills & #education) */}
      <section id="about" className="max-w-site mx-auto px-6 md:px-12 py-20 border-t border-surface-border">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2 text-appear">
            Narrative & Philosophy
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 text-appear text-appear-d1">
            About me.
          </h2>
          <div className="flex items-center justify-center gap-2.5 text-appear text-appear-d2">
            <Quote className="w-4 h-4 text-accent/80 shrink-0" />
            <blockquote className="font-serif font-light text-lg sm:text-xl text-accent italic">
              "Stay hungry. Stay foolish."
            </blockquote>
            <span className="text-xs text-text-muted font-medium ml-1">— Steve Jobs</span>
          </div>
        </div>

        {/* Full-Width 2-Column Balanced Grid (Eliminates Right-Side Empty Whitespace) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16">
          {/* Left Column (7 cols): Full Narrative Bio */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border scroll-reveal">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-accent block mb-4">
                Personal Background & Journey
              </span>
              <div className="space-y-4 text-base md:text-lg text-text-secondary leading-relaxed font-light">
                {PORTFOLIO_DATA.personal.aboutBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-border/60 flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(189,167,115,0.25)]"
              >
                <FileText className="w-4 h-4" /> View Resume (PDF)
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-surface-border bg-surface-subtle text-white text-xs sm:text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Career Objective + Profile Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Career Objective Card */}
            <div className="p-6 sm:p-8 rounded-jameson bg-surface-card border border-surface-border space-y-3.5 scroll-reveal delay-100 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent">Career Objective</h3>
              </div>
              <p className="text-sm md:text-base text-white/95 leading-relaxed font-serif font-light italic">
                "{PORTFOLIO_DATA.personal.objective}"
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-md text-xs bg-surface-subtle border border-surface-border text-white">
                  Software Engineering
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs bg-surface-subtle border border-surface-border text-white">
                  Embedded Systems
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs bg-surface-subtle border border-surface-border text-white">
                  Backend Systems
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs bg-surface-subtle border border-surface-border text-white">
                  Applied AI
                </span>
              </div>
            </div>

            {/* Engineering Background & Mindset Card (Exchanged with quote position) */}
            <div className="p-5 sm:p-6 rounded-jameson bg-surface-card border border-surface-border hover:border-accent/40 transition-colors flex items-center gap-4 scroll-reveal delay-150">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-accent block mb-1">
                  Engineering Mindset & Focus
                </span>
                <p className="font-serif font-light text-sm sm:text-base text-text-secondary leading-relaxed">
                  Engineering background, technical mindset, and career aspirations.
                </p>
              </div>
            </div>

            {/* Quick Profile Snapshot Card */}
            <div className="p-6 sm:p-8 rounded-jameson bg-surface-card border border-surface-border space-y-4 scroll-reveal delay-200">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                Profile Snapshot
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-surface-border/50">
                  <span className="text-text-muted">Degree</span>
                  <span className="text-white font-medium text-right">B.Tech IT (2023 — 2027)</span>
                </div>
                <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-surface-border/50">
                  <span className="text-text-muted">Institution</span>
                  <span className="text-white font-medium text-right">Saranathan College of Engineering</span>
                </div>
                <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-surface-border/50">
                  <span className="text-text-muted">Academic Score</span>
                  <span className="text-accent font-semibold text-right">CGPA: 8.3 / 10</span>
                </div>
                <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-surface-border/50">
                  <span className="text-text-muted">Location</span>
                  <span className="text-white font-medium text-right">Tiruchirappalli, Tamil Nadu</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-text-muted">Status</span>
                  <span className="text-accent font-semibold text-right">
                    Open to Software & Embedded Roles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Dimensions: Core Values, Hobbies & Language Proficiency */}
        <div className="pt-12 border-t border-surface-border/60 mb-16">
          <div className="mb-8">
            <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-1 text-appear">
              Personal Dimensions & Principles
            </span>
            <h3 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl text-white tracking-tight text-appear text-appear-d1">
              Values, pursuits & fluency.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Core Values Card */}
            <div className="jameson-card p-6 sm:p-7 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between scroll-reveal">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Compass className="w-5 h-5 text-accent" />
                  <h4 className="font-serif font-light text-xl text-white">Core Values</h4>
                </div>
                <div className="space-y-2.5">
                  {PORTFOLIO_DATA.coreValues.map((val, idx) => (
                    <div
                      key={idx}
                      className="point-glow flex items-center gap-3 p-3 rounded-xl bg-surface-subtle border border-surface-border/60 hover:border-accent/40 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm font-medium text-white">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Hobbies & Passions Card */}
            <div className="jameson-card p-6 sm:p-7 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between scroll-reveal delay-150">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Puzzle className="w-5 h-5 text-accent" />
                  <h4 className="font-serif font-light text-xl text-white">Hobbies & Pursuits</h4>
                </div>
                <div className="space-y-2.5">
                  {PORTFOLIO_DATA.hobbies.map((hobby, idx) => (
                    <div
                      key={idx}
                      className="point-glow flex items-center gap-3 p-3 rounded-xl bg-surface-subtle border border-surface-border/60 hover:border-accent/40 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm font-medium text-white">{hobby.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Language Proficiency Card */}
            <div className="jameson-card p-6 sm:p-7 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between scroll-reveal delay-300">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Languages className="w-5 h-5 text-accent" />
                  <h4 className="font-serif font-light text-xl text-white">Language Proficiency</h4>
                </div>
                <div className="space-y-3.5">
                  {PORTFOLIO_DATA.languages.map((lang, idx) => (
                    <div key={idx} className="point-glow p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-light text-base text-white">{lang.name}</span>
                        <div className="flex items-center gap-1 text-accent">
                          {renderStars(lang.rating)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{lang.proficiency}</span>
                        <span className="font-mono text-accent font-semibold">{lang.rating} / 5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-border/50 text-[11px] text-text-muted leading-relaxed">
                Proficient in technical documentation, presentation, and collaborative dialogue in both Tamil and English.
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities (#skills anchor preserved) */}
        <div id="skills" className="pt-12 border-t border-surface-border/60 mb-16">
          <div className="mb-8">
            <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-1 text-appear">
              Technical Capabilities
            </span>
            <h3 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl text-white tracking-tight text-appear text-appear-d1">
              Skills & stack.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <div className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border scroll-reveal">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Code2 className="w-4 h-4 text-accent" />
                <h4 className="font-serif font-light text-lg text-white">Programming Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.programming.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white font-medium hover:border-accent/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border scroll-reveal delay-100">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Briefcase className="w-4 h-4 text-accent" />
                <h4 className="font-serif font-light text-lg text-white">Backend & APIs</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.backend.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white font-medium hover:border-accent/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border scroll-reveal delay-150">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Code2 className="w-4 h-4 text-accent" />
                <h4 className="font-serif font-light text-lg text-white">Databases</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.databases.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white font-medium hover:border-accent/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border scroll-reveal delay-200">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Sparkles className="w-4 h-4 text-accent" />
                <h4 className="font-serif font-light text-lg text-white">AI & Applied Tech</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.aiAndApplied.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white font-medium hover:border-accent/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border lg:col-span-2 scroll-reveal delay-200">
              <div className="flex items-center gap-2.5 mb-3.5">
                <GraduationCap className="w-4 h-4 text-accent" />
                <h4 className="font-serif font-light text-lg text-white">Tools & Computer Science Foundations</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.toolsAndCore.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white font-medium hover:border-accent/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Problem Solving (#education anchor preserved) */}
        <div id="education" className="pt-12 border-t border-surface-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div>
              <div className="mb-6">
                <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-1">
                  Academic Background
                </span>
                <h3 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-tight">Education.</h3>
              </div>

              <div className="space-y-4">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <div key={idx} className="jameson-card p-6 rounded-jameson bg-surface-card border border-surface-border scroll-reveal delay-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">{edu.period}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent">
                        {edu.score}
                      </span>
                    </div>
                    <h4 className="font-serif font-light text-xl text-white mb-1">{edu.degree}</h4>
                    <p className="text-text-secondary text-sm font-medium mb-2">{edu.institution}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-1">
                  Core Fundamentals
                </span>
                <h3 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-tight">Problem solving.</h3>
              </div>

              <div className="jameson-card p-6 md:p-7 rounded-jameson bg-surface-card border border-surface-border space-y-5 scroll-reveal delay-150">
                <div className="flex items-center justify-between pb-5 border-b border-surface-border">
                  <div>
                    <h4 className="font-serif font-light text-2xl text-white">50+ Problems Solved</h4>
                    <p className="text-text-secondary text-xs sm:text-sm">Self-solved on LeetCode & algorithmic platforms</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                    50+
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mb-2.5">
                    Core Problem-Solving Focus
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {PORTFOLIO_DATA.problemSolving.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white hover:border-accent/50 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {PORTFOLIO_DATA.problemSolving.focus}
                </p>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* 4. EXPERIENCE & CREDENTIALS SECTION (#experience, includes #certifications) */}
      <section id="experience" className="max-w-site mx-auto px-6 md:px-12 py-20 border-t border-surface-border">
        <div className="mb-12">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2 text-appear">
            Applied Industry Roles & Credentials
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight text-appear text-appear-d1">
            Experience & credentials.
          </h2>
          <p className="font-serif font-light text-lg md:text-xl text-text-secondary mt-2 text-appear text-appear-d2">
            Completed technical internships, verified certifications, and honors.
          </p>
        </div>

        {/* Technical Internships */}
        <div className="space-y-6 mb-16">
          {PORTFOLIO_DATA.internships.map((internship, idx) => (
            <div
              key={idx}
              className={`jameson-card p-6 md:p-8 rounded-jameson bg-surface-card border border-surface-border grid grid-cols-1 md:grid-cols-12 gap-6 items-start scroll-reveal ${
                idx > 0 ? `delay-${idx * 100}` : ''
              }`}
            >
              <div className="md:col-span-4">
                <span className="text-xs font-semibold text-accent tracking-wider uppercase block mb-1">
                  {internship.period}
                </span>
                <h3 className="font-serif font-light text-2xl text-white mb-1">{internship.role}</h3>
                <p className="text-text-secondary text-sm font-medium">{internship.company}</p>
                {internship.credentialId && (
                  <p className="text-xs text-text-muted mt-2 font-mono">
                    Credential ID: {internship.credentialId}
                  </p>
                )}
                {internship.certificateImage && (
                  <button
                    onClick={() =>
                      setSelectedCert({
                        id: `intern-${idx}`,
                        title: `${internship.role} — ${internship.company}`,
                        issuer: internship.company,
                        date: internship.period,
                        image: internship.certificateImage!,
                        category: 'internship' as const,
                      })
                    }
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                  >
                    <Award className="w-3.5 h-3.5" /> View Certificate
                  </button>
                )}
              </div>

              <div className="md:col-span-8">
                <ul className="space-y-2.5">
                  {internship.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span className="text-text-secondary text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bundled Certifications Navigation Banner (#certifications anchor preserved) */}
        <div id="certifications" className="pt-14 border-t border-surface-border/60">
          <div className="jameson-card p-6 sm:p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border hover:border-accent/50 transition-all duration-300 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-surface-subtle border border-surface-border group-hover:border-accent/60 flex items-center justify-center text-accent shrink-0 shadow-[0_0_20px_rgba(189,167,115,0.15)] transition-colors">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <Link
                      to="/certifications"
                      className="font-serif font-light text-2xl sm:text-3xl text-white group-hover:text-accent transition-colors flex items-center gap-2"
                    >
                      Certifications & Honors
                      <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                      12 Verified Credentials
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                    Verified achievements spanning Generative AI, cloud networking, competitive hackathons, and academic distinctions across NPTEL (98% Elite), Cognizant, and Accenture.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  to="/certifications"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-[0_0_20px_rgba(189,167,115,0.25)] hover:shadow-[0_0_30px_rgba(189,167,115,0.4)]"
                >
                  <span>View All Certifications</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* 8. DEDICATED CONTACT SECTION (#contact) */}
      <section id="contact" className="max-w-site mx-auto px-6 md:px-12 py-20 border-t border-surface-border">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2 text-appear">
            Reach Out
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-4 text-appear text-appear-d1">
            Let’s build together.
          </h2>
          <p className="font-serif font-light text-xl md:text-2xl text-text-secondary leading-relaxed text-appear text-appear-d2">
            Feel free to email me with your questions, project ideas or just to say hello!
            I am currently open to entry-level software engineering and developer opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="jameson-card p-6 md:p-8 rounded-jameson bg-surface-card border border-surface-border scroll-reveal">
              <div className="flex items-center justify-between mb-3">
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
                className="font-serif font-light text-2xl md:text-3xl text-white hover:text-accent transition-colors block mb-2 break-all"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <p className="text-xs text-text-muted">
                Best way to reach me. Typically respond within 24 hours.
              </p>
            </div>

            <div className="jameson-card p-6 md:p-8 rounded-jameson bg-surface-card border border-surface-border space-y-4 scroll-reveal delay-100">
              {/* WhatsApp Direct Connect */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                    <WhatsappIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">WhatsApp</h4>
                    <p className="text-sm font-medium text-white">{PORTFOLIO_DATA.personal.whatsapp}</p>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(37,211,102,0.15)]"
                >
                  Chat <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">Phone</h4>
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-medium text-white hover:text-accent transition-colors"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">Location</h4>
                  <p className="text-sm font-medium text-white">{PORTFOLIO_DATA.personal.location}</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-jameson bg-surface-card border border-surface-border space-y-3 scroll-reveal delay-150">
              <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">
                Profiles & Credentials
              </h4>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <GithubIcon className="w-4 h-4" /> GitHub
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                download
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-surface-border text-white hover:border-accent hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <FileText className="w-4 h-4" /> Download Resume (PDF)
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 scroll-reveal delay-150">
            <ContactForm idPrefix="home-contact" />
          </div>
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <ImageModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          imageSrc={selectedCert.image}
          title={selectedCert.title}
          caption={`${selectedCert.issuer} • ${selectedCert.date}${selectedCert.distinction ? ` — ${selectedCert.distinction}` : ''}`}
        />
      )}
    </div>
  );
};
