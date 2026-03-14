// Blueprint Architect Design — Patterns Section
// Grid of pattern cards with category colors
// Modal/drawer with full pattern details and code tabs (Java|C#|Python|Ruby)

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, Copy, Check, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { patterns, translations, categoryColors, type Pattern, type Category, type Language } from "@/data/patterns";

const PATTERNS_BANNER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/patterns-banner_ca658906.jpg";

const LANG_TABS: { key: Language; label: string; color: string }[] = [
  { key: "java", label: "Java", color: "#f89820" },
  { key: "csharp", label: "C#", color: "#9b4f96" },
  { key: "python", label: "Python", color: "#3572a5" },
  { key: "ruby", label: "Ruby", color: "#cc342d" },
];

function CodeBlock({ code, language }: { code: string; language: Language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting via CSS classes
  const highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Keywords
    .replace(
      /\b(public|private|protected|class|interface|abstract|static|void|new|return|extends|implements|override|sealed|readonly|const|var|let|def|end|module|include|attr_accessor|puts|print|if|else|for|while|import|from|using|namespace|async|await|null|None|true|false|True|False|this|self|super|base)\b/g,
      '<span class="code-keyword">$1</span>'
    )
    // Strings
    .replace(/(["'`])(.*?)\1/g, '<span class="code-string">$1$2$1</span>')
    // Comments
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="code-comment">$1</span>')
    // Types/Classes (PascalCase)
    .replace(/\b([A-Z][a-zA-Z0-9]+)\b/g, '<span class="code-type">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-2 rounded-t-lg border border-[#30363d] border-b-0">
        <span className="text-[#8b949e] text-xs font-mono">{language === "csharp" ? "C#" : language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[#8b949e] hover:text-white text-xs transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <div className="bg-[#0d1117] border border-[#30363d] rounded-b-lg overflow-auto max-h-80">
        <pre className="p-4 text-xs font-mono leading-relaxed text-[#e6edf3] overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  );
}

function PatternModal({ pattern, onClose }: { pattern: Pattern; onClose: () => void }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const pt = pattern.translations[lang];
  const colors = categoryColors[pattern.category];
  const [activeTab, setActiveTab] = useState<Language>("java");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl h-full bg-[#0d1117] border-l border-[#30363d] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 bg-[#0d1117] border-b border-[#30363d] px-6 py-4`}>
          <div className="flex items-start justify-between">
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-2 ${colors.badge}`}>
                {t.categories[pattern.category]}
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {pt.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#8b949e] hover:text-white transition-colors mt-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Intent */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-widest mb-2 ${colors.text}`}>
              {t.patterns_section.intent}
            </h3>
            <p className="text-[#c9d1d9] text-sm leading-relaxed bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
              {pt.intent}
            </p>
          </div>

          {/* Problem */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#f85149]">
              {t.patterns_section.problem}
            </h3>
            <p className="text-[#c9d1d9] text-sm leading-relaxed">{pt.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#3fb950]">
              {t.patterns_section.solution}
            </h3>
            <p className="text-[#c9d1d9] text-sm leading-relaxed">{pt.solution}</p>
          </div>

          {/* Applicability */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#d29922]">
              {t.patterns_section.applicability}
            </h3>
            <ul className="space-y-2">
              {pt.applicability.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#c9d1d9]">
                  <ChevronRight className="w-4 h-4 text-[#d29922] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Consequences */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#58a6ff]">
              {t.patterns_section.consequences}
            </h3>
            <ul className="space-y-2">
              {pt.consequences.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#c9d1d9]">
                  <ChevronRight className="w-4 h-4 text-[#58a6ff] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Examples */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-[#58a6ff]" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#58a6ff]">
                {t.patterns_section.view_code}
              </h3>
            </div>

            {/* Language Tabs */}
            <div className="flex gap-1 mb-3 bg-[#161b22] rounded-lg p-1 border border-[#30363d]">
              {LANG_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    activeTab === tab.key
                      ? "text-[#0d1117] shadow-sm"
                      : "text-[#8b949e] hover:text-white"
                  }`}
                  style={activeTab === tab.key ? { backgroundColor: tab.color } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                <CodeBlock code={pattern.code[activeTab]} language={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PatternCard({ pattern, index, onClick }: { pattern: Pattern; index: number; onClick: () => void }) {
  const { lang } = useLanguage();
  const pt = pattern.translations[lang];
  const colors = categoryColors[pattern.category];
  const t = translations[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
      className={`cursor-pointer bg-[#161b22] border rounded-xl p-5 transition-all duration-300 group relative overflow-hidden ${colors.border} hover:border-opacity-60 hover:shadow-lg`}
      style={{ boxShadow: "0 0 0 0 transparent" }}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.bg} rounded-xl`} />

      <div className="relative z-10">
        {/* Icon + Category badge */}
        <div className="flex items-start justify-between mb-3">
          <div className={`text-2xl ${colors.text}`}>{pattern.icon}</div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.badge}`}>
            {t.categories[pattern.category]}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {pt.name}
        </h3>

        {/* Intent preview */}
        <p className="text-[#8b949e] text-xs leading-relaxed line-clamp-2 mb-4">
          {pt.intent}
        </p>

        {/* Language badges */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {LANG_TABS.map((tab) => (
              <span
                key={tab.key}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e]"
              >
                {tab.label}
              </span>
            ))}
          </div>
          <ChevronRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
      </div>
    </motion.div>
  );
}

export default function PatternsSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  const filtered = patterns.filter((p) => {
    const name = p.translations[lang].name.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const categoryGroups: { key: Category | "all"; label: string }[] = [
    { key: "all", label: t.patterns_section.all },
    { key: "creational", label: t.categories.creational },
    { key: "structural", label: t.categories.structural },
    { key: "behavioral", label: t.categories.behavioral },
  ];

  return (
    <section id="patterns" className="relative py-24 bg-[#0d1117]">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Banner image */}
      <div className="relative mb-16">
        <div
          className="w-full h-48 sm:h-64 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${PATTERNS_BANNER})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-transparent to-[#0d1117]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-black text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.patterns_section.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#8b949e] text-sm"
              >
                {t.patterns_section.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.patterns_section.search}
              className="w-full bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoryGroups.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-[#58a6ff] text-[#0d1117] border-[#58a6ff]"
                    : "bg-[#161b22] text-[#8b949e] border-[#30363d] hover:border-[#58a6ff]/30 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category sections */}
        {(["creational", "structural", "behavioral"] as Category[]).map((cat) => {
          const catPatterns = filtered.filter((p) => p.category === cat);
          if (catPatterns.length === 0) return null;
          const colors = categoryColors[cat];

          return (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1 h-8 rounded-full ${colors.text.replace("text-", "bg-")}`} style={{ backgroundColor: cat === "creational" ? "#3fb950" : cat === "structural" ? "#d29922" : "#f85149" }} />
                <div>
                  <h3 className={`text-lg font-bold ${colors.text}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t.categories[cat]}
                  </h3>
                  <p className="text-[#8b949e] text-xs">{t.categories[`${cat}_desc` as keyof typeof t.categories]}</p>
                </div>
                <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full border ${colors.badge}`}>
                  {catPatterns.length} {lang === "pt" ? "padrões" : "patterns"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catPatterns.map((pattern, i) => (
                  <PatternCard
                    key={pattern.id}
                    pattern={pattern}
                    index={i}
                    onClick={() => setSelectedPattern(pattern)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#8b949e]">
            <Code2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>{lang === "pt" ? "Nenhum padrão encontrado" : "No patterns found"}</p>
          </div>
        )}
      </div>

      {/* Pattern Modal */}
      <AnimatePresence>
        {selectedPattern && (
          <PatternModal
            pattern={selectedPattern}
            onClose={() => setSelectedPattern(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
