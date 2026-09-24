// Ofertas de fechadura + instalação. Sem JSX — só dados.
//
// Fonte: os MESMOS 5 modelos do catálogo (site-msiforce/docs/catalogo/itens.csv),
// publicados no Google Produtos e no WhatsApp em 24/09/2026. Mudou o catálogo? Muda
// aqui também — quem chega pela busca tem de ver os modelos que o WhatsApp oferece.
// Fotos: recorte só da fechadura das artes do catálogo, SEM o preço impresso. Preço aqui é o do PACOTE (fechadura + instalação), que
// é diferente do "a partir de R$ 249" de dados.js da /casa-inteligente — aquele
// é só mão de obra, para quem já tem a fechadura. A página mostra os dois,
// rotulados. Mudou a promoção? Muda aqui e regera a arte, não o contrário.
//
// `modelo` viaja no texto do WhatsApp via msgFechaduraModelo(): o bot reconhece
// "pacote completo" + "Instalação" e abre o funil da fechadura.

export const OFERTAS = [
  {
    id: 'fr101',
    modelo: 'Intelbras FR 101',
    marca: 'Intelbras',
    nome: 'FR 101',
    tipo: 'Sobrepor · portas de 25 a 50 mm',
    imagem: '/oferta-fr101.webp',
    alt: 'Fechadura digital de sobrepor Intelbras FR 101 com teclado touch',
    beneficios: [
      'Teclado touch de 12 teclas',
      'Até 4 senhas numéricas',
      'Travamento automático e função Não Perturbe',
      'Emergência por bateria 9 V',
    ],
    // Sem preco de equipamento desde 18/09/2026: a MSIFORCE nao tem estoque e
    // compra a cada venda, entao o valor do aparelho varia com o fornecedor do
    // dia. O preco fechado de cada kit fica no catalogo do WhatsApp/Google.
    precoPrefixo: 'Equipamento',
    precoSufixo: 'instalação a partir de R$ 249',
    nota: 'Instalação inclusa até 10 km; acima disso, deslocamento à parte.',
  },
  {
    id: 'sl140b',
    modelo: 'Papaiz SL140 B',
    marca: 'Papaiz · ASSA ABLOY',
    nome: 'SL140 B',
    tipo: 'Sobrepor · painel interno vertical',
    imagem: '/oferta-sl140b.webp',
    alt: 'Fechadura digital de sobrepor Papaiz SL140 B em aço escovado com puxador',
    beneficios: [
      'Senha, impressão digital ou chave de emergência',
      'Abertura pelo painel com toque leve',
      'Pode ser usada junto com puxador',
      '2 anos de garantia Papaiz',
    ],
    // Sem preco de equipamento desde 18/09/2026: a MSIFORCE nao tem estoque e
    // compra a cada venda, entao o valor do aparelho varia com o fornecedor do
    // dia. O preco fechado de cada kit fica no catalogo do WhatsApp/Google.
    precoPrefixo: 'Equipamento',
    precoSufixo: 'instalação a partir de R$ 249',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
  {
    id: 'mfd2020d',
    modelo: 'Intelbras MFD2020 D',
    marca: 'Intelbras',
    nome: 'MFD2020 D',
    tipo: 'Sobrepor · portas de 25 a 70 mm · hub opcional',
    imagem: '/oferta-mfd2020-hub.webp',
    alt: 'Fechadura digital Intelbras MFD2020 D com hub de automação MCA',
    beneficios: [
      'Até 150 biometrias, 150 senhas e 150 tags',
      'Senha temporária e senha protegida',
      'Emergência por USB-C, 3 anos de garantia',
      'App Mibo e Alexa com o Hub MCA (opcional)',
    ],
    // Sem preco de equipamento desde 18/09/2026: a MSIFORCE nao tem estoque e
    // compra a cada venda, entao o valor do aparelho varia com o fornecedor do
    // dia. O preco fechado de cada kit fica no catalogo do WhatsApp/Google.
    precoPrefixo: 'Equipamento',
    precoSufixo: 'instalação a partir de R$ 249',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
  {
    id: 'papaiz-fitlock',
    modelo: 'Papaiz Fit Lock',
    marca: 'Papaiz · ASSA ABLOY',
    nome: 'Fit Lock',
    tipo: 'Embutir · madeira ou metal',
    imagem: '/oferta-papaiz-fitlock.webp',
    alt: 'Fechadura digital de embutir Papaiz Fit Lock em porta de madeira',
    beneficios: [
      'Senha numérica, impressão digital ou chave',
      'Cadastra vários usuários',
      'Troca a fechadura comum sem obra',
      'Padrão ABNT, garantia de até 2 anos',
    ],
    // Sem preco de equipamento desde 18/09/2026: a MSIFORCE nao tem estoque e
    // compra a cada venda, entao o valor do aparelho varia com o fornecedor do
    // dia. O preco fechado de cada kit fica no catalogo do WhatsApp/Google.
    precoPrefixo: 'Equipamento',
    precoSufixo: 'instalação a partir de R$ 249',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
  {
    id: 'mfr3000v',
    modelo: 'Intelbras MFR 3000 V',
    marca: 'Intelbras',
    nome: 'MFR 3000 V',
    tipo: 'Embutir · porta pivotante ou madeira maciça',
    imagem: '/oferta-mfr3000v.webp',
    alt: 'Fechadura digital de embutir Intelbras MFR 3000 V com maçaneta',
    beneficios: [
      'Mais de 100 senhas e 100 biometrias',
      'Acesso por digital ou senha',
      'Senhas temporárias pelo app',
      'App Mibo com hub compatível (opcional)',
    ],
    // Sem preco de equipamento desde 18/09/2026: a MSIFORCE nao tem estoque e
    // compra a cada venda, entao o valor do aparelho varia com o fornecedor do
    // dia. O preco fechado de cada kit fica no catalogo do WhatsApp/Google.
    precoPrefixo: 'Equipamento',
    precoSufixo: 'instalação a partir de R$ 249',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
];
