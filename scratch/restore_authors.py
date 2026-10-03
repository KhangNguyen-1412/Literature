import json

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/existing_data.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

authors = existing['authors']
print(f"Total authors to restore: {len(authors)}")
print("Authors list:", [a['id'] for a in authors])

authors_json_str = json.dumps(authors, ensure_ascii=False, indent=4)
# indent 4 spaces inside data.js:
# format: "authors": [\n    { ... }\n  ],

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Find start of authors
start_marker = '"authors": ['
p_start = data_js.find(start_marker)
if p_start == -1:
    print("Error: '\"authors\": [' not found")
    exit(1)

# Find end of authors: look for '],\n  "quotes":' or similar
end_marker = '],\n  "quotes":'
p_end = data_js.find(end_marker, p_start)
if p_end == -1:
    # try other quotes
    end_marker = '],\n  quotes:'
    p_end = data_js.find(end_marker, p_start)

if p_end == -1:
    print("Error: end of authors not found")
    exit(1)

# Replace the authors block
new_authors_block = '"authors": ' + json.dumps(authors, ensure_ascii=False, indent=4)
data_js = data_js[:p_start] + new_authors_block + data_js[p_end+1:]

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Saved restored authors to js/data.js successfully!")
