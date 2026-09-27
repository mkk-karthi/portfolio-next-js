"use client";

import React, { useState, useEffect } from "react";
import LogoSvg from "./LogoSVG";

export default function PageLoader() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (mounted) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    }, 0);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    // Start fade-out on mount frame for instant visual continuity without blocking LCP
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    // Completely unmount after fade transition completes
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500 ease-in-out pointer-events-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="absolute h-32 w-32 animate-ping rounded-full bg-sky-500/20 duration-1000"></div>
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-sky-500/40"></div>

        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 p-4 shadow-xl border border-slate-700 text-sky-400">
          <LogoSvg className="size-24 fill-sky-400" />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-6 text-lg font-semibold tracking-widest text-sky-400">
        <span>Loading</span>
        <span className="flex items-center gap-1 mt-2">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-1 rounded-full bg-sky-400 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
