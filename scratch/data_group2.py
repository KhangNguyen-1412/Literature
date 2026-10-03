# -*- coding: utf-8 -*-
"""
Dữ liệu Nhóm 2: Thơ Ca Kinh Điển Trong SGK (8 Tác Phẩm)
Toàn văn nguyên tác đầy đủ 100%, chia khổ thơ, cước chú và khung giảng dạy SGK.
"""

WORKS_GROUP_2 = [
  # 11. TÂY TIẾN (Quang Dũng)
  {
    "id": "tay-tien",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Tây Tiến (Toàn Văn Thi Phẩm)",
    "author": "Quang Dũng",
    "authorId": "quang-dung",
    "category": "Thơ trữ tình kháng chiến",
    "era": "Văn học Kháng chiến chống Pháp",
    "year": "1948",
    "readTime": "8 phút đọc • Toàn văn kiệt tác",
    "badge": "Thi Ca Hào Hoa Bi Tráng",
    "image": "assets/images/scenes/taytien_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Dãy núi miền Tây súng ngửi trời và sông Mã gầm lên khúc độc hành tiễn biệt anh linh người lính Tây Tiến.",
    "epigraph": "Sông Mã xa rồi Tây Tiến ơi! / Nhớ về rừng núi, nhớ chơi vơi...",
    "excerpt": "Toàn văn thi phẩm kiệt xuất của Quang Dũng sáng tác tại Phù Lưu Chanh năm 1948. Bức tượng đài bất tử về đoàn binh Tây Tiến hào hoa, lãng mạn và sự hy sinh bi tráng giữa núi rừng miền Tây hiểm trở.",
    "fullTextStatus": "Toàn Văn Thi Phẩm (36 câu thơ)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn bài thơ Tây Tiến: Trọng tâm phân tích là nỗi nhớ da diết cảnh hành quân miền Tây và bức chân dung bi tráng của người lính Tây Tiến.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Tây Tiến (Quang Dũng)
          </span>
          <a href="#sgk-chan-dung-tay-tien" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến chân dung người lính Tây Tiến (SGK 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Khổ I: Nhớ Rừng Núi Miền Tây & Những Chặng Đường Hành Quân Gian Khổ</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Tây Tiến • Khổ thơ mở đầu</span>
          </div>
          <p class="sgk-notice-desc">Nỗi nhớ 'chơi vơi' da diết của nhà thơ hướng về thiên nhiên miền Tây hùng vĩ, hiểm trở mà hoang sơ, thơ mộng cùng chặng đường hành quân dãi dầu gian lao của đoàn binh.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/taytien_song_ma.svg" alt="Đường đèo dốc khúc khuỷu miền Tây" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Heo hút cồn mây súng ngửi trời — Dốc lên khúc khuỷu dốc thăm thẳm</span>
          </div>
        </div>

        <p>Sông Mã xa rồi Tây Tiến ơi!<br>
        Nhớ về rừng núi, nhớ chơi vơi.<br>
        Sài Khao sương lấp đoàn quân mỏi,<br>
        Mường Lát hoa về trong đêm hơi.<br>
        Dốc lên khúc khuỷu dốc thăm thẳm,<br>
        Heo hút cồn mây, súng ngửi trời.<span class="footnote-ref" data-note="súng ngửi trời: hình ảnh ẩn dụ nhân hóa táo bạo, vừa gợi độ cao chót vót của đỉnh đèo, vừa thể hiện chất lính tinh nghịch, lạc quan tếu táo.">*1</span><br>
        Ngàn thước lên cao, ngàn thước xuống,<br>
        Nhà ai Pha Luông mưa xa khơi.<br>
        Anh bạn dãi dầu không bước nữa,<br>
        Gục lên bao súng quên đời!<br>
        Chiều chiều oai linh thác gầm thét,<br>
        Đêm đêm Mường Hịch cọp trêu người.<br>
        Nhớ ôi Tây Tiến cơm lên khói,<br>
        Mai Châu mùa em thơm nếp xôi.</p>

        <h3 class="reader-chapter-title">Khổ II: Kỷ Niệm Đêm Hội Đuốc Hoa & Cảnh Sông Nước Chiều Sương</h3>
        <p>Doanh trại bừng lên hội đuốc hoa,<br>
        Kìa em xiêm áo tự bao giờ.<br>
        Khèn lên man điệu nàng e ấp,<br>
        Nhạc về Viên Chăn xây hồn thơ.<br>
        Người đi Châu Mộc chiều sương ấy,<br>
        Có thấy hồn lau nẻo bến bờ?<br>
        Có nhớ dáng người trên độc mộc,<br>
        Trôi dòng nước lũ hoa đong đưa?<span class="footnote-ref" data-note="hoa đong đưa: nét vẽ lãng mạn thi vị, cánh hoa rừng như làm duyên nhún nhảy theo nhịp nước lũ cuộn trào.">*2</span></p>

        <h3 class="reader-chapter-title" id="sgk-chan-dung-tay-tien">Khổ III: Bức Tượng Đài Bi Tráng Về Người Lính Tây Tiến (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Tây Tiến • Bức tượng đài người lính</span>
          </div>
          <p class="sgk-notice-desc">Chân dung người chiến sĩ vệ quốc: Sự kết hợp tài hoa giữa cảm hứng lãng mạn và âm hưởng bi tráng. Cái chết không bi lụy mà hóa thành sự hiến dâng thanh thản cao cả cho non sông.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/taytien_bi_trang.svg" alt="Bức tượng đài bi tráng người lính Tây Tiến" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Áo bào thay chiếu anh về đất — Sông Mã gầm lên khúc độc hành</span>
          </div>
        </div>

        <p>Tây Tiến đoàn binh không mọc tóc,<span class="footnote-ref" data-note="không mọc tóc: hiện thực căn bệnh sốt rét rừng hiểm ác khiến chiến sĩ rụng hết tóc; nhưng qua con mắt lãng mạn của Quang Dũng, nó lại toát lên nét dữ dội, oai phong như chúa sơn lâm.">*3</span><br>
        Quân xanh màu lá dữ oai hùm.<br>
        Mắt trừng gửi mộng qua biên giới,<br>
        Đêm mơ Hà Nội dáng kiều thơm.<br>
        Rải rác biên cương mồ viễn xứ,<br>
        Chiến trường đi chẳng tiếc đời xanh.<br>
        Áo bào thay chiếu, anh về đất,<br>
        Sông Mã gầm lên khúc độc hành.</p>

        <h3 class="reader-chapter-title">Khổ IV: Lời Thề Gắn Bó & Khúc Độc Hành Tâm Tưởng</h3>
        <p>Tây Tiến người đi không hẹn ước,<br>
        Đường lên thăm thẳm một chia phôi.<br>
        Ai lên Tây Tiến mùa xuân ấy,<br>
        Hồn về Sầm Nứa chẳng về xuôi.</p>
        <div class="sgk-end-marker"><span>[ Toàn văn 36 câu thơ kiệt tác Tây Tiến • Quang Dũng ]</span></div>
    """,
    "criticism": "Tây Tiến là đóa hoa tuyệt bích của thi ca kháng chiến chống Pháp. Bằng hồn thơ phóng khoáng, hồn hậu và tài hoa, Quang Dũng đã dựng nên bức tượng đài tráng lệ và cảm động nhất về người lính Vệ quốc quân hào hoa một thời khói lửa.",
    "tags": ["Quang Dũng", "Tây Tiến", "Thơ kháng chiến", "Bi tráng", "SGK Lớp 12"]
  },

  # 12. VIỆT BẮC (Tố Hữu)
  {
    "id": "viet-bac",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Việt Bắc (Toàn Văn Đoạn Trích SGK)",
    "author": "Tố Hữu",
    "authorId": "to-huu",
    "category": "Trường ca Lục bát cách mạng",
    "era": "Văn học Kháng chiến chống Pháp",
    "year": "1954",
    "readTime": "15 phút đọc • Toàn văn tác phẩm",
    "badge": "Khúc Ca Ân Tình Cội Nguồn",
    "image": "assets/images/scenes/vietbac_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Áo chàm đưa buổi phân ly và bức tranh tứ bình bốn mùa tuyệt mỹ của núi rừng Việt Bắc.",
    "epigraph": "Mình về mình có nhớ ta / Mười lăm năm ấy thiết tha mặn nồng...",
    "excerpt": "Bản văn đầy đủ của đỉnh cao thơ ca kháng chiến Tố Hữu: Khúc hát giao duyên lưu luyến kẻ ở người về sau chiến thắng Điện Biên Phủ, bức tranh tứ bình bốn mùa huyền diệu và khúc hùng ca kháng chiến chấn động non sông.",
    "fullTextStatus": "Toàn Văn Đoạn Trích SGK (Hơn 130 câu lục bát)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn đoạn trích kinh điển Việt Bắc: Trọng tâm phân tích là bức tranh tứ bình (Đông - Xuân - Hạ - Thu) và khí thế ra trận hào hùng của quân dân ta.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Đoạn Trích Kiệt Tác Việt Bắc (Tố Hữu)
          </span>
          <a href="#sgk-buc-tranh-tu-binh" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến bức tranh tứ bình (SGK 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Khúc Hát Chia Tay Ân Tình Kẻ Ở Người Về</h3>
        <p>— Mình về mình có nhớ ta?<br>
        Mười lăm năm ấy thiết tha mặn nồng.<br>
        Mình về mình có nhớ không?<br>
        Nhìn cây nhớ núi, nhìn sông nhớ nguồn.<br>
        — Tiếng ai tha thiết bên cồn,<br>
        Bâng khuâng trong dạ, bồn chồn bước đi.<br>
        Áo chàm đưa buổi phân ly,<br>
        Cầm tay nhau biết nói gì hôm nay...<br>
        — Mình đi, có nhớ những ngày<br>
        Mưa nguồn suối lũ, những mây cùng mù?<br>
        Mình về, có nhớ chiến khu<br>
        Miếng cơm chấm muối, mối thù nặng vai?<br>
        Mình về, rừng núi nhớ ai<br>
        Trám bùi để rụng, măng mai để già.<br>
        Mình đi, có nhớ những nhà<br>
        Hắt hiu lau xám, đậm đà lòng son?<br>
        Mình về, còn nhớ núi non<br>
        Nhớ khi Kháng Nhật, thuở còn Việt Minh?<br>
        Mình đi, mình có nhớ mình<br>
        Tân Trào, Hồng Thái, mái đình, cây đa?</p>

        <h3 class="reader-chapter-title" id="sgk-buc-tranh-tu-binh">Phần II: Bức Tranh Tứ Bình Bốn Mùa Tuyệt Mỹ (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Việt Bắc • Bức tranh tứ bình bốn mùa</span>
          </div>
          <p class="sgk-notice-desc">Đỉnh cao nghệ thuật miêu tả của Tố Hữu: Bốn mùa Đông - Xuân - Hạ - Thu với sự đan cài hài hòa tuyệt đỉnh giữa màu sắc thiên nhiên rực rỡ và hình ảnh con người lao động nghĩa tình.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vietbac_tu_binh.svg" alt="Bức tranh tứ bình bốn mùa Việt Bắc" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Rừng xanh hoa chuối đỏ tươi — Rừng thu trăng rọi hòa bình</span>
          </div>
        </div>

        <p>Ta về, mình có nhớ ta?<br>
        Ta về, ta nhớ những hoa cùng người.<br>
        <strong>Rừng xanh hoa chuối đỏ tươi,</strong><span class="footnote-ref" data-note="cảnh mùa đông: điểm xuyết hoa chuối đỏ như những ngọn lửa sưởi ấm màu xanh bạt ngàn của rừng đại ngàn.">*1</span><br>
        Đèo cao nắng ánh dao gài thắt lưng.<br>
        <strong>Ngày xuân mơ nở trắng rừng,</strong><span class="footnote-ref" data-note="cảnh mùa xuân: sắc trắng tinh khôi của hoa mơ nở bừng ngút ngàn.">*2</span><br>
        Nhớ người đan nón chuốt từng sợi giang.<br>
        <strong>Ve kêu rừng phách đổ vàng,</strong><span class="footnote-ref" data-note="cảnh mùa hạ: động từ 'đổ' diễn tả sự chuyển màu đột ngột và rực rỡ của rừng phách khi hè sang.">*3</span><br>
        Nhớ cô em gái hái măng một mình.<br>
        <strong>Rừng thu trăng rọi hòa bình,</strong><span class="footnote-ref" data-note="cảnh mùa thu: ánh trăng thanh bình soi sáng khúc ca ân tình nguồn cội.">*4</span><br>
        Nhớ ai tiếng hát ân tình thủy chung.</p>

        <h3 class="reader-chapter-title">Phần III: Khí Thế Hùng Tráng Của Đoàn Quân Ra Trận</h3>
        <p>Nhớ khi giặc đến giặc lùng,<br>
        Rừng cây núi đá ta cùng đánh Tây.<br>
        Núi giăng thành lũy sắt dày,<br>
        Rừng che bộ đội, rừng vây quân thù.<br>
        Mênh mông bốn mặt sương mù,<br>
        Đất trời ta cả chiến khu một lòng.<br>
        Những đường Việt Bắc của ta,<br>
        Đêm đêm rầm rập như là đất rung.<br>
        Quân đi điệp điệp trùng trùng,<br>
        Ánh sao đầu súng bạn cùng mũ nan.<br>
        Dân công đỏ đuốc từng đoàn,<br>
        Bước chân nát đá, muôn tàn lửa bay.<br>
        Nghìn đêm thăm thẳm sương dày,<br>
        Đèn pha bật sáng như ngày mai lên.<br>
        Tin vui chiến thắng trăm miền,<br>
        Hòa Bình, Tây Bắc, Điện Biên vui về.<br>
        Vui từ Đồng Tháp, An Khê,<br>
        Vui lên Việt Bắc, đèo De, núi Hồng.</p>
        <div class="sgk-end-marker"><span>[ Toàn văn đoạn trích kiệt tác Việt Bắc • Tố Hữu ]</span></div>
    """,
    "criticism": "Việt Bắc là đỉnh cao chói lọi của thơ ca cách mạng Việt Nam. Tố Hữu đã vận dụng tài tình thể thơ lục bát truyền thống và lối đối đáp giao duyên đậm đà tính dân tộc để cất lên bản anh hùng ca bất hủ về ân tình cách mạng thủy chung.",
    "tags": ["Tố Hữu", "Việt Bắc", "Thơ lục bát", "Kháng chiến", "SGK Lớp 12"]
  },

  # 13. SÓNG (Xuân Quỳnh)
  {
    "id": "song",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Sóng (Toàn Văn Thi Phẩm)",
    "author": "Xuân Quỳnh",
    "authorId": "xuan-quynh",
    "category": "Thơ trữ tình hiện đại",
    "era": "Văn học Kháng chiến chống Mỹ",
    "year": "1967",
    "readTime": "6 phút đọc • Toàn văn bài thơ",
    "badge": "Khúc Tình Ca Bất Hủ",
    "image": "assets/images/scenes/song_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Những con sóng biển Diêm Điền ngày đêm vỗ bờ và nỗi khát khao tình yêu vĩnh hằng.",
    "epigraph": "Làm sao được tan ra / Thành trăm con sóng nhỏ / Giữa biển lớn tình yêu / Để ngàn năm còn vỗ...",
    "excerpt": "Toàn văn 9 khổ thơ tuyệt tác của Xuân Quỳnh viết năm 1967 tại bãi biển Diêm Điền (Thái Bình). Bài thơ mượn hình tượng sóng biển để bộc lộ vẻ đẹp tâm hồn người phụ nữ trong tình yêu: đằm thắm, thủy chung, nồng nàn và khát vọng bất tử.",
    "fullTextStatus": "Toàn Văn Bài Thơ (9 Khổ Thơ)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn bài thơ Sóng: Trọng tâm phân tích là cấu trúc đối cực của sóng, nỗi nhớ cồn cào trong mơ và khát vọng hòa nhập vào biển lớn tình yêu nhân loại.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Sóng (Xuân Quỳnh)
          </span>
          <a href="#sgk-song-nho-nhung" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến nỗi nhớ cả trong mơ (SGK 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Khổ I & II: Bản Tính Đối Cực Của Sóng & Khát Vọng Muôn Đời</h3>
        <p>Dữ dội và dịu êm<br>
        Ồn ào và lặng lẽ<br>
        Sông không hiểu nổi mình<br>
        Sóng tìm ra tận bể.<span class="footnote-ref" data-note="sóng tìm ra tận bể: khát vọng vượt khỏi không gian chật hẹp tù túng để vươn tới cái rộng lớn, bao la của tâm hồn người phụ nữ khi yêu.">*1</span></p>

        <p>Ôi con sóng ngày xưa<br>
        Và ngày sau vẫn thế<br>
        Nỗi khát vọng tình yêu<br>
        Bồi hồi trong ngực trẻ.</p>

        <h3 class="reader-chapter-title">Khổ III & IV: Nguồn Cội Bí Ẩn Của Gió & Tình Yêu</h3>
        <p>Trước muôn trùng sóng bể<br>
        Em nghĩ về anh, em<br>
        Em nghĩ về biển lớn<br>
        Từ nơi nào sóng lên?</p>

        <p>Sóng bắt đầu từ gió<br>
        Gió bắt đầu từ đâu?<br>
        Em cũng không biết nữa<br>
        Khi nào ta yêu nhau...</p>

        <h3 class="reader-chapter-title" id="sgk-song-nho-nhung">Khổ V & VI: Nỗi Nhớ Cả Trong Mơ & Lòng Thủy Chung Son Sắt (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Sóng • Điểm sáng nghệ thuật của thi phẩm</span>
          </div>
          <p class="sgk-notice-desc">Nỗi nhớ tình yêu cồn cào vượt qua mọi giới hạn không gian, thời gian và ý thức: 'Lòng em nhớ đến anh / Cả trong mơ còn thức'.</p>
        </div>

        <p>Con sóng dưới lòng sâu<br>
        Con sóng trên mặt nước<br>
        Ôi con sóng nhớ bờ<br>
        Ngày đêm không ngủ được<br>
        <strong>Lòng em nhớ đến anh<br>
        Cả trong mơ còn thức.</strong><span class="footnote-ref" data-note="trong mơ còn thức: câu thơ táo bạo và chân thực hiếm có trong thi ca Việt Nam, diễn tả tình yêu đã ăn sâu vào tiềm thức vô thức.">*2</span></p>

        <p>Dẫu xuôi về phương bắc<br>
        Dẫu ngược về phương nam<br>
        Nơi nào em cũng nghĩ<br>
        Hướng về anh — một phương.<span class="footnote-ref" data-note="một phương: sự lệch chuẩn địa lý cố ý để khẳng định 'phương anh'—phương duy nhất của tình yêu và sự thủy chung.">*3</span></p>

        <h3 class="reader-chapter-title">Khổ VII, VIII & IX: Nỗi Âu Lo Trước Thời Gian & Khát Vọng Bất Tử</h3>
        <p>Ở ngoài kia đại dương<br>
        Trăm ngàn con sóng đó<br>
        Con nào chẳng tới bờ<br>
        Dù muôn vời cách trở.</p>

        <p>Cuộc đời tuy dài thế<br>
        Năm tháng vẫn đi qua<br>
        Như biển kia dẫu rộng<br>
        Mây vẫn bay về xa...</p>

        <p>Làm sao được tan ra<br>
        Thành trăm con sóng nhỏ<br>
        Giữa biển lớn tình yêu<br>
        Để ngàn năm còn vỗ.</p>
        <div class="sgk-end-marker"><span>[ Toàn văn 9 khổ thơ kiệt tác Sóng • Xuân Quỳnh ]</span></div>
    """,
    "criticism": "Sóng là một trong những bài thơ tình hay nhất của thi ca hiện đại Việt Nam. Bằng nhịp điệu dập dồn của sóng biển và thể thơ năm chữ giàu nhạc tính, Xuân Quỳnh đã bày tỏ một tình yêu nồng nàn, chân thực và khát vọng sống tận hiến muôn đời.",
    "tags": ["Xuân Quỳnh", "Sóng", "Thơ tình", "Trữ tình hiện đại", "SGK Lớp 12"]
  },

  # 14. ĐỒNG CHÍ (Chính Hữu)
  {
    "id": "dong-chi",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Đồng Chí (Toàn Văn Thi Phẩm)",
    "author": "Chính Hữu",
    "authorId": "chinh-huu",
    "category": "Thơ cách mạng",
    "era": "Văn học Kháng chiến chống Pháp",
    "year": "1948",
    "readTime": "6 phút đọc • Toàn văn bài thơ",
    "badge": "Tượng Đài Đồng Đội",
    "image": "assets/images/scenes/dongchi_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Đêm nay rừng hoang sương muối, đứng cạnh bên nhau chờ giặc tới — Đầu súng trăng treo.",
    "epigraph": "Đêm nay rừng hoang sương muối / Đứng cạnh bên nhau chờ giặc tới / Đầu súng trăng treo.",
    "excerpt": "Toàn văn thi phẩm kiệt tác của Chính Hữu sáng tác đầu năm 1948 tại chiến dịch Việt Bắc Thu - Đông. Bức tượng đài bất tử bằng ngôn từ về tình đồng đội, đồng chí keo sơn của những người lính nông dân mặc áo trấn thủ.",
    "fullTextStatus": "Toàn Văn Bài Thơ",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn bài thơ Đồng Chí: Trọng tâm phân tích là câu thơ bản lề 'Đồng chí.' và bức tranh biểu tượng bất hủ 'Đầu súng trăng treo'.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Đồng Chí (Chính Hữu)
          </span>
          <a href="#sgk-dau-sung-trang-treo" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh Đầu súng trăng treo (SGK 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Đoạn I: Cơ Sở Hình Thành Tình Đồng Chí Thiêng Liêng</h3>
        <p>Quê hương anh nước mặn, đồng chua<br>
        Làng tôi nghèo đất cày lên sỏi đá.<br>
        Anh với tôi đôi người xa lạ<br>
        Tự phương trời chẳng hẹn quen nhau,<br>
        Súng bên súng, đầu sát bên đầu,<br>
        Đêm rét chung chăn thành đôi tri kỷ.<br>
        <strong>Đồng chí!</strong><span class="footnote-ref" data-note="Đồng chí!: câu thơ đặc biệt chỉ có hai chữ kèm dấu chấm than, đóng vai trò như một bản lề khép mở hai nửa tâm hồn, nâng tình bạn bè lên tầm cao thiêng liêng của giai cấp.">*1</span></p>

        <h3 class="reader-chapter-title">Đoạn II: Những Biểu Hiện Cảm Động Của Tình Đồng Đội Gian Lao</h3>
        <p>Ruộng nương anh gửi bạn thân cày<br>
        Gian nhà không, mặc kệ gió lung lay<br>
        Giếng nước gốc đa nhớ người ra lính.<br>
        Anh với tôi biết từng cơn ớn lạnh,<br>
        Sốt run người vầng trán ướt mồ hôi.<br>
        Áo anh rách vai<br>
        Quần tôi có vài mảnh vá<br>
        Miệng cười buốt giá<br>
        Chân không giày<br>
        Thương nhau tay nắm lấy bàn tay.<span class="footnote-ref" data-note="tay nắm lấy bàn tay: cử chỉ mộc mạc không lời mà truyền cho nhau hơi ấm của sự sống và niềm tin chiến thắng.">*2</span></p>

        <h3 class="reader-chapter-title" id="sgk-dau-sung-trang-treo">Đoạn III: Bức Tượng Đài Bất Hủ: Đầu Súng Trăng Treo (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Đồng Chí • Hình ảnh kết bài kiệt tác</span>
          </div>
          <p class="sgk-notice-desc">Biểu tượng bất hủ của thơ ca cách mạng: Sự hòa quyện tuyệt đẹp giữa hiện thực chiến đấu khốc liệt ('súng') và cảm hứng lãng mạn hòa bình ('trăng').</p>
        </div>

        <p>Đêm nay rừng hoang sương muối<br>
        Đứng cạnh bên nhau chờ giặc tới<br>
        <strong>Đầu súng trăng treo.</strong><span class="footnote-ref" data-note="Đầu súng trăng treo: hình tượng thơ vừa hiện thực (mũi súng chĩa lên trời như chạm vào vầng trăng lơ lửng), vừa mang ý nghĩa biểu tượng sâu xa về sứ mệnh bảo vệ hòa bình của người chiến sĩ.">*3</span></p>
        <div class="sgk-end-marker"><span>[ Toàn văn thi phẩm Đồng Chí • Chính Hữu ]</span></div>
    """,
    "criticism": "Đồng Chí của Chính Hữu là bài thơ mẫu mực về vẻ đẹp chân chất, mộc mạc mà cao cả của người lính thời kỳ đầu kháng chiến chống Pháp. Ngôn ngữ hàm súc, cô đọng như chưng cất từ máu thịt hiện thực chiến hào.",
    "tags": ["Chính Hữu", "Đồng Chí", "Thơ kháng chiến", "Tình đồng đội", "SGK Lớp 9"]
  },

  # 15. ĐÂY THÔN VĨ DẠ (Hàn Mặc Tử)
  {
    "id": "day-thon-vi-da",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Đây Thôn Vĩ Dạ (Toàn Văn)",
    "author": "Hàn Mặc Tử",
    "authorId": "han-mac-tu",
    "category": "Thơ lãng mạn (Thơ Mới)",
    "era": "Phong trào Thơ Mới (1932 – 1945)",
    "year": "1938",
    "readTime": "5 phút đọc • Toàn văn bài thơ",
    "badge": "Kiệt Tác Xứ Huế",
    "image": "assets/images/scenes/thonvida_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Hàng cau đón nắng mới tinh khôi xứ Huế và chiếc thuyền đậu bến sông trăng chở nỗi đau nhân thế.",
    "epigraph": "Sao anh không về chơi thôn Vĩ? / Nhìn nắng hàng cau nắng mới lên...",
    "excerpt": "Toàn văn 3 khổ thơ trác tuyệt của Hàn Mặc Tử viết năm 1938. Khởi nguồn từ bức bưu thiếp phong cảnh của Hoàng Cúc, bài thơ là khúc hoài niệm tinh khôi về cảnh sắc thôn Vĩ xứ Huế đan xen nỗi đau mặc cảm chia lìa và khát vọng giao cảm tột cùng với trần thế.",
    "fullTextStatus": "Toàn Văn Bài Thơ (3 Khổ Thơ)",
    "sgkDetail": "Chương trình Ngữ Văn 11 giảng dạy trọn vẹn bài thơ Đây Thôn Vĩ Dạ: Trọng tâm phân tích là bức tranh thiên nhiên tinh khôi khổ 1 và sự chuyển biến tâm trạng u uẩn, hoài nghi ở hai khổ sau.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Đây Thôn Vĩ Dạ (Hàn Mặc Tử)
          </span>
          <a href="#sgk-song-trang" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh thuyền đậu bến sông trăng (SGK 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Khổ I: Cảnh Sớm Mai Thôn Vĩ Tinh Khôi & Khuôn Mặt Chữ Điền</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Đây Thôn Vĩ Dạ • Khổ thơ mở đầu</span>
          </div>
          <p class="sgk-notice-desc">Câu hỏi tu từ tha thiết mở đầu: 'Sao anh không về chơi thôn Vĩ?' dẫn vào bức tranh khu vườn xứ Huế xanh mướt như ngọc và nét đẹp phúc hậu kín đáo của con người miền Trung.</p>
        </div>

        <p>Sao anh không về chơi thôn Vĩ?<br>
        Nhìn nắng hàng cau nắng mới lên.<span class="footnote-ref" data-note="nắng hàng cau nắng mới lên: thân cau cao vút đón những tia nắng đầu tiên tinh khôi nhất của buổi sớm mai.">*1</span><br>
        Vườn ai mướt quá, xanh như ngọc<br>
        Lá trúc che ngang mặt chữ điền.<span class="footnote-ref" data-note="mặt chữ điền: khuôn mặt vuông vức đầy đặn, biểu tượng cho nét đẹp phúc hậu, đoan trang theo quan niệm phương Đông.">*2</span></p>

        <h3 class="reader-chapter-title" id="sgk-song-trang">Khổ II: Nỗi Mặc Cảm Chia Lìa & Thuyền Chở Trăng (SGK 11)</h3>
        <p>Gió theo lối gió, mây đường mây,<span class="footnote-ref" data-note="gió theo lối gió mây đường mây: nghịch lý chia lìa đôi ngả diễn tả mặc cảm cô đơn và bi kịch số phận của nhà thơ tài hoa bạc mệnh.">*3</span><br>
        Dòng nước buồn thiu, hoa bắp lay...<br>
        Thuyền ai đậu bến sông trăng đó,<br>
        Có chở trăng về kịp tối nay?</p>

        <h3 class="reader-chapter-title">Khổ III: Cõi Mộng Hư Ảo & Câu Hỏi Khắc Khoải Nhân Thế</h3>
        <p>Mơ khách đường xa, khách đường xa,<br>
        Áo em trắng quá nhìn không ra...<br>
        Ở đây sương khói mờ nhân ảnh,<br>
        Ai biết tình ai có đậm đà?<span class="footnote-ref" data-note="Ai biết tình ai có đậm đà?: câu hỏi lơ lửng khép lại bài thơ đong đầy nỗi hoài nghi xót xa nhưng cũng tha thiết khát khao tình người đến cháy lòng.">*4</span></p>
        <div class="sgk-end-marker"><span>[ Toàn văn 3 khổ thơ tuyệt tác Đây Thôn Vĩ Dạ • Hàn Mặc Tử ]</span></div>
    """,
    "criticism": "Đây Thôn Vĩ Dạ là một trong những viên ngọc sáng nhất của Phong trào Thơ Mới. Qua lăng kính của nỗi đau bệnh tật và sự chia lìa, thế giới hiện thực và cõi mộng đã hòa quyện thành tiếng kêu tuyệt vọng nhưng vô cùng thánh thiện hướng về cuộc đời trần thế.",
    "tags": ["Hàn Mặc Tử", "Đây Thôn Vĩ Dạ", "Thơ Mới", "Xứ Huế", "SGK Lớp 11"]
  },

  # 16. NHỚ RỪNG (Thế Lữ)
  {
    "id": "nho-rung",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Nhớ Rừng (Toàn Văn Bài Thơ)",
    "author": "Thế Lữ",
    "authorId": "the-lu",
    "category": "Thơ lãng mạn tiên phong",
    "era": "Phong trào Thơ Mới (1932 – 1945)",
    "year": "1934",
    "readTime": "7 phút đọc • Toàn văn tác phẩm",
    "badge": "Tiếng Gọi Tự Do",
    "image": "assets/images/scenes/nhorung_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Chúa sơn lâm gặm khối căm hờn trong cũi sắt và tiếng gầm hoài niệm thời oanh liệt ngút ngàn rừng thiêng.",
    "epigraph": "Gặm một khối căm hờn trong cũi sắt / Ta nằm dài trông ngày tháng dần qua...",
    "excerpt": "Toàn văn 5 đoạn thơ kiệt tác của Thế Lữ mở màn thắng lợi rực rỡ cho Phong trào Thơ Mới. Mượn lời con hổ bị giam cầm trong vườn bách thú để gửi gắm kín đáo nỗi đau mất nước và niềm khao khát tự do mãnh liệt của người dân Việt Nam đương thời.",
    "fullTextStatus": "Toàn Văn Bài Thơ (5 Đoạn)",
    "sgkDetail": "Chương trình Ngữ Văn 8 & Ngữ Văn 11 giảng dạy trọn vẹn bài thơ Nhớ Rừng: Trọng tâm phân tích là nghệ thuật tương phản sâu sắc giữa cảnh vườn bách thú tù túng và cảnh rừng thiêng hùng vĩ thời hoàng kim.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Bài Thơ Nhớ Rừng (Thế Lữ)
          </span>
          <a href="#sgk-thoi-oanh-liet" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh thời oanh liệt (SGK 8 & 11)
          </a>
        </div>

        <h3 class="reader-chapter-title">Đoạn I: Nỗi Căm Hờn Gông Cùm Trong Cũi Sắt</h3>
        <p>Gặm một khối căm hờn trong cũi sắt,<br>
        Ta nằm dài, trông ngày tháng dần qua.<br>
        Khinh lũ người kia ngạo mạn, ngẩn ngơ,<br>
        Giương mắt bé giễu oai linh rừng thẳm,<br>
        Nay sa cơ, bị nhục nhằn tù hãm,<br>
        Để làm trò lạ mắt, thứ đồ chơi.<br>
        Chịu ngang bầy cùng bọn gấu dở hơi,<br>
        Với cặp báo chuồng bên tâm thường, vô tư lự.</p>

        <h3 class="reader-chapter-title" id="sgk-thoi-oanh-liet">Đoạn II & III: Khúc Hoài Niệm Oai Linh Thời Hoàng Kim (SGK 8 & 11)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 8 & 11)
            </span>
            <span class="sgk-meta">Văn bản: Nhớ Rừng • Đoạn trích thời oanh liệt</span>
          </div>
          <p class="sgk-notice-desc">Bộ tranh tứ bình tráng lệ về chúa sơn lâm giữa đại ngàn: Đêm trăng vàng bên suối, ngày mưa chuyển bốn phương, bình minh cây xanh nắng gội và hoàng hôn rực rỡ máu chiều lặn.</p>
        </div>

        <p>Ta sống mãi trong tình thương nỗi nhớ,<br>
        Thuở tung hoành hống hách những ngày xưa.<br>
        Nhớ cảnh sơn lâm, bóng cả, cây già,<br>
        Với tiếng gió gào ngàn, với giọng nguồn hét núi,<br>
        Với khi thét khúc trường ca dữ dội,<br>
        Ta bước chân lên, dõng dạc, đường hoàng,<br>
        Lượn tấm thân như sóng cuộn nhịp nhàng,<br>
        Vờn bóng âm thầm, lá gai, cỏ sắc.<br>
        Trong hang tối, mắt thần khi đã quắc,<br>
        Là khiến cho mọi vật đều im hơi.<br>
        Ta biết ta là chúa tể cả muôn loài,<br>
        Giữa chốn thảo hoa không tên, không tuổi.</p>

        <p><strong>Nào đâu những đêm vàng bên bờ suối,<br>
        Ta say mồi đứng uống ánh trăng tan?<br>
        Đâu những ngày mưa chuyển bốn phương ngàn,<br>
        Ta lặng ngắm giang sơn ta đổi mới?<br>
        Đâu những bình minh cây xanh nắng gội,<br>
        Tiếng chim ca giấc ngủ ta tưng bừng?<br>
        Đâu những chiều lênh láng máu sau rừng,<br>
        Ta đợi chết mảnh mặt trời gay gắt,<br>
        Để ta chiếm lấy riêng phần bí mật?<br>
        — Than ôi! Thời oanh liệt nay còn đâu?</strong></p>

        <h3 class="reader-chapter-title">Đoạn IV: Sự Khinh Bỉ Cảnh Tượng Giả Tạo Nhân Tạo</h3>
        <p>Nay ta ngắm giang sơn ngao ngán nỗi:<br>
        Mô gò thấp kém, cỏ dại lầm than,<br>
        Cây còi cọc, hoa ngậm ngùi, úa úa,<br>
        Nước tù hãm, vũng cạn trơ, rãnh hẹp...<br>
        Lũ người kia cố làm ra vẻ hoa mỹ,<br>
        Hòng che giấu cái tầm thường, thảm hại!</p>

        <h3 class="reader-chapter-title">Đoạn V: Tiếng Gầm Hướng Về Đại Ngàn Bất Diệt</h3>
        <p>Hỡi oai linh, cảnh rừng thiêng hùng vĩ!<br>
        Nơi giống hùm thiêng ta ngự trị muôn đời!<br>
        Hỡi cảnh rừng ghê gớm của ta ơi!<br>
        Dù thân xác bị giam cầm trong cũi sắt,<br>
        Hồn ta vẫn thênh thang bay về cõi ngàn đại ngàn!</p>
        <div class="sgk-end-marker"><span>[ Toàn văn bài thơ Nhớ Rừng • Thế Lữ ]</span></div>
    """,
    "criticism": "Nhớ Rừng là khúc dạo đầu hùng tráng của Thơ Mới. Hoài Thanh đã tôn vinh Thế Lữ là người 'cắm lá cờ chiến thắng cho Thơ Mới'. Bài thơ thể hiện kín đáo lòng yêu nước, nỗi bất hòa sâu sắc với thực tại nô lệ và khát vọng tự do cháy bỏng.",
    "tags": ["Thế Lữ", "Nhớ Rừng", "Thơ Mới", "Tự do", "SGK Lớp 8", "SGK Lớp 11"]
  },

  # 17. ĐOÀN THUYỀN ĐÁNH CÁ (Huy Cận)
  {
    "id": "doan-thuyen-danh-ca",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Đoàn Thuyền Đánh Cá (Toàn Văn)",
    "author": "Huy Cận",
    "authorId": "huy-can",
    "category": "Thơ ca lãng mạn cách mạng",
    "era": "Xây dựng Chủ nghĩa Xã hội ở miền Bắc",
    "year": "1958",
    "readTime": "6 phút đọc • Toàn văn bài thơ",
    "badge": "Tráng Ca Lao Động",
    "image": "assets/images/scenes/doanthuyen_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Mặt trời xuống biển như hòn lửa và đoàn thuyền buồm căng gió chạy đua cùng mặt trời.",
    "epigraph": "Mặt trời xuống biển như hòn lửa / Sóng đã cài then, đêm sập cửa...",
    "excerpt": "Toàn văn 7 khổ thơ tráng lệ của Huy Cận sáng tác năm 1958 tại vùng mỏ Quảng Ninh. Bản hòa ca say mê về vẻ đẹp giàu có của biển đảo quê hương và niềm vui hân hoan của những người lao động làm chủ đất nước.",
    "fullTextStatus": "Toàn Văn Bài Thơ (7 Khổ Thơ)",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn: Trọng tâm phân tích là không gian vũ trụ kỳ vĩ, sự giàu đẹp của biển bạc và tư thế làm chủ thiên nhiên của con người lao động mới.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Đoàn Thuyền Đánh Cá (Huy Cận)
          </span>
          <a href="#sgk-bien-dem-ky-vi" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh kéo lưới đón bình minh (SGK 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Khổ I & II: Cảnh Hoàng Hôn Ra Khơi & Câu Hát Căng Buồm</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Đoàn Thuyền Đánh Cá • Huy Cận</span>
          </div>
          <p class="sgk-notice-desc">Bản tráng ca hào sảng về sự giàu có của biển đảo quê hương và niềm vui phơi phới làm chủ đất trời của người lao động mới.</p>
        </div>
        <p>Mặt trời xuống biển như hòn lửa<br>
        Sóng đã cài then, đêm sập cửa.<span class="footnote-ref" data-note="sóng cài then đêm sập cửa: nghệ thuật nhân hóa vũ trụ độc đáo, màn đêm buông xuống như cánh cửa khổng lồ khép lại một ngày lao động của vũ trụ.">*1</span><br>
        Đoàn thuyền đánh cá lại ra khơi,<br>
        Câu hát căng buồm cùng gió khơi.</p>

        <p>Hát rằng: cá bạc biển Đông lặng,<br>
        Cá thu biển Đông như đoàn thoi<br>
        Đêm ngày dệt biển muôn luồng sáng.<br>
        Đến dệt lưới ta, đoàn cá ơi!</p>

        <h3 class="reader-chapter-title" id="sgk-bien-dem-ky-vi">Khổ III & IV: Vẻ Đẹp Kỳ Ảo & Giàu Có Của Biển Đêm (SGK 9)</h3>
        <p>Thuyền ta lái gió với buồm trăng<br>
        Lướt giữa mây cao với biển bằng,<br>
        Ra đậu dặm xa dò bụng biển,<br>
        Dàn đan thế trận lưới vây giăng.</p>

        <p>Cá nhụ cá chim cùng cá đé,<br>
        Cá song lấp lánh đuốc đen hồng,<br>
        Cái đuôi em quẫy trăng vàng chóe.<br>
        Đêm thở: sao lùa nước Hạ Long.</p>

        <h3 class="reader-chapter-title">Khổ V & VI: Cảnh Kéo Lưới Đón Bình Minh Chạy Đua Cùng Mặt Trời</h3>
        <p>Ta hát bài ca gọi cá vào,<br>
        Gõ thuyền đã có nhịp trăng cao.<br>
        Biển cho ta cá như lòng mẹ<br>
        Nuôi lớn đời ta tự buổi nào.</p>

        <p>Sao mờ, kéo lưới kịp trời sáng,<br>
        Ta kéo xoăn tay chùm cá nặng.<br>
        Vảy bạc đuôi vàng lóe rạng đông,<br>
        Lưới xếp buồm lên đón nắng hồng.</p>

        <h3 class="reader-chapter-title">Khổ VII: Khúc Ca Khải Hoàn Trở Về</h3>
        <p>Câu hát căng buồm với gió khơi,<br>
        Đoàn thuyền chạy đua cùng mặt trời.<br>
        Mặt trời đội biển nhô màu mới,<br>
        Mắt cá huy hoàng muôn dặm phơi.</p>
        <div class="sgk-end-marker"><span>[ Toàn văn 7 khổ thơ Đoàn Thuyền Đánh Cá • Huy Cận ]</span></div>
    """,
    "criticism": "Đoàn Thuyền Đánh Cá đánh dấu sự hồi sinh kỳ diệu trong hồn thơ Huy Cận: Từ 'nỗi sầu vạn kỷ' trước cách mạng chuyển sang cảm hứng ngợi ca tràn trề sức sống, dựng nên bức tráng ca lộng lẫy về đất nước và người lao động.",
    "tags": ["Huy Cận", "Đoàn Thuyền Đánh Cá", "Thơ hiện đại", "Biển đảo", "SGK Lớp 9"]
  },

  # 18. BẾP LỬA (Bằng Việt)
  {
    "id": "bep-lua",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Bếp Lửa (Toàn Văn Thi Phẩm)",
    "author": "Bằng Việt",
    "authorId": "bang-viet",
    "category": "Thơ trữ tình hồi tưởng",
    "era": "Văn học Kháng chiến chống Mỹ",
    "year": "1963",
    "readTime": "6 phút đọc • Toàn văn bài thơ",
    "badge": "Khúc Ca Tình Bà Cháu",
    "image": "assets/images/scenes/beplua_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Ngọn lửa bếp ấm sực trong sương sớm nuôi dưỡng tâm hồn người cháu nơi xứ xa.",
    "epigraph": "Một bếp lửa chờn vờn sương sớm / Một bếp lửa ấp iu nồng đượm...",
    "excerpt": "Toàn văn thi phẩm cảm động của Bằng Việt sáng tác năm 1963 khi đang là sinh viên du học tại Liên Xô. Dòng hồi tưởng ấm áp về người bà tần tảo, ngọn lửa bếp bà nhóm lên mỗi sớm mai đã nuôi dưỡng ý chí và nhân cách người cháu trưởng thành.",
    "fullTextStatus": "Toàn Văn Bài Thơ",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn: Trọng tâm phân tích là hình ảnh người bà tần tảo, ngọn lửa bất diệt qua bom đạn chiến tranh và triết lý thiêng liêng về cội nguồn.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Thi Phẩm Bếp Lửa (Bằng Việt)
          </span>
          <a href="#sgk-ngon-lua-cua-ba" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến ngọn lửa thiêng liêng của bà (SGK 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Đoạn I: Hình Ảnh Bếp Lửa Khơi Nguồn Hồi Ức</h3>
        <p>Một bếp lửa chờn vờn sương sớm<br>
        Một bếp lửa ấp iu nồng đượm<br>
        Cháu thương bà biết mấy nắng mưa!</p>

        <h3 class="reader-chapter-title">Đoạn II: Những Năm Tháng Tuổi Thơ Gian Khổ Cùng Bà</h3>
        <p>Lên bốn tuổi cháu đã quen mùi khói<br>
        Năm ấy là năm đói mòn đói mỏi,<br>
        Bố đi đánh xe, khô rạc ngựa gầy,<br>
        Chỉ nhớ khói hun nhèm mắt cháu<br>
        Nghĩ lại đến giờ sống mũi còn cay!</p>

        <p>Tám năm ròng, cháu cùng bà nhóm lửa<br>
        Hú kêu một mình trên những cánh đồng xa<br>
        Khi tu hú kêu, bà còn nhớ không bà?<br>
        Bà hay kể chuyện những ngày ở Huế.<br>
        Tiếng tu hú sao mà tha thiết thế!<br>
        Mẹ cùng cha công tác bận không về,<br>
        Cháu ở cùng bà, bà bảo cháu nghe,<br>
        Bà dạy cháu làm, bà chăm cháu học.<br>
        Nhóm bếp lửa nghĩ thương bà khó nhọc,<br>
        Tu hú ơi! chẳng đến ở cùng bà,<br>
        Kêu chi hoài trên những cánh đồng xa?</p>

        <h3 class="reader-chapter-title" id="sgk-ngon-lua-cua-ba">Đoạn III: Giặc Đốt Làng & Ngọn Lửa Bền Bỉ Của Bà (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Bếp Lửa • Sự chuyển hóa từ bếp lửa sang ngọn lửa</span>
          </div>
          <p class="sgk-notice-desc">Ý nghĩa biểu tượng sâu sắc: Từ 'bếp lửa' cụ thể đời thường của người phụ nữ nông thôn chuyển hóa thành 'ngọn lửa' của niềm tin, ý chí và tình yêu thương bất diệt.</p>
        </div>

        <p>Năm giặc đốt làng cháy tàn cháy rụi<br>
        Hàng xóm bốn bên trở về lầm lụi<br>
        Đỡ đần bà dựng lại túp lều tranh<br>
        Vẫn vững lòng, bà dặn cháu đinh ninh:<br>
        <em>“Bố ở chiến khu, bố còn việc bố,<br>
        Mày có viết thư chớ kể này kể nọ,<br>
        Cứ bảo nhà vẫn được bình yên!”</em></p>

        <p>Rồi sớm rồi chiều, lại bếp lửa bà nhen,<br>
        Một ngọn lửa, lòng bà luôn ủ sẵn,<br>
        Một ngọn lửa chứa niềm tin dai dẳng...</p>

        <h3 class="reader-chapter-title">Đoạn IV: Suy Ngẫm Triết Lý & Nỗi Nhớ Nơi Đất Khách</h3>
        <p>Lận đận đời bà biết mấy nắng mưa<br>
        Mấy chục năm rồi, đến tận bây giờ<br>
        Bà vẫn giữ thói quen dậy sớm<br>
        Nhóm bếp lửa ấp iu nồng đượm,<br>
        Nhóm niềm yêu thương, khoai sắn ngọt bùi,<br>
        Nhóm nồi xôi gạo mới, sẻ chung vui,<br>
        Nhóm dậy cả những tâm tình tuổi nhỏ...<br>
        <strong>Ôi kỳ lạ và thiêng liêng — bếp lửa!</strong></p>

        <p>Giờ cháu đã đi xa. Có ngọn khói trăm tàu,<br>
        Có lửa trăm nhà, niềm vui trăm ngả,<br>
        Nhưng vẫn chẳng lúc nào quên nhắc nhở:<br>
        — Sớm mai này, bà nhóm bếp lên chưa?...</p>
        <div class="sgk-end-marker"><span>[ Toàn văn thi phẩm Bếp Lửa • Bằng Việt ]</span></div>
    """,
    "criticism": "Bếp Lửa của Bằng Việt là khúc tự tình tha thiết, ngọt ngào về tình bà cháu. Hình ảnh người bà tần tảo nhóm lửa đã vượt lên khỏi phạm vi gia đình để trở thành biểu tượng cho người phụ nữ Việt Nam kiên cường, giàu đức hy sinh nơi hậu phương kháng chiến.",
    "tags": ["Bằng Việt", "Bếp Lửa", "Thơ tình bà cháu", "Cội nguồn", "SGK Lớp 9"]
  }
]

print(f"Loaded Group 2: {len(WORKS_GROUP_2)} works.")
