# -*- coding: utf-8 -*-
"""
Process the user's high-resolution storybook illustrations for Chu Nguoi Tu Tu,
optimize them to web-ready 1600px high-quality JPEGs in assets/images/scenes/,
and update js/data.js so each chapter of Chu Nguoi Tu Tu uses the user's exact artwork!
"""
import os
from PIL import Image

SRC_DIR = r"assets\images\ChuNguoitutu"
DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

# Bản đồ ánh xạ chính xác 3 bức tranh của người dùng vào Chữ Người Tử Tù
mapping = [
    # Phần I: Quản ngục và thầy thơ lại mở công văn truyền lệnh tử tù bên ngọn đèn dầu
    ("Gemini_Generated_Image_lvhz9klvhz9klvhz.png", "huancao_cong_van.jpg", 
     "Viên quản ngục và thầy thơ lại mở công văn truyền lệnh nhận tử tù Huấn Cao nguy hiểm bên ngọn đèn dầu"),

    # Phần II: Huấn Cao thúc rệp đạp gông gỗ lim rầm rập xuống thềm đá xanh
    ("Gemini_Generated_Image_ai9hdkai9hdkai9h.png", "huancao_dap_gong.jpg", 
     "Huấn Cao hiên ngang giơ gông gỗ lim nặng nề đạp mạnh thúc rệp xuống thềm đá xanh trước sự kinh sợ của lính canh"),

    # Phần III: Quản ngục đêm khuya trăn trở biệt nhỡn liên tài bên bàn đèn
    ("Gemini_Generated_Image_tmilshtmilshtmil.png", "huancao_quan_nguc.jpg", 
     "Nỗi trăn trở biệt nhỡn liên tài của quản ngục đêm khuya bên án thư và ngọn đèn dầu lay lắt")
]

print("--- BẮT ĐẦU XỬ LÝ 3 BỨC TRANH CHỮ NGƯỜI TỬ TÙ CỦA ĐỘC GIẢ ---")
for src_name, dest_name, cap in mapping:
    src_path = os.path.join(SRC_DIR, src_name)
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

print("\n--- HOÀN THÀNH XỬ LÝ 3 ẢNH CHỮ NGƯỜI TỬ TÙ! ---")
