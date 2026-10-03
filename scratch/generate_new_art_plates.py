# -*- coding: utf-8 -*-
"""
Generates bespoke Editorial Woodcut & Fine Art SVG Scene and Cover Plates for the 24 classic SGK literary works.
"""
import os

SCENES_DIR = r"assets\images\scenes"
os.makedirs(SCENES_DIR, exist_ok=True)

def create_plate(filename, title, subtitle, main_art_svg, accent_color="#BA342A"):
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad_{filename[:6]}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="100%" stop-color="#EFE9DF"/>
    </linearGradient>
    <pattern id="hatch_{filename[:6]}" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0E3B52" stroke-width="0.7" opacity="0.09"/>
    </pattern>
    <filter id="shadow_{filename[:6]}" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#0E3B52" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Nền giấy ngà mỹ thuật -->
  <rect width="960" height="520" fill="url(#bg_grad_{filename[:6]})"/>
  <rect width="960" height="520" fill="url(#hatch_{filename[:6]})"/>

  <!-- Khung viền báo chí Editorial kép -->
  <rect x="22" y="22" width="916" height="476" fill="none" stroke="#0E3B52" stroke-width="2.2" opacity="0.88"/>
  <rect x="28" y="28" width="904" height="464" fill="none" stroke="{accent_color}" stroke-width="0.9" opacity="0.65"/>

  <!-- Họa tiết góc cổ điển (Corner Ornaments) -->
  <g stroke="#0E3B52" stroke-width="1.5" fill="none" opacity="0.6">
    <path d="M36 46 L46 36 M36 54 L54 36"/>
    <path d="M924 46 L914 36 M924 54 L906 36"/>
    <path d="M36 474 L46 484 M36 466 L54 484"/>
    <path d="M924 474 L914 484 M924 466 L906 484"/>
  </g>

  <!-- Huy hiệu Văn Uyển trên đỉnh -->
  <g transform="translate(480, 50)">
    <circle cx="0" cy="0" r="13" fill="#0E3B52"/>
    <text x="0" y="4.5" font-family="'Playfair Display', Georgia, serif" font-size="11" font-weight="900" fill="#FAF8F5" text-anchor="middle">§</text>
    <line x1="-120" y1="0" x2="-22" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
    <line x1="22" y1="0" x2="120" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
  </g>

  <!-- NỘI DUNG MINH HỌA NGHỆ THUẬT CHUYÊN BIỆT (MAIN ARTWORK) -->
  <g transform="translate(60, 75)">
    {main_art_svg}
  </g>

  <!-- Chân trang thẻ tranh: Tiêu đề bối cảnh & Phân đoạn -->
  <g transform="translate(480, 468)">
    <rect x="-330" y="-21" width="660" height="32" fill="#FAF8F5" rx="4" filter="url(#shadow_{filename[:6]})"/>
    <rect x="-330" y="-21" width="660" height="32" fill="none" stroke="{accent_color}" stroke-width="1" rx="4"/>
    <text x="0" y="-3.5" font-family="'Playfair Display', Georgia, serif" font-size="14.5" font-weight="800" fill="#0E3B52" text-anchor="middle" letter-spacing="0.5">{title}</text>
    <text x="0" y="8" font-family="'Newsreader', Georgia, serif" font-size="11" font-style="italic" fill="{accent_color}" text-anchor="middle">{subtitle}</text>
  </g>
</svg>'''
    filepath = os.path.join(SCENES_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)

print("Starting SVG plate generation...")

# =========================================================================
# 1. TẮT ĐÈN (Ngô Tất Tố)
# =========================================================================
create_plate("tatden_cover.svg", "TẮT ĐÈN • NGÔ TẤT TỐ", "Kiệt tác hiện thực phê phán đỉnh cao về thân phận người nông dân dưới ách sưu thuế", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Ngọn đèn dầu le lói sắp tắt giữa đêm đen -->
  <g transform="translate(420, 180)">
    <ellipse cx="0" cy="80" rx="55" ry="16" fill="#0E3B52" opacity="0.8"/>
    <!-- Thân đèn dầu bão -->
    <path d="M-22 80 L-14 30 L14 30 L22 80 Z" fill="#BA342A" opacity="0.85"/>
    <!-- Bóng thủy tinh và tim đèn le lói -->
    <ellipse cx="0" cy="15" rx="20" ry="25" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
    <path d="M0 25 Q-6 10 0 -5 Q6 10 0 25 Z" fill="#D4A373"/>
    <circle cx="0" cy="10" r="4" fill="#BA342A"/>
    <!-- Quầng sáng yếu ớt giữa bóng đêm bủa vây -->
    <circle cx="0" cy="10" r="70" fill="none" stroke="#D4A373" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>
    <circle cx="0" cy="10" r="110" fill="none" stroke="#BA342A" stroke-width="0.8" stroke-dasharray="6,6" opacity="0.25"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">TẮT ĐÈN</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Cái bóng tối đen nghịt như cái tiền đồ của chị...”</text>
""")

create_plate("tatden_mua_suu.svg", "TẮT ĐÈN • CHƯƠNG I", "Mùa sưu thuế kinh hoàng tại làng Đông Xá — Tiếng trống ngũ liên và tiếng tù và inh ỏi", """
  <rect x="80" y="40" width="680" height="280" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.5" opacity="0.7"/>
  <!-- Trống ngũ liên đình làng thúc giục dồn dập -->
  <g transform="translate(240, 180)">
    <ellipse cx="0" cy="0" rx="65" ry="85" fill="#BA342A" stroke="#0E3B52" stroke-width="2"/>
    <ellipse cx="0" cy="-40" rx="65" ry="25" fill="#D4A373" stroke="#0E3B52" stroke-width="1.5"/>
    <line x1="-30" y1="-80" x2="-10" y2="-40" stroke="#0E3B52" stroke-width="4"/>
    <line x1="30" y1="-80" x2="10" y2="-40" stroke="#0E3B52" stroke-width="4"/>
    <!-- Sóng âm dồn dập -->
    <path d="M80 -20 Q120 0 80 20" stroke="#BA342A" stroke-width="2.5" fill="none"/>
    <path d="M100 -35 Q150 0 100 35" stroke="#BA342A" stroke-width="2" fill="none"/>
  </g>
  <!-- Dân phu bị giải đi dây thừng trói gô -->
  <g transform="translate(520, 190)">
    <circle cx="0" cy="-60" r="18" fill="#0E3B52"/>
    <path d="M-16 -40 L-25 30 L25 30 L16 -40 Z" fill="#0E3B52" opacity="0.8"/>
    <!-- Dây thừng quấn ngang ngực -->
    <line x1="-30" y1="-15" x2="30" y2="-15" stroke="#D4A373" stroke-width="3.5"/>
    <line x1="-30" y1="5" x2="30" y2="5" stroke="#D4A373" stroke-width="3.5"/>
    <circle cx="90" cy="-55" r="16" fill="#0E3B52" opacity="0.6"/>
    <path d="M75 -36 L68 25 L112 25 L105 -36 Z" fill="#0E3B52" opacity="0.5"/>
  </g>
""")

create_plate("tatden_tuc_nuoc_vo_bo.svg", "TẮT ĐÈN • CHƯƠNG IV (SGK NGỮ VĂN 8)", "Tức Nước Vỡ Bờ — Chị Dậu nghiến răng quật ngã tên cai lệ và người nhà lý trưởng", """
  <rect x="70" y="30" width="700" height="290" rx="6" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chị Dậu quật ngã cai lệ ngã chỏng vó -->
  <g transform="translate(420, 180)">
    <!-- Tên cai lệ ngã chỏng gọng trên mặt đất -->
    <circle cx="160" cy="50" r="18" fill="#0E3B52"/>
    <path d="M150 70 L90 60 L100 20 L160 30 Z" fill="#0E3B52" opacity="0.85"/>
    <!-- Chân tay vung lên trời hoảng loạn -->
    <line x1="120" y1="20" x2="80" y2="-30" stroke="#0E3B52" stroke-width="3.5"/>
    <line x1="140" y1="25" x2="160" y2="-25" stroke="#0E3B52" stroke-width="3.5"/>
    <!-- Chị Dậu hiên ngang đứng thẳng, mắt bừng bừng lửa giận -->
    <g transform="translate(-100, 0)">
      <circle cx="0" cy="-65" r="22" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
      <!-- Khăn mỏ quạ bay trong gió -->
      <path d="M-22 -80 C-10 -105 30 -85 22 -60 C15 -45 -10 -45 -22 -80 Z" fill="#0E3B52"/>
      <!-- Vạt áo nâu thắt vạt dứt khoát -->
      <path d="M-28 -40 L-40 70 L40 70 L28 -40 Z" fill="#BA342A" opacity="0.9"/>
      <!-- Đôi tay gân guốc khỏe khoắn quật ngã đối phương -->
      <line x1="20" y1="-25" x2="110" y2="20" stroke="#BA342A" stroke-width="4.5"/>
    </g>
    <!-- Trượng gỗ và xiềng sắt rơi loảng xoảng -->
    <line x1="20" y1="75" x2="80" y2="85" stroke="#D4A373" stroke-width="3"/>
  </g>
  <text x="420" y="65" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#BA342A" text-anchor="middle">“Mày trói ngay chồng bà đi, bà cho mày xem!”</text>
""")

create_plate("tatden_toi_den.svg", "TẮT ĐÈN • CHƯƠNG V", "Cái bóng tối đen nghịt như cái tiền đồ của chị Dậu — Bước chạy tuyệt vọng trong đêm mưa", """
  <rect x="80" y="30" width="680" height="290" fill="#0E3B52"/>
  <!-- Bầu trời đêm đen đặc quánh mưa gió bão bùng -->
  <g stroke="#FAF8F5" stroke-width="0.8" opacity="0.25">
    <line x1="100" y1="40" x2="80" y2="180"/>
    <line x1="250" y1="30" x2="230" y2="200"/>
    <line x1="450" y1="50" x2="430" y2="230"/>
    <line x1="600" y1="40" x2="580" y2="220"/>
    <line x1="720" y1="60" x2="700" y2="240"/>
  </g>
  <!-- Dáng chị Dậu cô độc chạy xé toạc màn đêm -->
  <g transform="translate(420, 190)">
    <circle cx="0" cy="-55" r="18" fill="#FAF8F5"/>
    <path d="M-20 -35 L-35 50 L25 50 L15 -35 Z" fill="#FAF8F5" opacity="0.8"/>
    <line x1="-25" y1="50" x2="-60" y2="95" stroke="#FAF8F5" stroke-width="3.5"/>
    <line x1="15" y1="50" x2="50" y2="85" stroke="#FAF8F5" stroke-width="3.5"/>
  </g>
  <text x="420" y="300" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#FAF8F5" text-anchor="middle" opacity="0.85">Nàng chạy băng vào bóng tối mù mịt của đồng hoang...</text>
""")

# =========================================================================
# 2. VỢ NHẶT (Kim Lân)
# =========================================================================
create_plate("vonhat_cover.svg", "VỢ NHẶT • KIM LÂN", "Khúc ca về tình người, lòng cưu mang và niềm khao khát sống mãnh liệt giữa bờ vực nạn đói 1945", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chiếc xe bò kéo thóc và bóng đôi người dưới ráng chiều -->
  <g transform="translate(420, 190)">
    <!-- Hai bánh xe bò lớn nan hoa gỗ -->
    <circle cx="-70" cy="25" r="45" fill="none" stroke="#0E3B52" stroke-width="3"/>
    <circle cx="70" cy="25" r="45" fill="none" stroke="#0E3B52" stroke-width="3"/>
    <line x1="-120" y1="10" x2="120" y2="10" stroke="#0E3B52" stroke-width="4"/>
    <!-- Bát cháo cám bốc khói mỏng manh -->
    <ellipse cx="0" cy="-20" rx="35" ry="15" fill="#BA342A" opacity="0.85"/>
    <path d="M-2 0 Q-8 -30 2 -55 T-4 -80" stroke="#FAF8F5" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M6 -5 Q14 -35 4 -60 T8 -85" stroke="#FAF8F5" stroke-width="1.5" fill="none" opacity="0.6"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">VỢ NHẶT</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Trong cơn đói khát cùng đường, người ta vẫn cưu mang nhau...”</text>
""")

create_plate("vonhat_dan_ve.svg", "VỢ NHẶT • PHẦN I", "Tràng dắt người đàn bà về xóm ngụ cư — Tiếng cười khúc khích và ánh nhìn ngạc nhiên của xóm nghèo", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.6"/>
  <!-- Bầu trời hoàng hôn ảm đạm xám xịt -->
  <path d="M70 30 L770 30 L770 140 L70 140 Z" fill="#1A6B8A" opacity="0.2"/>
  <!-- Tràng đi trước, cái đầu to bè, lưng to như lưng gấu -->
  <g transform="translate(340, 200)">
    <circle cx="0" cy="-70" r="22" fill="#0E3B52"/>
    <path d="M-30 -45 L-35 55 L35 55 L30 -45 Z" fill="#0E3B52" opacity="0.85"/>
    <!-- Nụ cười tủm tỉm rạng rỡ trên môi -->
    <path d="M-6 -60 Q0 -52 8 -60" stroke="#FAF8F5" stroke-width="2" fill="none"/>
  </g>
  <!-- Thị đi sau ba bốn bước, cắp cái nón rách tàng nghiêng che nửa mặt -->
  <g transform="translate(480, 210)">
    <circle cx="0" cy="-60" r="16" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.8"/>
    <!-- Nón lá rách nghiêng nghiêng -->
    <path d="M-30 -75 L0 -105 L30 -75 Z" fill="#D4A373" stroke="#0E3B52" stroke-width="1"/>
    <path d="M-18 -42 L-24 45 L24 45 L18 -42 Z" fill="#BA342A" opacity="0.75"/>
  </g>
  <!-- Dãy lều xiêu vẹo xóm ngụ cư lảng vảng mùi ẩm mốc -->
  <path d="M90 220 L150 160 L210 220 Z" fill="#0E3B52" opacity="0.4"/>
  <path d="M630 220 L680 170 L730 220 Z" fill="#0E3B52" opacity="0.4"/>
""")

create_plate("vonhat_ba_cu_tu.svg", "VỢ NHẶT • PHẦN II", "Nỗi lòng người mẹ nghèo — Bà cụ Tứ vừa mừng vừa tủi trong chái nhà xiêu vẹo", """
  <rect x="80" y="30" width="680" height="290" rx="6" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Bà cụ Tứ lưng còng, đôi mắt mờ đục rỉ nước mắt -->
  <g transform="translate(420, 180)">
    <circle cx="0" cy="-50" r="18" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
    <!-- Khăn vuông bạc màu quấn đầu -->
    <path d="M-18 -65 C-8 -80 18 -80 18 -65 Z" fill="#0E3B52"/>
    <!-- Dáng còng lưng thương cảm của người mẹ nghèo -->
    <path d="M-15 -30 C-35 10 -25 60 0 60 C15 60 25 10 15 -30 Z" fill="#0E3B52" opacity="0.85"/>
    <!-- Đôi bàn tay gầy guộc chắp trước ngực -->
    <circle cx="2" cy="0" r="12" fill="#D4A373" opacity="0.9"/>
  </g>
  <!-- Ngọn đèn leo lét bên ấm nước sôi sùng sục -->
  <circle cx="280" cy="200" r="8" fill="#BA342A"/>
  <line x1="280" y1="208" x2="280" y2="235" stroke="#0E3B52" stroke-width="2"/>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#BA342A" text-anchor="middle">“Ừ, thôi thì các con đã phải duyên phải kiếp với nhau, u cũng mừng lòng...”</text>
""")

create_plate("vonhat_chao_cam.svg", "VỢ NHẶT • PHẦN III (SGK NGỮ VĂN 12)", "Bữa cơm ngày đói & Nồi cháo cám đắng chát — Tiếng trống thúc thuế và bóng cờ đỏ sao vàng", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chiếc mâm rách và niêu cháo cám bốc khói -->
  <g transform="translate(340, 190)">
    <ellipse cx="0" cy="30" rx="90" ry="25" fill="#D4A373" stroke="#0E3B52" stroke-width="1.5"/>
    <!-- Nồi đất cháo cám nghi ngút -->
    <ellipse cx="0" cy="0" rx="45" ry="20" fill="#0E3B52"/>
    <path d="M-3 0 Q-10 -35 0 -60 T-2 -90" stroke="#BA342A" stroke-width="2" fill="none" opacity="0.8"/>
    <text x="0" y="65" font-family="'Newsreader', serif" font-size="12" font-style="italic" fill="#0E3B52" text-anchor="middle">Nồi 'chè kho' đặc biệt của mẹ</text>
  </g>
  <!-- Hình ảnh lá cờ đỏ sao vàng bay phấp phới trong tâm trí Tràng -->
  <g transform="translate(580, 130)">
    <line x1="0" y1="-30" x2="0" y2="90" stroke="#0E3B52" stroke-width="2.5"/>
    <path d="M0 -30 Q45 -45 90 -25 Q45 -5 0 -10 Z" fill="#BA342A"/>
    <polygon points="45,-25 48,-18 55,-18 50,-14 52,-7 45,-11 38,-7 40,-14 35,-18 42,-18" fill="#FAF8F5"/>
    <text x="45" y="45" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#BA342A" text-anchor="middle">ĐOÀN NGƯỜI PHÁ KHO THÓC</text>
  </g>
""")

# =========================================================================
# 3. VỢ CHỒNG A PHỦ (Tô Hoài)
# =========================================================================
create_plate("vochongaphu_cover.svg", "VỢ CHỒNG A PHỦ • TÔ HOÀI", "Bản anh hùng ca Tây Bắc về số phận nô lệ vùng cao và con đường vùng lên giải phóng", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Dãy núi non Hồng Ngài hùng vĩ và cây khèn Mông -->
  <g transform="translate(420, 180)">
    <!-- Đỉnh núi tuyết phủ bảng lảng mây sương -->
    <polygon points="-160,80 -80,-30 0,60" fill="#1A6B8A" opacity="0.6"/>
    <polygon points="-40,80 60,-50 160,80" fill="#0E3B52" opacity="0.75"/>
    <!-- Ống sáo / Khèn bè Mông vắt ngang -->
    <path d="M-90 -10 L90 -70" stroke="#BA342A" stroke-width="4.5"/>
    <circle cx="-50" cy="-22" r="5" fill="#D4A373"/>
    <circle cx="0" cy="-40" r="5" fill="#D4A373"/>
    <circle cx="50" cy="-56" r="5" fill="#D4A373"/>
    <!-- Nốt nhạc tiếng sáo gọi bạn tình bay lơ lửng -->
    <path d="M-80 -60 Q-40 -110 20 -80 T80 -120" stroke="#BA342A" stroke-width="1.5" stroke-dasharray="3,3" fill="none"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">VỢ CHỒNG A PHỦ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Tiếng sáo gọi bạn yêu lơ lửng bay ngoài đầu núi...”</text>
""")

create_plate("vochongaphu_dem_tinh.svg", "VỢ CHỒNG A PHỦ • ĐÊM TÌNH MÙA XUÂN (SGK 12)", "Sức sống tiềm tàng của Mị — Uống rượu đón xuân và lòng rạo rực muốn đi chơi", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Mị ngồi bên buồng tối ngắm váy hoa xòe phơi ngoài mỏm đá -->
  <g transform="translate(280, 180)">
    <rect x="-110" y="-80" width="220" height="170" fill="#0E3B52" opacity="0.8"/>
    <!-- Cửa sổ lỗ vuông bằng bàn tay mờ mờ trăng trắng -->
    <rect x="-25" y="-50" width="50" height="50" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <!-- Váy hoa Mông xòe ra như con bướm rực rỡ -->
    <path d="M-70 60 Q0 -10 70 60 Z" fill="#BA342A" stroke="#FAF8F5" stroke-width="1.5"/>
  </g>
  <!-- Bát rượu ngô và ngọn đèn thắp sáng lại hy vọng -->
  <g transform="translate(540, 190)">
    <circle cx="0" cy="-40" r="20" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <path d="M-25 -20 L-35 60 L35 60 L25 -20 Z" fill="#1A6B8A" opacity="0.85"/>
    <ellipse cx="70" cy="50" rx="30" ry="12" fill="#D4A373" stroke="#0E3B52" stroke-width="1.5"/>
    <text x="0" y="90" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#0E3B52" text-anchor="middle">“Mị thấy phơi phới trở lại, Mị còn trẻ lắm...”</text>
  </g>
""")

create_plate("vochongaphu_coi_troi.svg", "VỢ CHỒNG A PHỦ • ĐÊM ĐÔNG CỞI TRÓI (SGK 12)", "Giọt nước mắt lấp lánh của A Phủ & Nhát dao cắt dây mây cứu người của Mị", """
  <rect x="70" y="30" width="700" height="290" fill="#0E3B52"/>
  <!-- Cột gỗ góc nhà trói A Phủ bằng dây mây thít chặt -->
  <g transform="translate(320, 170)">
    <rect x="-15" y="-90" width="30" height="210" fill="#FAF8F5" opacity="0.4"/>
    <!-- A Phủ gục đầu bất lực -->
    <circle cx="0" cy="-60" r="18" fill="#FAF8F5"/>
    <path d="M-15 -42 L-20 40 L20 40 L15 -42 Z" fill="#FAF8F5" opacity="0.75"/>
    <!-- Vòng dây mây quấn quanh cột -->
    <line x1="-30" y1="-20" x2="30" y2="-20" stroke="#BA342A" stroke-width="4"/>
    <line x1="-30" y1="5" x2="30" y2="5" stroke="#BA342A" stroke-width="4"/>
    <!-- Giọt nước mắt lấp lánh lăn xuống hõm má xám đen -->
    <circle cx="10" cy="-50" r="3.5" fill="#1A6B8A"/>
  </g>
  <!-- Lưỡi dao nhỏ của Mị cắt đứt từng nút dây mây -->
  <g transform="translate(480, 170)">
    <path d="M-40 0 L40 -40 L25 -10 Z" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <text x="60" y="30" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#FAF8F5">“A Phủ! Đi ngay! Đi ngay!”</text>
    <text x="60" y="55" font-family="'Newsreader', serif" font-size="12" font-style="italic" fill="#D4A373">Rồi Mị cũng vụt chạy theo...</text>
  </g>
""")

# =========================================================================
# 4. CHIẾC THUYỀN NGOÀI XA (Nguyễn Minh Châu)
# =========================================================================
create_plate("chiecthuyen_cover.svg", "CHIẾC THUYỀN NGOÀI XA • NGUYỄN MINH CHÂU", "Nỗi trăn trở nhân bản về mối quan hệ giữa Nghệ thuật và Cuộc đời đa sự con người", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chiếc thuyền nhấp nhô mờ ảo trong làn sương mù màu hồng phấn -->
  <g transform="translate(420, 180)">
    <ellipse cx="0" cy="50" rx="140" ry="25" fill="#1A6B8A" opacity="0.3"/>
    <!-- Con thuyền mũi cong in bóng trên mặt biển -->
    <path d="M-90 40 Q0 60 90 40 L70 20 L-70 20 Z" fill="#0E3B52"/>
    <!-- Cánh buồm mờ ảo trong sương sớm -->
    <path d="M-10 20 L-10 -70 L60 20 Z" fill="#BA342A" opacity="0.8"/>
    <!-- Ống kính máy ảnh của nghệ sĩ Phùng -->
    <circle cx="-110" cy="-30" r="35" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2.5"/>
    <circle cx="-110" cy="-30" r="22" fill="#0E3B52"/>
    <circle cx="-110" cy="-30" r="10" fill="#1A6B8A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">CHIẾC THUYỀN NGOÀI XA</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Một cảnh đắt trời cho... bức tranh mực tàu của một danh họa thời cổ”</text>
""")

create_plate("chiecthuyen_suong_som.svg", "CHIẾC THUYỀN NGOÀI XA • PHÁT HIỆN I (SGK 12)", "Cảnh đắt trời cho trên phá Tam Giang — Vẻ đẹp toàn bích của thiên nhiên trong sương mai", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <path d="M70 140 Q420 100 770 140 L770 320 L70 320 Z" fill="#1A6B8A" opacity="0.2"/>
  <g transform="translate(420, 160)">
    <!-- Mặt trời mới hé màu hồng phấn qua màn sương mù -->
    <circle cx="0" cy="-40" r="45" fill="#BA342A" opacity="0.4"/>
    <!-- Chiếc thuyền vó kéo lưới thanh thoát -->
    <path d="M-120 30 Q0 50 120 30 L100 10 L-100 10 Z" fill="#0E3B52" opacity="0.9"/>
    <line x1="0" y1="10" x2="0" y2="-75" stroke="#0E3B52" stroke-width="2.5"/>
    <path d="M0 -75 L80 10 L0 5 Z" fill="#0E3B52" opacity="0.6"/>
  </g>
  <text x="420" y="270" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#0E3B52" text-anchor="middle">Cái đẹp tuyệt đỉnh của ngoại cảnh khiến tâm hồn nghệ sĩ như được thanh lọc</text>
""")

create_plate("chiecthuyen_toa_an.svg", "CHIẾC THUYỀN NGOÀI XA • PHẦN III (SGK 12)", "Người đàn bà hàng chài ở tòa án huyện — Lòng bao dung và sự thấu hiểu sâu sắc lẽ đời", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Bàn làm việc chánh án Đẩu và người đàn bà cam chịu nhưng thâm trầm -->
  <g transform="translate(420, 170)">
    <rect x="-180" y="20" width="360" height="15" fill="#0E3B52"/>
    <circle cx="-90" cy="-35" r="20" fill="#0E3B52"/>
    <!-- Người đàn bà hàng chài ngồi thu mình, mắt nhìn thẳng trầm tĩnh -->
    <g transform="translate(90, 0)">
      <circle cx="0" cy="-40" r="20" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
      <path d="M-22 -20 L-30 50 L30 50 L22 -20 Z" fill="#BA342A" opacity="0.85"/>
    </g>
  </g>
  <text x="420" y="80" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#BA342A" text-anchor="middle">“Lòng các chú tốt, nhưng các chú đâu phải người làm ăn... ở trên thuyền phải có một người đàn ông!”</text>
""")

# =========================================================================
# 5. LÀNG (Kim Lân)
# =========================================================================
create_plate("lang_cover.svg", "LÀNG • KIM LÂN", "Tình yêu làng quê thống nhất sâu sắc với tình yêu tổ quốc và lòng trung thành với kháng chiến", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Cổng làng Chợ Dầu lát gạch và cây đa bến nước -->
  <g transform="translate(420, 180)">
    <!-- Vòm cổng làng mái ngói cong -->
    <path d="M-90 40 L-90 -40 Q0 -80 90 -40 L90 40 Z" fill="none" stroke="#BA342A" stroke-width="3"/>
    <path d="M-60 40 L-60 -20 Q0 -50 60 -20 L60 40 Z" fill="#EDE6DC" stroke="#0E3B52" stroke-width="2"/>
    <!-- Cờ đỏ kháng chiến cắm trên nóc cổng làng -->
    <line x1="0" y1="-80" x2="0" y2="-120" stroke="#0E3B52" stroke-width="2"/>
    <polygon points="0,-120 40,-105 0,-90" fill="#BA342A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">LÀNG</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Làng thì yêu thật, nhưng làng theo Tây mất rồi thì phải thù!”</text>
""")

create_plate("lang_dau_don.svg", "LÀNG • PHẦN II (SGK NGỮ VĂN 9)", "Nỗi đau đớn bàng hoàng của ông Hai khi nghe tin đồn làng Chợ Dầu theo giặc", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Ông Hai cúi gằm mặt bước đi, giọt nước mắt nghẹn ứ nơi cổ họng -->
  <g transform="translate(420, 180)">
    <circle cx="0" cy="-55" r="22" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <!-- Nét mặt đờ đẫn, cổ họng nghẹn ắng lại -->
    <path d="M-10 -50 Q0 -42 10 -50" stroke="#BA342A" stroke-width="2" fill="none"/>
    <path d="M-25 -30 L-35 60 L35 60 L25 -30 Z" fill="#0E3B52" opacity="0.85"/>
    <!-- Hai bàn tay nắm chặt vạt áo nâu run rẩy -->
    <circle cx="-35" cy="15" r="10" fill="#D4A373"/>
    <circle cx="35" cy="15" r="10" fill="#D4A373"/>
  </g>
  <text x="420" y="75" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#BA342A" text-anchor="middle">“Cổ ông lão nghẹn ắng hẳn lại, da mặt tê rân rân. Ông lão lặng đi, tưởng như đến không thở được...”</text>
""")

create_plate("lang_cai_chinh.svg", "LÀNG • PHẦN III", "Tin cải chính về — Nhà ông Hai bị Tây đốt nhẵn, niềm sung sướng vỡ òa rạng rỡ", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Ông Hai cười hớn hở chia quà cho lũ trẻ -->
  <g transform="translate(420, 180)">
    <circle cx="0" cy="-60" r="22" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <path d="M-12 -55 Q0 -45 12 -55" stroke="#BA342A" stroke-width="2.5" fill="none"/>
    <path d="M-25 -35 L-30 55 L30 55 L25 -35 Z" fill="#BA342A" opacity="0.85"/>
    <text x="0" y="90" font-family="'Playfair Display', serif" font-size="15" font-weight="700" fill="#0E3B52" text-anchor="middle">“Tây nó đốt nhà tôi rồi bác ạ! Đốt nhẵn! Ông Cụ Hồ muôn năm!”</text>
  </g>
""")

# =========================================================================
# 6. CHIẾC LƯỢC NGÀ (Nguyễn Quang Sáng)
# =========================================================================
create_plate("chiecluocnga_cover.svg", "CHIẾC LƯỢC NGÀ • NGUYỄN QUANG SÁNG", "Tình phụ tử thiêng liêng, bất diệt được tôi luyện qua khói lửa chiến tranh khốc liệt", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chiếc lược ngà khắc dòng chữ kỷ niệm và khúc sông Nam Bộ -->
  <g transform="translate(420, 180)">
    <!-- Cây lược bằng ngà voi trắng ngà -->
    <path d="M-110 -20 Q0 -60 110 -20 L110 30 L-110 30 Z" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <!-- Những chiếc răng lược đều tăm tắp -->
    <g stroke="#0E3B52" stroke-width="1.5">
      <line x1="-90" y1="30" x2="-90" y2="70"/><line x1="-70" y1="30" x2="-70" y2="70"/>
      <line x1="-50" y1="30" x2="-50" y2="70"/><line x1="-30" y1="30" x2="-30" y2="70"/>
      <line x1="-10" y1="30" x2="-10" y2="70"/><line x1="10" y1="30" x2="10" y2="70"/>
      <line x1="30" y1="30" x2="30" y2="70"/><line x1="50" y1="30" x2="50" y2="70"/>
      <line x1="70" y1="30" x2="70" y2="70"/><line x1="90" y1="30" x2="90" y2="70"/>
    </g>
    <text x="0" y="10" font-family="'Newsreader', serif" font-size="11" font-style="italic" fill="#BA342A" text-anchor="middle">Yêu nhớ tặng Thu con của ba</text>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">CHIẾC LƯỢC NGÀ</text>
""")

create_plate("chiecluocnga_chia_tay.svg", "CHIẾC LƯỢC NGÀ • PHẦN II (SGK NGỮ VĂN 9)", "Tiếng kêu 'Ba... a... a... ba!' xé lòng của bé Thu trong giờ phút cha con chia ly", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Bé Thu ôm chặt cổ ba, hai chân quặp chặt lấy ba -->
  <g transform="translate(420, 175)">
    <!-- Người cha mang ba lô quân nhân sừng sững -->
    <circle cx="0" cy="-60" r="22" fill="#0E3B52"/>
    <path d="M-28 -35 L-35 60 L35 60 L28 -35 Z" fill="#0E3B52" opacity="0.85"/>
    <ellipse cx="-45" cy="-10" rx="20" ry="30" fill="#1A6B8A" opacity="0.9"/>
    <!-- Bé Thu ôm ghì lấy cổ ba, hôn lên vết sẹo dài bên má -->
    <circle cx="35" cy="-65" r="15" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <path d="M22 -48 L15 15 L45 15 L38 -48 Z" fill="#BA342A" opacity="0.8"/>
  </g>
  <text x="420" y="75" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#BA342A" text-anchor="middle">“Tiếng kêu của nó như xé, xé cả ruột gan mọi người, xé cả sự im lặng của rừng...”</text>
""")

# =========================================================================
# 7. LẶNG LẼ SA PA (Nguyễn Thành Long)
# =========================================================================
create_plate("langle_sapa_cover.svg", "LẶNG LẼ SA PA • NGUYỄN THÀNH LONG", "Bức tranh thơ mộng về những con người thầm lặng cống hiến tuổi xuân cho đất nước", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Đỉnh Yên Sơn mây trắng, vườn hoa lay-ơn rực rỡ và quả địa cầu khí tượng -->
  <g transform="translate(420, 180)">
    <polygon points="-120,60 -40,-40 60,60" fill="#1A6B8A" opacity="0.6"/>
    <polygon points="-20,60 80,-60 160,60" fill="#0E3B52" opacity="0.75"/>
    <!-- Máy đo gió phong hướng kế quay tròn -->
    <line x1="0" y1="20" x2="0" y2="-60" stroke="#0E3B52" stroke-width="2.5"/>
    <circle cx="-25" cy="-60" r="8" fill="#BA342A"/>
    <circle cx="25" cy="-60" r="8" fill="#BA342A"/>
    <!-- Bó hoa lay-ơn rực rỡ trên đỉnh núi -->
    <path d="M-60 60 Q-40 20 -50 0" stroke="#BA342A" stroke-width="2" fill="none"/>
    <circle cx="-50" cy="-5" r="7" fill="#BA342A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">LẶNG LẼ SA PA</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Sa Pa lặng lẽ nhưng dưới vẻ lặng lẽ ấy có những con người đang ngày đêm cháy hết mình...”</text>
""")

create_plate("langle_tang_hoa.svg", "LẶNG LẼ SA PA • PHẦN II (SGK NGỮ VĂN 9)", "Cuộc gặp gỡ 30 phút kỳ diệu — Anh thanh niên cắt tặng cô gái trẻ bó hoa bừng sắc", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 175)">
    <!-- Anh thanh niên ôm bó hoa rực rỡ trao cho cô kỹ sư trẻ -->
    <circle cx="-80" cy="-50" r="18" fill="#0E3B52"/>
    <path d="M-98 -30 L-105 50 L-55 50 L-62 -30 Z" fill="#0E3B52" opacity="0.85"/>
    <!-- Bó hoa lay-ơn, thược dược muôn sắc giữa hai người -->
    <g transform="translate(0, 0)">
      <circle cx="-15" cy="-15" r="12" fill="#BA342A"/>
      <circle cx="15" cy="-15" r="12" fill="#D4A373"/>
      <circle cx="0" cy="-35" r="14" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.5"/>
    </g>
    <circle cx="80" cy="-50" r="18" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <path d="M62 -30 L55 50 L105 50 L98 -30 Z" fill="#BA342A" opacity="0.85"/>
  </g>
  <text x="420" y="75" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#0E3B52" text-anchor="middle">“Khi ta làm việc, ta với công việc là đôi, sao gọi là một mình được?”</text>
""")

# =========================================================================
# 8. NHỮNG NGÔI SAO XA XÔI (Lê Minh Khuê)
# =========================================================================
create_plate("ngoisao_cover.svg", "NHỮNG NGÔI SAO XA XÔI • LÊ MINH KHUÊ", "Vẻ đẹp tâm hồn trong sáng, dũng cảm và lạc quan của ba cô gái thanh niên xung phong Trường Sơn", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Ba ngôi sao tỏa sáng trên nền rừng Trường Sơn khói lửa -->
  <g transform="translate(420, 180)">
    <polygon points="-80,60 0,-70 80,60" fill="#0E3B52" opacity="0.75"/>
    <!-- Ba ngôi sao sáng lấp lánh -->
    <polygon points="-60,-40 -56,-28 -44,-28 -54,-20 -50,-8 -60,-15 -70,-8 -66,-20 -76,-28 -64,-28" fill="#BA342A"/>
    <polygon points="0,-75 4,-63 16,-63 6,-55 10,-43 0,-50 -10,-43 -6,-55 -16,-63 -4,-63" fill="#BA342A"/>
    <polygon points="60,-40 64,-28 76,-28 66,-20 70,-8 60,-15 50,-8 54,-20 44,-28 56,-28" fill="#BA342A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">NHỮNG NGÔI SAO XA XÔI</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Chúng tôi có một quả đồi và những cây thuốc nổ...”</text>
""")

create_plate("ngoisao_pha_bom.svg", "NHỮNG NGÔI SAO XA XÔI • PHẦN II (SGK 9)", "Phương Định một mình bên quả bom nổ chậm — Phút giây cân não đối mặt thần chết", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Quả bom cắm sâu vào sườn đồi và bàn tay châm ngòi nổ -->
  <g transform="translate(420, 180)">
    <!-- Quả bom gang xám lạnh lùng cắm chéo -->
    <path d="M-60 60 L60 -30 L90 -10 L-30 80 Z" fill="#0E3B52"/>
    <circle cx="75" cy="-20" r="18" fill="#BA342A" opacity="0.8"/>
    <!-- Dây cháy chậm đang xì khói xám -->
    <path d="M85 -30 Q120 -50 140 -20" stroke="#BA342A" stroke-width="2" fill="none"/>
    <circle cx="140" cy="-20" r="4" fill="#D4A373"/>
    <!-- Phương Định nằm áp sát mặt đất ngửi thấy mùi đất ẩm -->
    <ellipse cx="-90" cy="50" rx="45" ry="15" fill="#1A6B8A" opacity="0.85"/>
  </g>
  <text x="420" y="75" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#0E3B52" text-anchor="middle">“Cảm giác có một ánh mắt dõi theo mình khiến tôi không sợ nữa...”</text>
""")

# =========================================================================
# 9. DẾ MÈN PHIÊU LƯU KÝ (Tô Hoài)
# =========================================================================
create_plate("demen_cover.svg", "DẾ MÈN PHIÊU LƯU KÝ • TÔ HOÀI", "Pho truyện đồng thoại mẫu mực truyền cảm hứng sống hào hiệp, tự do và đoàn kết bốn phương", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Chú Dế Mèn oai phong cường tráng với đôi càng mẫm bóng -->
  <g transform="translate(420, 180)">
    <!-- Cặp râu dài cong vút kiêu hãnh -->
    <path d="M-20 -50 Q-80 -120 -110 -80" stroke="#0E3B52" stroke-width="3" fill="none"/>
    <path d="M20 -50 Q80 -120 110 -80" stroke="#0E3B52" stroke-width="3" fill="none"/>
    <!-- Thân mình nâu bóng khỏe khoắn -->
    <ellipse cx="0" cy="0" rx="35" ry="55" fill="#0E3B52"/>
    <!-- Đôi càng mẫm bóng có răng cưa sắc nhọn -->
    <path d="M-30 20 L-80 60 L-70 70 L-20 40 Z" fill="#BA342A"/>
    <path d="M30 20 L80 60 L70 70 L20 40 Z" fill="#BA342A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">DẾ MÈN PHIÊU LƯU KÝ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Chao ôi, có hai cái răng cưa nhọn hoắt, hễ co lên là đạp phanh phách...”</text>
""")

create_plate("demen_bai_hoc.svg", "DẾ MÈN PHIÊU LƯU KÝ • BÀI HỌC ĐƯỜNG ĐỜI ĐẦU TIÊN (SGK 6)", "Trêu chọc chị Cốc dẫn đến cái chết oan uổng của Dế Choắt & Giọt nước mắt hối hận", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Bóng chị Cốc to lớn mỏ nhọn như dùi sắt và mộ Dế Choắt xanh cỏ -->
  <g transform="translate(280, 170)">
    <!-- Chị Cốc cánh rộng mỏ nhọn quặp xuống -->
    <path d="M-60 -70 Q0 -90 60 -70 L40 40 L-40 40 Z" fill="#0E3B52" opacity="0.85"/>
    <path d="M0 0 L20 60 L-10 40 Z" fill="#BA342A"/>
  </g>
  <g transform="translate(520, 190)">
    <!-- Nấm mồ Dế Choắt đắp đất vội vàng bên bờ cỏ -->
    <ellipse cx="0" cy="20" rx="60" ry="25" fill="#0E3B52" opacity="0.6"/>
    <!-- Dế Mèn đứng cúi đầu lặng lẽ hối hận -->
    <ellipse cx="0" cy="-25" rx="20" ry="35" fill="#BA342A"/>
    <path d="M-10 -60 Q-30 -90 -40 -70" stroke="#0E3B52" stroke-width="2" fill="none"/>
  </g>
  <text x="420" y="75" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#0E3B52" text-anchor="middle">“Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn cũng mang vạ vào mình...”</text>
""")

# =========================================================================
# 10. CHUYỆN NGƯỜI CON GÁI NAM XƯƠNG (Nguyễn Dữ)
# =========================================================================
create_plate("namxuong_cover.svg", "CHUYỆN NGƯỜI CON GÁI NAM XƯƠNG • NGUYỄN DỮ", "Kiệt tác truyền kỳ về phẩm hạnh đoan trang và nỗi oan khuất bi kịch của nàng Vũ Nương", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Dòng sông Hoàng Giang sóng cuộn và chiếc bóng oan nghiệt trên vách -->
  <g transform="translate(420, 180)">
    <path d="M-140 40 Q0 80 140 40 L120 70 L-120 70 Z" fill="#1A6B8A" opacity="0.6"/>
    <!-- Nàng Vũ Nương bên đèn dầu chỉ bóng lên vách -->
    <circle cx="0" cy="-45" r="22" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <path d="M-22 -22 L-30 40 L30 40 L22 -22 Z" fill="#BA342A" opacity="0.85"/>
    <!-- Chiếc bóng mờ ảo trên vách đá -->
    <ellipse cx="70" cy="-20" rx="25" ry="40" fill="#0E3B52" opacity="0.25"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="18" font-weight="900" fill="#0E3B52" text-anchor="middle">CHUYỆN NGƯỜI CON GÁI NAM XƯƠNG</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Lấy ngọc trâm cài hoa, trẫm mình sông Hoàng Giang minh oan danh tiết...”</text>
""")

create_plate("namxuong_chiec_bong.svg", "CHUYỆN NGƯỜI CON GÁI NAM XƯƠNG • ĐÊM CHỈ BÓNG (SGK 9)", "Chiếc bóng trên vách đêm — Lời dỗ con thơ ngây dại mở đầu cho tấn bi kịch chia lìa", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 175)">
    <!-- Ngọn đèn dầu hắt bóng hai mẹ con lên vách buồng -->
    <circle cx="-120" cy="30" r="8" fill="#BA342A"/>
    <line x1="-120" y1="38" x2="-120" y2="65" stroke="#0E3B52" stroke-width="2"/>
    <!-- Mẹ bế bé Đản trong tay -->
    <circle cx="-40" cy="-30" r="18" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
    <path d="M-55 -10 L-60 65 L-15 65 L-25 -10 Z" fill="#BA342A" opacity="0.8"/>
    <!-- Chiếc bóng khổng lồ in trên vách buồng tối -->
    <ellipse cx="90" cy="-20" rx="55" ry="85" fill="#0E3B52" opacity="0.3"/>
    <text x="90" y="-15" font-family="'Newsreader', serif" font-size="12" font-style="italic" fill="#FAF8F5" text-anchor="middle">“Cha Đản lại đến kia kìa!”</text>
  </g>
""")

# =========================================================================
# 11. TÂY TIẾN (Quang Dũng)
# =========================================================================
create_plate("taytien_cover.svg", "TÂY TIẾN • QUANG DŨNG", "Bức tượng đài bất tử về người lính hào hoa, dũng cảm và tinh thần bi tráng thời kháng chiến", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Dãy núi miền Tây hùng vĩ mây che phủ đỉnh Sài Khao sương lấp -->
    <polygon points="-140,70 -60,-50 20,70" fill="#1A6B8A" opacity="0.6"/>
    <polygon points="-30,70 60,-70 150,70" fill="#0E3B52" opacity="0.8"/>
    <!-- Dòng sông Mã cuộn trào sóng gió -->
    <path d="M-150 70 Q0 110 150 70" stroke="#BA342A" stroke-width="3" fill="none"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">TÂY TIẾN</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Sông Mã xa rồi Tây Tiến ơi! / Nhớ về rừng núi, nhớ chơi vơi...”</text>
""")

create_plate("taytien_song_ma.svg", "TÂY TIẾN • KHỔ I (SGK NGỮ VĂN 12)", "Dốc lên khúc khuỷu dốc thăm thẳm — Thiên nhiên miền Tây heo hút và bước chân hành quân gian lao", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 175)">
    <!-- Đường đèo quanh co uốn lượn lưng trời súng ngửi trời -->
    <path d="M-180 80 Q-90 0 0 -40 T180 -70" stroke="#0E3B52" stroke-width="4" fill="none"/>
    <polygon points="170,-90 190,-70 170,-50" fill="#BA342A"/>
    <!-- Đoàn binh đeo ba lô súng dài nối đuôi nhau trong sương -->
    <circle cx="-100" cy="35" r="10" fill="#0E3B52"/>
    <circle cx="-20" cy="-10" r="10" fill="#0E3B52"/>
    <circle cx="60" cy="-45" r="10" fill="#0E3B52"/>
  </g>
  <text x="420" y="75" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#BA342A" text-anchor="middle">“Heo hút cồn mây súng ngửi trời / Ngàn thước lên cao ngàn thước xuống...”</text>
""")

create_plate("taytien_bi_trang.svg", "TÂY TIẾN • KHỔ III (SGK NGỮ VĂN 12)", "Tây Tiến đoàn binh không mọc tóc — Vẻ đẹp hào hoa, khí phách anh hùng và sự hy sinh thanh thản", """
  <rect x="70" y="30" width="700" height="290" fill="#0E3B52"/>
  <!-- Dáng đứng kiêu hãnh của người chiến sĩ Tây Tiến mắt trừng gửi mộng -->
  <g transform="translate(420, 180)">
    <circle cx="0" cy="-60" r="22" fill="#FAF8F5"/>
    <path d="M-25 -35 L-35 60 L35 60 L25 -35 Z" fill="#FAF8F5" opacity="0.85"/>
    <!-- Khẩu súng báng gỗ gác trên vai -->
    <line x1="-45" y1="50" x2="35" y2="-75" stroke="#BA342A" stroke-width="3.5"/>
    <text x="0" y="100" font-family="'Newsreader', serif" font-size="14" font-style="italic" fill="#FAF8F5" text-anchor="middle">“Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành”</text>
  </g>
""")

# =========================================================================
# 12. VIỆT BẮC (Tố Hữu)
# =========================================================================
create_plate("vietbac_cover.svg", "VIỆT BẮC • TỐ HỮU", "Bản anh hùng ca đằm thắm ân tình cách mạng nguồn cội của dân tộc Việt Nam", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Rừng nứa bờ tre và mái đình Hồng Thái cây đa Tân Trào -->
    <polygon points="-120,60 0,-60 120,60" fill="#1A6B8A" opacity="0.6"/>
    <!-- Người mặc áo chàm tiễn đưa lưu luyến -->
    <circle cx="-40" cy="10" r="18" fill="#0E3B52"/>
    <circle cx="40" cy="10" r="18" fill="#BA342A"/>
    <path d="M-22 10 L22 10" stroke="#FAF8F5" stroke-width="2"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">VIỆT BẮC</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Mình về mình có nhớ ta / Mười lăm năm ấy thiết tha mặn nồng”</text>
""")

create_plate("vietbac_tu_binh.svg", "VIỆT BẮC • BỨC TRANH TỨ BÌNH (SGK 12)", "Rừng xanh hoa chuối đỏ tươi — Vẻ đẹp thiên nhiên bốn mùa và con người lao động nghĩa tình", """
  <rect x="70" y="30" width="700" height="290" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- 4 khung hình nhỏ tượng trưng cho 4 mùa Đông - Xuân - Hạ - Thu -->
  <g transform="translate(160, 160)">
    <rect x="-60" y="-70" width="120" height="140" fill="#0E3B52" opacity="0.85"/>
    <text x="0" y="0" fill="#FAF8F5" font-size="13" text-anchor="middle">MÙA ĐÔNG</text>
  </g>
  <g transform="translate(320, 160)">
    <rect x="-60" y="-70" width="120" height="140" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <text x="0" y="0" fill="#0E3B52" font-size="13" text-anchor="middle">MÙA XUÂN</text>
  </g>
  <g transform="translate(480, 160)">
    <rect x="-60" y="-70" width="120" height="140" fill="#D4A373" opacity="0.9"/>
    <text x="0" y="0" fill="#0E3B52" font-size="13" text-anchor="middle">MÙA HẠ</text>
  </g>
  <g transform="translate(640, 160)">
    <rect x="-60" y="-70" width="120" height="140" fill="#BA342A" opacity="0.85"/>
    <text x="0" y="0" fill="#FAF8F5" font-size="13" text-anchor="middle">MÙA THU</text>
  </g>
""")

# =========================================================================
# 13. SÓNG (Xuân Quỳnh)
# =========================================================================
create_plate("song_cover.svg", "SÓNG • XUÂN QUỲNH", "Bản tình ca bất hủ về nỗi khát khao yêu thương, sự thủy chung và chiêm nghiệm thời gian của người phụ nữ", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Những lớp sóng biển xanh biếc gối đầu nhau xô vào bờ cát -->
    <path d="M-150 40 Q-75 -30 0 40 T150 40" stroke="#1A6B8A" stroke-width="4" fill="none"/>
    <path d="M-150 10 Q-75 -60 0 10 T150 10" stroke="#0E3B52" stroke-width="3" fill="none"/>
    <circle cx="0" cy="-50" r="14" fill="#BA342A" opacity="0.7"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">SÓNG</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Dữ dội và dịu êm / Ồn ào và lặng lẽ / Sông không hiểu nổi mình / Sóng tìm ra tận bể”</text>
""")

# =========================================================================
# 14. ĐỒNG CHÍ (Chính Hữu)
# =========================================================================
create_plate("dongchi_cover.svg", "ĐỒNG CHÍ • CHÍNH HỮU", "Biểu tượng bất tử của tình đồng chí, đồng đội gắn bó keo sơn trong kháng chiến chống Pháp", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <!-- Khẩu súng trường cắm đầu lê có vầng trăng treo lơ lửng -->
  <g transform="translate(420, 180)">
    <line x1="0" y1="90" x2="0" y2="-60" stroke="#0E3B52" stroke-width="4"/>
    <line x1="0" y1="-60" x2="0" y2="-100" stroke="#BA342A" stroke-width="2.5"/>
    <!-- Vầng trăng bạc treo đầu mũi súng -->
    <circle cx="25" cy="-85" r="22" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <path d="M25 -107 A22 22 0 0 1 25 -63 A16 16 0 0 0 25 -107 Z" fill="#D4A373"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">ĐỒNG CHÍ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Đêm nay rừng hoang sương muối / Đứng cạnh bên nhau chờ giặc tới / Đầu súng trăng treo.”</text>
""")

# =========================================================================
# 15. ĐÂY THÔN VĨ DẠ (Hàn Mặc Tử)
# =========================================================================
create_plate("thonvida_cover.svg", "ĐÂY THÔN VĨ DẠ • HÀN MẶC TỬ", "Kiệt tác Thơ Mới xứ Huế đong đầy nỗi hoài nhớ, mặc cảm chia lìa và khát khao giao cảm mãnh liệt", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Hàng cau vươn thẳng đón nắng sớm mướt xanh -->
    <line x1="-50" y1="80" x2="-50" y2="-50" stroke="#0E3B52" stroke-width="3"/>
    <line x1="50" y1="80" x2="50" y2="-60" stroke="#0E3B52" stroke-width="3"/>
    <!-- Thuyền ai đậu bến sông trăng chở trăng về -->
    <path d="M-80 50 Q0 70 80 50 Z" fill="#BA342A"/>
    <circle cx="0" cy="-20" r="30" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">ĐÂY THÔN VĨ DẠ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Sao anh không về chơi thôn Vĩ? / Nhìn nắng hàng cau nắng mới lên...”</text>
""")

# =========================================================================
# 16. NHỚ RỪNG (Thế Lữ)
# =========================================================================
create_plate("nhorung_cover.svg", "NHỚ RỪNG • THẾ LỮ", "Tiếng gầm bi phẫn của chúa sơn lâm trong cũi sắt — Tượng đài giải phóng thi ca của Phong trào Thơ Mới", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Chấn song sắt của vườn bách thú giam hãm -->
    <g stroke="#0E3B52" stroke-width="3.5">
      <line x1="-90" y1="-80" x2="-90" y2="80"/><line x1="-45" y1="-80" x2="-45" y2="80"/>
      <line x1="0" y1="-80" x2="0" y2="80"/><line x1="45" y1="-80" x2="45" y2="80"/>
      <line x1="90" y1="-80" x2="90" y2="80"/>
    </g>
    <!-- Đôi mắt chúa sơn lâm rực lửa sau chấn song sắt -->
    <circle cx="-25" cy="-10" r="8" fill="#BA342A"/>
    <circle cx="25" cy="-10" r="8" fill="#BA342A"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">NHỚ RỪNG</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Gặm một khối căm hờn trong cũi sắt / Ta nằm dài trông ngày tháng dần qua...”</text>
""")

# =========================================================================
# 17. ĐOÀN THUYỀN ĐÁNH CÁ (Huy Cận)
# =========================================================================
create_plate("doanthuyen_cover.svg", "ĐOÀN THUYỀN ĐÁNH CÁ • HUY CẬN", "Khúc tráng ca ngợi ca vẻ đẹp tráng lệ của biển đêm và niềm vui lao động dựng xây đất nước", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Mặt trời lặn xuống biển như hòn lửa đỏ rực -->
    <circle cx="0" cy="10" r="55" fill="#BA342A" opacity="0.85"/>
    <path d="M-120 40 Q0 60 120 40 L100 20 L-100 20 Z" fill="#0E3B52"/>
    <path d="M0 20 L0 -65 L65 20 Z" fill="#1A6B8A" opacity="0.9"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="18" font-weight="900" fill="#0E3B52" text-anchor="middle">ĐOÀN THUYỀN ĐÁNH CÁ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Mặt trời xuống biển như hòn lửa / Sóng đã cài then, đêm sập cửa...”</text>
""")

# =========================================================================
# 18. BẾP LỬA (Bằng Việt)
# =========================================================================
create_plate("beplua_cover.svg", "BẾP LỬA • BẰNG VIỆT", "Khúc tự tình ấm áp, thiêng liêng về tình bà cháu và ngọn lửa bền bỉ nuôi lớn tâm hồn con người", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Ba hòn đá kê bếp lửa hồng ấm cúng bốc khói sớm -->
    <ellipse cx="-40" cy="50" rx="25" ry="15" fill="#0E3B52"/>
    <ellipse cx="40" cy="50" rx="25" ry="15" fill="#0E3B52"/>
    <ellipse cx="0" cy="65" rx="30" ry="15" fill="#0E3B52"/>
    <!-- Ngọn lửa bập bùng cháy đỏ -->
    <path d="M0 45 Q-20 0 0 -45 Q20 0 0 45 Z" fill="#BA342A"/>
    <path d="M0 45 Q-10 15 0 -20 Q10 15 0 45 Z" fill="#D4A373"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">BẾP LỬA</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Một bếp lửa chờn vờn sương sớm / Một bếp lửa ấp iu nồng đượm...”</text>
""")

# =========================================================================
# 19. THUỐC (Lỗ Tấn)
# =========================================================================
create_plate("thuoc_cover.svg", "THUỐC • LỖ TẤN", "Tiếng chuông báo động thức tỉnh căn bệnh u mê, lạc hậu và vô cảm của quốc dân", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Chiếc bánh bao tẩm máu người tử tù gói trong lá sen -->
    <ellipse cx="0" cy="30" rx="70" ry="30" fill="#1A6B8A" opacity="0.4"/>
    <circle cx="0" cy="10" r="35" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <circle cx="0" cy="10" r="18" fill="#BA342A"/>
    <!-- Vòng hoa trắng trên nấm mộ người tử vì đạo -->
    <circle cx="0" cy="-60" r="28" fill="none" stroke="#BA342A" stroke-width="2" stroke-dasharray="4,4"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">THUỐC (药)</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Chiếc bánh bao nhuộm máu Hạ Du và sự u mê của đám đông...”</text>
""")

# =========================================================================
# 20. CỐ HƯƠNG (Lỗ Tấn)
# =========================================================================
create_plate("cohuong_cover.svg", "CỐ HƯƠNG • LỖ TẤN", "Bức tranh hoài hương xót xa và triết lý bất hủ về con đường hy vọng của nhân loại", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Bờ biển vầng trăng rằm cát vàng bãi dưa hấu xanh rờn -->
    <ellipse cx="0" cy="50" rx="130" ry="25" fill="#D4A373" opacity="0.6"/>
    <!-- Vầng trăng rằm tròn vành vạnh -->
    <circle cx="80" cy="-40" r="30" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <!-- Cậu bé Nhuận Thổ cầm đinh ba tra con tra -->
    <line x1="-50" y1="50" x2="-20" y2="-20" stroke="#0E3B52" stroke-width="3"/>
    <circle cx="-50" cy="-40" r="16" fill="#0E3B52"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">CỐ HƯƠNG (故乡)</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Kỳ thực trên mặt đất vốn làm gì có đường. Người ta đi mãi thì thành đường thôi.”</text>
""")

# =========================================================================
# 21. NGƯỜI TRONG BAO (Anton Chekhov)
# =========================================================================
create_plate("nguoitrongbao_cover.svg", "NGƯỜI TRONG BAO • ANTON CHEKHOV", "Kiệt tác trào phúng châm biếm sâu cay lối sống co cụm, sợ hãi và nô dịch trước quyền lực", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Chiếc ô đen, kính râm và đôi ủng cao su của Belikov -->
    <path d="M-60 0 Q0 -60 60 0 Z" fill="#0E3B52"/>
    <line x1="0" y1="0" x2="0" y2="60" stroke="#0E3B52" stroke-width="3"/>
    <circle cx="-25" cy="15" r="12" fill="#0E3B52"/>
    <circle cx="25" cy="15" r="12" fill="#0E3B52"/>
    <line x1="-13" y1="15" x2="13" y2="15" stroke="#BA342A" stroke-width="2"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">NGƯỜI TRONG BAO</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Không thể tiếp tục sống như thế này mãi được!”</text>
""")

# =========================================================================
# 22. ĐÔN KI-HÔ-TÊ (Miguel de Cervantes)
# =========================================================================
create_plate("donkihote_cover.svg", "ĐÔN KI-HÔ-TÊ • MIGUEL DE CERVANTES", "Kiệt tác văn học Phục Hưng Tây Ban Nha về sự đối chọi giữa lý tưởng hiệp sĩ ngây thơ và hiện thực trần trụi", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Cối xay gió khổng lồ cánh quạt vươn rộng bốn góc -->
    <polygon points="-25,70 25,70 15,-30 -15,-30" fill="#0E3B52"/>
    <!-- Bốn cánh quạt cối xay gió quay tít -->
    <line x1="-80" y1="-30" x2="80" y2="-30" stroke="#BA342A" stroke-width="3.5"/>
    <line x1="0" y1="-110" x2="0" y2="50" stroke="#BA342A" stroke-width="3.5"/>
    <!-- Ngọn giáo dài của chàng hiệp sĩ xứ Mancha -->
    <line x1="-120" y1="80" x2="-20" y2="-40" stroke="#D4A373" stroke-width="3"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#0E3B52" text-anchor="middle">ĐÔN KI-HÔ-TÊ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Trận quyết chiến dữ dội với cối xay gió trên cánh đồng Montiel...”</text>
""")

# =========================================================================
# 23. RÔ-MÊ-Ô VÀ GIU-LI-ÉT (William Shakespeare)
# =========================================================================
create_plate("romeo_cover.svg", "RÔ-MÊ-Ô VÀ GIU-LI-ÉT • WILLIAM SHAKESPEARE", "Bi kịch tình yêu bất hủ vượt qua hận thù gia tộc thời kỳ Phục Hưng", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Ban công đá dinh thự Capulet và đóa hồng tình yêu -->
    <rect x="-80" y="20" width="160" height="15" fill="#0E3B52"/>
    <line x1="-70" y1="20" x2="-70" y2="-20" stroke="#0E3B52" stroke-width="2"/>
    <line x1="-35" y1="20" x2="-35" y2="-20" stroke="#0E3B52" stroke-width="2"/>
    <line x1="0" y1="20" x2="0" y2="-20" stroke="#0E3B52" stroke-width="2"/>
    <line x1="35" y1="20" x2="35" y2="-20" stroke="#0E3B52" stroke-width="2"/>
    <line x1="70" y1="20" x2="70" y2="-20" stroke="#0E3B52" stroke-width="2"/>
    <!-- Vầng trăng soi sáng hai người tự tình -->
    <circle cx="80" cy="-60" r="25" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">RÔ-MÊ-Ô VÀ GIU-LI-ÉT</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Ôi Romeo, Romeo! Sao chàng lại là Romeo?...”</text>
""")

# =========================================================================
# 24. NHỮNG NGƯỜI KHỐN KHỔ (Victor Hugo)
# =========================================================================
create_plate("nhungnguoikhonkho_cover.svg", "NHỮNG NGƯỜI KHỐN KHỔ • VICTOR HUGO", "Bản anh hùng ca vĩ đại về lòng bác ái, sự cứu rỗi và phẩm giá thiêng liêng của con người cùng khổ", """
  <rect x="180" y="30" width="480" height="300" rx="8" fill="#EDE6DC" stroke="#0E3B52" stroke-width="1.8"/>
  <g transform="translate(420, 180)">
    <!-- Cặp chân đèn bằng bạc của Giám mục Myriel và ngọn lửa yêu thương -->
    <g transform="translate(-50, 0)">
      <ellipse cx="0" cy="50" rx="30" ry="12" fill="#0E3B52"/>
      <line x1="0" y1="50" x2="0" y2="-20" stroke="#0E3B52" stroke-width="4"/>
      <path d="M0 -20 Q-10 -40 0 -55 Q10 -40 0 -20 Z" fill="#BA342A"/>
    </g>
    <g transform="translate(50, 0)">
      <ellipse cx="0" cy="50" rx="30" ry="12" fill="#0E3B52"/>
      <line x1="0" y1="50" x2="0" y2="-20" stroke="#0E3B52" stroke-width="4"/>
      <path d="M0 -20 Q-10 -40 0 -55 Q10 -40 0 -20 Z" fill="#BA342A"/>
    </g>
  </g>
  <text x="420" y="70" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#0E3B52" text-anchor="middle">NHỮNG NGƯỜI KHỐN KHỔ</text>
  <text x="420" y="95" font-family="'Newsreader', serif" font-size="13" font-style="italic" fill="#BA342A" text-anchor="middle">“Jean Valjean, người anh em của tôi... Tôi đã mua lại linh hồn của anh cho Chúa!”</text>
""")

print("Successfully generated all SVG plates!")
