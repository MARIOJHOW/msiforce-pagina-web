# Catálogo — fonte única

`itens.csv` é a **única** origem dos itens publicados no catálogo da MSIFORCE em dois canais:

A coluna **`tipo`** decide onde cada linha é publicada, e as duas metades vendem coisas diferentes:

| `tipo` | Canal e superfície | O que o preço significa | Usa quais campos |
|---|---|---|---|
| `servico` | Google **Serviços** | **mão de obra**, para quem já tem a fechadura — sempre "a partir de" | `nome`, `categoria_gbp`, `servico_gbp`, `preco`, `preco_rotulo`, `descricao` |
| `produto` | Google **Produtos** | **fechadura + instalação**, preço fechado da arte de campanha | idem + `foto` e `link` |
| ambos | WhatsApp **Catálogo** | conforme a linha | `nome`, `preco`, `descricao`, `foto` (obrigatória), `link`, `colecao_wa` |

Essa separação é o que impede a confusão que o catálogo veio consertar: R$ 249 é o que custa **o
serviço**; R$ 499 a R$ 850 é o que custa **a fechadura já instalada**. Misturar os dois faz o cliente
ler um pelo outro.

A exceção é `kit-fechadura-instalacao` (decisão do dono, 23/09/2026): fechadura + instalação, mas
como **serviço** "a partir de R$ 500", sem modelo. É o valor inicial do kit que o site e o Google
também mostram. O preço fechado de cada modelo continua nos 5 produtos.

Mudou preço ou texto? Muda **aqui** e republica nos canais. O contrário — editar direto no Google ou
no app e deixar este arquivo para trás — é exatamente o que produziu a bagunça que este catálogo veio
consertar (ver *Histórico*).

## De onde vêm os preços

Da **Tabela de Preços 2026 Modernizada** (`docs/planilhas/Tabela_Precos_MSIFORCE_2026_Modernizada - Tabela de Preços.csv`,
fora de qualquer repo, códigos MSI-001 a MSI-134), sempre rotulada "a partir de". A coluna
`origem_planilha` guarda o código MSI que originou cada valor, para conferência.

Qual coluna da planilha vale para cada item é regra do dono, registrada **fora deste repo** (ele é
público), no `LEIA-ME.md` ao lado da planilha.

A exceção são os 5 itens de fechadura, cujo preço veio de uma decisão do dono que passou por cima da
tabela (ver abaixo). Nesses, `origem_planilha` registra a decisão e a linha que ela substituiu.

### Os três casos sem preço publicado

Decisão do dono em **22/09/2026**: **porta de vidro, porta de ferro ou portão, e qualquer instalação
em área externa** saem **sob consulta** — não recebem valor de partida em canal nenhum (site, Google
ou WhatsApp). Nos três o serviço varia demais para ter piso honesto: vidro temperado não aceita furo
e o modelo depende do perfil e da ferragem, ferro pede fixação e ferramenta próprias, e área externa
ainda depende da exposição a chuva e sol.

Na prática: a régua da `/casa-inteligente` ganhou um card **Sob consulta** sem número, e a página
`/fechaduras/porta-de-vidro` deixou de mostrar valor — ela diz que o preço é fechado depois da foto
da porta. O item de vidro **não existe mais no CSV**: sem preço e sem foto, ele travava o lote no
WhatsApp sem entregar nada (ver *O que saiu*).

> Isso passa por cima da linha 54 da tabela (`INSTALAÇÃO DE FECHADURA ELETRÔNICA (PORTÃO SOCIAL)`,
> R$ 151). Se um item de portão for criado no catálogo, ele nasce sob consulta, não com os 151.

O que varia — distância, tipo de porta, altura, infraestrutura que falta — é fechado na conversa,
não prometido na vitrine.

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
| `nome` | **58 caracteres** | é o teto do campo de nome do Produto no GBP |
| `foto` | arquivo do repo | o WhatsApp **exige** imagem em todo item; o Google Produtos usa (e **recusa publicar sem ela**), o Google Serviços não aceita |
| `preco` | número puro, sem `R$` | cada canal formata do seu jeito |

`servico_gbp` vazio significa que o Google **não** tem um serviço pronto com esse nome na categoria —
aí ele entra como serviço personalizado.

## Estado do catálogo

**23 itens: 5 produtos e 18 serviços.**

Os **5 produtos** são as fechaduras com instalação inclusa, cada um com a arte de campanha
correspondente neste diretório. Preço fechado, lido da própria arte — não sai da Tabela 2026:

| Produto | Tipo | Preço | Arte |
|---|---|---|---|
| Intelbras **FR 101** | sobrepor | **R$ 499** (promocional) | `arte-intelbras-fr101-sobrepor.png` |
| Papaiz **SL140 B** (Fit Lock) | sobrepor | **R$ 700** | `arte-papaiz-sl140b-sobrepor.jpeg` |
| Intelbras **MFD2020 D** | sobrepor | **R$ 750** | `arte-intelbras-mfd2020d-sobrepor.png` |
| Papaiz **Fit Lock** | embutir | **R$ 800** | `arte-papaiz-fitlock-embutir.jpeg` |
| Intelbras **MFR 3000 V** | embutir | **R$ 850** | `arte-intelbras-mfr3000v-embutir.png` |

> ⚠️ **O R$ 499 é promocional e tem letra miúda na própria arte:** vale para porta de 25 a 50 mm de
> espessura e está sujeito às condições de instalação e ao deslocamento. É também o mesmo valor da
> campanha que o histórico registra como encerrada em 02/09/2026. Antes de publicar, confirme que a
> promoção continua de pé — senão essa arte recria o problema que as outras vieram resolver.
>
> O R$ 850 do MFR 3000 V **é com instalação** (confirmado pelo dono em 23/09/2026). A arte é a única
> que não escreve "instalada", então a descrição diz isso com todas as letras.

Os **16 serviços** são mão de obra: 4 de fechadura (Chaveiro), 8 de elétrica (Eletricista, a
categoria principal) e 4 de eletrônica/segurança (Engenheiro eletrônico).

### Serviços revistos em 24/09/2026

Os preços dos serviços foram realinhados com a Tabela 2026, pela regra do dono registrada **fora deste
repo**. Entraram `instalacao-tomada-industrial` (MSI-095) e `instalacao-chuveiro-luxo` (MSI-044). As
fechaduras seguem os preços fechados das artes.

### O que saiu em 24/09/2026

- **`inspecao-spda` e `instalacao-ar-condicionado`** saem do catálogo, por decisão do dono. No WhatsApp
  os dois estão **ocultos** (não apagados). Ninguém os vê, mas dá para voltar atrás.
- No WhatsApp, tomada, luminária, ventilador, chuveiro, carregador e emergencial trocaram a foto genérica
  do quadro por fotos próprias de cada serviço. Essas fotos ficam **fora deste repo**, em
  `docs/fotos-servicos/` na raiz do monorepo, porque parte delas veio da internet. A coluna `foto` destes
  itens ainda aponta para a imagem antiga do site.

### O que saiu em 22–23/09/2026

- **As 4 faixas do Google** — "Modelo Essencial", "Intermediário", "Design" e "Premium" — saem. Elas
  nomeavam equipamento por faixa inventada, e as fotos eram artes com preço impresso de campanhas
  encerradas (R$ 499, 650, 900 e 800) brigando com o preço do campo. No lugar entram os 5 produtos
  acima, nomeados pelo **modelo real**, que é o que o cliente procura e o que a arte mostra.
- **`fechadura-porta-vidro`** sai do catálogo: estava sem preço e sem foto, e travava o lote inteiro
  no WhatsApp. A página `/fechaduras/porta-de-vidro` **continua no ar e indexada**, sem número,
  mandando para o WhatsApp — vidro segue sob consulta, como a régua diz.

## Preços no Google — estado em 23/09/2026

**Serviços** (mão de obra, "a partir de"):

| Categoria | Serviço | Preço | Nota |
|---|---|---|---|
| Chaveiro(a) | Instalação de fechadura eletrônica | **R$ 249** | a descrição abre dizendo que é **mão de obra**, com a fechadura cotada à parte |
| Empresa de automação de casas | `fechadura digital` (avulso) | **R$ 400** | era 226; é o plano Conectado |
| Empresa de automação de casas | `fechadura inteligente` (avulso) | — | sem preço |
| Eletricista | ~25 serviços prontos | — | categoria principal, **toda vazia** |

As duas avulsas que duplicavam a instalação de fechadura dentro do Chaveiro
(`fechadura inteligente`, R$ 249, e `fechadura digital`, sem preço nem descrição) foram **apagadas
em 23/09/2026**, a pedido do dono. O diálogo do Google avisa que a exclusão remove o serviço "de
todas as categorias", mas na prática ela foi pontual: a `fechadura digital` de R$ 400 da categoria
de automação continuou intacta — conferido depois de cada exclusão.

O próprio dono apagou em seguida a `Instalação de fechadura eletrônica`, e ela foi **recriada no
mesmo dia** com preço "A partir de R$ 249" e uma descrição que agora começa por onde importa:
*"Valor de mão de obra, a partir de — a fechadura é cotada à parte, conforme o modelo escolhido."*
É a linha que impede o cliente de ler os 249 como preço de fechadura, agora que os produtos ao lado
custam de 499 a 850.

**Produtos (24/09/2026):** os **5 produtos novos estão no ar**, com arte, preço, descrição e link
deste CSV. As 4 faixas antigas foram **editadas** para virar FR 101, SL140 B, Fit Lock e MFR 3000 V
(nada foi apagado), e a MFD2020 D entrou como produto novo. Categoria de produto: "Fechaduras Digitais".

Não sobrou nenhum R$ 226 publicado.

## As artes e quem sobe

As 5 artes estão neste diretório, renomeadas para kebab-case (os originais chegaram como
`intelbras sobrepor.png`, `papaiz embutir.jpeg` e afins). Elas trazem preço impresso — o que aqui é
aceitável, porque o preço do produto é **fechado**, não "a partir de", e a arte e o campo dizem o
mesmo número. A regra segue valendo para arte de serviço: **mão de obra não leva preço impresso**,
porque o piso muda e a imagem não acompanha.

**A subida no Google dá para automatizar (desde 24/09/2026).** Dentro da busca, o editor de
Produtos roda em iframe e a automação não enxerga os campos. Aberto direto em
`https://www.google.com/local/business/3547041469764745894/editprofile/products`, ele vira página
comum e o campo de foto aceita upload. Espere a prévia da foto aparecer antes de clicar em Publicar.
No editor, a miniatura da MFR 3000 V continuou mostrando a arte antiga depois de publicar, mas o
dono conferiu que no perfil público ela aparece certa. E remover a
arte sem pôr outra não é saída: o Google recusa publicar produto sem foto ("Adicione uma foto do
produto"), testado em 22/09/2026.

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

1. **Republicar no WhatsApp.** O CSV mudou em 23/09/2026 (6 serviços subiram, kit de R$ 500 entrou,
   emergencial foi a R$ 300) e o catálogo do app ainda mostra os valores antigos.

Resolvidos em 23/09/2026: `fechadura inteligente` ganhou R$ 249 no Google, e as linhas de fechadura
que se sobrepunham na tabela (MSI-050 e MSI-108) foram trocadas no bot pelos 4 valores deste
catálogo — 249, 299, 400 e 500. Portão continua sob consulta.

## Como editar

**Edite o CSV direto** — ele abre em qualquer planilha e é ele a fonte de verdade, não um gerado.
O script que criou a primeira versão foi um andaime de uma vez só e não foi guardado de propósito:
manter script e CSV lado a lado criaria duas fontes disputando a mesma verdade, que é o problema
que este arquivo existe para matar.
