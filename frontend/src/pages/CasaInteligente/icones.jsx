// Ícones da landing. Substituem os emojis da versão anterior, que renderizavam
// diferente em cada SO e derrubavam a sensação premium.
// Todos herdam cor por currentColor e tamanho por font-size do pai (1em).

import { base } from './iconeBase';

export const IcoDigital = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3a6 6 0 0 0-6 6v3a10 10 0 0 1-.6 3.4" />
    <path d="M12 7a2 2 0 0 0-2 2v3a14 14 0 0 1-1 5" />
    <path d="M12 11v1a18 18 0 0 1-.7 5" />
    <path d="M15.6 20a22 22 0 0 0 .4-4V9a4 4 0 0 0-6-3.5" />
    <path d="M18.5 17.5A26 26 0 0 0 19 12V9a7 7 0 0 0-3.5-6" />
  </svg>
);

export const IcoApp = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);

export const IcoEscudo = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 2.8 4.8 6v5.6c0 4.4 3 8.2 7.2 9.6 4.2-1.4 7.2-5.2 7.2-9.6V6z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const IcoPorta = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
    <path d="M3 21h16" />
    <circle cx="13" cy="12.5" r="1" />
  </svg>
);

export const IcoPredio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
    <path d="M15 10h4a1 1 0 0 1 1 1v10" />
    <path d="M2 21h20M7.5 8h1M11 8h1M7.5 12h1M11 12h1M7.5 16h1M11 16h1" />
  </svg>
);

export const IcoVidro = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 7 16 15M8 13l4 4" />
  </svg>
);

export const IcoCheck = ({ className }) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const IcoEstrela = ({ className }) => (
  <svg {...base} className={className} fill="currentColor" stroke="none">
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
  </svg>
);

export const IcoPresente = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="8.5" width="18" height="5" rx="1" />
    <path d="M5 13.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5M12 8.5V21" />
    <path d="M12 8.5S10.8 3.5 8.5 3.5a2.2 2.2 0 0 0 0 5zM12 8.5s1.2-5 3.5-5a2.2 2.2 0 0 1 0 5z" />
  </svg>
);
