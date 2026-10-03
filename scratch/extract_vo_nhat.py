import fitz
import re

doc = fitz.open('scratch/vo_nhat.pdf')

# Story is on pages 27 to 43 (indexes 26 to 42)
story_pages = list(range(26, 43))

all_blocks = []
footnote_text = ""

for p_idx in story_pages:
    page = doc[p_idx]
    text = page.get_text()
    
    # Check if page 42 or 43 has "Chú thích:"
    if "Chú thích:" in text:
        parts = text.split("Chú thích:")
        story_part = parts[0]
        footnote_text += "\n" + parts[1]
    elif p_idx == 42: # Page 43 is all footnotes
        footnote_text += "\n" + text
        story_part = ""
    else:
        story_part = text
    
    # Process story part
    lines = [l.strip() for l in story_part.split('\n') if l.strip()]
    if not lines: continue
    
    # First line is often page number (26, 27, 28...)
    if re.match(r'^\d+$', lines[0]):
        lines = lines[1:]
    
    # Also if page 27 has title "Vợ nhặt", remove it
    if p_idx == 26 and lines and lines[0] == "Vợ nhặt":
        lines = lines[1:]
        # The line might start with "1rước kia" (typo in PDF for "Trước kia")
        if lines and lines[0].startswith("1rước"):
            lines[0] = "T" + lines[0][1:]
    
    for l in lines:
        all_blocks.append(l)

print(f"Total lines extracted: {len(all_blocks)}")
print(f"Footnote text length: {len(footnote_text)}")

# Let's reconstruct paragraphs
paragraphs = []
curr_p = ""

for l in all_blocks:
    # If line is a footnote mark or ends a sentence and next is a dialogue dash
    if not curr_p:
        curr_p = l
    else:
        # Check if previous ended with hyphen
        if curr_p.endswith('-'):
            curr_p = curr_p[:-1] + l
        elif l.startswith('-') or l.startswith('—') or (re.search(r'[.?!…:;”"]$', curr_p) and (l[0].isupper() or l.startswith('"')) and len(curr_p) > 60):
            paragraphs.append(curr_p)
            curr_p = l
        else:
            curr_p += " " + l

if curr_p:
    paragraphs.append(curr_p)

print(f"Total paragraphs: {len(paragraphs)}")

with open('scratch/vo_nhat_paras.txt', 'w', encoding='utf-8') as f:
    for p in paragraphs:
        f.write(p + '\n\n')

with open('scratch/vo_nhat_footnotes.txt', 'w', encoding='utf-8') as f:
    f.write(footnote_text)

print("Saved paras to scratch/vo_nhat_paras.txt and footnotes to scratch/vo_nhat_footnotes.txt")
