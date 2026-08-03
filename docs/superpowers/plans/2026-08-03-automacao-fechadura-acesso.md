# Fechaduras e Controle de Acesso na /automacao — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer a página `/automacao` funcionar como destino de tráfego pago que converte para a fechadura digital, e dar ao bot caminhos próprios para acesso corporativo e automação.

**Architecture:** O site ganha um módulo único de frases-gatilho (`src/lib/gatilhos.js`) consumido pelas duas páginas; o bot ganha um módulo de detecção (`services/gatilhos-site.js`) no padrão do `fechadura.js`, interceptado no webhook logo após o bloco da fechadura. O funil da fechadura não é reescrito — é reaproveitado por dois novos pontos de entrada (CTA da `/automacao` e opção 1 do menu 5).

**Tech Stack:** Node + Express + Jest + supertest (bot) · React 19 + Vite 8 + Playwright (site)

## Global Constraints

- Idioma de todo texto visível ao usuário: **pt-BR**.
- Detecção de gatilho é sempre por **frase inteira normalizada**, nunca por palavra solta — a palavra "fechadura" sozinha pertence ao submenu 5 e não pode ser sequestrada.
- O bot **nunca informa o preço da fechadura**. Só o da instalação, e apenas quando vier da `tabela_precos`.
- Nenhum fluxo existente (fechadura, mídia indoor, menus 1–4) pode mudar de comportamento. A suíte inteira precisa continuar passando: **67 testes, 11 suítes** no repo do bot.
- Dois repos, dois gits. Commits nunca cruzam repos.
- **Ordem de publicação: o bot vai ao ar ANTES do site.** Se o site subir primeiro, os CTAs novos mandam frases que o bot ainda não reconhece e o lead cai no menu genérico — exatamente a falha que este trabalho corrige. Deploy só com pedido explícito do usuário.

## File Structure

**Bot (`whatsapp-bot-eletrica`)**

| Arquivo | Responsabilidade |
|---|---|
| `services/texto.js` *(criar)* | `normalizar()` — minúsculas + remoção de acentos. Fonte única, hoje duplicada. |
| `services/gatilhos-site.js` *(criar)* | Detectar acesso corporativo e automação. Sem funil, sem estado. |
| `services/fechadura.js` *(modificar)* | Passa a importar `normalizar`; ganha uma frase em `GATILHOS_COMBO`. |
| `index.js` *(modificar)* | Interceptação dos dois gatilhos novos; opção 1 do menu 5 abre o funil. |
| `menus.js` *(modificar)* | Menu 5 renumerado; `PROMPTS_IA['5']` reescrita. |
| `tests/backend/gatilhos-site.test.js` *(criar)* | Unitários dos detectores e da não-colisão. |
| `tests/backend/webhook-gatilhos-site.test.js` *(criar)* | E2E dos dois gatilhos e do menu 5. |

**Site (`site-msiforce/frontend`)**

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/gatilhos.js` *(criar)* | Fonte única das frases que o bot reconhece. |
| `src/pages/CampanhaFechadura.jsx` *(modificar)* | Importa as frases em vez de declarar. |
| `src/pages/Automacao.jsx` *(modificar)* | CTAs, `iniciarAds()`, seção de acesso, subtítulo do hero. |
| `src/components/Navbar.jsx` *(modificar)* | Item "Fechaduras Digitais" (desktop **e** mobile). |
| `tools/valida-ctas.mjs` *(modificar)* | Passa a varrer as duas páginas. |

---

### Task 1: Fonte única de normalização + gatilhos do site

**Files:**
- Create: `services/texto.js`
- Create: `services/gatilhos-site.js`
- Modify: `services/fechadura.js:39-52` (import + `GATILHOS_COMBO`)
- Test: `tests/backend/gatilhos-site.test.js`

**Interfaces:**
- Produces: `normalizar(texto: string) => string`; `detectarGatilhoAcessoCorporativo(texto: string) => boolean`; `detectarGatilhoAutomacao(texto: string) => boolean`
- Consumes: nada.

- [ ] **Step 1: Escreva o teste que falha**

Crie `tests/backend/gatilhos-site.test.js`:

```js
const { detectarGatilhoAcessoCorporativo, detectarGatilhoAutomacao } = require('../../services/gatilhos-site');
const { detectarGatilhoFechadura } = require('../../services/fechadura');

// Frases EXATAS de site-msiforce/frontend/src/lib/gatilhos.js
const MSG_FECHADURA_AUTOMACAO = 'Olá! Quero uma fechadura digital inteligente para minha casa.';
const MSG_ACESSO_CORPORATIVO = 'Olá! Preciso de controle de acesso para minha empresa ou condomínio.';
const MSG_AUTOMACAO_PROJETO = 'Olá! Vim pela página de Automação e quero um projeto para minha casa.';

describe('gatilhos do site — acesso corporativo', () => {
  test('reconhece a frase do CTA', () => {
    expect(detectarGatilhoAcessoCorporativo(MSG_ACESSO_CORPORATIVO)).toBe(true);
  });

  test('funciona sem acentos e em caixa alta', () => {
    expect(detectarGatilhoAcessoCorporativo('PRECISO DE CONTROLE DE ACESSO PARA MINHA EMPRESA OU CONDOMINIO')).toBe(true);
  });

  test('palavra solta não dispara', () => {
    expect(detectarGatilhoAcessoCorporativo('acesso')).toBe(false);
    expect(detectarGatilhoAcessoCorporativo('Vocês fazem controle de acesso?')).toBe(false);
  });
});

describe('gatilhos do site — automação', () => {
  test('reconhece a frase do CTA', () => {
    expect(detectarGatilhoAutomacao(MSG_AUTOMACAO_PROJETO)).toBe(true);
  });

  test('palavra solta não dispara', () => {
    expect(detectarGatilhoAutomacao('automação')).toBe(false);
    expect(detectarGatilhoAutomacao('quero automatizar minha casa')).toBe(false);
  });
});

describe('não-colisão entre gatilhos', () => {
  test('a frase de fechadura da /automacao abre o funil da fechadura, e só ele', () => {
    expect(detectarGatilhoFechadura(MSG_FECHADURA_AUTOMACAO).match).toBe(true);
    expect(detectarGatilhoFechadura(MSG_FECHADURA_AUTOMACAO).intencao).toBe('combo');
    expect(detectarGatilhoAutomacao(MSG_FECHADURA_AUTOMACAO)).toBe(false);
    expect(detectarGatilhoAcessoCorporativo(MSG_FECHADURA_AUTOMACAO)).toBe(false);
  });

  test('a frase de automação não abre fechadura nem acesso', () => {
    expect(detectarGatilhoFechadura(MSG_AUTOMACAO_PROJETO).match).toBe(false);
    expect(detectarGatilhoAcessoCorporativo(MSG_AUTOMACAO_PROJETO)).toBe(false);
  });

  test('a frase de acesso corporativo não abre fechadura nem automação', () => {
    expect(detectarGatilhoFechadura(MSG_ACESSO_CORPORATIVO).match).toBe(false);
    expect(detectarGatilhoAutomacao(MSG_ACESSO_CORPORATIVO)).toBe(false);
  });
});
```

- [ ] **Step 2: Rode o teste para confirmar que falha**

Run: `npx jest tests/backend/gatilhos-site.test.js --forceExit`
Expected: FAIL — `Cannot find module '../../services/gatilhos-site'`

- [ ] **Step 3: Crie `services/texto.js`**

```js
// ═══════════════════════════════════════════════════
// Normalização de texto para detecção de gatilhos.
// Fonte única: fechadura.js e gatilhos-site.js precisam normalizar
// exatamente igual, senão uma frase bate num detector e não no outro.
// ═══════════════════════════════════════════════════

/** minúsculas + remoção de acentos (NFD + faixa de combining marks) */
function normalizar(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

module.exports = { normalizar };
```

- [ ] **Step 4: Crie `services/gatilhos-site.js`**

```js
// ═══════════════════════════════════════════════════
// 🌐 Gatilhos simples vindos do site (sem funil próprio)
// Páginas: msiforce.com.br/automacao
// O funil da fechadura mora em services/fechadura.js — este módulo
// cuida só dos caminhos que terminam no consultor ou num menu.
// ═══════════════════════════════════════════════════
const { normalizar } = require('./texto');

// Frases inteiras dos CTAs. NUNCA palavra solta: "acesso" e "automação"
// aparecem no texto livre de qualquer conversa.
const GATILHOS_ACESSO_CORPORATIVO = [
  'controle de acesso para minha empresa ou condominio',
];

const GATILHOS_AUTOMACAO = [
  'vim pela pagina de automacao',
];

/** Lead corporativo de controle de acesso → especialista, sem roteiro. */
function detectarGatilhoAcessoCorporativo(texto) {
  const t = normalizar(texto);
  return GATILHOS_ACESSO_CORPORATIVO.some((g) => t.includes(g));
}

/** Lead de projeto de automação → menu 5. */
function detectarGatilhoAutomacao(texto) {
  const t = normalizar(texto);
  return GATILHOS_AUTOMACAO.some((g) => t.includes(g));
}

module.exports = { detectarGatilhoAcessoCorporativo, detectarGatilhoAutomacao };
```

- [ ] **Step 5: Ajuste `services/fechadura.js`**

Adicione o import no topo, logo abaixo do cabeçalho de comentário:

```js
const { normalizar } = require('./texto');
```

Remova a função `normalizar` local (as ~6 linhas que começam em `function normalizar(texto) {`) — a importada tem comportamento idêntico.

Em `GATILHOS_COMBO`, acrescente a terceira frase:

```js
const GATILHOS_COMBO = [
  'vim pela pagina da fechadura digital',
  'orcamento do pacote completo: fechadura',
  'quero uma fechadura digital inteligente', // CTA do hero da /automacao
];
```

- [ ] **Step 6: Rode os testes novos e os que já existiam**

Run: `npx jest tests/backend/gatilhos-site.test.js tests/backend/fechadura.test.js tests/backend/webhook-fechadura.test.js --forceExit`
Expected: PASS em todos. Os 25 testes de fechadura são a rede de segurança da troca do `normalizar`.

- [ ] **Step 7: Commit**

```bash
git add services/texto.js services/gatilhos-site.js services/fechadura.js tests/backend/gatilhos-site.test.js
git commit -m "feat(bot): gatilhos de acesso corporativo e automacao vindos do site"
```

---

### Task 2: Interceptação dos gatilhos no webhook

**Files:**
- Modify: `index.js:28` (imports), `index.js:598` (logo após o bloco `if (gatilhoFechadura.match) {...}`)
- Test: `tests/backend/webhook-gatilhos-site.test.js`

**Interfaces:**
- Consumes: `detectarGatilhoAcessoCorporativo`, `detectarGatilhoAutomacao` (Task 1)
- Produces: nada para tarefas seguintes.

- [ ] **Step 1: Escreva o teste que falha**

Crie `tests/backend/webhook-gatilhos-site.test.js`. Copie o bloco de mocks de `tests/backend/webhook-fechadura.test.js` (linhas 1–53) sem alterações e acrescente:

```js
const MSG_ACESSO_CORPORATIVO = 'Olá! Preciso de controle de acesso para minha empresa ou condomínio.';
const MSG_AUTOMACAO_PROJETO = 'Olá! Vim pela página de Automação e quero um projeto para minha casa.';

function payload(text) {
  return {
    event: 'messages.upsert',
    instance: 'api',
    data: {
      key: { remoteJid: '5511977776666@s.whatsapp.net', fromMe: false, id: 'ID' + Math.random() },
      pushName: 'Ana Souza',
      message: { conversation: text },
    },
  };
}

async function conversa(text) {
  enviar.mockClear();
  const res = await request(app).post('/webhook').send(payload(text));
  expect(res.status).toBe(200);
  return enviar.mock.calls.map((c) => c[1]).join('\n---\n');
}

describe('Webhook — gatilhos do site', () => {
  beforeEach(() => {
    for (const k in estados) delete estados[k];
    jest.clearAllMocks();
  });

  test('acesso corporativo entrega ao especialista e registra o lead', async () => {
    const r = await conversa(MSG_ACESSO_CORPORATIVO);
    expect(r).toMatch(/especialista/i);
    expect(r).toMatch(/Ana/);
    expect(dispararLeadQuente).toHaveBeenCalledWith(
      '5511977776666@s.whatsapp.net',
      'Controle de Acesso — corporativo (via site)',
      expect.objectContaining({ nome: 'Ana Souza' }),
      'api'
    );
  });

  test('acesso corporativo não abre o funil da fechadura', async () => {
    await conversa(MSG_ACESSO_CORPORATIVO);
    expect(estados['5511977776666@s.whatsapp.net'].coleta).toBeNull();
  });

  test('gatilho de automação abre o menu 5, não o menu principal', async () => {
    const r = await conversa(MSG_AUTOMACAO_PROJETO);
    expect(r).toMatch(/Automação Residencial/i);
    expect(r).toMatch(/Fechaduras Digitais/i);
    expect(r).not.toMatch(/Plataforma CRM/i);
    expect(estados['5511977776666@s.whatsapp.net'].menu).toBe('5');
  });
});
```

- [ ] **Step 2: Rode o teste para confirmar que falha**

Run: `npx jest tests/backend/webhook-gatilhos-site.test.js --forceExit`
Expected: FAIL — o texto devolvido é o menu principal, e `dispararLeadQuente` não foi chamado.

- [ ] **Step 3: Importe os detectores no `index.js`**

Na linha 28, ao lado do import de `fechadura`:

```js
const { detectarGatilhoAcessoCorporativo, detectarGatilhoAutomacao } = require('./services/gatilhos-site');
```

- [ ] **Step 4: Adicione a interceptação**

Logo **depois** do fechamento do bloco `if (gatilhoFechadura.match) { ... }` (index.js:598) e **antes** do bloco `// 3) Dentro do contexto fechadura`:

```js
    // ════════════════════════════════════════════════════════
    // 🌐 Outros gatilhos do site (sem funil próprio)
    // Vem DEPOIS da fechadura: quem pede fechadura tem funil e ele vence.
    // ════════════════════════════════════════════════════════
    if (detectarGatilhoAcessoCorporativo(texto)) {
      await setEstado(jid, { menu: null, submenu: null, coleta: null, dados: {} });
      await _dispararLeadQuente(jid, 'Controle de Acesso — corporativo (via site)', {
        tipo: 'Comercial',
        nome: pushName,
      });
      await _enviar(
        jid,
        `🏢 *Controle de Acesso Corporativo*\n\nBoa, *${_nomeLead}*! Para empresa e condomínio o projeto varia bastante (portaria, nº de acessos, catraca, facial ou tag), então prefiro não chutar.\n\nJá acionei nosso especialista — ele te chama aqui em instantes para entender o cenário e montar a proposta certa.`
      );
      return res.status(200).json({ ok: true });
    }

    if (detectarGatilhoAutomacao(texto)) {
      await setEstado(jid, { menu: '5', submenu: null, coleta: null, dados: {} });
      await _enviar(jid, `${SUBMENUS['5'].titulo}\n\n${SUBMENUS['5'].texto}`);
      return res.status(200).json({ ok: true });
    }
```

- [ ] **Step 5: Rode o teste para confirmar que passa**

Run: `npx jest tests/backend/webhook-gatilhos-site.test.js --forceExit`
Expected: PASS (3 testes). O terceiro checa `/Fechaduras Digitais/i`, que o menu 5 já contém hoje na segunda posição — ele continua passando depois da renumeração da Task 3.

- [ ] **Step 6: Rode a suíte inteira**

Run: `npx jest tests/backend --forceExit`
Expected: PASS — nenhum fluxo existente afetado.

- [ ] **Step 7: Commit**

```bash
git add index.js tests/backend/webhook-gatilhos-site.test.js
git commit -m "feat(bot): intercepta gatilhos de acesso corporativo e automacao"
```

---

### Task 3: Menu 5 com fechaduras no topo, abrindo o funil

**Files:**
- Modify: `menus.js:75-82` (`SUBMENUS['5'].texto`), `menus.js:106-110` (`DESCRICAO_SUBITENS['5']`), `menus.js:256-260` (`DETALHES_SUBITENS['5']`)
- Modify: `index.js:894` (antes de `const detalhe = DETALHES_SUBITENS[menuAtual]?.[opcao]`)
- Test: `tests/backend/webhook-gatilhos-site.test.js` (acrescentar bloco)

**Interfaces:**
- Consumes: o funil da fechadura já existente (estado `coleta: 'fechadura_funcoes'`).
- Produces: nada.

- [ ] **Step 1: Escreva o teste que falha**

Acrescente ao final de `tests/backend/webhook-gatilhos-site.test.js`, dentro do `describe`:

```js
  test('menu 5 lista fechaduras como opção 1', async () => {
    const r = await conversa(MSG_AUTOMACAO_PROJETO);
    expect(r).toMatch(/1️⃣ 🔐 Fechaduras Digitais e Biometria/);
  });

  test('opção 1 do menu 5 abre o funil da fechadura, não texto estático', async () => {
    await conversa(MSG_AUTOMACAO_PROJETO);
    const r = await conversa('1');
    expect(r).toMatch(/abrir a porta/i);          // pergunta de funções do funil
    expect(r).not.toMatch(/Solicitar Orçamento/i); // não é o card estático
    expect(estados['5511977776666@s.whatsapp.net'].coleta).toBe('fechadura_funcoes');
  });

  test('opção 2 do menu 5 continua respondendo iluminação', async () => {
    await conversa(MSG_AUTOMACAO_PROJETO);
    const r = await conversa('2');
    expect(r).toMatch(/Iluminação e Persianas/i);
  });
```

- [ ] **Step 2: Rode para confirmar que falha**

Run: `npx jest tests/backend/webhook-gatilhos-site.test.js --forceExit`
Expected: FAIL — o menu ainda lista iluminação em 1º e a opção 1 devolve o card estático.

- [ ] **Step 3: Renumere o menu em `menus.js`**

`SUBMENUS['5'].texto` passa a ser:

```js
    texto: `1️⃣ 🔐 Fechaduras Digitais e Biometria
2️⃣ Automação de iluminação e Persianas
3️⃣ Integração com assistentes de voz (Alexa)
4️⃣ Falar com Técnico responsável
0️⃣ Voltar ao menu principal`,
```

`DESCRICAO_SUBITENS['5']`:

```js
  '5': {
    '1': 'Fechaduras',
    '2': 'Iluminação',
    '3': 'Comando de Voz',
  },
```

`DETALHES_SUBITENS['5']` — os três textos trocam de número junto, senão o bot descreve o item errado:

```js
  '5': {
    '1': `🔒 *Fechaduras Digitais*\nSistemas keyless com integração mobile e biometria, proporcionando conveniência e alta segurança.`,
    '2': `💡 *Iluminação e Persianas*\nCriação de cenários automatizados e integração com sensores de luminosidade.`,
    '3': `🗣️ *Assistentes de Voz*\nControle de ambientes via Alexa ou Google Assistant, ideal para salas de diretoria e residências de luxo.`,
  },
```

- [ ] **Step 4: Ligue a opção 1 ao funil no `index.js`**

Imediatamente antes de `const detalhe = DETALHES_SUBITENS[menuAtual]?.[opcao];` (index.js:896), dentro do `if (subitensValidos.includes(opcao)) {`:

```js
        // Fechadura tem funil próprio (recomendação + agendamento).
        // Entregar o card estático aqui seria desperdiçar o fluxo que já existe.
        // P_FUNCOES é a const declarada em index.js:381, no mesmo escopo do handler.
        if (menuAtual === '5' && opcao === '1') {
          await setEstado(jid, { menu: 'fechadura', submenu: null, coleta: 'fechadura_funcoes', dados: { intencao: 'combo' } });
          await _enviar(jid, P_FUNCOES);
          return res.status(200).json({ ok: true });
        }
```

- [ ] **Step 5: Rode os testes**

Run: `npx jest tests/backend/webhook-gatilhos-site.test.js --forceExit`
Expected: PASS (6 testes).

- [ ] **Step 6: Rode a suíte inteira**

Run: `npx jest tests/backend --forceExit`
Expected: PASS. Se algum teste de menu quebrar, é porque dependia da numeração antiga — corrija o teste, não a numeração.

- [ ] **Step 7: Commit**

```bash
git add menus.js index.js tests/backend/webhook-gatilhos-site.test.js
git commit -m "feat(bot): fechaduras no topo do menu 5, abrindo o funil"
```

---

### Task 4: Persona da IA de automação

**Files:**
- Modify: `menus.js:212-218` (`PROMPTS_IA['5']`)
- Test: `tests/backend/ia-automacao.test.js`

**Interfaces:**
- Consumes: `PROMPTS_IA` de `menus.js`.
- Produces: nada.

- [ ] **Step 1: Escreva o teste que falha**

Crie `tests/backend/ia-automacao.test.js` (padrão de `tests/backend/ia-midia.test.js`):

```js
const { PROMPTS_IA } = require('../../menus');

describe('persona da IA — Automação Residencial (menu 5)', () => {
  const p = PROMPTS_IA['5'];

  test('trata a fechadura como porta de entrada', () => {
    expect(p).toMatch(/fechadura/i);
    expect(p).toMatch(/porta de entrada|primeiro passo/i);
  });

  test('mantém a regra de nunca dar preço sem visita técnica', () => {
    expect(p).toMatch(/Visita Técnica/i);
  });

  test('preserva a regra do quiz', () => {
    expect(p).toMatch(/Novo lead do Quiz/);
  });
});
```

- [ ] **Step 2: Rode para confirmar que falha**

Run: `npx jest tests/backend/ia-automacao.test.js --forceExit`
Expected: FAIL no primeiro teste — o prompt cita "fechaduras biométricas" mas não as posiciona como porta de entrada.

- [ ] **Step 3: Reescreva `PROMPTS_IA['5']`**

```js
  '5': `Você é o Arquiteto Especialista em Smart Homes de Luxo da MSIFORCE.
Atenda clientes buscando transformar suas casas com automação premium. Fale sobre fechaduras biométricas, controle total de iluminação e cortinas por voz (Alexa), e segurança inteligente. Enfatize que fazemos projetos personalizados de alto padrão.
FECHADURA DIGITAL: é o primeiro passo, a porta de entrada da casa inteligente — o serviço mais rápido de instalar e o que já entrega conforto no mesmo dia. Se a pessoa demonstrar interesse em fechadura, biometria ou acesso, ofereça o roteiro de fechadura (peça para responder "1" no menu de Automação) em vez de discutir o projeto completo. NUNCA informe o preço da fechadura: só o valor da instalação, e apenas se ele estiver cadastrado.
REGRA DO QUIZ: Se a mensagem do cliente começar com "Novo lead do Quiz", agradeça as respostas, chame-o pelo nome e confirme que você avaliou o tamanho do imóvel e o foco desejado. Em seguida, explique que, por ser um projeto de alto padrão, NUNCA enviamos estimativas de preço sem realizar uma Visita Técnica Presencial para avaliar a infraestrutura (forro, elétrica, redes). O seu ÚNICO objetivo com esse cliente é agendar a Visita Técnica.
Lembre-se de seguir as regras de qualificação de segurança (nome, cidade, dono do imóvel) antes de agendar a visita técnica.
${REGRAS_BASE}`,
```

- [ ] **Step 4: Rode os testes**

Run: `npx jest tests/backend/ia-automacao.test.js --forceExit`
Expected: PASS (3 testes).

- [ ] **Step 5: Rode a suíte inteira e commite**

Run: `npx jest tests/backend --forceExit`
Expected: PASS.

```bash
git add menus.js tests/backend/ia-automacao.test.js
git commit -m "feat(bot): persona de automacao trata fechadura como porta de entrada"
```

---

### Task 5: Fonte única das frases-gatilho no site

**Files:**
- Create: `src/lib/gatilhos.js`
- Modify: `src/pages/CampanhaFechadura.jsx:10-16`

**Interfaces:**
- Produces: `MSG_FECHADURA_COMBO`, `MSG_FECHADURA_INSTALACAO`, `msgFechaduraModelo(modelo)`, `MSG_FECHADURA_AUTOMACAO`, `MSG_ACESSO_CORPORATIVO`, `MSG_AUTOMACAO_PROJETO` — todas `string` (a terceira, `(string) => string`).
- Consumes: nada.

> A partir daqui os comandos rodam em `site-msiforce/frontend`.

- [ ] **Step 1: Crie `src/lib/gatilhos.js`**

```js
// ═══════════════════════════════════════════════════
// Frases que o BOT reconhece. Fonte única.
//
// Mudar a redação aqui exige mudar os gatilhos no repo do bot:
//   whatsapp-bot-eletrica/services/fechadura.js     (funil da fechadura)
//   whatsapp-bot-eletrica/services/gatilhos-site.js (acesso e automação)
// Se divergirem, o lead cai no menu genérico em vez do funil — e ninguém
// percebe. `npm run build && node tools/valida-ctas.mjs` checa isso.
// ═══════════════════════════════════════════════════

export const MSG_FECHADURA_COMBO = 'Olá! Vim pela página da Fechadura Digital. Quero mais informações!';

export const MSG_FECHADURA_INSTALACAO =
  'Olá! Eu já tenho uma fechadura digital e gostaria de contratar APENAS o serviço de instalação profissional da MsiForce.';

export const msgFechaduraModelo = (modelo) =>
  `Olá! Gostaria de um orçamento do pacote completo: Fechadura ${modelo} + Instalação MsiForce.`;

// Usada na /automacao: quem clica está na página de automação, então dizer
// "vim pela página da Fechadura Digital" seria incoerente com o que ele viu.
export const MSG_FECHADURA_AUTOMACAO = 'Olá! Quero uma fechadura digital inteligente para minha casa.';

export const MSG_ACESSO_CORPORATIVO = 'Olá! Preciso de controle de acesso para minha empresa ou condomínio.';

export const MSG_AUTOMACAO_PROJETO = 'Olá! Vim pela página de Automação e quero um projeto para minha casa.';
```

- [ ] **Step 2: Faça a landing importar em vez de declarar**

Em `src/pages/CampanhaFechadura.jsx`, remova as declarações locais `MSG_GERAL`, `MSG_INSTALACAO` e `msgCombo` (linhas 10–16) e acrescente aos imports do topo:

```js
import {
  MSG_FECHADURA_COMBO,
  MSG_FECHADURA_INSTALACAO,
  msgFechaduraModelo,
} from '../lib/gatilhos';
```

Depois troque os três usos no JSX: `MSG_GERAL` → `MSG_FECHADURA_COMBO`, `MSG_INSTALACAO` → `MSG_FECHADURA_INSTALACAO`, `msgCombo(` → `msgFechaduraModelo(`.

- [ ] **Step 3: Verifique que a landing não regrediu**

```bash
npm run build
npm run preview -- --port 4173 &
node tools/valida-ctas.mjs
```

Expected: `RESULTADO: OK` — 8 CTAs, 3 âncoras, 0 erros de console. Se algum CTA falhar, a frase divergiu do bot.

- [ ] **Step 4: Commit**

```bash
git add src/lib/gatilhos.js src/pages/CampanhaFechadura.jsx
git commit -m "refactor(site): frases-gatilho em fonte unica"
```

---

### Task 6: CTAs, conversão e seção de acesso na /automacao

**Files:**
- Modify: `src/pages/Automacao.jsx` — imports (1–3), hero (53–58), seção "Segurança Invisível" (89–102), quiz (269–271), CTA final (283–285)

**Interfaces:**
- Consumes: `src/lib/gatilhos.js` (Task 5), `WhatsAppButton`, `iniciarAds` de `src/lib/ads`.
- Produces: nada.

- [ ] **Step 1: Ajuste os imports e ligue o rastreio de conversão**

No topo do arquivo:

```js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './automacao.css';
import WhatsAppButton from '../components/WhatsAppButton';
import { iniciarAds } from '../lib/ads';
import {
  MSG_FECHADURA_AUTOMACAO,
  MSG_ACESSO_CORPORATIVO,
  MSG_AUTOMACAO_PROJETO,
} from '../lib/gatilhos';
```

Logo após as declarações de `useState` (linha 9), acrescente:

```js
  // Página recebe tráfego pago: sem isto nenhuma conversão é registrada.
  useEffect(() => { iniciarAds(); }, []);
```

- [ ] **Step 2: Hero — subtítulo e CTA**

Substitua o parágrafo e o link do hero (linhas 53–58) por:

```jsx
          <motion.p variants={fadeUp} className="hero-p">
            Transformamos ambientes de alto padrão em ecossistemas inteligentes. Comece pela porta: fechadura digital com biometria, e depois iluminação, clima, áudio e segurança com um único toque.
          </motion.p>
          <WhatsAppButton message={MSG_FECHADURA_AUTOMACAO} className="btn-primary">
            Quero minha Fechadura Digital
          </WhatsAppButton>
```

- [ ] **Step 3: Seção "Segurança Invisível" — dois caminhos**

Substitua o bloco `<motion.div variants={fadeUp} className="zz-content">` da seção de segurança (linhas 93–101) por:

```jsx
          <motion.div variants={fadeUp} className="zz-content">
            <h3>Segurança <span>Invisível</span></h3>
            <p>Sua digital é a sua chave. Fechaduras biométricas de design impecável que garantem segurança extrema sem comprometer a arquitetura da sua porta.</p>
            <ul className="benefit-list">
              <li>Acesso remoto para visitantes e funcionários</li>
              <li>Notificações em tempo real no celular</li>
              <li>Integração com câmeras e alarmes</li>
            </ul>
            <div className="zz-ctas">
              <WhatsAppButton message={MSG_FECHADURA_AUTOMACAO} className="btn-primary">
                Quero para minha casa
              </WhatsAppButton>
              <WhatsAppButton message={MSG_ACESSO_CORPORATIVO} className="btn-secondary">
                Empresa ou condomínio
              </WhatsAppButton>
            </div>
            <a href="/fechadura-digital-sp" className="zz-link">ver modelos e instalação →</a>
          </motion.div>
```

- [ ] **Step 4: Estilos dos elementos novos**

No fim de `src/pages/automacao.css`:

```css
.zz-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.zz-ctas .btn-secondary {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.zz-ctas .btn-secondary:hover {
  border-color: var(--gold);
  background: rgba(255, 255, 255, 0.05);
}

.zz-link {
  display: inline-block;
  margin-top: 16px;
  color: var(--gray);
  font-size: 0.9rem;
  text-decoration: underline;
}

.zz-link:hover { color: var(--white); }
```

- [ ] **Step 5: CTAs do quiz e final**

Linha ~269 (sucesso do quiz), troque o `<a href="https://wa.me/...">` por:

```jsx
                <WhatsAppButton message={MSG_AUTOMACAO_PROJETO} className="btn-primary" >
                  Falar no WhatsApp Agora
                </WhatsAppButton>
```

Linha ~283 (CTA final), troque por:

```jsx
          <WhatsAppButton message={MSG_AUTOMACAO_PROJETO} className="btn-primary">
            Iniciar Meu Projeto
          </WhatsAppButton>
```

- [ ] **Step 6: Verifique que nenhum link cru sobrou**

Run: `grep -n "wa.me" src/pages/Automacao.jsx`
Expected: nenhuma saída. Todo CTA passa pelo `WhatsAppButton`, que dispara a conversão.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Automacao.jsx src/pages/automacao.css
git commit -m "feat(site): /automacao converte para fechadura e registra conversao"
```

---

### Task 7: Navbar com caminho para fechaduras

**Files:**
- Modify: `src/components/Navbar.jsx:46` (desktop) e `:88` (mobile)

**Interfaces:**
- Consumes: `Link` do react-router-dom (já importado).
- Produces: nada.

- [ ] **Step 1: Acrescente o item no menu desktop**

Depois de `<li><Link to="/automacao">Automação</Link></li>` (linha 46):

```jsx
          <li><Link to="/fechadura-digital-sp">Fechaduras Digitais</Link></li>
```

- [ ] **Step 2: Acrescente o mesmo item no menu mobile**

Depois de `<li><Link to="/automacao" onClick={() => setMenuOpen(false)}>Automação</Link></li>` (linha 88):

```jsx
          <li><Link to="/fechadura-digital-sp" onClick={() => setMenuOpen(false)}>Fechaduras Digitais</Link></li>
```

O `onClick` não é opcional: sem ele o menu mobile fica aberto por cima da página de destino.

- [ ] **Step 3: Verifique nos dois menus**

Run: `grep -c "fechadura-digital-sp" src/components/Navbar.jsx`
Expected: `2`

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat(site): fechaduras digitais na navegacao"
```

---

### Task 8: Validação cruzada site↔bot nas duas páginas

**Files:**
- Modify: `tools/valida-ctas.mjs`

**Interfaces:**
- Consumes: `services/fechadura.js` e `services/gatilhos-site.js` do repo do bot (caminho relativo `../../../whatsapp-bot-eletrica`).
- Produces: script de verificação usado antes de qualquer publicação.

- [ ] **Step 1: Ensine o script a reconhecer os gatilhos novos**

Troque o bloco de import do detector por:

```js
const require_ = createRequire(import.meta.url);
const raiz = path.resolve(aqui, '../../../whatsapp-bot-eletrica/services');
const { detectarGatilhoFechadura } = require_(path.join(raiz, 'fechadura.js'));
const { detectarGatilhoAcessoCorporativo, detectarGatilhoAutomacao } = require_(path.join(raiz, 'gatilhos-site.js'));

/** Um CTA é válido se QUALQUER detector do bot o reconhece. */
function classificar(msg) {
  const f = detectarGatilhoFechadura(msg);
  if (f.match) return `fechadura/${f.intencao}${f.modelo ? ' ' + f.modelo : ''}`;
  if (detectarGatilhoAcessoCorporativo(msg)) return 'acesso-corporativo';
  if (detectarGatilhoAutomacao(msg)) return 'automacao';
  return null;
}
```

Na varredura dos links, troque `const g = detectarGatilhoFechadura(msg)` e `const okGatilho = g.match` por:

```js
  const destino = classificar(msg);
  const okGatilho = destino !== null;
```

e a linha de log do bot por:

```js
  console.log(`   bot:    ${destino || 'NENHUM DETECTOR RECONHECE'}`);
```

- [ ] **Step 2: Faça o script varrer as duas páginas**

Troque a constante de URL única pelo laço:

```js
const BASE = process.argv[2] || 'http://localhost:4173';
const PAGINAS = [
  { rota: '/fechadura-digital-sp', ancoras: ['modelos', 'instalacao', 'combo'] },
  { rota: '/automacao', ancoras: [] },
];
```

Envolva o corpo da varredura (goto → links → âncoras → screenshot) num `for (const { rota, ancoras } of PAGINAS)`, usando `await page.goto(BASE + rota, ...)` e nomeando o screenshot por rota:

```js
  const nome = rota.replace(/\//g, '') || 'home';
  await page.screenshot({ path: path.join(aqui, `shots/${nome}.png`), fullPage: true });
```

- [ ] **Step 3: Rode a validação completa**

```bash
npm run build
npm run preview -- --port 4173 &
node tools/valida-ctas.mjs
```

Expected: `RESULTADO: OK`. A `/automacao` deve mostrar 5 CTAs — dois `fechadura/combo`, um `acesso-corporativo` e dois `automacao` — e a landing seguir com os 8 de sempre.

- [ ] **Step 4: Commit**

```bash
git add tools/valida-ctas.mjs
git commit -m "test(site): valida CTAs da /automacao contra os gatilhos do bot"
```

---

## Publicação (só com pedido explícito do usuário)

1. **Bot primeiro.** `./deploy-local.sh backend index.js menus.js services/texto.js services/gatilhos-site.js services/fechadura.js` — ver `RUNBOOKS/01`.
2. **Site depois.** `npm run build` no `frontend/`, copiar `dist/index.html` e os `dist/assets/*` novos para a raiz do repo, commitar e dar push (Cloudflare Pages publica).
3. Conferir em produção: `node tools/valida-ctas.mjs https://msiforce.com.br`.

Inverter a ordem faz os CTAs novos caírem no menu genérico durante a janela entre as duas publicações.

## Pendente de dados do usuário (fora deste plano)

- `ADS_CONVERSION_ID` e `ADS_CONVERSION_LABEL` em `src/lib/ads.js` — sem eles nenhuma das duas páginas registra conversão.
- `VALOR_INSTALACAO_A_PARTIR` em `CampanhaFechadura.jsx`.
- Cadastro na `tabela_precos`: `Instalação Fechadura Digital - Embutir` e `- Sobrepor`.
