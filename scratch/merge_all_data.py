# -*- coding: utf-8 -*-
"""
Merges the 24 new SGK classic works, 20 new authors, quotes, and allusions into js/data.js.
Ensures perfect JavaScript formatting and syntax validity.
"""
import os
import json
import subprocess

from data_group1 import WORKS_GROUP_1
from data_group2 import WORKS_GROUP_2
from data_group3 import WORKS_GROUP_3
from data_supplementary import NEW_AUTHORS, NEW_QUOTES, NEW_ALLUSIONS

# 1. First, let's extract the existing data from js/data.js using Node.js to get pure JSON
node_extract_script = r"""
const fs = require('fs');
const vm = require('vm');
const raw = fs.readFileSync('js/data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);
const d = sandbox.window.LITERARY_DATA || sandbox.LITERARY_DATA;
fs.writeFileSync('scratch/existing_data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Successfully extracted existing data.');
"""

with open("scratch/extract_temp.js", "w", encoding="utf-8") as f:
    f.write(node_extract_script)

res = subprocess.run(["node", "scratch/extract_temp.js"], capture_output=True, text=True, check=True)
print(res.stdout)

with open("scratch/existing_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Existing works: {len(data['works'])}")
print(f"Existing authors: {len(data['authors'])}")

# 2. Update or append new works
work_map = {w['id']: w for w in data['works']}
all_new_works = WORKS_GROUP_1 + WORKS_GROUP_2 + WORKS_GROUP_3
for w in all_new_works:
    work_map[w['id']] = w

original_order = [w['id'] for w in data['works']]
for w in all_new_works:
    if w['id'] not in original_order:
        original_order.append(w['id'])

data['works'] = [work_map[wid] for wid in original_order]
print(f"Total works now: {len(data['works'])}")

# 3. Append new authors (avoid duplicates by ID)
existing_author_ids = {a['id'] for a in data['authors']}
added_authors = 0
for a in NEW_AUTHORS:
    if a['id'] not in existing_author_ids:
        data['authors'].append(a)
        existing_author_ids.add(a['id'])
        added_authors += 1

print(f"Added {added_authors} new authors. Total authors now: {len(data['authors'])}")

# 4. Append quotes & allusions
existing_quote_texts = {q['text'] for q in data['quotes']}
for q in NEW_QUOTES:
    if q['text'] not in existing_quote_texts:
        data['quotes'].append(q)

existing_allusion_names = {a['name'] for a in data['allusions']}
for a in NEW_ALLUSIONS:
    if a['name'] not in existing_allusion_names:
        data['allusions'].append(a)

# 5. Format and save to js/data.js
output_js = f"""/**
 * VĂN UYỂN - KHO LƯU TRỮ VĂN HỌC TOÀN BÍCH
 * Dữ liệu đầy đủ toàn bộ tác phẩm (Unabridged) chuẩn Editorial
 * Bao gồm tác phẩm văn học Việt Nam & Thế giới trong chương trình SGK
 * Tự động phân chia 2 cột, lật trang, đánh dấu SGK và cước chú tương tác.
 */

const LITERARY_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};

window.LITERARY_DATA = LITERARY_DATA;
"""

with open("js/data.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved updated js/data.js successfully!")
