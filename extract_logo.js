const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const prefix = 'data:image/png;base64,';
const startIdx = html.indexOf(prefix);
if (startIdx !== -1) {
    const endIdx = html.indexOf('"', startIdx);
    if (endIdx !== -1) {
        const fullBase64Str = html.substring(startIdx, endIdx);
        const data = fullBase64Str.replace(prefix, '');
        fs.writeFileSync('logo.png', data, 'base64');
        const newHtml = html.replace(fullBase64Str, 'logo.png');
        fs.writeFileSync('index.html', newHtml, 'utf8');
        console.log('Successfully extracted logo');
    }
} else {
    console.log('Could not find base64 image');
}
