import { registrarConversaoWhatsApp, veioDeAds } from './ads';
import { trackCTA } from '../hooks/useAnalytics';

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

/**
 * Um clique de WhatsApp precisa ser contado nos DOIS lugares, e ate agora nenhum
 * ponto do site contava nos dois: o `trackCTA` (dataLayer -> GTM -> GA4) existia so
 * na Home e em Servico, e a conversao do Ads (gtag) so no WhatsAppButton. O CTA
 * principal do hero mandava evento pro GA4 sem disparar conversao no Ads, e a landing
 * de fechadura digital -- a que recebe o trafego pago -- nao reportava para nenhum.
 *
 * Chamar este helper no onClick e a forma unica de registrar o clique. Nao chame
 * `registrarConversaoWhatsApp` direto num link novo: e assim que os dois sistemas
 * voltam a divergir.
 *
 * Nao importe os eventos-chave do GA4 como conversao no Google Ads: a conversao do
 * Ads ja e disparada aqui, e importar criaria uma segunda contando o mesmo clique.
 */
export function registrarCliqueWhatsApp(label) {
  trackCTA(label, 'whatsapp');
  registrarConversaoWhatsApp();
}
