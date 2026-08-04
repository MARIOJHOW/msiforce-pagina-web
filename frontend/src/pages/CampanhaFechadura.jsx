import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './CampanhaFechadura.css';
import WhatsAppButton from '../components/WhatsAppButton';
import { iniciarAds } from '../lib/ads';
import {
  MSG_FECHADURA_COMBO,
  MSG_FECHADURA_INSTALACAO,
  msgFechaduraModelo,
} from '../lib/gatilhos';

const VALOR_INSTALACAO_A_PARTIR = null;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const MODELOS = [
  {
    id: 'mfr3000v',
    nome: 'Fechadura MFR 3000',
    tag: 'Premium (Embutir)',
    imagem: '/fechadura_premium_3d.png',
    metodos: ['👆 Digital', '📱 App', '💳 Tag', '🔢 Senha', '🔑 Chave'],
  },
  {
    id: 'fr221v',
    nome: 'Fechadura FR 221',
    tag: 'Design (Embutir)',
    imagem: '/fechadura_design_3d.png',
    metodos: ['👆 Digital', '🔢 Senha'],
  },
  {
    id: 'fr102',
    nome: 'Fechadura FR 102',
    tag: 'Intermediária (Sobrepor)',
    imagem: '/fechadura_inter_3d.png',
    metodos: ['🔢 Senha (Touch)'],
  },
  {
    id: 'fr10',
    nome: 'Fechadura FR 10',
    tag: 'Custo-Benefício (Sobrepor)',
    imagem: '/fechadura_custo_3d.png',
    metodos: ['🔢 Senha'],
  },
];

const CampanhaFechadura = () => {
  useEffect(() => {
    document.title = 'Fechadura Digital em SP - MSIFORCE Premium';
    window.scrollTo(0, 0);
    iniciarAds();
  }, []);

  return (
    <div className="campanha-container">
      {/* Hero Section */}
      <section className="campanha-hero">
        <div className="mesh-gradient-bg"></div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-content-wrapper"
        >
          <motion.div variants={fadeUp} className="campanha-badge">
            <span className="badge-dot"></span> Oferta Especial São Paulo
          </motion.div>
          
          <motion.h1 variants={fadeUp}>
            Sua Casa Inteligente<br />
            <span className="text-highlight">Começa na Porta.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp}>
            Eleve o nível de segurança e design da sua residência. Esqueça as chaves e tenha o controle total do seu lar na palma da mão ou na ponta dos dedos.
          </motion.p>
          
          {VALOR_INSTALACAO_A_PARTIR && (
            <motion.p variants={fadeUp} className="campanha-faixa-preco">
              Instalação especializada a partir de <strong>{VALOR_INSTALACAO_A_PARTIR}</strong>
            </motion.p>
          )}
          
          <motion.div variants={fadeUp}>
            <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary glow-effect black-text">
              Falar com Especialista
            </WhatsAppButton>
          </motion.div>
        </motion.div>

        {/* Vitrine de Modelos */}
        <motion.div 
          className="modelos-vitrine" 
          id="modelos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 variants={fadeUp} className="vitrine-titulo">Linha Premium Smart</motion.h3>
          <div className="modelos-grid">
            {MODELOS.map((m) => (
              <motion.div variants={fadeUp} className="modelo-card glass-panel" key={m.id}>
                <div className="modelo-imagem">
                  <div className="modelo-glow"></div>
                  <img src={m.imagem} alt={m.nome} loading="lazy" />
                </div>
                <div className="modelo-info">
                  <span className="modelo-tag">{m.tag}</span>
                  <h4>{m.nome}</h4>
                  <div className="metodos-abertura">
                    {m.metodos.map((metodo) => (
                      <span className="metodo-badge" key={metodo}>
                        {metodo}
                      </span>
                    ))}
                  </div>
                  <WhatsAppButton
                    message={msgFechaduraModelo(m.nome)}
                    className="botao-comprar-kit"
                  >
                    Instalar este modelo
                  </WhatsAppButton>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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
              <div className="bento-icon">👆</div>
              <h3>Acesso Biométrico Instantâneo</h3>
              <p>Sua digital é sua chave. Abra a porta em menos de 0.5 segundos sem precisar procurar nada na bolsa.</p>
            </div>
            <div className="bento-bg-gradient bento-bg-1"></div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
            <div className="bento-content">
              <div className="bento-icon">📱</div>
              <h3>App & Senhas Remotas</h3>
              <p>Crie senhas temporárias para visitas, diaristas ou familiares de onde estiver, direto pelo celular.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bento-card bento-glass">
            <div className="bento-content">
              <div className="bento-icon">🛡️</div>
              <h3>Segurança Máxima</h3>
              <p>Travamento automático, alarme anti-arrombamento e aviso de pilha fraca.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Seção Instalação Avulsa */}
      <section className="campanha-instalacao-avulsa" id="instalacao">
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
            <li><span className="check-icon">✓</span> Acabamento de marcenaria fina</li>
            <li><span className="check-icon">✓</span> Configuração completa da rede Wi-Fi</li>
            <li><span className="check-icon">✓</span> Treinamento presencial para a família</li>
          </ul>
          <WhatsAppButton message={MSG_FECHADURA_INSTALACAO} className="botao-instalacao-avulsa">
            Orçar Apenas a Instalação
          </WhatsAppButton>
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
            <span>🎁</span> Bônus Exclusivo: Consultoria de Automação gratuita no local!
          </div>
          <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary glow-effect black-text">
            Quero Agendar Minha Instalação
          </WhatsAppButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="campanha-footer">
        <p>© {new Date().getFullYear()} MSIFORCE - Automação Residencial. Padrão Premium em São Paulo.</p>
      </footer>

      <WhatsAppButton message={MSG_FECHADURA_COMBO} />
    </div>
  );
};

export default CampanhaFechadura;
