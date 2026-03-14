const { useState, useEffect, useRef, useCallback } = React;

// Data inline
const translations = window.translations || {};
const patterns = window.patterns || [];
const categoryColors = window.categoryColors || {};

// Navbar Component
function Navbar({ lang, setLang }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-sm border-b border-[#30363d]">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#58a6ff] rounded-lg flex items-center justify-center text-[#0d1117] font-bold">
            &lt;/&gt;
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Design Patterns
          </span>
          <span className="text-[#8b949e] text-xs">BY ANGELO SILVA</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-[#8b949e] hover:text-white transition">
            {lang === 'pt' ? translations.pt.nav.home : translations.en.nav.home}
          </button>
          <button className="text-[#8b949e] hover:text-white transition">
            {lang === 'pt' ? translations.pt.nav.patterns : translations.en.nav.patterns}
          </button>
          <button className="text-[#8b949e] hover:text-white transition">
            {lang === 'pt' ? translations.pt.nav.about : translations.en.nav.about}
          </button>
          <button className="text-[#8b949e] hover:text-white transition">
            {lang === 'pt' ? translations.pt.nav.contact : translations.en.nav.contact}
          </button>
          
          <div className="flex gap-2 border-l border-[#30363d] pl-6">
            <button 
              onClick={() => setLang('pt')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${lang === 'pt' ? 'bg-[#58a6ff] text-[#0d1117]' : 'text-[#8b949e] hover:text-white'}`}
            >
              PT
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${lang === 'en' ? 'bg-[#58a6ff] text-[#0d1117]' : 'text-[#8b949e] hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection({ lang }) {
  const t = lang === 'pt' ? translations.pt : translations.en;
  
  return (
    <section className="pt-32 pb-20 bg-[#0d1117] relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#58a6ff] rounded-full blur-3xl opacity-10"></div>
      
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#58a6ff] animate-pulse"></div>
              <span className="text-[#58a6ff] text-sm font-medium">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#3fb950]">
                {t.hero.subtitle}
              </span>
            </h1>
            
            <p className="text-[#8b949e] text-lg leading-relaxed mb-8">
              {t.hero.description}
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-3 bg-[#58a6ff] text-[#0d1117] rounded-lg font-bold hover:bg-[#79c0ff] transition">
                {t.hero.cta1}
              </button>
              <button className="px-8 py-3 border border-[#30363d] text-white rounded-lg font-bold hover:border-[#58a6ff]/50 transition">
                {t.hero.cta2}
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-4 gap-4">
              <div>
                <div className="text-3xl font-black text-[#58a6ff]">22</div>
                <div className="text-[#8b949e] text-sm">{lang === 'pt' ? 'Padrões' : 'Patterns'}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#3fb950]">4</div>
                <div className="text-[#8b949e] text-sm">{lang === 'pt' ? 'Linguagens' : 'Languages'}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#d29922]">17+</div>
                <div className="text-[#8b949e] text-sm">{lang === 'pt' ? 'Anos de Exp.' : 'Years Exp.'}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#f85149]">3</div>
                <div className="text-[#8b949e] text-sm">{lang === 'pt' ? 'Categorias' : 'Categories'}</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="w-full aspect-square bg-gradient-to-br from-[#58a6ff]/20 to-[#3fb950]/20 rounded-2xl border border-[#30363d] overflow-hidden">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/hero-bg_96458d3e.jpg"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection({ lang }) {
  const t = lang === 'pt' ? translations.pt : translations.en;
  
  const categories = [
    {
      ...t.categories.creational,
      color: categoryColors.creational,
      count: patterns.filter(p => p.category === 'creational').length
    },
    {
      ...t.categories.structural,
      color: categoryColors.structural,
      count: patterns.filter(p => p.category === 'structural').length
    },
    {
      ...t.categories.behavioral,
      color: categoryColors.behavioral,
      count: patterns.filter(p => p.category === 'behavioral').length
    }
  ];
  
  return (
    <section className="py-20 bg-[#0a0e14] relative">
      <div className="absolute inset-0 blueprint-grid"></div>
      
      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.categories.title}
          </h2>
          <p className="text-[#8b949e]">{t.categories.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="bg-[#161b22] border-2 border-dashed p-6 rounded-xl hover:border-opacity-100 transition cursor-pointer" style={{ borderColor: `${cat.color}40` }}>
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: cat.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cat.name}
                </h3>
                <p className="text-[#8b949e] text-sm mb-4">{cat.desc}</p>
                <div className="text-xs font-semibold" style={{ color: cat.color }}>
                  {cat.count} {lang === 'pt' ? 'padrões' : 'patterns'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Patterns Grid
function PatternsGrid({ lang, selectedCategory, searchTerm }) {
  const t = lang === 'pt' ? translations.pt : translations.en;
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedLang, setSelectedLang] = useState('java');
  const [copied, setCopied] = useState(false);
  
  let filtered = patterns;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  const copyCode = () => {
    const code = selectedPattern[selectedLang];
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pattern) => (
          <div
            key={pattern.id}
            onClick={() => setSelectedPattern(pattern)}
            className="bg-[#161b22] border-2 border-dashed p-4 rounded-lg hover:border-opacity-100 transition cursor-pointer"
            style={{ borderColor: `${categoryColors[pattern.category]}40` }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{pattern.icon}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${categoryColors[pattern.category]}20`, color: categoryColors[pattern.category] }}>
                {lang === 'pt' ? (pattern.category === 'creational' ? 'Criacional' : pattern.category === 'structural' ? 'Estrutural' : 'Comportamental') : (pattern.category === 'creational' ? 'Creational' : pattern.category === 'structural' ? 'Structural' : 'Behavioral')}
              </span>
            </div>
            <h3 className="font-bold text-white mb-2">{pattern.name}</h3>
            <p className="text-[#8b949e] text-xs line-clamp-2">
              {lang === 'pt' ? pattern.intent_pt : pattern.intent_en}
            </p>
          </div>
        ))}
      </div>
      
      {selectedPattern && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPattern(null)}>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#21262d] border-b border-[#30363d] p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {selectedPattern.name}
              </h2>
              <button onClick={() => setSelectedPattern(null)} className="text-[#8b949e] hover:text-white">✕</button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[#58a6ff] font-bold mb-2">{t.patterns.intent}</h3>
                <p className="text-[#8b949e]">{lang === 'pt' ? selectedPattern.intent_pt : selectedPattern.intent_en}</p>
              </div>
              
              <div>
                <h3 className="text-[#f85149] font-bold mb-2">{t.patterns.problem}</h3>
                <p className="text-[#8b949e]">{lang === 'pt' ? selectedPattern.problem_pt : selectedPattern.problem_en}</p>
              </div>
              
              <div>
                <h3 className="text-[#3fb950] font-bold mb-2">{t.patterns.solution}</h3>
                <p className="text-[#8b949e]">{lang === 'pt' ? selectedPattern.solution_pt : selectedPattern.solution_en}</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold">{lang === 'pt' ? 'Exemplos de Código' : 'Code Examples'}</h3>
                  <button 
                    onClick={copyCode}
                    className="text-xs px-3 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded hover:bg-[#58a6ff]/20 transition"
                  >
                    {copied ? t.patterns.copied : t.patterns.copy}
                  </button>
                </div>
                
                <div className="flex gap-2 mb-3">
                  {['java', 'csharp', 'python', 'ruby'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${selectedLang === lang ? 'bg-[#58a6ff] text-[#0d1117]' : 'bg-[#21262d] text-[#8b949e] hover:text-white'}`}
                    >
                      {lang === 'csharp' ? 'C#' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                
                <pre className="bg-[#0d1117] p-4 rounded text-xs overflow-x-auto text-[#e6edf3]" style={{ fontFamily: "'Fira Code', monospace" }}>
                  {selectedPattern[selectedLang]}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main App
function App() {
  const [lang, setLang] = useState('pt');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const t = lang === 'pt' ? translations.pt : translations.en;
  
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <CategoriesSection lang={lang} />
      
      <section className="py-20 bg-[#0d1117]">
        <div className="container">
          <div className="mb-8">
            <input
              type="text"
              placeholder={t.patterns.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>
          
          <div className="flex gap-2 mb-8 flex-wrap">
            {['all', 'creational', 'structural', 'behavioral'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-sm font-medium transition ${selectedCategory === cat ? 'bg-[#58a6ff] text-[#0d1117]' : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-white'}`}
              >
                {cat === 'all' ? t.patterns.all : cat === 'creational' ? (lang === 'pt' ? 'Criacionais' : 'Creational') : cat === 'structural' ? (lang === 'pt' ? 'Estruturais' : 'Structural') : (lang === 'pt' ? 'Comportamentais' : 'Behavioral')}
              </button>
            ))}
          </div>
          
          <PatternsGrid lang={lang} selectedCategory={selectedCategory} searchTerm={searchTerm} />
        </div>
      </section>
      
      <footer className="bg-[#0a0e14] border-t border-[#30363d] py-8">
        <div className="container text-center text-[#8b949e] text-sm">
          <p>Design Patterns Reference by Angelo Marques de Oliveira Silva © 2026</p>
        </div>
      </footer>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
