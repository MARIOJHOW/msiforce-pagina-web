// Perguntas frequentes. Fonte única: a página /faq renderiza a lista e também
// deriva dela o JSON-LD de FAQPage. Se divergirem, o Google indexa uma coisa e
// o visitante lê outra — por isso o schema é gerado daqui, não escrito à mão.
export const FAQS = [
  {
    q: 'Vocês atendem contratos recorrentes de manutenção?',
    a: 'Sim. Oferecemos contratos mensais e anuais com SLA definido, visitas preventivas programadas e relatórios técnicos. Ideal para empresas que precisam de operação contínua sem imprevistos.',
  },
  {
    q: 'Como funciona o processo de orçamento para empresas?',
    a: 'Agendamos uma visita técnica gratuita para diagnóstico. O projeto e orçamento detalhado são entregues em até 3 dias úteis, com escopo e cronograma definidos.',
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
