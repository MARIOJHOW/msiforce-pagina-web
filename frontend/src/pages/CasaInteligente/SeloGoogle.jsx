import { GOOGLE } from './dados';
import { IcoEstrela } from './icones';

/**
 * Selo de reputação. Única prova social confirmada pelo cliente — não adicione
 * depoimento, nome ou foto aqui sem material real.
 * `url` nulo em dados.js faz o selo renderizar como texto, nunca como link morto.
 */
const SeloGoogle = ({ compacto = false }) => {
  const conteudo = (
    <>
      <span className="selo-estrelas" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => <IcoEstrela key={i} />)}
      </span>
      <span className="selo-texto">
        <strong>{GOOGLE.nota} no Google</strong>
        <span>{GOOGLE.avaliacoes} avaliações de clientes</span>
      </span>
    </>
  );

  const classe = `selo-google${compacto ? ' selo-google--compacto' : ''}`;
  const rotulo = `Nota ${GOOGLE.nota} de 5 no Google, ${GOOGLE.avaliacoes} avaliações`;

  if (GOOGLE.url) {
    return (
      <a className={classe} href={GOOGLE.url} target="_blank" rel="noopener noreferrer" aria-label={rotulo}>
        {conteudo}
      </a>
    );
  }
  return <div className={classe} role="group" aria-label={rotulo}>{conteudo}</div>;
};

export default SeloGoogle;
