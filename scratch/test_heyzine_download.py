import urllib.request

urls = [
    'https://cdnm.heyzine.com/files/uploaded/v2/0645a307db328268f5101e661e6b18adef9c0504.pdf',
    'https://heyzine.com/files/uploaded/v2/0645a307db328268f5101e661e6b18adef9c0504.pdf',
    'https://cdnm.heyzine.com/files/uploaded/0645a307db328268f5101e661e6b18adef9c0504.pdf',
    'https://heyzine.com/files/uploaded/0645a307db328268f5101e661e6b18adef9c0504.pdf',
    'https://cdnm.heyzine.com/flipbook/pdf/0645a307db.pdf',
    'https://heyzine.com/flip-book/pdf/0645a307db.pdf',
    'https://heyzine.com/api1/pdf?id=0645a307db',
    'https://cdnm.heyzine.com/files/uploaded/v2/36b73a21802a0ce8c97c745e3d5a39488d74d1c72.pdf'
]

for u in urls:
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        resp = urllib.request.urlopen(req)
        cl = resp.headers.get('Content-Length')
        ct = resp.headers.get('Content-Type')
        print(f"SUCCESS ({resp.status}): {u} [Type: {ct}, Length: {cl}]")
    except Exception as e:
        print(f"FAIL: {u} -> {e}")
