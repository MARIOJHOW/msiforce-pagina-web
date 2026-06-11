import re

with open('index_v2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all generic links or broken encoding links
# Link 1: broken encoding
html = html.replace(
    'https://wa.me/5511910773865?text=Olá,%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20atendimento.',
    'https://wa.me/5511910773865?text=Oi%21%20Quero%20conhecer%20a%20Plataforma%20CRM%20e%20IA%20da%20MSIFORCE.'
)

# Any other link without ?text
# specifically exact matches of "https://wa.me/5511910773865"
html = re.sub(
    r'href="https://wa\.me/5511910773865"',
    r'href="https://wa.me/5511910773865?text=Oi%21%20Quero%20conhecer%20a%20Plataforma%20CRM%20e%20IA%20da%20MSIFORCE."',
    html
)

with open('index_v2.html', 'w', encoding='utf-8') as f:
    f.write(html)
    
print("Links fixed!")
