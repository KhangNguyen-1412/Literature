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
# 1. Regex for common tone vowels followed by word
patterns = [
    (r'\bđểchuẩn\b', 'để chuẩn'),
    (r'\bbịcho\b', 'bị cho'),
    (r'\btỏý\b', 'tỏ ý'),
    (r'\btừtrước\b', 'từ trước'),
    (r'\bsẽđem\b', 'sẽ đem'),
    (r'\bChỉcó\b', 'Chỉ có'),
    (r'\bChỉmấy\b', 'Chỉ mấy'),
    (r'\bChịcám\b', 'Chị cám'),
    (r'\bChịcứngồi\b', 'Chị cứ ngồi'),
    (r'\bChịngồi\b', 'Chị ngồi'),
    (r'\bCảnước\b', 'Cả nước'),
    (r'\bCảhai\b', 'Cả hai'),
    (r'\bMụbước\b', 'Mụ bước'),
    (r'\bMụnhấp\b', 'Mụ nhấp'),
    (r'\bMụrỗmặt\b', 'Mụ rỗ mặt'),
    (r'\bMụcho\b', 'Mụ cho'),
    (r'\bMụđưa\b', 'Mụ đưa'),
    (r'\bSốmủng\b', 'Số mủng'),
    (r'\bThếnào\b', 'Thế nào'),
    (r'\bThếrồi\b', 'Thế rồi'),
    (r'\bTừchỗchiếc\b', 'Từ chỗ chiếc'),
    (r'\bTừngày\b', 'Từ ngày'),
    (r'\bTừnhỏtuổi\b', 'Từ nhỏ tuổi'),
    (r'\bTựnhiên\b', 'Tự nhiên'),
    (r'\bbềngoài\b', 'bề ngoài'),
    (r'\bbịgió\b', 'bị gió'),
    (r'\bbịhút\b', 'bị hút'),
    (r'\bbịép\b', 'bị ép'),
    (r'\bbỏchạy\b', 'bỏ chạy'),
    (r'\bbỏcái\b', 'bỏ cái'),
    (r'\bbỏnghềđược\b', 'bỏ nghề được'),
    (r'\bbỏnó\b', 'bỏ nó'),
    (r'\bbốcục\b', 'bố cục'),
    (r'\bbốmình\b', 'bố mình'),
    (r'\bbốmẹnó\b', 'bố mẹ nó'),
    (r'\bbốmẹ\b', 'bố mẹ'),
    (r'\bbốnó\b', 'bố nó'),
    (r'\bbốvới\b', 'bố với'),
    (r'\bbộquần\b', 'bộ quần'),
    (r'\bbộvào\b', 'bộ vào'),
    (r'\bbờbiển\b', 'bờ biển'),
    (r'\bbờcát\b', 'bờ cát'),
    (r'\bbờcũng\b', 'bờ cũng'),
    (r'\bbờphá\b', 'bờ phá'),
    (r'\bbờđểtrú\b', 'bờ để trú'),
    (r'\bchảkhác\b', 'chả khác'),
    (r'\bchỉchiếc\b', 'chỉ chiếc'),
    (r'\bchỉcòn\b', 'chỉ còn'),
    (r'\bchỉcó\b', 'chỉ có'),
    (r'\bchỉthấy\b', 'chỉ thấy'),
    (r'\bchịcũng\b', 'chị cũng'),
    (r'\bchịkhông\b', 'chị không'),
    (r'\bchịta\b', 'chị ta'),
    (r'\bchủtrương\b', 'chủ trương'),
    (r'\bchứkhông\b', 'chứ không'),
    (r'\bchỗchiếc\b', 'chỗ chiếc'),
    (r'\bchỗcũ\b', 'chỗ cũ'),
    (r'\bchỗtôi\b', 'chỗ tôi'),
    (r'\bcảmột\b', 'cả một'),
    (r'\bcảnhững\b', 'cả những'),
    (r'\bcảvùng\b', 'cả vùng'),
    (r'\bcổkính\b', 'cổ kính'),
    (r'\bcổlỗ\b', 'cổ lỗ'),
    (r'\bcứmỗi\b', 'cứ mỗi'),
    (r'\bcứnhư\b', 'cứ như'),
    (r'\bcứthế\b', 'cứ thế'),
    (r'\bdễthương\b', 'dễ thương'),
    (r'\bgiảiđược\b', 'giải được'),
    (r'\bgiảiđặt\b', 'giải đặt'),
    (r'\bgiờcũng\b', 'giờ cũng'),
    (r'\bgiờhọcũng\b', 'giờ họ cũng'),
    (r'\bgiờđểlộrõ\b', 'giờ để lộ rõ'),
    (r'\bgiỡgỗxuống\b', 'giỡ gỗ xuống'),
    (r'\bkểlểbằng\b', 'kể lể bằng'),
    (r'\bnghệthuật\b', 'nghệ thuật'),
    (r'\bvềnghệthuật\b', 'về nghệ thuật'),
    (r'\bphốhuyện\b', 'phố huyện'),
    (r'\bphốkhông\b', 'phố không'),
    (r'\bthểtưởng\b', 'thể tưởng'),
    (r'\bquảquyết\b', 'quả quyết'),
    (r'\btựnguyện\b', 'tự nguyện'),
    (r'\btrởvềthăm\b', 'trở về thăm'),
    (r'\btrởvềngồi\b', 'trở về ngồi'),
    (r'\btrởvềvới\b', 'trở về với'),
    (r'\bđểtrởvềthuyền\b', 'để trở về thuyền'),
    (r'\bthợxưởng\b', 'thợ xưởng'),
    (r'\bngủchung\b', 'ngủ chung'),
    (r'\bđềvềthuyền\b', 'đề về thuyền'),
    (r'\bvềđến\b', 'về đến'),
    (r'\bvợchồng\b', 'vợ chồng'),
    (r'\bởnhà\b', 'ở nhà'),
    (r'\bthếnào\b', 'thế nào'),
    (r'\btrởlại\b', 'trở lại'),
    (r'\btừrốn\b', 'từ rốn'),
    (r'\bphủvà\b', 'phủ và'),
    (r'\brủxuống\b', 'rủ xuống'),
    (r'\bHọđi\b', 'Họ đi'),
    (r'\bthực tếhắn\b', 'thực tế hắn'),
    (r'\bchỉcần\b', 'chỉ cần'),
    (r'\bđặc tảnhững\b', 'đặc tả những'),
    (r'\bngư phủcùng\b', 'ngư phủ cùng'),
    (r'\btựthách\b', 'tự thách'),
    (r'\bCó lẽtrước\b', 'Có lẽ trước'),
    (r'\bsựhấp\b', 'sự hấp'),
    (r'\bNgay chỗbãi\b', 'Ngay chỗ bãi'),
    (r'\bnhảy xổvào\b', 'nhảy xổ vào'),
    (r'\bbuông đứa trẻra\b', 'buông đứa trẻ ra'),
    (r'\bđứa trẻđộc\b', 'đứa trẻ độc'),
    (r'\blưng ghếngười\b', 'lưng ghế người'),
    (r'\btrởnên\b', 'trở nên'),
    (r'\bvịchánh\b', 'vị chánh'),
    (r'\bvềđan\b', 'về đan'),
    (r'\bthởdài\b', 'thở dài'),
    (r'\bởdưới\b', 'ở dưới'),
    (r'\bnhư đứatrẻ\b', 'như đứa trẻ'),
    (r'\bchúavùng\b', 'chúa vùng'),
    (r'\bđểchuẩn bịcho\b', 'để chuẩn bị cho'),
    (r'\bbước vàomùa\b', 'bước vào mùa'),
    (r'\bcứtháng\b', 'cữ tháng'),
    (r'\bmỗi gia đình\b', 'mỗi gia đình'),
    (r'\bthực tếhắn ta\b', 'thực tế hắn ta')
]

for pat, repl in patterns:
    raw_text = re.sub(pat, repl, raw_text, flags=re.IGNORECASE)

# Split into natural paragraphs
paras = [p.strip() for p in raw_text.split('\n\n') if p.strip()]

# Reconnect broken line wraps within paragraphs
clean_paras = []
for p in paras:
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    joined = ""
    for l in lines:
        if not joined:
            joined = l
        elif joined.endswith('-'):
            joined = joined[:-1] + l
        elif l.startswith('-') or l.startswith('—'):
            clean_paras.append(joined)
            joined = l
        else:
            joined += " " + l
    if joined:
        clean_paras.append(joined)

print(f"Total reconstructed paragraphs: {len(clean_paras)}")

# Define chapters for Chiếc Thuyền Ngoài Xa
chapters = [
    (0, "Hồi I: Chuyến Đi Thực Tế & Bức Tranh Cảnh Đắt Trời Cho (Trọng Tâm SGK)"),
    ("Hai người đi qua trước chỗ tôi đứng", "Hồi II: Nghịch Lý Phía Sau Chiếc Thuyền & Cảnh Bạo Lực Gia Đình"),
    ("Vài ngày sau, những vết thương của tôi đã đỡ", "Hồi III: Câu Chuyện Người Đàn Bà Hàng Chài Nơi Tòa Án Huyện (Trọng Tâm SGK)"),
    ("Không những trong bộ lịch năm ấy", "Hồi IV: Tấm Ảnh Được Chọn & Chiều Sâu Triết Lý Nhân Sinh (Đoạn Kết)")
]

chap_map = {}
for m, title in chapters:
    if isinstance(m, int):
        chap_map[m] = title
    else:
        found = False
        for i, p in enumerate(clean_paras):
            if m.lower() in p.lower():
                chap_map[i] = title
                found = True
                print(f"Mapped '{title}' to Para {i}")
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

for i, p in enumerate(clean_paras):
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
  <p class="sgk-notice-desc">Phát hiện vẻ đẹp toàn bích của thiên nhiên: Một bức tranh mực tàu của danh họa thời cổ, mũi thuyền in nét mơ hồ vào bầu sương mù màu trắng sữa pha ánh hồng mai, đem lại niềm xúc động thanh lọc tâm hồn.</p>
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
  <p class="sgk-notice-desc">Bài học sâu sắc về cuộc đời và nghệ thuật: Đằng sau vẻ thô kệch, cam chịu là tấm lòng thấu hiểu lẽ đời, tình mẫu tử thiêng liêng cao cả, khiến nghệ sĩ Phùng và chánh án Đẩu phải nhìn nhận lại cuộc sống đa chiều.</p>
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
print(f"Generated Chiếc Thuyền Ngoài Xa HTML: {len(full_html)} chars, {len(clean_paras)} paragraphs, 4 chapters.")

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Saved to scratch/chiec_thuyen_formatted.html successfully!")
