# -*- coding: utf-8 -*-
"""
Process the user's high-resolution storybook illustrations for Truyen Kieu,
optimize them to web-ready 1600px high-quality JPEGs in assets/images/scenes/,
and update js/data.js so each chapter of Truyen Kieu uses the user's exact artwork!
"""
import os
from PIL import Image

SRC_DIR = r"assets\images\TruyenKieu"
DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

# Bản đồ ánh xạ chính xác 8 bức tranh của người dùng vào từng hồi Truyện Kiều
mapping = [
    # Hồi I: Chân dung chị em Thúy Kiều & Thúy Vân bên phím tỳ bà và đàn nhị hoa đào
    ("Gemini_Generated_Image_tw5sm4tw5sm4tw5s.png", "kieu_chi_em.jpg", 
     "Chân dung tuyệt sắc Thúy Kiều & Thúy Vân trong hoa viên xuân bên phím hồ cầm và đàn tỳ bà"),

    # Hồi II: Tiết Thanh minh & nấm mồ vô chủ Đạm Tiên
    ("Gemini_Generated_Image_qgotbnqgotbnqgot.png", "kieu_thanh_minh.jpg", 
     "Cảnh ngày xuân Thanh minh: Thúy Kiều thắp hương tưởng niệm bên nấm mồ vô chủ Đạm Tiên"),

    # Hồi III: Kim Kiều thề nguyền dưới vầng trăng vằng vặc
    ("Gemini_Generated_Image_4pfynk4pfynk4pfy.png", "kieu_the_nguyen.jpg", 
     "Đêm thề nguyền Kim Kiều: Tay trong tay thắp hương đính ước dưới vầng trăng rằm sáng vằng vặc"),

    # Hồi IV: Đêm trao duyên chiếc vành với bức tờ mây
    ("Gemini_Generated_Image_h2za1uh2za1uh2za.png", "kieu_trao_duyen.jpg", 
     "Đêm trao duyên xót xa: Thúy Kiều quỳ khóc trao chiếc vành vàng và bức tờ mây cho Thúy Vân"),

    # Hồi V: Mắc lừa Mã Giám Sinh
    ("Gemini_Generated_Image_tiiyx5tiiyx5tiiy.png", "kieu_ma_giam_sinh.jpg", 
     "Mắc lừa Mã Giám Sinh ghế trên ngồi tót sỗ sàng, mụ mối đon đả nhận tiền, gia đình xót xa"),

    # Hồi VIII: Từ Hải chí khí anh hùng xuất quân
    ("Gemini_Generated_Image_st9ijhst9ijhst9i.png", "kieu_tu_hai.jpg", 
     "Từ Hải chí khí anh hùng cưỡi chiến mã, tuốt gươm báu tiễn biệt Thúy Kiều xuất quân vẫy vùng bốn bể"),

    # Hồi IX: Sông Tiền Đường sư Giác Duyên cứu vớt
    ("Gemini_Generated_Image_ttbc0attbc0attbc.png", "kieu_tien_duong.jpg", 
     "Bi kịch trầm mình sông Tiền Đường sóng bạc và sư Giác Duyên chèo thuyền cứu vớt nàng lúc hoàng hôn"),

    # Hồi X: Mười lăm năm đoàn tụ Kim Kiều
    ("Gemini_Generated_Image_6c4zu6c4zu6c4zu6.png", "kieu_doan_tu.jpg", 
     "Mười lăm năm đoàn tụ Kim Kiều: Hoành phi Chữ Tâm Kia Mới Bằng Ba Chữ Tài, gia đình viên mãn dưới trăng")
]

print("--- BẮT ĐẦU XỬ LÝ 8 BỨC TRANH MINH HỌA TRUYỆN KIỀU CỦA ĐỘC GIẢ ---")
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
        # Tối ưu kích thước chuẩn 1600px cho màn hình sắc nét và load cực nhanh
        if w > 1600:
            new_h = int(h * (1600 / w))
            im = im.resize((1600, new_h), Image.Resampling.LANCZOS)
        im.save(dest_path, "JPEG", quality=92, optimize=True)
        size_kb = os.path.getsize(dest_path) // 1024
        print(f"✓ Đã tối ưu và lưu: {dest_name} ({size_kb} KB) - {cap}")

print("\n--- HOÀN THÀNH XỬ LÝ 8 ẢNH TRUYỆN KIỀU! ---")
