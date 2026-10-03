import fitz
import re

doc = fitz.open('scratch/vo_chong_a_phu.pdf')

pages_text = []
for p in range(3, 22):
    t = doc[p].get_text()
    lines = [l.strip() for l in t.split('\n') if l.strip()]
    # Remove header / footer
    # Footer on each page is "Vợ Chồng A Phủ   ξ   Tô Hoài" and page number
    clean_lines = []
    for l in lines:
        if l == "VỢ CHỒNG A PHỦ" and p == 3:
            continue
        if "Vợ Chồng A Phủ" in l and "Tô Hoài" in l:
            continue
        if re.match(r'^\d+$', l):
            continue
        clean_lines.append(l)
    pages_text.append(clean_lines)

print(f"Total pages processed: {len(pages_text)}")

# Let's join lines into paragraphs
raw_text = ""
for page_lines in pages_text:
    for l in page_lines:
        raw_text += l + "\n"

# Let's write a smart regex to insert space between words that got glued:
# 1. Lowercase followed by Uppercase: e.g. "bốMỵ" -> "bố Mỵ", "bốA" -> "bố A", "Sửthắt" -> "Sử thắt"
text = re.sub(r'([a-zà-ỹ])([A-ZÀ-Ỹ])', r'\1 \2', raw_text)

# 2. Common prefixes that got glued to next word:
# "ở", "bố", "mẹ", "được", "người", "lại", "thì", "cũng", "đã", "sẽ", "chỉ", "cứ", "họ", "Mỵ", "Phủ", "Sử", "Tra", "Pá"
glue_prefixes = [
    'ở', 'bố', 'mẹ', 'thì', 'cũng', 'đã', 'sẽ', 'chỉ', 'cứ', 'họ', 'Mỵ', 'Phủ', 'Sử', 'Tra', 'Pá',
    'bị', 'về', 'cho', 'ra', 'vào', 'lên', 'xuống', 'lại', 'qua', 'đến', 'từ', 'của', 'với',
    'chứ', 'mà', 'nếu', 'được', 'phải', 'biết', 'thấy', 'nghe', 'nhìn', 'nói', 'bảo', 'hỏi',
    'người', 'cô', 'anh', 'ông', 'bà', 'thằng', 'con', 'đứa', 'nhà', 'làng', 'núi', 'rừng',
    'năm', 'ngày', 'đêm', 'hôm', 'sáng', 'chiều', 'lúc', 'khi', 'giờ',
    'rất', 'lắm', 'quá', 'hơn', 'hết', 'nhiều', 'ít', 'mỗi', 'một', 'hai', 'ba', 'bốn',
    'cả', 'nửa', 'tất', 'đều', 'không', 'chẳng', 'chưa', 'tự', 'cùng', 'nhau'
]

# Sort prefixes by length descending
glue_prefixes.sort(key=lambda x: -len(x))

# Also check words that end with vowels with tones:
# e.g. ả, ã, ạ, ẻ, ẽ, ẹ, ỉ, ĩ, ị, ỏ, õ, ọ, ủ, ũ, ụ, ỷ, ỹ, ỵ, ờ, ở, ỡ, ợ, ớ, ề, ể, ễ, ệ, ế, ồ, ổ, ỗ, ộ, ố, ừ, ử, ữ, ự, ứ
tone_vowels = "ảãạẻẽẹỉĩịỏõọủũụỷỹỵờởỡợớềểễệếồổỗộốừửữựứ"

for pfx in glue_prefixes:
    # If a word starts with pfx and len(word) > len(pfx), and the next char is not part of a valid syllable
    # We can replace with word boundary
    pattern = rf'\b({pfx})([a-zA-ZÀ-ỹ]{{2,}})'
    # Test replacement
    pass

with open('scratch/vo_chong_a_phu_raw.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved raw text to scratch/vo_chong_a_phu_raw.txt")
