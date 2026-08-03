// Confere cada CTA de WhatsApp da landing da fechadura contra o detector de
// gatilhos DO BOT (monorepo: ../../whatsapp-bot-eletrica). Se um texto não bater,
// o lead cai no menu genérico em vez do funil — foi o bug da Fase 1.
//
// Uso:  npm run build && npm run preview -- --port 4173
//       node tools/valida-ctas.mjs [url]
import { chromium } from 'playwright';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const servicoBot = path.resolve(aqui, '../../../whatsapp-bot-eletrica/services/fechadura.js');
const { detectarGatilhoFechadura } = createRequire(import.meta.url)(servicoBot);

const URL_LANDING = process.argv[2] || 'http://localhost:4173/fechadura-digital-sp';
const NUMERO_ESPERADO = '5511910773865';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const erros = [];
page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));

await page.goto(URL_LANDING, { waitUntil: 'networkidle' });

const links = await page.$$eval('a[href*="wa.me"]', (as) =>
  as.map((a) => ({ href: a.getAttribute('href'), texto: (a.innerText || '').trim().slice(0, 40) }))
);

console.log(`\nCTAs de WhatsApp encontrados: ${links.length}\n`);

let falhas = 0;
for (const { href, texto } of links) {
  const url = new URL(href);
  const numero = url.pathname.replace('/', '');
  const msg = url.searchParams.get('text') || '';
  const g = detectarGatilhoFechadura(msg);

  const okNumero = numero === NUMERO_ESPERADO;
  const okGatilho = g.match;
  if (!okNumero || !okGatilho) falhas++;

  console.log(`${okNumero && okGatilho ? 'OK ' : 'FALHA'} [${texto || '(icone)'}]`);
  console.log(`   numero: ${numero} ${okNumero ? '' : '<< ESPERADO ' + NUMERO_ESPERADO}`);
  console.log(`   msg:    ${msg}`);
  console.log(`   bot:    match=${g.match} intencao=${g.intencao} modelo=${g.modelo || '-'}\n`);
}

// Âncoras usadas pelos sitelinks do Google Ads
const ancoras = await page.$$eval('[id]', (els) => els.map((e) => e.id));
for (const alvo of ['modelos', 'instalacao', 'combo']) {
  const existe = ancoras.includes(alvo);
  if (!existe) falhas++;
  console.log(`${existe ? 'OK ' : 'FALHA'} ancora #${alvo}`);
}

console.log(`\nerros de console: ${erros.length}`);
erros.forEach((e) => console.log('   ' + e));

await page.screenshot({ path: path.join(aqui, 'shots/fechadura-landing.png'), fullPage: true });
await browser.close();

const ok = falhas === 0 && erros.length === 0;
console.log(ok ? '\nRESULTADO: OK' : `\nRESULTADO: ${falhas} falha(s)`);
process.exit(ok ? 0 : 1);
