import { useState } from 'react';
import { motion } from 'framer-motion';
import './VitrinePlanos.css';
import { PLANOS, PRECO_MINIMO, FILTRO_BOLSO, FILTRO_PORTA, NOTA_LEGAL } from './dados';
import { IcoCheck } from './icones';
import { msgPlanoInstalacao } from '../../lib/gatilhos';
import WhatsAppButton from '../../components/WhatsAppButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const VitrinePlanos = () => {
  const [bolso, setBolso] = useState('todos');
  const [porta, setPorta] = useState('todos');

  const visiveis = PLANOS.filter(
    (p) =>
      (bolso === 'todos' || p.bolso === bolso) &&
      (porta === 'todos' || p.portaFiltro.includes(porta)),
  );

  return (
    <section className="planos-secao" id="instalacao">
      <div className="section-header">
        <h2 className="campanha-section-title">Instalação a partir de R$ {PRECO_MINIMO}</h2>
        <p className="campanha-section-subtitle">
          O preço acompanha a complexidade da sua porta e da fechadura — não o seu CEP.
          Escolha a faixa que cabe no seu bolso.
        </p>
      </div>

      <div className="planos-filtros">
        <div className="planos-filtro">
          <span className="planos-filtro-rot">Filtrar por bolso</span>
          <div className="planos-chips" role="group" aria-label="Filtrar planos por faixa de preço">
            {FILTRO_BOLSO.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`planos-chip${bolso === f.id ? ' ativo' : ''}`}
                aria-pressed={bolso === f.id}
                onClick={() => setBolso(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="planos-filtro">
          <span className="planos-filtro-rot">Tipo de porta</span>
          <div className="planos-chips" role="group" aria-label="Filtrar planos por tipo de porta">
            {FILTRO_PORTA.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`planos-chip${porta === f.id ? ' ativo' : ''}`}
                aria-pressed={porta === f.id}
                onClick={() => setPorta(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="planos-grid">
        {visiveis.map((p) => (
          <motion.article
            key={p.id}
            className={`plano-card plano-${p.id}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
          >
            <div className="plano-trilho" aria-hidden="true" />
            <div className="plano-corpo">
              <h3 className="plano-nome">{p.nome}</h3>
              <p className="plano-resumo">{p.resumo}</p>

              <ul className="plano-inclui">
                {p.inclui.map((item) => (
                  <li key={item}><IcoCheck className="plano-check" /> {item}</li>
                ))}
              </ul>

              <p className="plano-porta"><IcoCheck className="plano-porta-check" /> {p.porta}</p>

              <WhatsAppButton
                message={msgPlanoInstalacao(p.nome)}
                className="plano-btn"
              >
                Orçar {p.nome}
              </WhatsAppButton>
            </div>
          </motion.article>
        ))}
      </div>

      {visiveis.length === 0 && (
        <p className="planos-vazio">
          Nenhum plano com esses dois filtros ao mesmo tempo. Limpe um deles — ou fale
          com a gente que avaliamos sua porta pelo WhatsApp.
        </p>
      )}

      <p className="planos-legal">{NOTA_LEGAL}</p>
    </section>
  );
};

export default VitrinePlanos;
