import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackCTA } from '../hooks/useAnalytics';
import './Servico.css';

const WA_BASE = 'https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20saber%20mais%20sobre%20';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Servico({ servico }) {
  const { title, slug, headline, sub, heroImg, beneficios, aplicacoes, processo, faq, related } = servico;

  useEffect(() => {
    document.title = `${title} | MSIFORCE`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', sub);
    window.scrollTo(0, 0);
  }, [title, sub]);

  const waLink = `${WA_BASE}${encodeURIComponent(title)}.`;

  return (
    <div className="svc-page">

      {/* HERO */}
      <section className="svc-hero" style={{ '--hero-img': `url(${heroImg})` }}>
        <div className="svc-hero-overlay" />
        <motion.div className="svc-hero-content" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="svc-eyebrow">
            <Link to="/#servicos">← Todos os serviços</Link>
          </motion.div>
          <motion.h1 variants={fadeUp} className="svc-h1">{headline}</motion.h1>
          <motion.p variants={fadeUp} className="svc-sub">{sub}</motion.p>
          <motion.a
            variants={fadeUp}
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="svc-cta"
            onClick={() => trackCTA(`svc_${slug}_hero`, 'whatsapp')}
          >
            Solicitar Consultoria Gratuita
          </motion.a>
        </motion.div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="svc-section">
        <motion.div
          className="svc-header"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="svc-eyebrow-section">Por que contratar</motion.div>
          <motion.h2 variants={fadeUp} className="svc-h2">Benefícios para sua empresa</motion.h2>
        </motion.div>
        <motion.div
          className="svc-beneficios"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {beneficios.map((b) => (
            <motion.div key={b.titulo} variants={fadeUp} className="svc-beneficio">
              <div className="svc-b-icon">{b.icon}</div>
              <h3 className="svc-b-titulo">{b.titulo}</h3>
              <p className="svc-b-desc">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* APLICAÇÕES */}
      <section className="svc-section svc-section--alt">
        <motion.div
          className="svc-header"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="svc-eyebrow-section">Onde aplicamos</motion.div>
          <motion.h2 variants={fadeUp} className="svc-h2">Setores que mais utilizam</motion.h2>
        </motion.div>
        <motion.div
          className="svc-aplicacoes"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {aplicacoes.map((a) => (
            <motion.div key={a} variants={fadeUp} className="svc-aplicacao">
              <span className="svc-ap-check">✓</span>
              <span>{a}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROCESSO */}
      <section className="svc-section">
        <motion.div
          className="svc-header"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="svc-eyebrow-section">Como funciona</motion.div>
          <motion.h2 variants={fadeUp} className="svc-h2">Etapas do projeto</motion.h2>
        </motion.div>
        <motion.div
          className="svc-processo"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {processo.map((p, i) => (
            <motion.div key={p.titulo} variants={fadeUp} className="svc-passo">
              <div className="svc-passo-num">0{i + 1}</div>
              <h3 className="svc-passo-titulo">{p.titulo}</h3>
              <p className="svc-passo-desc">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      {faq?.length > 0 && (
        <section className="svc-section svc-section--alt">
          <motion.div
            className="svc-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="svc-eyebrow-section">Dúvidas frequentes</motion.div>
            <motion.h2 variants={fadeUp} className="svc-h2">Perguntas sobre {title}</motion.h2>
          </motion.div>
          <motion.div
            className="svc-faq"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {faq.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="svc-faq-item">
                <h4 className="svc-faq-q">{item.q}</h4>
                <p className="svc-faq-a">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="svc-cta-section">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="svc-cta-inner"
        >
          <h2 className="svc-cta-title">
            Pronto para implementar<br />
            <span className="svc-cta-gold">{title}</span> na sua empresa?
          </h2>
          <p className="svc-cta-sub">Diagnóstico gratuito, sem compromisso. Resposta em até 1 hora.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="svc-cta"
            onClick={() => trackCTA(`svc_${slug}_cta_final`, 'whatsapp')}
          >
            Falar com Especialista
          </a>
        </motion.div>
      </section>

      {/* OUTROS SERVIÇOS */}
      {related?.length > 0 && (
        <section className="svc-section">
          <div className="svc-related-title">Outros serviços</div>
          <div className="svc-related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/servicos/${r.slug}`} className="svc-related-card">
                <span className="svc-related-icon">{r.icon}</span>
                <span className="svc-related-name">{r.name}</span>
                <span className="svc-related-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
