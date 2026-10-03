with open('scratch/vo_chong_a_phu_formatted.html', 'r', encoding='utf-8') as f:
    clean_html = f.read()

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Locate vo-chong-a-phu
marker = '"id": "vo-chong-a-phu"'
pos = data_js.find(marker)
if pos == -1:
    print("Error: vo-chong-a-phu not found in data.js")
    exit(1)

c_start = data_js.find('"content": "', pos)
c_end = data_js.find('",\n      "criticism":', c_start)

if c_start != -1 and c_end != -1:
    escaped_html = clean_html.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    data_js = data_js[:c_start + len('"content": "')] + escaped_html + data_js[c_end:]
    print("Successfully replaced content for vo-chong-a-phu!")
else:
    print("Error finding content markers")
    exit(1)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Saved js/data.js successfully!")
