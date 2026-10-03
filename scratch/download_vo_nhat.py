import urllib.request
import fitz

url = 'https://cdnm.heyzine.com/files/uploaded/v2/0645a307db328268f5101e661e6b18adef9c0504.pdf'
pdf_path = 'scratch/vo_nhat.pdf'

print(f"Downloading {url} to {pdf_path}...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req) as resp, open(pdf_path, 'wb') as f:
    f.write(resp.read())

print("Downloaded successfully!")
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
for i in range(min(5, len(doc))):
    print(f"--- Page {i+1} ---")
    print(doc[i].get_text()[:300])
