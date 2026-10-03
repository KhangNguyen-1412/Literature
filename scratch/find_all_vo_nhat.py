with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract all work IDs, titles, and years
import re
work_blocks = re.findall(r'\{\s*"id":\s*"([^"]+)",[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"year":\s*"([^"]+)"', text)
print(f"Total parsed works: {len(work_blocks)}")
for wid, title, year in work_blocks:
    if "vợ nhặt" in title.lower() or "vo-nhat" in wid.lower():
        print(f"FOUND: ID={wid}, Title={title}, Year={year}")
