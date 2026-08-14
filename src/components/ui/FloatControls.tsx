"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatControls() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to Top"
      title="Scroll to Top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 text-white flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:bg-linear-to-r hover:from-blue-600 hover:to-sky-500 hover:border-transparent hover:shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
        showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
