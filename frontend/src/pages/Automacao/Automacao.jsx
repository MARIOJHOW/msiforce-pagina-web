import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Automacao.css';
import WhatsAppButton from '../../components/WhatsAppButton';
import useSEO from '../../hooks/useSEO';
import { iniciarAds } from '../../lib/ads';
import {
  MSG_FECHADURA_AUTOMACAO,
  MSG_ACESSO_CORPORATIVO,
  MSG_AUTOMACAO_PROJETO,
} from '../../lib/gatilhos';

export default function Automacao() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);

  useSEO({
    title: 'Automação Residencial de Alto Padrão em SP',
    description:
      'Projetos de automação residencial premium em São Paulo: fechadura digital com biometria, iluminação, climatização e segurança integradas em um único app.',
    canonical: 'https://msiforce.com.br/automacao',
  });

  // Página recebe tráfego pago: sem isto nenhuma conversão é registrada.
  useEffect(() => { 
    window.scrollTo(0, 0);
    iniciarAds(); 
  }, []);

  const handleQuizAnswer = (answer) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setQuizSuccess(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="page-automacao">
      
      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="eyebrow">Smart Home Premium</motion.div>
          <motion.h1 variants={fadeUp} className="hero-h1">O futuro do luxo é<br /><span>invisível e responsivo.</span></motion.h1>
          <motion.p variants={fadeUp} className="hero-p">
            Transformamos ambientes de alto padrão em ecossistemas inteligentes. Comece pela porta: fechadura digital com biometria, e depois iluminação, clima, áudio e segurança com um único toque.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-cta">
            <WhatsAppButton message={MSG_FECHADURA_AUTOMACAO} className="btn-primary">
              Quero minha Fechadura Digital
            </WhatsAppButton>
          </motion.div>
        </motion.div>
      </section>

      {/* SHOWCASE */}
      <section id="showcase">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer} className="auto-section-header"
        >
          <motion.h2 variants={fadeUp}>Experiências <span>Exclusivas</span></motion.h2>
          <motion.p variants={fadeUp}>A tecnologia não deve ser vista, deve ser sentida. Descubra como elevamos o padrão de conforto da sua residência.</motion.p>
        </motion.div>

        {/* Item 1 */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="zigzag-row">
          <motion.div variants={fadeUp} className="zz-img-wrapper">
            <img src="/lux_lighting.webp" className="zz-img" alt="Iluminação Inteligente" />
          </motion.div>
          <motion.div variants={fadeUp} className="zz-content">
            <h3>Iluminação <span>Cênica</span></h3>
            <p>Esqueça dezenas de interruptores espalhados pela parede. Crie cenas perfeitas para o Jantar, Cinema ou Festa com apenas um toque no seu smartphone ou painel de vidro.</p>
            <ul className="benefit-list">
              <li>Controle absoluto por Alexa ou Apple Home</li>
              <li>Dimming suave para relaxamento</li>
              <li>Agendamento automático com o nascer do sol</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Item 2 */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="zigzag-row reverse">
          <motion.div variants={fadeUp} className="zz-img-wrapper">
            <img src="/lux_security.webp" className="zz-img" alt="Fechadura Biométrica" />
          </motion.div>
          <motion.div variants={fadeUp} className="zz-content">
            <h3>Segurança <span>Invisível</span></h3>
            <p>Sua digital é a sua chave. Fechaduras biométricas de design impecável que garantem segurança extrema sem comprometer a arquitetura da sua porta.</p>
            <ul className="benefit-list">
              <li>Acesso remoto para visitantes e funcionários</li>
              <li>Notificações em tempo real no celular</li>
              <li>Integração com câmeras e alarmes</li>
            </ul>
            <div className="zz-ctas">
              <WhatsAppButton message={MSG_FECHADURA_AUTOMACAO} className="btn-primary">
                Quero para minha casa
              </WhatsAppButton>
              <WhatsAppButton message={MSG_ACESSO_CORPORATIVO} className="btn-secondary">
                Empresa ou condomínio
              </WhatsAppButton>
            </div>
            <Link to="/casa-inteligente" className="zz-link">ver modelos e instalação →</Link>
          </motion.div>
        </motion.div>

        {/* Item 3 */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="zigzag-row">
          <motion.div variants={fadeUp} className="zz-img-wrapper">
            <img src="/lux_cinema.webp" className="zz-img" alt="Home Theater" />
          </motion.div>
          <motion.div variants={fadeUp} className="zz-content">
            <h3>Entretenimento <span>Imersivo</span></h3>
            <p>Transforme sua sala em uma sala de cinema particular. Com o comando "Hora do filme", as cortinas se fecham, as luzes diminuem e o projetor liga automaticamente.</p>
            <ul className="benefit-list">
              <li>Áudio Multi-room embutido e sem fios</li>
              <li>Qualidade Hi-Fi para música e cinema</li>
              <li>Controle integrado no Spotify ou Apple Music</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Item 4 */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="zigzag-row reverse">
          <motion.div variants={fadeUp} className="zz-img-wrapper">
            <img src="/lux_remote.webp" className="zz-img" alt="Controle pelo Celular" />
          </motion.div>
          <motion.div variants={fadeUp} className="zz-content">
            <h3>Sua Casa na <span>Palma da Mão</span></h3>
            <p>Esteja você no escritório ou em uma viagem de negócios em outro continente, sua residência está sempre sob seu controle em tempo real.</p>
            <ul className="benefit-list">
              <li>Acesse câmeras e portas de qualquer lugar</li>
              <li>Receba alertas instantâneos de qualquer evento</li>
              <li>Aplicativo único para toda a automação</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* BENTO */}
      <section id="bento">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer} className="auto-section-header"
        >
          <motion.h2 variants={fadeUp}>Por que <span>Automatizar?</span></motion.h2>
          <motion.p variants={fadeUp}>Mais do que tecnologia, entregamos qualidade de vida, economia e valorização imobiliária.</motion.p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer} className="auto-bento-grid"
        >
          <motion.div variants={fadeUp} className="auto-bento-card large">
            <div className="auto-bento-bg" style={{ backgroundImage: "url('/lux_remote.webp')" }}></div>
            <div className="auto-bento-content">
              <div className="b-icon">🎙️</div>
              <h3>O poder da sua voz</h3>
              <p>Diga: "Alexa, boa noite". Todas as luzes se apagam, as portas trancam, o ar ajusta para a temperatura ideal e o alarme é ativado instantaneamente.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="auto-bento-card">
            <div className="auto-bento-bg" style={{ backgroundImage: "url('/painel_premium.webp')" }}></div>
            <div className="auto-bento-content">
              <div className="b-icon">🔋</div>
              <h3>Economia Inteligente</h3>
              <p>Sensores desligam o ar e luzes se o ambiente estiver vazio. Gestão de energia premium.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="auto-bento-card">
            <div className="auto-bento-bg" style={{ backgroundImage: "url('/lux_curtains.webp')" }}></div>
            <div className="auto-bento-content">
              <div className="b-icon">🪟</div>
              <h3>Cortinas Motorizadas</h3>
              <p>Motores ultra-silenciosos protegem seus móveis do sol e garantem privacidade com um clique.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="auto-bento-card large">
            <div className="auto-bento-bg" style={{ backgroundImage: "url('/lux_cinema.webp')" }}></div>
            <div className="auto-bento-content">
              <div className="b-icon">📈</div>
              <h3>Valorização do Imóvel</h3>
              <p>Casas inteligentes são o novo padrão do mercado de luxo. A automação eleva o valor de revenda do seu imóvel imediatamente.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="auto-bento-card">
            <div className="auto-bento-bg" style={{ backgroundImage: "url('/alarme_premium.webp')" }}></div>
            <div className="auto-bento-content">
              <div className="b-icon">🛡️</div>
              <h3>Segurança Ativa</h3>
              <p>Receba notificações instantâneas no celular em caso de movimentação suspeita.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* QUIZ */}
      <section id="quiz">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer} className="auto-section-header"
        >
          <motion.h2 variants={fadeUp}>Qual o <span>projeto ideal</span> para você?</motion.h2>
          <motion.p variants={fadeUp}>Responda 3 perguntas rápidas para desenharmos a sua solução premium.</motion.p>
        </motion.div>

        <div className="quiz-container">
          {!quizFinished && !quizSuccess && (
            <div className="quiz-progress">
              <div className={`quiz-dot ${quizStep >= 0 ? 'active' : ''}`}></div>
              <div className={`quiz-dot ${quizStep >= 1 ? 'active' : ''}`}></div>
              <div className={`quiz-dot ${quizStep >= 2 ? 'active' : ''}`}></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!quizFinished && !quizSuccess && quizStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="quiz-card">
                <h3>Qual o <span>tamanho</span> do imóvel?</h3>
                <p className="quiz-sub">Isso nos ajuda a dimensionar a infraestrutura.</p>
                <div className="quiz-options">
                  {['Até 70m² (Compacto)', '71m² a 150m² (Padrão)', '151m² a 300m² (Alto Padrão)', 'Acima de 300m² (Mansão)'].map(opt => (
                    <button key={opt} className="quiz-opt" onClick={() => handleQuizAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </motion.div>
            )}

            {!quizFinished && !quizSuccess && quizStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="quiz-card">
                <h3>Qual o seu <span>foco principal</span>?</h3>
                <p className="quiz-sub">Para direcionarmos a proposta corretamente.</p>
                <div className="quiz-options">
                  {['Conforto e Praticidade', 'Segurança', 'Entretenimento', 'Automação Completa'].map(opt => (
                    <button key={opt} className="quiz-opt" onClick={() => handleQuizAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </motion.div>
            )}

            {!quizFinished && !quizSuccess && quizStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="quiz-card">
                <h3>Qual o <span>status atual</span> do imóvel?</h3>
                <p className="quiz-sub">Última pergunta para avaliar viabilidade.</p>
                <div className="quiz-options">
                  {['Já moro no local (Pronto)', 'Em fase de projeto', 'Em obras / Reforma', 'Comprando na planta'].map(opt => (
                    <button key={opt} className="quiz-opt" onClick={() => handleQuizAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </motion.div>
            )}

            {quizFinished && !quizSuccess && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-card">
                <h3>Análise <span>pronta!</span> 🎯</h3>
                <p style={{ color: "var(--white)", fontWeight: "500", marginBottom: "24px", marginTop: "16px" }}>Preencha abaixo para agendar sua consultoria premium.</p>
                <form className="quiz-lead-form" onSubmit={handleQuizSubmit}>
                  <input type="text" placeholder="Seu nome completo" required />
                  <input type="email" placeholder="E-mail corporativo ou pessoal" required />
                  <input type="tel" placeholder="WhatsApp" required />
                  <button type="submit" className="quiz-submit">Solicitar Contato Exclusivo</button>
                  <p style={{ fontSize: "0.75rem", color: "var(--gray)", marginTop: "12px" }}>Privacidade absoluta garantida.</p>
                </form>
              </motion.div>
            )}

            {quizSuccess && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-card">
                <div style={{ fontSize: "3rem", marginBottom: "16px", color: "var(--gold)" }}>✓</div>
                <h3>Solicitação <span>recebida!</span></h3>
                <p style={{ color: "var(--gray)", fontSize: "1rem", marginTop: "16px" }}>Nosso Especialista entrará em contato em breve.</p>
                <WhatsAppButton message={MSG_AUTOMACAO_PROJETO} className="btn-primary quiz-cta">
                  Falar no WhatsApp Agora
                </WhatsAppButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2>Sua casa. <span>Suas regras.</span></h2>
          <p>Agende uma consultoria gratuita. Vamos desenhar o projeto perfeito para elevar o padrão da sua residência sem dores de cabeça.</p>
          <WhatsAppButton message={MSG_AUTOMACAO_PROJETO} className="btn-primary">
            Iniciar Meu Projeto
          </WhatsAppButton>
        </motion.div>
      </section>

      {/* Cross-link para Fechaduras */}
      <section style={{ padding: '6rem 2rem', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '4rem 2rem', borderRadius: '24px', maxWidth: '800px', width: '100%' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Buscando apenas Fechaduras?</h2>
          <p style={{ color: '#c0c0c0', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Não quer um projeto completo agora? Sem problemas. Conheça nossa linha premium de Fechaduras Digitais com instalação especializada em São Paulo.
          </p>
          <Link to="/casa-inteligente" className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--gold)', color: 'var(--gold)', display: 'inline-block', textDecoration: 'none' }}>
            Ver Fechaduras Digitais
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
