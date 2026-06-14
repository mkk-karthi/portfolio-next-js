"use client";

import { useState } from "react";
import "aos/dist/aos.css";
import { experiences, education } from "@/data/data";

const parseSchool = (schoolStr: string) => {
  const match = schoolStr.match(/(.*?)\s*\((.*?)\)/);
  if (match) {
    return { name: match[1], duration: match[2] };
  }
  return { name: schoolStr, duration: "" };
};

export default function WorkExperience() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const activeItems = activeTab === "work" ? experiences : education;

  return (
    <div
      id="resume"
      className="w-full flex flex-col items-start mx-auto px-4 py-16 sm:px-6 lg:px-18 overflow-hidden"
    >
      <div
        className="w-full flex lg:flex-row items-start justify-center space-x-2.5 mb-6"
        data-aos="fade-up"
      >
        <h2 className="font-semibold text-4xl sm:text-5xl lg:text-6xl text-charcoal-700 dark:text-white transition-colors">
          Awesome{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400">
            Journey
          </span>
        </h2>
      </div>

      {/* Tabs Selector */}
      <div className="w-full flex justify-center mb-12" data-aos="fade-up">
        <div className="inline-flex p-1 rounded-xl bg-charcoal-100 dark:bg-neutral-900 border border-charcoal-100 dark:border-neutral-800 transition-colors">
          <button
            onClick={() => setActiveTab("work")}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${
              activeTab === "work"
                ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
                : "text-charcoal-700 dark:text-neutral-300 hover:text-charcoal-900 dark:hover:text-white"
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${
              activeTab === "education"
                ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
                : "text-charcoal-700 dark:text-neutral-300 hover:text-charcoal-900 dark:hover:text-white"
            }`}
          >
            Education
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-stretch animate-fade-in-up" key={activeTab}>
        {activeItems.map((item, index) => {
          const isWork = "company" in item;
          const title = isWork ? item.role : item.title;
          const institution = isWork ? item.company : parseSchool(item.school).name;
          const duration = isWork ? item.duration : parseSchool(item.school).duration;
          const desc = item.desc;

          return (
            <div key={index} className="flex flex-row items-stretch lg:justify-evenly">
              {/* Left: Company / School & Duration */}
              <div
                className="w-[45%] px-6 py-4 hidden lg:block lg:text-end"
                data-aos="fade-right"
                data-aos-delay={index * 150}
              >
                <p className="font-semibold text-charcoal-900 dark:text-neutral-100 text-3xl transition-colors">
                  {institution}
                </p>
                <p className="text-lg text-charcoal-400 dark:text-neutral-400 transition-colors mt-1">
                  {duration}
                </p>
              </div>

              {/* Center: Dot + connecting lines */}
              <div className="relative flex flex-col items-center">
                {/* Top dashed line */}
                {index !== 0 && (
                  <div
                    className="h-4 border-l-2 border-dashed border-charcoal-900 dark:border-neutral-700 transition-colors"
                    data-aos="fade-in"
                    data-aos-delay={index * 150}
                  />
                )}
                {index === 0 && <div className="h-4" />}

                {/* Dot */}
                <div
                  className="relative flex items-center justify-center size-6 lg:size-12 shrink-0"
                  data-aos="zoom-in"
                  data-aos-delay={index * 150}
                >
                  <div className="absolute size-6 lg:size-12 rounded-full border-2 border-dashed border-charcoal-900 dark:border-neutral-700 bg-white dark:bg-neutral-950 transition-colors" />
                  <div
                    className={`size-4 lg:size-9 rounded-full z-10 ${
                      index % 2 === 0
                        ? "bg-gradient-to-tr from-blue-600 to-sky-500"
                        : "bg-blue-950 dark:bg-blue-900"
                    }`}
                  />
                </div>

                {/* Bottom dashed line */}
                {index !== activeItems.length - 1 && (
                  <div
                    className="flex-1 border-l-2 border-dashed border-charcoal-900 dark:border-neutral-700 transition-colors"
                    data-aos="fade-in"
                    data-aos-delay={index * 150}
                  />
                )}
                {index === activeItems.length - 1 && <div className="flex-1" />}
              </div>

              {/* Right: Role / Degree & Description */}
              <div
                className="w-auto lg:w-[45%] px-5 py-4"
                data-aos="fade-left"
                data-aos-delay={index * 150}
              >
                <p className="font-semibold text-charcoal-900 dark:text-neutral-100 text-xl lg:text-3xl transition-colors">
                  {title}
                </p>
                {desc && (
                  <p className="text-base lg:text-lg text-charcoal-400 dark:text-neutral-400 mt-2 transition-colors">
                    {desc}
                  </p>
                )}
                <p className="font-semibold text-charcoal-900 dark:text-neutral-100 text-xl lg:hidden transition-colors mt-2">
                  {institution}
                </p>
                <p className="text-base text-charcoal-400 dark:text-neutral-400 lg:hidden transition-colors">
                  {duration}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

