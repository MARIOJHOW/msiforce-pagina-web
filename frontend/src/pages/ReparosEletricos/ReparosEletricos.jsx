import { useState } from 'react';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import WhatsAppButton from '../../components/WhatsAppButton';
import { MSG_REPAROS_ELETRICOS } from '../../lib/gatilhos';
// Mesma base visual das outras landings de anúncio; só o que é próprio fica no .css.
import '../InstalacaoFechaduraDigital/InstalacaoFechaduraDigital.css';
import './ReparosEletricos.css';

// Landing do Google Ads "reparos elétricos" (04/11/2026). NÃO atende Grande ABC.
const TELEFONE_TEL = 'tel:+5511910773865';

const AREA_ATENDIDA = [
  { '@type': 'AdministrativeArea', name: 'Zona Leste de São Paulo' },
  { '@type': 'City', name: 'Guarulhos' },
];

const PROBLEMAS = [
  { icone: '⚡', texto: 'Disjuntor que desarma toda hora ou não liga' },
  { icone: '🔥', texto: 'Curto-circuito, cheiro de queimado, fio esquentando' },
  { icone: '🔌', texto: 'Tomadas e interruptores sem energia ou com mau contato' },
  { icone: '🔧', texto: 'Troca de tomadas, interruptores, disjuntores e chuveiro elétrico' },
  { icone: '🗄️', texto: 'Quadro de luz antigo, sobrecarregado ou sem DR' },
  { icone: '💡', texto: 'Falta de luz em parte da casa ou do apartamento' },
];

const PASSOS = [
  'Você chama no WhatsApp e descreve o problema (uma foto ajuda).',
  'Passamos o valor ou combinamos a visita técnica antes de ir.',
  'O eletricista vai até você, resolve e testa a instalação.',
  'Você recebe o serviço conferido e com garantia.',
];

const DIFERENCIAIS = [
  'Trabalho seguindo as normas NBR 5410 e NBR 17019',
  'Preço combinado antes do serviço, sem surpresa',
  'Atendimento residencial, comercial e condomínios',
  // TODO: informar o prazo da garantia (dono). Por enquanto o texto fica sem prazo.
  'Garantia no serviço executado',
];

// 'Atendem no mesmo dia?' e 'Atendem condomínios e empresas?' vieram do dono. As demais são
// provisórias (TODO: aprovar/substituir com o dono), sem valores nem prazos.
const FAQ = [
  {
    p: 'Vocês atendem na minha região?',
    r: 'Atendemos a Zona Leste de São Paulo (Itaquera, Tatuapé, Penha, Mooca, Carrão, Vila Matilde, Guaianases e regiões próximas) e Guarulhos. Se o seu bairro não está na lista, chame no WhatsApp e confirmamos.',
  },
  {
    p: 'O disjuntor desarma toda hora. O que fazer?',
    r: 'Desarme repetido costuma indicar sobrecarga ou curto-circuito. Desligue os aparelhos do circuito, não force o disjuntor a ficar ligado e chame um eletricista. Se houver cheiro de queimado, fio quente ou faísca, desligue a chave geral e chame com urgência.',
  },
  {
    p: 'Como é passado o valor do serviço?',
    r: 'Você descreve o problema no WhatsApp (uma foto ajuda) e passamos o valor ou combinamos uma visita técnica antes de o eletricista ir. O preço é combinado antes do serviço, sem surpresa.',
  },
  {
    p: 'Atendem no mesmo dia?',
    r: 'Sim, conforme a agenda e a região. Chame no WhatsApp para confirmar a disponibilidade de hoje.',
  },
  {
    p: 'Atendem condomínios e empresas?',
    r: 'Sim, em residenciais, prédios e comércios.',
  },
  {
    p: 'O serviço tem garantia?',
    r: 'Sim, o serviço executado tem garantia. Combinamos os detalhes junto com o orçamento.',
  },
];

const ELECTRICIAN_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  name: 'MSIFORCE',
  url: 'https://msiforce.com.br/reparos-eletricos',
  telephone: '+55-11-91077-3865',
  description:
    'Eletricista na Zona Leste de São Paulo e em Guarulhos para reparos e emergências elétricas: disjuntor desarmando, curto-circuito, tomadas sem energia e troca de chuveiro.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  areaServed: AREA_ATENDIDA,
  serviceType: 'Reparos elétricos residenciais e comerciais',
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

export default function ReparosEletricos() {
  const [aberta, setAberta] = useState(0);

  useSEO({
    title: 'Eletricista Zona Leste SP e Guarulhos | Reparos | MSI Force',
    tituloCompleto: true,
    description:
      'Disjuntor desarmando, curto-circuito ou tomada sem energia? Eletricista em Itaquera, Zona Leste e Guarulhos. Orçamento rápido pelo WhatsApp.',
    canonical: 'https://msiforce.com.br/reparos-eletricos',
  });

  useJsonLd([
    { key: 'eletricista', schema: ELECTRICIAN_SCHEMA },
    { key: 'faq', schema: FAQ_SCHEMA },
  ]);

  return (
    <div className="ifd-page rele-page">
      <section className="ifd-hero">
        <div className="rele-hero">
          <p className="ifd-eyebrow">Zona Leste · Guarulhos</p>
          <h1 className="ifd-titulo">
            Eletricista na Zona Leste de SP e Guarulhos <span>para reparos e emergências</span>
          </h1>
          <p className="ifd-sub">
            Disjuntor desarmando, curto-circuito, tomada sem energia? Atendimento rápido em
            Itaquera, Tatuapé, Penha, Mooca e região, com orçamento antes de começar.
          </p>
          <div className="rele-botoes">
            <WhatsAppButton message={MSG_REPAROS_ELETRICOS} className="ifd-btn ifd-btn--grande">
              Chamar no WhatsApp
            </WhatsAppButton>
            <a href={TELEFONE_TEL} className="ifd-btn ifd-btn--grande rele-ligar">
              Ligar agora
            </a>
          </div>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Problemas que resolvemos</h2>
          <ul className="ifd-razoes">
            {PROBLEMAS.map((p) => (
              <li key={p.texto}>
                <span className="ifd-razao-icone" aria-hidden="true">{p.icone}</span>
                <div><strong>{p.texto}</strong></div>
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
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Por que a MSI Force</h2>
          <ul className="rele-lista">
            {DIFERENCIAIS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Onde atendemos</h2>
          <p className="ifd-lead">
            Zona Leste de São Paulo (Itaquera, Tatuapé, Penha, Mooca, Carrão, Vila Matilde,
            Guaianases e regiões próximas) e Guarulhos. Se o seu bairro não está na lista,
            chame no WhatsApp e confirmamos.
          </p>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Dúvidas rápidas</h2>
          <div className="ifd-faq">
            {FAQ.map((item, i) => (
              <div className="ifd-faq-item" key={item.p}>
                <h3>
                  <button
                    className="ifd-faq-q"
                    onClick={() => setAberta(aberta === i ? null : i)}
                    aria-expanded={aberta === i}
                    aria-controls={`rele-resposta-${i}`}
                    id={`rele-pergunta-${i}`}
                  >
                    <span>{item.p}</span>
                    <span className="ifd-faq-icone" aria-hidden="true">
                      {aberta === i ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={`rele-resposta-${i}`}
                  role="region"
                  aria-labelledby={`rele-pergunta-${i}`}
                  className="ifd-faq-a"
                  hidden={aberta !== i}
                >
                  {item.r}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ifd-fechamento">
        <h2>Precisa de um eletricista agora?</h2>
        <p>Descreva o problema no WhatsApp e passamos o valor antes de ir.</p>
        <div className="rele-botoes rele-botoes--centro">
          <WhatsAppButton message={MSG_REPAROS_ELETRICOS} className="ifd-btn ifd-btn--grande">
            Chamar no WhatsApp
          </WhatsAppButton>
          <a href={TELEFONE_TEL} className="ifd-btn ifd-btn--grande rele-ligar">
            Ligar agora
          </a>
        </div>
      </section>

      <div className="ifd-barra">
        <WhatsAppButton message={MSG_REPAROS_ELETRICOS} className="ifd-btn">
          Chamar no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
