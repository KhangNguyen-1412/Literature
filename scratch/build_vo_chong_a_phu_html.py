import re

with open('scratch/vo_chong_a_phu_cleaned.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's split into paragraphs by line breaks and group natural paragraphs
raw_lines = [l.strip() for l in text.split('\n') if l.strip()]

paragraphs = []
curr = ""
for l in raw_lines:
    if not curr:
        curr = l
    else:
        if l.startswith('-') or l.startswith('—') or (re.search(r'[.?!…:;”"]$', curr) and len(curr) > 50 and (l[0].isupper() or l.startswith('"'))):
            paragraphs.append(curr)
            curr = l
        else:
            curr += " " + l
if curr:
    paragraphs.append(curr)

print(f"Total reconstructed paragraphs: {len(paragraphs)}")

# Add footnotes to terms
footnotes = {
    "thống lý": "Chức quan cai quản làng bản người H'Mông thời phong kiến thực dân, nắm cả thần quyền lẫn bạo quyền.",
    "cúng trình ma": "Hủ tục ràng buộc tâm linh người phụ nữ Mông khi đã bị đem về cúng ma nhà chồng thì suốt đời chỉ là con ma nhà ấy.",
    "lá ngón": "Thứ cây có chất độc kịch phát ở vùng núi rừng phía Bắc, ăn vào đứt ruột chết ngay trong chốc lát.",
    "bạc hoa xòe": "Đồng bạc Đông Dương do Pháp đúc, mặt sau có hình tượng Nữ thần Tự do xòe váy xòe quạt rất có giá trị.",
    "dây mây": "Thứ dây leo rừng cực kỳ dai chắc, khi dùng trói người càng giãy giụa thì càng thít chặt rách thịt."
}

def embed_footnotes(p_text):
    for term, note in footnotes.items():
        escaped_note = note.replace('"', '&quot;')
        span = f'{term}<span class="footnote-ref" data-note="{term}: {escaped_note}">*</span>'
        # replace first occurrence only
        p_text = re.sub(rf'\b{term}\b', span, p_text, count=1, flags=re.IGNORECASE)
    return p_text

# Chapter markers
chapters = [
    (0, "Hồi I: Thân Phận Con Dâu Gạt Nợ Nơi Nhà Thống Lý Pá Tra"),
    ("Hồng Ngài năm ấy ăn Tết", "Hồi II: Sức Sống Tiềm Tàng Trỗi Dậy Trong Đêm Tình Mùa Xuân (Trọng Tâm SGK)"),
    ("Nửa đêm qua, A Sử vào làng", "Hồi III: Cuộc Xử Kiện Lạ Lùng & A Phủ Trở Thành Đầy Tớ Trừ Nợ"),
    ("Những đêm mùa đông trên núi cao", "Hồi IV: Đêm Đông Cởi Trói & Cuộc Vượt Thoát Khỏi Hồng Ngài (Trọng Tâm SGK)"),
    ("Hai người đi ròng rã hơn một tháng", "Hồi V: Đến Phiềng Sa & Giác Ngộ Ánh Sáng Cách Mạng")
]

chap_map = {}
for m, title in chapters:
    if isinstance(m, int):
        chap_map[m] = title
    else:
        for i, p in enumerate(paragraphs):
            if m.lower() in p.lower():
                chap_map[i] = title
                print(f"Mapped '{title}' to Para {i}")
                break

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

for i, p in enumerate(paragraphs):
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
    <span class="sgk-meta">Văn bản: Vợ Chồng A Phủ • Tô Hoài (Phân cảnh đêm tình mùa xuân)</span>
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
print(f"Generated Vo Chong A Phu HTML: {len(full_html)} chars, {len(paragraphs)} paragraphs, 5 chapters.")

with open('scratch/vo_chong_a_phu_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)
print("Saved to scratch/vo_chong_a_phu_formatted.html")
