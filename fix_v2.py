import re

def fix_v2_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the cursor Javascript that is crashing the page
    # It starts at `// Cursor` and ends with `});`
    cursor_js_pattern = r'// Cursor\s*const cur=document\.getElementById.*?\}\);\n'
    content = re.sub(cursor_js_pattern, '', content, flags=re.DOTALL)

    # 2. Replace the Hero left section (ignoring exact text differences)
    hero_new = """<div class="hero-eyebrow">
        <span class="blink"></span>
        Para Pequenas Empresas &amp; Prestadores de Serviço
      </div>
      <h1 class="hero-h1">
        <span class="line-stroke">ATENDIMENTO</span>
        <span class="line-orange">CRM &amp; IA</span>
        <span class="line-white">NO WHATSAPP</span>
      </h1>
      <p class="hero-tagline">
        <strong>Escale as vendas da sua empresa.</strong><br>
        Qualificação de leads via Inteligência Artificial, geração de <strong>orçamentos em PDF</strong> em segundos e CRM visual no seu WhatsApp.
      </p>
      <div class="hero-btns">
        <a href="atendente/index_v2.html" class="btn-hero">🚀 Conhecer a Plataforma</a>
        <a href="#servicos" class="btn-ghost2">↓ Ver serviços técnicos</a>
      </div>
      <div class="hero-norms">
        <div class="norm-badge">CRM Inteligente</div>
        <div class="norm-badge">Atendimento 24h</div>
        <div class="norm-badge">Gestão Kanban</div>
        <div class="norm-badge">Orçamentos PDF</div>
      </div>
    </div>
    
    <div class="hero-right">"""
    
    content = re.sub(r'<div class="hero-eyebrow">.*?<div class="hero-right">', hero_new, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_v2_file('index_v2.html')
try:
    fix_v2_file('atendente/index_v2.html')
except:
    pass
print("v2 Javascript and Hero copy fixed!")
