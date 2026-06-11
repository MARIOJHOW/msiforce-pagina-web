import re

def update_pages():
    # ---- Update index_v2.html (Software Page) ----
    file_v2 = 'index_v2.html'
    with open(file_v2, 'r', encoding='utf-8') as f:
        v2_content = f.read()

    # Add the link to the navbar in v2
    nav_link_v2 = '<li><a href="index.html" style="color:var(--orange);">Engenharia & Serviços</a></li>'
    if 'Engenharia & Serviços' not in v2_content:
        v2_content = re.sub(
            r'(<ul class="nav-links">.*?<li><a href="#sobre">Sobre</a></li>)',
            r'\1\n      ' + nav_link_v2,
            v2_content,
            flags=re.DOTALL
        )
    
    # Update page title in v2
    v2_content = re.sub(
        r'<title>.*?</title>',
        '<title>MSIFORCE — CRM & Inteligência Artificial no WhatsApp</title>',
        v2_content
    )

    with open(file_v2, 'w', encoding='utf-8') as f:
        f.write(v2_content)

    # ---- Update index.html (Engineering Page) ----
    file_v1 = 'index.html'
    with open(file_v1, 'r', encoding='utf-8') as f:
        v1_content = f.read()

    # Add the link to the navbar in v1
    nav_link_v1 = '<li><a href="index_v2.html" style="color:var(--orange);">Software CRM & IA</a></li>'
    if 'Software CRM & IA' not in v1_content:
        v1_content = re.sub(
            r'(<ul class="nav-links">.*?<li><a href="#sobre">Sobre</a></li>)',
            r'\1\n      ' + nav_link_v1,
            v1_content,
            flags=re.DOTALL
        )
        
    # Polish fonts: Change Bebas Neue to Outfit
    # First, the Google Fonts import
    v1_content = v1_content.replace(
        'family=Bebas+Neue',
        'family=Outfit:wght@300;400;600;700;800;900'
    )
    
    # CSS: .nav-name
    v1_content = v1_content.replace(
        "font-family:'Bebas Neue',sans-serif;font-size:1.6rem;",
        "font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:800;"
    )
    
    # CSS: .hero-eyebrow
    v1_content = v1_content.replace(
        "font-family:'Barlow Condensed',sans-serif;font-size:.72rem;",
        "font-family:'Outfit',sans-serif;font-size:.72rem;"
    )

    # CSS: .hero-h1
    v1_content = v1_content.replace(
        "font-family:'Bebas Neue',sans-serif;",
        "font-family:'Outfit',sans-serif;font-weight:900;"
    )
    # Fix the text stroke issue for Outfit font in v1
    v1_content = v1_content.replace(
        ".hero-h1 .line-stroke{\n  -webkit-text-stroke:2px rgba(255,255,255,.35);\n  color:transparent;display:block;\n}",
        ".hero-h1 .line-stroke{\n  color:var(--white);display:block;\n}"
    )
    # also inline text stroke replacements just in case
    v1_content = v1_content.replace(
        "-webkit-text-stroke:2px rgba(255,255,255,.35);\n  color:transparent;",
        "color:var(--white);"
    )

    # Make the hero H1 text more engineering focused
    v1_content = v1_content.replace(
        '<span class="line-stroke">ELÉTRICA</span>',
        '<span class="line-stroke">ENGENHARIA</span>'
    )
    v1_content = v1_content.replace(
        '<span class="line-orange">&amp; SEGURANÇA</span>',
        '<span class="line-orange">&amp; ELÉTRICA</span>'
    )

    # Update page title
    v1_content = re.sub(
        r'<title>.*?</title>',
        '<title>MSIFORCE — Engenharia, Elétrica & Segurança Eletrônica</title>',
        v1_content
    )

    with open(file_v1, 'w', encoding='utf-8') as f:
        f.write(v1_content)

    print("Pages linked and polished successfully!")

update_pages()
