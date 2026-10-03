# -*- coding: utf-8 -*-
"""
Process user's high-resolution illustrations for Lao Hac,
optimize to 1600px Retina-ready JPEGs, and update data.js!
"""
import os
from PIL import Image

SRC_DIR = r"assets\images\LaoHac"
DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

mapping = [
    # Phần II: Lão Hạc sang nhà ông giáo khóc xót xa sau khi bán cậu Vàng
    ("Gemini_Generated_Image_n8kabln8kabln8ka.png", "laohac_ban_cho.jpg",
     "Lão Hạc ngồi ôm mặt khóc xót xa bên chiếc bát và sợi dây thừng trống không sau khi bán cậu Vàng, ông giáo nhìn ra xót xa"),

    # Phần III: Cái chết dữ dội giữ trọn mảnh vườn ba sào cho con
    ("Gemini_Generated_Image_s3aprgs3aprgs3ap.png", "laohac_cai_chet.jpg",
     "Lão Hạc quằn quại trên mảnh vườn rau trước căn nhà tranh, chọn cái chết dữ dội để giữ trọn vẹn mảnh vườn cho con trai")
]

print("--- BẮT ĐẦU XỬ LÝ 2 BỨC TRANH LÃO HẠC CỦA ĐỘC GIẢ ---")
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

print("\n--- HOÀN THÀNH XỬ LÝ 2 ẢNH LÃO HẠC! ---")
