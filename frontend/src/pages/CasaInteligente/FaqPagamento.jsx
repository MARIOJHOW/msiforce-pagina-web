import { motion } from 'framer-motion';
import { FAQ } from './dados';

const FaqPagamento = () => (
  <section className="faq-secao">
    <div className="section-header">
      <h2 className="campanha-section-title">Perguntas frequentes</h2>
      <p className="campanha-section-subtitle">
        As dúvidas que mais chegam no nosso WhatsApp, respondidas antes de você perguntar.
      </p>
    </div>

    <motion.div
      className="faq-lista"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      {FAQ.map((item) => (
        <details className="faq-item" key={item.p}>
          <summary>{item.p}</summary>
          <p>{item.r}</p>
        </details>
      ))}
    </motion.div>
  </section>
);

export default FaqPagamento;
