"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ArrowUpRight, Quote } from "lucide-react";
import ClientOnly from "@/components/ui/ClientOnly";
import { typingWords, personalInfo } from "@/data/data";

export default function Hero() {
  const [active, setActive] = useState<"portfolio" | "hire">("portfolio");

  // Typing animation states
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        const nextText = currentWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setTypingSpeed(80);

        if (nextText === currentWord) {
          // Pause at the end
          setIsDeleting(true);
          setTypingSpeed(1500); // Delay before deleting
        }
      } else {
        // Deleting
        const nextText = currentWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        setTypingSpeed(40);

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypingSpeed(500); // Delay before typing next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="home"
      className="group relative flex flex-col md:flex-row w-full min-h-full h-auto lg:-mb-2 xl:mb-0 sm:px-6 md:px-8 gap-6 sm:gap-8 md:gap-15 items-center justify-center mt-6"
    >
      <div className="hidden lg:flex flex-col w-70 h-34 items-start justify-start transition-all duration-300 ease-in-out absolute top-[50%] left-10 group-hover:top-20">
        <Quote size={40} className="text-charcoal-700 dark:text-neutral-400" />
        <p className="text-charcoal-700 dark:text-neutral-400 text-base font-medium leading-snug transition-colors">
          {personalInfo.quote}
        </p>
      </div>

      <div className="relative w-full lg:w-[60%] flex flex-col items-center justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center translate-y-10 sm:translate-y-14 lg:translate-y-14 transition-all duration-300 ease-in-out group-hover:translate-y-20 group-hover:opacity-0 px-4 sm:px-6">
          <span className="h-10 px-4 py-2 rounded-full border border-dark-100 dark:border-neutral-800 flex items-center justify-center bg-white dark:bg-neutral-900 text-dark-100 dark:text-neutral-200 transition-colors my-4">
            Hello!
          </span>
          <div className="flex flex-col sm:flex-row sm:gap-2 items-center sm:items-end">
            <h1 className="text-dark-100 dark:text-white font-semibold text-4xl sm:text-5xl md:text-6xl xl:text-7xl transition-colors flex flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1">
              <span>I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400">
                {personalInfo.name}
              </span>
              <span>,</span>
            </h1>
          </div>
          <h2 className="text-dark-100 dark:text-white font-semibold text-2xl sm:text-3xl md:text-5xl text-center min-h-[1.2em] flex items-center justify-center transition-colors">
            {currentText}
            <span className="animate-pulse text-sky-500 dark:text-sky-400 ml-1">|</span>
          </h2>
        </div>

        <div className="relative w-full max-w-4xl aspect-[3/2] flex flex-col items-center justify-center mx-auto px-4">
          <div className="absolute bottom-0 z-0 w-[90%] max-w-3xl aspect-[2/1] flex items-center justify-center pointer-events-auto">
            <div className="absolute w-full h-full bg-gradient-to-t from-blue-600 via-blue-500 to-sky-400 rounded-t-full shadow-none dark:shadow-[0_0_50px] shadow-sky-500" />
          </div>

          <div className="absolute z-8 transition-all duration-500 ease-in-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-115">
            <Image
              src="/Frame.svg"
              alt="Frame Decoration"
              width={1017}
              height={688}
              className="object-contain w-full h-auto fill-black"
              loading="lazy"
            />
          </div>

          <Image
            src="/profile.webp"
            alt="Karthikeyan Profile"
            width={0}
            height={0}
            sizes="100vw"
            className="relative z-20 object-contain mt-5 w-[60%] sm:w-[45%] md:w-[55%] max-w-[55%] h-auto"
            priority
          />

          <ClientOnly>
            <div className="absolute bottom-[8%] z-30 w-full hidden md:flex justify-center">
              <div className="flex border-b-2 border-white/20 bg-black/30 backdrop-blur-md rounded-full gap-2 px-2 py-1.5 w-sm h-16 items-center justify-center">
                {/* Portfolio Button */}
                <a
                  href="/cv.pdf"
                  download={`${personalInfo.name}_CV.pdf`}
                  onMouseEnter={() => setActive("portfolio")}
                  className={`group flex items-center justify-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${active === "portfolio" ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium text-xl w-[55%] border border-white/20 shadow-lg h-12" : "bg-transparent text-white/90 font-light text-lg w-[45%] h-10 hover:text-white"}`}
                >
                  Download CV
                  <ArrowUpRight
                    size={16}
                    className={`transition-all duration-300 ${active === "portfolio" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100"}`}
                  />
                </a>

                {/* Hire Me Button */}
                <button
                  onMouseEnter={() => setActive("hire")}
                  onClick={handleScrollToContact}
                  className={`group flex items-center justify-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${active === "hire" ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium text-xl w-[55%] border border-white/20 shadow-lg h-12" : "bg-transparent text-white/90 font-light text-lg w-[45%] h-10 hover:text-white"}`}
                >
                  Hire me
                  <ArrowUpRight
                    size={16}
                    className={`transition-all duration-300 ${active === "hire" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100"}`}
                  />
                </button>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>

      <div className="hidden lg:flex w-50 h-32 flex-col items-end justify-end gap-2 transition-all duration-300 ease-in-out absolute top-[50%] right-10 group-hover:top-20">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={32}
              className="fill-sky-400 stroke-blue-600 dark:fill-blue-500 dark:stroke-sky-300"
            />
          ))}
        </div>
        <div className="text-3xl font-bold text-dark-100 dark:text-white leading-none whitespace-nowrap transition-colors">
          {personalInfo.totalExperience}+ Years
        </div>
        <p className="text-sm text-dark-100 dark:text-neutral-400 transition-colors">Experience</p>
      </div>
    </div>
  );
}
