import { useEffect } from 'react';
import './CampanhaFechadura.css';
import WhatsAppButton from '../components/WhatsAppButton';
import { iniciarAds } from '../lib/ads';
import {
  MSG_FECHADURA_COMBO,
  MSG_FECHADURA_INSTALACAO,
  msgFechaduraModelo,
} from '../lib/gatilhos';

// FASE 2: preencha com o valor da instalação (ex.: 'R$ 350').
// Enquanto for null a faixa de preço simplesmente não aparece — nada de valor inventado.
const VALOR_INSTALACAO_A_PARTIR = null;

const MODELOS = [
  {
    id: 'mfr3000v',
    nome: 'Intelbras MFR 3000 V',
    tag: 'Premium (Embutir)',
    imagem: '/mfr3000v.webp',
    metodos: ['👆 Digital', '📱 Celular (App)', '💳 Tag', '🔢 Senha', '🔑 Chave'],
  },
  {
    id: 'fr221v',
    nome: 'Intelbras FR 221 V',
    tag: 'Design (Embutir)',
    imagem: '/fr221v.webp',
    metodos: ['👆 Digital', '🔢 Senha'],
  },
  {
    id: 'fr102',
    nome: 'Intelbras FR 102',
    tag: 'Intermediária (Sobrepor)',
    imagem: '/fr102.webp',
    metodos: ['🔢 Senha (Touch)'],
  },
  {
    id: 'fr10',
    nome: 'Intelbras FR 10',
    tag: 'Custo-Benefício (Sobrepor)',
    imagem: '/fr10.webp',
    metodos: ['🔢 Senha'],
  },
];

const CampanhaFechadura = () => {
  useEffect(() => {
    document.title = 'Fechadura Digital em SP - Sua Casa Inteligente Começa na Porta';
    window.scrollTo(0, 0);
    iniciarAds();
  }, []);

  return (
    <div className="campanha-container">
      {/* Hero Section */}
      <section className="campanha-hero">
        <div className="campanha-badge">🔒 Oferta Especial São Paulo</div>
        <h1>Sua Casa Inteligente Começa na Porta</h1>
        <p>
          Esqueceu a chave? Com a fechadura digital, seu dedo é a única chave que você precisa.
          Instalação rápida e especializada em toda São Paulo.
        </p>
        {VALOR_INSTALACAO_A_PARTIR && (
          <p className="campanha-faixa-preco">
            Instalação profissional a partir de <strong>{VALOR_INSTALACAO_A_PARTIR}</strong>
          </p>
        )}
        <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary pulse-icon">
          Solicitar Orçamento no WhatsApp
        </WhatsAppButton>

        <div className="modelos-vitrine" id="modelos">
          <h3 className="vitrine-titulo">Escolha o modelo ideal para sua porta</h3>
          <div className="modelos-grid">
            {MODELOS.map((m) => (
              <div className="modelo-card" key={m.id}>
                <div className="modelo-imagem image-animada">
                  <img src={m.imagem} alt={m.nome} loading="lazy" width="300" height="300" />
                </div>
                <div className="modelo-info">
                  <span className="modelo-tag">{m.tag}</span>
                  <h4>{m.nome}</h4>
                  <div className="metodos-abertura">
                    {m.metodos.map((metodo) => (
                      <span className="metodo-badge" key={metodo}>
                        {metodo}
                      </span>
                    ))}
                  </div>
                  <WhatsAppButton
                    message={msgFechaduraModelo(m.nome.replace('Intelbras ', ''))}
                    className="botao-comprar-kit"
                  >
                    Quero Fechadura + Instalação
                  </WhatsAppButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Instalação Avulsa */}
      <section className="campanha-instalacao-avulsa" id="instalacao">
        <div className="instalacao-content">
          <h3>Já comprou sua fechadura na internet?</h3>
          <p>
            Não arrisque perder a garantia da sua fechadura digital entregando a porta da sua casa nas mãos
            de pessoas inexperientes. A <strong>MsiForce</strong> oferece o serviço especializado de{' '}
            <strong>Apenas Instalação</strong>.
          </p>
          <ul className="beneficios-instalacao">
            <li>✔️ Acabamento Impecável em portas de madeira ou metal</li>
            <li>✔️ Configuração completa de senhas, biometrias e tags</li>
            <li>✔️ Treinamento para os moradores usarem com facilidade</li>
          </ul>
          <WhatsAppButton message={MSG_FECHADURA_INSTALACAO} className="botao-instalacao-avulsa">
            🛠️ Quero orçamento SÓ da instalação
          </WhatsAppButton>
        </div>
      </section>

      {/* Problema / Solução - Features */}
      <section className="campanha-section campanha-section-alt">
        <h2 className="campanha-section-title">Por que mudar para a Fechadura Digital?</h2>
        <p className="campanha-section-subtitle">
          Mais do que segurança, é o primeiro passo para ter a sua casa na palma da sua mão.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👆</div>
            <h3>Acesso Biométrico</h3>
            <p>Esqueça o molho de chaves. Acesse sua casa com sua digital em menos de 1 segundo.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Controle pelo Celular</h3>
            <p>Gere senhas temporárias para visitas, prestadores de serviço ou familiares de onde estiver.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Alta Segurança</h3>
            <p>Sistemas anti-arrombamento, alarme de bateria fraca e fechamento automático ao encostar a porta.</p>
          </div>
        </div>
      </section>

      {/* Oferta / Upsell */}
      <section className="campanha-section" id="combo">
        <div className="offer-box">
          <h2>Combo: Fechadura + Instalação</h2>
          <p>
            Não se preocupe com furos na porta ou configurações complicadas. Nossos especialistas em automação
            residencial cuidam de tudo para você em São Paulo.
          </p>
          <p style={{ fontStyle: 'italic', color: '#4ade80', marginBottom: '2rem' }}>
            🎁 Bônus: Ganhe uma consultoria gratuita de Automação para sua casa após a instalação!
          </p>
          <WhatsAppButton message={MSG_FECHADURA_COMBO} className="campanha-btn-primary">
            Quero Agendar Minha Instalação
          </WhatsAppButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="campanha-footer">
        <p>© {new Date().getFullYear()} MSI Force - Automação Residencial. Todos os direitos reservados.</p>
        <p>São Paulo, SP</p>
      </footer>

      {/* Flutuante: leva o gatilho da campanha, não a mensagem genérica do site */}
      <WhatsAppButton message={MSG_FECHADURA_COMBO} />
    </div>
  );
};

export default CampanhaFechadura;
