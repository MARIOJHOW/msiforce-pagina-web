import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import SolucaoAirbnb from './SolucaoAirbnb';
// Reaproveita as classes utilitárias da campanha (glass-panel, premium-gradient,
// campanha-btn-primary...) em vez de duplicá-las — mesma base visual da família
// de páginas de fechadura digital.
import '../CasaInteligente/CasaInteligente.css';
import './FechaduraAirbnb.css';

const SERVICO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Automação de Acesso e Energia para Airbnb',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MSIFORCE',
    url: 'https://msiforce.com.br',
    telephone: '+55-11-91077-3865',
    areaServed: { '@type': 'City', name: 'São Paulo' },
  },
  areaServed: { '@type': 'City', name: 'São Paulo' },
  description:
    'Fechadura digital com senha por hóspede e cartão que controla a energia do imóvel, para anfitriões de Airbnb e locação por temporada em São Paulo.',
};

export default function FechaduraAirbnb() {
  useSEO({
    title: 'Fechadura Digital para Airbnb em São Paulo',
    description:
      'Controle de acesso e energia para Airbnb e locação por temporada: senha por hóspede, cartão que liga a casa, pacotes Start, Smart e Pro com instalação inclusa.',
    canonical: 'https://msiforce.com.br/fechadura-airbnb',
  });

  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(SERVICO_SCHEMA);
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="airbnb-page">
      <p className="airbnb-voltar">
        <Link to="/casa-inteligente">← Fechadura digital residencial</Link>
      </p>
      <SolucaoAirbnb />
    </div>
  );
}
