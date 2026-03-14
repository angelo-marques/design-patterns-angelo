# Design Patterns — Angelo Silva

Um guia completo e interativo de Design Patterns com exemplos em Java, C#, Python e Ruby.

## 🎯 Sobre

Este site é uma referência profissional de Design Patterns, desenvolvido por **Angelo Marques de Oliveira Silva**, um Tech Lead com mais de 17 anos de experiência em desenvolvimento de software.

O site apresenta os 22 padrões clássicos do Gang of Four (GoF) organizados em 3 categorias:

- **Criacionais** (4 padrões): Singleton, Factory Method, Abstract Factory, Builder
- **Estruturais** (3 padrões): Adapter, Decorator, Facade
- **Comportamentais** (3 padrões): Observer, Strategy, Command

## 🚀 Tecnologias

- **React 18** via CDN (sem build tool)
- **Tailwind CSS** via CDN
- **Babel Standalone** para JSX
- **Node.js + Express** para servir arquivos estáticos
- **Suporte bilíngue** (Português e Inglês)

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar Localmente

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
design-patterns-angelo/
├── public/
│   ├── index.html      # HTML principal com React via CDN
│   ├── app.js          # Aplicação React com componentes
│   ├── data.js         # Dados dos padrões e traduções
│   └── favicon.ico
├── package.json
├── server.js           # Servidor Express
└── README.md
```

## ✨ Funcionalidades

- ✅ 10 padrões de design com exemplos completos
- ✅ 4 linguagens de programação (Java, C#, Python, Ruby)
- ✅ Suporte bilíngue (PT/EN)
- ✅ Modal interativo com detalhes de cada padrão
- ✅ Syntax highlighting para código
- ✅ Botão de copiar código
- ✅ Filtro por categoria
- ✅ Busca por nome de padrão
- ✅ Design moderno com tema Blueprint Architect

## 🎨 Design

O site utiliza um design **Blueprint Architect** com:

- Fundo azul-preto profundo (`#0d1117`)
- Tipografia **Space Grotesk** para títulos
- Tipografia **Fira Code** para código
- Cores por categoria:
  - 🟢 Verde: Padrões Criacionais
  - 🟡 Âmbar: Padrões Estruturais
  - 🔴 Vermelho: Padrões Comportamentais

## 📝 Exemplos de Código

Cada padrão inclui exemplos completos em:

- **Java**: Implementações com classes e interfaces
- **C#**: Código .NET com padrões modernos
- **Python**: Implementações Pythônicas
- **Ruby**: Código Ruby idiomático

## 🔗 Links Úteis

- [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns)
- [Source Making](https://sourcemaking.com/design_patterns)
- [UI Patterns](https://ui-patterns.com/patterns)

## 👤 Autor

**Angelo Marques de Oliveira Silva**

- Tech Lead & Full Stack Developer
- 17+ anos de experiência
- Especialista em arquitetura de software
- Certificado em TDD, DDD, BDD, SOLID, Clean Code e Clean Architecture

## 📄 Licença

MIT

## 🚀 Deploy

Para fazer deploy do site, use o botão **Publish** na plataforma Manus.

O site é totalmente estático e não requer build tool, funcionando perfeitamente com GitHub Actions e CI/CD.
