/* BIMOFFICE · mini apresentação de um aplicativo (apresentacao.html#<id>)
   Monta a página a partir de js/config.js (endereços, status) e js/conteudo.js (textos). */
(function () {
  "use strict";

  var CFG = window.BIMOFFICE_CONFIG;
  var TXT = window.BIMOFFICE_CONTEUDO || {};
  var U = window.BIMOFFICE_COMUM;
  var esc = U.esc;

  var id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
  var app = (CFG.apps || []).filter(function (a) { return a.id === id; })[0];
  var C = TXT[id];

  // Sem apresentação para este aplicativo: volta ao portal.
  if (!app || !C || C.emBreve || !C.fluxo || !U.disponivel(app)) {
    location.replace("index.html#informacoes");
    return;
  }

  var urlApp = U.urlSegura(app.url);
  var urlRepo = U.urlSegura(app.repositorio);
  var provisoria = app.urlProvisoria === true;
  var rotuloAcesso = provisoria ? "Abrir repositório" : "Acessar " + app.nome;

  /* ---------- ilustrações (dados fictícios, só para ilustrar) ---------- */

  // Cena isométrica: uma viga (azul) atravessada por um duto (cobre); a interseção em vermelho.
  function cenaCoordix() {
    var s = 34, ox = 360, oy = 96, k = Math.cos(Math.PI / 6);
    function P(x, y, z) { return [(ox + (x - y) * k * s).toFixed(1), (oy + (x + y) * 0.5 * s - z * s).toFixed(1)].join(","); }
    function poly(pts, fill, extra) { return '<polygon points="' + pts.map(function (p) { return P(p[0], p[1], p[2]); }).join(" ") + '" fill="' + fill + '" ' + (extra || "") + "/>"; }
    function box(x0, x1, y0, y1, z0, z1, c, extra) {
      return poly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], c[0], extra) +
             poly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], c[2], extra) +
             poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], c[1], extra);
    }
    var grade = "";
    for (var i = 0; i <= 8; i++) {
      grade += '<polyline points="' + P(i, 0, 0) + " " + P(i, 8, 0) + '" />' + '<polyline points="' + P(0, i, 0) + " " + P(8, i, 0) + '" />';
    }
    var azul = ["#7fb0ee", "#5b92d6", "#4677b6"], cobre = ["#f3a468", "#de7d43", "#b8602c"], verm = ["#ff8a82", "#f0625a", "#c9443d"];
    return '<svg class="mock__cena" viewBox="0 0 720 400" role="img" aria-label="Ilustração: uma viga e um duto se cruzando, com a interseção destacada">' +
      '<g fill="none" stroke="var(--mock-grid)" stroke-width="1">' + grade + "</g>" +
      box(0.6, 7.4, 2.6, 3.6, 2, 3, azul) +
      box(3.6, 4.6, 0.6, 7.2, 2.4, 3.4, cobre, 'opacity=".92"') +
      box(3.6, 4.6, 2.6, 3.6, 2.4, 3, verm) +
      '<circle cx="' + P(4.1, 3.1, 2.7).split(",")[0] + '" cy="' + P(4.1, 3.1, 2.7).split(",")[1] + '" r="30" fill="none" stroke="#f0625a" stroke-width="1.5" stroke-dasharray="4 5" opacity=".9"/>' +
      "</svg>";
  }

  function visualCoordix() {
    return '<div class="mock">' + cenaCoordix() +
      '<div class="flutua flutua--a"><b><span class="dot"></span>CLASH · P1</b><small>Estrutura × Hidráulica · Pav. 02</small></div>' +
      '<div class="flutua flutua--c"><b>Câmera no conflito</b><small>A em vermelho · B em azul</small></div>' +
      '<div class="flutua flutua--b"><b><span class="dot dot--ok"></span>Validado</b><small>Vira issue com prazo e responsável</small></div>' +
      "</div>";
  }

  function visualKnowledge() {
    var lupa = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    function res(t, o, w) { return '<div class="res"><b>' + t + "</b><small>" + o + '</small><div class="barra"><i style="--w:' + w + '%"></i></div></div>'; }
    return '<div class="mock kn">' +
      "<div><div class=\"kn__busca\">" + lupa + "<span>forro em área molhada</span><em>HÍBRIDA</em></div>" +
      '<div class="kn__res">' +
        res("Forro de PVC em áreas úmidas", "Memorial A · seção 4.2 · pág. 12", 100) +
        res("Revestimento de teto em sanitários", "Memorial C · seção 6.1 · pág. 18", 78) +
        res("Acabamento de laje em vestiários", "Memorial B · seção 3.4 · pág. 9", 54) +
      "</div></div>" +
      '<div class="kn__memo"><h4>Memorial · Cap. 4 · Forros</h4>' +
        '<div class="memo-lin"><b>Área de forro: 182,4 m²</b><small>origem: calculado pela geometria 3D</small></div>' +
        '<div class="memo-lin"><b>Pé-direito: 2,80 m</b><small>origem: explícito no IFC</small></div>' +
        '<div class="memo-lin memo-lin--pend"><b>Material do forro</b><small>pendência: não encontrado no modelo</small></div>' +
      "</div></div>";
  }

  var VISUAIS = { coordix: visualCoordix, knowledge: visualKnowledge };

  /* ---------- seções ---------- */

  function secao(eyebrow, titulo, sub, corpo, idSecao) {
    return '<section class="secao"' + (idSecao ? ' id="' + idSecao + '"' : "") + ">" +
      '<div class="secao__cab rev"><p class="eyebrow">' + esc(eyebrow) + "</p><h2>" + esc(titulo) + "</h2>" + (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div>" + corpo + "</section>";
  }

  function htmlHero() {
    var visual = VISUAIS[C.visual];
    return '<section class="hero2">' +
      '<div class="selo rev"><span class="status status--ativo"><i class="status__ponto"></i>' + esc(U.rotuloStatus(true)) + "</span></div>" +
      '<h1 class="hero2__nome rev">' + esc(app.nome) + "</h1>" +
      '<p class="hero2__slogan rev">' + esc(C.slogan) + "</p>" +
      '<p class="hero2__resumo rev">' + esc(C.resumo) + "</p>" +
      '<div class="hero2__acoes rev">' +
        '<a class="btn btn--prim btn--lg" href="' + esc(urlApp) + '" target="_blank" rel="noopener noreferrer" data-acao="acessar">' + esc(rotuloAcesso) + "</a>" +
        (urlRepo ? '<a class="btn btn--sec btn--lg" href="' + esc(urlRepo) + '" target="_blank" rel="noopener noreferrer" data-acao="repo">Ver no GitHub</a>' : "") +
      "</div>" +
      (visual ? '<div class="palco rev">' + visual() + '<p class="palco__legenda">Ilustração com dados fictícios</p></div>' : "") +
      "</section>";
  }

  function htmlPontos() {
    return secao("Em uma olhada", "O essencial, sem rodeios.", "", '<div class="pontos">' +
      C.pontos.map(function (p) { return '<article class="ponto rev"><h3>' + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></article>"; }).join("") + "</div>");
  }

  function htmlFluxo() {
    var n = C.fluxo.length;
    return secao("Como funciona", "Do começo ao fim, em " + n + " passos.", "", '<ol class="fluxo">' +
      C.fluxo.map(function (p, i) {
        return '<li class="passo rev' + (i === n - 1 ? " passo--ult" : "") + '" style="transition-delay:' + (i % 4) * 70 + 'ms"><span class="passo__n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></li>";
      }).join("") + "</ol>");
  }

  function htmlDestaques() {
    return secao("Destaques", "Feito para o trabalho de verdade.", "", '<div class="bento">' +
      C.destaques.map(function (d, i) {
        return '<article class="tile rev' + (i === 0 ? " tile--destaque" : "") + '" style="--span:' + (Number(d.tam) || 2) + '"><h3>' + esc(d.t) + "</h3><p>" + esc(d.d) + "</p></article>";
      }).join("") + "</div>");
  }

  function htmlNumeros() {
    if (!C.numeros) return "";
    return secao("Em números", "O que já está de pé.", "", '<div class="numeros">' +
      C.numeros.map(function (n) { return '<div class="numero rev"><span class="numero__n">' + esc(n.n) + '</span><span class="numero__r">' + esc(n.r) + "</span></div>"; }).join("") + "</div>");
  }

  function htmlLimites() {
    if (!C.limites) return "";
    return '<section class="secao"><div class="limites rev"><h3><span class="status status--ativo"><i class="status__ponto"></i>' + esc(U.rotuloStatus(true)) + "</span>Sobre esta versão</h3><ul>" +
      C.limites.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></div></section>";
  }

  function htmlFinal() {
    var outroId = id === "coordix" ? "knowledge" : "coordix";
    var outroApp = (CFG.apps || []).filter(function (a) { return a.id === outroId; })[0];
    var outroTxt = TXT[outroId];
    var outro = outroApp && outroTxt && !outroTxt.emBreve && outroTxt.fluxo && U.disponivel(outroApp)
      ? '<p class="final__outro">Conheça também o <a href="apresentacao.html#' + esc(outroId) + '">' + esc(outroApp.nome) + "</a>.</p>" : "";
    return '<section class="final rev"><h2>Experimente na versão beta de testes.</h2>' +
      "<p>" + esc(app.nome) + " está em evolução. Use, teste e diga o que melhorar.</p>" +
      '<div class="hero2__acoes">' +
        '<a class="btn btn--prim btn--lg" href="' + esc(urlApp) + '" target="_blank" rel="noopener noreferrer">' + esc(rotuloAcesso) + "</a>" +
        '<a class="btn btn--sec btn--lg" href="index.html#informacoes">Voltar ao BIMOFFICE</a>' +
      "</div>" + outro + "</section>";
  }

  function montar() {
    document.title = app.nome + " · " + CFG.portal.nome;
    document.getElementById("apbar-nome").textContent = app.nome;
    var a = document.getElementById("apbar-acessar");
    a.href = urlApp;
    a.textContent = provisoria ? "Repositório" : "Acessar";
    document.getElementById("rodape-texto").textContent = CFG.portal.rodape;

    document.getElementById("conteudo").innerHTML =
      htmlHero() + htmlPontos() + htmlFluxo() + htmlDestaques() + htmlNumeros() + htmlLimites() + htmlFinal();
    U.iniciarTema();
    U.revelar();
    window.scrollTo(0, 0);
  }

  // Troca de apresentação sem recarregar a página (link "Conheça também").
  window.addEventListener("hashchange", function () { location.reload(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
