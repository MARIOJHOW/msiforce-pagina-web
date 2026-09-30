// ═══════════════════════════════════════════════════
// Código de campanha (ref) — atribuição por UTM
// ═══════════════════════════════════════════════════
//
// Todo link de campanha (Instagram, Facebook, Google Meu Negócio, Ads...) leva
// `?utm_source=...&utm_campaign=...`. Daqui sai um código curto, ex.: `meta-fech01`,
// que `linkWhatsApp()` anexa à mensagem como "(ref: meta-fech01)". O bot lê esse trecho
// e grava em `leads.campanha` — ver `extrairRef()` em services/texto.js no repo do bot.
// Mudar o formato aqui exige mudar lá também.

const CHAVE_REF = 'msi_ref';
const MAX_PARTE = 20;

/** minúsculo, sem acento, só [a-z0-9-], sem hífen nas pontas. */
function limpar(valor) {
  return String(valor || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_PARTE)
    .replace(/-+$/g, '');
}

/**
 * Monta o código a partir dos parâmetros da URL: `utm_source-utm_campaign`.
 * Sem `utm_campaign` não há campanha para atribuir → null (só `utm_source` é ambíguo demais).
 */
export function montarRef(params) {
  const campanha = limpar(params.get('utm_campaign'));
  if (!campanha) return null;
  const fonte = limpar(params.get('utm_source'));
  return fonte ? `${fonte}-${campanha}` : campanha;
}

/** Guarda o código da URL atual na sessão: a URL perde o UTM na troca de rota do SPA. */
export function capturarRef() {
  if (typeof window === 'undefined') return;
  const ref = montarRef(new URLSearchParams(window.location.search));
  if (!ref) return;
  try {
    window.sessionStorage.setItem(CHAVE_REF, ref);
  } catch {
    // aba anônima/privacidade restrita: perde só a atribuição das rotas seguintes
  }
}

/**
 * Código de campanha desta sessão, ou null. A URL vem ANTES do sessionStorage pelo mesmo
 * motivo de `veioDeAds()`: o href é montado no render, antes do efeito de captura rodar.
 */
export function refAtual() {
  if (typeof window === 'undefined') return null;
  const daUrl = montarRef(new URLSearchParams(window.location.search));
  if (daUrl) return daUrl;
  try {
    return window.sessionStorage.getItem(CHAVE_REF);
  } catch {
    return null;
  }
}
