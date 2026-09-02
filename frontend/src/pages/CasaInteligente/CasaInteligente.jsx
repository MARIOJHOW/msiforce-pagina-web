import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CasaInteligente.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import useSEO from '../../hooks/useSEO';
import { iniciarAds } from '../../lib/ads';
import { MSG_FECHADURA_COMBO, MSG_FECHADURA_INSTALACAO } from '../../lib/gatilhos';
import { GOOGLE, PRECO_MINIMO, FAQ } from './dados';
import SeloGoogle from './SeloGoogle';
import VitrinePlanos from './VitrinePlanos';
import VitrineModelos from './VitrineModelos';
import ComoFunciona from './ComoFunciona';
import FaqPagamento from './FaqPagamento';
import {
  IcoDigital, IcoApp, IcoEscudo,
  IcoPredio, IcoCheck, IcoPresente,
} from './icones';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// O JSON-LD sai dos MESMOS dados que a página renderiza (dados.js) — escrever o
// schema a mão seria uma segunda fonte de verdade, como em Faq.jsx.
const SERVICO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Automação Residencial e Instalação de Fechadura Digital',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MSIFORCE',
    url: 'https://msiforce.com.br',
    telephone: '+55-11-91077-3865',
    areaServed: { '@type': 'City', name: 'São Paulo' },
  },
  areaServed: { '@type': 'City', name: 'São Paulo' },
  description:
    'Projeto e instalação de automação residencial e fechaduras digitais em São Paulo, com integração a Google Home e Alexa.',
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ p, r }) => ({
    '@type': 'Question',
    name: p,
    acceptedAnswer: { '@type': 'Answer', text: r },
  })),
};

const CampanhaFechadura = () => {
  useSEO({
    title: 'Fechadura Digital e Automação Residencial SP',
    description:
      'Instalação especializada de fechaduras digitais e projetos de Casa Inteligente em São Paulo. Autorizada Intelbras, Yale, Pado, Papaiz. Solicite orçamento.',
    canonical: 'https://msiforce.com.br/casa-inteligente',
  });

  // Injeta e remove o schema. Como o site é SPA, um schema deixado para trás
  // apareceria em outra rota.
  useEffect(() => {
    const elServico = document.createElement('script');
    elServico.type = 'application/ld+json';
    elServico.textContent = JSON.stringify(SERVICO_SCHEMA);
    document.head.appendChild(elServico);

    const elFaq = document.createElement('script');
    elFaq.type = 'application/ld+json';
    elFaq.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(elFaq);

    return () => {
      elServico.remove();
      elFaq.remove();
    };
  }, []);

  useEffect(() => {
    // Chegando por sitelink do Google Ads (#modelos, #instalacao, #combo), este
    // scrollTo(0,0) cancelava o salto do navegador e o visitante caía no topo —
    // medido em produção: com #modelos a página ficava em scrollY=0 com a seção
    // 2220px abaixo. Com hash, o alvo manda; sem hash, o topo continua valendo.
    const alvoHash = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;
    if (alvoHash) {
      requestAnimationFrame(() => alvoHash.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
    iniciarAds();
  }, []);

  return (
    <div className="campanha-container">
      <a className="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo">

      {/* Hero Section */}
      <section className="campanha-hero">
        <div className="mesh-gradient-bg"></div>

        <div className="hero-content-wrapper">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hero-text"
          >
            <motion.div variants={fadeUp} className="campanha-badge">
              <span className="badge-dot"></span> Oferta Especial São Paulo
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Sua Casa Inteligente<br />
              <span className="text-highlight">Começa na Porta.</span>
            </motion.h1>

            {/* So mobile (<=768px): no empilhamento em coluna a imagem grande cai
                ~950px abaixo do topo e o produto nao aparecia na primeira dobra.
                Compacta aqui, entre o titulo e o resto; o container grande some no
                mobile. Mesmo arquivo do desktop = zero download extra. */}
            <motion.img
              variants={fadeUp}
              src="/casa-hero-fechadura.webp"
              alt="Fechadura digital MSIFORCE instalada em residência de alto padrão"
              className="hero-img-mobile"
              width="460"
              height="610"
            />

            <motion.p variants={fadeUp}>
              Eleve o nível de segurança e design da sua residência. Esqueça as chaves e tenha o controle total do seu lar na palma da mão ou na ponta dos dedos.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-prova">
              <SeloGoogle compacto />
            </motion.div>

            <motion.p variants={fadeUp} className="campanha-faixa-preco">
              Instalação a partir de <strong>R$ {PRECO_MINIMO}</strong> · em até 12x no cartão
            </motion.p>

            <motion.div variants={fadeUp}>
              <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary glow-effect black-text">
                Falar com Especialista
              </WhatsAppButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-complete">
              <div className="hero-image-glow"></div>
              <img src="/casa-hero-fechadura.webp" alt="Fechadura digital MSIFORCE instalada em residência de alto padrão" className="main-lock-img complete-img" width="460" height="610" />
            </div>
          </motion.div>
        </div>
        {/* Barra de confiança — substitui o antigo card solto pós-hero: mesma
            informação (marcas + certificações), sem uma seção inteira para isso. */}
        <motion.div
          className="hero-trust-bar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="hero-trust-item">
            Técnico certificado <strong>Intelbras · Papaiz · Yale · Pado · Elsys</strong>
          </span>
          <span className="hero-trust-badges">
            <span className="hero-trust-badge">NR-10</span>
            <span className="hero-trust-badge">NR-35</span>
            <span className="hero-trust-badge">ABNT 5410</span>
          </span>
        </motion.div>
      </section>

      <VitrinePlanos />
      <VitrineModelos />

      {/* Problema / Solução - Features Bento Grid */}
      <section className="campanha-section campanha-section-alt">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <motion.h2 variants={fadeUp} className="campanha-section-title">A Revolução na sua Porta</motion.h2>
          <motion.p variants={fadeUp} className="campanha-section-subtitle">
            Muito além de trancar e destrancar. Um ecossistema de segurança projetado para o seu conforto.
          </motion.p>
        </motion.div>

        <motion.div
          className="bento-features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={fadeUp} className="bento-card bento-large bento-glass">
            <div className="bento-photo-bg" style={{ backgroundImage: "url('/bento-acesso.webp')" }}></div>
            <div className="bento-photo-scrim"></div>
            <div className="bento-content">
              <div className="bento-icon"><IcoDigital /></div>
              <h3>Acesso Biométrico Instantâneo</h3>
              <p>Sua digital é sua chave. Abra a porta em menos de 0.5 segundos sem precisar procurar nada na bolsa.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
            <div className="bento-photo-bg" style={{ backgroundImage: "url('/bento-app.webp')" }}></div>
            <div className="bento-photo-scrim"></div>
            <div className="bento-content">
              <div className="bento-icon"><IcoApp /></div>
              <h3>App & Senhas Remotas</h3>
              <p>Crie senhas temporárias para visitas, diaristas ou familiares de onde estiver, direto pelo celular.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
            <div className="bento-photo-bg" style={{ backgroundImage: "url('/bento-seguranca.webp')" }}></div>
            <div className="bento-photo-scrim"></div>
            <div className="bento-content">
              <div className="bento-icon"><IcoEscudo /></div>
              <h3>Segurança Máxima</h3>
              <p>Travamento automático, alarme anti-arrombamento e aviso de pilha fraca.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ComoFunciona />

      {/* Prova social */}
      <section className="prova-secao">
        <h2 className="campanha-section-title">Quem já instalou com a gente</h2>
        <SeloGoogle />
        <p className="prova-nota">
          Nota máxima em {GOOGLE.avaliacoes} avaliações de clientes reais em São Paulo.
        </p>
      </section>

      <FaqPagamento />

      <p className="campanha-link-conteudo">
        <Link to="/instalacao-fechadura-digital">
          Guia completo de instalação de fechadura digital →
        </Link>
      </p>

      {/* Tem Airbnb? — teaser compacto linkando para a página dedicada
          (/fechadura-airbnb), em vez de embutir a seção inteira aqui. */}
      <section className="campanha-instalacao-avulsa">
        <motion.div
          className="instalacao-content glass-panel airbnb-teaser"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <span className="airbnb-teaser-tag"><IcoPredio /> Airbnb e locação por temporada</span>
          <h3>Hospede sem se preocupar com chave</h3>
          <p>
            Senha própria para cada hóspede e um cartão que liga a energia do imóvel
            no check-in e desliga sozinho no check-out. Pacotes com equipamento e
            instalação inclusos.
          </p>
          <Link to="/fechadura-airbnb" className="botao-instalacao-avulsa">
            Ver solução para Airbnb →
          </Link>
        </motion.div>
      </section>

      {/* Fechamento — um bloco só, com o combo em destaque e a instalação
          avulsa ao lado, em vez de três seções separadas pedindo quase a
          mesma coisa. O cross-link para automação vira uma linha, não uma
          seção com padding próprio. */}
      <section className="campanha-fechamento" id="combo">
        <div className="fechamento-grid">
          <motion.div
            className="offer-box premium-gradient"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <div className="offer-glow"></div>
            <h2>Projeto Porta Pronta</h2>
            <p>
              Da compra da fechadura ao acabamento na sua porta. Cuidamos de tudo para você ter a melhor experiência possível.
            </p>
            <div className="bonus-tag">
              <IcoPresente /> Bônus Exclusivo: Consultoria de Automação gratuita no local!
            </div>
            <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary glow-effect black-text">
              Quero Agendar Minha Instalação
            </WhatsAppButton>
          </motion.div>

          <motion.div
            className="instalacao-content glass-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h3>Já comprou sua fechadura?</h3>
            <p>
              Não arrisque arranhar sua porta ou perder a garantia do produto com curiosos.
              Temos especialistas em portas Pivotantes, Madeira Maciça e Aço.
            </p>
            <ul className="beneficios-instalacao">
              <li><IcoCheck className="check-icon" /> Acabamento de marcenaria fina</li>
              <li><IcoCheck className="check-icon" /> Configuração completa da rede Wi-Fi</li>
              <li><IcoCheck className="check-icon" /> Treinamento presencial para a família</li>
            </ul>
            <WhatsAppButton message={MSG_FECHADURA_INSTALACAO} className="botao-instalacao-avulsa">
              Orçar Apenas a Instalação
            </WhatsAppButton>
          </motion.div>
        </div>

        <Link to="/automacao" className="fechamento-automacao-link">
          Quer automatizar a casa inteira, além da porta? Conheça os projetos de automação →
        </Link>
      </section>

      </main>
      <Footer />
      <WhatsAppButton message={MSG_FECHADURA_COMBO} />
    </div>
  );
};

export default CampanhaFechadura;
