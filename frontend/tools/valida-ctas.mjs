// Confere cada CTA de WhatsApp das páginas da fechadura e da automação contra os
// detectores de gatilho DO BOT (monorepo: ../../whatsapp-bot-eletrica). Se um texto
// não bater, o lead cai no menu genérico em vez do funil — foi o bug da Fase 1.
//
// Uso:  npm run build && npm run preview -- --port 4173
//       node tools/valida-ctas.mjs [url]
import { chromium } from 'playwright';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const aqui = path.dirname(fileURLToPath(import.meta.url));

const require_ = createRequire(import.meta.url);
const raiz = path.resolve(aqui, '../../../whatsapp-bot-eletrica/services');
const { detectarGatilhoFechadura } = require_(path.join(raiz, 'fechadura.js'));
const { detectarGatilhoAcessoCorporativo, detectarGatilhoAutomacao } = require_(path.join(raiz, 'gatilhos-site.js'));

/** Um CTA é válido se QUALQUER detector do bot o reconhece. */
function classificar(msg) {
  const f = detectarGatilhoFechadura(msg);
  if (f.match) return `fechadura/${f.intencao}${f.modelo ? ' ' + f.modelo : ''}`;
  if (detectarGatilhoAcessoCorporativo(msg)) return 'acesso-corporativo';
  if (detectarGatilhoAutomacao(msg)) return 'automacao';
  return null;
}

const BASE = process.argv[2] || 'http://localhost:4173';
const PAGINAS = [
  { rota: '/fechadura-digital-sp', ancoras: ['modelos', 'instalacao', 'combo'] },
  { rota: '/automacao', ancoras: [] },
];
const NUMERO_ESPERADO = '5511910773865';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const erros = [];
page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));

let falhas = 0;

for (const { rota, ancoras } of PAGINAS) {
  console.log(`\n########## ${rota} ##########`);
  await page.goto(BASE + rota, { waitUntil: 'networkidle' });

  const links = await page.$$eval('a[href*="wa.me"]', (as) =>
    as.map((a) => ({ href: a.getAttribute('href'), texto: (a.innerText || '').trim().slice(0, 40) }))
  );

  console.log(`\nCTAs de WhatsApp encontrados: ${links.length}\n`);

  for (const { href, texto } of links) {
    const url = new URL(href);
    const numero = url.pathname.replace('/', '');
    const msg = url.searchParams.get('text') || '';
    const destino = classificar(msg);

    const okNumero = numero === NUMERO_ESPERADO;
    const okGatilho = destino !== null;
    if (!okNumero || !okGatilho) falhas++;

    console.log(`${okNumero && okGatilho ? 'OK ' : 'FALHA'} [${texto || '(icone)'}]`);
    console.log(`   numero: ${numero} ${okNumero ? '' : '<< ESPERADO ' + NUMERO_ESPERADO}`);
    console.log(`   msg:    ${msg}`);
    console.log(`   bot:    ${destino || 'NENHUM DETECTOR RECONHECE'}\n`);
  }

  // Âncoras usadas pelos sitelinks do Google Ads. Página sem âncoras (ex.: /automacao)
  // não deve fazer o script falhar por causa disso — a lista simplesmente fica vazia.
  if (ancoras.length > 0) {
    const idsPagina = await page.$$eval('[id]', (els) => els.map((e) => e.id));
    for (const alvo of ancoras) {
      const existe = idsPagina.includes(alvo);
      if (!existe) falhas++;
      console.log(`${existe ? 'OK ' : 'FALHA'} ancora #${alvo}`);
    }
  }

  const nome = rota.replace(/\//g, '') || 'home';
  await page.screenshot({ path: path.join(aqui, `shots/${nome}.png`), fullPage: true });
}

console.log(`\nerros de console: ${erros.length}`);
erros.forEach((e) => console.log('   ' + e));

await browser.close();

const ok = falhas === 0 && erros.length === 0;
console.log(ok ? '\nRESULTADO: OK' : `\nRESULTADO: ${falhas} falha(s)`);
process.exit(ok ? 0 : 1);
