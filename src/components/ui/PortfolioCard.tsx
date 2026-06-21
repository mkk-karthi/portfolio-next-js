import React from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { PortfolioItem } from "@/data/data";

interface PortfolioCardProps extends PortfolioItem {
  priority?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  image,
  title,
  href,
  github,
  desc,
  tech = [],
  priority = false,
}) => {
  return (
    <div
      className="relative group w-full md:w-160 h-64 md:h-96 md:max-w-none rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer shadow-2xl"
      style={{
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Dark Premium Gradient Overlay for Title & Button Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/30 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Background Image with slight scale effect on hover */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
        priority={priority}
      />

      {/* Content wrapper */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-4 md:p-6">
        {/* Top-Right Floating Actions */}
        <div className="flex justify-end gap-3.5">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub repository for ${title}`}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
              title="View GitHub Repository"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} className="text-white" />
            </a>
          )}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${title}`}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
              title="Redirect to Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} className="text-white" />
            </a>
          )}
        </div>

        {/* Bottom Title (Fades out when hover drawer slides in) */}
        <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-warm-white leading-tight transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
          {title}
        </h3>

        {/* Hover drawer overlay (pops up on card hover) */}
        <div className="absolute inset-x-0 bottom-0 w-full bg-black/85 backdrop-blur-xl border-t border-white/10 px-5 py-5 md:px-7 md:py-6 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-30 flex flex-col gap-3">
          <h4 className="text-lg md:text-2xl font-bold text-white leading-none">{title}</h4>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{desc}</p>

          {/* Technology Details */}
          <div className="flex flex-wrap gap-2 mt-1">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] md:text-xs font-semibold rounded-lg bg-white/10 text-white/95 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105"
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
