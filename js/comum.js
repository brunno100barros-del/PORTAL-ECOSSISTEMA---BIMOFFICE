/* BIMOFFICE · utilitários compartilhados pelas páginas (portal e apresentações). */
(function () {
  "use strict";

  var CHAVE_TEMA = "bimoffice-tema";
  var C = {};

  // Aceita apenas http(s); qualquer outra coisa (ou vazio) é tratada como "sem endereço".
  C.urlSegura = function (valor) {
    if (typeof valor !== "string" || !valor.trim()) return "";
    try {
      var u = new URL(valor.trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
    } catch (e) { return ""; }
  };

  C.esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  C.el = function (tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  };

  C.svg = function (chave) {
    var span = C.el("span", "svg-wrap");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = (window.BIMOFFICE_ICONES || {})[chave] || ""; // strings estáticas de js/icons.js
    return span;
  };

  // Um aplicativo está disponível quando o status é "disponivel" E existe endereço válido.
  C.disponivel = function (app) {
    return app.status === "disponivel" && !!C.urlSegura(app.url);
  };

  C.rotuloStatus = function (disponivel) {
    var r = (window.BIMOFFICE_CONFIG.portal || {}).rotulos || {};
    return disponivel ? (r.disponivel || "DISPONÍVEL") : (r["em-breve"] || "EM BREVE");
  };

  /* ---------- tema ---------- */
  function lerSalvo() { try { return localStorage.getItem(CHAVE_TEMA); } catch (e) { return null; } }
  function atual() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function aplicar(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    var b = document.getElementById("tema-botao");
    if (!b) return;
    var escuro = tema === "dark";
    b.setAttribute("aria-pressed", String(escuro));
    b.setAttribute("aria-label", escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro");
    b.title = b.getAttribute("aria-label");
    b.replaceChildren(C.svg(escuro ? "sol" : "lua"));
  }
  C.iniciarTema = function () {
    var b = document.getElementById("tema-botao");
    aplicar(atual());
    b.addEventListener("click", function () {
      var novo = atual() === "dark" ? "light" : "dark";
      aplicar(novo);
      try { localStorage.setItem(CHAVE_TEMA, novo); } catch (e) { /* armazenamento indisponível */ }
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (ev) {
        if (!lerSalvo()) aplicar(ev.matches ? "dark" : "light");
      });
    }
  };

  /* ---------- revelar ao rolar ---------- */
  C.revelar = function (raiz) {
    var itens = (raiz || document).querySelectorAll(".rev:not(.on)");
    if (!("IntersectionObserver" in window)) { itens.forEach(function (n) { n.classList.add("on"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    itens.forEach(function (n) { io.observe(n); });
  };

  window.BIMOFFICE_COMUM = C;
})();
