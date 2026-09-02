import { motion } from 'framer-motion';
import { PASSOS } from './dados';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ComoFunciona = () => (
  <section className="passos-secao">
    <div className="passos-layout">
      <motion.figure
        className="passos-figura"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/casa-lock-noite.webp"
          alt="Fechadura digital MSIFORCE instalada em residência de alto padrão"
          width="454"
          height="870"
          loading="lazy"
        />
      </motion.figure>

      <div className="passos-conteudo">
        <div className="section-header">
          <h2 className="campanha-section-title">Como funciona</h2>
          <p className="campanha-section-subtitle">
            Do primeiro WhatsApp à família toda usando a fechadura. Sem surpresa no meio.
          </p>
        </div>

        <ol className="passos-grid">
          {PASSOS.map((p) => (
            <motion.li
              key={p.n}
              className="passo-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <span className="passo-n" aria-hidden="true">{p.n}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default ComoFunciona;
