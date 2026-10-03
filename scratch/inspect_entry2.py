with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos2 = 360624
end2 = text.find('},\n    {\n      "id":', pos2)
if end2 == -1:
    end2 = text.find('}\n  ],', pos2)

entry2_str = text[pos2:end2]
print("Entry 2 length:", len(entry2_str))
print("Entry 2 snippet:")
print(entry2_str[:800])
print("...")
print(entry2_str[-500:])
