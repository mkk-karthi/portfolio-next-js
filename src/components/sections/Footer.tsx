import { personalInfo } from "@/data/data";

export default function Footer() {
  return (
    <div className="text-center ext-sm sm:text-base md:text-lg py-2 text-black dark:text-white">
      &copy; <span>{new Date().getFullYear()} </span>
      <a
        href={personalInfo.website}
        target="_blank"
        aria-label="MKK Creation"
        className="underline leading-none font-semibold hover:text-blue-600 dark:hover:text-sky-400"
      >
        MKK Creation
      </a>
      . All Rights Reserved.
    </div>
  );
}
