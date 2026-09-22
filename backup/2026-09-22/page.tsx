import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AOSInit from "@/components/AOSInit";
import PageLoader from "@/components/ui/PageLoader";

const AboutMe = dynamic(() => import("@/components/sections/AboutMe"));
const Services = dynamic(() => import("@/components/sections/Services"));
const WorkExperience = dynamic(() => import("@/components/sections/WorkExperience"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const FloatControls = dynamic(() => import("@/components/ui/FloatControls"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

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
        <Contact />
      </main>
      <FloatControls />
      <Footer />
    </div>
  );
}

