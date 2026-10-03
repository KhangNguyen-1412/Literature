const fs = require('fs');
const path = require('path');

global.window = {};
eval(fs.readFileSync('js/data.js', 'utf8'));
const data = global.window.LITERARY_DATA;

function makeIllu(src, caption) {
  return `
        <div class="chapter-illustration-frame">
          <img src="${src}" alt="${caption}" class="chapter-illustration-img" loading="lazy">
          <div class="chapter-illustration-caption">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Tranh vẽ minh họa: ${caption}</span>
          </div>
        </div>
  `;
}

function updateWorkWithJpgs(workId, sceneList) {
  const work = data.works.find(w => w.id === workId);
  if (!work) return;

  // Xóa khung minh họa cũ
  let cleanContent = work.content.replace(/<div class="chapter-illustration-frame">[\s\S]*?<\/div>\s*<\/div>/g, '');

  let parts = cleanContent.split(/(?=<h3 class="reader-chapter-title")/);
  for (let i = 1; i < parts.length; i++) {
    const item = sceneList[i - 1];
    if (item) {
      let finalSrc = item.src;
      // Nếu có tệp jpg tương ứng thì ưu tiên dùng jpg
      const jpgCandidate = item.src.replace('.svg', '.jpg');
      if (fs.existsSync(jpgCandidate)) {
        finalSrc = jpgCandidate;
      }
      const illuHtml = makeIllu(finalSrc, item.cap);
      if (parts[i].includes('</div>\n\n        <p>') || parts[i].includes('</div>\n        <p>')) {
        parts[i] = parts[i].replace(/<\/div>(\s*<p>)/, '</div>' + illuHtml + '$1');
      } else {
        parts[i] = parts[i].replace(/(<h3 class="reader-chapter-title"[^>]*>.*?<\/h3>)/, '$1' + illuHtml);
      }
    }
  }
  work.content = parts.join('');
}

// Map tất cả 14 tác phẩm
const mappings = {
  'truyen-kieu': [
    { src: 'assets/images/scenes/kieu_chi_em.jpg', cap: 'Chân dung Thúy Vân và Thúy Kiều kiều diễm ôm đàn hồ cầm' },
    { src: 'assets/images/scenes/kieu_thanh_minh.jpg', cap: 'Tiết Thanh minh & nấm mồ vô chủ Đạm Tiên bên dòng suối' },
    { src: 'assets/images/scenes/kieu_the_nguyen.jpg', cap: 'Đêm thề nguyền Kim Kiều dưới vầng trăng vằng vặc giữa trời' },
    { src: 'assets/images/scenes/kieu_trao_duyen.jpg', cap: 'Đêm trao duyên xót xa: Trao lại chiếc vành và bức tờ mây cho Thúy Vân' },
    { src: 'assets/images/scenes/kieu_ma_giam_sinh.jpg', cap: 'Mã Giám Sinh ghế trên ngồi tót sỗ sàng, cò kè bớt một thêm hai' },
    { src: 'assets/images/kieu_ngung_bich.jpg', cap: 'Kiều ở lầu Ngưng Bích trông ra cửa bể chiều hôm hoa trôi man mác' },
    { src: 'assets/images/scenes/kieu_hoan_thu.jpg', cap: 'Cơn ghen Hoạn Thư ép Kiều quỳ hầu rượu gảy đàn tại Quan Âm Các' },
    { src: 'assets/images/scenes/kieu_tu_hai.jpg', cap: 'Từ Hải râu hùm vai rộng, gươm báu ngựa chiến tiễn biệt xuất quân' },
    { src: 'assets/images/scenes/kieu_tien_duong.jpg', cap: 'Trầm mình sông Tiền Đường sóng bạc cuộn trào và thuyền sư Giác Duyên' },
    { src: 'assets/images/scenes/kieu_doan_tu.jpg', cap: 'Mười lăm năm đoàn tụ Kim Kiều và chữ Tâm bằng ba chữ Tài' }
  ],
  'so-do': [
    { src: 'assets/images/scenes/sodo_nhat_banh.jpg', cap: 'Xuân Tóc Đỏ nhặt banh sân quần gặp bà Phó Đoan bên hồ Gươm' },
    { src: 'assets/images/scenes/sodo_tiem_may.jpg', cap: 'Tiệm may Âu Hóa tân thời: Cuộc cải cách y phục ngây thơ của Văn Minh' },
    { src: 'assets/images/scenes/sodo_doc_to.jpg', cap: 'Xuân Tóc Đỏ làm đốc tờ sờ mạch cụ Cố tổ, bàn đèn cụ Cố Hồng' },
    { src: 'assets/images/so_do.jpg', cap: 'Đám ma gương mẫu cụ Cố tổ kèn Ta Tây Tàu và tờ bạc năm đồng gấp tư' },
    { src: 'assets/images/scenes/sodo_tennis.jpg', cap: 'Trận quần vợt quốc tế lịch sử với danh thủ Xiêm La trước vạn khán giả' },
    { src: 'assets/images/scenes/sodo_bac_dau.jpg', cap: 'Xuân Tóc Đỏ đăng đàn diễn thuyết cứu quốc, nhận Huân chương Bắc Đẩu Bội Tinh' }
  ],
  'bien-than': [
    { src: 'assets/images/kafka.jpg', cap: 'Chương I: Gregor Samsa thức dậy biến thành con bọ khổng lồ trong phòng kín' },
    { src: 'assets/images/scenes/kafka_qua_tao.jpg', cap: 'Chương II: Người cha nổi cơn thịnh nộ ném những quả táo đỏ găm vào lưng Gregor' },
    { src: 'assets/images/scenes/kafka_vi_cam.jpg', cap: 'Chương III: Tiếng đàn vĩ cầm của Grete và buổi sáng mùa xuân giải thoát thanh thản' }
  ],
  'tram-nam-co-don': [
    { src: 'assets/images/macondo.jpg', cap: 'Hồi I: Ngôi làng Macondo nguyên sơ và phép lạ khối nước đá của Melquíades' },
    { src: 'assets/images/scenes/macondo_chien_tranh.jpg', cap: 'Hồi II: Ba mươi hai cuộc nội chiến của Đại tá Aureliano và xưởng đúc cá vàng' },
    { src: 'assets/images/scenes/macondo_tham_sat.jpg', cap: 'Hồi III: Thảm sát 3.000 công nhân đồn điền chuối ga xe lửa và trận mưa gần 5 năm' },
    { src: 'assets/images/scenes/macondo_bao_loc.jpg', cap: 'Hồi IV: Đứa trẻ đuôi lợn bị kiến tha và cơn bão cát xóa sổ Macondo vĩnh viễn' }
  ],
  'ong-gia-va-bien-ca': [
    { src: 'assets/images/scenes/santiago_ra_khoi.jpg', cap: 'Hồi I: 84 ngày trắng tay và chuyến giương buồm rách vượt xa bờ ngoài Gulf Stream' },
    { src: 'assets/images/santiago_marlin.jpg', cap: 'Hồi II: Giằng co sinh tử hai ngày đêm với con cá kiếm khổng lồ nhảy vọt trên sóng' },
    { src: 'assets/images/scenes/santiago_ca_map.jpg', cap: 'Hồi III: Santiago chiến đấu ngoan cường với bầy cá mập dữ tợn giữa đại dương' },
    { src: 'assets/images/scenes/santiago_su_tu.jpg', cap: 'Hồi IV: Trở về với bộ xương trắng 18 bộ và giấc mơ những con sư tử trắng châu Phi' }
  ],
  'nguoi-thay-dau-tien': [
    { src: 'assets/images/scenes/duysen_hai_cay_phong.jpg', cap: 'Hồi I: Hai cây phong sinh đôi trên đồi làng Ku-ku-rêu đón gió ngàn thảo nguyên' },
    { src: 'assets/images/scenes/duysen_qua_suoi.jpg', cap: 'Hồi II: Thầy Đuy-sen cõng học trò nghèo qua dòng suối băng mùa đông lạnh buốt' },
    { src: 'assets/images/scenes/duysen_giai_cuu.jpg', cap: 'Hồi III: Giải cứu An-tư-nai khỏi cuộc hôn nhân ép buộc và chuyến tàu thành phố' },
    { src: 'assets/images/scenes/duysen_buc_thu.jpg', cap: 'Hồi IV: Bức thư sám hối và lòng tri ân sâu sắc của Viện sĩ An-tư-nai gửi về bản làng' }
  ],
  'chi-pheo': [
    { src: 'assets/images/scenes/chipheo_tieng_chui.jpg', cap: 'Phần I: Tiếng chửi say khướt ngật ngưỡng của Chí Phèo trên đường làng Vũ Đại' },
    { src: 'assets/images/scenes/chipheo_canh_dien.jpg', cap: 'Phần II: Chí Phèo thuở hai mươi hiền như đất, làm canh điền cày ruộng cho Bá Kiến' },
    { src: 'assets/images/chi_pheo.jpg', cap: 'Phần III: Bát cháo hành nghi ngút khói của Thị Nở đánh thức linh hồn lương thiện' },
    { src: 'assets/images/scenes/chipheo_tuyet_vong.jpg', cap: 'Phần IV: Bị bà cô cự tuyệt, Chí Phèo ôm mặt khóc rưng rức bên chai rượu trắng' },
    { src: 'assets/images/scenes/chipheo_ket_lieu.jpg', cap: 'Phần V: Mũi dao oan nghiệt đòi lương thiện kết liễu Bá Kiến trong đêm' }
  ],
  'chu-nguoi-tu-tu': [
    { src: 'assets/images/scenes/huancao_cong_van.jpg', cap: 'Phần I: Quản ngục nhận công văn giải đại ngục tử tù nguy hiểm Huấn Cao' },
    { src: 'assets/images/scenes/huancao_dap_gong.jpg', cap: 'Phần II: Huấn Cao hiên ngang giơ gông gỗ nặng thúc rệp rầm rập xuống thềm đá' },
    { src: 'assets/images/scenes/huancao_quan_nguc.jpg', cap: 'Phần III: Nỗi trăn trở biệt nhỡn liên tài và lòng say mê cái đẹp của viên quản ngục' },
    { src: 'assets/images/huan_cao.jpg', cap: 'Phần IV: Cảnh cho chữ vô tiền khoáng hậu: Đuốc đỏ rực, lụa bạch và lời răn thanh cao' }
  ],
  'lao-hac': [
    { src: 'assets/images/lao_hac.jpg', cap: 'Phần I: Lão Hạc và con chó Vàng bên hiên nhà tranh những ngày côi cút' },
    { src: 'assets/images/scenes/laohac_ban_cho.jpg', cap: 'Phần II: Nỗi ân hận xé lòng của Lão Hạc sang nhà ông giáo sau khi bán cậu Vàng' },
    { src: 'assets/images/scenes/laohac_cai_chet.jpg', cap: 'Phần III: Cái chết dữ dội bằng bả chó để giữ trọn mảnh vườn ba sào cho con' }
  ],
  'hai-dua-tre': [
    { src: 'assets/images/scenes/haiduatre_chieu_tan.jpg', cap: 'Phần I: Chiều tàn trên phố huyện nghèo, tiếng trống thu không và mẹ con chị Tí' },
    { src: 'assets/images/scenes/haiduatre_bong_toi.jpg', cap: 'Phần II: Đêm tối tịch mịch phố huyện, bếp than đỏ rực gánh phở bác Siêu bập bùng' },
    { src: 'assets/images/hai_dua_tre.jpg', cap: 'Phần III: Chuyến tàu đêm rực sáng từ Hà Nội vút qua mang theo thế giới ước mơ' }
  ],
  'doi-thua': [
    { src: 'assets/images/author_study.jpg', cap: 'Phần I: Hoài bão lớn lao của nhà văn Hộ về một tác phẩm văn chương để đời' },
    { src: 'assets/images/scenes/doithua_com_ao.jpg', cap: 'Phần II: Bi kịch cơm áo gạo tiền nghiền nát nghệ thuật và nỗi đau viết văn cẩu thả' },
    { src: 'assets/images/scenes/doithua_sam_hoi.jpg', cap: 'Phần III: Nước mắt sám hối của Hộ ôm chặt người vợ tảo tần Từ trong đêm say mệt mỏi' }
  ],
  'toi-di-hoc': [
    { src: 'assets/images/scenes/toidihoc_me_dat_tay.jpg', cap: 'Phần I: Buổi mai sương thu gió lạnh: Bàn tay ấm áp của mẹ dắt con đến trường trên con đường làng' },
    { src: 'assets/images/scenes/toidihoc_san_truong.jpg', cap: 'Phần II: Sân trường Mỹ Lý ngày tựu trường rộn rã và tiếng gọi tên trang nghiêm của ông Đốc' },
    { src: 'assets/images/scenes/toidihoc_lop_hoc.jpg', cap: 'Phần III: Bước vào lớp học đầu đời thơm mùi vôi và trang vở nắn nót những nét chữ cái đầu tiên' }
  ],
  'voi-vang': [
    { src: 'assets/images/scenes/voivang_tat_nang.jpg', cap: 'Khổ I: Tôi muốn tắt nắng đi, buộc gió lại để giữ mãi hương sắc cuộc đời tươi trẻ' },
    { src: 'assets/images/voi_vang.jpg', cap: 'Khổ II: Vườn xuân mơn mởn: Ong bướm tuần tháng mật, hoa đồng nội xanh rì khúc tình si' },
    { src: 'assets/images/scenes/voivang_om_xuan.jpg', cap: 'Khổ III: Mau đi thôi mùa chưa ngả chiều hôm, ta muốn ôm ghì lấy sự sống xuân chín' }
  ],
  'trang-giang': [
    { src: 'assets/images/trang_giang.jpg', cap: 'Phần I: Sóng gợn tràng giang buồn điệp điệp, con thuyền xuôi mái nước song song [SGK]' },
    { src: 'assets/images/scenes/tranggiang_nui_bac.jpg', cap: 'Phần II: Lớp lớp mây cao đùn núi bạc, chim nghiêng cánh nhỏ bóng chiều sa, lòng quê dợn dợn nhớ nhà' }
  ]
};

for (const [wId, sList] of Object.entries(mappings)) {
  updateWorkWithJpgs(wId, sList);
}

const outputCode = 'const LITERARY_DATA = ' + JSON.stringify(data, null, 2) + ';\n\nwindow.LITERARY_DATA = LITERARY_DATA;\n';
fs.writeFileSync('js/data.js', outputCode, 'utf8');
console.log('SUCCESS: Updated js/data.js with realistic fine art JPG paintings!');
