"use client";

import { personalInfo } from "@/data/data";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 mt-4 sm:mt-6">
      {/* Availability status bar */}
      <div className="w-full text-center py-2.5 px-4 bg-emerald-950/40 border-b border-emerald-900/40">
        <p className="text-emerald-400 text-xs font-semibold tracking-wide">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          Available for hire · {personalInfo.targetRole} · {personalInfo.locationShort}
        </p>
      </div>

      {/* Copyright */}
      <div className="w-full text-center text-xs sm:text-sm py-4 text-slate-600 dark:text-slate-400">
        &copy; <span>{new Date().getFullYear()} </span>
        <a
          href={personalInfo.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MKK Creation"
          className="font-bold underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
        >
          MKK Creation
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
}
