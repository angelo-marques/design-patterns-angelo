# Brainstorming de Design — Design Patterns by Angelo Silva

## Contexto
Site de referência sobre Design Patterns para a comunidade de programadores, com perfil profissional do Angelo Silva (Tech Lead, 17+ anos de experiência). Deve ser bilíngue (PT/EN), com exemplos de código em Java, C#, Python e Ruby.

---

<response>
<text>
## Ideia 1 — "Terminal Noir" (Probabilidade: 0.07)

**Design Movement:** Cyberpunk Brutalism + Terminal Aesthetic

**Core Principles:**
- Interface que evoca um terminal de código real, mas elevada com tipografia expressiva
- Contraste extremo: fundo quase preto com texto verde-neon e acentos âmbar
- Hierarquia visual construída com monoespaçado para código e serif para prosa
- Grids assimétricos que quebram a monotonia do layout tradicional de documentação

**Color Philosophy:**
- Background: `#0a0e0a` (preto-floresta profundo)
- Primary text: `#e8f5e9` (branco-verde suave)
- Code accent: `#00ff41` (verde Matrix)
- Highlight: `#ffb300` (âmbar quente)
- Danger/Behavioral: `#ff4444` (vermelho terminal)
- Emocional: transmite poder técnico, competência e profundidade

**Layout Paradigm:**
- Sidebar fixa à esquerda com navegação de padrões (como um explorador de arquivos)
- Conteúdo principal em coluna larga com código em destaque
- Hero assimétrico com texto à esquerda e animação de código à direita
- Cards de padrões com bordas neon e efeito de scan-line

**Signature Elements:**
- Linhas de "scan" animadas sobre imagens (efeito CRT)
- Prefixos de terminal `>_` antes de títulos de seção
- Numeração de linhas em blocos de código com syntax highlighting real

**Interaction Philosophy:**
- Hover em cards: borda neon pulsa e aparece preview do padrão
- Transições de página: efeito de "glitch" rápido
- Scroll: elementos entram com efeito de "digitação"

**Animation:**
- Texto principal: typewriter effect no hero
- Cards: fade-in com leve translateY ao entrar na viewport
- Código: syntax highlight progressivo ao aparecer

**Typography System:**
- Display: `JetBrains Mono` (bold) para títulos
- Body: `Source Serif 4` para prosa explicativa
- Code: `JetBrains Mono` (regular) para exemplos
</text>
<probability>0.07</probability>
</response>

---

<response>
<text>
## Ideia 2 — "Blueprint Architect" (Probabilidade: 0.09) ← ESCOLHIDA

**Design Movement:** Technical Blueprint + Modern Editorial

**Core Principles:**
- Estética de planta arquitetônica digital: linhas precisas, grid técnico, anotações
- Fundo escuro azul-marinho profundo com linhas de grid sutis (como papel milimetrado)
- Tipografia que mistura display sans-serif bold com monospace para código
- Layout editorial com colunas assimétricas e uso intencional de espaço negativo

**Color Philosophy:**
- Background: `#0d1117` (azul-preto GitHub-inspired)
- Grid lines: `#161b22` (azul-escuro sutil)
- Primary: `#58a6ff` (azul elétrico — links, destaques)
- Secondary: `#3fb950` (verde esmeralda — sucesso, Creational)
- Accent: `#d29922` (âmbar dourado — Structural)
- Danger: `#f85149` (vermelho coral — Behavioral)
- Text: `#e6edf3` (branco-azulado)
- Emocional: transmite precisão técnica, confiança, autoridade intelectual

**Layout Paradigm:**
- Navbar horizontal com indicador de idioma PT/EN proeminente
- Hero com split-screen: texto à esquerda + animação de diagrama UML à direita
- Cards de padrões em grid 3 colunas com cor por categoria
- Seção de perfil do Angelo em layout "about page" com timeline de carreira
- Código em tabs (Java | C# | Python | Ruby) com syntax highlighting

**Signature Elements:**
- Linhas de grid sutis no background (blueprint paper)
- Badges coloridos por categoria (Criacional/Estrutural/Comportamental)
- Diagrama UML simplificado em cada card de padrão

**Interaction Philosophy:**
- Hover em cards: elevação com sombra azul e reveal de snippet de código
- Tabs de linguagem: transição suave entre exemplos
- Scroll: parallax sutil no hero, elementos animam ao entrar na viewport

**Animation:**
- Hero: counter animado de estatísticas (17 anos, 22 padrões, 4 linguagens)
- Cards: stagger animation ao carregar a lista
- Código: fade-in por linha ao trocar de tab

**Typography System:**
- Display: `Space Grotesk` (700/800) para títulos de seção
- Body: `Inter` (400/500) para prosa — mas usado com tamanhos variados para hierarquia
- Code: `Fira Code` com ligatures para exemplos de código
</text>
<probability>0.09</probability>
</response>

---

<response>
<text>
## Ideia 3 — "Ink & Circuit" (Probabilidade>0.06)

**Design Movement:** Swiss International Typographic Style + Circuit Board Aesthetics

**Core Principles:**
- Tipografia como elemento visual principal — tamanhos extremos criam hierarquia
- Fundo branco-creme com detalhes de circuito em cinza muito claro
- Cor usada com parcimônia: apenas um acento vibrante (laranja técnico)
- Grid de 12 colunas com quebras intencionais para criar tensão visual

**Color Philosophy:**
- Background: `#fafaf8` (branco-creme quente)
- Circuit details: `#e8e8e4` (cinza muito claro)
- Primary: `#1a1a1a` (preto-quase)
- Accent: `#e85d04` (laranja técnico — único acento de cor)
- Code bg: `#1e1e2e` (escuro para blocos de código)
- Emocional: transmite clareza, autoridade acadêmica, precisão suíça

**Layout Paradigm:**
- Navegação lateral esquerda fixa com índice de padrões
- Conteúdo em coluna central larga com margens generosas
- Números de seção gigantes em background (decorativos)
- Linha horizontal espessa separa seções

**Signature Elements:**
- Números de padrão em tipografia gigante (decorativa, baixa opacidade)
- Linha de acento laranja em elementos de destaque
- Ícones geométricos simples para cada categoria

**Interaction Philosophy:**
- Hover: sublinhado animado em laranja
- Transições: fade simples e rápido
- Scroll: indicador de progresso lateral

**Animation:**
- Números decorativos: parallax ao scroll
- Seções: fade-in limpo
- Código: highlight progressivo

**Typography System:**
- Display: `Syne` (800) para títulos grandes
- Body: `Lora` (serif) para prosa
- Code: `IBM Plex Mono` para exemplos
</text>
<probability>0.06</probability>
</response>

---

## Decisão Final: **Blueprint Architect** (Ideia 2)

Escolhida por combinar autoridade técnica com apelo visual moderno, adequada para uma audiência de programadores experientes. O esquema de cores escuro com acentos coloridos por categoria facilita a navegação e cria identidade visual forte.
