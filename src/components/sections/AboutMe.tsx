"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CalendarDaysIcon,
  CircleCheckBigIcon,
  ArrowUpRightIcon,
  Award,
  Sparkles,
} from "lucide-react";
import { personalInfo, skillCategories } from "@/data/data";

function Counter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let animationFrameId: number;

    const startAnimation = () => {
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing out quad
        const easeProgress = progress * (2 - progress);
        const nextCount = Math.floor(easeProgress * target);

        setCount(nextCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export default function AboutMe() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  useEffect(() => {
    import("aos").then((AOSModule) => {
      AOSModule.default.init({
        duration: 800,
        once: false,
        easing: "ease-out-quad",
        mirror: true,
      });
    });
  }, []);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 transition-colors duration-500 z-10"
    >
      <div className="w-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-14">
          {/* Left Column: Heading, Bio & CTA */}
          <div
            className="flex flex-col justify-between items-start gap-8 w-full lg:w-[45%]"
            data-aos="fade-right"
          >
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800 text-blue-600 dark:text-sky-400 text-xs font-bold w-fit">
                <Sparkles size={14} />
                <span>Full Stack & Freelance Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
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
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-sky-500/35 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-0.5 border border-white/20"
            >
              <span>Contact Me</span>
              <ArrowUpRightIcon
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>

          {/* Right Column: Stats & Categorized Skills */}
          <div className="flex flex-col gap-8 w-full lg:w-[55%]">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full" data-aos="fade-left">
              {[
                {
                  icon: CalendarDaysIcon,
                  val: <><Counter target={personalInfo.totalExperience} duration={1800} />+</>,
                  label: "Years Exp.",
                },
                {
                  icon: CircleCheckBigIcon,
                  val: <><Counter target={personalInfo.totalProjects} duration={1800} />+</>,
                  label: "Projects Done",
                },
                {
                  icon: Award,
                  val: "100%",
                  label: "Quality Rate",
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 dark:border-sky-500/20 p-5 bg-slate-50/80 dark:bg-slate-900/80 flex items-center gap-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-sky-500 text-white shrink-0 shadow-md">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                        {stat.val}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Categorized Skills Panel */}
            <div
              className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-sky-500/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-linear-to-b from-blue-600 to-sky-500 rounded-full" />
                Technical Competencies
              </h3>

              {/* Category Pills Switcher */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skillCategories.map((cat, idx) => {
                  const CatIcon = cat.icon;
                  const isActive = activeCategory === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(idx)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ease-out cursor-pointer ${
                        isActive
                          ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20 border border-transparent"
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400"
                      }`}
                    >
                      <CatIcon size={14} />
                      <span>{cat.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Horizontal Divider Line */}
              <hr className="border-slate-200 dark:border-sky-500/20 my-4" />

              {/* Skills Tags Grid */}
              <div key={activeCategory} className="flex flex-wrap gap-2.5 animate-tab-switch">
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <span
                    key={i}
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
