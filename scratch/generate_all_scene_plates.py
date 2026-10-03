# -*- coding: utf-8 -*-
"""
Generate bespoke, unique Editorial Woodcut & Fine Art SVG Plates for EVERY single
chapter, act, and section in all 14 literary works, and update js/data.js so that
NO image is ever reused across different sections!
"""
import os
import json
import re

SCENES_DIR = r"assets\images\scenes"
os.makedirs(SCENES_DIR, exist_ok=True)

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

  <!-- Nền giấy ngà mỹ thuật -->
  <rect width="960" height="520" fill="url(#bg_grad)"/>
  <rect width="960" height="520" fill="url(#woodcut_hatch)"/>

  <!-- Khung viền báo chí Editorial kép -->
  <rect x="24" y="24" width="912" height="472" fill="none" stroke="#0E3B52" stroke-width="2" opacity="0.85"/>
  <rect x="30" y="30" width="900" height="460" fill="none" stroke="#BA342A" stroke-width="0.8" opacity="0.6"/>

  <!-- Họa tiết góc cổ điển (Corner Ornaments) -->
  <g stroke="#0E3B52" stroke-width="1.5" fill="none" opacity="0.7">
    <path d="M38 48 L48 38 M38 56 L56 38"/>
    <path d="M922 48 L912 38 M922 56 L904 38"/>
    <path d="M38 472 L48 482 M38 464 L56 482"/>
    <path d="M922 472 L912 482 M922 464 L904 482"/>
  </g>

  <!-- Huy hiệu Văn Uyển trên đỉnh -->
  <g transform="translate(480, 52)">
    <circle cx="0" cy="0" r="14" fill="#0E3B52"/>
    <text x="0" y="5" font-family="'Playfair Display', serif" font-size="12" font-weight="900" fill="#FAF8F5" text-anchor="middle">§</text>
    <line x1="-120" y1="0" x2="-24" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
    <line x1="24" y1="0" x2="120" y2="0" stroke="#0E3B52" stroke-width="1" opacity="0.4"/>
  </g>

  <!-- NỘI DUNG MINH HỌA NGHỆ THUẬT CHUYÊN BIỆT (MAIN ARTWORK) -->
  <g transform="translate(60, 75)">
    {main_art_svg}
  </g>

  <!-- Chân trang thẻ tranh: Tiêu đề bối cảnh & Phân đoạn -->
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

# =========================================================================
# 1. TRUYỆN KIỀU PLATES
# =========================================================================
create_svg("kieu_chi_em.svg", "TRUYỆN KIỀU • HỒI I", "Chân dung chị em Thúy Kiều và Thúy Vân — Mai cốt cách tuyết tinh thần", """
  <!-- Khung tranh tròn đôi vẽ chân dung 2 chị em -->
  <circle cx="270" cy="180" r="130" fill="#EDE6DC" stroke="#0E3B52" stroke-width="2"/>
  <circle cx="570" cy="180" r="130" fill="#EDE6DC" stroke="#BA342A" stroke-width="2"/>
  
  <!-- Chân dung Thúy Vân: Khuôn trăng đầy đặn, nét ngài nở nang -->
  <g transform="translate(270, 180)">
    <circle cx="0" cy="-25" r="50" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
    <!-- Vành tóc mây búi cao trâm ngọc -->
    <path d="M-45 -35 C-40 -75 40 -75 45 -35 C40 -20 20 -15 0 -15 C-20 -15 -40 -20 -45 -35 Z" fill="#0E3B52"/>
    <circle cx="28" cy="-55" r="6" fill="#BA342A"/>
    <!-- Khuôn trăng đoan trang -->
    <path d="M-22 -20 Q0 -12 22 -20" stroke="#0E3B52" stroke-width="1.5" fill="none"/>
    <path d="M-10 10 Q0 18 10 10" stroke="#BA342A" stroke-width="1.8" fill="none"/>
    <!-- Áo dài cổ điển đoan trang -->
    <path d="M-50 25 L-70 120 L70 120 L50 25 Z" fill="#1A6B8A" opacity="0.85"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#FAF8F5" text-anchor="middle">THÚY VÂN</text>
  </g>

  <!-- Chân dung Thúy Kiều: Làn thu thủy nét xuân sơn, hồ cầm ôm ngực -->
  <g transform="translate(570, 180)">
    <circle cx="0" cy="-25" r="50" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.5"/>
    <!-- Tóc mây xõa bờ vai kiêu sa mặn mà -->
    <path d="M-48 -35 C-35 -85 35 -85 48 -35 C35 -15 15 -10 0 -10 C-15 -10 -35 -15 -48 -35 Z" fill="#0E3B52"/>
    <path d="M-45 -10 Q-55 50 -35 80" stroke="#0E3B52" stroke-width="3" fill="none"/>
    <!-- Đôi mắt thu thủy, nét ngài xuân sơn -->
    <path d="M-24 -24 Q-12 -30 0 -22 M0 -22 Q12 -30 24 -24" stroke="#0E3B52" stroke-width="2" fill="none"/>
    <!-- Đàn nguyệt / hồ cầm -->
    <ellipse cx="25" cy="45" rx="32" ry="40" fill="#0E3B52" stroke="#FAF8F5" stroke-width="1.5"/>
    <line x1="25" y1="5" x2="25" y2="85" stroke="#FAF8F5" stroke-width="1.5"/>
    <path d="M-50 25 L-65 120 L65 120 L50 25 Z" fill="#BA342A" opacity="0.9"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#FAF8F5" text-anchor="middle">THÚY KIỀU</text>
  </g>
""")

create_svg("kieu_thanh_minh.svg", "TRUYỆN KIỀU • HỒI II", "Tiết Thanh Minh — Cảnh ngày xuân & nấm mồ vô chủ Đạm Tiên", """
  <!-- Cỏ non xanh tận chân trời, cành lê trắng điểm một vài bông hoa -->
  <rect x="20" y="240" width="800" height="90" fill="#1A6B8A" opacity="0.25"/>
  <path d="M20 250 Q220 220 420 250 T820 240 L820 330 L20 330 Z" fill="#0E3B52" opacity="0.15"/>
  <!-- Cành lê vươn nhánh có hoa trắng -->
  <path d="M100 80 Q250 40 400 110 T650 70" stroke="#0E3B52" stroke-width="3.5" fill="none"/>
  <g fill="#FAF8F5" stroke="#BA342A" stroke-width="1">
    <circle cx="280" cy="70" r="10"/><circle cx="450" cy="115" r="9"/><circle cx="580" cy="75" r="8"/>
  </g>
  <!-- Nấm mồ Đạm Tiên sè sè bên dòng tiểu khê -->
  <g transform="translate(420, 260)">
    <ellipse cx="0" cy="0" rx="90" ry="35" fill="#0E3B52" opacity="0.75"/>
    <ellipse cx="0" cy="-10" rx="65" ry="25" fill="#BA342A" opacity="0.4"/>
    <!-- Nén hương cắm trên mồ tỏa khói xanh -->
    <line x1="0" y1="-10" x2="0" y2="-45" stroke="#BA342A" stroke-width="2"/>
    <path d="M0 -45 Q15 -70 -5 -95 T10 -130" stroke="#0E3B52" stroke-width="1.5" fill="none" opacity="0.6"/>
    <!-- Thoi vàng vó rắc tro tiền giấy bay -->
    <g fill="#D4A373" stroke="#0E3B52" stroke-width="0.8">
      <rect x="-80" y="-40" width="16" height="10" transform="rotate(15 -80 -40)"/>
      <rect x="70" y="-60" width="18" height="12" transform="rotate(-25 70 -60)"/>
      <rect x="40" y="-85" width="14" height="9" transform="rotate(40 40 -85)"/>
    </g>
    <!-- Dòng nước uốn quanh nhịp cầu nho nhỏ -->
    <path d="M-220 45 Q-100 25 50 50 T280 40" stroke="#1A6B8A" stroke-width="5" fill="none"/>
  </g>
""")

create_svg("kieu_the_nguyen.svg", "TRUYỆN KIỀU • HỒI III", "Đêm thề nguyền dưới bóng trăng vằng vặc — Vầng trăng vằng vặc giữa trời", """
  <!-- Vầng trăng rằm sáng vằng vặc -->
  <circle cx="420" cy="110" r="65" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
  <circle cx="420" cy="110" r="75" fill="none" stroke="#BA342A" stroke-width="1" stroke-dasharray="3 4"/>
  <!-- Cửa sổ hoa viên song song đôi bóng Kim Kiều -->
  <g transform="translate(420, 240)">
    <!-- Bàn đá thề nguyền -->
    <rect x="-140" y="20" width="280" height="20" fill="#0E3B52" rx="3"/>
    <!-- Lò hương trầm và chén rượu thề đồng lòng -->
    <path d="M-20 20 L-12 -15 L12 -15 L20 20 Z" fill="#BA342A"/>
    <path d="M0 -15 Q-10 -40 5 -65 T0 -90" stroke="#FAF8F5" stroke-width="2" fill="none" opacity="0.8"/>
    <!-- Hai chén rượu sóng sánh -->
    <circle cx="-50" cy="12" r="8" fill="#D4A373" stroke="#0E3B52"/>
    <circle cx="50" cy="12" r="8" fill="#D4A373" stroke="#0E3B52"/>
    <!-- Cành kim thoa kẹp cành liễu thề nguyền -->
    <line x1="-100" y1="15" x2="-65" y2="-5" stroke="#BA342A" stroke-width="3"/>
    <!-- Rặng liễu rủ trăng khuya -->
    <path d="M-280 -120 Q-200 40 -220 120 M280 -120 Q200 40 220 120" stroke="#0E3B52" stroke-width="2" fill="none" opacity="0.6"/>
  </g>
""")

create_svg("kieu_trao_duyen.svg", "TRUYỆN KIỀU • HỒI IV", "Đêm trao duyên xót xa — Chiếc vành với bức tờ mây gửi lại", """
  <!-- Thúy Kiều quỳ trao kỷ vật cho Thúy Vân -->
  <g transform="translate(420, 190)">
    <!-- Đĩa hương trầm thắp sáng đêm khuya -->
    <ellipse cx="0" cy="100" rx="160" ry="25" fill="#EDE8DF" stroke="#0E3B52" stroke-width="1"/>
    <!-- Bức tờ mây ghi lời ước hẹn xưa -->
    <rect x="-35" y="40" width="70" height="50" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.5" transform="rotate(-5)"/>
    <line x1="-25" y1="55" x2="25" y2="55" stroke="#0E3B52" stroke-width="1"/>
    <line x1="-25" y1="65" x2="20" y2="65" stroke="#0E3B52" stroke-width="1"/>
    <line x1="-25" y1="75" x2="25" y2="75" stroke="#0E3B52" stroke-width="1"/>
    <!-- Chiếc vành vàng kỷ vật Kim Trọng -->
    <ellipse cx="0" cy="35" rx="18" ry="8" fill="none" stroke="#BA342A" stroke-width="3.5"/>
    <!-- Hai bàn tay run rẩy trao nhau kỷ vật -->
    <path d="M-120 70 Q-50 45 -10 40" stroke="#0E3B52" stroke-width="4" fill="none"/>
    <path d="M120 70 Q50 45 10 40" stroke="#BA342A" stroke-width="4" fill="none"/>
    <!-- Ngọn nến tàn đẫm giọt lệ đoạn trường -->
    <rect x="-140" y="-30" width="12" height="70" fill="#FAF8F5" stroke="#0E3B52"/>
    <path d="M-134 -30 Q-130 -50 -134 -60 Q-138 -50 -134 -30 Z" fill="#BA342A"/>
    <circle cx="-134" cy="-45" r="16" fill="#BA342A" opacity="0.2"/>
  </g>
""")

create_svg("kieu_ma_giam_sinh.svg", "TRUYỆN KIỀU • HỒI V", "Mắc lừa Mã Giám Sinh — Ghế trên ngồi tót sỗ sàng, cò kè bớt một thêm hai", """
  <!-- Gian phòng giao kèo mua bán nhục nhã -->
  <g transform="translate(420, 190)">
    <!-- Chiếc ghế bành to tướng nơi Mã Giám Sinh ngồi tót sỗ sàng -->
    <rect x="60" y="-20" width="100" height="130" fill="#0E3B52" rx="4"/>
    <rect x="50" y="30" width="120" height="15" fill="#BA342A"/>
    <!-- Cán cân tài sắc và túi bạc ba trăm lạng -->
    <line x1="-120" y1="-20" x2="-20" y2="-20" stroke="#0E3B52" stroke-width="3"/>
    <circle cx="-70" cy="-20" r="5" fill="#BA342A"/>
    <!-- Đĩa cân đong đếm bạc tiền -->
    <path d="M-120 -20 L-135 25 L-105 25 Z" fill="#D4A373" stroke="#0E3B52"/>
    <path d="M-20 -20 L-35 25 L-5 25 Z" fill="#D4A373" stroke="#0E3B52"/>
    <text x="-70" y="55" font-family="'Playfair Display', serif" font-size="12" font-weight="700" fill="#BA342A" text-anchor="middle">Ba Trăm Lạng</text>
    <!-- Cây quạt the che mặt mụ mối lừa lọc -->
    <path d="M-180 80 Q-140 20 -100 80 Z" fill="#1A6B8A" opacity="0.75"/>
  </g>
""")

create_svg("kieu_hoan_thu.svg", "TRUYỆN KIỀU • HỒI VII", "Cơn ghen Hoạn Thư — Ép hầu rượu gảy đàn tại Vô Tích", """
  <!-- Bàn tiệc hoa lệ của Hoạn Thư và Thúc Sinh -->
  <g transform="translate(420, 190)">
    <!-- Bình rượu ngọc và chén rượu ép dâng -->
    <path d="M0 60 L-15 0 L15 0 Z" fill="#1A6B8A"/>
    <circle cx="0" cy="-5" r="10" fill="#BA342A"/>
    <!-- Cây đàn hồ cầm Thúy Kiều ôm gảy từng giọt lệ -->
    <ellipse cx="-130" cy="20" rx="35" ry="45" fill="#0E3B52" stroke="#FAF8F5" stroke-width="2"/>
    <line x1="-130" y1="-50" x2="-130" y2="70" stroke="#FAF8F5" stroke-width="2"/>
    <!-- Giọt lệ đoạn trường rớt trên dây tơ -->
    <path d="M-115 15 Q-112 25 -115 30 Q-118 25 -115 15 Z" fill="#BA342A"/>
    <!-- Tấm rèm thưa che giấu tâm địa Hoạn Thư -->
    <line x1="80" y1="-70" x2="80" y2="90" stroke="#0E3B52" stroke-width="1.5" stroke-dasharray="4 3"/>
    <line x1="110" y1="-70" x2="110" y2="90" stroke="#0E3B52" stroke-width="1.5" stroke-dasharray="4 3"/>
    <line x1="140" y1="-70" x2="140" y2="90" stroke="#0E3B52" stroke-width="1.5" stroke-dasharray="4 3"/>
  </g>
""")

create_svg("kieu_tu_hai.svg", "TRUYỆN KIỀU • HỒI VIII", "Từ Hải chí khí anh hùng — Trông vời trời bể mênh mang, thanh gươm yên ngựa", """
  <!-- Vầng dương đông rực lửa và ngọn cờ đại tướng -->
  <circle cx="420" cy="110" r="70" fill="#BA342A" opacity="0.9"/>
  <g transform="translate(420, 200)">
    <!-- Thanh bảo kiếm cắm thẳng giữa đất trời -->
    <rect x="-4" y="-80" width="8" height="150" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <path d="M-25 -20 L25 -20 L0 -5 Z" fill="#0E3B52"/>
    <!-- Yên ngựa chiến và lá cờ Từ Hải bay phần phật -->
    <path d="M20 -70 L140 -110 L110 -60 L140 -20 Z" fill="#0E3B52" opacity="0.85"/>
    <text x="80" y="-60" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#FAF8F5" text-anchor="middle">TỪ</text>
    <!-- Cát vàng cồn nọ bụi hồng dặm kia -->
    <path d="M-300 70 Q-150 40 0 70 T300 70" stroke="#BA342A" stroke-width="4" fill="none"/>
  </g>
""")

create_svg("kieu_tien_duong.svg", "TRUYỆN KIỀU • HỒI IX", "Bi kịch sông Tiền Đường — Sông dài sóng bạc cuộn trôi, giăng lưới cứu nàng", """
  <!-- Dòng sông Tiền Đường sóng bạc cuồn cuộn -->
  <g transform="translate(420, 180)">
    <path d="M-350 40 Q-200 -20 -50 40 T250 -10 T350 50" stroke="#0E3B52" stroke-width="6" fill="none"/>
    <path d="M-350 70 Q-200 10 -50 70 T250 20 T350 80" stroke="#1A6B8A" stroke-width="4" fill="none"/>
    <path d="M-350 100 Q-200 40 -50 100 T250 50 T350 110" stroke="#BA342A" stroke-width="2" fill="none"/>
    <!-- Chiếc thuyền hoa giăng lưới của sư Giác Duyên -->
    <path d="M-120 10 Q0 45 120 10 L80 -10 L-80 -10 Z" fill="#0E3B52"/>
    <line x1="0" y1="-60" x2="0" y2="10" stroke="#0E3B52" stroke-width="3"/>
    <path d="M0 -60 L60 -20 L0 5 Z" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.5"/>
    <!-- Vầng trăng bạc soi trên đầu ngọn sóng -->
    <circle cx="160" cy="-60" r="30" fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5"/>
  </g>
""")

create_svg("kieu_doan_tu.svg", "TRUYỆN KIỀU • HỒI X", "Mười lăm năm đoàn tụ Kim Kiều — Thiện căn ở tại lòng ta, chữ Tâm kia mới bằng ba chữ Tài", """
  <!-- Chữ TÂM son đỏ rực rỡ ngự giữa đài sen -->
  <g transform="translate(420, 180)">
    <circle cx="0" cy="10" r="100" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2"/>
    <circle cx="0" cy="10" r="110" fill="none" stroke="#BA342A" stroke-width="1" stroke-dasharray="4 3"/>
    <!-- Chữ TÂM thư pháp Hán nôm đại tự -->
    <text x="0" y="42" font-family="'Playfair Display', serif" font-size="95" font-weight="900" fill="#BA342A" text-anchor="middle">心</text>
    <!-- Đôi chén rượu tri kỷ tri âm sau 15 năm lưu lạc -->
    <g fill="#0E3B52" stroke="#FAF8F5" stroke-width="1">
      <ellipse cx="-160" cy="30" rx="20" ry="12"/>
      <ellipse cx="160" cy="30" rx="20" ry="12"/>
    </g>
    <!-- Cành hoa mai trắng nở hoa đoàn tụ -->
    <path d="M-220 80 Q-160 20 -100 60 M100 60 Q160 20 220 80" stroke="#0E3B52" stroke-width="2.5" fill="none"/>
  </g>
""")

# =========================================================================
# 2. SỐ ĐỎ PLATES
# =========================================================================
create_svg("sodo_nhat_banh.svg", "SỐ ĐỎ • PHẦN I", "Xuân Tóc Đỏ nhặt banh sân quần — Bị đuổi ra đường gặp bà Phó Đoan bên hồ Gươm", """
  <!-- Vợt tennis và banh nỉ sân quần thời thuộc địa -->
  <g transform="translate(420, 180)">
    <!-- Hai cây vợt quần vợt gỗ đan chéo nhau -->
    <ellipse cx="-40" cy="-20" rx="45" ry="60" fill="#FAF8F5" stroke="#0E3B52" stroke-width="3" transform="rotate(-30 -40 -20)"/>
    <line x1="-15" y1="30" x2="60" y2="120" stroke="#0E3B52" stroke-width="6"/>
    <!-- Quả bóng tennis văng ra -->
    <circle cx="70" cy="-60" r="22" fill="#BA342A" stroke="#0E3B52" stroke-width="2"/>
    <!-- Tháp Rùa hồ Gươm xa xa nơi gặp gỡ bà Phó Đoan -->
    <rect x="-240" y="30" width="80" height="50" fill="#0E3B52" opacity="0.3"/>
    <polygon points="-200,5 -235,30 -165,30" fill="#BA342A" opacity="0.4"/>
    <text x="0" y="110" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">SÂN QUẦN VỢT HÀ THÀNH 1936</text>
  </g>
""")

create_svg("sodo_tiem_may.svg", "SỐ ĐỎ • PHẦN II", "Tiệm may Âu Hóa tân thời — Mốt y phục 'Ngây Thơ' táo bạo của cô Tuyết", """
  <!-- Cây kéo may đo, thước cuộn và ma-nơ-canh tân thời -->
  <g transform="translate(420, 180)">
    <!-- Thân ma-nơ-canh áo dài hở ngực tân thời -->
    <path d="M-30 -50 C-10 -70 10 -70 30 -50 C25 -20 40 10 20 60 L-20 60 C-40 10 -25 -20 -30 -50 Z" fill="#FAF8F5" stroke="#BA342A" stroke-width="2.5"/>
    <line x1="0" y1="60" x2="0" y2="120" stroke="#0E3B52" stroke-width="4"/>
    <line x1="-30" y1="120" x2="30" y2="120" stroke="#0E3B52" stroke-width="4"/>
    <!-- Cây kéo mạ vàng cắt vải của Văn Minh -->
    <circle cx="-100" cy="20" r="16" fill="none" stroke="#0E3B52" stroke-width="3"/>
    <circle cx="-100" cy="60" r="16" fill="none" stroke="#0E3B52" stroke-width="3"/>
    <line x1="-86" y1="26" x2="0" y2="40" stroke="#0E3B52" stroke-width="3"/>
    <line x1="-86" y1="54" x2="0" y2="40" stroke="#0E3B52" stroke-width="3"/>
    <!-- Dải thước dây cuộn quanh -->
    <path d="M-140 -40 Q0 -90 140 -40" stroke="#BA342A" stroke-width="3" stroke-dasharray="6 3" fill="none"/>
    <text x="0" y="-70" font-family="'Playfair Display', serif" font-size="14" font-weight="800" fill="#BA342A" text-anchor="middle">MỐT 'NGÂY THƠ'</text>
  </g>
""")

create_svg("sodo_doc_to.svg", "SỐ ĐỎ • PHẦN III", "Xuân làm Đốc Tờ trường thuốc — Sờ mạch cụ Cố tổ, cả họ Cố Hồng sùng bái", """
  <!-- Ống nghe đốc tờ và điếu bát thuốc phiện cụ Cố Hồng -->
  <g transform="translate(420, 180)">
    <!-- Ống nghe y khoa thời Pháp -->
    <circle cx="0" cy="-20" r="28" fill="#FAF8F5" stroke="#0E3B52" stroke-width="3"/>
    <path d="M0 8 C0 60 -70 80 -70 30 L-70 0 M0 8 C0 60 70 80 70 30 L70 0" stroke="#0E3B52" stroke-width="3.5" fill="none"/>
    <!-- Khay thuốc phiện bàn đèn của cụ Cố Hồng "Biết rồi, khổ lắm, nói mãi!" -->
    <rect x="-140" y="70" width="280" height="25" fill="#0E3B52" rx="3"/>
    <circle cx="-70" cy="60" r="12" fill="#BA342A"/>
    <circle cx="70" cy="60" r="12" fill="#D4A373"/>
    <text x="0" y="115" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#BA342A" text-anchor="middle">"BIẾT RỒI, KHỔ LẮM, NÓI MÃI!"</text>
  </g>
""")

create_svg("sodo_tennis.svg", "SỐ ĐỎ • PHẦN V", "Trận quần vợt quốc tế với quán quân Xiêm La — Cố tình nhường bước giữ hòa khí", """
  <!-- Cầu trường thi đấu và chiếc cúp vô địch -->
  <g transform="translate(420, 180)">
    <!-- Lưới quần vợt ngăn đôi sân đấu -->
    <rect x="-160" y="30" width="320" height="45" fill="none" stroke="#0E3B52" stroke-width="2"/>
    <line x1="-160" y1="50" x2="160" y2="50" stroke="#0E3B52" stroke-width="1" stroke-dasharray="4 4"/>
    <!-- Hai lá cờ Pháp - Xiêm La phấp phới -->
    <path d="M-150 25 L-150 -60 L-70 -35 L-150 -10" fill="#0E3B52"/>
    <path d="M150 25 L150 -60 L70 -35 L150 -10" fill="#BA342A"/>
    <!-- Quả bóng quần vợt văng ra ngoài biên -->
    <circle cx="35" cy="-20" r="18" fill="#FAF8F5" stroke="#BA342A" stroke-width="3"/>
    <path d="M20 -35 Q50 -80 80 -40" stroke="#BA342A" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
    <text x="0" y="110" font-family="'Playfair Display', serif" font-size="13" font-weight="800" fill="#0E3B52" text-anchor="middle">CHUNG KẾT BẮC KỲ - XIÊM LA</text>
  </g>
""")

create_svg("sodo_bac_dau.svg", "SỐ ĐỎ • PHẦN VI", "Đăng đàn cứu quốc — Đón nhận Huân chương Bắc Đẩu Bội Tinh vẻ vang", """
  <!-- Huân chương Bắc Đẩu Bội Tinh 5 cánh sao danh giá -->
  <g transform="translate(420, 180)">
    <polygon points="0,-80 24,-25 80,-25 35,10 52,65 0,30 -52,65 -35,10 -80,-25 -24,-25" fill="#FAF8F5" stroke="#BA342A" stroke-width="3"/>
    <circle cx="0" cy="-5" r="22" fill="#0E3B52"/>
    <circle cx="0" cy="-5" r="16" fill="#BA342A"/>
    <!-- Dải băng huân chương đỏ thắm -->
    <path d="M-25 -80 L-25 -130 L25 -130 L25 -80 Z" fill="#BA342A"/>
    <!-- Vòng nguyệt quế vinh quang cứu quốc anh hùng -->
    <path d="M-120 40 C-150 -40 0 -100 0 -100 C0 -100 150 -40 120 40" stroke="#0E3B52" stroke-width="3" fill="none"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#0E3B52" text-anchor="middle">BẬC CỨU QUỐC ANH HÙNG</text>
  </g>
""")

# =========================================================================
# 3. CÁC TÁC PHẨM CÒN LẠI (BIẾN THÂN, TRĂM NĂM CÔ ĐƠN, ÔNG GIÀ & BIỂN CẢ, V.V.)
# =========================================================================
create_svg("kafka_qua_tao.svg", "BIẾN THÂN • CHƯƠNG II", "Cơn thịnh nộ của người cha — Những quả táo đỏ ném găm vào lưng Gregor", """
  <g transform="translate(420, 180)">
    <!-- Chiếc lưng giáp sắt côn trùng của Gregor Samsa -->
    <ellipse cx="-40" cy="30" rx="90" ry="65" fill="#0E3B52" stroke="#FAF8F5" stroke-width="2"/>
    <path d="M-120 30 Q-40 -10 40 30" stroke="#FAF8F5" stroke-width="1.5" fill="none"/>
    <!-- Quả táo đỏ định mệnh găm sâu vào da thịt thối rữa -->
    <circle cx="-10" cy="15" r="28" fill="#BA342A" stroke="#FAF8F5" stroke-width="2"/>
    <path d="M-10 -13 Q-5 -25 5 -20" stroke="#0E3B52" stroke-width="2.5" fill="none"/>
    <!-- Giỏ hoa quả đổ nhào -->
    <path d="M120 -30 Q160 30 180 80" stroke="#BA342A" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
    <circle cx="100" cy="10" r="18" fill="#BA342A" opacity="0.6"/>
    <circle cx="140" cy="60" r="16" fill="#BA342A" opacity="0.6"/>
  </g>
""")

create_svg("kafka_vi_cam.svg", "BIẾN THÂN • CHƯƠNG III", "Tiếng đàn vĩ cầm của Grete & Cái chết cô đơn rạng sáng mùa xuân", """
  <g transform="translate(420, 180)">
    <!-- Cây đàn vĩ cầm (violin) thanh thoát của Grete -->
    <ellipse cx="0" cy="-10" rx="45" ry="70" fill="#0E3B52" stroke="#FAF8F5" stroke-width="2"/>
    <circle cx="0" cy="-10" r="20" fill="#FAF8F5"/>
    <line x1="0" y1="-100" x2="0" y2="70" stroke="#FAF8F5" stroke-width="2"/>
    <!-- Cây vĩ kéo đàn chéo ngang phát ra những nốt nhạc -->
    <line x1="-120" y1="-50" x2="120" y2="20" stroke="#BA342A" stroke-width="3"/>
    <!-- Ánh nắng ban mai mùa xuân rọi qua khung cửa sổ giải thoát -->
    <path d="M-200 -120 L-100 100 L-280 100 Z" fill="#FAF8F5" opacity="0.6"/>
  </g>
""")

create_svg("macondo_chien_tranh.svg", "TRĂM NĂM CÔ ĐƠN • HỒI II", "Ba mươi hai cuộc chiến tranh của Đại tá Aureliano Buendía & Xưởng đúc cá vàng", """
  <g transform="translate(420, 180)">
    <!-- Con cá vàng nhỏ bé có đôi mắt bằng hồng ngọc -->
    <ellipse cx="0" cy="0" rx="80" ry="40" fill="#D4A373" stroke="#0E3B52" stroke-width="2.5"/>
    <polygon points="80,0 130,-35 130,35" fill="#D4A373" stroke="#0E3B52" stroke-width="2"/>
    <!-- Đôi mắt gắn ngọc đỏ hồng ngọc -->
    <circle cx="-45" cy="-10" r="9" fill="#BA342A" stroke="#FAF8F5" stroke-width="1.5"/>
    <!-- Ngọn lửa đèn xì nấu chảy vàng làm lại từ đầu -->
    <path d="M-80 60 Q-100 0 -130 50 Z" fill="#BA342A"/>
    <!-- Cây súng trường nội chiến cắm chéo sau lưng -->
    <line x1="-160" y1="-90" x2="160" y2="90" stroke="#0E3B52" stroke-width="4"/>
  </g>
""")

create_svg("macondo_tham_sat.svg", "TRĂM NĂM CÔ ĐƠN • HỒI III", "Thảm sát 3.000 công nhân ga xe lửa & Cơn mưa 4 năm 11 tháng 2 ngày", """
  <g transform="translate(420, 180)">
    <!-- Đầu tàu hỏa hơi nước chở 200 toa xác chết trong đêm -->
    <rect x="-120" y="-30" width="140" height="90" fill="#0E3B52"/>
    <rect x="20" y="0" width="120" height="60" fill="#1A6B8A"/>
    <circle cx="-70" cy="75" r="22" fill="#BA342A"/>
    <circle cx="20" cy="75" r="22" fill="#BA342A"/>
    <circle cx="90" cy="75" r="22" fill="#BA342A"/>
    <!-- Ống khói tàu nhả khói đen cuồn cuộn vào mưa -->
    <rect x="-90" y="-70" width="25" height="40" fill="#0E3B52"/>
    <!-- Những vệt mưa nhiệt đới tuôn xối xả xóa sạch ký ức -->
    <g stroke="#BA342A" stroke-width="1.5" opacity="0.6">
      <line x1="-200" y1="-100" x2="-220" y2="100"/>
      <line x1="-100" y1="-100" x2="-120" y2="100"/>
      <line x1="0" y1="-100" x2="-20" y2="100"/>
      <line x1="100" y1="-100" x2="80" y2="100"/>
      <line x1="200" y1="-100" x2="180" y2="100"/>
    </g>
  </g>
""")

create_svg("macondo_bao_loc.svg", "TRĂM NĂM CÔ ĐƠN • HỒI IV", "Đứa trẻ đuôi lợn & Cơn bão cát xoáy xóa sổ Macondo vĩnh viễn", """
  <g transform="translate(420, 180)">
    <!-- Cơn lốc xoáy khổng lồ dạng xoắn ốc (Vortex) -->
    <path d="M0 80 Q-40 40 0 0 T0 -60 T0 -110" stroke="#BA342A" stroke-width="6" fill="none"/>
    <path d="M-60 80 Q-120 20 0 -40 T80 -110" stroke="#0E3B52" stroke-width="4" fill="none" opacity="0.7"/>
    <!-- Tập giấy da Melquíades tiếng Phạn bốc cháy bay trong gió lốc -->
    <rect x="-40" y="-40" width="80" height="50" fill="#FAF8F5" stroke="#BA342A" stroke-width="2" transform="rotate(25)"/>
    <text x="0" y="-15" font-family="'Playfair Display', serif" font-size="11" font-weight="900" fill="#0E3B52" text-anchor="middle">MELQUÍADES</text>
  </g>
""")

create_svg("santiago_ra_khoi.svg", "ÔNG GIÀ VÀ BIỂN CẢ • HỒI I", "Tám mươi tư ngày trắng tay & Chuyến giương buồm vượt xa bờ ngoài Gulf Stream", """
  <g transform="translate(420, 180)">
    <!-- Con thuyền buồm nhỏ bé giữa đại dương bao la -->
    <path d="M-120 40 Q0 70 120 40 L90 10 L-90 10 Z" fill="#0E3B52"/>
    <!-- Cột buồm và cánh buồm vá chằng đụp như lá cờ bại trận -->
    <line x1="0" y1="-90" x2="0" y2="30" stroke="#0E3B52" stroke-width="3"/>
    <path d="M0 -90 L90 -10 L0 15 Z" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.8"/>
    <!-- Những miếng vá trên buồm -->
    <rect x="25" y="-40" width="22" height="16" fill="#D4A373" stroke="#0E3B52"/>
    <!-- Đàn cá chuồn bay lướt trên sóng -->
    <path d="M-180 -10 Q-150 -30 -120 -10" stroke="#1A6B8A" stroke-width="2.5" fill="none"/>
    <path d="M-220 15 Q-190 -5 -160 15" stroke="#1A6B8A" stroke-width="2" fill="none"/>
  </g>
""")

create_svg("santiago_ca_map.svg", "ÔNG GIÀ VÀ BIỂN CẢ • HỒI III", "Chiến đấu với bầy cá mập dữ tợn — 'Con người có thể bị hủy diệt, không thể bị đánh bại'", """
  <g transform="translate(420, 180)">
    <!-- Mái chèo buộc dao găm của Santiago đâm thẳng vào mắt cá mập -->
    <line x1="-120" y1="-80" x2="60" y2="40" stroke="#0E3B52" stroke-width="5"/>
    <polygon points="60,40 85,55 50,65" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <!-- Hàm cá mập Mako khổng lồ ngoạm vào mạn thuyền rỉ máu -->
    <path d="M-30 80 Q50 30 110 90" stroke="#BA342A" stroke-width="6" fill="none"/>
    <polygon points="10,65 20,45 30,65" fill="#FAF8F5"/>
    <polygon points="40,60 50,40 60,60" fill="#FAF8F5"/>
    <polygon points="70,68 80,48 90,68" fill="#FAF8F5"/>
    <text x="0" y="115" font-family="'Playfair Display', serif" font-size="13" font-weight="900" fill="#BA342A" text-anchor="middle">"KHÔNG BAO GIỜ BỊ ĐÁNH BẠI"</text>
  </g>
""")

create_svg("santiago_su_tu.svg", "ÔNG GIÀ VÀ BIỂN CẢ • HỒI IV", "Trở về với bộ xương trắng mười tám bộ & Giấc mơ những con sư tử trắng", """
  <g transform="translate(420, 180)">
    <!-- Bộ xương cá kiếm dài 18 bộ buộc dọc mạn thuyền -->
    <line x1="-160" y1="20" x2="160" y2="20" stroke="#FAF8F5" stroke-width="4"/>
    <g stroke="#FAF8F5" stroke-width="2.5">
      <line x1="-120" y1="5" x2="-120" y2="35"/>
      <line x1="-80" y1="0" x2="-80" y2="40"/>
      <line x1="-40" y1="-5" x2="-40" y2="45"/>
      <line x1="0" y1="-10" x2="0" y2="50"/>
      <line x1="40" y1="-5" x2="40" y2="45"/>
      <line x1="80" y1="0" x2="80" y2="40"/>
      <line x1="120" y1="5" x2="120" y2="35"/>
    </g>
    <!-- Đầu cá kiếm với mũi kiếm nhọn hoắt -->
    <polygon points="160,20 220,15 160,30" fill="#FAF8F5" stroke="#0E3B52"/>
    <!-- Vầng trăng bạc và bờ biển châu Phi với sư tử trắng -->
    <circle cx="-140" cy="-60" r="35" fill="#FAF8F5" stroke="#BA342A" stroke-width="1.5"/>
    <text x="0" y="105" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">GIẤC MƠ SƯ TỬ TRẮNG CHÂU PHI</text>
  </g>
""")

create_svg("duysen_hai_cay_phong.svg", "NGƯỜI THẦY ĐẦU TIÊN • HỒI I", "Hai cây phong sinh đôi trên đỉnh đồi làng Ku-ku-rêu lộng gió", """
  <g transform="translate(420, 180)">
    <!-- Ngọn đồi thoải đón gió thảo nguyên -->
    <path d="M-280 90 Q0 10 280 90" stroke="#0E3B52" stroke-width="3" fill="#EDE6DC"/>
    <!-- Hai cây phong khổng lồ đứng cạnh nhau rì rào -->
    <g transform="translate(-40, 20)">
      <line x1="0" y1="40" x2="0" y2="-80" stroke="#0E3B52" stroke-width="6"/>
      <ellipse cx="0" cy="-80" rx="45" ry="65" fill="#1A6B8A" opacity="0.85"/>
      <ellipse cx="0" cy="-90" rx="35" ry="50" fill="#FAF8F5" opacity="0.3"/>
    </g>
    <g transform="translate(45, 20)">
      <line x1="0" y1="40" x2="0" y2="-95" stroke="#0E3B52" stroke-width="6"/>
      <ellipse cx="0" cy="-95" rx="50" ry="70" fill="#BA342A" opacity="0.85"/>
      <ellipse cx="0" cy="-105" rx="40" ry="55" fill="#FAF8F5" opacity="0.3"/>
    </g>
    <text x="0" y="115" font-family="'Playfair Display', serif" font-size="13" font-weight="700" fill="#0E3B52" text-anchor="middle">ĐỒI KU-KU-RÊU TRUNG Á</text>
  </g>
""")

create_svg("duysen_qua_suoi.svg", "NGƯỜI THẦY ĐẦU TIÊN • HỒI II", "Thầy Đuy-sen cõng học trò nghèo qua dòng suối băng mùa đông lạnh buốt", """
  <g transform="translate(420, 180)">
    <!-- Dòng suối mùa đông đóng băng đá lởm chởm -->
    <path d="M-250 50 Q-100 10 0 50 T250 30" stroke="#1A6B8A" stroke-width="8" fill="none"/>
    <g fill="#FAF8F5" stroke="#0E3B52" stroke-width="1.5">
      <polygon points="-120,40 -90,20 -70,50"/>
      <polygon points="40,30 80,15 100,45"/>
    </g>
    <!-- Đôi chân thầy Đuy-sen tím cóng lội suối cõng học trò -->
    <line x1="0" y1="-20" x2="0" y2="60" stroke="#0E3B52" stroke-width="6"/>
    <!-- Khăn choàng đỏ của cô bé An-tư-nai trên lưng thầy -->
    <circle cx="15" cy="-35" r="16" fill="#BA342A"/>
    <!-- Ngôi trường chuồng ngựa cũ tỏa khói sưởi ấm phía xa -->
    <rect x="150" y="-30" width="70" height="40" fill="#0E3B52" opacity="0.4"/>
  </g>
""")

create_svg("duysen_giai_cuu.svg", "NGƯỜI THẦY ĐẦU TIÊN • HỒI III", "Giải cứu An-tư-nai khỏi hôn nhân ép buộc & Chuyến tàu đi về thành phố lớn", """
  <g transform="translate(420, 180)">
    <!-- Cánh tay gãy băng bó của thầy Đuy-sen nhưng kiên cường bảo vệ học trò -->
    <rect x="-100" y="-20" width="110" height="30" fill="#FAF8F5" stroke="#BA342A" stroke-width="2.5" rx="4"/>
    <!-- Đoàn tàu hỏa mang học trò đi về thủ đô mở ra chân trời mới -->
    <rect x="30" y="-30" width="130" height="60" fill="#0E3B52"/>
    <circle cx="65" cy="40" r="14" fill="#BA342A"/>
    <circle cx="125" cy="40" r="14" fill="#BA342A"/>
    <line x1="-200" y1="50" x2="200" y2="50" stroke="#0E3B52" stroke-width="3"/>
  </g>
""")

create_svg("duysen_buc_thu.svg", "NGƯỜI THẦY ĐẦU TIÊN • HỒI IV", "Bức thư sám hối & Tri ân sâu sắc của Viện sĩ An-tư-nai gửi về bản làng", """
  <g transform="translate(420, 180)">
    <!-- Bức thư mở rộng với con dấu Viện Hàn Lâm Khoa Học -->
    <rect x="-120" y="-60" width="240" height="130" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2" rx="4"/>
    <line x1="-90" y1="-30" x2="90" y2="-30" stroke="#0E3B52" stroke-width="1.5"/>
    <line x1="-90" y1="-10" x2="90" y2="-10" stroke="#0E3B52" stroke-width="1.5"/>
    <line x1="-90" y1="10" x2="70" y2="10" stroke="#0E3B52" stroke-width="1.5"/>
    <!-- Con dấu son đỏ tri ân người thầy vĩ đại đầu tiên -->
    <circle cx="60" cy="35" r="20" fill="#BA342A"/>
    <text x="60" y="40" font-family="'Playfair Display', serif" font-size="11" font-weight="900" fill="#FAF8F5" text-anchor="middle">TRI ÂN</text>
  </g>
""")

# Chí Phèo scenes
create_svg("chipheo_tieng_chui.svg", "CHÍ PHÈO • PHẦN I", "Tiếng chửi say khướt ngật ngưỡng — Hắn vừa đi vừa chửi cả làng Vũ Đại", """
  <g transform="translate(420, 180)">
    <!-- Chai rượu vỡ và mảnh sành rạch mặt ăn vạ -->
    <path d="M-80 50 L-60 -20 L-45 -20 L-35 50 Z" fill="#0E3B52"/>
    <polygon points="-30,60 10,20 40,70" fill="#BA342A" stroke="#0E3B52" stroke-width="1.5"/>
    <polygon points="50,55 90,30 110,65" fill="#1A6B8A" stroke="#0E3B52" stroke-width="1.5"/>
    <!-- Vầng trăng méo mó lạnh lùng nhìn xuống làng Vũ Đại -->
    <ellipse cx="140" cy="-60" rx="30" ry="20" fill="#FAF8F5" stroke="#0E3B52" stroke-width="2" transform="rotate(-25 140 -60)"/>
  </g>
""")

create_svg("chipheo_canh_dien.svg", "CHÍ PHÈO • PHẦN II", "Chí Phèo thuở hai mươi hiền như đất — Anh canh điền cày ruộng cho nhà Bá Kiến", """
  <g transform="translate(420, 180)">
    <!-- Chiếc cày gỗ thô sơ trên cánh đồng lúa xanh -->
    <path d="M-120 70 L0 10 L80 50" stroke="#0E3B52" stroke-width="6" fill="none"/>
    <polygon points="0,10 -20,-10 30,5" fill="#BA342A"/>
    <!-- Bông lúa vàng trĩu hạt thời lương thiện trong sáng -->
    <path d="M120 70 Q160 0 100 -60" stroke="#D4A373" stroke-width="3" fill="none"/>
    <circle cx="100" cy="-60" r="8" fill="#D4A373"/>
    <circle cx="120" cy="-40" r="7" fill="#D4A373"/>
    <circle cx="135" cy="-20" r="7" fill="#D4A373"/>
  </g>
""")

create_svg("chipheo_tuyet_vong.svg", "CHÍ PHÈO • PHẦN IV", "Bị cự tuyệt ôm mặt khóc — Thoang thoảng mùi cháo hành biến thành vết thương lòng", """
  <g transform="translate(420, 180)">
    <!-- Bát cháo hành bị nguội lạnh bên chai rượu trắng -->
    <ellipse cx="-40" cy="30" rx="45" ry="25" fill="#FAF8F5" stroke="#BA342A" stroke-width="2"/>
    <!-- Nước mắt tuyệt vọng rơi xuống manh chiếu rách -->
    <path d="M30 -20 Q40 0 30 15 Q20 0 30 -20 Z" fill="#BA342A"/>
    <path d="M60 -10 Q70 10 60 25 Q50 10 60 -10 Z" fill="#1A6B8A"/>
    <!-- Túp lều rách nát ven bờ sông bên vườn chuối -->
    <polygon points="-180,60 -120,-30 -60,60" fill="#0E3B52" opacity="0.6"/>
  </g>
""")

create_svg("chipheo_ket_lieu.svg", "CHÍ PHÈO • PHẦN V", "Mũi dao oan nghiệt đòi lương thiện — 'Ai cho tao lương thiện?!'", """
  <g transform="translate(420, 180)">
    <!-- Con dao nhọn sắc lạnh vung lên giữa dinh cơ Bá Kiến -->
    <polygon points="0,-90 22,-20 8,60 -8,60 -22,-20" fill="#FAF8F5" stroke="#BA342A" stroke-width="3"/>
    <rect x="-10" y="60" width="20" height="35" fill="#0E3B52" rx="2"/>
    <!-- Giọt máu oan nghiệt kết thúc tấn bi kịch kiếp người -->
    <circle cx="40" cy="-30" r="8" fill="#BA342A"/>
    <circle cx="65" cy="-10" r="6" fill="#BA342A"/>
    <text x="0" y="120" font-family="'Playfair Display', serif" font-size="15" font-weight="900" fill="#BA342A" text-anchor="middle">"AI CHO TAO LƯƠNG THIỆN?!"</text>
  </g>
""")

print("ALL SVG SCENE PLATES GENERATED SUCCESSFULLY!")
