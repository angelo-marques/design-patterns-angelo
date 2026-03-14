// Blueprint Architect Design — Hero Section
// Split layout: text left, animated diagram right
// Dark navy bg with blueprint grid, electric blue accents
// Animated stats counter, floating code snippets

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/patterns";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/hero-bg_96458d3e.jpg";

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

const floatingSnippets = [
  { code: "new Singleton()", lang: "Java", x: "75%", y: "15%", delay: 0 },
  { code: "factory.create()", lang: "C#", x: "80%", y: "55%", delay: 0.5 },
  { code: "Observer.notify()", lang: "Python", x: "68%", y: "80%", delay: 1 },
];

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const scrollToPatterns = () => {
    document.querySelector("#patterns")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #0d1f2d 50%, #0d1117 100%)",
      }}
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#58a6ff 1px, transparent 1px),
            linear-gradient(90deg, #58a6ff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Hero image — right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Gradient overlay on image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-transparent" />

      {/* Floating code snippets */}
      {floatingSnippets.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden xl:block"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: s.delay + 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: s.delay }}
            className="bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] rounded-lg px-3 py-2 text-xs font-mono"
          >
            <span className="text-[#58a6ff]">{s.code}</span>
            <span className="text-[#8b949e] ml-2">// {s.lang}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-full px-4 py-1.5 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#58a6ff] animate-pulse" />
            <span className="text-[#58a6ff] text-sm font-medium">{t.hero.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#3fb950]">
              {t.hero.subtitle}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#8b949e] text-lg leading-relaxed mb-8 max-w-xl"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              onClick={scrollToPatterns}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg shadow-[#58a6ff]/20"
            >
              {t.hero.cta_primary}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-transparent border border-[#30363d] hover:border-[#58a6ff]/50 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 text-[#58a6ff]" />
              {t.hero.cta_secondary}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-4 gap-4"
          >
            {[
              { value: 22, label: t.hero.stats.patterns, color: "text-[#58a6ff]" },
              { value: 4, label: t.hero.stats.languages, color: "text-[#3fb950]" },
              { value: 17, label: t.hero.stats.years, color: "text-[#d29922]" },
              { value: 3, label: t.hero.stats.categories, color: "text-[#f85149]" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-black ${stat.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={stat.value} />
                  {stat.value === 17 && "+"}
                </div>
                <div className="text-[#8b949e] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-[#8b949e]" />
      </motion.div>
    </section>
  );
}
