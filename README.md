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
index.html          página
css/styles.css      identidade visual (tokens do COORDIX, tema claro/escuro)
js/config.js        >>> configuração centralizada dos aplicativos <<<
js/app.js           desenha os cartões a partir da configuração
js/icons.js         ícones (o símbolo do COORDIX é uma cópia estática)
assets/             marca do BIMOFFICE
```

## Como alterar endereços, status e aplicativos
Edite **somente `js/config.js`**. Cada aplicativo tem três informações separadas:

- `url`: endereço de acesso à aplicação (o site);
- `repositorio`: endereço do repositório GitHub (sem ele, o ícone do GitHub não aparece);
- `status`: `"disponivel"` ou `"em-breve"`.

Exemplos:
- **COORDIX publicado no GitHub Pages:** troque `url` por `https://brunno100barros-del.github.io/COORDIX/` e apague `urlProvisoria: true`.
- **Liberar o Vision:** informe `url` e `repositorio` e mude `status` para `"disponivel"`.
- **Novo aplicativo:** copie um bloco de `apps` e ajuste os campos (e, se quiser um ícone próprio, adicione-o em `js/icons.js`).

Cartões "em breve" nunca navegam, mesmo que haja `url` preenchida.

## Publicar no GitHub Pages
*Settings → Pages → Branch: `main` → pasta `/ (root)`*. O arquivo `.nojekyll` já está incluído. Para outro provedor, basta copiar a pasta inteira.

## Executar localmente
Abra `index.html` no navegador, ou: `python3 -m http.server 8080`.

---
Setor BIM Office · SENAI/RO
