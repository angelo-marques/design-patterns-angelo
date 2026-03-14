// Blueprint Architect Design — Categories Section
// Three category cards with visual icons and descriptions

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/patterns";

const CODE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/code-bg_6fc98af8.jpg";

const categoryData = [
  {
    key: "creational" as const,
    color: "#3fb950",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    icon: "🏗️",
    count: 4,
    patterns: ["Singleton", "Factory Method", "Abstract Factory", "Builder"],
  },
  {
    key: "structural" as const,
    color: "#d29922",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    icon: "🔧",
    count: 3,
    patterns: ["Adapter", "Decorator", "Facade"],
  },
  {
    key: "behavioral" as const,
    color: "#f85149",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    icon: "⚡",
    count: 3,
    patterns: ["Observer", "Strategy", "Command"],
  },
];

export default function CategoriesSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const scrollToPatterns = (category: string) => {
    document.querySelector("#patterns")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 bg-[#0d1117] overflow-hidden">
      {/* Code background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${CODE_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {lang === "pt" ? "Três Categorias Fundamentais" : "Three Fundamental Categories"}
          </h2>
          <p className="text-[#8b949e] text-sm max-w-xl mx-auto">
            {lang === "pt"
              ? "Os padrões GoF são organizados em três categorias, cada uma abordando um aspecto diferente do design de software."
              : "GoF patterns are organized into three categories, each addressing a different aspect of software design."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryData.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => scrollToPatterns(cat.key)}
              className={`cursor-pointer bg-[#161b22] border ${cat.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl group`}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 border"
                style={{
                  backgroundColor: `${cat.color}15`,
                  borderColor: `${cat.color}30`,
                }}
              >
                {cat.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-black mb-2"
                style={{ color: cat.color, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.categories[cat.key]}
              </h3>

              {/* Description */}
              <p className="text-[#8b949e] text-sm leading-relaxed mb-5">
                {t.categories[`${cat.key}_desc` as keyof typeof t.categories]}
              </p>

              {/* Pattern list */}
              <div className="space-y-1.5 mb-5">
                {cat.patterns.map((p, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-[#8b949e]">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {p}
                    {j === cat.patterns.length - 1 && cat.count > cat.patterns.length && (
                      <span className="text-[#8b949e]">
                        +{cat.count - cat.patterns.length} {lang === "pt" ? "mais" : "more"}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Count badge */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
                style={{
                  color: cat.color,
                  backgroundColor: `${cat.color}15`,
                  borderColor: `${cat.color}30`,
                }}
              >
                {cat.count} {lang === "pt" ? "padrões disponíveis" : "patterns available"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
