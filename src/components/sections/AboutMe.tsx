"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  CalendarDaysIcon,
  CircleCheckBigIcon,
  ArrowUpRightIcon,
  Award,
  Sparkles,
} from "lucide-react";
import { personalInfo, skillCategories } from "@/data/data";
import { useScrollToSection } from "@/hooks/useScrollToSection";

function AnimatedCounter({
  target,
  suffix,
  duration = 1.5,
  parentInView,
}: {
  target: number;
  suffix: string;
  duration?: number;
  parentInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!parentInView || startedRef.current) return;
    startedRef.current = true;

    // Respect user reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * target));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [parentInView, target, duration]);

  const fullText = `${target.toLocaleString("en-IN")}${suffix}`;

  return (
    <span aria-label={fullText}>
      <span aria-hidden="true" className="tabular-nums">
        {count.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span className="sr-only">{fullText}</span>
    </span>
  );
}

// Stable stats config — defined outside the component so the array
// reference never changes between renders.
const statsConfig = [
  {
    icon: CalendarDaysIcon,
    target: personalInfo.totalExperience,
    label: "Years Exp.",
  },
  {
    icon: CircleCheckBigIcon,
    target: personalInfo.totalProjects,
    label: "Projects Done",
  },
] as const;

export default function AboutMe() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Observe when the stats row enters the viewport
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScrollToContact = useScrollToSection("contact");

  // Memoize the active skills array so switching categories doesn't
  // recreate the entire list reference unnecessarily.
  const activeSkills = useMemo(() => skillCategories[activeCategory].skills, [activeCategory]);

  const handleCategorySelect = useCallback((idx: number) => {
    setActiveCategory(idx);
  }, []);

  const currentCategorySlug = skillCategories[activeCategory].category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 transition-colors duration-500 z-10"
    >
      <div className="w-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-14">
          {/* Left Column: Heading, Bio & CTA */}
          <div
            className="flex flex-col justify-between items-start gap-8 w-full lg:w-[45%]"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800 text-blue-600 dark:text-sky-400 text-xs font-bold w-fit">
                <Sparkles size={14} aria-hidden="true" />
                <span>Full Stack &amp; Freelance Engineering</span>
              </div>

              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
              >
                Why{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
                  Work With Me
                </span>
                ?
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {personalInfo.description}
              </p>
            </div>

            <button
              onClick={handleScrollToContact}
              aria-label="Contact Karthikeyan M"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-sky-500/35 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 border border-white/20"
            >
              <span>Contact Me</span>
              <ArrowUpRightIcon
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>

          {/* Right Column: Stats & Categorized Skills */}
          <div className="flex flex-col gap-8 w-full lg:w-[55%]">
            {/* Stats Row */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {statsConfig.map(({ icon: Icon, target, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 dark:border-sky-500/20 p-5 bg-slate-50/80 dark:bg-slate-900/80 flex items-center gap-4 shadow-sm backdrop-blur-md"
                >
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-sky-500 text-white shrink-0 shadow-md"
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                      <AnimatedCounter target={target} suffix="+" parentInView={statsInView} />
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
              {/* Quality Rate */}
              <div className="rounded-2xl border border-slate-200 dark:border-sky-500/20 p-5 bg-slate-50/80 dark:bg-slate-900/80 flex items-center gap-4 shadow-sm backdrop-blur-md">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-sky-500 text-white shrink-0 shadow-md"
                >
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                    <AnimatedCounter target={100} suffix="%" parentInView={statsInView} />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                    Quality Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Categorized Skills Panel */}
            <div
              className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-sky-500/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <h3
                id="skills-heading"
                className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-5 bg-linear-to-b from-blue-600 to-sky-500 rounded-full" aria-hidden="true" />
                Technical Competencies
              </h3>

              {/* Category Pills — horizontal scroll on mobile, wrap on desktop */}
              <div className="relative mb-6">
                {/* Fade-right scroll hint — visible only when content overflows on mobile */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-slate-50/90 dark:from-slate-900/90 to-transparent z-10 lg:hidden"
                />

                <div
                  role="tablist"
                  aria-label="Skill categories"
                  className="flex gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible pb-1 lg:pb-0 scroll-smooth scrollbar-none [-webkit-overflow-scrolling:touch]"
                >
                  {skillCategories.map((cat, idx) => {
                    const CatIcon = cat.icon;
                    const isActive = activeCategory === idx;
                    const tabId = `tab-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                    const panelId = `panel-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

                    return (
                      <button
                        key={cat.category}
                        role="tab"
                        id={tabId}
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleCategorySelect(idx)}
                        className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ease-out cursor-pointer ${
                          isActive
                            ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20 border border-transparent"
                            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400"
                        }`}
                      >
                        <CatIcon size={14} className="shrink-0" aria-hidden="true" />
                        <span className="whitespace-nowrap">{cat.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <hr className="border-slate-200 dark:border-sky-500/20 my-4" aria-hidden="true" />

              {/* Skills Tags Grid */}
              <div
                id={`panel-${currentCategorySlug}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentCategorySlug}`}
                key={activeCategory}
                className="flex flex-wrap gap-2.5 animate-tab-switch"
              >
                {activeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:text-white transition-all duration-150 ease-out border border-slate-200 dark:border-sky-500/20 text-xs sm:text-sm font-semibold hover:-translate-y-0.5 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
