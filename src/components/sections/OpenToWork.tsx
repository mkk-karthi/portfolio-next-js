"use client";

import { openToWorkCards, openToWorkData } from "@/data/data";

export default function OpenToWork() {
  const { badge, titlePrefix, titleHighlight, titleSuffix, description } = openToWorkData;
  return (
    <section
      id="open-to-work"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <div
        data-aos="fade-up"
        className="relative w-full rounded-3xl overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 border border-sky-500/20 shadow-2xl shadow-black/60"
      >
        {/* Decorative glow blobs */}
        <div className="absolute -top-20 -right-20 size-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-14">
          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-12">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 bg-slate-900/80 border border-sky-500/30 backdrop-blur-md">
              <span className="relative flex size-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
              </span>
              <span className="text-sky-400 font-bold text-xs sm:text-sm tracking-wide">
                {badge}
              </span>
            </div>

            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
              {titlePrefix}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-sky-300 to-cyan-300">
                  {titleHighlight}
                </span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500/60 via-sky-400/60 to-transparent rounded-full" />
              </span>{" "}
              {titleSuffix}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* ── Info Cards ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {openToWorkCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div
                    className={`size-12 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg ${card.shadow}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5">
                      {card.label}
                    </p>
                    <p
                      className={`text-white font-bold text-sm leading-snug ${card.primaryColor ?? ""}`}
                    >
                      {card.primary}
                    </p>
                    <p className={`text-xs mt-0.5 font-medium ${card.accentColor}`}>
                      {card.accent}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
