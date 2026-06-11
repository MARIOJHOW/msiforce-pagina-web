import os
import re
import urllib.parse

# Configurações do texto
TEXT_DEFAULT = "Olá, vim pelo site da MSIFORCE e gostaria de solicitar um atendimento."
TEXT_ENCODED = urllib.parse.quote(TEXT_DEFAULT)
LINK_WITH_TEXT = f'https://wa.me/5511910773865?text={TEXT_ENCODED}'

def fix_links_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace href="https://wa.me/5511910773865" without query params
    # We use regex to match exactly that, avoiding replacing ones that already have ?text
    new_content = re.sub(
        r'href="https://wa\.me/5511910773865/?(?![\?#])"', 
        f'href="{LINK_WITH_TEXT}"', 
        content
    )
    
    # Also fix where it's href='...' just in case
    new_content = re.sub(
        r"href='https://wa\.me/5511910773865/?(?![\?#])'", 
        f"href='{LINK_WITH_TEXT}'", 
        new_content
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")

def main():
    base_dir = r"d:\Users\jhowu\bot-whatsapp\site-msiforce"
    for root, dirs, files in os.walk(base_dir):
        if "node_modules" in root or ".git" in root:
            continue
        for file in files:
            if file.endswith('.html'):
                fix_links_in_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
