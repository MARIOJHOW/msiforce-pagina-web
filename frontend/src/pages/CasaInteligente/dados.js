// Conteúdo da landing de fechadura digital. Sem JSX — só dados.
// Um só valor publicado: o inicial da mão de obra (decisão do dono, 23/09/2026).
// Os planos não têm preço — régua e teto ficam para o WhatsApp.

export const PLANOS = [
  {
    id: 'essencial',
    nome: 'Essencial',
    resumo: 'Parar de andar com chave gastando o mínimo.',
    porta: 'Sobrepor, em porta de madeira comum',
    portaFiltro: ['apartamento'],
    bolso: 'entrada',
    inclui: [
      'Instalação limpa em menos de 1 hora',
      'Cadastro de senhas e tags da família',
      'Teste completo antes de sair',
    ],
  },
  {
    id: 'design',
    nome: 'Design',
    resumo: 'Para quem se importa com a estética da entrada da casa.',
    porta: 'Embutir, em madeira ou pivotante leve',
    portaFiltro: ['pivotante'],
    bolso: 'medio',
    inclui: [
      'Acabamento de marcenaria fina',
      'Fios e mecanismos totalmente ocultos',
      'Fresagem de precisão na porta',
    ],
  },
  {
    id: 'conectado',
    nome: 'Conectado',
    resumo: 'Fechadura que fala com o celular e com a Alexa.',
    porta: 'Alumínio ou pivotante de madeira maciça',
    portaFiltro: ['correr', 'pivotante'],
    bolso: 'medio',
    inclui: [
      'App configurado no seu celular',
      'Integração com Alexa e Google',
      'Wi-Fi e hub de automação prontos',
    ],
  },
  {
    id: 'premium',
    nome: 'Premium',
    resumo: 'Biometria facial, multiponto, vidro temperado e blindada.',
    porta: 'Multiponto, blindada ou pivotante grande',
    portaFiltro: ['pivotante'],
    bolso: 'alto',
    inclui: [
      'Atendimento com hora marcada',
      'Garantia estendida da instalação',
      'Calibração de máxima segurança',
    ],
  },
  {
    // Vidro, ferro e area externa saem por consulta por decisao do dono em
    // 22/09/2026: nos tres o servico varia demais para ter piso publicado --
    // vidro nao aceita furo, ferro pede fixacao e ferramenta proprias, e area
    // externa ainda depende de exposicao a chuva e sol. Card sem numero em vez
    // de card ausente: quem filtra por essas portas precisa achar resposta.
    id: 'consulta',
    nome: 'Sob consulta',
    resumo: 'Os casos em que publicar um valor de partida seria chute.',
    porta: 'Vidro temperado, ferro ou portão, e instalação em área externa',
    portaFiltro: ['vidro', 'ferro', 'externa'],
    bolso: null,
    inclui: [
      'Avaliação por foto, antes da visita',
      'Modelo definido pelo perfil e pela ferragem',
      'Valor fechado antes de qualquer execução',
    ],
  },
];

// Valor inicial da instalação de fechadura. Existe UMA vez: hero, vitrine, FAQ,
// home e /instalacao-fechadura-digital derivam daqui.
export const PRECO_MINIMO = 249;

// Kit (fechadura + instalação), valor inicial -- decisão do dono em 23/09/2026.
// Fica no nível da seção, nunca no card de um modelo: o MFR 3000 V sai por 850.
export const PRECO_KIT = 500;

export const FILTRO_BOLSO = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'entrada', rotulo: 'Mais em conta' },
  { id: 'medio', rotulo: 'Intermediários' },
  { id: 'alto', rotulo: 'Premium' },
];

export const FILTRO_PORTA = [
  { id: 'todos', rotulo: 'Todas' },
  { id: 'pivotante', rotulo: 'Pivotante / madeira maciça' },
  { id: 'apartamento', rotulo: 'Apartamento' },
  { id: 'vidro', rotulo: 'Vidro' },
  { id: 'correr', rotulo: 'Correr / alumínio' },
  { id: 'ferro', rotulo: 'Ferro / portão' },
  { id: 'externa', rotulo: 'Área externa' },
];

export const MODELOS = [
  {
    id: 'mfr3000v',
    nome: 'Modelo Premium',
    tag: 'Premium · Embutir',
    imagem: '/fechadura_premium_3d.webp',
    metodos: ['Digital', 'App', 'Tag', 'Senha', 'Chave'],
    porta: 'Pivotante e madeira maciça',
    paraQuem: 'Para quem quer o acabamento mais bonito e todos os modos de abrir na mesma porta.',
  },
  {
    id: 'fr221v',
    nome: 'Modelo Design',
    tag: 'Design · Embutir',
    imagem: '/fechadura_design_3d.webp',
    metodos: ['Digital', 'Senha'],
    porta: 'Pivotante e madeira maciça',
    paraQuem: 'Para quem quer o visual embutido e sofisticado sem pagar por recursos que não vai usar.',
  },
  {
    id: 'fr102',
    nome: 'Modelo Intermediário',
    tag: 'Intermediária · Sobrepor',
    imagem: '/fechadura_inter_3d.webp',
    metodos: ['Senha', 'Tag'],
    porta: 'Porta padrão de apartamento',
    paraQuem: 'Instala acima da maçaneta, sem modificar a porta. Ideal para quem mora de aluguel.',
  },
  {
    id: 'fr10',
    // Era "Modelo Custo-Benefício": o nome antigo sinalizava "essa é a barata"
    // e constrangia justamente o cliente que a página quer atrair.
    nome: 'Modelo Essencial',
    tag: 'Essencial · Sobrepor',
    imagem: '/fechadura_custo_3d.webp',
    metodos: ['Senha'],
    porta: 'Porta padrão de apartamento',
    paraQuem: 'A porta de entrada para quem quer parar de andar com chave gastando o mínimo.',
  },
];

export const PASSOS = [
  { n: 1, titulo: 'Você manda a foto da porta', texto: 'Pelo WhatsApp. Em minutos dizemos qual plano atende e o que dá para instalar.' },
  { n: 2, titulo: 'Fechamos o orçamento', texto: 'Valor fechado antes de qualquer visita. Sem surpresa no fim do serviço.' },
  { n: 3, titulo: 'Instalação com hora marcada', texto: 'Técnico certificado, ferramenta de fresagem própria e proteção do piso e da porta.' },
  { n: 4, titulo: 'Treinamos a família', texto: 'Cadastro de digitais e senhas de todo mundo, app no celular e teste com você junto.' },
];

// As 4 perguntas marcadas "PAA" vieram do bloco "As pessoas também perguntam"
// da busca real de "instalação de fechadura digital" em São Paulo (11/09/2026).
// Entram aqui, e não num texto solto, porque o FAQPage schema das páginas é
// gerado destes arrays — pergunta nova vira dado estruturado sozinha.
//
// Sao DOIS arrays desde 18/09/2026, um por intencao. Ate entao as duas paginas
// de fechadura serviam a mesma lista, e portanto o mesmo FAQPage: a separacao
// que o resto do site ganhou parava no FAQ. Quem chega em
// /instalacao-fechadura-digital quer contratar (preco, prazo, minha porta
// serve); quem chega em /casa-inteligente ainda escolhe o aparelho (biometria
// ou senha, qual porta, e se acabar a pilha). Pergunta nova vai para o array da
// intencao dela, nao para os dois.
export const FAQ_INSTALACAO = [
  {
    // PAA: "Qual o valor da instalação da fechadura digital?"
    p: 'Qual o valor da instalação da fechadura digital?',
    r: `A mão de obra começa em R$ ${PRECO_MINIMO}, para fechadura de sobrepor em porta de madeira comum. O que faz o valor subir é a complexidade da porta: embutir exige fresagem, e multiponto, blindada ou vidro temperado pedem mais tempo e ferramenta específica. Mande uma foto da porta pelo WhatsApp que fechamos o valor antes da visita.`,
  },
  {
    // Entrou em 18/09/2026, quando a MSIFORCE virou representante autorizada EZVIZ.
    // Vale so para EZVIZ: e a representacao que permite estender. Nao generalize
    // para outras marcas sem o dono confirmar.
    p: 'A garantia da fechadura muda se eu instalar com vocês?',
    r: 'Na EZVIZ, sim. A fábrica dá 1 ano de garantia e, como representante autorizado, estendemos para 2 anos a fechadura EZVIZ comprada e instalada com a gente — sem custo adicional. Nas outras marcas a garantia é a do próprio fabricante, e ela continua válida: instalação por técnico certificado não anula garantia.',
  },
  {
    p: 'Vocês instalam fechadura que eu comprei em outro lugar?',
    r: `Sim. É o caso mais comum. Você paga só a mão de obra, a partir de R$ ${PRECO_MINIMO}, e mantém a garantia do fabricante — instalação por técnico certificado não anula garantia.`,
  },
  {
    // PAA: "O que é preciso para instalar uma fechadura digital?"
    p: 'O que é preciso para instalar uma fechadura digital?',
    r: 'Na maioria dos casos, nada além da porta: os modelos funcionam com pilhas e não exigem ponto de energia nem obra elétrica. O que precisa ser definido antes é o tipo — sobrepor ou embutir — conforme o material e a espessura da porta. Modelos com Wi-Fi pedem apenas sinal de rede chegando até a entrada.',
  },
  {
    // PAA: "É difícil instalar fechadura digital?"
    p: 'É difícil instalar fechadura digital?',
    r: 'Sobrepor é simples e sai em menos de 1 hora. Embutir é outra história: exige fresagem na porta, e é aí que a instalação por conta própria costuma sair cara — furo fora de esquadro não tem volta e o prejuízo passa a ser a porta inteira. Se não houver folga segura para embutir, recomendamos um modelo de sobrepor em vez de arriscar.',
  },
  {
    p: 'Quanto tempo demora?',
    r: 'Fechadura de sobrepor sai em menos de 1 hora. Embutir leva de 2 a 3 horas, porque exige fresagem na porta.',
  },
  {
    p: 'Como posso pagar?',
    r: 'Cartão em até 12x (com taxa da operadora), Pix ou dinheiro à vista.',
  },
  {
    p: 'E se estragar a minha porta?',
    r: 'A instalação tem garantia. Antes de furar qualquer coisa avaliamos a porta e, se não houver folga segura para embutir, recomendamos um modelo de sobrepor em vez de arriscar.',
  },
  {
    p: 'Moro de aluguel, posso instalar?',
    r: 'Pode. Modelos de sobrepor instalam acima da maçaneta e saem sem deixar marca relevante — é a recomendação padrão para imóvel alugado.',
  },
  {
    p: 'Atendem qual região?',
    r: 'São Paulo e região metropolitana. Mande o CEP no WhatsApp que confirmamos na hora.',
  },
];

// FAQ da /casa-inteligente: duvida de quem ainda escolhe o aparelho. As
// respostas saem do que o site ja afirma (MODELOS, PLANOS e as ofertas), para
// nao inventar especificacao que a pagina nao sustenta.
export const FAQ_MODELOS = [
  {
    p: 'Biometria, senha ou app: qual vale mais a pena?',
    r: 'Depende de quem usa a porta. Senha resolve para a maioria e é o que sai mais em conta — dá para passar o código a um visitante sem entregar chave. Biometria é a mais rápida no dia a dia e a melhor para criança e idoso, que não precisam lembrar de nada. O app vale quando você precisa abrir ou liberar alguém estando fora de casa. Não é escolha excludente: os modelos mais completos aceitam digital, senha, tag, app e chave na mesma porta.',
  },
  {
    p: 'Fechadura digital funciona em porta de vidro?',
    // Corrigido pelo dono em 18/09/2026: em vidro a fechadura e COLADA. A versao
    // anterior dizia que ela se fixava na ferragem ou a substituia, o que esta errado.
    r: 'Funciona, e a instalação é diferente das outras portas: vidro temperado não pode ser furado, então a fechadura é colada, fixada direto no vidro. Isso muda o modelo indicado e o tempo de serviço. Mande uma foto da porta pelo WhatsApp que dizemos qual serve antes de qualquer visita.',
  },
  {
    p: 'Qual a diferença entre fechadura de sobrepor e de embutir?',
    r: 'A de sobrepor instala acima da maçaneta, sem modificar a porta — é a recomendação para apartamento e para quem mora de aluguel, porque sai sem deixar marca relevante. A de embutir substitui a fechadura atual e exige fresagem na porta: acabamento melhor e mais recursos, mas só em porta que tenha espessura e material para isso, como pivotante e madeira maciça.',
  },
  {
    p: 'E se acabar a pilha ou faltar luz?',
    r: 'Você não fica do lado de fora. Os modelos funcionam com pilhas — no de entrada, quatro AA com autonomia de até um ano — e avisam da bateria fraca com semanas de antecedência. Mesmo se a pilha acabar, há saída de emergência por chave ou por alimentação externa com bateria 9V. Falta de luz não afeta: a fechadura não depende da rede elétrica.',
  },
  {
    p: 'Precisa de Wi-Fi para funcionar?',
    r: 'Não. Há modelos stand alone, que funcionam sem Wi-Fi nenhum — abrem por digital, senha ou tag, sem depender de internet. O Wi-Fi só entra se você quiser abrir pelo aplicativo ou liberar alguém à distância; nesse caso, basta o sinal da sua rede chegar até a entrada.',
  },
  {
    // PAA: "Qual a desvantagem da fechadura digital?" — estava no FAQ de
    // instalacao ate 18/09/2026, mas e duvida de quem ainda decide se compra.
    p: 'Qual a desvantagem da fechadura digital?',
    r: 'São três, com honestidade: depende de pilha (o aviso de bateria fraca aparece com semanas de antecedência, e os modelos têm saída de emergência por chave ou alimentação externa); custa mais caro que uma fechadura comum na hora da compra; e exige cadastrar quem entra. Em troca, você para de trocar o segredo toda vez que uma chave se perde.',
  },
];

export const GOOGLE = {
  nota: '5,0',
  avaliacoes: 82,
  // Link de compartilhamento do Perfil da Empresa no Google, informado pelo dono
  // em 11/09/2026. Substitui o token MhzSMqPKwtmpCrDVZ (25/08/2026), que
  // resolvia para google.com/search?kgmid=/g/11z72c25wt&q=MSIFORCE: eram dois
  // links diferentes no ar ao mesmo tempo, um aqui e outro no sameAs do schema.
  // Agora os dois usam este. Renderização é condicional (SeloGoogle.jsx): com
  // null o selo vira texto, sem link quebrado. Se `nota` ou `avaliacoes` saírem
  // de sincronia com o perfil, o selo passa a desmentir a si mesmo — agora que é
  // clicável, dá para conferir.
  url: 'https://share.google/tBQU5X2HJmIHZyFcB',
};

export const NOTA_LEGAL =
  '*Valor varia de acordo com o modelo da fechadura e o material da porta. Parcelamento no cartão com taxa da operadora.';
