import { useEffect, useRef, useState } from 'react';
import './PassosTimeline.css';

/**
 * Passos em linha do tempo vertical: a linha dourada se enche conforme a pagina
 * rola e cada passo "acende" quando a linha chega nele. Comeca tudo aceso: no
 * HTML pre-renderizado, ou sem JS, a lista aparece completa.
 */
const PassosTimeline = ({ passos }) => {
  const lista = useRef(null);
  const [prog, setProg] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let pendente = false;
    const calcular = () => {
      pendente = false;
      const r = lista.current.getBoundingClientRect();
      // Comeca a encher quando a lista entra e fecha com folga, para o efeito
      // durar uns 400px de rolagem mesmo com a lista curta.
      const meio = window.innerHeight * 0.8;
      setProg(Math.min(1, Math.max(0, (meio - r.top) / (r.height + window.innerHeight * 0.3))));
    };
    const aoRolar = () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, []);

  return (
    <ol className="tl-passos" ref={lista} style={{ '--tl-prog': prog }}>
      {passos.map((p, i) => (
        <li key={p} className={prog >= i / passos.length + 0.05 ? 'tl-on' : undefined}>
          {p}
        </li>
      ))}
    </ol>
  );
};

export default PassosTimeline;
