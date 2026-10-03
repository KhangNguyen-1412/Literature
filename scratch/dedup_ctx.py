with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Locate the second occurrence of "chiec-thuyen-ngoai-xa"
first_pos = text.find('"id": "chiec-thuyen-ngoai-xa"')
second_pos = text.find('"id": "chiec-thuyen-ngoai-xa"', first_pos + 1)

print(f"First pos: {first_pos}, Second pos: {second_pos}")

if second_pos != -1:
    entry2_start = text.rfind('{\n      "id": "chiec-thuyen-ngoai-xa"', 0, second_pos)
    entry2_end = text.find('},\n    {\n      "id":', second_pos)
    if entry2_end == -1:
        entry2_end = text.find('}\n  ],', second_pos)
    entry2_end += 1 # include closing brace '}'

    print(f"entry2_start: {entry2_start}, entry2_end: {entry2_end}")
    print("Snippet to remove:\n", repr(text[entry2_start:entry2_start+100]), "...\n", repr(text[entry2_end-100:entry2_end]))

    # Remove entry2
    if text[entry2_end:entry2_end+1] == ',':
        text_clean = text[:entry2_start] + text[entry2_end+1:].lstrip('\r\n ')
    else:
        text_clean = text[:entry2_start-1].rstrip() + text[entry2_end:]

    with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'w', encoding='utf-8') as f:
        f.write(text_clean)
    print("Successfully removed duplicate older Chiếc Thuyền Ngoài Xa!")
else:
    print("No duplicate found!")
