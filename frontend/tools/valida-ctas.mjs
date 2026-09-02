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
// Todas as rotas do SPA que expõem CTA de WhatsApp (ver src/App.jsx). Cobrir só
// as landings deixou passar por meses os CTAs de /servicos/*: a página de
// automação do catálogo não acionava o funil que o bot já tinha.
const PAGINAS = [
  { rota: '/casa-inteligente', ancoras: ['modelos', 'instalacao', 'combo'] },
  { rota: '/automacao', ancoras: [] },
  { rota: '/', ancoras: [] },
  { rota: '/blog', ancoras: [] },
  { rota: '/faq', ancoras: [] },
  { rota: '/instalacao-fechadura-digital', ancoras: [] },
  { rota: '/fechadura-airbnb', ancoras: [] },
  { rota: '/servicos/eletrica', ancoras: [] },
  { rota: '/servicos/automacao', ancoras: [] },
  { rota: '/servicos/cftv', ancoras: [] },
  { rota: '/servicos/redes-ti', ancoras: [] },
];

// Rotas cujos CTAs próprios são institucionais e não têm funil no bot: cair no
// menu principal é o comportamento correto, então não contam como falha.
const SEM_FUNIL_PROPRIO = new Set(['/', '/blog', '/faq', '/servicos/eletrica', '/servicos/cftv', '/servicos/redes-ti']);
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

  // `herdado` = true quando o CTA vem do layout compartilhado do V1Layout
  // (Navbar `nav.msi-nav` + drawer mobile `.msi-drawer`, Footer `footer.msi-footer`,
  // ou o balão flutuante `.msi-wa` renderizado por ele) em vez do conteúdo próprio
  // da rota. Checagem no DOM, não lista fixa de mensagens — lista fixa envelhece
  // em silêncio.
  //
  // `.msi-wa` sozinho NÃO basta: a /casa-inteligente reusa o MESMO componente
  // flutuante para um CTA próprio, com a mensagem da campanha (ver
  // `src/pages/CasaInteligente/CasaInteligente.jsx`, `<WhatsAppButton message=...>`).
  // Dois filtros, porque um só não cobre os dois cenários que já aconteceram:
  //   1. `layoutV1Ativo` — numa rota fora do V1Layout (sem `nav.msi-nav` e sem
  //      `footer.msi-footer`) o balão nunca é herdado, pois não há layout que o
  //      renderize. Era o caso da landing antes de ela ganhar navbar e rodapé.
  //   2. `[data-campanha]` — agora que a landing TEM navbar e rodapé, o filtro 1
  //      passou a classificar o CTA da campanha como herdado e o validador parou
  //      de conferir seu gatilho. O `WhatsAppButton` marca o wrapper com
  //      `data-campanha` sempre que recebe `message` próprio; o balão genérico do
  //      `App.jsx` é renderizado sem `message` e continua sem a marca.
  const links = await page.$$eval('a[href*="wa.me"]', (as) => {
    const layoutV1Ativo =
      document.querySelector('nav.msi-nav') !== null &&
      document.querySelector('footer.msi-footer') !== null;
    return as.map((a) => ({
      href: a.getAttribute('href'),
      texto: (a.innerText || '').trim().slice(0, 40),
      herdado:
        a.closest('nav.msi-nav, footer.msi-footer, .msi-drawer') !== null ||
        (layoutV1Ativo &&
          a.closest('.msi-wa') !== null &&
          a.closest('.msi-wa[data-campanha]') === null),
    }));
  });

  const proprios = links.filter((l) => !l.herdado);
  const herdados = links.filter((l) => l.herdado);

  console.log(`\nCTAs de WhatsApp encontrados: ${links.length} (${proprios.length} próprios da página + ${herdados.length} herdados do layout)\n`);

  console.log(`-- Próprios da página: têm de bater com algum detector do bot --\n`);
  for (const { href, texto } of proprios) {
    const url = new URL(href);
    const numero = url.pathname.replace('/', '');
    const msg = url.searchParams.get('text') || '';
    const destino = classificar(msg);

    const okNumero = numero === NUMERO_ESPERADO;
    const institucional = SEM_FUNIL_PROPRIO.has(rota);
    // o número errado é falha em qualquer rota; o gatilho só onde há funil
    const okGatilho = destino !== null || institucional;
    if (!okNumero || !okGatilho) falhas++;

    console.log(`${okNumero && okGatilho ? 'OK ' : 'FALHA'} [${texto || '(icone)'}]`);
    console.log(`   numero: ${numero} ${okNumero ? '' : '<< ESPERADO ' + NUMERO_ESPERADO}`);
    console.log(`   msg:    ${msg}`);
    console.log(`   bot:    ${destino || 'NENHUM DETECTOR RECONHECE'}\n`);
  }

  // Herdados (nav/footer/balão flutuante): existem em todas as páginas do site
  // institucional e sempre levaram ao menu principal do bot por design — não são
  // regressão desta página. Reportados como INFO para não sumir da visibilidade,
  // mas não contam como falha nem derrubam o exit code.
  if (herdados.length > 0) {
    console.log(`-- Herdados do layout compartilhado (nav/footer/balão flutuante): informativo, não conta como falha --\n`);
    for (const { href, texto } of herdados) {
      const url = new URL(href);
      const msg = url.searchParams.get('text') || '';
      const destino = classificar(msg);

      console.log(`INFO [${texto || '(icone)'}]`);
      console.log(`   msg: ${msg}`);
      console.log(`   bot: ${destino || 'NENHUM DETECTOR RECONHECE (cai no menu principal do bot, por design)'}\n`);
    }
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
