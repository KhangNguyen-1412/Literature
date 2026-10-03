import re

with open('scratch/tat_den_full.txt', 'r', encoding='utf-8') as f:
    paras = [p.strip() for p in f.read().split('\n\n') if p.strip()]

print(f"Loaded {len(paras)} paragraphs.")

chapters = [
    (0, "Hồi I: Cổng Làng Chưa Mở Nơi Điếm Tuần"),
    (7, "Hồi II: Đòn Roi Sưu Thuế & Tiếng Trống Thúc"),
    (141, "Hồi III: Căn Nhà Tranh Nghèo & Món Nợ Cùng Đinh"),
    (179, "Hồi IV: Nỗi Đau Dứt Ruột Bán Chó Bán Con"),
    (238, "Hồi V: Sang Dinh Cơ Nghị Quế Thôn Đoài"),
    (597, "Hồi VI: Thói Keo Bẩn Của Bọn Phú Hào"),
    (620, "Hồi VII: Bữa Cơm Nguội Đầy Nước Mắt"),
    (633, "Hồi VIII: Điểm Chỉ Bán Con Ở Đầu Dải Yếm"),
    (823, "Hồi IX: Tiếng Khóc Xé Lòng Của Cái Tí"),
    (860, "Hồi X: Suất Sưu Của Người Đã Khuất"),
    (927, "Hồi XI: Bát Cháo Nghĩa Tình Hàng Xóm"),
    (940, "Hồi XII: Tức Nước Vỡ Bờ (Trọng Tâm SGK Lớp 8)"),
    (1014, "Hồi XIII: Đòn Roi Đình Làng & Giải Lên Phủ"),
    (1094, "Hồi XIV: Quan Lớn Về Làng Đốc Sưu"),
    (1174, "Hồi XV: Nước Mắt Trước Khi Lên Công Đường"),
    (1254, "Hồi XVI: Cửa Nha Môn Phủ Huyện"),
    (1334, "Hồi XVII: Mặt Thật Của Quan Tri Phủ Tư Thất"),
    (1414, "Hồi XVIII: Lối Thoát Khắc Khoải Giữa Đêm Tối")
]

chap_map = dict(chapters)

html_parts = []
html_parts.append('''
<div class="reader-fulltext-banner">
  <span class="reader-fulltext-tag">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    Toàn Văn Kiệt Tác Tiểu Thuyết Tắt Đèn (Ngô Tất Tố)
  </span>
  <a href="#sgk-tuc-nuoc-vo-bo" class="reader-jump-sgk-btn">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    Đến đoạn trích: Tức nước vỡ bờ (SGK Lớp 8)
  </a>
</div>
''')

for i, p in enumerate(paras):
    if i in chap_map:
        title = chap_map[i]
        if "Tức Nước Vỡ Bờ" in title:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-tuc-nuoc-vo-bo">{title}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 8)
    </span>
    <span class="sgk-meta">Văn bản: Tức nước vỡ bờ • Trích Tắt Đèn (Chương XII / XVIII)</span>
  </div>
  <p class="sgk-notice-desc">Nghệ thuật xây dựng tình huống kịch tính và miêu tả tâm lý bậc thầy của Ngô Tất Tố: Sức phản kháng mãnh liệt, quật khởi của người phụ nữ nông dân lương thiện khi bị đẩy đến bước đường cùng.</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/tatden_cover.png" alt="Chị Dậu quật ngã cai lệ để bảo vệ chồng" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Chị Dậu nghiến hai hàm răng túm cổ cai lệ ấn dúi ra cửa</span>
  </div>
</div>
''')
        else:
            html_parts.append(f'\n<h3 class="reader-chapter-title">{title}</h3>\n')
    
    # Format dialogue dashes
    formatted_p = re.sub(r'^[ \t]*[-–—][ \t]*', '— ', p)
    html_parts.append(f'<p>{formatted_p}</p>')

html_parts.append('''
<div class="sgk-end-marker">
  <span>[ Kết thúc toàn văn tiểu thuyết Tắt Đèn • Ngô Tất Tố ]</span>
</div>
''')

full_html = '\n'.join(html_parts)
print(f"Generated clean HTML with {len(full_html)} chars across {len(chapters)} chapters.")

with open('scratch/tat_den_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)
print("Saved to scratch/tat_den_formatted.html")
