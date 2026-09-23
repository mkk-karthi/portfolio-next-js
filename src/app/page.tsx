"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Services from "@/components/sections/Services";
import WorkExperience from "@/components/sections/WorkExperience";
import Projects from "@/components/sections/Projects";
import OpenToWork from "@/components/sections/OpenToWork";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatControls from "@/components/ui/FloatControls";
import AOSInit from "@/components/AOSInit";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 flex flex-col items-center justify-start overflow-x-hidden">
      <PageLoader />
      <AOSInit />
      <Navbar />
      <main className="w-full flex flex-col items-center justify-start flex-1 pt-16">
        <Hero />
        <AboutMe />
        <Services />
        <WorkExperience />
        <Projects />
        <OpenToWork />
        <Contact />
      </main>
      <FloatControls />
      <Footer />
    </div>
  );
}
