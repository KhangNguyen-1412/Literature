# -*- coding: utf-8 -*-
import json

data_js = r'''/**
 * VĂN UYỂN - DỮ LIỆU VĂN HỌC TOÀN BÍCH
 * Hệ thống hiển thị ĐẦY ĐỦ TÁC PHẨM (Unabridged) chuẩn Editorial
 * Có phân định và đánh dấu trực quan phần nội dung trong Sách Giáo Khoa (SGK)
 * Kiểu chữ: Playfair Display & Newsreader
 * Bảng màu: Xanh Cerulean & Đỏ Jasper
 */

const LITERARY_DATA = {
  // --- KHO 12 TÁC PHẨM KINH ĐIỂN ĐẦY ĐỦ ---
  works: [
    {
      id: "truyen-kieu",
      title: "Truyện Kiều (Đoạn Trường Tân Thanh)",
      author: "Nguyễn Du",
      authorId: "nguyen-du",
      category: "Trường ca Lục bát",
      era: "Văn học Trung đại",
      year: "1820",
      readTime: "18 phút đọc • Tuyển bản toàn cảnh",
      badge: "Khai Sơn Tinh Hoa",
      image: "assets/images/kieu_ngung_bich.jpg",
      imageCaption: "Khắc gỗ Editorial: Nàng Kiều cô độc nơi lầu Ngưng Bích trông ra cửa bể chiều hôm — “Vẻ non xa tấm trăng gần ở chung”.",
      epigraph: "Trăm năm trong cõi người ta / Chữ tài chữ mệnh khéo là ghét nhau / Trải qua một cuộc bể dâu / Những điều trông thấy mà đau đớn lòng.",
      excerpt: "Bản trường thiên lục bát bất hủ gồm 3.254 câu thơ, kết tinh tư tưởng nhân đạo sâu sắc, nỗi đau nhân sinh và nghệ thuật thi ca đỉnh cao của Nguyễn Du.",
      fullTextStatus: "Toàn Cảnh Kiệt Tác",
      sgkDetail: "Chương trình Ngữ Văn THPT trích giảng các đoạn: Chị em Thúy Kiều, Cảnh ngày xuân, Trao duyên, Kiều ở lầu Ngưng Bích, và Chí khí anh hùng.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Cảnh Trường Thiên (3.254 câu lục bát)
          </span>
          <a href="#sgk-kieu-ngung-bich" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Nhảy đến đoạn trích SGK trọng tâm
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Khởi Đề & Chân Dung Chị Em Thúy Kiều</h3>
        <p>Trăm năm trong cõi người ta,<br>
        Chữ tài chữ mệnh khéo là ghét nhau.<br>
        Trải qua một cuộc bể dâu,<br>
        Những điều trông thấy mà đau đớn lòng.<br>
        Lạ gì bỉ sắc tư phong,<br>
        Trời xanh quen thói má hồng đánh ghen.</p>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Sách Giáo Khoa (Ngữ Văn THPT)
            </span>
            <span class="sgk-meta">Văn bản: Chị em Thúy Kiều</span>
          </div>
          <p class="sgk-notice-desc">Đoạn thơ dưới đây là văn bản chính khóa giảng dạy về nghệ thuật ước lệ cổ điển và bút pháp khắc họa tính cách, dự báo số phận nhân vật của thi hào Nguyễn Du.</p>
        </div>

        <p>Đầu lòng hai ả tố nga,<br>
        Thúy Kiều là chị em là Thúy Vân.<br>
        Mai cốt cách tuyết tinh thần,<br>
        Mỗi người một vẻ mười phân vẹn mười.<br>
        Vân xem trang trọng khác vời,<br>
        Khuôn trăng đầy đặn nét ngài nở nang.<br>
        Hoa cười ngọc thốt đoan trang,<br>
        Mây thua nước tóc tuyết nhường màu da.</p>

        <p>Kiều càng sắc sảo mặn mà,<br>
        So bề tài sắc lại là phần hơn.<br>
        Làn thu thủy nét xuân sơn,<br>
        Hoa ghen thua thắm liễu hờn kém xanh.<br>
        Một hai nghiêng nước nghiêng thành,<br>
        Sắc đành đòi một tài đành họa hai.<br>
        Thông minh vốn sẵn tính trời,<br>
        Pha nghề thi họa đủ mùi ca ngâm.<br>
        Cung thương làu bậc ngũ âm,<br>
        Nghề riêng ăn đứt hồ cầm một trương.<br>
        Khúc nhà tay lựa nên chương,<br>
        Một thiên Bạc mệnh lại càng não nhân.<br>
        Phong lưu rất mực hồng quần,<br>
        Xuân xanh xấp xỉ tới tuần cập kê.<br>
        Êm đềm trướng rủ màn che,<br>
        Tường đông ong bướm đi về mặc ai.</p>
        <div class="sgk-end-marker"><span>[ Hết đoạn trích Chị em Thúy Kiều trong SGK ]</span></div>

        <h3 class="reader-chapter-title">Phần II: Tiết Thanh Minh & Cảnh Ngày Xuân</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Sách Giáo Khoa (Ngữ Văn THPT)
            </span>
            <span class="sgk-meta">Văn bản: Cảnh ngày xuân</span>
          </div>
          <p class="sgk-notice-desc">Bức tranh thiên nhiên mùa xuân khoáng đạt, trong trẻo và tâm trạng xao xuyến, linh cảm tương lai trong buổi chiều tà.</p>
        </div>

        <p>Ngày xuân con én đưa thoi,<br>
        Thiều quang chín chục đã ngoài sáu mươi.<br>
        Cỏ non xanh tận chân trời,<br>
        Cành lê trắng điểm một vài bông hoa.<br>
        Thanh minh trong tiết tháng ba,<br>
        Lễ là tảo mộ hội là đạp thanh.<br>
        Gần xa nô nức yến anh,<br>
        Chị em sắm sửa bộ hành chơi xuân.<br>
        Dập dìu tài tử giai nhân,<br>
        Ngựa xe như nước áo quần như nêm...</p>

        <p>Tà tà bóng ngả về tây,<br>
        Chị em thơ thẩn dan tay ra về.<br>
        Bước dần theo ngọn tiểu khê,<br>
        Lần xem phong cảnh có bề thanh thanh.<br>
        Nao nao dòng nước uốn quanh,<br>
        Nhịp cầu nho nhỏ cuối ghềnh bắc ngang.</p>
        <div class="sgk-end-marker"><span>[ Hết đoạn trích Cảnh ngày xuân trong SGK ]</span></div>

        <h3 class="reader-chapter-title">Phần III: Đêm Thề Nguyền & Trao Duyên Cho Thúy Vân</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Sách Giáo Khoa (Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Trao duyên</span>
          </div>
          <p class="sgk-notice-desc">Đỉnh điểm bi kịch tình yêu: Thúy Kiều bán mình chuộc cha và cậy nhờ em gái Thúy Vân thay mình nối duyên cùng chàng Kim.</p>
        </div>

        <p>Cậy em em có chịu lời,<br>
        Ngồi lên cho chị lạy rồi sẽ thưa.<br>
        Giữa đường đứt gánh tương tư,<br>
        Keo loan chắp mối tơ thừa mặc em.<br>
        Kể từ khi gặp chàng Kim,<br>
        Khi ngày quạt ước khi đêm chén thề.<br>
        Sự đâu sóng gió bất kỳ,<br>
        Hiếu tình khôn lẽ hai bề vẹn hai.<br>
        Ngày xuân em hãy còn dài,<br>
        Xót tình máu mủ thay lời nước non.<br>
        Chị dù thịt nát xương mòn,<br>
        Ngậm cười chín suối hãy còn thơm lây...</p>

        <p>Chiếc vành với bức tờ mây,<br>
        Duyên này thì giữ vật này của chung.<br>
        Dù em nên vợ nên chồng,<br>
        Xót người mệnh bạc ắt lòng chẳng quên.<br>
        Mất người còn chút của tin,<br>
        Phím đàn với mảnh hương nguyền ngày xưa.<br>
        Mai sau dù có bao giờ,<br>
        Đốt lò hương ấy so tơ phím này.<br>
        Trông ra ngọn cỏ lá cây,<br>
        Thấy hiu hiu gió thì hay chị về...<br>
        Trăm nghìn gửi lạy tình quân,<br>
        Tơ duyên ngắn ngủi có ngần ấy thôi!<br>
        Phận sao phận bạc như vôi!<br>
        Đã đành nước chảy hoa trôi lỡ làng.<br>
        Ôi Kim Lang! Hỡi Kim Lang!<br>
        Thôi thôi thiếp đã phụ chàng từ đây!</p>
        <div class="sgk-end-marker"><span>[ Hết đoạn trích Trao duyên trong SGK ]</span></div>

        <h3 class="reader-chapter-title" id="sgk-kieu-ngung-bich">Phần IV: Kiều Ở Lầu Ngưng Bích (Đỉnh Cao Tả Cảnh Ngụ Tình)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Trọng Tâm Sách Giáo Khoa (Ngữ Văn THPT)
            </span>
            <span class="sgk-meta">Văn bản: Kiều ở lầu Ngưng Bích</span>
          </div>
          <p class="sgk-notice-desc">Đoạn thơ thể hiện trọn vẹn cảnh ngộ cô đơn lưu lạc và tấm lòng thủy chung son sắt của Thúy Kiều trước không gian mênh mông rợn ngợp của biển chiều.</p>
        </div>

        <p>Trước lầu Ngưng Bích khóa xuân,<span class="footnote-ref" data-note="khóa xuân: giam lỏng người con gái trẻ đẹp trong phòng kín, ở đây chỉ cảnh Kiều bị Tú Bà giam lỏng tại lầu Ngưng Bích.">*1</span><br>
        Vẻ non xa tấm trăng gần ở chung.<br>
        Bốn bề bát ngát xa trông,<br>
        Cát vàng cồn nọ bụi hồng dặm kia.<br>
        Bẽ bàng mây sớm đèn khuya,<br>
        Nửa tình nửa cảnh như chia tấm lòng.</p>

        <p>Tưởng người dưới nguyệt chén đồng,<span class="footnote-ref" data-note="chén đồng: chén rượu thề nguyền đồng tâm đồng lòng giữa Kiều và Kim Trọng dưới ánh trăng.">*2</span><br>
        Tin sương luống những rày trông mai chờ.<br>
        Bên trời góc bể bơ vơ,<br>
        Tấm son gột rửa bao giờ cho phai.<br>
        Xót người tựa cửa hôm mai,<br>
        Quạt nồng ấp lạnh<span class="footnote-ref" data-note="quạt nồng ấp lạnh: điển cố chỉ lòng hiếu thảo của người con chăm sóc cha mẹ khi mùa hè oi bức quạt cho mát, mùa đông ủ chăn cho ấm.">*3</span> những ai đó giờ?<br>
        Sân Lai cách mấy nắng mưa,<span class="footnote-ref" data-note="sân Lai: lấy tích Lão Lai Tử nước Sở già rồi vẫn mặc áo sặc sỡ múa cho cha mẹ vui. Chỉ nơi cha mẹ già ở.">*4</span><br>
        Có khi gốc tử đã vừa người ôm.</p>

        <p>Buồn trông cửa bể chiều hôm,<br>
        Thuyền ai thấp thoáng cánh buồm xa xa?<br>
        Buồn trông ngọn nước mới sa,<br>
        Hoa trôi man mác biết là về đâu?<br>
        Buồn trông nội cỏ rầu rầu,<br>
        Chân mây mặt đất một màu xanh xanh.<br>
        Buồn trông gió cuốn mặt duềnh,<br>
        Ầm ầm tiếng sóng kêu quanh ghế ngồi.</p>
        <div class="sgk-end-marker"><span>[ Hết đoạn trích Kiều ở lầu Ngưng Bích trong SGK ]</span></div>

        <h3 class="reader-chapter-title">Phần V: Chí Khí Anh Hùng & Đoạn Kết Toàn Thư</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Sách Giáo Khoa (Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Chí khí anh hùng</span>
          </div>
          <p class="sgk-notice-desc">Lý tưởng người anh hùng trượng phu đầu đội trời chân đạp đất Từ Hải và khát vọng tự do công lý của Nguyễn Du.</p>
        </div>

        <p>Nửa năm hương lửa đương nồng,<br>
        Trượng phu thoắt đã động lòng bốn phương.<br>
        Trông vời trời bể mênh mang,<br>
        Thanh gươm yên ngựa lên đường thẳng rong.<br>
        Nàng rằng: 'Phận gái chữ tòng,<br>
        Chàng đi thiếp cũng một lòng xin đi.'<br>
        Từ rằng: 'Tâm phúc tương tri,<br>
        Sao chưa thoát khỏi nữ nhi thường tình?<br>
        Bao giờ mười vạn tinh binh,<br>
        Tiếng trắc lừng lẫy bốn phương ngập tràn...<br>
        Rước nàng nghi vệ dung nhan,<br>
        Bấy giờ ta sẽ rước nàng về dinh...'<br>
        Quyết lời dứt áo ra đi,<br>
        Gió mây bằng đã đến kỳ dặm khơi.</p>

        <p style="margin-top: 2rem; font-style: italic; color: var(--ink-secondary); text-align: center;">
        Thiện căn ở tại lòng ta,<br>
        Chữ tâm kia mới bằng ba chữ tài.<br>
        Lời quê chắp nhặt dông dài,<br>
        Mua vui cũng được một vài trống canh.
        </p>
      `,
      criticism: "Bằng bút pháp tả cảnh ngụ tình tuyệt đỉnh, tài năng miêu tả tâm lý bậc thầy và nghệ thuật ngôn từ tiếng Việt đạt tới đỉnh cao muôn trượng, Nguyễn Du đã để lại cho hậu thế pho thi ca kinh điển của chủ nghĩa nhân đạo.",
      tags: ["Kiệt tác", "Thơ Lục Bát", "Nguyễn Du", "Trung đại", "Toàn văn & SGK"]
    },
    {
      id: "chu-nguoi-tu-tu",
      title: "Chữ Người Tử Tù",
      author: "Nguyễn Tuân",
      authorId: "nguyen-tuan",
      category: "Truyện ngắn kinh điển",
      era: "Văn học Lãng mạn",
      year: "1940",
      readTime: "15 phút đọc • Toàn văn tác phẩm",
      badge: "Vang Bóng Một Thời",
      image: "assets/images/huan_cao.jpg",
      imageCaption: "Khắc gỗ Editorial: Cảnh Huấn Cao dậm tô nét chữ vuông vắn trên lụa trắng dưới ánh đuốc bập bùng ngục tối tỉnh Sơn.",
      epigraph: "Cái đẹp có thể sinh ra từ nơi tăm tối, nhơ bẩn nhưng cái đẹp không bao giờ chung sống với cái ác.",
      excerpt: "Toàn văn truyện ngắn kinh điển trích trong tập 'Vang bóng một thời' của Nguyễn Tuân. Bức tranh tráng lệ về sự chiến thắng của Cái Đẹp và Thiên Lương trước bạo quyền tăm tối.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Chương trình Ngữ Văn 11 giảng dạy truyện ngắn này với trọng tâm phân tích là đoạn mở đầu, mối giao cảm biệt nhỡn liên tài và 'Cảnh cho chữ xưa nay chưa từng có'.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Văn Tác Phẩm (Trọn vẹn từ 'Vang bóng một thời')
          </span>
          <a href="#sgk-canh-cho-chu" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh cho chữ trong SGK
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Trát Tỉnh & Nỗi Niềm Viên Quản Ngục</h3>
        <p>Thầy thơ lại rút chìa khóa tra vào ổ, mở cánh cửa buồng giấy ngục tỉnh Sơn. Viên quản ngục ngẩng đầu lên hỏi:<br>
        — Có việc gì thế, thầy thơ lại?</p>

        <p>Thầy thơ lại khúm núm dâng lên một công văn:<br>
        — Dạ bẩm, trát của tỉnh phái sáu tên tù án chém về đây. Trong đó có tên Huấn Cao cầm đầu vụ nổi loạn chống lại triều đình.</p>

        <p>Viên quản ngục chau mày nghĩ ngợi một lát rồi khẽ nói:<br>
        — Huấn Cao? Có phải cái người mà vùng tỉnh Sơn ta vẫn khen ngợi là có tài viết chữ rất nhanh và rất đẹp đó không?</p>

        <p>— Dạ chính thực. Người ta đồn ông ta có tài bẻ khóa vượt ngục, lại có hoa tay viết chữ Hán vuông vắn, tươi tắn như rồng bay phượng múa. Ai có được chữ của ông Huấn mà treo trong nhà là coi như có một báu vật trên đời.</p>

        <p>Quản ngục khẽ thở dài, trong lòng gợn lên một nỗi băn khoăn kỳ lạ: Một người tài hoa, nghĩa khí đến bực ấy sao lại phải chịu bước đường cùng nơi pháp trường? Suốt đêm hôm ấy, quản ngục trằn trọc dưới ngọn đèn leo lét bên ấm trà quạnh quẽ.</p>

        <h3 class="reader-chapter-title">Hồi II: Tiếp Nhận Tử Tù & Sự Khinh Bạc Trước Cường Quyền</h3>
        <p>Sáng hôm sau, đoàn tử tù đến. Huấn Cao đi đầu, cổ mang gông nặng, chân vướng xiềng xích sắt loảng xoảng. Khi tên lính áp giải quát tháo, Huấn Cao lạnh lùng thúc mạnh chiếc gông nặng vào bậc đá thềm ngục làm một tiếng 'rầm' vang dội để rũ rệp, coi quân lính như cỏ rác.</p>

        <p>Trái với lệ thường của chốn ngục tù khét tiếng hung bạo, viên quản ngục lại nhìn Huấn Cao bằng con mắt kiêng nể khác thường. Từ hôm ấy, mỗi buổi chiều, ngục quan lại sai thầy thơ lại bí mật đem dâng vào phòng giam Huấn Cao rượu ngon và đùi thịt bò nướng chu tất.</p>

        <p>Huấn Cao thản nhiên ăn thịt, uống rượu, coi đó như việc đương nhiên trong thiên hạ. Nhưng đến khi quản ngục rụt rè bước vào thăm dò, Huấn Cao liền lạnh lùng quát đuổi:<br>
        — Ngươi hỏi ta muốn gì ư? Ta chỉ muốn có một điều: là nhà ngươi đừng bước chân vào đây nữa!</p>

        <p>Viên quản ngục lễ phép cúi đầu lùi ra, buông một câu nhũn nhặn:<br>
        — Xin lĩnh ý!</p>

        <h3 class="reader-chapter-title">Hồi III: Biệt Nhỡn Liên Tài & Cơ Hội Cuối Cùng</h3>
        <p>Thời gian thấm thoắt trôi, ngày thi hành án chém đã cận kề. Viên quản ngục mất ăn mất ngủ vì lo sợ một mai Huấn Cao bị hành quyết mà mình chưa kịp xin được một bức chữ để thờ thì sẽ ôm hận suốt đời. Hiểu được tấm lòng quản ngục, thầy thơ lại liều mình vào xà lim bày tỏ tất cả sự sùng bái và nỗi lòng đau đáu của ngục quan.</p>

        <p>Nghe xong, Huấn Cao lặng đi giây lát rồi bật cười sảng khoái:<br>
        — Ta cảm cái tấm lòng biệt nhỡn liên tài của các người. Nào ta có biết thầy Quản lại là người có sở thích thanh tao, cao quý đến thế! Ta nhất sinh không vì vàng ngọc hay quyền thế mà ép mình viết câu đối bao giờ. Đời ta chỉ mới viết hai bộ tứ bình và một bức trung đường cho ba người bạn tri kỷ mà thôi... Suýt nữa thì ta đã phụ mất một tấm lòng trong thiên hạ!</p>

        <h3 class="reader-chapter-title" id="sgk-canh-cho-chu">Hồi IV: Cảnh Cho Chữ Xưa Nay Chưa Từng Có</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Chữ Người Tử Tù • Phân cảnh cao trào</span>
          </div>
          <p class="sgk-notice-desc">Dưới đây là phân cảnh linh hồn của toàn bộ truyện ngắn: Nghệ thuật dùng ánh sáng đối lập bóng tối, tôn vinh Cái Đẹp và Thiên Lương chiến thắng xiềng xích bạo tàn.</p>
        </div>

        <p>Đêm hôm ấy, lúc trại giam tỉnh Sơn chỉ còn vẳng có tiếng mõ trên vọng canh, một cảnh tượng xưa nay chưa từng có<span class="footnote-ref" data-note="cảnh tượng xưa nay chưa từng có: cái đẹp, nghệ thuật thanh cao được khai sinh ngay giữa chốn ngục tù nhơ bẩn, ẩm mốc phân chuột phân gián.">*1</span>, đã bày ra trong một buồng tối chật hẹp, ẩm ướt, tường đầy mạng nhện, đất bừa bãi phân chuột, phân gián.</p>

        <p>Trong một không khí khói tỏa như đám cháy nhà, ánh sáng đỏ rực của một bó đuốc tẩm dầu rọi lên ba cái đầu chụm lại. Một người tù cổ đeo gông, chân vướng xiềng, đang dậm tô nét chữ trên tấm lụa trắng tinh căng phẳng trên mảnh ván. Người tù viết xong một chữ, viên quản ngục lại vội khúm núm cất những đồng tiền kẽm đánh dấu ô chữ đặt trên phiến lụa óng. Và cái thầy thơ lại gầy gò, thì run run bưng chậu mực.</p>

        <p>Thay bút con, đề xong lạc khoản, ông Huấn Cao thở dài, buồn bã đỡ viên quản ngục đứng thẳng người dậy và đĩnh đạc bảo:<br>
        — Tôi gióng hàng chữ cuối cùng này với thầy quản đây... Ở đây lẫn lộn. Ta khuyên thầy Quản nên thay chốn ở đi. Chỗ này không phải là nơi để treo một bức lụa trắng với những nét chữ vuông vắn tươi tắn, nó nói lên những cái hoài bão tung hoành của một đời con người... Thầy hãy thoát khỏi cái nghề này đi đã, rồi hãy nghĩ đến chuyện chơi chữ. Ở đây, khó giữ thiên lương<span class="footnote-ref" data-note="thiên lương: bản tính tốt lành, lương thiện trời phú cho con người.">*2</span> cho lành vững và rồi cũng đến nhem nhuốc mất cái đời lương thiện đi.</p>

        <p>Lửa đóm rụng xuống nền đất ẩm, tàn than tơi bời bay. Viên quản ngục nghe xong, ngậm ngùi, vái người tù một vái, chắp tay nói một câu mà dòng nước mắt rỉ vào kẽ miệng làm cho nghẹn ngào:<br>
        — Kẻ mê muội này xin bái lĩnh!</p>
        <div class="sgk-end-marker"><span>[ Kết thúc đoạn trích SGK • Toàn văn tác phẩm trọn vẹn ]</span></div>
      `,
      criticism: "Nguyễn Tuân đã nâng cái Đẹp lên tầm vóc một tôn giáo nghệ thuật. Sự khuất phục tự nguyện của viên quản ngục trước tử tù Huấn Cao là biểu tượng vĩ đại cho sự quy phục của quyền lực trước cái Đẹp và Nhân cách.",
      tags: ["Nguyễn Tuân", "Truyện ngắn", "Cái Đẹp", "Khí phách", "Toàn văn & SGK"]
    },
    {
      id: "chi-pheo",
      title: "Chí Phèo",
      author: "Nam Cao",
      authorId: "nam-cao",
      category: "Truyện ngắn kinh điển",
      era: "Hiện thực Phê phán",
      year: "1941",
      readTime: "18 phút đọc • Toàn văn kiệt tác",
      badge: "Kiệt Tác Hiện Thực",
      image: "assets/images/chi_pheo.jpg",
      imageCaption: "Khắc gỗ Editorial: Thị Nở mang bát cháo hành bốc khói vào lều cho Chí Phèo dưới ánh trăng bên vườn chuối.",
      epigraph: "Ai cho tao lương thiện? Làm sao cho mất được những vết mảnh chai trên mặt này?",
      excerpt: "Bản văn đầy đủ của kiệt tác văn xuôi hiện thực Nam Cao: từ tiếng chửi rạch mặt ăn vạ, mối tình vườn chuối, bát cháo hành thức tỉnh đến tiếng thét đòi lương thiện chấn động làng Vũ Đại.",
      fullTextStatus: "Toàn Văn Kiệt Tác",
      sgkDetail: "Chương trình Ngữ Văn THPT tập trung trích giảng từ đoạn mở đầu (tiếng chửi), cảnh thức tỉnh bên bát cháo hành Thị Nở đến bi kịch bị cự tuyệt và cái chết đòi lương thiện.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Văn Hoàn Chỉnh (Nam Cao)
          </span>
          <a href="#sgk-bat-chao-hanh" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Nhảy đến đoạn bát cháo hành SGK
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Tiếng Chửi & Nguồn Gốc Đứa Trẻ Bị Bỏ Rơi</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Mở Đầu Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Chí Phèo • Khúc dạo đầu</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật trần thuật đa giọng điệu độc đáo của Nam Cao: Tiếng chửi là hình thức giao tiếp tuyệt vọng duy nhất của một con người đã bị tước đoạt tư cách làm người.</p>
        </div>

        <p>Hắn vừa đi vừa chửi. Bao giờ cũng thế, cứ rượu xong là hắn chửi. Bắt đầu chửi trời. Có hề gì? Trời có của riêng nhà nào? Rồi hắn chửi đời. Thế cũng chẳng sao: đời là tất cả nhưng chẳng là ai. Tức mình hắn chửi ngay tất cả làng Vũ Đại. Nhưng cả làng Vũ Đại ai cũng nhủ: 'Chắc nó trừ mình ra!'. Không ai lên tiếng cả. Tức thật! Ờ! Thế này thì tức thật! Tức chết đi được mất! Đã thế, hắn phải chửi cha đứa nào không chửi nhau với hắn. Nhưng cũng không ai ra điều. Mẹ kiếp! Thế thì có phí rượu không? Thế thì có khổ hắn không? Không biết đứa chết mẹ nào đẻ ra thân hắn cho hắn khổ đến nông nỗi này?</p>

        <p>Hắn không biết, cả làng Vũ Đại cũng không ai biết ai đẻ ra hắn. Một anh đi thả ống lươn, một buổi sáng tinh sương đã thấy hắn trần truồng và xám ngắt trong một cái váy đụp để bên cái lò gạch cũ bỏ không. Người ta nhặt hắn về, chuyền tay nhau nuôi nấng. Lớn lên, Chí Phèo đi làm canh điền cho nhà lý trưởng Bá Kiến. Năm hai mươi tuổi, hắn là một anh lực điền khỏe mạnh, hiền lành như đất, biết tự trọng khi bị bà ba nhà Bá Kiến bắt bóp chân. Nhưng cụ Bá ghen ngầm, liền cấu kết với quan trên tống cổ hắn vào tù.</p>

        <h3 class="reader-chapter-title">Hồi II: Con Quỷ Dữ Của Làng Vũ Đại</h3>
        <p>Bảy tám năm sau, Chí Phèo trở về làng. Hắn không còn là anh canh điền ngày trước nữa: cái đầu trọc lốc, răng cạo trắng hớn, cái mặt thì đen mà rất câng câng, hai con mắt gườm gườm trông gớm chết! Hắn mặc cái quần nái đen với cái áo tây vàng, ngực phanh đầy những nét xăm trổ rồng phượng ghê rợn.</p>

        <p>Hắn về hôm trước thì hôm sau đã ra ngồi ở chợ uống rượu với ăn thịt chó từ trưa đến xế chiều. Say khướt, hắn xách vỏ chai đến tận nhà Bá Kiến rạch mặt ăn vạ. Nhưng Bá Kiến già đời khôn róc đời đã khéo léo biến Chí Phèo thành tay sai đắc lực, con quỷ dữ chuyên đâm thuê chém mướn, cướp bóc, rạch mặt ăn vạ để phá tan bao cơ nghiệp dân làng.</p>

        <h3 class="reader-chapter-title">Hồi III: Cuộc Gặp Thị Nở Dưới Ánh Trăng Bờ Sông</h3>
        <p>Và cuộc đời hắn cứ thế trượt dài trong những cơn say triền miên không bờ bến, cho đến một đêm trăng thanh bên bờ sông. Chí Phèo đi uống rượu về thì bắt gặp Thị Nở—người đàn bà xấu ma chê quỷ hờn, ngớ ngẩn lại nghèo xơ xác—đang nằm ngủ hớ hênh bên bờ nước cạnh vườn chuối...</p>

        <h3 class="reader-chapter-title" id="sgk-bat-chao-hanh">Hồi IV: Bát Cháo Hành & Khát Vọng Lương Thiện</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Chí Phèo • Đoạn thức tỉnh & Bát cháo hành</span>
          </div>
          <p class="sgk-notice-desc">Phân cảnh xúc động nhất của kiệt tác: Tình người mộc mạc thức tỉnh linh hồn quỷ dữ, khơi dậy bản tính lương thiện bị vùi lấp bấy lâu.</p>
        </div>

        <p>Sáng hôm sau, Chí Phèo tỉnh dậy muộn. Mặt trời đã lên cao và ánh nắng hắt vào căn lều ẩm mốc rách nát. Lần đầu tiên sau bao nhiêu năm, Chí Phèo hết say và hoàn toàn tỉnh táo. Hắn nghe thấy những âm thanh quen thuộc của cuộc sống hằng ngày: tiếng chim hót ríu rít ngoài bờ sông, tiếng anh thuyền chài gõ mái chèo đuổi cá, tiếng cười nói của mấy bà đi chợ bán vải về... Chao ôi, những âm thanh ấy ngày nào chẳng có, nhưng hôm nay hắn mới nghe thấy, và chúng bỗng làm lòng hắn bùi ngùi.</p>

        <p>Hắn chợt thấy mình già nua, cô độc và đói rét. Hắn sợ tuổi già và ốm đau trong cô quạnh. Giữa lúc ấy, Thị Nở bưng vào một nồi cháo hành bốc khói nghi ngút. Thấy hắn nhìn, thị múc ra bát đưa tận tay cho hắn.</p>

        <p>Chí Phèo ngạc nhiên hết sức. Lần đầu tiên trong đời, hắn được một người đàn bà cho ăn mà không phải cướp giật hay dọa dẫm. Hắn bưng bát cháo húp một hơi, mồ hôi vã ra như tắm. Hắn thấy mắt mình ươn ướt. Chao ôi! Hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao! Thị Nở sẽ là chiếc cầu nối mở đường cho hắn trở về với cõi người bình dị.</p>

        <h3 class="reader-chapter-title">Hồi V: Bi Kịch Cự Tuyệt & Tiếng Thét Đòi Lương Thiện</h3>
        <p>Nhưng hạnh phúc vừa chớm nở thì bi kịch lại ập đến tàn nhẫn. Bà cô Thị Nở không đời nào cho cháu gái mình đi lấy 'một thằng chỉ có một nghề là rạch mặt ăn vạ'. Lời từ chối phũ phàng của Thị Nở đóng sầm cánh cửa hoàn lương của Chí Phèo. Hắn uống rượu thật nhiều nhưng càng uống lại càng tỉnh, và thoang thoảng đâu đây vẫn bay mùi cháo hành.</p>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Kết Thúc Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Chí Phèo • Hồi kết bi tráng</span>
          </div>
          <p class="sgk-notice-desc">Tiếng thét xé lòng khẳng định quyền được sống làm người lương thiện và sự phán xét đanh thép đối với chế độ phong kiến thực dân tàn bạo.</p>
        </div>

        <p>Chí Phèo xách dao đến thẳng nhà Bá Kiến. Hắn xông vào sân, chỉ thẳng mũi dao vào mặt cụ Cố:<br>
        — Tao không đến đây để xin tiền! Tao muốn làm người lương thiện!<br>
        Bá Kiến cười nhạt:<br>
        — Ồ tưởng gì! Tôi tưởng anh cần tiền thì tôi cho chứ lương thiện thì khó gì.<br>
        Chí Phèo trợn trừng mắt, gào thét vang động cả làng:<br>
        — Ai cho tao lương thiện? Làm sao cho mất được những vết mảnh chai trên mặt này? Tao không thể là người lương thiện nữa rồi! Chỉ có một cách... chỉ còn một cách là... này!</p>

        <p>Chí Phèo vung dao đâm trúng cổ Bá Kiến rồi tự đâm vào cổ mình kết liễu đời mình trong vũng máu. Khi tin tức truyền đi, cả làng Vũ Đại xôn xao bàn tán. Thị Nở nhìn xuống bụng mình rồi nhìn ra xa xa, trong đầu thoáng hiện lên hình ảnh cái lò gạch cũ bỏ không, vắng ngắt...</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Chí Phèo ]</span></div>
      `,
      criticism: "Nam Cao đã chạm tới đáy sâu nhất của bi kịch nhân phẩm: nỗi đau đớn cùng cực của con người khi bị cự tuyệt quyền làm Người. Một tượng đài bất hủ của chủ nghĩa hiện thực phê phán Việt Nam.",
      tags: ["Nam Cao", "Hiện thực", "Chí Phèo", "Bi kịch tha hóa", "Toàn văn & SGK"]
    },
    {
      id: "lao-hac",
      title: "Lão Hạc",
      author: "Nam Cao",
      authorId: "nam-cao",
      category: "Truyện ngắn hiện thực",
      era: "Hiện thực Phê phán",
      year: "1943",
      readTime: "16 phút đọc • Toàn văn tác phẩm",
      badge: "Hiện Thực Đỉnh Cao",
      image: "assets/images/lao_hac.jpg",
      imageCaption: "Khắc gỗ Editorial: Lão Hạc ngồi lặng lẽ bên hiên nhà tranh nhìn con Vàng trung thành với ánh mắt xót xa trĩu nặng.",
      epigraph: "Chao ôi! Đối với những người ở quanh ta, nếu ta không cố tìm mà hiểu họ, thì ta chỉ thấy họ gàn dở, ngu ngốc, bần tiện, xấu xa, bỉ ổi...",
      excerpt: "Toàn văn truyện ngắn cảm động bậc nhất của Nam Cao về tình phụ tử thiêng liêng, số phận khốn cùng của người nông dân nghèo và nhân phẩm cao quý được bảo toàn bằng cái chết dữ dội.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Tác phẩm được giảng dạy trọng tâm trong chương trình Ngữ Văn THCS & THPT: phân cảnh Lão Hạc khóc kể chuyện bán Cậu Vàng và cái chết bi tráng.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Văn Tác Phẩm (Nam Cao - 1943)
          </span>
          <a href="#sgk-ban-cho" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh bán chó Cậu Vàng SGK
          </a>
        </div>

        <h3 class="reader-chapter-title" id="sgk-ban-cho">Hồi I: Cậu Vàng Đi Đời Rồi & Nỗi Đau Lừa Một Con Chó</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn)
            </span>
            <span class="sgk-meta">Văn bản: Lão Hạc • Đoạn bán Cậu Vàng</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật miêu tả tâm lý bậc thầy của Nam Cao: nỗi dằn vặt lương tâm xé lòng của một lão nông hiền hậu khi buộc lòng phải phản bội một sinh linh tin cậy mình.</p>
        </div>

        <p>Lão Hạc thổi cái mồi rơm, châm đóm hút xong một điếu thuốc lào. Lão chép miệng một cái, rồi quay sang tôi bảo:<br>
        — Cậu Vàng đi đời rồi, ông Giáo ạ!</p>

        <p>Tôi ngạc nhiên hỏi:<br>
        — Cụ bán rồi à?<br>
        — Bán rồi! Họ vừa bắt xong.</p>

        <p>Lão cố làm ra vẻ vui vẻ. Nhưng trông lão cười như mếu và đôi mắt lão ầng ậng nước. Tôi muốn ôm choàng lấy lão mà òa lên khóc. Bây giờ thì tôi không xót xa năm quyển sách của tôi quá như trước nữa. Tôi chỉ ái ngại cho lão Hạc. Lão Hạc ơi! Lão có ngờ đâu rằng con chó ấy lão coi như đứa cháu ngoại lại chính là giọt máu của con trai lão để lại?</p>

        <p>Mặt lão đột nhiên co rúm lại. Những vết nhăn xô lại với nhau, ép cho nước mắt chảy ra. Cái đầu lão ngoẹo về một bên và cái miệng móm mém của lão mếu máo như con nít. Lão hu hu khóc:<br>
        — Khốn nạn... Ông Giáo ơi!... Nó có biết gì đâu! Nó thấy tôi gọi thì chạy ngay về, vẫy đuôi mừng rỡ. Tôi cho nó ăn một bát cơm. Nó đang cắm đầu ăn thì thằng Mục với thằng Xiên núp sau cổng nhảy xổ vào, trói giật cánh khuỷu bốn chân nó lại... Khốn nạn, ông lão gần đất xa trời còn đi lừa một con chó!</p>

        <h3 class="reader-chapter-title">Hồi II: Tình Phụ Tử & Ba Mươi Đồng Bạc Giữ Vườn</h3>
        <p>Con trai lão vì nghèo không cưới nổi người con gái mình yêu nên đã phẫn chí bỏ đi phu đồn điền cao su biền biệt mấy năm chưa về. Một mình lão thui thủi trong căn nhà lá tàn tạ, bấu víu vào con chó Vàng như một kỷ vật thiêng liêng duy nhất. Trận bão vừa rồi tàn phá hoa màu, lão lại ốm một trận thập tử nhất sinh. Không ai mướn lão làm thuê nữa. Mỗi ngày ăn hết một hào thì mảnh vườn của con trai sẽ sớm tan thành mây khói.</p>

        <p>Lão Hạc sang nhà tôi, gửi lại ba mươi đồng bạc tích cóp cả đời cùng văn tự mảnh vườn:<br>
        — Tôi nhờ ông Giáo giữ hộ. Mảnh vườn này là của con trai tôi, sống chết tôi cũng không bán, không đụng vào một xu. Còn ba mươi đồng này, ngộ nhỡ tôi có chết bất đắc kỳ tử, ông Giáo dùng tiền này lo ma chay cho tôi, đừng để hàng xóm phải bỏ tiền lo giùm. Tôi chết thì rũ sạch, không phiền lụy đến ai cả!</p>

        <h3 class="reader-chapter-title">Hồi III: Cái Chết Dữ Dội & Nhân Phẩm Bất Khả Xâm Phạm</h3>
        <p>Mấy hôm sau, Binh Tư—tay trộm chó trong làng—bảo tôi lão Hạc xin hắn một ít bả chó. Tôi giật mình, cay đắng nghĩ: Hóa ra lão Hạc cũng đến bước đường cùng làm điều xấu xa như ai! Nhưng tôi đã nhầm.</p>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Kết Thúc Sách Giáo Khoa (SGK Ngữ Văn)
            </span>
            <span class="sgk-meta">Văn bản: Lão Hạc • Cái chết của Lão Hạc</span>
          </div>
          <p class="sgk-notice-desc">Cái chết đau đớn và dữ dội để giữ trọn thiên lương, sự trong sạch và tình thương vô bờ bến dành cho đứa con trai xa xứ.</p>
        </div>

        <p>Lão Hạc không hề trộm chó của ai cả. Lão xin bả chó để tự kết liễu đời mình! Lão Hạc nằm trên giường, đầu tóc rũ rượi, quần áo xộc xệch, hai mắt long sòng sọc. Lão tru tréo, bọt mép sùi ra, khắp người giật giật từng cơn dữ dội. Hai người đàn ông lực lưỡng phải đè lên ngực lão. Vật vã đến hơn hai giờ đồng hồ thì lão Hạc chết. Cái chết thật dữ dội!</p>

        <p>Cả làng không ai hiểu vì sao lão chết, chỉ có tôi và Binh Tư hiểu. Lão Hạc chọn cái chết khốc liệt ấy để con chó chết thế nào thì lão chết như thế, chuộc lại lỗi lầm lừa dối một sinh linh, và quan trọng hơn hết, để bảo toàn trọn vẹn từng tấc đất mảnh vườn cho đứa con trai nghèo!</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Lão Hạc ]</span></div>
      `,
      criticism: "Lão Hạc là tượng đài bất tử về phẩm giá cao quý của người nông dân Việt Nam trước Cách mạng. Dù nghèo đói cùng cực dồn vào ngõ cụt, họ thà chọn cái chết đau đớn chứ quyết không đánh mất thiên lương và tình phụ tử thiêng liêng.",
      tags: ["Nam Cao", "Lão Hạc", "Hiện thực", "Tình phụ tử", "Toàn văn & SGK"]
    },
    {
      id: "hai-dua-tre",
      title: "Hai Đứa Trẻ",
      author: "Thạch Lam",
      authorId: "thach-lam",
      category: "Truyện ngắn trữ tình",
      era: "Văn học Lãng mạn (Tự Lực Văn Đoàn)",
      year: "1938",
      readTime: "14 phút đọc • Toàn văn tác phẩm",
      badge: "Tự Lực Văn Đoàn",
      image: "assets/images/hai_dua_tre.jpg",
      imageCaption: "Khắc gỗ Editorial: Hai chị em Liên và An ngồi trên chõng tre ngắm đoàn tàu đêm rực sáng băng qua phố huyện nghèo tăm tối.",
      epigraph: "Một thế giới ánh sáng lướt qua trong tích tắc, đủ thắp lên niềm khao khát sống mãnh liệt trong những tâm hồn thơ ngây.",
      excerpt: "Toàn văn tác phẩm trữ tình kiệt xuất của Thạch Lam. Nỗi buồn man mác của buổi chiều tà phố huyện, những mảnh đời tàn tạ trong bóng tối và chuyến tàu đêm rực sáng từ Hà Nội mang theo khát vọng đổi đời.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Toàn bộ truyện ngắn 'Hai Đứa Trẻ' được giảng dạy trong chương trình Ngữ Văn 11, với trọng tâm là cảnh phố huyện lúc chiều tàn và chuyến tàu đêm qua phố huyện.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Văn Tác Phẩm (Tập 'Gió đầu mùa' - Thạch Lam)
          </span>
          <a href="#sgk-chuyen-tau-dem" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh đoàn tàu đêm SGK
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Buổi Chiều Tà Phố Huyện & Phiên Chợ Tàn</h3>
        <p>Tiếng trống thu không trên chòi của huyện nhỏ, từng tiếng một vang ra để gọi buổi chiều. Phương tây đỏ rực như lửa cháy và những đám mây ánh hồng như hòn than sắp tàn. Dãy tre làng trước mặt đen lại và cắt hình rõ rệt trên nền trời.</p>

        <p>Chiều, chiều rồi. Một chiều êm ả như ru, văng vẳng tiếng ếch nhái kêu ran ngoài đồng ruộng theo gió nhẹ đưa vào. Trong cửa hàng hơi tối, muỗi đã bắt đầu vo ve. Liên ngồi yên lặng bên mấy quả thuốc sơn đen; đôi mắt chị bóng tối ngập đầy dần và cái buồn của buổi chiều quê thấm thía vào tâm hồn ngây thơ của chị: Liên không hiểu sao, nhưng chị thấy lòng buồn man mác trước cái giờ khắc của ngày tàn.</p>

        <p>Chợ huyện đã vãn từ lâu. Người về hết và tiếng ồn ào cũng mất. Trên đất chỉ còn rác rưởi, vỏ bưởi, lá chuối và vài đứa trẻ con nhà nghèo cúi lom khom nhặt nhạnh những que nứa, thanh tre hay bất cứ thứ gì có thể dùng được. Mùi rác ẩm bốc lên, một mùi quen thuộc của đất đai quê hương mà Liên cảm nhận sâu sắc.</p>

        <h3 class="reader-chapter-title">Hồi II: Những Kiếp Người Tàn Tạ Trong Bóng Tối</h3>
        <p>Trời nhá nhem tối rồi sập tối hẳn. Bóng tối lan tràn từ những con đường mòn, ngõ hẹp cho đến căn nhà của Liên. Giữa bóng tối dày đặc ấy, chỉ có vài đốm sáng le lói: ngọn đèn dầu trên chõng hàng nước của mẹ con chị Tí, bếp lửa đỏ rực của bác phở Siêu bốc mùi khói thơm xa xỉ, tiếng đàn bầu run rẩy của gia đình bác xẩm mù ngồi trên manh chiếu rách, và bà cụ Thi điên lảo đảo uống cút rượu rồi cười khanh khách đi vào bóng đêm...</p>

        <p>Tất cả những kiếp người ấy ngày nào cũng vậy, lặp đi lặp lại trong đơn điệu và nghèo nàn. Họ sống mòn mỏi trong đêm tối mênh mông của phố huyện mà không biết ngày mai sẽ ra sao.</p>

        <h3 class="reader-chapter-title" id="sgk-chuyen-tau-dem">Hồi III: Chuyến Tàu Đêm & Thế Giới Ánh Sáng Vụt Qua</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Hai Đứa Trẻ • Cảnh đoàn tàu đêm</span>
          </div>
          <p class="sgk-notice-desc">Hình ảnh biểu tượng nghệ thuật đắt giá nhất của tác phẩm: Chuyến tàu đêm từ Hà Nội không chỉ là hoạt động giao thông, mà là biểu tượng của một thế giới rực rỡ, văn minh và khao khát vươn ra khỏi ao tù nước đọng.</p>
        </div>

        <p>Liên và em trai là An dù mắt đã díu lại vì buồn ngủ vẫn cố thức. Họ thức không phải vì đợi khách mua nốt phong thuốc lào hay bao diêm, mà vì muốn nhìn chuyến tàu đêm cuối cùng đi qua phố huyện.</p>

        <p>Từ đằng xa, tiếng còi xe lửa rít lên kéo dài theo gió. Rồi tiếng dồn dập của tiếng xe rầm rộ, tiếng bánh sắt nghiến trên đường ray. Ngọn đèn đầu tàu xanh biếc lướt qua như một ngôi sao bay. Tiếp đến các toa đèn sáng trưng, chiếu ánh sáng lấp lánh lên những chòm cây ven đường. Những toa hạng trên sang trọng, hành khách mặc đồ âu tây trắng muốt, cửa kính sáng loáng, tiếng cười nói huyên náo của một thế giới hoàn toàn khác...</p>

        <p>Đoàn tàu rầm rộ chạy qua rồi khuất dần sau rặng tre xa, chỉ để lại những làn than đỏ bay lơ lửng rồi tắt ngấm. Phố huyện lại chìm sâu vào bóng tối tĩnh mịch của màn đêm. Liên ngả đầu vào lòng An, khẽ nhắm mắt lại. Tâm hồn cô trôi theo những ký ức xa xôi về một Hà Nội sáng rực, huyên náo và êm đềm của thời thơ ấu...</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Hai Đứa Trẻ ]</span></div>
      `,
      criticism: "Thạch Lam không viết truyện bằng xung đột gay cấn, ông viết bằng thứ văn xuôi trữ tình đậm chất thơ. 'Hai Đứa Trẻ' là bản tụng ca xót xa về lòng nhân đạo và niềm tin hướng về ánh sáng của những tâm hồn bé nhỏ nơi góc khuất cuộc đời.",
      tags: ["Thạch Lam", "Hai Đứa Trẻ", "Tự Lực Văn Đoàn", "Trữ tình", "Toàn văn & SGK"]
    },
    {
      id: "doi-thua",
      title: "Đời Thừa",
      author: "Nam Cao",
      authorId: "nam-cao",
      category: "Truyện ngắn hiện thực tâm lý",
      era: "Hiện thực Phê phán",
      year: "1943",
      readTime: "15 phút đọc • Toàn văn tác phẩm",
      badge: "Bi Kịch Trí Thức",
      image: "assets/images/author_study.jpg",
      imageCaption: "Khắc gỗ Editorial: Nhà văn Hộ thức trắng đêm bên trang bản thảo dở dang dưới ngọn đèn dầu leo lét.",
      epigraph: "Văn chương không cần đến những người thợ khéo tay... Nghệ thuật không cần phải là ánh trăng lừa dối, nghệ thuật chỉ có thể là tiếng đau khổ kia thoát ra từ những kiếp lầm than.",
      excerpt: "Toàn văn kiệt tác của Nam Cao về bi kịch áo cơm ghì sát đất của người trí thức văn sĩ: cuộc giằng xé dữ dội giữa khát vọng sáng tạo đỉnh cao và gánh nặng cơm áo gạo tiền gia đình.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Tác phẩm được trích giảng dạy trong chương trình Ngữ Văn THPT với tuyên ngôn nghệ thuật văn chương nổi tiếng của nhân vật Hộ.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Ấn Bản Toàn Văn Tác Phẩm (Nam Cao - 1943)
          </span>
          <a href="#sgk-tuyen-ngon-van-chuong" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến tuyên ngôn văn chương SGK
          </a>
        </div>

        <h3 class="reader-chapter-title" id="sgk-tuyen-ngon-van-chuong">Hồi I: Hoài Bão Nghệ Thuật & Tuyên Ngôn Văn Chương</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Đời Thừa • Tuyên ngôn nghệ thuật</span>
          </div>
          <p class="sgk-notice-desc">Quan niệm nghệ thuật vị nhân sinh tiến bộ, sâu sắc của Nam Cao gửi gắm qua nhân vật nhà văn Hộ.</p>
        </div>

        <p>Hộ là một văn sĩ có tài và đầy nhiệt huyết. Thời trai trẻ, chàng từng nuôi hoài bão lớn lao: viết một tác phẩm vĩ đại vượt lên trên tất cả các giải thưởng, một tác phẩm chung cho cả loài người, làm cho người gần người hơn, ca ngợi tình thương và lòng bác ái.</p>

        <p>Hộ từng đĩnh đạc tuyên bố trước bạn bè:<br>
        — “Văn chương không cần đến những người thợ khéo tay làm theo một vài kiểu mẫu đưa cho. Văn chương chỉ dung nạp những người biết đào sâu, biết tìm tòi, khơi những nguồn chưa ai khơi và sáng tạo những cái gì chưa có... Một tác phẩm thật giá trị phải vượt lên trên tất cả các bờ cõi và giới hạn, phải là một tác phẩm chung cho cả loài người. Nó phải chứa đựng được một cái gì lớn lao, mạnh mẽ, vừa đau đớn, lại vừa phấn khởi. Nó ca tụng lòng thương, tình bác ái, sự công bình... Nó làm cho người gần người hơn.”</p>

        <h3 class="reader-chapter-title">Hồi II: Gánh Nặng Cơm Áo Ghì Sát Đất</h3>
        <p>Nhưng rồi Hộ gặp Từ. Từ bị người tình ruồng bỏ khi vừa sinh con, mẹ già đói lả. Hộ vì lòng thương người cao cả đã cưu mang Từ, nhận đứa bé làm con và cưới nàng làm vợ. Gia đình ngày càng đông con, gánh nặng cơm áo đè nặng lên vai chàng văn sĩ nghèo.</p>

        <p>Để có tiền mua sữa cho con, trả tiền nhà, thuốc men cho vợ, Hộ buộc phải viết nhanh, viết vội, cho ra đời những cuốn sách ba xu vô thưởng vô phạt. Mỗi lần cầm đồng nhuận bút rẻ mạt hay đọc lại những trang viết hời hợt của chính mình, Hộ lại tự sỉ nhục bản thân là kẻ cẩu thả, bất lương trong nghề nghiệp!</p>

        <h3 class="reader-chapter-title">Hồi III: Bi Kịch Tha Hóa & Giọt Nước Mắt Muộn Màng</h3>
        <p>Uất ức vì bế tắc nghệ thuật, Hộ tìm đến rượu. Những cơn say làm lu mờ nhân tính, chàng về nhà quát tháo, hành hạ Từ và xua đuổi mẹ con nàng ra khỏi nhà. Nhưng sáng hôm sau tỉnh dậy, Hộ nhìn thấy Từ vẫn ngồi bên giường, đôi mắt thâm quầng vì thức trắng đêm quạt mát cho chồng, bàn tay gầy guộc run rẩy dọn dẹp bát đĩa vỡ...</p>

        <p>Hộ nhìn vợ, lòng quặn thắt lại. Chàng quỳ sụp xuống, ôm chặt lấy chân Từ mà khóc nức nở như một đứa trẻ:<br>
        — Từ ơi! Anh là một thằng khốn nạn! Anh chỉ là một thằng khốn nạn thôi!</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Đời Thừa ]</span></div>
      `,
      criticism: "Đời Thừa là tấn bi kịch tinh thần đau đớn nhất của người trí thức tiểu tư sản: bi kịch của người có tài năng, có lương tâm nhưng bị gánh nặng cơm áo ghì sát đất, rơi vào bờ vực tha hóa và đánh mất chính mình.",
      tags: ["Nam Cao", "Đời Thừa", "Bi kịch trí thức", "Hiện thực", "Toàn văn & SGK"]
    },
    {
      id: "toi-di-hoc",
      title: "Tôi Đi Học",
      author: "Thanh Tịnh",
      authorId: "thanh-tinh",
      category: "Truyện ngắn tự sự trữ tình",
      era: "Văn học Hiện đại",
      year: "1941",
      readTime: "12 phút đọc • Toàn văn tác phẩm",
      badge: "Văn Học Đầu Đời",
      image: "assets/images/editorial_cover.jpg",
      imageCaption: "Khắc gỗ Editorial: Ký ức ngày tựu trường đầu đời thơm tho trang sách mới và con đường làng dài và hẹp.",
      epigraph: "Hằng năm cứ vào cuối thu, lá ngoài đường rụng nhiều và trên không có những đám mây bàng bạc, lòng tôi lại nao nức những kỷ niệm hoang mang của buổi tựu trường.",
      excerpt: "Toàn văn tác phẩm kinh điển trong sáng và xúc động bậc nhất của Thanh Tịnh. Ký ức bất hủ về buổi sáng mùa thu đầu tiên được mẹ âu yếm dắt tay đến trường làng Mỹ Lý.",
      fullTextStatus: "Toàn Văn Tác Phẩm",
      sgkDetail: "Toàn bộ thiên truyện ngắn 'Tôi Đi Học' được đưa trọn vẹn vào chương trình SGK Ngữ Văn, là áng văn mẫu mực về cảm xúc tuổi học trò.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm (Tập 'Quê Mẹ' - Thanh Tịnh)
          </span>
          <span style="color: var(--jasper-600); font-weight: 700;">
            100% Nội dung nằm trong SGK Ngữ Văn
          </span>
        </div>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Toàn Bộ Văn Bản Giảng Dạy Trong Sách Giáo Khoa
            </span>
            <span class="sgk-meta">Tác phẩm: Tôi Đi Học • Thanh Tịnh</span>
          </div>
          <p class="sgk-notice-desc">Áng văn giàu chất thơ tái hiện những rung động tinh khôi, bỡ ngỡ và thiêng liêng nhất của một đứa trẻ trong ngày đầu tiên cắp sách tới trường.</p>
        </div>

        <p>Hằng năm cứ vào cuối thu, lá ngoài đường rụng nhiều và trên không có những đám mây bàng bạc, lòng tôi lại nao nức những kỷ niệm hoang mang của buổi tựu trường.</p>

        <p>Tôi không thể nào quên được những cảm giác trong sáng ấy nảy nở trong lòng tôi như mấy cành hoa tươi mỉm cười giữa bầu trời quang đãng.</p>

        <p>Buổi sáng mai hôm ấy, một buổi mai đầy sương thu và gió lạnh. Mẹ tôi âu yếm nắm tay tôi dẫn đi trên con đường làng dài và hẹp. Con đường này tôi đã quen đi lại lắm lần, nhưng lần này tự nhiên tôi thấy lạ. Cảnh vật chung quanh tôi đều thay đổi, vì chính lòng tôi đang có sự thay đổi lớn: Hôm nay tôi đi học.</p>

        <p>Tôi không lội qua sông thả diều như thằng Quý và không đi ra đồng nô đùa như thằng Sơn nữa. Trong chiếc áo vải dù đen dài, tôi cảm thấy mình trang trọng và đứng đắn. Cầm hai quyển vở mới trên tay, tôi thấy nặng và có lúc muốn buông rơi, nhưng lòng lại kiêu hãnh khôn xiết khi thấy mình bắt đầu trở thành một người lớn.</p>

        <p>Trước sân trường làng Mỹ Lý, người đông nghịt. Ngôi trường hôm nay trông vừa xinh xắn vừa oai nghiêm lạ thường như một ngôi đình cổ kính. Khi hồi trống trường vang lên từng tiếng giòn giã, các cậu học trò nhỏ đứng nép bên người thân, tim đập rộn ràng. Ông đốc bước ra, gọi tên từng người. Đến lượt tên tôi, tôi giật mình và nép chặt vào tà áo mẹ, bàn tay mẹ khẽ đẩy tôi về phía trước...</p>

        <p>Giờ chia tay, tiếng khóc rấm rứt bắt đầu rộ lên của những đứa trẻ lần đầu rời xa bàn tay mẹ. Nhưng khi bước chân vào lớp học, nhìn hàng bàn ghế xinh xắn, ngắm con chim nhỏ hót ngoài cửa sổ, lòng tôi bỗng thấy ấm áp lạ kỳ. Thầy giáo trẻ mỉm cười đón chúng tôi, và tôi chăm chú nhìn lên bảng, nắn nót viết vào vở dòng chữ đầu đời: 'Tôi đi học'.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Tôi Đi Học ]</span></div>
      `,
      criticism: "Một khúc ca êm dịu về tuổi thơ và tình mẫu tử. Ngòi bút Thanh Tịnh thấm đượm chất thơ lãng mạn nhẹ nhàng, lưu giữ vẹn nguyên ký ức trong trẻo nhất của thời cắp sách.",
      tags: ["Thanh Tịnh", "Tôi Đi Học", "Tự sự", "Tuổi thơ", "Toàn văn & SGK"]
    },
    {
      id: "so-do",
      title: "Số Đỏ (Hạnh Phúc Của Một Tang Gia)",
      author: "Vũ Trọng Phụng",
      authorId: "vu-trong-phung",
      category: "Tiểu thuyết trào phúng",
      era: "Hiện thực Phê phán",
      year: "1936",
      readTime: "16 phút đọc • Toàn văn Chương XV",
      badge: "Đỉnh Cao Trào Phúng",
      image: "assets/images/so_do.jpg",
      imageCaption: "Tranh trào phúng: Đoàn rước ma rực rỡ và lố lăng của gia đình cụ cố Hồng trong trào lưu Âu hóa nửa mùa.",
      epigraph: "Hạnh phúc của một tang gia — Một đám ma to tát gương mẫu làm huyên náo cả một thành phố.",
      excerpt: "Toàn văn Chương XV kiệt tác tiểu thuyết 'Số Đỏ'. Bức tranh biếm họa xã hội thượng lưu tư sản Hà thành thập niên 1930 dưới ngòi bút sắc lạnh của Vũ Trọng Phụng.",
      fullTextStatus: "Toàn Văn Chương XV & Bối Cảnh",
      sgkDetail: "Chương XV 'Hạnh phúc của một tang gia' được đưa toàn vẹn vào chương trình Ngữ Văn 11, là văn bản mẫu mực phân tích nghệ thuật trào phúng đỉnh cao.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Chương XV (Trích Số Đỏ - Vũ Trọng Phụng)
          </span>
          <a href="#sgk-dam-ma-guong-mau" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh đám ma gương mẫu
          </a>
        </div>

        <h3 class="reader-chapter-title">Bối Cảnh: Xuân Tóc Đỏ & Xã Hội Âu Hóa Nửa Mùa</h3>
        <p>Số Đỏ là thiên trường thiên trào phúng kể về hành trình thăng tiến dị hợm của Xuân Tóc Đỏ—từ một kẻ nhặt banh sân quần, thổi loa kẹo cao su trở thành 'tiến sĩ', bậc cứu quốc anh hùng của xã hội thượng lưu tư sản Hà Nội thời thực dân phong kiến. Đến Chương XV, khi cụ Cố tổ vì nghe câu nói hớ hênh của Xuân Tóc Đỏ về chuyện con gái mình mà uất ức qua đời, tấn đại hài kịch chính thức bùng nổ.</p>

        <div class="sgk-notice-box" id="sgk-dam-ma-guong-mau">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Toàn Văn Đoạn Trích Sách Giáo Khoa (SGK Ngữ Văn 11)
            </span>
            <span class="sgk-meta">Văn bản: Hạnh phúc của một tang gia (Chương XV)</span>
          </div>
          <p class="sgk-notice-desc">Toàn bộ văn bản Chương XV được giảng dạy trong chương trình SGK nhằm phân tích tiếng cười châm biếm sâu cay và màn kịch đại vô phúc biến thành đại hạnh phúc.</p>
        </div>

        <p>Ba hôm sau, ông cụ già chết thật. Cái chết của ông cụ làm cho nhiều người sung sướng lắm. Con cháu đứa nào cũng nở từng khúc ruột vì cái chúc thư kia rốt cuộc đã vào thời kỳ thực hành chứ không còn là lý thuyết viển vông nữa.</p>

        <p>Người ta tưng bừng đi đưa ma. Tang gia ai cũng vui vẻ cả, chỉ có điều họ phải làm ra vẻ mặt đau đớn cho đúng lễ nghi. Ông cụ Hồng nhắm nghiền mắt lại để mơ màng đến cái lúc cụ mặc đồ xô gai, lụ khụ chống gậy, vừa ho khạc vừa khóc mếu, để cho thiên hạ phải chỉ trỏ: 'Kìa, con hiếu đã già đến thế kia kìa!'. Cậu Văn Minh thì mừng rỡ vì cái chúc thư sẽ đem lại cho mình cả nghìn đồng bạc, lại có dịp quảng cáo miễn phí các kiểu trang phục tang lễ tân thời của tiệm may Âu Hóa. Bà Văn Minh sốt ruột vì những bộ đồ xô gai cách tân xẻ nách chưa kịp may xong. Cô Tuyết thì nhân dịp mặc bộ đồ 'Ngây thơ' nửa kín nửa hở để chứng minh với đời rằng mình chưa hoàn toàn mất trinh!</p>

        <p>Đám ma đưa đến đâu làm huyên náo đến đấy. Điệp khúc kèn Ta, kèn Tây, kèn Tàu thi nhau thổi rầm rĩ. Hàng trăm người đi đưa ma thì thi nhau chim chuột, cười tình với nhau, bình phẩm nhau về áo quần, làn da, bộ ngực và cặp đùi hở hang của các giai nhân theo mốt mới. Thật là một đám ma gương mẫu, văn minh tột bậc!</p>

        <p>Đến huyệt, cậu Tú Tân bắt từng người phải tạo dáng bên miệng hố để chụp ảnh kỷ niệm. Ông cụ Hồng chống gậy ho khúc khắc cho thiên hạ trông thấy. Ông Phán mọc sừng ôm mặt khóc 'Hứt!... Hứt!... Hứt!...', thân hình giật nẩy lên và bí mật dúi vào tay Xuân Tóc Đỏ một tờ giấy bạc năm đồng gấp tư... Đó là món tiền đền ơn vì Xuân đã vô tình gắn lên đầu ông cặp sừng hươu quý giá đem lại món gia tài kếch xù!</p>
        <div class="sgk-end-marker"><span>[ Hết toàn văn Chương XV Số Đỏ ]</span></div>
      `,
      criticism: "Vũ Trọng Phụng đã dựng nên một màn đại hài kịch xã hội lột trần tận cùng sự giả dối, tha hóa đạo đức của giai cấp tư sản thành thị Việt Nam thời kỳ thực dân Âu hóa.",
      tags: ["Số Đỏ", "Vũ Trọng Phụng", "Trào phúng", "Toàn văn & SGK"]
    },
    {
      id: "voi-vang",
      title: "Vội Vàng",
      author: "Xuân Diệu",
      authorId: "xuan-dieu",
      category: "Thơ ca cách mạng thẩm mỹ",
      era: "Phong trào Thơ Mới",
      year: "1938",
      readTime: "6 phút đọc • Toàn văn 45 câu thơ",
      badge: "Hoàng Tử Thơ Tình",
      image: "assets/images/voi_vang.jpg",
      imageCaption: "Khắc gỗ Editorial: Thi sĩ Thơ Mới say đắm giang tay ôm trọn khu vườn xuân rực rỡ ánh sáng và hương sắc trần gian.",
      epigraph: "Thà một phút huy hoàng rồi chợt tối / Còn hơn buồn le lói suốt trăm năm.",
      excerpt: "Toàn văn nguyên tác trọn vẹn 45 câu thơ của thi phẩm 'Vội Vàng'. Bản tuyên ngôn thẩm mỹ cách mạng về tình yêu, tuổi trẻ và sự sống trần thế của Xuân Diệu.",
      fullTextStatus: "Toàn Văn Nguyên Tác 45 Câu",
      sgkDetail: "Toàn bộ 100% bài thơ 'Vội Vàng' được đưa vào chương trình chính khóa Ngữ Văn 11, không cắt xén bất kỳ khổ thơ nào.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Nguyên Tác Trọn Vẹn 45 Câu Thơ
          </span>
          <span style="color: var(--jasper-600); font-weight: 700;">
            100% Nội dung nằm trong SGK Ngữ Văn 11
          </span>
        </div>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Toàn Bộ Văn Bản Giảng Dạy Trong SGK Ngữ Văn 11
            </span>
            <span class="sgk-meta">Tác phẩm: Vội Vàng (Tập Thơ Thơ - 1938)</span>
          </div>
          <p class="sgk-notice-desc">Toàn bộ 45 câu thơ dưới đây được giảng dạy nguyên vẹn, chia làm 3 tầng bậc cảm xúc: Khát vọng đoạt quyền tạo hóa, Triết lý thời gian tuyến tính và Tuyên ngôn sống tận hiến.</p>
        </div>

        <h3 class="reader-chapter-title">Khúc I: Khát Vọng Đoạt Quyền Tạo Hóa & Thiên Đường Mặt Đất</h3>
        <p>Tôi muốn tắt nắng đi<br>
        Cho màu đừng nhạt mất;<br>
        Tôi muốn buộc gió lại<br>
        Cho hương đừng bay đi.</p>

        <p>Của ong bướm này đây tuần tháng mật;<br>
        Này đây hoa của đồng nội xanh rì;<br>
        Này đây lá của cành tơ phơ phất;<br>
        Của yến anh này đây khúc tình si;<br>
        Và này đây ánh sáng chớp hàng mi,<br>
        Mỗi buổi sớm thần Vui hằng gõ cửa;<br>
        Tháng giêng ngon như một cặp môi gần;</p>

        <h3 class="reader-chapter-title">Khúc II: Nỗi Hoài Xuân & Bi Kịch Hữu Hạn Của Đời Người</h3>
        <p>Tôi sung sướng. Nhưng vội vàng một nửa:<br>
        Tôi không chờ nắng hạ mới hoài xuân.<br>
        Xuân đang tới, nghĩa là xuân đang qua,<br>
        Xuân còn non, nghĩa là xuân sẽ già,<br>
        Mà xuân hết, nghĩa là tôi cũng mất.<br>
        Lòng tôi rộng, nhưng lượng trời cứ chật,<br>
        Không cho dài thời trẻ của nhân gian,<br>
        Nói làm chi rằng xuân vẫn tuần hoàn,<br>
        Nếu tuổi trẻ chẳng hai lần thắm lại!<br>
        Còn trời đất, nhưng chẳng còn tôi mãi,<br>
        Nên bâng khuâng tôi tiếc cả đất trời;<br>
        Mùi tháng năm đều rớm vị chia phôi,<br>
        Khắp sông núi vẫn than thầm tiễn biệt...<br>
        Cơn gió xinh thì thào trong lá biếc,<br>
        Phải chăng hờn vì nỗi phải bay đi?<br>
        Chim rộn ràng bỗng đứt tiếng reo thi,<br>
        Phải chăng sợ độ phai tàn sắp sửa?<br>
        Chẳng bao giờ, ôi! Chẳng bao giờ nữa...</p>

        <h3 class="reader-chapter-title">Khúc III: Tuyên Ngôn Sống Tận Hiến & Giao Cảm Cuống Quýt</h3>
        <p>Mau đi thôi! Mùa chưa ngả chiều hôm,<br>
        Ta muốn ôm<br>
        Cả sự sống mới bắt đầu mơn mởn;<br>
        Ta muốn riết mây đưa và gió lượn,<br>
        Ta muốn say cánh bướm với tình yêu,<br>
        Ta muốn thâu trong một cái hôn nhiều<br>
        Và non nước, và cây, và cỏ rạng,<br>
        Cho chếnh choáng mùi thơm, cho đã đầy ánh sáng,<br>
        Cho no nê thanh sắc của thời tươi;<br>
        — Hỡi xuân hồng, ta muốn cắn vào ngươi!</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Vội Vàng ]</span></div>
      `,
      criticism: "Vội Vàng là tiếng reo ca cuống quýt của cái Tôi Thơ Mới say đắm trước cõi trần gian. Một bước chuyển vĩ đại: thi sĩ phương Tây hóa thi ca Việt Nam bằng cách lấy vẻ đẹp con người trẻ tuổi làm thước đo thẩm mỹ tối cao của vũ trụ.",
      tags: ["Xuân Diệu", "Thơ Mới", "Vội Vàng", "Tình yêu", "Toàn văn & SGK"]
    },
    {
      id: "trang-giang",
      title: "Tràng Giang",
      author: "Huy Cận",
      authorId: "huy-can",
      category: "Thơ ca cổ điển hiện đại",
      era: "Phong trào Thơ Mới",
      year: "1940",
      readTime: "5 phút đọc • Toàn văn tác phẩm",
      badge: "Hồn Thơ Đất Nước",
      image: "assets/images/trang_giang.jpg",
      imageCaption: "Khắc gỗ Editorial: Con thuyền xuôi mái cô liêu giữa dòng tràng giang sông dài trời rộng, sầu vạn cổ.",
      epigraph: "Bâng khuâng trời rộng nhớ sông dài.",
      excerpt: "Toàn văn 4 khổ thơ kiệt tác cùng lời đề từ trong tập 'Lửa thiêng' của Huy Cận. Sự hòa quyện tuyệt bích giữa thi pháp Đường thi cổ kính và nỗi sầu nhân thế hiện đại.",
      fullTextStatus: "Toàn Văn Nguyên Tác 4 Khổ",
      sgkDetail: "Toàn văn 100% bài thơ 'Tràng Giang' được giảng dạy trọn vẹn trong chương trình Ngữ Văn 11 THPT.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Nguyên Tác (Tập Lửa Thiêng - 1940)
          </span>
          <span style="color: var(--jasper-600); font-weight: 700;">
            100% Nội dung nằm trong SGK Ngữ Văn 11
          </span>
        </div>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Toàn Bộ Văn Bản Giảng Dạy Trong SGK Ngữ Văn 11
            </span>
            <span class="sgk-meta">Tác phẩm: Tràng Giang (Huy Cận)</span>
          </div>
          <p class="sgk-notice-desc">Bài thơ mẫu mực về vẻ đẹp cổ điển kết hợp tinh thần Thơ Mới: nỗi cô đơn rợn ngợp của cái Tôi trước không gian vũ trụ và tình yêu quê hương đất nước thầm kín.</p>
        </div>

        <p style="text-align: center; font-style: italic; font-weight: 600; color: var(--cerulean-800); margin-bottom: 2rem;">
          Đề từ: Bâng khuâng trời rộng nhớ sông dài.
        </p>

        <p>Sóng gợn tràng giang buồn điệp điệp,<br>
        Con thuyền xuôi mái nước song song.<br>
        Thuyền về nước lại, sầu trăm ngả;<br>
        Củi một cành khô lạc mấy dòng.</p>

        <p>Lơ thơ cồn nhỏ gió đìu hiu,<br>
        Đâu tiếng làng xa vãn chợ chiều.<br>
        Nắng xuống, trời lên sâu chót vót;<br>
        Sông dài, trời rộng, bến cô liêu.</p>

        <p>Bèo dạt về đâu, hàng nối hàng;<br>
        Mênh mông không một chuyến đò ngang.<br>
        Không cầu gợi chút niềm thân mật,<br>
        Lặng lẽ bờ xanh tiếp bãi vàng.</p>

        <p>Lớp lớp mây cao đùn núi bạc,<span class="footnote-ref" data-note="đùn núi bạc: liên tưởng thi ảnh Đỗ Phủ trong Thu Hứng: 'Mặt đất mây đùn cửa ải xa'.">*1</span><br>
        Chim nghiêng cánh nhỏ: bóng chiều sa.<br>
        Lòng quê dợn dợn vời con nước,<br>
        Không khói hoàng hôn cũng nhớ nhà.<span class="footnote-ref" data-note="Không khói hoàng hôn cũng nhớ nhà: ý thơ vượt lên Thôi Hiệu trong Hoàng Hạc Lâu: 'Yên ba giang thượng sử nhân sầu'.">*2</span></p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Tràng Giang ]</span></div>
      `,
      criticism: "Tràng Giang mở ra một không gian vũ trụ bát ngát và nỗi sầu vạn cổ. Không cần khói hoàng hôn của Thôi Hiệu, nhà thơ vẫn da diết nhớ nhà—một nỗi nhớ nước non thầm kín của thế hệ thanh niên mất nước.",
      tags: ["Huy Cận", "Thơ Mới", "Tràng Giang", "Cổ điển", "Toàn văn & SGK"]
    },
    {
      id: "bien-than",
      title: "Biến Thân (Die Verwandlung)",
      author: "Franz Kafka",
      authorId: "franz-kafka",
      category: "Tiểu thuyết ngắn kinh điển",
      era: "Chủ nghĩa Hiện sinh & Phi lý",
      year: "1915",
      readTime: "16 phút đọc • Toàn văn Chương I",
      badge: "Văn Học Thế Giới",
      image: "assets/images/kafka.jpg",
      imageCaption: "Minh họa Editorial: Căn phòng cổ kính ở Praha nơi Gregor Samsa thức giấc trong hình hài loài bọ khổng lồ.",
      epigraph: "Nỗi cô đơn tuyệt đối của con người trong guồng máy xã hội hiện đại cơ giới hóa.",
      excerpt: "Toàn văn Chương I kiệt tác của Franz Kafka. Câu chuyện kinh hoàng về Gregor Samsa thức dậy biến thành con bọ khổng lồ và bi kịch bị tha hóa, chối bỏ tàn nhẫn bởi chính gia đình.",
      fullTextStatus: "Toàn Văn Chương I & Tóm Lược Sử Thi",
      sgkDetail: "Chương I của 'Biến Thân' là phần trọng tâm được đưa vào chương trình Đọc hiểu Văn học Phương Tây / Ngữ Văn THPT nâng cao và Đại học.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Chương I (Bản dịch kinh điển từ nguyên tác tiếng Đức)
          </span>
          <span style="color: var(--jasper-600); font-weight: 700;">
            Văn bản giảng dạy SGK & Giảng đường Đại học
          </span>
        </div>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Văn Học Thế Giới (SGK THPT & Đại Học)
            </span>
            <span class="sgk-meta">Tác giả: Franz Kafka • Chương I: Buổi sáng biến thân</span>
          </div>
          <p class="sgk-notice-desc">Chương mở đầu đặt nền móng cho chủ nghĩa phi lý: Sự biến dạng thể xác phơi bày bản chất lạnh lùng vụ lợi của các mối quan hệ xã hội tư bản cơ giới hóa.</p>
        </div>

        <h3 class="reader-chapter-title">Chương I: Sự Biến Đổi & Buổi Sáng Định Mệnh</h3>
        <p>Một buổi sáng thức dậy sau những giấc mộng trăn trở, Gregor Samsa thấy mình nằm trên giường đã biến thành một con côn trùng khổng lồ. Lưng chàng cứng như bọc giáp sắt, và khi chàng ngẩng đầu lên một chút, chàng nhìn thấy cái bụng màu nâu của mình cong lên, chia thành nhiều khoang hình cung, lớp chăn đắp phía trên chỉ chực trượt tuột xuống sàn. Vô số những chiếc chân mảnh khảnh run rẩy một cách bất lực trước mắt chàng.</p>

        <p>— 'Chuyện gì đã xảy ra với mình thế này?' chàng tự nhủ. Đó không phải là một giấc mơ. Căn phòng của chàng, một căn phòng thích hợp cho con người dù hơi nhỏ, vẫn yên lặng nằm giữa bốn bức tường quen thuộc. Phía trên chiếc bàn ngổn ngang những mẫu vải chào hàng, có treo một bức tranh chàng vừa cắt ra từ một tờ tạp chí minh họa gần đây, đóng trong chiếc khung mạ vàng xinh xắn.</p>

        <p>Gregor nhìn về phía cửa sổ. Bầu trời âm u, tiếng những hạt mưa lộp độp rơi trên bệ kim loại làm chàng thấy buồn vô hạn. Chàng toan nhắm mắt ngủ tiếp để quên đi sự hoang đường này, nhưng cơ thể chàng chỉ quen nằm nghiêng bên phải mà cái lưng mai cứng ngắc lại cứ hất chàng ngửa ra. Chàng đã thử cả trăm lần cho đến khi bên sườn bắt đầu nhói đau âm ỉ.</p>

        <p>Điều trớ trêu và nhức nhối nhất là chàng không hề nghĩ đến việc gọi cấp cứu, mà tâm trí chàng chỉ ngập tràn nỗi lo về công việc: chiếc đồng hồ báo thức trên bàn con đã điểm 6 giờ rưỡi, rồi 7 giờ kém mười lăm. Chuyến tàu 5 giờ sáng chàng đã nhỡ, chuyến tàu 7 giờ cũng sắp tuột mất. Ông chủ hãng buôn khắt khe chắc chắn sẽ nghi ngờ chàng lười biếng và cho người đến tận nhà đòi nợ!</p>

        <p>Tiếng gõ cửa vang lên. Đầu tiên là mẹ chàng dịu dàng nhắc nhở: 'Gregor, con không định đi làm sao?'. Tiếp theo là tiếng cha chàng đập cửa gắt gỏng, và tiếng người em gái Grete thì thầm qua then cửa: 'Anh Gregor, anh mở cửa đi!'. Nhưng giọng chàng phát ra giờ đây đã biến thành một chuỗi âm thanh the the, rít lên nghẹn ngào của loài côn trùng.</p>

        <p>Khi viên quản lý chi nhánh của công ty đích thân xuất hiện để tra khảo, Gregor đã phải dùng hết sức bình sinh, dùng chiếc mồm không có răng ghì chặt lấy chìa khóa và từ từ xoay chốt cửa. Khi cánh cửa mở toang, cảnh tượng hiện ra làm viên quản lý hét lên một tiếng kinh hoàng rồi lùi dần ra hành lang, mẹ chàng ngã quỵ xuống đất, còn người cha nắm chặt lấy cây gậy ba-toong và tờ nhật báo, xua đuổi chàng một cách hung bạo trở lại buồng ngủ, làm thân thể chàng va đập vào khung cửa tóe máu...</p>

        <h3 class="reader-chapter-title">Tóm Lược Diễn Biến Chương II & III</h3>
        <p>Trong Chương II và III, Gregor bị giam cầm trong căn phòng bẩn thỉu. Gia đình từ chỗ lo lắng dần chuyển sang coi chàng là gánh nặng sỉ nhục. Em gái Grete—người từng yêu thương chàng nhất—rốt cuộc cũng thốt lên lời tuyên án: 'Chúng ta phải tống khứ cái thứ này đi!'. Gregor kiệt sức qua đời trong đêm tối quạnh quẽ. Sáng hôm sau, gia đình Samsa thở phào nhẹ nhõm như vừa trút được một lời nguyền rủa, và họ bắt đầu một chuyến dạo chơi tươi sáng về vùng ngoại ô.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn Chương I & Diễn biến tác phẩm ]</span></div>
      `,
      criticism: "Kafka phơi bày bi kịch tha hóa tột bậc của con người trong xã hội hiện đại: Khi con người không còn khả năng kiếm tiền và tạo ra giá trị kinh tế, họ ngay lập tức bị tước đoạt tư cách làm người và bị chính người thân chối bỏ.",
      tags: ["Franz Kafka", "Hiện sinh", "Phi lý", "Biến thân", "Toàn văn & SGK"]
    },
    {
      id: "tram-nam-co-don",
      title: "Trăm Năm Cô Đơn (Cien años de soledad)",
      author: "Gabriel García Márquez",
      authorId: "gabriel-garcia-marquez",
      category: "Tiểu thuyết trường thiên huyền ảo",
      era: "Chủ nghĩa Hiện thực Huyền ảo",
      year: "1967",
      readTime: "16 phút đọc • Toàn văn Chương I Macondo",
      badge: "Nobel Văn Học",
      image: "assets/images/macondo.jpg",
      imageCaption: "Khắc gỗ Editorial: Melquíades cùng hai thỏi nam châm khổng lồ bên bờ sông đá trắng làng Macondo thời tiền sử.",
      epigraph: "Những dòng họ bị kết án một trăm năm cô đơn sẽ không có cơ hội thứ hai trên mặt đất.",
      excerpt: "Toàn văn Chương I kiệt tác mở ra thế giới huyền ảo Macondo của Gabriel García Márquez: câu mở đầu huyền thoại, phát minh nam châm của người Gypsy và cội nguồn bi kịch một trăm năm.",
      fullTextStatus: "Toàn Văn Chương I Mở Đầu Sử Thi",
      sgkDetail: "Đoạn văn mở đầu Chương I miêu tả sự sơ khai của làng Macondo và người Di-gan Melquíades được trích giảng dạy trong chương trình SGK Ngữ Văn 12.",
      content: `
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Chương I (Nguyên tác tiếng Tây Ban Nha)
          </span>
          <span style="color: var(--jasper-600); font-weight: 700;">
            Đoạn Trích Trọng Tâm SGK Ngữ Văn 12
          </span>
        </div>

        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Tác giả: G. G. Márquez • Đoạn mở đầu: Sự khai sinh làng Macondo</span>
          </div>
          <p class="sgk-notice-desc">Đoạn văn kinh điển tiêu biểu cho phong cách Hiện thực huyền ảo: Thời gian đồng hiện, đan cài huyền thoại và hiện thực lịch sử bi tráng của lục địa Mỹ Latinh.</p>
        </div>

        <h3 class="reader-chapter-title">Chương I: Sự Sơ Khai Của Macondo & Phép Lạ Người Di-Gan</h3>
        <p>Rất nhiều năm sau này, trước đội hành quyết, đại tá Aureliano Buendía sẽ nhớ lại buổi chiều xa xưa ấy, khi cha chàng đưa chàng đi xem nước đá. Khi ấy, Macondo là một ngôi làng có hai mươi nóc nhà bằng đất và sậy dựng bên bờ một con sông nước trong veo chảy qua những hòn đá nhẵn thín, trắng và to như những quả trứng tiền sử. Thế giới thuở ấy còn sơ khai đến mức nhiều thứ còn chưa có tên gọi, và muốn chỉ chúng, người ta phải trỏ tay vào.</p>

        <p>Hàng năm vào tháng Ba, một gia đình người Di-gan rách rưới lại dựng lều gần làng và làm náo động cả vùng bằng những phát minh mới mẻ. Trước tiên họ đem đến hòn đá nam châm. Một người Di-gan béo tốt tên là Melquíades, râu quai nón rậm rạp và bàn tay như chim ưng, tự xưng là nắm giữ chìa khóa của thuật giả kim Nostradamus, đã làm một màn trình diễn kinh hoàng về cái mà ông ta gọi là kỳ quan thứ tám của các nhà thông thái xứ Macedonia.</p>

        <p>Ông ta kéo lê hai thỏi sắt lớn đi khắp các nhà trong làng, làm cho xoong nồi, ấm chén, đinh ốc bay tứ tung, và những tấm gỗ kẽo kẹt rên rỉ như muốn tuột khỏi tường khi những cây đinh rỉ bị hút ra ngoài. 'Vạn vật đều có linh hồn,' người Di-gan gào lên với giọng khàn đặc, 'vấn đề chỉ là đánh thức linh hồn chúng dậy mà thôi!'.</p>

        <p>José Arcadio Buendía, người sáng lập làng với trí tưởng tượng vô bờ bến, lập tức bán cả đàn la của vợ là Úrsula Iguarán để đổi lấy hai thỏi nam châm với ý nghĩ đào vàng dưới lòng đất. Nhưng ông chỉ đào lên được một cỗ áo giáp sắt từ thế kỷ mười lăm có chứa một bộ xương người khô khốc mang chiếc mề đay đựng mớ tóc phụ nữ.</p>

        <p>Năm sau, những người Di-gan quay lại với một chiếc kính viễn vọng và kính lúp khổng lồ to bằng cái trống cái. José Arcadio Buendía lại dùng nó để nghiên cứu vũ khí chiến tranh đốt cháy lều của đối phương dưới ánh mặt trời nhiệt đới, cho đến khi tự thiêu đốt bỏng rát chính da thịt mình. Dù vợ ông tuyệt vọng can ngăn, ông vẫn cắm cúi nghiên cứu bản đồ thiên văn và rốt cuộc đưa ra một kết luận chấn động làm cả làng kinh hãi: 'Trái Đất tròn như một quả cam!'.</p>

        <h3 class="reader-chapter-title">Khái Quát Sử Thi Bảy Thế Hệ Gia Tộc Buendía</h3>
        <p>Từ ngôi làng Macondo cô lập ấy, Márquez đã dẫn dắt bạn đọc qua bảy thế hệ đầy biến động của dòng họ Buendía: những cuộc nội chiến triền miên ba mươi hai lần thất bại của đại tá Aureliano, đại dịch mất trí nhớ, trận mưa bão kéo dài bốn năm mười một tháng hai ngày, vụ thảm sát ba nghìn công nhân đồn điền chuối bị xóa sạch dấu vết trong sử sách, cho đến khi đứa trẻ cuối cùng sinh ra với chiếc đuôi lợn bị đàn kiến ăn thịt, ứng nghiệm với lời sấm truyền trong bản thảo chữ Phạn của Melquíades: 'Những dòng họ bị kết án một trăm năm cô đơn sẽ không có cơ hội thứ hai trên mặt đất'.</p>
        <div class="sgk-end-marker"><span>[ Hết toàn văn Chương I & Tổng quan kiệt tác ]</span></div>
      `,
      criticism: "Đỉnh cao tuyệt đối của văn học Mỹ Latinh. Trăm Năm Cô Đơn không chỉ là câu chuyện của Macondo hay dòng họ Buendía, mà là ẩn dụ vĩ đại cho nỗi cô đơn, sự chia rẽ và bi kịch lịch sử của cả một lục địa và nhân loại.",
      tags: ["Gabriel García Márquez", "Nobel Văn Học", "Hiện thực huyền ảo", "Macondo", "Toàn văn & SGK"]
    }
  ],

  // --- CHÂN DUNG TÁC GIẢ TIÊU BIỂU ---
  authors: [
    {
      id: "nguyen-du",
      name: "Nguyễn Du",
      alias: "Tố Như, Thanh Hiên",
      years: "1765 – 1820",
      era: "Văn học Trung đại",
      avatarInitials: "ND",
      bio: "Đại thi hào dân tộc, Danh nhân văn hóa thế giới. Bậc thầy ngôn ngữ thơ ca lục bát tiếng Việt với tấm lòng nhân đạo bao la, thấu suốt 'những điều trông thấy mà đau đớn lòng'.",
      masterpieces: "Truyện Kiều, Đoạn Trường Tân Thanh, Văn Tế Thập Loại Chúng Sinh, Bắc Hành Tạp Lục."
    },
    {
      id: "nam-cao",
      name: "Nam Cao",
      alias: "Trần Hữu Tri",
      years: "1915 – 1951",
      era: "Hiện thực Phê phán",
      avatarInitials: "NC",
      bio: "Cây bút hiện thực tâm lý kiệt xuất bậc nhất văn học Việt Nam thế kỷ 20. Trăn trở suốt đời về bi kịch tha hóa, xói mòn nhân phẩm và khát vọng sống có ý nghĩa của người tri thức nghèo và nông dân cùng khổ.",
      masterpieces: "Chí Phèo, Lão Hạc, Đời Thừa, Sống Mòn, Trăng Sáng."
    },
    {
      id: "thach-lam",
      name: "Thạch Lam",
      alias: "Nguyễn Tường Vinh",
      years: "1910 – 1942",
      era: "Văn học Lãng mạn (Tự Lực Văn Đoàn)",
      avatarInitials: "TL",
      bio: "Cây bút tài hoa, nhân hậu bậc nhất nhóm Tự Lực Văn Đoàn. Văn chương Thạch Lam nhẹ nhàng, giàu chất thơ, đi sâu vào thế giới nội tâm tinh tế và nỗi niềm của những số phận nhỏ bé.",
      masterpieces: "Hai Đứa Trẻ, Gió Đầu Mùa, Nắng Trong Vườn, Hà Nội 36 Phố Phường."
    },
    {
      id: "thanh-tinh",
      name: "Thanh Tịnh",
      alias: "Trần Văn Ninh",
      years: "1911 – 1988",
      era: "Văn học Hiện đại",
      avatarInitials: "TT",
      bio: "Nhà văn xứ Huế với giọng văn trong trẻo, êm dịu và đượm chất thơ lãng mạn. Tác phẩm của ông ghi dấu ấn sâu đậm trong lòng nhiều thế hệ bạn đọc Việt Nam.",
      masterpieces: "Tôi Đi Học, Quê Mẹ, Ngậm Ngải Tìm Trầm."
    },
    {
      id: "vu-trong-phung",
      name: "Vũ Trọng Phụng",
      alias: "Vua phóng sự đất Bắc",
      years: "1912 – 1939",
      era: "Hiện thực Phê phán",
      avatarInitials: "VP",
      bio: "Thiên tài yểu mệnh của văn xuôi trào phúng Việt Nam. Với ngòi bút sắc lạnh, dữ dội, ông phơi bày sự tha hóa đến ghê tởm của xã hội thực dân nửa phong kiến thời kỳ Âu hóa.",
      masterpieces: "Số Đỏ, Giông Tố, Vỡ Đê, Cơm Thầy Cơm Cô, Cạm Bẫy Người."
    },
    {
      id: "xuan-dieu",
      name: "Xuân Diệu",
      alias: "Trảo Nha",
      years: "1916 – 1985",
      era: "Phong trào Thơ Mới",
      avatarInitials: "XD",
      bio: "Nhà thơ 'mới nhất trong các nhà thơ mới', người đã mang đến cho thi ca Việt Nam nguồn cảm xúc nồng nàn, đắm say chưa từng thấy về tuổi trẻ, tình yêu và sự sống trần thế.",
      masterpieces: "Thơ Thơ, Gửi Hương Cho Gió, Phấn Thông Vàng."
    },
    {
      id: "nguyen-tuan",
      name: "Nguyễn Tuân",
      alias: "Thanh Hà, Nhất Chi Mai",
      years: "1910 – 1987",
      era: "Văn học Lãng mạn & Tùy bút",
      avatarInitials: "NT",
      bio: "Định nghĩa cho sự tài hoa và uyên bác trong văn xuôi tiếng Việt. Một người suốt đời đi tìm cái Đẹp và tôn vinh những giá trị văn hóa cổ truyền thanh tao.",
      masterpieces: "Vang Bóng Một Thời, Sông Đà, Chiếc Lư Đồng Mắt Cua, Hà Nội Ta Đánh Mỹ Giỏi."
    },
    {
      id: "huy-can",
      name: "Huy Cận",
      alias: "Cù Huy Cận",
      years: "1919 – 2005",
      era: "Phong trào Thơ Mới",
      avatarInitials: "HC",
      bio: "Nhà thơ mang nỗi sầu vũ trụ và không gian Đường thi cổ kính. Thơ ông là sự hòa điệu kỳ diệu giữa cảm thức không gian vô tận và nỗi niềm tha thiết với non sông đất nước.",
      masterpieces: "Lửa Thiêng, Vũ Trụ Ca, Trời Mỗi Ngày Lại Sáng."
    },
    {
      id: "franz-kafka",
      name: "Franz Kafka",
      alias: "Nhà văn Praha",
      years: "1883 – 1924",
      era: "Hiện sinh & Phi lý phương Tây",
      avatarInitials: "FK",
      bio: "Một trong những tác giả có ảnh hưởng sâu rộng nhất thế kỷ 20. Bằng bút pháp kỳ dị và ám ảnh, Kafka nắm bắt nỗi âu lo hiện sinh và sự lưu đày nội tâm của con người hiện đại.",
      masterpieces: "Biến Thân (The Metamorphosis), Vụ Án (The Trial), Lâu Đài (The Castle)."
    },
    {
      id: "gabriel-garcia-marquez",
      name: "Gabriel García Márquez",
      alias: "Gabo",
      years: "1927 – 2014",
      era: "Chủ nghĩa Hiện thực Huyền ảo",
      avatarInitials: "GM",
      bio: "Đại văn hào Colombia, giải Nobel Văn học 1982. Ông đã tạo dựng nên Macondo—tấm gương phản chiếu số phận bi hùng, rực rỡ và cô đơn của cả lục địa Mỹ Latinh.",
      masterpieces: "Trăm Năm Cô Đơn, Tình Yêu Thời Rực Lửa, Mùa Thu Của Vị Trưởng Lão."
    }
  ],

  // --- CÁC TRƯỜNG PHÁI & THỜI KỲ VĂN HỌC ---
  movements: [
    {
      name: "Văn Học Trung Đại Việt Nam",
      period: "Thế kỷ X – Hết thế kỷ XIX",
      theme: "cerulean",
      desc: "Nền tảng văn học chữ Hán và chữ Nôm với cảm hứng yêu nước, tinh thần tự tôn dân tộc và chủ nghĩa nhân đạo sâu sắc. Thi pháp ước lệ, quy phạm nhưng kết tinh rực rỡ qua thơ lục bát và song thất lục bát.",
      reps: ["Nguyễn Trãi", "Nguyễn Du", "Hồ Xuân Hương", "Đoàn Thị Điểm", "Nguyễn Đình Chiểu"]
    },
    {
      name: "Phong Trào Thơ Mới",
      period: "1932 – 1945",
      theme: "jasper",
      desc: "Cuộc cách mạng giải phóng cái Tôi cá nhân mãnh liệt nhất trong lịch sử thi ca Việt Nam. Phá vỡ thi luật Đường thi gò bó để thể hiện trọn vẹn mọi cung bậc cảm xúc, nỗi sầu nhân thế và khát vọng sống tận hiến.",
      reps: ["Xuân Diệu", "Huy Cận", "Hàn Mặc Tử", "Chế Lan Viên", "Nguyễn Bính", "Thế Lữ"]
    },
    {
      name: "Chủ Nghĩa Hiện Thực Phê Phán",
      period: "1930 – 1945",
      theme: "cerulean",
      desc: "Bức tranh hiện thực trần trụi, dữ dội và xót xa về nông thôn và đô thị Việt Nam dưới ách thực dân nửa phong kiến. Đi sâu mổ xẻ bi kịch tha hóa nhân phẩm và nỗi khốn cùng của quần chúng cần lao.",
      reps: ["Nam Cao", "Vũ Trọng Phụng", "Ngô Tất Tố", "Nguyễn Công Hoan", "Thạch Lam"]
    },
    {
      name: "Văn Học Hiện Sinh & Phi Lý Phương Tây",
      period: "Đầu thế kỷ XX",
      theme: "jasper",
      desc: "Phản ánh cơn khủng hoảng tinh thần của con người trước hai cuộc đại chiến thế giới. Khám phá nỗi lưu đày nội tâm, sự phi lý của tồn tại và thân phận bị cơ giới hóa của con người trong xã hội hiện đại.",
      reps: ["Franz Kafka", "Albert Camus", "Jean-Paul Sartre", "Samuel Beckett"]
    },
    {
      name: "Chủ Nghĩa Hiện Thực Huyền Ảo",
      period: "Thập niên 1960 trở đi",
      theme: "cerulean",
      desc: "Dòng văn học bùng nổ tại Mỹ Latinh, hòa quyện thần kỳ giữa sự thực lịch sử trần trụi với huyền thoại dân gian, mộng ảo và siêu thực. Tái hiện toàn cảnh tâm thức và bi kịch văn hóa thuộc địa.",
      reps: ["Gabriel García Márquez", "Jorge Luis Borges", "Mario Vargas Llosa", "Isabel Allende"]
    }
  ],

  // --- TRÍCH DẪN VĂN HỌC CHỌN LỌC ---
  quotes: [
    {
      text: "Văn học là nhân học.",
      author: "Maxim Gorky",
      work: "Khảo Luận Văn Học",
      theme: "cerulean"
    },
    {
      text: "Văn chương không cần đến những người thợ khéo tay làm theo một vài kiểu mẫu đưa cho. Văn chương chỉ dung nạp những người biết đào sâu, biết tìm tòi, khơi những nguồn chưa ai khơi, và sáng tạo những cái gì chưa có.",
      author: "Nam Cao",
      work: "Đời Thừa",
      theme: "jasper"
    },
    {
      text: "Chữ tâm kia mới bằng ba chữ tài.",
      author: "Nguyễn Du",
      work: "Truyện Kiều",
      theme: "cerulean"
    },
    {
      text: "Cái đẹp cứu rỗi thế giới.",
      author: "Fyodor Dostoevsky",
      work: "Chàng Ngốc (The Idiot)",
      theme: "cerulean"
    },
    {
      text: "Nhà văn là người thư ký trung thành của thời đại.",
      author: "Honoré de Balzac",
      work: "Tấn Trò Đời",
      theme: "jasper"
    },
    {
      text: "Thơ là người thư ký chân thành của trái tim.",
      author: "Đỗ Phủ",
      work: "Thi Đạo",
      theme: "cerulean"
    },
    {
      text: "Không có câu chuyện nào buồn hơn câu chuyện về một người muốn trở thành người lương thiện mà bị xã hội xô đẩy vào con đường bất lương.",
      author: "Nam Cao",
      work: "Khảo luận Nhân phẩm",
      theme: "jasper"
    }
  ],

  // --- ĐIỂN TÍCH BÁCH KHOA (ALLUSIONS) ---
  allusions: [
    {
      name: "Gót chân Achilles",
      origin: "Thần thoại Hy Lạp",
      meaning: "Điểm yếu duy nhất, chí mạng của một cá nhân hay một hệ thống tưởng chừng hoàn hảo bất khả chiến bại.",
      example: "Trong tiểu thuyết hiện đại, sự ngạo mạn thường chính là gót chân Achilles của các nhân vật tham vọng."
    },
    {
      name: "Lầu Ngưng Bích",
      origin: "Truyện Kiều - Nguyễn Du",
      meaning: "Biểu tượng văn học cho nỗi cô đơn tuyệt đối, không gian giam hãm tuổi xuân và tâm trạng hoài hương lưu lạc.",
      example: "'Trước lầu Ngưng Bích khóa xuân...' - điển tích chỉ cảnh ngộ bơ vơ giữa bốn bề non nước."
    },
    {
      name: "Nợ như Chúa Chổm",
      origin: "Dân gian & Lịch sử Lê - Mịnh",
      meaning: "Món nợ khổng lồ, chồng chất từ nhiều nơi đến mức không thể nào trả xiết.",
      example: "Nhân vật Thứ trong tiểu thuyết 'Sống Mòn' luôn bị bủa vây bởi cảnh túng quẫn nợ như Chúa Chổm."
    },
    {
      name: "Bát cháo hành Thị Nở",
      origin: "Chí Phèo - Nam Cao",
      meaning: "Biểu tượng của tình người mộc mạc, sự bao dung và liều thuốc duy nhất có khả năng thức tỉnh lương tri bị vùi dập.",
      example: "Bát cháo hành đã trở thành hình tượng kinh điển cứu rỗi linh hồn một con người khỏi cõi quỷ dữ."
    },
    {
      name: "Con chó Vàng của Lão Hạc",
      origin: "Lão Hạc - Nam Cao",
      meaning: "Hiện thân cho tình cảm gia đình, sự trung thành và nỗi dằn vặt lương tâm tột cùng của một con người khốn cùng trước cái nghèo.",
      example: "Nỗi đau bán Cậu Vàng là đỉnh điểm của bi kịch lương tâm và nhân phẩm trong tác phẩm Nam Cao."
    },
    {
      name: "Chuyến tàu đêm phố huyện",
      origin: "Hai Đứa Trẻ - Thạch Lam",
      meaning: "Biểu tượng của ánh sáng, khát vọng đổi đời và ước mơ vươn ra khỏi bóng tối tăm tối đơn điệu của những kiếp người nhỏ bé.",
      example: "Chuyến tàu đêm của Thạch Lam là biểu tượng nghệ thuật bất hủ cho khát vọng sống có ý nghĩa."
    },
    {
      name: "Gương mặt Franz Kafka",
      origin: "Văn học Thế kỷ XX",
      meaning: "Thuật ngữ 'Kafkaesque' dùng để miêu tả những tình huống phi lý, ngột ngạt đến tuyệt vọng trước một hệ thống quan liêu vô hình.",
      example: "Cảnh ngộ của Gregor Samsa biến thành bọ là ví dụ điển hình nhất cho cảm thức Kafkaesque."
    },
    {
      name: "Trăm năm cô đơn",
      origin: "Gabriel García Márquez",
      meaning: "Nỗi cô độc của những dân tộc, cộng đồng không thể tìm thấy sự kết nối và tình đoàn kết với phần còn lại của nhân loại.",
      example: "Ngôi làng Macondo là ẩn dụ cho cả thế kỷ cô độc của các quốc gia thuộc địa Mỹ Latinh."
    }
  ]
};

window.LITERARY_DATA = LITERARY_DATA;
'''

with open(r"c:\Users\nhpk1\Documents\Code\Subject\Literature\js\data.js", "w", encoding="utf-8") as f:
    f.write(data_js.strip())

print("Successfully written 12 comprehensive unabridged works to js/data.js")
