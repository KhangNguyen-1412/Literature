import fitz
import re

pdf_path = 'C:/Users/nhpk1/.gemini/antigravity-ide/brain/8e4f5377-b764-4b67-9de1-ca3ca2021771/.user_uploaded/media_1788425014189.pdf'
doc = fitz.open(pdf_path)

# Correct page order (1-indexed)
# Exclude duplicate pages: 
# 26-32 (duplicates of 19-25)
# 55 (duplicate of 54)
# 72-74 (duplicates of 69-71)
# Pages 103-113 shuffled order:
# 103 -> 108 -> 109 -> 110 -> 104 -> 105 -> 106 -> 111 -> 112 -> 113

ordered_pages = []

# Section 1: Pages 1 to 25
ordered_pages.extend(range(1, 26))

# Skip duplicates 26-32, continue from 33 to 54
ordered_pages.extend(range(33, 55))

# Skip duplicate 55, continue from 56 to 71
ordered_pages.extend(range(56, 72))

# Skip duplicates 72-74, continue from 75 to 103
ordered_pages.extend(range(75, 104))

# Shuffled scene fix (pages 103-113):
ordered_pages.extend([108, 109, 110, 104, 105, 106, 111, 112, 113])

# Section after: Pages 114 to 155
ordered_pages.extend(range(114, 156))

print(f"Total ordered pages: {len(ordered_pages)}")

def extract_page_text(p_num):
    page = doc[p_num - 1]
    # Extract blocks
    blocks = page.get_text('blocks')
    # Filter text blocks, skip standalone page number (at top or bottom)
    paras = []
    for b in blocks:
        if b[6] != 0: continue
        t = b[4].strip()
        if re.match(r'^\d+$', t):
            continue
        lines = [l.strip() for l in t.split('\n') if l.strip()]
        if not lines: continue
        
        # De-hyphenate line breaks
        cleaned_para = ""
        for l in lines:
            if not cleaned_para:
                cleaned_para = l
            else:
                if cleaned_para.endswith('-'):
                    cleaned_para = cleaned_para[:-1] + l
                else:
                    cleaned_para += " " + l
        cleaned_para = re.sub(r'[ \t]+', ' ', cleaned_para).strip()
        if cleaned_para:
            paras.append(cleaned_para)
    return paras

all_paragraphs = []
for p in ordered_pages:
    all_paragraphs.extend(extract_page_text(p))

print(f"Total reconstructed paragraphs: {len(all_paragraphs)}")
words = sum(len(p.split()) for p in all_paragraphs)
print(f"Total words: {words}")

# Save to a clean text file for inspection
with open('scratch/tat_den_full.txt', 'w', encoding='utf-8') as f:
    for p in all_paragraphs:
        f.write(p + '\n\n')

print("Successfully written to scratch/tat_den_full.txt")
