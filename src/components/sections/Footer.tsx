import { personalInfo } from "@/data/data";

export default function Footer() {
  return (
    <footer className="w-full text-center text-xs sm:text-sm py-6 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 mt-4 sm:mt-6">
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
      . All Rights Reserved. Built with Next.js, React & Tailwind CSS.
    </footer>
  );
}
