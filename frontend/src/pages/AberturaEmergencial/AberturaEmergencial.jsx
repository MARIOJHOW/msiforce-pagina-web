import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import WhatsAppButton from '../../components/WhatsAppButton';
import { MSG_ABERTURA_EMERGENCIAL } from '../../lib/gatilhos';
// Reaproveita a base visual da página de instalação (mesma família de páginas de
// fechadura digital); só o que é próprio da emergência fica em AberturaEmergencial.css.
import '../InstalacaoFechaduraDigital/InstalacaoFechaduraDigital.css';
import './AberturaEmergencial.css';

// Página criada em 15/10/2026. Preço e horário definidos pelo dono em 15/10/2026 (mesmos
// valores que o bot informa ao fim do funil — ver TEXTO_VALORES em services/abertura-emergencial.js).
// O valor é só da abertura; peça ou bateria trocada é combinada à parte.
const PRECO = 'R$ 250 na semana (horário comercial) · R$ 450 em final de semana e fora do horário comercial'; // definido pelo dono em 15/10/2026
const HORARIO = 'todos os dias, das 7h às 21h'; // horário de atendimento confirmado pelo dono (13/10/2026)

const AREA_ATENDIDA = [
  { '@type': 'AdministrativeArea', name: 'Zona Leste de São Paulo' },
  { '@type': 'City', name: 'Guarulhos' },
  { '@type': 'City', name: 'São Paulo' },
];

const SITUACOES = [
  { icone: '🔋', titulo: 'Bateria acabou', texto: 'A fechadura apagou e a chave de emergência não está à mão.' },
  { icone: '🔑', titulo: 'Esqueci a senha', texto: 'Senha trocada, esquecida ou que não aceita mais.' },
  { icone: '☝️', titulo: 'Biometria não lê', texto: 'O sensor recusa o dedo e não há outro jeito de entrar.' },
  { icone: '🔒', titulo: 'Fechadura travada', texto: 'Ela não responde ao teclado, ao app nem à tag.' },
];

const PASSOS = [
  'Você chama no WhatsApp e o bot pergunta o problema, o modelo e o bairro',
  'O técnico confirma o valor e responde com o tempo de chegada, antes de sair',
  'No local, conferimos documento com foto e comprovante de que você mora lá',
  'Abrimos, preservando a fechadura sempre que possível',
];

const FAQ = [
  {
    p: 'Vocês abrem qualquer fechadura digital?',
    r: 'Atendemos as marcas com que trabalhamos, como Intelbras, Papaiz e EZVIZ. Mande a marca e o modelo no WhatsApp que confirmamos antes de sair. Se o seu modelo for muito diferente, avisamos que não conseguimos em vez de arriscar sua fechadura.',
  },
  {
    p: 'A fechadura pode estragar?',
    r: 'Trabalhamos para preservá-la sempre que possível. Se for necessário trocar uma peça (miolo, bateria ou módulo), avisamos antes e só fazemos com a sua autorização. Uma abertura forçada em alguns modelos pode afetar a garantia do fabricante, e explicamos isso antes de começar.',
  },
  {
    p: 'Por que pedem documento e comprovante de endereço?',
    r: 'Por segurança sua e do imóvel: só abrimos para o morador ou responsável. Tenha em mãos um documento com foto e um comprovante de endereço ou contrato (a foto no celular serve). Sem comprovação, não abrimos.',
  },
  {
    p: 'Quanto custa?',
    r: 'A abertura custa R$ 250 na semana, em horário comercial, e R$ 450 em final de semana e fora do horário comercial. Se for preciso trocar peça ou bateria, combinamos à parte e só fazemos com a sua autorização.',
  },
  {
    p: 'Vocês abrem carro, cofre ou porta comum?',
    r: 'Não. Atendemos abertura emergencial somente de fechaduras digitais residenciais.',
  },
  {
    p: 'Posso tentar abrir sozinho antes?',
    r: 'Pode, e vale a pena. Se a bateria acabou, use a chave mecânica de emergência ou, se o seu modelo tiver, encoste uma bateria 9V nos contatos externos. Se a digital não lê, seque o dedo e o sensor e tente outro dedo. Não conseguiu? Chame a gente.',
  },
];

const SERVICO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Abertura emergencial de fechadura digital',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MSIFORCE',
    url: 'https://msiforce.com.br',
    telephone: '+55-11-91077-3865',
    areaServed: AREA_ATENDIDA,
  },
  areaServed: AREA_ATENDIDA,
  description:
    'Abertura emergencial de fechadura digital residencial na zona leste de São Paulo e em Guarulhos, mediante comprovação de moradia.',
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

export default function AberturaEmergencial() {
  const [aberta, setAberta] = useState(0);

  useSEO({
    title: 'Abertura Emergencial de Fechadura Digital em São Paulo',
    description:
      'Trancado fora com fechadura digital? Abertura emergencial na zona leste de São Paulo e em Guarulhos: bateria que acabou, senha esquecida ou biometria que não lê. Chame no WhatsApp.',
    canonical: 'https://msiforce.com.br/abertura-emergencial-fechadura-digital',
  });

  useJsonLd([
    { key: 'servico', schema: SERVICO_SCHEMA },
    { key: 'faq', schema: FAQ_SCHEMA },
  ]);

  return (
    <div className="ifd-page abem-page">
      <section className="ifd-hero">
        <div className="ifd-hero-grid">
          <div>
          <p className="ifd-eyebrow">Zona Leste · Guarulhos</p>
          <h1 className="ifd-titulo">
            Trancado fora? <span>Abertura emergencial de fechadura digital</span>
          </h1>
          <p className="ifd-sub">
            Bateria acabou, senha esquecida ou biometria que não lê? Chame no
            WhatsApp: o técnico que instala fechadura digital vai até você.
          </p>

          {(PRECO || HORARIO) && (
            <p className="abem-info">
              {PRECO && <span><strong>Abertura</strong> {PRECO}</span>}
              {HORARIO && <span><strong>Atendimento</strong> {HORARIO}</span>}
            </p>
          )}

          <WhatsAppButton message={MSG_ABERTURA_EMERGENCIAL} className="ifd-btn ifd-btn--grande">
            🚨 Chamar o técnico no WhatsApp
          </WhatsAppButton>
          <p className="ifd-micro">
            Só fechaduras digitais residenciais · mediante comprovação de moradia · valor da abertura
            informado antes de o técnico sair
          </p>
          </div>

          <figure className="ifd-hero-figura">
            <img
              src="/abertura-emergencial-hero.webp"
              alt="Técnico de uniforme ajustando uma fechadura digital preta com teclado iluminado em uma porta de madeira, à noite"
              className="ifd-hero-img"
              width="900"
              height="900"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Tente isto antes (1 minuto)</h2>
          <p className="ifd-lead">
            <strong>Bateria fraca:</strong> use a chave mecânica de emergência ou, se o seu
            modelo tiver, encoste uma bateria 9V nos contatos externos.{' '}
            <strong>Digital não lê:</strong> seque o dedo e o sensor e tente outro dedo. Não
            funcionou? Chame a gente.
          </p>
        </div>
      </section>

      <section className="ifd-secao">
        <div className="ifd-conteudo">
          <h2>Quando chamar</h2>
          <ul className="ifd-razoes">
            {SITUACOES.map((s) => (
              <li key={s.titulo}>
                <span className="ifd-razao-icone" aria-hidden="true">{s.icone}</span>
                <div>
                  <strong>{s.titulo}</strong>
                  <p>{s.texto}</p>
                </div>
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
          <p className="abem-aviso">
            <strong>Tenha em mãos:</strong> documento com foto e comprovante de endereço ou
            contrato (foto no celular serve). Só abrimos para o morador ou responsável.
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
                    aria-controls={`abem-resposta-${i}`}
                    id={`abem-pergunta-${i}`}
                  >
                    <span>{item.p}</span>
                    <span className="ifd-faq-icone" aria-hidden="true">
                      {aberta === i ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={`abem-resposta-${i}`}
                  role="region"
                  aria-labelledby={`abem-pergunta-${i}`}
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
        <h2>Está na porta agora?</h2>
        <p>Chame no WhatsApp: o técnico responde com o tempo de chegada.</p>
        <WhatsAppButton message={MSG_ABERTURA_EMERGENCIAL} className="ifd-btn ifd-btn--grande">
          Chamar o técnico
        </WhatsAppButton>
        <p className="abem-depois">
          Depois de resolver, veja a{' '}
          <Link to="/instalacao-fechadura-digital">instalação de fechadura digital</Link>{' '}
          para nunca mais ficar na mão.
        </p>
      </section>

      <div className="ifd-barra">
        <WhatsAppButton message={MSG_ABERTURA_EMERGENCIAL} className="ifd-btn">
          🚨 Chamar o técnico
        </WhatsAppButton>
      </div>
    </div>
  );
}
