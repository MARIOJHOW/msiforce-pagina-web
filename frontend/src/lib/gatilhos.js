// ═══════════════════════════════════════════════════
// Frases que o BOT reconhece. Fonte única.
//
// Mudar a redação aqui exige mudar os gatilhos no repo do bot:
//   whatsapp-bot-eletrica/services/fechadura.js     (funil da fechadura)
//   whatsapp-bot-eletrica/services/gatilhos-site.js (acesso e automação)
// Se divergirem, o lead cai no menu genérico em vez do funil — e ninguém
// percebe. `npm run build && node tools/valida-ctas.mjs` checa isso.
// ═══════════════════════════════════════════════════

export const MSG_FECHADURA_COMBO = 'Olá! Vim pela página da Fechadura Digital. Quero mais informações!';

export const MSG_FECHADURA_INSTALACAO =
  'Olá! Eu já tenho uma fechadura digital e gostaria de contratar APENAS o serviço de instalação profissional da MsiForce.';

export const msgFechaduraModelo = (modelo) =>
  `Olá! Gostaria de um orçamento do pacote completo: Fechadura ${modelo} + Instalação MsiForce.`;

// Usada na /automacao: quem clica está na página de automação, então dizer
// "vim pela página da Fechadura Digital" seria incoerente com o que ele viu.
export const MSG_FECHADURA_AUTOMACAO = 'Olá! Quero uma fechadura digital inteligente para minha casa.';

export const MSG_ACESSO_CORPORATIVO = 'Olá! Preciso de controle de acesso para minha empresa ou condomínio.';

export const MSG_AUTOMACAO_PROJETO = 'Olá! Vim pela página de Automação e quero um projeto para minha casa.';

// CTAs da vitrine de planos. A frase "apenas o serviço de instalação" é o que
// GATILHOS_INSTALACAO reconhece em fechadura.js — sem ela o lead cai no menu
// genérico. O nome do plano viaja como texto livre para o atendimento ler; o
// bot não distingue um plano do outro (decisão registrada no spec).
export const msgPlanoInstalacao = (plano) =>
  `Olá! Quero o Plano ${plano} — apenas o serviço de instalação da minha fechadura digital.`;
