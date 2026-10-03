import re

with open('scratch/vo_nhat_paras.txt', 'r', encoding='utf-8') as f:
    paras = [p.strip() for p in f.read().split('\n\n') if p.strip()]

footnotes = {
    1: "Lúc chạng vạng mặt người: lúc chiều muộn, nhìn không rõ mặt người.",
    2: "Ngụ cư: người quê ở nơi khác đến ngụ trú ngụ.",
    3: "Tàng: cũ, tàn tạ.",
    4: "Đội chiếu: Lấy cái chiếu, cuộn lại, buộc túm một đầu, chụp lấy đầu và cuộn quanh người mà đi để chống rét (nạn đói 1945).",
    5: "Còn mồ ma ông cụ Tứ: lúc cụ Tứ còn sống.",
    6: "Tư lự: suy nghĩ và lo lắng trầm ngâm.",
    7: "Chỉ tầm phơ tầm phào: chỉ nói chơi, nói đùa bông phèng.",
    8: "Thóc Liên đoàn: tổ chức chuyên thu mua thóc cho phát xít Nhật trước Cách mạng Tháng Tám 1945.",
    9: "Rích bố cu: tiền nhiều lắm (tiếng Pháp 'riche beaucoup' phát âm theo lối bình dân).",
    10: "Chợn: sợ hãi, e ngại.",
    11: "Đèo bòng: mang thêm, vướng bận thêm vào một cái gì khó gỡ ra được ('Vì cam cho quýt đèo bòng...').",
    12: "Tao đoạn này: thời buổi này, giai đoạn khốn khó hiểm nghèo này.",
    13: "Đốt đống rấm: đốt cháy âm ỉ (thường là một đống trấu) cốt có khói để xua bớt mùi tử khí.",
    14: "Hờ khóc: khóc to, vừa khóc vừa kể lể ai oán.",
    15: "Khươm mươi niên: rất lâu rồi, hàng mấy mươi năm.",
    16: "Cái ang nước: dụng cụ đựng nước bằng sành gốm, thân tròn, miệng rộng giống cái vại.",
    17: "Chỏng lỏn: nói năng đanh đá, xấc xược, cộc lốc; trái nghĩa với dịu dàng, lễ phép.",
    18: "Xăm xắn: mau mắn, hăng hái, nhanh nhẹn.",
    19: "Chè khoán: thứ chè nấu bằng đỗ xanh đãi sạch vỏ, nấu nhuyễn và đặc rồi xắt miếng (ở đây cụ Tứ nói đùa để chỉ nồi cháo cám)."
}

def embed_footnotes(text):
    for num, desc in sorted(footnotes.items(), key=lambda x: -x[0]):
        escaped_desc = desc.replace('"', '&quot;')
        span = f'<span class="footnote-ref" data-note="{escaped_desc}">*{num}</span>'
        text = re.sub(rf'(?<=[a-zA-ZÀ-ỹ])\s*{num}(?=\s|[,.?!:;”"]|$)', span, text)
    return text

chap_map = {
    0: "Hồi I: Hoàng Hôn Xóm Ngụ Cư & Tràng Dẫn Vợ Về Nhà",
    64: "Hồi II: Bốn Bát Bánh Đúc & Cuộc Gặp Trước Cổng Chợ Tỉnh",
    85: "Hồi III: Nỗi Lòng Nghẹn Ngào Của Bà Cụ Tứ Trong Đêm Tân Hôn",
    123: "Hồi IV: Bữa Cơm Ngày Đói & Nồi Cháo Cám (Trọng Tâm SGK Ngữ Văn 12)",
    139: "Hồi V: Tiếng Trống Thúc Thuế & Lá Cờ Đỏ Bay Phấp Phới"
}

html_parts = []
html_parts.append('''
<div class="reader-fulltext-banner">
  <span class="reader-fulltext-tag">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    Toàn Văn Kiệt Tác Vợ Nhặt (Kim Lân)
  </span>
  <a href="#sgk-chao-cam" class="reader-jump-sgk-btn">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    Đến đoạn: Bữa cơm ngày đói & Nồi cháo cám (SGK Lớp 12)
  </a>
</div>
''')

for i, p in enumerate(paras):
    if i in chap_map:
        t = chap_map[i]
        if "Trọng Tâm SGK" in t:
            html_parts.append(f'\n<h3 class="reader-chapter-title" id="sgk-chao-cam">{t}</h3>\n')
            html_parts.append('''
<div class="sgk-notice-box">
  <div class="sgk-notice-header">
    <span class="sgk-badge">
      <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 12)
    </span>
    <span class="sgk-meta">Văn bản: Vợ Nhặt • Kim Lân (Phân đoạn bữa cơm ngày đói & Nồi cháo cám)</span>
  </div>
  <p class="sgk-notice-desc">Giá trị nhân đạo sâu sắc của Kim Lân: Trong tận cùng của cái chết và nạn đói 1945 khủng khiếp, những người nghèo khổ vẫn cưu mang, đùm bọc nhau và hướng về sự sống, tổ ấm gia đình cùng niềm tin vào ngày mai.</p>
</div>
<div class="chapter-illustration-frame">
  <img src="assets/images/scenes/vo_nhat_chao_cam.jpg" alt="Bà cụ Tứ bưng nồi cháo cám trong bữa cơm sáng đầu tiên" class="chapter-illustration-img" loading="lazy">
  <div class="chapter-illustration-caption">
    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <span>Tranh minh họa: Bà cụ Tứ tươi cười bưng nồi cháo cám bốc khói nghi ngút thết đãi hai con</span>
  </div>
</div>
''')
        else:
            html_parts.append(f'\n<h3 class="reader-chapter-title">{t}</h3>\n')
    
    clean_p = embed_footnotes(p)
    clean_p = re.sub(r'^[ \t]*[-–—][ \t]*', '— ', clean_p)
    html_parts.append(f'<p>{clean_p}</p>')

html_parts.append('''
<div class="sgk-end-marker">
  <span>[ Kết thúc toàn văn kiệt tác Vợ Nhặt • Kim Lân ]</span>
</div>
''')

full_html = '\n'.join(html_parts)
print(f"Generated Vo Nhat HTML: {len(full_html)} chars, 5 chapters.")

with open('scratch/vo_nhat_formatted.html', 'w', encoding='utf-8') as f:
    f.write(full_html)
print("Saved to scratch/vo_nhat_formatted.html")
