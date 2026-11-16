/* BIMOFFICE · portal central
   Lê js/config.js (aplicativos) e js/conteudo.js (informações) e desenha a página.
   Nenhum endereço ou texto de aplicativo fica escrito aqui. */
(function () {
  "use strict";

  var CFG = window.BIMOFFICE_CONFIG;
  var TXT = window.BIMOFFICE_CONTEUDO || {};
  var U = window.BIMOFFICE_COMUM;
  var el = U.el, svg = U.svg;

  function temApresentacao(app) {
    var c = TXT[app.id];
    return !!(c && !c.emBreve && c.fluxo && c.destaques && U.disponivel(app));
  }

  /* ---------- cartões ---------- */

  function criarCartao(app, indice) {
    var urlApp = U.urlSegura(app.url);
    var urlRepo = U.urlSegura(app.repositorio);
    var disponivel = U.disponivel(app);
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

    // Destaque que leva à apresentação do produto. É um link irmão do link principal
    // (nunca aninhado) e fica acima da área clicável do cartão.
    if (temApresentacao(app)) {
      var saibaMais = el("a", "card__info");
      saibaMais.href = "apresentacao.html#" + encodeURIComponent(app.id);
      saibaMais.appendChild(el("span", "card__info-texto", "Entenda a funcionalidade do programa clicando aqui"));
      saibaMais.appendChild(svg("seta"));
      saibaMais.setAttribute("aria-label", "Entenda a funcionalidade do " + app.nome + ": abrir a apresentação");
      cartao.appendChild(saibaMais);
    }

    var base = el("div", "card__base");
    var status = el("span", "status " + (disponivel ? "status--ativo" : "status--breve"));
    status.appendChild(el("i", "status__ponto"));
    status.appendChild(document.createTextNode(U.rotuloStatus(disponivel)));
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

  /* ---------- informações: o que cada produto faz ---------- */

  function criarLinhaInfo(app) {
    var c = TXT[app.id] || {};
    var disponivel = U.disponivel(app);
    var linha = el("article", "info rev");
    linha.dataset.app = app.id;

    var tile = el("div", "info__icone");
    tile.appendChild(svg(app.icone));
    linha.appendChild(tile);

    var corpo = el("div", "info__corpo");
    var cab = el("div", "info__cab");
    cab.appendChild(el("h3", "info__nome", app.nome));
    var st = el("span", "status " + (disponivel ? "status--ativo" : "status--breve"));
    st.appendChild(el("i", "status__ponto"));
    st.appendChild(document.createTextNode(U.rotuloStatus(disponivel)));
    cab.appendChild(st);
    corpo.appendChild(cab);
    corpo.appendChild(el("p", "info__texto", c.oQueFaz || app.descricao));

    var chips = el("ul", "chips");
    (c.chips || []).forEach(function (t) { chips.appendChild(el("li", "chip", t)); });
    corpo.appendChild(chips);
    linha.appendChild(corpo);

    var acao = el("div", "info__acao");
    if (temApresentacao(app)) {
      var a = el("a", "btn btn--sec", "Ver apresentação");
      a.href = "apresentacao.html#" + encodeURIComponent(app.id);
      a.appendChild(svg("seta"));
      acao.appendChild(a);
    } else {
      acao.appendChild(el("span", "info__breve", "Apresentação em breve"));
    }
    linha.appendChild(acao);
    return linha;
  }

  function desenharInformacoes() {
    var lista = document.getElementById("info-lista");
    lista.replaceChildren.apply(lista, CFG.apps.map(criarLinhaInfo));
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

  /* ---------- navegação: destaca a seção visível ---------- */

  function iniciarNavegacao() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          l.setAttribute("aria-current", l.getAttribute("href") === "#" + e.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    links.forEach(function (l) {
      var alvo = document.querySelector(l.getAttribute("href"));
      if (alvo) io.observe(alvo);
    });
  }

  function iniciar() {
    if (!CFG || !Array.isArray(CFG.apps)) {
      document.getElementById("apps").textContent = "Configuração dos aplicativos não encontrada (js/config.js).";
      return;
    }
    preencherTextos();
    desenharCartoes();
    desenharInformacoes();
    U.iniciarTema();
    U.revelar();
    iniciarNavegacao();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
