# Campanha Fechadura Digital — design

**Data:** 2026-08-03
**Repos afetados:** `site-msiforce/frontend` (landing) e `whatsapp-bot-eletrica` (funil do bot)
**Documento irmão:** [`../../campanha-fechadura-google-ads.md`](../../campanha-fechadura-google-ads.md) — parâmetros do Google Ads

---

## 1. Objetivo

Fechadura digital é o **produto de entrada** de um projeto maior de automação residencial.
A campanha traz o lead pela fechadura; o bot qualifica, recomenda o modelo compatível,
informa o valor da instalação, agenda e só então oferece a consultoria de automação.

Meta operacional: o lead chega ao humano **com escopo definido e horário marcado**.

## 2. Estado atual e problemas

A landing `/fechadura-digital-sp` existe (`CampanhaFechadura.jsx`, rota já ligada no `App.jsx`)
mas **nenhum dos 7 CTAs entrega o lead corretamente**:

1. `WhatsAppButton` não aceita props. A landing o chama 5× passando `message`, `className` e
   texto filho — todos ignorados. Cada chamada renderiza outro balão `position: fixed`, e os
   estilos `.botao-comprar-kit` / `.botao-instalacao-avulsa` são código morto.
2. Os 5 botões apontam pro texto genérico `"vim pelo site da MSIFORCE"`, que cai na
   interceptação `ehVindoDoSite` do bot → **MENU_SERVICOS genérico**.
3. O `waLink` do hero e do CTA final usa `5511993415175`; o número do bot é `5511910773865`.
4. Não existe nenhuma tag de analytics no site — só um stub `window.dataLayer`.

## 3. Decisões

| Decisão | Escolha | Por quê |
|---|---|---|
| Posicionamento | Fechadura como isca pra automação | Ticket maior está no projeto completo |
| Preço | Só depois de qualificar | Reduz curioso sem afastar o lead pago |
| Valor do equipamento | **Bot nunca informa** | Cliente escolhe funções; modelo é oferecido conforme disponibilidade |
| Valor da instalação | Bot informa, da `tabela_precos` | Mão de obra é serviço definido, dá pra fixar |
| Recomendação | Por **função + tipo de porta** | Vende solução, não SKU; libera estoque |
| Nome do lead | `pushName` do WhatsApp | Corta uma etapa do funil |
| Fecho | Agenda dia e período | "Praticamente fechado" antes do humano entrar |
| Número | `5511910773865` | Mesmo do resto do site e da instância do bot |
| Cobertura | Capital, lance reforçado na Zona Leste | Volume sem abandonar a base |
| Conversão | `gtag` do Ads no clique do WhatsApp | Mínimo pro Smart Bidding funcionar |

## 4. Arquitetura do bot

Clona o padrão já em produção da **Mídia Indoor** — nenhum fluxo existente é tocado.

| Peça | Mídia Indoor (existe) | Fechadura (novo) |
|---|---|---|
| Detector | `services/midiaIndoor.js` | `services/fechadura.js` |
| Interceptação | bloco antes do split `tipo_bot` | bloco irmão, logo abaixo |
| Coleta | `midia_*` | `fechadura_*` |
| Persona IA | `PROMPTS_IA.midia` | `PROMPTS_IA.fechadura` |
| Teste | `tests/backend/midiaIndoor.test.js` | `tests/backend/fechadura.test.js` |

**Interceptação por frase inteira**, nunca pela palavra solta `fechadura` — senão colide com
o submenu 5.2 (Fechaduras Digitais e Biometria) que já existe.

### 4.1 Duas intenções

O texto do link identifica qual funil abrir:

- `...Fechadura <MODELO> + Instalação...` → **combo**
- `...APENAS o serviço de instalação...` → **instalação avulsa**

### 4.2 Máquina de estados

**Combo:** `fechadura_funcoes` → `fechadura_porta` → `fechadura_bairro` →
*(recomendação + valor + pergunta do dia)* `fechadura_dia` → `fechadura_periodo` → fecho + gancho automação

**Instalação avulsa:** `fechadura_porta` → `fechadura_bairro` → `fechadura_dia` → `fechadura_periodo` → fecho

Cinco respostas no combo, quatro na avulsa. Só o bairro exige digitar.

### 4.3 Matriz de recomendação

Funções: `[1]` só senha · `[2]` senha + digital · `[3]` completo (digital, senha, celular, tag)
Porta: `[1]` madeira · `[2]` vidro/blindex · `[3]` alumínio · `[4]` ferro · `[5]` não sei

| Funções ↓ / Montagem → | Embutir (madeira, alumínio) | Sobrepor (vidro, ferro) |
|---|---|---|
| Só senha | FR 102 | FR 10 |
| Senha + digital | FR 221 V | FR 102 |
| Completo | MFR 3000 V | MFR 3000 V + avaliação |

`porta = não sei` → recomenda pela função e marca o lead para avaliação presencial.
Casos fora da matriz não geram chute: o bot registra e encaminha para avaliação.

### 4.4 Preço

Dois itens na `tabela_precos` do tenant:

```
Instalação Fechadura Digital - Embutir
Instalação Fechadura Digital - Sobrepor
```

Embutir exige recorte na porta e é mais mão de obra. Quem não quiser diferenciar cadastra
o mesmo valor nos dois.

**Sem preço cadastrado o bot não quebra nem inventa:** recomenda o modelo, agenda e informa
que o especialista confirma os valores.

### 4.5 Fora do roteiro

Pergunta que não bate com o passo atual cai na persona `PROMPTS_IA.fechadura` e volta ao
ponto onde parou — igual à Mídia Indoor. A persona **não informa valor de equipamento**
em nenhuma hipótese.

## 5. Landing

- `WhatsAppButton` aceita `message`, `className` e `children`. **Comportamento atual vira o
  padrão** — são 15 usos no site que não podem quebrar.
- `waLink` corrigido para `5511910773865`.
- Textos dos links alinhados aos gatilhos do bot.
- Âncoras `id="modelos"`, `id="instalacao"`, `id="combo"` para os sitelinks.
- Faixa "instalação a partir de R$ X" visível — o grupo Combo traz busca por preço, e página
  sem número nenhum gasta clique com quem sai sem falar.
- Imagens para WebP com nome sem espaço; `fechadura.png` (655 KB) e `FR 201.PNG` removidos
  (não são referenciados).
- `gtag` do Ads no `index.html` + disparo de conversão em todo clique de WhatsApp da landing.

## 6. Valores fornecidos pelo usuário

Isolados em constantes nomeadas, nunca espalhados pelo código:

| Valor | Onde | Origem |
|---|---|---|
| `AW-XXXXXXXXXX` + rótulo | `index.html` / helper de conversão | Ads → Ferramentas → Conversões |
| Valor da instalação | `tabela_precos` (painel) | Definido pelo usuário |
| Faixa "a partir de" | constante no topo de `CampanhaFechadura.jsx` | Mesmo valor acima |

Enquanto não preenchidos: o `gtag` fica inerte (não dispara) e o bot omite o valor sem quebrar.

## 7. Fases

**Fase 1 — código.** Bot + landing. Testável local, não depende de nada externo.
**Fase 2 — publicação.** `gtag`, deploy e ativação da campanha. Depende do `AW-` e dos valores.

Deploy só com pedido explícito do usuário, conforme `CLAUDE.md`.

## 8. Testes

- `tests/backend/fechadura.test.js`: detecção de gatilho (combo, avulsa, negativos que não
  podem disparar), matriz de recomendação nos 10 cruzamentos, e o caso `não sei`.
- Landing: build + screenshot da rota conferindo que os 5 botões renderizam como botão
  (não como balão flutuante) e que cada `href` carrega o texto correto.
- Ponta a ponta antes de ativar: clique no anúncio → landing → WhatsApp → funil certo.

## 9. Fora de escopo

Prova social, FAQ e depoimentos na landing. Reforçam conversão, mas ampliam o escopo —
tratar depois da campanha no ar, com dados reais de comportamento.
