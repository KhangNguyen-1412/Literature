# -*- coding: utf-8 -*-
"""
Process user's high-resolution illustrations for Chi Pheo,
optimize to 1600px Retina-ready JPEGs, and update data.js!
"""
import os
from PIL import Image

SRC_DIR = r"assets\images\ChiPheo"
DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

mapping = [
    # Phần I: Chí Phèo ngật ngưỡng vừa đi vừa chửi trên đường làng Vũ Đại
    ("Gemini_Generated_Image_m4hzr1m4hzr1m4hz.png", "chipheo_tieng_chui.jpg",
     "Chí Phèo rách rưới, mặt đầy vết sẹo ngật ngưỡng tay cầm chai rượu vừa đi vừa chửi cả làng Vũ Đại trên đường hoàng hôn"),

    # Phần II: Anh canh điền tuổi 20 hiền như đất cày ruộng Bá Kiến
    ("Gemini_Generated_Image_4tqdm54tqdm54tqd.png", "chipheo_canh_dien.jpg",
     "Chí Phèo thuở đôi mươi hiền như đất, mỉm cười dắt trâu cày ruộng bùn bên tấm biển Ruộng của cụ Bá Kiến"),

    # Phần IV: Nỗi đau đớn tuyệt vọng bị cự tuyệt tình yêu ôm mặt khóc
    ("Gemini_Generated_Image_860en8860en8860e.png", "chipheo_tuyet_vong.jpg",
     "Chí Phèo bị Thị Nở cự tuyệt tình yêu, ngồi bệt bên chai rượu đổ, hai tay ôm mặt khóc rưng rức trong túp lều rách nát"),

    # Phần V: Vung dao đòi lương thiện tại dinh Bá Kiến
    ("Gemini_Generated_Image_duqlhzduqlhzduql.png", "chipheo_ket_lieu.jpg",
     "Chí Phèo phẫn uất xông vào nhà Bá Kiến đòi quyền làm người lương thiện và mũi dao oan nghiệt kết liễu bi kịch")
]

print("--- BẮT ĐẦU XỬ LÝ 4 BỨC TRANH CHÍ PHÈO CỦA ĐỘC GIẢ ---")
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

print("\n--- HOÀN THÀNH XỬ LÝ 4 ẢNH CHÍ PHÈO! ---")
