import fitz
import re

doc = fitz.open('scratch/vo_chong_a_phu.pdf')

full_text = ""
for p in range(3, 22):
    t = doc[p].get_text()
    lines = [l.strip() for l in t.split('\n') if l.strip()]
    for l in lines:
        if l == "VỢ CHỒNG A PHỦ" and p == 3: continue
        if "Vợ Chồng A Phủ" in l and "Tô Hoài" in l: continue
        if re.match(r'^\d+$', l): continue
        full_text += l + "\n"

# 1. Lowercase followed by Uppercase
full_text = re.sub(r'([a-zà-ỹ])([A-ZÀ-Ỹ])', r'\1 \2', full_text)

# 2. Vowel with tone followed by consonant that can NEVER end a syllable:
# consonants that can NEVER be final: b, d, đ, g, h, k, l, r, s, v, x, th, tr, ch (initial), ph, nh (initial), kh, ng (initial), ngh, qu
never_final_consonants = ['b', 'd', 'đ', 'g', 'h', 'k', 'l', 'r', 's', 'v', 'x']
pattern_never_final = r'([a-zà-ỹ]*[áàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵắằẳẵặấầẩẫậếềểễệốồổỗộứừửữựớờởỡợ])([bdđghklrsvx][a-zà-ỹ]*)'

# Let's see how many matches
matches = re.findall(pattern_never_final, full_text, re.IGNORECASE)
print(f"Matches for never-final consonants: {len(matches)}")
print("Samples:", matches[:30])
