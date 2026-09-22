"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Download, MapPin, Code2, ExternalLink } from "lucide-react";
import { typingWords, personalInfo, heroData } from "@/data/data";
import { useScrollToSection } from "@/hooks/useScrollToSection";

// Staggered entrance animation
const FadeIn = React.memo(function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay === 0) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
});

const heroStats = [
  { value: `${personalInfo.totalExperience}+`, label: "Years Exp." },
  { value: `${personalInfo.totalProjects}+`, label: "Projects Done" },
  { value: personalInfo.clientsSatisfied, label: "Client Satisfaction" },
] as const;

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(typingWords[0]);
  const [isDeleting, setIsDeleting] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(1800);

  const scrollToContact = useScrollToSection("contact");

  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        const next = currentWord.substring(0, currentText.length + 1);
        setCurrentText(next);
        setTypingSpeed(next === currentWord ? 1800 : 80);
        if (next === currentWord) setIsDeleting(true);
      } else {
        const next = currentWord.substring(0, currentText.length - 1);
        setCurrentText(next);
        setTypingSpeed(next === "" ? 400 : 40);
        if (next === "") {
          setIsDeleting(false);
          setCurrentWordIndex((p) => (p + 1) % typingWords.length);
        }
      }
    };
    const t = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(t);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const { firstName, lastName, name, cvFile, cvDownloadName } = personalInfo;
  const { badgeText } = heroData;

  return (
    <section
      id="home"
      className="relative w-full min-h-svh flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 size-96 sm:size-140 rounded-full bg-blue-600/20 blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-32 -right-32 size-80 sm:size-120 rounded-full bg-sky-500/15 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* ── Main Hero Content - fills screen ── */}
      <div className="flex-1 flex items-center w-full">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          {/* Profile Image - top on mobile, right on desktop */}
          <div className="order-first lg:order-last shrink-0 flex items-center justify-center w-full lg:w-auto">
            <FadeIn
              delay={0}
              className="relative size-56 sm:size-72 lg:size-85 xl:size-100 2xl:size-115"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 via-sky-400 to-cyan-300 p-1 shadow-2xl shadow-sky-500/35 animate-float-slow">
                <div className="size-full rounded-full bg-slate-950" />
              </div>
              {/* Inner glow backdrop */}
              <div className="absolute inset-2 rounded-full bg-linear-to-br from-blue-600/30 to-sky-500/20 blur-md pointer-events-none" />
              {/* Image */}
              <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-sky-400/40 bg-linear-to-b from-slate-900 via-slate-950 to-blue-950">
                <Image
                  src="/profile.webp"
                  alt={`${name} - ${personalInfo.status}`}
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 340px, (max-width: 1536px) 400px, 460px"
                  className="object-cover object-top"
                  priority
                  unoptimized
                  fetchPriority="high"
                />
              </div>
              {/* Top-right badge */}
              <div className="absolute -top-1 -right-4 bg-slate-900/95 border border-sky-500/40 rounded-2xl px-3 py-1.5 shadow-xl shadow-blue-500/20 flex items-center gap-2 backdrop-blur-md">
                <Code2 size={14} className="text-sky-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                  {badgeText}
                </span>
              </div>
              {/* Bottom-left badge */}
              <div className="absolute -bottom-2 -left-4 bg-slate-900/95 border border-blue-500/40 rounded-2xl px-3 py-2 shadow-xl shadow-blue-500/15 backdrop-blur-md flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-white leading-none">
                  {personalInfo.totalExperience}+
                </span>
                <span className="text-xs text-slate-400 font-semibold leading-tight">
                  Years
                  <br />
                  Exp.
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Text Content */}
          <div className="order-last lg:order-first flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-7 w-full max-w-2xl mx-auto lg:mx-0">
            <FadeIn delay={0}>
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                  Hello, I&apos;m
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                  {firstName}{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-sky-400 to-cyan-300">
                    {lastName}
                  </span>
                </h1>
              </div>
            </FadeIn>

            {/* Typing role */}
            <FadeIn delay={150}>
              <div className="h-8 sm:h-10 lg:h-11 flex items-center">
                <h2
                  className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold"
                  aria-label={currentText || typingWords[0]}
                >
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-sky-300">
                    {currentText}
                  </span>
                  <span className="ml-0.5 inline-block w-0.5 h-5 sm:h-6 lg:h-7 bg-sky-400 align-middle animate-pulse rounded-full" />
                </h2>
              </div>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={280}>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-medium">
                <MapPin size={13} className="text-sky-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={400}>
              <div className="flex flex-row gap-3 justify-center lg:justify-start flex-wrap">
                <a
                  href={cvFile}
                  download={cvDownloadName}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 shrink-0"
                  />
                  <span>Download CV</span>
                </a>
                <button
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-sky-500/50 text-white font-bold text-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <span>Contact Me</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </button>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={530}>
              <div className="flex items-center gap-6 sm:gap-10 pt-1">
                {heroStats.map((stat, i, arr) => (
                  <React.Fragment key={stat.label}>
                    <div className="text-center lg:text-left">
                      <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-9 sm:h-11 bg-slate-700/80" />}
                  </React.Fragment>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Urgency Banner - full-width strip positioned below the home content ── */}
      <div className="w-full bg-linear-to-r from-blue-950/90 via-slate-900/95 to-sky-950/90 border-t border-b border-sky-500/20 px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-5 backdrop-blur-md z-20 shrink-0">
        {/* Pulsing badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
          </span>
          <span className="text-sky-400 font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap">
            Open to Opportunities
          </span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-slate-700/60 shrink-0" />

        {/* Desktop: full text */}
        <p className="hidden sm:block text-white font-medium text-xs sm:text-sm">
          <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-cyan-300">
            {personalInfo.targetRole}
          </span>
          <span className="text-slate-400 mx-2">·</span>
          <span className="text-slate-300">{personalInfo.primaryTechSummary}</span>
          <span className="text-slate-500 mx-2">|</span>
          <span className="text-slate-300">{personalInfo.locationShort}-Based</span>
          <span className="text-slate-500 mx-2">|</span>
          <span className="text-emerald-400 font-semibold">
            Available: {personalInfo.availability}
          </span>
        </p>

        {/* Mobile: condensed text */}
        <p className="sm:hidden text-slate-300 text-xs text-center leading-tight">
          <span className="font-bold text-sky-300">{personalInfo.targetRole}</span>
          {" · "}
          {personalInfo.locationShort}
          {" · "}
          <span className="text-emerald-400 font-semibold">Available Now</span>
        </p>

        {/* CTA button */}
        <a
          href={cvFile}
          target="_blank"
          rel="noopener noreferrer"
          id="hero-view-resume-btn"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs transition-all duration-200 shadow-md shadow-blue-600/30 hover:scale-105 whitespace-nowrap"
        >
          <ExternalLink size={11} />
          View Full Resume
        </a>
      </div>
    </section>
  );
}
