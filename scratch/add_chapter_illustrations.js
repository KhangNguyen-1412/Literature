const fs = require('fs');

global.window = {};
eval(fs.readFileSync('js/data.js', 'utf8'));
const data = global.window.LITERARY_DATA;

function makeIllu(src, caption) {
  return `
        <div class="chapter-illustration-frame">
          <img src="${src}" alt="${caption}" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Minh họa: ${caption}</span>
          </div>
        </div>
  `;
}

// 1. TRUYỆN KIỀU (10 PHẦN)
const kieu = data.works.find(w => w.id === 'truyen-kieu');
if (kieu) {
  const illus = [
    { src: 'assets/images/kieu_ngung_bich.jpg', cap: 'Chân dung tuyệt thế giai nhân Thúy Kiều và Thúy Vân bên song cửa' },
    { src: 'assets/images/voi_vang.jpg', cap: 'Cảnh ngày xuân: Cỏ non xanh tận chân trời, cành lê trắng điểm một vài bông hoa' },
    { src: 'assets/images/author_study.jpg', cap: 'Kim Kiều hội ngộ và đêm thề nguyền dưới vầng trăng vằng vặc' },
    { src: 'assets/images/kieu_ngung_bich.jpg', cap: 'Đêm trao duyên đẫm nước mắt: Chiếc vành với bức tờ mây gửi lại cho em gái Thúy Vân' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Cạm bẫy Mã Giám Sinh và bi kịch rơi vào lầu xanh Tú Bà tại Lâm Tri' },
    { src: 'assets/images/kieu_ngung_bich.jpg', cap: 'Kiều ở lầu Ngưng Bích: Bẽ bàng mây sớm đèn khuya, ầm ầm tiếng sóng kêu quanh ghế ngồi' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Mối tình Thúc Sinh và cơn ghen sâu hiểm của Hoạn Thư tại Vô Tích' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Từ Hải chí khí anh hùng: Gươm đàn nửa gánh non sông, lên đường thẳng rong cõi bể' },
    { src: 'assets/images/trang_giang.jpg', cap: 'Báo ân báo oán và bi kịch gieo mình trẫm mình bảo toàn danh tiết bên dòng sông Tiền Đường' },
    { src: 'assets/images/author_study.jpg', cap: 'Mười lăm năm đoàn tụ Kim Kiều và khúc ca bất hủ về chữ Tâm chữ Tài' }
  ];

  let parts = kieu.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    // Chèn sau h3 hoặc sau sgk-notice-box nếu có
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  kieu.content = parts.join('');
}

// 2. SỐ ĐỎ (6 PHẦN)
const sodo = data.works.find(w => w.id === 'so-do');
if (sodo) {
  const illus = [
    { src: 'assets/images/so_do.jpg', cap: 'Xuân Tóc Đỏ nhặt banh sân quần và bước ngoặt định mệnh gặp gỡ bà Phó Đoan bên hồ Hoàn Kiếm' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Tiệm may Âu Hóa tân thời: Cuộc cải cách y phục phụ nữ ngây thơ táo bạo của vợ chồng Văn Minh' },
    { src: 'assets/images/author_study.jpg', cap: 'Xuân Tóc Đỏ trở thành danh y đốc tờ trường thuốc, được cả họ cụ Cố Hồng tôn sùng' },
    { src: 'assets/images/so_do.jpg', cap: 'Đám ma gương mẫu cụ Cố tổ: Điệp khúc kèn Ta, Tây, Tàu và tờ bạc năm đồng gấp tư hạ huyệt' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Trận thi đấu quần vợt quốc tế lịch sử với danh thủ Xiêm La trước vạn khán giả' },
    { src: 'assets/images/so_do.jpg', cap: 'Xuân Tóc Đỏ đăng đàn diễn thuyết, đón nhận Huân chương Bắc Đẩu Bội Tinh và danh hiệu Cứu Quốc' }
  ];

  let parts = sodo.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  sodo.content = parts.join('');
}

// 3. BIẾN THÂN (3 CHƯƠNG)
const bthan = data.works.find(w => w.id === 'bien-than');
if (bthan) {
  const illus = [
    { src: 'assets/images/kafka.jpg', cap: 'Chương I: Gregor Samsa thức dậy biến thành con bọ khổng lồ trong căn phòng chật hẹp tại Praha' },
    { src: 'assets/images/kafka.jpg', cap: 'Chương II: Cuộc sống bị giam cầm trong buồng kín và cơn thịnh nộ ném táo găm lưng của người cha' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Chương III: Tiếng đàn vĩ cầm của Grete, cái chết cô đơn trong đêm và buổi sáng giải thoát của gia đình' }
  ];

  let parts = bthan.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  bthan.content = parts.join('');
}

// 4. TRĂM NĂM CÔ ĐƠN (4 HỒI)
const tnam = data.works.find(w => w.id === 'tram-nam-co-don');
if (tnam) {
  const illus = [
    { src: 'assets/images/macondo.jpg', cap: 'Hồi I: Ngôi làng Macondo sơ khai và phát minh khối nước đá kỳ diệu của người Di-gan Melquíades' },
    { src: 'assets/images/author_study.jpg', cap: 'Hồi II: Ba mươi hai cuộc nội chiến của Đại tá Aureliano Buendía và xưởng kim hoàn đúc cá vàng' },
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Hồi III: Chuyến tàu 200 toa chở 3.000 công nhân đồn điền chuối bị thảm sát và trận mưa gần 5 năm' },
    { src: 'assets/images/macondo.jpg', cap: 'Hồi IV: Đứa trẻ đuôi lợn, giải mã tập giấy da tiếng Phạn và cơn bão cát nhiệt đới xóa sổ Macondo' }
  ];

  let parts = tnam.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  tnam.content = parts.join('');
}

// 5. ÔNG GIÀ VÀ BIỂN CẢ (4 HỒI)
const oggia = data.works.find(w => w.id === 'ong-gia-va-bien-ca');
if (oggia) {
  const illus = [
    { src: 'assets/images/trang_giang.jpg', cap: 'Hồi I: Tám mươi tư ngày trắng tay và chuyến giương buồm vượt xa bờ của lão ngư Santiago' },
    { src: 'assets/images/santiago_marlin.jpg', cap: 'Hồi II: Cuộc giằng co sinh tử hai ngày hai đêm với con cá kiếm khổng lồ vĩ đại trên dòng Gulf Stream' },
    { src: 'assets/images/santiago_marlin.jpg', cap: 'Hồi III: Santiago chiến đấu ngoan cường với bầy cá mập dữ tợn và tuyên ngôn bất khuất của con người' },
    { src: 'assets/images/trang_giang.jpg', cap: 'Hồi IV: Trở về với bộ xương trắng 18 bộ bên mạn thuyền và giấc mơ về những con sư tử trắng châu Phi' }
  ];

  let parts = oggia.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  oggia.content = parts.join('');
}

// 6. NGƯỜI THẦY ĐẦU TIÊN (4 HỒI)
const nthay = data.works.find(w => w.id === 'nguoi-thay-dau-tien');
if (nthay) {
  const illus = [
    { src: 'assets/images/trang_giang.jpg', cap: 'Hồi I: Hai cây phong sinh đôi trên đồi làng Ku-ku-rêu và bức tranh còn dang dở của người họa sĩ' },
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Hồi II: Thầy Đuy-sen tự tay dựng trường chuồng ngựa cũ và cõng học trò qua dòng suối băng mùa đông' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Hồi III: Thầy Đuy-sen dũng cảm giải cứu An-tư-nai khỏi cuộc hôn nhân ép buộc và tiễn em lên chuyến tàu' },
    { src: 'assets/images/author_study.jpg', cap: 'Hồi IV: Bức thư sám hối và tri ân sâu sắc của Viện sĩ An-tư-nai gửi về bản làng quê hương' }
  ];

  let parts = nthay.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  nthay.content = parts.join('');
}

// 7. CHÍ PHÈO (5 PHẦN)
const cpheo = data.works.find(w => w.id === 'chi-pheo');
if (cpheo) {
  const illus = [
    { src: 'assets/images/chi_pheo.jpg', cap: 'Phần I: Tiếng chửi say khướt ngật ngưỡng của Chí Phèo trên đường làng Vũ Đại lúc hoàng hôn' },
    { src: 'assets/images/author_study.jpg', cap: 'Phần II: Chí Phèo thuở hai mươi hiền như đất, làm canh điền cho nhà lý trưởng Bá Kiến' },
    { src: 'assets/images/chi_pheo.jpg', cap: 'Phần III: Đêm trăng vườn chuối và bát cháo hành nghi ngút khói của Thị Nở thức tỉnh linh hồn lương thiện' },
    { src: 'assets/images/chi_pheo.jpg', cap: 'Phần IV: Lời phũ phàng của bà cô xua đuổi, Chí Phèo ôm mặt khóc rưng rức bên chai rượu' },
    { src: 'assets/images/chi_pheo.jpg', cap: 'Phần V: Ai cho tao lương thiện? Mũi dao định mệnh kết liễu Bá Kiến và bi kịch quằn quại của kiếp người' }
  ];

  let parts = cpheo.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  cpheo.content = parts.join('');
}

// 8. CHỮ NGƯỜI TỬ TÙ (4 PHẦN)
const hcao = data.works.find(w => w.id === 'chu-nguoi-tu-tu');
if (hcao) {
  const illus = [
    { src: 'assets/images/huan_cao.jpg', cap: 'Phần I: Viên quản ngục nhận công văn giải tử tù Huấn Cao—bậc danh sĩ tài hoa nổi tiếng chống triều đình' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Phần II: Huấn Cao thúc rệp đạp gông sắt hiên ngang bước vào ngục tối nhà giam tỉnh Sơn' },
    { src: 'assets/images/author_study.jpg', cap: 'Phần III: Nỗi trăn trở biệt nhỡn liên tài và tấm lòng yêu cái đẹp của viên quản ngục' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Phần IV: Cảnh cho chữ vô tiền khoáng hậu: Ngọn đuốc đỏ rực, tấm lụa bạch nguyên vẹn và lời răn thanh cao' }
  ];

  let parts = hcao.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  hcao.content = parts.join('');
}

// 9. LÃO HẠC (3 PHẦN)
const lhac = data.works.find(w => w.id === 'lao-hac');
if (lhac) {
  const illus = [
    { src: 'assets/images/lao_hac.jpg', cap: 'Phần I: Lão Hạc và con Vàng—kỷ vật duy nhất của đứa con trai đi đồn điền cao su biền biệt' },
    { src: 'assets/images/lao_hac.jpg', cap: 'Phần II: Nỗi ân hận xé lòng của Lão Hạc sang nhà ông giáo sau khi bán con chó Vàng' },
    { src: 'assets/images/lao_hac.jpg', cap: 'Phần III: Cái chết dữ dội bằng bả chó và nhân cách trong sạch cao thượng của một người cha nghèo' }
  ];

  let parts = lhac.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  lhac.content = parts.join('');
}

// 10. HAI ĐỨA TRẺ (3 PHẦN)
const hdtre = data.works.find(w => w.id === 'hai-dua-tre');
if (hdtre) {
  const illus = [
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Phần I: Chiều tàn trên phố huyện nghèo: Tiếng trống thu không và mùi âm ẩm của đất chợ' },
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Phần II: Những kiếp người tàn tạ trong bóng đêm mịt mùng: Mẹ con chị Tí và gánh phở bác Siêu' },
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Phần III: Chuyến tàu đêm rực sáng từ Hà Nội vút qua mang theo thế giới lấp lánh của ước mơ' }
  ];

  let parts = hdtre.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  hdtre.content = parts.join('');
}

// 11. ĐỜI THỪA (3 PHẦN)
const dthua = data.works.find(w => w.id === 'doi-thua');
if (dthua) {
  const illus = [
    { src: 'assets/images/author_study.jpg', cap: 'Phần I: Hoài bão lớn lao của nhà văn Hộ về một tác phẩm đoạt giải Nobel để đời cho nhân loại' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Phần II: Bi kịch cơm áo gạo tiền nghiền nát nghệ thuật và nỗi dày vò lương tâm khi viết văn cẩu thả' },
    { src: 'assets/images/author_study.jpg', cap: 'Phần III: Nước mắt sám hối của Hộ ôm người vợ tảo tần Từ trong đêm say mệt mỏi' }
  ];

  let parts = dthua.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  dthua.content = parts.join('');
}

// 12. TÔI ĐI HỌC (3 PHẦN)
const tdhoc = data.works.find(w => w.id === 'toi-di-hoc');
if (tdhoc) {
  const illus = [
    { src: 'assets/images/editorial_cover.jpg', cap: 'Phần I: Buổi mai sương thu gió lạnh: Bàn tay ấm áp của mẹ dắt con trên con đường làng dài và hẹp' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Phần II: Sân trường làng Mỹ Lý ngày tựu trường rộn rã và tiếng gọi tên run rẩy của ông đốc' },
    { src: 'assets/images/editorial_cover.jpg', cap: 'Phần III: Bước vào lớp học đầu đời: Mùi vôi mới, tiếng chim non ngoài song và trang vở đầu tiên' }
  ];

  let parts = tdhoc.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  tdhoc.content = parts.join('');
}

// 13. VỘI VÀNG (3 KHỔ)
const vvang = data.works.find(w => w.id === 'voi-vang');
if (vvang) {
  const illus = [
    { src: 'assets/images/voi_vang.jpg', cap: 'Khổ I: Tôi muốn tắt nắng đi, tôi muốn buộc gió lại để giữ mãi hương sắc cuộc đời tươi trẻ' },
    { src: 'assets/images/voi_vang.jpg', cap: 'Khổ II: Vườn xuân mơn mởn: Ong bướm tuần tháng mật, hoa của đồng nội xanh rì, khúc tình si' },
    { src: 'assets/images/voi_vang.jpg', cap: 'Khổ III: Mau đi thôi mùa chưa ngả chiều hôm: Ta muốn ôm, muốn riết, muốn say, muốn thâu mùa xuân chín' }
  ];

  let parts = vvang.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  vvang.content = parts.join('');
}

// 14. TRÀNG GIANG (2 KHỔ)
const tgiang = data.works.find(w => w.id === 'trang-giang');
if (tgiang) {
  const illus = [
    { src: 'assets/images/trang_giang.jpg', cap: 'Phần I: Sóng gợn tràng giang buồn điệp điệp, con thuyền xuôi mái nước song song, củi một cành khô' },
    { src: 'assets/images/trang_giang.jpg', cap: 'Phần II: Lớp lớp mây cao đùn núi bạc, chim nghiêng cánh nhỏ bóng chiều sa, lòng quê dợn dợn vời con nước' }
  ];

  let parts = tgiang.content.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const illuData = illus[i - 1] || illus[0];
    const illuHtml = makeIllu(illuData.src, illuData.cap);
    if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
      parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
    } else {
      parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
    }
  }
  tgiang.content = parts.join('');
}

// Ghi đè lại file js/data.js
const outputCode = 'const LITERARY_DATA = ' + JSON.stringify(data, null, 2) + ';\n\nwindow.LITERARY_DATA = LITERARY_DATA;\n';
fs.writeFileSync('js/data.js', outputCode, 'utf8');

console.log('SUCCESS: All chapters and acts now have dedicated illustrations!');
