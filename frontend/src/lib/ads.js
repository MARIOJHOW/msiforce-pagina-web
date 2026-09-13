// ═══════════════════════════════════════════════════
// Google Ads — conversão de clique no WhatsApp
// ═══════════════════════════════════════════════════
//
// FASE 2: preencha as duas constantes abaixo com os valores da ação de conversão
// criada em Ads → Ferramentas → Conversões (ver docs/campanha-fechadura-google-ads.md).
//
// Enquanto estiverem vazias nada é carregado e nada é disparado — a página funciona
// normalmente, só não reporta conversão. Não existe estado quebrado no meio.

export const ADS_CONVERSION_ID = 'AW-18144467371';
export const ADS_CONVERSION_LABEL = 'o9lQCJG_zNscEKuz-stD';

const CHAVE_ORIGEM_ADS = 'msi_ads_hit';

let carregando = false;

/**
 * Injeta o gtag.js sob demanda. Evita deixar script de terceiro no index.html
 * antes de existir um ID válido — e faz a tag entrar no ar assim que o ID for preenchido.
 */
function garantirGtag() {
  if (typeof window === 'undefined' || !ADS_CONVERSION_ID) return;
  if (carregando || typeof window.gtag === 'function') return;
  carregando = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_CONVERSION_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', ADS_CONVERSION_ID);
}

/**
 * Google Ads anexa `gclid` na URL de todo clique de anúncio (auto-tagging, ligado por
 * padrão) — não depende de configurar nada na campanha.
 */
function urlVeioDeAds() {
  const params = new URLSearchParams(window.location.search);
  return (
    params.has('gclid') ||
    (params.get('utm_source') === 'google' && params.get('utm_medium') === 'cpc')
  );
}

/**
 * Persiste a origem em sessionStorage: o `gclid` some da URL na troca de rota do SPA,
 * mas o cliente pode navegar por outras páginas do site antes de clicar no WhatsApp.
 */
export function capturarOrigemAds() {
  if (typeof window === 'undefined') return;

  try {
    if (urlVeioDeAds()) {
      window.sessionStorage.setItem(CHAVE_ORIGEM_ADS, '1');
    }
  } catch {
    // sessionStorage falha em aba anônima/privacidade restrita — perde só a atribuição
    // das rotas seguintes; a pageview atual ainda é reconhecida pela URL.
  }
}

/**
 * true se esta sessão veio de um clique de Ads. A URL é consultada ANTES do
 * sessionStorage porque `linkWhatsApp()` monta o href durante o render, antes de
 * `iniciarAds()` rodar no efeito — na primeira pageview, a que vem do anúncio, só a
 * URL carrega a informação.
 */
export function veioDeAds() {
  if (typeof window === 'undefined') return false;
  if (urlVeioDeAds()) return true;
  try {
    return window.sessionStorage.getItem(CHAVE_ORIGEM_ADS) === '1';
  } catch {
    return false;
  }
}

/** Chame no carregamento das páginas que recebem tráfego pago. */
export function iniciarAds() {
  garantirGtag();
  capturarOrigemAds();
}

/** Dispara a conversão de contato via WhatsApp. Silencioso se não estiver configurado. */
export function registrarConversaoWhatsApp() {
  if (!ADS_CONVERSION_ID || !ADS_CONVERSION_LABEL) return;
  garantirGtag();
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${ADS_CONVERSION_ID}/${ADS_CONVERSION_LABEL}`,
    value: 1.0,
    currency: 'BRL'
  });
}
