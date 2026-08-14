"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, X } from "lucide-react";
import { PortfolioItem } from "@/data/data";

interface PortfolioCardProps extends PortfolioItem {
  priority?: boolean;
  onToggleDetails?: (isOpen: boolean) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  image,
  title,
  href,
  github,
  desc,
  tech = [],
  category,
  priority = false,
  onToggleDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    // Only toggle details via tap/click on mobile & tablet viewports (< 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowDetails((prev) => {
        const next = !prev;
        if (onToggleDetails) {
          onToggleDetails(next);
        }
        return next;
      });
    }
  };

  const closeDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowDetails(false);
    if (onToggleDetails) {
      onToggleDetails(false);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative group w-full md:w-160 h-76 sm:h-84 md:h-96 md:max-w-none rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer border border-slate-700/50 dark:border-sky-500/20 shadow-2xl hover:border-sky-400 hover:shadow-sky-500/20 hover:-translate-y-1 select-none"
    >
      {/* Dark Linear Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-cover object-top z-0 transition-transform duration-700 ease-out group-hover:scale-105"
        priority={priority}
      />

      {/* Default Card View */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-4 sm:p-6">
        {/* Top Header: Category Tag & Quick Link Buttons */}
        <div className="flex items-center justify-between gap-3 w-full">
          {category ? (
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-400 border border-sky-500/30 text-xs font-bold shadow-md">
              {category}
            </span>
          ) : (
            <div />
          )}

          {/* Action Buttons (Top Right) */}
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${title}`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
                title="View GitHub Repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              </a>
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${title}`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
                title="Redirect to Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Title */}
        <div className="transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-3">
          <h3 className="font-extrabold text-xl sm:text-3xl md:text-4xl text-white leading-tight drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>

      {/*
        Dark Glass Overlay:
        - Laptop/PC (md:): Classic hoverable bottom drawer overlay (not full height).
        - Mobile/Tablet (< md): Tap-to-open full-height view with spacious padding.
      */}
      <div
        className={`absolute inset-x-0 bottom-0 w-full transition-all duration-500 ease-in-out z-30 flex flex-col justify-between bg-slate-950/85 backdrop-blur-2xl border-t border-sky-500/30 p-5 sm:p-6 overflow-y-auto ${
          /* Mobile/Tablet layout */
          "max-md:inset-0 max-md:h-full max-md:w-full max-md:p-6 max-md:gap-4"
        } ${
          showDetails
            ? "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto"
            : "max-md:translate-y-full max-md:opacity-0 max-md:pointer-events-none"
        } ${
          /* Desktop layout: Hoverable bottom drawer overlay */
          "md:top-auto md:bottom-0 md:h-auto md:max-h-[85%] md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex flex-col gap-1">
              {category && (
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {category}
                </span>
              )}
              <h4 className="text-lg sm:text-2xl font-black text-white leading-snug">
                {title}
              </h4>
            </div>

            {/* Close button on Mobile/Tablet */}
            <button
              onClick={closeDetails}
              className="md:hidden p-2 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200 shrink-0 border border-slate-700/60 shadow-md cursor-pointer"
              title="Close details & resume scrolling"
            >
              <X size={18} />
            </button>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1">{desc}</p>
        </div>

        {/* Tech Badges Footer */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-slate-800/80 mt-4 max-md:mt-auto">
          <div className="flex flex-wrap gap-2 w-full">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-950/80 text-sky-300 border border-sky-500/30"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
