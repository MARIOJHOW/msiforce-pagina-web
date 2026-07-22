const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend/src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix src="img.webp" -> src="/img.webp"
  content = content.replace(/src="([^"\/]+\.(webp|png|jpg|svg))"/g, 'src="/$1"');

  // Fix url('img.webp') -> url('/img.webp')
  content = content.replace(/url\(['"]?([^'"\/]+\.(webp|png|jpg|svg))['"]?\)/g, "url('/$1')");

  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${file}`);
});
