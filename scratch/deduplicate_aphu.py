with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect where Entry 2 is located:
entry2_marker = '"26 phút đọc • Toàn cảnh tác phẩm"'
pos2 = text.find(entry2_marker)
print("Position of 26 phút entry:", pos2)

if pos2 == -1:
    print("Error: 26 phút entry not found")
    exit(1)

# Find the start of this work object: look backwards for '{\n      "id": "vo-chong-a-phu"'
work_start = text.rfind('{\n      "id": "vo-chong-a-phu"', 0, pos2)
if work_start == -1:
    work_start = text.rfind('{\n      \"id\":', 0, pos2)

print("work_start:", work_start)
print("Snippet at work_start:\n", repr(text[work_start:work_start+80]))

# Find the end of this work object: look forward for '},\n    {\n      "id":' or '}\n  ],\n  authors:'
end_marker1 = '},\n    {\n      "id":'
end_marker2 = '}\n  ],\n  "authors":'
end_marker3 = '}\n  ],\n  authors:'

pos_end1 = text.find(end_marker1, pos2)
pos_end2 = text.find(end_marker2, pos2)
pos_end3 = text.find(end_marker3, pos2)

candidates = [p for p in [pos_end1, pos_end2, pos_end3] if p != -1]
work_end = min(candidates) + 1 # include the closing brace '}'

print("work_end:", work_end)
print("Snippet at work_end:\n", repr(text[work_end-40:work_end+40]))

# Check if there is a comma before or after
# If followed by ',\n    {', we can remove from work_start to work_end + 1 (the comma)
if text[work_end:work_end+1] == ',':
    print("Has trailing comma")
    text_without_entry2 = text[:work_start] + text[work_end+1:].lstrip('\r\n ')
elif text[work_start-2:work_start] == ',\n':
    print("Has leading comma")
    text_without_entry2 = text[:work_start-1].rstrip('\r\n ') + text[work_end:]
else:
    text_without_entry2 = text[:work_start] + text[work_end:]

# Now let's remove duplicate 'to-hoai' in authors
# Find first 'to-hoai' and second 'to-hoai'
first_th = text_without_entry2.find('"id": "to-hoai"')
second_th = text_without_entry2.find('"id": "to-hoai"', first_th + 1)

print(f"First to-hoai: {first_th}, Second to-hoai: {second_th}")

if second_th != -1:
    # Remove second to-hoai
    th2_start = text_without_entry2.rfind('{\n      "id": "to-hoai"', 0, second_th)
    th2_end = text_without_entry2.find('},\n    {\n      "id":', second_th)
    if th2_end == -1:
        th2_end = text_without_entry2.find('}\n  ],', second_th)
    th2_end += 1 # closing brace
    
    if text_without_entry2[th2_end:th2_end+1] == ',':
        text_without_dup = text_without_entry2[:th2_start] + text_without_entry2[th2_end+1:].lstrip('\r\n ')
    else:
        text_without_dup = text_without_entry2[:th2_start-1].rstrip() + text_without_entry2[th2_end:]
else:
    text_without_dup = text_without_entry2

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'w', encoding='utf-8') as f:
    f.write(text_without_dup)

print("Saved deduplicated js/data.js successfully!")
