import React from "react";
import Image from "next/image";
import { GenericSlider } from "@/components/ui/GenericSlider";
import { projectData } from "@/data/data";

export default function Projects() {
  return (
    <div id="project" className="relative flex flex-col w-full min-h-160 sm:min-h-180 lg:min-h-200 gap-16 sm:gap-24 items-center px-4 sm:px-6 lg:px-18 py-16 sm:py-28 bg-dark-100 dark:bg-neutral-900/90 border border-transparent dark:border-neutral-800 rounded-3xl sm:rounded-4xl overflow-hidden mt-14 transition-colors duration-500">
      <Image src="/tech_service_bg.png" alt="image" fill className="object-cover absolute opacity-40" />

      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 relative z-10">
        <div className="flex gap-2.5">
          <h3 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-off-white dark:text-white leading-tight transition-colors">
            My
          </h3>
          <h3 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 leading-tight">
            Projects
          </h3>
        </div>
      </div>

      <div className="relative w-full max-w-7xl flex items-start justify-center">
        <GenericSlider
          data={projectData}
          slidesPerView={2}
          heightClass="h-auto"
          cardType="portfolio"
        />
      </div>
    </div>
  );
}
