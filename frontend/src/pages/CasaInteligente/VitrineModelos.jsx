import { motion } from 'framer-motion';
import { MODELOS } from './dados';
import { IcoCheck } from './icones';
import { msgFechaduraModelo } from '../../lib/gatilhos';
import WhatsAppButton from '../../components/WhatsAppButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Seção secundária: quem ainda não tem a fechadura. Sem preço — só orçamento. */
const VitrineModelos = () => (
  <section className="modelos-secao" id="modelos">
    <div className="section-header">
      <h2 className="campanha-section-title">Não tem a fechadura ainda?</h2>
      <p className="campanha-section-subtitle">
        A gente fornece também. Escolha o modelo e orçamos fechadura e instalação juntas.
      </p>
    </div>

    <div className="modelos-grid">
      {MODELOS.map((m) => (
        <motion.article
          key={m.id}
          className="modelo-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          <div className="modelo-imagem">
            <img src={m.imagem} alt={m.nome} loading="lazy" width="400" height="400" />
          </div>
          <div className="modelo-info">
            <span className="modelo-tag">{m.tag}</span>
            <h3>{m.nome}</h3>
            <p className="modelo-paraquem">{m.paraQuem}</p>
            <div className="metodos-abertura">
              {m.metodos.map((metodo) => (
                <span className="metodo-badge" key={metodo}>{metodo}</span>
              ))}
            </div>
            <p className="modelo-porta"><IcoCheck className="modelo-porta-check" /> {m.porta}</p>
            <WhatsAppButton message={msgFechaduraModelo(m.nome)} className="modelo-btn">
              Orçar este modelo
            </WhatsAppButton>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default VitrineModelos;
