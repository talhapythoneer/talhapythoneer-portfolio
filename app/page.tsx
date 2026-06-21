import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import FeaturedWork from "@/components/FeaturedWork";
import Skills from "@/components/Skills";
import TrustedBy from "@/components/TrustedBy";
import HomeTestimonialsPreview from "@/components/HomeTestimonialsPreview";
import HomeCTA from "@/components/HomeCTA";

export const metadata: Metadata = {
  title: "Talha Pythoneer — Expert Python Web Scraping & Agentic AI Developer",
  description:
    "Hire Talha Pythoneer for professional web scraping, data scraping, browser automation, and agentic AI solutions. 6+ years, 1500+ projects, 4.9/5 rating on Fiverr & Upwork.",
  alternates: { canonical: "https://www.talhapythoneer.com" },
};

export default function HomePage() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <div className="snap-start w-full relative min-h-screen flex flex-col">
        <Hero />
        <div className="mt-auto">
          <StatsBar />
        </div>
      </div>
      
      <div className="snap-start w-full min-h-screen flex flex-col justify-center bg-[#0A0A0A]">
        <FeaturedWork />
      </div>

      <div className="snap-start w-full min-h-screen flex flex-col justify-center bg-[#050505]">
        <Skills />
      </div>

      <div className="snap-start w-full min-h-screen flex flex-col justify-center bg-[#121212]">
        <TrustedBy />
      </div>

      <div className="snap-start w-full min-h-screen flex flex-col justify-center bg-[#050505]">
        <HomeTestimonialsPreview />
      </div>

      <div className="snap-start w-full min-h-screen flex flex-col justify-center bg-[#0A0A0A]">
        <HomeCTA />
      </div>
    </main>
  );
}
