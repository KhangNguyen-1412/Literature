with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

marker = '"id": "chiec-thuyen-ngoai-xa"'
count = text.count(marker)
print(f"Occurrences of '{marker}': {count}")

p = text.find(marker)
if p != -1:
    end = text.find('},\n    {\n      "id":', p)
    if end == -1: end = text.find('}\n  ],', p)
    print("Exact entry in js/data.js:")
    entry_lines = text[p:end].split('\n')
    for l in entry_lines[:12]:
        print(" ", l)
