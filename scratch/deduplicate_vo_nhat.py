import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('scratch/vo_nhat_formatted.html', 'r', encoding='utf-8') as f:
    full_html = f.read()

# 1. Deduplicate author kim-lan
# Find the first kim-lan in authors
author_kim_lan_marker = '{\n      "id": "kim-lan",'
first_author_pos = text.find(author_kim_lan_marker)
second_author_pos = text.find(author_kim_lan_marker, first_author_pos + len(author_kim_lan_marker))

print(f"First kim-lan author at: {first_author_pos}, second at: {second_author_pos}")

# If we have two kim-lan authors, remove the first one (the newly inserted one)
if first_author_pos != -1 and second_author_pos != -1:
    end_first_author = text.find('},\n    {\n      "id":', first_author_pos)
    if end_first_author != -1:
        # text to delete is from first_author_pos to end_first_author + len('},\n    ')
        text = text[:first_author_pos] + text[end_first_author + len('},\n    '):]
        print("Removed duplicate kim-lan author entry successfully.")

# 2. Deduplicate work vo-nhat
# Find both vo-nhat positions
work_pos1 = text.find('{\n      "id": "vo-nhat"')
work_pos2 = text.find('{\n      "id": "vo-nhat"', work_pos1 + len('{\n      "id": "vo-nhat"'))

print(f"First vo-nhat at: {work_pos1}, second at: {work_pos2}")

if work_pos1 != -1 and work_pos2 != -1:
    # First one has year 1962, remove it
    end_work1 = text.find('},\n    {\n      "id":', work_pos1)
    if end_work1 != -1:
        text = text[:work_pos1] + text[end_work1 + len('},\n    '):]
        print("Removed first duplicate vo-nhat work (1962).")

# 3. Now find the remaining vo-nhat (year 1954) and ensure its content is the full text from the flipbook
vo_nhat_pos = text.find('{\n      "id": "vo-nhat"')
if vo_nhat_pos != -1:
    print(f"Remaining vo-nhat found at: {vo_nhat_pos}")
    
    # Check year
    year_match = re.search(r'"year":\s*"([^"]+)"', text[vo_nhat_pos:vo_nhat_pos+500])
    if year_match:
        print(f"Remaining vo-nhat year is: {year_match.group(1)}")
    
    # Update content of this remaining vo-nhat to full_html
    c_start = text.find('"content": "', vo_nhat_pos)
    c_end = text.find('",\n      "criticism":', c_start)
    
    if c_start != -1 and c_end != -1:
        escaped_html = full_html.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
        text = text[:c_start + len('"content": "')] + escaped_html + text[c_end:]
        print("Updated content of 1954 vo-nhat to full unabridged Flipbook text!")
    
    # Update image if needed to our new woodcut cover
    # Let's ensure image is assets/images/vo_nhat.jpg
    # text = text[:vo_nhat_pos] + re.sub(r'"image":\s*"[^"]+"', '"image": "assets/images/vo_nhat.jpg"', text[vo_nhat_pos:vo_nhat_pos+600], count=1) + text[vo_nhat_pos+600:]

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved cleaned js/data.js!")
