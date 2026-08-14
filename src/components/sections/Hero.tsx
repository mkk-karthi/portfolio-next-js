"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Download, MapPin, Code2 } from "lucide-react";
import ClientOnly from "@/components/ui/ClientOnly";
import { typingWords, personalInfo } from "@/data/data";

// Staggered entrance animation
function FadeIn({
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
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full min-h-svh flex items-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[min(700px,80vw)] h-[min(700px,80vw)] rounded-full bg-blue-600/20 blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-32 -right-32 w-[min(600px,70vw)] h-[min(600px,70vw)] rounded-full bg-sky-500/15 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-linear(circle, rgba(56,189,248,0.8) 1px, transparent 1px)",
            backgroundSize: "clamp(32px, 4vw, 60px) clamp(32px, 4vw, 60px)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
        {/* Profile Image — top on mobile, right on desktop */}
        <div className="order-first lg:order-last shrink-0 flex items-center justify-center w-full lg:w-auto">
          <FadeIn
            delay={200}
            className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-85 lg:h-85 xl:w-100 xl:h-100 2xl:w-115 2xl:h-115"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 via-sky-400 to-cyan-300 p-1 shadow-[0_0_70px_rgba(56,189,248,0.35)] animate-float-slow">
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>
            {/* Inner glow backdrop */}
            <div className="absolute inset-2 rounded-full bg-linear-to-br from-blue-600/30 to-sky-500/20 blur-md pointer-events-none" />
            {/* Image Container with matching dark slate-blue backdrop */}
            <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-sky-400/40 bg-linear-to-b from-slate-900 via-slate-950 to-blue-950">
              <Image
                src="/profile.webp"
                alt={`${personalInfo.name} — Senior Full Stack Engineer`}
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 340px, (max-width: 1536px) 400px, 460px"
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Top-right badge */}
            <div className="absolute -top-1 -right-4 bg-slate-900/95 border border-sky-500/40 rounded-2xl px-3 py-1.5 shadow-xl shadow-blue-500/20 flex items-center gap-2 backdrop-blur-md">
              <Code2 size={14} className="text-sky-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                Full Stack
              </span>
            </div>
            {/* Bottom-left badge */}
            <div className="absolute -bottom-2 -left-4 bg-slate-900/95 border border-blue-500/40 rounded-2xl px-3 py-2 shadow-xl shadow-blue-500/15 backdrop-blur-md flex items-center gap-2">
              <span className="text-lg sm:text-2xl font-black text-white leading-none">
                {personalInfo.totalExperience}+
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-tight">
                Years
                <br />
                Exp.
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Text Content — below image on mobile, left on desktop */}
        <div className="order-last lg:order-first flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-7 w-full max-w-2xl mx-auto lg:mx-0">
          {/* Name */}
          <FadeIn delay={0}>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                Hello, I&apos;m
              </span>
              <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-black tracking-tight text-white leading-[1.05]">
                {personalInfo.name.split(" ")[0]}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-sky-400 to-cyan-300">
                  {personalInfo.name.split(" ")[1]}
                </span>
              </h1>
            </div>
          </FadeIn>

          {/* Typing role */}
          <FadeIn delay={150}>
            <div className="h-8 sm:h-10 lg:h-11 flex items-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold">
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
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={400}>
            <ClientOnly>
              <div className="flex flex-row gap-3 justify-center lg:justify-start flex-wrap">
                <a
                  href="/cv.pdf"
                  download={`${personalInfo.name?.replaceAll(" ", "-")}-CV.pdf`}
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
            </ClientOnly>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={530}>
            <div className="flex items-center gap-6 sm:gap-10 pt-1">
              {[
                { value: `${personalInfo.totalExperience}+`, label: "Years Exp." },
                { value: `${personalInfo.totalProjects}+`, label: "Projects Done" },
                { value: personalInfo.clientsSatisfied, label: "Client Satisfaction" },
              ].map((stat, i, arr) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-9 sm:h-11 bg-slate-700/80" />}
                </React.Fragment>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 opacity-30 pointer-events-none">
        <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-linear-to-b from-sky-400 to-transparent" />
      </div>
    </section>
  );
}
