import re

def move_hero_img():
    filepath = 'index_v2.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract hero-right
    hero_right_pattern = r'(\s*<div class="hero-right">.*?</div>\n\s*</section>)'
    
    match = re.search(r'\s*<div class="hero-right">.*?</div>\n\s*</section>', content, flags=re.DOTALL)
    if not match:
        print("Could not find hero-right section!")
        return

    full_hero_end = match.group(0)
    
    # We want to separate hero-right from </section>
    hero_right_only = re.search(r'\s*<div class="hero-right">.*?</div>\n', full_hero_end, flags=re.DOTALL).group(0)
    
    # Replace "e Registrado" with "Especializado" and "Técnico Formado" with "Técnico"
    # Actually, user said: "retirar técnico registrado por técnico especializado"
    # So: "Técnico Formado" -> "Técnico", "e Registrado" -> "Especializado"
    # Or just "Técnico" and "Especializado"
    hero_right_mod = hero_right_only.replace('<span class="cert-t1">Técnico Formado</span>', '<span class="cert-t1">Técnico</span>')
    hero_right_mod = hero_right_mod.replace('<span class="cert-t2">e Registrado</span>', '<span class="cert-t2">Especializado</span>')

    # Remove hero-right from hero section
    content = content.replace(hero_right_only, '')

    # Now, find #hero CSS and change grid-template-columns:1fr 1fr; to grid-template-columns:1fr;
    content = content.replace('grid-template-columns:1fr 1fr;', 'grid-template-columns:1fr;')

    # Wrap the extracted block with a nice centered div for the services section
    img_block_for_services = f"""
  <div class="svc-img-block" style="position:relative; max-width:500px; margin: 0 auto 60px auto;">
{hero_right_mod}
  </div>
"""
    # Replace <div class="hero-right"> with <div class="hero-right" style="min-height:unset;"> inside img_block_for_services to avoid it taking up weird space
    img_block_for_services = img_block_for_services.replace('<div class="hero-right">', '<div class="hero-right" style="min-height:unset; display:flex; justify-content:center;">')

    # Insert img_block_for_services right after svc-header
    svc_header_pattern = r'(<div class="svc-header reveal">.*?</div>\n)'
    content = re.sub(svc_header_pattern, r'\1' + img_block_for_services, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Success! Image moved.")

move_hero_img()
