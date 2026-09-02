import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import { FAQS } from '../../data/faq';
import { linkWhatsApp } from '../../lib/whatsapp';
import './Faq.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// Institucional: nao ha funil de FAQ no bot, entao cair no menu principal e o
// comportamento certo. Passa pelo helper porque lib/whatsapp.js e a fonte unica
// do numero.
const MSG_DUVIDA =
  'Olá, vim pela página de perguntas frequentes da MSIFORCE e tenho uma dúvida.';

// O JSON-LD sai da MESMA lista que a pagina renderiza. Escrever o schema a mao
// seria uma segunda fonte de verdade, e o Google acabaria indexando resposta
// diferente da que o visitante le.
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function Faq() {
  const [aberta, setAberta] = useState(0);

  useSEO({
    title: 'Perguntas frequentes',
    description:
      'ART, garantia, contratos de manutenção, atendimento a múltiplas filiais e prazo de orçamento: as dúvidas que gestores fazem antes de contratar infraestrutura elétrica, automação, segurança e TI.',
    canonical: 'https://msiforce.com.br/faq',
  });

  useJsonLd([{ key: 'faq', schema: SCHEMA }]);

  return (
    <div className="faqp-page">
      <section className="faqp-hero">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="faqp-eyebrow">Dúvidas frequentes</motion.p>
          <motion.h1 variants={fadeUp} className="faqp-titulo">
            Perguntas que <span>gestores fazem.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="faqp-sub">
            ART, garantia, contrato de manutenção e atendimento a filiais. Se a sua
            dúvida não estiver aqui, é só chamar no WhatsApp.
          </motion.p>
        </motion.div>
      </section>

      <section className="faqp-secao">
        <motion.div
          className="faqp-lista"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {FAQS.map((item, i) => (
            <motion.div variants={fadeUp} className="faqp-item" key={item.q}>
              <h2 className="faqp-item-titulo">
                <button
                  className="faqp-q"
                  onClick={() => setAberta(aberta === i ? null : i)}
                  aria-expanded={aberta === i}
                  aria-controls={`faq-resposta-${i}`}
                  id={`faq-pergunta-${i}`}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faqp-icon"
                    aria-hidden="true"
                    animate={{ rotate: aberta === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {aberta === i && (
                  <motion.div
                    key="resposta"
                    id={`faq-resposta-${i}`}
                    role="region"
                    aria-labelledby={`faq-pergunta-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, paddingBottom: '26px' }}
                    exit={{ height: 0, opacity: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="faqp-a"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="faqp-fechamento"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ficou alguma dúvida?</h2>
          <p>
            Mande sua pergunta no WhatsApp. Respondemos em horário comercial, e o
            diagnóstico técnico é gratuito.
          </p>
          <div className="faqp-fechamento-acoes">
            <a href={linkWhatsApp(MSG_DUVIDA)} target="_blank" rel="noopener noreferrer" className="faqp-btn">
              Falar no WhatsApp
            </a>
            <Link to="/#form-diagnostico" className="faqp-btn faqp-btn--secundario">
              Solicitar consultoria
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
