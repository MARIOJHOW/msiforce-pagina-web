// Perguntas frequentes. Fonte única: a página /faq renderiza a lista e também
// deriva dela o JSON-LD de FAQPage. Se divergirem, o Google indexa uma coisa e
// o visitante lê outra — por isso o schema é gerado daqui, não escrito à mão.
import { PRECO_MINIMO } from '../pages/CasaInteligente/dados';

export const FAQS = [
  // As 3 primeiras respondem "quem atende aqui?": é a pergunta que as pessoas (e os
  // assistentes de IA) fazem antes de indicar alguém. Base: Itaquera (dono, 24/09/2026).
  {
    q: 'Onde fica a MSIFORCE e quais regiões vocês atendem?',
    a: 'A MSIFORCE tem base em Itaquera, na zona leste de São Paulo. Atendemos toda a zona leste — Itaquera, Guaianases, São Mateus, Tatuapé, Penha, Vila Matilde, São Miguel Paulista e bairros vizinhos — e Guarulhos. O restante da capital e da região metropolitana também é atendido, com o deslocamento combinado no orçamento.',
  },
  {
    q: 'Quem instala fechadura digital na zona leste de São Paulo e em Guarulhos?',
    a: `A MSIFORCE instala fechadura digital de sobrepor e de embutir em portas de madeira, alumínio e vidro, com técnico em eletrônica cadastrado no CFT e representante autorizado EZVIZ, EKAZA e Nova Digital. A mão de obra sai a partir de R$ ${PRECO_MINIMO} e o orçamento é gratuito pelo WhatsApp (11) 91077-3865.`,
  },
  {
    q: 'A MSIFORCE também faz serviço de eletricista na zona leste?',
    a: 'Sim. Além de fechadura digital, fazemos instalação e manutenção elétrica, quadros de distribuição, câmeras (CFTV), redes e automação para residências, condomínios e empresas da zona leste e de Guarulhos. Atendimento todos os dias, das 7h às 21h, pelo WhatsApp.',
  },
  {
    q: 'Vocês atendem contratos recorrentes de manutenção?',
    a: 'Sim. Oferecemos contratos mensais e anuais com SLA definido, visitas preventivas programadas e relatórios técnicos. Ideal para empresas que precisam de operação contínua sem imprevistos.',
  },
  {
    q: 'Como funciona o processo de orçamento para empresas?',
    a: 'Agendamos uma visita técnica gratuita para orçamento. Visita emergencial e análise de defeito são cobradas à parte. O projeto e orçamento detalhado são entregues em até 3 dias úteis, com escopo e cronograma definidos.',
  },
  {
    q: 'A MSIFORCE atende múltiplas unidades ou filiais?',
    a: 'Sim. Atendemos redes de franquias e empresas com múltiplas filiais, com projeto padronizado e execução coordenada para garantir consistência entre as unidades.',
  },
  {
    q: 'Os projetos elétricos têm ART (Anotação de Responsabilidade Técnica)?',
    a: 'Sim. Emitimos ART para todos os projetos elétricos conforme exigência do CREA, além de laudo técnico e documentação completa da instalação.',
  },
  {
    q: 'Qual a garantia dos serviços instalados?',
    a: 'Todos os serviços têm garantia mínima de 12 meses com laudo técnico. Clientes com contrato de manutenção têm suporte prioritário durante toda a vigência.',
  },
  {
    q: 'Como é o suporte técnico após a instalação?',
    a: 'Atendimento remoto em até 2h e visita presencial em até 24h para clientes com contrato ativo. Para projetos pontuais, suporte disponível em horário comercial.',
  },
];
