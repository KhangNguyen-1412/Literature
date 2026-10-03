import re

with open('js/data.js', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r"id:\s*['\"]([^'\"]+)['\"],\s*title:\s*['\"]([^'\"]+)['\"]", content)
print(f"Total works found: {len(matches)}")
for id_, title in matches:
    print(f"- {id_}: {title}")
