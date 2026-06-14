"use client";

import React, { useEffect, useState, useRef } from "react";
import { CalendarDaysIcon, CircleCheckBigIcon, ArrowUpRightIcon } from "lucide-react";
import ClientOnly from "@/components/ui/ClientOnly";
import { skills, personalInfo } from "@/data/data";

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
        { threshold: 0.1 }
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

export default function HireMe() {
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
    <div 
      id="about" 
      className="w-full bg-charcoal-100 dark:bg-neutral-900 rounded-3xl lg:rounded-4xl px-6 py-16 sm:py-20 lg:p-20 transition-colors duration-500 z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
        {/* Left Column: Heading, description & CTA */}
        <div 
          className="flex flex-col justify-between items-start gap-8 w-full lg:w-[45%]"
          data-aos="fade-right"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400">Hire me</span>?
            </h2>

            <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed max-w-none lg:max-w-md transition-colors">
              {personalInfo.description}
            </p>
          </div>

          <ClientOnly>
            <button
              onClick={handleScrollToContact}
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-dark-100 dark:bg-neutral-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 ease-in-out cursor-pointer shadow-md shadow-black/10 border border-transparent dark:border-neutral-700 hover:-translate-y-0.5"
            >
              Hire me
              <ArrowUpRightIcon
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </ClientOnly>
        </div>

        {/* Right Column: Dynamic stats cards and skills tag grid */}
        <div className="flex flex-col gap-8 w-full lg:w-[55%]">
          {/* Stats row */}
          <div 
            className="flex flex-col sm:flex-row gap-6 w-full"
            data-aos="fade-left"
          >
            {/* Experience Card */}
            <div className="group rounded-2xl border border-slate-100 dark:border-neutral-800 px-6 py-5 text-center bg-white dark:bg-neutral-950 transition-all duration-300 ease-in-out hover:border-blue-200 dark:hover:border-sky-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 w-full sm:w-1/2 flex items-center gap-5 justify-start text-left shadow-xs">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-55 dark:bg-neutral-900 shrink-0 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 transition-all duration-300 ease-in-out">
                <CalendarDaysIcon
                  size={24}
                  className="stroke-blue-600 dark:stroke-sky-400 group-hover:stroke-white transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white relative inline-block pr-4 after:content-['+'] after:text-2xl after:absolute after:top-1 after:right-0 leading-none transition-colors">
                  <Counter target={personalInfo.totalExperience} duration={500} />
                </p>
                <p className="text-sm sm:text-base text-slate-500 dark:text-neutral-400 mt-1 font-semibold leading-tight transition-colors">
                  Years of Experience
                </p>
              </div>
            </div>

            {/* Project Card */}
            <div className="group rounded-2xl border border-slate-100 dark:border-neutral-800 px-6 py-5 text-center bg-white dark:bg-neutral-950 transition-all duration-300 ease-in-out hover:border-blue-200 dark:hover:border-sky-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 w-full sm:w-1/2 flex items-center gap-5 justify-start text-left shadow-xs">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-55 dark:bg-neutral-900 shrink-0 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 transition-all duration-300 ease-in-out">
                <CircleCheckBigIcon
                  size={24}
                  className="stroke-blue-600 dark:stroke-sky-400 group-hover:stroke-white transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white relative inline-block pr-4 after:content-['+'] after:text-2xl after:absolute after:top-1 after:right-0 leading-none transition-colors">
                  <Counter target={personalInfo.totalProjects} duration={500} />
                </p>
                <p className="text-sm sm:text-base text-slate-500 dark:text-neutral-400 mt-1 font-semibold leading-tight transition-colors">
                  Project Completed
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Unified Skills tags card */}
          <div 
            className="w-full bg-white dark:bg-neutral-950 border border-slate-100 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-100 dark:hover:border-sky-500/30 transition-all duration-300 shadow-xs"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-neutral-850 pb-3 flex items-center gap-2 transition-colors">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-sky-500 rounded-full" />
              My Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-slate-50/80 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:text-white transition-all duration-300 border border-slate-100 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-sky-500 text-sm font-semibold hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
