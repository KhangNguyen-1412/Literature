import json

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# find occurrences of "chiec-thuyen-ngoai-xa"
positions = []
idx = 0
while True:
    p = text.find('"chiec-thuyen-ngoai-xa"', idx)
    if p == -1: break
    positions.append(p)
    idx = p + 1

print("Occurrences of chiec-thuyen-ngoai-xa:", len(positions), positions)
for pos in positions:
    print("\n--- Snippet around", pos, "---")
    print(text[pos-20:pos+300])
