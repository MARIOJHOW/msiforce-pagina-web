import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import { linkWhatsApp } from '../../lib/whatsapp';
import {
  MSG_FECHADURA_COMBO,
  MSG_FECHADURA_INSTALACAO,
  msgFechaduraModelo,
} from '../../lib/gatilhos';
import { FAQ, PRECO_MINIMO } from '../CasaInteligente/dados';
import { OFERTAS } from './ofertas';
import './InstalacaoFechaduraDigital.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// O JSON-LD sai dos MESMOS dados que a /casa-inteligente renderiza (dados.js) —
// mesma fonte única usada lá, para as duas páginas nunca divergirem.
const SERVICO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Instalação de Fechadura Digital',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MSIFORCE',
    url: 'https://msiforce.com.br',
    telephone: '+55-11-91077-3865',
    areaServed: { '@type': 'City', name: 'São Paulo' },
  },
  areaServed: { '@type': 'City', name: 'São Paulo' },
  description:
    'Instalação profissional de fechadura digital em São Paulo, em portas de madeira, alumínio e vidro, com marcas homologadas e suporte técnico após o serviço.',
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

const formataPreco = (valor) => valor.toLocaleString('pt-BR');

export default function InstalacaoFechaduraDigital() {
  const [aberta, setAberta] = useState(0);

  useSEO({
    title: 'Instalação de Fechadura Digital em São Paulo',
    description:
      `Instalação de fechadura digital em São Paulo, em portas de madeira, alumínio ou vidro. Kits Intelbras e Papaiz a partir de R$ ${formataPreco(OFERTAS[0].preco)} instalada, ou só a instalação a partir de R$ ${PRECO_MINIMO}. Peça um orçamento.`,
    canonical: 'https://msiforce.com.br/instalacao-fechadura-digital',
  });

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

  return (
    <div className="ifd-page">
      <section className="ifd-hero">
        <div className="ifd-hero-grid">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="ifd-eyebrow">Fechadura Digital</motion.p>
            <motion.h1 variants={fadeUp} className="ifd-titulo">
              Instalação de Fechadura Digital <span>em São Paulo</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="ifd-sub">
              Trocar a chave por uma fechadura digital é rápido — mas instalar bem, sem
              arriscar a porta, exige técnico certificado. A MSIFORCE instala fechaduras
              digitais em portas de madeira, alumínio e vidro em São Paulo, com
              equipamentos homologados e a mesma equipe que cuida de instalações
              elétricas para empresas há anos.
            </motion.p>
            <motion.div variants={fadeUp} className="ifd-hero-cta">
              <a href={linkWhatsApp(MSG_FECHADURA_COMBO)} target="_blank" rel="noopener noreferrer" className="ifd-btn">
                Pedir Orçamento no WhatsApp
              </a>
              <a href="#ofertas" className="ifd-btn ifd-btn--secundario">
                Ver modelos e preços
              </a>
            </motion.div>
          </motion.div>

          <motion.figure
            className="ifd-hero-figura"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/fechadura-hero.webp"
              alt="Fechadura digital com biometria instalada pela MSIFORCE em porta de madeira escura"
              className="ifd-hero-img"
              width="484"
              height="880"
              loading="eager"
            />
          </motion.figure>
        </div>
      </section>

      <section className="ifd-ofertas" id="ofertas">
        <motion.div
          className="ifd-ofertas-cabecalho"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Modelos e kits com instalação</motion.h2>
          <motion.p variants={fadeUp}>
            Fechadura + instalação num pacote só, com marcas homologadas. Parcelamos em
            até 12x no cartão (até 3x sem juros), Pix ou dinheiro.
          </motion.p>
        </motion.div>

        <motion.div
          className="ifd-ofertas-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {OFERTAS.map((o) => (
            <motion.article variants={fadeUp} className="ifd-card" key={o.id}>
              <img
                src={o.imagem}
                alt={o.alt}
                className="ifd-card-img"
                loading="lazy"
                width="600"
                height="450"
              />
              <div className="ifd-card-corpo">
                <p className="ifd-card-marca">{o.marca}</p>
                <h3>{o.nome}</h3>
                <p className="ifd-card-tipo">{o.tipo}</p>
                <ul className="ifd-card-lista">
                  {o.beneficios.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="ifd-card-preco">
                  <span className="ifd-card-preco-prefixo">{o.precoPrefixo}</span>
                  <strong>R$ {formataPreco(o.preco)}</strong>
                  <span className="ifd-card-preco-sufixo">{o.precoSufixo}</span>
                </p>
                <p className="ifd-card-nota">{o.nota}</p>
                <a
                  href={linkWhatsApp(msgFechaduraModelo(o.modelo))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ifd-btn ifd-card-btn"
                >
                  Quero este kit
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="ifd-ofertas-instalacao"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <p>
            <strong>Já tem a fechadura?</strong> Instalamos a sua — só a mão de obra sai a
            partir de <strong>R$ {PRECO_MINIMO}</strong>, e a garantia do fabricante continua
            valendo.
          </p>
          <a href={linkWhatsApp(MSG_FECHADURA_INSTALACAO)} target="_blank" rel="noopener noreferrer" className="ifd-btn ifd-btn--secundario">
            Orçar só a instalação
          </a>
        </motion.div>
      </section>

      <section className="ifd-secao">
        <motion.div
          className="ifd-bloco"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Instalação completa, não só venda</motion.h2>
          <motion.p variants={fadeUp}>
            Diferente de quem só entrega o produto, a MSIFORCE cuida da instalação
            elétrica completa quando a porta exige adaptação — fiação, fresagem e
            acabamento incluídos. É o mesmo padrão técnico que aplicamos há anos em
            instalações elétricas para empresas, condomínios e clínicas, agora também
            para residências.
          </motion.p>
        </motion.div>

        <motion.div
          className="ifd-bloco"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Qual fechadura combina com a sua porta</motion.h2>
          <motion.ul variants={fadeUp} className="ifd-lista">
            <li>
              <strong>Portas pivotantes e de madeira maciça:</strong> fechadura de
              embutir. O maquinário fica dentro da porta, com o acabamento mais
              discreto e sofisticado.
            </li>
            <li>
              <strong>Portas padrão de apartamento:</strong> fechadura de sobrepor,
              instalada acima da maçaneta atual, sem modificar a porta — a opção certa
              para quem mora de aluguel.
            </li>
            <li>
              <strong>Portas de vidro temperado:</strong> modelos específicos de
              encaixe ou pressão, sem necessidade de furar o vidro.
            </li>
            <li>
              <strong>Portas de correr e alumínio:</strong> modelos de perfil estreito,
              com lingueta lateral compatível com o trilho.
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="ifd-bloco"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Marcas homologadas</motion.h2>
          <motion.p variants={fadeUp}>
            Trabalhamos com as principais marcas do mercado, incluindo{' '}
            <strong>Intelbras, Yale, Pado e Papaiz</strong>. Se você já comprou a sua
            fechadura em outro lugar, também instalamos — a garantia do fabricante
            continua valendo, já que instalação por técnico certificado não a anula.
          </motion.p>
        </motion.div>
      </section>

      <section className="ifd-secao ifd-secao--faq">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="ifd-faq-titulo">Perguntas frequentes</motion.h2>
        </motion.div>

        <motion.div
          className="ifd-lista-faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {FAQ.map((item, i) => (
            <motion.div variants={fadeUp} className="ifd-faq-item" key={item.p}>
              <h3 className="ifd-faq-item-titulo">
                <button
                  className="ifd-faq-q"
                  onClick={() => setAberta(aberta === i ? null : i)}
                  aria-expanded={aberta === i}
                  aria-controls={`ifd-resposta-${i}`}
                  id={`ifd-pergunta-${i}`}
                >
                  <span>{item.p}</span>
                  <motion.span
                    className="ifd-faq-icon"
                    aria-hidden="true"
                    animate={{ rotate: aberta === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {aberta === i && (
                  <motion.div
                    key="resposta"
                    id={`ifd-resposta-${i}`}
                    role="region"
                    aria-labelledby={`ifd-pergunta-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, paddingBottom: '26px' }}
                    exit={{ height: 0, opacity: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ifd-faq-a"
                  >
                    {item.r}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="ifd-fechamento"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h2>Pronto para trocar a chave?</h2>
        <p>
          Mande a foto da sua porta no WhatsApp e receba, em minutos, qual modelo
          combina e o valor fechado — kit com fechadura ou só a instalação.
        </p>
        <div className="ifd-fechamento-acoes">
          <a href={linkWhatsApp(MSG_FECHADURA_COMBO)} target="_blank" rel="noopener noreferrer" className="ifd-btn">
            Pedir Orçamento
          </a>
          <a href={linkWhatsApp(MSG_FECHADURA_INSTALACAO)} target="_blank" rel="noopener noreferrer" className="ifd-btn ifd-btn--secundario">
            Já tenho a fechadura, quero só instalar
          </a>
        </div>
        <Link to="/casa-inteligente" className="ifd-link-automacao">
          Quer automatizar a casa inteira, além da porta? Conheça a Casa Inteligente →
        </Link>
      </motion.section>
    </div>
  );
}
