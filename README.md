# BIMOFFICE · Portal central do ecossistema

Portal web que reúne os aplicativos de engenharia do ecossistema BIMOFFICE e direciona o usuário para cada um deles.
Projeto **independente** do COORDIX e do Knowledge: código, repositório e publicação próprios.

O portal **não executa** nenhum aplicativo, não usa iframe e não depende de nenhum deles: se um aplicativo sair do ar, o portal continua funcionando.

| # | Aplicativo | Status |
|---|---|---|
| 01 | COORDIX | Disponível |
| 02 | KNOWLEDGE | Disponível |
| 03 | VISION | Em breve |
| 04 | GENERATOR | Em breve |

## Tecnologia
HTML, CSS e JavaScript puros, sem dependências, sem etapa de build. Única chamada externa: fontes IBM Plex (Google Fonts), com fallback para fontes do sistema.

```
index.html            portal: cartões dos aplicativos + menu "Informações"
apresentacao.html     mini apresentações (apresentacao.html#coordix, #knowledge)
css/styles.css        identidade visual (tokens do COORDIX, tema claro/escuro)
css/apresentacao.css  estilo das apresentações
js/config.js          >>> configuração centralizada dos aplicativos (URLs, status, rótulos) <<<
js/conteudo.js        >>> textos do menu Informações e das apresentações <<<
js/app.js             desenha cartões e informações a partir das configurações
js/apresentacao.js    monta a apresentação de um aplicativo
js/comum.js           utilitários compartilhados (tema, links seguros, revelar ao rolar)
js/icons.js           ícones (o símbolo do COORDIX é uma cópia estática)
assets/               marca do BIMOFFICE
```

## Como alterar endereços, status e aplicativos
Edite **somente `js/config.js`**. Cada aplicativo tem três informações separadas:

- `url`: endereço de acesso à aplicação (o site);
- `repositorio`: endereço do repositório GitHub (sem ele, o ícone do GitHub não aparece);
- `status`: `"disponivel"` ou `"em-breve"`.

Exemplos:
- **Aplicativo ainda sem página publicada:** use o repositório em `url` e marque `urlProvisoria: true`; o cartão passa a mostrar "Repositório" em vez de "Acessar".
- **Liberar o Vision:** informe `url` e `repositorio` e mude `status` para `"disponivel"`.
- **Novo aplicativo:** copie um bloco de `apps` e ajuste os campos (e, se quiser um ícone próprio, adicione-o em `js/icons.js`).

Cartões "em breve" nunca navegam, mesmo que haja `url` preenchida.

O texto do selo de status fica em `portal.rotulos` (hoje: "EM VERSÃO BETA DE TESTES" para os disponíveis e "EM BREVE").

## Informações e apresentações
O menu **Informações** lista o que cada produto faz. COORDIX e KNOWLEDGE têm uma mini apresentação (`apresentacao.html#<id>`) com fluxo, destaques, números e limites conhecidos. Para editar textos ou criar a apresentação de um novo aplicativo, use `js/conteudo.js` (a chave é o `id` do aplicativo; basta ter `fluxo` e `destaques`). As ilustrações das apresentações usam dados fictícios e vivem em `js/apresentacao.js`.

## Publicar no GitHub Pages
*Settings → Pages → Branch: `main` → pasta `/ (root)`*. O arquivo `.nojekyll` já está incluído. Para outro provedor, basta copiar a pasta inteira.

## Executar localmente
Abra `index.html` no navegador, ou: `python3 -m http.server 8080`.

---
Setor BIM Office · SENAI/RO
