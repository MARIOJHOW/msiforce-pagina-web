// Converte fotos reais de fechadura (fundo branco, padrão de catálogo Intelbras)
// para fundo preto, batendo com o tema escuro do site. Sem isso, a foto aparece
// como um retângulo branco chapado dentro do card escuro.
//
// Fundo removido por luminância, não por chroma-key de cor: funciona em
// qualquer foto de produto em fundo branco/cinza-claro uniforme, não só nessas
// 4. Pixel bem claro (L >= 250) vira preto puro; entre 200 e 250 o pixel é
// misturado com preto proporcionalmente, pra não deixar halo serrilhado na
// borda do produto; abaixo de 200 (o próprio produto) fica intocado.
//
// Fonte: fotos reais que o dono tirou/baixou do catálogo, salvas em
// "Documents/doc empresa/campanha fechadura" (fora do repo).
//
// Uso: node tools/prepara-fotos-reais.mjs
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const ORIGEM = 'D:/Users/jhowu/Documents/doc empresa/campanha fechadura/';
const PUBLIC = path.join(aqui, '..', 'public');

const JOBS = [
  { origem: 'fechadura_custo_3d.webp', destino: 'fechadura_custo_3d.webp' },
  { origem: 'fechadura_inter_3d.webp', destino: 'fechadura_inter_3d.webp' },
  { origem: 'echadura_design_3d.webp', destino: 'fechadura_design_3d.webp' },
  { origem: 'echadura_premium_3d.webp', destino: 'fechadura_premium_3d.webp' },
];

const LIMIAR_ALTO = 250; // acima disso: fundo, vira preto puro
const LIMIAR_BAIXO = 200; // abaixo disso: produto, fica como está

function removeFundoBranco(buffer, info) {
  const { width, height, channels } = info;
  const out = Buffer.from(buffer); // cópia — não mexe no original
  for (let i = 0; i < width * height; i++) {
    const p = i * channels;
    const r = buffer[p], g = buffer[p + 1], b = buffer[p + 2];
    const l = (r + g + b) / 3;
    let t = 0;
    if (l >= LIMIAR_ALTO) t = 1;
    else if (l > LIMIAR_BAIXO) t = (l - LIMIAR_BAIXO) / (LIMIAR_ALTO - LIMIAR_BAIXO);
    if (t > 0) {
      out[p] = Math.round(r * (1 - t));
      out[p + 1] = Math.round(g * (1 - t));
      out[p + 2] = Math.round(b * (1 - t));
    }
  }
  return out;
}

for (const { origem, destino } of JOBS) {
  const caminho = ORIGEM + origem;
  const img = sharp(caminho);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const tratado = removeFundoBranco(data, info);
  await sharp(tratado, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .webp({ quality: 90 })
    .toFile(path.join(PUBLIC, destino));
  console.log('ok', origem, '->', destino);
}
