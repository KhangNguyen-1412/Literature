import fitz
import re

doc = fitz.open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_ngoai_xa.pdf')

pages = []
for p in range(3, 24):
    lines = [l.strip() for l in doc[p].get_text().split('\n') if l.strip()]
    clean = []
    for l in lines:
        if l == 'CHIẾC THUYỀN NGOÀI XA.' and p == 3: continue
        if 'Chiếc Thuyền Ngoài Xa' in l and 'Nguyễn Minh Châu' in l: continue
        if l.isdigit(): continue
        if 'Powered by TCPDF' in l: continue
        clean.append(l)
    pages.append('\n'.join(clean))

raw_text = '\n\n'.join(pages)

# List of all known glued words in Chiếc Thuyền Ngoài Xa
fixes = [
    ('Chỉcó', 'Chỉ có'), ('Chỉmấy', 'Chỉ mấy'), ('Chịcám', 'Chị cám'), ('Chịcứngồi', 'Chị cứ ngồi'),
    ('Chịngồi', 'Chị ngồi'), ('Cảnước', 'Cả nước'), ('Cảhai', 'Cả hai'), ('Mụbước', 'Mụ bước'),
    ('Mụnhấp', 'Mụ nhấp'), ('Mụrỗmặt', 'Mụ rỗ mặt'), ('Mụcho', 'Mụ cho'), ('Mụđưa', 'Mụ đưa'),
    ('Sốmủng', 'Số mủng'), ('Thếnào', 'Thế nào'), ('Thếrồi', 'Thế rồi'), ('Từchỗchiếc', 'Từ chỗ chiếc'),
    ('Từngày', 'Từ ngày'), ('Từnhỏtuổi', 'Từ nhỏ tuổi'), ('Tựnhiên', 'Tự nhiên'), ('bềngoài', 'bề ngoài'),
    ('bịgió', 'bị gió'), ('bịhút', 'bị hút'), ('bịép', 'bị ép'), ('bỏchạy', 'bỏ chạy'),
    ('bỏcái', 'bỏ cái'), ('bỏnghềđược', 'bỏ nghề được'), ('bỏnó', 'bỏ nó'), ('bốcục', 'bố cục'),
    ('bốmình', 'bố mình'), ('bốmẹnó', 'bố mẹ nó'), ('bốmẹ', 'bố mẹ'), ('bốnó', 'bố nó'),
    ('bốvới', 'bố với'), ('bộquần', 'bộ quần'), ('bộvào', 'bộ vào'), ('bờbiển', 'bờ biển'),
    ('bờcát', 'bờ cát'), ('bờcũng', 'bờ cũng'), ('bờphá', 'bờ phá'), ('bờđểtrú', 'bờ để trú'),
    ('chảkhác', 'chả khác'), ('chỉchiếc', 'chỉ chiếc'), ('chỉcòn', 'chỉ còn'), ('chỉcó', 'chỉ có'),
    ('chỉthấy', 'chỉ thấy'), ('chịcũng', 'chị cũng'), ('chịkhông', 'chị không'), ('chịta', 'chị ta'),
    ('chủtrương', 'chủ trương'), ('chứkhông', 'chứ không'), ('chỗchiếc', 'chỗ chiếc'), ('chỗcũ', 'chỗ cũ'),
    ('chỗtôi', 'chỗ tôi'), ('cảmột', 'cả một'), ('cảnhững', 'cả những'), ('cảvùng', 'cả vùng'),
    ('cổkính', 'cổ kính'), ('cổlỗ', 'cổ lỗ'), ('cứmỗi', 'cứ mỗi'), ('cứnhư', 'cứ như'),
    ('cứthế', 'cứ thế'), ('dễthương', 'dễ thương'), ('giảiđược', 'giải được'), ('giảiđặt', 'giải đặt'),
    ('giờcũng', 'giờ cũng'), ('giờhọcũng', 'giờ họ cũng'), ('giờđểlộrõ', 'giờ để lộ rõ'),
    ('giỡgỗxuống', 'giỡ gỗ xuống'), ('kểlểbằng', 'kể lể bằng'), ('nghệthuật', 'nghệ thuật'),
    ('vềnghệthuật', 'về nghệ thuật'), ('phốhuyện', 'phố huyện'), ('phốkhông', 'phố không'),
    ('thểtưởng', 'thể tưởng'), ('quảquyết', 'quả quyết'), ('tựnguyện', 'tự nguyện'),
    ('trởvềthăm', 'trở về thăm'), ('trởvềngồi', 'trở về ngồi'), ('trởvềvới', 'trở về với'),
    ('đểtrởvềthuyền', 'để trở về thuyền'), ('thợxưởng', 'thợ xưởng'), ('ngủchung', 'ngủ chung'),
    ('đềvềthuyền', 'đề về thuyền'), ('vềđến', 'về đến'), ('vợchồng', 'vợ chồng'), ('ởnhà', 'ở nhà'),
    ('thếnào', 'thế nào'), ('trởlại', 'trở lại'), ('từrốn', 'từ rốn'), ('phủvà', 'phủ và'),
    ('rủxuống', 'rủ xuống'), ('Họđi', 'Họ đi'), ('thực tếhắn', 'thực tế hắn'),
    ('chỉcần', 'chỉ cần'), ('đặc tảnhững', 'đặc tả những'), ('ngư phủcùng', 'ngư phủ cùng'),
    ('tựthách', 'tự thách'), ('Có lẽtrước', 'Có lẽ trước'), ('sựhấp', 'sự hấp'),
    ('Ngay chỗbãi', 'Ngay chỗ bãi'), ('nhảy xổvào', 'nhảy xổ vào'), ('buông đứa trẻra', 'buông đứa trẻ ra'),
    ('đứa trẻđộc', 'đứa trẻ độc'), ('lưng ghếngười', 'lưng ghế người'), ('trởnên', 'trở nên'),
    ('bềngoài', 'bề ngoài'), ('vịchánh', 'vị chánh'), ('vềđan', 'về đan'),
    ('thởdài', 'thở dài'), ('ởdưới', 'ở dưới'), ('chỗtôi', 'chỗ tôi')
]

for old, new in fixes:
    raw_text = re.sub(rf'\b{old}\b', new, raw_text)

# Also check regex for lowercase followed by uppercase
raw_text = re.sub(r'([a-zà-ỹ])([A-ZÀ-Ỹ])', r'\1 \2', raw_text)

print("Cleaned text preview:")
print(raw_text[:400])

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_cleaned.txt', 'w', encoding='utf-8') as f:
    f.write(raw_text)

print("Saved scratch/chiec_thuyen_cleaned.txt successfully!")
