// Fonte unica dos metadados dos artigos do blog. O indice (pages/Blog/Blog.jsx)
// e o post (pages/Blog/BlogPost.jsx) leem daqui; o BlogPost so acrescenta o
// corpo em JSX, que nao pode morar neste arquivo porque o prerender importa
// este modulo em Node puro para gerar as rotas.
//
// Ate 17/09/2026 cada um dos dois mantinha a propria lista, e elas divergiram:
// o indice anunciava 5 artigos de infraestrutura cujos ids nao existiam no
// BlogPost, entao os 5 links caiam em "Artigo nao encontrado". Id novo entra
// aqui UMA vez, e o corpo correspondente em BlogPost.jsx.
export const ARTIGOS = [
  {
    id: 'cftv-analogico-vs-ip-custo-real',
    title: 'CFTV analógico vs IP: o custo real de não atualizar as câmeras',
    category: 'Segurança',
    readTime: '5 min',
    image: '/thumb_ghosting.webp',
    excerpt:
      'Câmeras antigas parecem mais baratas — até você calcular furtos não resolvidos, laudos recusados por seguradora e imagens sem resolução para identificar pessoas. Veja a conta real.',
  },
  {
    id: 'quanto-custa-rede-escritorio-50-pessoas',
    title: 'Quanto custa estruturar a rede de um escritório de 50 pessoas em São Paulo?',
    category: 'Infraestrutura',
    readTime: '6 min',
    image: '/thumb_eletricista.webp',
    excerpt:
      'Cabeamento, switches, Wi-Fi corporativo e rack: descubra os itens que fazem o preço variar, o que é essencial e o que é supérfluo para a maioria das empresas.',
  },
  {
    id: 'contrato-manutencao-eletrica-condominio',
    title: 'O que um condomínio deve exigir no contrato de manutenção elétrica',
    category: 'Gestão',
    readTime: '4 min',
    image: '/thumb_bant.webp',
    excerpt:
      'SLA de atendimento, laudo técnico semestral, ART e cobertura de emergência 24h — síndicos experientes sabem o que pedir. Veja o checklist completo antes de assinar.',
  },
  {
    id: 'automacao-predial-quando-investimento-se-paga',
    title: 'Automação predial: quando o investimento realmente se paga?',
    category: 'Tecnologia',
    readTime: '5 min',
    image: '/thumb_crm.webp',
    excerpt:
      'Redução de consumo elétrico, menor turnover de funcionários insatisfeitos com conforto térmico e menos chamados de TI. Calculamos o payback real para escritórios e condomínios.',
  },
  {
    id: 'nr10-na-pratica-o-que-muda-para-sua-empresa',
    title: 'NR-10 na prática: o que muda para a sua empresa',
    category: 'Regulamentação',
    readTime: '4 min',
    image: '/thumb_orcamento.webp',
    excerpt:
      'Não é só obrigação do eletricista — a empresa contratante também é responsável. Entenda o que a norma exige de quem contrata serviços elétricos e como se proteger.',
  },
];

export const ARTIGO_POR_ID = Object.fromEntries(ARTIGOS.map((a) => [a.id, a]));
