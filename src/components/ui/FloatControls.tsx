"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, ArrowUp } from "lucide-react";

export default function FloatControls() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Monitor scroll height to toggle Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Dark Mode Switch Button (Bottom Left) */}
      <button
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        className="fixed bottom-5 left-5 z-50 w-12 h-12 rounded-full bg-black/60 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-white flex items-center justify-center shadow-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Scroll to Top Button (Bottom Right) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to Top"
        className={`fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-black/60 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-white flex items-center justify-center shadow-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        title="Scroll to Top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
