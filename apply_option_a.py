import os
import glob

site_dir = r"d:\Users\jhowu\bot-whatsapp\site-msiforce"

# 1. Rename the file
old_file = os.path.join(site_dir, "index_v2.html")
new_file = os.path.join(site_dir, "plataforma.html")

if os.path.exists(old_file):
    os.rename(old_file, new_file)
    print("Renamed index_v2.html to plataforma.html")

# 2. Find and replace 'index_v2.html' with 'plataforma.html' in all HTML files
html_files = glob.glob(os.path.join(site_dir, "**", "*.html"), recursive=True)

for file in html_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "index_v2.html" in content:
        content = content.replace("index_v2.html", "plataforma.html")
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated links in {file}")

print("All navigation links updated successfully!")
