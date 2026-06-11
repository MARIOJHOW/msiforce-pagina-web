import re
with open('index_v2.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = re.findall(r'href=[\'"](https://wa\.me/.*?)[\'"]', html)
for i, link in enumerate(links):
    print(f"{i+1}: {link}")
