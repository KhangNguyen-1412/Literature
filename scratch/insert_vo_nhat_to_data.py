import json
import re

with open('scratch/vo_nhat_formatted.html', 'r', encoding='utf-8') as f:
    vo_nhat_html = f.read()

# Load js/data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Author object
kim_lan_author = {
    "id": "kim-lan",
    "name": "Kim Lân",
    "years": "1920 – 2007",
    "avatarInitials": "KL",
    "era": "Văn học Hiện thực & Kháng chiến",
    "bio": "Cây bút truyện ngắn bậc thầy của văn học Việt Nam hiện đại, nhà văn của đồng ruộng và những thú phong lưu đồng quê xứ Bắc. Tác phẩm của ông luôn đẫm tình người, thấu hiểu sâu sắc tâm hồn và số phận người nông dân nghèo.",
    "masterpieces": "Vợ Nhặt, Làng, Con chó xấu xí, Nên vợ nên chồng"
}

# Work object
vo_nhat_work = {
    "id": "vo-nhat",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Vợ Nhặt (Toàn Văn Kiệt Tác)",
    "author": "Kim Lân",
    "authorId": "kim-lan",
    "category": "Truyện ngắn kinh điển",
    "era": "Văn học Hiện thực & Kháng chiến",
    "year": "1962",
    "readTime": "25 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Nhân Đạo",
    "image": "assets/images/vo_nhat.jpg",
    "imageCaption": "Khắc gỗ Editorial: Anh Tràng dẫn người đàn bà áo vá về xóm ngụ cư giữa cảnh chiều hoàng hôn mùa đói 1945.",
    "epigraph": "Trong sự cùng đường của cái chết, con người không nghĩ đến cái chết mà chỉ nghĩ đến sự sống...",
    "excerpt": "Toàn văn truyện ngắn kinh điển của Kim Lân về nạn đói năm Ất Dậu 1945. Bức tranh kỳ diệu về tình người nghèo khổ, niềm khát khao tổ ấm gia đình và ánh sáng hy vọng bên nồi cháo cám.",
    "fullTextStatus": "Toàn Văn Kiệt Tác (5 Hồi)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn truyện ngắn này với trọng tâm là phân cảnh Tràng nhặt được vợ, tâm trạng nghẹn ngào của bà cụ Tứ và bữa cơm ngày đói bên nồi cháo cám.",
    "content": vo_nhat_html,
    "criticism": "Kim Lân đã tạo nên một kỳ tích văn học khi đặt sự sống, tình yêu thương và khát vọng tổ ấm gia đình nảy mầm ngay trên mảnh đất của cái chết và sự hủy diệt. Vợ Nhặt là bài ca bất diệt về phẩm giá con người Việt Nam.",
    "tags": [
        "Kim Lân",
        "Truyện ngắn",
        "Nạn đói 1945",
        "Bà cụ Tứ",
        "SGK Lớp 12",
        "Toàn văn & SGK"
    ]
}

# Convert to JSON string (formatted nicely)
work_json_str = json.dumps(vo_nhat_work, ensure_ascii=False, indent=6)
author_json_str = json.dumps(kim_lan_author, ensure_ascii=False, indent=6)

# 1. Insert vo-nhat right after tat-den in works array
# Find tat-den
tat_den_marker = '"id": "tat-den"'
td_idx = data_js.find(tat_den_marker)
if td_idx == -1:
    print("Error: tat-den not found")
    exit(1)

# Find end of tat-den object (closing `},\n    {` or `}\n  ]`)
# Let's search for the end of tat-den
next_work_marker = '},\n    {\n      "id":'
end_td_idx = data_js.find(next_work_marker, td_idx)

if end_td_idx != -1:
    insert_work_pos = end_td_idx + 1 # after the closing }
    data_js = data_js[:insert_work_pos] + ",\n    " + work_json_str + data_js[insert_work_pos:]
    print("Inserted vo-nhat work into js/data.js!")
else:
    print("Error locating end of tat-den")
    exit(1)

# 2. Insert kim-lan author into authors array
# Find "authors": [
authors_marker = '"authors": [\n    {'
auth_idx = data_js.find(authors_marker)
if auth_idx != -1:
    insert_auth_pos = auth_idx + len('"authors": [\n    ')
    data_js = data_js[:insert_auth_pos] + author_json_str + ",\n    " + data_js[insert_auth_pos:]
    print("Inserted kim-lan author into js/data.js!")
else:
    print("Error locating authors array")
    exit(1)

# Write back to js/data.js
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Successfully written updated js/data.js!")
