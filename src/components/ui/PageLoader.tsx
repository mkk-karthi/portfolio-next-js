"use client";

import React, { useState, useEffect } from "react";

export default function PageLoader() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setVisible(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const fallback = setTimeout(() => {
        setVisible(false);
      }, 1500);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-neutral-950 transition-all duration-500 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Premium Pulsing Gradient Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-neutral-800" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-sky-500 animate-spin" />
        </div>

        {/* Pulsing Text */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-charcoal-700 dark:text-neutral-300 font-semibold text-lg animate-pulse tracking-wide">
            Loading
          </span>
          <span className="flex gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-[bounce_1.4s_infinite_100ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-[bounce_1.4s_infinite_200ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-[bounce_1.4s_infinite_300ms]" />
          </span>
        </div>
      </div>
    </div>
  );
}
