const fs = require('fs');
const { JSDOM } = require('jsdom');

const files = [
  { in: 'index_bkp.html', out: 'frontend/src/pages/Home.jsx', name: 'Home' },
  { in: 'automacao_bkp.html', out: 'frontend/src/pages/Automacao.jsx', name: 'Automacao' },
  { in: 'plataforma_bkp.html', out: 'frontend/src/pages/Plataforma.jsx', name: 'Plataforma' }
];

function convertStyle(match, styleStr) {
  const rules = styleStr.split(';');
  const obj = [];
  rules.forEach(rule => {
    const parts = rule.split(':');
    if (parts.length >= 2) {
      let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts.slice(1).join(':').trim().replace(/"/g, "'");
      if(key === 'filter') {
          // just an example, filter string is fine
      }
      obj.push(`${key}: "${value}"`);
    }
  });
  return `style={{ ${obj.join(', ')} }}`;
}

files.forEach(f => {
  const html = fs.readFileSync(f.in, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Remove elements
  const elsToRemove = [
    ...document.querySelectorAll('nav'),
    ...document.querySelectorAll('footer'),
    ...document.querySelectorAll('.wa'),
    ...document.querySelectorAll('.msi-wa'),
    ...document.querySelectorAll('script'),
    ...document.querySelectorAll('noscript'),
    ...document.querySelectorAll('style')
  ];

  elsToRemove.forEach(el => el.remove());

  let content = document.body.innerHTML;

  // Remove HTML comments completely
  content = content.replace(/<!--([\s\S]*?)-->/g, '');

  // Fix self-closing tags
  content = content.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  content = content.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
  content = content.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  content = content.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  content = content.replace(/<source([^>]*?)(?<!\/)>/g, '<source$1 />');
  content = content.replace(/<link([^>]*?)(?<!\/)>/g, '<link$1 />');
  content = content.replace(/<meta([^>]*?)(?<!\/)>/g, '<meta$1 />');

  // Convert class to className
  content = content.replace(/\bclass="/g, 'className="');
  content = content.replace(/\bfor="/g, 'htmlFor="');
  
  // Convert style="x:y" to style={{x:"y"}}
  content = content.replace(/style="([^"]*)"/g, convertStyle);

  // Fix onClick
  content = content.replace(/\bonclick="[^"]*"/g, 'onClick={() => {}}');

  // Fix some JSX reserved words if any (like viewBox)
  content = content.replace(/\bviewbox="/g, 'viewBox="');

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
