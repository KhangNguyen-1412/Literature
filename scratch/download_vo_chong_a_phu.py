import urllib.request
import fitz

url = 'https://cdnm.heyzine.com/files/uploaded/v2/4a62b60aa4e99c8ad7db7501575e9ab648abea03.pdf'
pdf_path = 'scratch/vo_chong_a_phu.pdf'

print(f"Downloading {url} to {pdf_path}...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req) as resp, open(pdf_path, 'wb') as f:
    f.write(resp.read())

print("Downloaded successfully!")
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
for i in range(len(doc)):
    lines = [l.strip() for l in doc[i].get_text().split('\n') if l.strip()]
    first = lines[0] if lines else ''
    second = lines[1] if len(lines) > 1 else ''
    last = lines[-1] if lines else ''
    print(f"Page {i+1}: ({first}) [{second[:40]}] ... [{last[:40]}]")
