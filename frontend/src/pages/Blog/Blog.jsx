import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import './Blog.css';

const articles = [
  {
    id: "cftv-analogico-vs-ip-custo-real",
    title: "CFTV analógico vs IP: o custo real de não atualizar as câmeras",
    category: "Segurança",
    readTime: "5 min",
    image: "/thumb_ghosting.webp",
    excerpt: "Câmeras antigas parecem mais baratas — até você calcular furtos não resolvidos, laudos recusados por seguradora e imagens sem resolução para identificar pessoas. Veja a conta real."
  },
  {
    id: "quanto-custa-rede-escritorio-50-pessoas",
    title: "Quanto custa estruturar a rede de um escritório de 50 pessoas em São Paulo?",
    category: "Infraestrutura",
    readTime: "6 min",
    image: "/thumb_eletricista.webp",
    excerpt: "Cabeamento, switches, Wi-Fi corporativo e rack: descubra os itens que fazem o preço variar, o que é essencial e o que é supérfluo para a maioria das empresas."
  },
  {
    id: "contrato-manutencao-eletrica-condominio",
    title: "O que um condomínio deve exigir no contrato de manutenção elétrica",
    category: "Gestão",
    readTime: "4 min",
    image: "/thumb_bant.webp",
    excerpt: "SLA de atendimento, laudo técnico semestral, ART e cobertura de emergência 24h — síndicos experientes sabem o que pedir. Veja o checklist completo antes de assinar."
  },
  {
    id: "automacao-predial-quando-investimento-se-paga",
    title: "Automação predial: quando o investimento realmente se paga?",
    category: "Tecnologia",
    readTime: "5 min",
    image: "/thumb_crm.webp",
    excerpt: "Redução de consumo elétrico, menor turnover de funcionários insatisfeitos com conforto térmico e menos chamados de TI. Calculamos o payback real para escritórios e condomínios."
  },
  {
    id: "nr10-na-pratica-o-que-muda-para-sua-empresa",
    title: "NR-10 na prática: o que muda para a sua empresa",
    category: "Regulamentação",
    readTime: "4 min",
    image: "/thumb_orcamento.webp",
    excerpt: "Não é só obrigação do eletricista — a empresa contratante também é responsável. Entenda o que a norma exige de quem contrata serviços elétricos e como se proteger."
  }
];

const CATEGORIES = ['Todos', 'Infraestrutura', 'Segurança', 'Gestão', 'Tecnologia', 'Regulamentação'];

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
  });

  const filtered = activeCategory === 'Todos'
    ? articles
    : articles.filter(a => a.category === activeCategory);

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
                  <h3>{article.title}</h3>
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
            href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20li%20um%20artigo%20no%20blog%20da%20MSIFORCE%20e%20gostaria%20de%20conversar%20com%20um%20especialista."
            target="_blank"
            rel="noreferrer"
            className="blog-cta-btn"
          >
            Falar no WhatsApp →
          </a>
        </motion.div>
      </section>

    </div>
  );
}
