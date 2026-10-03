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

# Step 1: Lowercase followed by Uppercase (bốMỵ -> bố Mỵ, Sửthắt -> Sử thắt)
full_text = re.sub(r'([a-zà-ỹ])([A-ZÀ-Ỹ])', r'\1 \2', full_text)

# Step 2: Uppercase name followed by lowercase word (Mỵvề -> Mỵ về, Phủcứ -> Phủ cứ, Sửngồi -> Sử ngồi, Traquay -> Tra quay)
names = ['Mỵ', 'Phủ', 'Sử', 'Tra', 'Pá', 'Châu']
for n in names:
    full_text = re.sub(rf'\b({n})([a-zà-ỹ])', r'\1 \2', full_text)
    full_text = re.sub(rf'([a-zà-ỹ])({n})\b', r'\1 \2', full_text)

# Step 3: Specific initial-only consonants: th, tr, ph, kh, qu, ngh
initial_only = ['ngh', 'th', 'tr', 'ph', 'kh', 'qu']
for init in initial_only:
    # Match any vowel with tone or diphthong ending vowel followed by init
    full_text = re.sub(rf'([áàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵắằẳẵặấầẩẫậếềểễệốồổỗộứừửữựớờởỡợươêôâă])({init}[a-zà-ỹ]+)', r'\1 \2', full_text, flags=re.IGNORECASE)

# Step 4: Non-final consonants: b, d, đ, g, h, k, l, r, s, v, x
never_final = ['b', 'd', 'đ', 'g', 'h', 'k', 'l', 'r', 's', 'v', 'x']
for nf in never_final:
    full_text = re.sub(rf'([áàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵắằẳẵặấầẩẫậếềểễệốồổỗộứừửữựớờởỡợươêôâă])({nf}[a-zà-ỹ]+)', r'\1 \2', full_text, flags=re.IGNORECASE)

# Step 5: Common glued words
common_fixes = [
    ('trảmột', 'trả một'), ('cảcho', 'cả cho'), ('đổra', 'đổ ra'), ('chỉcó', 'chỉ có'),
    ('chỉcòn', 'chỉ còn'), ('cứthế', 'cứ thế'), ('ởtrừnợ', 'ở trừ nợ'), ('ởvới', 'ở với'),
    ('chứkhông', 'chứ không'), ('nhớlại', 'nhớ lại'), ('thổiúng', 'thổi cũng'), ('đứnglên', 'đứng lên'),
    ('bốcon', 'bố con'), ('đếnnỗi', 'đến nỗi'), ('đổvào', 'đổ vào'), ('đổxuống', 'đổ xuống'),
    ('cảđêm', 'cả đêm'), ('cảnhà', 'cả nhà'), ('cảtiền', 'cả tiền'), ('cứnhư', 'cứ như'),
    ('cứmỗi', 'cứ mỗi'), ('chỉbiết', 'chỉ biết'), ('chỉthì', 'chỉ thì'), ('chỉnghe', 'chỉ nghe'),
    ('khổsở', 'khổ sở'), ('sổlỗ', 'sổ lỗ'), ('trởvề', 'trở về'), ('họkhiêng', 'họ khiêng'),
    ('họtản', 'họ tản'), ('họvề', 'họ về'), ('hổgấu', 'hổ gấu'), ('rồinói', 'rồi nói'),
    ('mởtráp', 'mở tráp'), ('xửmày', 'xử mày'), ('thếlà', 'thế là'), ('bắtmất', 'bắt mất'),
    ('đầyngựa', 'đầy ngựa'), ('đầylưng', 'đầy lưng'), ('chỗkia', 'chỗ kia'), ('chỗnào', 'chỗ nào'),
    ('chếtngay', 'chết ngay'), ('chếthéo', 'chết héo'), ('khépbuồng', 'khép buồng'),
    ('cũngkhông', 'cũng không'), ('cũngđến', 'cũng đến'), ('cũngphải', 'cũng phải'),
    ('lẽquờ', 'lẽ quờ'), ('lẽnào', 'lẽ nào'), ('chỉbọn', 'chỉ bọn'), ('chỉđêm', 'chỉ đêm'),
    ('chỉriêng', 'chỉ riêng'), ('cổtay', 'cổ tay'), ('thởphò', 'thở phò'), ('thởphè', 'thở phè'),
    ('trừngmắt', 'trừng mắt'), ('quỳchịu', 'quỳ chịu'), ('thịsống', 'thị sống'),
    ('bốmẹ', 'bố mẹ'), ('chịvợ', 'chị vợ'), ('chủnợ', 'chủ nợ'), ('đầuđũa', 'đầu đũa')
]

for old, new in common_fixes:
    full_text = re.sub(rf'\b{old}\b', new, full_text, flags=re.IGNORECASE)

with open('scratch/vo_chong_a_phu_cleaned.txt', 'w', encoding='utf-8') as f:
    f.write(full_text)

print("Saved cleaned text to scratch/vo_chong_a_phu_cleaned.txt")
