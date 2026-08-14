"use client";

import React, { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { services, personalInfo } from "@/data/data";
import ClientOnly from "@/components/ui/ClientOnly";

export default function Services() {
  useEffect(() => {
    import("aos").then((AOSModule) => {
      AOSModule.default.init({
        duration: 800,
        once: false,
        easing: "ease-out-quad",
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
      id="services"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 z-10"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Header */}
      <div
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10"
        data-aos="fade-up"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-sky-500/30 text-blue-600 dark:text-sky-400 text-xs sm:text-sm font-semibold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles size={14} className="opacity-80" />
          <span>Freelance & Enterprise Offerings</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Services I{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
            Deliver
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {personalInfo.freelancePitch}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group relative rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 p-6 sm:p-8 transition-all duration-300 ease-in-out hover:border-sky-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-xl"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} />
                </div>

                {service.badge && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Action Button */}
                <ClientOnly>
                  <button
                    onClick={handleScrollToContact}
                    className="w-full py-3 px-5 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 text-slate-800 dark:text-slate-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-transparent group/btn cursor-pointer shadow-sm mt-auto"
                  >
                    <span>Start Project Inquiry</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </ClientOnly>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div
        data-aos="fade-up"
        className="mt-10 rounded-3xl bg-linear-to-r from-blue-900/90 via-slate-900 to-sky-950/90 border border-sky-500/30 p-6 sm:p-10 text-center text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="text-left max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a custom requirement?
          </h3>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Whether you need a dedicated Senior Full-Stack Engineer or a custom solution built from
            scratch, let's connect today.
          </p>
        </div>

        <ClientOnly>
          <button
            onClick={handleScrollToContact}
            className="shrink-0 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
          >
            Get In Touch Now
          </button>
        </ClientOnly>
      </div>
    </section>
  );
}
