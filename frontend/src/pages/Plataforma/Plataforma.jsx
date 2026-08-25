import { motion } from 'framer-motion';
import useSEO from '../../hooks/useSEO';
import './Plataforma.css';

export default function Plataforma() {
  useSEO({
    title: 'Software CRM para Eletricistas',
    description: 'Plataforma de CRM e gestão de orçamentos desenvolvida especialmente para eletricistas e prestadores de serviços. Organize clientes, propostas e agendamentos.',
  });

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
    <div className="page-plataforma">
      
      {/* HERO */}
      <section id="hero">
        <motion.div 
          className="hero-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="hero-eyebrow">
            <span className="blink"></span>
            Software Exclusivo para Clientes
          </motion.div>
          <motion.h1 variants={fadeUp} className="hero-h1">
            <span className="line-stroke">CRM &amp; IA</span>
            <span className="line-orange">NO WHATSAPP</span>
            <span className="line-white">A Arte de Vender.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-tagline">
            <strong>Escale as vendas da sua empresa de alto padrão.</strong><br />
            Qualificação de leads via Inteligência Artificial, geração de orçamentos em PDF em segundos e gestão completa pelo WhatsApp.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-btns">
            <a href="https://wa.me/5511910773865" target="_blank" rel="noreferrer" className="btn-hero">Agendar Demonstração</a>
          </motion.div>
          <motion.div variants={fadeUp} className="hero-norms">
            <div className="norm-badge">CRM Inteligente</div>
            <div className="norm-badge">Atendimento 24h</div>
            <div className="norm-badge">Orçamentos PDF</div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", background: "var(--gold)", filter: "blur(150px)", opacity: "0.2", zIndex: "1", borderRadius: "50%" }}></div>
          <div style={{ position: "relative", zIndex: "2", transform: "rotateY(-12deg) rotateX(4deg)", boxShadow: "0 24px 60px rgba(0,0,0,0.8)" }}>
            <img src="/crm_mockup.webp" alt="CRM Mockup" style={{ width: "100%", maxWidth: "560px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
        </motion.div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-item"><span className="ti-icon">✅</span><span><strong>Zero</strong> contrato de fidelidade</span></div>
        <div className="trust-item"><span className="ti-icon">🤖</span><span><strong>IA Llama 3</strong> integrada</span></div>
        <div className="trust-item"><span className="ti-icon">📄</span><span><strong>PDF</strong> gerado em segundos</span></div>
        <div className="trust-item"><span className="ti-icon">📱</span><span><strong>WhatsApp</strong> nativo</span></div>
      </div>

      {/* PROBLEMA */}
      <section id="problema" className="p-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.span variants={fadeUp} className="eyebrow-num">01 — O Gargalo</motion.span>
          <motion.h2 variants={fadeUp} className="p-h2">Você é o dono<br />ou o <em>atendente?</em></motion.h2>
          <motion.div variants={fadeUp} className="divider"></motion.div>
          <motion.p variants={fadeUp} className="p-desc">
            Empresas perdem dezenas de contratos toda semana porque a equipe está focada na execução e o WhatsApp fica sem resposta.
          </motion.p>
          <motion.div variants={fadeUp} className="pain-grid">
            <div className="pain-card">
              <span className="pain-icon">🌙</span>
              <h3>Leads perdidos à noite</h3>
              <p>Domingo à noite o cliente pesquisa. Segunda de manhã ele já fechou com o concorrente que atendeu imediatamente.</p>
            </div>
            <div className="pain-card">
              <span className="pain-icon">📄</span>
              <h3>O pesadelo do orçamento manual</h3>
              <p>Chegar exausto e ainda abrir o computador para montar PDFs. O cliente desiste pelo tempo de espera.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="p-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.span variants={fadeUp} className="eyebrow-num">02 — A Solução</motion.span>
          <motion.h2 variants={fadeUp} className="p-h2">Nossas<br /><em>Funcionalidades.</em></motion.h2>
          <motion.div variants={fadeUp} className="divider"></motion.div>
          
          <motion.div variants={fadeUp} className="svc-grid">
            <div className="svc-card hot">
              <div className="svc-num">01</div>
              <div className="svc-name">IA Humanizada</div>
              <div className="svc-scope">Vendas · Suporte</div>
              <p className="svc-desc">Um assistente que entende o contexto e qualifica o cliente 24h por dia.</p>
              <ul className="svc-list">
                <li>Treinado com seus dados</li>
                <li>Agendamento automatizado</li>
              </ul>
            </div>
            <div className="svc-card">
              <div className="svc-num">02</div>
              <div className="svc-name">Orçamentos PDF</div>
              <div className="svc-scope">Propostas</div>
              <p className="svc-desc">A IA gera e envia uma proposta profissional diretamente no WhatsApp.</p>
              <ul className="svc-list">
                <li>Layouts profissionais</li>
                <li>Cálculo automático</li>
              </ul>
            </div>
            <div className="svc-card">
              <div className="svc-num">03</div>
              <div className="svc-name">Funil Kanban</div>
              <div className="svc-scope">CRM Visual</div>
              <p className="svc-desc">Saiba exatamente em qual etapa de negociação cada lead está.</p>
              <ul className="svc-list">
                <li>Arrastar e soltar</li>
                <li>Lembretes de follow-up</li>
              </ul>
            </div>
            <div className="svc-card">
              <div className="svc-num">04</div>
              <div className="svc-name">Métricas</div>
              <div className="svc-scope">Inteligência</div>
              <p className="svc-desc">Acompanhe taxas de conversão e desempenho em tempo real.</p>
              <ul className="svc-list">
                <li>Gráficos precisos</li>
                <li>Exportação em Excel</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* DEMO */}
      <section id="demonstracao" className="p-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.span variants={fadeUp} className="eyebrow-num">03 — Fluxo Automático</motion.span>
          <motion.h2 variants={fadeUp} className="p-h2">Do "Oi" do cliente<br />ao orçamento aprovado.<br /><em>Automático.</em></motion.h2>
          <motion.div variants={fadeUp} className="divider"></motion.div>
          
          <div className="demo-layout">
            <div className="demo-steps">
              {[
                { n: "01", t: "Qualificação Inteligente", d: "O cliente manda mensagem. A IA entende, qualifica e salva no CRM." },
                { n: "02", t: "Geração de Proposta", d: "Você dita o valor. O sistema monta o PDF profissional instantaneamente." },
                { n: "03", t: "Envio Elegante", d: "O cliente recebe o arquivo formatado e decide na hora." },
                { n: "04", t: "Follow-up Sem Esforço", d: "A IA entra em contato sozinha caso o cliente suma após 48h." }
              ].map((step, i) => (
                <motion.div variants={fadeUp} className="step" key={i}>
                  <span className="step-num">{step.n}</span>
                  <div>
                    <h4>{step.t}</h4>
                    <p>{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="demo-phone-wrap">
              <div className="demo-phone">
                <div className="dp-header">
                  <div className="dp-avatar">🤖</div>
                  <div>
                    <div className="dp-title">IA Comercial</div>
                    <div className="dp-status">● Online 24h</div>
                  </div>
                </div>
                <div className="dp-body">
                  <div className="dmsg in">Olá! Como posso ajudar sua residência hoje? 🏢</div>
                  <div className="dmsg out">Preciso de um projeto de automação.</div>
                  <div className="dmsg in">✅ Registrado! Segue o Orçamento Oficial em PDF:</div>
                  <div className="dmsg in" style={{ border: "1px solid rgba(197, 160, 89, 0.3)", background: "rgba(197, 160, 89, 0.05)" }}>
                    📁 <strong>Projeto_SmartHome.pdf</strong><br /><small style={{ color: "var(--gold)" }}>Baixar • 1 MB</small>
                  </div>
                  <div className="dmsg in">Para confirmar a visita, responda <strong>EU APROVO</strong> 👇</div>
                  <div className="dmsg out" style={{ marginTop: "16px" }}><strong>EU APROVO</strong> ✅</div>
                </div>
                <div className="dp-alert">
                  <strong>💰 Negócio Fechado!</strong><br />Lead movido para "Aprovado" no CRM.
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="fechamento" className="p-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.span variants={fadeUp} className="eyebrow-num">04 — Acesso Exclusivo</motion.span>
          <motion.h2 variants={fadeUp} className="p-h2">Planos para<br /><em>Alta Performance.</em></motion.h2>
          <motion.div variants={fadeUp} className="divider"></motion.div>
          
          <motion.div variants={fadeUp} className="pricing-grid">
            <div className="price-card">
              <div className="price-badge orange">INICIANTE</div>
              <div className="price-label">Plano START</div>
              <div className="price-audience">Para autônomos exigentes</div>
              <h3>Atendimento 24h</h3>
              <div className="price-amount"><small>R$</small> 147 <small>setup</small></div>
              <div className="price-monthly"><strong>R$ 97/mês</strong> manutenção</div>
              <ul className="price-features">
                <li><span className="chk">✓</span> Atendente IA Básica</li>
                <li><span className="chk">✓</span> Alerta de leads</li>
                <li><span className="chk">✓</span> Painel Web</li>
              </ul>
              <a href="https://wa.me/5511910773865" className="price-btn ghost" target="_blank" rel="noreferrer">Assinar START</a>
            </div>

            <div className="price-card pro">
              <div className="price-badge green">MAIS ESCOLHIDO</div>
              <div className="price-label">Plano PRO</div>
              <div className="price-audience">Para empresas em escala</div>
              <h3>CRM Completo</h3>
              <div className="price-amount"><small>R$</small> 297 <small>setup</small></div>
              <div className="price-monthly"><strong style={{ color: "var(--gold)" }}>R$ 147/mês</strong> manutenção</div>
              <ul className="price-features">
                <li><span className="chk">✓</span> <strong>Motor de Orçamentos PDF</strong></li>
                <li><span className="chk">✓</span> <strong>CRM Kanban Visual</strong></li>
                <li><span className="chk">✓</span> IA Avançada (Llama 3)</li>
                <li><span className="chk">✓</span> Follow-up Automático</li>
              </ul>
              <a href="https://wa.me/5511910773865" className="price-btn" target="_blank" rel="noreferrer">Assinar PRO</a>
            </div>

            <div className="price-card elite">
              <div className="price-badge gold-b">VIP</div>
              <div className="price-label">Plano ELITE</div>
              <div className="price-audience">Para franquias e redes</div>
              <h3>Consultoria C-Level</h3>
              <div className="price-amount" style={{ color: "var(--gold)" }}><small style={{ color: "var(--gold)" }}>R$</small> 497 <small>setup</small></div>
              <div className="price-monthly"><strong style={{ color: "var(--gold)" }}>R$ 297/mês</strong> manutenção</div>
              <ul className="price-features">
                <li><span className="chk">✓</span> Tudo do PRO</li>
                <li><span className="chk">✓</span> Reuniões Estratégicas Mensais</li>
                <li><span className="chk">✓</span> IA Treinada com seu Material</li>
                <li><span className="chk">✓</span> Suporte Prioritário</li>
              </ul>
              <a href="https://wa.me/5511910773865" className="price-btn ghost" target="_blank" rel="noreferrer">Assinar ELITE</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
