/**
 * VĂN UYỂN - DEDICATED EDITORIAL READER CONTROLLER
 * Xử lý phòng đọc sách: Chế độ lật trang (không cuộn), Phân trang chương hồi,
 * Xem lại đoạn trước tức thì, Cỡ chữ, Nền giấy, Thanh tiến trình & Cước chú tương tác.
 */

class LiteraryReader {
  constructor() {
    this.currentWorkId = null;
    this.fontSize = 18; // px
    this.minFontSize = 15;
    this.maxFontSize = 26;
    this.currentTheme = 'default';
    this.readingMode = 'page'; // 'page' (lật trang - mặc định) hoặc 'scroll' (cuộn liên tục)

    this.pages = [];
    this.currentPage = 0;
    this.fullContent = '';

    this.modal = null;
    this.progressBar = null;
    this.popover = null;

    // Các phần tử thanh phân trang
    this.pageBar = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.prevTitle = null;
    this.nextTitle = null;
    this.pageCounter = null;
    this.pageDots = null;
    this.pageMenu = null;
    this.modeBtnPage = null;
    this.modeBtnScroll = null;
    this.sideFlipLeft = null;
    this.sideFlipRight = null;

    // Bố cục cột đọc sách (Mặc định 2 cột theo yêu cầu)
    this.columnMode = 2;
    this.btnCol1 = null;
    this.btnCol2 = null;
    this.bodyWrapper = null;

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.modal = document.getElementById('reader-modal');
    this.progressBar = document.getElementById('reader-progress-bar');
    this.popover = document.getElementById('annotation-popover');

    this.pageBar = document.getElementById('reader-page-bar');
    this.prevBtn = document.getElementById('reader-prev-page-btn');
    this.nextBtn = document.getElementById('reader-next-page-btn');
    this.prevTitle = document.getElementById('reader-prev-title');
    this.nextTitle = document.getElementById('reader-next-title');
    this.pageCounter = document.getElementById('reader-page-counter');
    this.pageDots = document.getElementById('reader-page-dots');
    this.pageMenu = document.getElementById('reader-page-menu');
    this.modeBtnPage = document.getElementById('btn-mode-page');
    this.modeBtnScroll = document.getElementById('btn-mode-scroll');
    this.sideFlipLeft = document.getElementById('side-flip-left');
    this.sideFlipRight = document.getElementById('side-flip-right');

    this.btnCol1 = document.getElementById('btn-col-1');
    this.btnCol2 = document.getElementById('btn-col-2');
    this.bodyWrapper = document.querySelector('.reader-body-wrapper');
  }

  bindEvents() {
    // Lắng nghe cuộn trang trong Reader để cập nhật thanh tiến trình (cho chế độ cuộn)
    if (this.modal) {
      this.modal.addEventListener('scroll', () => {
        if (this.readingMode === 'scroll') {
          this.updateProgressBar();
        }
      });
    }

    // Đóng popover khi nhấp ra ngoài
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.footnote-ref') && !e.target.closest('.annotation-popover')) {
        this.hideAnnotation();
      }
    });

    // Phím tắt bàn phím tiện lợi
    document.addEventListener('keydown', (e) => {
      if (this.modal && this.modal.classList.contains('active')) {
        if (e.key === 'Escape') {
          this.closeReader();
          return;
        }

        // Trong chế độ lật trang sách, hỗ trợ phím mũi tên lật trang
        if (this.readingMode === 'page') {
          if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            this.prevPage();
          } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            e.preventDefault();
            this.nextPage();
          }
        }
      }
    });
  }

  // Phân chia nội dung tác phẩm thành các trang sách (theo chương/hồi/khúc)
  parsePages(content) {
    const parts = content.split(/(?=<h3 class="reader-chapter-title")/i);
    let banner = '';
    const pages = [];

    parts.forEach((part, idx) => {
      // Nếu phần đầu chỉ chứa banner toàn văn hoặc đoạn mở đầu
      if (idx === 0 && !part.includes('<h3 class="reader-chapter-title"')) {
        banner = part;
        return;
      }

      const match = part.match(/<h3 class="reader-chapter-title"[^>]*>(.*?)<\/h3>/i);
      const title = match ? match[1].replace(/<[^>]+>/g, '').trim() : `Phần ${pages.length + 1}`;
      const shortTitle = title.length > 25 ? title.substring(0, 22) + '...' : title;

      let html = part;
      if (pages.length === 0 && banner) {
        html = banner + html;
      }

      pages.push({
        title,
        shortTitle,
        html,
        hasSgk: html.includes('sgk-notice-box')
      });
    });

    if (pages.length === 0) {
      pages.push({
        title: 'Toàn văn tác phẩm',
        shortTitle: 'Toàn văn',
        html: content,
        hasSgk: content.includes('sgk-notice-box')
      });
    }

    return pages;
  }

  async openWork(workId) {
    let work = (window.LITERARY_DATA && window.LITERARY_DATA.works) 
      ? window.LITERARY_DATA.works.find(w => w.id === workId) 
      : null;
    if (!work) return;

    // Kiểm tra xem có bản cập nhật mới nhất từ Firestore không
    if (window.firebaseService) {
      try {
        // Xóa cache cũ để đảm bảo lấy dữ liệu mới nhất từ Firestore
        if (window.firebaseService.cachedCustomWorks) {
          window.firebaseService.cachedCustomWorks.delete(workId);
        }
        const firestoreWork = await window.firebaseService.getWork(workId);
        // ✅ Merge toàn bộ trường Firestore (không chỉ khi có content)
        // Điều này đảm bảo ảnh bìa, trích đoạn, lời đề từ... luôn đồng bộ
        if (firestoreWork) {
          work = { ...work, ...firestoreWork };
          const idx = window.LITERARY_DATA.works.findIndex(w => w.id === workId);
          if (idx >= 0) window.LITERARY_DATA.works[idx] = work;
        }
      } catch (e) {
        console.warn("[Reader] Sử dụng bản sao tác phẩm nội bộ:", e);
      }
    }

    this.currentWorkId = workId;
    this.fullContent = work.content;
    this.pages = this.parsePages(work.content);

    // Ghi nhận sự kiện đọc sách vào Google Analytics
    if (window.firebaseService && typeof window.firebaseService.trackEvent === 'function') {
      window.firebaseService.trackEvent('read_work', { work_id: workId, title: work.title || '' });
    }
    this.currentPage = 0;

    // Phát âm thanh lật sách nhẹ
    if (window.literaryAudio) {
      window.literaryAudio.playPageTurnSound();
    }

    // Điền metadata cơ bản vào phòng đọc
    const miniTitle = document.getElementById('reader-mini-title');
    const miniAuthor = document.getElementById('reader-mini-author');
    const miniBadge = document.getElementById('reader-mini-badge');
    const category = document.getElementById('reader-category');
    const title = document.getElementById('reader-main-title');
    const author = document.getElementById('reader-author');
    const metaEra = document.getElementById('reader-meta-era');
    const metaTime = document.getElementById('reader-meta-time');
    const epigraph = document.getElementById('reader-epigraph');
    const criticism = document.getElementById('reader-criticism-text');

    if (miniTitle) miniTitle.textContent = work.title;
    if (miniAuthor) {
      miniAuthor.textContent = work.author || '';
      miniAuthor.style.display = work.author ? 'inline' : 'none';
    }
    if (miniBadge) {
      miniBadge.textContent = work.fullTextStatus ? (work.fullTextStatus.includes('SGK') ? 'SGK & Toàn Văn' : 'Toàn Văn') : 'Toàn Văn';
    }
    const originText = work.origin === 'world' ? 'Văn học Thế giới' : 'Văn học Việt Nam';
    if (category) category.textContent = `${originText} • ${work.category} • ${work.era}`;
    if (title) title.textContent = work.title;
    if (author) {
      author.textContent = work.author;
      author.setAttribute('data-author-id', work.authorId);
    }
    if (metaEra) metaEra.textContent = `Năm: ${work.year} (${work.country || (work.origin === 'world' ? 'Thế Giới' : 'Việt Nam')})`;
    if (metaTime) metaTime.textContent = work.readTime;
    if (epigraph) {
      epigraph.textContent = `“${work.epigraph}”`;
    }
    if (criticism) {
      criticism.textContent = work.criticism;
    }

    // Cập nhật ảnh minh họa tác phẩm
    const illuBox = document.getElementById('reader-illustration-box');
    const illuImg = document.getElementById('reader-illustration-img');
    const illuCaption = document.getElementById('reader-illustration-caption');

    if (illuBox && illuImg) {
      if (work.content && work.content.includes('chapter-illustration-frame')) {
        // Từng hồi/chương đã có ảnh minh họa riêng, ẩn ảnh chung ở đầu để trang đọc thanh lịch
        illuBox.style.display = 'none';
      } else if (work.image) {
        illuImg.src = work.image;
        illuImg.alt = work.title;
        if (illuCaption) illuCaption.textContent = work.imageCaption || `Minh họa cho tác phẩm ${work.title}`;
        illuBox.style.display = 'block';
      } else {
        illuBox.style.display = 'none';
      }
    }

    // Nhận diện thơ ca chuẩn xác để căn giữa và ngăn drop-cap
    const prose = document.getElementById('reader-prose');
    if (prose) {
      const cat = (work.category || '').toLowerCase();
      const tit = (work.title || '').toLowerCase();
      const isPoetry = cat.includes('thơ') || 
                       cat.includes('lục bát') || 
                       cat.includes('trường ca') || 
                       tit.includes('truyện kiều') ||
                       tit.includes('vội vàng') ||
                       tit.includes('tràng giang') ||
                       tit.includes('tây tiến') ||
                       tit.includes('việt bắc') ||
                       tit.includes('sóng') ||
                       tit.includes('đồng chí') ||
                       tit.includes('đây thôn vĩ dạ') ||
                       tit.includes('nhớ rừng') ||
                       tit.includes('đoàn thuyền đánh cá') ||
                       tit.includes('bếp lửa') ||
                       (work.tags && work.tags.some(t => t.toLowerCase().includes('thơ')));

      if (isPoetry) {
        prose.classList.add('poetry-mode');
        prose.classList.remove('prose-mode');
        prose.classList.remove('drop-cap');
      } else {
        prose.classList.remove('poetry-mode');
        prose.classList.add('prose-mode');
        prose.classList.add('drop-cap');
      }
    }

    // Cập nhật bookmark
    this.updateBookmarkState(workId);

    // Mở modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hiển thị giao diện theo chế độ đọc đã chọn
    this.renderCurrentView();

    // Kết xuất menu danh sách toàn bộ tác phẩm có thanh cuộn trong phòng đọc
    this.renderReaderWorksMenu();

    // Kết xuất menu mục lục chi tiết động đồng bộ theo từng tác phẩm
    this.renderReaderTocMenu(work);

    // Đồng bộ Friendly URL & SEO
    if (window.literarySEO) {
      window.literarySEO.syncWork(workId, this.currentPage);
    }
  }

  // Kết xuất danh sách tác phẩm trong menu phòng đọc có thanh cuộn mượt và ô tìm kiếm nhanh
  renderReaderWorksMenu(filterKeyword = '') {
    const menu = document.getElementById('reader-works-menu');
    if (!menu || !window.LITERARY_DATA || !window.LITERARY_DATA.works) return;

    // Sắp xếp theo bảng chữ cái A-Z chuẩn tiếng Việt
    const allWorks = [...window.LITERARY_DATA.works].sort((a, b) => 
      (a.title || '').trim().localeCompare((b.title || '').trim(), 'vi', { sensitivity: 'base' })
    );

    const kw = (filterKeyword || '').trim().toLowerCase();
    const works = kw 
      ? allWorks.filter(w => (w.title || '').toLowerCase().includes(kw) || (w.author || '').toLowerCase().includes(kw))
      : allWorks;

    const itemsHtml = works.length > 0 ? works.map(w => `
      <div class="editorial-dropdown-item ${w.id === this.currentWorkId ? 'active' : ''}" 
           onclick="window.literaryReader.openWork('${w.id}'); if (window.editorialDropdown) window.editorialDropdown.closeAll();" 
           style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; padding: 0.5rem 0.85rem;">
        <span style="font-size: 0.85rem; font-weight: ${w.id === this.currentWorkId ? '700' : '500'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 190px;">${w.title}</span>
        <span class="work-origin-badge ${w.origin === 'world' ? 'world' : 'vn'}" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; flex-shrink: 0;">${w.origin === 'world' ? 'Thế giới' : 'Việt Nam'}</span>
      </div>
    `).join('') : `<div style="padding: 1rem; text-align: center; font-size: 0.82rem; color: var(--ink-muted); font-style: italic;">Không tìm thấy tác phẩm nào.</div>`;

    menu.innerHTML = `
      <div class="reader-dropdown-search-wrap">
        <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" class="reader-dropdown-search-input" value="${filterKeyword}" placeholder="Tìm nhanh trong kho..." oninput="window.literaryReader.filterWorksMenu(this.value)">
      </div>
      <div class="editorial-dropdown-header">Kho ${allWorks.length} Tác Phẩm Kinh Điển (A — Z)</div>
      <div class="reader-works-scroll-container">
        ${itemsHtml}
      </div>
    `;
  }

  filterWorksMenu(val) {
    const container = document.querySelector('#reader-works-menu .reader-works-scroll-container');
    if (!container || !window.LITERARY_DATA || !window.LITERARY_DATA.works) {
      this.renderReaderWorksMenu(val);
      return;
    }
    const kw = (val || '').trim().toLowerCase();
    const allWorks = [...window.LITERARY_DATA.works].sort((a, b) => 
      (a.title || '').trim().localeCompare((b.title || '').trim(), 'vi', { sensitivity: 'base' })
    );
    const works = kw 
      ? allWorks.filter(w => (w.title || '').toLowerCase().includes(kw) || (w.author || '').toLowerCase().includes(kw))
      : allWorks;

    container.innerHTML = works.length > 0 ? works.map(w => `
      <div class="editorial-dropdown-item ${w.id === this.currentWorkId ? 'active' : ''}" 
           onclick="window.literaryReader.openWork('${w.id}'); if (window.editorialDropdown) window.editorialDropdown.closeAll();" 
           style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; padding: 0.5rem 0.85rem;">
        <span style="font-size: 0.85rem; font-weight: ${w.id === this.currentWorkId ? '700' : '500'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 190px;">${w.title}</span>
        <span class="work-origin-badge ${w.origin === 'world' ? 'world' : 'vn'}" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; flex-shrink: 0;">${w.origin === 'world' ? 'Thế giới' : 'Việt Nam'}</span>
      </div>
    `).join('') : `<div style="padding: 1rem; text-align: center; font-size: 0.82rem; color: var(--ink-muted); font-style: italic;">Không tìm thấy tác phẩm nào.</div>`;
  }

  // Kết xuất mục lục chi tiết động đồng bộ theo từng tác phẩm
  renderReaderTocMenu(work) {
    const menu = document.getElementById('reader-toc-menu');
    if (!menu) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.fullContent || (work && work.content) || '';

    let itemsHtml = `
      <div class="editorial-dropdown-header">Điều hướng nhanh tác phẩm</div>
      <div class="editorial-dropdown-item" onclick="window.literaryReader.jumpToHeading('top')">
        <span style="font-weight:600;">✦ Khởi đầu tác phẩm</span>
        <span class="item-meta">Trang đầu</span>
      </div>
    `;

    // Quét các tiêu đề chương/phần hoặc đoạn SGK
    const headings = tempDiv.querySelectorAll('h3, .reader-chapter-title, .sgk-notice-box, .reader-criticism-box');
    
    if (headings && headings.length > 0) {
      headings.forEach((el, idx) => {
        const isSgk = el.classList.contains('sgk-notice-box') || (el.id && el.id.includes('sgk'));
        const isCrit = el.classList.contains('reader-criticism-box') || el.classList.contains('criticism-title');
        let text = el.textContent.trim().replace(/\s+/g, ' ');
        if (isSgk) {
          text = 'Đoạn trích Sách Giáo Khoa (SGK)';
        } else if (isCrit) {
          text = 'Bình Phẩm & Chiều Sâu Tư Tưởng';
        }
        if (text.length > 42) {
          text = text.substring(0, 40) + '…';
        }

        const targetId = el.id || (isSgk ? 'sgk-box' : (isCrit ? 'reader-criticism' : `heading-${idx}`));
        itemsHtml += `
          <div class="editorial-dropdown-item" onclick="window.literaryReader.jumpToHeading('${targetId}', ${idx})">
            <span style="${isSgk ? 'color: var(--jasper-600); font-weight: 700;' : ''}">${text}</span>
            ${isSgk ? '<span class="nav-dropdown-tag world" style="font-size:0.65rem;">SGK</span>' : ''}
          </div>
        `;
      });
    } else {
      itemsHtml += `
        <div class="editorial-dropdown-item" onclick="window.literaryReader.jumpToHeading('criticism')">
          <span>Bình Phẩm & Chiều Sâu Tư Tưởng</span>
        </div>
      `;
    }

    menu.innerHTML = itemsHtml;
  }

  jumpToHeading(targetId, headingIdx = 0) {
    if (window.editorialDropdown) window.editorialDropdown.closeAll();
    const modal = this.modal;
    if (!modal) return;

    if (targetId === 'top') {
      if (this.readingMode === 'page') this.goToPage(0);
      else modal.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.readingMode === 'page') {
      const pageIdx = this.pages.findIndex(p => {
        if (targetId.includes('sgk') && p.hasSgk) return true;
        if (p.content.includes(targetId)) return true;
        return false;
      });
      if (pageIdx >= 0) {
        this.goToPage(pageIdx);
        return;
      }
    }

    let targetEl = null;
    if (targetId.includes('sgk')) {
      targetEl = modal.querySelector('.sgk-notice-box') || modal.querySelector('[id*="sgk"]');
    } else if (targetId.includes('criticism')) {
      targetEl = modal.querySelector('.reader-criticism-box');
    } else if (targetId) {
      targetEl = modal.querySelector(`#${targetId}`);
      if (!targetEl) {
        const headings = modal.querySelectorAll('h3, .reader-chapter-title');
        if (headings && headings[headingIdx]) targetEl = headings[headingIdx];
      }
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.style.transition = 'box-shadow 0.4s ease';
      targetEl.style.boxShadow = '0 0 0 3px var(--jasper-600)';
      setTimeout(() => { targetEl.style.boxShadow = ''; }, 2000);
    } else {
      modal.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Hiển thị chế độ xem: Lật trang (page) hoặc Cuộn liên tục (scroll)
  renderCurrentView() {
    const prose = document.getElementById('reader-prose');
    if (!prose) return;

    // Áp dụng bố cục 2 cột (mặc định) hoặc 1 cột
    this.applyColumnMode();

    if (this.modeBtnPage) this.modeBtnPage.classList.toggle('active', this.readingMode === 'page');
    if (this.modeBtnScroll) this.modeBtnScroll.classList.toggle('active', this.readingMode === 'scroll');

    if (this.readingMode === 'page') {
      if (this.pageBar) this.pageBar.style.display = 'block';
      this.renderCurrentPage();
    } else {
      // Chế độ cuộn toàn văn
      if (this.pageBar) this.pageBar.style.display = 'none';
      if (this.sideFlipLeft) this.sideFlipLeft.style.display = 'none';
      if (this.sideFlipRight) this.sideFlipRight.style.display = 'none';

      prose.innerHTML = this.fullContent;
      this.attachFootnoteListeners(prose);
      this.attachSgkJumpListeners(prose);
      this.updateProgressBar();
    }
  }

  // Hiển thị nội dung trang hiện tại trong chế độ Lật Trang
  renderCurrentPage() {
    const prose = document.getElementById('reader-prose');
    if (!prose || this.pages.length === 0) return;

    const page = this.pages[this.currentPage];

    // Banner nhắc nhở "Xem lại đoạn trước" nếu không phải trang đầu
    let reviewBanner = '';
    if (this.currentPage > 0) {
      const prevPage = this.pages[this.currentPage - 1];
      reviewBanner = `
        <div class="quick-review-banner">
          <span>Đang đọc: <strong>${page.title}</strong></span>
          <button type="button" onclick="window.literaryReader.prevPage()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Xem lại đoạn trước: <strong>${prevPage.shortTitle}</strong> (Phím ←)</span>
          </button>
        </div>
      `;
    }

    // Hiển thị nội dung trang với hiệu ứng lật trang êm ái
    prose.innerHTML = `
      <div class="reader-page-fade">
        ${reviewBanner}
        ${page.html}
      </div>
    `;

    // Cuộn êm ái lên đầu trang
    if (this.modal) {
      this.modal.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Gắn sự kiện chú thích và nhảy SGK
    this.attachFootnoteListeners(prose);
    this.attachSgkJumpListeners(prose);

    // Cập nhật trạng thái nút Lật Trước
    if (this.prevBtn && this.prevTitle) {
      if (this.currentPage === 0) {
        this.prevBtn.disabled = true;
        this.prevTitle.textContent = "Đầu tác phẩm";
        if (this.sideFlipLeft) this.sideFlipLeft.style.display = 'none';
      } else {
        this.prevBtn.disabled = false;
        this.prevTitle.textContent = this.pages[this.currentPage - 1].shortTitle;
        if (this.sideFlipLeft) this.sideFlipLeft.style.display = 'flex';
      }
    }

    // Cập nhật trạng thái nút Lật Sau
    if (this.nextBtn && this.nextTitle) {
      if (this.currentPage === this.pages.length - 1) {
        this.nextBtn.disabled = false;
        this.nextTitle.textContent = "Hết tác phẩm • Bình luận";
        if (this.sideFlipRight) this.sideFlipRight.style.display = 'none';
      } else {
        this.nextBtn.disabled = false;
        this.nextTitle.textContent = this.pages[this.currentPage + 1].shortTitle;
        if (this.sideFlipRight) this.sideFlipRight.style.display = 'flex';
      }
    }

    // Cập nhật text bộ đếm trang
    if (this.pageCounter) {
      this.pageCounter.textContent = `Trang ${this.currentPage + 1} / ${this.pages.length}`;
    }

    // Cập nhật tiến trình chấm trang (Segmented Dots)
    if (this.pageDots) {
      this.pageDots.innerHTML = this.pages.map((p, idx) => `
        <span class="page-dot ${idx === this.currentPage ? 'active' : ''}" 
              title="${p.title}" 
              onclick="window.literaryReader.goToPage(${idx})"></span>
      `).join('');
    }

    // Cập nhật danh sách chọn trang nhanh trong dropdown
    if (this.pageMenu) {
      this.pageMenu.innerHTML = `
        <div class="editorial-dropdown-header">Mục lục các phần tác phẩm</div>
        ${this.pages.map((p, idx) => `
          <div class="editorial-dropdown-item ${idx === this.currentPage ? 'active' : ''}" onclick="window.literaryReader.goToPage(${idx}); if (window.editorialDropdown) window.editorialDropdown.closeAll();">
            <span style="font-size: 0.85rem;">${idx + 1}. ${p.title}</span>
            ${p.hasSgk ? '<span style="color:var(--jasper-600); font-weight:800; font-size:0.7rem; margin-left:0.5rem;">[SGK]</span>' : ''}
          </div>
        `).join('')}
      `;
    }

    // Cập nhật thanh tiến trình đọc trên cùng
    const progressPercent = ((this.currentPage + 1) / this.pages.length) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progressPercent}%`;
    }
  }

  // Lật lại trang trước (xem lại đoạn vừa đọc)
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      if (window.literaryAudio) {
        window.literaryAudio.playPageTurnSound();
      }
      this.renderCurrentPage();
      if (window.literarySEO) {
        window.literarySEO.syncWork(this.currentWorkId, this.currentPage);
      }
    }
  }

  // Lật sang trang kế tiếp
  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      if (window.literaryAudio) {
        window.literaryAudio.playPageTurnSound();
      }
      this.renderCurrentPage();
      if (window.literarySEO) {
        window.literarySEO.syncWork(this.currentWorkId, this.currentPage);
      }
    } else {
      // Đã ở trang cuối: cuộn mượt xuống khung bình phẩm
      const critBox = document.querySelector('.reader-criticism-box');
      if (critBox) {
        critBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Nhảy trực tiếp đến một trang cụ thể
  goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.currentPage = pageIndex;
      if (window.literaryAudio) {
        window.literaryAudio.playPageTurnSound();
      }
      this.renderCurrentPage();
      if (window.literarySEO) {
        window.literarySEO.syncWork(this.currentWorkId, this.currentPage);
      }
    }
  }

  // Chuyển đổi giữa chế độ Lật Trang và Cuộn Liên Tục
  setReadingMode(mode) {
    this.readingMode = mode;
    this.renderCurrentView();
    const msg = mode === 'page' 
      ? 'Đã chuyển sang chế độ lật trang sách (phím ← và →)' 
      : 'Đã chuyển sang chế độ cuộn đọc toàn văn';
    if (window.literaryApp) {
      window.literaryApp.showToast(msg);
    }
  }

  // Chuyển đổi giữa bố cục 2 cột (mở sách) và 1 cột
  setColumnMode(cols) {
    this.columnMode = cols;
    this.applyColumnMode();
    const msg = cols === 2 
      ? 'Đã bật bố cục 2 cột (trang sách mở song song)' 
      : 'Đã chuyển sang bố cục 1 cột truyền thống';
    if (window.literaryApp) {
      window.literaryApp.showToast(msg);
    }
  }

  applyColumnMode() {
    if (!this.bodyWrapper) {
      this.bodyWrapper = document.querySelector('.reader-body-wrapper');
    }
    const prose = document.getElementById('reader-prose');
    const isCol2 = (this.columnMode === 2);

    if (this.bodyWrapper) {
      this.bodyWrapper.classList.toggle('two-column-mode', isCol2);
    }
    if (prose) {
      prose.classList.toggle('two-column-mode', isCol2);
    }
    if (this.btnCol2) this.btnCol2.classList.toggle('active', isCol2);
    if (this.btnCol1) this.btnCol1.classList.toggle('active', !isCol2);
  }

  closeReader() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      this.hideAnnotation();

      // Trả lại URL và SEO của Thư viện
      if (window.literarySEO && window.literarySEO.parseCurrentHash().segments[0] === 'tac-pham') {
        window.literarySEO.syncTab('library');
      }
    }
  }

  updateProgressBar() {
    if (!this.modal || !this.progressBar) return;
    const scrollHeight = this.modal.scrollHeight - this.modal.clientHeight;
    if (scrollHeight <= 0) {
      this.progressBar.style.width = '100%';
      return;
    }
    const currentScroll = this.modal.scrollTop;
    const progressPercent = Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100));
    this.progressBar.style.width = `${progressPercent}%`;
  }

  // Tùy chỉnh cỡ chữ
  changeFontSize(delta) {
    this.fontSize = Math.min(this.maxFontSize, Math.max(this.minFontSize, this.fontSize + delta));
    const prose = document.getElementById('reader-prose');
    if (prose) {
      prose.style.fontSize = `${this.fontSize}px`;
    }
    const sizeDisplay = document.getElementById('reader-font-indicator');
    if (sizeDisplay) {
      sizeDisplay.textContent = `${this.fontSize}px`;
    }
  }

  resetFontSize() {
    this.fontSize = 18;
    this.changeFontSize(0);
  }

  // Chuyển đổi theme phòng đọc: default, parchment, nocturne
  setTheme(themeName) {
    this.currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
  }

  // Gắn sự kiện cho cước chú (Footnotes)
  attachFootnoteListeners(container) {
    const refs = container.querySelectorAll('.footnote-ref');
    refs.forEach(ref => {
      ref.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteText = ref.getAttribute('data-note');
        this.showAnnotation(noteText, ref);
      });
    });
  }

  // Gắn sự kiện nhảy mượt đến đoạn Sách Giáo Khoa
  attachSgkJumpListeners(container) {
    const jumpBtns = container.querySelectorAll('.reader-jump-sgk-btn');
    jumpBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = container.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.style.transition = 'box-shadow 0.4s ease';
            targetEl.style.boxShadow = '0 0 0 3px var(--jasper-600)';
            setTimeout(() => {
              targetEl.style.boxShadow = '';
            }, 2000);
          }
        }
      });
    });
  }

  showAnnotation(noteText, targetElement) {
    if (!this.popover) return;
    const textEl = document.getElementById('annotation-popover-text');
    if (textEl) textEl.textContent = noteText;

    const rect = targetElement.getBoundingClientRect();
    const modalRect = this.modal.getBoundingClientRect();

    let top = rect.bottom - modalRect.top + this.modal.scrollTop + 8;
    let left = rect.left - modalRect.left - 60;

    if (left + 320 > window.innerWidth) {
      left = window.innerWidth - 340;
    }
    if (left < 10) left = 10;

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
    this.popover.classList.add('show');
  }

  hideAnnotation() {
    if (this.popover) {
      this.popover.classList.remove('show');
    }
  }

  // Quản lý Bookmark trong Reader
  toggleBookmarkCurrent() {
    if (!this.currentWorkId) return;
    if (window.literaryApp) {
      const isBookmarked = window.literaryApp.toggleBookmark(this.currentWorkId);
      this.updateBookmarkState(this.currentWorkId);
    }
  }

  updateBookmarkState(workId) {
    const bookmarkBtn = document.getElementById('reader-bookmark-btn');
    if (!bookmarkBtn) return;

    const bookmarks = JSON.parse(localStorage.getItem('vanuyen_bookmarks') || '[]');
    const isSaved = bookmarks.includes(workId);

    if (isSaved) {
      bookmarkBtn.classList.add('bookmarked');
      const icon = window.LiteraryIcons ? window.LiteraryIcons.get('bookmarkFilled', 'icon-sm') : '★';
      bookmarkBtn.innerHTML = `${icon} <span>Đã lưu tủ sách</span>`;
      bookmarkBtn.style.color = 'var(--jasper-600)';
    } else {
      bookmarkBtn.classList.remove('bookmarked');
      const icon = window.LiteraryIcons ? window.LiteraryIcons.get('bookmark', 'icon-sm') : '☆';
      bookmarkBtn.innerHTML = `${icon} <span>Lưu vào tủ sách</span>`;
      bookmarkBtn.style.color = '';
    }
  }

  navigateWork(direction) {
    const works = LITERARY_DATA.works;
    const currentIndex = works.findIndex(w => w.id === this.currentWorkId);
    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = works.length - 1;
    if (newIndex >= works.length) newIndex = 0;

    this.openWork(works[newIndex].id);
  }
}

window.literaryReader = new LiteraryReader();
