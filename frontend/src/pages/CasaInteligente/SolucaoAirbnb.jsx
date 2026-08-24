import { motion } from 'framer-motion';
import WhatsAppButton from '../../components/WhatsAppButton';
import { msgPacoteAirbnb, MSG_FECHADURA_COMBO } from '../../lib/gatilhos';
import { IcoApp, IcoEscudo, IcoCheck, IcoEstrela, IcoPredio } from './icones';
import {
  IcoFloco, IcoChuveiro, IcoForno, IcoMicroondas, IcoTomada, IcoCooktop, IcoTv,
  IcoLampada, IcoGeladeira, IcoWifi, IcoCamera,
  IcoMoeda, IcoRaio, IcoCasaAuto,
  IcoZap, IcoEmail, IcoGlobo, IcoPin, IcoSeta,
} from './iconesAirbnb';
import './SolucaoAirbnb.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const BADGES = [
  { Ico: IcoEscudo, label: 'Mais segurança' },
  { Ico: IcoRaio, label: 'Mais praticidade' },
  { Ico: IcoMoeda, label: 'Mais economia' },
  { Ico: IcoEstrela, label: 'Melhores avaliações' },
];

const BENEFICIOS = [
  {
    Ico: IcoEscudo,
    title: 'Acesso seguro',
    text: 'Cada hóspede recebe uma senha com hora para começar e para acabar.',
  },
  {
    Ico: IcoCasaAuto,
    title: 'Energia no cartão',
    text: 'A casa só fica ligada com o cartão encaixado na entrada.',
  },
  {
    Ico: IcoApp,
    title: 'Controle pelo celular',
    text: 'Veja quem entrou e libere o próximo hóspede de onde você estiver.',
  },
  {
    Ico: IcoMoeda,
    title: 'Menos desperdício',
    text: 'Nada continua ligado depois que o hóspede vai embora.',
  },
];

// O cartão é único: o mesmo que abre a porta é o que liga a energia. É isso que
// obriga o hóspede a levá-lo ao sair — e é o que faz a casa desligar sozinha.
const PASSOS = [
  {
    n: 1,
    title: 'Você manda a senha',
    text: 'Pelo celular, com hora para começar e para acabar. Não precisa entregar chave nem estar no imóvel.',
  },
  {
    n: 2,
    title: 'O hóspede entra e pega o cartão',
    text: 'Ele digita a senha na fechadura no check-in e retira o cartão, que fica com ele até o fim da estadia.',
  },
  {
    n: 3,
    title: 'O cartão liga a casa',
    text: 'Encaixou o cartão na entrada, a energia liberada acende: luzes, tomadas, ar-condicionado.',
    tag: { label: 'Casa ligada', tom: 'on' },
  },
  {
    n: 4,
    title: 'Saiu, levou o cartão',
    text: 'O cartão é a chave dele: sem ele não volta a entrar. Então sempre sai com o cartão — e a casa desliga sozinha.',
    tag: { label: 'Casa desligada', tom: 'off' },
  },
  {
    n: 5,
    title: 'Você acompanha tudo',
    text: 'Confira os acessos pelo celular, crie a senha do próximo hóspede e cancele qualquer uma na hora.',
  },
];

const CIRCUITOS = [
  {
    id: 'sempre',
    tom: 'on',
    title: 'Nunca desliga',
    nota: 'Ficam ligados o tempo todo, com ou sem o cartão.',
    itens: [
      { Ico: IcoGeladeira, label: 'Geladeira' },
      { Ico: IcoWifi, label: 'Internet e Wi-Fi' },
      { Ico: IcoCamera, label: 'Câmeras' },
      { Ico: IcoEscudo, label: 'Alarme' },
    ],
  },
  {
    id: 'controlados',
    tom: 'card',
    title: 'Desliga com o cartão',
    nota: 'Você escolhe quais entram nessa lista.',
    itens: [
      { Ico: IcoLampada, label: 'Luzes' },
      { Ico: IcoTomada, label: 'Tomadas escolhidas' },
      { Ico: IcoTv, label: 'TV' },
      { Ico: IcoFloco, label: 'Ar-condicionado' },
      { Ico: IcoMicroondas, label: 'Micro-ondas', marca: 'alta potência' },
    ],
  },
  {
    id: 'avaliar',
    tom: 'off',
    title: 'Só depois de avaliar',
    nota: 'Puxam muita energia. Medimos o seu quadro na visita e só entram se der para fazer com segurança.',
    itens: [
      { Ico: IcoChuveiro, label: 'Chuveiro' },
      { Ico: IcoForno, label: 'Forno' },
      { Ico: IcoCooktop, label: 'Cooktop' },
    ],
  },
];

const VANTAGENS = [
  'Check-in e check-out sem você precisar estar lá',
  'Chave perdida deixa de ser problema: é só trocar a senha',
  'Faxineira e manutenção com acesso próprio, sem usar a senha do hóspede',
  'Conta de luz menor, porque nada fica ligado depois do check-out',
  'Hóspede que entra fácil e sai fácil avalia melhor',
];

const PACOTES = [
  {
    id: 'start',
    nome: 'Start',
    resumo: 'Para quem só quer parar de entregar chave.',
    inclui: [
      'Fechadura digital',
      'Instalação profissional',
      'Configuração e teste com você junto',
    ],
  },
  {
    id: 'smart',
    nome: 'Smart',
    destaque: 'Mais pedido',
    resumo: 'A solução completa: acesso e energia no mesmo cartão.',
    inclui: [
      'Tudo do Start',
      'Cartão que controla a energia da casa',
      'Escolha dos pontos que desligam',
      'Treinamento para você e para a limpeza',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    resumo: 'Para imóvel maior ou com mais automação.',
    inclui: [
      'Tudo do Smart',
      'Sensores e automações extras',
      'Integrações conforme o levantamento',
    ],
  },
];

const VISITA = [
  'A porta',
  'O sinal de Wi-Fi',
  'O quadro de energia',
  'A carga de cada aparelho',
  'O acesso da limpeza',
];

const GARANTIAS = [
  'Instalação profissional',
  'Garantia no serviço',
  'Suporte especializado',
  'Soluções personalizadas',
];

const SolucaoAirbnb = () => {
  return (
    <section className="airbnb-section" id="solucao-airbnb">
      <div className="airbnb-mesh-bg"></div>

      <div className="airbnb-container">
        {/* Header */}
        <motion.div
          className="airbnb-header"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={fadeUp} className="airbnb-brand">
            <IcoPredio />
            <span>Para <strong>Airbnb</strong> e locação por temporada</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="airbnb-title">
            Hospede bem. <span>Automatize.</span> Tenha controle total.
          </motion.h2>
          <motion.p variants={fadeUp} className="airbnb-subtitle">
            Acesso inteligente, energia controlada e gestão simplificada do seu imóvel.
          </motion.p>

          <motion.div variants={fadeUp} className="airbnb-badges">
            {BADGES.map(({ Ico, label }) => (
              <div className="badge-item" key={label}>
                <Ico />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Os quatro pilares */}
        <motion.div
          className="airbnb-beneficios"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {BENEFICIOS.map(({ Ico, title, text }) => (
            <motion.div variants={fadeUp} className="beneficio-card glass-panel" key={title}>
              <span className="beneficio-ico"><Ico /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Como funciona na prática */}
        <motion.div
          className="airbnb-steps-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 variants={fadeUp} className="airbnb-section-title">
            Como funciona <span>na prática</span>
          </motion.h3>
          <motion.p variants={fadeUp} className="airbnb-section-sub">
            É um cartão só. O mesmo que abre a porta é o que liga a energia — por isso
            o hóspede sempre leva o cartão ao sair, e a casa desliga sozinha.
          </motion.p>
          <div className="airbnb-steps">
            {PASSOS.map((step, i) => (
              <motion.div variants={fadeUp} className="airbnb-step-card glass-panel" key={step.n}>
                {i > 0 && <IcoSeta className="step-arrow" />}
                <div className="step-number">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                {step.tag && (
                  <span className={`step-tag step-tag--${step.tag.tom}`}>{step.tag.label}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* O que desliga / Vantagens */}
        <div className="airbnb-grid-2">
          <motion.div
            className="airbnb-energy-card glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>O que <span>desliga</span> quando ele leva o cartão?</h3>
            <p className="energy-desc">
              A lista é sua. Na visita a gente monta junto com você o que faz sentido
              para o seu imóvel.
            </p>

            <div className="energy-lists">
              {CIRCUITOS.map((grupo) => (
                <div className={`energy-grupo energy-grupo--${grupo.tom}`} key={grupo.id}>
                  <h4>{grupo.title}</h4>
                  <ul>
                    {grupo.itens.map(({ Ico, label, marca }) => (
                      <li key={label}>
                        <Ico /> {label}
                        {marca && <span className="item-marca">{marca}</span>}
                      </li>
                    ))}
                  </ul>
                  <p className="energy-grupo-nota">{grupo.nota}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="airbnb-advantages glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>Vantagens para anfitriões</h3>
            <ul className="advantages-list">
              {VANTAGENS.map((v) => (
                <li key={v}><IcoCheck className="check-icon" /> {v}</li>
              ))}
            </ul>

            <div className="testimonial">
              <div className="quotes">“</div>
              <p>
                Desde que instalei, minha rotina ficou muito mais fácil e meus hóspedes
                amaram a experiência!
              </p>
              <div className="author">
                <strong>Lucas P.</strong>
                <span className="author-role">Anfitrião Superhost</span>
                <span className="author-stars" aria-label="Avaliação 5 de 5">
                  <IcoEstrela /><IcoEstrela /><IcoEstrela /><IcoEstrela /><IcoEstrela />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pacotes */}
        <motion.div
          className="airbnb-pacotes-bloco"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h3 variants={fadeUp} className="airbnb-section-title">
            Escolha o <span>pacote</span>
          </motion.h3>
          <motion.p variants={fadeUp} className="airbnb-section-sub">
            Pacotes fechados, com equipamento e instalação incluídos. O valor sai no
            orçamento, depois que a gente entende o seu imóvel. Se você já tem a
            fechadura e quer só a mão de obra, veja os{' '}
            <a href="#instalacao">planos de instalação avulsa</a>.
          </motion.p>

          <div className="airbnb-pacotes">
            {PACOTES.map((p) => (
              <motion.article
                variants={fadeUp}
                className={`pacote-card glass-panel${p.destaque ? ' pacote-card--destaque' : ''}`}
                key={p.id}
              >
                {p.destaque && <span className="pacote-selo">{p.destaque}</span>}
                <h4 className="pacote-nome">{p.nome}</h4>
                <p className="pacote-resumo">{p.resumo}</p>
                <ul className="pacote-inclui">
                  {p.inclui.map((item) => (
                    <li key={item}><IcoCheck className="check-icon" /> {item}</li>
                  ))}
                </ul>
                <WhatsAppButton message={msgPacoteAirbnb(p.nome)} className="pacote-btn">
                  Quero o {p.nome}
                </WhatsAppButton>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeUp} className="airbnb-visita">
            <strong>Antes de instalar, a gente confere:</strong>
            <ul>
              {VISITA.map((v) => (
                <li key={v}><IcoCheck /> {v}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="airbnb-cta premium-gradient"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="offer-glow"></div>
          <h2>Na dúvida de qual serve para o seu imóvel?</h2>
          <div className="cta-content">
            <WhatsAppButton
              message={msgPacoteAirbnb('Smart')}
              className="campanha-btn-primary glow-effect black-text"
            >
              Fale com a gente!
            </WhatsAppButton>

            <div className="airbnb-contact-info">
              {/* Passa pelo WhatsAppButton, e não por um wa.me cru: sem `text` o
                  lead cai no menu genérico do bot em vez do funil da fechadura
                  (é o que tools/valida-ctas.mjs acusa). */}
              <WhatsAppButton message={MSG_FECHADURA_COMBO} className="airbnb-contato-zap">
                <IcoZap /> (11) 91077-3865
              </WhatsAppButton>
              <a href="mailto:contato@msiforce.com.br">
                <IcoEmail /> contato@msiforce.com.br
              </a>
              <a href="https://www.msiforce.com.br" target="_blank" rel="noreferrer">
                <IcoGlobo /> www.msiforce.com.br
              </a>
              <p className="location-info">
                <IcoPin /> Atendimento em São Paulo e região
              </p>
            </div>
          </div>
          <div className="airbnb-footer-features">
            {GARANTIAS.map((g) => (
              <span key={g}><IcoCheck /> {g}</span>
            ))}
          </div>
        </motion.div>

        <p className="airbnb-legal">
          *O que dá para ligar no cartão depende do levantamento no local — quadro de
          energia, circuitos e a carga de cada aparelho. A senha temporária e o
          acompanhamento pelo celular dependem do modelo de fechadura escolhido.
        </p>
      </div>
    </section>
  );
};

export default SolucaoAirbnb;
