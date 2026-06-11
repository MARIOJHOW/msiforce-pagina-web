import re

def overhaul():
    filepath = 'index_v2.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Hero CSS to 1fr 1.05fr
    content = content.replace('grid-template-columns:1fr;', 'grid-template-columns:1fr 1.05fr;')
    
    # Step 2: Insert new hero-right into <section id="hero">
    new_hero_right = """
  <div class="hero-right" style="position:relative; display:flex; justify-content:center; align-items:center; perspective: 1000px;">
    <!-- Glassmorphism glowing blob behind mockup -->
    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:400px; height:400px; background:var(--orange); filter:blur(120px); opacity:0.3; z-index:1; border-radius:50%;"></div>
    
    <!-- CRM Mockup Image -->
    <div style="position:relative; z-index:2; transform: rotateY(-12deg) rotateX(4deg); animation: float 6s ease-in-out infinite;">
      <img src="crm_mockup.png" style="width:100%; max-width:560px; border-radius:16px; border:1px solid rgba(255,255,255,0.08); box-shadow: 0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(245,166,35,0.2);">
    </div>
    
    <style>
      @keyframes float {
        0% { transform: translateY(0px) rotateY(-12deg) rotateX(4deg); }
        50% { transform: translateY(-20px) rotateY(-8deg) rotateX(2deg); }
        100% { transform: translateY(0px) rotateY(-12deg) rotateX(4deg); }
      }
    </style>
  </div>
"""
    content = re.sub(r'(<div class="hero-btns">.*?</div>\s*</div>\s*)</section>', r'\1' + new_hero_right + '\n</section>', content, flags=re.DOTALL)


    # Step 3: Marquee
    marquee_features = [
        "Qualificação por IA", "CRM Automático", "Orçamentos em PDF", 
        "Gestão de Leads", "Funil de Vendas", "Integração WhatsApp", "Atendimento 24/7"
    ]
    m_items = ""
    for f in marquee_features * 3:
        m_items += f'    <div class="m-item"><span class="dot"></span>{f}</div>\n'
    content = re.sub(r'(<div class="marquee-track" id="mq">).*?(</div>\s*</div>)', r'\1\n' + m_items + r'\2', content, flags=re.DOTALL)


    # Step 4: Rewrite #sobre (Diferenciais)
    content = content.replace('<div class="s-eye">Por que a MSIFORCE</div>', '<div class="s-eye">Por que nossa Plataforma</div>')
    content = content.replace('<h2 class="s-title">Qualidade<br>&amp; <em>Responsabilidade</em><br>em cada projeto.</h2>', 
                              '<h2 class="s-title">Vendas em Escala<br>&amp; <em>Automação</em><br>sem perder a essência.</h2>')
    content = content.replace('Somos mais do que um serviço — somos um parceiro técnico. Com formação sólida e experiência de campo, entregamos cada projeto com rigor, transparência e garantia.', 
                              'Sua empresa não pode perder tempo. Nossa Inteligência Artificial qualifica o lead, quebra objeções e já entrega a proposta no WhatsApp. O CRM organiza tudo.')
    
    feat_old = r'<div class="feat-grid">.*?</div>\s*</div>\s*<div class="reveal"'
    feat_new = """<div class="feat-grid">
        <div class="feat-item"><div class="feat-icon">🤖</div><div><div class="feat-name">IA Generativa</div><div class="feat-desc">Conversas naturais e humanas</div></div></div>
        <div class="feat-item"><div class="feat-icon">📊</div><div><div class="feat-name">CRM Visual</div><div class="feat-desc">Acompanhe pelo Kanban</div></div></div>
        <div class="feat-item"><div class="feat-icon">📝</div><div><div class="feat-name">Orçamentos PDF</div><div class="feat-desc">Gerados em segundos</div></div></div>
        <div class="feat-item"><div class="feat-icon">⚡</div><div><div class="feat-name">Atendimento 24h</div><div class="feat-desc">Resposta instantânea ao cliente</div></div></div>
        <div class="feat-item"><div class="feat-icon">✅</div><div><div class="feat-name">Agendamento</div><div class="feat-desc">Sincroniza com Google Calendar</div></div></div>
        <div class="feat-item"><div class="feat-icon">🔍</div><div><div class="feat-name">Métricas</div><div class="feat-desc">Saiba de onde vêm os clientes</div></div></div>
      </div>
    </div>
    <div class="reveal\""""
    content = re.sub(feat_old, feat_new, content, flags=re.DOTALL)

    content = content.replace('"Do fio ao projeto — <span style="color:var(--orange)">entregamos</span> com excelência."', 
                              '"Mais do que um chatbot — <span style="color:var(--orange)">seu comercial</span> que nunca dorme."')
    
    list_old = r'<ul style="list-style:none;display:flex;flex-direction:column;gap:14px">.*?</ul>'
    list_new = """<ul style="list-style:none;display:flex;flex-direction:column;gap:14px">
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:.92rem;color:var(--gray);line-height:1.5"><span style="color:var(--orange);font-weight:700;flex-shrink:0;margin-top:2px">→</span>Atenda clientes fora do horário comercial</li>
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:.92rem;color:var(--gray);line-height:1.5"><span style="color:var(--orange);font-weight:700;flex-shrink:0;margin-top:2px">→</span>Nunca perca uma venda por demora na resposta</li>
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:.92rem;color:var(--gray);line-height:1.5"><span style="color:var(--orange);font-weight:700;flex-shrink:0;margin-top:2px">→</span>Funil visual (Kanban) simples pelo celular</li>
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:.92rem;color:var(--gray);line-height:1.5"><span style="color:var(--orange);font-weight:700;flex-shrink:0;margin-top:2px">→</span>Personalize o robô com as regras do seu negócio</li>
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:.92rem;color:var(--gray);line-height:1.5"><span style="color:var(--orange);font-weight:700;flex-shrink:0;margin-top:2px">→</span>Gere relatórios de leads e feche mais negócios</li>
        </ul>"""
    content = re.sub(list_old, list_new, content, flags=re.DOTALL)


    # Step 5: Rewrite #servicos (Funcionalidades)
    # Remove the img_block from servicos we added in previous task (if it still exists in the string)
    content = re.sub(r'\s*<div class="svc-img-block".*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # We replace from <div class="svc-header reveal"> to </section>
    servicos_new = """<div class="svc-header reveal">
    <div>
      <div class="s-eye">O que fazemos</div>
      <h2 class="s-title">Nossas<br><em>Funcionalidades.</em></h2>
    </div>
    <p style="color:var(--gray);font-size:.9rem;line-height:1.75;max-width:340px;text-align:right;padding-bottom:8px">
      Uma suíte completa de ferramentas projetada para revolucionar o atendimento e as vendas de pequenas empresas e prestadores de serviço.
    </p>
  </div>

  <div class="svc-grid reveal" style="transition-delay:.1s">
    <div class="svc-card hot">
      <div class="svc-num">01</div>
      <div class="svc-icon">🧠</div>
      <div class="svc-name">Atendente IA Humanizado</div>
      <div class="svc-scope">Vendas · Suporte</div>
      <p class="svc-desc">Um assistente virtual que entende o contexto, quebra objeções e qualifica o cliente 24 horas por dia.</p>
      <ul class="svc-list">
        <li>Treinado com os seus dados</li>
        <li>Respostas naturais e ágeis</li>
        <li>Agendamento automatizado</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">02</div>
      <div class="svc-icon">📄</div>
      <div class="svc-name">Orçamentos em PDF</div>
      <div class="svc-scope">Propostas · Automação</div>
      <p class="svc-desc">Após qualificar o lead, a IA gera e envia uma proposta visual e profissional diretamente no WhatsApp.</p>
      <ul class="svc-list">
        <li>Layouts profissionais</li>
        <li>Cálculo automático de custos</li>
        <li>Envio instantâneo</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">03</div>
      <div class="svc-icon">📊</div>
      <div class="svc-name">Funil de Vendas (Kanban)</div>
      <div class="svc-scope">CRM · Gestão</div>
      <p class="svc-desc">Saiba exatamente em qual etapa de negociação cada lead está. Simples, visual e direto no seu celular.</p>
      <ul class="svc-list">
        <li>Arrastar e soltar (Drag & Drop)</li>
        <li>Histórico de conversas salvo</li>
        <li>Lembretes de follow-up</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">04</div>
      <div class="svc-icon">🚀</div>
      <div class="svc-name">Métricas & Relatórios</div>
      <div class="svc-scope">Dados · Inteligência</div>
      <p class="svc-desc">Tome decisões baseadas em dados reais. Acompanhe taxas de conversão e desempenho de vendas.</p>
      <ul class="svc-list">
        <li>Gráficos em tempo real</li>
        <li>Origem dos leads (Instagram, Ads)</li>
        <li>Exportação em Excel</li>
      </ul>
    </div>
  </div>
</section>"""
    
    content = re.sub(r'<div class="svc-header reveal">.*?</section>', servicos_new, content, flags=re.DOTALL)

    # Step 6: Add Glassmorphism to norms
    # Find .norm-badge
    content = content.replace('.norm-badge{', '.norm-badge{\n  background: rgba(255,255,255,0.05); backdrop-filter: blur(10px);')

    # Step 7: Update Contact CTA
    content = content.replace('Solicite seu<br>orçamento<br><em>gratuito.</em>', 'Transforme seu<br>WhatsApp em<br><em>vendas.</em>')
    content = content.replace('⚡ Chamar no WhatsApp', '🚀 Conhecer a Plataforma')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Overhaul complete!")

overhaul()
