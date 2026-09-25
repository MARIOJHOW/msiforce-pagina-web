// Avisa o Bing (e os outros buscadores do IndexNow) de que as páginas do site
// mudaram. O ChatGPT busca pelo índice do Bing: página nova só aparece lá depois
// de rastreada, e o IndexNow encurta essa espera.
//
// Uso, DEPOIS que o deploy estiver no ar:  npm run indexnow
// A chave é pública por desenho do protocolo: o arquivo /<chave>.txt precisa
// estar acessível no domínio para o Bing aceitar o aviso.
import { readFileSync } from 'node:fs';

const HOST = 'msiforce.com.br';
const KEY = 'be509ac359458fc0ac89e460396859e9';

const sitemap = readFileSync(new URL('../../sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const resposta = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

// 200/202 = aceito; 403 = chave não encontrada no domínio (deploy ainda não subiu).
console.log(`IndexNow: HTTP ${resposta.status} para ${urlList.length} URLs`);
if (resposta.status >= 300) process.exit(1);
