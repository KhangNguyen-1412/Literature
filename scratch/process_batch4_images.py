# -*- coding: utf-8 -*-
"""
Process user's high-resolution illustrations for Voi Vang and So Do,
optimize to 1600px Retina-ready JPEGs into assets/images/scenes/,
and update data.js!
"""
import os
from PIL import Image

DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

batch = [
    # Vội Vàng
    (r"assets\images\VoiVang\Gemini_Generated_Image_8vuzh98vuzh98vuz.png", "voivang_tat_nang.jpg",
     "Khổ I: Tôi muốn tắt nắng đi, buộc gió lại - Chàng thi sĩ vung lưới bắt nắng, buộc gió giữ hương sắc cuộc đời tươi trẻ"),
    (r"assets\images\VoiVang\Gemini_Generated_Image_1hwsim1hwsim1hws.png", "voivang_om_xuan.jpg",
     "Khổ III: Mau đi thôi mùa chưa ngả chiều hôm - Chàng thi sĩ ôm ghì lấy Nàng Xuân ngọt ngào chín mọng"),

    # Số Đỏ
    (r"assets\images\SoDo\Gemini_Generated_Image_9nick89nick89nic.png", "sodo_nhat_banh.jpg",
     "Phần I: Thằng Xuân nhặt banh sân quần vợt bờ hồ và cơ duyên gặp gỡ bà Phó Đoan quý phái"),
    (r"assets\images\SoDo\Gemini_Generated_Image_psx5mmpsx5mmpsx5.png", "sodo_tiem_may.jpg",
     "Phần II: Tiệm may Âu Hóa tân thời, nhà thiết kế TYPN quảng bá y phục giải phóng phụ nữ"),
    (r"assets\images\SoDo\Gemini_Generated_Image_bbvbmobbvbmobbvb.png", "sodo_doc_to.jpg",
     "Phần III: Đốc tờ Xuân sờ mạch cứu nguy cụ Cố tổ bên bàn đèn thuốc phiện cụ Cố Hồng"),
    (r"assets\images\SoDo\Gemini_Generated_Image_yna1mqyna1mqyna1.png", "sodo_tennis.jpg",
     "Phần V: Trận quần vợt quốc tế lịch sử với danh thủ Xiêm La trước vạn khán giả cuồng nhiệt"),
    (r"assets\images\SoDo\Gemini_Generated_Image_nbpwrznbpwrznbpw.png", "sodo_bac_dau.jpg",
     "Phần VI: Xuân Tóc Đỏ đăng đàn diễn thuyết cứu quốc trước Nhà hát Lớn và nhận Huân chương Bắc Đẩu Bội Tinh")
]

print("--- BẮT ĐẦU XỬ LÝ 7 BỨC TRANH VỘI VÀNG & SỐ ĐỎ CỦA ĐỘC GIẢ ---")
for src_path, dest_name, cap in batch:
    dest_path = os.path.join(DEST_DIR, dest_name)
    if not os.path.exists(src_path):
        print(f"LỖI: Không tìm thấy {src_path}")
        continue

    with Image.open(src_path) as im:
        if im.mode != "RGB":
            im = im.convert("RGB")
        w, h = im.size
        if w > 1600:
            new_h = int(h * (1600 / w))
            im = im.resize((1600, new_h), Image.Resampling.LANCZOS)
        im.save(dest_path, "JPEG", quality=92, optimize=True)
        size_kb = os.path.getsize(dest_path) // 1024
        print(f"✓ Đã tối ưu và lưu: {dest_name} ({size_kb} KB) - {cap}")

print("\n--- HOÀN THÀNH XỬ LÝ 7 BỨC TRANH! ---")
