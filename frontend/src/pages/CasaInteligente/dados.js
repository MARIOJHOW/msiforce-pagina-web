// Conteúdo da landing de fechadura digital. Sem JSX — só dados.
// Preços são "a partir de" (mão de obra). Faixas internas registradas no spec;
// nunca estampe o teto na interface.

export const PLANOS = [
  {
    id: 'essencial',
    nome: 'Essencial',
    apartirde: 200,
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
    apartirde: 250,
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
    apartirde: 400,
    resumo: 'Fechadura que fala com o celular e com a Alexa.',
    porta: 'Alumínio, ferro ou pivotante de madeira maciça',
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
    apartirde: 700,
    resumo: 'Biometria facial, multiponto, vidro temperado e blindada.',
    porta: 'Multiponto, blindada, vidro temperado ou pivotante grande',
    portaFiltro: ['vidro', 'pivotante'],
    bolso: 'alto',
    inclui: [
      'Atendimento com hora marcada',
      'Garantia estendida da instalação',
      'Calibração de máxima segurança',
    ],
  },
];

// Menor preço da régua. Existe UMA vez: hero, título da vitrine e FAQ derivam daqui.
// Reajustou preço em PLANOS? A página inteira acompanha sozinha.
export const PRECO_MINIMO = Math.min(...PLANOS.map((p) => p.apartirde));

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
// gerado deste array — pergunta nova vira dado estruturado sozinha.
export const FAQ = [
  {
    // PAA: "Qual o valor da instalação da fechadura digital?"
    p: 'Qual o valor da instalação da fechadura digital?',
    r: `A mão de obra começa em R$ ${PRECO_MINIMO}, para fechadura de sobrepor em porta de madeira comum. O que faz o valor subir é a complexidade da porta: embutir exige fresagem, e multiponto, blindada ou vidro temperado pedem mais tempo e ferramenta específica. Mande uma foto da porta pelo WhatsApp que fechamos o valor antes da visita.`,
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
    // PAA: "Qual a desvantagem da fechadura digital?"
    p: 'Qual a desvantagem da fechadura digital?',
    r: 'São três, com honestidade: depende de pilha (o aviso de bateria fraca aparece com semanas de antecedência, e os modelos têm saída de emergência por chave ou alimentação externa); custa mais caro que uma fechadura comum na hora da compra; e exige cadastrar quem entra. Em troca, você para de trocar o segredo toda vez que uma chave se perde.',
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
