const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../js/admin.js');
let code = fs.readFileSync(targetFile, 'utf8');

// Strip previous failed insert if present
const patternStart = '\n  loadErasData() {';
const patternEnd = 'this.users = defaultUsers;\n  }\n';
const idxStart = code.indexOf(patternStart);
if (idxStart !== -1) {
  const idxEnd = code.indexOf(patternEnd, idxStart);
  if (idxEnd !== -1) {
    code = code.substring(0, idxStart) + code.substring(idxEnd + patternEnd.length);
    console.log('Cleaned previous insert. Size now:', code.length);
  }
}

// 1. DATA LOADERS CODE (All internal quotes use double-quotes or escaped quotes)
const loadersCode = `
  loadErasData() {
    const defaultEras = [
      {
        id: 'dan-gian',
        name: 'Văn học Dân gian',
        years: 'Khởi thủy – đến nay',
        icon: '📜',
        desc: 'Kho tàng truyền miệng của nhân dân lao động (ca dao, tục ngữ, thần thoại, truyền thuyết, cổ tích, chèo, tuồng). Đậm đà bản sắc nhân văn, đúc kết đạo lý và ước mơ công lý.',
        keyAuthors: 'Nhân dân lao động, tác giả dân gian',
        filterKeys: 'dân gian, ca dao, thần thoại, truyền thuyết, cổ tích, đăm săn, an dương vương',
        featuredWorks: ['Chuyện người con gái Nam Xương (dị bản dân gian)', 'Truyền thuyết An Dương Vương', 'Ca dao than thân - tình nghĩa', 'Sử thi Đăm Săn']
      },
      {
        id: 'trung-dai',
        name: 'Văn học Trung đại (TK X – hết TK XIX)',
        years: 'Thế kỷ X – XIX',
        icon: '🏛️',
        desc: 'Văn học viết bằng chữ Hán và chữ Nôm. Đề cao chủ nghĩa yêu nước nồng nàn, tinh thần tự tôn dân tộc, cảm hứng thế sự và chủ nghĩa nhân đạo sâu sắc của tiền nhân.',
        keyAuthors: 'Nguyễn Trãi, Nguyễn Du, Đoàn Thị Điểm, Hồ Xuân Hương, Nguyễn Đình Chiểu, Nguyễn Khuyến, Tú Xương',
        filterKeys: 'trung đại, nguyễn du, truyện kiều, nam quốc sơn hà, bình ngô đại cáo, lục vân tiên, chinh phụ ngâm, nguyễn trãi',
        featuredWorks: ['Truyện Kiều', 'Bình Ngô đại cáo', 'Hịch tướng sĩ', 'Nam quốc sơn hà', 'Chuyện người con gái Nam Xương', 'Văn tế nghĩa sĩ Cần Giuộc']
      },
      {
        id: 'giao-thoi-1900-1930',
        name: 'Văn học Giao thời & Đầu TK XX (1900 – 1930)',
        years: '1900 – 1930',
        icon: '🕰️',
        desc: 'Giai đoạn chuyển giao từ Hán Nôm sang Quốc ngữ. Phong trào Duy Tân, văn thơ chí sĩ yêu nước và bước đầu hình thành nền báo chí, tiểu thuyết, văn xuôi hiện đại.',
        keyAuthors: 'Phan Bội Châu, Phan Châu Trinh, Tản Đà, Nguyễn Văn Vĩnh, Phạm Quỳnh',
        filterKeys: 'đầu thế kỷ xx, 1900, 1920, tản đà, phan bội châu, duy tân',
        featuredWorks: ['Xuất dương lưu biệt', 'Hải ngoại huyết thư', 'Thơ Tản Đà', 'Quả dưa đỏ']
      },
      {
        id: 'hien-thuc-tho-moi',
        name: 'Hiện thực & Thơ Mới (1930 – 1945)',
        years: '1930 – 1945',
        icon: '🖋️',
        desc: 'Đỉnh cao của văn xuôi hiện thực phê phán (phơi bày nỗi khổ nông dân, bi kịch tha hóa, thói kệch cỡm thị thành) và cuộc cách mạng Thơ Mới rực rỡ giải phóng cái Tôi cá nhân.',
        keyAuthors: 'Nam Cao, Vũ Trọng Phụng, Ngô Tất Tố, Thạch Lam, Nguyên Hồng, Xuân Diệu, Huy Cận, Hàn Mặc Tử, Chế Lan Viên',
        filterKeys: '1930, 1945, hiện thực, thơ mới, nam cao, chí phèo, số đỏ, tắt đèn, lão hạc, vội vàng, tràng giang, hai đứa trẻ, vũ trọng phụng, ngô tất tố',
        featuredWorks: ['Chí Phèo', 'Số đỏ', 'Tắt đèn', 'Lão Hạc', 'Hai đứa trẻ', 'Vội vàng', 'Tràng giang', 'Đây thôn Vĩ Dạ']
      },
      {
        id: 'khang-chien-1945-1975',
        name: 'Văn học Cách mạng & Kháng chiến (1945 – 1975)',
        years: '1945 – 1975',
        icon: '🎖️',
        desc: 'Khuynh hướng sử thi và cảm hứng lãng mạn cách mạng. Tôn vinh hình ảnh anh bộ đội Cụ Hồ, thanh niên xung phong và toàn thể nhân dân kiên cường đánh giặc vì độc lập tự do Tổ quốc.',
        keyAuthors: 'Hồ Chí Minh, Tố Hữu, Quang Dũng, Chính Hữu, Nguyễn Thi, Nguyễn Trung Thành, Nguyễn Quang Sáng, Lê Minh Khuê, Phạm Tiến Duật',
        filterKeys: 'kháng chiến, cách mạng, 1945, 1975, tây tiến, đồng chí, những ngôi sao xa xôi, rừng xà nu, người lái đò sông đà, chiếc lược ngà, tiểu đội xe không kính',
        featuredWorks: ['Tây Tiến', 'Đồng chí', 'Chiếc lược ngà', 'Những ngôi sao xa xôi', 'Rừng xà nu', 'Người lái đò Sông Đà', 'Bài thơ về tiểu đội xe không kính']
      },
      {
        id: 'doi-moi-1986',
        name: 'Văn học Đổi mới & Đương đại (1986 – nay)',
        years: '1986 – nay',
        icon: '🌿',
        desc: 'Chuyển biến mạnh mẽ sang cảm thức thế sự, đạo đức đời tư. Bút pháp đa diện, khám phá chiều sâu nội tâm, trăn trở về thân phận con người và triết lý nhân bản hậu chiến.',
        keyAuthors: 'Nguyễn Minh Châu, Lưu Quang Vũ, Bảo Ninh, Nguyễn Huy Thiệp, Nguyễn Duy, Y Phương, Nguyễn Ngọc Tư',
        filterKeys: 'đổi mới, đương đại, 1986, chiếc thuyền ngoài xa, hồn trương ba da hàng thịt, ánh trăng, nói với con, cánh đồng bất tận, nguyễn minh châu, lưu quang vũ',
        featuredWorks: ['Chiếc thuyền ngoài xa', 'Hồn Trương Ba da hàng thịt', 'Ánh trăng', 'Nỗi buồn chiến tranh', 'Tướng về hưu', 'Cánh đồng bất tận']
      },
      {
        id: 'van-hoc-the-gioi',
        name: 'Tinh hoa Văn học Thế giới',
        years: 'Cổ đại – Hiện đại',
        icon: '🌍',
        desc: 'Tuyển tập các kiệt tác văn chương của nhân loại: bi kịch Hy Lạp, Phục hưng châu Âu, văn học Nga thế kỷ XIX, văn học hiện sinh và chủ nghĩa hiện thực huyền ảo Mỹ Latinh.',
        keyAuthors: 'Hemingway, Gabriel García Márquez, Franz Kafka, Lỗ Tấn, Chekhov, Shakespeare, Cervantes, Victor Hugo',
        filterKeys: 'thế giới, nước ngoài, nga, pháp, mỹ, tây ban nha, trung quốc, nhật bản, colombia, hemingway, kafka, marquez, lỗ tấn',
        featuredWorks: ['Ông già và biển cả', 'Trăm năm cô đơn', 'Hóa thân', 'Cố hương', 'Thuốc', 'Don Quixote', 'Romeo và Juliet', 'Người thầy đầu tiên']
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_eras');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultEras.map(e => [e.id, e]));
          custom.forEach(e => map.set(e.id, e));
          this.eras = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc thời kỳ văn học:", e);
    }
    this.eras = defaultEras;
  }

  loadThemesData() {
    const defaultThemes = [
      {
        id: 'nguoi-nong-dan',
        title: 'Người Nông Dân Trước Cách Mạng',
        color: '#d97706',
        desc: 'Khắc họa chân thực số phận cùng cực của người nông dân dưới ách áp bức bóc lột của thực dân phong kiến, đồng thời ngợi ca phẩm chất lương thiện, tình phụ tử cao đẹp và tinh thần phản kháng tiềm tàng.',
        featuredWorks: ['Chí Phèo', 'Lão Hạc', 'Tắt đèn', 'Vợ nhặt', 'Bước đường cùng'],
        filterKeywords: 'nông dân, lão hạc, chí phèo, tắt đèn, vợ nhặt, bần cùng'
      },
      {
        id: 'que-huong-dat-nuoc',
        title: 'Tình Yêu Quê Hương & Cảm Hứng Ái Quốc',
        color: '#dc2626',
        desc: 'Tiếng lòng yêu nước nồng nàn qua các thời kỳ: từ ý chí độc lập quật cường thời Trung đại đến nghĩa vụ thiêng liêng xả thân cứu nước trong hai cuộc kháng chiến vĩ đại.',
        featuredWorks: ['Nam quốc sơn hà', 'Bình Ngô đại cáo', 'Hịch tướng sĩ', 'Đất nước (Nguyễn Khoa Điềm)', 'Tây Tiến', 'Đồng chí'],
        filterKeywords: 'đất nước, quê hương, ái quốc, kháng chiến, bình ngô, nam quốc sơn hà, đồng chí, tây tiến'
      },
      {
        id: 'nguoi-phu-nu',
        title: 'Vẻ Đẹp & Số Phận Người Phụ Nữ',
        color: '#ec4899',
        desc: 'Xót xa cho những thân phận tài hoa bạc mệnh bị chà đạp bởi định kiến hà khắc và bạo lực xã hội, đồng thời ngợi ca vẻ đẹp nhan sắc, đức hy sinh và khát vọng tự do cháy bỏng.',
        featuredWorks: ['Truyện Kiều', 'Chuyện người con gái Nam Xương', 'Chinh phụ ngâm', 'Tự tình II', 'Vợ chồng A Phủ'],
        filterKeywords: 'phụ nữ, thúy kiều, vũ nương, mị, tự tình, hồ xuân hương'
      },
      {
        id: 'anh-hung-su-thi',
        title: 'Cảm Hứng Sử Thi & Anh Hùng Cách Mạng',
        color: '#2563eb',
        desc: 'Tôn vinh khí phách hiên ngang, tinh thần lạc quan dũng cảm và lý tưởng cống hiến tuổi trẻ vì Tổ quốc của thế hệ thanh niên Việt Nam thời hoa lửa.',
        featuredWorks: ['Tây Tiến', 'Rừng xà nu', 'Những ngôi sao xa xôi', 'Bài thơ về tiểu đội xe không kính', 'Lặng lẽ Sa Pa'],
        filterKeywords: 'sử thi, anh hùng, tây tiến, rừng xà nu, những ngôi sao xa xôi, lặng lẽ sa pa, xe không kính'
      },
      {
        id: 'tinh-cam-gia-dinh',
        title: 'Tình Cảm Gia Đình & Tình Người Đôn Hậu',
        color: '#059669',
        desc: 'Tình phụ tử thiêng liêng trong khói lửa chiến tranh, tình mẫu tử bền bỉ, tình nghĩa vợ chồng son sắt và ánh sáng nhân ái sưởi ấm tâm hồn trong những hoàn cảnh ngặt nghèo nhất.',
        featuredWorks: ['Chiếc lược ngà', 'Lão Hạc', 'Vợ nhặt', 'Làng (Kim Lân)', 'Bếp lửa', 'Nói với con'],
        filterKeywords: 'chiếc lược ngà, lão hạc, vợ nhặt, làng, bếp lửa, gia đình, phụ tử'
      },
      {
        id: 'triet-ly-the-su',
        title: 'Triết Lý Thế Sự & Thân Phận Con Người Hậu Chiến',
        color: '#7c3aed',
        desc: 'Cái nhìn đa diện, sâu sắc về con người không đơn giản một chiều. Những trăn trở về mối quan hệ giữa nghệ thuật và cuộc sống, giữa cái đẹp bề ngoài và sự thật trần trụi đau đớn.',
        featuredWorks: ['Chiếc thuyền ngoài xa', 'Hồn Trương Ba da hàng thịt', 'Ánh trăng', 'Mảnh trăng cuối rừng'],
        filterKeywords: 'thế sự, chiếc thuyền ngoài xa, hồn trương ba, nguyễn minh châu, lưu quang vũ, ánh trăng'
      },
      {
        id: 'thien-nhien-lang-man',
        title: 'Cảm Hứng Thiên Nhiên & Bút Ký Lãng Mạn',
        color: '#0284c7',
        desc: 'Vẻ đẹp hùng vĩ, trữ tình của non sông gấm vóc qua ngòi bút uyên bác, tài hoa; phong vị Hà thành thanh lịch và những rung động thẩm mỹ tinh vi trong tâm hồn.',
        featuredWorks: ['Người lái đò Sông Đà', 'Ai đã đặt tên cho dòng sông', 'Hai đứa trẻ', 'Gió lạnh đầu mùa'],
        filterKeywords: 'sông đà, sông hương, hai đứa trẻ, gió lạnh đầu mùa, thạch lam, nguyễn tuân'
      },
      {
        id: 'van-hoc-the-gioi-nhan-ban',
        title: 'Tinh Hoa Nhân Đạo Văn Học Thế Giới',
        color: '#0d9488',
        desc: 'Sức mạnh ý chí bất khuất của con người trước nghịch cảnh định mệnh, lòng trắc ẩn bao la và sự kháng cự lại nỗi cô đơn, tha hóa trong thế giới hiện đại.',
        featuredWorks: ['Ông già và biển cả', 'Trăm năm cô đơn', 'Hóa thân', 'Cố hương', 'Don Quixote', 'Người thầy đầu tiên'],
        filterKeywords: 'ông già và biển cả, trăm năm cô đơn, hóa thân, cố hương, hemingway, kafka, marquez'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_themes');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultThemes.map(t => [t.id, t]));
          custom.forEach(t => map.set(t.id, t));
          this.themes = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc chủ đề văn học:", e);
    }
    this.themes = defaultThemes;
  }

  loadCharactersData() {
    const defaultCharacters = [
      {
        id: 'chi-pheo',
        name: 'Chí Phèo',
        workTitle: 'Chí Phèo',
        workId: 'chi-pheo',
        author: 'Nam Cao',
        role: 'Nhân vật chính · Điển hình cho bi kịch tha hóa & bị cự tuyệt quyền làm người',
        quote: 'Tao muốn làm người lương thiện! Ai cho tao lương thiện? Làm thế nào cho mất được những vết mảnh chai trên mặt này?',
        personality: 'Ban đầu là người nông dân lương thiện, chất phác, giàu lòng tự trọng. Bị nhà tù thực dân và sự tàn bạo của Bá Kiến lưu manh hóa trở thành con quỷ dữ của làng Vũ Đại. Được thức tỉnh bởi bát cháo hành và tình yêu mộc mạc của Thị Nở, để rồi kết thúc bằng tiếng kêu cứu đớn đau đòi lương thiện.',
        symbolicMeaning: 'Bản cáo trạng đanh thép tố cáo xã hội thực dân phong kiến tàn bạo đã cướp đi nhân hình lẫn nhân tính của người nông dân; khẳng định sức sống bất diệt của bản tính thiện lương trong con người.'
      },
      {
        id: 'thi-no',
        name: 'Thị Nở',
        workTitle: 'Chí Phèo',
        workId: 'chi-pheo',
        author: 'Nam Cao',
        role: 'Nhân vật bước ngoặt · Hiện thân của tình thương mộc mạc và chiếc cầu nối nhân tính',
        quote: 'Người ta ai lại đi nỡ đánh người đang ăn, đang ốm bao giờ!',
        personality: 'Xấu xí \"ma chê quỷ hờn\", ngẩn ngơ, dở hơi, nghèo hèn dòng giống mả hủi. Nhưng bên trong vẻ ngoài thô kệch là trái tim nhân hậu, giàu tình thương mộc mạc, không bị vẩn đục bởi định kiến giai cấp.',
        symbolicMeaning: 'Bát cháo hành của Thị Nở là biểu tượng tuyệt đẹp cho hơi ấm của tình người; là chiếc cầu nối kỳ diệu đưa Chí Phèo từ cõi quỷ trở về với cõi người lương thiện.'
      },
      {
        id: 'lao-hac',
        name: 'Lão Hạc',
        workTitle: 'Lão Hạc',
        workId: 'lao-hac',
        author: 'Nam Cao',
        role: 'Nhân vật chính · Điển hình cho nhân cách cao thượng & tình phụ tử thiêng liêng',
        quote: 'Cái giống nó cũng khôn! Nó cứ làm in như nó trách tôi; nó kêu ư ử, nhìn tôi như muốn bảo tôi rằng: A! Lão già tệ lắm!...',
        personality: 'Một lão nông nghèo khổ, góa vợ, thương con trai sâu sắc. Lương thiện, nhân hậu đến mức dằn vặt khôn nguôi khi phải lừa bán con chó Vàng. Thà chọn cái chết đau đớn dữ dội bằng bả chó chứ nhất quyết không đụng vào một đồng tiền để dành cho con và không làm phiền lụy xóm giềng.',
        symbolicMeaning: 'Tượng đài bi tráng về phẩm giá, lòng vị tha và tình phụ tử thiêng liêng; minh chứng cho nhân cách trong sạch của người nông dân Việt Nam trước Cách mạng.'
      },
      {
        id: 'mi',
        name: 'Mị',
        workTitle: 'Vợ chồng A Phủ',
        workId: 'vo-chong-a-phu',
        author: 'Tô Hoài',
        role: 'Nhân vật nữ chính · Biểu tượng sức sống tiềm tàng & khát vọng tự do mãnh liệt',
        quote: 'Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi. Bao nhiêu người có chồng cũng đi chơi ngày Tết...',
        personality: 'Người con gái Mèo xinh đẹp, tài hoa, hiếu thảo. Bị bắt làm con dâu gạt nợ nhà thống lý Pá Tra, bị bóc lột sức lao động và đày đọa tinh thần đến mức \"lùi lũi như con rùa nuôi trong xó cửa\". Nhưng ngọn lửa sống chưa bao giờ tắt: tiếng sáo đêm xuân đã đánh thức lòng yêu đời, và giọt nước mắt của A Phủ đã thôi thúc Mị cắt dây trói cùng chạy trốn tìm tự do.',
        symbolicMeaning: 'Khẳng định quy luật tất yếu: ở đâu có áp bức bất công, ở đó có sự phản kháng; sức sống và khát vọng tự do của con người là bất diệt, không cường quyền nào dập tắt được.'
      },
      {
        id: 'a-phu',
        name: 'A Phủ',
        workTitle: 'Vợ chồng A Phủ',
        workId: 'vo-chong-a-phu',
        author: 'Tô Hoài',
        role: 'Nhân vật chính · Đại diện cho tinh thần phóng khoáng, dũng cảm & quật khởi của thanh niên miền núi',
        quote: 'Một thanh niên nghèo dám đánh cả con quan, biết bẫy hổ, săn bò rừng và không hề run sợ trước cái chết...',
        personality: 'Mồ côi cha mẹ từ nhỏ, khỏe mạnh, lao động giỏi, yêu tự do, dám chống lại sự hống hách của A Sử con quan thống lý. Dù bị trói đứng chờ chết vì để hổ ăn thịt mất một con bò, ý chí sinh tồn kiên cường của anh vẫn ngời sáng, sẵn sàng vùng chạy khi được Mị cởi trói.',
        symbolicMeaning: 'Con đường giác ngộ cách mạng tất yếu của đồng bào các dân tộc thiểu số Tây Bắc: từ phản kháng tự phát đến đứng lên cầm súng giải phóng quê hương.'
      },
      {
        id: 'chi-dau',
        name: 'Chị Dậu',
        workTitle: 'Tắt đèn',
        workId: 'tat-den',
        author: 'Ngô Tất Tố',
        role: 'Nhân vật chính · Điển hình người phụ nữ nông dân giàu đức hy sinh & tinh thần phản kháng quật cường',
        quote: 'Mày trói ngay chồng bà đi, bà cho mày xem! ... Thà ngồi tù chứ không để chúng mày làm nhục!',
        personality: 'Tần tảo, tháo vát, yêu thương chồng con hết mực. Dù bị dồn vào ngõ cụt của sưu cao thuế nặng, khi cai lệ và người nhà lý trưởng xông vào đánh đập người chồng ốm yếu, chị đã dũng cảm quật ngã hai tên tay sai độc ác.',
        symbolicMeaning: 'Khắc họa quy luật hiện thực sâu sắc: \"Tức nước vỡ bờ\" — sức mạnh phản kháng quật cường tiềm ẩn bên trong người phụ nữ nông dân hiền lành.'
      },
      {
        id: 'trang',
        name: 'Anh Tràng',
        workTitle: 'Vợ nhặt',
        workId: 'vo-nhat',
        author: 'Kim Lân',
        role: 'Nhân vật chính · Người nghèo xóm ngụ cư, giàu lòng nhân ái & niềm tin vào tương lai',
        quote: 'Làm đếch gì có vợ! Nói đùa đấy... Có về với tớ thì ra khuân đồ cùng về!',
        personality: 'Thô kệch, nghèo khó, ngụ cư. Giữa nạn đói năm Ất Dậu 1945 khủng khiếp, Tràng vẫn sẵn lòng hào hiệp mời người đàn bà đói ăn một bữa no rồi dắt nhau về làm vợ chồng. Hạnh phúc gia đình đã khiến Tràng thay đổi, trở thành người đàn ông chín chắn, biết lo toan và hướng về lá cờ đỏ sao vàng.',
        symbolicMeaning: 'Vẻ đẹp nhân văn sáng ngời: ngay bên bờ vực cái chết, người lao động vẫn khát khao tổ ấm gia đình, yêu thương đùm bọc nhau và vững tin vào sự đổi đời của cách mạng.'
      },
      {
        id: 'huan-cao',
        name: 'Huấn Cao',
        workTitle: 'Chữ người tử tù',
        workId: 'chu-nguoi-tu-tu',
        author: 'Nguyễn Tuân',
        role: 'Nhân vật chính · Đại diện cho cái Đẹp khí phách, tài hoa uyên bác & thiên lương trong sạch',
        quote: 'Ta nhất sinh không vì vàng ngọc hay quyền thế mà ép mình viết câu đối bao giờ... Ta cảm cái tấm lòng biệt nhỡn liên tài của các người.',
        personality: 'Văn võ toàn tài, có tài viết chữ Hán \"đẹp lắm, vuông lắm\", hiên ngang bất khuất trước cường quyền và cái chết. Trân trọng tấm lòng yêu cái đẹp của viên quản ngục, sẵn lòng cho chữ trong buồng giam tăm tối.',
        symbolicMeaning: 'Tuyên ngôn thẩm mỹ về sự bất tử của Thiên lương và cái Đẹp: Cái đẹp có thể sinh ra ở nơi nhơ bẩn, tăm tối nhưng không bao giờ thỏa hiệp hay chung sống với cái ác.'
      },
      {
        id: 'be-thu',
        name: 'Bé Thu',
        workTitle: 'Chiếc lược ngà',
        workId: 'chiec-luoc-nga',
        author: 'Nguyễn Quang Sáng',
        role: 'Nhân vật chính · Biểu tượng của tình phụ tử thiêng liêng & cá tính mạnh mẽ, kiên định',
        quote: 'Ba! Không cho ba đi nữa! Ba ở nhà với con!...',
        personality: 'Bướng bỉnh, dứt khoát vì chỉ yêu người ba trong tấm hình chụp chung với má; khi nhận ra vết sẹo trên mặt ba là di chứng của chiến tranh, tình yêu trào dâng mãnh liệt, cuống quýt không muốn rời xa cha một giây.',
        symbolicMeaning: 'Bằng chứng đau thương về sự tàn phá khốc liệt của chiến tranh đối với hạnh phúc gia đình, đồng thời ca ngợi tình phụ tử sâu nặng không bom đạn nào chia cắt được.'
      },
      {
        id: 'nguoi-dan-ba-hang-chai',
        name: 'Người Đàn Bà Hàng Chài',
        workTitle: 'Chiếc thuyền ngoài xa',
        workId: 'chiec-thuyen-ngoai-xa',
        author: 'Nguyễn Minh Châu',
        role: 'Nhân vật trung tâm tư tưởng · Bức tranh hiện thực về nỗi nhọc nhằn & đức hy sinh bao la của người mẹ',
        quote: 'Lòng các chú tốt, nhưng các chú đâu có phải là người làm ăn... Đàn bà ở thuyền chúng tôi phải sống cho con chứ không thể sống cho mình được.',
        personality: 'Thô kệch, rỗ mặt, lam lũ, cam chịu đòn roi tàn nhẫn của chồng để giữ cho chiếc thuyền gia đình không bị tan vỡ; thấu hiểu lẽ đời sâu sắc và coi niềm vui của con cái là lẽ sống thiêng liêng nhất đời mình.',
        symbolicMeaning: 'Vẻ đẹp khuất lấp, bao dung, giàu đức hy sinh của người phụ nữ lao động thời hậu chiến; thức tỉnh người nghệ sĩ về cái nhìn đa diện, không đơn giản một chiều về cuộc đời.'
      },
      {
        id: 'thuy-kieu',
        name: 'Thúy Kiều',
        workTitle: 'Truyện Kiều',
        workId: 'truyen-kieu',
        author: 'Nguyễn Du',
        role: 'Nhân vật kiệt tác · Tuyệt đỉnh nhan sắc, tài hoa, đức hạnh & bi kịch mười lăm năm lưu lạc',
        quote: 'Đau đớn thay phận đàn bà / Lời rằng bạc mệnh cũng là lời chung.',
        personality: 'Sắc sảo mặn mà, cầm kỳ thi họa toàn tài, hiếu thảo bán mình chuộc cha, son sắt thủy chung với Kim Trọng, trọng nghĩa khinh tài với Từ Hải nhưng bị xô đẩy vào bể trầm luân bởi thế lực đồng tiền và quan lại tàn bạo.',
        symbolicMeaning: 'Bức tượng đài bi thương cho số phận người phụ nữ trong xã hội phong kiến, kết tinh tấm lòng nhân đạo bao la \"trông về nỗi thương\" của đại thi hào Nguyễn Du.'
      },
      {
        id: 'santiago',
        name: 'Ông Lão Santiago',
        workTitle: 'Ông già và biển cả',
        workId: 'ong-gia-va-bien-ca',
        author: 'Ernest Hemingway',
        role: 'Nhân vật chính · Biểu tượng cho ý chí quật cường, lòng kiêu hãnh & vẻ đẹp bất khuất của con người',
        quote: 'Con người không được sinh ra để dành cho thất bại. Con người có thể bị hủy diệt nhưng không thể bị đánh bại.',
        personality: 'Già nua, cô độc, 84 ngày không câu được một con cá nhưng không bao giờ nản lòng; kiên cường chiến đấu với con cá kiếm khổng lồ và đàn cá mập hung dữ giữa đại dương mênh mông.',
        symbolicMeaning: 'Tuyên ngôn bất hủ về sức mạnh tinh thần, niềm kiêu hãnh và khát vọng chinh phục lý tưởng của con người trước thiên nhiên vũ trụ bao la.'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_characters');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultCharacters.map(c => [c.id, c]));
          custom.forEach(c => map.set(c.id, c));
          this.characters = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc nhân vật văn học:", e);
    }
    this.characters = defaultCharacters;
  }

  loadArticlesData() {
    const defaultArticles = [
      {
        id: 'phan-tich-mi-dem-tinh-mua-xuan',
        title: 'Phân tích diễn biến tâm lý nhân vật Mị trong đêm tình mùa xuân (Vợ chồng A Phủ)',
        category: 'Văn mẫu chọn lọc',
        grade: 'Lớp 12 · Ôn thi THPT Quốc Gia',
        workTitle: 'Vợ chồng A Phủ (Tô Hoài)',
        author: 'Ban Chuyên Môn Ngữ Văn Văn Uyển',
        views: 2450,
        summary: 'Hệ thống hóa 3 chặng chuyển biến tâm lý: từ trạng thái tê liệt câm lặng -> tiếng sáo thức tỉnh hồi sinh lòng yêu đời -> bị trói đứng nhưng tâm hồn vẫn rập rờn theo tiếng sáo.',
        content: 'I. MỞ BÀI\\n- Giới thiệu nhà văn Tô Hoài và truyện ngắn kiệt tác \"Vợ chồng A Phủ\" (1952).\\n- Dẫn dắt vấn đề: Diễn biến tâm lý nhân vật Mị trong đêm tình mùa xuân ở Hồng Ngài — bản tình ca bất tử về sức sống tiềm tàng và khát vọng tự do của con người vùng cao.\\n\\nII. THÂN BÀI\\n1. Bối cảnh không gian và các yếu tố ngoại cảnh tác động:\\n- Mùa xuân Hồng Ngài: gió thổi vào cỏ gianh vàng ửng, những chiếc váy hoa phơi trên mỏm đá như con bướm sặc sỡ, men rượu cần ngày Tết.\\n- Đặc biệt là \"tiếng sáo\" — biểu tượng của tình yêu đôi lứa, chiếc cầu nối kỳ diệu đưa Mị từ thực tại nô lệ trở về với quá khứ thanh xuân tươi đẹp.\\n\\n2. Quá trình hồi sinh tâm lý qua các giai đoạn:\\n- Giai đoạn 1: Mị uống rượu \"uống ực từng bát\" như nuốt cay nuốt đắng vào lòng. Rượu làm say phần thể xác nhưng làm tỉnh phần tâm hồn.\\n- Giai đoạn 2: Ý thức về bản thân thức dậy: \"Mị thấy phơi phới trở lại\", \"Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi\". Lần đầu tiên sau bao năm câm lặng, Mị ý thức được tuổi trẻ và quyền được sống như một con người.\\n- Giai đoạn 3: Phản kháng lại hoàn cảnh bi đát: Mị bước vào buồng, thắp sáng ngọn đèn dầu, quấn lại tóc, với lấy chiếc váy hoa chuẩn bị đi chơi Tết.\\n- Giai đoạn 4: Dù bị A Sử trói đứng vào cột nhà bằng cả thúng sợi đay, \"Mị vẫn nghe tiếng sáo đưa Mị đi theo những cuộc chơi\". Tâm hồn Mị đã vượt ra ngoài gông cùm thể xác.\\n\\nIII. KẾT BÀI\\n- Đánh giá bút pháp miêu tả tâm lý bậc thầy của Tô Hoài.\\n- Ý nghĩa nhân đạo sâu sắc: Sức sống của con người không bao giờ bị dập tắt, ngọn lửa khát vọng luôn âm ỉ cháy đợi ngày bùng lên thành ngọn lửa quật khởi.'
      },
      {
        id: 'bi-kich-chi-pheo-nam-cao',
        title: 'Bi kịch cự tuyệt quyền làm người của nhân vật Chí Phèo (Nam Cao)',
        category: 'Nghị luận văn học',
        grade: 'Lớp 11 & Ôn thi THPT',
        workTitle: 'Chí Phèo (Nam Cao)',
        author: 'ThS. Văn học Việt Nam Hiện đại',
        views: 1980,
        summary: 'Làm rõ hai tầng bi kịch: bi kịch tha hóa thành lưu manh mất nhân hình nhân tính và bi kịch thức tỉnh khát khao lương thiện nhưng bị định kiến xã hội tàn nhẫn chối từ.',
        content: 'I. MỞ BÀI\\n- Nam Cao là cây bút hiện thực tâm lý xuất sắc nhất của văn xuôi Việt Nam trước 1945.\\n- \"Chí Phèo\" là kiệt tác đỉnh cao thể hiện số phận bần cùng và bi kịch đau đớn nhất: bi kịch bị cự tuyệt quyền làm người.\\n\\nII. THÂN BÀI\\n1. Tầng bi kịch thứ nhất: Bị tha hóa, đánh mất nhân hình lẫn nhân tính:\\n- Vốn là nông dân lương thiện, tự trọng: \"thấy nhục\" khi bị bà Ba bắt bóp chân.\\n- Bị đẩy vào tù, trở về với bộ dạng đầu bò: \"cái đầu trọc lốc, răng cạo trắng hớn, mặt đầy những vết sẹo mảnh chai\".\\n- Trở thành công cụ đâm thuê chém mướn của Bá Kiến, cất tiếng chửi thay cho tiếng nói người.\\n\\n2. Sự thức tỉnh và khát vọng hoàn lương:\\n- Cuộc gặp gỡ định mệnh với Thị Nở: bát cháo hành ấm áp khơi dậy bản tính thiện.\\n- Lắng nghe âm thanh cuộc sống: tiếng chim hót, tiếng cười nói người đi chợ, tiếng anh thuyền chài gõ mái chèo.\\n- Khát khao xây dựng tổ ấm bình dị: \"Giá cứ thế này mãi thì thích nhỉ?\".\\n\\n3. Đỉnh điểm bi kịch: Bị xã hội cự tuyệt quyền làm người:\\n- Bà cô Thị Nở — hiện thân của định kiến làng Vũ Đại hà khắc chối bỏ Chí.\\n- Chí uống rượu nhưng \"càng uống càng tỉnh\", mùi cháo hành cứ thoang thoảng.\\n- Hành động cầm dao đến nhà Bá Kiến đâm chết kẻ thù và tự sát: Lời kêu cứu tuyệt vọng: \"Tao muốn làm người lương thiện! Ai cho tao lương thiện?\".\\n\\nIII. KẾT BÀI\\n- Cái chết của Chí Phèo khẳng định chân lý: Nhân tính cao thượng thà chết để bảo toàn thiên lương chứ nhất quyết không quay lại kiếp quỷ dữ.'
      },
      {
        id: 'chat-tho-hai-dua-tre-thach-lam',
        title: 'Chất thơ và vẻ đẹp tình người trong thiên truyện ngắn \"Hai đứa trẻ\" (Thạch Lam)',
        category: 'Góc nhìn nghệ thuật',
        grade: 'Lớp 11',
        workTitle: 'Hai đứa trẻ (Thạch Lam)',
        author: 'Ban Biên Tập Văn Uyển',
        views: 1620,
        summary: 'Nghệ thuật tương phản giữa ánh sáng le lói và bóng tối mênh mông; nhịp điệu văn xuôi êm đềm như một bài thơ trữ tình đượm buồn nhân bản.',
        content: 'Truyện ngắn \"Hai đứa trẻ\" của Thạch Lam là một trong những áng văn xuôi giàu chất thơ nhất của văn học lãng mạn Việt Nam thời kỳ 1930 - 1945. Không có cốt truyện ly kỳ, tác phẩm như một khúc ca êm dịu mà day dứt về bức tranh phố huyện nghèo lúc chiều tàn cho tới đêm khuya, nơi những kiếp người tàn tạ mỏi mòn kiếm sống trong bóng tối và chuyến tàu đêm rực rỡ từ Hà Nội vút qua mang theo cả một thế giới ước mơ xa xăm.'
      },
      {
        id: 'hinh-tuong-song-da-nguyen-tuan',
        title: 'Vẻ đẹp hình tượng Sông Đà qua ngòi bút tài hoa, uyên bác của Nguyễn Tuân',
        category: 'Nghị luận văn học',
        grade: 'Lớp 12 · Tùy bút kinh điển',
        workTitle: 'Người lái đò Sông Đà (Nguyễn Tuân)',
        author: 'Tổ Giáo Viên Ngữ Văn Chuyên Sâu',
        views: 2120,
        summary: 'Phân tích hai nét tính cách đối lập nhưng thống nhất: dòng sông hung bạo, dữ dội như một thủy quái và dòng sông trữ tình, thơ mộng như một áng tóc trữ tình.',
        content: 'Nguyễn Tuân là bậc thầy phù thủy ngôn từ của văn học Việt Nam. Trong thiên tùy bút \"Người lái đò Sông Đà\", ông đã biến dòng sông Tây Bắc thành một sinh thể sống động với hai nét tính cách độc đáo: vừa hùng vĩ, hiểm trở, hung bạo với các trùng vi thạch trận, vừa thơ mộng, trữ tình, \"tuôn dài tuôn dài như một áng tóc trữ tình\".'
      },
      {
        id: 'tinh-huong-truyen-vo-nhat-kim-lan',
        title: 'Nghệ thuật xây dựng tình huống truyện độc đáo trong tác phẩm \"Vợ nhặt\" (Kim Lân)',
        category: 'Đề thi & Đáp án',
        grade: 'Lớp 12 · Đề thi Quốc Gia',
        workTitle: 'Vợ nhặt (Kim Lân)',
        author: 'Hội đồng Học liệu Văn học',
        views: 2890,
        summary: 'Tình huống nhặt vợ vừa éo le, nghịch lý giữa nạn đói khốc liệt, vừa chan chứa tình người, khơi dậy khát vọng sống và niềm tin cách mạng.',
        content: 'Tình huống truyện \"Vợ nhặt\" của Kim Lân được xem là một trong những tình huống độc đáo và xuất sắc nhất của truyện ngắn hiện thực Việt Nam. Giữa lúc ranh giới giữa sự sống và cái chết mong manh như sợi tóc, anh Tràng nghèo khó, ngụ cư lại \"nhặt\" được vợ chỉ sau vài câu đùa và bốn bát bánh đúc. Tình huống éo le ấy không gieo rắc nỗi bi quan mà ngược lại, thắp lên ngọn lửa ấm áp của tình người và niềm lạc quan hướng về ngày mai tươi sáng.'
      },
      {
        id: 'chiec-thuyen-ngoai-xa-nghich-ly',
        title: 'Chiếc thuyền ngoài xa và những nghịch lý của cuộc đời qua góc nhìn người nghệ sĩ',
        category: 'Phê bình chuyên sâu',
        grade: 'Lớp 12 · Đổi mới văn học',
        workTitle: 'Chiếc thuyền ngoài xa (Nguyễn Minh Châu)',
        author: 'PGS.TS Văn học Đương đại',
        views: 1840,
        summary: 'Mối quan hệ phức tạp giữa nghệ thuật và hiện thực cuộc sống: khoảng cách giữa bức ảnh tuyệt mỹ chụp từ xa và nỗi đau đớn trần trụi khi bước lại gần.',
        content: 'Thiên truyện của Nguyễn Minh Châu đặt ra một vấn đề nhức nhối về trách nhiệm của người cầm bút: Đừng bao giờ nhìn nhận con người và cuộc đời qua lăng kính đơn giản, xuôi chiều. Cái đẹp ngoại cảnh chưa chắc đã đồng nghĩa với cái thiện; và người nghệ sĩ chân chính phải dũng cảm bước qua lớp sương mù huyền ảo để đối diện với nỗi đau và gánh nặng mưu sinh của kiếp người.'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_articles');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultArticles.map(a => [a.id, a]));
          custom.forEach(a => map.set(a.id, a));
          this.articles = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc bài viết học liệu:", e);
    }
    this.articles = defaultArticles;
  }

  loadTermsData() {
    const defaultTerms = [
      {
        id: 'an-du',
        name: 'Ẩn Dụ (Metaphor)',
        type: 'Biện pháp tu từ',
        definition: 'Biện pháp tu từ gọi tên sự vật, hiện tượng này bằng tên sự vật, hiện tượng khác có nét tương đồng ngầm ẩn với nó nhằm tăng sức gợi hình, gợi cảm và chiều sâu biểu đạt.',
        example: '\"Thuyền về có nhớ bến chăng / Bến thì một dạ khăng khăng đợi thuyền\" (Ca dao tình nghĩa).\\n-> \"Thuyền\" là hình ảnh ẩn dụ chỉ người con trai nay đây mai đó; \"Bến\" ẩn dụ cho người con gái thủy chung chờ đợi.',
        application: 'Khi phân tích thơ ca, cần chỉ ra hai vế tương đồng (vế ẩn và vế hiện) và làm nổi bật dụng ý nghệ thuật của tác giả trong việc kín đáo bộc lộ cảm xúc.'
      },
      {
        id: 'hoan-du',
        name: 'Hoán Dụ (Metonymy)',
        type: 'Biện pháp tu từ',
        definition: 'Biện pháp tu từ gọi tên sự vật, hiện tượng, khái niệm này bằng tên của một sự vật, hiện tượng khác có quan hệ gần gũi, đi liền với nhau trong thực tế khách quan.',
        example: '\"Áo chàm đưa buổi phân ly / Cầm tay nhau biết nói gì hôm nay\" (Việt Bắc - Tố Hữu).\\n-> \"Áo chàm\" (trang phục đặc trưng) hoán dụ cho đồng bào các dân tộc thiểu số vùng chiến khu Việt Bắc.',
        application: 'Chỉ ra mối liên hệ thực tế cụ thể (dấu hiệu - đối tượng; bộ phận - toàn thể) để thấy được sự gắn bó ruột thịt và tình cảm tha thiết của nhân vật trữ tình.'
      },
      {
        id: 'tinh-huong-truyen',
        name: 'Tình Huống Truyện (Story Situation)',
        type: 'Lý luận văn học',
        definition: 'Hoàn cảnh, sự kiện đặc biệt mang tính nút thắt mà ở đó các nhân vật bộc lộ sâu sắc tính cách, tâm lý và tư tưởng cốt lõi của tác phẩm được phát sáng rực rỡ.',
        example: 'Tình huống anh Tràng \"nhặt\" được vợ giữa những ngày nạn đói năm 1945 khủng khiếp trong truyện ngắn \"Vợ nhặt\" của Kim Lân.',
        application: 'Bài thi đạt điểm cao khi phân tích được 3 phương diện: hoàn cảnh xuất hiện tình huống -> diễn biến tâm lý các nhân vật -> giá trị hiện thực và chiều sâu nhân đạo mà tác giả gửi gắm.'
      },
      {
        id: 'diem-nhin-nghe-thuat',
        name: 'Điểm Nhìn Nghệ Thuật (Narrative Perspective)',
        type: 'Thi pháp trần thuật',
        definition: 'Vị trí, khoảng cách và góc độ mà người kể chuyện hay nhân vật dùng để quan sát, cảm nhận, bình giá và trần thuật thế giới nghệ thuật.',
        example: 'Điểm nhìn của nghệ sĩ Phùng trong \"Chiếc thuyền ngoài xa\": chuyển dịch từ điểm nhìn thẩm mỹ lãng mạn thuần túy sang điểm nhìn thế sự, nhân sinh sâu sắc.',
        application: 'Phân tích sự đa thanh, sự chuyển dịch điểm nhìn từ bên ngoài vào bên trong tâm tư nhân vật để làm nổi bật chiều sâu tư tưởng hiện đại.'
      },
      {
        id: 'chu-nghia-hien-thuc-huyen-ao',
        name: 'Hiện Thực Huyền Ảo (Magic Realism)',
        type: 'Trường phái văn học',
        definition: 'Khuynh hướng sáng tác kết hợp hài hòa giữa hiện thực đời sống trần trụi với các yếu tố hoang đường, kỳ ảo, huyền thoại như những điều hoàn toàn bình thường hiển nhiên.',
        example: 'Tiểu thuyết \"Trăm năm cô đơn\" của Gabriel García Márquez (người bay lên trời, trận mưa hoa vàng rơi ngập lối, dòng họ mắc chứng mất ngủ quên lãng quá khứ).',
        application: 'Làm rõ các tầng nghĩa ẩn dụ biểu tượng về lịch sử, chính trị, bản sắc văn hóa và nỗi cô đơn của nhân loại trong bối cảnh xã hội biến thiên.'
      },
      {
        id: 'nguyen-ly-tang-bang-troi',
        name: 'Nguyên Lý Tảng Băng Trôi (Iceberg Theory)',
        type: 'Thi pháp văn xuôi',
        definition: 'Nguyên lý sáng tác của Ernest Hemingway: tác phẩm chỉ nên phô bày một phần bảy bề nổi (hành động, lời thoại ngắn gọn), còn sáu phần bảy chìm sâu dưới đáy biển (ý nghĩa tư tưởng, cảm xúc) để bạn đọc tự đồng sáng tạo giải mã.',
        example: 'Tác phẩm \"Ông già và biển cả\": Cuộc vật lộn bắt cá kiếm là bề nổi; khát vọng chinh phục lý tưởng, lòng kiêu hãnh và sức mạnh tinh thần con người là phần chìm.',
        application: 'Tránh sa đà phân tích từ ngữ bề nổi; tập trung mổ xẻ những khoảng trống, chi tiết hàm súc và chiều sâu ẩn dụ biểu tượng.'
      },
      {
        id: 'doc-thoai-noi-tam',
        name: 'Độc Thoại Nội Tâm (Interior Monologue)',
        type: 'Nghệ thuật xây dựng nhân vật',
        definition: 'Lời nói thầm kín bên trong tâm trí của nhân vật, không phát ra thành tiếng, phản ánh trực tiếp dòng suy nghĩ, trăn trở, dằn vặt và sự đấu tranh tâm lý gay gắt.',
        example: 'Độc thoại của Chí Phèo khi lắng nghe tiếng chim hót buổi sáng, hay những suy nghĩ trăn trở của Mị trong đêm đông cởi trói cho A Phủ.',
        application: 'Khai thác diễn biến vi tế trong tâm hồn nhân vật; chứng minh sự thức tỉnh lương tri và phẩm giá người nông dân lao động.'
      },
      {
        id: 'tho-that-ngon-bat-cu',
        name: 'Thơ Thất Ngôn Bát Cú Đường Luật',
        type: 'Thể thơ cổ điển',
        definition: 'Thể thơ cổ điển gồm 8 câu, mỗi câu 7 chữ, tuân thủ nghiêm ngặt quy luật niêm luật, vần đối. Bố cục 4 phần chuẩn mực: Đề (câu 1-2), Thực (câu 3-4), Luận (câu 5-6), Kết (câu 7-8). Hai cặp câu Thực và Luận bắt buộc phải đối ngẫu.',
        example: '\"Qua Đèo Ngang\" của Bà Huyện Thanh Quan, chùm thơ Thu của Nguyễn Khuyến.',
        application: 'Khi phân tích cần chú ý nghệ thuật đối thanh, đối ý, cách hiệp vần chân và nghệ thuật \"tả cảnh ngụ tình\" kín đáo của thi nhân xưa.'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_terms');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultTerms.map(t => [t.id, t]));
          custom.forEach(t => map.set(t.id, t));
          this.terms = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc thuật ngữ:", e);
    }
    this.terms = defaultTerms;
  }

  loadCommentsData() {
    const defaultComments = [
      {
        id: 'cmt-1',
        authorName: 'Nguyễn Hoàng Long',
        authorRole: 'Học sinh Lớp 12 Chuyên Văn · Hà Nội',
        workTitle: 'Chí Phèo (Nam Cao)',
        workId: 'chi-pheo',
        date: '02/10/2026 14:30',
        content: 'Thầy cô cho em hỏi: Cái chết của Chí Phèo và Bá Kiến cuối tác phẩm có phải là sự bế tắc tuyệt vọng hoàn toàn của số phận người nông dân không ạ?',
        status: 'replied',
        reply: 'Chào Long! Đó không phải sự bế tắc tuyệt vọng, mà là sự phản kháng dữ dội mang tính tất yếu và là hành động bảo toàn nhân tính cao thượng: Chí Phèo thà chết trên ngưỡng cửa trở về làm người lương thiện chứ không chịu tiếp tục sống kiếp quỷ dữ làng Vũ Đại.'
      },
      {
        id: 'cmt-2',
        authorName: 'Trần Mai Anh',
        authorRole: 'Học sinh Lớp 12 · THPT Lê Hồng Phong',
        workTitle: 'Vợ chồng A Phủ (Tô Hoài)',
        workId: 'vo-chong-a-phu',
        date: '02/10/2026 16:45',
        content: 'Cho em hỏi chi tiết giọt nước mắt của A Phủ lấp lánh trên má có tác động mang tính bước ngoặt như thế nào đến quyết định cắt dây trói của Mị ạ?',
        status: 'approved',
        reply: ''
      },
      {
        id: 'cmt-3',
        authorName: 'Vũ Đình Trọng',
        authorRole: 'Sinh viên Sư phạm Ngữ Văn',
        workTitle: 'Người lái đò Sông Đà (Nguyễn Tuân)',
        workId: 'nguoi-lai-do-song-da',
        date: '01/10/2026 20:15',
        content: 'Phần trích đoạn văn bản Sông Đà rất đầy đủ và chú giải từ ngữ cổ rất hay! Ban Biên Tập có thể bổ sung thêm sơ đồ trực quan các trùng vi thạch trận không ạ?',
        status: 'pending',
        reply: ''
      },
      {
        id: 'cmt-4',
        authorName: 'Phạm Thu Thảo',
        authorRole: 'Giáo viên Ngữ văn THPT',
        workTitle: 'Chiếc thuyền ngoài xa (Nguyễn Minh Châu)',
        workId: 'chiec-thuyen-ngoai-xa',
        date: '30/09/2026 09:20',
        content: 'Cảm ơn website đã biên tập trọn vẹn toàn văn chuẩn SGK. Tư liệu phân tích hình tượng người đàn bà hàng chài rất sâu sắc, giúp ích rất nhiều cho học sinh ôn thi THPT Quốc gia.',
        status: 'replied',
        reply: 'Ban Biên Tập Văn Uyển trân trọng cảm ơn cô giáo! Kính chúc cô và các em học sinh có những tiết học văn thăng hoa và đạt kết quả cao nhất trong kỳ thi sắp tới.'
      },
      {
        id: 'cmt-5',
        authorName: 'Lê Tuấn Kiệt',
        authorRole: 'Độc giả yêu văn học thế giới',
        workTitle: 'Ông già và biển cả (Ernest Hemingway)',
        workId: 'ong-gia-va-bien-ca',
        date: '29/09/2026 18:00',
        content: 'Bản dịch tác phẩm này có dùng bản dịch kinh điển của dịch giả Lê Huy Bắc không ạ?',
        status: 'approved',
        reply: ''
      },
      {
        id: 'cmt-6',
        authorName: 'Bùi Minh Quân',
        authorRole: 'Học sinh Lớp 10',
        workTitle: 'Truyện Kiều (Nguyễn Du)',
        workId: 'truyen-kieu',
        date: '28/09/2026 21:10',
        content: 'Đoạn Kiều ở lầu Ngưng Bích có hệ thống điệp từ \"Buồn trông\" rất hay, mong BBT có thêm bài phân tích chuyên sâu về các cặp câu thơ lục bát này ạ!',
        status: 'pending',
        reply: ''
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_comments');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultComments.map(c => [c.id, c]));
          custom.forEach(c => map.set(c.id, c));
          this.comments = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc bình luận:", e);
    }
    this.comments = defaultComments;
  }

  loadUsersData() {
    const defaultUsers = [
      {
        id: 'admin-tong-bien-tap',
        name: 'Ban Biên Tập Văn Uyển',
        email: 'admin@vanuyen.edu.vn',
        role: 'admin',
        roleTitle: 'Tổng Biên Tập · Quản Trị Hệ Thống CMS',
        status: 'active',
        permissions: ['Toàn quyền hệ thống', 'Quản lý cơ sở dữ liệu Cloud', 'Phê duyệt xuất bản', 'Phân quyền người dùng'],
        articlesCount: 38,
        lastActive: 'Vừa xong'
      },
      {
        id: 'editor-van-hoc-vn',
        name: 'Nguyễn Hoàng Giang',
        email: 'giang.nh@vanuyen.edu.vn',
        role: 'editor',
        roleTitle: 'Biên Tập Viên Văn Học Dân Tộc',
        status: 'active',
        permissions: ['Biên tập toàn văn SGK', 'Quản lý tác giả & nhân vật', 'Duyệt bài phân tích'],
        articlesCount: 24,
        lastActive: '15 phút trước'
      },
      {
        id: 'editor-van-hoc-tg',
        name: 'Trần Lê Phương',
        email: 'phuong.tl@vanuyen.edu.vn',
        role: 'editor',
        roleTitle: 'Biên Tập Viên Văn Học Thế Giới',
        status: 'active',
        permissions: ['Dịch thuật & khảo dị', 'Biên soạn bài viết phê bình', 'Quản lý xuất xứ'],
        articlesCount: 14,
        lastActive: '2 giờ trước'
      },
      {
        id: 'mod-dien-dan',
        name: 'Lê Tuấn Hùng',
        email: 'hung.lt@vanuyen.edu.vn',
        role: 'moderator',
        roleTitle: 'Kiểm Duyệt Viên Đóng Góp & Thảo Luận',
        status: 'active',
        permissions: ['Kiểm duyệt bình luận', 'Trả lời thắc mắc học sinh', 'Chống spam nội dung'],
        articlesCount: 6,
        lastActive: '1 ngày trước'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_users');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultUsers.map(u => [u.id, u]));
          custom.forEach(u => map.set(u.id, u));
          this.users = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc người dùng:", e);
    }
    this.users = defaultUsers;
  }
`;

const originsEndPattern = 'this.origins = Array.from(originMap.values());\n  }';
if (!code.includes(originsEndPattern)) {
  console.error('Cannot find originsEndPattern in code!');
  process.exit(1);
}

code = code.replace(originsEndPattern, originsEndPattern + '\n' + loadersCode);
fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully written clean loaders to admin.js');
