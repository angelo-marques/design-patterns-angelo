// Blueprint Architect Design — Code Showcase Section
// Animated code typing effect with pattern examples
// Shows a live rotating code snippet with syntax highlighting

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const snippets = [
  {
    lang: "Java",
    color: "#f89820",
    code: `// Singleton Pattern
public class DatabaseConnection {
    private static DatabaseConnection instance;
    
    private DatabaseConnection() {}
    
    public static synchronized 
    DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}`,
  },
  {
    lang: "C#",
    color: "#9b4f96",
    code: `// Observer Pattern
public class EventBus {
    private List<IObserver> _observers = new();
    
    public void Subscribe(IObserver obs) =>
        _observers.Add(obs);
    
    public void Publish<T>(T eventData) {
        foreach (var obs in _observers)
            obs.Handle(eventData);
    }
}`,
  },
  {
    lang: "Python",
    color: "#3572a5",
    code: `# Strategy Pattern
class PaymentProcessor:
    def __init__(self, strategy):
        self._strategy = strategy
    
    def process(self, amount: float):
        return self._strategy.pay(amount)

processor = PaymentProcessor(CreditCard())
result = processor.process(99.90)`,
  },
  {
    lang: "Ruby",
    color: "#cc342d",
    code: `# Decorator Pattern
class CoffeeDecorator
  def initialize(coffee)
    @coffee = coffee
  end
  
  def cost
    @coffee.cost
  end
  
  def description
    @coffee.description
  end
end`,
  },
];

function TypewriterCode({ code, color }: { code: string; color: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [code]);

  useEffect(() => {
    if (idx < code.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + code[idx]);
        setIdx((prev) => prev + 1);
      }, 12);
      return () => clearTimeout(timeout);
    }
  }, [idx, code]);

  const highlighted = displayed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /\b(public|private|class|static|void|new|return|def|end|if|for|self|synchronized|List|foreach|var|let|const)\b/g,
      `<span style="color:#ff7b72">$1</span>`
    )
    .replace(/(["'`])(.*?)\1/g, `<span style="color:#a5d6ff">$1$2$1</span>`)
    .replace(/(\/\/.*$|#.*$)/gm, `<span style="color:#8b949e;font-style:italic">$1</span>`)
    .replace(/\b([A-Z][a-zA-Z0-9]+)\b/g, `<span style="color:#ffa657">$1</span>`)
    .replace(/\b(\d+\.?\d*)\b/g, `<span style="color:#79c0ff">$1</span>`);

  return (
    <pre
      className="text-xs font-mono leading-relaxed text-[#e6edf3] whitespace-pre-wrap"
      style={{ fontFamily: "'Fira Code', monospace", minHeight: "200px" }}
      dangerouslySetInnerHTML={{ __html: highlighted + (idx < code.length ? '<span class="animate-pulse">▌</span>' : "") }}
    />
  );
}

export default function CodeShowcase() {
  const { lang } = useLanguage();
  const [activeSnippet, setActiveSnippet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSnippet((prev) => (prev + 1) % snippets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = snippets[activeSnippet];

  return (
    <section className="py-20 bg-[#0a0e14] relative overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#3fb950]/10 border border-[#3fb950]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
              <span className="text-[#3fb950] text-sm font-medium">
                {lang === "pt" ? "Código Real, Exemplos Práticos" : "Real Code, Practical Examples"}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {lang === "pt" ? (
                <>
                  Aprenda com{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#3fb950]">
                    código real
                  </span>
                </>
              ) : (
                <>
                  Learn with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#3fb950]">
                    real code
                  </span>
                </>
              )}
            </h2>

            <p className="text-[#8b949e] text-base leading-relaxed mb-8">
              {lang === "pt"
                ? "Cada padrão vem com exemplos completos e funcionais em Java, C#, Python e Ruby. Código limpo, comentado e pronto para usar em seus projetos."
                : "Each pattern comes with complete, working examples in Java, C#, Python and Ruby. Clean, commented code ready to use in your projects."}
            </p>

            {/* Language selector */}
            <div className="flex gap-2 flex-wrap">
              {snippets.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSnippet(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    activeSnippet === i
                      ? "text-[#0d1117] border-transparent"
                      : "bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white hover:border-[#58a6ff]/30"
                  }`}
                  style={activeSnippet === i ? { backgroundColor: s.color, borderColor: s.color } : {}}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeSnippet === i ? "#0d1117" : s.color }}
                  />
                  {s.lang}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Code window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl"
              style={{ backgroundColor: current.color }}
            />

            <div className="relative bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#21262d] border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f85149]" />
                  <div className="w-3 h-3 rounded-full bg-[#d29922]" />
                  <div className="w-3 h-3 rounded-full bg-[#3fb950]" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSnippet}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-mono"
                    style={{ color: current.color }}
                  >
                    {current.lang}
                  </motion.span>
                </AnimatePresence>
                <div className="flex gap-1">
                  {snippets.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ backgroundColor: i === activeSnippet ? current.color : "#30363d" }}
                    />
                  ))}
                </div>
              </div>

              {/* Line numbers + code */}
              <div className="flex">
                <div className="py-4 px-3 text-right select-none border-r border-[#30363d] min-w-[2.5rem]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="text-[#8b949e] text-xs font-mono leading-relaxed">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="py-4 px-4 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSnippet}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypewriterCode code={current.code} color={current.color} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
