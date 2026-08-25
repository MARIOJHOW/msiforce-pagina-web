import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackCTA } from '../../hooks/useAnalytics';
import FormDiagnostico from '../../components/FormDiagnostico';
import DiferencialBanner from '../../components/DiferencialBanner';
import Parceiros from '../../components/Parceiros';
import SobreEmpresa from '../../components/SobreEmpresa';
import {
  IcoRede, IcoRaio, IcoEscola,
  IcoEscritorio, IcoCondominio, IcoIndustria, IcoClinica,
  IcoComercio, IcoFranquia, IcoChaveInglesa,
  IcoHub, IcoNorma, IcoSuporte, IcoRegua,
} from './icones';
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
  { Ico: IcoEscritorio, label: 'Empresas & Escritórios' },
  { Ico: IcoCondominio, label: 'Condomínios' },
  { Ico: IcoIndustria, label: 'Indústrias' },
  { Ico: IcoClinica, label: 'Clínicas & Consultórios' },
  { Ico: IcoComercio, label: 'Comércios' },
  { Ico: IcoFranquia, label: 'Redes de Franquias' },
  { Ico: IcoChaveInglesa, label: 'Gestores de Infraestrutura' },
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
    Ico: IcoHub,
    title: 'Parceiro Completo',
    desc: 'Uma única empresa para elétrica, automação, TI e segurança. Menos fornecedores, mais controle e responsabilidade centralizada.',
  },
  {
    Ico: IcoNorma,
    title: 'Normas Técnicas',
    desc: 'Projetos executados conforme NR-10, NR-35 e ABNT NBR 5410, com emissão de ART e laudo técnico para cada instalação.',
  },
  {
    Ico: IcoSuporte,
    title: 'Suporte Contínuo',
    desc: 'Contratos de manutenção com SLA garantido. Se algo falhar, nossa equipe resolve — sem depender de terceiros.',
  },
  {
    Ico: IcoRegua,
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
    Ico: IcoRede,
    img: '/case_lpm_final.webp',
    parceiro: 'Grupo LPM',
  },
  {
    setor: 'Vetor Construção Civil',
    titulo: 'Instalação elétrica em obra comercial',
    desc: 'Projeto e montagem de quadros de distribuição elétrica em obra comercial, com fiação identificada por cores, disjuntores dimensionados e aterramento conforme ABNT NBR 5410.',
    resultados: ['Quadros montados conforme ABNT', 'Fiação identificada por cores', 'Entregue dentro do prazo da obra'],
    Ico: IcoRaio,
    img: '/case_vetor_final.webp',
    parceiro: 'Vetor Construção Civil',
  },
  {
    setor: 'Instituição de Ensino · São Paulo',
    titulo: 'Infraestrutura de TI e elétrica em escola',
    desc: 'Cabeamento estruturado, pontos de rede em salas de aula, rack dedicado e instalação elétrica completa para nova unidade escolar, entregue antes do início do ano letivo.',
    resultados: ['Rede em todas as salas de aula', 'Instalação elétrica certificada', 'Entrega antes da inauguração'],
    Ico: IcoEscola,
    img: '/case_escola_final.webp',
    parceiro: null,
  },
];


export default function Home() {

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
            <span>+500 projetos na bagagem</span>
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
          {/* 2 anos, não 15: a MSIFORCE tem 2 anos e a mesma home dizia "2 anos de
              MSIFORCE" logo abaixo, além de "20+ anos de experiência" (que é do
              fundador, não da empresa). Eram três idades diferentes na mesma página. */}
          <StatItem value={2} suffix="" label="Anos de mercado" />
          <div className="trust-divider" />
          <StatItem value={500} suffix="+" label="Projetos na bagagem" />
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
          className="sol-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.num}
              variants={fadeUp}
              className={`sol-card${svc.large ? ' large' : ''}`}
            >
              <img src={svc.img} alt={svc.title} className="sol-img" loading="lazy" />
              <div className="sol-overlay" />
              <div className="sol-content">
                <div className="sol-tag">{svc.tag}</div>
                <div className="sol-num">{svc.num}.</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── DIFERENCIAIS + SETORES ── */}
      <section className="h-section h-section--alt" id="por-que">
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
              <d.Ico className="dif-icon" />
              <h3 className="dif-title">{d.title}</h3>
              <p className="dif-desc">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Os setores atendidos moravam numa secao propria, com eyebrow, H2 e
            padding inteiros, logo antes de Servicos. Sao uma taxonomia -- "para
            quem" -- e apoiam o argumento dos pilares em vez de competir com ele.
            Entram aqui como faixa, mesmo padrao usado na prova social. */}
        <motion.div
          className="pilares-setores"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className="pilares-setores-titulo">
            Setores que atendemos
          </motion.h3>
          <motion.p variants={fadeUp} className="pilares-setores-sub">
            Cada setor tem exigências específicas. Nossos projetos são consultivos e
            customizados para a realidade operacional de cada cliente.
          </motion.p>
          <motion.div className="sector-grid" variants={stagger}>
            {SECTORS.map((sec) => (
              <motion.div key={sec.label} variants={fadeUp} className="sector-card">
                <sec.Ico className="sector-icon" />
                <span className="sector-label">{sec.label}</span>
              </motion.div>
            ))}
          </motion.div>
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
                  <c.Ico className="case-icon" />
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

      {/* ── FAQ (resumo) ── */}
      {/* As seis perguntas moravam aqui como secao inteira, 854px. Sao conteudo
          de consulta, nao de funil: quem esta rolando a home quer chegar no
          formulario. Foram para /faq, que rende FAQPage no Google -- coisa que
          um accordion dentro da home nao rende bem. Fica a faixa, para nao
          perder o sinal de "essas duvidas tem resposta". */}
      <section className="h-faq-faixa" id="faq">
        <motion.div
          className="h-faq-faixa-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="h-faq-faixa-rot">Dúvidas frequentes</p>
            <p className="h-faq-faixa-txt">
              ART, garantia, contrato de manutenção e atendimento a múltiplas filiais
              — as perguntas que gestores fazem antes de contratar.
            </p>
          </div>
          <Link to="/faq" className="h-faq-faixa-link">
            Ver perguntas frequentes →
          </Link>
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
