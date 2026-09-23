import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackCTA } from '../../hooks/useAnalytics';
import { linkWhatsApp } from '../../lib/whatsapp';
import { MSG_ACESSO_CORPORATIVO, MSG_AUTOMACAO_PROJETO } from '../../lib/gatilhos';
import './Servico.css';

// Serviços que TÊM funil próprio no bot precisam da frase exata que o detector
// reconhece — ver lib/gatilhos.js e services/gatilhos-site.js no repo do bot.
// Sem ela o lead cai no menu genérico, que era o caso destas duas páginas.
// `acesso` entrou em 17/09/2026, junto com a criação de /servicos/acesso. O funil
// de acesso corporativo já existia no bot e era acionado só pelo CTA "Empresa ou
// condomínio" da /automacao — a página nova passa a ser uma segunda porta de
// entrada para ele, e por isso precisa da mesma frase, não da genérica.
const MSG_POR_SLUG = {
  automacao: MSG_AUTOMACAO_PROJETO,
  acesso: MSG_ACESSO_CORPORATIVO,
};

// Elétrica, CFTV e Redes/TI não têm funil no bot: a mensagem genérica leva ao
// menu principal, que é o caminho certo para eles.
const msgGenerica = (title) =>
  `Olá, vim pelo site da MSIFORCE e gostaria de saber mais sobre ${title}.`;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/**
 * Renderiza tanto /servicos/:slug quanto /fechaduras/:slug (paginas por tipo de
 * porta, criadas em 18/09/2026). As tres props abaixo sao o que muda entre as
 * duas familias -- o layout e identico, entao nao foi duplicado.
 *
 * @param base         prefixo dos links de "related"
 * @param relatedTitle rotulo da secao de related
 * @param voltar       o link do eyebrow, no topo do hero
 */
export default function Servico({
  servico,
  base = '/servicos',
  relatedTitle = 'Outros serviços',
  voltar = { to: '/#servicos', label: '← Todos os serviços' },
}) {
  const { title, slug, headline, sub, heroImg, beneficios, aplicacoes, processo, faq, related } = servico;

  // title/description saem do useSEO em ServicoPage (junto do canonical, que
  // esta pagina precisa declarar). Eram gravados aqui tambem, e duas fontes
  // para a mesma tag e como elas divergem.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const waLink = linkWhatsApp(servico.msg || MSG_POR_SLUG[slug] || msgGenerica(title));

  return (
    <div className="svc-page">

      {/* HERO */}
      <section
        className={`svc-hero${heroImg ? '' : ' svc-hero--sem-foto'}`}
        style={heroImg ? { '--hero-img': `url(${heroImg})` } : undefined}
      >
        <div className="svc-hero-overlay" />
        <motion.div className="svc-hero-content" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="svc-eyebrow">
            <Link to={voltar.to}>{voltar.label}</Link>
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
            Solicitar Orçamento
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
                <h3 className="svc-faq-q">{item.q}</h3>
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
          <p className="svc-cta-sub">Orçamento pela foto, sem custo e sem compromisso. Resposta em até 1 hora.</p>
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
          <div className="svc-related-title">{relatedTitle}</div>
          <div className="svc-related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`${base}/${r.slug}`} className="svc-related-card">
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
