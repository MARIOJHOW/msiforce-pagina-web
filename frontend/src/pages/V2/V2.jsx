import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './V2.css';

export default function V2() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    // Add Google Font Playfair Display for luxury serif
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=Inter:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="v2-container">
      {/* Navbar Minimalista */}
      <nav className="v2-nav">
        <div className="v2-logo">MSIFORCE <span className="v2-gold">Premium</span></div>
        <div className="v2-nav-links">
          <span>Visão</span>
          <span>Expertise</span>
          <span>Obras</span>
          <button className="v2-btn-contact">Exclusivo</button>
        </div>
      </nav>

      {/* Hero Section Cinematográfica */}
      <section className="v2-hero">
        <motion.div className="v2-hero-bg" style={{ y: heroY, opacity: opacityHero }}>
          <img src="/lux_bg.webp" alt="Luxury Smart Home" />
          <div className="v2-hero-overlay"></div>
        </motion.div>

        <motion.div 
          className="v2-hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="v2-eyebrow">A Arte da Automação</motion.div>
          <motion.h1 variants={fadeUp} className="v2-h1">A invisibilidade<br/><span className="v2-italic">da tecnologia perfeita.</span></motion.h1>
          <motion.p variants={fadeUp} className="v2-p">
            Elevando residências de alto padrão a ecossistemas inteligentes que respondem a você com elegância absoluta e sem atrito.
          </motion.p>
        </motion.div>
      </section>

      {/* Expertise Section - Edge to Edge */}
      <section className="v2-expertise">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="v2-section-header"
        >
          <motion.h2 variants={fadeUp} className="v2-h2">Mestria em<br/>cada detalhe</motion.h2>
          <motion.div variants={fadeUp} className="v2-gold-line"></motion.div>
        </motion.div>

        <div className="v2-gallery">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="v2-gallery-item"
          >
            <img src="/painel_premium.png" alt="Painel Inteligente" className="v2-g-img" />
            <div className="v2-g-overlay"></div>
            <div className="v2-g-content">
              <h3>Infraestrutura Oculta</h3>
              <p>O coração do sistema. Distribuição de energia impecável, onde a segurança encontra o design invisível.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="v2-gallery-item"
          >
            <img src="/acesso_premium.png" alt="Acesso Premium" className="v2-g-img" />
            <div className="v2-g-overlay"></div>
            <div className="v2-g-content">
              <h3>Fortaleza Elegante</h3>
              <p>Controle de acesso biométrico integrado à estética da porta. Segurança militar, design de alta costura.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Masterpiece Quote */}
      <section className="v2-quote">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
        >
          <div className="v2-quote-mark">"</div>
          <p className="v2-quote-text">A verdadeira inteligência em uma casa de luxo é aquela que você não vê, apenas sente. O conforto torna-se uma extensão do seu pensamento.</p>
          <div className="v2-quote-author">— Mario Sergio, Fundador</div>
        </motion.div>
      </section>

    </div>
  );
}
