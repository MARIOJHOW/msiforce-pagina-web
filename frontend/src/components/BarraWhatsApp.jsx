import { useEffect, useState } from 'react';
import WhatsAppButton from './WhatsAppButton';

/**
 * Barra fixa so no celular (o CSS esconde no desktop). Fica fora da tela enquanto
 * o hero ou o fechamento da pagina estao visiveis: ali ja ha um botao grande, e a
 * barra so repetiria o pedido.
 */
const BarraWhatsApp = ({ message, children }) => {
  const [visivel, setVisivel] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window));

  useEffect(() => {
    const alvos = document.querySelectorAll('.ifd-hero, .ifd-fechamento');
    if (!alvos.length || !('IntersectionObserver' in window)) return undefined;
    const emTela = new Set();
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? emTela.add(e.target) : emTela.delete(e.target)));
      setVisivel(emTela.size === 0);
    });
    alvos.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`ifd-barra${visivel ? ' ifd-barra--on' : ''}`}>
      <WhatsAppButton message={message} className="ifd-btn">
        {children}
      </WhatsAppButton>
    </div>
  );
};

export default BarraWhatsApp;
