"use client";

import React from "react";
import { contacts } from "@/data/data";
import ClientOnly from "../ui/ClientOnly";
import { MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 transition-colors duration-500"
    >
      <div
        data-aos="fade-up"
        className="relative w-full rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-sky-500/20 p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center gap-6 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Glow Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800 text-blue-600 dark:text-sky-400 text-xs font-bold">
          <MessageSquare size={14} />
          <span>Let&apos;s Work Together</span>
        </div>

        <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight">
          Let&apos;s{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400">
            Connect
          </span>{" "}
          &amp; Build
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Seeking{" "}
          <strong className="text-blue-600 dark:text-sky-400">
            Senior Full-Stack Engineering roles
          </strong>{" "}
          and <strong className="text-blue-600 dark:text-sky-400">Freelance Web Projects</strong>.
          Reach out via any platform below!
        </p>

        {/* Contact Links Grid */}
        <ClientOnly>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {contacts.map((data, index) => {
              const Icon = data.icon;
              const isExternal = data.href.startsWith("http");
              return (
                <a
                  key={index}
                  href={data.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 hover:border-sky-400 dark:hover:border-sky-400 text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-800 group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-sky-500 transition-all duration-300 shrink-0">
                    <Icon
                      size={18}
                      className="stroke-blue-600 dark:stroke-sky-400 group-hover:stroke-white transition-colors"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold truncate">{data.name}</span>
                </a>
              );
            })}
          </div>
        </ClientOnly>
      </div>
    </section>
  );
}
