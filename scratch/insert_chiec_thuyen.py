import json

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/scratch/chiec_thuyen_formatted.html', 'r', encoding='utf-8') as f:
    chiec_thuyen_html = f.read()

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Author object
nmc_author = {
    "id": "nguyen-minh-chau",
    "name": "Nguyễn Minh Châu",
    "alias": "Minh Châu",
    "years": "1930 – 1989",
    "avatarInitials": "NMC",
    "era": "Văn học Thời kỳ Đổi mới",
    "bio": "Một trong những cây bút tiên phong, 'người mở đường tinh anh và tài năng nhất' của văn xuôi Việt Nam thời kỳ đổi mới (theo nhận định của nhà văn Nguyên Ngọc). Với cái nhìn đa diện, trĩu nặng âu lo về số phận con người sau chiến tranh, văn chương của ông giàu chất triết lý nhân sinh sâu sắc và lòng trắc ẩn bao la.",
    "masterpieces": "Chiếc Thuyền Ngoài Xa, Bến Quê, Mảnh Trăng Cuối Rừng, Cỏ Lau, Người Đàn Bà Trên Chuyến Tàu Tốc Hành."
}

# Work object
chiec_thuyen_work = {
    "id": "chiec-thuyen-ngoai-xa",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Chiếc Thuyền Ngoài Xa (Toàn Văn Kiệt Tác)",
    "author": "Nguyễn Minh Châu",
    "authorId": "nguyen-minh-chau",
    "category": "Truyện ngắn kinh điển",
    "era": "Văn học Thời kỳ Đổi mới (1983)",
    "year": "1983",
    "readTime": "35 phút đọc • Toàn văn tác phẩm",
    "badge": "Tiên Phong Đổi Mới",
    "image": "assets/images/scenes/chiecthuyen_cover.png",
    "imageCaption": "Minh họa Editorial: Chiếc thuyền ngoài xa ẩn hiện trong bầu sương mù màu trắng sữa pha ánh hồng mai nơi bờ biển miền Trung.",
    "epigraph": "Chẳng biết ai đó lần đầu đã phát hiện ra bản thân cái đẹp chính là đạo đức?",
    "excerpt": "Kiệt tác truyện ngắn xuất sắc bậc nhất của Nguyễn Minh Châu sáng tác năm 1983. Cuộc đối thoại sâu sắc giữa nghệ thuật và đời sống, giữa vẻ đẹp lãng mạn bên ngoài và hiện thực trần trụi, nhọc nhằn của thân phận con người thời hậu chiến.",
    "fullTextStatus": "Toàn Văn Kiệt Tác (4 Hồi)",
    "sgkDetail": "Tác phẩm trọng tâm trong chương trình Ngữ Văn 12 với hai bài học kinh điển: Hai phát hiện của người nghệ sĩ nhiếp ảnh Phùng và câu chuyện cảm động của người đàn bà hàng chài ở Tòa án huyện.",
    "content": chiec_thuyen_html,
    "criticism": "Với Chiếc Thuyền Ngoài Xa, Nguyễn Minh Châu đã đặt ra một bài học nhức nhối về cái nhìn đa diện: Nghệ thuật không thể dừng lại ở vẻ đẹp lãng mạn từ xa, mà phải tiến lại gần để thấu suốt nỗi cơ cực và vẻ đẹp tâm hồn tiềm ẩn của con người giữa đời thực.",
    "tags": [
        "Nguyễn Minh Châu",
        "Chiếc Thuyền Ngoài Xa",
        "Đổi mới",
        "Nghệ sĩ Phùng",
        "Người đàn bà hàng chài",
        "Chánh án Đẩu",
        "SGK Lớp 12",
        "Toàn văn & SGK"
    ]
}

work_json_str = json.dumps(chiec_thuyen_work, ensure_ascii=False, indent=6)
author_json_str = json.dumps(nmc_author, ensure_ascii=False, indent=6)

# 1. Insert chiec-thuyen-ngoai-xa into works (after vo-chong-a-phu)
vc_marker = '"id": "vo-chong-a-phu"'
vc_idx = data_js.find(vc_marker)
if vc_idx == -1:
    print("Error: vo-chong-a-phu not found in data.js")
    exit(1)

next_work_marker = '},\n    {\n      "id":'
end_vc_idx = data_js.find(next_work_marker, vc_idx)

if end_vc_idx != -1:
    insert_pos = end_vc_idx + 1 # after }
    data_js = data_js[:insert_pos] + ",\n    " + work_json_str + data_js[insert_pos:]
    print("Inserted chiec-thuyen-ngoai-xa into works!")
else:
    print("Error finding end of vo-chong-a-phu")
    exit(1)

# Check author
if '"id": "nguyen-minh-chau"' not in data_js:
    authors_marker = '"authors": [\n    {'
    auth_idx = data_js.find(authors_marker)
    if auth_idx != -1:
        insert_auth_pos = auth_idx + len('"authors": [\n    ')
        data_js = data_js[:insert_auth_pos] + author_json_str + ",\n    " + data_js[insert_auth_pos:]
        print("Inserted nguyen-minh-chau author into js/data.js!")
else:
    print("nguyen-minh-chau already in authors, skipping author insert.")

with open('c:/Users/nhpk1/Documents/Code/Subject/Literature/js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Saved updated js/data.js successfully!")
