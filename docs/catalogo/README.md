# Catálogo — fonte única

`itens.csv` é a **única** origem dos itens publicados no catálogo da MSIFORCE em dois canais:

| Canal | Superfície | Usa quais campos |
|---|---|---|
| Google Business Profile | **Serviços** | `nome`, `categoria_gbp`, `servico_gbp`, `preco`, `preco_rotulo`, `descricao` |
| Google Business Profile | **Produtos** | idem + `foto` e `link` |
| WhatsApp Business | **Catálogo** | `nome`, `preco`, `descricao`, `foto` (obrigatória), `link`, `colecao_wa` |

Mudou preço ou texto? Muda **aqui** e republica nos canais. O contrário — editar direto no Google ou
no app e deixar este arquivo para trás — é exatamente o que produziu a bagunça que este catálogo veio
consertar (ver *Histórico*).

## De onde vêm os preços

Da **Tabela de Preços 2026** (`docs/planilhas/Tabela de Preços.html`, fora de qualquer repo), coluna
**Preço Mínimo**, sempre rotulada "a partir de". A coluna `origem_planilha` guarda a linha exata que
originou cada valor, para conferência.

A exceção são os 5 itens de fechadura, cujo preço veio de uma decisão do dono que passou por cima da
tabela (ver abaixo). Nesses, `origem_planilha` registra a decisão e a linha que ela substituiu.

Por que a mínima: é o piso real, é o que o resumo da planilha chama de "valor médio base", e casa com
o padrão que o site já usa. O que varia — distância, tipo de porta, altura, infraestrutura que falta —
é fechado na visita, não prometido na vitrine.

### O que NÃO entra neste arquivo

**A tabela de preços completa.** Este repo é público. As colunas Preço Mínimo, Preço Máximo e Preço
Capital, lado a lado nas 134 linhas, expõem a margem e a estratégia de precificação. Aqui entra só o
item curado, com **um** preço: o que vai ao ar de qualquer jeito.

Também não entra preço de equipamento. Desde 18/09/2026 a MSIFORCE não tem estoque e compra a cada
venda, então o valor do aparelho oscila com o fornecedor do dia. Todas as descrições de fechadura
dizem "equipamento cotado à parte" — isso é deliberado, não é lacuna a preencher.

## Limites por canal

| Campo | Limite adotado | Por quê |
|---|---|---|
| `descricao` | **300 caracteres** | é o teto do Google; escrevendo para ele, o texto serve os dois canais sem ter duas versões |
| `foto` | WebP do repo | o WhatsApp **exige** imagem em todo item; o Google Produtos usa, o Google Serviços não aceita |
| `preco` | número puro, sem `R$` | cada canal formata do seu jeito |

`servico_gbp` vazio significa que o Google **não** tem um serviço pronto com esse nome na categoria —
aí ele entra como serviço personalizado.

## Estado do primeiro lote

17 itens: 5 de fechadura (Chaveiro), 8 de elétrica (Eletricista, a categoria principal, hoje vazia no
perfil) e 4 de eletrônica/segurança (Engenheiro eletrônico, também vazia).

**Pendência conhecida:** `fechadura-porta-vidro` está sem foto. Ele entra em Serviços no Google
(que não pede imagem), mas **fica de fora do WhatsApp** até existir foto de um serviço real em porta
de vidro — a mesma pendência que já estava na lista do dono.

## Histórico — o que este arquivo veio resolver

Inventário do perfil do Google em 21/09/2026 encontrou **três preços diferentes no ar ao mesmo tempo**
para instalação de fechadura:

- **R$ 200** — no site (`ofertas.js`), número arredondado que não existe na tabela
- **R$ 226** — no Google, em Serviços e em 2 dos 4 Produtos (linha 111 da tabela)
- **R$ 499** — impresso na arte de um produto, sobra da campanha de 24/08 a 02/09/2026

Os 4 produtos também estavam nomeados como equipamento ("Fechadura Digital · Modelo Essencial",
R$ 226), o que faz o cliente ler que *a fechadura* custa R$ 226 — justamente o que a decisão de 18/09
quis evitar.

## Decidido em 21/09/2026 — instalação de fechadura passa a R$ 249

O dono fechou o número: **R$ 249**, e não o R$ 200 do site nem o R$ 226 da tabela. Aplicado no mesmo
dia nos dois lados:

- **Site** — `dados.js` (`apartirde` do plano Essencial, de onde a home, o hero e o FAQ derivam
  sozinhos), `ofertas.js` (4 ofertas) e `portas.js` (2 metas).
- **Este CSV** — os 5 itens de fechadura.

Isso torna a **linha 111 da tabela oficial desatualizada** (ela ainda diz R$ 226). A tabela é a fonte
dos outros 12 itens, então convém corrigi-la lá também — senão o próximo que consultar a planilha vai
republicar o número velho.

## Em aberto

1. **A régua de planos da `/casa-inteligente` ficou torta.** Os quatro planos são Essencial, Design,
   Conectado e Premium, e o piso subiu de R$ 200 para R$ 249 — mas o Design continua em **R$ 250**.
   Um real de diferença entre dois planos lê-se como erro. O Design precisa de um valor novo, e essa
   é decisão de preço, não de código.
2. **Três linhas de fechadura na tabela** com descrições que se sobrepõem: linha 54 (portão social,
   R$ 151), linha 111 (fechadura inteligente, R$ 226) e linha 53 (fechadura digital sem alvenaria,
   R$ 350). Vale o dono confirmar o que separa uma da outra.

## Como editar

**Edite o CSV direto** — ele abre em qualquer planilha e é ele a fonte de verdade, não um gerado.
O script que criou a primeira versão foi um andaime de uma vez só e não foi guardado de propósito:
manter script e CSV lado a lado criaria duas fontes disputando a mesma verdade, que é o problema
que este arquivo existe para matar.
