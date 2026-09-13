import { veioDeAds } from './ads';

// Número único do WhatsApp do bot. Mudou? Muda só aqui.
export const NUMERO_WHATSAPP = '5511910773865';

const MENSAGEM_PADRAO = 'Olá, vim pelo site da MSIFORCE e gostaria de atendimento.';

// O bot procura este trecho, normalizado (sem acento/caixa), pra marcar a origem do
// lead como Ads — ver services/texto.js e services/redis.js no repo do bot. Mudar o
// texto aqui exige mudar `MARCADOR_ORIGEM_ADS` lá também.
const SUFIXO_ORIGEM_ADS = ' (vim pelo anúncio no Google)';

/**
 * Monta o link wa.me. O texto pré-preenchido é o que o bot usa para decidir
 * qual funil abrir — ver `services/fechadura.js` no repo do bot. Se esta sessão veio
 * de um clique de Ads (ver `ads.js`), acrescenta o marcador de origem no fim.
 */
export function linkWhatsApp(mensagem) {
  let texto = mensagem || MENSAGEM_PADRAO;
  if (veioDeAds()) {
    texto += SUFIXO_ORIGEM_ADS;
  }
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}
