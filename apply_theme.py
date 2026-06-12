import re

filepath = r"d:\Users\jhowu\bot-whatsapp\site-msiforce\automacao.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Change CSS Variables
html = html.replace('--orange: #F5A623;', '--orange: #00F0FF;')
html = html.replace('--orange2: #FF8C00;', '--orange2: #7000FF;')
html = html.replace('--orange-glow: rgba(245,166,35,0.18);', '--orange-glow: rgba(0,240,255,0.18);')
html = html.replace('--black: #060606;', '--black: #050508;')
html = html.replace('--dark: #0D0D0D;', '--dark: #080A10;')
html = html.replace('--dark2: #131313;', '--dark2: #0D1018;')

# 2. Add backdrop-filter (Glassmorphism) to cards
html = re.sub(r'\.svc-card\{([^}]+)\}', r'.svc-card{\1; backdrop-filter: blur(12px); background: rgba(13, 16, 24, 0.6); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 12px;}', html)

# 3. Replace Hero Image
# We need to find the <img class="hero-img" src="..."> and change it to lux_bg.png
html = re.sub(r'<img\s+src="[^"]+"\s+class="hero-img"[^>]*>', '<img src="lux_bg.png" class="hero-img" alt="Smart Home Luxury">', html)
# Em caso de a classe vir depois do src:
html = re.sub(r'<img\s+class="hero-img"\s+src="[^"]+"[^>]*>', '<img class="hero-img" src="lux_bg.png" alt="Smart Home Luxury">', html)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("Theme applied!")
