"use client";

import { useState } from "react";
import "aos/dist/aos.css";
import { experiences, education } from "@/data/data";
import { CheckCircle2, Briefcase, GraduationCap } from "lucide-react";

export default function WorkExperience() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const activeItems = activeTab === "work" ? experiences : education;

  return (
    <section
      id="experience"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-hidden"
    >
      <div
        className="w-full flex flex-col items-center justify-center text-center mb-8"
        data-aos="fade-up"
      >
        <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
          Professional{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
            Journey
          </span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl">
          Proven track record delivering full-stack enterprise solutions and scalable web
          infrastructure.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="w-full flex justify-center mb-8" data-aos="fade-up">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-sky-500/20 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 ease-out cursor-pointer ${
              activeTab === "work"
                ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Briefcase size={16} />
            <span>Work Experience</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 ease-out cursor-pointer ${
              activeTab === "education"
                ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GraduationCap size={18} />
            <span>Education</span>
          </button>
        </div>
      </div>

      {/* Timeline Items */}
      <div
        className="w-full flex flex-col items-stretch animate-tab-switch space-y-8"
        key={activeTab}
      >
        {activeItems.map((item, index) => {
          const isWork = "company" in item;
          const title = isWork ? item.role : item.title;
          const institution = isWork ? item.company : item.school;
          const duration = item.duration;
          const desc = item.desc;
          const highlights = isWork ? item.highlights : undefined;
          const techStack = isWork ? item.techStack : undefined;

          return (
            <div
              key={index}
              className="group relative flex flex-col lg:flex-row items-stretch justify-between gap-6 p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 backdrop-blur-xl shadow-xl hover:border-sky-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Left Column: Company & Duration */}
              <div className="w-full lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-sky-950/80 text-blue-600 dark:text-sky-400 font-bold text-xs mb-2 border border-blue-200 dark:border-sky-800">
                    {duration}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {institution}
                  </h3>
                </div>

                {techStack && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Role Title, Summary & Key Achievements */}
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
                    {title}
                  </h4>

                  <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {desc}
                  </p>

                  {highlights && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Key Achievements & Impact:
                      </p>
                      {highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
