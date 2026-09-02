import { useEffect } from 'react';

// Injeta <script type="application/ld+json"> por chave estável. Reaproveita a
// tag se ela já existir no HTML (o build pré-renderiza cada rota e já grava o
// schema no arquivo estático — criar de novo no mount duplicaria a tag) e
// remove no unmount, senão o schema de uma página fica preso na próxima rota
// visitada (SPA).
export default function useJsonLd(items) {
  useEffect(() => {
    const els = items.map(({ key, schema }) => {
      let el = document.head.querySelector(`script[data-schema-key="${key}"]`);
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.setAttribute('data-schema-key', key);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
      return el;
    });
    return () => els.forEach((el) => el.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
