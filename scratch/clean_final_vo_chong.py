import fitz
import re

doc = fitz.open('scratch/vo_chong_a_phu.pdf')

pages = []
for p in range(3, 22):
    t = doc[p].get_text()
    lines = [l.strip() for l in t.split('\n') if l.strip()]
    clean_lines = []
    for l in lines:
        if l == "VỢ CHỒNG A PHỦ" and p == 3: continue
        if "Vợ Chồng A Phủ" in l and "Tô Hoài" in l: continue
        if re.match(r'^\d+$', l): continue
        if "Powered by TCPDF" in l: continue
        clean_lines.append(l)
    pages.append(clean_lines)

raw_text = "\n".join(["\n".join(p) for p in pages])

# Lowercase followed by uppercase (bốMỵ -> bố Mỵ, Sửthắt -> Sử thắt, Phủđương -> Phủ đương)
clean = re.sub(r'([a-zà-ỹ])([A-ZÀ-Ỹ])', r'\1 \2', raw_text)

# Specific known merged words from this PDF
specific_fixes = [
    ('ởxa', 'ở xa'), ('cỏngựa', 'cỏ ngựa'), ('chẻcủi', 'chẻ củi'), ('vềbán', 'về bán'),
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
    ('bốmẹ', 'bố mẹ'), ('chịvợ', 'chị vợ'), ('chủnợ', 'chủ nợ'), ('đầuđũa', 'đầu đũa'),
    ('Mỵcứ', 'Mỵ cứ'), ('Mỵchỉ', 'Mỵ chỉ'), ('Mỵvề', 'Mỵ về'), ('Mỵlại', 'Mỵ lại'),
    ('Mỵnghe', 'Mỵ nghe'), ('Mỵthấy', 'Mỵ thấy'), ('Mỵnhớ', 'Mỵ nhớ'), ('Mỵcũng', 'Mỵ cũng'),
    ('Mỵkhông', 'Mỵ không'), ('Mỵchết', 'Mỵ chết'), ('Mỵdậy', 'Mỵ dậy'), ('Mỵsẽ', 'Mỵ sẽ'),
    ('Phủcứ', 'Phủ cứ'), ('Phủchỉ', 'Phủ chỉ'), ('Phủkhông', 'Phủ không'), ('Phủquỳ', 'Phủ quỳ'),
    ('Phủthở', 'Phủ thở'), ('Phủtrừng', 'Phủ trừng'), ('Sửbị', 'Sử bị'), ('Sửvào', 'Sử vào'),
    ('Sửngồi', 'Sử ngồi'), ('Sửthắt', 'Sử thắt'), ('Traquay', 'Tra quay'), ('Trađứng', 'Tra đứng'),
    ('PáTra', 'Pá Tra'), ('HồngNgài', 'Hồng Ngài'), ('PhiềngSa', 'Phiềng Sa')
]

for old, new in specific_fixes:
    clean = re.sub(rf'\b{old}\b', new, clean, flags=re.IGNORECASE)

print("Clean text sample:")
print(clean[:400])

with open('scratch/vo_chong_a_phu_clean_final.txt', 'w', encoding='utf-8') as f:
    f.write(clean)

print("Saved scratch/vo_chong_a_phu_clean_final.txt successfully!")
