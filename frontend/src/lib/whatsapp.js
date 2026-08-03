// Número único do WhatsApp do bot. Mudou? Muda só aqui.
export const NUMERO_WHATSAPP = '5511910773865';

const MENSAGEM_PADRAO = 'Olá, vim pelo site da MSIFORCE e gostaria de atendimento.';

/**
 * Monta o link wa.me. O texto pré-preenchido é o que o bot usa para decidir
 * qual funil abrir — ver `services/fechadura.js` no repo do bot.
 */
export function linkWhatsApp(mensagem) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem || MENSAGEM_PADRAO)}`;
}
