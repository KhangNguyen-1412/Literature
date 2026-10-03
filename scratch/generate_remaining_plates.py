# -*- coding: utf-8 -*-
"""
Generate remaining SVG scene plates for Chữ Người Tử Tù, Lão Hạc, Hai Đứa Trẻ,
Đời Thừa, Tôi Đi Học, Vội Vàng, Tràng Giang.
"""
import os

SCENES_DIR = r"assets\images\scenes"

def create_svg(filename, title, subtitle, main_art_svg):
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="100%" stop-color="#F0EAE1"/>
    </linearGradient>
    <linearGradient id="cerulean_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A6B8A"/>
      <stop offset="100%" stop-color="#0E3B52"/>
    </linearGradient>
    <linearGradient id="jasper_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BA342A"/>
      <stop offset="100%" stop-color="#701C16"/>
    </linearGradient>
    <pattern id="woodcut_hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0E3B52" stroke-width="0.75" opacity="0.12"/>
    </pattern>
    <filter id="paper_shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0E3B52" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect width="960" height="520" fill="url(#bg_grad)"/>
  <rect width="960" height="520" fill="url(#woodcut_hatch)"/>

  <rect x="24" y="24" width="912" height="472" fill="none" stroke="#0E3B52" stroke-width="2" opacity="0.85"/>
  <rect x="30" y="30" width="900" height="460" fill="none" stroke="#BA342A" stroke-width="0.8" opacity="0.6"/>

  <g stroke="#0E3B52" stroke-width="1.5" fill="none" opacity="0.7">
    <path d="M38 48 L48 38 M38 56 L56 38"/>
    <path d="M922 48 L912 38 M922 56 L904 38"/>
    <path d="M38 472 L48 482 M38 464 L56 482"/>
    <path d="M922 472 L912 482 M922 464 L904 482"/>
  </g>

  <g transform="translate(480, 52)">
    <circle cx="0" cy="0" r="14" fill="#0E3B52"/>
    <text x="0" y="5" font-family="'Playfair Display', serif" font-size="12" font-weight="900" fill="#FAF8F5" text-anchor="middle">§</text>
    <line x1="-120" y1="0" x2="-24" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
    <line x1="24" y1="0" x2="120" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
  </g>

  <g transform="translate(60, 75)">
    {main_art_svg}
  </g>

  <g transform="translate(480, 468)">
    <rect x="-320" y="-22" width="640" height="34" fill="#FAF8F5" rx="4" filter="url(#paper_shadow)"/>
    <rect x="-320" y="-22" width="640" height="34" fill="none" stroke="#BA342A" stroke-width="1" rx="4"/>
    <text x="0" y="-3" font-family="'Playfair Display', Georgia, serif" font-size="15" font-weight="800" fill="#0E3B52" text-anchor="middle" letter-spacing="0.5">{title}</text>
    <text x="0" y="9" font-family="'Newsreader', serif" font-size="11.5" font-style="italic" fill="#BA342A" text-anchor="middle">{subtitle}</text>
  </g>
</svg>'''
    filepath = os.path.join(SCENES_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Created SVG: {filename}")

# Chữ Người Tử Tù
create_svg("huancao_cong_van.svg", "CHỮ NGƯỜI TỬ TÙ • PHẦN I", "Viên quản ngục nhận công văn giải tử tù Huấn Cao nguy hiểm", """
  <g transform="translate(420, 180)">
    <rect x="-120" y="-60" width="240" height="120" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <text x="0" y="-30" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#BA342A" text-anchor="middle">TRẢM QUYẾT BỘ ĐINH</text>
    <line x1="-80" y1="-10" x2="80" y2="-10" stroke="#0E3B52" stroke-width="1.5"/>
    <line x1="-80" y1="15" x2="80" y2="15" stroke="#0E3B52" stroke-width="1.5"/>
    <circle cx="65" cy="25" r="16" fill="#BA342A"/>
  </g>
""")

create_svg("huancao_dap_gong.svg", "CHỮ NGƯỜI TỬ TÙ • PHẦN II", "Huấn Cao hiên ngang giơ gông gỗ nặng thúc rệp xuống thềm đá xanh", """
  <g transform="translate(420, 180)">
    <!-- Chiếc gông gỗ lim nặng nề sáu tên tử tù -->
    <rect x="-180" y="-20" width="360" height="40" fill="#0E3B52" rx="4"/>
    <circle cx="-120" cy="0" r="14" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <circle cx="-40" cy="0" r="14" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <circle cx="40" cy="0" r="14" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <circle cx="120" cy="0" r="14" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <!-- Vệt thúc rệp vang dội xuống thềm đá -->
    <path d="M-80 50 L0 25 L80 50" stroke="#BA342A" stroke-width="4" fill="none"/>
    <text x="0" y="95" font-family="'Playfair Display', serif" font-size="13" font-weight="800" fill="#0E3B52" text-anchor="middle">THỀM ĐÁ TRẠI GIAM TỈNH SƠN</text>
  </g>
""")

create_svg("huancao_quan_nguc.svg", "CHỮ NGƯỜI TỬ TÙ • PHẦN III", "Nỗi trăn trở biệt nhỡn liên tài của quản ngục bên ấm trà đêm", """
  <g transform="translate(420, 180)">
    <!-- Ấm trà cổ và chiếc chén khải bốc khói suy tư -->
    <path d="M-40 40 Q-80 -20 0 -20 Q80 -20 40 40 Z" fill="#0E3B52"/>
    <circle cx="0" cy="-25" r="8" fill="#BA342A"/>
    <path d="M0 -30 Q-20 -70 10 -90" stroke="#FAF8F5" stroke-width="2" fill="none" opacity="0.7"/>
    <!-- Song sắt ngục tù soi bóng đêm trăng -->
    <g stroke="#0E3B52" stroke-width="3" opacity="0.4">
      <line x1="-160" y1="-80" x2="-160" y2="80"/>
      <line x1="-120" y1="-80" x2="-120" y2="80"/>
      <line x1="120" y1="-80" x2="120" y2="80"/>
      <line x1="160" y1="-80" x2="160" y2="80"/>
    </g>
  </g>
""")

# Lão Hạc
create_svg("laohac_ban_cho.svg", "LÃO HẠC • PHẦN II", "Nỗi ân hận xé lòng của Lão Hạc — 'Cậu Vàng đi đời rồi ông giáo ạ!'", """
  <g transform="translate(420, 180)">
    <!-- Sợi dây xích và chiếc bát sành trống rỗng bên góc sân -->
    <ellipse cx="0" cy="50" rx="45" ry="20" fill="#0E3B52" stroke="#BA342A" stroke-width="2"/>
    <path d="M-100 0 Q-40 70 0 50 T80 0" stroke="#0E3B52" stroke-width="4" stroke-dasharray="8 4" fill="none"/>
    <!-- Giọt nước mắt ân hận của Lão Hạc -->
    <path d="M0 -30 Q10 -10 0 5 Q-10 -10 0 -30 Z" fill="#BA342A"/>
    <text x="0" y="110" font-family="'Playfair Display', serif" font-size="14" font-weight="800" fill="#BA342A" text-anchor="middle">"CẬU VÀNG ĐI ĐỜI RỒI ÔNG GIÁO Ạ!"</text>
  </g>
""")

create_svg("laohac_cai_chet.svg", "LÃO HẠC • PHẦN III", "Cái chết dữ dội giữ trọn lòng tự trọng và mảnh vườn cho con", """
  <g transform="translate(420, 180)">
    <!-- Gói bả chó oan nghiệt và văn tự mảnh vườn ba sào -->
    <rect x="-80" y="-20" width="160" height="90" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2" rx="3"/>
    <text x="0" y="5" font-family="'Playfair Display', serif" font-size="12" font-weight="800" fill="#BA342A" text-anchor="middle">VĂN TỰ MẢNH VƯỜN</text>
    <line x1="-60" y1="25" x2="60" y2="25" stroke="#0E3B52" stroke-width="1.5"/>
    <line x1="-60" y1="45" x2="60" y2="45" stroke="#0E3B52" stroke-width="1.5"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="900" fill="#0E3B52" text-anchor="middle">NHÂN CÁCH TRONG SẠCH CAO CẢ</text>
  </g>
""")

# Hai Đứa Trẻ
create_svg("haiduatre_chieu_tan.svg", "HAI ĐỨA TRẺ • PHẦN I", "Chiều tàn trên phố huyện — Tiếng trống thu không và bóng tối dần buông", """
  <g transform="translate(420, 180)">
    <!-- Tiếng trống thu không gọi hoàng hôn tím đỏ -->
    <circle cx="0" cy="0" r="75" fill="#BA342A" opacity="0.3"/>
    <circle cx="0" cy="0" r="55" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <text x="0" y="8" font-family="'Playfair Display', serif" font-size="18" font-weight="900" fill="#0E3B52" text-anchor="middle">THU KHÔNG</text>
    <!-- Mẹ con chị Tí dọn gánh hàng nước dưới gốc bàng -->
    <path d="M-180 80 Q-120 0 -60 80" stroke="#0E3B52" stroke-width="4" fill="none"/>
    <path d="M60 80 Q120 0 180 80" stroke="#0E3B52" stroke-width="4" fill="none"/>
  </g>
""")

create_svg("haiduatre_bong_toi.svg", "HAI ĐỨA TRẺ • PHẦN II", "Bóng tối bao trùm phố huyện tịch mịch — Bếp lửa gánh phở bác Siêu bập bùng", """
  <g transform="translate(420, 180)">
    <!-- Bếp than đỏ rực của bác phở Siêu giữa màn đêm đen đặc -->
    <rect x="-60" y="10" width="120" height="50" fill="#0E3B52" rx="3"/>
    <circle cx="-25" cy="25" r="8" fill="#BA342A"/>
    <circle cx="0" cy="20" r="10" fill="#BA342A"/>
    <circle cx="25" cy="25" r="8" fill="#BA342A"/>
    <!-- Ngọn đèn con chị Tí leo lét giữa bóng tối -->
    <circle cx="-160" cy="40" r="12" fill="#D4A373" stroke="#BA342A"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">MÀN ĐÊM TỊCH MỊCH PHỐ HUYỆN</text>
  </g>
""")

# Đời Thừa
create_svg("doithua_com_ao.svg", "ĐỜI THỪA • PHẦN II", "Bi kịch cơm áo gạo tiền — Ngòi bút bị rẻ rúng, nỗi đau khi viết văn cẩu thả", """
  <g transform="translate(420, 180)">
    <!-- Ngòi bút máy bị gãy đôi trên trang bản thảo rẻ tiền -->
    <line x1="-80" y1="-40" x2="0" y2="30" stroke="#0E3B52" stroke-width="5"/>
    <polygon points="0,30 20,40 -10,45" fill="#BA342A"/>
    <!-- Mẩu giấy bạc ít ỏi mua sữa cho con -->
    <rect x="30" y="-10" width="100" height="60" fill="#FAF8F5" stroke="#BA342A" stroke-width="2" transform="rotate(15 80 20)"/>
    <text x="80" y="25" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">CƠM ÁO</text>
  </g>
""")

create_svg("doithua_sam_hoi.svg", "ĐỜI THỪA • PHẦN III", "Nước mắt sám hối của Hộ — Ôm người vợ tảo tần trong đêm say dằn vặt", """
  <g transform="translate(420, 180)">
    <!-- Bàn tay ôm chặt sam hối dưới ánh đèn dầu mờ ảo -->
    <circle cx="0" cy="0" r="60" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <circle cx="0" cy="0" r="70" fill="none" stroke="#BA342A" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="0" y="8" font-family="'Playfair Display', serif" font-size="18" font-weight="900" fill="#BA342A" text-anchor="middle">TÌNH THƯƠNG</text>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">"NƯỚC MẮT LÀ MIẾNG KÍNH BIẾN HÌNH VŨ TRỤ"</text>
  </g>
""")

# Tôi Đi Học
create_svg("toidihoc_san_truong.svg", "TÔI ĐI HỌC • PHẦN II", "Sân trường làng Mỹ Lý rộn rã cờ hoa — Tiếng gọi tên bỡ ngỡ của ông đốc", """
  <g transform="translate(420, 180)">
    <!-- Hàng hiên trường làng Mỹ Lý và lá cờ tam giác -->
    <rect x="-140" y="-30" width="280" height="70" fill="#0E3B52" rx="3"/>
    <polygon points="-120,-30 -160,-70 -80,-70" fill="#BA342A"/>
    <polygon points="120,-30 80,-70 160,-70" fill="#BA342A"/>
    <text x="0" y="15" font-family="'Playfair Display', serif" font-size="15" font-weight="900" fill="#FAF8F5" text-anchor="middle">TRƯỜNG TIỂU HỌC MỸ LÝ</text>
  </g>
""")

create_svg("toidihoc_lop_hoc.svg", "TÔI ĐI HỌC • PHẦN III", "Lớp học đầu đời thơm tho trang vở mới — Tiếng chim hót ngoài song cửa", """
  <g transform="translate(420, 180)">
    <!-- Cuốn tập mở rộng với dòng chữ 'Tôi đi học' nắn nót -->
    <rect x="-110" y="-50" width="220" height="110" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2" rx="3"/>
    <line x1="0" y1="-50" x2="0" y2="60" stroke="#0E3B52" stroke-width="2"/>
    <text x="-55" y="-10" font-family="'Newsreader', serif" font-size="16" font-style="italic" font-weight="700" fill="#BA342A" text-anchor="middle">Tôi đi học.</text>
    <circle cx="55" cy="-10" r="14" fill="#0E3B52"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">TRANG VỞ ĐẦU TIÊN CỦA CUỘC ĐỜI</text>
  </g>
""")

# Vội Vàng
create_svg("voivang_tat_nang.svg", "VỘI VÀNG • KHỔ I", "Tôi muốn tắt nắng đi, buộc gió lại — Tình si đắm đuối với cõi trần", """
  <g transform="translate(420, 180)">
    <!-- Mặt trời rực rỡ và những dải mây gió bị trói buộc -->
    <circle cx="0" cy="0" r="60" fill="#BA342A"/>
    <circle cx="0" cy="0" r="75" fill="none" stroke="#BA342A" stroke-width="2" stroke-dasharray="4 4"/>
    <g stroke="#0E3B52" stroke-width="3">
      <line x1="0" y1="-100" x2="0" y2="-75"/>
      <line x1="70" y1="-70" x2="52" y2="-52"/>
      <line x1="100" y1="0" x2="75" y2="0"/>
      <line x1="70" y1="70" x2="52" y2="52"/>
      <line x1="0" y1="100" x2="0" y2="75"/>
      <line x1="-70" y1="70" x2="-52" y2="52"/>
      <line x1="-100" y1="0" x2="-75" y2="0"/>
      <line x1="-70" y1="-70" x2="-52" y2="-52"/>
    </g>
    <text x="0" y="115" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#0E3B52" text-anchor="middle">"TÔI MUỐN TẮT NẮNG ĐI..."</text>
  </g>
""")

create_svg("voivang_om_xuan.svg", "VỘI VÀNG • KHỔ III", "Mau đi thôi mùa chưa ngả chiều hôm — Ta muốn ôm ghì lấy sự sống mùa xuân chín", """
  <g transform="translate(420, 180)">
    <!-- Hai vòng tay rộng mở ôm ấp cả đất trời mùa xuân -->
    <path d="M-140 40 C-180 -60 0 -90 0 -90 C0 -90 180 -60 140 40" stroke="#BA342A" stroke-width="5" fill="none"/>
    <circle cx="0" cy="-20" r="30" fill="#0E3B52"/>
    <text x="0" y="110" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#BA342A" text-anchor="middle">"HỠI XUÂN HỒNG, TA MUỐN CẮN VÀO NGƯƠI!"</text>
  </g>
""")

# Tràng Giang
create_svg("tranggiang_nui_bac.svg", "TRÀNG GIANG • PHẦN II", "Lớp lớp mây cao đùn núi bạc — Chim nghiêng cánh nhỏ bóng chiều sa", """
  <g transform="translate(420, 180)">
    <!-- Dãy núi mây bạc đùn cao trùng điệp hoàng hôn -->
    <path d="M-220 80 Q-150 -60 -80 40 T80 -80 T220 80" stroke="#0E3B52" stroke-width="4" fill="#FAF8F5"/>
    <!-- Cánh chim cô đơn liệng giữa bóng chiều sa -->
    <path d="M-20 -60 Q0 -80 20 -60 Q40 -80 60 -60" stroke="#BA342A" stroke-width="3" fill="none"/>
    <!-- Khói hoàng hôn và nỗi nhớ quê hương dợn dợn -->
    <path d="M-150 70 Q-50 40 50 70 T250 60" stroke="#1A6B8A" stroke-width="4" fill="none"/>
    <text x="0" y="115" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">"LÒNG QUÊ DỢN DỢN VỜI CON NƯỚC"</text>
  </g>
""")

print("ALL REMAINING SCENE PLATES GENERATED SUCCESSFULLY!")
