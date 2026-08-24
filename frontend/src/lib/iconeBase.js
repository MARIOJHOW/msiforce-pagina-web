// Props comuns a todos os ícones SVG do site (Casa Inteligente e Home).
// Fica em módulo próprio (e não junto dos componentes) para não quebrar o fast
// refresh, que exige que um arquivo de componentes exporte só componentes.
// Herdam cor por currentColor e tamanho por font-size do pai (1em).
export const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};
