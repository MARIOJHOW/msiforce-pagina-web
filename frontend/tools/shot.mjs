// Screenshot reutilizável do site em dev — substitui os heredocs Playwright descartáveis.
// Uso:  node tools/shot.mjs <rota> [nome] [porta]
//   node tools/shot.mjs /            home
//   node tools/shot.mjs /servicos    serv     5173
// Salva em tools/shots/<nome>.png (full page). Suba o dev server antes: npm run dev
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const [route = '/', name = 'shot', port = '5173'] = process.argv.slice(2);
const outDir = join(dirname(fileURLToPath(import.meta.url)), 'shots');
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${name}.png`);
const url = `http://localhost:${port}${route}`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: outFile, fullPage: true });
  console.log(`OK  ${url}  ->  ${outFile}`);
} catch (e) {
  console.error(`FALHOU  ${url}: ${e.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
