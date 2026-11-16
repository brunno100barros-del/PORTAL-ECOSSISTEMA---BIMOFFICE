/* ============================================================================
   BIMOFFICE · CONTEÚDO INFORMATIVO DOS PRODUTOS
   Textos do menu "Informações" e das mini apresentações (apresentacao.html#<id>).
   As chaves seguem o `id` de cada aplicativo em js/config.js.
   Para ganhar uma apresentação, um aplicativo precisa de `fluxo` e `destaques`;
   sem eles (ou com emBreve: true) ele aparece só no menu de informações.
   Tudo aqui descreve o que o aplicativo faz HOJE; limites conhecidos ficam em `limites`.
   ============================================================================ */
window.BIMOFFICE_CONTEUDO = {

  coordix: {
    visual: "coordix",
    chips: ["Detecção de conflitos", "Modelos IFC", "BCF 2.1"],
    slogan: "Interferências entre disciplinas, da detecção ao BCF.",
    oQueFaz: "Lê os modelos IFC de um projeto, encontra os conflitos entre disciplinas, classifica cada um e conduz a revisão até virar uma pendência com responsável e prazo.",
    resumo: "O COORDIX lê os modelos IFC de um projeto, encontra os conflitos entre disciplinas, classifica cada um e conduz a revisão até virar uma pendência com responsável e prazo. A automação faz a parte repetitiva; a validação final continua com o coordenador BIM.",
    pontos: [
      { t: "Roda no navegador", d: "Sem instalação: abra, arraste os IFCs e analise. Há também uma versão desktop experimental para Windows." },
      { t: "Medição rigorosa", d: "A penetração é medida como espessura real da interferência e o contato é tratado à parte. Quando um resultado não é confiável, o COORDIX diz isso." },
      { t: "Revisão guiada", d: "Um conflito por vez, com a câmera no ponto exato e os dados dos dois elementos lado a lado." }
    ],
    fluxo: [
      { t: "Detectar", d: "Um núcleo geométrico próprio compara os pares de elementos em segundo plano, com progresso real e cancelamento." },
      { t: "Interpretar", d: "Cada resultado recebe um estado de confiabilidade: confirmado, abaixo da tolerância, contato, sem conflito, inconclusivo ou incompleto." },
      { t: "Classificar", d: "Pré-classificação em P1, P2, P3, P4, INFO ou Falso clash, sempre com o motivo exibido." },
      { t: "Atribuir", d: "O responsável é sugerido a partir da disciplina que se adapta ao conflito." },
      { t: "Revisar", d: "Fila de um em um, câmera no conflito (A em vermelho, B em azul), comentários, snapshot e histórico." },
      { t: "Validar", d: "O coordenador confirma ou altera a classificação e o responsável." },
      { t: "Gerar BCF", d: "A prévia do BCF 2.1 já está pronta. A geração do arquivo .bcf ainda não está ativa." },
      { t: "Acompanhar", d: "O clash validado vira issue, com status, prazo do manual e histórico." }
    ],
    destaques: [
      { t: "21 + 7 testes de tolerância", d: "Matriz com os 21 testes do manual corporativo e 7 testes próprios para Estrutura Metálica, em milímetros e editável.", tam: 4 },
      { t: "IFC2X3, IFC4 e IFC4X3", d: "A disciplina é reconhecida pelo código no nome do arquivo (EST, MET, ARQ, SAN, ELE, SCE, PCI, CLI…).", tam: 2 },
      { t: "Visualizador 3D", d: "Árvore modelo → pavimento → entidade, com isolar, aproximar e snapshot.", tam: 2 },
      { t: "Sem distorção em modelos georreferenciados", d: "Cada projeto tem sua origem local, e o COORDIX avisa quando um modelo está em outro sistema de coordenadas.", tam: 4 },
      { t: "Projetos em arquivo .coordix", d: "Guarda equipe, regras, decisões e resultados. Os IFCs são referenciados por assinatura SHA-256, sem cópia.", tam: 3 },
      { t: "Falsos clashes à parte", d: "Resultados agrupados por pavimento, com aba própria para falsos clashes e alerta de revisão pendente.", tam: 3 }
    ],
    numeros: [
      { n: "28", r: "testes de tolerância (21 do manual + 7 de estrutura metálica)" },
      { n: "101", r: "cenários geométricos aprovados na suíte de testes" },
      { n: "3", r: "esquemas IFC lidos: IFC2X3, IFC4 e IFC4X3" },
      { n: "0", r: "servidores necessários: roda inteiro no navegador" }
    ],
    limites: [
      "Protótipo funcional (v2.5), em versão beta de testes.",
      "A geração do arquivo .bcf ainda não está ativa; há apenas a prévia do markup.",
      "Os modelos IFC não ficam salvos entre sessões: salve o projeto em um arquivo .coordix.",
      "O backend em Python está planejado, ainda não existe."
    ]
  },

  knowledge: {
    visual: "knowledge",
    chips: ["Pesquisa semântica", "Memorial descritivo", "Leitura de IFC"],
    slogan: "O conhecimento técnico da engenharia, encontrado pelo sentido e não só pela palavra.",
    oQueFaz: "Organiza memoriais e documentos técnicos em uma biblioteca com pesquisa semântica e lê o IFC do projeto para montar o memorial descritivo por capítulos, com a origem de cada dado.",
    resumo: "O Knowledge organiza memoriais descritivos e documentos técnicos em uma biblioteca com pesquisa semântica local e lê o IFC do projeto para montar um memorial por capítulos, em que cada número mostra de onde veio. Nada é inventado: o que falta vira pendência.",
    pontos: [
      { t: "Pesquisa que entende", d: "Combina busca por sentido e busca por palavras. O modelo roda no próprio computador, e nenhum texto de documento sai da máquina." },
      { t: "Dados com origem", d: "Cada valor do inventário do IFC indica se é explícito, atributo, calculado pela geometria 3D ou não encontrado." },
      { t: "Memorial em capítulos", d: "Sugestões da biblioteca só entram quando você clica em Inserir, e a minuta sai em Word a qualquer momento." }
    ],
    fluxo: [
      { t: "Importar", d: "DOCX e PDF, vários de uma vez, com detecção de arquivos duplicados por SHA-256." },
      { t: "Organizar", d: "Seções, tabelas e trechos são identificados, com filtros por tipo, unidade e disciplina." },
      { t: "Pesquisar", d: "Pesquisa híbrida, com a origem completa de cada resultado e a opção Copiar com origem." },
      { t: "Ler o IFC", d: "Inventário técnico com elementos, disciplinas, pavimentos, materiais, quantidades e informações ausentes." },
      { t: "Gerar o memorial", d: "Os capítulos são montados só com dados do IFC. O que falta vira pendência, nunca um número inventado." },
      { t: "Revisar", d: "Editar, reordenar e aprovar capítulos, com histórico de versões e comparação entre o gerado e o atual." },
      { t: "Exportar", d: "Minuta em DOCX a qualquer momento. A versão final só sai com todos os capítulos aprovados." }
    ],
    destaques: [
      { t: "Pesquisa híbrida", d: "Modelo semântico multilíngue (E5) somado à busca por palavras (FTS5, que ignora acentos).", tam: 4 },
      { t: "Memorial 3D", d: "O IFC aparece em 3D no navegador, e cada capítulo fica ligado aos elementos de origem.", tam: 2 },
      { t: "Biblioteca de DOCX e PDF", d: "Original preservado em somente leitura, com lixeira e restauração.", tam: 2 },
      { t: "Classificação explicável", d: "A disciplina de cada elemento vem de regras que podem ser conferidas. O nome sozinho nunca classifica.", tam: 4 },
      { t: "Documentos ficam com você", d: "A pasta de dados fica fora do GitHub, e a pesquisa semântica roda localmente.", tam: 3 },
      { t: "Veja sem instalar", d: "A página publicada abre em modo demonstração, com um projeto exemplo somente para leitura.", tam: 3 }
    ],
    numeros: [
      { n: "3", r: "formatos de entrada: DOCX, PDF e IFC" },
      { n: "2", r: "buscas combinadas: por sentido e por palavras" },
      { n: "Local", r: "o modelo de pesquisa roda no seu computador" },
      { n: "100%", r: "dos números do memorial com a origem indicada" }
    ],
    limites: [
      "Em versão beta de testes (v0.7).",
      "A relevância da pesquisa é relativa: não é probabilidade, e o trecho deve sempre ser revisado.",
      "PDF escaneado não é lido, pois ainda não há OCR.",
      "A página de cada trecho de DOCX é estimada.",
      "Google Drive e IA generativa ainda não existem.",
      "Sem o servidor local, a página publicada funciona em modo demonstração."
    ]
  },

  vision: {
    emBreve: true,
    chips: ["Fotos de obra", "Patologias", "Análise assistida"],
    oQueFaz: "Inteligência visual aplicada à engenharia: análise de fotografias de obras e identificação assistida de patologias, infiltrações, fissuras e falhas construtivas."
  },

  generator: {
    emBreve: true,
    chips: ["Projeto paramétrico", "Arquitetura", "Estrutura"],
    oQueFaz: "Geração paramétrica de projetos e soluções arquitetônicas e estruturais, a partir de parâmetros definidos pelo engenheiro."
  }
};
