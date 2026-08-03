# Fechaduras e Controle de Acesso na página /automacao — design

**Data:** 2026-08-03
**Repos:** `site-msiforce` (frontend) + `whatsapp-bot-eletrica` (bot)
**Spec relacionada:** `2026-08-03-campanha-fechadura-digital-design.md` (Fase 1 — landing dedicada)

## Contexto

A campanha de fechadura digital nasceu com landing própria (`/fechadura-digital-sp`, no ar desde
o commit `b323c4e`). Depois disso o usuário configurou **também** um destino de Google Ads
apontando para a `/automacao`, página que já existia com posicionamento *Smart Home Premium*.

A `/automacao` não foi construída para tráfego pago: os três CTAs de WhatsApp apontam para
`wa.me/5511910773865` **sem `?text=`**, então o lead cai no menu genérico do bot em vez de um
funil — a mesma falha que a landing tinha antes da correção. E a página não chama `iniciarAds()`,
ou seja, nenhuma conversão seria registrada mesmo com o `AW-` preenchido.

## Objetivo

Fazer a `/automacao` funcionar como destino pago **sem descaracterizá-la**: ela mantém o tom
premium e continua vendendo o projeto completo, mas passa a converter para a fechadura digital,
que é o produto de entrada. Em paralelo, o bot ganha caminhos para acesso corporativo e para
automação, e passa a destacar fechaduras nos menus e na IA.

## Decisões tomadas

| Questão | Decisão |
|---|---|
| Papel da `/automacao` | Segunda porta de entrada do **mesmo** funil da fechadura |
| Destino do Ads | **As duas páginas** recebem tráfego, em grupos de anúncio distintos |
| Controle de acesso | Dois caminhos, **um funil só**: residencial usa o funil pronto; corporativo vai direto ao especialista |
| Formato na página | **Expandir** a seção "Segurança Invisível" que já existe — sem seção nova, sem vitrine de modelos |
| CTAs existentes | Entram no escopo, com **gatilho de automação novo** no bot |
| Menus | Menus do **bot** e navegação do **site** |

## Arquitetura

### Frontend (`site-msiforce/frontend`)

#### `src/lib/gatilhos.js` (novo)

Fonte única das frases que o bot reconhece. Hoje elas estão hardcoded em
`CampanhaFechadura.jsx`; com uma segunda página usando as mesmas frases, duas cópias
divergiriam em silêncio e o lead voltaria a cair no menu genérico.

```
MSG_FECHADURA_COMBO        // já existe na landing
MSG_FECHADURA_INSTALACAO   // já existe na landing
msgFechaduraModelo(modelo) // já existe na landing
MSG_FECHADURA_AUTOMACAO    // nova — CTA do hero da /automacao
MSG_ACESSO_CORPORATIVO     // nova
MSG_AUTOMACAO_PROJETO      // nova
```

`CampanhaFechadura.jsx` passa a importar daqui em vez de declarar as suas.

**Frases (o texto exato importa — é o contrato com o bot):**

| Constante | Texto |
|---|---|
| `MSG_FECHADURA_AUTOMACAO` | `Olá! Quero uma fechadura digital inteligente para minha casa.` |
| `MSG_ACESSO_CORPORATIVO` | `Olá! Preciso de controle de acesso para minha empresa ou condomínio.` |
| `MSG_AUTOMACAO_PROJETO` | `Olá! Vim pela página de Automação e quero um projeto para minha casa.` |

As três foram escolhidas para **não se conterem mutuamente** nem conterem os gatilhos já
existentes. Em especial, `MSG_FECHADURA_AUTOMACAO` evita de propósito a expressão
"vim pela página de automação", que dispararia o gatilho errado.

#### `src/pages/Automacao.jsx`

Cada CTA vai para o destino que corresponde à intenção de quem clica:

| CTA | Mensagem | Destino no bot |
|---|---|---|
| Hero (topo) | `MSG_FECHADURA_AUTOMACAO` | funil da fechadura |
| "Segurança Invisível" → casa | `MSG_FECHADURA_AUTOMACAO` | funil da fechadura |
| "Segurança Invisível" → empresa | `MSG_ACESSO_CORPORATIVO` | especialista, assunto marcado |
| Fim do quiz | `MSG_AUTOMACAO_PROJETO` | menu 5 (Automação) |
| CTA final | `MSG_AUTOMACAO_PROJETO` | menu 5 (Automação) |

Os dois CTAs que levam ao funil da fechadura usam a **mesma** frase, e não a da landing: o lead
está na página de automação, e mandar "vim pela página da Fechadura Digital" seria incoerente com
o que ele acabou de ver. A frase distinta também deixa a origem rastreável nos dois gatilhos.

Os `<a href>` crus dão lugar ao `WhatsAppButton`, que já dispara `registrarConversaoWhatsApp`.
A página passa a chamar `iniciarAds()` no `useEffect`, como a landing faz.

A seção "Segurança Invisível" mantém imagem, texto e ritmo; ganha os dois botões e um link
discreto "ver modelos e instalação →" para `/fechadura-digital-sp`.

O subtítulo do hero passa a citar fechadura digital. Não é cosmético: o Índice de Qualidade do
Google mede a correspondência entre a promessa do anúncio e a página, e ela decide quanto custa
o clique. Alteração de uma linha, sem tocar no visual.

#### `src/components/Navbar.jsx`

Item novo **"Fechaduras Digitais"** apontando para `/fechadura-digital-sp`, para quem chega
organicamente. Só isso — sem submenu e sem reorganizar os itens existentes.

### Bot (`whatsapp-bot-eletrica`)

#### `services/gatilhos-site.js` (novo)

Detecção por **frase inteira**, no padrão do `fechadura.js` (normalização sem acentos, nunca
palavra solta). Dois detectores, nenhum com funil próprio:

- `detectarGatilhoAcessoCorporativo(texto)`
- `detectarGatilhoAutomacao(texto)`

#### `services/fechadura.js`

Única alteração: acrescentar `'quero uma fechadura digital inteligente'` a `GATILHOS_COMBO`.
É entrada de catálogo, não mudança de lógica — o funil segue idêntico.

#### `index.js`

Interceptação nova logo **depois** do bloco da fechadura, antes do split de modo:

- **acesso corporativo** → `dispararLeadQuente` com serviço
  `Controle de Acesso — corporativo (via site)` e resposta avisando que o especialista assume.
  Sem roteiro de perguntas: porte, tipo de portaria e nº de acessos variam demais para um
  fluxo fixo, e uma pergunta errada aqui custa o lead.
- **automação** → abre o menu 5 (estado `menu: '5'`) em vez do menu principal.

#### `menus.js`

Fechaduras sobem para o topo do menu 5, com chamada de valor:

```
1️⃣ 🔐 Fechaduras Digitais e Biometria
2️⃣ Automação de iluminação e Persianas
3️⃣ Integração com assistentes de voz (Alexa)
4️⃣ Falar com Técnico responsável
```

A renumeração exige mudar **juntos**, sob pena de o bot descrever o item errado:
`SUBMENUS['5'].texto`, `DESCRICAO_SUBITENS['5']` e `DETALHES_SUBITENS['5']`.

**A opção 1 do menu 5 passa a abrir o funil da fechadura** (estado `coleta: 'fechadura_funcoes'`)
em vez de devolver texto estático seguido de orçamento genérico. É o que dá sentido a "destacar
fechaduras": reaproveita o funil já testado — recomendação de modelo, valor da instalação e
agendamento — para quem chega pelo menu e não por um CTA da web.

#### IA

`PROMPTS_IA['5']` (persona de Automação Residencial) passa a tratar a fechadura como porta de
entrada para a casa inteligente, no espírito da `PROMPTS_IA.fechadura` que já existe. Continuam
valendo as regras atuais, inclusive **nunca informar o preço da fechadura** — só o da instalação,
e apenas quando vier da `tabela_precos`.

## Testes

1. **Unitários dos detectores** — cada frase dispara o seu gatilho; palavras soltas
   ("acesso", "automação", "fechadura") **não** disparam nada; nenhuma das frases novas dispara
   o gatilho de outra.
2. **E2E de webhook** (padrão de `webhook-fechadura.test.js`) — cada gatilho chega ao destino
   certo; a opção 1 do menu 5 entra no funil da fechadura; fechadura e mídia indoor seguem
   intactos.
3. **Menu 5 renumerado** — a descrição e o detalhe de cada opção correspondem ao novo número.
4. **Validação cruzada site↔bot** — `frontend/tools/valida-ctas.mjs` estendido para varrer também
   a `/automacao`: todo CTA de WhatsApp da página precisa bater com algum detector do bot.

## Riscos

- **Estado no Redis durante o deploy.** Quem estiver parado no menu 5 no momento da publicação
  responde "1" e recebe outro assunto. Impacto pequeno e passageiro (o estado expira), mas real.
- **Relevância anúncio → página.** Enquanto o topo da `/automacao` não responder à promessa do
  anúncio, o clique fica mais caro. O ajuste do subtítulo mitiga; se o grupo de anúncios for
  agressivo em "fechadura", vale reavaliar o hero.
- **Duas páginas disputando a mesma verba.** Com dois destinos ativos, é preciso acompanhar qual
  converte melhor antes de concentrar o orçamento.

## Fora de escopo

- Funil corporativo de verdade (tipo de portaria, nº de acessos, catraca/facial/tag, visita técnica).
- Vitrine de modelos na `/automacao` — quem quer comparar vai para a landing.
- Mudanças na estrutura da campanha do Ads (grupos, lances, negativas).
- Prova social, FAQ e depoimentos — seguem pendentes desde a Fase 1, para depois de haver dados reais.
