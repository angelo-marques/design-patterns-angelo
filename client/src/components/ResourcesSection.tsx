// Blueprint Architect Design — Resources Section
// Links to reference sites and books

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Globe, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const resources = [
  {
    icon: "🦅",
    name: "Refactoring Guru",
    url: "https://refactoring.guru/pt-br/design-patterns",
    desc_pt: "O guia mais visual e completo de Design Patterns, com diagramas UML e exemplos em múltiplas linguagens.",
    desc_en: "The most visual and complete Design Patterns guide, with UML diagrams and examples in multiple languages.",
    tag: "Web",
    color: "#58a6ff",
  },
  {
    icon: "📐",
    name: "Source Making",
    url: "https://sourcemaking.com/design_patterns",
    desc_pt: "Referência clássica com explicações detalhadas, anti-patterns e exemplos práticos de refatoração.",
    desc_en: "Classic reference with detailed explanations, anti-patterns and practical refactoring examples.",
    tag: "Web",
    color: "#3fb950",
  },
  {
    icon: "🎨",
    name: "UI Patterns",
    url: "https://ui-patterns.com/patterns",
    desc_pt: "Padrões de interface de usuário para design de produtos digitais e experiências interativas.",
    desc_en: "User interface patterns for digital product design and interactive experiences.",
    tag: "UI/UX",
    color: "#d29922",
  },
  {
    icon: "📚",
    name: "Design Patterns (GoF)",
    url: "https://www.amazon.com.br/Padrões-Projetos-Soluções-Reutilizáveis-Orientados/dp/8573076100",
    desc_pt: "O livro original do Gang of Four — a bíblia dos Design Patterns. Leitura obrigatória para todo desenvolvedor.",
    desc_en: "The original Gang of Four book — the Design Patterns bible. Required reading for every developer.",
    tag: "Livro",
    color: "#f85149",
  },
];

export default function ResourcesSection() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#d29922]/10 border border-[#d29922]/30 rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#d29922]" />
            <span className="text-[#d29922] text-sm font-medium">
              {lang === "pt" ? "Recursos & Referências" : "Resources & References"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {lang === "pt" ? "Aprenda Mais" : "Learn More"}
          </h2>
          <p className="text-[#8b949e] text-sm max-w-xl mx-auto">
            {lang === "pt"
              ? "Recursos curados para aprofundar seu conhecimento em Design Patterns e arquitetura de software."
              : "Curated resources to deepen your knowledge in Design Patterns and software architecture."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((res, i) => (
            <motion.a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-opacity-60 transition-all duration-300 block"
              style={{ borderColor: `${res.color}20` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{res.icon}</span>
                <div className="flex items-center gap-1">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${res.color}20`, color: res.color }}
                  >
                    {res.tag}
                  </span>
                  <ExternalLink
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: res.color }}
                  />
                </div>
              </div>

              <h3
                className="font-bold text-sm mb-2 group-hover:text-white transition-colors"
                style={{ color: res.color, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {res.name}
              </h3>

              <p className="text-[#8b949e] text-xs leading-relaxed">
                {lang === "pt" ? res.desc_pt : res.desc_en}
              </p>
            </motion.a>
          ))}
        </div>

        {/* GoF patterns count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#161b22] border border-[#30363d] rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {lang === "pt" ? "Os 23 Padrões GoF" : "The 23 GoF Patterns"}
            </h3>
            <p className="text-[#8b949e] text-sm">
              {lang === "pt"
                ? "Todos os padrões do livro original 'Design Patterns: Elements of Reusable Object-Oriented Software' (1994)"
                : "All patterns from the original book 'Design Patterns: Elements of Reusable Object-Oriented Software' (1994)"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: lang === "pt" ? "Criacionais (5)" : "Creational (5)",
                color: "#3fb950",
                items: ["Abstract Factory", "Builder", "Factory Method", "Prototype", "Singleton"],
              },
              {
                title: lang === "pt" ? "Estruturais (7)" : "Structural (7)",
                color: "#d29922",
                items: ["Adapter", "Bridge", "Composite", "Decorator", "Facade", "Flyweight", "Proxy"],
              },
              {
                title: lang === "pt" ? "Comportamentais (11)" : "Behavioral (11)",
                color: "#f85149",
                items: [
                  "Chain of Responsibility", "Command", "Interpreter", "Iterator",
                  "Mediator", "Memento", "Observer", "State", "Strategy", "Template Method", "Visitor"
                ],
              },
            ].map((group, i) => (
              <div key={i}>
                <h4 className="font-bold text-sm mb-3" style={{ color: group.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-[#8b949e]">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: group.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
