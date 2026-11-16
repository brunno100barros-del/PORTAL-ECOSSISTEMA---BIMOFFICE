/* BIMOFFICE · portal central
   Lê js/config.js e desenha os cartões. Nenhum endereço ou texto de aplicativo
   fica escrito aqui: para mudar qualquer um deles, edite apenas o config.js. */
(function () {
  "use strict";

  var CFG = window.BIMOFFICE_CONFIG;
  var ICONES = window.BIMOFFICE_ICONES || {};
  var CHAVE_TEMA = "bimoffice-tema";

  /* ---------- utilidades ---------- */

  // Aceita apenas http(s); qualquer outra coisa (ou vazio) é tratada como "sem endereço".
  function urlSegura(valor) {
    if (typeof valor !== "string" || !valor.trim()) return "";
    try {
      var u = new URL(valor.trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
    } catch (e) {
      return "";
    }
  }

  function el(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function svg(chave) {
    var span = el("span", "svg-wrap");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = ICONES[chave] || ""; // strings estáticas de js/icons.js
    return span;
  }

  /* ---------- tema ---------- */

  function lerTemaSalvo() {
    try { return localStorage.getItem(CHAVE_TEMA); } catch (e) { return null; }
  }

  function temaAtual() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    var botao = document.getElementById("tema-botao");
    if (botao) {
      var escuro = tema === "dark";
      botao.setAttribute("aria-pressed", String(escuro));
      botao.setAttribute("aria-label", escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro");
      botao.title = botao.getAttribute("aria-label");
      botao.replaceChildren(svg(escuro ? "sol" : "lua"));
    }
  }

  function iniciarTema() {
    var botao = document.getElementById("tema-botao");
    aplicarTema(temaAtual());
    botao.addEventListener("click", function () {
      var novo = temaAtual() === "dark" ? "light" : "dark";
      aplicarTema(novo);
      try { localStorage.setItem(CHAVE_TEMA, novo); } catch (e) { /* armazenamento indisponível */ }
    });
    // Sem escolha salva, acompanha o sistema operacional.
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (ev) {
        if (!lerTemaSalvo()) aplicarTema(ev.matches ? "dark" : "light");
      });
    }
  }

  /* ---------- cartões ---------- */

  function criarCartao(app, indice) {
    var urlApp = urlSegura(app.url);
    var urlRepo = urlSegura(app.repositorio);
    var disponivel = app.status === "disponivel" && !!urlApp;
    var provisoria = disponivel && app.urlProvisoria === true;

    var cartao = el("article", "card " + (disponivel ? "card--ativo" : "card--breve"));
    cartao.style.setProperty("--i", String(indice));
    cartao.dataset.app = app.id;
    cartao.dataset.status = disponivel ? "disponivel" : "em-breve";

    var topo = el("div", "card__topo");
    var tile = el("div", "card__icone");
    tile.appendChild(svg(app.icone));
    topo.appendChild(tile);
    topo.appendChild(el("span", "card__num", String(indice + 1).padStart(2, "0")));
    cartao.appendChild(topo);

    var titulo = el("h3", "card__nome");
    if (disponivel) {
      // O link principal cobre o cartão inteiro (::after). O ícone do GitHub é um
      // link irmão, fora deste <a>, então os dois cliques nunca se confundem.
      var link = el("a", "card__link", app.nome);
      link.href = urlApp;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", app.nome + (provisoria ? " — abrir repositório (endereço provisório)" : " — abrir aplicativo") + " em nova aba");
      titulo.appendChild(link);
    } else {
      titulo.textContent = app.nome;
    }
    cartao.appendChild(titulo);

    cartao.appendChild(el("p", "card__desc", app.descricao));

    var base = el("div", "card__base");
    var status = el("span", "status " + (disponivel ? "status--ativo" : "status--breve"));
    status.appendChild(el("i", "status__ponto"));
    status.appendChild(document.createTextNode(disponivel ? "DISPONÍVEL" : "EM BREVE"));
    base.appendChild(status);

    if (disponivel) {
      var acesso = el("span", "acesso");
      acesso.setAttribute("aria-hidden", "true");
      acesso.appendChild(el("span", "acesso__rotulo", provisoria ? "Repositório" : "Acessar"));
      var seta = el("span", "acesso__seta");
      seta.appendChild(svg("seta"));
      acesso.appendChild(seta);
      base.appendChild(acesso);
    }
    cartao.appendChild(base);

    if (urlRepo) {
      var gh = el("a", "card__github");
      gh.href = urlRepo;
      gh.target = "_blank";
      gh.rel = "noopener noreferrer";
      gh.title = "Repositório de " + app.nome + " no GitHub";
      gh.setAttribute("aria-label", "Repositório de " + app.nome + " no GitHub (nova aba)");
      gh.appendChild(svg("github"));
      cartao.appendChild(gh);
    }

    if (!disponivel) cartao.setAttribute("aria-disabled", "true");
    return cartao;
  }

  function desenharCartoes() {
    var grade = document.getElementById("apps");
    grade.replaceChildren.apply(grade, CFG.apps.map(criarCartao));
  }

  /* ---------- textos do portal ---------- */

  function saudacao() {
    var h = new Date().getHours();
    return h < 5 ? "Boa madrugada" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  }

  function preencherTextos() {
    var P = CFG.portal;
    document.title = P.nome + " · " + P.frase;
    document.getElementById("saudacao").textContent = saudacao();
    document.getElementById("frase").textContent = P.frase;
    document.getElementById("rodape-texto").textContent = P.rodape;
    document.querySelectorAll("[data-portal-nome]").forEach(function (n) { n.textContent = P.nome; });
    document.getElementById("subtitulo").textContent = P.subtitulo;
  }

  /* ---------- início ---------- */

  function iniciar() {
    if (!CFG || !Array.isArray(CFG.apps)) {
      document.getElementById("apps").textContent = "Configuração dos aplicativos não encontrada (js/config.js).";
      return;
    }
    preencherTextos();
    desenharCartoes();
    iniciarTema();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
