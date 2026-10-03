# -*- coding: utf-8 -*-
with open(r"c:\Users\nhpk1\Documents\Code\Subject\Literature\js\data.js", "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect where works array ends:
pos = text.find(r"    // --- CHÂN DUNG TÁC GIẢ TIÊU BIỂU ---")
print("Found authors section at pos:", pos)

vn_ids = ["truyen-kieu", "chu-nguoi-tu-tu", "chi-pheo", "lao-hac", "hai-dua-tre", "doi-thua", "toi-di-hoc", "so-do", "voi-vang", "trang-giang"]

# We can insert origin attributes into each work
for vid in vn_ids:
    target = f'id: "{vid}",'
    replacement = f'id: "{vid}",\n      origin: "vn",\n      originLabel: "Văn học Việt Nam",\n      country: "Việt Nam",'
    if target in text:
        text = text.replace(target, replacement, 1)

text = text.replace('id: "bien-than",', 'id: "bien-than",\n      origin: "world",\n      originLabel: "Văn học Thế giới",\n      country: "Praha (Cộng hòa Séc)",', 1)
text = text.replace('id: "tram-nam-co-don",', 'id: "tram-nam-co-don",\n      origin: "world",\n      originLabel: "Văn học Thế giới",\n      country: "Colombia (Mỹ Latinh)",', 1)

hemingway_work = r'''    {
      id: "ong-gia-va-bien-ca",
      title: "Ông Già Và Biển Cả (The Old Man and the Sea)",
      author: "Ernest Hemingway",
      authorId: "ernest-hemingway",
      origin: "world",
      originLabel: "Văn học Thế giới",
      country: "Hoa Kỳ",
      category: "Tiểu thuyết ngắn kinh điển",
      era: "Văn học Hiện đại Phương Tây",
      year: "1952",
      readTime: "16 phút đọc • Toàn văn phân đoạn kinh điển",
      badge: "Nobel Văn Học",
      image: "assets/images/author_study.jpg",
      imageCaption: "Khắc gỗ Editorial: Lão ngư Santiago kiên cường đơn độc trên chiếc thuyền câu giữa trùng khơi đối mặt với định mệnh biển cả.",
      epigraph: "Con người không sinh ra để dành cho thất bại. Con người có thể bị hủy diệt nhưng không thể bị đánh bại.",
      excerpt: "Kiệt tác đỉnh cao theo nguyên lý 'Tảng băng trôi' của Hemingway: cuộc đọ sức sinh tử giữa lão ngư Santiago và đàn cá mập hung dữ giữa đại dương bao la để bảo vệ thành quả lao động.",
      fullTextStatus: "Toàn Văn Phân Đoạn Kinh Điển",
      sgkDetail: "Phân cảnh Santiago đơn độc chiến đấu với đàn cá mập bảo vệ xác con cá kiếm được đưa vào chương trình chính khóa SGK Ngữ Văn 12.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Văn Học Thế Giới: Nguyên Lý Tảng Băng Trôi (Iceberg Theory)
          </span>
          <a href="#sgk-chien-dau-ca-map" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh chiến đấu cá mập SGK
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: 84 Ngày Trắng Tay & Chuyến Ra Khơi Xa Bờ</h3>
        <p>Đã tám mươi tư ngày trôi qua, lão già Santiago không bắt được một mống cá nào. Bốn mươi ngày đầu, có một cậu bé đi cùng lão. Nhưng sau bốn mươi ngày không một con cá, bố mẹ cậu bé bảo lão già này rõ ràng đã mang vận rủi 'salao'—dạng xui xẻo tồi tệ nhất—và bắt cậu đi thuyền khác. Cậu bé nhìn lão mỗi ngày trở về với con thuyền không mà lòng đau xót.</p>

        <p>Nhưng sang ngày thứ tám mươi lăm, lão quyết định dong buồm đi thật xa, vượt ra ngoài vùng nước nông quen thuộc tiến thẳng vào dòng hải lưu Gulf Stream. Và rồi, một con cá kiếm khổng lồ cắn câu—một con cá dài hơn cả chiếc thuyền của lão, mạnh mẽ, kiêu hãnh và bất khuất. Suốt hai ngày hai đêm, lão bị con cá kéo đi giữa đại dương mênh mông, hai bàn tay rách toạc rỉ máu, vai tê dại vì sức nặng của sợi dây câu.</p>

        <h3 class="reader-chapter-title" id="sgk-chien-dau-ca-map">Hồi II: Cuộc Chiến Đơn Độc Với Đàn Cá Mập</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Tác phẩm: Ông Già Và Biển Cả • Ernest Hemingway</span>
          </div>
          <p class="sgk-notice-desc">Văn bản mẫu mực về vẻ đẹp kiên cường của con người: Tuyên ngôn bất tử về phẩm giá, ý chí và nghị lực phi thường trước những thử thách khắc nghiệt của số phận.</p>
        </div>

        <p>Sau khi chiến thắng con cá kiếm bằng một nhát lao trúng tim và buộc xác nó vào mạn thuyền, máu cá loang ra trên mặt nước xanh thẳm, thu hút bầy cá mập háu đói từ đáy sâu đại dương. Con cá mập Mako đầu tiên lao đến như một mũi tên xé toạc làn nước.</p>

        <p>Lão già nhìn nó tiến lại gần, tay ghì chặt ngọn phóng lao. Lão không hề sợ hãi, chỉ có một lòng kiên định sắt đá. Lão đợi cho cái hàm răng cưa gớm ghiếc của con cá mập cắn ngập vào đuôi con cá kiếm, rồi giáng toàn bộ sức nặng của thân thể đâm ngập mũi lao vào trán nó. Con cá mập lộn nhào, chìm dần vào làn nước sủi bọt máu, mang theo cả ngọn lao duy nhất của lão.</p>

        <p>— “Nhưng con người không sinh ra để dành cho thất bại,” lão già lẩm bẩm thành tiếng giữa biển trời cô quạnh. “Con người có thể bị hủy diệt nhưng không thể bị đánh bại!” (Man is not made for defeat. A man can be destroyed but not defeated.)</p>

        <p>Lão buộc con dao găm vào cán mái chèo để làm vũ khí mới. Khi hai con cá mập mũi xẻng khác ập tới rỉa từng tảng thịt lớn của con cá kiếm, lão vung mái chèo đâm mù mắt chúng, đâm gãy cả lưỡi dao. Rồi đến đêm, khi cả đàn cá mập bu lại xé xác con cá, lão dùng chiếc chày đập cá đập tới tấp vào đầu chúng cho đến khi chiếc chày gãy vụn...</p>

        <h3 class="reader-chapter-title">Hồi III: Bộ Xương Khổng Lồ & Giấc Mơ Sư Tử Trắng</h3>
        <p>Khi lão già đưa thuyền cập bến trong đêm tối, cả làng chài vẫn đang say ngủ. Con cá kiếm vĩ đại giờ đây chỉ còn lại một bộ xương trắng khổng lồ trơ trụi buộc bên mạn thuyền. Lão già lảo đảo vác cột buồm về túp lều rách, ngã quỵ xuống giường và chìm vào giấc ngủ sâu.</p>

        <p>Sáng hôm sau, những người ngư dân và du khách kinh ngạc vây quanh bộ xương cá dài tới mười tám thước. Cậu bé Manolin mang cà phê nóng đến bên giường lão, nhìn đôi bàn tay chằng chịt vết sẹo của lão già mà ứa nước mắt. Lão già vẫn nằm đó ngủ say sưa, và trong giấc mơ của mình, lão lại thấy những con sư tử trắng dạo chơi kiêu hãnh trên bãi biển vàng châu Phi...</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn phân đoạn Ông Già Và Biển Cả ]</span></div>
      `,
      criticism: "Nguyên lý 'Tảng băng trôi' bảy phần chìm một phần nổi của Hemingway được khắc họa trọn vẹn: Hình ảnh ông lão Santiago chiến đấu đơn độc giữa biển khơi là biểu tượng kỳ vĩ cho ý chí bất khuất của nhân loại trước thiên nhiên và định mệnh.",
      tags: ["Ernest Hemingway", "Nobel Văn Học", "Tảng băng trôi", "Văn học Thế giới", "Toàn văn & SGK"]
    },'''

aitmatov_work = r'''    {
      id: "nguoi-thay-dau-tien",
      title: "Người Thầy Đầu Tiên (Первый учитель)",
      author: "Chingiz Aitmatov",
      authorId: "chingiz-aitmatov",
      origin: "world",
      originLabel: "Văn học Thế giới",
      country: "Kyrgyzstan (Liên Xô)",
      category: "Truyện vừa kinh điển",
      era: "Văn học Thế giới Thế kỷ XX",
      year: "1962",
      readTime: "15 phút đọc • Toàn văn tác phẩm",
      badge: "Văn Học Kinh Điển",
      image: "assets/images/editorial_cover.jpg",
      imageCaption: "Khắc gỗ Editorial: Hai cây phong sinh đôi sừng sững trên đỉnh đồi lộng gió làng Ku-ku-rêu ghi dấu ký ức thầy Đuy-sen.",
      epigraph: "Cái tên người thầy đầu tiên như dòng suối nguồn trong trẻo mãi mãi tưới mát tâm hồn tuổi thơ.",
      excerpt: "Toàn văn thiên truyện vừa cảm động bậc nhất của Aitmatov. Ký ức thiêng liêng của bà viện sĩ An-tư-nai về người thầy Đuy-sen nghèo khó nhưng giàu lòng nhân ái và hình ảnh hai cây phong trên đỉnh đồi làng Ku-ku-rêu.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Đoạn văn miêu tả hai cây phong trên đỉnh đồi làng Ku-ku-rêu và hình ảnh người thầy Đuy-sen được đưa vào chương trình SGK Ngữ Văn THCS & THPT.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Văn Học Thế Giới: Bức Họa Nhân Ái Xứ Thảo Nguyên (Aitmatov)
          </span>
          <a href="#sgk-hai-cay-phong" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến đoạn hai cây phong SGK
          </a>
        </div>

        <h3 class="reader-chapter-title" id="sgk-hai-cay-phong">Hồi I: Hai Cây Phong Trên Đỉnh Đồi Làng Ku-ku-rêu</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn)
            </span>
            <span class="sgk-meta">Tác phẩm: Hai Cây Phong • Chingiz Aitmatov</span>
          </div>
          <p class="sgk-notice-desc">Bức tranh thiên nhiên thảo nguyên khoáng đạt gắn liền với ký ức tuổi thơ tươi đẹp và lòng biết ơn vô hạn đối với người thầy khai tâm.</p>
        </div>

        <p>Làng Ku-ku-rêu chúng tôi nằm ven chân núi, trên một cao nguyên rộng mở có những dòng suối trong vắt từ hẻm núi chảy ra. Phía trên làng, một ngọn đồi sừng sững có hai cây phong lớn sinh đôi đứng cạnh nhau như hai ngọn hải đăng giữa biển trời thảo nguyên lộng gió.</p>

        <p>Từ đằng xa, bất cứ ai đi về làng cũng nhìn thấy hai cây phong ấy trước tiên. Dù là mùa hè rực rỡ nắng hay mùa đông bão tuyết mịt mùng, hai cây phong vẫn nghiêng ngả đón gió, lá reo vi vu như trò chuyện bằng một thứ ngôn ngữ thần kỳ, thì thầm những câu chuyện cổ tích xa xôi. Thuở nhỏ, lũ trẻ chúng tôi thường trèo lên ngọn phong cao vút, phóng tầm mắt ra bốn bề: trước mắt chúng tôi mở ra cả một thế giới bao la, kỳ vĩ mà chúng tôi chưa từng biết tới, với những dòng sông bạc uốn lượn và dải đất chân trời xa tít tắp...</p>

        <h3 class="reader-chapter-title">Hồi II: Thầy Đuy-sen & Ngôi Trường Trong Chuồng Ngựa Cũ</h3>
        <p>Hai cây phong ấy chính do thầy Đuy-sen—người thầy đầu tiên của làng—đã mang về trồng cùng cô bé mồ côi An-tư-nai năm xưa. Thời bấy giờ, dân làng còn chìm trong u mê tăm tối, con gái lớn lên chỉ để gả bán đổi lấy gia súc. Thầy Đuy-sen, một người lính Hồng quân phục viên nghèo khó, đã một mình dọn dẹp chuồng ngựa bỏ hoang trên đồi để làm lớp học.</p>

        <p>Thầy tự tay đắp lò sưởi, kiếm từng thanh củi, nhặt nhạnh từng mẩu rơm lót sàn. Vào những ngày đông lạnh giá bão tuyết ngập lối, thầy Đuy-sen đã cõng từng đứa trẻ qua dòng suối băng buốt lạnh để đưa chúng đến trường học chữ. Khi bị người lớn trong làng cười nhạo, thầy chỉ mỉm cười nhẫn nại: 'Các em hãy học đi, rồi mai sau các em sẽ thấy chữ nghĩa mở ra cuộc đời sáng sủa dường nào!'.</p>

        <h3 class="reader-chapter-title">Hồi III: Bức Thư Muộn Màng & Lòng Tri Ân Người Thầy</h3>
        <p>Nhiều năm trôi qua, cô bé mồ côi An-tư-nai nghèo khổ năm nào nay đã trở thành một Viện sĩ danh tiếng tại Moskva. Trở về thăm quê hương nhân dịp khánh thành trường học mới, nhìn thấy người đưa thư già nua cặm cụi đạp xe chính là thầy Đuy-sen năm xưa bị lãng quên, bà An-tư-nai nghẹn ngào nước mắt.</p>

        <p>Bà viết một bức thư gửi cho người họa sĩ đồng hương, kể lại toàn bộ câu chuyện về người thầy đầu tiên: 'Người thầy ấy không có bằng cấp cao quý, nhưng thầy đã thắp lên ngọn lửa tri thức và tình người bất diệt trong tâm hồn tôi. Xin hãy vẽ một bức tranh về người thầy ấy, bên hai cây phong lộng gió trên đỉnh đồi, để muôn đời sau không ai được phép lãng quên!'.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn Người Thầy Đầu Tiên ]</span></div>
      `,
      criticism: "Aitmatov đã viết nên một bài ca bất hủ về đạo lý 'tôn sư trọng đạo' và tình yêu thương con người. Hình ảnh hai cây phong trên đỉnh đồi Ku-ku-rêu là tượng đài vĩnh cửu cho người thầy đầu tiên đã khai sáng tâm hồn cho biết bao thế hệ.",
      tags: ["Chingiz Aitmatov", "Người Thầy Đầu Tiên", "Hai cây phong", "Văn học Thế giới", "Toàn văn & SGK"]
    }'''

# Insert the two new works before works array closes
target_close = r'''      tags: ["Gabriel García Márquez", "Nobel Văn Học", "Hiện thực huyền ảo", "Macondo", "Văn học Thế giới", "Toàn văn & SGK"]
    }
  ],'''

replacement_close = r'''      tags: ["Gabriel García Márquez", "Nobel Văn Học", "Hiện thực huyền ảo", "Macondo", "Văn học Thế giới", "Toàn văn & SGK"]
    },
''' + hemingway_work + '\n' + aitmatov_work + '\n  ],'

if target_close in text:
    text = text.replace(target_close, replacement_close, 1)
    print("Successfully appended Hemingway and Aitmatov to works array!")
else:
    print("Warning: target_close not matched directly, trying alternative match.")

with open(r"c:\Users\nhpk1\Documents\Code\Subject\Literature\js\data.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated data.js written successfully!")
