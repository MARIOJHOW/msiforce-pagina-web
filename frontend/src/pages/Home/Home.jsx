import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackCTA } from '../../hooks/useAnalytics';
import FormDiagnostico from '../../components/FormDiagnostico';
import DiferencialBanner from '../../components/DiferencialBanner';
import Parceiros from '../../components/Parceiros';
import SobreEmpresa from '../../components/SobreEmpresa';
import './Home.css';

const WA_LINK = 'https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20solicitar%20uma%20consultoria%20gratuita.';

/* Framer variants */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* Animated counter hook */
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ref.current) {
          ref.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, nodeRef];
}

function StatItem({ value, suffix, label }) {
  const [count, ref] = useCounter(value);
  return (
    <div className="trust-stat" ref={ref}>
      <span className="trust-num">{count}{suffix}</span>
      <span className="trust-label">{label}</span>
    </div>
  );
}

const SECTORS = [
  { icon: '🏢', label: 'Empresas & Escritórios' },
  { icon: '🏗️', label: 'Condomínios' },
  { icon: '🏭', label: 'Indústrias' },
  { icon: '🏥', label: 'Clínicas & Consultórios' },
  { icon: '🛒', label: 'Comércios' },
  { icon: '🍔', label: 'Redes de Franquias' },
  { icon: '🔧', label: 'Gestores de Infraestrutura' },
];

const SERVICES = [
  { num: '01', title: 'Projetos & Instalações Elétricas',  desc: 'Projetos residenciais e comerciais conforme ABNT NBR 5410. Quadros de distribuição, SPDA, automação de cargas e laudos com ART.', tag: 'Elétrica',   img: '/img_eletrica.webp',   large: true },
  { num: '02', title: 'Automação Residencial',             desc: 'Controle centralizado de iluminação, clima, cortinas e ambientes via app ou painel. Integração com assistentes de voz.',          tag: 'Automação', img: '/img_automacao.webp'  },
  { num: '03', title: 'Segurança Eletrônica',              desc: 'Alarmes perimetrais, sensores de presença e cerca elétrica integrados a um painel central com notificações em tempo real.',         tag: 'Segurança', img: '/img_seguranca.webp'  },
  { num: '04', title: 'CFTV & Monitoramento',              desc: 'Câmeras IP 4K com visão noturna, acesso remoto pelo celular e armazenamento em nuvem ou DVR local com criptografia.',             tag: 'CFTV',      img: '/img_cftv.webp',      },
  { num: '05', title: 'Controle de Acesso',                desc: 'Biometria, cartão RFID, reconhecimento facial e fechaduras eletrônicas com registro de entradas e integração ao CFTV.',            tag: 'Acesso',    img: '/img_acesso.webp'     },
  { num: '06', title: 'Redes Estruturadas',                desc: 'Cabeamento Cat6/Cat6A certificado, rack organizado, Wi-Fi empresarial com cobertura total e segmentação de rede por VLAN.',         tag: 'Redes',     img: '/img_redes.webp'      },
  { num: '07', title: 'Infraestrutura de TI',              desc: 'Montagem e manutenção de rack, servidores, nobreak e datacenter local. Planejamento de escalabilidade e redundância.',              tag: 'TI',        img: '/img_ti.webp',        },
  { num: '08', title: 'Manutenção Preventiva & Corretiva', desc: 'Contratos recorrentes com visitas programadas, relatórios técnicos e SLA definido para minimizar paradas operacionais.',            tag: 'Manutenção',img: '/img_manutencao.webp' },
];

const DIFERENCIAIS = [
  {
    icon: '⚡',
    title: 'Parceiro Completo',
    desc: 'Uma única empresa para elétrica, automação, TI e segurança. Menos fornecedores, mais controle e responsabilidade centralizada.',
  },
  {
    icon: '📋',
    title: 'Normas Técnicas',
    desc: 'Projetos executados conforme NR-10, NR-35 e ABNT NBR 5410, com emissão de ART e laudo técnico para cada instalação.',
  },
  {
    icon: '🔧',
    title: 'Suporte Contínuo',
    desc: 'Contratos de manutenção com SLA garantido. Se algo falhar, nossa equipe resolve — sem depender de terceiros.',
  },
  {
    icon: '📐',
    title: 'Projetos Sob Medida',
    desc: 'Nenhuma empresa é igual. Cada projeto começa com um diagnóstico gratuito para entender sua operação e orçar com precisão.',
  },
];

const PROCESSO = [
  { num: '01', title: 'Diagnóstico', desc: 'Visita técnica gratuita para mapear suas necessidades e entender o ambiente operacional.' },
  { num: '02', title: 'Projeto', desc: 'Proposta técnica detalhada com escopo, cronograma e orçamento. Entrega em até 3 dias úteis.' },
  { num: '03', title: 'Execução', desc: 'Instalação com equipe técnica própria, dentro do prazo e do orçamento acordado.' },
  { num: '04', title: 'Suporte', desc: 'Manutenção preventiva, suporte remoto e atendimento presencial com SLA definido em contrato.' },
];

const DEPOIMENTOS = [
  {
    stars: 5,
    text: '"A MSIFORCE substituiu três fornecedores diferentes que tínhamos para elétrica, câmeras e rede. Agora temos um único ponto de contato e a gestão ficou muito mais simples. Atendimento rápido e equipe extremamente profissional."',
    name: 'Ricardo Campos',
    role: 'Gerente de Operações',
    company: 'Rede de Franquias · São Paulo',
    initials: 'RC',
  },
  {
    stars: 5,
    text: '"Contratamos para a instalação elétrica e CFTV de dois condomínios. Trabalho impecável, dentro do prazo, com ART e laudo técnico. Os condôminos ficaram satisfeitos com a organização da obra."',
    name: 'Fernanda Araújo',
    role: 'Síndica Profissional',
    company: 'Condomínios · Alphaville / ABC',
    initials: 'FA',
  },
  {
    stars: 5,
    text: '"Precisávamos estruturar toda a rede e TI da nova clínica antes da inauguração. A MSIFORCE entregou tudo no prazo, incluindo o sistema de controle de acesso integrado ao CFTV. Recomendo sem hesitar."',
    name: 'Dra. Patrícia Almeida',
    role: 'Diretora',
    company: 'Clínica Médica · Santo André',
    initials: 'PA',
  },
];

const CASES = [
  {
    setor: 'Grupo LPM · Soluções em TI',
    titulo: 'Cabeamento estruturado e infraestrutura de rede',
    desc: 'Implantação completa de cabeamento Cat6 certificado com patch panel Furukawa, rack organizado e 20+ pontos de rede documentados e rastreáveis por localização e data de instalação.',
    resultados: ['20+ pontos certificados', 'Rack com cabos organizados por velcro', 'Documentação completa entregue'],
    icon: '🌐',
    img: '/case_lpm_final.webp',
    parceiro: 'Grupo LPM',
  },
  {
    setor: 'Vetor Construção Civil',
    titulo: 'Instalação elétrica em obra comercial',
    desc: 'Projeto e montagem de quadros de distribuição elétrica em obra comercial, com fiação identificada por cores, disjuntores dimensionados e aterramento conforme ABNT NBR 5410.',
    resultados: ['Quadros montados conforme ABNT', 'Fiação identificada por cores', 'Entregue dentro do prazo da obra'],
    icon: '⚡',
    img: '/case_vetor_final.webp',
    parceiro: 'Vetor Construção Civil',
  },
  {
    setor: 'Instituição de Ensino · São Paulo',
    titulo: 'Infraestrutura de TI e elétrica em escola',
    desc: 'Cabeamento estruturado, pontos de rede em salas de aula, rack dedicado e instalação elétrica completa para nova unidade escolar, entregue antes do início do ano letivo.',
    resultados: ['Rede em todas as salas de aula', 'Instalação elétrica certificada', 'Entrega antes da inauguração'],
    icon: '🏫',
    img: '/case_escola_final.webp',
    parceiro: null,
  },
];

const FAQS = [
  {
    q: 'Vocês atendem contratos recorrentes de manutenção?',
    a: 'Sim. Oferecemos contratos mensais e anuais com SLA definido, visitas preventivas programadas e relatórios técnicos. Ideal para empresas que precisam de operação contínua sem imprevistos.',
  },
  {
    q: 'Como funciona o processo de orçamento para empresas?',
    a: 'Agendamos uma visita técnica gratuita para diagnóstico. O projeto e orçamento detalhado são entregues em até 3 dias úteis, com escopo e cronograma definidos.',
  },
  {
    q: 'A MSIFORCE atende múltiplas unidades ou filiais?',
    a: 'Sim. Atendemos redes de franquias e empresas com múltiplas filiais, com projeto padronizado e execução coordenada para garantir consistência entre as unidades.',
  },
  {
    q: 'Os projetos elétricos têm ART (Anotação de Responsabilidade Técnica)?',
    a: 'Sim. Emitimos ART para todos os projetos elétricos conforme exigência do CREA, além de laudo técnico e documentação completa da instalação.',
  },
  {
    q: 'Qual a garantia dos serviços instalados?',
    a: 'Todos os serviços têm garantia mínima de 12 meses com laudo técnico. Clientes com contrato de manutenção têm suporte prioritário durante toda a vigência.',
  },
  {
    q: 'Como é o suporte técnico após a instalação?',
    a: 'Atendimento remoto em até 2h e visita presencial em até 24h para clientes com contrato ativo. Para projetos pontuais, suporte disponível em horário comercial.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page-home">

      {/* ── HERO ── */}
      <section className="h-hero" id="sobre">
        <div className="h-hero-bg">
          <img src="/hero_msiforce.webp" alt="MSIFORCE — Infraestrutura corporativa" loading="eager" />
          <div className="h-hero-overlay" />
        </div>

        <motion.div
          className="h-hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="h-eyebrow">
            Soluções Corporativas em Infraestrutura
          </motion.div>

          <motion.h1 variants={fadeUp} className="h-h1">
            Sua empresa com a<br />
            <span className="h-h1-highlight">infraestrutura</span><br />
            que ela merece.
          </motion.h1>

          <motion.p variants={fadeUp} className="h-p">
            Da instalação elétrica à segurança eletrônica, a MSIFORCE projeta,
            instala e mantém sistemas de infraestrutura completos para empresas,
            condomínios, clínicas e indústrias em São Paulo.
          </motion.p>

          <motion.div variants={fadeUp} className="h-hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="h-btn h-btn--primary" onClick={() => trackCTA('hero_consultoria', 'whatsapp')}>
              Solicitar Consultoria Gratuita
            </a>
            <a href="#servicos" className="h-btn h-btn--secondary" onClick={() => trackCTA('hero_ver_solucoes', 'scroll')}>
              Ver Soluções ↓
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="h-hero-badges">
            <span>NR-10</span>
            <span>NR-35</span>
            <span>ABNT NBR 5410</span>
            <span>+500 projetos entregues</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DIFERENCIAL BANNER ── */}
      <DiferencialBanner />

      {/* ── TRUST BAR ── */}
      <section className="h-trust">
        <motion.div
          className="trust-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <StatItem value={15} suffix="+" label="Anos de mercado" />
          <div className="trust-divider" />
          <StatItem value={500} suffix="+" label="Projetos entregues" />
          <div className="trust-divider" />
          <StatItem value={98} suffix="%" label="Clientes satisfeitos" />
          <div className="trust-divider" />
          <div className="trust-stat">
            <span className="trust-num">24h</span>
            <span className="trust-label">Suporte disponível</span>
          </div>
        </motion.div>
      </section>

      {/* ── SOBRE ── */}
      <SobreEmpresa />

      {/* ── PARCEIROS ── */}
      <Parceiros />

      {/* ── SETORES ── */}
      <section className="h-section h-section--alt" id="setores">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Quem atendemos</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            Setores que<br />a MSIFORCE atende
          </motion.h2>
          <motion.p variants={fadeUp} className="h-section-sub">
            Cada setor tem exigências específicas. Nossos projetos são consultivos e
            customizados para a realidade operacional de cada cliente.
          </motion.p>
        </motion.div>

        <motion.div
          className="sector-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {SECTORS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="sector-card">
              <span className="sector-icon">{s.icon}</span>
              <span className="sector-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="h-section" id="servicos">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Portfólio completo</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            8 soluções,<br />um único parceiro.
          </motion.h2>
          <motion.p variants={fadeUp} className="h-section-sub">
            Elimine a complexidade de gerenciar múltiplos fornecedores. A MSIFORCE
            entrega infraestrutura completa com responsabilidade centralizada.
          </motion.p>
        </motion.div>

        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.num}
              variants={fadeUp}
              className={`bento-card${svc.large ? ' large' : ''}`}
            >
              <img src={svc.img} alt={svc.title} className="b-img" loading="lazy" />
              <div className="b-overlay" />
              <div className="b-content">
                <div className="b-tag">{svc.tag}</div>
                <div className="b-num">{svc.num}.</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="h-section h-section--alt">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Por que a MSIFORCE</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            Quatro pilares que<br />nos diferenciam.
          </motion.h2>
        </motion.div>

        <motion.div
          className="dif-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {DIFERENCIAIS.map((d) => (
            <motion.div key={d.title} variants={fadeUp} className="dif-card">
              <div className="dif-icon">{d.icon}</div>
              <h3 className="dif-title">{d.title}</h3>
              <p className="dif-desc">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PROCESSO ── */}
      <section className="h-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Como trabalhamos</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            Do diagnóstico<br />ao suporte contínuo.
          </motion.h2>
        </motion.div>

        <motion.div
          className="processo-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {PROCESSO.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} className="processo-step">
              <div className="processo-num">{step.num}</div>
              {i < PROCESSO.length - 1 && <div className="processo-line" />}
              <h3 className="processo-title">{step.title}</h3>
              <p className="processo-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CERTIFICAÇÕES ── */}
      <section className="h-certs">
        <motion.div
          className="certs-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="certs-label">Normas e certificações</motion.p>
          <motion.div variants={fadeUp} className="certs-badges">
            <div className="cert-badge">
              <span className="cert-badge-title">NR-10</span>
              <span className="cert-badge-sub">Segurança em Instalações Elétricas</span>
            </div>
            <div className="cert-badge">
              <span className="cert-badge-title">NR-35</span>
              <span className="cert-badge-sub">Trabalho em Altura</span>
            </div>
            <div className="cert-badge">
              <span className="cert-badge-title">ABNT<br />NBR 5410</span>
              <span className="cert-badge-sub">Instalações Elétricas de BT</span>
            </div>
            <div className="cert-badge">
              <span className="cert-badge-title">ART</span>
              <span className="cert-badge-sub">Anotação de Responsabilidade Técnica</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CASES ── */}
      <section className="h-section h-section--alt" id="cases">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Prova social</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            Projetos que<br />provam nossa capacidade.
          </motion.h2>
        </motion.div>

        <motion.div
          className="cases-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {CASES.map((c) => (
            <motion.div key={c.titulo} variants={fadeUp} className="case-card">
              {c.img && (
                <div className="case-img-wrap">
                  <img src={c.img} alt={c.titulo} className="case-img" loading="lazy" />
                  <div className="case-img-overlay" />
                </div>
              )}
              <div className="case-body">
                <div className="case-setor">
                  <span className="case-icon">{c.icon}</span>
                  <span>{c.setor}</span>
                </div>
                {c.parceiro && (
                  <div className="case-parceiro-badge">em parceria com {c.parceiro}</div>
                )}
                <h3 className="case-titulo">{c.titulo}</h3>
                <p className="case-desc">{c.desc}</p>
                <ul className="case-resultados">
                  {c.resultados.map((r) => (
                    <li key={r}>
                      <span className="case-check">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Depoimentos vivem aqui, e nao numa secao propria: duas secoes de
            prova social seguidas, cada uma com eyebrow, H2 e padding inteiro,
            custavam 1.664px fazendo o mesmo trabalho. Aqui eles entram como
            faixa, sem cabecalho de secao. */}
        <motion.div
          className="prova-depoimentos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className="prova-depo-titulo">
            O que os clientes dizem
          </motion.h3>
          <motion.div className="dep-grid dep-grid--faixa" variants={stagger}>
            {DEPOIMENTOS.map((d) => (
              <motion.div key={d.name} variants={fadeUp} className="dep-card">
                <div className="dep-stars">{'★'.repeat(d.stars)}</div>
                <p className="dep-text">{d.text}</p>
                <div className="dep-author">
                  <div className="dep-av">{d.initials}</div>
                  <div>
                    <div className="dep-name">{d.name}</div>
                    <div className="dep-role">{d.role}</div>
                    <div className="dep-company">{d.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="h-section" id="faq">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="h-header"
        >
          <motion.div variants={fadeUp} className="h-eyebrow-section">Dúvidas frequentes</motion.div>
          <motion.h2 variants={fadeUp} className="h-h2">
            Perguntas que<br />gestores fazem.
          </motion.h2>
        </motion.div>

        <motion.div
          className="faq-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {FAQS.map((item, index) => (
            <motion.div variants={fadeUp} className="faq-item" key={index}>
              <button
                className="faq-q"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                <span>{item.q}</span>
                <motion.div
                  className="faq-icon"
                  animate={{ rotate: openFaq === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, paddingBottom: '28px' }}
                    exit={{ height: 0, opacity: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="faq-a"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <FormDiagnostico />

      {/* ── CTA FINAL ── */}
      <section className="h-cta" id="contato">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-cta-inner"
        >
          <div className="h-eyebrow-section" style={{ textAlign: 'center', marginBottom: '24px' }}>
            Pronto para começar?
          </div>
          <h2 className="h-cta-title">
            Vamos construir a infraestrutura<br />
            <span className="h-cta-gold">do futuro da sua empresa.</span>
          </h2>
          <p className="h-cta-sub">
            Diagnóstico gratuito, sem compromisso. Resposta em até 1 hora nos dias úteis.
          </p>
          <div className="h-cta-btns">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="h-btn h-btn--gold" onClick={() => trackCTA('cta_final_whatsapp', 'whatsapp')}>
              Falar com Especialista no WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
