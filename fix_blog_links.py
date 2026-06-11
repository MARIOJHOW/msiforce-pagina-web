import os
import glob

# Fix blog links
blog_files = glob.glob(r'd:\Users\jhowu\bot-whatsapp\site-msiforce\blog\**\index.html', recursive=True)

for file in blog_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace links to atendente with the main saas page
    if '../../atendente/index.html' in content:
        content = content.replace('../../atendente/index.html', '../../index_v2.html')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed link in {file}")

print("Done fixing blog links")
