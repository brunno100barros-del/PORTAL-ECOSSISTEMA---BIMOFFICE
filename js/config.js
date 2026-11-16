/* ============================================================================
   BIMOFFICE · CONFIGURAÇÃO CENTRALIZADA DOS APLICATIVOS

   Este é o ÚNICO arquivo que precisa ser editado para:
     • trocar endereços de hospedagem (campo `url`);
     • trocar o repositório (campo `repositorio`);
     • liberar um aplicativo (status "disponivel") ou colocá-lo "em-breve";
     • alterar nome, descrição ou ordem;
     • incluir um novo aplicativo (copie um bloco e ajuste).

   Campos de cada aplicativo
     id            identificador único, sem espaços (usado também para escolher o ícone).
     nome          nome exibido no cartão.
     descricao     texto curto exibido no cartão.
     status        "disponivel"  → cartão ativo, abre o endereço `url`.
                   "em-breve"    → cartão visível, mas sem navegação.
     url           endereço de ACESSO à aplicação (o site). Obrigatório se "disponivel".
     urlProvisoria true quando `url` ainda aponta para o repositório (ou outro destino
                   temporário) por falta de página publicada. O cartão então mostra
                   "Repositório" em vez de "Acessar", para não passar o repositório como
                   se fosse o site. Quando houver site real, troque `url` e remova o campo.
     repositorio   endereço do repositório GitHub. Se vazio, o ícone do GitHub não aparece.
     icone         chave em js/icons.js (coordix, knowledge, vision, generator).

   Os três endereços (acesso, repositório, status) são independentes: nunca se misturam.
   ============================================================================ */
window.BIMOFFICE_CONFIG = {
  portal: {
    nome: "BIMOFFICE",
    subtitulo: "Ecossistema",
    frase: "Tecnologia e inteligência para engenharia",
    rodape: "Setor BIM Office · SENAI/RO"
  },

  apps: [
    {
      id: "coordix",
      nome: "COORDIX",
      descricao: "Inteligência e coordenação BIM para análise de interferências e conflitos em modelos IFC.",
      status: "disponivel",
      // Sem página publicada confirmada: destino provisório = repositório.
      // Ao publicar no GitHub Pages, use: "https://brunno100barros-del.github.io/COORDIX/"
      // e remova a linha `urlProvisoria`.
      url: "https://github.com/brunno100barros-del/COORDIX",
      urlProvisoria: true,
      repositorio: "https://github.com/brunno100barros-del/COORDIX",
      icone: "coordix"
    },
    {
      id: "knowledge",
      nome: "KNOWLEDGE",
      descricao: "Plataforma de inteligência para engenharia, organização de conhecimento técnico e pesquisa semântica.",
      status: "disponivel",
      // Página publicada informada no README do próprio repositório do Knowledge.
      // Se ainda não estiver ativa, use temporariamente o repositório e marque urlProvisoria: true.
      url: "https://brunno100barros-del.github.io/BIMOFFICE-Knowledge/",
      repositorio: "https://github.com/brunno100barros-del/BIMOFFICE-Knowledge",
      icone: "knowledge"
    },
    {
      id: "vision",
      nome: "VISION",
      descricao: "Inteligência visual aplicada à engenharia. Análise de fotografias de obras, identificação assistida de patologias, infiltrações, fissuras e falhas construtivas.",
      status: "em-breve",
      url: "",          // preencher quando o site existir
      repositorio: "",  // preencher quando o repositório existir
      icone: "vision"
    },
    {
      id: "generator",
      nome: "GENERATOR",
      descricao: "Geração paramétrica de projetos e soluções arquitetônicas e estruturais, a partir de parâmetros definidos pelo engenheiro.",
      status: "em-breve",
      url: "",          // preencher quando o site existir
      repositorio: "",  // preencher quando o repositório existir
      icone: "generator"
    }
  ]
};
