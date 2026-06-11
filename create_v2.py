import re
import os

def process_file(input_path, output_path):
    if not os.path.exists(input_path):
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Colors
    content = content.replace('--black: #060606;', '--black: #020617;')
    content = content.replace('--dark: #0D0D0D;', '--dark: #0F172A;')
    content = content.replace('--dark2: #131313;', '--dark2: #1E293B;')
    content = content.replace('--dark3: #1A1A1A;', '--dark3: #334155;')

    # 2. Update Fonts URL
    old_fonts = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap'
    new_fonts = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;700;800;900&display=swap'
    content = content.replace(old_fonts, new_fonts)

    # 3. Update Font Families in CSS
    content = content.replace("'Barlow',sans-serif", "'Inter',sans-serif")
    content = content.replace("'Bebas Neue',sans-serif", "'Outfit',sans-serif")
    content = content.replace("'Barlow Condensed',sans-serif", "'Outfit',sans-serif")

    # 4. Remove custom cursor CSS and HTML
    content = content.replace(';cursor:none', '')
    content = re.sub(r'/\* CURSOR \*/.*?transition:all \.18s ease}', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="cur"[^>]*></div>', '', content)
    content = re.sub(r'<div class="cur-r"[^>]*></div>', '', content)

    # 5. Fix Buttons (remove clip-path, add border-radius)
    content = content.replace('clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);', 'border-radius:6px;')
    content = content.replace('clip-path:polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);', 'border-radius:8px;')
    
    # Also update btn-hero css
    btn_hero_old = """.btn-hero{
  background:var(--orange);color:var(--black)!important;
  padding:20px 48px;font-family:'Bebas Neue',sans-serif;
  font-size:1.6rem;letter-spacing:.05em;text-decoration:none;
  display:inline-flex;align-items:center;gap:12px;
  clip-path:polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  transition:all .25s ease;
}"""
    btn_hero_new = """.btn-hero{
  background:var(--orange);color:var(--white)!important;
  padding:16px 40px;font-family:'Inter',sans-serif;font-weight:600;
  font-size:1.1rem;letter-spacing:0;text-decoration:none;
  display:inline-flex;align-items:center;gap:12px;
  border-radius:8px;box-shadow:0 10px 20px var(--orange-glow);
  transition:all .25s ease;
}"""
    content = content.replace(btn_hero_old, btn_hero_new)

    # Update Hero Copy
    hero_old = """<div class="hero-eyebrow">
        <span class="blink"></span>
        Elétrica &amp; Segurança Eletrônica
      </div>
      <h1 class="hero-h1">
        <span class="line-stroke">ELÉTRICA</span>
        <span class="line-orange">&amp; SEGURANÇA</span>
        <span class="line-white">ELETRÔNICA</span>
      </h1>
      <p class="hero-tagline">
        <strong>Soluções inteligentes para sua casa ou empresa.</strong><br>
        Técnico formado, experiente e com registro — garantindo <strong>qualidade, segurança e conformidade</strong> em cada projeto.
      </p>
      <div class="hero-btns">
        <a href="https://wa.me/5511910773865" class="btn-hero">⚡ Solicitar Orçamento</a>
        <a href="#servicos" class="btn-ghost2">↓ Ver serviços</a>
      </div>
      <div class="hero-norms">
        <div class="norm-badge">NR-10</div>
        <div class="norm-badge">ABNT NBR 5410</div>
        <div class="norm-badge">NR-35</div>
        <div class="norm-badge">Técnico Registrado</div>
      </div>"""

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
      </div>"""
    
    content = content.replace(hero_old, hero_new)

    # 6. GA4 Snippet
    ga4_snippet = """
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SEU_ID_AQUI');
</script>
</head>"""
    if "gtag.js" not in content:
        content = content.replace('</head>', ga4_snippet)

    # 7. JSON-LD Snippet
    json_ld = """<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MSIFORCE",
  "url": "https://msiforce.com.br",
  "logo": "https://msiforce.com.br/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-91077-3865",
    "contactType": "customer service",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Plataforma MSIFORCE CRM",
  "operatingSystem": "Web, WhatsApp",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "97.00",
    "priceCurrency": "BRL"
  },
  "description": "CRM com Inteligência Artificial integrado ao WhatsApp para atendimento automático, qualificação de leads e emissão de orçamentos em PDF."
}
</script>
</body>"""
    if "SoftwareApplication" not in content:
        content = content.replace('</body>', json_ld)

    # Make sure links inside nav point to atendente_v2
    content = content.replace('href="atendente/index.html"', 'href="atendente/index_v2.html"')

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r'd:\\Users\\jhowu\\bot-whatsapp\\site-msiforce'
process_file(os.path.join(base_dir, 'index.html'), os.path.join(base_dir, 'index_v2.html'))
process_file(os.path.join(base_dir, 'atendente', 'index.html'), os.path.join(base_dir, 'atendente', 'index_v2.html'))

print("v2 files created successfully!")
