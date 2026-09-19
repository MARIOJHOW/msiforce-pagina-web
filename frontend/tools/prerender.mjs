// Gera HTML estático por rota a partir do build de producao (dist/): sobe o
// bundle num preview server, visita cada rota com Playwright e injeta no
// template original (title/meta/canonical do useSEO, JSON-LD do useJsonLd,
// conteudo renderizado do #root — h1 incluido) para gravar em
// dist/<rota>.html. O Cloudflare Pages serve arquivo estatico exato com
// prioridade sobre o fallback de SPA, entao qualquer crawler que nao executa
// JS (auditorias, preview de link, etc.) passa a ver a pagina real em vez da
// casca generica do index.html. Roda depois do `vite build`.
//
// <rota>.html, NAO <rota>/index.html: o Cloudflare Pages 308-redireciona
// pasta/ pra pasta/ com barra no final (canonicalizacao automatica), e as
// URLs ja indexadas pelo Google — e o proprio canonical que o useSEO gera —
// sao sem barra. <rota>.html e servido direto em /<rota>, sem redirect.
//
// NAO usa page.content() (DOM inteiro pos-JS): o head tem GTM/gtag, que
// injetam scripts e disparam beacons de conversao do Google Ads em tempo de
// execucao (nao so tags estaticas) — capturar o DOM ao vivo gravaria esses
// efeitos colaterais (timestamp, referrer "localhost:4173") como HTML
// estatico, servido pra todo visitante real dali em diante. Em vez disso, so
// os valores que o NOSSO codigo gera (useSEO/useJsonLd/conteudo da pagina)
// sao extraidos e inseridos no template pristino; o bootstrap de tracking do
// index.html original fica intocado. As chamadas de rede de tracking tambem
// sao bloqueadas durante o crawl, pra nao mandar pageview/conversao falsa pro
// Google Ads/Analytics a cada `npm run build`.
//
// Uso:  npm run build   (chama este script automaticamente)
//       node tools/prerender.mjs   (roda isolado sobre um dist/ existente)
import { preview } from 'vite';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICOS_DATA } from '../src/data/servicos.js';
import { ARTIGOS } from '../src/data/artigos.js';
import { PORTAS_DATA } from '../src/data/portas.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');

// TODA rota publica do React Router precisa estar aqui. Desde que o deploy tem
// 404.html, o Cloudflare Pages parou de servir o index.html como fallback de
// SPA: o que nao tiver arquivo proprio responde 404 de verdade. /cartao/ e
// /midia/ tem HTML proprio fora do React Router. /v2 fica fora de proposito
// (rascunho) — cai no 404.
const ROTAS = [
  '/',
  '/automacao',
  '/casa-inteligente',
  '/faq',
  '/instalacao-fechadura-digital',
  '/fechadura-airbnb',
  // Derivado de SERVICOS_DATA, nao escrito a mao: slug novo no data ja entra no
  // build sozinho (falta so o sitemap.xml, que e manual). Ate 17/09/2026 essas
  // 4 rotas caiam no fallback e herdavam o canonical da home, entao o Search
  // Console as marcava como "pagina alternativa com tag canonica adequada" e
  // nenhuma era indexada.
  ...Object.keys(SERVICOS_DATA).map((slug) => `/servicos/${slug}`),
  // Paginas por tipo de porta, derivadas de data/portas.js pelo mesmo motivo:
  // porta nova no data ja sai pre-renderizada (o sitemap.xml continua manual).
  ...Object.keys(PORTAS_DATA).map((slug) => `/fechaduras/${slug}`),
  // Blog: o indice e um arquivo por artigo, tudo derivado de data/artigos.js.
  // Artigo novo entra la e ja sai pre-renderizado (falta so o sitemap.xml).
  '/blog',
  ...ARTIGOS.map((a) => `/blog/${a.id}`),
];

const RASTREADORES = /googletagmanager\.com|google-analytics\.com|doubleclick\.net|googleadservices\.com|googlesyndication\.com/;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMetaContent(html, selectorRegex, valor) {
  return selectorRegex.test(html)
    ? html.replace(selectorRegex, (tag) => tag.replace(/content="[^"]*"/, `content="${escapeAttr(valor)}"`))
    : html;
}

// dist/index.html pristino (o `vite build` acabou de gerar, emptyOutDir
// limpou o que havia antes) — usado como base para TODAS as rotas, lido uma
// unica vez antes de qualquer escrita.
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const server = await preview({ root: ROOT, preview: { port: 4173, strictPort: false } });
const url = server.resolvedUrls.local[0].replace(/\/$/, '');

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.route('**/*', (route) => {
    const alvo = route.request().url();
    if (RASTREADORES.test(alvo)) return route.abort();
    return route.continue();
  });

  for (const rota of ROTAS) {
    await page.goto(`${url}${rota}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('h1', { timeout: 10000 });
    // A entrada do hero anima com Framer Motion (opacity 0 -> 1, ate 0.8s) —
    // sem esperar o fim, o h1 e capturado a meio caminho (opacity baixa,
    // translateY residual). So espera essa transicao, nao as de whileInView
    // abaixo da dobra (essas ficam "nao disparadas ainda", como aconteceria
    // numa visita real sem rolar a pagina).
    await page.waitForFunction(() => {
      const h1 = document.querySelector('h1');
      return h1 && getComputedStyle(h1).opacity === '1';
    }, { timeout: 5000 }).catch(() => {});
    // h1 e so o 2o item do stagger (depois do eyebrow) — os itens seguintes
    // (paragrafo, CTAs, badges) ainda estao a meio caminho quando o h1
    // termina, porque cada um comeca staggerChildren depois do anterior e
    // ainda leva a propria duration inteira pra concluir. Sem esperar por
    // eles, o snapshot pegava o bloco de botoes do hero em opacity quase 0
    // (congelado assim pro visitante ate o React montar e re-animar por
    // cima) — bug achado em 10/09/2026 com o dono vendo o site "tremer" no
    // hover: eram duas rendericoes sobrepostas, a estatica presa a meio
    // caminho e a do React entrando de novo. 900ms cobre o pior caso (~6
    // itens em stagger de 0.15s + duration de 1s) em todas as rotas.
    await page.waitForTimeout(900);

    const dados = await page.evaluate(() => {
      const conteudo = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
      return {
        title: document.title,
        description: conteudo('meta[name="description"]'),
        ogTitle: conteudo('meta[property="og:title"]'),
        ogDescription: conteudo('meta[property="og:description"]'),
        canonicalHtml: document.querySelector('link[rel="canonical"]')?.outerHTML ?? null,
        jsonLdHtml: [...document.querySelectorAll('script[data-schema-key]')].map((el) => el.outerHTML),
        rootHtml: document.getElementById('root').innerHTML,
      };
    });

    let out = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(dados.title)}</title>`);
    if (dados.description) {
      out = setMetaContent(out, /<meta name="description" content="[^"]*"\s*\/?>/, dados.description);
    }
    if (dados.ogTitle) {
      out = setMetaContent(out, /<meta property="og:title" content="[^"]*"\s*\/?>/, dados.ogTitle);
    }
    if (dados.ogDescription) {
      out = setMetaContent(out, /<meta property="og:description" content="[^"]*"\s*\/?>/, dados.ogDescription);
    }

    const extras = [dados.canonicalHtml, ...dados.jsonLdHtml].filter(Boolean);
    if (extras.length) {
      out = out.replace('</head>', `    ${extras.join('\n    ')}\n  </head>`);
    }

    out = out.replace('<div id="root"></div>', `<div id="root">${dados.rootHtml}</div>`);

    const outFile = rota === '/' ? join(DIST, 'index.html') : join(DIST, `${rota.slice(1)}.html`);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, out);
    console.log(`OK  ${rota}  ->  dist${rota === '/' ? '/index.html' : `/${rota.slice(1)}.html`}`);
  }
} finally {
  await browser.close();
  await server.close();
}

// /admin/crm fica fora do loop: e painel privado atras de login, nao tem
// conteudo publico pra pre-renderizar (e prerenderizar gravaria a tela de login
// como HTML estatico). Mas PRECISA de arquivo proprio — sem o fallback de SPA,
// que o 404.html desligou, o painel responderia 404. Grava so a casca; o React
// monta o CRM no cliente. O noindex e cinto e suspensorio junto do
// `Disallow: /admin/` do robots.txt.
const shellAdmin = template
  .replace(/<title>[^<]*<\/title>/, '<title>Painel MSIFORCE</title>')
  .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, nofollow" />');
mkdirSync(join(DIST, 'admin'), { recursive: true });
writeFileSync(join(DIST, 'admin', 'crm.html'), shellAdmin);
console.log('OK  /admin/crm  ->  dist/admin/crm.html  (casca, noindex)');
