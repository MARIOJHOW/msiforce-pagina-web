import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Blog.css';

const articles = {
  "ghosting-whatsapp-cliente-some-orcamento": {
    title: "Ghosting no WhatsApp: O que fazer quando o cliente some após o orçamento?",
    category: "Vendas e Conversão",
    image: "/thumb_ghosting.png",
    content: (
      <>
        <p>Você envia o preço, ele visualiza e não responde. O "Ghosting" é um dos maiores problemas para prestadores de serviço hoje. Entenda a técnica de follow-up que recupera mais de 60% dos orçamentos enviados e ignorados.</p>
        <h2>O Erro de Enviar Apenas o Preço</h2>
        <p>Muitos profissionais mandam apenas o valor solto no WhatsApp: "Fica R$ 800". Sem uma proposta de valor clara, o cliente apenas compara o seu número com o número de outro prestador. O segredo é gerar um Orçamento em PDF profissional, detalhando o escopo do trabalho.</p>
        <h2>Follow-up Automático</h2>
        <p>A regra de ouro é: nunca deixe o cliente sem uma resposta por mais de 48 horas. Se ele não respondeu após você enviar o PDF, mande uma mensagem educada perguntando se ele teve tempo de analisar a proposta. Em 60% dos casos, ele apenas esqueceu na correria do dia a dia.</p>
      </>
    )
  },
  "automatizar-atendimento-orcamento-whatsapp-eletricista": {
    title: "O fim do orçamento 'no boca a boca': Como automatizar seu atendimento",
    category: "Automação",
    image: "/thumb_eletricista.png",
    content: (
      <>
        <p>Descubra como pequenos prestadores estão gerando orçamentos em PDF diretamente pelo WhatsApp em menos de 30 segundos usando IA.</p>
        <h2>Tempo é Dinheiro</h2>
        <p>Chegar exausto de uma obra e ter que abrir o computador para montar um orçamento no Word ou no Excel é coisa do passado. Hoje, sistemas de CRM com Inteligência Artificial integrados ao WhatsApp permitem que você digite os valores no celular e um PDF profissional seja enviado ao cliente em segundos.</p>
      </>
    )
  },
  "qualificacao-bant-eletricista-fechar-contratos": {
    title: "Qualificação BANT: A técnica para parar de perder tempo com leads frios",
    category: "Estratégia",
    image: "/thumb_bant.png",
    content: (
      <>
        <p>Aprenda o framework das grandes empresas de tecnologia adaptado para o prestador de serviços. BANT significa Budget, Authority, Need, e Time (Orçamento, Autoridade, Necessidade e Tempo).</p>
        <h2>Como Aplicar o BANT no WhatsApp</h2>
        <ul>
          <li><strong>Budget:</strong> O cliente tem orçamento para o serviço?</li>
          <li><strong>Authority:</strong> É ele quem decide a compra ou precisa falar com a esposa/sócio?</li>
          <li><strong>Need:</strong> Ele realmente precisa daquela solução de luxo ou algo mais simples resolve?</li>
          <li><strong>Timeline:</strong> Ele precisa disso para ontem ou é um projeto para o ano que vem?</li>
        </ul>
        <p>Qualificando esses 4 pontos nos primeiros 5 minutos de conversa, você não perde horas montando propostas para curiosos.</p>
      </>
    )
  },
  "crm-para-eletricistas": {
    title: "CRM para Prestadores de Serviço: O que é e por que você precisa de um",
    category: "Gestão",
    image: "/thumb_crm.png",
    content: (
      <>
        <p>Se você ainda anota contatos de clientes na agenda de papel ou confia apenas na memória, você está perdendo dinheiro todos os meses.</p>
        <h2>O que é um CRM?</h2>
        <p>CRM (Customer Relationship Management) é um sistema para gerenciar o relacionamento com o cliente. Para prestadores de serviço, a visão Kanban (colunas arrastáveis) é a ideal: Novos Leads, Orçamentos Enviados, Em Negociação e Fechados. Assim você visualiza o fluxo de dinheiro da sua empresa com facilidade.</p>
      </>
    )
  },
  "modelo-orcamento-eletricista-pdf": {
    title: "Como criar um modelo de Orçamento em PDF que gera Autoridade",
    category: "Branding",
    image: "/thumb_orcamento.webp",
    content: (
      <>
        <p>O visual do seu orçamento dita o preço que você pode cobrar. Veja como a estética profissional afeta a percepção de valor do seu cliente.</p>
        <h2>Autoridade Instantânea</h2>
        <p>Quando o seu concorrente envia o preço em um áudio no WhatsApp, e você envia um PDF desenhado com sua logo, cores da empresa, descrição detalhada do escopo e validade, o cliente imediatamente percebe que sua empresa é séria. A autoridade percebida permite cobrar até 30% a mais pelo mesmo serviço sem enfrentar objeções de preço.</p>
      </>
    )
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const article = articles[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="page-post" style={{ paddingTop: '200px', textAlign: 'center' }}>
        <h2>Artigo não encontrado.</h2>
        <Link to="/blog" className="post-back">← Voltar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-post">
      <div 
        className="post-bg" 
        style={{ backgroundImage: `url(${article.image})` }}
      ></div>
      
      <section className="post-hero">
        <motion.div 
          className="post-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="post-cat">{article.category}</span>
          <h1 className="post-h1">{article.title}</h1>
        </motion.div>
      </section>

      <motion.section 
        className="post-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {article.content}
        
        <Link to="/blog" className="post-back">← Voltar para o Editorial</Link>
      </motion.section>
    </div>
  );
}
