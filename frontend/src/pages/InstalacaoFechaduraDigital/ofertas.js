// Ofertas de fechadura + instalação. Sem JSX — só dados.
//
// Fonte: artes da campanha em "Documents/doc empresa/campanha fechadura"
// (24/08 a 02/09/2026). Preço aqui é o do PACOTE (fechadura + instalação), que
// é diferente do "a partir de R$ 200" de dados.js da /casa-inteligente — aquele
// é só mão de obra, para quem já tem a fechadura. A página mostra os dois,
// rotulados. Mudou a promoção? Muda aqui e regera a arte, não o contrário.
//
// `modelo` viaja no texto do WhatsApp via msgFechaduraModelo(): o bot reconhece
// "pacote completo" + "Instalação" e abre o funil da fechadura.

export const OFERTAS = [
  {
    id: 'fr102',
    modelo: 'Intelbras FR 102',
    marca: 'Intelbras',
    nome: 'FR 102',
    tipo: 'Sobrepor · porta padrão de apartamento',
    imagem: '/oferta-fr102.webp',
    alt: 'Fechadura digital Intelbras FR 102 instalada em porta de madeira clara',
    beneficios: [
      'Até 100 senhas de 4 a 12 dígitos',
      '4 pilhas AA, autonomia de até 1 ano',
      'Acesso de emergência com bateria 9V',
      'Fechamento automático ao encostar a porta',
    ],
    precoPrefixo: 'Promoção',
    preco: 499,
    precoSufixo: 'com instalação inclusa',
    nota: 'Instalação inclusa até 10 km; acima disso, deslocamento à parte.',
  },
  {
    id: 'fr201v',
    modelo: 'Intelbras FR 201 V',
    marca: 'Intelbras',
    nome: 'FR 201 V',
    tipo: 'Sobrepor · portas de 25 a 70 mm',
    imagem: '/oferta-fr201v.webp',
    alt: 'Fechadura digital Intelbras FR 201 V instalada em porta de madeira escura',
    beneficios: [
      'Abertura por senha ou tag/cartão (até 100 de cada)',
      'Chave mecânica de emergência',
      'Senha falsa, não perturbe e travamento automático',
      '36 meses de garantia do fabricante',
    ],
    precoPrefixo: 'A partir de',
    preco: 650,
    precoSufixo: 'instalada',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
  {
    id: 'papaiz-fitlock',
    modelo: 'Papaiz Fit Lock',
    marca: 'Papaiz · ASSA ABLOY',
    nome: 'Fit Lock',
    tipo: 'Embutir · madeira ou metal, 35 a 70 mm',
    imagem: '/oferta-papaiz-fitlock.webp',
    alt: 'Fechadura digital de embutir Papaiz Fit Lock em porta de madeira',
    beneficios: [
      'Até 100 biometrias e 400 senhas',
      'Stand alone: funciona sem Wi-Fi',
      'Troca a fechadura comum sem obra',
      '2 chaves mecânicas e emergência por USB-C',
    ],
    precoPrefixo: 'A partir de',
    preco: 800,
    precoSufixo: 'fechadura + instalação',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
  {
    id: 'mfd2020-hub',
    modelo: 'Intelbras MFD 2020 D + HUB MCA 1002',
    marca: 'Intelbras',
    nome: 'MFD 2020 D + HUB',
    tipo: 'Kit sobrepor + automação residencial',
    imagem: '/oferta-mfd2020-hub.webp',
    alt: 'Kit fechadura digital Intelbras MFD 2020 D com hub de automação MCA 1002',
    beneficios: [
      'Biometria, senha, tag e senha temporária',
      'Abertura remota e relatórios pelo app Mibo',
      'Compatível com Alexa e cenários de automação',
      'Hub ZigBee: amplie com sensores e sirene',
    ],
    precoPrefixo: 'A partir de',
    preco: 900,
    precoSufixo: 'kit completo instalado',
    nota: 'Valor varia com o modelo de porta e o deslocamento até o local.',
  },
];
