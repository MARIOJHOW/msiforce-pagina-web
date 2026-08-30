# Preços de instalação de fechadura digital — mão de obra

> Levantamento de 30/08/2026. **Só mão de obra** — o valor da fechadura nunca é informado
> pelo bot, que responde "confirmo junto com a disponibilidade" por causa do estoque rotativo.
>
> Este arquivo é a base de duas coisas: a **âncora** que o bot cita no WhatsApp e a
> **referência do técnico** para fechar o valor real na visita. Os dois números que estão no
> banco saíram daqui; o resto da matriz não cabe no banco hoje, e é justamente por isso que
> está escrito.

## O que está cadastrado em produção

Tabela `tabela_precos`, tenant `MSIFORCE` (`clientes.id = 4`, instância `api`):

| Descrição | Valor |
|---|---|
| `Instalação de fechadura digital de sobrepor` | R$ 180,00 |
| `Instalação de fechadura digital de embutir` | R$ 280,00 |

**O texto da descrição não é livre.** A busca do bot é
`LOWER(descricao) LIKE '%instala%fechadura%<montagem>%'` (`index.js:459`), e o `LIKE` é
ordenado: "instala" precisa vir antes de "fechadura", que vem antes de "sobrepor"/"embutir".
`Fechadura digital — instalação de sobrepor` **não casa**. Quem for editar, mantenha a ordem.

O `<montagem>` só assume dois valores, vindos do catálogo em `services/fechadura.js`:

| Cliente pede | Modelo | Montagem |
|---|---|---|
| Só senha | FR 102 (alt. FR 10) | `sobrepor` |
| Senha + digital | FR 221 V | `embutir` |
| Completo (digital, senha, app, tag) | MFR 3000 V | `embutir` |

Há um terceiro caminho — quem **já tem** a fechadura e quer só instalar — que busca com
montagem vazia, casa com as duas linhas e devolve a mais barata (`ORDER BY valor_unitario ASC`).

## Matriz completa

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
  Alexa ou Google Home normalmente entram na visita; cobra-se à parte se a infraestrutura for
  complexa.
- **Deslocamento:** regiões centrais e zonas Sul/Oeste tendem a valor um pouco mais alto, ou
  têm taxa de deslocamento/estacionamento embutida no pacote.

## A base por trás dos dois números

Cruzando as duas tabelas pelos baldes que o bot sabe consultar:

| Balde | Piso | Típico (madeira) | Teto |
|---|---|---|---|
| `sobrepor` | **180** | ~215 | 450 (metal) |
| `embutir` | **280** | ~330 | 800+ (blindada) |

Cadastramos o **piso**, não a média, e o bot diz "a partir de". O que sustenta a escolha é que
180 e 280 são, ao mesmo tempo, o piso global e o piso do **caso mais comum** — porta de
madeira, maioria do residencial em São Paulo. Âncora que só fosse verdade num caso raro seria
isca; essa é verdade justamente no cenário mais provável.

Dois pontos frágeis, registrados de propósito:

1. **As duas tabelas discordam no piso do embutir**: por tipo, começa em 300; por porta
   (madeira), em 280. Ficou 280. Se 300 for o número praticado, é só trocar o valor da linha.
2. **O embutir vai quase sempre fechar acima da âncora** — só a madeira comum começa em 280,
   todos os outros cenários começam em 300+. Continua honesto porque é "a partir de", mas é o
   número que mais vai precisar de conversa na visita.

## O que o bot ainda não usa

O funil **coleta** o tipo de porta (`dadosF.porta`: madeira, vidro/blindex, alumínio, ferro) e
o **bairro** (`dadosF.bairro`, texto livre), mas a busca de preço ignora os dois. Por isso a
matriz por porta e o deslocamento não têm como sair daqui e virar preço automático.

Para usar mais desta matriz seria preciso:

- **Por tipo de porta:** passar `porta` junto da `montagem` em `_valorInstalacao` e cadastrar
  uma linha por combinação, com a descrição estendida (`...de embutir em porta de madeira`).
  O dado já é coletado — falta só consultar.
- **Por região:** um de-para de bairro → zona de São Paulo. É o trabalho maior dos dois, porque
  o bairro entra como texto livre.
- **Substituição de fechadura antiga:** hoje não há pergunta no funil que capture isso.

Enquanto nada disso existe, o "a partir de" é o que cobre toda a variação — e é por isso que
nenhum caminho do funil pode voltar a afirmar valor fechado.

## Referências no código

| O quê | Onde |
|---|---|
| Busca do preço (`LIKE` + `ORDER BY`) | `whatsapp-bot-eletrica/index.js:459` |
| Mensagens que citam o valor | `whatsapp-bot-eletrica/index.js:522` e `:546` |
| Catálogo de modelos e montagem | `whatsapp-bot-eletrica/services/fechadura.js:12` |
| Compatibilidade porta × embutir | `whatsapp-bot-eletrica/services/fechadura.js:19` |
| Testes do funil | `whatsapp-bot-eletrica/tests/backend/webhook-fechadura.test.js` |
| Campanha que traz esses leads | `docs/campanha-fechadura-google-ads.md` |
