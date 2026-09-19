import { useParams, Navigate } from 'react-router-dom';
import { PORTAS_DATA } from '../../data/portas';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import Servico from '../Servicos/Servico';

const BASE = 'https://msiforce.com.br';

export default function PortaPage() {
  const { slug } = useParams();
  const porta = PORTAS_DATA[slug];

  if (!porta) return <Navigate to="/instalacao-fechadura-digital" replace />;

  // key={slug}: sem o remount, pular de uma porta para outra pelos cards de
  // "related" reaproveita a instância e o useJsonLd — que roda no mount —
  // deixaria o schema da página anterior preso na nova. Mesmo motivo do
  // ServicoPage.
  return <PortaComSEO key={slug} porta={porta} />;
}

// O canonical PRECISA ser declarado aqui, como em ServicoPage: sem ele a rota
// herdaria o canonical do index.html e o Google a trataria como duplicata da
// home. Foi o alerta de 17/09/2026.
function PortaComSEO({ porta }) {
  const { title, slug, sub, heroImg, faq } = porta;
  const url = `${BASE}/fechaduras/${slug}`;

  useSEO({ title, description: sub, canonical: url });

  useJsonLd([
    {
      key: `porta-${slug}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description: sub,
        url,
        ...(heroImg ? { image: `${BASE}${heroImg}` } : {}),
        serviceType: 'Instalação de fechadura digital',
        areaServed: { '@type': 'City', name: 'São Paulo' },
        // Mesmo @id do LocalBusiness do index.html: o Google consolida estas
        // páginas na MESMA empresa em vez de ler cada uma como um negócio.
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${BASE}/#empresa`,
          name: 'MSIFORCE',
          url: BASE,
          telephone: '+55-11-91077-3865',
          areaServed: { '@type': 'City', name: 'São Paulo' },
        },
      },
    },
    {
      key: `breadcrumb-${slug}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${BASE}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Instalação de fechadura digital',
            item: `${BASE}/instalacao-fechadura-digital`,
          },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    },
    // Só declara FAQPage porque as perguntas ficam visíveis na página, sem
    // accordion fechado — é o que o Google exige para o rich result.
    ...(faq?.length
      ? [{
          key: `faq-${slug}`,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        }]
      : []),
  ]);

  return (
    <Servico
      servico={porta}
      base="/fechaduras"
      relatedTitle="Outros tipos de porta"
      voltar={{ to: '/instalacao-fechadura-digital', label: '← Instalação de fechadura digital' }}
    />
  );
}
