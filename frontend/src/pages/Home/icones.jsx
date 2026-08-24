// Ícones dos cards de case. Substituem os emojis 🌐 ⚡ 🏫, que renderizavam
// diferente em cada sistema e destoavam dos SVGs do resto do site.
// Herdam cor por currentColor e tamanho por font-size do pai (1em).
import { base } from '../../lib/iconeBase';

/** Cabeamento estruturado / infraestrutura de rede. */
export const IcoRede = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="9" y="2.5" width="6" height="5" rx="1" />
    <rect x="2.5" y="16.5" width="6" height="5" rx="1" />
    <rect x="15.5" y="16.5" width="6" height="5" rx="1" />
    <path d="M12 7.5v3.8" />
    <path d="M5.5 16.5v-2.2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v2.2" />
  </svg>
);

/** Instalação elétrica. */
export const IcoRaio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
  </svg>
);

/** Instituição de ensino. */
export const IcoEscola = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3.2 2.4 7.6 12 12l9.6-4.4z" />
    <path d="M6.6 9.7v5c0 1.7 2.4 3 5.4 3s5.4-1.3 5.4-3v-5" />
    <path d="M21.6 7.6v5.2" />
  </svg>
);
