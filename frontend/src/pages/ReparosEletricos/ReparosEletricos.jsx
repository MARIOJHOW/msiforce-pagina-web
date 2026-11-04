import { useState } from 'react';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import WhatsAppButton from '../../components/WhatsAppButton';
import { MSG_REPAROS_ELETRICOS } from '../../lib/gatilhos';
import { eventoGtag } from '../../lib/ads';
// Mesma base visual das outras landings de anúncio; só o que é próprio fica no .css.
import '../InstalacaoFechaduraDigital/InstalacaoFechaduraDigital.css';
import './ReparosEletricos.css';

// Landing do Google Ads "reparos elétricos" (04/11/2026). atendimento só Zona Leste e Guarulhos.
const HORARIO = '24 horas, todos os dias'; // dono passou a atender 24h em 04/11/2026 (antes: 7h às 21h)
const TELEFONE_TEL = 'tel:+5511910773865'; // mesmo número do WhatsApp/LocalBusiness do site (não há outro)

// Eventos gtag pedidos para a campanha. As conversões são criadas no painel do Ads, não aqui.
const cliqueWhatsApp = () => eventoGtag('click_whatsapp', { page: 'reparos-eletricos' });
const cliqueLigar = () => eventoGtag('click_call', { page: 'reparos-eletricos' });

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
    p: 'Tem eletricista 24 horas?',
    r: 'Sim. Atendemos 24 horas, todos os dias, pelo WhatsApp. Chame e confirmamos a disponibilidade e o tempo de chegada para o seu bairro. Se houver cheiro de queimado, faísca ou fio quente, desligue a chave geral do quadro; em caso de fogo, ligue 193 (Bombeiros).',
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
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
    title: 'Eletricista 24 Horas Zona Leste SP e Guarulhos | MSI Force',
    tituloCompleto: true,
    description:
      'Eletricista 24 horas: disjuntor desarmando, curto-circuito ou tomada sem energia? Itaquera, Zona Leste e Guarulhos. Orçamento rápido no WhatsApp.',
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
          <p className="ifd-eyebrow">Eletricista 24 horas · Zona Leste · Guarulhos</p>
          <h1 className="ifd-titulo">
            Eletricista na Zona Leste de SP e Guarulhos <span>para reparos e emergências</span>
          </h1>
          <p className="ifd-sub">
            Disjuntor desarmando, curto-circuito, tomada sem energia? Atendimento rápido em
            Itaquera, Tatuapé, Penha, Mooca e região, com orçamento antes de começar.
          </p>
          <p className="rele-info">
            <strong>Atendimento</strong> {HORARIO} · <strong>Orçamento</strong> antes de começar
          </p>
          <div className="rele-botoes">
            <WhatsAppButton message={MSG_REPAROS_ELETRICOS} onClick={cliqueWhatsApp} className="ifd-btn ifd-btn--grande">
              Chamar no WhatsApp
            </WhatsAppButton>
            <a href={TELEFONE_TEL} onClick={cliqueLigar} className="ifd-btn ifd-btn--grande rele-ligar">
              Ligar agora
            </a>
          </div>
          <p className="rele-seguranca">
            <strong>Cheiro de queimado, faísca ou fio quente?</strong> Desligue a chave geral do
            quadro e chame agora.
          </p>
          {/* TODO: foto real do dono (eletricista em serviço) pode entrar aqui, ex.:
              <figure className="ifd-hero-figura"><img src="/..." alt="..." width height loading="eager" /></figure>
              Não há foto de reparo elétrico no projeto; não usei imagem de outro serviço. */}
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Problemas que resolvemos</h2>
          <ul className="ifd-razoes">
            {PROBLEMAS.map((p) => (
              <li key={p.texto}>
                <span className="ifd-razao-icone" aria-hidden="true">{p.icone}</span>
                <div>
                  <strong>{p.texto}</strong>
                  <WhatsAppButton
                    message={`${MSG_REPAROS_ELETRICOS} Problema: ${p.texto}.`}
                    onClick={cliqueWhatsApp}
                    className="rele-atalho"
                  >
                    Chamar por este problema →
                  </WhatsAppButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Eletricista residencial, comercial e de emergência</h2>
          <p className="ifd-lead">
            Conserto de curto-circuito, disjuntor que desarma, tomada sem energia, troca de
            chuveiro elétrico, instalação de tomadas e interruptores, troca de quadro de luz e
            falta de energia em casa, apartamento, loja ou condomínio. Atendimento de urgência e,
            conforme a agenda, no mesmo dia, em Itaquera e perto de você na Zona Leste e em
            Guarulhos.
          </p>
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
        <h2>Precisa de eletricista na Zona Leste ou em Guarulhos?</h2>
        <p>Fale agora com a MSI Force e receba o orçamento rapidamente.</p>
        <div className="rele-botoes rele-botoes--centro">
          <WhatsAppButton message={MSG_REPAROS_ELETRICOS} onClick={cliqueWhatsApp} className="ifd-btn ifd-btn--grande">
            Chamar no WhatsApp
          </WhatsAppButton>
          <a href={TELEFONE_TEL} onClick={cliqueLigar} className="ifd-btn ifd-btn--grande rele-ligar">
            Ligar agora
          </a>
        </div>
      </section>

      {/* Barra fixa (só celular): os dois botões ficam sempre visíveis. */}
      <div className="ifd-barra rele-barra">
        <WhatsAppButton message={MSG_REPAROS_ELETRICOS} onClick={cliqueWhatsApp} className="ifd-btn">
          WhatsApp
        </WhatsAppButton>
        <a href={TELEFONE_TEL} onClick={cliqueLigar} className="ifd-btn rele-ligar">
          Ligar agora
        </a>
      </div>
    </div>
  );
}
