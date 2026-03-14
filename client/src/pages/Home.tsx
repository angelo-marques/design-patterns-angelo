// Blueprint Architect Design — Main Page
// Design: Dark navy (#0d1117), electric blue (#58a6ff), Space Grotesk + Fira Code
// Sections: Hero → Categories → Patterns → About → Footer

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import PatternsSection from "@/components/PatternsSection";
import CodeShowcase from "@/components/CodeShowcase";
import ResourcesSection from "@/components/ResourcesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <PatternsSection />
      <CodeShowcase />
      <ResourcesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
