import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import WhatsAppButton from '../../components/WhatsAppButton';
import { MSG_FECHADURA_COMBO, MSG_FECHADURA_INSTALACAO } from '../../lib/gatilhos';
import { FAQ_INSTALACAO, NOTA_LEGAL, PRECO_MINIMO } from '../CasaInteligente/dados';
import SeloGoogle from '../CasaInteligente/SeloGoogle';
import BarraWhatsApp from '../../components/BarraWhatsApp';
// Reaproveita o visual da /instalacao-fechadura-digital (mesmas classes ifd-*).
import '../InstalacaoFechaduraDigital/InstalacaoFechaduraDigital.css';

// Pagina criada em 25/10/2026 para a busca "quanto custa instalar fechadura
// digital". NAO tem preco proprio: tudo deriva de dados.js (PRECO_MINIMO
// e as respostas do FAQ), que o dono ja confirmou. Preco novo entra
// la, nunca aqui.

// So as perguntas de preco/prazo/garantia, na ordem em que o cliente decide.
const PERGUNTAS_PRECO = [
  'Qual o valor da instalação da fechadura digital?',
  'Quanto custa a fechadura em si?',
  'Vocês instalam fechadura que eu comprei em outro lugar?',
  'Quanto tempo demora?',
  'A garantia da fechadura muda se eu instalar com vocês?',
];

const FATORES = [
  {
    titulo: 'Tipo de fechadura',
    texto: 'De sobrepor é a mais simples e sai em menos de 1 hora. De embutir exige fresagem na porta e leva de 2 a 3 horas.',
  },
  {
    titulo: 'Material e espessura da porta',
    texto: 'Madeira comum é o caso base. Multiponto, blindada e vidro temperado pedem mais tempo e ferramenta específica.',
  },
  {
    titulo: 'Modelo escolhido',
    texto: 'Senha, biometria e controle pelo app mudam o valor do equipamento. Os mais completos custam mais.',
  },
];

const faq = PERGUNTAS_PRECO
  .map((p) => FAQ_INSTALACAO.find((item) => item.p === p))
  .filter(Boolean);

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ p, r }) => ({
    '@type': 'Question',
    name: p,
    acceptedAnswer: { '@type': 'Answer', text: r },
  })),
};

export default function QuantoCustaFechadura() {
  useSEO({
    title: 'Quanto custa instalar fechadura digital na Zona Leste e Guarulhos',
    description:
      `Quanto custa instalar fechadura digital: instalação a partir de R$ ${PRECO_MINIMO}. Veja o que muda o valor e peça orçamento grátis pelo WhatsApp.`,
    canonical: 'https://msiforce.com.br/quanto-custa-fechadura-digital',
  });

  useJsonLd([{ key: 'faq-preco', schema: FAQ_SCHEMA }]);

  return (
    <div className="ifd-page">
      <section className="ifd-hero">
        <div className="ifd-hero-grid">
          <div>
            <p className="ifd-eyebrow">Zona Leste · Guarulhos</p>
            <h1 className="ifd-titulo">
              Quanto custa instalar <span>fechadura digital?</span>
            </h1>
            <p className="ifd-sub">
              Os valores iniciais, o que faz o preço subir e como ter o orçamento
              da sua porta no mesmo dia.
            </p>

            <div className="ifd-precos">
              <div>
                <small>Instalação</small>
                <strong>R$ {PRECO_MINIMO}</strong>
                <small>a partir de*</small>
              </div>
            </div>
            <p className="ifd-nota">
              *{NOTA_LEGAL.replace(/^\*/, '')}
            </p>

            <WhatsAppButton message={MSG_FECHADURA_COMBO} className="ifd-btn ifd-btn--grande">
              📷 Mandar foto da porta no WhatsApp
            </WhatsAppButton>
            <p className="ifd-micro">Orçamento grátis · você recebe o valor fechado antes de qualquer execução</p>

            <div className="ifd-prova">
              <SeloGoogle compacto />
            </div>
          </div>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>O que muda o preço da instalação</h2>
          <ul className="ifd-razoes">
            {FATORES.map((f) => (
              <li key={f.titulo}>
                <span className="ifd-razao-icone" aria-hidden="true">✓</span>
                <div>
                  <strong>{f.titulo}</strong>
                  <p>{f.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Perguntas sobre preço</h2>
          <div className="ifd-faq">
            {faq.map((item) => (
              <div className="ifd-faq-item" key={item.p}>
                <h3 className="ifd-faq-q" style={{ cursor: 'default' }}>
                  <span>{item.p}</span>
                </h3>
                <div className="ifd-faq-a">{item.r}</div>
              </div>
            ))}
          </div>
          <p className="ifd-apoio">
            <strong>Já tem a fechadura?</strong> Instalamos qualquer marca, a partir de
            R$ {PRECO_MINIMO}.{' '}
            <WhatsAppButton message={MSG_FECHADURA_INSTALACAO} className="ifd-link">
              Orçar só a instalação →
            </WhatsAppButton>
          </p>
        </div>
      </section>

      <section className="ifd-fechamento">
        <h2>Quer o valor da sua porta?</h2>
        <p>Mande a foto e receba o orçamento no mesmo dia.</p>
        <WhatsAppButton message={MSG_FECHADURA_COMBO} className="ifd-btn ifd-btn--grande">
          Pedir orçamento no WhatsApp
        </WhatsAppButton>
        <p className="ifd-portas">
          Veja também: <Link to="/instalacao-fechadura-digital">instalação de fechadura digital</Link>
        </p>
      </section>

      <BarraWhatsApp message={MSG_FECHADURA_COMBO}>📷 Mandar foto da porta</BarraWhatsApp>
    </div>
  );
}
