const fs = require('fs');
['automacao.html', 'plataforma.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const s = c.indexOf('<style>');
  const e = c.indexOf('</style>');
  if(s > -1 && e > -1) {
    fs.writeFileSync(f.replace('.html', '.css'), c.slice(s+7, e).trim());
    fs.writeFileSync(f, c.slice(0, s) + '<link rel="stylesheet" href="' + f.replace('.html', '.css') + '">' + c.slice(e+8));
  }
});
