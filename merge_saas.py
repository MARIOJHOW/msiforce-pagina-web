import re

def merge():
    with open('atendente/index_v2.html', 'r', encoding='utf-8') as f:
        atend = f.read()
        
    with open('index_v2.html', 'r', encoding='utf-8') as f:
        main = f.read()

    # ---- EXTRACT CSS ----
    css_match = re.search(r'(/\* ════════════════════════════════════════════\s*TRUST STRIP.*?)/* ════════════════════════════════════════════\s*RESPONSIVE', atend, flags=re.DOTALL)
    css_content = css_match.group(1) if css_match else ""
    
    # Clean up CSS variables to match main brand
    css_content = css_content.replace('var(--accent)', 'var(--orange)')
    css_content = css_content.replace('var(--accent2)', 'var(--orange)')
    css_content = css_content.replace('var(--card)', 'var(--dark2)')
    css_content = css_content.replace('var(--border-accent)', 'rgba(245,166,35,0.25)')
    css_content = css_content.replace('var(--border)', 'rgba(255,255,255,0.05)')
    css_content = css_content.replace('var(--mid)', 'var(--dark)')
    css_content = css_content.replace('var(--font-display)', "'Outfit', sans-serif")
    css_content = css_content.replace('var(--font-body)', "'Outfit', sans-serif")
    css_content = css_content.replace('rgba(0,232,122,', 'rgba(245,166,35,') # green glow to orange glow
    css_content = css_content.replace('#00e87a', '#f5a623')
    css_content = css_content.replace('#ff7a00', '#f5a623')
    css_content = css_content.replace('#ff4d00', '#f5a623')
    
    # ---- EXTRACT HTML SECTIONS ----
    trust_strip = re.search(r'<!-- TRUST STRIP -->(.*?)<!-- ═══════════════════════════════════════\s*PROBLEMA', atend, flags=re.DOTALL).group(1)
    problema = re.search(r'<!-- ═══════════════════════════════════════\s*PROBLEMA.*?-->(.*?)<!-- ═══════════════════════════════════════\s*SOLUÇÃO', atend, flags=re.DOTALL).group(1)
    roi = re.search(r'<!-- ═══════════════════════════════════════\s*ROI.*?-->(.*?)<!-- ═══════════════════════════════════════\s*DEMO', atend, flags=re.DOTALL).group(1)
    demo = re.search(r'<!-- ═══════════════════════════════════════\s*DEMO.*?-->(.*?)<!-- ═══════════════════════════════════════\s*DEPOIMENTOS', atend, flags=re.DOTALL).group(1)
    depo = re.search(r'<!-- ═══════════════════════════════════════\s*DEPOIMENTOS.*?-->(.*?)<!-- ═══════════════════════════════════════\s*INVESTIMENTO', atend, flags=re.DOTALL).group(1)
    preco = re.search(r'<!-- ═══════════════════════════════════════\s*INVESTIMENTO.*?-->(.*?)<!-- ═══════════════════════════════════════\s*FAQ', atend, flags=re.DOTALL).group(1)
    faq = re.search(r'<!-- ═══════════════════════════════════════\s*FAQ.*?-->(.*?)<!-- ═══════════════════════════════════════\s*CTA FINAL', atend, flags=re.DOTALL).group(1)
    
    # Clean up FAQ HTML (remove the scarcity spots from FAQ CTA)
    faq = re.sub(r'<div class="faq-cta-spots">.*?</div>', '', faq, flags=re.DOTALL)
    # Clean up Pricing HTML (remove the countdown from Pricing Intro)
    preco = re.sub(r'<div class="pricing-timer-label">.*?</div>\s*</div>\s*</div>', '</div>\n  </div>', preco, flags=re.DOTALL)

    # ---- INSERT CSS ----
    main = main.replace('</style>', css_content + '\n</style>')
    
    # ---- INSERT HTML ----
    # 1. Insert Trust Strip after hero (replace .stats-bar)
    # Remove stats-bar
    main = re.sub(r'<!-- STATS -->.*?<div class="stat-cell">.*?</div>\s*</div>\s*</div>', '', main, flags=re.DOTALL)
    # Insert Trust Strip right before marquee
    main = main.replace('<!-- MARQUEE -->', '<!-- TRUST STRIP -->\n' + trust_strip + '\n<!-- MARQUEE -->')
    
    # 2. Insert Problema after marquee
    main = re.sub(r'(</div>\s*</div>\s*<!-- FLYER / DIFERENCIAIS -->)', r'\1\n<!-- PROBLEMA -->\n' + problema, main)
    
    # 3. Insert Demo, ROI, Depo, Preco, FAQ after servicos
    # servicos ends with </section>\s*<!-- CTA BAND -->
    injection = f"\n<!-- DEMO -->\n{demo}\n<!-- ROI -->\n{roi}\n<!-- DEPOIMENTOS -->\n{depo}\n<!-- PRECOS -->\n{preco}\n<!-- FAQ -->\n{faq}\n"
    main = re.sub(r'(</section>\s*<!-- CTA BAND -->)', r'</section>' + injection + r'\n<!-- CTA BAND -->', main)
    
    # ---- EXTRACT AND INSERT FAQ JS ----
    js_faq = """
<script>
function toggleFaq(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
</script>
"""
    main = main.replace('</body>', js_faq + '\n</body>')

    with open('index_v2.html', 'w', encoding='utf-8') as f:
        f.write(main)
    print("SaaS Fusion Complete!")

merge()
