import { useState } from 'react';
import { motion } from 'framer-motion';
import './CRM.css';

const MOCK_LEADS = [
  { id: 1, name: 'João Silva', phone: '+55 11 99999-1111', service: 'Energia Solar', status: 'lead', date: 'Há 10 min' },
  { id: 2, name: 'Maria Oliveira', phone: '+55 11 99999-2222', service: 'Casa Inteligente', status: 'lead', date: 'Há 1 hora' },
  { id: 3, name: 'Carlos Santos', phone: '+55 11 99999-3333', service: 'CFTV', status: 'qualificado', date: 'Hoje, 09:30' },
  { id: 4, name: 'Ana Costa', phone: '+55 11 99999-4444', service: 'Energia Solar', status: 'agendado', date: 'Amanhã, 14:00' },
  { id: 5, name: 'Salu Barbato', phone: '+55 11 99999-5555', service: 'Airbnb', status: 'finalizado', date: 'Ontem' },
];

const COLUMNS = [
  { id: 'lead', title: 'Entrou em Contato', color: '#3b82f6' }, // blue
  { id: 'qualificado', title: 'Qualificado', color: '#f59e0b' }, // orange
  { id: 'agendado', title: 'Visita Agendada', color: '#8b5cf6' }, // purple
  { id: 'finalizado', title: 'Finalizado', color: '#10b981' }, // green
];

export default function CRM() {
  const [leads] = useState(MOCK_LEADS);

  // Filter leads by status
  const getLeadsByStatus = (status) => leads.filter(lead => lead.status === status);

  return (
    <div className="crm-dashboard">
      {/* Sidebar */}
      <aside className="crm-sidebar">
        <div className="crm-logo">
          <h2>MSI<span>Force</span></h2>
          <span className="badge">CRM App</span>
        </div>
        <nav className="crm-nav">
          <a href="#" className="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            Kanban de Vendas
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Leads Ativos
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Agenda (IA)
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Configurações
          </a>
        </nav>
        <div className="crm-bot-status">
          <div className="status-indicator online"></div>
          <div>
            <strong>Agente de IA</strong>
            <span>Online e Respondendo</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="crm-main">
        <header className="crm-header">
          <div>
            <h1>Funil de Vendas</h1>
            <p>Gerencie os leads gerados pelo Agente de IA do WhatsApp.</p>
          </div>
          <div className="crm-header-actions">
            <button className="btn-secondary">Pausar Bot</button>
            <button className="btn-primary">+ Novo Lead</button>
          </div>
        </header>

        {/* Kanban Board */}
        <div className="crm-board">
          {COLUMNS.map(col => (
            <div key={col.id} className="crm-column">
              <div className="column-header">
                <div className="column-title">
                  <span className="dot" style={{ backgroundColor: col.color }}></span>
                  <h3>{col.title}</h3>
                </div>
                <span className="lead-count">{getLeadsByStatus(col.id).length}</span>
              </div>
              
              <div className="column-cards">
                {getLeadsByStatus(col.id).map(lead => (
                  <motion.div 
                    key={lead.id} 
                    className="crm-card"
                    whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="card-header">
                      <strong>{lead.name}</strong>
                      <span className="card-date">{lead.date}</span>
                    </div>
                    <div className="card-body">
                      <span className="card-service">{lead.service}</span>
                    </div>
                    <div className="card-footer">
                      <span className="card-phone">{lead.phone}</span>
                      <button className="btn-icon" title="Ver conversa">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
