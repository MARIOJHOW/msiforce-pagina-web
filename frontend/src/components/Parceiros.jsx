import { motion } from 'framer-motion';
import './Parceiros.css';

const PARCEIROS = [
  {
    nome: 'Grupo LPM',
    segmento: 'Soluções em TI & Infraestrutura',
    logo: '/parceiro_lpm.webp',
    url: 'https://www.grupolpm.com.br',
  },
  {
    nome: 'Vetor Construção Civil',
    segmento: 'Construção, reformas e gerenciamento de obras',
    logo: '/parceiro_vetor.webp',
    url: 'https://www.vetorconstrucaocivil.com.br',
  },
  {
    nome: 'Delta Solution',
    segmento: 'Automação industrial & Indústria 4.0',
    logo: '/parceiro_delta_v2.webp',
    url: 'https://deltasolution.com.br',
  },
  {
    nome: 'ALM Steel',
    segmento: 'Estruturas metálicas, alpinismo industrial e linhas de vida',
    logo: '/parceiro_alm.svg',
    url: 'https://www.almsteel.com.br',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Parceiros() {
  return (
    <section className="parceiros-section">
      <motion.div
        className="parceiros-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="parceiros-label">
          Empresas que trabalham com a MSIFORCE
        </motion.p>

        <motion.div className="parceiros-grid" variants={stagger}>
          {PARCEIROS.map((p) => (
            <motion.a
              key={p.nome}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="parceiro-card"
              variants={fadeUp}
              title={`${p.nome} — ${p.segmento}`}
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={`Logo ${p.nome}`}
                  className="parceiro-logo"
                  loading="lazy"
                />
              ) : (
                <div className="parceiro-logo-text">{p.nome}</div>
              )}
              <span className="parceiro-nome">{p.nome}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
