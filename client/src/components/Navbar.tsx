// Blueprint Architect Design — Navbar
// Dark navy bg, electric blue accents, Space Grotesk font
// PT/EN language switcher prominent in header

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/patterns";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.patterns, href: "#patterns" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0d1117]/95 backdrop-blur-md border-b border-[#58a6ff]/10 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("#home")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#58a6ff]/20 border border-[#58a6ff]/40 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-sm tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Design Patterns
              </span>
              <span className="text-[#58a6ff] text-[10px] font-medium tracking-widest uppercase">
                by Angelo Silva
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[#8b949e] hover:text-white text-sm font-medium transition-colors duration-200 hover:text-[#58a6ff] relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#58a6ff] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right side: Language switcher + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#161b22] border border-[#30363d] rounded-lg p-0.5">
              <Globe className="w-3.5 h-3.5 text-[#8b949e] ml-1.5" />
              <button
                onClick={() => setLang("pt")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                  lang === "pt"
                    ? "bg-[#58a6ff] text-[#0d1117]"
                    : "text-[#8b949e] hover:text-white"
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                  lang === "en"
                    ? "bg-[#58a6ff] text-[#0d1117]"
                    : "text-[#8b949e] hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#8b949e] hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d1117]/98 border-b border-[#30363d]"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-[#8b949e] hover:text-[#58a6ff] text-sm font-medium py-2 border-b border-[#21262d] last:border-0 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
