import { motion } from 'framer-motion';
import './SobreEmpresa.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const FORMACOES = [
  { titulo: 'Técnico em Eletrônica', desc: 'Base de circuitos, automação e sistemas embarcados' },
  { titulo: 'Eletrotécnica', desc: 'Projetos elétricos, NR-10, ABNT NBR 5410' },
  { titulo: 'Computação em Nuvem', desc: 'AWS, Azure, Google Cloud e infraestrutura híbrida' },
];

export default function SobreEmpresa() {
  return (
    <section className="sobre-section" id="sobre-empresa">
      <motion.div
        className="sobre-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        {/* TEXTO */}
        <div className="sobre-texto">
          <motion.div variants={fadeUp} className="sobre-eyebrow">Sobre a MSIFORCE</motion.div>

          <motion.h2 variants={fadeUp} className="sobre-h2">
            20+ anos de experiência.<br />
            <span className="sobre-gold">Uma empresa construída<br />com propósito.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="sobre-p">
            A MSIFORCE nasceu da decisão de transformar mais de duas décadas de experiência
            na área de eletrônica e elétrica em algo próprio — com liberdade para entregar
            projetos no nível que o mercado corporativo exige, sem os limites do CLT.
          </motion.p>

          <motion.p variants={fadeUp} className="sobre-p">
            Com formação técnica em eletrônica, eletrotécnica e computação em nuvem,
            atendo empresas, condomínios, clínicas e indústrias com a profundidade técnica
            de quem viveu a operação por dentro — e a agilidade de quem responde diretamente
            pelo resultado.
          </motion.p>

          <motion.div variants={fadeUp} className="sobre-formacoes">
            {FORMACOES.map((f) => (
              <div key={f.titulo} className="sobre-formacao">
                <span className="sobre-formacao-check">✓</span>
                <div>
                  <strong>{f.titulo}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="sobre-stats">
            <div className="sobre-stat">
              <span className="sobre-stat-num">20+</span>
              <span className="sobre-stat-label">anos de experiência</span>
            </div>
            <div className="sobre-stat-divider" />
            <div className="sobre-stat">
              <span className="sobre-stat-num">3</span>
              <span className="sobre-stat-label">formações técnicas</span>
            </div>
            <div className="sobre-stat-divider" />
            <div className="sobre-stat">
              <span className="sobre-stat-num">2</span>
              <span className="sobre-stat-label">anos de MSIFORCE</span>
            </div>
          </motion.div>
        </div>

        {/* FOTO / CARD */}
        <motion.div variants={fadeUp} className="sobre-foto-wrap">
          <div className="sobre-foto-placeholder">
            <img src="/mario_tecnico.png" alt="Mario Sérgio — Fundador MSIFORCE" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
