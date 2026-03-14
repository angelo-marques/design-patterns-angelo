import { createElement as h } from "https://esm.sh/react@19.2.1";
import { createRoot } from "https://esm.sh/react-dom@19.2.1/client";

function App() {
  return h(
    "main",
    { className: "container" },
    h(
      "section",
      { className: "panel" },
      h("span", { className: "badge" }, "React 19.2.1 • sem Vite"),
      h("h1", null, "Design Patterns — Angelo Silva"),
      h(
        "p",
        null,
        "Contorno aplicado: frontend continua em React, mas sem Vite na pipeline. Deploy estático no GitHub Pages para aumentar estabilidade."
      ),
      h(
        "div",
        { className: "grid" },
        h("div", { className: "card" }, h("strong", null, "Criacionais"), h("br"), "Factory Method, Builder, Singleton"),
        h("div", { className: "card" }, h("strong", null, "Estruturais"), h("br"), "Adapter, Decorator, Facade"),
        h("div", { className: "card" }, h("strong", null, "Comportamentais"), h("br"), "Observer, Strategy, Command")
      ),
      h("p", { className: "muted" }, `Rota atual: ${window.location.pathname}`)
    )
  );
}

createRoot(document.getElementById("root")).render(h(App));
