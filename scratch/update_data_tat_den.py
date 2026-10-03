with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

target = '"id": "tat-den"'
idx = text.find(target)
print("Index:", idx)

content_start_marker = '"content": "'
c_start = text.find(content_start_marker, idx)
print("content start:", c_start)

# End of content is '",\n      "criticism":'
criticism_marker = '",\n      "criticism":'
c_end = text.find(criticism_marker, c_start)
print("content end:", c_end)

if idx != -1 and c_start != -1 and c_end != -1:
    with open('scratch/tat_den_formatted.html', 'r', encoding='utf-8') as f:
        html = f.read()
    escaped_html = html.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    new_text = text[:c_start + len(content_start_marker)] + escaped_html + text[c_end:]
    
    # Also update title, readTime, badge, fullTextStatus
    new_text = new_text.replace('"title": "Tắt Đèn (Trọn Vẹn Các Hồi Chính)"', '"title": "Tắt Đèn (Toàn Văn Tiểu Thuyết)"')
    new_text = new_text.replace('"readTime": "24 phút đọc • Toàn cảnh tiểu thuyết"', '"readTime": "150 phút đọc • Toàn văn 18 hồi"')
    new_text = new_text.replace('"fullTextStatus": "Toàn Cảnh Tiểu Thuyết (5 Hồi)"', '"fullTextStatus": "Toàn Văn Tiểu Thuyết (18 Hồi)"')
    
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Done! Updated js/data.js successfully.")
else:
    print("Failed to find markers.")
