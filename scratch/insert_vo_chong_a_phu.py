import json

with open('scratch/vo_chong_a_phu_formatted.html', 'r', encoding='utf-8') as f:
    vo_chong_html = f.read()

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Author object
to_hoai_author = {
    "id": "to-hoai",
    "name": "Tô Hoài",
    "alias": "Nguyễn Sen",
    "years": "1920 – 2014",
    "avatarInitials": "TH",
    "era": "Văn học Hiện đại & Kháng chiến",
    "bio": "Một trong những cây đại thụ vĩ đại nhất của văn xuôi hiện đại Việt Nam. Với vốn hiểu biết sâu rộng về phong tục, tập quán và lối sống của người dân các vùng miền, đặc biệt là đồng bào Tây Bắc, văn chương của ông hấp dẫn bởi lối trần thuật linh hoạt, giàu chất thơ và đậm đà phong vị bản địa.",
    "masterpieces": "Vợ Chồng A Phủ (Truyện Tây Bắc), Dế Mèn Phiêu Lưu Ký, Cát Bụi Chân Ai, Ba Người Khác."
}

# Work object
vo_chong_work = {
    "id": "vo-chong-a-phu",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Vợ Chồng A Phủ (Toàn Văn Kiệt Tác)",
    "author": "Tô Hoài",
    "authorId": "to-hoai",
    "category": "Truyện ngắn kinh điển",
    "era": "Hiện thực Kháng chiến (Truyện Tây Bắc)",
    "year": "1952",
    "readTime": "28 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Tây Bắc",
    "image": "assets/images/scenes/vochongaphu_cover.png",
    "imageCaption": "Khắc gỗ Editorial: Mị ngồi quay sợi gai bên tảng đá trước cửa nhà thống lý Pá Tra nơi vùng núi cao Hồng Ngài.",
    "epigraph": "Mị thấy mình còn trẻ lắm. Mị muốn đi chơi...",
    "excerpt": "Toàn văn truyện ngắn kinh điển của Tô Hoài trong tập 'Truyện Tây Bắc' (1952). Bản trường ca bi tráng về nỗi thống khổ, sức sống tiềm tàng và hành trình vùng lên tự giải phóng của đôi trai gái H'Mông.",
    "fullTextStatus": "Toàn Văn Kiệt Tác (5 Hồi)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy tác phẩm này với hai phân cảnh trọng tâm thi cử: Diễn biến tâm lý Mị trong đêm tình mùa xuân và hành động cởi trói cứu A Phủ trong đêm đông.",
    "content": vo_chong_html,
    "criticism": "Với Vợ Chồng A Phủ, Tô Hoài đã mở ra một trang sử tâm hồn xúc động về người dân miền núi Tây Bắc: Bị vùi dập trong ách áp bức phong kiến và thần quyền, họ vẫn âm ỉ một ngọn lửa sống mãnh liệt để rồi bùng lên tự giải phóng cuộc đời.",
    "tags": [
        "Tô Hoài",
        "Vợ Chồng A Phủ",
        "Truyện Tây Bắc",
        "Tây Bắc",
        "Mị",
        "A Phủ",
        "SGK Lớp 12",
        "Toàn văn & SGK"
    ]
}

work_json_str = json.dumps(vo_chong_work, ensure_ascii=False, indent=6)
author_json_str = json.dumps(to_hoai_author, ensure_ascii=False, indent=6)

# 1. Insert vo-chong-a-phu into works (after vo-nhat)
vo_nhat_marker = '"id": "vo-nhat"'
vn_idx = data_js.find(vo_nhat_marker)
if vn_idx == -1:
    print("Error: vo-nhat not found")
    exit(1)

next_work_marker = '},\n    {\n      "id":'
end_vn_idx = data_js.find(next_work_marker, vn_idx)

if end_vn_idx != -1:
    insert_pos = end_vn_idx + 1 # after }
    data_js = data_js[:insert_pos] + ",\n    " + work_json_str + data_js[insert_pos:]
    print("Inserted vo-chong-a-phu into works!")
else:
    print("Error finding end of vo-nhat")
    exit(1)

# 2. Insert to-hoai into authors
authors_marker = '"authors": [\n    {'
auth_idx = data_js.find(authors_marker)
if auth_idx != -1:
    insert_auth_pos = auth_idx + len('"authors": [\n    ')
    data_js = data_js[:insert_auth_pos] + author_json_str + ",\n    " + data_js[insert_auth_pos:]
    print("Inserted to-hoai author into js/data.js!")
else:
    print("Error locating authors array")
    exit(1)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Saved updated js/data.js successfully!")
