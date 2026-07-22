import { useParams, Navigate } from 'react-router-dom';
import { SERVICOS_DATA } from '../data/servicos';
import Servico from './Servico';

export default function ServicoPage() {
  const { slug } = useParams();
  const servico = SERVICOS_DATA[slug];

  if (!servico) return <Navigate to="/" replace />;

  return <Servico servico={servico} />;
}
