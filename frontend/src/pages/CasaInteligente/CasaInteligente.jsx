import { useEffect, useState } from 'react';
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
import SolucaoAirbnb from './SolucaoAirbnb';
import {
  IcoDigital, IcoApp, IcoEscudo, IcoPorta,
  IcoPredio, IcoVidro, IcoCheck, IcoPresente,
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
  const [activeTab, setActiveTab] = useState('portas');

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
              src="/fechadura_completa.webp"
              alt="Fechadura digital instalada pela MSIFORCE"
              className="hero-img-mobile"
              width="1024"
              height="1024"
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
              <img src="/fechadura_completa.webp" alt="Fechadura digital instalada pela MSIFORCE" className="main-lock-img complete-img" width="520" height="520" />
            </div>
          </motion.div>
        </div>
        {/* Banner Especialista Certificado */}
        <section className="certificacoes-banner">
          <motion.div
            className="cert-content glass-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="cert-header">
              <img src="/logo-simbolo.webp" alt="" className="cert-logo" />
              <span className="cert-marca">MSIFORCE</span>
            </div>
            <h2>Instalação Especializada e Certificada</h2>
            <p>Técnico treinado e certificado pelas maiores marcas do mercado: <strong>Intelbras, Papaiz, Yale, Pado e Elsys</strong>.</p>
          </motion.div>
        </section>
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
            <div className="bento-content">
              <div className="bento-icon"><IcoDigital /></div>
              <h3>Acesso Biométrico Instantâneo</h3>
              <p>Sua digital é sua chave. Abra a porta em menos de 0.5 segundos sem precisar procurar nada na bolsa.</p>
            </div>
            <div className="bento-bg-gradient bento-bg-1"></div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
            <div className="bento-content">
              <div className="bento-icon"><IcoApp /></div>
              <h3>App & Senhas Remotas</h3>
              <p>Crie senhas temporárias para visitas, diaristas ou familiares de onde estiver, direto pelo celular.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
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

      {/* Guia Especializado (Tabs) */}
      <section className="campanha-guia-section" id="guia">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <motion.h2 variants={fadeUp} className="campanha-section-title">Guia Especializado</motion.h2>
          <motion.p variants={fadeUp} className="campanha-section-subtitle">
            Entenda como escolher a fechadura certa para sua necessidade e conheça todas as vantagens.
          </motion.p>
        </motion.div>

        <motion.div
          className="guia-tabs-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="guia-tabs-header" role="tablist">
            <button
              className={`guia-tab-btn ${activeTab === 'portas' ? 'active' : ''}`}
              onClick={() => setActiveTab('portas')}
              role="tab"
              aria-selected={activeTab === 'portas'}
              tabIndex={activeTab === 'portas' ? 0 : -1}
            >
              Tipos de Porta
            </button>
            <button
              className={`guia-tab-btn ${activeTab === 'funcoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('funcoes')}
              role="tab"
              aria-selected={activeTab === 'funcoes'}
              tabIndex={activeTab === 'funcoes' ? 0 : -1}
            >
              Funções
            </button>
            <button
              className={`guia-tab-btn ${activeTab === 'aplicacoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('aplicacoes')}
              role="tab"
              aria-selected={activeTab === 'aplicacoes'}
              tabIndex={activeTab === 'aplicacoes' ? 0 : -1}
            >
              Aplicações
            </button>
          </div>

          <div className="guia-tab-content glass-panel">
            {activeTab === 'portas' && (
              <motion.div
                className="guia-panel"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              >
                <h3>Qual modelo serve na minha porta?</h3>
                <ul className="guia-list">
                  <li>
                    <strong><IcoPorta /> Portas Pivotantes / Madeira Maciça:</strong> Recomendamos <em>Fechaduras de Embutir</em>. Elas substituem a maçaneta original, têm o maquinário dentro da porta e oferecem o acabamento mais luxuoso.
                  </li>
                  <li>
                    <strong><IcoPredio /> Portas Padrão (Apartamento):</strong> Recomendamos <em>Fechaduras de Sobrepor</em>. Instaladas acima da maçaneta atual. Perfeitas para quem mora de aluguel ou não quer modificar a porta.
                  </li>
                  <li>
                    <strong><IcoVidro /> Portas de Vidro:</strong> Modelos específicos de encaixe ou pressão (com fita de alta fixação). Instalação segura sem necessidade de furar o vidro temperado.
                  </li>
                  <li>
                    <strong><IcoPorta /> Portas de Correr / Alumínio:</strong> Modelos de perfil estreito com lingueta em gancho (bico de papagaio) que travam lateralmente.
                  </li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'funcoes' && (
              <motion.div
                className="guia-panel"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              >
                <h3>Recursos de Segurança e Praticidade</h3>
                <ul className="guia-list">
                  <li>
                    <strong><IcoApp /> Gestão na Palma da Mão:</strong> Acompanhamento em tempo real (saiba quem entrou e a que horas) e liberação da porta à distância via aplicativo.
                  </li>
                  <li>
                    <strong><IcoDigital /> Senhas de Uso Único e Temporárias:</strong> Crie senhas exclusivas para prestadores de serviço, faxineiras ou hóspedes, que expiram automaticamente após o uso.
                  </li>
                  <li>
                    <strong><IcoApp /> Cenas em Automação Residencial:</strong> Integre sua fechadura à casa inteligente. Exemplo: ao abrir a porta com a sua digital, as luzes da sala acendem e o ar-condicionado liga sozinho.
                  </li>
                  <li>
                    <strong><IcoEscudo /> Segurança Anti-Arrombamento:</strong> Travamento automático ao encostar a porta, alarme integrado e modo "senha falsa" (digite números aleatórios antes da senha real para despistar curiosos).
                  </li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'aplicacoes' && (
              <motion.div
                className="guia-panel"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              >
                <h3>Onde utilizar?</h3>
                <ul className="guia-list">
                  <li>
                    <strong><IcoPorta /> Residências e Condomínios:</strong> Diga adeus ao molho de chaves pesado. Ideal para famílias grandes, facilitando o acesso de todos sem precisar fazer cópias de chave.
                  </li>
                  <li>
                    <strong><IcoPredio /> Escritórios e Clínicas:</strong> Controle total de quem entra e quem sai. Perfeito para restringir acesso a salas específicas (TI, Estoque, Diretoria) apenas para funcionários autorizados.
                  </li>
                  <li>
                    <strong><IcoPredio /> Airbnb / Locação por Temporada:</strong> A solução definitiva. Gere senhas temporárias que expiram automaticamente na data e hora do check-out do seu hóspede.
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Solução Airbnb */}
      <SolucaoAirbnb />

      {/* Seção Instalação Avulsa */}
      <section className="campanha-instalacao-avulsa">
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
      </section>

      {/* Chamada para Automação Completa */}
      <section className="campanha-section" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          className="offer-box glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(197, 160, 89, 0.2)' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Quer ir além da porta?</h2>
          <p style={{ color: '#c0c0c0', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Descubra como transformar sua casa inteira. Controle iluminação, ar-condicionado, cortinas e home theater por comando de voz ou celular.
          </p>
          <Link to="/automacao" className="campanha-btn-primary glow-effect" style={{ background: 'transparent', border: '2px solid var(--orange)', color: 'var(--orange)', padding: '1rem 2.5rem', display: 'inline-block' }}>
            Conhecer Projetos de Automação
          </Link>
        </motion.div>
      </section>

      {/* Oferta / Upsell */}
      <section className="campanha-section" id="combo">
        <motion.div
          className="offer-box premium-gradient"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
      </section>

      </main>
      <Footer />
      <WhatsAppButton message={MSG_FECHADURA_COMBO} />
    </div>
  );
};

export default CampanhaFechadura;
