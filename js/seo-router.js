/**
 * VĂN UYỂN - DEDICATED SEO & FRIENDLY URL ROUTER
 * Hệ thống điều hướng thân thiện (Friendly URLs), Quản lý lịch sử duyệt (History API),
 * và Tối ưu hóa công cụ tìm kiếm động (Dynamic SEO Meta & Schema.org JSON-LD).
 */

class LiterarySEORouter {
  constructor() {
    this.siteName = "VĂN UYỂN";
    this.siteTagline = "Tinh Hoa Văn Học Việt Nam & Thế Giới | Thư Tịch Khảo Cứu Toàn Diện";
    this.baseUrl = window.location.origin + window.location.pathname;
    this.isNavigating = false;

    this.init();
  }

  init() {
    // Lắng nghe sự kiện hashchange và popstate để điều hướng Friendly URL mượt mà
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('popstate', () => this.handleRouteChange());

    // Thiết lập Schema.org mặc định cho trang web
    this.injectDefaultSchema();

    // Xử lý route khởi đầu sau khi DOM và dữ liệu đã sẵn sàng
    setTimeout(() => {
      this.handleRouteChange();
    }, 150);
  }

  // Phân tích Friendly URL từ hash (ví dụ: #/tac-pham/truyen-kieu?trang=4)
  parseCurrentHash() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!rawHash) {
      return { path: 'trang-chu', segments: ['trang-chu'], params: {} };
    }

    const [pathPart, queryPart] = rawHash.split('?');
    const segments = pathPart.split('/').filter(Boolean);
    const params = {};

    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, val] of searchParams.entries()) {
        params[key] = val;
      }
    }

    return {
      path: segments.join('/'),
      segments,
      params
    };
  }

  // Điều phối giao diện theo Friendly URL
  handleRouteChange() {
    if (this.isNavigating) return;

    const route = this.parseCurrentHash();
    const primary = route.segments[0] || 'trang-chu';

    // 1. Route Đọc Tác Phẩm: #/tac-pham/:workId (?trang=X)
    if (primary === 'tac-pham' && route.segments[1]) {
      const workId = route.segments[1];
      const pageNum = parseInt(route.params.trang, 10);

      const work = (window.LITERARY_DATA && window.LITERARY_DATA.works) 
        ? window.LITERARY_DATA.works.find(w => w.id === workId)
        : null;

      if (work && window.literaryReader) {
        // Đảm bảo tab thư viện đang mở ngầm
        if (window.literaryApp && window.literaryApp.currentTab !== 'library') {
          window.literaryApp.switchTab('library', false);
        }

        // Mở tác phẩm
        if (window.literaryReader.currentWorkId !== workId || !document.getElementById('reader-modal').classList.contains('active')) {
          window.literaryReader.openWork(workId);
        }

        // Nhảy đến trang cụ thể nếu có tham số ?trang=X
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= window.literaryReader.pages.length) {
          window.literaryReader.goToPage(pageNum - 1);
        }

        this.updateWorkSEO(work, pageNum);
        return;
      }
    }

    // Nếu không phải route đọc tác phẩm, đảm bảo phòng đọc được đóng
    if (window.literaryReader && document.getElementById('reader-modal') && document.getElementById('reader-modal').classList.contains('active')) {
      window.literaryReader.closeReader();
    }

    // 2. Route Thư Viện: #/thu-vien, #/thu-vien/viet-nam, #/thu-vien/the-gioi
    if (primary === 'thu-vien') {
      const sub = route.segments[1];
      if (window.literaryApp) window.literaryApp.switchTab('library', false);

      if (window.literaryLibrary) {
        if (sub === 'viet-nam') {
          window.literaryLibrary.setOriginFilter('vn');
          this.updateTabSEO('library-vn');
        } else if (sub === 'the-gioi') {
          window.literaryLibrary.setOriginFilter('world');
          this.updateTabSEO('library-world');
        } else {
          window.literaryLibrary.setOriginFilter('all');
          this.updateTabSEO('library');
        }
      }
      return;
    }

    // 3. Route Chân Dung Tác Giả: #/tac-gia
    if (primary === 'tac-gia') {
      if (window.literaryApp) window.literaryApp.switchTab('authors', false);
      const authorId = route.segments[1];
      if (authorId) {
        setTimeout(() => {
          const el = document.querySelector(`[data-author-id="${authorId}"]`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
      this.updateTabSEO('authors');
      return;
    }

    // 4. Route Trường Phái & Lịch Sử: #/truong-phai
    if (primary === 'truong-phai') {
      if (window.literaryApp) window.literaryApp.switchTab('movements', false);
      this.updateTabSEO('movements');
      return;
    }

    // 5. Route Điển Tích & Danh Ngôn: #/danh-ngon
    if (primary === 'danh-ngon' || primary === 'dien-tich') {
      if (window.literaryApp) window.literaryApp.switchTab('quotes', false);
      this.updateTabSEO('quotes');
      return;
    }

    // 6. Route Góc Sáng Tác: #/sang-tac
    if (primary === 'sang-tac') {
      if (window.literaryApp) window.literaryApp.switchTab('studio', false);
      this.updateTabSEO('studio');
      return;
    }

    // 7. Route Tủ Sách Cá Nhân: #/tu-sach
    if (primary === 'tu-sach' || primary === 'yeu-thich') {
      if (window.literaryApp) window.literaryApp.switchTab('bookmarks', false);
      this.updateTabSEO('bookmarks');
      return;
    }

    // 8. Mặc định: Trang Bìa Kỳ San
    if (window.literaryApp) window.literaryApp.switchTab('cover', false);
    this.updateTabSEO('cover');
  }

  // Cập nhật Friendly URL khi người dùng thao tác trên giao diện
  navigate(path, replace = false) {
    const targetHash = '#/' + path.replace(/^#?\/?/, '');
    if (window.location.hash === targetHash) return;

    this.isNavigating = true;
    if (replace) {
      window.history.replaceState(null, '', targetHash);
    } else {
      window.history.pushState(null, '', targetHash);
    }
    setTimeout(() => {
      this.isNavigating = false;
    }, 50);
  }

  // Đồng bộ Friendly URL khi chuyển tab
  syncTab(tabId) {
    const tabMap = {
      'cover': '',
      'library': 'thu-vien',
      'authors': 'tac-gia',
      'movements': 'truong-phai',
      'quotes': 'danh-ngon',
      'studio': 'sang-tac',
      'bookmarks': 'tu-sach'
    };

    const path = tabMap[tabId] || '';
    this.navigate(path, false);
    this.updateTabSEO(tabId);
  }

  // Đồng bộ Friendly URL khi mở tác phẩm hoặc chuyển trang sách
  syncWork(workId, pageIndex = 0) {
    let path = `tac-pham/${workId}`;
    if (pageIndex > 0) {
      path += `?trang=${pageIndex + 1}`;
    }
    this.navigate(path, false);

    const work = (window.LITERARY_DATA && window.LITERARY_DATA.works) 
      ? window.LITERARY_DATA.works.find(w => w.id === workId)
      : null;

    if (work) {
      this.updateWorkSEO(work, pageIndex + 1);
    }
  }

  // =========================================================================
  // DYNAMIC SEO & METADATA CONTROLLER
  // =========================================================================

  updateMetaTag(name, content, isProperty = false) {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  updateCanonical(url) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  // Cập nhật SEO cho từng Tab chuyên mục
  updateTabSEO(tabKey) {
    const seoConfig = {
      'cover': {
        title: `${this.siteName} — ${this.siteTagline}`,
        desc: "Kỳ san thư tịch khảo cứu và thư viện văn học kinh điển toàn diện. Đọc trọn vẹn kiệt tác văn học Việt Nam và Thế giới theo phong cách báo chí Editorial với hai gam màu Xanh Cerulean & Đỏ Jasper.",
        keywords: "văn học việt nam, văn học thế giới, truyện kiều, số đỏ, chí phèo, chữ người tử tù, biến thân franz kafka, trăm năm cô đơn, ông già và biển cả, sách giáo khoa ngữ văn, văn uyển"
      },
      'library': {
        title: `Thư Viện Tác Phẩm Toàn Bích | ${this.siteName}`,
        desc: "Kho lưu trữ 14 kiệt tác văn chương bất hủ Việt Nam và Thế giới hiển thị toàn bộ tác phẩm trọn vẹn từ đầu đến cuối, kèm phân định rõ ràng các phân đoạn trích giảng trong Sách Giáo Khoa (SGK).",
        keywords: "thư viện tác phẩm, đọc truyện kiều, số đỏ trọn vẹn, chí phèo toàn văn, lão hạc, văn học kinh điển"
      },
      'library-vn': {
        title: `Văn Học Việt Nam — Dòng Chảy Tinh Hoa Dân Tộc | ${this.siteName}`,
        desc: "Tuyển tập kiệt tác văn học Việt Nam từ trung đại đến hiện đại: Truyện Kiều, Chữ Người Tử Tù, Chí Phèo, Lão Hạc, Hai Đứa Trẻ, Đời Thừa, Tôi Đi Học, Số Đỏ, Vội Vàng, Tràng Giang.",
        keywords: "văn học việt nam, nguyễn du, nam cao, vũ trọng phụng, nguyễn tuân, thạch lam, thanh tịnh, xuân diệu, huy cận"
      },
      'library-world': {
        title: `Văn Học Thế Giới — Đỉnh Cao Nhân Loại | ${this.siteName}`,
        desc: "Khám phá các tuyệt tác văn chương thế giới đoạt giải Nobel và định hình tư tưởng nhân loại: Biến Thân (Franz Kafka), Trăm Năm Cô Đơn (García Márquez), Ông Già Và Biển Cả (Ernest Hemingway), Người Thầy Đầu Tiên (Chingiz Aitmatov).",
        keywords: "văn học thế giới, biến thân franz kafka, trăm năm cô đơn macondo, ông già và biển cả hemingway, người thầy đầu tiên aitmatov"
      },
      'authors': {
        title: `Chân Dung Các Nhà Văn Tiêu Biểu | ${this.siteName}`,
        desc: "Khảo cứu chân dung, sự nghiệp sáng tác, tư tưởng nhân văn và phong cách nghệ thuật của 14 danh nhân văn đàn Việt Nam và Thế giới.",
        keywords: "chân dung tác giả, tiểu sử nguyễn du, cuộc đời nam cao, vũ trọng phụng, franz kafka, hemingway"
      },
      'movements': {
        title: `Trường Phái & Dòng Chảy Lịch Sử Văn Học | ${this.siteName}`,
        desc: "Hành trình tiến hóa của mỹ cảm và các trào lưu tư tưởng văn học từ Trung đại quy phạm, Phong trào Thơ Mới, Hiện thực phê phán đến Chủ nghĩa hiện sinh và Hiện thực huyền ảo.",
        keywords: "trường phái văn học, văn học trung đại, thơ mới 1932-1945, hiện thực phê phán, hiện thực huyền ảo, hiện sinh phi lý"
      },
      'quotes': {
        title: `Minh Triết Văn Đàn & Sổ Tay Điển Tích | ${this.siteName}`,
        desc: "Kho tàng danh ngôn bất hủ về sứ mệnh văn chương, con người và nghệ thuật, cùng bộ bách khoa giải nghĩa các điển tích điển cố văn học kinh điển.",
        keywords: "danh ngôn văn học, điển tích điển cố, gót chân achilles, lầu ngưng bích, bát cháo hành thị nở, trăm năm cô đơn"
      },
      'studio': {
        title: `Góc Sáng Tác & Thư Phòng Bản Thảo | ${this.siteName}`,
        desc: "Không gian khởi bút sáng tác thi ca, truyện ngắn và tản văn cá nhân với giao diện Typography Editorial chuẩn mực và bản xem trước tạp chí trực quan.",
        keywords: "góc sáng tác, viết văn, viết thơ, bản thảo văn chương, thư phòng ảo"
      },
      'bookmarks': {
        title: `Tủ Sách Cá Nhân Của Bạn | ${this.siteName}`,
        desc: "Bộ sưu tập các tác phẩm văn học kinh điển bạn đã lưu lại để nghiền ngẫm và nghiên cứu chuyên sâu.",
        keywords: "tủ sách cá nhân, tác phẩm yêu thích, lưu trữ văn học"
      }
    };

    const cfg = seoConfig[tabKey] || seoConfig['cover'];
    document.title = cfg.title;

    this.updateMetaTag('title', cfg.title);
    this.updateMetaTag('description', cfg.desc);
    this.updateMetaTag('keywords', cfg.keywords);
    this.updateMetaTag('og:title', cfg.title, true);
    this.updateMetaTag('og:description', cfg.desc, true);
    this.updateMetaTag('twitter:title', cfg.title);
    this.updateMetaTag('twitter:description', cfg.desc);

    const fullUrl = window.location.href;
    this.updateMetaTag('og:url', fullUrl, true);
    this.updateCanonical(fullUrl);
  }

  // Cập nhật SEO động khi đang đọc tác phẩm cụ thể
  updateWorkSEO(work, pageNum = 1) {
    const pageText = pageNum > 1 ? ` (Trang ${pageNum})` : '';
    const title = `Đọc ${work.title} — ${work.author}${pageText} | ${this.siteName}`;
    const desc = `${work.excerpt} • Thể loại: ${work.category} (${work.year}). Bản đọc toàn bộ tác phẩm chuẩn phong cách Editorial cao cấp.`;
    const keywords = `${work.title}, ${work.author}, ${work.tags ? work.tags.join(', ') : ''}, đọc tác phẩm, văn uyển`;
    const imgUrl = work.image ? new URL(work.image, window.location.href).href : '';

    document.title = title;

    this.updateMetaTag('title', title);
    this.updateMetaTag('description', desc);
    this.updateMetaTag('keywords', keywords);
    this.updateMetaTag('og:title', title, true);
    this.updateMetaTag('og:description', desc, true);
    if (imgUrl) this.updateMetaTag('og:image', imgUrl, true);
    this.updateMetaTag('twitter:title', title);
    this.updateMetaTag('twitter:description', desc);
    if (imgUrl) this.updateMetaTag('twitter:image', imgUrl);

    const fullUrl = window.location.href;
    this.updateMetaTag('og:url', fullUrl, true);
    this.updateCanonical(fullUrl);

    // Bơm Schema.org Book / CreativeWork động cho tác phẩm
    this.injectWorkSchema(work);
  }

  // Bơm Schema.org cấu trúc WebSite & Breadcrumbs
  injectDefaultSchema() {
    let script = document.getElementById('seo-schema-website');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema-website';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${this.baseUrl}#website`,
          "url": this.baseUrl,
          "name": this.siteName,
          "description": this.siteTagline,
          "inLanguage": "vi-VN",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${this.baseUrl}#/tim-kiem?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": `${this.baseUrl}#organization`,
          "name": this.siteName,
          "url": this.baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": new URL("assets/images/editorial_cover.jpg", window.location.href).href
          }
        }
      ]
    };

    script.textContent = JSON.stringify(schemaData, null, 2);
  }

  // Bơm Schema.org cho tác phẩm đang đọc (Book / LiteraryWork)
  injectWorkSchema(work) {
    let script = document.getElementById('seo-schema-work');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema-work';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": work.title,
      "headline": work.title,
      "author": {
        "@type": "Person",
        "name": work.author
      },
      "genre": work.category,
      "datePublished": work.year,
      "inLanguage": "vi-VN",
      "description": work.excerpt,
      "image": work.image ? new URL(work.image, window.location.href).href : undefined,
      "publisher": {
        "@type": "Organization",
        "name": this.siteName,
        "url": this.baseUrl
      },
      "educationalUse": "Tài liệu học tập & giảng dạy Ngữ Văn THPT",
      "hasPart": {
        "@type": "EducationalOccupationalCredential",
        "name": work.sgkDetail || "Đoạn trích Sách Giáo Khoa"
      }
    };

    script.textContent = JSON.stringify(schemaData, null, 2);
  }
}

window.literarySEO = new LiterarySEORouter();
