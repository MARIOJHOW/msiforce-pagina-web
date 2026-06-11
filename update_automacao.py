import re

filepath = r"d:\Users\jhowu\bot-whatsapp\site-msiforce\automacao.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title
html = html.replace('<title>MSIFORCE — Engenharia, Elétrica & Segurança Eletrônica</title>', 
                    '<title>MSIFORCE — Automação Residencial Premium & Casa Inteligente</title>')

# 2. Update Hero H1
old_h1 = '''<h1 class="hero-h1">
  <span class="line-orange">PROJETOS</span>
  <span class="line-stroke">ELÉTRICOS &</span>
  <span class="line-white">SEGURANÇA</span>
</h1>'''
new_h1 = '''<h1 class="hero-h1" style="font-size:clamp(3.5rem,6.5vw,7rem);">
  <span class="line-orange">AUTOMAÇÃO</span>
  <span class="line-stroke">RESIDENCIAL &</span>
  <span class="line-white">CASA INTELIGENTE</span>
</h1>'''
html = html.replace(old_h1, new_h1)

# 3. Update Hero Tagline
old_tagline = '''<strong>Mário Sérgio Inácio Júnior.</strong> Especialista em instalação de CFTV, Redes, Automação e Elétrica de ponta a ponta. Atendimento em São Paulo e região.'''
new_tagline = '''<strong>Mário Sérgio Inácio Júnior.</strong> Projetos premium de Automação Residencial, integração com Alexa, iluminação inteligente e segurança. Transforme sua casa em um ambiente tecnológico, luxuoso e confortável.'''
html = html.replace(old_tagline, new_tagline)

# 4. Update WhatsApp Links
# We want to replace the current text "Olá, vim pelo site da MSIFORCE e gostaria de solicitar um atendimento."
# with "Olá, vim pelo site e quero um projeto de Automação Residencial"
import urllib.parse
old_text = urllib.parse.quote("Olá, vim pelo site da MSIFORCE e gostaria de solicitar um atendimento.")
new_text = urllib.parse.quote("Olá, vim pelo site e quero um projeto de Automação Residencial")

html = html.replace(old_text, new_text)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("automacao.html updated successfully!")
