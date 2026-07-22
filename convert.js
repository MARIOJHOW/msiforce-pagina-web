const fs = require('fs');

const files = [
  { in: 'index.html', out: 'frontend/src/pages/Home.jsx', name: 'Home' },
  { in: 'automacao.html', out: 'frontend/src/pages/Automacao.jsx', name: 'Automacao' },
  { in: 'plataforma.html', out: 'frontend/src/pages/Plataforma.jsx', name: 'Plataforma' }
];

function convertStyle(match, styleStr) {
  const rules = styleStr.split(';');
  const obj = [];
  rules.forEach(rule => {
    const parts = rule.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts.slice(1).join(':').trim().replace(/"/g, "'");
      obj.push(`${key}: "${value}"`);
    }
  });
  return `style={{ ${obj.join(', ')} }}`;
}

files.forEach(f => {
  let content = fs.readFileSync(f.in, 'utf8');

  // Extract body content
  const bodyStartMatch = content.match(/<body[^>]*>/);
  const bodyStart = bodyStartMatch ? bodyStartMatch.index + bodyStartMatch[0].length : 0;
  const bodyEnd = content.indexOf('</body>');
  if (bodyEnd > -1) {
    content = content.slice(bodyStart, bodyEnd);
  }

  // Remove nav, footer, wa (we are using React components for these)
  content = content.replace(/<!-- NAV -->[\s\S]*?<\/nav>/, '');
  content = content.replace(/<nav class="msi-nav">[\s\S]*?<\/nav>/, '');
  content = content.replace(/<!-- FOOTER -->[\s\S]*?<\/footer>/, '');
  content = content.replace(/<footer class="msi-footer">[\s\S]*?<\/footer>/, '');
  content = content.replace(/<!-- WA -->[\s\S]*?<\/div>\s*<\/div>/, '');
  content = content.replace(/<div class="msi-wa">[\s\S]*?<\/div>\s*<\/div>/, '');
  
  // Remove scripts and noscripts
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  content = content.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');

  // Convert HTML comments to JSX comments
  content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Fix self-closing tags
  content = content.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  content = content.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
  content = content.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  content = content.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  content = content.replace(/<source([^>]*?)(?<!\/)>/g, '<source$1 />');

  // Convert class to className
  content = content.replace(/\bclass="/g, 'className="');
  content = content.replace(/\bfor="/g, 'htmlFor="');
  
  // Convert style="x:y" to style={{x:"y"}}
  content = content.replace(/style="([^"]*)"/g, convertStyle);

  // Wrap in component
  const jsx = `import React from 'react';
import './${f.name}.css';

export default function ${f.name}() {
  return (
    <div className="page-${f.name.toLowerCase()}">
      ${content}
    </div>
  );
}
`;

  fs.writeFileSync(f.out, jsx);
  console.log(`Converted ${f.in} to ${f.out}`);
});
