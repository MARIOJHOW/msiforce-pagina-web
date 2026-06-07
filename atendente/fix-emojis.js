const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// I know the context around the broken emojis. Let's replace them based on surrounding text.

const fixes = [
  { search: /<span class="pain-icon">.*?<\/span>\s*<h3>Resposta lenta/g, replace: '<span class="pain-icon">⏳</span>\n      <h3>Resposta lenta' },
  { search: /<span class="pain-icon">.*?<\/span>\s*<h3>Fora do horário/g, replace: '<span class="pain-icon">🌙</span>\n      <h3>Fora do horário' },
  { search: /<span class="pain-icon">.*?<\/span>\s*<h3>Perguntas repetitivas/g, replace: '<span class="pain-icon">🔄</span>\n      <h3>Perguntas repetitivas' },
  { search: /<span class="pain-icon">.*?<\/span>\s*<h3>Prejuízo invisível/g, replace: '<span class="pain-icon">📉</span>\n      <h3>Prejuízo invisível' },

  { search: /<span class="pillar-icon">.*?<\/span>\s*<h3>Atendimento 24h/g, replace: '<span class="pillar-icon">🤖</span>\n      <h3>Atendimento 24h' },
  { search: /<span class="pillar-icon">.*?<\/span>\s*<h3>Menu Inteligente/g, replace: '<span class="pillar-icon">📋</span>\n      <h3>Menu Inteligente' },
  { search: /<span class="pillar-icon">.*?<\/span>\s*<h3>Qualificação Automática/g, replace: '<span class="pillar-icon">🔍</span>\n      <h3>Qualificação Automática' },
  { search: /<span class="pillar-icon">.*?<\/span>\s*<h3>Filtro de Ouro/g, replace: '<span class="pillar-icon">🎯</span>\n      <h3>Filtro de Ouro' },

  { search: /<div class="ph-avatar">.*?<\/div>/g, replace: '<div class="ph-avatar">🤖</div>' },
  { search: /<div class="dc-avatar">.*?<\/div>/g, replace: '<div class="dc-avatar">🤖</div>' },

  { search: /Recomendamos IP.*?<\/div>/g, replace: 'recomendamos IP. 📷</div>' },
  { search: /em breve com o orçamento!.*?<\/div>/g, replace: 'em breve com o orçamento! 🔔</div>' },
  { search: /Aviso o especialista agora.*?<\/div>/g, replace: 'Aviso o especialista agora. 🔔</div>' },
  { search: /Olá!.*?Sou a assistente virtual/g, replace: 'Olá! 👋 Sou a assistente virtual' },

  { search: /Ótimo!.*?O residencial ou/g, replace: 'Ótimo! É residencial ou' },
  
  // Fix checkmarks in pricing
  { search: /<span class="check( gld)?">.*?<\/span>/g, replace: '<span class="check$1">✓</span>' },
  
  // Emojis missing in contact / buttons / footer
  { search: /<a href="https:\/\/wa.me.*?Solicitar Demo no WhatsApp<\/a>/g, replace: '<a href="https://wa.me/5511910773865?text=Oi!%20Quero%20ver%20uma%20demo%20do%20Atendente%20Inteligente" class="btn-primary" target="_blank">💬 Solicitar Demo no WhatsApp</a>' },
  
  { search: /<a href="https:\/\/wa.me\/5511910773865".*?\(11\) 91077-3865<\/a>/g, replace: '<a href="https://wa.me/5511910773865" target="_blank" style="color:rgba(245,240,232,0.5);text-decoration:none;" onmouseover="this.style.color=\'#00ff87\'" onmouseout="this.style.color=\'rgba(245,240,232,0.5)\'">📱 (11) 91077-3865</a>' },
  
  { search: /<a href="mailto:mario.junior@msiforce.com.br".*?mario.junior@msiforce.com.br<\/a>/g, replace: '<a href="mailto:mario.junior@msiforce.com.br" style="color:rgba(245,240,232,0.5);text-decoration:none;" onmouseover="this.style.color=\'#00ff87\'" onmouseout="this.style.color=\'rgba(245,240,232,0.5)\'">✉️ mario.junior@msiforce.com.br</a>' }
];

for (const fix of fixes) {
    html = html.replace(fix.search, fix.replace);
}

// Any remaining  should just be removed or logged to see what it is.
const remaining = html.match(/.{0,10}.{0,10}/g);
if (remaining) {
    console.log("Still have weird chars:", remaining);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed emojis");
