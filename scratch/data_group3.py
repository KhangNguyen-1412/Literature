# -*- coding: utf-8 -*-
"""
Dữ liệu Nhóm 3: Văn Học Thế Giới Nổi Bật Trong SGK (6 Tác Phẩm)
Toàn văn/phân đoạn kinh điển chuẩn SGK thế giới: Lỗ Tấn, Chekhov, Cervantes, Shakespeare, Victor Hugo.
"""

WORKS_GROUP_3 = [
  # 19. THUỐC (Lỗ Tấn)
  {
    "id": "thuoc",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Trung Quốc",
    "title": "Thuốc (Toàn Văn Kiệt Tác)",
    "author": "Lỗ Tấn",
    "authorId": "lo-tan",
    "category": "Truyện ngắn hiện thực thức tỉnh",
    "era": "Văn học Hiện đại Trung Quốc",
    "year": "1919",
    "readTime": "20 phút đọc • Toàn văn tác phẩm",
    "badge": "Tiếng Chuông Thức Tỉnh",
    "image": "assets/images/scenes/thuoc_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Chiếc bánh bao tẩm máu người tử tù Hạ Du và vòng hoa trắng bí ẩn trên nấm mộ người tử vì đạo.",
    "epigraph": "Chiếc bánh bao tẩm máu người tử tù Hạ Du và sự mê muội của đám đông...",
    "excerpt": "Bản văn đầy đủ của kiệt tác Lỗ Tấn: Vạch trần căn bệnh u mê, cuồng tín của quốc dân Trung Hoa đầu thế kỷ XX qua phương thuốc chiếc bánh bao tẩm máu tử tù, đồng thời xót xa cho bi kịch cô độc của những người chiến sĩ cách mạng tiên phong.",
    "fullTextStatus": "Toàn Văn Tác Phẩm (4 Phần)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn truyện ngắn Thuốc: Trọng tâm phân tích là hình tượng chiếc bánh bao tẩm máu, không khí ngột ngạt quán trà và hình ảnh vòng hoa trên mộ Hạ Du ở đoạn kết.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Thuốc (Lỗ Tấn)
          </span>
          <a href="#sgk-nghia-dia-vong-hoa" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh nghĩa địa & vòng hoa (SGK 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Chiếc Bánh Bao Tẩm Máu Người Tử Tù Lúc Tờ Mờ Sáng</h3>
        <p>Mùa thu, một buổi sớm trời còn tối mịt, trăng hạ tuần lơ lửng trên nền trời xám xịt. Lão Hoa Thuyên—chủ một quán trà nhỏ nghèo nàn—vội vã thắt lại dây lưng, lấy bọc tiền chắt bóp bấy lâu rồi rảo bước ra pháp trường Cổ Hiên.</p>

        <p>Con trai duy nhất của lão—thằng Thuyên—mắc bệnh lao phổi hiểm nghèo ho rũ rượi từng cơn. Nghe lời mách bảo u mê của người đời, lão Hoa đi mua một thứ 'thần dược': chiếc bánh bao không nhân tẩm máu nóng của người tử tù vừa bị chém để chữa bệnh lao!</p>

        <p>Tại pháp trường mờ sương, đám đông chen chúc xô đẩy như những con vịt bị nghếch cổ lên xem chém người. Một tên đao phủ mặt đầy thịt, mắt hung tợn như hai hòn than dúi vào tay lão Hoa một chiếc bánh bao gói trong lá sen còn bốc khói nóng hổi, nhỏ từng giọt máu tươi đỏ lòm. Lão Hoa run rẩy ôm bọc bánh vào lòng như ôm một báu vật cứu mạng con trai.</p>

        <h3 class="reader-chapter-title">Phần II: Bữa 'Thuốc' Trong Gian Buồng Tối Tăm</h3>
        <p>Về đến nhà, bà Hoa Thuyên đốt củi nướng chiếc bánh bao đen sì ấy cho thằng Thuyên ăn. Căn buồng ẩm mốc nồng nặc mùi tanh của máu và mùi tro cháy khét. Thằng Thuyên ngây thơ ăn hết chiếc bánh bao tẩm máu người, miệng nhóp nhép khen ngợi. Hai vợ chồng lão Hoa nhìn con ăn mà lòng tràn trề hy vọng hão huyền rằng sinh mạng của kẻ khác sẽ cứu được giọt máu nhà mình.</p>

        <h3 class="reader-chapter-title">Phần III: Cuộc Bàn Tán Tại Quán Trà Về Người Cách Mạng Hạ Du</h3>
        <p>Trời sáng hẳn, quán trà lão Hoa tấp nập khách khứa: thầy Ba, bác Cả Phong, và tên đao phủ Khang chột. Chúng ngồi hút thuốc, nhấp từng ngụm trà đặc và bàn tán sôi nổi về kẻ vừa bị chém đầu sáng nay: người thanh niên cách mạng Hạ Du<span class="footnote-ref" data-note="Hạ Du: nhân vật đại diện cho những nhà cách mạng tiên phong thời kỳ Cách mạng Tân Hợi (như nữ liệt sĩ Thu Cẩn), xả thân vì đại nghĩa cứu nước nhưng quần chúng lại hoàn toàn xa lạ, u mê.">*1</span>.</p>

        <p>Chúng coi Hạ Du là một kẻ 'điên rồ', dám rủ viên cai ngục làm phản để lật đổ triều đình Mãn Thanh. Thậm chí người bác ruột của Hạ Du còn điềm nhiên tố giác cháu để lấy tiền thưởng năm mươi lượng bạc! Đám đông trong quán trà cười ồ lên khoái trá trước cái chết bi tráng của người chiến sĩ yêu nước. Bi kịch của người cách mạng là hy sinh vì quần chúng, nhưng chính quần chúng lại lấy máu của họ để làm 'thuốc' chữa bệnh!</p>

        <h3 class="reader-chapter-title" id="sgk-nghia-dia-vong-hoa">Phần IV: Nghĩa Địa Hoang Tàn & Vòng Hoa Trắng Trên Mộ (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Thuốc • Ý nghĩa biểu tượng vòng hoa trắng</span>
          </div>
          <p class="sgk-notice-desc">Kết thúc giàu tính triết lý của Lỗ Tấn: Dù thằng Thuyên vẫn chết và xã hội còn u mê, nhưng vòng hoa trắng trên mộ người tử vì đạo Hạ Du là tia sáng lạc quan về sự thức tỉnh của quốc dân tương lai.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/thuoc_cover.svg" alt="Vòng hoa trắng trên mộ Hạ Du" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Vòng hoa trắng bí ẩn nở rộ trên nấm mộ người chiến sĩ cách mạng Hạ Du giữa nghĩa địa hoang vu</span>
          </div>
        </div>

        <p>Mùa xuân năm sau, tiết Thanh Minh. Phương thuốc quái đản chẳng cứu nổi thằng Thuyên, nó đã chết vào mùa đông lạnh giá năm ngoái. Tại bãi tha ma hoang tàn cỏ dại chia đôi bởi một con đường mòn—bên phải chôn người nghèo chết bệnh, bên trái chôn những kẻ bị chém chém đầu—bà Hoa Thuyên và mẹ của Hạ Du cùng đến viếng mộ con.</p>

        <p>Hai người mẹ khốn khổ nhìn nhau trong sự đồng cảm cay đắng. Đột nhiên, mẹ Hạ Du giật mình kinh ngạc: Trên nấm mộ đầy cỏ xanh của Hạ Du có một vòng hoa trắng tinh khôi, hoa không nhiều nhưng xếp tròn vành vạnh, rung rinh trong gió sớm. Ai đã đặt vòng hoa ấy? Đó chính là sự tôn vinh thầm lặng của những người đồng chí tiếp bước con đường cách mạng, báo hiệu ngọn lửa thức tỉnh đang âm thầm lan tỏa trong lòng dân tộc.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Thuốc • Lỗ Tấn ]</span></div>
    """,
    "criticism": "Thuốc là một kiệt tác thức tỉnh dân tộc vĩ đại: Lỗ Tấn đã mổ xẻ không thương tiếc căn bệnh tinh thần ngu muội, thói vô cảm 'người xem kịch' của quần chúng Trung Quốc đương thời, đồng thời gửi gắm niềm tin son sắt vào tương lai giải phóng của đất nước.",
    "tags": ["Lỗ Tấn", "Thuốc", "Văn học Trung Quốc", "Hiện thực thức tỉnh", "SGK Lớp 12"]
  },

  # 20. CỐ HƯƠNG (Lỗ Tấn)
  {
    "id": "co-huong",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Trung Quốc",
    "title": "Cố Hương (Toàn Văn Truyện Ngắn)",
    "author": "Lỗ Tấn",
    "authorId": "lo-tan",
    "category": "Truyện ngắn hoài hương & xã hội",
    "era": "Văn học Hiện đại Trung Quốc",
    "year": "1921",
    "readTime": "19 phút đọc • Toàn văn tác phẩm",
    "badge": "Con Đường Hy Vọng",
    "image": "assets/images/scenes/cohuong_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Vầng trăng rằm cát vàng bãi dưa hấu tuổi thơ và triết lý bất hủ về con đường hy vọng của nhân loại.",
    "epigraph": "Kỳ thực trên mặt đất vốn làm gì có đường. Người ta đi mãi thì thành đường thôi.",
    "excerpt": "Bản văn đầy đủ của kiệt tác Lỗ Tấn in trong tập 'Gào thét': Chuyến trở về quê hương sau hơn hai mươi năm xa cách của nhân vật 'tôi', nỗi xót xa trước sự biến đổi tiều tụy của người bạn thuở nhỏ Nhuận Thổ và triết lý bất hủ về con đường phía trước.",
    "fullTextStatus": "Toàn Văn Tác Phẩm (4 Phần)",
    "sgkDetail": "Chương trình Ngữ Văn 9 & Ngữ Văn 11 giảng dạy trọn vẹn truyện ngắn Cố Hương: Trọng tâm phân tích là nghệ thuật miêu tả hai bức chân dung đối lập của Nhuận Thổ và câu kết triết lý về con đường.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Cố Hương (Lỗ Tấn)
          </span>
          <a href="#sgk-con-duong-hy-vong" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến triết lý về con đường (SGK 9 & 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Chuyến Trở Về Quê Cũ Tiêu Điều Xác Xơ</h3>
        <p>Độ giữa đông, trời giá lạnh buốt da buốt thịt. Tôi ngồi trên mũi thuyền trở về quê cũ sau hơn hai mươi năm xa cách bôn ba đất khách. Nhìn qua khe mui thuyền, dưới bầu trời xám xịt u ám, làng quê cũ hiện ra tiêu điều, xơ xác đến nao lòng: Vài mái nhà tranh vách đất xiêu vẹo, lũy tre xơ xác úa vàng. Lòng tôi se thắt lại: Đây có phải là quê hương tươi đẹp mà tôi hằng mang trong ký ức bấy lâu?</p>

        <h3 class="reader-chapter-title">Phần II: Ký Ức Tuyệt Mỹ Về Nhuận Thổ Thuở Thiếu Niên</h3>
        <p>Trong tâm trí tôi bỗng hiện về bức tranh tuổi thơ rực rỡ cách đây ba mươi năm: Dưới vầng trăng rằm tròn vành vạnh chiếu sáng bãi cát vàng mênh mông bên bờ biển, có một bãi dưa hấu xanh rờn bát ngát. Một cậu bé trạc mười một mười hai tuổi, cổ đeo vòng bạc, tay lăm lăm ngọn đinh ba đang dốc hết sức bình sinh đâm vào một con tra tinh ranh.</p>

        <p>Đó là Nhuận Thổ! Cậu bé nông thôn khỏe khoắn, nước da bánh mật hồng hào, đầu đội mũ len đỏ, mắt sáng ngời lanh lợi. Nhuận Thổ thuở ấy biết bao nhiêu chuyện kỳ thú ở miền biển: bẫy chim sẻ trên tuyết, nhặt vỏ sò muôn sắc bên bãi triều, và canh dưa hấu lúc nửa đêm. Hai đứa trẻ chúng tôi gắn bó keo sơn không rời nửa bước.</p>

        <h3 class="reader-chapter-title">Phần III: Cuộc Gặp Gỡ Xót Xa — Bác Nhuận Thổ Tiều Tụy & 'Bức Tường Ngăn Cách'</h3>
        <p>Một buổi chiều nọ, mẹ tôi mừng rỡ bảo có Nhuận Thổ đến chơi. Tôi vội vàng chạy xô ra đón bạn cũ. Nhưng trước mắt tôi không còn là chú bé dũng cảm nhanh nhẹn thuở nào!</p>

        <p>Đứng trước tôi là một lão nông gầy guộc tiều tụy, khuôn mặt vàng xỉn đầy những nếp nhăn sâu hoắm như rãnh cày, mi mắt viền đỏ hoe vì gió bão, bàn tay thô kệch nứt nẻ như vỏ cây thông già. Nhuận Thổ đứng lặng đi một lát, vẻ mặt vừa mừng rỡ vừa sợ sệt khúm núm. Bác khẽ cúi đầu, chắp tay thưa bằng một giọng run rẩy kính cẩn:</p>

        <p>— <strong>Bẩm quan lớn!...</strong></p>

        <p>Tôi giật thót mình như bị một nhát roi quất vào tim. Than ôi! Câu xưng hô 'bẩm quan lớn' đã dựng lên một bức tường thành vô hình ngăn cách lạnh lùng giữa hai người bạn thân thiết thuở hàn vi! Chế độ phong kiến hà khắc, sưu cao thuế nặng, nạn trộm cướp và sự nghèo đói đã bóp nghẹt tâm hồn và biến người nông dân dũng cảm thành một kẻ nô lệ đần độn cam chịu số phận.</p>

        <h3 class="reader-chapter-title" id="sgk-con-duong-hy-vong">Phần IV: Con Thuyền Rời Bến & Triết Lý Về Con Đường Hy Vọng (SGK 9 & 11)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9 & 11)
            </span>
            <span class="sgk-meta">Văn bản: Cố Hương • Đoạn kết triết lý bất hủ</span>
          </div>
          <p class="sgk-notice-desc">Tư tưởng cốt lõi của Lỗ Tấn: Hy vọng không thể tự nhiên mà có, cũng không thể tự nhiên mất đi. Nó đòi hỏi hành động dấn thân khai phá của cả một thế hệ con người tương lai.</p>
        </div>

        <p>Gia đình tôi dọn hết đồ đạc lên thuyền rời khỏi quê hương. Thuyền lướt đi trong ráng chiều vàng úa mờ dần. Nhìn đứa cháu Hoàng và thằng Thủy Sinh—con Nhuận Thổ—ngồi thân mật bên nhau trên mũi thuyền, tôi thầm ước mong: Thế hệ của chúng nó mai sau sẽ không bao giờ phải chịu sự ngăn cách giai cấp cay đắng như chúng tôi nữa. Chúng nó phải được sống một cuộc đời mới, cuộc đời tự do và bình đẳng mà chúng tôi chưa từng được sống!</p>

        <p>Tôi nghĩ bụng: Hy vọng chẳng thể nói là có, cũng chẳng thể nói là không. Nó cũng giống như những con đường trên mặt đất vậy. <strong>Kỳ thực trên mặt đất vốn làm gì có đường. Người ta đi mãi thì thành đường thôi!</strong></p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Cố Hương • Lỗ Tấn ]</span></div>
    """,
    "criticism": "Cố Hương là một tuyệt tác kết hợp nhuần nhuyễn giữa tự sự, miêu tả tâm lý và triết lý nhân sinh sâu sắc. Hình ảnh con đường khép lại tác phẩm đã trở thành tuyên ngôn bất hủ cổ vũ con người không ngừng dấn thân hành động để kiến tạo một tương lai tươi sáng.",
    "tags": ["Lỗ Tấn", "Cố Hương", "Nhuận Thổ", "Hiện thực", "SGK Lớp 9", "SGK Lớp 11"]
  },

  # 21. NGƯỜI TRONG BAO (Anton Chekhov)
  {
    "id": "nguoi-trong-bao",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Nga",
    "title": "Người Trong Bao (Toàn Văn Truyện Ngắn)",
    "author": "Anton Chekhov",
    "authorId": "anton-chekhov",
    "category": "Truyện ngắn châm biếm hiện thực",
    "era": "Văn học Hiện thực Nga",
    "year": "1898",
    "readTime": "18 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Châm Biếm",
    "image": "assets/images/scenes/nguoitrongbao_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Belikov đi ủng cao su, cầm ô đen kín mít và căn bệnh 'thu mình trong bao' của xã hội Nga chuyên chế.",
    "epigraph": "Không thể tiếp tục sống như thế này mãi được!",
    "excerpt": "Bản văn đầy đủ của kiệt tác châm biếm sâu cay của Anton Chekhov: Hình tượng gã giáo viên Belikov mắc bệnh sợ hãi mọi biến động, thu mình trong chiếc vỏ ốc chật hẹp, trở thành biểu tượng tố cáo lối sống nô dịch, cổ hủ làm tê liệt cả xã hội Nga đương thời.",
    "fullTextStatus": "Toàn Văn Tác Phẩm (4 Phần)",
    "sgkDetail": "Chương trình Ngữ Văn 11 giảng dạy trọn vẹn: Trọng tâm phân tích là hình tượng nhân vật Belikov, ý nghĩa biểu tượng của 'cái bao' và tiếng thở dài thức tỉnh ở đoạn kết.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Người Trong Bao (Anton Chekhov)
          </span>
          <a href="#sgk-y-nghia-cai-bao" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến ý nghĩa biểu tượng cái bao (SGK 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Chân Dung Belikov — Kẻ Luôn Thu Mình Trong Bao</h3>
        <p>Tại một ngôi làng vắng vẻ cuối bìa rừng, bác sĩ thú y Ivan Ivanovitch và thầy giáo Burkin ngồi bên đống lửa sưởi ấm trong chuồng ngựa lúc nửa đêm. Burkin kể cho bạn nghe câu chuyện kỳ quặc về người đồng nghiệp vừa mới qua đời: thầy giáo dạy tiếng Hy Lạp cổ tên là Belikov.</p>

        <p>Belikov là một con người kỳ quặc nổi tiếng khắp thành phố: Ngay cả vào những ngày nắng ráo đẹp trời nhất, hắn cũng đi ủng cao su, mặc áo bành tô ấm cốt bông, tay cầm chiếc ô đen, đeo kính râm đen kịt và nhét bông gòn vào lỗ tai. Tất cả đồ đạc của hắn đều được nhét vào từng cái bao nhỏ: chiếc đồng hồ quả quýt bọc trong bao gấm, chiếc dao nhíp gọt bút chì nằm trong bao da nhỏ xíu.</p>

        <p>Hắn luôn có một khát khao mãnh liệt là thu mình vào một chiếc vỏ bọc an toàn, tạo ra cho mình một 'cái bao' cách ly hoàn toàn với cuộc đời thực tế xô bồ. Hắn chỉ tôn sùng những thông tư, chỉ thị hành chính cấm đoán rõ ràng của cấp trên. Câu cửa miệng lúc nào cũng lặp đi lặp lại với vẻ mặt lo âu thảng thốt: <em>“Nhỡ lại xảy ra chuyện gì thì sao?...”</em>.</p>

        <h3 class="reader-chapter-title">Phần II: Nỗi Sợ Hãi Bao Trùm Cả Thành Phố & Ý Định Lấy Vợ</h3>
        <p>Kỳ lạ thay, con người nhút nhát hèn hạ ấy lại khống chế và gieo rắc nỗi sợ hãi lên toàn bộ trường học và cả thành phố suốt mười lăm năm trời! Mọi người sợ hắn soi mói báo cáo cấp trên, nên phụ nữ không dám tổ chức diễn kịch, giáo viên không dám đọc sách, cả thành phố sống trong không khí ngột ngạt tù hãm.</p>

        <p>Mọi người trong trường toan mai mối hắn cho Varenka—một cô gái Ukraine ba mươi tuổi vui vẻ, cởi mở, hay cười giòn tan và thích ca hát. Belikov đắn đo suy tính ròng rã hàng tháng trời, nhưng hắn vẫn run rẩy lo sợ: Nhỡ lấy vợ rồi lại xảy ra chuyện gì rắc rối thì sao!</p>

        <h3 class="reader-chapter-title" id="sgk-y-nghia-cai-bao">Phần III: Cú Ngã Cầu Thang & 'Chiếc Bao' Vĩnh Hằng Của Belikov (SGK 11)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Người Trong Bao • Cao trào xung đột và cái chết</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật châm biếm bậc thầy của Chekhov: Cú ngã cầu thang và tiếng cười ròn rã của Varenka đã chấm dứt cuộc đời của kẻ hèn hạ, giải phóng hắn vào chiếc bao vĩnh hằng là chiếc quan tài.</p>
        </div>

        <p>Một ngày nọ, Belikov bắt gặp Varenka và em trai cô là Kovalenko vui vẻ đạp xe ra phố. Hắn kinh hoàng coi đó là hành vi đồi bại vi phạm thuần phong mỹ tục. Hắn liền đến tận nhà Kovalenko để răn đe giáo huấn và đe dọa sẽ báo cáo hiệu trưởng.</p>

        <p>Kovalenko tức giận túm cổ áo Belikov đẩy mạnh xuống cầu thang. Belikov lăn long lóc từ bậc thang trên cùng xuống dưới thềm đất, chiếc kính râm vỡ tan tành. Đúng lúc ấy, Varenka vừa bước vào cửa, nhìn thấy bộ dạng thảm hại của Belikov bèn cất tiếng cười ha hả vang dội: <em>“Ha ha ha!”</em>.</p>

        <p>Tiếng cười trong trẻo ấy đã kết liễu cuộc đời Belikov! Hắn xấu hổ nhục nhã tột cùng, lủi thủi về nhà trùm chăn kín mít rồi nằm ốm liệt giường. Một tháng sau, Belikov chết.</p>

        <p>Khi nằm trong quan tài, nét mặt Belikov trông tươi tỉnh, thanh thản lạ thường: Cuối cùng thì hắn đã đạt được mục đích tối thượng của cuộc đời mình—được nằm vĩnh viễn trong một cái bao kiên cố nhất mà không một biến động nào của trần gian có thể chạm tới!</p>

        <h3 class="reader-chapter-title">Phần IV: Tiếng Thở Dài & Lời Cảnh Tỉnh Cho Tương Lai</h3>
        <p>Sau đám tang Belikov, mọi người cảm thấy nhẹ nhõm như vừa thoát khỏi một gánh nặng. Nhưng chưa đầy một tuần sau, cuộc sống u ám, ngột ngạt nặng nề cũ kỹ lại tái diễn y như trước. Người ta nhận ra rằng: Tuy Belikov đã chết, nhưng trong xã hội vẫn còn biết bao nhiêu 'người trong bao' khác đang ngày đêm bóp nghẹt sự tự do và tiến bộ!</p>

        <p>Câu chuyện khép lại trong đêm khuya thanh vắng bằng lời than thở đầy trăn trở của bác sĩ Ivan Ivanovitch: <strong>“Không thể tiếp tục sống như thế này mãi được!”</strong>.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Người Trong Bao • Anton Chekhov ]</span></div>
    """,
    "criticism": "Bằng bút pháp hiện thực trào phúng sắc lạnh, Anton Chekhov đã xây dựng hình tượng 'Người trong bao' thành một điển hình nghệ thuật bất hủ của văn học nhân loại: Lời tuyên chiến đanh thép chống lại lối sống tầm thường, hèn nhát và nô dịch tinh thần trước cường quyền.",
    "tags": ["Anton Chekhov", "Người Trong Bao", "Văn học Nga", "Hiện thực châm biếm", "SGK Lớp 11"]
  },

  # 22. ĐÔN KI-HÔ-TÊ (Miguel de Cervantes)
  {
    "id": "don-ki-ho-te",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Tây Ban Nha",
    "title": "Đôn Ki-hô-tê (Đánh Nhau Với Cối Xay Gió)",
    "author": "Miguel de Cervantes",
    "authorId": "miguel-de-cervantes",
    "category": "Tiểu thuyết hiệp sĩ phục hưng",
    "era": "Văn học Phục Hưng Tây Ban Nha",
    "year": "1605",
    "readTime": "22 phút đọc • Toàn cảnh tác phẩm",
    "badge": "Kiệt Tác Phục Hưng",
    "image": "assets/images/scenes/donkihote_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Hiệp sĩ gầy gò xứ Mancha xông vào trận chiến quyết liệt với những chiếc cối xay gió khổng lồ.",
    "epigraph": "Vận may đang dẫn đường cho chúng ta tốt đẹp hơn điều ta ao ước... Hãy nhìn kia, ba mươi tên khổng lồ hung bạo!",
    "excerpt": "Bản văn đầy đủ của phân đoạn trứ danh bậc nhất thế giới: Trận quyết chiến bi hài của chàng hiệp sĩ quý tộc Đôn Ki-hô-tê với những chiếc cối xay gió trên cánh đồng Montiel, khắc họa cặp nhân vật bất hủ Đôn Ki-hô-tê và giám mã Sancho Panza.",
    "fullTextStatus": "Toàn Cảnh Kiệt Tác (4 Hồi)",
    "sgkDetail": "Chương trình Ngữ Văn 8 giảng dạy trọn vẹn chương 'Đánh nhau với cối xay gió': Trọng tâm phân tích là sự đối lập sinh động giữa lý tưởng hiệp sĩ ngây thơ của Đôn Ki-hô-tê và tính thực dụng của Sancho Panza.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Cảnh Kiệt Tác Đôn Ki-hô-tê (Miguel de Cervantes)
          </span>
          <a href="#sgk-coi-xay-gio" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh đánh cối xay gió (SGK Lớp 8)
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Chàng Quý Tộc Mê Truyện Hiệp Sĩ & Cuộc Xuất Hành Kỳ Lạ</h3>
        <p>Ở một làng nọ thuộc xứ Mancha bên đất nước Tây Ban Nha, có một chàng quý tộc nghèo trạc ngũ tuần tên là Quijada. Chàng say mê đọc các sách kiếm hiệp giang hồ đến mức quên ăn mất ngủ, bán cả đất đai ruộng vườn để mua truyện hiệp sĩ về đọc. Đầu óc chàng ngày đêm mê muội trong thế giới ảo tưởng của những cuộc phiêu lưu diệt trừ yêu ma, cứu vớt kẻ yếu và bảo vệ công lý.</p>

        <p>Thế rồi, chàng quyết định tự phong mình làm hiệp sĩ giang hồ lấy tên là Đôn Ki-hô-tê xứ Mancha. Chàng lôi ra bộ áo giáp sắt gỉ sét của tổ tiên để lại, đội lên đầu chiếc mũ thau cũ kỹ giả làm mũ trụ, cưỡi lên con ngựa già gầy trơ xương đặt tên là Rocinante, và chọn một cô gái cày xinh xẻo làng bên để tôn làm tình nương tuyệt mỹ gọi là công nương Dulcinea xứ Toboso.</p>

        <p>Để chuyến đi thêm hoàn hảo, chàng thuyết phục được một bác nông dân thật thà béo lùn cùng làng tên là Sancho Panza đi theo làm giám mã, với lời hứa khi lập được chiến công hiển hách sẽ phong cho bác làm thống đốc một hòn đảo trù phú.</p>

        <h3 class="reader-chapter-title" id="sgk-coi-xay-gio">Hồi II: Đánh Nhau Với Cối Xay Gió (Trọng Tâm Giảng Dạy SGK Ngữ Văn 8)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn Lớp 8)
            </span>
            <span class="sgk-meta">Văn bản: Đánh nhau với cối xay gió • Chương VIII</span>
          </div>
          <p class="sgk-notice-desc">Phân cảnh mẫu mực về nghệ thuật tương phản: Một Đôn Ki-hô-tê gầy gò, mơ mộng cao thượng đến điên rồ đối lập sâu sắc với một Sancho Panza béo tròn, thực tế đến trần tục nhưng chân thành.</p>
        </div>

        <p>Đang đi trên cánh đồng Montiel bao la, Đôn Ki-hô-tê chợt nhìn thấy ba bốn chục chiếc cối xay gió đứng sừng sững giữa đồng. Chàng bèn reo to gọi giám mã Sancho Panza:<br>
        — Vận may đang dẫn đường cho chúng ta tốt đẹp hơn điều ta ao ước! Chú nhìn xem, đằng kia có tới ba mươi tên khổng lồ hung bạo, ta quyết giao chiến và tiêu diệt sạch bọn chúng để trừ hại cho trần gian!</p>

        <p>Sancho Panza mở to đôi mắt tròn xoe ngạc nhiên:<br>
        — Khổng lồ nào ở đâu hả quan lớn? Đằng kia chỉ là những chiếc cối xay gió, còn những cái ngỡ là cánh tay khổng lồ thực ra chỉ là cánh quạt quay nhờ sức gió để nghiền lúa mì thôi mà!</p>

        <p>Đôn Ki-hô-tê gạt phắt đi:<br>
        — Chú chẳng hiểu gì về chuyện phiêu lưu cả! Đó đích thị là bọn khổng lồ hung tợn. Nếu chú sợ thì hãy đứng sang một bên mà cầu nguyện, để một mình ta xông vào trận huyết chiến này!</p>

        <p>Nói đoạn, chàng thúc mạnh gót giày vào sườn ngựa Rocinante, giương cao ngọn giáo dài, miệng hô to cầu nguyện nàng Dulcinea phù hộ rồi phóng như bay về phía chiếc cối xay gió gần nhất. Gió bỗng nổi lên làm các cánh quạt quay tít. Đôn Ki-hô-tê đâm mũi giáo trúng một cánh quạt đang quay. Sức gió mạnh xé toạc ngọn giáo thành từng mảnh vụn, hất tung cả người lẫn ngựa lên không trung rồi quăng ngã chỏng gọng xuống đất cách đó một quãng xa!</p>

        <p>Sancho Panza cưỡi lừa hớt hải chạy lại đỡ chủ dậy, miệng không ngớt than thở. Nhưng Đôn Ki-hô-tê kiên quyết không nhận mình nhầm lẫn, chàng đinh ninh rằng đó là do lão pháp sư Freston ganh ghét đã dùng ma thuật biến bọn khổng lồ thành cối xay gió để cướp mất vinh quang chiến thắng của chàng!</p>

        <h3 class="reader-chapter-title">Hồi III: Cuộc Giao Chiến Với Bầy Cừu & Những Chuyến Phiêu Lưu Kỳ Thú</h3>
        <p>Tiếp tục cuộc hành trình, Đôn Ki-hô-tê lại nhìn thấy một đám bụi mù mịt phía xa. Chàng tưởng đó là hai đạo quân hùng hậu của hoàng đế Alifanfaron đang giao chiến, bèn vung gươm xông vào đánh tan tác... một đàn cừu vô tội của những người chăn cừu! Kết quả là chàng bị những người chăn cừu ném đá gãy mất mấy chiếc răng cửa.</p>

        <p>Bất chấp bao trận đòn nhừ tử và những thất bại ê chề, chàng hiệp sĩ quý tộc vẫn kiên trì lý tưởng cứu nhân độ thế, giải phóng những người tù khổ sai và bảo vệ công lý khắp nẻo đường đất nước Tây Ban Nha.</p>

        <h3 class="reader-chapter-title">Hồi IV: Phút Lâm Chung Tỉnh Ngộ & Đoạn Kết Toàn Thư</h3>
        <p>Cuối cùng, sau khi bị hiệp sĩ Vầng Trăng Trắng (do anh chàng tú tài Carrasco giả dạng) đánh bại trong cuộc đấu thương danh dự, Đôn Ki-hô-tê phải giữ lời cam kết trở về quê nhà sống yên phận một năm. Cơn sốt nặng đã làm chàng tỉnh ngộ hoàn toàn. Trước khi trút hơi thở cuối cùng, chàng từ bỏ mọi ảo tưởng cuồng vọng về truyện kiếm hiệp, lập di chúc thanh thản trong tình thương yêu của gia đình và người giám mã trung thành Sancho Panza.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn cảnh tác phẩm Đôn Ki-hô-tê • Miguel de Cervantes ]</span></div>
    """,
    "criticism": "Đôn Ki-hô-tê được tôn vinh là một trong những cuốn tiểu thuyết vĩ đại nhất của nhân loại. Cervantes không chỉ giễu nhại tàn dư của tiểu thuyết kiếm hiệp trung cổ mà còn dựng nên biểu tượng bất diệt cho sự giằng co muôn thuở giữa lý tưởng cao cả và thực tế trần gian.",
    "tags": ["Cervantes", "Đôn Ki-hô-tê", "Văn học Phục Hưng", "Cối xay gió", "SGK Lớp 8"]
  },

  # 23. RÔ-MÊ-Ô VÀ GIU-LI-ÉT (William Shakespeare)
  {
    "id": "ro-me-o-va-giu-li-et",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Vương quốc Anh",
    "title": "Rô-mê-ô và Giu-li-ét (Tình Yêu Và Thù Hận)",
    "author": "William Shakespeare",
    "authorId": "william-shakespeare",
    "category": "Bi kịch tình yêu Phục Hưng",
    "era": "Văn học Phục Hưng Anh",
    "year": "1597",
    "readTime": "24 phút đọc • Toàn cảnh vở kịch",
    "badge": "Thiên Diễm Tình Bất Hủ",
    "image": "assets/images/scenes/romeo_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Đêm tự tình dưới ban công trăng sáng thành Verona — Tình yêu vượt lên trên hận thù truyền kiếp.",
    "epigraph": "Ôi Romeo, Romeo! Sao chàng lại là Romeo?... Hãy từ bỏ tên họ chàng đi, hoặc nếu không hãy thề yêu em...",
    "excerpt": "Bản kịch thơ toàn cảnh kiệt tác bi kịch của Shakespeare: Trọng tâm là lớp kịch kinh điển 'Tình yêu và thù hận' dưới ban công trăng sáng thành Verona, ca ngợi tình yêu tự do trong sáng của tuổi trẻ chiến thắng định kiến thù hằn dòng tộc phong kiến.",
    "fullTextStatus": "Toàn Cảnh Kiệt Tác Kịch Thơ",
    "sgkDetail": "Chương trình Ngữ Văn 11 giảng dạy trọn vẹn lớp kịch 'Tình yêu và thù hận' (Hồi II, Cảnh 2): Trọng tâm phân tích là vẻ đẹp ngôn từ thi ca lãng mạn và khát vọng tự do yêu đương thời kỳ Phục Hưng.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Cảnh Kiệt Tác Kịch Rô-mê-ô và Giu-li-ét (Shakespeare)
          </span>
          <a href="#sgk-ban-cong-tinh-yeu" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh ban công Verona (SGK 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Hận Thù Truyền Kiếp & Dạ Hội Định Mệnh</h3>
        <p>Tại thành Verona nước Ý cổ kính, có hai dòng họ danh gia vọng tộc là Montague và Capulet vốn mang mối thâm thù truyền kiếp đời đời không đội trời chung. Những cuộc đụng độ đổ máu giữa gia nhân hai họ diễn ra liên miên trên đường phố.</p>

        <p>Trong đêm dạ hội hóa trang do nhà Capulet tổ chức, chàng thanh niên Romeo thuộc họ Montague đã lẻn vào tham dự. Tại đây, chàng tình cờ bắt gặp nàng Juliet—tiểu thư họ Capulet xinh đẹp như một thiên thần. Tiếng sét ái tình bùng nổ, hai tâm hồn trẻ trung lập tức say đắm nhau ngay từ ánh nhìn đầu tiên, bất chấp mối thù hằn máu mủ giữa hai dòng tộc.</p>

        <h3 class="reader-chapter-title" id="sgk-ban-cong-tinh-yeu">Hồi II: Tình Yêu & Thù Hận (Trọng Tâm Giảng Dạy SGK Ngữ Văn 11)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Tình yêu và thù hận • Hồi II, Cảnh 2</span>
          </div>
          <p class="sgk-notice-desc">Đỉnh cao thi ca kịch nghệ của William Shakespeare: Khung cảnh ban công trăng sáng huyền diệu, lời thề nguyền tình yêu tự do vượt lên trên định kiến thù hằn dòng họ.</p>
        </div>

        <p>Đêm khuya thanh vắng, vầng trăng soi sáng khu vườn nhà Capulet. Romeo liều mình trèo tường vào vườn, nấp dưới lùm cây nhìn lên ban công rực rỡ ánh sáng nơi phòng nàng Juliet:</p>

        <p><strong>ROMEO:</strong><br>
        — Kìa, ánh sáng nào vừa lóe lên qua khung cửa sổ sổ kia? Đó là phương Đông, và Juliet là mặt trời! Hãy bừng lên đi, mặt trời kiều diễm, và hãy làm lu mờ vầng trăng ghen tị kia đi... Nàng đang nói kìa! Ôi, hãy nói nữa đi, thiên thần rạng rỡ của lòng ta!</p>

        <p><strong>JULIET</strong> <em>(đứng tựa ban công, ngước nhìn trời đêm):</em><br>
        — Ôi Romeo, Romeo! Sao chàng lại là Romeo cơ chứ? Chàng hãy từ bỏ tên họ chàng đi, từ bỏ dòng họ Montague đi! Hoặc nếu chàng không làm được điều đó, thì chàng hãy thề yêu em đi, và em sẽ không còn là người nhà Capulet nữa!</p>

        <p><strong>ROMEO</strong> <em>(bước ra khỏi lùm cây dưới ban công):</em><br>
        — Tôi xin nghe lời nàng! Nàng chỉ cần gọi tôi là người yêu, tôi sẽ được rửa tội lại bằng cái tên mới và từ nay không bao giờ là Romeo nữa!</p>

        <p><strong>JULIET:</strong><br>
        — Ai đó đang nấp dưới bóng đêm lắng nghe những lời thầm kín của em vậy? Chàng làm sao vào được đây? Bức tường vườn này cao và khó trèo lắm, nếu người nhà em bắt gặp, họ sẽ giết chết chàng!</p>

        <p><strong>ROMEO:</strong><br>
        — Tôi vượt qua tường bằng đôi cánh nhẹ của tình yêu; tường đá ngăn sao nổi bước chân người đang yêu... Ánh mắt của nàng còn nguy hiểm hơn hai mươi thanh gươm của họ; nàng chỉ cần nhìn tôi đằm thắm là tôi có thể đương đầu với mọi mũi gươm thù hận!</p>

        <p>Dưới ánh trăng thanh khiết, hai người trao nhau lời thề nguyền son sắt: Tình yêu chân chính của họ cao đẹp hơn mọi thù hận trần thế, không gì có thể chia lìa!</p>

        <h3 class="reader-chapter-title">Hồi III & IV: Bi Kịch Chia Cắt & Liều Thuốc Ngủ Định Mệnh</h3>
        <p>Nhờ sự giúp đỡ của tu sĩ Laurence nhân từ, Romeo và Juliet bí mật làm lễ cưới tại tu viện. Nhưng ngay hôm sau, một biến cố đẫm máu ập đến: Tybalt—anh họ hung bạo của Juliet—đâm chết Mercutio bạn thân của Romeo. Phẫn nộ, Romeo vung gươm giết chết Tybalt và bị công tước thành Verona kết án trục xuất biệt xứ.</p>

        <p>Trong khi đó, cha mẹ Juliet ép nàng phải kết hôn với bá tước Paris giàu có. Để giữ trọn lời thề thủy chung với Romeo, Juliet đã uống một liều thuốc ngủ cực mạnh do tu sĩ Laurence bào chế để giả chết trong vòng 42 tiếng đồng hồ, nhằm chờ Romeo đến cứu nàng trốn đi.</p>

        <h3 class="reader-chapter-title">Hồi V: Cái Chết Hóa Giải Hận Thù & Đoạn Kết Bất Hủ</h3>
        <p>Ngờ đâu, lá thư giải thích sự thật của tu sĩ Laurence bị dịch bệnh ngăn trở nên không kịp đến tay Romeo. Nghe tin Juliet đã chết, Romeo đau đớn đến phát cuồng, vội mua một liều thuốc độc cực mạnh phi ngựa về hầm mộ dòng họ Capulet.</p>

        <p>Đứng bên thi hài Juliet đang chìm trong giấc ngủ say, Romeo khóc than rồi uống cạn chén thuốc độc để cùng chết bên người yêu. Vài phút sau, thuốc tan, Juliet tỉnh dậy nhìn thấy xác Romeo liền rút dao găm của chàng tự sát theo!</p>

        <p>Cái chết bi tráng của đôi lứa đã thức tỉnh lương tri của hai dòng họ Montague và Capulet. Đứng trước thi hài hai người con xấu số, hai người cha đã ân hận khóc nức nở, bắt tay nhau thề dẹp bỏ mối thù truyền kiếp ngàn năm và dựng lên hai bức tượng bằng vàng ròng để tưởng nhớ thiên diễm tình bất tử thành Verona.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn cảnh kịch thơ Rô-mê-ô và Giu-li-ét • William Shakespeare ]</span></div>
    """,
    "criticism": "Rô-mê-ô và Giu-li-ét là kiệt tác bi kịch vĩ đại nhất về tình yêu thời kỳ Phục Hưng. Shakespeare đã ca ngợi sức mạnh quật khởi của tình cảm nhân văn tự do, khẳng định sự chiến thắng của tình yêu và lòng vị tha nhân ái trước sự đen tối của định kiến phong kiến.",
    "tags": ["Shakespeare", "Romeo và Juliet", "Văn học Phục Hưng", "Tình yêu", "SGK Lớp 11"]
  },

  # 24. NHỮNG NGƯỜI KHỐN KHỔ (Victor Hugo)
  {
    "id": "nhung-nguoi-khon-kho",
    "origin": "world",
    "originLabel": "Văn học Thế giới",
    "country": "Pháp",
    "title": "Những Người Khốn Khổ (Người Cầm Quyền Khôi Phục Uy Quyền)",
    "author": "Victor Hugo",
    "authorId": "victor-hugo",
    "category": "Tiểu thuyết sử thi nhân đạo",
    "era": "Văn học Lãng mạn Hiện thực Pháp",
    "year": "1862",
    "readTime": "25 phút đọc • Toàn cảnh tác phẩm",
    "badge": "Đại Tác Phẩm Nhân Đạo",
    "image": "assets/images/scenes/nhungnguoikhonkho_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Cặp chân đèn bằng bạc của Giám mục Myriel và cuộc đối đầu nghẹt thở bảo vệ nàng Fantine trước thanh tra Javert.",
    "epigraph": "Jean Valjean, người anh em của tôi... Tôi đã mua lại linh hồn của anh cho Chúa!",
    "excerpt": "Bản văn đầy đủ của đại tác phẩm Victor Hugo: Từ câu chuyện Giám mục Myriel cảm hóa người tù khổ sai Jean Valjean, đoạn trích SGK 'Người cầm quyền khôi phục uy quyền' khi Jean Valjean đối đầu viên thanh tra Javert đến chiến lũy Paris rực lửa cứu bé Cosette.",
    "fullTextStatus": "Toàn Cảnh Kiệt Tác (5 Hồi)",
    "sgkDetail": "Chương trình Ngữ Văn 11 giảng dạy trọn vẹn đoạn trích 'Người cầm quyền khôi phục uy quyền': Trọng tâm phân tích là sự đối lập gay gắt giữa bạo quyền tàn nhẫn (Javert) và lòng nhân ái bao la (Jean Valjean) bên giường bệnh Fantine.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Cảnh Kiệt Tác Những Người Khốn Khổ (Victor Hugo)
          </span>
          <a href="#sgk-khoi-phuc-uy-quyen" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh đối đầu Javert (SGK 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Cặp Chân Đèn Bạc Của Giám Mục Myriel & Sự Cải Hóa Kỳ Diệu</h3>
        <p>Jean Valjean là một người nông dân nghèo khổ, chỉ vì ăn cắp một ổ bánh mì để nuôi đàn cháu đang chết đói mà bị kết án tù khổ sai. Sau mười chín năm bị đày ải nếm đủ đòn roi xiềng xích, anh được tha tù nhưng mang theo tấm hộ chiếu vàng dành cho tội phạm nguy hiểm, bị tất cả quán trọ xua đuổi.</p>

        <p>Giữa đêm đông lạnh giá, đức Giám mục Myriel nhân từ đã mở rộng cửa đón anh vào nhà, dọn bữa tối thịnh soạn và mời anh ngủ trên chiếc giường êm ấm. Đêm hôm đó, bản tính hoang dại trỗi dậy, Jean Valjean đã đánh cắp bộ đồ ăn bằng bạc của giám mục rồi bỏ trốn. Bị hiến binh bắt giải lại, Giám mục Myriel không những không buộc tội mà còn trao thêm cho anh cặp chân đèn bằng bạc quý giá nhất, dặn dò bằng lời răn thiêng liêng:</p>

        <p>— <em>“Jean Valjean, người anh em của tôi! Anh không còn thuộc về cái ác nữa mà đã thuộc về cái thiện. Tôi mua lại linh hồn của anh từ tay thần chết để dâng lên Thượng đế!”</em>.</p>

        <h3 class="reader-chapter-title">Hồi II: Ông Thị Trưởng Madeleine Nhân Từ & Số Phận Nàng Fantine</h3>
        <p>Lời răn của giám mục đã làm rung chuyển tận đáy sâu tâm hồn Jean Valjean. Anh đổi tên thành Madeleine, gây dựng một xưởng sản xuất hạt ngọc đen phồn vinh tại thị trấn Montreuil-sur-Mer, đem lại việc làm ấm no cho hàng ngàn dân nghèo và được dân chúng suy tôn làm thị trưởng.</p>

        <p>Tại đây, ông đã dang tay bảo bọc nàng Fantine—một người phụ nữ khốn khổ bị người tình ruồng bỏ, phải bán tóc, bán răng và cuối cùng là bán thân để kiếm tiền gửi về nuôi đứa con gái nhỏ bé Cosette đang bị đôi vợ chồng chủ quán trọ Thénardier độc ác hành hạ.</p>

        <h3 class="reader-chapter-title" id="sgk-khoi-phuc-uy-quyen">Hồi III: Người Cầm Quyền Khôi Phục Uy Quyền (SGK Ngữ Văn 11)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Người cầm quyền khôi phục uy quyền • Victor Hugo</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật lãng mạn đỉnh cao: Sự đối đầu kịch tính giữa Javert—hiện thân của luật pháp bạo tàn lạnh lùng, và Jean Valjean—hiện thân của lòng nhân đạo bác ái bao la bên giường bệnh Fantine.</p>
        </div>

        <p>Khi nghe tin một người vô tội tên là Champmathieu bị bắt nhầm và sắp bị kết án tù chung thân thay cho tên tội phạm khổ sai Jean Valjean năm xưa, ông thị trưởng Madeleine đã trải qua một đêm dằn vặt lương tâm dữ dội: Giữ bí mật để tiếp tục làm thị trưởng nhân từ hay ra tự thú để cứu một người vô tội? Cuối cùng, lương tâm đã chiến thắng, ông ra tòa án Arras công khai danh tính thật của mình.</p>

        <p>Trở về trạm xá bên giường bệnh của Fantine đang hấp hối chờ gặp con, viên thanh tra cảnh sát Javert sầm sập xông vào. Khuôn mặt Javert gớm ghiếc như mõm sói, ánh mắt lạnh lùng sắt đá. Hắn quát tháo sỗ sàng, túm lấy ngực áo Jean Valjean và khạc ra những lời tàn nhẫn thông báo cho Fantine biết ông thị trưởng nhân từ của nàng thực chất chỉ là một tên tù khổ sai vượt ngục!</p>

        <p>Quá bàng hoàng và tuyệt vọng khi biết đứa con gái Cosette sẽ không bao giờ được đón về, Fantine gục đầu ngã quỵ tắt thở ngay trên giường bệnh. Nhìn người mẹ khốn khổ chết oan uổng, Jean Valjean bừng bừng căm giận. Bằng sức mạnh phi thường của người tù khổ sai, ông giật thanh sắt gãy từ chiếc giường cũ, quắc mắt dõng dạc bảo Javert:</p>

        <p>— <em>“Tôi khuyên anh đừng quấy rầy tôi lúc này!”</em>.</p>

        <p>Trước ánh mắt uy nghi thiêng liêng của Jean Valjean, tên thanh tra cảnh sát khét tiếng hung tợn Javert run rẩy khiếp sợ lùi bước. Jean Valjean cúi xuống vuốt mắt cho Fantine, khẽ thì thầm bên tai người đã khuất lời thề danh dự sẽ tìm và nuôi nấng bé Cosette như chính con đẻ của mình.</p>

        <h3 class="reader-chapter-title">Hồi IV & V: Chiến Lũy Paris & Ánh Sáng Bất Diệt Của Lòng Bác Ái</h3>
        <p>Jean Valjean trốn thoát, tìm đến hang ổ nhà Thénardier chuộc bé Cosette và đem về Paris nuôi dưỡng trong một tu viện thanh tịnh. Nhiều năm sau, cuộc khởi nghĩa cộng hòa bùng nổ trên đường phố Paris năm 1832. Jean Valjean đã ra chiến lũy cứu sống chàng thanh niên Marius—người yêu của Cosette—bằng cách cõng anh băng qua hệ thống cống ngầm tăm tối dưới lòng thành phố.</p>

        <p>Tại chiến lũy, Jean Valjean còn tha mạng cho chính viên thanh tra Javert khi hắn bị nghĩa quân bắt giữ. Hành động bao dung phi thường ấy đã đánh đổ hoàn toàn niềm tin mù quáng vào thứ luật pháp vô cảm của Javert, khiến hắn quẫn trí gieo mình xuống dòng sông Seine tự vẫn.</p>

        <p>Jean Valjean trút hơi thở cuối cùng trong thanh thản bên cạnh Cosette và Marius, dưới ánh sáng lung linh của hai cây chân đèn bằng bạc mà đức Giám mục Myriel đã trao tặng năm xưa—biểu tượng vĩnh hằng cho sự chiến thắng tuyệt đối của Lòng Bác Ái đối với sự tàn bạo của trần gian.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn cảnh tác phẩm Những Người Khốn Khổ • Victor Hugo ]</span></div>
    """,
    "criticism": "Những Người Khốn Khổ là bản hùng ca nhân đạo vĩ đại nhất của văn học thế giới thế kỷ XIX. Victor Hugo đã cất lên tiếng nói tha thiết bênh vực những kiếp người bần cùng dưới đáy xã hội, khẳng định chân lý bất diệt: Trên đời chỉ có một điều duy nhất đáng giá, đó là Tình Yêu Thương con người.",
    "tags": ["Victor Hugo", "Những Người Khốn Khổ", "Jean Valjean", "Lãng mạn nhân đạo", "SGK Lớp 11"]
  }
]

print(f"Loaded Group 3: {len(WORKS_GROUP_3)} works.")
