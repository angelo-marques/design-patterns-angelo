import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PatternsSection from "@/components/PatternsSection";
import CodeShowcase from "@/components/CodeShowcase";
import ResourcesSection from "@/components/ResourcesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <HeroSection />
        <PatternsSection />
        <CodeShowcase />
        <ResourcesSection />
        <AboutSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
