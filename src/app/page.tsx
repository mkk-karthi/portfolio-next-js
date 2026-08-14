import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Services from "@/components/sections/Services";
import WorkExperience from "@/components/sections/WorkExperience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import FloatControls from "@/components/ui/FloatControls";
import Footer from "@/components/sections/Footer";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 flex flex-col items-center justify-start overflow-x-hidden">
      <PageLoader />
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
