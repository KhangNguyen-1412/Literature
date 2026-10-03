# -*- coding: utf-8 -*-
"""
Download the remaining 23 masterpiece fine-art paintings from Wikimedia Commons
using iconic, world-famous artworks (Vermeer, Van Gogh, Rembrandt, Carl Spitzweg,
Aivazovsky, Goya, Millet, Monet, etc.).
"""
import urllib.request
import urllib.parse
import json
import os
from PIL import Image

SCENES_DIR = r"assets\images\scenes"
USER_AGENT = "LiteratureApp/1.0 (nhpk1@literature.local) PythonPillow/12.3.0"

def fetch_image(query, target_filename):
    target_path = os.path.join(SCENES_DIR, target_filename)
    if os.path.exists(target_path) and os.path.getsize(target_path) > 10000:
        print(f"Already exists: {target_filename}")
        return True

    try:
        api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json"
        req = urllib.request.Request(api_url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            pages = data.get("query", {}).get("pages", {})
            for pid, page in pages.items():
                ii = page.get("imageinfo", [{}])[0]
                img_url = ii.get("url")
                mime = ii.get("mime", "")
                if img_url and mime in ["image/jpeg", "image/png"]:
                    img_req = urllib.request.Request(img_url, headers={"User-Agent": USER_AGENT})
                    temp_path = target_path + ".tmp"
                    with urllib.request.urlopen(img_req, timeout=15) as img_resp, open(temp_path, "wb") as f:
                        f.write(img_resp.read())

                    with Image.open(temp_path) as im:
                        if im.mode != "RGB":
                            im = im.convert("RGB")
                        w, h = im.size
                        if w > 1200:
                            new_h = int(h * (1200 / w))
                            im = im.resize((1200, new_h), Image.Resampling.LANCZOS)
                        im.save(target_path, "JPEG", quality=85, optimize=True)

                    if os.path.exists(temp_path):
                        os.remove(temp_path)

                    print(f"SUCCESS: {target_filename} (from '{query}')")
                    return True
    except Exception as e:
        print(f"Error '{query}': {e}")
    return False

remaining = [
    ("kieu_chi_em.jpg", "Chinese beauty painting silk"),
    ("kieu_ma_giam_sinh.jpg", "Quentin Matsys The Moneylender and his Wife"),
    ("kieu_tien_duong.jpg", "Ivan Aivazovsky The Ninth Wave"),
    ("kieu_doan_tu.jpg", "Literati gathering painting Ming"),
    ("sodo_tennis.jpg", "Max Liebermann Tennis painting"),
    ("sodo_bac_dau.jpg", "Daumier The Orator painting"),
    ("kafka_qua_tao.jpg", "Edvard Munch The Scream painting"),
    ("duysen_hai_cay_phong.jpg", "Isaac Levitan Golden Autumn"),
    ("duysen_qua_suoi.jpg", "Pieter Bruegel The Hunters in the Snow"),
    ("duysen_giai_cuu.jpg", "Claude Monet Arrival of the Normandy Train"),
    ("duysen_buc_thu.jpg", "Vermeer Lady Writing a Letter"),
    ("chipheo_tieng_chui.jpg", "Vincent van Gogh Country road in Provence by night"),
    ("chipheo_tuyet_vong.jpg", "Van Gogh Sorrowing Old Man"),
    ("chipheo_ket_lieu.jpg", "Caravaggio David with the Head of Goliath"),
    ("huancao_dap_gong.jpg", "Goya The Prison painting"),
    ("huancao_quan_nguc.jpg", "Rembrandt Philosopher in Meditation"),
    ("laohac_ban_cho.jpg", "Jean-Francois Millet The Angelus"),
    ("laohac_cai_chet.jpg", "Vincent van Gogh Thatched Cottages"),
    ("haiduatre_bong_toi.jpg", "Petrus van Schendel Market by Candlelight"),
    ("doithua_com_ao.jpg", "Carl Spitzweg The Poor Poet"),
    ("doithua_sam_hoi.jpg", "Rembrandt Return of the Prodigal Son"),
    ("toidihoc_san_truong.jpg", "Albert Anker The Village School"),
    ("tranggiang_nui_bac.jpg", "Caspar David Friedrich Wanderer above the Sea of Fog")
]

print(f"Downloading {len(remaining)} iconic master paintings...")
success_count = 0
for fname, q in remaining:
    if fetch_image(q, fname):
        success_count += 1

print(f"FINISHED: {success_count}/{len(remaining)} master paintings downloaded!")
