import React from "react";
import Image from "next/image";
import { GenericSlider } from "@/components/ui/GenericSlider";
import { projectData } from "@/data/data";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="project"
      className="relative flex flex-col w-full max-w-7xl mx-auto min-h-120 sm:min-h-152 gap-8 sm:gap-10 items-center px-4 sm:px-6 lg:px-12 py-10 sm:py-12 bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 rounded-3xl overflow-hidden my-8 sm:my-10 transition-colors duration-500 backdrop-blur-xl shadow-2xl"
    >
      <Image
        src="/tech_service_bg.webp"
        alt=""
        fill
        className="object-cover absolute opacity-10 dark:opacity-25 pointer-events-none"
        loading="lazy"
      />

      {/* Header */}
      <div
        className="w-full flex flex-col items-center text-center gap-3 relative z-10"
        data-aos="fade-up"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800 text-blue-600 dark:text-sky-400 text-xs font-bold">
          <FolderGit2 size={14} />
          <span>Showcase & Code Repositories</span>
        </div>

        <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 leading-tight">
            Projects
          </span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Explore interactive web applications, npm packages, and developer tools built with React,
          Next.js, and Node.js.
        </p>
      </div>

      {/* Project Slider */}
      <div className="relative w-full max-w-7xl flex items-start justify-center z-10">
        <GenericSlider
          data={projectData}
          slidesPerView={2}
          heightClass="h-auto"
          cardType="portfolio"
        />
      </div>
    </section>
  );
}
