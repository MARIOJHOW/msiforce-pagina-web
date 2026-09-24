import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, login, logout, getToken } from '../../../lib/api';
import './CRM.css';

const ETAPAS = ['NOVO_LEAD', 'QUALIFICADO', 'AGENDADO', 'FINALIZADO', 'PERDIDO'];

const COLUNAS = [
  { id: 'NOVO_LEAD', title: 'Novo Lead', color: '#3b82f6' },
  { id: 'QUALIFICADO', title: 'Qualificado', color: '#f59e0b' },
  { id: 'AGENDADO', title: 'Visita Agendada', color: '#8b5cf6' },
  { id: 'FINALIZADO', title: 'Finalizado', color: '#10b981' },
  { id: 'PERDIDO', title: 'Perdido', color: '#ef4444' },
];

function LoginForm({ onEntrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await login(email, senha);
      onEntrar();
    } catch (e2) {
      setErro(e2.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="crm-login">
      <form className="crm-login-card" onSubmit={handleSubmit}>
        <h2>MSI<span>Force</span> — Painel</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <p className="crm-login-erro">{erro}</p>}
        <button type="submit" className="btn-primary" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

function ModalValorFechado({ lead, onConfirmar, onCancelar }) {
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState(null);

  function handleConfirmar() {
    const numero = Number(String(valor).replace(',', '.'));
    if (!Number.isFinite(numero) || numero < 0) {
      setErro('Informe um valor válido.');
      return;
    }
    onConfirmar(numero);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-valor">
        <h3>Finalizar lead — {lead.nome || lead.telefone}</h3>
        <p>Qual foi o valor fechado com o cliente?</p>
        <input
          type="text"
          inputMode="decimal"
          placeholder="Ex: 350"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          autoFocus
        />
        {erro && <p className="crm-login-erro">{erro}</p>}
        <div className="modal-valor-acoes">
          <button className="btn-secondary" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primary" onClick={handleConfirmar}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

function Resumo({ board }) {
  const todos = Object.values(board).flat();
  const doAds = todos.filter((l) => l.origem === 'ads');
  const finalizadosAds = doAds.filter((l) => l.status === 'FINALIZADO');
  const totalFechado = finalizadosAds.reduce((soma, l) => soma + (Number(l.valor_fechado) || 0), 0);
  const doPanfleto = todos.filter((l) => l.origem === 'panfleto');

  return (
    <div className="crm-resumo">
      <div><strong>{doAds.length}</strong> leads via Ads</div>
      <div><strong>{finalizadosAds.length}</strong> fechados via Ads</div>
      <div><strong>R$ {totalFechado.toFixed(2)}</strong> faturado via Ads</div>
      <div><strong>{doPanfleto.length}</strong> leads via panfleto</div>
    </div>
  );
}

export default function CRM() {
  const [autenticado, setAutenticado] = useState(Boolean(getToken()));
  const [board, setBoard] = useState(Object.fromEntries(ETAPAS.map((e) => [e, []])));
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalLead, setModalLead] = useState(null);

  // Busca pura: não toca em estado, só devolve o resultado. Assim o efeito abaixo
  // consegue aplicar o estado depois do await (a regra set-state-in-effect proíbe
  // fazer isso de forma síncrona dentro do efeito).
  const buscarBoard = useCallback(async () => {
    try {
      const resposta = await apiFetch('/api/leads/board');
      return { board: resposta.data, erro: null };
    } catch (e) {
      return { board: null, erro: e.message };
    }
  }, []);

  const aplicarBoard = useCallback(({ board: novo, erro: falha }) => {
    if (novo) setBoard(novo);
    setErro(falha);
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (!autenticado) return undefined;
    let cancelado = false;
    (async () => {
      const resultado = await buscarBoard();
      if (!cancelado) aplicarBoard(resultado);
    })();
    return () => { cancelado = true; };
  }, [autenticado, buscarBoard, aplicarBoard]);

  async function recarregarBoard() {
    setCarregando(true);
    aplicarBoard(await buscarBoard());
  }

  async function moverLead(lead, novaEtapa, valorFechado) {
    try {
      await apiFetch(`/api/leads/${lead.id}/stage`, {
        method: 'PATCH',
        body: JSON.stringify(
          valorFechado === undefined ? { etapa: novaEtapa } : { etapa: novaEtapa, valorFechado }
        ),
      });
      await recarregarBoard();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleMover(lead, novaEtapa) {
    if (novaEtapa === 'FINALIZADO') {
      setModalLead({ lead, novaEtapa });
      return;
    }
    moverLead(lead, novaEtapa);
  }

  if (!autenticado) {
    return <LoginForm onEntrar={() => setAutenticado(true)} />;
  }

  return (
    <div className="crm-dashboard">
      <aside className="crm-sidebar">
        <div className="crm-logo">
          <h2>MSI<span>Force</span></h2>
          <span className="badge">CRM App</span>
        </div>
        <div className="crm-bot-status">
          <div className="status-indicator online"></div>
          <div>
            <strong>Painel</strong>
            <span>Sessão ativa</span>
          </div>
        </div>
        <button
          className="btn-secondary"
          style={{ marginTop: '1rem' }}
          onClick={() => { logout(); setAutenticado(false); }}
        >
          Sair
        </button>
      </aside>

      <main className="crm-main">
        <header className="crm-header">
          <div>
            <h1>Funil de Vendas</h1>
            <p>Gerencie os leads gerados pelo Agente de IA do WhatsApp.</p>
          </div>
          <button className="btn-secondary" onClick={recarregarBoard}>↻ Atualizar</button>
        </header>

        <Resumo board={board} />

        {erro && <p className="crm-login-erro" style={{ padding: '0 2.5rem' }}>{erro}</p>}

        {carregando ? (
          <p style={{ padding: '2rem' }}>Carregando...</p>
        ) : (
          <div className="crm-board">
            {COLUNAS.map((col) => (
              <div key={col.id} className="crm-column">
                <div className="column-header">
                  <div className="column-title">
                    <span className="dot" style={{ backgroundColor: col.color }}></span>
                    <h3>{col.title}</h3>
                  </div>
                  <span className="lead-count">{(board[col.id] || []).length}</span>
                </div>

                <div className="column-cards">
                  {(board[col.id] || []).map((lead) => (
                    <motion.div
                      key={lead.id}
                      className="crm-card"
                      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="card-header">
                        <strong>{lead.nome || 'Sem nome'}</strong>
                        {lead.origem === 'ads' && <span className="badge-ads">Ads</span>}
                        {lead.origem === 'panfleto' && <span className="badge-panfleto">Panfleto</span>}
                      </div>
                      <div className="card-body">
                        <span className="card-service">{lead.servico}</span>
                        {lead.status === 'FINALIZADO' && lead.valor_fechado != null && (
                          <span className="card-valor">R$ {Number(lead.valor_fechado).toFixed(2)}</span>
                        )}
                      </div>
                      <div className="card-footer">
                        <span className="card-phone">{lead.telefone}</span>
                        <select
                          className="card-move-select"
                          value=""
                          onChange={(e) => { if (e.target.value) handleMover(lead, e.target.value); }}
                        >
                          <option value="">Mover para...</option>
                          {ETAPAS.filter((e) => e !== col.id).map((e) => (
                            <option key={e} value={e}>{e}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalLead && (
        <ModalValorFechado
          lead={modalLead.lead}
          onConfirmar={(valor) => {
            moverLead(modalLead.lead, modalLead.novaEtapa, valor);
            setModalLead(null);
          }}
          onCancelar={() => setModalLead(null)}
        />
      )}
    </div>
  );
}
