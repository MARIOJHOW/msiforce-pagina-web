import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import { linkWhatsApp, registrarCliqueWhatsApp } from '../../lib/whatsapp';
import { ARTIGOS } from '../../data/artigos';
import './Blog.css';

// Categorias saem dos próprios artigos: uma lista fixa aqui viraria uma terceira
// fonte de verdade e, mais cedo ou mais tarde, mostraria um filtro sem artigo
// nenhum (ou esconderia um artigo novo).
const CATEGORIES = ['Todos', ...new Set(ARTIGOS.map((a) => a.category))];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = React.useState('Todos');

  useSEO({
    title: 'Blog',
    description: 'Guias práticos sobre infraestrutura elétrica, redes, segurança eletrônica e TI para gestores, síndicos e donos de empresas em São Paulo.',
    canonical: 'https://msiforce.com.br/blog',
  });

  const filtered = activeCategory === 'Todos'
    ? ARTIGOS
    : ARTIGOS.filter((a) => a.category === activeCategory);

  return (
    <div className="page-blog">

      {/* HERO */}
      <section id="blog-hero">
        <motion.div
          className="blog-hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeUp} className="eyebrow">Blog MSIFORCE</motion.span>
          <motion.h1 variants={fadeUp} className="b-h1">
            Infraestrutura<br /><em>sem achismo.</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="b-desc">
            Guias práticos para gestores, síndicos e donos de empresa que precisam tomar
            decisões informadas sobre elétrica, redes, segurança e TI.
          </motion.p>
        </motion.div>
      </section>

      {/* FILTRO DE CATEGORIAS */}
      <section className="blog-filter-section">
        <div className="blog-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`blog-filter-btn${activeCategory === cat ? ' blog-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* LISTA DE ARTIGOS */}
      <section id="blog-list">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="b-grid"
          key={activeCategory}
        >
          {filtered.map((article) => (
            <motion.div variants={fadeUp} className="b-card" key={article.id}>
              <Link to={`/blog/${article.id}`} className="b-card-link">
                <div className="b-img-wrap">
                  <img src={article.image} alt={article.title} className="b-img" loading="lazy" />
                  <div className="b-category">{article.category}</div>
                </div>
                <div className="b-content">
                  <div className="b-meta">{article.readTime} de leitura</div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <span className="b-readmore">Ler artigo completo →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="blog-empty">Nenhum artigo nesta categoria ainda.</p>
        )}
      </section>

      {/* CTA NEWSLETTER / WHATSAPP */}
      <section className="blog-cta">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="blog-cta-inner"
        >
          <p className="blog-cta-eyebrow">Ficou com dúvida?</p>
          <h2 className="blog-cta-title">Fale diretamente com um especialista.</h2>
          <p className="blog-cta-sub">
            Nossos artigos dão o panorama geral — mas cada empresa tem uma necessidade específica.
            Diagnóstico gratuito, sem compromisso.
          </p>
          <a
            href={linkWhatsApp('Olá, li um artigo no blog da MSIFORCE e gostaria de conversar com um especialista.')}
            target="_blank"
            rel="noreferrer"
            className="blog-cta-btn"
            onClick={() => registrarCliqueWhatsApp('blog_cta_especialista')}
          >
            Falar no WhatsApp →
          </a>
        </motion.div>
      </section>

    </div>
  );
}
