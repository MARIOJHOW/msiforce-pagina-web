import io
import re

filepath = r"d:\Users\jhowu\bot-whatsapp\site-msiforce\automacao.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Stats Bar
html = html.replace('data-count="500"', 'data-count="120"')
html = html.replace('Projetos<br>Concluídos', 'Projetos<br>Entregues')
html = html.replace('Conformidade<br>NR-10', 'Integração<br>Alexa/Apple')
html = html.replace('<div class="stat-n">24h</div>', '<div class="stat-n">3 Anos</div>')
html = html.replace('Atendimento<br>Urgência', 'Garantia<br>Premium')
html = html.replace('Projetos<br>Concludos', 'Projetos<br>Entregues')
html = html.replace('Atendimento<br>Urgncia', 'Garantia<br>Premium')

# 2. Update Diferenciais
old_dif = '''<div class="s-eye">Por que a MSIFORCE</div>
      <h2 class="s-title">Qualidade<br>&amp; <em>Responsabilidade</em><br>em cada projeto.</h2>
      <p style="font-size:.95rem;color:var(--gray);line-height:1.75;max-width:460px;margin-top:20px;margin-bottom:36px">
        Somos mais do que um serviço — somos um parceiro técnico. Com formação sólida e experiência de campo, entregamos cada projeto com rigor, transparência e garantia.
      </p>'''

new_dif = '''<div class="s-eye">Padrão de Qualidade</div>
      <h2 class="s-title">Conforto<br>&amp; <em>Exclusividade</em><br>em cada projeto.</h2>
      <p style="font-size:.95rem;color:var(--gray);line-height:1.75;max-width:460px;margin-top:20px;margin-bottom:36px">
        Transformamos lares de alto padrão em ecossistemas responsivos. Cada ambiente é integrado com perfeição para entregar luxo, conveniência e controle absoluto na palma da sua mão ou por voz.
      </p>'''
html = html.replace(old_dif, new_dif)

# Se houver problema de encoding UTF-8 com os acentos:
old_dif_enc = '''<div class="s-eye">Por que a MSIFORCE</div>
      <h2 class="s-title">Qualidade<br>&amp; <em>Responsabilidade</em><br>em cada projeto.</h2>
      <p style="font-size:.95rem;color:var(--gray);line-height:1.75;max-width:460px;margin-top:20px;margin-bottom:36px">
        Somos mais do que um servio ?" somos um parceiro tcnico. Com formao slida e experincia de campo, entregamos cada projeto com rigor, transparncia e garantia.
      </p>'''
# Try regex replacement to avoid weird char issues
html = re.sub(r'<div class="s-eye">Por que a MSIFORCE</div>[\s\S]*?</p>', new_dif, html)

# 3. Update Services
old_svc_header = '''<div class="s-eye">O que fazemos</div>
      <h2 class="s-title">Nossos<br><em>Serviços.</em></h2>
    </div>
    <p style="color:var(--gray);font-size:.9rem;line-height:1.75;max-width:340px;text-align:right;padding-bottom:8px">
      Atuamos em instalações elétricas e segurança eletrônica residencial e comercial com total conformidade técnica.
    </p>'''

new_svc_header = '''<div class="s-eye">Ecossistema Inteligente</div>
      <h2 class="s-title">Nossas<br><em>Especialidades.</em></h2>
    </div>
    <p style="color:var(--gray);font-size:.9rem;line-height:1.75;max-width:340px;text-align:right;padding-bottom:8px">
      Projetamos e executamos soluções completas de casa inteligente com acabamento de alto padrão e integração wireless.
    </p>'''
html = html.replace(old_svc_header, new_svc_header)
html = re.sub(r'<div class="s-eye">O que fazemos</div>[\s\S]*?</p>', new_svc_header, html)

# Replace Grid
new_grid = '''<div class="svc-grid reveal" style="transition-delay:.1s">
    <div class="svc-card hot">
      <div class="svc-num">01</div>
      <div class="svc-icon">💡</div>
      <div class="svc-name">Iluminação & Cenários</div>
      <div class="svc-scope">Dimming — Cores — LED</div>
      <p class="svc-desc">Controle absoluto das luzes com cenários criados para cada momento: Jantar, Cinema ou Festa.</p>
      <ul class="svc-list">
        <li>Criação de cenários personalizados</li>
        <li>Integração total com Alexa e Apple Home</li>
        <li>Controle por App em qualquer lugar</li>
        <li>Teclados pulsadores luxuosos</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">02</div>
      <div class="svc-icon">🔐</div>
      <div class="svc-name">Acesso Keyless</div>
      <div class="svc-scope">Biometria — Senha — Digital</div>
      <p class="svc-desc">Entre na sua casa com o dedo ou rosto. Crie senhas temporárias para visitas ou funcionários.</p>
      <ul class="svc-list">
        <li>Fechaduras biométricas de alto padrão</li>
        <li>Registro de entradas pelo App</li>
        <li>Acesso remoto para visitantes</li>
        <li>Design premium e invisível</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">03</div>
      <div class="svc-icon">🎬</div>
      <div class="svc-name">Áudio Multi-room</div>
      <div class="svc-scope">Home Theater — Som Ambiente</div>
      <p class="svc-desc">Sua música favorita em toda a casa sem delay. Equipamentos Hi-Fi embutidos no teto.</p>
      <ul class="svc-list">
        <li>Distribuição de som por ambientes</li>
        <li>Integração de Home Theater e TV</li>
        <li>Arandelas JBL embutidas</li>
        <li>Controle de volume pelo Spotify</li>
      </ul>
    </div>
    <div class="svc-card">
      <div class="svc-num">04</div>
      <div class="svc-icon">🪟</div>
      <div class="svc-name">Cortinas Motorizadas</div>
      <div class="svc-scope">Persianas — Toldos — Rolô</div>
      <p class="svc-desc">Acorde com o sol entrando automaticamente ou feche a casa inteira com um único toque na saída.</p>
      <ul class="svc-list">
        <li>Motores silenciosos de alta durabilidade</li>
        <li>Abertura programada por horário</li>
        <li>Fechamento automático por sensores</li>
        <li>Ajuste perfeito de luminosidade</li>
      </ul>
    </div>
  </div>'''

# Sub out the old grid completely
html = re.sub(r'<div class="svc-grid reveal".*?</div>\s*</div>\s*</div>\s*</section>', new_grid + '\n</section>', html, flags=re.DOTALL)


# 4. Update Marquee
html = html.replace('Instalações Elétricas', 'Casa Inteligente')
html = html.replace('Quadros Elétricos', 'Iluminação Smart')
html = html.replace('Iluminação LED', 'Alexa & Apple Home')
html = html.replace('CFTV & Câmeras', 'Redes Wi-Fi Premium')
html = html.replace('Controle de Acesso', 'Biometria e Keyless')
html = html.replace('Alarmes & Cercas', 'Cortinas Motorizadas')
html = html.replace('Redes Estruturadas', 'Home Theater')
html = html.replace('Som Ambiente', 'Áudio Multi-room')
html = html.replace('NR-10 Certificado', 'Design Exclusivo')
html = html.replace('ABNT NBR 5410', 'Conforto Absoluto')

# fallback for broken encoding in marquee
html = html.replace('Instalaes Eltricas', 'Casa Inteligente')
html = html.replace('Quadros Eltricos', 'Iluminao Smart')
html = html.replace('Iluminao LED', 'Alexa & Apple Home')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("Done overhaul!")
