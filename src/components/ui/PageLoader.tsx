"use client";

import React, { useState, useEffect } from "react";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // PageLoader is unmounted after initial load
    setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-950 text-white transition-all duration-300 ease-in-out opacity-0 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-10 py-8">
        {/* React Style Spinner */}
        <div className="relative flex items-center justify-center w-28 h-28 my-2">
          {/* React Ellipse Orbit 1 */}
          <div className="absolute w-24 h-9 rounded-[50%] border-3 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.4)] animate-[spin_3s_linear_infinite]" />

          {/* React Ellipse Orbit 2 */}
          <div className="absolute w-24 h-9 rounded-[50%] border-3 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.4)] rotate-60 animate-[spin_3s_linear_infinite]" />

          {/* React Ellipse Orbit 3 */}
          <div className="absolute w-24 h-9 rounded-[50%] border-3 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.4)] -rotate-60 animate-[spin_3s_linear_infinite]" />
        </div>

        {/* Loading Text */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-slate-200 font-semibold text-xl tracking-wide">Loading</span>
          <span className="flex items-center gap-1.5 ml-0.5 mt-2">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="size-2 rounded-full bg-cyan-400 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
