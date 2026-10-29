import { useCallback, useEffect, useRef, useState } from 'react';
import './ComparadorCarrossel.css';

/**
 * Comparador antes/depois: a foto do "antes" fica recortada por cima da do
 * "depois". O cliente arrasta a alca (ou usa as setas do teclado) para revelar.
 * Arrasto so na alca: o resto da imagem continua deslizando o carrossel.
 */
const Comparador = ({ id, alt, legenda }) => {
  const [pos, setPos] = useState(50);
  const [tocou, setTocou] = useState(false);
  const area = useRef(null);

  const mover = useCallback((clientX) => {
    const r = area.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    setTocou(true);
  }, []);

  const aoArrastar = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    mover(e.clientX);
  };
  const aoMover = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) mover(e.clientX);
  };
  const aoTeclar = (e) => {
    const passo = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }[e.key];
    if (passo === undefined) return;
    e.preventDefault();
    setTocou(true);
    setPos((p) => Math.min(100, Math.max(0, p + passo)));
  };

  return (
    <figure className="cmp-slide">
      <div className="cmp-area" ref={area}>
        <img
          src={`/antes-depois-${id}-depois.webp`}
          alt={`${alt} (depois)`}
          width="600"
          height="800"
          loading="lazy"
          decoding="async"
        />
        <img
          src={`/antes-depois-${id}-antes.webp`}
          alt={`${alt} (antes)`}
          width="600"
          height="800"
          loading="lazy"
          decoding="async"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <span className="cmp-rotulo cmp-rotulo--antes">Antes</span>
        <span className="cmp-rotulo cmp-rotulo--depois">Depois</span>
        <div className="cmp-linha" style={{ left: `${pos}%` }}>
          <div
            className={`cmp-alca${tocou ? '' : ' cmp-alca--dica'}`}
            role="slider"
            tabIndex={0}
            aria-label="Arraste para comparar antes e depois"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onPointerDown={aoArrastar}
            onPointerMove={aoMover}
            onKeyDown={aoTeclar}
          >
            ⇆
          </div>
        </div>
      </div>
      <figcaption>{legenda}</figcaption>
    </figure>
  );
};

/**
 * Carrossel de scroll-snap com setas e bolinhas, sem biblioteca.
 * `slides`: lista de { chave, comparador } (vira um Comparador) ou { chave, node }.
 */
const ComparadorCarrossel = ({ slides }) => {
  const trilho = useRef(null);
  const [ativo, setAtivo] = useState(0);
  const [cabeTudo, setCabeTudo] = useState(false);

  const atualizar = useCallback(() => {
    const t = trilho.current;
    if (!t) return;
    setCabeTudo(t.scrollWidth <= t.clientWidth + 2);
    const filhos = Array.from(t.children);
    const base = filhos[0].offsetLeft;
    const dist = (i) => Math.abs(filhos[i].offsetLeft - base - t.scrollLeft);
    let melhor = 0;
    filhos.forEach((_, i) => {
      if (dist(i) < dist(melhor)) melhor = i;
    });
    setAtivo(melhor);
  }, []);

  useEffect(() => {
    atualizar();
    window.addEventListener('resize', atualizar);
    return () => window.removeEventListener('resize', atualizar);
  }, [atualizar]);

  const irPara = (i) => {
    const t = trilho.current;
    const alvo = t.children[Math.min(Math.max(i, 0), t.children.length - 1)];
    t.scrollTo({ left: alvo.offsetLeft - t.children[0].offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="cmp-carrossel">
      <div
        className="cmp-trilho"
        ref={trilho}
        onScroll={atualizar}
        tabIndex={0}
        aria-label="Antes e depois de instalações"
      >
        {slides.map((s) =>
          s.comparador ? (
            <Comparador key={s.chave} {...s.comparador} />
          ) : (
            <div className="cmp-slide" key={s.chave}>{s.node}</div>
          ),
        )}
      </div>
      {!cabeTudo && (
        <div className="cmp-controles">
          <button type="button" className="cmp-seta" onClick={() => irPara(ativo - 1)} disabled={ativo === 0} aria-label="Anterior">‹</button>
          <div className="cmp-bolinhas">
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.chave}
                className={`cmp-bolinha${i === ativo ? ' cmp-bolinha--on' : ''}`}
                onClick={() => irPara(i)}
                aria-label={`Ir para ${i + 1} de ${slides.length}`}
                aria-current={i === ativo}
              />
            ))}
          </div>
          <button type="button" className="cmp-seta" onClick={() => irPara(ativo + 1)} disabled={ativo === slides.length - 1} aria-label="Próximo">›</button>
        </div>
      )}
    </div>
  );
};

export default ComparadorCarrossel;
