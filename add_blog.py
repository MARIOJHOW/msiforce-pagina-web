import shutil
import os
import re

# Destination folder
site_dir = r"d:\Users\jhowu\bot-whatsapp\site-msiforce"

# Source images from artifacts
img1 = r"C:\Users\JHOW\.gemini\antigravity-ide\brain\2fcb5cae-6624-4658-a96f-d3dbb4b4bc48\media__1781121237433.jpg"
img2 = r"C:\Users\JHOW\.gemini\antigravity-ide\brain\2fcb5cae-6624-4658-a96f-d3dbb4b4bc48\media__1781121237480.jpg"
img3 = r"C:\Users\JHOW\.gemini\antigravity-ide\brain\2fcb5cae-6624-4658-a96f-d3dbb4b4bc48\media__1781121237565.jpg"

# Destination paths
dest1 = os.path.join(site_dir, "blog1.jpg")
dest2 = os.path.join(site_dir, "blog2.jpg")
dest3 = os.path.join(site_dir, "blog3.jpg")

# Copy files if they exist
if os.path.exists(img1): shutil.copy(img1, dest1)
if os.path.exists(img2): shutil.copy(img2, dest2)
if os.path.exists(img3): shutil.copy(img3, dest3)

css = """
/* ════════════════════════════════════════════
   BLOG
════════════════════════════════════════════ */
#blog { background: var(--black); }
.blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.blog-card {
  background: var(--dark2); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 18px; overflow: hidden; transition: transform 0.3s;
}
.blog-card:hover { transform: translateY(-5px); border-color: rgba(245,166,35,0.25); }
.blog-img { width: 100%; height: 200px; object-fit: cover; }
.blog-content { padding: 1.5rem; }
.blog-tag { font-size: 0.65rem; color: var(--orange); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
.blog-title { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.8rem; line-height: 1.3; }
.blog-desc { font-size: 0.85rem; color: rgba(240,237,232,0.5); line-height: 1.6; margin-bottom: 1rem; }
.blog-link { font-size: 0.8rem; color: var(--orange); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem; }
"""

html = """
<!-- ════════════════════════════════════════════
     BLOG
════════════════════════════════════════════ -->
<section id="blog">
  <span class="eyebrow">09 — Nosso Blog</span>
  <h2 class="reveal">Conteúdo estratégico<br>para o seu negócio.</h2>
  <div class="divider"></div>
  <p class="section-desc reveal">Dicas, estratégias e ferramentas para escalar suas vendas e acabar com o gargalo no atendimento.</p>
  
  <div class="blog-grid">
    <div class="blog-card reveal reveal-delay-1">
      <img src="blog1.jpg" class="blog-img" alt="Técnica de Vendas">
      <div class="blog-content">
        <span class="blog-tag">Vendas no WhatsApp</span>
        <h3 class="blog-title">Como acabar com o Ghosting de clientes</h3>
        <p class="blog-desc">Aprenda a técnica de follow-up que recupera orçamentos enviados e ignorados.</p>
        <a href="#" class="blog-link">Ler artigo completo →</a>
      </div>
    </div>
    
    <div class="blog-card reveal reveal-delay-2">
      <img src="blog2.jpg" class="blog-img" alt="Orçamentos PDF">
      <div class="blog-content">
        <span class="blog-tag">Automação Comercial</span>
        <h3 class="blog-title">O fim do orçamento no boca a boca</h3>
        <p class="blog-desc">Porque gerar orçamentos em PDF aumenta sua autoridade e converte leads mais frios.</p>
        <a href="#" class="blog-link">Ler artigo completo →</a>
      </div>
    </div>
    
    <div class="blog-card reveal reveal-delay-3">
      <img src="blog3.jpg" class="blog-img" alt="Inteligência Artificial">
      <div class="blog-content">
        <span class="blog-tag">Inteligência Artificial</span>
        <h3 class="blog-title">O papel da IA no atendimento</h3>
        <p class="blog-desc">Descubra como a IA consegue entender a dor do cliente antes de você falar com ele.</p>
        <a href="#" class="blog-link">Ler artigo completo →</a>
      </div>
    </div>
  </div>
</section>
"""

with open(os.path.join(site_dir, 'index_v2.html'), 'r', encoding='utf-8') as f:
    content = f.read()

# Inject CSS
if '/* BLOG */' not in content and '#blog {' not in content:
    content = content.replace('</style>', css + '\n</style>')

# Inject HTML right before FAQ
if 'id="blog"' not in content:
    content = content.replace('<!-- FAQ -->', html + '\n<!-- FAQ -->')

with open(os.path.join(site_dir, 'index_v2.html'), 'w', encoding='utf-8') as f:
    f.write(content)

print("Blog added successfully!")
