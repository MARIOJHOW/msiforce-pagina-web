// Copia o build (dist/) para a RAIZ do repo, que e o diretorio que o
// Cloudflare Pages publica. Roda depois do `npm run build`.
//
// Existe porque esse passo era manual e ja falhou em producao: o deploy de
// 18/09/2026 copiou uma lista de pastas escrita a mao (html, assets/,
// servicos/, blog/, admin/) e deixou marcas/ e fechaduras/ para tras — as
// imagens apareciam no preview e davam 404 no dominio. Aqui nao existe lista
// de pastas: copia-se TUDO que o build gerou, e as unicas excecoes sao as
// declaradas em FORA_DO_DEPLOY.
//
// Copia em BINARIO (copyFileSync), nunca lendo/reescrevendo como texto.
// Este clone tem core.autocrlf=true: a copia de trabalho dos arquivos
// rastreados fica com CRLF, inclusive dentro de template literals do bundle.
// No repositorio o git grava LF — e e o repositorio que o Cloudflare publica
// —, entao isso nunca chegou ao ar. Mas comparar/copiar em modo texto aqui
// reintroduziria a conversao em arquivo binario (webp, png) e estragaria o
// que hoje esta correto.
//
// O que ele NAO faz, de proposito:
//   - nao apaga nada da raiz fora de FORA_DO_DEPLOY e do bundle velho em
//     assets/. Arquivo que so existe na raiz (assinatura_email.html, CNAME,
//     robots.txt, sitemap.xml, os .url, docs/, frontend/) fica intocado.
//   - nao mexe no sitemap.xml: ele e escrito a mao. So avisa quando ele e as
//     rotas pre-renderizadas divergem.
//   - nao commita e nao faz deploy. Publicar continua sendo commit + push.
//
// Uso:  node tools/sync-raiz.mjs            aplica
//       node tools/sync-raiz.mjs --dry-run  so mostra o que faria
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const FRONTEND = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(FRONTEND, 'dist');
const RAIZ = dirname(FRONTEND);
const DRY = process.argv.includes('--dry-run') || process.argv.includes('-n');

// Gerados pelo build (estao em public/) mas que NAO vao ao ar. A midia/ saiu
// da raiz no commit c1f724e e esta fora do ar de proposito; o .png e o
// original da imagem que hoje e servida em .webp.
const FORA_DO_DEPLOY = ['midia', 'fechadura_completa.png'];

// HTML do dist que nao e rota indexavel: nao entra na conferencia do sitemap.
// admin/crm.html e casca com noindex; cartao/ e midia/ sao HTML a parte, fora
// do React Router.
const HTML_SEM_SITEMAP = ['404.html', 'admin/crm.html', 'cartao/index.html'];

const SITE = 'https://msiforce.com.br';

function listar(dir, base = '') {
  const saida = [];
  for (const nome of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? posix.join(base, nome.name) : nome.name;
    if (FORA_DO_DEPLOY.includes(rel)) continue;
    if (nome.isDirectory()) saida.push(...listar(join(dir, nome.name), rel));
    else saida.push(rel);
  }
  return saida;
}

const iguais = (a, b) => existsSync(b) && readFileSync(a).equals(readFileSync(b));

// --- guardas: errar o diretorio aqui estraga o site publicado --------------
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html nao existe. Rode `npm run build` antes.');
  process.exit(1);
}
if (!existsSync(join(RAIZ, 'CNAME'))) {
  console.error(`${RAIZ} nao parece a raiz publicada (sem CNAME). Abortado.`);
  process.exit(1);
}

// --- copia dist -> raiz ----------------------------------------------------
const novos = [], atualizados = [];
let inalterados = 0;

for (const rel of listar(DIST)) {
  const origem = join(DIST, rel);
  const destino = join(RAIZ, rel);
  if (iguais(origem, destino)) { inalterados++; continue; }
  const lista = existsSync(destino) ? atualizados : novos;
  lista.push(rel);
  if (!DRY) {
    mkdirSync(dirname(destino), { recursive: true });
    copyFileSync(origem, destino);
  }
}

// --- bundle velho em assets/ ----------------------------------------------
// O nome do bundle carrega hash do conteudo: a cada build muda, e o anterior
// fica na raiz servindo arquivo morto. So o padrao index-<hash>.(js|css) e
// apagado — assets/mapa-neon.png e qualquer outro arquivo que o build nao
// gera ficam onde estao.
const noBuild = new Set(readdirSync(join(DIST, 'assets')));
const apagados = [];
for (const nome of readdirSync(join(RAIZ, 'assets'))) {
  if (noBuild.has(nome)) continue;
  if (!/^index-.*\.(js|css)$/.test(nome)) continue;
  apagados.push(posix.join('assets', nome));
  if (!DRY) rmSync(join(RAIZ, 'assets', nome));
}

// --- o que o build gera mas nao vai ao ar ---------------------------------
for (const rel of FORA_DO_DEPLOY) {
  if (!existsSync(join(RAIZ, rel))) continue;
  apagados.push(rel);
  if (!DRY) rmSync(join(RAIZ, rel), { recursive: true });
}

// --- conferencia do sitemap (so avisa) ------------------------------------
const rotas = listar(DIST)
  .filter((rel) => rel.endsWith('.html') && !HTML_SEM_SITEMAP.includes(rel))
  .map((rel) => (rel === 'index.html' ? `${SITE}/` : `${SITE}/${rel.replace(/\.html$/, '')}`));
const sitemap = readFileSync(join(RAIZ, 'sitemap.xml'), 'utf8');
const noSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const faltamNoSitemap = rotas.filter((u) => !noSitemap.has(u));
const sobramNoSitemap = [...noSitemap].filter((u) => !rotas.includes(u));

// --- relatorio -------------------------------------------------------------
const mostrar = (rotulo, itens) => itens.length && console.log(`\n${rotulo} (${itens.length}):\n  ${itens.join('\n  ')}`);

console.log(DRY ? 'SIMULACAO — nada foi escrito' : `Sincronizado: ${DIST} -> ${RAIZ}`);
mostrar('Novos na raiz', novos);
mostrar('Atualizados', atualizados);
mostrar('Apagados da raiz', apagados);
console.log(`\n${inalterados} arquivo(s) ja iguais.`);

if (faltamNoSitemap.length || sobramNoSitemap.length) {
  mostrar('AVISO — rota pre-renderizada fora do sitemap.xml', faltamNoSitemap);
  mostrar('AVISO — sitemap.xml aponta URL sem arquivo (404 em producao)', sobramNoSitemap);
  console.log('\nO sitemap.xml e escrito a mao. Ajuste antes de commitar.');
} else {
  console.log(`sitemap.xml confere com as ${rotas.length} rotas pre-renderizadas.`);
}
