import fitz
import re

pdf_path = 'C:/Users/nhpk1/.gemini/antigravity-ide/brain/8e4f5377-b764-4b67-9de1-ca3ca2021771/.user_uploaded/media_1788425014189.pdf'
doc = fitz.open(pdf_path)
print(f"Total pages in PDF: {len(doc)}")

all_paragraphs = []
current_para = []

for page_num in range(len(doc)):
    page = doc[page_num]
    # get text blocks (x0, y0, x1, y1, text, block_no, block_type)
    blocks = page.get_text('blocks')
    for b in blocks:
        # block_type 0 is text
        if b[6] != 0:
            continue
        text = b[4].strip()
        # Check if block is just a page number (at header or footer)
        if re.match(r'^\d+$', text):
            continue
        
        # Clean lines inside block
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        if not lines:
            continue
        
        # Check if line breaks a word across hyphen: e.g. "lục-" and "tục", or "khúng-" and "khắng"
        joined_block = ""
        for i, l in enumerate(lines):
            if not joined_block:
                joined_block = l
            else:
                if joined_block.endswith('-'):
                    # Could be compound word or word break
                    joined_block = joined_block[:-1] + l
                else:
                    joined_block += " " + l
        
        # Clean multiple spaces
        joined_block = re.sub(r'[ \t]+', ' ', joined_block).strip()
        if joined_block:
            all_paragraphs.append(joined_block)

print(f"Total extracted paragraphs: {len(all_paragraphs)}")
print("\n--- SAMPLE FIRST 5 PARAGRAPHS ---")
for p in all_paragraphs[:5]:
    print("[P]", p[:100], "...")

print("\n--- SAMPLE LAST 3 PARAGRAPHS ---")
for p in all_paragraphs[-3:]:
    print("[P]", p[:100], "...")
