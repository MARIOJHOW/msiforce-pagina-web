// Ícones da seção "Solução Airbnb". Mesma regra do icones.jsx: nada de emoji,
// que renderiza diferente em cada SO (no Windows, chuveiro e forno saíam como
// quadrado vazio). Herdam cor por currentColor e tamanho por font-size do pai.
import { base } from '../../lib/iconeBase';

/* --- Circuitos desligados ao retirar o cartão --- */

export const IcoFloco = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 2v20" />
    <path d="m3.3 7 17.4 10M20.7 7 3.3 17" />
    <path d="M9.5 3.9 12 5.4l2.5-1.5M9.5 20.1 12 18.6l2.5 1.5" />
    <path d="m4.9 6.2.6 2.9-2.9.6M19.1 17.8l-.6-2.9 2.9-.6" />
    <path d="m2.6 14.3 2.9.6-.6 2.9M21.4 9.7l-2.9-.6.6-2.9" />
  </svg>
);

export const IcoChuveiro = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M3.5 10h11" />
    <path d="M4.5 10a4.5 4.5 0 0 1 9 0" />
    <path d="M9 5.5V4.5a2 2 0 0 1 2-2h9.5" />
    <path d="M6.5 13.5V15M9 13.5v3.5M11.5 13.5V15" />
  </svg>
);

export const IcoForno = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M3 8.5h18" />
    <path d="M6.5 5.8h.01M10 5.8h.01" />
    <circle cx="12" cy="14.8" r="3.4" />
  </svg>
);

export const IcoMicroondas = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <rect x="5" y="8" width="10" height="8" rx="1" />
    <path d="M18 9v.01M18 12v.01M18 15v.01" />
  </svg>
);

export const IcoTomada = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10.5" r="1" />
    <circle cx="15" cy="10.5" r="1" />
    <circle cx="12" cy="15" r="1" />
  </svg>
);

/* --- Circuitos essenciais, que permanecem ativos --- */

export const IcoLampada = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 2.5a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2v1h5v-1c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 2.5z" />
    <path d="M9.5 19h5M10.5 21.5h3" />
  </svg>
);

export const IcoGeladeira = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2.5" />
    <path d="M5 10h14" />
    <path d="M8.5 5.5v2.5M8.5 12.5V16" />
  </svg>
);

export const IcoWifi = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M2.5 8.6a15 15 0 0 1 19 0" />
    <path d="M5.6 12.3a10.5 10.5 0 0 1 12.8 0" />
    <path d="M8.7 16a6 6 0 0 1 6.6 0" />
    <path d="M12 19.5h.01" />
  </svg>
);

export const IcoCamera = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="6.5" width="12" height="7" rx="2" />
    <path d="M14.5 8.6 20.5 6v8.5l-6-2.6z" />
    <path d="M8.5 13.5V18M5.5 21h6" />
    <circle cx="6" cy="10" r="1.2" />
  </svg>
);

export const IcoTv = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="4.5" width="19" height="12.5" rx="2.5" />
    <path d="M12 17v3.5M8 20.5h8" />
  </svg>
);

export const IcoCooktop = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="2" />
    <circle cx="15.5" cy="8.5" r="2" />
    <circle cx="8.5" cy="15.5" r="2" />
    <circle cx="15.5" cy="15.5" r="2" />
  </svg>
);

/* --- Benefícios e badges --- */

export const IcoMoeda = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6v12" />
    <path d="M14.8 9a2.7 2.7 0 0 0-2.5-1.4h-.8a2.2 2.2 0 0 0 0 4.4h1a2.2 2.2 0 0 1 0 4.4h-.8A2.7 2.7 0 0 1 9.2 15" />
  </svg>
);

export const IcoRaio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
  </svg>
);

export const IcoCasaAuto = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M3.2 10.6 12 3.4l8.8 7.2" />
    <path d="M5.4 9.2V20a.8.8 0 0 0 .8.8h11.6a.8.8 0 0 0 .8-.8V9.2" />
    <path d="M12 11.6v3.1" />
    <path d="M9.9 12.8a3 3 0 1 0 4.2 0" />
  </svg>
);

/* --- Contato --- */

export const IcoZap = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    className={className}
    aria-hidden
    focusable="false"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.17c-.25.69-1.44 1.32-1.99 1.37-.53.05-1.02.24-3.45-.72-2.9-1.14-4.75-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.49.24.58.83 2 .9 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.29 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.09 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.69-.18 1.37z" />
  </svg>
);

export const IcoEmail = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.2 6.6 8.8 5.9 8.8-5.9" />
  </svg>
);

export const IcoGlobo = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18z" />
  </svg>
);

export const IcoPin = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 21.5s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </svg>
);

/* Seta que liga um passo ao seguinte (só aparece no desktop). */
export const IcoSeta = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
  </svg>
);
