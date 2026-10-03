import fitz
import re

doc = fitz.open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_ngoai_xa.pdf')
full = ''
for p in range(3, 24):
    lines = [l.strip() for l in doc[p].get_text().split('\n') if l.strip()]
    clean = []
    for l in lines:
        if 'Chiếc Thuyền Ngoài Xa' in l and 'Nguyễn Minh Châu' in l: continue
        if l.isdigit(): continue
        if 'Powered by TCPDF' in l: continue
        clean.append(l)
    full += '\n'.join(clean) + '\n'

# Specific initial-only prefixes/words:
# The font kerning issue only happens after vowels with tone:
# Let's inspect all words with > 1 tone or suspicious patterns
vowels_with_tone = set('áàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵắằẳẵặấầẩẫậếềểễệốồổỗộứừửữựớờởỡợ')

multi_tone = []
for w in set(re.findall(r'[a-zA-ZÀ-ỹ]+', full)):
    tones = [c for c in w if c.lower() in vowels_with_tone]
    if len(tones) > 1:
        multi_tone.append(w)

print(f"Total multi-tone words to split: {len(multi_tone)}")
with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/multi_tone_words.txt', 'w', encoding='utf-8') as f:
    for w in sorted(multi_tone):
        f.write(w + '\n')
