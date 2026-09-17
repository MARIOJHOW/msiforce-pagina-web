import { useParams, Navigate } from 'react-router-dom';
import { SERVICOS_DATA } from '../../data/servicos';
import useSEO from '../../hooks/useSEO';
import useJsonLd from '../../hooks/useJsonLd';
import Servico from './Servico';

const BASE = 'https://msiforce.com.br';

export default function ServicoPage() {
  const { slug } = useParams();
  const servico = SERVICOS_DATA[slug];

  if (!servico) return <Navigate to="/" replace />;

  // key={slug}: quando o visitante pula de um serviço para outro pelos cards de
  // "relacionados", o React Router reaproveita a instância (só o :slug muda) e o
  // useJsonLd — que roda uma vez no mount — deixaria o schema do serviço anterior
  // preso na página nova. O remount garante title/canonical/schema coerentes.
  return <ServicoComSEO key={slug} servico={servico} />;
}

// O canonical PRECISA ser declarado aqui. Sem ele a rota herda o canonical do
// index.html que o Cloudflare Pages devolve como fallback de SPA — que aponta
// para a home — e o Google trata a página como duplicata ("Página alternativa
// com tag canônica adequada") e nunca a indexa. Diagnosticado em 17/09/2026.
function ServicoComSEO({ servico }) {
  const { title, slug, sub, heroImg, faq } = servico;
  const url = `${BASE}/servicos/${slug}`;

  useSEO({ title, description: sub, canonical: url });

  useJsonLd([
    {
      key: `servico-${slug}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description: sub,
        url,
        image: `${BASE}${heroImg}`,
        serviceType: title,
        areaServed: { '@type': 'City', name: 'São Paulo' },
        // @id igual ao do LocalBusiness do index.html: o Google consolida as
        // quatro páginas de serviço na MESMA empresa em vez de ler cada uma
        // como um negócio diferente.
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
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    },
    // Só declara FAQPage porque as perguntas ficam visíveis na página (sem
    // accordion fechado) — é o que o Google exige para o rich result.
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

  return <Servico servico={servico} />;
}
