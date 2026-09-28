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

  // --- 8 modelos novos (28/09/2026), tirados dos catalogos que o dono salvou
  // em bot-whatsapp/docs/: flyer Intelbras, "FECHADURAS DIGITAIS" (Papaiz) e
  // "CATALOGO GERAL" + manuais (EZVIZ). Ficam SO no site por enquanto: nao
  // estao no catalogo do WhatsApp/Google nem no MODELOS do bot (o lead chega
  // no funil da fechadura, mas sem o modelo no titulo). Sem campo de preco:
  // o card da pagina nao mostra preco de equipamento.
  {
    id: 'fd1000d',
    modelo: 'Intelbras FD 1000 D',
    marca: 'Intelbras',
    nome: 'FD 1000 D',
    tipo: 'Sobrepor · só senha · portas de 25 a 70 mm',
    imagem: '/oferta-fd1000d.webp',
    alt: 'Fechadura digital de sobrepor Intelbras FD 1000 D com teclado de senha',
    beneficios: ['Até 155 senhas', 'Portas pivotantes e de giro'],
  },
  {
    id: 'mfd3000d',
    modelo: 'Intelbras MFD 3000 D',
    marca: 'Intelbras',
    nome: 'MFD 3000 D',
    tipo: 'Embutir · biometria, senha e app · portas de 30 a 60 mm',
    imagem: '/oferta-mfd3000d.webp',
    alt: 'Fechadura digital de embutir Intelbras MFD 3000 D com biometria e maçaneta',
    beneficios: ['155 senhas e 150 biometrias', 'Acesso remoto pelo aplicativo'],
  },
  {
    id: 'mfd7000d',
    modelo: 'Intelbras MFD 7000 D',
    marca: 'Intelbras',
    nome: 'MFD 7000 D',
    tipo: 'Embutir · biometria, senha, tag e app · portas de 30 a 60 mm',
    imagem: '/oferta-mfd7000d.webp',
    alt: 'Fechadura digital de embutir Intelbras MFD 7000 D completa com biometria, app e tag',
    beneficios: ['155 senhas, 150 biometrias e 150 tags', 'Acesso remoto pelo aplicativo'],
  },
  {
    id: 'sl125',
    modelo: 'Papaiz SL125',
    marca: 'Papaiz · ASSA ABLOY',
    nome: 'SL125',
    tipo: 'Sobrepor · senha · portas de 30 a 50 mm',
    imagem: '/oferta-sl125.webp',
    alt: 'Fechadura digital de sobrepor Papaiz SL125 com teclado touchscreen',
    beneficios: ['Até 31 senhas', 'Resistente à corrosão, indicada para o litoral'],
  },
  {
    id: 'sl150',
    modelo: 'Papaiz SL150',
    marca: 'Papaiz · ASSA ABLOY',
    nome: 'SL150',
    tipo: 'Embutir · biometria, senha e tag · portas de 35 a 60 mm',
    imagem: '/oferta-sl150.webp',
    alt: 'Fechadura digital de embutir Papaiz SL150 com biometria e maçaneta',
    beneficios: ['Até 100 usuários por tipo de acesso', 'Maçaneta reversível'],
  },
  {
    id: 'dl03pro',
    modelo: 'EZVIZ DL03 PRO',
    marca: 'EZVIZ',
    nome: 'DL03 PRO',
    tipo: 'Sobrepor · biometria e Wi-Fi, sem hub',
    imagem: '/oferta-dl03pro.webp',
    alt: 'Fechadura digital de sobrepor EZVIZ DL03 PRO com Wi-Fi e impressão digital',
    beneficios: ['App EZVIZ direto no Wi-Fi 2,4 GHz', 'Alarme antiviolação'],
  },
  {
    id: 'dl05',
    modelo: 'EZVIZ DL05',
    marca: 'EZVIZ',
    nome: 'DL05',
    tipo: 'Embutir · biometria, senha, cartão e Wi-Fi',
    imagem: '/oferta-dl05.webp',
    alt: 'Fechadura digital de embutir EZVIZ DL05 instalada em porta branca',
    beneficios: ['Senhas temporárias pelo app', 'À prova de intempéries, com campainha'],
  },
  {
    id: 'dl50fvs',
    modelo: 'EZVIZ DL50FVS',
    marca: 'EZVIZ',
    nome: 'DL50FVS',
    tipo: 'Embutir · reconhecimento facial 3D, biometria e app',
    imagem: '/oferta-dl50fvs.webp',
    alt: 'Fechadura inteligente EZVIZ DL50FVS com reconhecimento facial',
    beneficios: ['Abre pelo rosto, digital ou senha', 'Bateria de lítio recarregável'],
  },
];
