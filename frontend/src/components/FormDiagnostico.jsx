import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackFormSubmit } from '../hooks/useAnalytics';
import './FormDiagnostico.css';

const SETORES = [
  'Empresa / Escritório', 'Condomínio', 'Indústria / Galpão',
  'Clínica / Consultório', 'Comércio / Loja', 'Rede de Franquias', 'Outro',
];

const SERVICOS = [
  'Instalação Elétrica', 'Automação', 'CFTV / Câmeras',
  'Controle de Acesso', 'Redes Estruturadas', 'Infraestrutura de TI',
  'Manutenção Preventiva & Corretiva'
];

const WA_BASE = 'https://wa.me/5511910773865?text=';

function buildWaMessage(data) {
  return encodeURIComponent(
    `Olá! Vim pelo formulário do site da MSIFORCE e gostaria de solicitar uma consultoria.\n\n` +
    `*Nome:* ${data.nome}\n` +
    `*Empresa:* ${data.empresa}\n` +
    `*Setor:* ${data.setor}\n` +
    `*Serviços de interesse:* ${data.servicos.join(', ')}\n` +
    `*Descrição:* ${data.descricao || 'Não informado'}\n` +
    `*Telefone:* ${data.telefone}`
  );
}

export default function FormDiagnostico() {
  const [form, setForm] = useState({
    nome: '', empresa: '', telefone: '', setor: '', servicos: [], descricao: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const toggleServico = (s) => {
    setForm((f) => ({
      ...f,
      servicos: f.servicos.includes(s)
        ? f.servicos.filter((x) => x !== s)
        : [...f.servicos, s],
    }));
    setErrors((e) => ({ ...e, servicos: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Informe seu nome';
    if (!form.empresa.trim()) e.empresa = 'Informe o nome da empresa';
    if (!form.telefone.trim()) e.telefone = 'Informe um telefone para contato';
    if (!form.setor) e.setor = 'Selecione o setor';
    if (form.servicos.length === 0) e.servicos = 'Selecione ao menos um serviço';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    trackFormSubmit('diagnostico');
    setSubmitted(true);
    const waUrl = WA_BASE + buildWaMessage(form);
    setTimeout(() => window.open(waUrl, '_blank'), 800);
  };

  return (
    <section className="form-section" id="form-diagnostico">
      <div className="form-inner">
        <div className="form-left">
          <div className="form-eyebrow">Diagnóstico gratuito</div>
          <h2 className="form-title">
            Solicite uma consultoria<br />
            <span className="form-title-gold">sem compromisso.</span>
          </h2>
          <p className="form-desc">
            Preencha o formulário e entraremos em contato em até 1 hora nos dias úteis.
            O diagnóstico é gratuito e sem obrigação de contratação.
          </p>
          <ul className="form-promises">
            <li><span className="form-check">✓</span> Resposta em até 1 hora nos dias úteis</li>
            <li><span className="form-check">✓</span> Visita técnica sem custo</li>
            <li><span className="form-check">✓</span> Orçamento em até 3 dias úteis</li>
            <li><span className="form-check">✓</span> Sem pressão de vendas</li>
          </ul>
        </div>

        <div className="form-right">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form-success"
              >
                <div className="form-success-icon">✓</div>
                <h3>Solicitação enviada!</h3>
                <p>Você será redirecionado para o WhatsApp para finalizar o contato. Aguarde...</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="form-card"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="form-row">
                  <div className={`form-group${errors.nome ? ' form-group--error' : ''}`}>
                    <label>Nome *</label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      value={form.nome}
                      onChange={(e) => set('nome', e.target.value)}
                    />
                    {errors.nome && <span className="form-error">{errors.nome}</span>}
                  </div>
                  <div className={`form-group${errors.empresa ? ' form-group--error' : ''}`}>
                    <label>Empresa *</label>
                    <input
                      type="text"
                      placeholder="Nome da empresa"
                      value={form.empresa}
                      onChange={(e) => set('empresa', e.target.value)}
                    />
                    {errors.empresa && <span className="form-error">{errors.empresa}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group${errors.telefone ? ' form-group--error' : ''}`}>
                    <label>WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      placeholder="(11) 9 0000-0000"
                      value={form.telefone}
                      onChange={(e) => set('telefone', e.target.value)}
                    />
                    {errors.telefone && <span className="form-error">{errors.telefone}</span>}
                  </div>
                  <div className={`form-group${errors.setor ? ' form-group--error' : ''}`}>
                    <label>Setor *</label>
                    <select value={form.setor} onChange={(e) => set('setor', e.target.value)}>
                      <option value="">Selecione...</option>
                      {SETORES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.setor && <span className="form-error">{errors.setor}</span>}
                  </div>
                </div>

                <div className={`form-group${errors.servicos ? ' form-group--error' : ''}`}>
                  <label>Serviços de interesse * <span className="form-label-hint">(selecione um ou mais)</span></label>
                  <div className="form-chips">
                    {SERVICOS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`form-chip${form.servicos.includes(s) ? ' form-chip--active' : ''}`}
                        onClick={() => toggleServico(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.servicos && <span className="form-error">{errors.servicos}</span>}
                </div>

                <div className="form-group">
                  <label>Descreva brevemente sua necessidade <span className="form-label-hint">(opcional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Ex: precisamos instalar câmeras em 3 filiais e estruturar a rede..."
                    value={form.descricao}
                    onChange={(e) => set('descricao', e.target.value)}
                  />
                </div>

                <button type="submit" className="form-submit">
                  Solicitar Consultoria Gratuita →
                </button>
                <p className="form-privacy">
                  Seus dados são usados somente para contato e não são compartilhados com terceiros.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
