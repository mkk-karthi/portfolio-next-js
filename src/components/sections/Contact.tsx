import React from "react";
import { contacts } from "@/data/data";
import ClientOnly from "../ui/ClientOnly";

export default function Contact() {
  return (
    <div
      id="contact"
      className="w-full bg-white dark:bg-neutral-950 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-18 gap-10 transition-colors duration-500"
    >
      <h2 className="w-full font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-700 dark:text-white leading-tight transition-colors text-center">
        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400">Connect</span>
      </h2>

      <ClientOnly>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start sm:justify-center gap-6 w-full px-4 text-sm sm:text-base md:text-lg font-medium text-black">
            {contacts.map((data, index) => {
              const Icon = data.icon;
              const isExternal = data.href.startsWith("http");
              return (
                <a
                  key={index}
                  href={data.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 text-charcoal-700 dark:text-slate-300 dark:hover:text-sky-400 cursor-pointer py-1 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-neutral-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 transition-all duration-300 ease-in-out shadow-sm">
                    <Icon
                      size={20}
                      className="stroke-blue-600 dark:stroke-sky-400 group-hover:stroke-white transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <span className="border-transparent leading-none font-semibold">{data.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </ClientOnly>
    </div>
  );
}
