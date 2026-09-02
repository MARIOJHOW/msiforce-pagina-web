// Recorta as fechaduras das artes de campanha (pasta do dono, fora do repo) e
// gera WebP otimizado em public/. Uso pontual; rodar de novo se a arte mudar.
//
//   node tools/recorta-ofertas.mjs
//
// Gera também tools/shots/prancha-ofertas.png com os recortes lado a lado, para
// conferir o enquadramento sem abrir cinco imagens.
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const ORIGEM = 'D:/Users/jhowu/Documents/doc empresa/campanha fechadura/';
const DESTINO = path.resolve(aqui, '../public');

// left/top/width/height em pixels da arte original.
// Bordas ajustadas para não vazar o texto laranja das artes (logo, "DIGITAIS",
// "CHAVES!", caixas de recurso à direita).
const RECORTES = [
  { arquivo: 'fechadura.png', saida: 'fechadura-hero.webp', crop: { left: 770, top: 250, width: 484, height: 880 }, largura: 720 },
  { arquivo: 'WhatsApp Image 2026-09-02 at 10.39.30.jpeg', saida: 'oferta-fr102.webp', crop: { left: 575, top: 130, width: 449, height: 650 }, largura: 600 },
  { arquivo: 'embutir 650.png', saida: 'oferta-fr201v.webp', crop: { left: 355, top: 170, width: 285, height: 680 }, largura: 600 },
  { arquivo: 'embutir 800 stand.png', saida: 'oferta-papaiz-fitlock.webp', crop: { left: 455, top: 20, width: 300, height: 600 }, largura: 600 },
];

const miniaturas = [];
for (const r of RECORTES) {
  const buf = await sharp(ORIGEM + r.arquivo)
    .extract(r.crop)
    .resize({ width: r.largura, withoutEnlargement: true })
    .toBuffer();
  const info = await sharp(buf).webp({ quality: 82 }).toFile(path.join(DESTINO, r.saida));
  console.log(`${r.saida.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  miniaturas.push(await sharp(buf).resize({ height: 420 }).png().toBuffer());
}

// Kit MFD 2020 D + HUB: na arte o selo de preço encosta no hub, então não há
// recorte retangular que pegue fechadura e hub sem o preço. Recorta os dois
// separados e monta lado a lado num fundo escuro.
{
  const arte = ORIGEM + 'sobrepor 900 + hub.png';
  const fechadura = await sharp(arte).extract({ left: 495, top: 95, width: 195, height: 435 }).resize({ height: 440 }).toBuffer();
  const hub = await sharp(arte).extract({ left: 712, top: 290, width: 228, height: 262 }).resize({ height: 300 }).toBuffer();
  const [mf, mh] = await Promise.all([sharp(fechadura).metadata(), sharp(hub).metadata()]);
  const largura = 600;
  const altura = 480;
  const gap = 24;
  const x0 = Math.round((largura - (mf.width + gap + mh.width)) / 2);
  const buf = await sharp({ create: { width: largura, height: altura, channels: 3, background: '#0b0b0b' } })
    .composite([
      { input: fechadura, left: x0, top: Math.round((altura - mf.height) / 2) },
      { input: hub, left: x0 + mf.width + gap, top: Math.round((altura - mh.height) / 2) },
    ])
    .png()
    .toBuffer();
  const info = await sharp(buf).webp({ quality: 82 }).toFile(path.join(DESTINO, 'oferta-mfd2020-hub.webp'));
  console.log(`${'oferta-mfd2020-hub.webp'.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  miniaturas.push(await sharp(buf).resize({ height: 420 }).png().toBuffer());
}

// Prancha: todas as miniaturas lado a lado, altura fixa.
const metas = await Promise.all(miniaturas.map((b) => sharp(b).metadata()));
const larguraTotal = metas.reduce((s, m) => s + m.width + 16, 16);
let x = 16;
const composicao = metas.map((m, i) => {
  const item = { input: miniaturas[i], left: x, top: 16 };
  x += m.width + 16;
  return item;
});
await sharp({ create: { width: larguraTotal, height: 452, channels: 3, background: '#222' } })
  .composite(composicao)
  .png()
  .toFile(path.join(aqui, 'shots/prancha-ofertas.png'));
console.log('prancha: tools/shots/prancha-ofertas.png');
