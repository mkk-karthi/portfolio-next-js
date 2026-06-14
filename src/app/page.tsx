import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HireMe from "@/components/sections/HireMe";
import WorkExperience from "@/components/sections/WorkExperience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import FloatControls from "@/components/ui/FloatControls";
import Footer from "@/components/sections/Footer";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-neutral-950 transition-colors duration-500 py-5 flex flex-col items-center justify-start">
      <PageLoader />
      <Navbar />
      <main className="w-full flex flex-col items-center justify-start flex-1">
        <Hero />
        <HireMe />
        <WorkExperience />
        <Projects />
        <Contact />
      </main>
      <FloatControls />
      <Footer />
    </div>
  );
}
