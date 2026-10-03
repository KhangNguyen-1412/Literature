# -*- coding: utf-8 -*-
"""
Download real, authentic classical fine-art paintings and illustrations from Wikimedia Commons
for every single chapter and act, resize them to web-optimized 1000px JPEGs, and replace all SVGs.
"""
import urllib.request
import urllib.parse
import json
import os
from PIL import Image

SCENES_DIR = r"assets\images\scenes"
os.makedirs(SCENES_DIR, exist_ok=True)

USER_AGENT = "LiteratureApp/1.0 (nhpk1@literature.local) PythonPillow/12.3.0"

def search_and_download(query, target_filename, fallback_queries=[]):
    target_path = os.path.join(SCENES_DIR, target_filename)
    if os.path.exists(target_path) and os.path.getsize(target_path) > 10000:
        print(f"Already exists: {target_filename}")
        return True

    all_queries = [query] + fallback_queries
    for q in all_queries:
        try:
            api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json"
            req = urllib.request.Request(api_url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                pages = data.get("query", {}).get("pages", {})
                for pid, page in pages.items():
                    ii = page.get("imageinfo", [{}])[0]
                    img_url = ii.get("url")
                    mime = ii.get("mime", "")
                    if img_url and mime in ["image/jpeg", "image/png"]:
                        # Tải ảnh về
                        img_req = urllib.request.Request(img_url, headers={"User-Agent": USER_AGENT})
                        temp_path = target_path + ".tmp"
                        with urllib.request.urlopen(img_req, timeout=15) as img_resp, open(temp_path, "wb") as f:
                            f.write(img_resp.read())

                        # Dùng PIL để mở và nén thành chuẩn JPG tối ưu 1000px
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

                        print(f"SUCCESS downloaded & processed: {target_filename} (from {q})")
                        return True
        except Exception as e:
            print(f"Failed query '{q}': {e}")
            continue

    print(f"FAILED to download for: {target_filename}")
    return False

# Danh sách tranh hội họa thực thụ cho từng phân cảnh
paintings = [
    # Truyện Kiều
    ("kieu_chi_em.jpg", "Nguyen Phan Chanh young women", ["Indochina woman traditional silk painting", "Two sisters traditional Vietnamese painting", "Vietnamese woman oil painting 1930"]),
    ("kieu_thanh_minh.jpg", "Camille Pissarro Spring landscape green grass", ["Claude Monet Spring meadow", "Millet Spring landscape", "Spring meadow oil painting"]),
    ("kieu_the_nguyen.jpg", "Lovers moonlight oil painting", ["Moonlit garden couple painting", "Caspar David Friedrich Moonrise", "Romantic moonlight lovers painting"]),
    ("kieu_trao_duyen.jpg", "Woman crying night oil painting candle", ["Sad woman farewell oil painting", "Bouguereau weeping woman", "Melancholy woman interior painting"]),
    ("kieu_ma_giam_sinh.jpg", "Oriental merchant bargaining interior painting", ["Old market merchant negotiation painting", "Courbet the meeting interior", "19th century merchant bargaining"]),
    ("kieu_hoan_thu.jpg", "Woman playing lute banquet painting", ["Classical banquet music painting", "Feast music woman instrument painting", "Chamber music oil painting"]),
    ("kieu_tu_hai.jpg", "Warrior general horse departure painting", ["Heroic general departure battle painting", "Equestrian general departure painting", "Heroic warrior horse battlefield painting"]),
    ("kieu_tien_duong.jpg", "Stormy river boat rescue painting Aivazovsky", ["Ivan Aivazovsky stormy river boat", "Turner storm river rescue", "Wave stormy river painting"]),
    ("kieu_doan_tu.jpg", "Reunion peaceful room painting", ["Old friends reunion peaceful oil painting", "Quiet temple room meeting painting", "Reunion oil painting peaceful"]),

    # Số Đỏ
    ("sodo_nhat_banh.jpg", "Tennis match 1920s painting", ["Tennis players vintage 1930s painting", "Hanoi 1930 street scene painting", "Colonial tennis court painting"]),
    ("sodo_tiem_may.jpg", "Fashion salon 1930s dress painting", ["Tailor shop mannequins vintage painting", "Art deco fashion dress painting", "Parisian fashion dressmaker painting"]),
    ("sodo_doc_to.jpg", "Doctor patient pulse bed painting", ["19th century doctor visiting patient painting", "Physician bedside oil painting", "Doctor feeling pulse patient"]),
    ("sodo_tennis.jpg", "Tennis championship spectators painting", ["Tennis match tournament vintage painting", "Grandstand tennis match 1930", "Vintage tennis match audience"]),
    ("sodo_bac_dau.jpg", "Political speech crowd podium painting", ["Public speech orator crowd painting", "Crowd cheering speaker rostrum painting", "Rally speech historic painting"]),

    # Biến Thân
    ("kafka_qua_tao.jpg", "Edvard Munch dramatic room anger painting", ["Expressionism family conflict interior painting", "Dark bedroom conflict painting", "Egon Schiele dramatic room"]),
    ("kafka_vi_cam.jpg", "Edgar Degas girl playing violin", ["Woman playing violin interior painting", "Renoir girl violin painting", "Violinist living room oil painting"]),

    # Trăm Năm Cô Đơn
    ("macondo_chien_tranh.jpg", "19th century Latin America cavalry battle painting", ["Latin America civil war jungle painting", "Cavalry troops jungle battle painting", "Soldiers jungle camp oil painting"]),
    ("macondo_tham_sat.jpg", "Train station night rain painting", ["Railway station rainy night oil painting", "Monet Gare Saint-Lazare rain", "Train station darkness oil painting"]),
    ("macondo_bao_loc.jpg", "Henri Rousseau tropical storm painting", ["Sandstorm desert ruins painting", "Tropical hurricane wilderness painting", "Storm in the jungle Henri Rousseau"]),

    # Ông Già và Biển Cả
    ("santiago_ra_khoi.jpg", "Winslow Homer The Fog Warning", ["Winslow Homer fisherman boat sea", "Small fishing boat dawn sea Homer", "Fisherman rowing sea painting"]),
    ("santiago_ca_map.jpg", "Winslow Homer The Gulf Stream", ["Winslow Homer Gulf Stream shark", "Fisherman fighting sea waves Homer", "Storm sea boat sharks painting"]),
    ("santiago_su_tu.jpg", "Winslow Homer Sunset coast painting", ["Quiet seashore sunset after storm painting", "African coast sunset lions painting", "Seashore evening calm oil painting"]),

    # Người Thầy Đầu Tiên
    ("duysen_hai_cay_phong.jpg", "Semen Chuikov Kyrgyz steppe landscape", ["Central Asia steppe landscape mountains", "Two tall trees windy hill painting", "Vast steppe mountains oil painting"]),
    ("duysen_qua_suoi.jpg", "Winter snow stream crossing school painting", ["Teacher winter snow children stream painting", "Children snow river crossing oil painting", "Winter rural school landscape"]),
    ("duysen_giai_cuu.jpg", "Steam train vast steppe landscape painting", ["Train passing open plains painting", "Steppe railway journey oil painting", "Trans-Siberian train steppe painting"]),
    ("duysen_buc_thu.jpg", "Woman writing letter desk lamp oil painting", ["Letter writer desk window painting", "Woman writing letter evening oil painting", "Scholar woman writing letter painting"]),

    # Chí Phèo
    ("chipheo_tieng_chui.jpg", "Rural dirt road twilight painting", ["Lonely road evening village painting", "Gloomy country road sunset oil painting", "Bui Xuan Phai village road"]),
    ("chipheo_canh_dien.jpg", "Jean-Francois Millet farmer plowing field", ["Millet peasant plowing field painting", "Farmer with plow green field painting", "Peasant laborer rice field painting"]),
    ("chipheo_tuyet_vong.jpg", "Man weeping cottage night painting", ["Lonely sad man shack night oil painting", "Despair man cottage candle painting", "Man crying table dark room painting"]),
    ("chipheo_ket_lieu.jpg", "Stormy night mansion gate oil painting", ["Dark courtyard storm tragedy painting", "Tragic confrontation night house painting", "Mansion courtyard stormy night"]),

    # Chữ Người Tử Tù
    ("huancao_cong_van.jpg", "Ancient mandarin court document painting", ["Imperial officer desk document painting", "Ancient jail officer scroll painting", "Court official reading document"]),
    ("huancao_dap_gong.jpg", "Prisoner wooden cangue shackles painting", ["Heroic prisoner jail courtyard painting", "Ancient prison courtyard guards painting", "Defiant prisoner shackles painting"]),
    ("huancao_quan_nguc.jpg", "Man drinking tea deep in thought night painting", ["Scholar drinking tea moonlight window", "Tea contemplation night painting", "Sage drinking tea night lantern"]),

    # Lão Hạc
    ("laohac_ban_cho.jpg", "Old poor peasant man sorrow cottage painting", ["Millet old peasant grief shack painting", "Elderly peasant sitting lonely cottage", "Old man crying alone humble room"]),
    ("laohac_cai_chet.jpg", "Poor straw hut village morning painting", ["Abandoned peasant hut rural painting", "Empty straw hut quiet village painting", "Rural village tragedy morning painting"]),

    # Hai Đứa Trẻ
    ("haiduatre_chieu_tan.jpg", "Camille Pissarro rural market sunset", ["Village marketplace twilight oil painting", "Dusk falling poor village market", "Rural market dusk painting"]),
    ("haiduatre_bong_toi.jpg", "Street vendor night lantern oil painting", ["Night market glowing stove oil painting", "Dark street night food stall painting", "Glowing lantern night village painting"]),

    # Đời Thừa
    ("doithua_com_ao.jpg", "Poor writer struggling desk lamp painting", ["Impoverished poet attic desk painting", "Frustrated writer broken pen painting", "Writer poverty desk room painting"]),
    ("doithua_sam_hoi.jpg", "Husband embracing wife tears night painting", ["Couple comforting tears bedroom painting", "Repentant man holding wife night oil painting", "Couple sorrow tender embrace painting"]),

    # Tôi Đi Học
    ("toidihoc_san_truong.jpg", "Rural schoolyard morning children painting", ["Children arriving country school painting", "Old school courtyard morning painting", "School bell children courtyard painting"]),
    ("toidihoc_lop_hoc.jpg", "Teacher classroom children writing desks painting", ["Old country classroom teacher students writing", "Students writing notebooks classroom painting", "Historic school classroom writing painting"]),

    # Vội Vàng
    ("voivang_tat_nang.jpg", "Claude Monet sunrise vibrant sky painting", ["Vibrant glowing sunrise sky oil painting", "Golden sun radiant sky impressionism", "Monet Impression Sunrise"]),
    ("voivang_om_xuan.jpg", "Spring blossoms lush meadow vibrant painting", ["Lush spring flowers abundance oil painting", "Claude Monet field of spring flowers", "Bursting spring meadow oil painting"]),

    # Tràng Giang
    ("tranggiang_nui_bac.jpg", "Caspar David Friedrich evening clouds river", ["Turner sunset clouds vast river painting", "Vast river glowing clouds evening painting", "Romantic river dusk silvery clouds"])
]

print(f"Total fine art paintings to process: {len(paintings)}")
count = 0
for filename, query, fallbacks in paintings:
    ok = search_and_download(query, filename, fallbacks)
    if ok:
        count += 1

print(f"\nCOMPLETED: {count}/{len(paintings)} fine-art paintings downloaded and processed!")
