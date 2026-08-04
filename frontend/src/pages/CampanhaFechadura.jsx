import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    nome: 'Modelo Premium',
    tag: 'Premium (Embutir)',
    imagem: '/fechadura_premium_3d.png',
    metodos: ['👆 Digital', '📱 App', '💳 Tag', '🔢 Senha', '🔑 Chave'],
  },
  {
    id: 'fr221v',
    nome: 'Modelo Design',
    tag: 'Design (Embutir)',
    imagem: '/fechadura_design_3d.png',
    metodos: ['👆 Digital', '🔢 Senha'],
  },
  {
    id: 'fr102',
    nome: 'Modelo Intermediário',
    tag: 'Intermediária (Sobrepor)',
    imagem: '/fechadura_inter_3d.png',
    metodos: ['🔢 Senha (Touch)'],
  },
  {
    id: 'fr10',
    nome: 'Modelo Custo-Benefício',
    tag: 'Custo-Benefício (Sobrepor)',
    imagem: '/fechadura_custo_3d.png',
    metodos: ['🔢 Senha'],
  },
];

const CampanhaFechadura = () => {
  const [activeTab, setActiveTab] = useState('portas');

  useEffect(() => {
    document.title = 'Casa Inteligente e Fechaduras Digitais - MSIFORCE';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Instalação especializada de fechaduras digitais e projetos de Casa Inteligente em São Paulo. Autorizada Intelbras, Yale, Pado, Papaiz. Solicite orçamento.";

    window.scrollTo(0, 0);
    iniciarAds();
    
    // Injeção do Google Tag Manager apenas nesta página
    if (!document.getElementById('gtm-script')) {
      const gtmScript = document.createElement('script');
      gtmScript.id = 'gtm-script';
      gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZ2W9J6R');`;
      document.head.appendChild(gtmScript);
    }
  }, []);

  return (
    <div className="campanha-container">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-MZ2W9J6R"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}

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

          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-complete">
              <div className="hero-image-glow"></div>
              <img src="/fechadura_completa.png" alt="Fechadura Inteligente" className="main-lock-img complete-img" />
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
              <img src="/logo.webp" alt="MSIFORCE" className="cert-logo" />
              <h3>MSIFORCE</h3>
            </div>
            <h4>Instalação Especializada e Certificada</h4>
            <p>Técnico treinado e certificado pelas maiores marcas do mercado: <strong>Intelbras, Papaiz, Yale, Pado e Elsys</strong>.</p>
          </motion.div>
        </section>

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
                  <img src={m.imagem} alt={m.nome} loading="lazy" width="400" height="400" />
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
                    <strong>🚪 Portas Pivotantes / Madeira Maciça:</strong> Recomendamos <em>Fechaduras de Embutir</em>. Elas substituem a maçaneta original, têm o maquinário dentro da porta e oferecem o acabamento mais luxuoso.
                  </li>
                  <li>
                    <strong>🏢 Portas Padrão (Apartamento):</strong> Recomendamos <em>Fechaduras de Sobrepor</em>. Instaladas acima da maçaneta atual. Perfeitas para quem mora de aluguel ou não quer modificar a porta.
                  </li>
                  <li>
                    <strong>🧊 Portas de Vidro:</strong> Modelos específicos de encaixe ou pressão (com fita de alta fixação). Instalação segura sem necessidade de furar o vidro temperado.
                  </li>
                  <li>
                    <strong>🏠 Portas de Correr / Alumínio:</strong> Modelos de perfil estreito com lingueta em gancho (bico de papagaio) que travam lateralmente.
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
                    <strong>📱 Gestão na Palma da Mão:</strong> Acompanhamento em tempo real (saiba quem entrou e a que horas) e liberação da porta à distância via aplicativo.
                  </li>
                  <li>
                    <strong>🔑 Senhas de Uso Único e Temporárias:</strong> Crie senhas exclusivas para prestadores de serviço, faxineiras ou hóspedes, que expiram automaticamente após o uso.
                  </li>
                  <li>
                    <strong>🏠 Cenas em Automação Residencial:</strong> Integre sua fechadura à casa inteligente. Exemplo: ao abrir a porta com a sua digital, as luzes da sala acendem e o ar-condicionado liga sozinho.
                  </li>
                  <li>
                    <strong>🛡️ Segurança Anti-Arrombamento:</strong> Travamento automático ao encostar a porta, alarme integrado e modo "senha falsa" (digite números aleatórios antes da senha real para despistar curiosos).
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
                    <strong>🏠 Residências e Condomínios:</strong> Diga adeus ao molho de chaves pesado. Ideal para famílias grandes, facilitando o acesso de todos sem precisar fazer cópias de chave.
                  </li>
                  <li>
                    <strong>🏢 Escritórios e Clínicas:</strong> Controle total de quem entra e quem sai. Perfeito para restringir acesso a salas específicas (TI, Estoque, Diretoria) apenas para funcionários autorizados.
                  </li>
                  <li>
                    <strong>🧳 Airbnb / Locação por Temporada:</strong> A solução definitiva. Gere senhas temporárias que expiram automaticamente na data e hora do check-out do seu hóspede.
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
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
      {/* Chamada para Automação Completa */}
      <section className="campanha-section" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div 
          className="offer-box glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(74, 222, 128, 0.2)' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Quer ir além da porta?</h2>
          <p style={{ color: '#c0c0c0', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Descubra como transformar sua casa inteira. Controle iluminação, ar-condicionado, cortinas e home theater por comando de voz ou celular.
          </p>
          <Link to="/automacao" className="campanha-btn-primary glow-effect" style={{ background: 'transparent', border: '2px solid #4ade80', color: '#4ade80', padding: '1rem 2.5rem', display: 'inline-block' }}>
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
