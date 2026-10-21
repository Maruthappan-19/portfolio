import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  FileText,
  Award,
  CheckCircle,
  Quote,
  Compass,
  Puzzle,
  Languages,
  Star
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Certificate } from '../data/portfolioData';
import { ImageModal } from '../components/ImageModal';

export const About: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-site mx-auto px-6 md:px-12">
        {/* Hero Section: Bio + Profile Image — Matching Jameson Nuss */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-surface-border">
          {/* Profile Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-jameson overflow-hidden border border-surface-border bg-surface-card shadow-2xl group">
              <img
                src={PORTFOLIO_DATA.personal.profilePicWeb}
                alt={PORTFOLIO_DATA.personal.name}
                className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <p className="text-white font-semibold text-base">{PORTFOLIO_DATA.personal.name}</p>
                <p className="text-xs text-text-secondary">{PORTFOLIO_DATA.personal.title}</p>
                <p className="text-xs text-accent mt-1">Open to entry-level software engineering roles</p>
              </div>
            </div>
          </div>

          {/* Bio Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-accent text-xs uppercase tracking-widest font-semibold block">
              About Me
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Hello, I’m {PORTFOLIO_DATA.personal.name}.
            </h1>
            <div className="flex items-center gap-2.5 pb-2">
              <Quote className="w-4 h-4 text-accent/80 shrink-0" />
              <blockquote className="font-serif font-light text-base sm:text-lg text-accent italic">
                "Stay hungry. Stay foolish."
              </blockquote>
              <span className="text-xs text-text-muted font-medium ml-1">— Steve Jobs</span>
            </div>

            <div className="space-y-4 text-base md:text-lg text-text-secondary leading-relaxed">
              {PORTFOLIO_DATA.personal.aboutBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Career Objective Box */}
            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border mt-6">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-accent mb-2">Career Objective</h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                {PORTFOLIO_DATA.personal.objective}
              </p>
            </div>

            {/* Engineering Background & Mindset Box (Exchanged with quote position) */}
            <div className="p-5 rounded-2xl bg-surface-subtle/80 border border-surface-border flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-accent block mb-1">
                  Engineering Mindset & Focus
                </span>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-serif font-light">
                  Engineering background, technical mindset, and career aspirations.
                </p>
              </div>
            </div>

            {/* Resume Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all"
              >
                <FileText className="w-4 h-4" /> View Resume (PDF) <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-surface-border bg-surface-subtle text-white font-medium text-sm hover:border-accent hover:text-accent transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Personal Dimensions: Core Values, Hobbies & Language Proficiency */}
        <section className="py-20 border-b border-surface-border">
          <div className="mb-12">
            <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2">
              Personal Dimensions & Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Values, Pursuits & Fluency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Core Values */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Compass className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-white">Core Values</h3>
                </div>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.coreValues.map((val, idx) => (
                    <div key={idx} className="point-glow flex items-center gap-3 p-3.5 rounded-xl bg-surface-subtle border border-surface-border/60 hover:border-accent/40 transition-colors cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm font-medium text-white">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hobbies & Passions */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Puzzle className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-white">Hobbies & Pursuits</h3>
                </div>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.hobbies.map((hobby, idx) => (
                    <div key={idx} className="point-glow flex items-center gap-3 p-3.5 rounded-xl bg-surface-subtle border border-surface-border/60 hover:border-accent/40 transition-colors cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm font-medium text-white">{hobby.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Proficiency */}
            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Languages className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-white">Language Proficiency</h3>
                </div>
                <div className="space-y-4">
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
              <div className="pt-4 mt-4 border-t border-surface-border/50 text-xs text-text-muted leading-relaxed">
                Able to communicate technical ideas, conduct documentation, and collaborate cross-culturally in both Tamil and English.
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience & Internships Section */}
        <section className="py-20 border-b border-surface-border">
          <div className="mb-12">
            <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2">
              Professional Exposure
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Internships & Hands-On Experience
            </h2>
          </div>

          <div className="space-y-8">
            {PORTFOLIO_DATA.internships.map((internship, idx) => (
              <div
                key={idx}
                className="p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                <div className="md:col-span-4">
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase block mb-1">
                    {internship.period}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{internship.role}</h3>
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
                          category: 'internship' as const
                        })
                      }
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
                    >
                      <Award className="w-3.5 h-3.5" /> View Certificate Preview
                    </button>
                  )}
                </div>

                <div className="md:col-span-8">
                  <ul className="space-y-3">
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
        </section>



        {/* Education & Problem Solving Section */}
        <section className="py-20 border-b border-surface-border grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education */}
          <div>
            <div className="mb-8">
              <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2">
                Academic Background
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">Education</h2>
            </div>

            <div className="space-y-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="p-6 md:p-8 rounded-jameson bg-surface-card border border-surface-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{edu.period}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent">
                      {edu.score}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-text-secondary text-sm font-medium mb-3">{edu.institution}</p>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Solving & DSA Practice */}
          <div>
            <div className="mb-8">
              <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-2">
                Fundamentals
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">Problem-Solving & Coding</h2>
            </div>

            <div className="p-8 rounded-jameson bg-surface-card border border-surface-border space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-surface-border">
                <div>
                  <h4 className="text-2xl font-bold text-white">50+ Problems Solved</h4>
                  <p className="text-text-secondary text-sm">Self-solved on LeetCode & algorithmic platforms</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold">
                  50+
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">
                  Core Problem-Solving Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.problemSolving.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-lg text-xs bg-surface-subtle border border-surface-border text-white"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed pt-2">
                {PORTFOLIO_DATA.problemSolving.focus}
              </p>
            </div>
          </div>
        </section>



        {/* Bundled Certifications & Credentials Banner */}
        <section className="py-20">
          <div className="p-8 md:p-12 rounded-jameson bg-surface-card border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-accent/50 transition-colors">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-surface-subtle border border-surface-border flex items-center justify-center text-accent shrink-0 shadow-[0_0_20px_rgba(189,167,115,0.15)]">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <Link
                    to="/certifications"
                    className="font-serif font-light text-2xl sm:text-3xl text-white hover:text-accent transition-colors flex items-center gap-2"
                  >
                    Certifications & Honors
                    <ArrowUpRight className="w-5 h-5 text-accent" />
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
        </section>


      </div>

      {/* Certificate Modal */}
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

