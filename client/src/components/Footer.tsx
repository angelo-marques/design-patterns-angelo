// Blueprint Architect Design — Footer
// Dark footer with links, social, and copyright

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/patterns";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#010409] border-t border-[#21262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#58a6ff]/20 border border-[#58a6ff]/40 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-[#58a6ff]" />
              </div>
              <div>
                <span className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Design Patterns
                </span>
                <span className="text-[#58a6ff] text-[10px] block font-medium tracking-widest uppercase">
                  by Angelo Silva
                </span>
              </div>
            </div>
            <p className="text-[#8b949e] text-sm leading-relaxed max-w-sm mb-4">
              {lang === "pt"
                ? "Referência em Design Patterns para a comunidade de desenvolvedores. Aprenda, pratique e evolua com exemplos em 4 linguagens."
                : "Design Patterns reference for the developer community. Learn, practice and evolve with examples in 4 languages."}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/angelomarquesdeoliveirasilva"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] hover:border-[#58a6ff]/30 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:angelomarquesdeoliveira@gmail.com"
                className="w-9 h-9 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] hover:border-[#58a6ff]/30 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {lang === "pt" ? "Navegação" : "Navigation"}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t.nav.home, href: "#home" },
                { label: t.nav.patterns, href: "#patterns" },
                { label: t.nav.about, href: "#about" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Patterns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {lang === "pt" ? "Padrões" : "Patterns"}
            </h4>
            <ul className="space-y-2">
              {["Singleton", "Factory Method", "Observer", "Strategy", "Decorator", "Adapter"].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => scrollTo("#patterns")}
                    className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#21262d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8b949e] text-xs">
            © {new Date().getFullYear()} Angelo Marques de Oliveira Silva. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-1.5 text-[#8b949e] text-xs">
            <span>{t.footer.built_with}</span>
            <Heart className="w-3 h-3 text-[#f85149] fill-[#f85149]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
