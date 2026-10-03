import fitz
import re

doc = fitz.open('scratch/vo_chong_a_phu.pdf')

pages = []
for p in range(3, 22):
    lines = [l.strip() for l in doc[p].get_text().split('\n') if l.strip()]
    clean = []
    for l in lines:
        if l == 'VỢ CHỒNG A PHỦ' and p == 3: continue
        if 'Vợ Chồng A Phủ' in l and 'Tô Hoài' in l: continue
        if l.isdigit(): continue
        if 'Powered by TCPDF' in l: continue
        clean.append(l)
    pages.append('\n'.join(clean))

raw_text = '\n\n'.join(pages)

# Fix glued words
glued_dict = {
    'ởxa': 'ở xa',
    'cỏngựa': 'cỏ ngựa',
    'chẻcủi': 'chẻ củi',
    'vềbán': 'về bán',
    'vềcúng': 'về cúng',
    'cảcho': 'cả cho',
    'trảmột': 'trả một',
    'đổra': 'đổ ra',
    'ởtrừnợ': 'ở trừ nợ',
    'chứkhông': 'chứ không',
    'nhớlại': 'nhớ lại',
    'thổiúng': 'thổi cũng',
    'đứnglên': 'đứng lên',
    'Mỵsẽăn': 'Mỵ sẽ ăn',
    'bốcon': 'bố con',
    'Họchuyền': 'Họ chuyền',
    'Mỵđứng': 'Mỵ đứng',
    'Mỵthấy': 'Mỵ thấy',
    'Mỵnghe': 'Mỵ nghe',
    'Mỵnhớ': 'Mỵ nhớ',
    'Mỵchỉ': 'Mỵ chỉ',
    'Mỵvề': 'Mỵ về',
    'Mỵlại': 'Mỵ lại',
    'Mỵcũng': 'Mỵ cũng',
    'Mỵdậy': 'Mỵ dậy',
    'Phủcứ': 'Phủ cứ',
    'Phủđương': 'Phủ đương',
    'Phủtrừng': 'Phủ trừng',
    'Phủthởphè': 'Phủ thở phè',
    'thịsống': 'thị sống',
    'bốMỵ': 'bố Mỵ',
    'Sửthắt': 'Sử thắt',
    'Hổgấu': 'Hổ gấu',
    'khổsở': 'khổ sở',
    'sổlỗ': 'sổ lỗ',
    'cổtay': 'cổ tay'
}

for k, v in glued_dict.items():
    raw_text = raw_text.replace(k, v)

# Split into paragraphs
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

# Footnotes mapping
footnotes = {
    "thống lý": "Chức quan cai quản làng bản người Mông thời phong kiến thực dân, nắm cả thần quyền lẫn bạo quyền.",
    "cúng trình ma": "Hủ tục ràng buộc tâm linh người phụ nữ Mông khi đã bị đem về cúng ma nhà chồng thì suốt đời chỉ là con ma nhà ấy.",
    "lá ngón": "Thứ cây có chất độc kịch phát ở vùng núi rừng phía Bắc, ăn vào đứt ruột chết ngay trong chốc lát.",
    "bạc hoa xòe": "Đồng bạc Đông Dương do Pháp đúc, mặt sau có hình tượng Nữ thần Tự do xòe váy xòe quạt rất có giá trị.",
    "dây mây": "Thứ dây leo rừng cực kỳ dai chắc, khi dùng trói người càng giãy giụa thì càng thít chặt rách thịt."
}

def embed_footnotes(p_text):
    for term, note in footnotes.items():
        escaped_note = note.replace('"', '&quot;')
        span = f'{term}<span class="footnote-ref" data-note="{term}: {escaped_note}">*</span>'
        p_text = re.sub(rf'\b{term}\b', span, p_text, count=1, flags=re.IGNORECASE)
    return p_text

# Define 5 chapters
chapters = [
    (0, "Hồi I: Thân Phận Con Dâu Gạt Nợ Nơi Nhà Thống Lý Pá Tra"),
    ("Hồng Ngài năm ấy ăn Tết", "Hồi II: Sức Sống Tiềm Tàng Trong Đêm Tình Mùa Xuân (Trọng Tâm SGK)"),
    ("chuyện A Sử đi chơi bị đánh vỡ đầu", "Hồi III: Cuộc Xử Kiện Quái Đản & A Phủ Trở Thành Đầy Tớ Trừ Nợ"),
    ("Những đêm mùa đông trên núi cao", "Hồi IV: Đêm Đông Cởi Trói & Vượt Thoát Khỏi Hồng Ngài (Trọng Tâm SGK)"),
    ("Hai người đi ròng rã hơn một tháng", "Hồi V: Đến Phiềng Sa & Giác Ngộ Ánh Sáng Cách Mạng")
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

html_parts = []
html_parts.append('''
<div class="reader-fulltext-banner">
  <span class="reader-fulltext-tag">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    Toàn Văn Kiệt Tác Vợ Chồng A Phủ (Tô Hoài)
  </span>
  <a href="#sgk-dem-tinh" class="reader-jump-sgk-btn">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    Đến đoạn: Đêm tình mùa xuân & Cởi trói cho A Phủ (SGK 12)
  </a>
</div>
''')

for i, p in enumerate(reconstructed_paras):
    if i in chap_map:
        title = chap_map[i]
        if "Đêm Tình Mùa Xuân" in title:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-dem-tinh">{title}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 12)
    </span>
    <span class="sgk-meta">Văn bản: Vợ Chồng A Phủ • Tô Hoài (Phân đoạn đêm tình mùa xuân)</span>
  </div>
  <p class="sgk-notice-desc">Nghệ thuật miêu tả tâm lý bậc thầy của Tô Hoài: Tiếng sáo gọi bạn tình đã đánh thức sức sống tiềm tàng và khát vọng tự do mãnh liệt bị vùi dập bấy lâu trong tâm hồn Mị.</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/vochongaphu_dem_tinh.png" alt="Mị nghe tiếng sáo gọi bạn tình trong đêm mùa xuân" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Tiếng sáo mùa xuân đánh thức khát vọng tình yêu và tự do trong tâm hồn Mị</span>
  </div>
</div>
''')
        elif "Đêm Đông Cởi Trói" in title:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-coi-troi">{title}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Đoạn Cao Trào Sách Giáo Khoa (SGK Ngữ Văn 12)
    </span>
    <span class="sgk-meta">Văn bản: Vợ Chồng A Phủ • Phân cảnh cởi trói & giải thoát</span>
  </div>
  <p class="sgk-notice-desc">Hành động quật khởi phi thường: Từ lòng thương mình đến lòng thương người cùng cảnh ngộ, Mị đã dũng cảm cắt đứt sợi dây mây oan nghiệt, đạp đổ cường quyền để tự giải phóng cuộc đời mình.</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/vochongaphu_coi_troi.png" alt="Mị cắt dây trói giải thoát cho A Phủ trong đêm đông" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Mị rút dao cắt nút dây mây cởi trói cứu A Phủ trong đêm đông Hồng Ngài</span>
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
  <span>[ Kết thúc toàn văn truyện ngắn Vợ Chồng A Phủ • Tô Hoài ]</span>
</div>
''')

full_html = '\n'.join(html_parts)
print(f"Generated clean HTML: {len(full_html)} chars, {len(reconstructed_paras)} paragraphs.")

with open('scratch/vo_chong_a_phu_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Saved to scratch/vo_chong_a_phu_formatted.html")
