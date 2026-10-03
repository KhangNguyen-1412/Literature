with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\{\s*"id":\s*"kim-lan"', text)]
print("kim-lan author occurrences:", len(matches), "at positions:", matches)
