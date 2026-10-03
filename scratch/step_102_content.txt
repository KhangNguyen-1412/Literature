# -*- coding: utf-8 -*-
"""
Dữ liệu Nhóm 1: Văn Xuôi Hiện Thực & Cách Mạng Việt Nam (10 Tác Phẩm)
Bao gồm toàn văn/các phân đoạn kinh điển chuẩn SGK, hình ảnh minh họa, cước chú.
"""

WORKS_GROUP_1 = [
  # 1. TẮT ĐÈN (Ngô Tất Tố)
  {
    "id": "tat-den",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Tắt Đèn (Trọn Vẹn Các Hồi Chính)",
    "author": "Ngô Tất Tố",
    "authorId": "ngo-tat-to",
    "category": "Tiểu thuyết hiện thực",
    "era": "Hiện thực Phê phán (1930 – 1945)",
    "year": "1939",
    "readTime": "24 phút đọc • Toàn cảnh tiểu thuyết",
    "badge": "Kiệt Tác Hiện Thực",
    "image": "assets/images/scenes/tatden_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Ngọn đèn dầu sắp tắt trong căn lều rách nát của gia đình chị Dậu giữa mùa sưu thuế kinh hoàng làng Đông Xá.",
    "epigraph": "Cái bóng tối đen nghịt như cái tiền đồ của chị...",
    "excerpt": "Pho tiểu thuyết hiện thực xuất sắc nhất về nông thôn Việt Nam trước Cách mạng. Từ tấn bi kịch sưu thuế, cảnh bán con bán chó đến phân đoạn kinh điển 'Tức nước vỡ bờ' khi chị Dậu quật ngã tên cai lệ.",
    "fullTextStatus": "Toàn Cảnh Tiểu Thuyết (5 Hồi)",
    "sgkDetail": "Chương trình Ngữ Văn 8 trích giảng trọn vẹn đoạn 'Tức nước vỡ bờ' (Chương VIII) ca ngợi sức phản kháng tiềm tàng mãnh liệt của người phụ nữ nông dân.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Cảnh Tiểu Thuyết Tắt Đèn (Ngô Tất Tố)
          </span>
          <a href="#sgk-tuc-nuoc-vo-bo" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Nhảy đến đoạn Tức nước vỡ bờ (SGK Lớp 8)
          </a>
        </div>

        <h3 class="reader-chapter-title">Hồi I: Mùa Sưu Thuế Kinh Hoàng Tại Làng Đông Xá</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/tatden_mua_suu.svg" alt="Mùa sưu thuế kinh hoàng tại làng Đông Xá" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh vẽ minh họa: Tiếng trống ngũ liên thúc sưu và cảnh giải bắt dân nghèo ở đình Đông Xá</span>
          </div>
        </div>

        <p>Mới tờ mờ sáng, tiếng trống ngũ liên<span class="footnote-ref" data-note="trống ngũ liên: hồi trống dồn dập năm tiếng một hồi dùng để báo động hoặc thúc thuế trong làng xã thời phong kiến thuộc địa.">*1</span> và tiếng tù và đã inh ỏi rúc lên từ phía đình làng Đông Xá. Không khí ngột ngạt bao trùm khắp xóm ngõ nghèo nàn xơ xác. Mùa thuế năm nay đến sớm hơn mọi bận. Những kẻ có ruộng thì lo sốt vó bán thóc non; kẻ làm thuê cuốc mướn thì co ro trốn chui trốn lủi như chuột nhắt trước lũ sai nha hung hãn.</p>

        <p>Trong túp lều tranh rách nát cuối xóm, anh Dậu đang lên cơn sốt rét run bần bật trên chiếc chõng tre ọp ẹp. Gia đình anh vốn thuộc hạng cùng đinh nghèo nhất làng. Để có tiền nộp hai suất sưu—suất của anh và suất của người em trai đã chết từ năm ngoái—chị Dậu đã phải chạy vạy vạy mượn khắp nơi, đứt ruột dứt từng khúc ruột.</p>

        <h3 class="reader-chapter-title">Hồi II: Nỗi Đau Đứt Ruột — Bán Cái Tí & Đàn Chó Cho Nghị Quế</h3>
        <p>Không còn con đường nào khác, cùng đường mạt lộ, chị Dậu đành gạt nước mắt đem đứa con gái đầu lòng mới lên bảy tuổi—cái Tí—và đàn chó mới đẻ đem sang bán cho nhà Nghị Quế bên thôn Đoài để lấy hai đồng bạc nộp sưu thuế cứu chồng ra khỏi cọc trói.</p>

        <p>Cảnh chia lìa diễn ra xé lòng trong chiều mưa gió dầm dề. Cái Tí bưng rổ khoai luộc van xin mẹ đừng bán nó, từng giọt nước mắt con trẻ lăn dài trên má lem luốc bùn đất. Đến nhà Nghị Quế, vợ chồng tên trọc phú keo kiệt không những cò kè bớt một thêm hai từng hào lẻ, mà còn bắt chị Dậu phải nhịn nhục vứt cả ổ chó con ra sân cho chó mẹ gặm xương tàn. Nhận được hai đồng bạc kẽm rỉ sét sau bao nhục nhã ê chề, chị Dậu vừa bước về làng vừa khóc ngất.</p>

        <h3 class="reader-chapter-title" id="sgk-tuc-nuoc-vo-bo">Hồi III: Tức Nước Vỡ Bờ (Trọng Tâm Giảng Dạy SGK Ngữ Văn 8)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Đoạn Trích Sách Giáo Khoa (SGK Ngữ Văn Lớp 8)
            </span>
            <span class="sgk-meta">Văn bản: Tức nước vỡ bờ • Chương VIII</span>
          </div>
          <p class="sgk-notice-desc">Đỉnh cao kịch tính của tiểu thuyết Tắt Đèn: Bút pháp hiện thực sinh động khắc họa sự chuyển biến tâm lý từ nhẫn nhục, van xin đến vùng lên quật ngã bạo quyền của người phụ nữ nông dân lương thiện.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/tatden_tuc_nuoc_vo_bo.svg" alt="Chị Dậu quật ngã tên cai lệ" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Chị Dậu nghiến răng quật ngã tên cai lệ ngã chỏng gọng trên thềm đất</span>
          </div>
        </div>

        <p>Trời vừa sáng rõ. Chị Dậu vừa tất tưởi bưng bát cháo hành nóng hổi nấu bằng gạo mượn của bà lão hàng xóm lại gần chõng cho chồng:<br>
        — Thầy em hãy cố ngồi dậy húp tí cháo cho đỡ đói lòng, từ hôm qua đến giờ chưa có hạt cơm nào vào bụng cả.</p>

        <p>Anh Dậu run rẩy run như cầy sấy đưa tay đón lấy bát cháo. Chưa kịp đưa lên miệng thì ngoài đầu ngõ đã rầm rập tiếng bước chân và tiếng quát tháo om sòm. Cai lệ và người nhà lí trưởng sấn sổ bước vào, tay lăm lăm roi song, tay thước và dây thừng:</p>

        <p>— Thằng kia! Tiền sưu của mày đâu? Chôn ông mày chết chưa mà chưa nộp sưu hử?</p>

        <p>Anh Dậu sợ quá, lăn đùng ra đất ngất lịm đi. Bát cháo rơi vỡ tan tành trên nền đất ẩm. Chị Dậu run rẩy, xót xa chạy lại van lạy:<br>
        — Lạy hai ông, nhà cháu vừa ốm liệt giường chết đi sống lại, xin hai ông thương tình cho khất đến chiều nay...</p>

        <p>Tên cai lệ trừng mắt quát:<br>
        — Mày trói ngay cổ thằng chồng mày lại giải ra đình, có khất với trời!</p>

        <p>Nói đoạn, hắn sấn đến giơ roi song nhằm thẳng đầu anh Dậu quất xuống. Chị Dậu nghiến hai hàm răng, mắt bừng bừng căm giận. Sự nhẫn nhục đến cực điểm đã biến thành sức mạnh quật khởi phi thường. Chị túm lấy ngực áo tên cai lệ, ấn dúi một cái thật mạnh. Tên cai lệ ngã ngửa chỏng queo ra thềm đất. Người nhà lí trưởng xông vào toan giơ gậy đánh chị, chị Dậu lẹ làng túm lấy chiếc gậy, giằng mạnh rồi xoay người quật ngã dúi dụi tên tay sai hung hãn xuống vũng bùn trước sân!</p>

        <p>Chị Dậu đứng sừng sững, chống hai tay ngang sườn, quắc mắt dõng dạc quát:<br>
        — Mày trói ngay chồng bà đi, bà cho mày xem!</p>

        <h3 class="reader-chapter-title">Hồi IV: Đêm Tối Đen Như Tiền Đồ Của Chị Dậu (Đoạn Kết)</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/tatden_toi_den.svg" alt="Bước chạy tuyệt vọng trong đêm tối" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Chị Dậu chạy xé màn đêm tối mịt mù sau khi trốn khỏi nhà quan cụ</span>
          </div>
        </div>

        <p>Sau trận chống cự dữ dội, chị Dậu bị bắt giải lên huyện. Dưới trướng quan huyện và quan cụ dâm ô, người phụ nữ bần cùng ấy lại phải chịu thêm biết bao cạm bẫy tanh nhơ nhằm làm nhục phẩm hạnh. Nhưng chị đã dũng cảm cắn vào tay lão quan già dê xồm, vung vẫy chạy thoát ra sân.</p>

        <p>Cánh cổng sắt nặng nề khép lại sau lưng. Trời tối đen như mực. Chị Dậu cắm đầu cắm cổ chạy băng qua đồng hoang lạnh lẽo, mưa dầm dề quất rát rạt vào mặt. Đất trời tối mịt mùng, đen nghịt như chính cái số phận cay đắng và tương lai mù mịt của chị trong xã hội phong kiến thực dân đương thời.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn cảnh tiểu thuyết Tắt Đèn • Ngô Tất Tố ]</span></div>
    """,
    "criticism": "Với tiểu thuyết Tắt Đèn, Ngô Tất Tố đã dựng nên một bức tranh xã hội chân thực đến tàn nhẫn và xây dựng thành công hình tượng chị Dậu—người phụ nữ nông dân giàu đức hy sinh nhưng ẩn chứa sức mạnh phản kháng quật khởi như quy luật tất yếu: 'Tức nước vỡ bờ'.",
    "tags": ["Ngô Tất Tố", "Tiểu thuyết hiện thực", "Chị Dậu", "Hiện thực phê phán", "SGK Lớp 8"]
  },

  # 2. VỢ NHẶT (Kim Lân)
  {
    "id": "vo-nhat",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Vợ Nhặt (Toàn Văn Kiệt Tác)",
    "author": "Kim Lân",
    "authorId": "kim-lan",
    "category": "Truyện ngắn kinh điển",
    "era": "Hiện thực Cách mạng",
    "year": "1954",
    "readTime": "22 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Nạn Đói",
    "image": "assets/images/scenes/vonhat_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Tràng dắt người vợ nhặt về xóm ngụ cư trong chiều chạng vạng nạn đói năm Ất Dậu 1945.",
    "epigraph": "Trong cơn đói khát cùng đường, người ta vẫn cưu mang nhau và hướng về sự sống...",
    "excerpt": "Bản toàn văn kiệt tác truyện ngắn của Kim Lân: Tái hiện chân thực nạn đói khủng khiếp năm 1945 qua câu chuyện nhặt vợ kỳ lạ của anh cu Tràng, tình mẫu tử nghẹn ngào của bà cụ Tứ và nồi cháo cám ấm áp tình người.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn truyện ngắn Vợ Nhặt: Trọng tâm phân tích là tình huống truyện độc đáo, diễn biến tâm lý bà cụ Tứ và chi tiết lá cờ đỏ sao vàng kết thúc tác phẩm.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Vợ Nhặt (Kim Lân)
          </span>
          <a href="#sgk-ba-cu-tu" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến tâm trạng bà cụ Tứ (SGK Lớp 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Chiều Chạng Vạng Xóm Ngụ Cư & Cuộc 'Nhặt Vợ' Kỳ Lạ</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vonhat_dan_ve.svg" alt="Tràng dẫn vợ về xóm ngụ cư" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Tràng đi trước tủm tỉm cười, người đàn bà cắp nón rách e thẹn đi sau trong hoàng hôn xóm ngụ cư</span>
          </div>
        </div>

        <p>Mỗi chiều, khi bóng hoàng hôn sầm sập đổ xuống ngõ xóm ngụ cư<span class="footnote-ref" data-note="xóm ngụ cư: xóm của những người phiêu bạt từ khắp nơi dạt về kiếm sống, không có đất đai cội rễ trong làng.">*1</span>, lũ trẻ con gầy guộc đói khát lại ùa ra ngóng trông anh cu Tràng đi kéo xe bò thóc về. Tràng vốn là một gã thợ thuyền thô kệch, lưng to như lưng gấu, cái đầu trọc nhẵn thín và tính tình hay đùa vui cởi mở.</p>

        <p>Nhưng chiều nay, xóm ngụ cư bỗng xôn xao một luồng sinh khí lạ lùng. Tràng không đi một mình như mọi bận. Đi sau lưng anh chừng ba bốn bước là một người đàn bà lạ mặt, cắp cái nón rách tàng nghiêng nghiêng che khuất nửa khuôn mặt hốc hác. Tràng bước đi với vẻ mặt phớn phở, đôi mắt lấp lánh nụ cười mãn nguyện, thỉnh thoảng lại ngoái lại nhìn người đàn bà với ánh mắt âu yếm.</p>

        <p>Người ta nhặt được vợ thật dễ dàng đến thắt lòng giữa năm đói! Chỉ bằng bốn bát bánh đúc nóng hổi và mấy câu hò đùa vẩn vơ lúc đẩy xe thóc dốc tỉnh: <em>“Muốn ăn cơm trắng mấy giò này / Lại đây mà đẩy xe bò với anh...”</em>, người đàn bà rách rưới đói lả đã theo Tràng về làm vợ, không cưới xin sêu tết, không trầu cau cưới hỏi!</p>

        <h3 class="reader-chapter-title" id="sgk-ba-cu-tu">Phần II: Nỗi Lòng Bà Cụ Tứ (Trọng Tâm Giảng Dạy SGK Ngữ Văn 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Phân Tích Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Vợ Nhặt • Diễn biến tâm lý bà cụ Tứ</span>
          </div>
          <p class="sgk-notice-desc">Vẻ đẹp khuất lấp của tình mẫu tử: Từ ngạc nhiên, bàng hoàng, xót xa tủi cực đến lòng bao dung, vị tha và niềm hy vọng bền bỉ vào tương lai của người mẹ nghèo.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vonhat_ba_cu_tu.svg" alt="Tâm trạng bà cụ Tứ" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Bà cụ Tứ nghẹn ngào nhìn đôi trẻ trong chái nhà xiêu vẹo rách nát</span>
          </div>
        </div>

        <p>Bà cụ Tứ lật đật bước vào sân, miệng lầm rầm tính toán chuyện tiền nong. Nhìn thấy người đàn bà lạ đứng nép nơi góc giường, cúi đầu chào bằng 'U', bà lão ngơ ngác không tin vào mắt mình:</p>

        <p>— Kìa người nào thế con nhỉ? Sao lại chào u thế?</p>

        <p>Tràng cười gượng, bước lại gần giục mẹ:<br>
        — Nhà tôi nó mới về làm bạn với tôi đấy u ạ. Chẳng qua nó cũng là cái duyên cái số cả thôi.</p>

        <p>Bà cụ Tứ đứng lặng đi trong bóng chiều sập xuống. Trong tâm trí người mẹ nghèo, bao nhiêu cảm xúc đan xen cuộn trào: Bà hiểu rồi. Lòng người mẹ vừa nghẹn ngào vừa cay đắng xót xa. Người ta có gặp bước khó khăn đói khát này mới chịu lấy đến con mình, mà con mình mới có được vợ... Nghĩ đến cảnh đói kém người chết nằm như ngả rạ ngoài đường, bà lão không cầm được hai giọt nước mắt rỉ ra nơi kẽ mắt kèm nhèm.</p>

        <p>Bà cụ khẽ thở dài, bước lại gần cô con dâu mới, giọng nhỏ nhẹ ấm áp vô cùng:<br>
        — Ừ, thôi thì các con đã phải duyên phải kiếp với nhau, u cũng mừng lòng... Nhà ta nghèo, chẳng làm được mâm cơm đãi họ hàng, chỉ mong sau này chúng mày bảo ban nhau làm ăn, rồi trời cũng cho khấm khá lên...</p>

        <h3 class="reader-chapter-title">Phần III: Buổi Sáng Đầu Tiên, Nồi Cháo Cám & Lá Cờ Đỏ Bay Phấp Phới</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vonhat_chao_cam.svg" alt="Nồi cháo cám và lá cờ đỏ" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Bữa cơm ngày đói với nồi cháo cám đắng chát và tiếng trống thúc thuế</span>
          </div>
        </div>

        <p>Sáng hôm sau, ánh nắng ban mai rọi vào căn nhà tranh khiến mọi vật như bừng sáng một luồng sinh khí mới. Người vợ nhặt quét tước sân vườn gọn gàng, dáng vẻ hiền hậu nhu mì khác hẳn nét chỏng lỏn hôm qua nơi bến xe. Tràng thấy mình bỗng nhiên trưởng thành, có trách nhiệm gắn bó với tổ ấm gia đình.</p>

        <p>Bữa cơm ngày đầu đón dâu được dọn ra trên chiếc mâm rách: một đĩa muối hạt, một lùm rau chuối thái mỏng và một niêu cháo loãng. Nhưng vui vẻ nhất là khi bà cụ Tứ bưng ra một nồi đất còn bốc khói nghi ngút, miệng tươi cười hớn hở:</p>

        <p>— Chè kho đây các con! Ngon đáo để đấy, xóm ta khối nhà còn không có mà ăn đâu!</p>

        <p>Tràng cầm thìa múc một miếng đưa vào miệng: đắng chát và nghẹn ứ nơi cổ họng. Đó là cháo cám! Người vợ nhặt khẽ đưa mắt nhìn mẹ chồng rồi điềm nhiên và vào miệng, không một tiếng phàn nàn chê bai.</p>

        <p>Đúng lúc ấy, tiếng trống thúc thuế lại dồn dập vang lên từ phía đình làng. Người vợ khẽ thở dài bảo:<br>
        — Trên mạn Thái Nguyên, Bắc Giang người ta không chịu đóng thuế nữa đâu, người ta đi phá kho thóc Nhật chia cho dân nghèo nhiều lắm, có cả cờ đỏ sao vàng đi đầu nữa đấy!</p>

        <p>Tràng chợt nhớ lại hôm kéo xe bò lên tỉnh cũng bắt gặp đoàn người đói ầm ầm kéo đi phá kho thóc. Trong óc Tràng bỗng dội lên hình ảnh lá cờ đỏ sao vàng năm cánh bay phấp phới giữa đoàn biểu tình quật khởi, mở ra con đường sống duy nhất cho những kiếp người bần cùng.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Vợ Nhặt • Kim Lân ]</span></div>
    """,
    "criticism": "Vợ Nhặt là một kiệt tác truyện ngắn nhân đạo: Không phải ngẫu nhiên Kim Lân viết về cái đói mà không hề bi lụy. Ngược lại, ngọn lửa của tình thương, sự sống và niềm tin vào cách mạng đã bừng sáng ngay giữa ranh giới mỏng manh giữa sự sống và cái chết.",
    "tags": ["Kim Lân", "Truyện ngắn", "Vợ Nhặt", "Nạn đói 1945", "SGK Lớp 12"]
  },

  # 3. VỢ CHỒNG A PHỦ (Tô Hoài)
  {
    "id": "vo-chong-a-phu",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Vợ Chồng A Phủ (Toàn Cảnh Truyện Vừa Tây Bắc)",
    "author": "Tô Hoài",
    "authorId": "to-hoai",
    "category": "Truyện vừa kinh điển",
    "era": "Văn học Kháng chiến chống Pháp",
    "year": "1952",
    "readTime": "26 phút đọc • Toàn cảnh tác phẩm",
    "badge": "Kiệt Tác Tây Bắc",
    "image": "assets/images/scenes/vochongaphu_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Tiếng khèn gọi bạn tình trên rẻo cao Tây Bắc và cuộc vùng lên giải phóng của Mị và A Phủ.",
    "epigraph": "Tiếng sáo gọi bạn yêu lơ lửng bay ngoài đầu núi...",
    "excerpt": "Bản văn đầy đủ của kiệt tác Tô Hoài: Cuộc đời cơ cực của cô Mị làm dâu gạt nợ nhà Pá Tra, sức sống tiềm tàng trỗi dậy trong đêm tình mùa xuân và hành động cởi trói cứu A Phủ bừng lên ngọn lửa cách mạng.",
    "fullTextStatus": "Toàn Cảnh Kiệt Tác (3 Phần)",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy hai phân đoạn trọng tâm: 'Đêm tình mùa xuân ở Hồng Ngài' và 'Đêm đông Mị cởi trói cứu A Phủ trốn sang Phiềng Sa'.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Cảnh Kiệt Tác Vợ Chồng A Phủ (Tô Hoài)
          </span>
          <a href="#sgk-dem-tinh-mua-xuan" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến Đêm tình mùa xuân (SGK Lớp 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Thân Phận Con Dâu Gạt Nợ Cay Đắng Ở Nhà Thống Lý Pá Tra</h3>
        <p>Ai ở vùng Hồng Ngài qua nhà thống lý Pá Tra cũng thấy một người đàn bà trẻ tuổi ngồi quay sợi gai bên tảng đá trước cửa, lúc nào cũng cúi mặt, mặt buồn rười rượi. Đó là Mị—con dâu gạt nợ của nhà thống lý.</p>

        <p>Ngày trước, Mị là một bông hoa xinh đẹp nhất vùng rẻo cao, biết thổi lá hay như thổi sáo, có biết bao chàng trai ngày đêm đứng ngoài vách gỗ chờ Mị. Nhưng vì món nợ truyền kiếp của cha mẹ từ ngày cưới chưa trả hết, A Sử—con trai thống lý Pá Tra—đã lập mưu bắt cóc Mị về làm vợ gạt nợ.</p>

        <p>Sống trong nhà giàu tột bậc nhưng kiếp sống của Mị không bằng con trâu, con ngựa. Con trâu con ngựa làm có lúc được nghỉ, còn Mị thì lùi lũi như con rùa nuôi nơi xó cửa. Căn buồng Mị nằm chỉ có một chiếc cửa sổ con bằng bàn tay, trông ra chỉ thấy trăng trắng, mờ mờ, không biết là sương hay là nắng. Đã có lần Mị hái nắm lá ngón định tự tử để giải thoát, nhưng nghĩ đến cha già Mị lại không nỡ chết.</p>

        <h3 class="reader-chapter-title" id="sgk-dem-tinh-mua-xuan">Phần II: Đêm Tình Mùa Xuân & Sức Sống Tiềm Tàng Trỗi Dậy (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Vợ Chồng A Phủ • Đoạn trích Đêm tình mùa xuân</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật miêu tả tâm lý bậc thầy của Tô Hoài: Tiếng sáo gọi bạn tình mùa xuân đã đánh thức khát vọng tình yêu, tự do và tuổi trẻ vốn bị chôn vùi trong tâm hồn người phụ nữ Mông.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vochongaphu_dem_tinh.svg" alt="Đêm tình mùa xuân Tây Bắc" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Mị lén uống rượu ừng ực từng bát và lắng nghe tiếng sáo gọi bạn tình lơ lửng ngoài đầu núi</span>
          </div>
        </div>

        <p>Mùa xuân năm ấy đến sớm trên vùng rẻo cao. Gió rét thổi hoa thuốc phiện đỏ nở rộ trắng ngần trên nương. Trong các làng Mông, trẻ con xúng xính mặc váy hoa mới ra sân chơi quay, đánh pao. Ngoài đầu núi, tiếng sáo gọi bạn tình bắt đầu réo rắt bay lơ lửng trong gió:</p>

        <p><em>“Anh ném pao, em không bắt<br>
        Em không yêu, quả pao rơi rồi...”</em></p>

        <p>Tiếng sáo tha thiết ấy len lỏi vào buồng tối, đánh thức tâm hồn Mị. Đêm ấy, Mị lén lấy hũ rượu ra uống. Mị uống ừng ực từng bát như nuốt cả những cay đắng, uất ức vào lòng. Say rượu, Mị thấy lòng mình phơi phới trở lại như những đêm tình mùa xuân thời con gái.</p>

        <p>Mị thắp thêm ngọn đèn dầu cho sáng buồng. Mị với tay lấy chiếc váy hoa xòe xếp trong góc, quấn lại mái tóc óng mượt chuẩn bị đi chơi xuân. Bất ngờ, A Sử bước vào. Thấy Mị sửa soạn đi chơi, hắn xông đến trói đứng Mị vào cột nhà bằng cả một thúng sợi đay, quấn tóc Mị lên trần nhà rồi tắt đèn khép cửa bỏ đi chơi.</p>

        <p>Suốt đêm ấy, bị trói đứng đau đớn tê dại, nhưng tâm hồn Mị vẫn bay theo tiếng sáo ngoài vách núi. Khát vọng tự do và tình yêu trong Mị chưa bao giờ bị dập tắt!</p>

        <h3 class="reader-chapter-title" id="sgk-dem-dong-coi-troi">Phần III: Đêm Đông Cởi Trói Cứu A Phủ & Cuộc Trốn Chạy Sang Phiềng Sa (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Vợ Chồng A Phủ • Phân cảnh cởi trói định mệnh</span>
          </div>
          <p class="sgk-notice-desc">Bước ngoặt số phận: Hành động cắt dây mây cứu người của Mị là sự kết tinh của lòng nhân đạo sâu sắc, ý thức phản kháng bạo quyền và tinh thần tự do quật khởi.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/vochongaphu_coi_troi.svg" alt="Mị cởi trói cứu A Phủ" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Mị dùng lưỡi dao nhỏ cắt đứt từng nút dây mây cứu A Phủ trong đêm đông lạnh buốt</span>
          </div>
        </div>

        <p>A Phủ là một chàng trai nghèo mồ côi, khỏe như hổ, thạo nghề săn bắn và cày cuốc. Vì đánh A Sử để bảo vệ lẽ phải, A Phủ bị phạt vạ một trăm đồng bạc trắng và bị biến thành đứa ở gạt nợ cho nhà Pá Tra. Một bận để hổ vồ mất một con bò, A Phủ bị thống lý Pá Tra trói đứng vào cọc gỗ góc nhà suốt mấy ngày đêm bằng dây mây thít chặt đến rách da rách thịt.</p>

        <p>Đêm mùa đông trên núi cao buốt giá như cắt da cắt thịt. Mị thức dậy ra bếp sưởi lửa. Qua ánh lửa bập bùng, Mị liếc nhìn sang cọc trói. Đúng lúc ấy, A Phủ trừng mắt nhìn Mị, một dòng nước mắt lấp lánh lăn xuống hõm má xám đen vì đói và rét.</p>

        <p>Dòng nước mắt ấy đã làm tan chảy lớp băng giá câm lặng bấy lâu trong tim Mị. Mị nghĩ: Người kia việc gì phải chết thế kia? Mị nhớ lại chính mình cũng từng bị trói đứng như thế. Nếu Mị cởi trói cho A Phủ, cha con thống lý bắt Mị trói thay thì Mị cũng không sợ nữa!</p>

        <p>Lòng nhân đạo và tình thương đồng loại đã chiến thắng nỗi sợ hãi cường quyền. Mị rón rén lấy con dao nhỏ cắt đứt từng nút dây mây. Dây trói vừa đứt, A Phủ quỵ xuống đất rồi gắng sức vùng chạy. Mị đứng lặng đi trong bóng tối giây lát, rồi một sức mạnh tự giải phóng trỗi dậy mãnh liệt, Mị vụt chạy theo:</p>

        <p>— A Phủ! Cho tôi đi với! Ở đây thì chết mất!</p>

        <p>Hai người băng rừng vượt núi trong đêm đen buốt giá, trốn thoát khỏi Hồng Ngài sang khu du kích Phiềng Sa, gặp cán bộ A Châu và trở thành những chiến sĩ du kích kiên cường đánh Pháp giải phóng bản làng.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn cảnh truyện vừa Vợ Chồng A Phủ • Tô Hoài ]</span></div>
    """,
    "criticism": "Tô Hoài đã vẽ nên một bức tranh chân thực và tráng lệ về cuộc sống, tâm hồn đồng bào các dân tộc thiểu số Tây Bắc. Tác phẩm là bài ca bất diệt về sức sống bất khuất và con đường từ tự phát đến tự giác giải phóng của quần chúng cần lao.",
    "tags": ["Tô Hoài", "Truyện Tây Bắc", "Mị", "A Phủ", "Kháng chiến", "SGK Lớp 12"]
  },

  # 4. CHIẾC THUYỀN NGOÀI XA (Nguyễn Minh Châu)
  {
    "id": "chiec-thuyen-ngoai-xa",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Chiếc Thuyền Ngoài Xa (Toàn Văn)",
    "author": "Nguyễn Minh Châu",
    "authorId": "nguyen-minh-chau",
    "category": "Truyện ngắn triết lý",
    "era": "Văn học Thời kỳ Đổi mới",
    "year": "1983",
    "readTime": "20 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Đổi Mới",
    "image": "assets/images/scenes/chiecthuyen_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Con thuyền mờ ảo trong sương sớm như bức tranh thủy mặc đối lập với cuộc đời đa đoan góc khuất nơi bãi biển.",
    "epigraph": "Một cảnh đắt trời cho... nhưng cái đẹp tuyệt mỹ ngoài xa lại che lấp nỗi đau hiện thực bên trong.",
    "excerpt": "Tác phẩm tiêu biểu cho xu hướng đổi mới văn học của Nguyễn Minh Châu. Bức tranh nghệ thuật tuyệt mỹ về chiếc thuyền trong sương sớm đối lập sâu sắc với hiện thực gia đình hàng chài bạo lực, gửi gắm triết lý sâu sắc về mối quan hệ giữa nghệ thuật và cuộc đời.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 12 giảng dạy trọn vẹn: Trọng tâm phân tích là hai phát hiện của nghệ sĩ nhiếp ảnh Phùng và cuộc đối thoại sâu sắc của người đàn bà hàng chài tại tòa án huyện.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Chiếc Thuyền Ngoài Xa (Nguyễn Minh Châu)
          </span>
          <a href="#sgk-toa-an-huyen" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến tòa án huyện (SGK Lớp 12)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Phát Hiện Thứ Nhất — Vẻ Đẹp Tuyệt Mỹ 'Cảnh Đắt Trời Cho'</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/chiecthuyen_suong_som.svg" alt="Chiếc thuyền ngoài xa trong sương sớm" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Bức tranh mực tàu toàn bích của một danh họa thời cổ trên phá Tam Giang</span>
          </div>
        </div>

        <p>Để hoàn thành bộ lịch nghệ thuật về thuyền và biển theo đơn đặt hàng của trưởng phòng, nghệ sĩ nhiếp ảnh Phùng đã phục kích suốt mấy ngày liền trên bờ biển miền Trung nơi từng là chiến trường xưa. Và vào một buổi sáng sớm mờ sương, anh đã chụp được một bức ảnh kỳ diệu—một 'cảnh đắt trời cho' mà cả đời cầm máy anh chưa từng thấy lần thứ hai.</p>

        <p>Trước mắt Phùng là một bức tranh mực tàu của một danh họa thời cổ: Mũi thuyền in một nét mơ hồ lòe nhòe vào bầu sương mù trắng như sữa có pha đôi chút màu hồng hồng do ánh mặt trời chiếu vào. Vài bóng người lớn lẫn trẻ con ngồi im phăng phắc như tượng trên chiếc mui khum khum, đang hướng mặt vào bờ. Tất cả khung cảnh ấy nhìn qua những mắt lưới và tấm lưới nằm giữa hai chiếc gọng vó hiện ra hài hòa, tĩnh lặng và thanh khiết vô ngần.</p>

        <p>Đứng trước vẻ đẹp toàn bích ấy, tâm hồn Phùng rung động mãnh liệt. Anh cảm nhận sâu sắc câu nói của người xưa: Bản thân Cái Đẹp chính là Đạo đức, là sự thanh lọc tuyệt đối cho tâm hồn con người.</p>

        <h3 class="reader-chapter-title">Phần II: Phát Hiện Thứ Hai — Sự Thật Khốc Liệt Nơi Bờ Biển</h3>
        <p>Nhưng ngay khi chiếc thuyền đỗ vào bờ, một cảnh tượng tàn nhẫn và nghịch lý đã phơi bày ngay trước mắt Phùng: Bước ra khỏi con thuyền thơ mộng là một người đàn bà trạc ngoài bốn mươi tuổi, mặt rỗ chằng chịt, thân hình thô kệch mệt mỏi; và theo sau là một gã đàn ông lực lưỡng với đôi mắt dữ dằn độc dữ.</p>

        <p>Không nói không rằng, gã đàn ông rút chiếc thắt lưng da quất tới tấp vào lưng người đàn bà, vừa đánh vừa nghiến răng rủa sả: <em>“Mày chết đi cho ông nhờ! Chúng mày chết hết đi cho ông nhờ!”</em>. Đáng kinh ngạc là người đàn bà không hề né tránh, không chống trả cũng không kêu một tiếng than van.</p>

        <p>Đúng lúc ấy, thằng Phác—đứa con trai nhỏ—lao đến như một mũi tên xông vào giật chiếc thắt lưng đánh lại bố để bảo vệ mẹ, nhưng bị gã đàn ông tát ngã dúi dụi. Phùng sững sờ đánh rơi cả chiếc máy ảnh đắt tiền. Hóa ra, đằng sau vẻ đẹp thơ mộng ngút ngàn của chiếc thuyền ngoài xa lại là một bi kịch đói nghèo, tăm tối và bạo lực gia đình nhức nhối!</p>

        <h3 class="reader-chapter-title" id="sgk-toa-an-huyen">Phần III: Người Đàn Bà Hàng Chài Ở Tòa Án Huyện (SGK 12)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 12)
            </span>
            <span class="sgk-meta">Văn bản: Chiếc Thuyền Ngoài Xa • Cuộc trò chuyện tại tòa án huyện</span>
          </div>
          <p class="sgk-notice-desc">Bài học sâu sắc về cách nhìn nhận cuộc đời: Người nghệ sĩ không thể nhìn cuộc đời một cách đơn giản, xuôi chiều từ khoảng cách xa, mà phải dấn thân đi sâu vào muôn mặt số phận con người.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/chiecthuyen_toa_an.svg" alt="Tòa án huyện và triết lý cuộc đời" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Chánh án Đẩu và Phùng lắng nghe câu chuyện đầy nước mắt của người đàn bà hàng chài</span>
          </div>
        </div>

        <p>Tại tòa án huyện, chánh án Đẩu—người đồng đội cũ của Phùng—khuyên người đàn bà ly hôn để thoát khỏi cảnh bị đòn roi đày đọa. Nhưng người đàn bà chắp tay vái lia lịa van xin:<br>
        — Con lạy quý tòa! Quý tòa bắt tội con cũng được, phạt tù con cũng được, nhưng đừng bắt con bỏ nó!</p>

        <p>Trước sự ngạc nhiên tột độ của Đẩu và Phùng, người đàn bà trải lòng bằng tất cả sự thấu hiểu lẽ đời:</p>

        <p>— Lòng các chú tốt, nhưng các chú đâu phải người làm ăn nơi biển cả... Đám đàn bà hàng chài chúng tôi đẻ nhiều, sống trên chiếc thuyền lênh đênh giữa sóng to gió lớn, làm sao nuôi nổi đàn con nếu không có một người đàn ông chèo chống? Chồng tôi vốn hiền lành nhưng nghèo quá, khổ quá, trốn lính không xong, thuyền chật con đông nên đâm ra túng quẫn dữ dằn. Đàn bà ở thuyền chúng tôi sống là vì con chứ không thể sống cho riêng mình được...</p>

        <p>Lời tâm sự mộc mạc mà thấm đẫm đức hy sinh của người đàn bà đã làm cả Đẩu và Phùng vỡ lẽ ra bao điều sâu sắc. Sau chuyến đi, bức ảnh chiếc thuyền trong sương của Phùng được treo ở khắp các gia đình sành nghệ thuật. Nhưng mỗi lần ngắm nhìn bức ảnh đen trắng ấy, Phùng luôn thấy hiện lên màu hồng hồng của ánh sương mai và bước ra từ đó là người đàn bà hàng chài nghèo khổ với khuôn mặt rỗ chằng chịt, nhắc nhở anh về trách nhiệm cao cả của người cầm bút trước hiện thực cuộc đời.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Chiếc Thuyền Ngoài Xa • Nguyễn Minh Châu ]</span></div>
    """,
    "criticism": "Nguyễn Minh Châu đã mở ra một trang mới cho văn xuôi hiện đại Việt Nam: Bằng cái nhìn đa diện, sắc sảo và tấm lòng nhân đạo trắc ẩn, tác giả gửi gắm thông điệp bất hủ rằng nghệ thuật chân chính không bao giờ tách rời khỏi số phận và nỗi đau trần thế của con người.",
    "tags": ["Nguyễn Minh Châu", "Truyện ngắn", "Chiếc Thuyền Ngoài Xa", "Đổi mới", "SGK Lớp 12"]
  },

  # 5. LÀNG (Kim Lân)
  {
    "id": "lang",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Làng (Toàn Văn Truyện Ngắn Kháng Chiến)",
    "author": "Kim Lân",
    "authorId": "kim-lan",
    "category": "Truyện ngắn kháng chiến",
    "era": "Văn học Kháng chiến chống Pháp",
    "year": "1948",
    "readTime": "18 phút đọc • Toàn văn tác phẩm",
    "badge": "Kiệt Tác Kháng Chiến",
    "image": "assets/images/scenes/lang_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Ông Hai khoe làng Chợ Dầu nơi tản cư và tình yêu làng tha thiết gắn bó máu thịt với kháng chiến Cụ Hồ.",
    "epigraph": "Làng thì yêu thật, nhưng làng theo Tây mất rồi thì phải thù!",
    "excerpt": "Bản văn đầy đủ của truyện ngắn bất hủ Kim Lân: Tái hiện diễn biến tâm lý chân thực, cảm động của nhân vật ông Hai từ niềm tự hào khoe làng, nỗi bàng hoàng đau đớn trước tin đồn thất thiệt đến niềm vui vỡ òa khi làng Chợ Dầu được cải chính.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn truyện ngắn Làng: Trọng tâm phân tích là tâm trạng dằn vặt của ông Hai khi nghe tin đồn và cuộc đối thoại cảm động với đứa con út.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Truyện Ngắn Làng (Kim Lân)
          </span>
          <a href="#sgk-tin-lang-cho-dau" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh nghe tin đồn (SGK Lớp 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Nỗi Nhớ Làng Chợ Dầu & Thói Khoe Làng Nơi Tản Cư</h3>
        <p>Ở nơi tản cư, ông Hai lúc nào cũng đau đáu nhớ về làng Chợ Dầu của mình. Cái thói quen khoe làng đã ăn sâu vào máu thịt ông từ thuở trước cách mạng. Khi còn ở quê, gặp ai ông cũng hãnh diện khoe cái lăng mộ to đẹp của cụ thượng trong làng. Cách mạng thành công, ông lại say sưa khoe làng ông phong trào kháng chiến sôi nổi bậc nhất: hào giao thông chằng chịt, bãi tập quân sự, những buổi tập bắn súng rộn rã đầu đình.</p>

        <p>Xa làng, ngày nào ông cũng tạt qua phòng thông tin nghe đọc báo. Nghe tin quân ta đánh thắng giặc Pháp ở Bắc Giang, Bắc Ninh, Phủ Thông, sông Lô, ruột gan ông lão cứ múa cả lên, lòng rạo rực khôn tả.</p>

        <h3 class="reader-chapter-title" id="sgk-tin-lang-cho-dau">Phần II: Nỗi Bàng Hoàng Đau Đớn & Cuộc Độc Thoại Nội Tâm (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Làng • Tâm trạng ông Hai khi nghe tin làng theo giặc</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật miêu tả tâm lý bậc thầy của Kim Lân: Sự giằng xé nội tâm dữ dội giữa tình yêu làng quê truyền thống và lòng trung thành với Cách mạng, Bác Hồ.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/lang_dau_don.svg" alt="Ông Hai đau đớn khi nghe tin làng theo giặc" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Cổ ông lão nghẹn ắng hẳn lại, cúi gằm mặt bước đi giữa nỗi tủi hổ bẽ bàng</span>
          </div>
        </div>

        <p>Đang trong niềm vui hân hoan thắng trận, ông Hai bước vào quán nước nghỉ chân thì bất ngờ nghe một người đàn bà tản cư từ dưới xuôi lên buông một câu như sét đánh ngang tai:</p>

        <p>— Các ông các bà đã biết tin gì chưa? Cả làng Chợ Dầu chúng nó theo Tây rồi đấy! Nó rước giặc về đốt làng, bắt bớ cán bộ kháng chiến!</p>

        <p>Cổ ông Hai nghẹn ắng hẳn lại, da mặt tê rân rân. Ông lặng đi, tưởng như không thở được. Một lát sau, ông cố trấn tĩnh gượng cười, buông một câu vu vơ:<br>
        — Thế cơ à? Liệu có thật không hả bác?</p>

        <p>— Thật chứ lại không à! Chính mắt tôi thấy lính cơ rước cờ tam tài về làng cơ mà!</p>

        <p>Ông Hai cúi gằm mặt bước vội ra khỏi quán nước. Về đến nhà, ông quăng mình lên chiếc giường tre, nhìn đàn con thơ dại đang chơi ngoài sân mà nước mắt ròng ròng: <em>“Chúng mày cũng là con cái quân Việt gian bán nước đấy ư? Khốn nạn thân các con tôi!”</em>.</p>

        <p>Suốt mấy ngày liền, ông Hai không dám bước chân ra khỏi ngưỡng cửa. Hễ nghe thấy tiếng xì xào bàn tán 'Việt gian', 'Tây đoan' ngoài ngõ là ông lại thon thót giật mình, lủi vào góc nhà tối tăm như một kẻ mang trọng tội. Bị mụ chủ nhà đay nghiến đòi đuổi đi, ông Hai đứng trước sự giằng xé dữ dội: Có nên quay về làng không? Nhưng lập tức ông gạt phắt ngay ý nghĩ ấy: <strong>“Làng thì yêu thật, nhưng làng theo Tây mất rồi thì phải thù!”</strong>.</p>

        <p>Trong đêm tối bế tắc, ông ôm đứa con trai út—thằng Húc—vào lòng thủ thỉ tâm sự:<br>
        — Húc này, thế nhà con ở đâu?<br>
        — Dạ, nhà con ở làng Chợ Dầu ạ.<br>
        — Thế con ủng hộ ai?<br>
        — Con ủng hộ Cụ Hồ Chí Minh muôn năm!<br>
        Nghe con thơ ngây dõng dạc trả lời, nước mắt ông Hai lại ròng ròng chảy xuống ngực. Lòng ông trước sau như một, tấm lòng trung thành với Bác Hồ, với kháng chiến vẫn trong sáng và bất diệt.</p>

        <h3 class="reader-chapter-title">Phần III: Tin Cải Chính Về & Niềm Sung Sướng Vỡ Òa Của Ông Hai</h3>
        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/lang_cai_chinh.svg" alt="Tin cải chính về làng Chợ Dầu" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Ông Hai rạng rỡ khoe khắp xóm tin làng Chợ Dầu kiên cường đánh giặc</span>
          </div>
        </div>

        <p>Bao nhiêu u uất dồn nén bỗng chốc tan biến khi chủ tịch xã tản cư cử người sang tìm ông Hai đính chính tin tức: Làng Chợ Dầu không hề theo giặc! Đó chỉ là tin đồn thất thiệt do bọn gián điệp tung ra. Ngược lại, dân quân làng Chợ Dầu đã anh dũng đánh lui nhiều đợt càn quét của quân Pháp!</p>

        <p>Cái mặt buồn thiu mọi ngày bỗng rạng rỡ hẳn lên. Ông Hai mua quà về chia cho các con, rồi tất tưởi chạy khắp làng khoe rầm rĩ bằng một nụ cười sung sướng tột bực:</p>

        <p>— Bác Thứ đâu rồi! Bác có biết tin gì chưa? Tây nó đốt nhà tôi rồi bác ạ! Đốt nhẵn! Đốt sạch sành sanh! Làng tôi kiên cường chống giặc, không đứa nào phản bội kháng chiến cả!</p>

        <p>Chi tiết nhà bị giặc đốt nhẵn mà ông Hai lại khoe với niềm tự hào vô biên chính là sự kết tinh kỳ diệu của lòng yêu nước: Đối với người nông dân cách mạng, danh dự của làng quê và sự toàn vẹn của lòng yêu nước còn quý giá hơn muôn vàn tài sản vật chất!</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Làng • Kim Lân ]</span></div>
    """,
    "criticism": "Kim Lân đã thể hiện sự am hiểu sâu sắc tâm hồn người nông dân Việt Nam. Nhân vật ông Hai là bức chân dung bất hủ về sự chuyển biến nhận thức vĩ đại: Tình yêu làng quê đã hòa quyện máu thịt vào tình yêu tổ quốc và lòng trung thành với ngọn cờ lãnh tụ.",
    "tags": ["Kim Lân", "Truyện ngắn", "Làng", "Kháng chiến chống Pháp", "SGK Lớp 9"]
  },

  # 6. CHIẾC LƯỢC NGÀ (Nguyễn Quang Sáng)
  {
    "id": "chiec-luoc-nga",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Chiếc Lược Ngà (Toàn Văn Truyện Ngắn)",
    "author": "Nguyễn Quang Sáng",
    "authorId": "nguyen-quang-sang",
    "category": "Truyện ngắn cách mạng",
    "era": "Văn học Kháng chiến chống Mỹ",
    "year": "1966",
    "readTime": "19 phút đọc • Toàn văn tác phẩm",
    "badge": "Tình Phụ Tử Bất Diệt",
    "image": "assets/images/scenes/chiecluocnga_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Cây lược ngà khắc dòng chữ kỷ niệm thiêng liêng trao lại cho người con gái Nam Bộ kiên cường.",
    "epigraph": "Yêu nhớ tặng Thu con của ba...",
    "excerpt": "Bản văn đầy đủ của câu chuyện cảm động bậc nhất về tình cha con thời chiến: Từ nỗi đau đớn khi bé Thu không nhận cha vì vết sẹo trên má, giây phút chia tay nghẹn ngào đến kỷ vật chiếc lược ngà thiêng liêng nơi chiến khu miền Tây Nam Bộ.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn: Trọng tâm phân tích là thái độ của bé Thu trước và sau khi biết nguồn gốc vết sẹo, cùng tình cảm phụ tử sâu nặng của ông Sáu.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Chiếc Lược Ngà (Nguyễn Quang Sáng)
          </span>
          <a href="#sgk-tieng-goi-ba" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến tiếng gọi 'Ba!' xé lòng (SGK Lớp 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Ba Ngày Nghỉ Phép & Nỗi Đau Trước Vết Sẹo Lạ Kỳ</h3>
        <p>Ông Sáu đi kháng chiến từ năm 1946, khi đứa con gái đầu lòng—bé Thu—mới chưa đầy một tuổi. Suốt tám năm ròng rã chiến đấu ở chiến trường miền Đông Nam Bộ, ông chỉ được nhìn mặt con qua tấm ảnh nhỏ chụp chung với mẹ.</p>

        <p>Đến năm 1954, được nghỉ phép ba ngày về thăm nhà trước khi tập kết ra Bắc, ông Sáu nôn nao khôn xiết. Con xuồng vừa cập bến, thấy đứa bé chừng tám tuổi đang chơi dưới bóng cây xoài, ông Sáu vội nhảy phắt lên bờ, dang rộng hai tay nghẹn ngào kêu: <em>“Thu! Ba đây con!”</em>.</p>

        <p>Ngờ đâu, nhìn thấy người đàn ông lạ mặt với vết sẹo dài đỏ ửng bên má co giật giần giật, bé Thu hoảng sợ thét lên: <em>“Má ơi! Má!”</em> rồi vụt chạy biến vào nhà. Suốt ba ngày phép ngắn ngủi, ông Sáu không đi đâu xa, chỉ quanh quẩn ở nhà vỗ về con. Nhưng bé Thu bướng bỉnh nhất quyết không chịu gọi một tiếng 'Ba'. Nó chỉ nói trổng: <em>“Cơm sôi rồi, nhão bây giờ!”</em>, hay khi nồi cơm sôi trào nước, nó cũng tự lấy muôi chắt nước chứ không chịu nhờ 'Ba'.</p>

        <p>Trong bữa cơm cuối cùng, ông Sáu gắp cho con một cái trứng cá to ngon nhất. Bất ngờ, bé Thu lấy đũa hất tung cái trứng cá ra mâm làm bắn cả cơm ra ngoài. Giận quá không kìm được, ông Sáu vung tay phát vào mông nó một cái. Bé Thu không khóc, lẳng lặng gắp lại trứng cá bỏ vào bát rồi bỏ sang nhà bà ngoại bên kia sông.</p>

        <h3 class="reader-chapter-title" id="sgk-tieng-goi-ba">Phần II: Giây Phút Chia Tay & Tiếng 'Ba!' Xé Lòng Của Bé Thu (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Chiếc Lược Ngà • Cao trào chia tay xúc động</span>
          </div>
          <p class="sgk-notice-desc">Khoảnh khắc vỡ òa của tình phụ tử thiêng liêng: Bé Thu nhận ra cha sau khi nghe bà ngoại giải thích về vết sẹo do chiến tranh tàn phá.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/chiecluocnga_chia_tay.svg" alt="Giây phút chia tay của bé Thu và ba" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Tiếng kêu 'Ba... a... a... ba!' xé lòng và vòng tay ôm chặt cổ cha của bé Thu</span>
          </div>
        </div>

        <p>Đêm hôm ấy ở nhà bà ngoại, nghe bà giải thích vết sẹo dài trên má ba là do bị giặc Pháp bắn bị thương trong một trận chiến đấu ác liệt để bảo vệ xóm làng, bé Thu nằm im thở dài như người lớn, ân hận khôn nguôi.</p>

        <p>Sáng hôm sau, giờ phút lên đường tòng quân đã đến. Bà con lối xóm tập trung rất đông tại bến sông chia tay đoàn cán bộ. Ông Sáu đứng giữa đám đông, mắt đau đáu nhìn con nhưng sợ con hoảng hốt nên chỉ khẽ gật đầu từ biệt:</p>

        <p>— Thôi! Ba đi nghe con!</p>

        <p>Bất ngờ, như có một luồng điện giật, bé Thu hét to một tiếng xé toạc không gian tĩnh lặng:<br>
        — Ba... a... a... ba!</p>

        <p>Tiếng kêu như xé ruột gan mọi người! Nó chạy xô đến, nhảy tót lên ôm chặt lấy cổ ba, hai chân quặp chặt lấy ngang lưng ba như con gấu con. Nó hôn tóc, hôn cổ, và hôn cả lên vết sẹo dài bên má ba mà hôm qua nó từng ghê sợ. Nó khóc nức nở van xin ba đừng đi. Nhưng nhiệm vụ cứu nước không thể chần chừ, ông Sáu lau nước mắt dỗ dành con, và trước khi xuồng rời bến, bé Thu dặn với theo một câu:</p>

        <p>— Ba về, ba mua cho con một cây lược nghe ba!</p>

        <h3 class="reader-chapter-title">Phần III: Chiếc Lược Ngà Nơi Chiến Khu & Kỷ Vật Trao Lại</h3>
        <p>Trở lại chiến trường rừng tràm rậm rạp, lời dặn của con gái luôn đau đáu trong lòng ông Sáu. Một ngày kia, trong một chuyến đi săn ven rừng, ông Sáu may mắn nhặt được một khúc ngà voi trắng muốt. Ông mừng rỡ như đứa trẻ nhặt được vàng!</p>

        <p>Những lúc rảnh rỗi sau giờ chiến đấu, ông Sáu ngồi cặm cụi lấy cưa cưa từng chiếc răng lược tỉ mẩn, cẩn trọng như một người thợ kim hoàn lành nghề. Trên sống lưng chiếc lược ngà, ông khắc từng nét chữ nắn nót thiêng liêng: <strong>“Yêu nhớ tặng Thu con của ba”</strong>. Chiếc lược ngà ấy đã xoa dịu đi nỗi nhớ con da diết trong lòng người chiến sĩ.</p>

        <p>Nhưng chiến tranh khốc liệt không chừa một ai. Trong một trận càn quét dữ dội của máy bay Mỹ, ông Sáu bị trúng đạn trọng thương. Trước khi nhắm mắt xuôi tay, ông không còn đủ sức nói thành lời, chỉ kịp thò tay vào túi áo ngực rút cây lược ngà trao vào tay người bạn thân—bác Ba—với ánh mắt gửi gắm thiêng liêng sau cùng.</p>

        <p>Nhiều năm sau, bác Ba đã trao tận tay cây lược ngà ấy cho bé Thu—nay đã trưởng thành, trở thành một cô giao liên dũng cảm trên tuyến đường Trường Sơn khói lửa, tiếp bước con đường cứu nước vẻ vang của người cha anh hùng.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Chiếc Lược Ngà • Nguyễn Quang Sáng ]</span></div>
    """,
    "criticism": "Chiếc Lược Ngà là khúc tráng ca đẫm nước mắt về tình phụ tử thiêng liêng. Chiến tranh có thể tàn phá thể xác và cướp đi sinh mệnh, nhưng tình yêu thương gia đình và lý tưởng cách mạng vẫn sống mãi ngàn đời qua kỷ vật thiêng liêng của người cha.",
    "tags": ["Nguyễn Quang Sáng", "Truyện ngắn", "Chiếc Lược Ngà", "Kháng chiến chống Mỹ", "SGK Lớp 9"]
  },

  # 7. LẶNG LẼ SA PA (Nguyễn Thành Long)
  {
    "id": "lang-le-sa-pa",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Lặng Lẽ Sa Pa (Toàn Văn Truyện Ngắn)",
    "author": "Nguyễn Thành Long",
    "authorId": "nguyen-thanh-long",
    "category": "Truyện ngắn trữ tình",
    "era": "Xây dựng Chủ nghĩa Xã hội ở miền Bắc",
    "year": "1970",
    "readTime": "17 phút đọc • Toàn văn tác phẩm",
    "badge": "Khúc Ca Cống Hiến",
    "image": "assets/images/scenes/langle_sapa_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Trạm khí tượng trên đỉnh Yên Sơn cao hai nghìn sáu trăm mét và cuộc gặp gỡ 30 phút kỳ diệu.",
    "epigraph": "Sa Pa lặng lẽ nhưng dưới vẻ lặng lẽ ấy có những con người đang ngày đêm cháy hết mình cho tổ quốc...",
    "excerpt": "Bản văn đầy đủ của truyện ngắn đậm chất thơ Nguyễn Thành Long: Khắc họa bức chân dung tuyệt đẹp của anh thanh niên làm công tác khí tượng kiêm vật lý địa cầu trên đỉnh Yên Sơn cùng những con người lao động vô danh thầm lặng cống hiến cho đất nước.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn: Trọng tâm phân tích là vẻ đẹp nhân cách, tinh thần trách nhiệm và niềm say mê lao động của anh thanh niên trên đỉnh Yên Sơn.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Lặng Lẽ Sa Pa (Nguyễn Thành Long)
          </span>
          <a href="#sgk-anh-thanh-nien" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cuộc gặp gỡ anh thanh niên (SGK Lớp 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Chuyến Xe Lên Sa Pa & Lời Giới Thiệu Về 'Người Cô Độc Nhất Thế Gian'</h3>
        <p>Chiếc xe khách rù rì leo dốc đưa đoàn hành khách rời thị xã Lào Cai hướng lên thị trấn Sa Pa mù sương. Trên xe có một ông họa sĩ già sắp về hưu đang đi tìm đề tài sáng tác cuối đời, một cô kỹ sư nông nghiệp trẻ tuổi mới tốt nghiệp xung phong lên miền núi công tác, và bác lái xe vui tính, niềm nở.</p>

        <p>Đến cây số 32, xe dừng lại lấy nước và nghỉ chân bên một trạm khí tượng trên đỉnh Yên Sơn cao 2.600 mét so với mặt nước biển. Bác lái xe hào hứng giới thiệu với ông họa sĩ và cô kỹ sư:<br>
        — Tôi sắp giới thiệu với bác một người cô độc nhất thế gian! Một anh chàng thanh niên hai mươi bảy tuổi sống một mình trên đỉnh núi bốn mùa mây phủ, thèm người đến mức thỉnh thoảng phải lăn cây chắn đường để được gặp người nói chuyện dăm ba câu!</p>

        <h3 class="reader-chapter-title" id="sgk-anh-thanh-nien">Phần II: Cuộc Gặp Gỡ 30 Phút Kỳ Diệu Trên Đỉnh Yên Sơn (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Lặng Lẽ Sa Pa • Bức chân dung anh thanh niên</span>
          </div>
          <p class="sgk-notice-desc">Vẻ đẹp lý tưởng sống cao đẹp của thanh niên Việt Nam thời kỳ xây dựng CNXH: Lòng say mê khoa học, tinh thần trách nhiệm và thái độ sống khiêm nhường, nhiệt thành.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/langle_tang_hoa.svg" alt="Anh thanh niên tặng hoa cho cô kỹ sư" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Anh thanh niên hồ hởi cắt tặng cô gái bó hoa lay-ơn rực rỡ và biếu làn trứng gà tươi</span>
          </div>
        </div>

        <p>Bước lên trạm khí tượng, khách ngỡ ngàng trước một thế giới ngăn nắp, tươi tắn: Một gian phòng nhỏ đầy sách khoa học, một góc vườn rực rỡ hoa thược dược, lay-ơn vàng, tím, đỏ thắm, và một đàn gà béo tốt mổ thóc quanh thềm.</p>

        <p>Anh thanh niên tiếp khách với tất cả sự cởi mở, chân thành. Anh hồ hởi cắt tặng cô gái một bó hoa to tướng, đưa gói củ tam thất biếu vợ bác lái xe vừa khỏi ốm. Công việc của anh là đo gió, đo mưa, đo nắng, tính mây và đo chấn động địa chất. Dù nửa đêm mưa tuyết giá rét đến mấy, đúng giờ 'ốp' là anh phải trèo lên giàn quan sát đo đạc rồi gửi báo cáo về trung tâm phục vụ chiến đấu và sản xuất.</p>

        <p>Khi ông họa sĩ hỏi về nỗi cô độc, anh thanh niên cười sảng khoái đáp:<br>
        — Khi ta làm việc, ta với công việc là đôi, sao gọi là một mình được? Huống chi việc của cháu gắn liền với việc của bao anh em dưới mặt đất. Gian khổ nhất là lúc nửa đêm thức dậy rét buốt, nhưng nghĩ đến việc một lần phát hiện đám mây khô giúp không quân ta bắn rơi máy bay Mỹ trên cầu Hàm Rồng, cháu thấy hạnh phúc vô cùng!</p>

        <p>Xúc động trước tâm hồn trong sáng ấy, ông họa sĩ già vội lấy sổ tay ký họa bức chân dung anh. Nhưng anh thanh niên vội vàng từ chối và giới thiệu những tấm gương xứng đáng hơn: Bác kỹ sư vườn rau Sa Pa hàng ngày thụ phấn cho từng búp su hào, hay đồng chí cán bộ nghiên cứu sét mười một năm không rời trạm để lập bản đồ sét cho đất nước.</p>

        <h3 class="reader-chapter-title">Phần III: Phút Chia Tay Bịn Rịn & Dư Vị Ngọt Ngào</h3>
        <p>Ba mươi phút trôi qua nhanh như một giấc chiêm bao. Giờ xe chạy đã điểm. Cô kỹ sư trẻ bước ra xe với bao xao xuyến trong lòng; trong cuốn sổ tay cô để quên chiếc khăn tay nhỏ làm kỷ niệm nhưng anh thanh niên thật thà chạy theo trả lại.</p>

        <p>Anh thanh niên ấn vào tay ông họa sĩ một làn trứng gà tươi để đoàn ăn trưa dọc đường, rồi đứng vẫy tay chào tạm biệt bên vườn hoa rực rỡ giữa làn mây trắng bảng lảng. Chuyến đi ngắn ngủi ấy đã để lại trong lòng mỗi người niềm tin yêu tha thiết vào cuộc đời và những con người đang âm thầm dâng hiến tuổi thanh xuân cho tổ quốc thân yêu.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Lặng Lẽ Sa Pa • Nguyễn Thành Long ]</span></div>
    """,
    "criticism": "Lặng Lẽ Sa Pa tựa như một bài thơ văn xuôi thanh lọc tâm hồn: Nguyễn Thành Long đã vẽ nên bức tranh trữ tình tuyệt đẹp về vẻ đẹp của con người lao động mới—những người không cần ồn ào mà lặng lẽ cống hiến cuộc đời cho non sông đất nước.",
    "tags": ["Nguyễn Thành Long", "Truyện ngắn", "Lặng Lẽ Sa Pa", "Lao động mới", "SGK Lớp 9"]
  },

  # 8. NHỮNG NGÔI SAO XA XÔI (Lê Minh Khuê)
  {
    "id": "nhung-ngoi-sao-xa-xoi",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Những Ngôi Sao Xa Xôi (Toàn Văn)",
    "author": "Lê Minh Khuê",
    "authorId": "le-minh-khue",
    "category": "Truyện ngắn hiện đại",
    "era": "Văn học Kháng chiến chống Mỹ",
    "year": "1971",
    "readTime": "21 phút đọc • Toàn văn tác phẩm",
    "badge": "Tuổi Trẻ Trường Sơn",
    "image": "assets/images/scenes/ngoisao_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Ba cô gái thanh niên xung phong quả cảm trên cao điểm Trường Sơn rực lửa bom đạn.",
    "epigraph": "Chúng tôi có một quả đồi và những cây thuốc nổ...",
    "excerpt": "Bản văn đầy đủ của truyện ngắn xuất sắc của Lê Minh Khuê: Khắc họa cuộc sống chiến đấu gian khổ, hiểm nguy nhưng tràn đầy lạc quan, dũng cảm và lãng mạn của ba cô gái tổ trinh sát mặt đường Phương Định, Nho, Thao trên tuyến đường Trường Sơn huyền thoại.",
    "fullTextStatus": "Toàn Văn Tác Phẩm",
    "sgkDetail": "Chương trình Ngữ Văn 9 giảng dạy trọn vẹn: Trọng tâm phân tích là vẻ đẹp tâm hồn nhân vật Phương Định trong một lần phá bom nổ chậm nghẹt thở và tình đồng đội gắn bó.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Tác Phẩm Những Ngôi Sao Xa Xôi (Lê Minh Khuê)
          </span>
          <a href="#sgk-pha-bom-cao-diem" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh phá bom nghẹt thở (SGK Lớp 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Ba Nữ Trinh Sát Mặt Đường Nơi Cao Điểm Trường Sơn</h3>
        <p>Chúng tôi gồm ba cô gái trẻ trong một tổ trinh sát mặt đường: chị Thao tổ trưởng, Nho và tôi—Phương Định. Nơi ở của chúng tôi là một cái hang đá dưới chân cao điểm trọng điểm trên tuyến đường Trường Sơn rực lửa bom đạn. Nơi đây, đất đá bị cày xới nham nhở, cây cối trụi lủi cháy đen thui, không một ngọn cỏ nào mọc nổi.</p>

        <p>Công việc hàng ngày của chúng tôi vô cùng nguy hiểm: Ngồi trên đài quan sát đếm từng quả bom rơi, lao ra mặt đường sau mỗi trận bom đánh dấu vị trí bom chưa nổ, và nếu cần thì tự tay đặt thuốc nổ phá bom để thông đường cho những đoàn xe vận tải ra tiền tuyến.</p>

        <p>Phương Định là một cô gái Hà Nội trẻ trung, nhạy cảm và giàu mơ mộng. Cô tự hào vì có bím tóc dày mềm mại, chiếc cổ cao kiêu hãnh và đôi mắt nhìn xa xăm được các anh chiến sĩ lái xe khen ngợi. Giữa bom đạn khốc liệt, Phương Định vẫn say mê hát những khúc tình ca và hồi tưởng về những kỷ niệm tuổi thơ êm đềm nơi góc phố Thủ đô.</p>

        <h3 class="reader-chapter-title" id="sgk-pha-bom-cao-diem">Phần II: Một Lần Phá Bom Nghẹt Thở & Tình Đồng Đội (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9)
            </span>
            <span class="sgk-meta">Văn bản: Những Ngôi Sao Xa Xôi • Phân cảnh phá bom nổ chậm</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật miêu tả tâm lý và cảm giác chi tiết đến từng khoảnh khắc: Lòng dũng cảm quả cảm, sự bình tĩnh phi thường và tình đồng đội gắn bó keo sơn nơi chiến trường ác liệt.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/ngoisao_pha_bom.svg" alt="Phương Định phá bom trên cao điểm" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Phương Định một mình bên quả bom nổ chậm — Phút giây cân não đếm từng giây bên lằn ranh sinh tử</span>
          </div>
        </div>

        <p>Một trận không kích vừa dứt. Khói bom còn nồng nặc khét lẹt. Phương Định nhận nhiệm vụ phá một quả bom nổ chậm nằm trơ trọi bên sườn đồi. Đất còn nóng ran, mảnh bom cắm sâu vào vách đá rỉ tanh mùi rỉ sắt.</p>

        <p>Phương Định một mình tiến lại gần quả bom. Quả bom nằm nghiêng, vỏ màu xám lạnh lùng. Thần chết đang ẩn nấp ngay dưới lớp gang sắt ấy. Cô dùng chiếc xẻng nhỏ cào đất quanh quả bom. Thỉnh thoảng chiếc xẻng chạm vào vỏ bom nghe 'keng' một tiếng sắc lạnh rợn người. Nhưng nghĩ đến ánh mắt dõi theo của các đồng đội từ đài quan sát, lòng tự trọng và ý chí kiên cường đã chiến thắng nỗi sợ hãi.</p>

        <p>Cô đặt gói thuốc nổ vào sát mép bom, rải dây cháy chậm rồi châm lửa ngòi nổ. Chạy thụt mạng về hầm trú ẩn, Phương Định nép sát người vào vách đất đếm từng giây... Một tiếng nổ chấn động đất trời rúng ráng vang lên! Đất đá rào rào trút xuống nóc hầm như mưa. Bom nổ thông đường thành công!</p>

        <p>Nhưng Nho bị mảnh bom văng vào lưng trọng thương. Trong hang đá, chị Thao và Phương Định cuống quýt rửa vết thương, tiêm thuốc và cho Nho uống từng ngụm sữa béo ngọt. Tình đồng đội giữa ba cô gái gắn bó bền chặt như ruột thịt máu mủ.</p>

        <h3 class="reader-chapter-title">Phần III: Cơn Mưa Đá Bất Chợt & Tâm Hồn Trong Sáng Của Tuổi Trẻ</h3>
        <p>Buổi chiều hôm ấy, một cơn mưa đá bất ngờ đổ xuống cao điểm Trường Sơn. Những viên đá trắng tinh, tròn xoe lộp độp rớt xuống thềm đá. Ba cô gái mừng rỡ ùa ra reo hò, nhặt từng viên đá mát lạnh bỏ vào miệng nhai giòn rụm như những đứa trẻ thơ.</p>

        <p>Cơn mưa đá qua đi nhanh như lúc nó đến, nhưng đã mang lại luồng sinh khí mát lành gột rửa mọi khói bụi đạn bom. Phương Định nhìn lên bầu trời đêm Trường Sơn: Những ngôi sao xa xôi lấp lánh như những đôi mắt dõi theo từng bước chân của đoàn quân ra trận. Đó chính là biểu tượng bất tử cho tâm hồn trong sáng, kiên cường và niềm tin thắng lợi của cả một thế hệ thanh niên Việt Nam thời đánh Mỹ.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn truyện ngắn Những Ngôi Sao Xa Xôi • Lê Minh Khuê ]</span></div>
    """,
    "criticism": "Lê Minh Khuê đã khắc họa thành công bức tượng đài tuổi trẻ Việt Nam thời chống Mỹ: Giữa gian khổ và hiểm nguy rình rập từng giây, tâm hồn những cô gái thanh niên xung phong vẫn ngời sáng tinh thần lạc quan, tình đồng đội sâu sắc và lòng quả cảm phi thường.",
    "tags": ["Lê Minh Khuê", "Truyện ngắn", "Những Ngôi Sao Xa Xôi", "Trường Sơn", "SGK Lớp 9"]
  },

  # 9. DẾ MÈN PHIÊU LƯU KÝ (Tô Hoài)
  {
    "id": "de-men-phieu-luu-ky",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Dế Mèn Phiêu Lưu Ký (Tuyển Bản Toàn Cảnh)",
    "author": "Tô Hoài",
    "authorId": "to-hoai",
    "category": "Truyện đồng thoại kinh điển",
    "era": "Văn học Hiện đại Việt Nam",
    "year": "1941",
    "readTime": "25 phút đọc • Tuyển bản toàn cảnh",
    "badge": "Kiệt Tác Thiếu Nhi",
    "image": "assets/images/scenes/demen_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Dế Mèn cường tráng kiêu hãnh với cặp càng mẫm bóng và chuyến phiêu lưu kỳ thú khắp thế giới loài vật.",
    "epigraph": "Biết nhìn nhận sai lầm và dấn thân phiêu lưu là khởi đầu của sự trưởng thành...",
    "excerpt": "Pho đồng thoại bất hủ của Tô Hoài: Từ 'Bài học đường đời đầu tiên' về tính kiêu căng trêu chị Cốc hại chết Dế Choắt đến hành trình kết nghĩa anh em cùng Dế Trũi và khát vọng muôn loài kết đoàn hòa bình.",
    "fullTextStatus": "Tuyển Bản Toàn Cảnh (3 Chương)",
    "sgkDetail": "Chương trình Ngữ Văn 6 giảng dạy trọn vẹn chương mở đầu 'Bài học đường đời đầu tiên' để giáo dục lòng khiêm tốn, sự nhân ái và thói kiêu căng hại mình hại người.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Tuyển Bản Toàn Cảnh Dế Mèn Phiêu Lưu Ký (Tô Hoài)
          </span>
          <a href="#sgk-bai-hoc-dau-tien" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến Bài học đường đời đầu tiên (SGK Lớp 6)
          </a>
        </div>

        <h3 class="reader-chapter-title" id="sgk-bai-hoc-dau-tien">Chương I: Bài Học Đường Đời Đầu Tiên (Trọng Tâm Giảng Dạy SGK Ngữ Văn 6)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 6)
            </span>
            <span class="sgk-meta">Văn bản: Bài học đường đời đầu tiên • Chương I</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật miêu tả thế giới loài vật sống động và bài học nhân sinh sâu sắc: Tính tự phụ, hung hăng kiêu ngạo sẽ phải trả giá bằng tính mạng của đồng loại và sự ân hận suốt đời.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/demen_bai_hoc.svg" alt="Dế Mèn và bài học đường đời đầu tiên" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Dế Mèn kiêu căng trêu chị Cốc dẫn đến cái chết oan uổng của Dế Choắt khốn khổ</span>
          </div>
        </div>

        <p>Tôi sống độc lập từ thuở bé. Ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn lắm. Chẳng bao lâu, tôi đã trở thành một chàng dế thanh niên cường tráng: Đôi càng tôi mẫm bóng, vuốt ở chân cứ cứng dần và nhọn hoắt. Mỗi khi tôi co cẳng lên đạp phanh phách vào các ngọn cỏ là những ngọn cỏ gãy rạp như có nhát dao lia qua. Đầu tôi to và nổi từng tảng rất bướng. Hai cái răng đen nhánh lúc nào cũng nhai ngoàm ngoạp như hai lưỡi liềm máy. Cặp râu tôi dài uốn cong một vẻ rất hùng dũng.</p>

        <p>Bởi tự phụ mình tài giỏi, tôi đâm ra kiêu ngạo, coi thường tất cả mọi người chung quanh. Hàng xóm của tôi là Dế Choắt—một anh chàng gầy gò ốm yếu, người dài lêu nghêu như gã nghiện thuốc phiện, cánh ngắn củn cẳn không che kín bụng. Dế Choắt xin thông ngách sang nhà tôi để phòng khi hoạn nạn, nhưng tôi hếch mũi quát mắng mỉa mai thậm tệ.</p>

        <p>Một buổi chiều nọ, thấy chị Cốc béo tròn đang rỉa lông rỉa cánh bên bờ đầm, tôi nổi máu tinh tướng rủ Dế Choắt trêu chị Cốc. Dế Choắt van lạy xin can nhưng tôi không nghe. Tôi chui ra cửa hang, cất giọng hát véo von trêu chọc:<br>
        <em>“Cái Cò, cái Vạc, cái Nông<br>
        Ba cái cùng béo vặt lông cái nào?<br>
        Vặt lông cái Cốc cho tao...”</em></p>

        <p>Hát xong, tôi chui tọt vào sâu trong hang nằm khểnh vắt chân chữ ngũ. Chị Cốc tức giận đỏ bừng mắt, nhìn quanh không thấy ai bèn xông đến cửa hang Dế Choắt mổ túi bụi vào lưng Choắt. Choắt yếu ớt không chạy thoát được, bị chị Cốc mổ gãy cả sống lưng rồi bay đi.</p>

        <p>Khi tôi bò sang thì Dế Choắt đã thoi thóp sắp chết. Choắt cầm tay tôi trăn trối một lời khuyên chân tình sâu sắc: <em>“Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn cũng mang vạ vào mình đấy...”</em>. Dế Choắt trút hơi thở cuối cùng. Tôi ôm xác bạn khóc nức nở, đắp cho Choắt một nấm mồ xanh cỏ và đứng lặng hàng giờ ân hận về bài học đường đời đầu tiên cay đắng.</p>

        <h3 class="reader-chapter-title">Chương II: Sa Vào Tay Hai Đứa Trẻ & Bài Học Về Tự Do</h3>
        <p>Sau cái chết của Dế Choắt, tôi quyết tâm rời bỏ bờ cỏ quê hương lên đường phiêu lưu khám phá thế giới. Nhưng chuyến đi đầu tiên đã gặp phải tai ương bất ngờ: Tôi sa vào tay hai đứa trẻ chăn trâu.</p>

        <p>Chúng nhốt tôi vào một chiếc lồng tre chật hẹp, bắt tôi chọi nhau với những chú dế khác để mua vui cho chúng. Sống trong cảnh tù đày mất tự do, dù được ăn ngon tôi vẫn thấy nhục nhã ê chề. Nhờ mưu trí và sự kiên trì, tôi đã cắn đứt nan lồng trốn thoát ra ngoài, thấu hiểu sâu sắc rằng: Không có thứ vàng ngọc nào quý giá bằng Tự Do!</p>

        <h3 class="reader-chapter-title">Chương III: Kết Nghĩa Cùng Dế Trũi & Lý Tưởng Muôn Loài Đoàn Kết</h3>
        <p>Trên đường phiêu lưu, tôi tình cờ cứu được Dế Trũi khỏi nanh vuốt của bầy Bọ Muỗm hung bạo. Hai chúng tôi tâm đầu ý hợp, bèn cắt cỏ thề nguyền kết nghĩa anh em cùng sinh cùng tử, cùng nhau đi khắp bốn phương trời để truyền bá lý tưởng cao đẹp: <strong>Muôn loài cùng kết nghĩa anh em, xóa bỏ hận thù, chung sống hòa bình trong tình thân ái!</strong></p>
        <div class="sgk-end-marker"><span>[ Kết thúc tuyển bản toàn cảnh Dế Mèn Phiêu Lưu Ký • Tô Hoài ]</span></div>
    """,
    "criticism": "Dế Mèn Phiêu Lưu Ký là kiệt tác đồng thoại vĩ đại của văn học thiếu nhi Việt Nam và thế giới: Tô Hoài đã lồng ghép khéo léo những bài học đạo đức làm người sâu sắc, tinh thần trượng nghĩa hào hiệp và khát vọng tự do đoàn kết toàn cầu vào thế giới côn trùng sống động.",
    "tags": ["Tô Hoài", "Đồng thoại", "Dế Mèn", "Thiếu nhi", "SGK Lớp 6"]
  },

  # 10. CHUYỆN NGƯỜI CON GÁI NAM XƯƠNG (Nguyễn Dữ)
  {
    "id": "chuyen-nguoi-con-gai-nam-xuong",
    "origin": "vn",
    "originLabel": "Văn học Việt Nam",
    "country": "Việt Nam",
    "title": "Chuyện Người Con Gái Nam Xương (Toàn Văn)",
    "author": "Nguyễn Dữ",
    "authorId": "nguyen-du-truyen-ky",
    "category": "Truyện truyền kỳ trung đại",
    "era": "Văn học Trung đại Việt Nam",
    "year": "Thế kỷ XVI",
    "readTime": "16 phút đọc • Toàn văn kiệt tác",
    "badge": "Kiệt Tác Truyền Kỳ",
    "image": "assets/images/scenes/namxuong_cover.svg",
    "imageCaption": "Khắc gỗ Editorial: Nàng Vũ Nương trầm mình nơi bến Hoàng Giang minh oan danh tiết và cuộc tao ngộ kỳ ảo cõi thủy cung.",
    "epigraph": "Lấy ngọc trâm cài hoa, trẫm mình sông Hoàng Giang minh oan danh tiết...",
    "excerpt": "Trích tập 'Truyền kỳ mạn lục' của Nguyễn Dữ: Câu chuyện bi thương về phẩm hạnh vẹn toàn nhưng số phận oan khiên của nàng Vũ Thị Thiết (Vũ Nương), cất lên tiếng nói tố cáo lễ giáo phong kiến bất công và ngợi ca phẩm giá cao đẹp của người phụ nữ.",
    "fullTextStatus": "Toàn Văn Kiệt Tác",
    "sgkDetail": "Chương trình Ngữ Văn 9 & Ngữ Văn 11 giảng dạy trọn vẹn kiệt tác này: Trọng tâm phân tích là bi kịch chiếc bóng oan khiên, phẩm hạnh của Vũ Nương và giá trị nhân đạo sâu sắc.",
    "content": """
        <div class="reader-fulltext-banner">
          <span class="reader-fulltext-tag">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Toàn Văn Kiệt Tác Chuyện Người Con Gái Nam Xương (Nguyễn Dữ)
          </span>
          <a href="#sgk-chiec-bong-oan-khien" class="reader-jump-sgk-btn">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Đến cảnh chiếc bóng oan khiên (SGK Lớp 9)
          </a>
        </div>

        <h3 class="reader-chapter-title">Phần I: Phẩm Hạnh Vẹn Toàn Của Vũ Nương & Buổi Tiễn Chồng Tòng Quân</h3>
        <p>Vũ Thị Thiết, người con gái quê ở Nam Xương, tính tình thùy mị, nết na, lại thêm tư dung tốt đẹp. Chàng Trương Sinh con nhà hào phú trong làng mến vì dung hạnh, xin với mẹ đem trăm lạng vàng cưới nàng về làm vợ. Trương Sinh tuy có tính đa nghi, đối với vợ phòng ngừa quá mức, nhưng Vũ Nương giữ gìn khuôn phép, ăn ở mực thước nên vợ chồng không từng xảy ra điều thất hòa.</p>

        <p>Hạnh phúc êm ấm chưa được bao lâu thì Trương Sinh phải tên ghi vào sổ lính đi đánh giặc Chiêm. Buổi tiễn chồng ra trận, Vũ Nương rót chén rượu đầy dâng lên, nghẹn ngào thưa:<br>
        — Chàng đi chuyến này, thiếp chẳng dám mong đeo được ấn phong hầu, mặc áo gấm trở về quê cũ, chỉ xin ngày về mang theo hai chữ bình yên, thế là thỏa lòng thiếp rồi...</p>

        <p>Sau khi chồng đi lính, Vũ Nương sinh được một đứa con trai đặt tên là Đản. Mẹ chồng già yếu vì nhớ thương con trai mà lâm bệnh nặng, Vũ Nương hết lòng chăm sóc, sắc thuốc bón cháo, lễ bái thần phật. Khi mẹ chồng mất, nàng lo liệu ma chay chu tất như với cha mẹ đẻ mình.</p>

        <h3 class="reader-chapter-title" id="sgk-chiec-bong-oan-khien">Phần II: Nỗi Oan Chiếc Bóng & Bi Kịch Bến Hoàng Giang (SGK 9)</h3>
        <div class="sgk-notice-box">
          <div class="sgk-notice-header">
            <span class="sgk-badge">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK Ngữ Văn 9 & 11)
            </span>
            <span class="sgk-meta">Văn bản: Chuyện người con gái Nam Xương • Bi kịch oan khuất</span>
          </div>
          <p class="sgk-notice-desc">Nghệ thuật thắt nút mở nút kịch tính kinh điển: Chi tiết 'chiếc bóng' vừa là chứng nhân cho tình yêu thương gia đình, vừa là mầm mống tai ương tố cáo bi kịch gia trưởng phong kiến độc đoán.</p>
        </div>

        <div class="chapter-illustration-frame">
          <img src="assets/images/scenes/namxuong_chiec_bong.svg" alt="Chiếc bóng trên vách của Vũ Nương" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh minh họa: Nàng Vũ Nương đêm đêm trỏ bóng mình trên vách bảo với bé Đản là cha Đản</span>
          </div>
        </div>

        <p>Năm sau giặc tan, Trương Sinh giải ngũ trở về nhà. Mẹ già đã khuất, chàng bế đứa con nhỏ đi thăm mộ mẹ. Đến bên mộ, đứa bé quấy khóc không chịu nhận Trương Sinh là cha, bảo:<br>
        — Ông cũng là cha tôi ư? Ông lại biết nói, chứ không như cha tôi trước kia chỉ nín thin thít!</p>

        <p>Trương Sinh kinh ngạc gặng hỏi, đứa bé ngây thơ đáp:<br>
        — Trước đây có một người đàn ông đêm nào cũng đến. Mẹ Đản đi cũng đi, mẹ Đản ngồi cũng ngồi, nhưng chẳng bao giờ bế Đản cả!</p>

        <p>Vốn sẵn tính đa nghi, lại ít học, nghe lời con trẻ Trương Sinh đinh ninh là vợ hư hỏng ngoại tình. Về đến nhà, chàng mắng nhiếc, đánh đập và đuổi Vũ Nương đi. Dù hàng xóm làng giềng hết lời khuyên can thanh minh, Trương Sinh một mực không nghe.</p>

        <p>Uất ức đến tột cùng vì tiết hạnh ba năm gìn giữ bị vấy bẩn, Vũ Nương tắm gội chay sạch, bước ra bến Hoàng Giang, ngửa mặt lên trời than khóc thề nguyền:<br>
        — Kẻ bạc mệnh này duyên phận hẩm hiu, bị chồng ruồng rẫy. Nếu thiếp giữ lòng trinh bạch, xin thần sông chứng giám: chìm xuống làm ngọc Mỵ Châu, nhảy xuống làm cỏ ngu mỹ. Nhược bằng lòng dạ trắc nết phụ chồng dối con, xin làm mồi cho cá tôm táng thân đáy bể!</p>

        <p>Nói xong, nàng gieo mình xuống dòng nước xiết tự vẫn. Linh Phi—vợ vua Nam Hải—thương nàng vô tội bèn sai thủy tộc rẽ nước cứu nàng đưa về động rùa thủy cung.</p>

        <h3 class="reader-chapter-title">Phần III: Oan Tình Sáng Tỏ & Cuộc Hội Ngộ Ảo Mộng Trên Sông</h3>
        <p>Một đêm sau đó, Trương Sinh ngồi bên ngọn đèn dầu cô độc, bé Đản chỉ vào chiếc bóng của chàng trên vách reo lên: <em>“Cha Đản lại đến kia kìa!”</em>. Bấy giờ Trương Sinh mới bàng hoàng tỉnh ngộ: Hóa ra chiếc bóng trên vách chính là 'người cha' mà đứa con nhắc đến trong những đêm Vũ Nương cô đơn dỗ con!</p>

        <p>Về sau, Phan Lang cùng làng gặp nạn được Linh Phi cứu sống, gặp Vũ Nương dưới thủy cung. Nàng gửi chiếc thoa vàng về cho chồng làm tin dặn lập đàn giải oan bên sông. Trương Sinh lập đàn tràng ba ngày ba đêm bên bến Hoàng Giang. Quả nhiên, Vũ Nương ngồi trên kiệu hoa thấp thoáng giữa dòng sông lộng lẫy cờ hoa rực rỡ. Nàng nói vọng vào bờ: <em>“Đa tạ tình chàng, thiếp chẳng thể trở về nhân gian được nữa!”</em> rồi trong chớp mắt biến mất vào làn sương khói mờ ảo.</p>
        <div class="sgk-end-marker"><span>[ Kết thúc toàn văn kiệt tác Chuyện Người Con Gái Nam Xương • Nguyễn Dữ ]</span></div>
    """,
    "criticism": "Nguyễn Dữ đã kết hợp tài tình chất hiện thực và yếu tố kỳ ảo truyền kỳ. Tác phẩm là tiếng chuông cảnh tỉnh về số phận bi kịch của người phụ nữ trong chế độ gia trưởng nam quyền hà khắc, đồng thời khẳng định phẩm giá sáng trong như ngọc của họ.",
    "tags": ["Nguyễn Dữ", "Truyền kỳ mạn lục", "Vũ Nương", "Trung đại", "SGK Lớp 9", "SGK Lớp 11"]
  }
]

print(f"Loaded Group 1: {len(WORKS_GROUP_1)} works.")
