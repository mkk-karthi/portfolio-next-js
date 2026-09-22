"use client";

import React from "react";
import { FileText, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { services, personalInfo, servicesData } from "@/data/data";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function Services() {
  const { hiringManagerBanner } = servicesData;
  const handleScrollToContact = useScrollToSection("contact");

  return (
    <section
      id="services"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 z-10"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 left-10 size-72 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 size-80 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* ── Section Header ── */}
      <div
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
        data-aos="fade-up"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-sky-500/30 text-blue-600 dark:text-sky-400 text-xs sm:text-sm font-semibold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles size={14} className="opacity-80" />
          <span>Core Expertise Areas</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Employment{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
            Focus
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {personalInfo.corePitch}
        </p>
      </div>

      {/* ── Expertise Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group relative rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/50 p-7 sm:p-8 transition-all duration-300 ease-in-out hover:border-sky-500/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 flex flex-col backdrop-blur-xl overflow-hidden"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/0 to-sky-500/0 group-hover:from-blue-600/3 group-hover:to-sky-500/3 transition-all duration-500 rounded-3xl pointer-events-none" />

              {/* Top Row: Icon & Badge */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="size-13 rounded-2xl bg-linear-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-300 shrink-0">
                  <Icon size={26} />
                </div>

                {service.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 mb-3 leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-6">
                {service.description}
              </p>

              {/* Action row */}
              <div className="flex items-center gap-3 mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/60">
                <a
                  href={personalInfo.cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`service-view-resume-${idx}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/30 shrink-0"
                >
                  <FileText size={14} />
                  View Resume
                </a>
                <button
                  onClick={handleScrollToContact}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-semibold text-sm transition-all duration-200 hover:bg-sky-50 dark:hover:bg-sky-950/30 cursor-pointer group/btn"
                >
                  Contact
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </button>
                <div className="ml-auto">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400/40 group-hover:text-emerald-400 transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Hiring CTA Banner ── */}
      <div
        data-aos="fade-up"
        className="mt-10 rounded-3xl overflow-hidden relative bg-linear-to-br from-blue-900/90 via-slate-900 to-sky-950 border border-sky-400/25 shadow-2xl shadow-blue-950/60"
      >
        {/* Accent line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />
        <div className="absolute -top-16 -right-16 size-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div className="text-left max-w-xl">
            <p className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-2">
              For Hiring Managers
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {hiringManagerBanner.title}
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              {hiringManagerBanner.description}
            </p>
          </div>

          <a
            href={personalInfo.cvFile}
            target="_blank"
            rel="noopener noreferrer"
            id="services-view-resume-cta"
            className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-linear-to-r from-blue-500 to-sky-400 hover:from-blue-400 hover:to-sky-300 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-900/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-700/50 whitespace-nowrap"
          >
            <FileText size={18} />
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
