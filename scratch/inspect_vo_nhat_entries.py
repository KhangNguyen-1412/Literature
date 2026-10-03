with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find both vo-nhat positions
positions = [m.start() for m in re.finditer(r'\{\s*"id":\s*"vo-nhat"', text)]
print("Positions:", positions)

for i, pos in enumerate(positions):
    snippet = text[pos:pos+1500]
    print(f"=== ENTRY {i+1} (at {pos}) ===")
    print(snippet[:600])
    # check length of content
    c_start = snippet.find('"content": "')
    if c_start != -1:
        print("Content starts:", snippet[c_start:c_start+100])
