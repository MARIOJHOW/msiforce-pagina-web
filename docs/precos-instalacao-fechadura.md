# Preços no bot — o que está na `tabela_precos` e por quê

> Atualizado em 30/08/2026. Cobre as duas coisas que o bot faz com preço: a **âncora** que o
> funil da fechadura cita no WhatsApp e a **visita técnica** que o gerador de PDF orça.

## A fonte

A autoridade é a **tabela oficial MSIFORCE — Serviços 2026**, exportada do Google Sheets em
`bot-whatsapp/docs/planilhas/Tabela de Preços.html` (130 serviços, 12 categorias).

**A coluna que vale é `Preço Mínimo` / `Preço Máximo`** — é a faixa real praticada. A coluna
`Preço Capital` **não é autoritativa**: diverge das outras duas e às vezes inverte o sentido
(análise SPDA é 1.800 na faixa e 850 no capital; cerca elétrica é 60–103 por metro e 25 no
capital). Enquanto ninguém definir o que ela representa, ignore-a.

Duas coisas na planilha parecem erro de digitação, não decisão: quatro descrições começam com
"INSTALAÇÃO DE INSTALAÇÃO DE", e "detector de fumaça" está em R$ 1.151–1.720.

## O que está cadastrado em produção

Tenant `MSIFORCE` (`clientes.id = 4`, instância `api`):

| Descrição | Valor | De onde vem |
|---|---|---|
| `Instalação de fechadura digital de sobrepor` | R$ 226,00 | piso de "instalação e configuração fechadura inteligente" (226–398) |
| `Instalação de fechadura digital de embutir` | R$ 350,00 | "instalação de fechadura digital (sem alvenaria)", valor fixo |
| `Automação Residencial - visita técnica (descontada na aprovação)` | R$ 250,00 | valor praticado pelo dono |
| `Serviços Elétricos - visita técnica (descontada na aprovação)` | R$ 250,00 | idem |
| `Segurança Eletrônica - visita técnica (descontada na aprovação)` | R$ 250,00 | idem |
| `Redes - visita técnica (descontada na aprovação)` | R$ 250,00 | idem |

> A planilha traz a visita técnica a R$ 150 nas duas colunas. **Os R$ 250 são o valor
> praticado**, informado pelo dono em 30/08 e sobrepondo a planilha. Se a planilha for
> atualizada, os dois devem convergir.

## A fechadura: por que 226 e 350

A tabela oficial tem quatro linhas de fechadura, e nenhuma separa sobrepor de embutir:

| Linha oficial | Mínimo | Máximo |
|---|---|---|
| Instalação de fechadura digital (sem alvenaria) | R$ 350 | R$ 350 |
| Instalação e configuração fechadura inteligente | R$ 226 | R$ 398 |
| Instalação de fechadura eletrônica (portão social) | R$ 151 | R$ 194 |
| Instalação de botoeira para fechadura eletrônica | R$ 60 | R$ 81 |

O bot precisa de **um número por montagem**, então cada balde ficou com um valor que existe na
tabela: `sobrepor` no piso da faixa da fechadura inteligente (226) e `embutir` no valor fixo da
instalação sem alvenaria (350), que é o serviço mais laborioso dos dois.

**O número é âncora, nunca preço fechado** — o bot diz "a partir de" nos dois caminhos, e quem
fecha o valor é o técnico na visita. A pesquisa de campo abaixo mostra por quê: a mesma
instalação varia de R$ 180 a R$ 800+ conforme a porta.

> **Correção registrada:** em 30/08 estas linhas nasceram com 180 e 280, tirados da pesquisa de
> mercado e não da tabela oficial. Ficaram **abaixo do piso da própria empresa** e foram
> corrigidos no mesmo dia. A lição: pesquisa de mercado é referência de contexto; o preço é o
> da tabela oficial.

## Pesquisa de campo — referência do técnico, não fonte de preço

Levantamento de mercado de 30/08/2026. Serve para o técnico entender a variação na hora da
visita e para dimensionar quanto a âncora pode subir. **Não é o preço da empresa.**

### Por tipo de fechadura

| Tipo | Complexidade | Faixa |
|---|---|---|
| Sobrepor (rim lock) | Baixa — furos passantes e fixação externa | R$ 180 – 280 |
| Embutir (com maçaneta/trinco) | Média/alta — abrir caixa na folha da porta | R$ 300 – 450 |
| Push-pull / facial / biométrica | Alta — mecanismos robustos, múltiplos pontos | R$ 400 – 600 |
| Para vidro (pressão / fita 3M) | Baixa/média — encaixe sem furo | R$ 200 – 320 |

### Por tipo de porta

| Porta | Serviço | Faixa | Observação técnica |
|---|---|---|---|
| Madeira comum (MDF, compensado, maciça) | Sobrepor | R$ 180 – 250 | Maciças ou com frisos/rebaixos pedem mais cuidado no acabamento |
| Madeira comum | Embutir | R$ 280 – 380 | |
| Pivotante de madeira (grossa/alta) | Embutir / push-pull / rolete | R$ 350 – 550 | Costuma exigir fecho tipo rolete ou puxador longo independente |
| Vidro temperado / blindex | Vidro-alvenaria ou vidro-vidro | R$ 220 – 350 | **Temperado não aceita furo novo — estilhaça.** Se o modelo exigir furação, a porta tem que vir furada de fábrica (padrão Santa Marina/Blindex). Modelos por pressão/fita são os mais rápidos |
| Metal (alumínio, ferro, aço) | Sobrepor / perfil estreito | R$ 280 – 450 | Alumínio exige modelo slim; perfil tubular de ferro/aço exige broca de corte de metal |
| Blindada ou pivotante especial | — | R$ 500 – 800+ | Ferramenta pesada para chapa interna de aço, técnico especializado |

### Fatores adicionais

- **Substituição de fechadura antiga:** +R$ 50 a 100 quando é preciso tampar furação antiga,
  colocar chapa acabadora ou retrabalhar o batente.
- **Configuração e integração:** cadastro de biometrias/senhas e ligação com hub Zigbee, Wi-Fi,
  Alexa ou Google Home normalmente entram na visita; cobra-se à parte se a infra for complexa.
- **Deslocamento:** regiões centrais e zonas Sul/Oeste tendem a valor um pouco mais alto, ou têm
  taxa de deslocamento/estacionamento embutida no pacote.

## As regras que uma linha nova precisa respeitar

**A descrição não é texto livre.** Há duas buscas diferentes, com regras diferentes.

### 1. Funil da fechadura (`index.js:459`)

`LIKE '%instala%fechadura%<montagem>%'`, e o `LIKE` é **ordenado**: "instala" antes de
"fechadura" antes da montagem. `Fechadura digital — instalação de sobrepor` **não casa**.

A montagem só assume dois valores, vindos do catálogo em `services/fechadura.js:12`:

| Cliente pede | Modelo | Montagem |
|---|---|---|
| Só senha | FR 102 (alt. FR 10) | `sobrepor` |
| Senha + digital | FR 221 V | `embutir` |
| Completo (digital, senha, app, tag) | MFR 3000 V | `embutir` |

Um terceiro caminho — quem já tem a fechadura — busca com montagem vazia, casa com as duas
linhas e devolve a mais barata (`ORDER BY valor_unitario ASC`).

### 2. Gerador de PDF (`index.js:954`)

Casa pela **primeira palavra** do serviço pedido, `LIKE '%<palavra>%'`, sem âncora nenhuma. As
palavras possíveis são nove:

| Palavra | Tem linha? | Observação |
|---|---|---|
| `Automação`, `Serviços`, `Segurança`, `Redes` | ✅ visita técnica | os quatro serviços de campo |
| `Atendimento` | ❌ **e deve continuar assim** | é o fallback de quem não escolheu nada no menu; uma linha com "atendimento" na descrição faria todo lead genérico receber PDF |
| `Atendente`, `Plataforma`, `Planos`, `Demonstração` | ❌ | fluxos de SaaS, onde orçamento em PDF não faz sentido |

Mais duas armadilhas:

- **O acento precisa bater.** A comparação é `LOWER(descricao) LIKE LOWER('%automação%')` —
  descrição escrita "automacao" não casa. Vale para `Automação`, `Serviços`, `Segurança` e
  `Demonstração`.
- **O PDF tem uma linha só, `qtd: 1`.** Serve para serviço de valor fechado. Não serve para o
  que se cobra por ponto, por metro ou por circuito — que é a maior parte da tabela oficial. Por
  isso a linha cadastrada é a **visita técnica**, não a obra: o PDF orça a visita que vai orçar
  a obra.

## O que o bot ainda não usa

O funil **coleta** o tipo de porta (`dadosF.porta`) e o **bairro** (`dadosF.bairro`, texto
livre), mas a busca de preço ignora os dois. Por isso porta de metal (280–450) e blindada
(500–800+) são ancoradas no mesmo número da madeira.

Para usar mais da pesquisa de campo seria preciso:

- **Por tipo de porta:** passar `porta` junto da `montagem` em `_valorInstalacao` e cadastrar uma
  linha por combinação, com a descrição estendida (`...de embutir em porta de madeira`). O dado
  já é coletado — falta só consultar.
- **Por região:** um de-para de bairro → zona de São Paulo. É o trabalho maior dos dois, porque o
  bairro entra como texto livre.
- **Substituição de fechadura antiga:** hoje não há pergunta no funil que capture isso.

## Referências no código

| O quê | Onde |
|---|---|
| Busca do preço da fechadura (`LIKE` + `ORDER BY`) | `whatsapp-bot-eletrica/index.js:459` |
| Mensagens que citam o valor | `whatsapp-bot-eletrica/index.js:522` e `:546` |
| Busca do gerador de PDF | `whatsapp-bot-eletrica/index.js:954` |
| Catálogo de modelos e montagem | `whatsapp-bot-eletrica/services/fechadura.js:12` |
| Compatibilidade porta × embutir | `whatsapp-bot-eletrica/services/fechadura.js:19` |
| Testes do funil | `whatsapp-bot-eletrica/tests/backend/webhook-fechadura.test.js` |
| Tabela oficial de serviços 2026 | `bot-whatsapp/docs/planilhas/Tabela de Preços.html` |
| Campanha que traz os leads de fechadura | `docs/campanha-fechadura-google-ads.md` |
