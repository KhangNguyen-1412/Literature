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
    pages.append('\n\n'.join(clean))

raw_text = '\n\n'.join(pages)

# Fix glued word patterns
replacements = [
    ('đểchuẩn', 'để chuẩn'),
    ('bịcho', 'bị cho'),
    ('tỏý', 'tỏ ý'),
    ('từtrước', 'từ trước'),
    ('sẽđem', 'sẽ đem'),
    ('Chỉcó', 'Chỉ có'),
    ('Chỉmấy', 'Chỉ mấy'),
    ('Chịcám', 'Chị cám'),
    ('Chịcứngồi', 'Chị cứ ngồi'),
    ('Chịngồi', 'Chị ngồi'),
    ('Cảnước', 'Cả nước'),
    ('Cảhai', 'Cả hai'),
    ('Mụbước', 'Mụ bước'),
    ('Mụnhấp', 'Mụ nhấp'),
    ('Mụrỗmặt', 'Mụ rỗ mặt'),
    ('Mụcho', 'Mụ cho'),
    ('Mụđưa', 'Mụ đưa'),
    ('mụkhông', 'mụ không'),
    ('mụgiơ', 'mụ giơ'),
    ('Sốmủng', 'Số mủng'),
    ('Thếnào', 'Thế nào'),
    ('Thếrồi', 'Thế rồi'),
    ('Từchỗchiếc', 'Từ chỗ chiếc'),
    ('Từngày', 'Từ ngày'),
    ('Từnhỏtuổi', 'Từ nhỏ tuổi'),
    ('Tựnhiên', 'Tự nhiên'),
    ('bềngoài', 'bề ngoài'),
    ('bịgió', 'bị gió'),
    ('bịhút', 'bị hút'),
    ('bịép', 'bị ép'),
    ('bỏchạy', 'bỏ chạy'),
    ('bỏcái', 'bỏ cái'),
    ('bỏnghềđược', 'bỏ nghề được'),
    ('bỏnó', 'bỏ nó'),
    ('bốcục', 'bố cục'),
    ('bốmình', 'bố mình'),
    ('bốmẹnó', 'bố mẹ nó'),
    ('bốmẹ', 'bố mẹ'),
    ('bốnó', 'bố nó'),
    ('bốvới', 'bố với'),
    ('bộquần', 'bộ quần'),
    ('bộvào', 'bộ vào'),
    ('bờbiển', 'bờ biển'),
    ('bờcát', 'bờ cát'),
    ('bờcũng', 'bờ cũng'),
    ('bờphá', 'bờ phá'),
    ('bờđểtrú', 'bờ để trú'),
    ('chảkhác', 'chả khác'),
    ('chỉchiếc', 'chỉ chiếc'),
    ('chỉcòn', 'chỉ còn'),
    ('chỉcó', 'chỉ có'),
    ('chỉthấy', 'chỉ thấy'),
    ('chịcũng', 'chị cũng'),
    ('chịkhông', 'chị không'),
    ('chịta', 'chị ta'),
    ('chủtrương', 'chủ trương'),
    ('chứkhông', 'chứ không'),
    ('chỗchiếc', 'chỗ chiếc'),
    ('chỗcũ', 'chỗ cũ'),
    ('chỗtôi', 'chỗ tôi'),
    ('cảmột', 'cả một'),
    ('cảnhững', 'cả những'),
    ('cảvùng', 'cả vùng'),
    ('cổkính', 'cổ kính'),
    ('cổlỗ', 'cổ lỗ'),
    ('cứmỗi', 'cứ mỗi'),
    ('cứnhư', 'cứ như'),
    ('cứthế', 'cứ thế'),
    ('dễthương', 'dễ thương'),
    ('giảiđược', 'giải được'),
    ('giảiđặt', 'giải đặt'),
    ('giờcũng', 'giờ cũng'),
    ('giờhọcũng', 'giờ họ cũng'),
    ('giờđểlộrõ', 'giờ để lộ rõ'),
    ('giỡgỗxuống', 'giỡ gỗ xuống'),
    ('kểlểbằng', 'kể lể bằng'),
    ('nghệthuật', 'nghệ thuật'),
    ('vềnghệthuật', 'về nghệ thuật'),
    ('phốhuyện', 'phố huyện'),
    ('phốkhông', 'phố không'),
    ('thểtưởng', 'thể tưởng'),
    ('quảquyết', 'quả quyết'),
    ('tựnguyện', 'tự nguyện'),
    ('trởvềthăm', 'trở về thăm'),
    ('trởvềngồi', 'trở về ngồi'),
    ('trởvềvới', 'trở về với'),
    ('đểtrởvềthuyền', 'để trở về thuyền'),
    ('thợxưởng', 'thợ xưởng'),
    ('ngủchung', 'ngủ chung'),
    ('đềvềthuyền', 'đề về thuyền'),
    ('vềđến', 'về đến'),
    ('vợchồng', 'vợ chồng'),
    ('ởnhà', 'ở nhà'),
    ('thếnào', 'thế nào'),
    ('trởlại', 'trở lại'),
    ('từrốn', 'từ rốn'),
    ('phủvà', 'phủ và'),
    ('rủxuống', 'rủ xuống'),
    ('Họđi', 'Họ đi'),
    ('thực tếhắn', 'thực tế hắn'),
    ('chỉcần', 'chỉ cần'),
    ('đặc tảnhững', 'đặc tả những'),
    ('ngư phủcùng', 'ngư phủ cùng'),
    ('tựthách', 'tự thách'),
    ('Có lẽtrước', 'Có lẽ trước'),
    ('sựhấp', 'sự hấp'),
    ('Ngay chỗbãi', 'Ngay chỗ bãi'),
    ('nhảy xổvào', 'nhảy xổ vào'),
    ('buông đứa trẻra', 'buông đứa trẻ ra'),
    ('đứa trẻđộc', 'đứa trẻ độc'),
    ('lưng ghếngười', 'lưng ghế người'),
    ('trởnên', 'trở nên'),
    ('trởlên', 'trở nên'),
    ('vịchánh', 'vị chánh'),
    ('vềđan', 'về đan'),
    ('thởdài', 'thở dài'),
    ('ởdưới', 'ở dưới'),
    ('chỗtôi', 'chỗ tôi'),
    ('rõ rệt ra bềngoài', 'rõ rệt ra bề ngoài'),
    ('vềtôi', 'về tôi'),
    ('vềsau', 'về sau'),
    ('ởnhiều nơi', 'ở nhiều nơi'),
    ('bấy giờtôi', 'bấy giờ tôi'),
    ('thếgian', 'thế gian'),
    ('tựvệ', 'tự vệ'),
    ('ghếnhư', 'ghế như'),
    ('vềnhà', 'về nhà'),
    ('vềthuyền', 'về thuyền')
]

for k, v in replacements:
    raw_text = raw_text.replace(k, v)

# Split into natural paragraphs
paragraphs = [p.strip() for p in raw_text.split('\n\n') if p.strip()]

# Reconnect broken line wraps within paragraphs
reconstructed_paras = []
for p in paragraphs:
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    joined_p = ""
    for l in lines:
        if not joined_p:
            joined_p = l
        elif joined_p.endswith('-'):
            joined_p = joined_p[:-1] + l
        elif l.startswith('-') or l.startswith('—'):
            reconstructed_paras.append(joined_p)
            joined_p = l
        else:
            joined_p += " " + l
    if joined_p:
        reconstructed_paras.append(joined_p)

print(f"Total reconstructed paragraphs: {len(reconstructed_paras)}")

# Milestones mapping
chapters = [
    (0, "Hồi I: Chuyến Đi Thực Tế & Bức Tranh Cảnh Đắt Trời Cho (Trọng Tâm SGK)"),
    ("thắt lưng của lính ngụy", "Hồi II: Nghịch Lý Phía Sau Chiếc Thuyền & Cảnh Bạo Lực Gia Đình"),
    ("Đẩu, anh bạn chiến đấu cũ", "Hồi III: Câu Chuyện Người Đàn Bà Hàng Chài Nơi Tòa Án Huyện (Trọng Tâm SGK)"),
    ("Không những trong bộ", "Hồi IV: Tấm Ảnh Được Chọn & Chiều Sâu Triết Lý Nhân Sinh (Đoạn Kết)")
]

chap_map = {}
for m, title in chapters:
    if isinstance(m, int):
        chap_map[m] = title
    else:
        found = False
        for i, p in enumerate(reconstructed_paras):
            if m.lower() in p.lower():
                chap_map[i] = title
                found = True
                print(f"Mapped chapter '{title}' to Para {i}")
                break
        if not found:
            print(f"ERROR: Milestone not found: {m}")

# Cultural / Literary Footnotes
footnotes = {
    "cảnh đắt trời cho": "Khoảnh khắc thị giác hoàn mỹ, hiếm gặp trong nghệ thuật nhiếp ảnh mà thiên nhiên ban tặng.",
    "mực tàu": "Chất liệu hội họa thủy mặc truyền thống phương Đông, gợi vẻ đẹp cổ điển, tĩnh lặng và thanh khiết.",
    "chánh án": "Người đứng đầu tòa án huyện, đại diện cho pháp luật và công lý nhưng thoạt đầu nhìn đời bằng sách vở, lý thuyết giáo điều.",
    "bả": "Chất keo chống thấm nước truyền thống quét lên nan tre hoặc dây đay khi đan lưới đánh cá trên biển."
}

def embed_footnotes(p_text):
    for term, note in footnotes.items():
        escaped_note = note.replace('"', '&quot;')
        span = f'{term}<span class="footnote-ref" data-note="{term}: {escaped_note}">*</span>'
        p_text = re.sub(rf'\b{term}\b', span, p_text, count=1, flags=re.IGNORECASE)
    return p_text

html_parts = []
html_parts.append('''
<div class="reader-fulltext-banner">
  <span class="reader-fulltext-tag">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    Toàn Văn Kiệt Tác Chiếc Thuyền Ngoài Xa (Nguyễn Minh Châu)
  </span>
  <a href="#sgk-canh-dat" class="reader-jump-sgk-btn">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    Đến đoạn: Cảnh đắt trời cho & Tòa án huyện (SGK 12)
  </a>
</div>
''')

for i, p in enumerate(reconstructed_paras):
    if i in chap_map:
        title = chap_map[i]
        if "Bức Tranh Cảnh Đắt Trời Cho" in title:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-canh-dat">{title}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 12)
    </span>
    <span class="sgk-meta">Văn bản: Chiếc Thuyền Ngoài Xa • Phát hiện thứ nhất của người nghệ sĩ</span>
  </div>
  <p class="sgk-notice-desc">Phát hiện vẻ đẹp toàn bích của thiên nhiên: Một bức tranh mực tàu của danh họa thời cổ, mũi thuyền in nét mơ hồ vào bầu sương mù màu trắng sữa pha ánh hồng mai, đem lại niềm xúc động thanh lọc tâm hồn ("Bản thân cái đẹp chính là đạo đức").</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/chiecthuyen_suong_som.png" alt="Chiếc thuyền ngoài xa trong sương sớm màu hồng ánh mai" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Cảnh đắt trời cho — Chiếc thuyền lưới vó ẩn hiện giữa biển sớm mờ sương</span>
  </div>
</div>
''')
        elif "Tòa Án Huyện" in title:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-toa-an">{title}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Đoạn Đối Thoại Trọng Tâm (SGK Ngữ Văn 12)
    </span>
    <span class="sgk-meta">Văn bản: Chiếc Thuyền Ngoài Xa • Người đàn bà hàng chài ở Tòa án huyện</span>
  </div>
  <p class="sgk-notice-desc">Bài học sâu sắc về cuộc đời và nghệ thuật: Đằng sau vẻ thô kệch, cam chịu là tấm lòng thấu hiểu lẽ đời, tình mẫu tử thiêng liêng cao cả, khiến nghệ sĩ Phùng và chánh án Đẩu phải thức tỉnh, nhìn nhận lại cuộc sống đa chiều sau chiến tranh.</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/chiecthuyen_toa_an.png" alt="Người đàn bà hàng chài giãi bày nơi tòa án huyện" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Người đàn bà hàng chài giãi bày lẽ sống trước chánh án Đẩu và nghệ sĩ Phùng</span>
  </div>
</div>
''')
        else:
            html_parts.append(f'\n<h3 class="reader-chapter-title">{title}</h3>\n')

    clean_p = embed_footnotes(p)
    clean_p = re.sub(r'^[ \t]*[-–—][ \t]*', '— ', clean_p)
    html_parts.append(f'<p>{clean_p}</p>')

html_parts.append('''
<div class="sgk-end-marker">
  <span>[ Kết thúc toàn văn truyện ngắn Chiếc Thuyền Ngoài Xa • Nguyễn Minh Châu ]</span>
</div>
''')

full_html = '\n'.join(html_parts)
print(f"Generated Chiếc Thuyền Ngoài Xa HTML: {len(full_html)} chars, {len(reconstructed_paras)} paragraphs, 4 chapters.")

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Saved to scratch/chiec_thuyen_formatted.html successfully!")
