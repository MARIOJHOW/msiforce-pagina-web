# Redesign da /casa-inteligente — Plano de Implementação

> **Para trabalhadores agênticos:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para implementar tarefa a tarefa. Os passos usam checkbox (`- [ ]`) para rastreio.

**Goal:** Repaginar a landing de fechadura digital `/casa-inteligente` para converter clientes de todas as faixas de renda, mantendo intacta a campanha do Google Ads que já aponta para essa URL.

**Architecture:** A página monolítica de 432 linhas é decomposta em componentes focados dentro de `src/pages/CasaInteligente/`, com dados em `dados.js` e ícones SVG em `icones.jsx`. A vitrine principal deixa de ser de produtos e passa a ser a régua de planos de instalação (R$ 200 → R$ 700), que é o que a empresa precifica. Navbar e Footer são renderizados dentro da página (não via `V1Layout`) para não duplicar o botão flutuante de WhatsApp.

**Tech Stack:** React 19, Vite 8, Framer Motion 12, react-router-dom 7. Sem framework de teste.

**Spec:** `docs/superpowers/specs/2026-08-18-casa-inteligente-redesign-design.md`

---

## Como "testar" neste projeto

**Não existe pytest/vitest/jest aqui. Não tente instalar um.** O ciclo de verificação é:

```bash
cd frontend
npm run lint                                        # ESLint
npm run build                                       # build limpo
npm run preview -- --port 4173 &                    # sobe o build
node tools/valida-ctas.mjs http://localhost:4173    # portão principal: exit 0 = OK
node tools/shot.mjs /casa-inteligente <nome>        # captura visual
```

`valida-ctas.mjs` é o portão de verdade: ele confere cada CTA de WhatsApp contra os
detectores **reais** do bot (`whatsapp-bot-eletrica/services/fechadura.js`), confere o
número de telefone e confere as âncoras dos sitelinks. Ele sai com código 1 se algo
quebrar. Rode-o ao fim de toda tarefa que toque em CTA, âncora ou layout.

---

## Global Constraints

Valores copiados literalmente do spec. Valem para **todas** as tarefas.

- **Idioma de toda a interface e dos commits:** português (pt-BR).
- **Acento único:** `#c5a059` (o `--orange` do `index.css`). Verde **somente** no botão do WhatsApp. O verde `#4ade80` da versão atual deve desaparecer da página.
- **Âncoras obrigatórias no DOM:** `id="modelos"`, `id="instalacao"`, `id="combo"`. São sitelinks do anúncio ativo — removê-las quebra a campanha em silêncio.
- **Telefone oficial:** `5511910773865`. Nenhum outro número pode aparecer em link de WhatsApp.
- **Preços "a partir de":** Essencial R$ 200 · Design R$ 250 · Conectado R$ 400 · Premium R$ 700.
- **Nunca estampar valor de parcela.** A frase é sempre `em até 12x no cartão`.
- **Asterisco obrigatório** ao pé da vitrine de planos, literal: `*Valor varia de acordo com o modelo da fechadura e o material da porta. Parcelamento no cartão com taxa da operadora.`
- **Prova social:** apenas `5,0 no Google` e `82 avaliações`. **Não inventar** depoimento, nome de cliente, foto de obra ou qualquer outro número.
- **Zero emoji como ícone de interface.** Todos viram SVG.
- **Imagens novas:** WebP, e gravadas **tanto** em `frontend/public/` **quanto** na raiz do repositório (é a raiz que o Cloudflare Pages serve).
- **Não fazer deploy.** Commits locais apenas.

---

## Estrutura de arquivos

Tudo dentro de `frontend/src/pages/CasaInteligente/`, exceto onde indicado.

| Arquivo | Responsabilidade |
|---------|------------------|
| `dados.js` *(novo)* | Constantes de conteúdo: `PLANOS`, `MODELOS`, `FAQ`, `PASSOS`, `GOOGLE`. Sem JSX. |
| `icones.jsx` *(novo)* | Ícones SVG inline que substituem os emojis. Sem lógica. |
| `SeloGoogle.jsx` *(novo)* | Selo 5,0/82 avaliações, reusado no hero e na prova social. |
| `VitrinePlanos.jsx` + `.css` *(novos)* | Vitrine de planos com os dois filtros. Coração da página. |
| `VitrineModelos.jsx` *(novo)* | Os 4 modelos de fechadura, sem preço. |
| `ComoFunciona.jsx` *(novo)* | Os 4 passos da instalação. |
| `FaqPagamento.jsx` *(novo)* | FAQ + garantia + formas de pagamento. |
| `CasaInteligente.jsx` *(modificar)* | Passa a ser composição: hero + as seções acima. |
| `CasaInteligente.css` *(modificar)* | Paleta dourada, contraste, mobile. |
| `src/lib/gatilhos.js` *(modificar)* | Nova mensagem `msgPlanoInstalacao`. |
| `frontend/tools/shot.mjs` *(modificar)* | Corrigir captura. |
| `frontend/tools/valida-ctas.mjs` *(modificar)* | Não classificar o botão da campanha como herdado. |
| `sitemap.xml` *(modificar, na raiz)* | Incluir as rotas que faltam. |

---

## Task 1: Consertar a ferramenta de captura

Vem primeiro porque **toda verificação visual das tarefas seguintes depende dela**. Hoje `shot.mjs` captura sem rolar a página; como as seções usam `whileInView` com `initial="hidden"`, tudo abaixo da primeira dobra sai com `opacity: 0` e a captura parece uma página quebrada.

**Files:**
- Modify: `frontend/tools/shot.mjs:17-22`

**Interfaces:**
- Consumes: nada.
- Produces: `node tools/shot.mjs <rota> <nome> [porta]` passa a gerar PNG com todas as seções visíveis, em `frontend/tools/shots/<nome>.png`.

- [ ] **Passo 1: Reproduzir o defeito**

```bash
cd frontend
npm run dev &
node tools/shot.mjs /casa-inteligente antes-fix
```

Abra `frontend/tools/shots/antes-fix.png`. Esperado: da vitrine para baixo tudo preto/vazio. É o bug.

- [ ] **Passo 2: Aplicar a correção**

Em `frontend/tools/shot.mjs`, substitua o bloco do `try` (a partir do `const page = ...`) por:

```js
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // As seções usam whileInView do Framer Motion: sem rolar, elas ficam em
  // opacity 0 e a captura sai "quebrada". Rola até o fim antes de fotografar.
  await page.evaluate(async () => {
    const passo = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: outFile, fullPage: true });
  console.log(`OK  ${url}  ->  ${outFile}`);
```

- [ ] **Passo 3: Verificar que o defeito sumiu**

```bash
node tools/shot.mjs /casa-inteligente depois-fix
```

Abra `frontend/tools/shots/depois-fix.png`. Esperado: vitrine, bento grid, tabs do guia e caixas de oferta **todas visíveis**.

- [ ] **Passo 4: Commit**

```bash
git add frontend/tools/shot.mjs
git commit -m "fix(tools): shot.mjs rola a pagina antes de capturar

Sem rolar, as secoes com whileInView ficam em opacity 0 e a captura
sai parecendo uma pagina quebrada."
```

---

## Task 2: Corrigir a imagem do hero (bug em produção)

Independente do redesenho e já entrega valor: hoje 100% dos visitantes veem a primeira dobra sem imagem.

**Files:**
- Create: `frontend/public/fechadura_completa.webp`
- Create: `fechadura_completa.webp` (raiz do repositório)
- Modify: `frontend/src/pages/CasaInteligente/CasaInteligente.jsx:120`

**Interfaces:**
- Consumes: nada.
- Produces: `/fechadura_completa.webp` disponível na raiz publicada.

- [ ] **Passo 1: Confirmar o defeito em produção**

```bash
curl -s -o /dev/null -w "%{http_code} %{size_download}\n" https://www.msiforce.com.br/fechadura_completa.png
```

Esperado: `200 3045` — 3045 bytes é o `index.html` servido como fallback, ou seja, **o arquivo não existe** no deploy.

- [ ] **Passo 2: Gerar o WebP**

```bash
cd frontend
node -e "require('sharp')('public/fechadura_completa.png').webp({quality:82}).toFile('public/fechadura_completa.webp').then(i=>console.log(i.size+' bytes'))"
```

Esperado: um número bem abaixo dos 108792 bytes do PNG.

- [ ] **Passo 3: Copiar para a raiz do repositório**

A raiz é o que o Cloudflare Pages serve. Sem este passo o bug se repete.

```bash
cp frontend/public/fechadura_completa.webp ./fechadura_completa.webp
ls -la fechadura_completa.webp
```

- [ ] **Passo 4: Apontar o JSX para o WebP**

Em `CasaInteligente.jsx`, na linha da `main-lock-img`, troque a extensão:

```jsx
<img src="/fechadura_completa.webp" alt="Fechadura digital instalada pela MSIFORCE" className="main-lock-img complete-img" width="520" height="520" />
```

- [ ] **Passo 5: Verificar**

```bash
cd frontend && npm run build && node tools/shot.mjs /casa-inteligente hero-fix
```

Esperado: build limpo e a fechadura **visível** no topo da captura.

- [ ] **Passo 6: Commit**

```bash
git add fechadura_completa.webp frontend/public/fechadura_completa.webp frontend/src/pages/CasaInteligente/CasaInteligente.jsx
git commit -m "fix(casa-inteligente): imagem do hero faltando em producao

fechadura_completa.png existia so em frontend/public e nunca chegou a
raiz publicada — o Cloudflare servia o index.html como fallback e a
primeira dobra ficava sem imagem. Convertida para WebP e gravada na raiz."
```

---

## Task 3: Dados da página

Toda a matéria-prima de conteúdo num arquivo só, sem JSX. As tarefas seguintes consomem daqui.

**Files:**
- Create: `frontend/src/pages/CasaInteligente/dados.js`

**Interfaces:**
- Consumes: nada.
- Produces: `PLANOS`, `MODELOS`, `PASSOS`, `FAQ`, `GOOGLE`, `NOTA_LEGAL`.
  - `PLANOS: Array<{ id, nome, apartirde: number, resumo, porta, portaFiltro: string[], bolso: 'entrada'|'medio'|'alto', inclui: string[] }>`
  - `MODELOS: Array<{ id, nome, tag, imagem, metodos: string[], porta, paraQuem }>`
  - `GOOGLE: { nota: '5,0', avaliacoes: 82, url: string|null }`

- [ ] **Passo 1: Criar o arquivo**

```js
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
    imagem: '/fechadura_premium_3d.png',
    metodos: ['Digital', 'App', 'Tag', 'Senha', 'Chave'],
    porta: 'Pivotante e madeira maciça',
    paraQuem: 'Para quem quer o acabamento mais bonito e todos os modos de abrir na mesma porta.',
  },
  {
    id: 'fr221v',
    nome: 'Modelo Design',
    tag: 'Design · Embutir',
    imagem: '/fechadura_design_3d.png',
    metodos: ['Digital', 'Senha'],
    porta: 'Pivotante e madeira maciça',
    paraQuem: 'Para quem quer o visual embutido e sofisticado sem pagar por recursos que não vai usar.',
  },
  {
    id: 'fr102',
    nome: 'Modelo Intermediário',
    tag: 'Intermediária · Sobrepor',
    imagem: '/fechadura_inter_3d.png',
    metodos: ['Senha touch'],
    porta: 'Porta padrão de apartamento',
    paraQuem: 'Instala acima da maçaneta, sem modificar a porta. Ideal para quem mora de aluguel.',
  },
  {
    id: 'fr10',
    // Era "Modelo Custo-Benefício": o nome antigo sinalizava "essa é a barata"
    // e constrangia justamente o cliente que a página quer atrair.
    nome: 'Modelo Essencial',
    tag: 'Essencial · Sobrepor',
    imagem: '/fechadura_custo_3d.png',
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

export const FAQ = [
  {
    p: 'Vocês instalam fechadura que eu comprei em outro lugar?',
    r: 'Sim. É o caso mais comum. Você paga só a mão de obra, a partir de R$ 200, e mantém a garantia do fabricante — instalação por técnico certificado não anula garantia.',
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

export const GOOGLE = {
  nota: '5,0',
  avaliacoes: 82,
  // Sem link até o cliente informar a URL do perfil. Renderização é condicional:
  // com null o selo aparece como texto, sem virar link quebrado.
  url: null,
};

export const NOTA_LEGAL =
  '*Valor varia de acordo com o modelo da fechadura e o material da porta. Parcelamento no cartão com taxa da operadora.';
```

- [ ] **Passo 2: Verificar que o módulo é válido**

```bash
cd frontend
node --input-type=module -e "import('./src/pages/CasaInteligente/dados.js').then(m=>{console.log(m.PLANOS.length, m.MODELOS.length, m.FAQ.length, m.GOOGLE.nota)})"
```

Esperado: `4 4 6 5,0`

- [ ] **Passo 3: Commit**

```bash
git add frontend/src/pages/CasaInteligente/dados.js
git commit -m "feat(casa-inteligente): extrai conteudo da landing para dados.js"
```

---

## Task 4: Ícones SVG no lugar dos emojis

**Files:**
- Create: `frontend/src/pages/CasaInteligente/icones.jsx`

**Interfaces:**
- Consumes: nada.
- Produces: componentes `<IcoDigital/>`, `<IcoApp/>`, `<IcoEscudo/>`, `<IcoPorta/>`, `<IcoPredio/>`, `<IcoVidro/>`, `<IcoCheck/>`, `<IcoEstrela/>`, `<IcoPresente/>`. Todos aceitam `{ className }` e herdam a cor via `currentColor`.

- [ ] **Passo 1: Criar o arquivo**

```jsx
// Ícones da landing. Substituem os emojis da versão anterior, que renderizavam
// diferente em cada SO e derrubavam a sensação premium.
// Todos herdam cor por currentColor e tamanho por font-size do pai (1em).

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const IcoDigital = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3a6 6 0 0 0-6 6v3a10 10 0 0 1-.6 3.4" />
    <path d="M12 7a2 2 0 0 0-2 2v3a14 14 0 0 1-1 5" />
    <path d="M12 11v1a18 18 0 0 1-.7 5" />
    <path d="M15.6 20a22 22 0 0 0 .4-4V9a4 4 0 0 0-6-3.5" />
    <path d="M18.5 17.5A26 26 0 0 0 19 12V9a7 7 0 0 0-3.5-6" />
  </svg>
);

export const IcoApp = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);

export const IcoEscudo = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 2.8 4.8 6v5.6c0 4.4 3 8.2 7.2 9.6 4.2-1.4 7.2-5.2 7.2-9.6V6z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const IcoPorta = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
    <path d="M3 21h16" />
    <circle cx="13" cy="12.5" r="1" />
  </svg>
);

export const IcoPredio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
    <path d="M15 10h4a1 1 0 0 1 1 1v10" />
    <path d="M2 21h20M7.5 8h1M11 8h1M7.5 12h1M11 12h1M7.5 16h1M11 16h1" />
  </svg>
);

export const IcoVidro = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 7 16 15M8 13l4 4" />
  </svg>
);

export const IcoCheck = ({ className }) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const IcoEstrela = ({ className }) => (
  <svg {...base} className={className} fill="currentColor" stroke="none">
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
  </svg>
);

export const IcoPresente = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="8.5" width="18" height="5" rx="1" />
    <path d="M5 13.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5M12 8.5V21" />
    <path d="M12 8.5S10.8 3.5 8.5 3.5a2.2 2.2 0 0 0 0 5zM12 8.5s1.2-5 3.5-5a2.2 2.2 0 0 1 0 5z" />
  </svg>
);
```

- [ ] **Passo 2: Verificar que compila**

```bash
cd frontend && npm run lint && npm run build
```

Esperado: sem erro. (O arquivo ainda não é importado — o build só confirma sintaxe válida.)

- [ ] **Passo 3: Commit**

```bash
git add frontend/src/pages/CasaInteligente/icones.jsx
git commit -m "feat(casa-inteligente): icones SVG para substituir os emojis"
```

---

## Task 5: Mensagem de WhatsApp dos planos

O bot só reconhece frases-gatilho específicas. CTA que não bate faz o lead cair no menu genérico — foi o bug da Fase 1 registrado no próprio `gatilhos.js`.

**Files:**
- Modify: `frontend/src/lib/gatilhos.js`

**Interfaces:**
- Consumes: nada.
- Produces: `msgPlanoInstalacao(plano: string) => string`.

- [ ] **Passo 1: Confirmar qual frase o bot aceita**

```bash
node -e "const {detectarGatilhoFechadura}=require('D:/Users/jhowu/bot-whatsapp/whatsapp-bot-eletrica/services/fechadura.js'); console.log(detectarGatilhoFechadura('Olá! Quero o Plano Conectado — apenas o serviço de instalação da minha fechadura digital.'))"
```

Esperado: `{ match: true, intencao: 'instalacao', modelo: null }`. Se vier `match: false`, **pare** — a frase precisa conter literalmente `apenas o serviço de instalação`.

- [ ] **Passo 2: Adicionar a função**

Ao fim de `frontend/src/lib/gatilhos.js`:

```js
// CTAs da vitrine de planos. A frase "apenas o serviço de instalação" é o que
// GATILHOS_INSTALACAO reconhece em fechadura.js — sem ela o lead cai no menu
// genérico. O nome do plano viaja como texto livre para o atendimento ler; o
// bot não distingue um plano do outro (decisão registrada no spec).
export const msgPlanoInstalacao = (plano) =>
  `Olá! Quero o Plano ${plano} — apenas o serviço de instalação da minha fechadura digital.`;
```

- [ ] **Passo 3: Verificar os quatro planos de uma vez**

```bash
node -e "
const {detectarGatilhoFechadura}=require('D:/Users/jhowu/bot-whatsapp/whatsapp-bot-eletrica/services/fechadura.js');
const msg=(p)=>\`Olá! Quero o Plano \${p} — apenas o serviço de instalação da minha fechadura digital.\`;
for (const p of ['Essencial','Design','Conectado','Premium']) {
  const r=detectarGatilhoFechadura(msg(p));
  console.log(p, r.match ? 'OK '+r.intencao : 'FALHA');
}"
```

Esperado: as quatro linhas com `OK instalacao`.

- [ ] **Passo 4: Commit**

```bash
git add frontend/src/lib/gatilhos.js
git commit -m "feat(gatilhos): mensagem de WhatsApp dos planos de instalacao"
```

---

## Task 6: Selo do Google

**Files:**
- Create: `frontend/src/pages/CasaInteligente/SeloGoogle.jsx`

**Interfaces:**
- Consumes: `GOOGLE` de `./dados`, `IcoEstrela` de `./icones`.
- Produces: `<SeloGoogle compacto />` — `compacto` (boolean) reduz para uso no hero.

- [ ] **Passo 1: Criar o componente**

```jsx
import { GOOGLE } from './dados';
import { IcoEstrela } from './icones';

/**
 * Selo de reputação. Única prova social confirmada pelo cliente — não adicione
 * depoimento, nome ou foto aqui sem material real.
 * `url` nulo em dados.js faz o selo renderizar como texto, nunca como link morto.
 */
const SeloGoogle = ({ compacto = false }) => {
  const conteudo = (
    <>
      <span className="selo-estrelas" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => <IcoEstrela key={i} />)}
      </span>
      <span className="selo-texto">
        <strong>{GOOGLE.nota} no Google</strong>
        <span>{GOOGLE.avaliacoes} avaliações de clientes</span>
      </span>
    </>
  );

  const classe = `selo-google${compacto ? ' selo-google--compacto' : ''}`;
  const rotulo = `Nota ${GOOGLE.nota} de 5 no Google, ${GOOGLE.avaliacoes} avaliações`;

  if (GOOGLE.url) {
    return (
      <a className={classe} href={GOOGLE.url} target="_blank" rel="noopener noreferrer" aria-label={rotulo}>
        {conteudo}
      </a>
    );
  }
  return <div className={classe} aria-label={rotulo}>{conteudo}</div>;
};

export default SeloGoogle;
```

- [ ] **Passo 2: Estilo em `CasaInteligente.css`**

```css
/* ── Selo Google ─────────────────────────────── */
.selo-google {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 10px; padding: 10px 14px;
  text-decoration: none;
}
.selo-estrelas { display: inline-flex; gap: 2px; color: var(--orange); font-size: 16px; }
.selo-texto { display: flex; flex-direction: column; line-height: 1.3; }
.selo-texto strong { color: var(--white); font-size: 14px; font-weight: 700; }
.selo-texto span { color: #9a9a9a; font-size: 11.5px; }
.selo-google--compacto { padding: 8px 12px; }
.selo-google--compacto .selo-estrelas { font-size: 14px; }
```

- [ ] **Passo 3: Verificar**

```bash
cd frontend && npm run lint && npm run build
```

Esperado: sem erro.

- [ ] **Passo 4: Commit**

```bash
git add frontend/src/pages/CasaInteligente/SeloGoogle.jsx frontend/src/pages/CasaInteligente/CasaInteligente.css
git commit -m "feat(casa-inteligente): selo de reputacao do Google"
```

---

## Task 7: Vitrine de planos de instalação

O coração da página. Substitui a vitrine de produtos como seção principal.

**Files:**
- Create: `frontend/src/pages/CasaInteligente/VitrinePlanos.jsx`
- Create: `frontend/src/pages/CasaInteligente/VitrinePlanos.css`

**Interfaces:**
- Consumes: `PLANOS`, `FILTRO_BOLSO`, `FILTRO_PORTA`, `NOTA_LEGAL` de `./dados`; `IcoCheck` de `./icones`; `msgPlanoInstalacao` de `../../lib/gatilhos`; `WhatsAppButton` de `../../components/WhatsAppButton`.
- Produces: `<VitrinePlanos />`. Renderiza a seção com `id="instalacao"` — **âncora obrigatória de sitelink**.

- [ ] **Passo 1: Criar o componente**

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import './VitrinePlanos.css';
import { PLANOS, FILTRO_BOLSO, FILTRO_PORTA, NOTA_LEGAL } from './dados';
import { IcoCheck } from './icones';
import { msgPlanoInstalacao } from '../../lib/gatilhos';
import WhatsAppButton from '../../components/WhatsAppButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const VitrinePlanos = () => {
  const [bolso, setBolso] = useState('todos');
  const [porta, setPorta] = useState('todos');

  const visiveis = PLANOS.filter(
    (p) =>
      (bolso === 'todos' || p.bolso === bolso) &&
      (porta === 'todos' || p.portaFiltro.includes(porta)),
  );

  return (
    <section className="planos-secao" id="instalacao">
      <div className="section-header">
        <h2 className="campanha-section-title">Instalação a partir de R$ 200</h2>
        <p className="campanha-section-subtitle">
          O preço acompanha a complexidade da sua porta e da fechadura — não o seu CEP.
          Escolha a faixa que cabe no seu bolso.
        </p>
      </div>

      <div className="planos-filtros">
        <div className="planos-filtro">
          <span className="planos-filtro-rot">Filtrar por bolso</span>
          <div className="planos-chips" role="group" aria-label="Filtrar planos por faixa de preço">
            {FILTRO_BOLSO.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`planos-chip${bolso === f.id ? ' ativo' : ''}`}
                aria-pressed={bolso === f.id}
                onClick={() => setBolso(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="planos-filtro">
          <span className="planos-filtro-rot">Tipo de porta</span>
          <div className="planos-chips" role="group" aria-label="Filtrar planos por tipo de porta">
            {FILTRO_PORTA.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`planos-chip${porta === f.id ? ' ativo' : ''}`}
                aria-pressed={porta === f.id}
                onClick={() => setPorta(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="planos-grid">
        {visiveis.map((p) => (
          <motion.article
            key={p.id}
            className={`plano-card plano-${p.id}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
          >
            <div className="plano-trilho" aria-hidden="true" />
            <div className="plano-corpo">
              <h3 className="plano-nome">{p.nome}</h3>
              <p className="plano-resumo">{p.resumo}</p>

              <div className="plano-preco">
                <span className="plano-preco-rot">Mão de obra a partir de</span>
                <strong className="plano-preco-val">R$ {p.apartirde}</strong>
                <span className="plano-preco-par">em até 12x no cartão</span>
              </div>

              <ul className="plano-inclui">
                {p.inclui.map((item) => (
                  <li key={item}><IcoCheck className="plano-check" /> {item}</li>
                ))}
              </ul>

              <p className="plano-porta">{p.porta}</p>

              <WhatsAppButton
                message={msgPlanoInstalacao(p.nome)}
                className="plano-btn"
              >
                Orçar {p.nome}
              </WhatsAppButton>
            </div>
          </motion.article>
        ))}
      </div>

      {visiveis.length === 0 && (
        <p className="planos-vazio">
          Nenhum plano com esses dois filtros ao mesmo tempo. Limpe um deles — ou fale
          com a gente que avaliamos sua porta pelo WhatsApp.
        </p>
      )}

      <p className="planos-legal">{NOTA_LEGAL}</p>
    </section>
  );
};

export default VitrinePlanos;
```

- [ ] **Passo 2: Criar o CSS**

```css
/* Vitrine de planos de instalação — seção principal da landing.
   Escada visual: a intensidade do dourado cresce do Essencial ao Premium. */
.planos-secao { padding: 90px 5% 80px; background: var(--dark); }

.planos-filtros { max-width: 1200px; margin: 0 auto 26px; display: flex; flex-wrap: wrap; gap: 22px; }
.planos-filtro-rot {
  display: block; font-size: 10px; letter-spacing: .1em; text-transform: uppercase;
  color: #6d6d6d; margin-bottom: 8px;
}
.planos-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.planos-chip {
  font: inherit; font-size: 12px; cursor: pointer;
  padding: 7px 14px; border-radius: 99px;
  border: 1px solid rgba(255,255,255,.16); background: transparent; color: #aaa;
  transition: border-color .2s, color .2s, background .2s;
}
.planos-chip:hover { border-color: rgba(197,160,89,.6); color: var(--white); }
.planos-chip.ativo { background: var(--orange); border-color: var(--orange); color: #0a0a0a; font-weight: 700; }
.planos-chip:focus-visible { outline: 2px solid var(--orange); outline-offset: 2px; }

.planos-grid {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}

.plano-card {
  background: #111; border: 1px solid rgba(255,255,255,.09);
  border-radius: 14px; overflow: hidden; display: flex; flex-direction: column;
}
.plano-trilho { height: 3px; }
.plano-essencial  .plano-trilho { background: rgba(197,160,89,.30); }
.plano-design     .plano-trilho { background: rgba(197,160,89,.52); }
.plano-conectado  .plano-trilho { background: rgba(197,160,89,.76); }
.plano-premium    .plano-trilho { background: var(--orange); }
.plano-premium { border-color: rgba(197,160,89,.45); }

.plano-corpo { padding: 20px 18px 22px; display: flex; flex-direction: column; flex: 1; }
.plano-nome { color: var(--white); font-size: 20px; font-weight: 800; margin: 0 0 4px; }
.plano-resumo { color: #9a9a9a; font-size: 13px; line-height: 1.5; margin: 0 0 16px; min-height: 39px; }

.plano-preco {
  border-top: 1px solid rgba(255,255,255,.08);
  border-bottom: 1px solid rgba(255,255,255,.08);
  padding: 13px 0; margin-bottom: 16px;
}
.plano-preco-rot {
  display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; color: #777;
}
.plano-preco-val { display: block; color: var(--orange); font-size: 32px; font-weight: 800; line-height: 1.15; }
.plano-preco-par { display: block; font-size: 12px; color: #9a9a9a; margin-top: 3px; }

.plano-inclui { list-style: none; padding: 0; margin: 0 0 16px; }
.plano-inclui li {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: #c3c3c3; line-height: 1.5; margin-bottom: 8px;
}
.plano-check { color: var(--orange); font-size: 15px; flex-shrink: 0; margin-top: 1px; }

.plano-porta { font-size: 12px; color: #7fbf8f; line-height: 1.45; margin: 0 0 18px; }

.plano-btn {
  display: block; text-align: center; text-decoration: none;
  margin-top: auto; padding: 13px; border-radius: 9px;
  font-weight: 800; font-size: 14px;
  background: transparent; border: 1px solid rgba(197,160,89,.55); color: var(--orange);
  transition: background .2s, color .2s;
}
.plano-btn:hover { background: var(--orange); color: #0a0a0a; }
.plano-premium .plano-btn { background: var(--orange); border-color: var(--orange); color: #0a0a0a; }
.plano-premium .plano-btn:hover { filter: brightness(1.1); }

.planos-vazio { max-width: 700px; margin: 26px auto 0; text-align: center; color: #9a9a9a; font-size: 14px; }
.planos-legal { max-width: 900px; margin: 22px auto 0; text-align: center; color: #6d6d6d; font-size: 11.5px; line-height: 1.6; }

@media (max-width: 980px) {
  .planos-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .planos-secao { padding: 60px 4% 55px; }
  .plano-corpo { padding: 16px 14px 18px; }
  .plano-nome { font-size: 17px; }
  .plano-resumo { min-height: 0; margin-bottom: 12px; }
  .plano-preco-val { font-size: 26px; }
}
```

- [ ] **Passo 3: Verificar**

```bash
cd frontend && npm run lint && npm run build
```

Esperado: sem erro. (Ainda não montado na página — próxima tarefa.)

- [ ] **Passo 4: Commit**

```bash
git add frontend/src/pages/CasaInteligente/VitrinePlanos.jsx frontend/src/pages/CasaInteligente/VitrinePlanos.css
git commit -m "feat(casa-inteligente): vitrine de planos de instalacao com filtros"
```

---

## Task 8: Seções de apoio — modelos, passos e FAQ

Três componentes pequenos numa tarefa só: nascem juntos, são todos consumo direto de `dados.js` e um revisor não rejeitaria um sem rejeitar os outros.

**Files:**
- Create: `frontend/src/pages/CasaInteligente/VitrineModelos.jsx`
- Create: `frontend/src/pages/CasaInteligente/ComoFunciona.jsx`
- Create: `frontend/src/pages/CasaInteligente/FaqPagamento.jsx`

**Interfaces:**
- Consumes: `MODELOS`, `PASSOS`, `FAQ` de `./dados`; `msgFechaduraModelo` de `../../lib/gatilhos`.
- Produces: `<VitrineModelos />` (renderiza `id="modelos"` — **âncora obrigatória**), `<ComoFunciona />`, `<FaqPagamento />`.

- [ ] **Passo 1: `VitrineModelos.jsx`**

```jsx
import { motion } from 'framer-motion';
import { MODELOS } from './dados';
import { msgFechaduraModelo } from '../../lib/gatilhos';
import WhatsAppButton from '../../components/WhatsAppButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Seção secundária: quem ainda não tem a fechadura. Sem preço — só orçamento. */
const VitrineModelos = () => (
  <section className="modelos-secao" id="modelos">
    <div className="section-header">
      <h2 className="campanha-section-title">Não tem a fechadura ainda?</h2>
      <p className="campanha-section-subtitle">
        A gente fornece também. Escolha o modelo e orçamos fechadura e instalação juntas.
      </p>
    </div>

    <div className="modelos-grid">
      {MODELOS.map((m) => (
        <motion.article
          key={m.id}
          className="modelo-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          <div className="modelo-imagem">
            <img src={m.imagem} alt={m.nome} loading="lazy" width="400" height="400" />
          </div>
          <div className="modelo-info">
            <span className="modelo-tag">{m.tag}</span>
            <h3>{m.nome}</h3>
            <p className="modelo-paraquem">{m.paraQuem}</p>
            <div className="metodos-abertura">
              {m.metodos.map((metodo) => (
                <span className="metodo-badge" key={metodo}>{metodo}</span>
              ))}
            </div>
            <p className="modelo-porta">{m.porta}</p>
            <WhatsAppButton message={msgFechaduraModelo(m.nome)} className="modelo-btn">
              Orçar este modelo
            </WhatsAppButton>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default VitrineModelos;
```

- [ ] **Passo 2: `ComoFunciona.jsx`**

```jsx
import { motion } from 'framer-motion';
import { PASSOS } from './dados';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ComoFunciona = () => (
  <section className="passos-secao">
    <div className="section-header">
      <h2 className="campanha-section-title">Como funciona</h2>
      <p className="campanha-section-subtitle">
        Do primeiro WhatsApp à família toda usando a fechadura. Sem surpresa no meio.
      </p>
    </div>

    <ol className="passos-grid">
      {PASSOS.map((p) => (
        <motion.li
          key={p.n}
          className="passo-item"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          <span className="passo-n" aria-hidden="true">{p.n}</span>
          <h3>{p.titulo}</h3>
          <p>{p.texto}</p>
        </motion.li>
      ))}
    </ol>
  </section>
);

export default ComoFunciona;
```

- [ ] **Passo 3: `FaqPagamento.jsx`**

```jsx
import { motion } from 'framer-motion';
import { FAQ } from './dados';

const FaqPagamento = () => (
  <section className="faq-secao">
    <div className="section-header">
      <h2 className="campanha-section-title">Perguntas frequentes</h2>
      <p className="campanha-section-subtitle">
        As dúvidas que mais chegam no nosso WhatsApp, respondidas antes de você perguntar.
      </p>
    </div>

    <motion.div
      className="faq-lista"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      {FAQ.map((item) => (
        <details className="faq-item" key={item.p}>
          <summary>{item.p}</summary>
          <p>{item.r}</p>
        </details>
      ))}
    </motion.div>
  </section>
);

export default FaqPagamento;
```

- [ ] **Passo 4: Estilos em `CasaInteligente.css`**

Acrescente ao fim do arquivo:

```css
/* ── Modelos (seção secundária) ──────────────── */
.modelos-secao { padding: 80px 5%; background: var(--black); }
.modelo-paraquem { color: #9a9a9a; font-size: 13px; line-height: 1.5; margin: 6px 0 12px; }
.modelo-porta { font-size: 12px; color: #7fbf8f; margin: 10px 0 14px; }
.modelo-btn {
  display: block; text-align: center; text-decoration: none; padding: 12px; border-radius: 9px;
  font-weight: 800; font-size: 13.5px;
  background: transparent; border: 1px solid rgba(197,160,89,.55); color: var(--orange);
  transition: background .2s, color .2s;
}
.modelo-btn:hover { background: var(--orange); color: #0a0a0a; }

/* ── Como funciona ───────────────────────────── */
.passos-secao { padding: 80px 5%; background: var(--dark); }
.passos-grid {
  max-width: 1100px; margin: 0 auto; list-style: none; padding: 0;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
}
.passo-item {
  background: #111; border: 1px solid rgba(255,255,255,.08);
  border-radius: 13px; padding: 22px 18px;
}
.passo-n {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(197,160,89,.14); border: 1px solid rgba(197,160,89,.45);
  color: var(--orange); font-weight: 800; font-size: 15px; margin-bottom: 13px;
}
.passo-item h3 { color: var(--white); font-size: 16px; margin: 0 0 6px; }
.passo-item p { color: #a8a8a8; font-size: 13.5px; line-height: 1.55; margin: 0; }

/* ── FAQ ─────────────────────────────────────── */
.faq-secao { padding: 80px 5%; background: var(--black); }
.faq-lista { max-width: 820px; margin: 0 auto; }
.faq-item {
  border: 1px solid rgba(255,255,255,.09); border-radius: 11px;
  background: #101010; margin-bottom: 10px; overflow: hidden;
}
.faq-item summary {
  cursor: pointer; list-style: none; padding: 16px 18px;
  color: var(--white); font-size: 15px; font-weight: 600;
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: '+'; color: var(--orange); font-size: 20px; line-height: 1; flex-shrink: 0; }
.faq-item[open] summary::after { content: '−'; }
.faq-item summary:focus-visible { outline: 2px solid var(--orange); outline-offset: -2px; }
.faq-item p { margin: 0; padding: 0 18px 18px; color: #a8a8a8; font-size: 14px; line-height: 1.65; }

@media (max-width: 980px) { .passos-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) {
  .modelos-secao, .passos-secao, .faq-secao { padding: 55px 4%; }
}
```

- [ ] **Passo 5: Verificar**

```bash
cd frontend && npm run lint && npm run build
```

Esperado: sem erro.

- [ ] **Passo 6: Commit**

```bash
git add frontend/src/pages/CasaInteligente/
git commit -m "feat(casa-inteligente): secoes de modelos, como funciona e FAQ"
```

---

## Task 9: Montar a página + navbar e rodapé

Junta tudo. É aqui que a página muda de verdade — e a tarefa de maior risco, porque mexe nas âncoras e no botão flutuante.

**Files:**
- Modify: `frontend/src/pages/CasaInteligente/CasaInteligente.jsx` (reescrita da composição)

**Interfaces:**
- Consumes: todos os componentes das tarefas 6 a 8; `Navbar` de `../../components/Navbar`; `Footer` de `../../components/Footer`.
- Produces: a rota `/casa-inteligente` completa.

**Atenção — não mova a rota para dentro do `V1Layout` em `App.jsx`.** O layout renderiza o próprio `<WhatsAppButton />` flutuante; a página já tem o seu, com a mensagem da campanha. Dois botões se sobrepõem e o da campanha é o que dispara o funil certo. Navbar e Footer entram **dentro** da página.

- [ ] **Passo 1: Registrar o estado atual das âncoras**

```bash
cd frontend && npm run build && npm run preview -- --port 4173 &
sleep 4 && node tools/valida-ctas.mjs http://localhost:4173
```

Esperado: `RESULTADO: OK`. **Guarde essa saída** — é a linha de base que a tarefa não pode piorar.

- [ ] **Passo 2: Reescrever a composição**

Em `CasaInteligente.jsx`: mantenha `useEffect` de SEO/`iniciarAds`, o hero, o banner de certificação, o guia de tabs, a instalação avulsa, a chamada de automação e a oferta final. Troque a vitrine de modelos antiga pelos componentes novos e adicione Navbar/Footer.

Imports no topo:

```jsx
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SeloGoogle from './SeloGoogle';
import VitrinePlanos from './VitrinePlanos';
import VitrineModelos from './VitrineModelos';
import ComoFunciona from './ComoFunciona';
import FaqPagamento from './FaqPagamento';
```

Estrutura do `return`:

```jsx
return (
  <div className="campanha-container">
    <Navbar />

    <section className="campanha-hero">
      {/* hero existente — o bloco .hero-text recebe os dois acréscimos do Passo 2b */}
    </section>

    <VitrinePlanos />      {/* id="instalacao" */}
    <VitrineModelos />     {/* id="modelos"    */}

    {/* bento grid de benefícios — emojis trocados conforme o mapa do Passo 2c */}

    <ComoFunciona />

    <section className="prova-secao">
      <h2 className="campanha-section-title">Quem já instalou com a gente</h2>
      <SeloGoogle />
      <p className="prova-nota">
        Nota máxima em {GOOGLE.avaliacoes} avaliações de clientes reais em São Paulo.
      </p>
    </section>

    <FaqPagamento />

    {/* guia de tabs existente, inalterado */}
    {/* chamada para automação existente, inalterada */}
    {/* oferta final "Projeto Porta Pronta" — manter id="combo" */}

    <Footer />
    <WhatsAppButton message={MSG_FECHADURA_COMBO} />
  </div>
);
```

A seção de prova social precisa de `import { GOOGLE } from './dados';` e deste CSS ao fim de `CasaInteligente.css`:

```css
/* ── Prova social ────────────────────────────── */
.prova-secao { padding: 70px 5%; background: var(--dark); text-align: center; }
.prova-secao .selo-google { margin: 18px auto 0; }
.prova-nota { color: #a8a8a8; font-size: 14px; margin: 14px auto 0; max-width: 520px; }
```

Remova: a constante `VALOR_INSTALACAO_A_PARTIR` e seu bloco condicional (o preço agora é fixo no hero), o array `MODELOS` local (veio para `dados.js`), a `<footer className="campanha-footer">` antiga e todos os emojis.

- [ ] **Passo 2b: Acréscimos no hero**

Dentro de `.hero-text`, logo após o `<motion.p>` de apoio e antes do botão, insira:

```jsx
<motion.div variants={fadeUp} className="hero-prova">
  <SeloGoogle compacto />
</motion.div>

<motion.p variants={fadeUp} className="campanha-faixa-preco">
  Instalação a partir de <strong>R$ 200</strong> · em até 12x no cartão
</motion.p>
```

E o CSS correspondente:

```css
.hero-prova { margin: 20px 0 14px; }
.campanha-faixa-preco { color: #c0c0c0; font-size: 1.05rem; margin-bottom: 22px; }
.campanha-faixa-preco strong { color: var(--orange); font-size: 1.35rem; font-weight: 800; }
```

- [ ] **Passo 2c: Mapa de substituição dos emojis**

Troque cada emoji pelo componente de `./icones`. Nenhum pode sobrar.

| Onde | Emoji atual | Componente |
|------|-------------|-----------|
| Bento — acesso biométrico | 👆 | `<IcoDigital />` |
| Bento — app e senhas | 📱 | `<IcoApp />` |
| Bento — segurança máxima | 🛡️ | `<IcoEscudo />` |
| Guia, aba "Tipos de Porta" — pivotante | 🚪 | `<IcoPorta />` |
| Guia, aba "Tipos de Porta" — apartamento | 🏢 | `<IcoPredio />` |
| Guia, aba "Tipos de Porta" — vidro | 🧊 | `<IcoVidro />` |
| Guia, aba "Tipos de Porta" — correr | 🏠 | `<IcoPorta />` |
| Guia, aba "Funções" — gestão pelo app | 📱 | `<IcoApp />` |
| Guia, aba "Funções" — senhas temporárias | 🔑 | `<IcoDigital />` |
| Guia, aba "Funções" — cenas de automação | 🏠 | `<IcoApp />` |
| Guia, aba "Funções" — anti-arrombamento | 🛡️ | `<IcoEscudo />` |
| Guia, aba "Aplicações" — residências | 🏠 | `<IcoPorta />` |
| Guia, aba "Aplicações" — escritórios | 🏢 | `<IcoPredio />` |
| Guia, aba "Aplicações" — Airbnb | 🧳 | `<IcoPredio />` |
| Instalação avulsa — itens da lista | ✓ (`.check-icon`) | `<IcoCheck />` |
| Oferta final — bônus | 🎁 | `<IcoPresente />` |

Importe todos de uma vez:

```jsx
import {
  IcoDigital, IcoApp, IcoEscudo, IcoPorta,
  IcoPredio, IcoVidro, IcoCheck, IcoPresente,
} from './icones';
```

E dê a eles a cor do acento:

```css
.bento-icon, .guia-list li > svg, .check-icon { color: var(--orange); }
.bento-icon { font-size: 30px; }
.guia-list li > svg { font-size: 17px; vertical-align: -3px; margin-right: 7px; }
```

- [ ] **Passo 3: Portão — CTAs e âncoras**

```bash
cd frontend && npm run build && npm run preview -- --port 4173 &
sleep 4 && node tools/valida-ctas.mjs http://localhost:4173
```

Esperado: `RESULTADO: OK`, com as três âncoras `OK ancora #modelos`, `#instalacao`, `#combo`, e cada CTA de plano reconhecido como `fechadura/instalacao`.

Se o balão flutuante aparecer como `INFO ... herdado`, é o efeito colateral previsto — a Task 10 conserta.

- [ ] **Passo 4: Verificação visual**

```bash
node tools/shot.mjs /casa-inteligente montada
```

Confira: navbar no topo, selo do Google e R$ 200 na primeira dobra, vitrine de planos, rodapé completo, zero emoji.

- [ ] **Passo 5: Commit**

```bash
git add frontend/src/pages/CasaInteligente/CasaInteligente.jsx
git commit -m "feat(casa-inteligente): monta a pagina nova com navbar e rodape

Vitrine principal passa a ser a regua de planos de instalacao; modelos
viram secao secundaria. Ancoras #modelos, #instalacao e #combo preservadas
para nao quebrar os sitelinks do Ads."
```

---

## Task 10: Devolver a cobertura do validador

Com `nav.msi-nav` e `footer.msi-footer` agora presentes na página, `valida-ctas.mjs` passa a classificar o balão da campanha como "herdado do layout" e para de validá-lo. É perda silenciosa de cobertura — exatamente o tipo de coisa que o arquivo já avisa que envelhece sozinha.

**Files:**
- Modify: `frontend/src/components/WhatsAppButton.jsx`
- Modify: `frontend/tools/valida-ctas.mjs`

**Interfaces:**
- Consumes: nada.
- Produces: o balão com `message` próprio passa a carregar `data-campanha="1"` e volta a ser validado.

- [ ] **Passo 1: Confirmar a perda de cobertura**

```bash
cd frontend && node tools/valida-ctas.mjs http://localhost:4173 | grep -A2 "Herdados"
```

Esperado: o balão flutuante da campanha aparecendo na lista de herdados.

- [ ] **Passo 2: Marcar o balão da campanha**

Na variante flutuante de `WhatsAppButton.jsx`, adicione o atributo no wrapper:

```jsx
return (
  <div className="msi-wa" data-campanha={message ? '1' : undefined}>
```

O balão do `V1Layout` é renderizado sem `message`, então continua sem a marca.

- [ ] **Passo 3: Ensinar o validador**

Em `valida-ctas.mjs`, dentro do `page.$$eval`, troque a condição de `herdado` por:

```js
      herdado:
        a.closest('nav.msi-nav, footer.msi-footer, .msi-drawer') !== null ||
        (layoutV1Ativo && a.closest('.msi-wa') !== null && a.closest('.msi-wa[data-campanha]') === null),
```

- [ ] **Passo 4: Verificar que voltou a ser validado**

```bash
cd frontend && npm run build && npm run preview -- --port 4173 &
sleep 4 && node tools/valida-ctas.mjs http://localhost:4173
```

Esperado: `RESULTADO: OK` e o balão da campanha agora na lista **"Próprios da página"**, reconhecido como `fechadura/combo`.

- [ ] **Passo 5: Commit**

```bash
git add frontend/src/components/WhatsAppButton.jsx frontend/tools/valida-ctas.mjs
git commit -m "fix(valida-ctas): balao da campanha volta a ser validado

Com navbar e rodape na landing, o validador passou a trata-lo como
herdado do layout e parou de conferir seu gatilho."
```

---

## Task 11: Paleta dourada e contraste

**Files:**
- Modify: `frontend/src/pages/CasaInteligente/CasaInteligente.css`

**Interfaces:**
- Consumes: `--orange`, `--white` de `src/index.css`.
- Produces: nenhuma cor verde fora do botão do WhatsApp.

- [ ] **Passo 1: Mapear o verde restante**

```bash
cd frontend && grep -n "4ade80\|00E676\|#22c55e" src/pages/CasaInteligente/CasaInteligente.css
```

Anote as linhas. Todas serão trocadas.

- [ ] **Passo 2: Substituir**

Troque cada ocorrência de `#4ade80` por `var(--orange)`, e cada `rgba(74, 222, 128, X)` por `rgba(197, 160, 89, X)`. Também em `CasaInteligente.jsx`, no estilo inline da seção de automação (`borderColor` e `color`).

Exceção: o verde do `WhatsAppButton.css` **não** se toca.

- [ ] **Passo 3: Corrigir contraste dos textos de apoio**

```css
.campanha-section-subtitle { color: #b4b4b4; font-size: 1.05rem; line-height: 1.65; }
.guia-list li { color: #c0c0c0; font-size: 14.5px; line-height: 1.7; }
```

- [ ] **Passo 4: Verificar que o verde sumiu**

```bash
grep -n "4ade80\|rgba(74, 222, 128" src/pages/CasaInteligente/CasaInteligente.css src/pages/CasaInteligente/CasaInteligente.jsx
```

Esperado: **nenhuma saída**.

```bash
npm run build && node tools/shot.mjs /casa-inteligente dourado
```

- [ ] **Passo 5: Commit**

```bash
git add frontend/src/pages/CasaInteligente/
git commit -m "style(casa-inteligente): paleta dourada da marca e contraste corrigido"
```

---

## Task 12: Mobile e fechamento

**Files:**
- Modify: `frontend/src/pages/CasaInteligente/CasaInteligente.css`
- Modify: `sitemap.xml` (raiz do repositório)

- [ ] **Passo 1: Medir a altura atual no mobile**

```bash
cd frontend && node -e "
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:4173/casa-inteligente',{waitUntil:'networkidle'});
console.log('altura:', await p.evaluate(()=>document.body.scrollHeight));await b.close();})()"
```

Linha de base antes do redesenho: **9219 px**. Meta do spec: **abaixo de 6500 px**.

- [ ] **Passo 2: Ajustar**

Reduzir padding vertical das seções em telas pequenas e transformar a vitrine de modelos em carrossel horizontal:

```css
@media (max-width: 520px) {
  .campanha-section, .campanha-guia-section { padding: 55px 4%; }
  .campanha-section-title { font-size: 1.7rem; }

  /* Modelos viram carrossel: 4 cards empilhados custavam ~4 telas de rolagem. */
  .modelos-grid {
    display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
    gap: 12px; padding-bottom: 10px; -webkit-overflow-scrolling: touch;
  }
  .modelos-grid .modelo-card { flex: 0 0 78%; scroll-snap-align: start; }
}
```

- [ ] **Passo 3: Medir de novo**

Repita o comando do Passo 1. Esperado: **abaixo de 6500**. Se ainda estiver acima, reduza o `min-height` de `.plano-resumo` e o padding das seções restantes.

- [ ] **Passo 4: Atualizar o sitemap**

Em `sitemap.xml` (raiz), acrescente antes de `</urlset>`:

```xml
  <url>
    <loc>https://msiforce.com.br/casa-inteligente</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://msiforce.com.br/automacao</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

- [ ] **Passo 5: Verificação final completa**

```bash
cd frontend
npm run lint
npm run build
npm run preview -- --port 4173 &
sleep 4
node tools/valida-ctas.mjs http://localhost:4173
node tools/shot.mjs /casa-inteligente final
```

Verificação objetiva de que nenhum emoji sobrou:

```bash
grep -nP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{2B00}-\x{2BFF}]" src/pages/CasaInteligente/*.jsx src/pages/CasaInteligente/dados.js
```

Esperado: **nenhuma saída**.

Checklist do spec — confirme cada item com a saída na mão:
- [ ] `npm run lint` sem erros
- [ ] `npm run build` limpo
- [ ] `valida-ctas.mjs` → `RESULTADO: OK`
- [ ] Âncoras `#modelos`, `#instalacao`, `#combo` presentes
- [ ] Altura em 390 px abaixo de 6500 px
- [ ] Nenhum emoji como ícone de interface
- [ ] Zero erro de console (o validador reporta ao fim)
- [ ] `fechadura_completa.webp` existe na raiz do repositório

- [ ] **Passo 6: Commit**

```bash
git add frontend/src/pages/CasaInteligente/CasaInteligente.css sitemap.xml
git commit -m "feat(casa-inteligente): ajustes de mobile e sitemap atualizado"
```

---

## Pendências que dependem do cliente

Não bloqueiam a implementação. A página funciona sem elas.

1. **URL do perfil do Google.** `GOOGLE.url` está `null` e o selo renderiza como texto. Preenchendo a URL em `dados.js`, ele vira link — sem mudar mais nada.
2. **Deploy.** Todos os commits são locais. Publicar exige pedido explícito do usuário.
3. **Reapontar o anúncio** não é necessário: a URL não mudou.
