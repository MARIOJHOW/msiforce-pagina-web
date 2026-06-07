const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Let's attempt to fix the double UTF-8 encoding (Windows-1252 to UTF-8 corruption)
try {
    let buf = Buffer.from(content, 'latin1');
    let fixed = buf.toString('utf8');
    if (fixed.includes('MSIFORCE') && !fixed.includes('Ã')) {
        content = fixed;
    }
} catch(e) {}

// Manual replacements just in case buffer conversion misses something
const replacements = {
    'Ã§': 'ç', 'Ã£': 'ã', 'Ã¡': 'á', 'Ã©': 'é', 'Ã³': 'ó', 'Ãª': 'ê', 'Ã': 'í', 
    'Ãµ': 'õ', 'Ã¢': 'â', 'Ã´': 'ô', 'Ã¼': 'ü', 'Ãº': 'ú', 'Ã‡': 'Ç', 'Ãƒ': 'Ã', 
    'Ã‰': 'É', 'Ã“': 'Ó', 'â€”': '—', 'â€œ': '"', 'â€': '"', 'ðŸ’¬': '💬', 'ðŸ“±': '📱', 'âœ‰ï¸': '✉️'
};

for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
}

// Extract the giant SVG
const svgRegex = /<svg[\s\S]*?<\/svg>/;
const match = content.match(svgRegex);
if(match) {
    fs.writeFileSync('logo.svg', match[0], 'utf8');
    content = content.replace(svgRegex, '<img src="logo.svg" style="height:52px; width:auto;" alt="MSIFORCE">');
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed and extracted SVG successfully');
