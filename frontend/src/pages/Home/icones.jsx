// Ícones da Home. Substituem os emojis, que renderizavam em outra família a
// cada sistema (peso e alinhamento próprios) e traziam cor fixa, brigando com
// a paleta. Herdam cor por currentColor e tamanho por font-size do pai (1em).
import { base } from '../../lib/iconeBase';

/* ── Cards de case ─────────────────────────────────────────── */

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

/* ── Setores atendidos ─────────────────────────────────────── */

/** Empresas e escritórios. */
export const IcoEscritorio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M3 21V4.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1V21" />
    <path d="M14 10h6a1 1 0 0 1 1 1v10" />
    <path d="M2 21h20" />
    <path d="M6.5 7.5h1M10 7.5h1M6.5 11.5h1M10 11.5h1M6.5 15.5h1M10 15.5h1M17 14h1M17 17.5h1" />
  </svg>
);

/** Condomínios. */
export const IcoCondominio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M2.5 21V9.5L9 5.5 15.5 9.5V21" />
    <path d="M15.5 12.5 21.5 9v12" />
    <path d="M1.5 21h21" />
    <path d="M6 12h1.5M10.5 12H12M6 16h1.5M10.5 16H12" />
  </svg>
);

/** Indústrias. */
export const IcoIndustria = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M2.5 21V11l6 3.5V11l6 3.5V7.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V21" />
    <path d="M1.5 21h21" />
    <path d="M6 17.5h1.5M11.5 17.5H13" />
  </svg>
);

/** Clínicas e consultórios. */
export const IcoClinica = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M8 5V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V5" />
    <path d="M12 10v6M9 13h6" />
  </svg>
);

/** Comércios. */
export const IcoComercio = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M3.5 9.5V20a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V9.5" />
    <path d="M2.5 9.5 4.2 4.2a1 1 0 0 1 1-.7h13.6a1 1 0 0 1 1 .7l1.7 5.3a3 3 0 0 1-5.7 0 3 3 0 0 1-5.6 0 3 3 0 0 1-5.7 0z" />
    <path d="M9 21v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V21" />
  </svg>
);

/** Redes de franquias: a mesma loja, replicada. */
export const IcoFranquia = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="12" width="8" height="9" rx="1" />
    <rect x="13.5" y="12" width="8" height="9" rx="1" />
    <path d="M5.5 21v-4h2v4M16.5 21v-4h2v4" />
    <path d="M7 8.5V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4" />
    <path d="M12 8.5v3" />
  </svg>
);

/** Gestores de infraestrutura. */
export const IcoChaveInglesa = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M15.6 3.4a5.5 5.5 0 0 0-5.3 8.9L3.6 19a2 2 0 0 0 2.8 2.8l6.7-6.7a5.5 5.5 0 0 0 6.6-8.4l-3 3-2.9-.7-.7-2.9z" />
  </svg>
);

/* ── Pilares (por que a MSIFORCE) ──────────────────────────── */

/** Parceiro completo: um centro, várias frentes. */
export const IcoHub = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="3.2" r="1.7" />
    <circle cx="12" cy="20.8" r="1.7" />
    <circle cx="3.2" cy="12" r="1.7" />
    <circle cx="20.8" cy="12" r="1.7" />
    <path d="M12 4.9v4.1M12 15v4.1M4.9 12H9M15 12h4.1" />
  </svg>
);

/** Normas técnicas: documento com selo. */
export const IcoNorma = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M19.5 10.5V4.5a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h6" />
    <path d="M8 7.5h8M8 11.5h5M8 15.5h3" />
    <circle cx="17" cy="16" r="3" />
    <path d="m14.8 18.4-.8 3.1 3-1.3 3 1.3-.8-3.1" />
  </svg>
);

/** Suporte contínuo. */
export const IcoSuporte = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    <path d="M20 16.5a2.5 2.5 0 0 1-2.5 2.5H17a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h.5A2.5 2.5 0 0 1 20 16.5z" />
    <path d="M4 16.5A2.5 2.5 0 0 0 6.5 19H7a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.5A2.5 2.5 0 0 0 4 16.5z" />
    <path d="M18 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
  </svg>
);

/** Projetos sob medida: régua e esquadro. */
export const IcoRegua = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M14.7 2.6 21.4 9.3a1 1 0 0 1 0 1.4L10.7 21.4a1 1 0 0 1-1.4 0L2.6 14.7a1 1 0 0 1 0-1.4L13.3 2.6a1 1 0 0 1 1.4 0z" />
    <path d="m7.5 10.5 1.6 1.6M10.5 7.5l1.6 1.6M13.5 4.5l1.6 1.6M4.5 13.5l1.6 1.6" />
  </svg>
);
