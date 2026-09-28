import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import WhatsAppButton from '../../components/WhatsAppButton';
import {
  MSG_FECHADURA_COMBO,
  MSG_FECHADURA_INSTALACAO,
  msgFechaduraModelo,
} from '../../lib/gatilhos';
import { FAQ_INSTALACAO, NOTA_LEGAL, PRECO_MINIMO, PRECO_KIT } from '../CasaInteligente/dados';
import SeloGoogle from '../CasaInteligente/SeloGoogle';
import { OFERTAS } from './ofertas';
import './InstalacaoFechaduraDigital.css';

// Pagina reescrita em 28/09/2026 para converter com leitura de 5 segundos: o que
// e, onde, quanto, por que confiar e como pedir, com UM botao verde repetido.
// O titulo e a regiao (Itaquera, zona leste, Guarulhos) ficam: sao o que o
// Search Console esta medindo desde 24/09.

// Base em Itaquera; prioridade do dono (24/09/2026): zona leste e Guarulhos.
// Brigar por "São Paulo" inteira nos deixou na posição 60-80; a região é onde
// dá para aparecer e é onde está o cliente que dá para atender bem.
const BAIRROS_ZL = [
  'Itaquera', 'Guaianases', 'Cidade Líder', 'José Bonifácio', 'Artur Alvim',
  'São Mateus', 'Vila Carrão', 'Aricanduva', 'Tatuapé', 'Penha', 'Vila Matilde',
  'Ermelino Matarazzo', 'São Miguel Paulista', 'Itaim Paulista',
];
const AREA_ATENDIDA = [
  { '@type': 'AdministrativeArea', name: 'Zona Leste de São Paulo' },
  { '@type': 'City', name: 'Guarulhos' },
  { '@type': 'City', name: 'São Paulo' },
];

// As 3 promessas abaixo foram confirmadas pelo dono em 28/09/2026 ("são
// verdade"): 1 visita, porta sem estrago (gabarito) e orcamento no mesmo dia.
// Garantia: Intelbras e Papaiz dao ate 3 anos em ALGUNS produtos e a EZVIZ 2
// anos, por sermos representante autorizado. Por isso "ate 3 anos" e nunca
// "3 anos" colado num modelo. Nao use norma eletrica (NR-10, NR-35, 5410) como
// prova aqui: nao tem relacao com fechadura.
const RAZOES = [
  {
    icone: '✓',
    titulo: 'Sua porta intacta',
    texto: 'Furação e ajuste com gabarito, sem gambiarra. Tudo em 1 visita.',
  },
  {
    icone: '3',
    titulo: 'Até 3 anos de garantia',
    texto: 'Intelbras e Papaiz até 3 anos, EZVIZ 2 anos: garantia estendida por sermos representante autorizado.',
  },
  {
    icone: '☝',
    titulo: 'Você sai usando',
    texto: 'Cadastramos digitais e senhas e ensinamos a família a usar.',
  },
  {
    icone: '★',
    titulo: 'Técnico formado e especializado',
    texto: 'Representante autorizado de EZVIZ, Intelbras, Papaiz, EKAZA e Nova Digital.',
  },
];

// So as marcas REPRESENTADAS. Yale e Pado a gente instala, mas logo delas aqui
// sugeriria uma autorizacao que a MSIFORCE nao tem. Intelbras e Papaiz
// entraram em 28/09/2026. Pecas WebP com o fundo oficial de cada marca.
const MARCAS = [
  { src: '/marcas/marca-ezviz.webp', alt: 'EZVIZ', w: 230 },
  { src: '/marcas/marca-intelbras.webp', alt: 'Intelbras', w: 88 },
  { src: '/marcas/marca-papaiz.webp', alt: 'Papaiz Assa Abloy', w: 88 },
  { src: '/marcas/marca-ekaza.webp', alt: 'EKAZA', w: 85 },
  { src: '/marcas/marca-novadigital.webp', alt: 'Nova Digital', w: 230 },
];

const PASSOS = [
  'Você manda a foto da porta no WhatsApp',
  'Recebe o orçamento no mesmo dia',
  'Instalamos no dia marcado, em 1 visita',
];

// Cada tipo de porta com pagina propria: sao as buscas em que o cliente
// descreve a porta dele. A /porta-pivotante depende deste link interno.
const PORTAS = [
  { to: '/fechaduras/porta-de-apartamento', nome: 'Porta de apartamento' },
  { to: '/fechaduras/porta-de-vidro', nome: 'Porta de vidro' },
  { to: '/fechaduras/porta-pivotante', nome: 'Porta pivotante' },
];

const FAQ_VISIVEIS = 5;

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
    areaServed: AREA_ATENDIDA,
  },
  areaServed: AREA_ATENDIDA,
  description:
    'Instalador de fechadura digital com base em Itaquera: instalação em portas de madeira, alumínio e vidro na zona leste de São Paulo e em Guarulhos, com marcas homologadas e suporte técnico após o serviço.',
};

// O schema leva TODAS as perguntas, mesmo as que ficam atras do "ver mais".
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_INSTALACAO.map(({ p, r }) => ({
    '@type': 'Question',
    name: p,
    acceptedAnswer: { '@type': 'Answer', text: r },
  })),
};

export default function InstalacaoFechaduraDigital() {
  const [aberta, setAberta] = useState(0);
  const [todasPerguntas, setTodasPerguntas] = useState(false);

  useSEO({
    title: 'Instalador de Fechadura Digital na Zona Leste e Guarulhos',
    description:
      `Instalador de fechadura digital saindo de Itaquera: instalação na zona leste de São Paulo e em Guarulhos, em portas de madeira, alumínio ou vidro. Mão de obra a partir de R$ ${PRECO_MINIMO}, kit a partir de R$ ${PRECO_KIT}. Orçamento grátis no WhatsApp.`,
    canonical: 'https://msiforce.com.br/instalacao-fechadura-digital',
  });

  useJsonLd([
    { key: 'servico', schema: SERVICO_SCHEMA },
    { key: 'faq', schema: FAQ_SCHEMA },
  ]);

  const perguntas = todasPerguntas ? FAQ_INSTALACAO : FAQ_INSTALACAO.slice(0, FAQ_VISIVEIS);

  return (
    <div className="ifd-page">
      <section className="ifd-hero">
        <div className="ifd-hero-grid">
          <div>
            <p className="ifd-eyebrow">Zona Leste · Guarulhos</p>
            <h1 className="ifd-titulo">
              Instalador de Fechadura Digital <span>na Zona Leste e em Guarulhos</span>
            </h1>
            <p className="ifd-sub">
              Mande a foto da sua porta e receba o orçamento hoje. Instalação em
              1 visita, sem estragar a porta.
            </p>

            <div className="ifd-precos">
              <div>
                <small>Só a instalação</small>
                <strong>R$ {PRECO_MINIMO}</strong>
                <small>a partir de*</small>
              </div>
              <div>
                <small>Fechadura + instalação</small>
                <strong>R$ {PRECO_KIT}</strong>
                <small>a partir de*</small>
              </div>
            </div>

            <WhatsAppButton message={MSG_FECHADURA_COMBO} className="ifd-btn ifd-btn--grande">
              📷 Mandar foto da porta no WhatsApp
            </WhatsAppButton>
            <p className="ifd-micro">Orçamento grátis · atendimento das 7h às 21h</p>

            <div className="ifd-prova">
              <SeloGoogle compacto />
              <p className="ifd-prova-garantia">Até <strong>3 anos de garantia</strong></p>
            </div>
          </div>

          <figure className="ifd-hero-figura">
            <img
              src="/fechadura-hero.webp"
              alt="Fechadura digital com biometria instalada pela MSIFORCE em porta de madeira escura"
              className="ifd-hero-img"
              width="484"
              height="880"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <section className="ifd-secao" id="ofertas">
        <div className="ifd-conteudo">
          <h2>Escolha o modelo</h2>
          <p className="ifd-lead">
            Fechadura + instalação num pacote só. Parcelamos em até 12x no cartão, Pix ou dinheiro.
          </p>
        </div>

        <div className="ifd-trilho">
          {OFERTAS.map((o) => (
            <article className="ifd-modelo" key={o.id}>
              <img
                src={o.imagem}
                alt={o.alt}
                loading="lazy"
                width="600"
                height="450"
              />
              <p className="ifd-modelo-marca">{o.marca}</p>
              <h3>{o.nome}</h3>
              <p className="ifd-modelo-tipo">{o.tipo}</p>
              <WhatsAppButton
                message={msgFechaduraModelo(o.modelo)}
                className="ifd-btn ifd-btn--contorno"
              >
                Quero esta
              </WhatsAppButton>
            </article>
          ))}
        </div>

        <div className="ifd-conteudo ifd-apoio">
          <p>
            <strong>Já tem a fechadura?</strong> Instalamos qualquer marca, a partir de
            R$ {PRECO_MINIMO}.{' '}
            <WhatsAppButton message={MSG_FECHADURA_INSTALACAO} className="ifd-link">
              Orçar só a instalação →
            </WhatsAppButton>
          </p>
          <p className="ifd-portas">
            Guia por tipo de porta:{' '}
            {PORTAS.map((p, i) => (
              <span key={p.to}>
                {i > 0 && ' · '}
                <Link to={p.to}>{p.nome}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Por que instalar com a MSIFORCE</h2>
          <ul className="ifd-razoes">
            {RAZOES.map((r) => (
              <li key={r.titulo}>
                <span className="ifd-razao-icone" aria-hidden="true">{r.icone}</span>
                <div>
                  <strong>{r.titulo}</strong>
                  <p>{r.texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="ifd-marcas" aria-label="Representante autorizado">
            {MARCAS.map((m) => (
              <li key={m.alt}>
                <img src={m.src} alt={m.alt} width={m.w} height="88" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Como funciona</h2>
          <ol className="ifd-passos">
            {PASSOS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <p className="ifd-nota">{NOTA_LEGAL}</p>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Atendemos a Zona Leste e Guarulhos</h2>
          <p className="ifd-lead">
            Base em <strong>Itaquera</strong>: na zona leste chegamos rápido e com hora
            marcada. Em <strong>Guarulhos</strong>, do Centro a Vila Galvão, Bonsucesso,
            Pimentas e Cumbica. O resto da capital também, com deslocamento combinado.
          </p>
          <ul className="ifd-chips">
            {[...BAIRROS_ZL, 'Guarulhos'].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Dúvidas rápidas</h2>
          <div className="ifd-faq">
            {perguntas.map((item, i) => (
              <div className="ifd-faq-item" key={item.p}>
                <h3>
                  <button
                    className="ifd-faq-q"
                    onClick={() => setAberta(aberta === i ? null : i)}
                    aria-expanded={aberta === i}
                    aria-controls={`ifd-resposta-${i}`}
                    id={`ifd-pergunta-${i}`}
                  >
                    <span>{item.p}</span>
                    <span className="ifd-faq-icone" aria-hidden="true">
                      {aberta === i ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={`ifd-resposta-${i}`}
                  role="region"
                  aria-labelledby={`ifd-pergunta-${i}`}
                  className="ifd-faq-a"
                  hidden={aberta !== i}
                >
                  {item.r}
                </div>
              </div>
            ))}
          </div>
          {!todasPerguntas && FAQ_INSTALACAO.length > FAQ_VISIVEIS && (
            <button className="ifd-faq-mais" onClick={() => setTodasPerguntas(true)}>
              Ver todas as {FAQ_INSTALACAO.length} perguntas
            </button>
          )}
        </div>
      </section>

      <section className="ifd-fechamento">
        <h2>Pronto para aposentar a chave?</h2>
        <p>Mande a foto da porta e receba o modelo que combina e o valor no mesmo dia.</p>
        <WhatsAppButton message={MSG_FECHADURA_COMBO} className="ifd-btn ifd-btn--grande">
          Pedir orçamento no WhatsApp
        </WhatsAppButton>
        {/* Aponta para a pagina de MODELOS, nao para automacao: quem cuida de
            automacao residencial e a /automacao. */}
        <Link to="/casa-inteligente" className="ifd-link ifd-link--centro">
          Ainda escolhendo o aparelho? Compare os modelos →
        </Link>
      </section>

      {/* Barra fixa so no celular: 1 toque ate o WhatsApp em qualquer ponto da
          leitura. Esconde o balao flutuante global nesta pagina (ver CSS). */}
      <div className="ifd-barra">
        <WhatsAppButton message={MSG_FECHADURA_COMBO} className="ifd-btn">
          📷 Mandar foto da porta
        </WhatsAppButton>
      </div>
    </div>
  );
}
