import sharp from 'sharp';

async function cropImage() {
  try {
    const inputPath = '../frontend/public/parceiro_delta_v2.webp';
    const outputPath = '../frontend/public/parceiro_delta_v3.webp';

    await sharp(inputPath)
      .trim() // Automatically crops away the "boring" background edges
      .toFile(outputPath);

    console.log('Imagem recortada com sucesso!');
  } catch (error) {
    console.error('Erro ao recortar imagem:', error);
  }
}

cropImage();
