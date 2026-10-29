import { useEffect } from 'react';
import '../components/Revelar.css';

// Blocos que sobem e aparecem ao entrar na tela. Os seletores ficam aqui, e nao
// espalhados pelo JSX, para as paginas continuarem iguais no HTML pre-renderizado:
// sem JS (ou com "reduzir movimento") nada fica escondido.
const ALVOS =
  '.ifd-secao h2, .ifd-lead, .ifd-razoes li, .ifd-marcas, .tl-passos, .ifd-chips, ' +
  '.ifd-faq, .cmp-carrossel, .ifd-fechamento > *';

const useRevelar = () => {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    // So esconde o que esta abaixo da dobra: o que ja aparece na abertura nao pisca.
    const abaixo = Array.from(document.querySelectorAll(ALVOS)).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    abaixo.forEach((el) => {
      const irmaos = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty('--rev-d', `${Math.min(irmaos.indexOf(el), 5) * 0.08}s`);
      el.classList.add('rev-pre');
    });

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('rev-in');
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.12 },
    );
    abaixo.forEach((el) => obs.observe(el));

    return () => {
      obs.disconnect();
      abaixo.forEach((el) => el.classList.remove('rev-pre', 'rev-in'));
    };
  }, []);
};

export default useRevelar;
