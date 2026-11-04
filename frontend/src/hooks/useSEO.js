import { useEffect } from 'react';

// tituloCompleto: usa `title` como está, sem acrescentar o sufixo " | MSIFORCE"
// (para títulos que já trazem a marca).
export default function useSEO({ title, description, canonical, tituloCompleto = false }) {
  useEffect(() => {
    const titulo = title && (tituloCompleto ? title : `${title} | MSIFORCE`);
    if (titulo) document.title = titulo;

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
    }
    if (title) setMeta('og:title', titulo, true);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, canonical, tituloCompleto]);
}
