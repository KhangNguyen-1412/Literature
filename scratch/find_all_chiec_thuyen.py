with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find all "id": "..." in works
works_start = text.find('works: [')
if works_start == -1: works_start = text.find('"works": [')
works_end = text.find('authors: [', works_start)
if works_end == -1: works_end = text.find('"authors": [', works_start)

works_text = text[works_start:works_end]

# Extract all works titles and ids
matches = re.findall(r'\"id\":\s*\"([^\"]+)\"[^}]*?\"title\":\s*\"([^\"]+)\"', works_text, re.DOTALL)
print(f"Total works found: {len(matches)}")
for idx, (wid, title) in enumerate(matches):
    if 'thuyền' in title.lower() or 'xa' in title.lower() or 'thuyen' in wid.lower():
        print(f"  [{idx+1}] ID: {wid} | Title: {title}")
