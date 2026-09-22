// Extensao .js explicita, e nao '../lib/gatilhos': o prerender importa este
// arquivo em Node puro, fora do Vite, onde import sem extensao nao resolve.
import { MSG_FECHADURA_COMBO } from '../lib/gatilhos.js';

/**
 * Páginas de fechadura digital por TIPO DE PORTA (/fechaduras/:slug).
 *
 * Criadas em 18/09/2026. O objetivo é aparecer nas buscas em que o cliente
 * descreve a porta dele ("fechadura digital para porta de vidro"), e não em
 * buscas genéricas — essas são da /instalacao-fechadura-digital, que continua
 * sendo a página de contratar o serviço.
 *
 * ⚠️ Cada página precisa dizer algo que só ela diz. Se virarem variações do
 * mesmo texto, o Google trata como cópias e não escolhe nenhuma — foi
 * exatamente o que acontecia entre /casa-inteligente e
 * /instalacao-fechadura-digital até 18/09/2026.
 *
 * ⚠️ Rota nova aqui só existe em produção depois de entrar no prerender: o
 * `404.html` desligou o fallback de SPA. O prerender já deriva deste arquivo,
 * mas o sitemap.xml continua manual.
 *
 * O CTA acrescenta o tipo de porta à frase do gatilho em vez de inventar uma
 * nova: `detectarGatilhoFechadura` (services/fechadura.js, no repo do bot) casa
 * por `includes`, então texto a mais não quebra o funil — e o atendente já
 * recebe a porta junto.
 */
const msgPorta = (porta) => `${MSG_FECHADURA_COMBO} Minha porta é ${porta}.`;

export const PORTAS_DATA = {
  'porta-de-vidro': {
    slug: 'porta-de-vidro',
    title: 'Fechadura Digital para Porta de Vidro',
    headline: 'Fechadura digital em porta de vidro:\nnão se fura, é colada.',
    sub: 'Instalação de fechadura digital em porta de vidro temperado em São Paulo. Como o vidro não pode ser furado, a fechadura é colada — o que muda o modelo indicado e o tempo de serviço. Mão de obra a partir de R$ 249.',
    heroImg: null,
    msg: msgPorta('de vidro temperado'),
    beneficios: [
      { icon: '🔍', titulo: 'Avaliação por foto, antes da visita', desc: 'Vidro temperado não aceita improviso. Você manda a foto da porta e do perfil pelo WhatsApp e dizemos qual modelo serve antes de alguém sair de casa.' },
      { icon: '🧲', titulo: 'Fixação colada, sem furar o vidro', desc: 'Temperado não pode ser perfurado depois de pronto: qualquer furo trinca a peça inteira. A fechadura é colada diretamente no vidro, e é por isso que o modelo precisa ser o certo.' },
      { icon: '🚪', titulo: 'Porta de loja, escritório e sacada', desc: 'É onde a porta de vidro mais aparece: entrada comercial, sala de reunião, varanda e área gourmet. Todas com perfil e ferragem diferentes.' },
      { icon: '🙅', titulo: 'O serviço que a maioria recusa', desc: 'Boa parte dos instaladores só atende madeira. Vidro pede ferramenta, preparo de superfície e cuidado com o tempo de cura da colagem.' },
      { icon: '🔐', titulo: 'Senha, digital e tag', desc: 'Os modelos para vidro abrem por senha, biometria e tag, do mesmo jeito que em porta comum — a diferença está na fixação, não no uso.' },
      { icon: '🛠️', titulo: 'Sem obra e sem marca na porta', desc: 'Não há fresagem nem furo: o vidro sai como entrou caso um dia a fechadura seja removida.' },
    ],
    aplicacoes: [
      'Porta de entrada de loja', 'Escritório e sala comercial', 'Clínica e consultório',
      'Sala de reunião', 'Porta de sacada e área gourmet', 'Portaria de condomínio',
      'Academia e estúdio', 'Coworking',
    ],
    processo: [
      { titulo: 'Foto pelo WhatsApp', desc: 'Foto da porta inteira e uma de perto do perfil e da ferragem. Só com isso já sabemos se o caso é simples ou exige modelo específico.' },
      { titulo: 'Definição do modelo', desc: 'O que decide é o perfil do vidro, a folha (simples ou dupla) e a ferragem existente. Confirmamos o modelo e o valor antes da visita.' },
      { titulo: 'Colagem e cura', desc: 'Superfície preparada, fechadura posicionada e colada. A cura é respeitada antes do primeiro uso — é a etapa que não pode ter pressa.' },
      { titulo: 'Cadastro e teste', desc: 'Cadastramos as digitais e as senhas com você, testamos abertura pelos dois lados e explicamos a saída de emergência.' },
    ],
    faq: [
      { q: 'Precisa furar o vidro para instalar a fechadura digital?', a: 'Não, e nem seria possível: vidro temperado não pode ser perfurado depois de temperado — qualquer furo estilhaça a peça inteira. A fechadura é colada diretamente no vidro, com preparo de superfície e tempo de cura respeitado.' },
      { q: 'Serve em porta de vidro de folha dupla?', a: 'Serve, mas o modelo muda: com duas folhas é preciso definir qual delas fica fixa e como as duas se travam. Mande a foto das duas folhas pelo WhatsApp que indicamos a solução antes da visita.' },
      { q: 'A fechadura colada segura mesmo?', a: 'Segura, desde que o modelo seja o correto para o perfil e a colagem respeite o tempo de cura. É justamente por isso que avaliamos a porta por foto antes: fechadura errada em vidro não é questão de acabamento, é questão de não funcionar.' },
      { q: 'Dá para voltar a porta ao estado original depois?', a: 'Dá. Como não há furo nem fresagem, a remoção não deixa marca estrutural no vidro — diferente da porta de madeira, em que embutir é definitivo.' },
    ],
    related: [
      { slug: 'porta-de-apartamento', name: 'Porta de apartamento', icon: '🏢' },
      { slug: 'porta-pivotante', name: 'Porta pivotante e madeira maciça', icon: '🚪' },
    ],
  },

  'porta-de-apartamento': {
    slug: 'porta-de-apartamento',
    title: 'Fechadura Digital para Porta de Apartamento',
    headline: 'Fechadura digital em porta de apartamento:\nsobrepor, sem marca na porta.',
    sub: 'Instalação de fechadura digital em porta de apartamento em São Paulo. O modelo de sobrepor instala acima da maçaneta, não modifica a porta e serve para imóvel alugado. Mão de obra a partir de R$ 249, em menos de 1 hora.',
    heroImg: '/fechadura_inter_3d.webp',
    msg: msgPorta('a porta padrão de apartamento'),
    beneficios: [
      { icon: '⏱️', titulo: 'Menos de 1 hora', desc: 'Sobrepor é o cenário mais rápido: sem fresagem, sem retirar a fechadura original, sem sujeira no apartamento.' },
      { icon: '🔑', titulo: 'A fechadura de chave continua lá', desc: 'A digital instala acima da maçaneta e convive com a original. Você ganha um jeito novo de entrar sem perder o antigo.' },
      { icon: '📄', titulo: 'Serve para imóvel alugado', desc: 'É a recomendação padrão para aluguel: como não há furo estrutural, a remoção não deixa marca relevante quando você devolver o imóvel.' },
      { icon: '👨‍👩‍👧', titulo: 'Fim da cópia de chave', desc: 'Cada morador tem a própria senha ou digital. Diarista e visita recebem senha temporária, que você apaga depois sem trocar o segredo.' },
      { icon: '🧰', titulo: 'Sem autorização de obra', desc: 'Não é obra: não há quebra, não há barulho de furadeira na porta e não há resíduo no corredor.' },
      { icon: '🔋', titulo: 'Funciona a pilha', desc: 'Sem ponto de energia na porta. Quatro pilhas AA, autonomia de até um ano e aviso de bateria fraca com semanas de antecedência.' },
    ],
    aplicacoes: [
      'Apartamento próprio', 'Imóvel alugado', 'Kitnet e studio',
      'Segunda residência', 'Apartamento de temporada', 'República e moradia compartilhada',
      'Porta de serviço', 'Escritório em apartamento',
    ],
    processo: [
      { titulo: 'Foto da porta', desc: 'Uma foto da porta com a maçaneta e outra da espessura, se der. Confirmamos na hora se o sobrepor serve.' },
      { titulo: 'Escolha do modelo', desc: 'Para apartamento indicamos os modelos de sobrepor. Se você já comprou a sua, instalamos a que tiver.' },
      { titulo: 'Instalação', desc: 'Fixação acima da maçaneta, sem mexer na fechadura de chave existente. Em geral menos de uma hora.' },
      { titulo: 'Cadastro e teste', desc: 'Cadastramos as digitais e as senhas de cada morador, e mostramos como criar e apagar senha de visitante.' },
    ],
    faq: [
      { q: 'Moro de aluguel, posso instalar fechadura digital?', a: 'Pode. Os modelos de sobrepor instalam acima da maçaneta e saem sem deixar marca relevante — é justamente a recomendação padrão para imóvel alugado. A fechadura de chave original continua no lugar e funcionando.' },
      { q: 'Precisa trocar a fechadura original do apartamento?', a: 'Não. A digital de sobrepor convive com a fechadura de chave: ela é acrescentada, não substitui. Você mantém a chave como alternativa e passa a entrar por senha ou digital no dia a dia.' },
      { q: 'A instalação faz sujeira ou barulho no prédio?', a: 'Praticamente nada. Sobrepor não exige fresagem nem quebra: são furos de fixação na própria porta, em poucos minutos. Não há resíduo no corredor nem necessidade de avisar obra.' },
      { q: 'Dá para levar a fechadura quando eu mudar?', a: 'Dá. Como é sobrepor, ela sai da porta e vai com você — é um dos motivos de ser a escolha mais comum em apartamento alugado.' },
    ],
    related: [
      { slug: 'porta-de-vidro', name: 'Porta de vidro temperado', icon: '🪟' },
      { slug: 'porta-pivotante', name: 'Porta pivotante e madeira maciça', icon: '🚪' },
    ],
  },

  'porta-pivotante': {
    slug: 'porta-pivotante',
    title: 'Fechadura Digital para Porta Pivotante e de Madeira Maciça',
    headline: 'Fechadura digital em porta pivotante:\nembutir com fresagem.',
    sub: 'Instalação de fechadura digital embutida em porta pivotante e de madeira maciça em São Paulo. A fresagem exige ferramenta e leva de 2 a 3 horas, e é o que entrega o acabamento que a porta pede.',
    heroImg: '/fechadura-hero.webp',
    msg: msgPorta('pivotante ou de madeira maciça'),
    beneficios: [
      { icon: '📐', titulo: 'Fresagem sob medida', desc: 'A fechadura é embutida na folha da porta. O rasgo é feito com fresa, no encaixe exato do modelo — não é furo de furadeira.' },
      { icon: '✨', titulo: 'O acabamento que a porta pede', desc: 'Porta pivotante costuma ser o item mais caro da entrada. Embutir mantém a linha limpa da folha, sem volume aparente.' },
      { icon: '🔒', titulo: 'Multiponto', desc: 'Porta grande trabalha com o tempo e pede travamento em mais de um ponto. Os modelos de embutir atendem a esse tipo de ferragem.' },
      { icon: '🕒', titulo: 'De 2 a 3 horas', desc: 'É o cenário mais demorado, e o que mais pesa no orçamento. Também é o que menos admite refazer: o rasgo na madeira é definitivo.' },
      { icon: '🧪', titulo: 'Avaliação antes de furar', desc: 'Antes de fresar avaliamos a folga da porta. Se não houver espessura segura para embutir, recomendamos um modelo de sobrepor em vez de arriscar a folha.' },
      { icon: '🎛️', titulo: 'Digital, senha, tag, app e chave', desc: 'Os modelos de embutir são os mais completos: aceitam todos os modos de abrir na mesma porta, inclusive a chave como saída de emergência.' },
    ],
    aplicacoes: [
      'Porta pivotante de entrada', 'Madeira maciça', 'Casa térrea e sobrado',
      'Condomínio de casas', 'Porta social', 'Entrada de alto padrão',
      'Casa de campo e praia', 'Porta interna de suíte',
    ],
    processo: [
      { titulo: 'Avaliação da folha', desc: 'Espessura, material e folga definem se a porta aceita embutir. Foto pelo WhatsApp resolve a maior parte dos casos.' },
      { titulo: 'Definição do modelo', desc: 'Para pivotante e madeira maciça indicamos os modelos de embutir, com todos os modos de abertura.' },
      { titulo: 'Fresagem e instalação', desc: 'Rasgo feito com fresa no encaixe do modelo, instalação da fechadura e ajuste do fecho. De 2 a 3 horas.' },
      { titulo: 'Cadastro e teste', desc: 'Cadastro de digitais e senhas, teste de abertura pelos dois lados e orientação sobre a saída de emergência por chave.' },
    ],
    faq: [
      { q: 'Embutir fechadura digital estraga a porta?', a: 'Não, quando a porta comporta. O rasgo é feito com fresa no encaixe exato do modelo e fica escondido pela própria fechadura. O cuidado real é antes: se a folha não tiver espessura segura, recomendamos sobrepor em vez de arriscar — porque na madeira o rasgo é definitivo.' },
      { q: 'Quanto tempo leva a instalação em porta pivotante?', a: 'De 2 a 3 horas, contra menos de uma hora de um modelo de sobrepor. A fresagem é o que consome o tempo, e é também o que mais pesa no orçamento.' },
      { q: 'Minha porta é multiponto. Tem fechadura digital que atenda?', a: 'Tem. Porta grande costuma travar em mais de um ponto, e há modelos de embutir feitos para essa ferragem. Como o mecanismo varia bastante, esse é um caso em que a foto da fechadura atual ajuda tanto quanto a foto da porta.' },
      { q: 'Posso manter a chave como alternativa?', a: 'Pode, e recomendamos. Os modelos de embutir mais completos aceitam digital, senha, tag, app e chave na mesma porta — a chave vira a saída de emergência, não o uso diário.' },
    ],
    related: [
      { slug: 'porta-de-vidro', name: 'Porta de vidro temperado', icon: '🪟' },
      { slug: 'porta-de-apartamento', name: 'Porta de apartamento', icon: '🏢' },
    ],
  },
};
