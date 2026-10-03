# -*- coding: utf-8 -*-
"""
Process user's high-resolution illustrations for Doi Thua, Hai Dua Tre, and Toi Di Hoc,
optimize to 1600px Retina-ready JPEGs into assets/images/scenes/,
and update data.js!
"""
import os
from PIL import Image

DEST_DIR = r"assets\images\scenes"
os.makedirs(DEST_DIR, exist_ok=True)

batch = [
    # Đời Thừa
    (r"assets\images\DoiThua\Gemini_Generated_Image_ze081gze081gze08.png", "doithua_com_ao.jpg",
     "Phần II: Bi kịch cơm áo gạo tiền nghiền nát nghệ thuật và nỗi đau viết văn cẩu thả của nhà văn Hộ"),
    (r"assets\images\DoiThua\Gemini_Generated_Image_ppti3pppti3pppti.png", "doithua_sam_hoi.jpg",
     "Phần III: Nước mắt sám hối của Hộ ôm chặt người vợ tảo tần Từ trong đêm say mệt mỏi"),

    # Hai Đứa Trẻ
    (r"assets\images\HaiDuaTre\Gemini_Generated_Image_uqsa4zuqsa4zuqsa.png", "haiduatre_chieu_tan.jpg",
     "Phần I: Chiều tàn trên phố huyện nghèo, tiếng trống thu không và mẹ con chị Tí dọn hàng"),
    (r"assets\images\HaiDuaTre\Gemini_Generated_Image_gv3yy5gv3yy5gv3y.png", "haiduatre_bong_toi.jpg",
     "Phần II: Đêm tối tịch mịch phố huyện, bếp than đỏ rực gánh phở bác Siêu bập bùng trong đêm lạnh"),

    # Tôi Đi Học
    (r"assets\images\ToiDiHoc\Gemini_Generated_Image_q1rjafq1rjafq1rj.png", "toidihoc_me_dat_tay.jpg",
     "Phần I: Buổi mai sương thu gió lạnh - Bàn tay ấm áp của mẹ dắt con đến trường trên con đường làng"),
    (r"assets\images\ToiDiHoc\Gemini_Generated_Image_2e30k82e30k82e30.png", "toidihoc_san_truong.jpg",
     "Phần II: Sân trường Mỹ Lý ngày tựu trường rộn rã và tiếng gọi tên trang nghiêm của ông Đốc"),
    (r"assets\images\ToiDiHoc\Gemini_Generated_Image_mzix5lmzix5lmzix.png", "toidihoc_lop_hoc.jpg",
     "Phần III: Bước vào lớp học đầu đời thơm mùi vôi và trang vở nắn nót những nét chữ cái đầu tiên")
]

print("--- BẮT ĐẦU XỬ LÝ 7 BỨC TRANH ĐỜI THỪA, HAI ĐỨA TRẺ & TÔI ĐI HỌC ---")
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
