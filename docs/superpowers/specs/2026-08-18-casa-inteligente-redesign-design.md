# Redesign da /casa-inteligente — landing de fechadura digital

**Data:** 2026-08-18
**Rota:** `/casa-inteligente` (SPA em `frontend/`, publicada via Cloudflare Pages)
**Arquivos-alvo:** `frontend/src/pages/CasaInteligente/CasaInteligente.jsx` + `.css`

---

## 1. Problema

A página recebe tráfego pago (Google Ads `AW-18144467371`, conversão ativa) e é a
principal porta de entrada de leads de fechadura digital. A análise da versão em
produção — desktop 1440 e mobile 390 — encontrou:

**Bug em produção.** `https://www.msiforce.com.br/fechadura_completa.png` responde
200 com 3.045 bytes: é o `index.html` servido como fallback do Cloudflare Pages. O
arquivo existe apenas em `frontend/public/` (108 KB) e nunca chegou à raiz publicada.
A primeira dobra está sem imagem para 100% dos visitantes.

**Barreiras de conversão.**
1. Nenhum preço, nem faixa (`VALOR_INSTALACAO_A_PARTIR = null`). É o maior ponto de
   abandono do público de menor renda.
2. Zero prova social: sem nota do Google, depoimento ou foto de obra.
3. Sem navbar e com rodapé só de copyright — a rota está fora do `V1Layout`. O
   visitante não tem logo, telefone, CNPJ nem qualquer sinal de que a empresa existe.
4. WhatsApp é a única saída; seis CTAs, todos idênticos.
5. Sem FAQ, garantia, prazo ou formas de pagamento.

**Problemas de design.**
6. Paleta verde neon `#4ade80` conflita com o dourado `--orange: #c5a059` do resto do
   site — a landing parece de outra empresa.
7. Monotonia: tudo é o mesmo `glass-panel` escuro sobre preto, sem hierarquia.
8. Emojis (👆📱🛡️🚪🧊🎁) no lugar de ícones — renderizam diferente por SO e derrubam
   a sensação premium.
9. Cards de modelo com nomes vagos ("Modelo Premium/Design/Intermediário"), sem preço,
   sem porta compatível, sem "para quem é". Todos com o mesmo CTA.
10. Mobile com 9.219 px de altura.
11. Contraste baixo nos textos de apoio.

---

## 2. Objetivo

Tornar a página atraente e utilizável para **clientes de todas as faixas de renda**,
sem desvalorizar a marca junto ao público de alto padrão, e sem interromper a campanha
de anúncios que já roda nesta URL.

### Não-objetivos

- Não transformar a página em hub de casa inteligente. A `/casa-inteligente` **continua
  sendo a landing de fechadura digital** — trocar seu conteúdo quebraria a campanha ativa.
  O hub de casa inteligente é projeto separado, em URL nova, com spec próprio.
- Não mexer na `/automacao`.
- Não alterar o repo do bot (`whatsapp-bot-eletrica`). Ver §7.
- Não inventar dado de prova social. Só entra o que o cliente confirmou.

---

## 3. Decisões

| # | Decisão | Motivo |
|---|---------|--------|
| D1 | A rota segue sendo a landing de fechadura | Campanha do Ads aponta para cá; risco zero |
| D2 | Estrutura "vitrine comparável" (filtro + cards lado a lado) | Formato que o público já conhece de e-commerce |
| D3 | A vitrine principal é de **planos de instalação**, não de produtos | É o que a MSIFORCE precifica; a régua R$ 200→R$ 1.200 é o que faz a página falar com todas as classes |
| D4 | Os 4 modelos de fechadura viram seção secundária, sem preço | Eixos diferentes (serviço × produto) no mesmo card confundem |
| D5 | Paleta dourada `#c5a059`; verde só no botão do WhatsApp | Alinha com o resto do site |
| D6 | Visual único premium + escada de opções | Ninguém se sente excluído nem acha barato demais |
| D7 | Navbar e rodapé completos | Confiança; hoje não há nenhum sinal institucional |
| D8 | Hero abre com **R$ 200** | Menor valor real da régua. Abrir com R$ 300 faz o cliente do Essencial achar caro |
| D9 | "Intermediário" → **"Conectado"** | Custa mais que o "Design"; o nome antigo quebra a escada. O que justifica os R$ 400 é Wi-Fi/Alexa/porta especial |
| D10 | "Modelo Custo-Benefício" → **"Modelo Essencial"** | "Custo-benefício" no nome sinaliza "essa é a barata" e constrange o cliente-alvo |
| D11 | Parcela **não** estampada: só "em até 12x no cartão" | A taxa da operadora muda o número final; estampar parcela seria impreciso |
| D12 | Ícones SVG inline substituem todos os emojis | Consistência entre SOs e acessibilidade |

---

## 4. Estrutura da página

Ordem final das seções. Âncoras `#modelos`, `#instalacao` e `#combo` são **obrigatórias**
(ver §7.2).

1. **Navbar** (`<Navbar />` do site) — logo, menu, telefone.
2. **Hero** — imagem da fechadura (corrigida), promessa, e na mesma dobra:
   - selo **★ 5,0 no Google · 82 avaliações**
   - âncora **"Instalação a partir de R$ 200 · em até 12x no cartão"**
   - CTA primário para WhatsApp
3. **Banner de certificação** — mantido (Intelbras, Papaiz, Yale, Pado, Elsys).
4. **Vitrine de planos de instalação** `id="instalacao"` — **coração da página**.
   Dois filtros: *bolso* e *tipo de porta*. Quatro cards (§5.1).
   Rodapé da seção: `*Valor varia de acordo com o modelo da fechadura e o material da
   porta. Parcelamento no cartão com taxa da operadora.`
5. **Modelos que fornecemos** `id="modelos"` — os 4 cards de fechadura, sem preço,
   com porta compatível e métodos de abertura. CTA de orçamento do combo.
6. **Benefícios** — bento grid atual, com ícones SVG no lugar dos emojis.
7. **Como funciona a instalação** — 4 passos (novo).
8. **Prova social** — selo do Google ampliado + link para o perfil.
9. **FAQ · garantia · formas de pagamento** (novo).
10. **Guia especializado** — tabs atuais (Tipos de Porta / Funções / Aplicações), mantidas.
11. **CTA final "Projeto Porta Pronta"** `id="combo"` + link para `/automacao`.
12. **Rodapé** (`<Footer />` do site) — CNPJ, contato, links.

---

## 5. Conteúdo

### 5.1 Vitrine de planos (dados confirmados pelo cliente)

| Plano | A partir de | Para que porta / fechadura | Argumentos |
|-------|------------|---------------------------|-----------|
| **Essencial** | R$ 200 | Sobrepor, porta de madeira comum | Instalação limpa em menos de 1 hora · Cadastro de senhas e tags da família · Teste completo antes de sair |
| **Design** | R$ 250 | Embutir, madeira ou pivotante leve | Acabamento de marcenaria fina · Fios e mecanismos ocultos · Fresagem de precisão |
| **Conectado** | R$ 400 | Alumínio, ferro ou pivotante de madeira maciça | App configurado no seu celular · Integração com Alexa e Google · Wi-Fi e hub prontos |
| **Premium** | R$ 700 | Multiponto, blindada, vidro temperado, pivotante grande | Atendimento com hora marcada · Garantia estendida · Calibração de máxima segurança |

Faixas completas informadas (uso interno, não estampar): Essencial R$ 200–250,
Design R$ 250–350, Conectado R$ 400–550, Premium R$ 700–1.200+.

### 5.2 Modelos de fechadura (sem preço)

Mantidos os 4 de `MODELOS` em `CasaInteligente.jsx`, com "Custo-Benefício" renomeado
para **Essencial** (D10). Cada card ganha: porta compatível e frase "para quem é".
Imagens já existem em `frontend/public/`.

### 5.3 Prova social

Somente o confirmado: **5,0 no Google, 82 avaliações**. Sem depoimentos e sem fotos de
obra — o cliente não tem esse material hoje. A seção fica estruturada para receber
depoimentos depois sem refatoração.

---

## 6. Sistema visual

- **Base:** `--black #000` / `--dark #0a0a0a`, superfícies `#111`.
- **Acento:** `--orange #c5a059`. Intensidade crescente nos 4 planos (30% → 52% → 76% → 100%)
  para comunicar a escada sem usar cores diferentes.
- **Verde** reservado ao botão do WhatsApp.
- **Tipografia:** manter as famílias já carregadas em `index.css`. Corpo de apoio sobe de
  tamanho e clareia para corrigir o contraste (item 11 do §1).
- **Ícones:** SVG inline, traço 1.5px, `currentColor`.
- **Mobile:** cards de plano em grid 2×2 (não 1 coluna) e cards de modelo em carrossel
  horizontal, para atacar os 9.219 px.

---

## 7. Restrições técnicas

### 7.1 Os CTAs precisam ser reconhecidos pelo bot

`frontend/tools/valida-ctas.mjs` valida cada CTA da página contra os detectores reais em
`whatsapp-bot-eletrica/services/fechadura.js`. CTA não reconhecido faz o lead cair no menu
genérico em vez do funil.

`GATILHOS_INSTALACAO` aceita, entre outras, a frase `'apenas o servico de instalacao'`
(comparação após `normalizar()`, que remove acentos e caixa). Portanto os quatro CTAs de
plano são construídos assim:

```js
export const msgPlanoInstalacao = (plano) =>
  `Olá! Quero o Plano ${plano} — apenas o serviço de instalação da minha fechadura digital.`;
```

Cada mensagem contém a frase-gatilho e é reconhecida como `fechadura/instalacao`
**sem qualquer alteração no repo do bot**. O nome do plano viaja como texto livre para o
atendimento humano ler.

*Limitação aceita:* o bot não distingue os planos entre si — todos entram no mesmo funil
de instalação. Diferenciar exigiria mexer em `fechadura.js`, o que está fora de escopo.

Novas constantes vão em `frontend/src/lib/gatilhos.js`, a fonte única já existente.

### 7.2 Âncoras dos sitelinks do Ads

`valida-ctas.mjs` exige os IDs `modelos`, `instalacao` e `combo` na rota. São os sitelinks
do anúncio ativo. **Os três precisam sobreviver ao redesenho** — a §4 já os aloca.

### 7.3 Navbar/Footer sem quebrar o botão flutuante

A rota **não** deve entrar no `V1Layout`: o layout renderiza seu próprio
`<WhatsAppButton />` flutuante e passaria a existir dois botões sobrepostos, sendo que o
da campanha (com `MSG_FECHADURA_COMBO`) é o que dispara o funil certo.

Solução: renderizar `<Navbar />` e `<Footer />` **diretamente dentro** de
`CasaInteligente.jsx`, mantendo o `<WhatsAppButton message={MSG_FECHADURA_COMBO} />`
próprio da página e deixando a rota fora do `V1Layout` em `App.jsx`.

*Efeito colateral a corrigir:* com `nav.msi-nav` e `footer.msi-footer` presentes,
`valida-ctas.mjs` passa a classificar o `.msi-wa` da campanha como "herdado" e para de
validá-lo — perda silenciosa de cobertura. O validador precisa de um ajuste: marcar o
botão da campanha (ex.: `data-campanha="fechadura"`) e tratá-lo como próprio mesmo com o
layout presente.

### 7.4 Deploy de imagens

O build da SPA copia `frontend/public/` para `dist/`, mas o site publicado serve a **raiz
do repositório**. Toda imagem nova precisa existir na raiz, não só em `public/` — foi
exatamente a causa do bug do hero.

---

## 8. Correções incluídas

1. **Imagem do hero.** Gerar `fechadura_completa.webp` a partir de
   `frontend/public/fechadura_completa.png` (cwebp/sharp, já instalados) e gravá-lo em
   **dois lugares**: `frontend/public/` e a **raiz do repositório** — é a raiz que o
   Cloudflare Pages serve. Atualizar o `src` no JSX para o `.webp`. O `CLAUDE.md` do
   projeto exige WebP; publicar o PNG de 108 KB seria regressão.
2. **`sitemap.xml`** — hoje lista só `/`, `/atendente/` e `/cartao/`. Incluir
   `/casa-inteligente` e `/automacao`.
3. **Contraste** dos textos de apoio.
4. **`VALOR_INSTALACAO_A_PARTIR`** deixa de ser `null` e passa a `'R$ 200'`.
5. **`frontend/tools/shot.mjs` produz screenshot enganoso.** Ele captura sem rolar a
   página, e como as seções usam `whileInView` do Framer Motion com `initial="hidden"`,
   tudo abaixo da primeira dobra sai em `opacity: 0` — a captura parece uma página
   quebrada. Foi o que aconteceu na primeira análise desta rota. Corrigir o script para
   rolar até o fim antes de capturar. Sem isso, a verificação visual da §9 mente.

---

## 9. Verificação

A implementação só é considerada pronta com estas saídas confirmadas:

```bash
cd frontend
npm run lint                                   # sem erros
npm run build                                  # build limpo
npm run preview -- --port 4173 &
node tools/valida-ctas.mjs http://localhost:4173   # RESULTADO: OK
node tools/shot.mjs /casa-inteligente ci-novo      # inspeção visual
```

Checklist adicional:
- [ ] `fechadura_completa.webp` existe na raiz do repositório (o bug do §1 se repete se ficar só em `frontend/public/`). Após o deploy: `curl -s -o /dev/null -w "%{size_download}" https://www.msiforce.com.br/fechadura_completa.webp` retorna o tamanho real do arquivo, não 3.045
- [ ] Âncoras `#modelos`, `#instalacao`, `#combo` presentes no DOM
- [x] Altura da página em 390 px de largura: **12.329 px** — meta original de 6.500 px
  revista em 21/08/2026, ver §12
- [ ] Nenhum emoji restante como ícone de interface
- [ ] Zero erro de console

---

## 10. Riscos

| Risco | Mitigação |
|-------|-----------|
| Expor preço reduz margem de negociação | Só "a partir de" + asterisco de variação, conforme pedido do cliente |
| Redesenho derruba a conversão da campanha | Âncoras e gatilhos preservados; `valida-ctas.mjs` como portão |
| Cliente do Premium exigir serviço complexo pelo preço do Essencial | Cada plano declara explicitamente porta e fechadura que atende |
| Imagem nova esquecida na raiz (§7.4) | Item explícito no checklist de verificação |

---

## 11. Fora de escopo

- Hub de casa inteligente em URL nova (projeto seguinte, spec próprio).
- Depoimentos e fotos de obra (sem material hoje).
- Formulário alternativo ao WhatsApp.
- Qualquer alteração em `whatsapp-bot-eletrica`.
- Deploy para produção — só mediante pedido explícito do usuário.

---

## 12. Revisão da meta de altura mobile (21/08/2026)

A meta de 6.500 px foi escrita contra a linha de base de **9.219 px** medida no §1 —
a página **antiga**. O redesign que este mesmo documento aprova acrescentou cinco
seções que ela não tinha:

| Seção nova | Altura em 390 px |
|---|---|
| Vitrine de planos (`#instalacao`) | 1.809 px |
| Como funciona (passos) | 833 px |
| Prova social (selo Google) | 293 px |
| Perguntas frequentes | 774 px |
| Rodapé do site, no lugar do `campanha-footer` de ~150 px | 1.152 px |
| **Soma** | **~4.900 px** |

Ou seja: a meta e o escopo do redesign foram definidos no mesmo documento e são
incompatíveis entre si. Não é o CSS que está gordo.

**O que já foi espremido** (15.160 → 12.329 px):

- modelos em carrossel horizontal com snap — a seção caiu de 2.916 para 1.046 px (−1.870);
- respiro vertical desenhado para 1440 px cortado nas seções que ainda usavam 6 rem,
  e padding interno dos painéis (−960);
- planos já vinham em grid 2×2 desde a Task 7, conforme o §6.

O conteúdo longo **já está colapsado**: FAQ em `<details>`, guia em tabs, modelos em
carrossel. Encurtar mais exige apagar seções de conversão.

**Decisão do cliente (21/08/2026): aceitar 12.329 px.** Nenhuma seção foi removida.
A meta numérica fica registrada como obsoleta, não como dívida — quem retomar não
deve tentar "consertar" a altura sem antes rediscutir o conteúdo da página.
