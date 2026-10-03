import urllib.request
import fitz

url = 'https://cdnm.heyzine.com/files/uploaded/v2/111000b74a55fe5d9d55a637d33fb789f40e67bd.pdf'
pdf_path = 'scratch/chiec_thuyen_ngoai_xa.pdf'

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
