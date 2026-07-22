const fs = require('fs');

const files = ['index.html', 'automacao.html', 'plataforma.html'];

const newNav = `
<!-- NAV -->
<nav class="msi-nav">
  <a href="index.html" class="msi-nav-logo">
    <img src="logo.webp" alt="MSIFORCE Logo">
    <span class="msi-nav-name">MSIFORCE</span>
  </a>
  <ul class="msi-nav-links">
    <li><a href="index.html#sobre">Sobre</a></li>
    <li><a href="automacao.html">Automação</a></li>
    <li><a href="plataforma.html">Software CRM</a></li>
    <li><a href="blog/index.html">Blog</a></li>
    <li><a href="index.html#contato">Contato</a></li>
    <li><a href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20solicitar%20um%20atendimento." class="msi-nav-cta">Orçamento</a></li>
  </ul>
</nav>
`;

const newFooter = `
<!-- FOOTER -->
<footer class="msi-footer">
  <div class="msi-f-logo">
    <img src="logo.webp" alt="Logo">
    <span class="msi-f-name">MSIFORCE</span>
  </div>
  <div class="msi-f-copy">© 2025 MSIFORCE — Todos os direitos reservados<br>Elétrica & Segurança Eletrônica · São Paulo, SP</div>
  <div class="msi-f-norms"><span>NR-10</span> · <span>NR-35</span> · <span>ABNT 5410</span></div>
</footer>
`;

const newWa = `
<!-- WA -->
<div class="msi-wa">
  <div class="msi-wa-lbl">Fale Agora!</div>
  <a href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20atendimento." target="_blank" class="msi-wa-b">💬</a>
</div>
`;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  if (!c.includes('components.css')) {
    c = c.replace('</head>', '  <link rel="stylesheet" href="components.css">\n</head>');
  }

  const navStart = c.indexOf('<nav');
  const navEnd = c.indexOf('</nav>') + 6;
  if(navStart > -1 && navEnd > -1) {
    const preNav = c.lastIndexOf('<!-- NAV -->', navStart);
    const start = preNav > -1 && navStart - preNav < 50 ? preNav : navStart;
    c = c.substring(0, start) + newNav + c.substring(navEnd);
  }

  const fStart = c.indexOf('<footer');
  const fEnd = c.indexOf('</footer>') + 9;
  if(fStart > -1 && fEnd > -1) {
    const preF = c.lastIndexOf('<!-- FOOTER -->', fStart);
    const start = preF > -1 && fStart - preF < 50 ? preF : fStart;
    c = c.substring(0, start) + newFooter + c.substring(fEnd);
  }

  const waStart = c.indexOf('<div class="wa"');
  if(waStart > -1) {
    let waEnd = c.indexOf('</div>', waStart); // ends wa-lbl
    waEnd = c.indexOf('</div>', waEnd + 6) + 6; // ends wa div
    const preWa = c.lastIndexOf('<!-- WA -->', waStart);
    const start = preWa > -1 && waStart - preWa < 50 ? preWa : waStart;
    c = c.substring(0, start) + newWa + c.substring(waEnd);
  }

  fs.writeFileSync(f, c);
});
