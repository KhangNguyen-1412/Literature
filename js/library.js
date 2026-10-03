/**
 * VĂN UYỂN - LITERARY ARCHIVE & MODULES RENDERER
 * Hiển thị Thư viện tác phẩm, Chân dung tác giả, Trường phái, Điển tích, Trích dẫn
 */

class LiteraryLibrary {
  constructor() {
    this.currentOrigin = 'all'; // 'all', 'vn', 'world'
    this.currentCategory = 'all';
    this.currentSort = 'default';
    this.currentQuoteIndex = 0;
    this.scrollInitialized = false;
    this.authorViewMode = 'list'; // Mặc định hiển thị trang tác giả dạng danh sách
    this.authorOriginFilter = 'all';
    this.authorSearchQuery = '';
  }

  // --- CUỘN LÊN ĐẦU DANH SÁCH TÁC PHẨM ---
  scrollToTop() {
    const wrapper = document.getElementById('works-scroll-wrapper');
    if (wrapper) {
      wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const floatBtn = document.getElementById('works-float-top-btn');
    if (floatBtn) floatBtn.classList.remove('visible');
  }

  // --- BẬT / TẮT CHẾ ĐỘ KHUNG CUỘN GỌN VS MỞ RỘNG TOÀN TRANG ---
  toggleScrollView(btn) {
    const wrapper = document.getElementById('works-scroll-wrapper');
    if (!wrapper) return;
    const isUnconstrained = wrapper.classList.toggle('unconstrained');
    const textSpan = document.getElementById('scroll-toggle-text');
    if (textSpan) {
      textSpan.textContent = isUnconstrained ? 'Mở rộng' : 'Khung cuộn';
    }
    if (btn) {
      btn.classList.toggle('active', !isUnconstrained);
      btn.title = isUnconstrained ? 'Thu gọn về chế độ khung cuộn có thanh cuộn' : 'Mở rộng hiển thị toàn trang';
    }
  }

  // --- KHỞI TẠO LẮNG NGHE THANH CUỘN & NÚT LƠ LỬNG ---
  initScrollListeners() {
    if (this.scrollInitialized) return;
    const wrapper = document.getElementById('works-scroll-wrapper');
    const floatBtn = document.getElementById('works-float-top-btn');
    if (wrapper && floatBtn) {
      wrapper.addEventListener('scroll', () => {
        if (wrapper.scrollTop > 300) {
          floatBtn.classList.add('visible');
        } else {
          floatBtn.classList.remove('visible');
        }
      });
      this.scrollInitialized = true;
    }

    this.renderNavQuickList();
  }

  // --- KẾT XUẤT DANH SÁCH TÁC PHẨM NHANH TRÊN HEADER DROPDOWN ---
  renderNavQuickList() {
    const navList = document.getElementById('nav-works-scroll-list');
    if (!navList || !window.LITERARY_DATA || !window.LITERARY_DATA.works) return;

    // Sắp xếp theo bảng chữ cái A-Z chuẩn tiếng Việt
    const sortedWorks = [...window.LITERARY_DATA.works].sort((a, b) => 
      (a.title || '').trim().localeCompare((b.title || '').trim(), 'vi', { sensitivity: 'base' })
    );

    // Đồng bộ số lượng tác phẩm thực tế (bao gồm dữ liệu tùy biến từ CMS/Cloud)
    const vnCount = sortedWorks.filter(w => w.origin !== 'world').length;
    const worldCount = sortedWorks.filter(w => w.origin === 'world').length;
    const totalCount = sortedWorks.length;

    const countVnEl = document.getElementById('dropdown-count-vn');
    if (countVnEl) countVnEl.textContent = `${vnCount} tác phẩm`;

    const countWorldEl = document.getElementById('dropdown-count-world');
    if (countWorldEl) countWorldEl.textContent = `${worldCount} tác phẩm`;

    const headerTotalEl = document.getElementById('dropdown-header-total') || navList.previousElementSibling;
    if (headerTotalEl && headerTotalEl.classList.contains('editorial-dropdown-header')) {
      headerTotalEl.textContent = `Danh Sách Toàn Bộ ${totalCount} Tác Phẩm`;
    }

    navList.innerHTML = sortedWorks.map(w => `
      <a href="#/tac-pham/${w.id}" class="nav-dropdown-link" onclick="window.literaryReader.openWork('${w.id}')" style="display: flex; justify-content: space-between; align-items: center; padding: 0.45rem 0.85rem; font-size: 0.85rem;">
        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 185px;">${w.title}</span>
        <span style="font-size: 0.7rem; color: var(--ink-muted); margin-left: 0.5rem; flex-shrink: 0;">${w.author}</span>
      </a>
    `).join('');
  }

  // --- THIẾT LẬP SẮP XẾP TÁC PHẨM ---
  setSort(sortType) {
    this.currentSort = sortType;
    this.renderWorks(this.currentCategory);
  }

  // --- THIẾT LẬP BỘ LỌC ĐỊA VỰC (VIỆT NAM / THẾ GIỚI) ---
  setOriginFilter(origin, btnEl) {
    this.currentOrigin = origin;
    document.querySelectorAll('.origin-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) {
      btnEl.classList.add('active');
    } else {
      const activeBtn = document.querySelector(`.origin-tab-btn[data-origin="${origin}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }

    const allCount = (window.LITERARY_DATA && window.LITERARY_DATA.works) ? window.LITERARY_DATA.works.length : 38;
    const vnCount = (window.LITERARY_DATA && window.LITERARY_DATA.works) ? window.LITERARY_DATA.works.filter(w => w.origin === 'vn').length : 28;
    const worldCount = (window.LITERARY_DATA && window.LITERARY_DATA.works) ? window.LITERARY_DATA.works.filter(w => w.origin === 'world').length : 10;

    const pillAll = document.getElementById('tab-count-all');
    const pillVn = document.getElementById('tab-count-vn');
    const pillWorld = document.getElementById('tab-count-world');
    if (pillAll) pillAll.textContent = allCount;
    if (pillVn) pillVn.textContent = vnCount;
    if (pillWorld) pillWorld.textContent = worldCount;

    const introBox = document.getElementById('origin-intro-box');
    if (introBox) {
      if (origin === 'vn') {
        introBox.style.display = 'block';
        introBox.className = 'origin-intro-banner vn';
        introBox.innerHTML = `<strong>KHO TÀNG VĂN HỌC VIỆT NAM (${vnCount} Tác Phẩm Kinh Điển):</strong> Dòng chảy văn chương nước nhà từ kiệt tác lục bát Truyện Kiều, phong trào Thơ Mới (Xuân Diệu, Huy Cận, Hàn Mặc Tử, Thế Lữ), chủ nghĩa hiện thực phê phán đỉnh cao (Nam Cao, Vũ Trọng Phụng, Ngô Tất Tố) đến văn học cách mạng và kháng chiến vĩ đại (Kim Lân, Tô Hoài, Nguyễn Minh Châu, Quang Dũng, Tố Hữu, Xuân Quỳnh, Chính Hữu, Bằng Việt, Lê Minh Khuê, Nguyễn Dữ).`;
      } else if (origin === 'world') {
        introBox.style.display = 'block';
        introBox.className = 'origin-intro-banner world';
        introBox.innerHTML = `<strong>KIỆT TÁC VĂN HỌC THẾ GIỚI (${worldCount} Tác Phẩm Bất Hủ):</strong> Những tượng đài tư tưởng và bút pháp của nhân loại: Hiện sinh & Phi lý Tây Âu (Franz Kafka), Hiện thực huyền ảo Mỹ Latinh (Gabriel García Márquez), nguyên lý Tảng băng trôi (Ernest Hemingway), khúc ca nhân ái thảo nguyên (Chingiz Aitmatov), tiếng chuông thức tỉnh Lỗ Tấn, châm biếm sâu cay Anton Chekhov, hiệp sĩ phục hưng Cervantes, bi kịch tình yêu bất hủ Shakespeare và bản anh hùng ca nhân đạo vĩ đại Victor Hugo.`;
      } else {
        introBox.style.display = 'none';
      }
    }

    this.renderWorks(this.currentCategory);
  }

  // --- RENDER THƯ VIỆN TÁC PHẨM ---
  renderWorks(filterCategory = 'all') {
    const container = document.getElementById('works-container');
    if (!container) return;

    this.currentCategory = filterCategory;
    let filteredWorks = LITERARY_DATA.works;

    // Lọc theo nguồn gốc (Việt Nam hoặc Thế Giới)
    if (this.currentOrigin && this.currentOrigin !== 'all') {
      filteredWorks = filteredWorks.filter(w => w.origin === this.currentOrigin);
    }

    // Lọc theo thể loại
    if (filterCategory !== 'all') {
      const q = filterCategory.toLowerCase();
      if (q === 'sgk') {
        filteredWorks = filteredWorks.filter(w => 
          (w.sgkDetail && w.sgkDetail.length > 0) ||
          (w.tags && w.tags.some(t => t.toLowerCase().includes('sgk')))
        );
      } else {
        filteredWorks = filteredWorks.filter(w => 
          w.category.toLowerCase().includes(q) ||
          (w.era && w.era.toLowerCase().includes(q)) ||
          (w.tags && w.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
    }

    // Áp dụng tiêu chí sắp xếp
    if (this.currentSort === 'year-asc') {
      filteredWorks = [...filteredWorks].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    } else if (this.currentSort === 'year-desc') {
      filteredWorks = [...filteredWorks].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (this.currentSort === 'title-asc') {
      filteredWorks = [...filteredWorks].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    } else if (this.currentSort === 'author-asc') {
      filteredWorks = [...filteredWorks].sort((a, b) => a.author.localeCompare(b.author, 'vi'));
    }

    const bookmarks = JSON.parse(localStorage.getItem('vanuyen_bookmarks') || '[]');

    // Cập nhật số lượng hiển thị trên thanh cuộn
    const countEl = document.getElementById('works-displayed-count');
    if (countEl) {
      countEl.textContent = `Đang hiển thị ${filteredWorks.length} tác phẩm kinh điển`;
    }

    // Cuộn mượt lên đầu khung tác phẩm
    const scrollWrapper = document.getElementById('works-scroll-wrapper');
    if (scrollWrapper) {
      scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.initScrollListeners();

    if (filteredWorks.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--ink-muted);">
          <p style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">Chưa có tác phẩm trong mục này</p>
          <p>Mời bạn chọn thể loại khác hoặc tìm kiếm trong toàn thư viện.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredWorks.map(work => {
      const isBookmarked = bookmarks.includes(work.id);
      const isPoetry = work.category.toLowerCase().includes('thơ');

      return `
        <article class="work-card" data-id="${work.id}">
          ${work.image ? `
            <div class="work-card-image-box" onclick="window.literaryReader.openWork('${work.id}')" title="Nhấp để đọc toàn văn: ${work.title}">
              <img src="${work.image}" alt="${work.title}" class="work-card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">
            </div>
          ` : ''}

          <div class="work-card-header">
            <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
              <span class="work-origin-badge ${work.origin === 'world' ? 'world' : 'vn'}">
                ${work.origin === 'world' ? 'Văn học Thế giới' : 'Văn học Việt Nam'}
              </span>
              <span class="work-badge ${isPoetry ? 'poetry' : ''}">${work.category}</span>
              <span style="font-size: 0.68rem; font-family: var(--font-ui); color: var(--jasper-600); font-weight: 700; background: var(--jasper-50); padding: 0.15rem 0.45rem; border: 1px solid var(--jasper-200); border-radius: var(--radius-xs);">Toàn văn • Chuẩn SGK</span>
            </div>
            <button class="work-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                    title="${isBookmarked ? 'Bỏ lưu' : 'Lưu vào tủ sách'}"
                    onclick="window.literaryApp.toggleBookmark('${work.id}')">
              ${window.LiteraryIcons ? (isBookmarked ? window.LiteraryIcons.get('bookmarkFilled', 'icon-md') : window.LiteraryIcons.get('bookmark', 'icon-md')) : (isBookmarked ? '★' : '☆')}
            </button>
          </div>

          <h3 class="work-card-title">
            <a href="javascript:void(0)" onclick="window.literaryReader.openWork('${work.id}')">
              ${work.title}
            </a>
          </h3>

          <div class="work-card-author">${work.author} (${work.year}) • ${work.country || (work.origin === 'world' ? 'Thế Giới' : 'Việt Nam')}</div>

          <div class="work-card-excerpt">
            “${work.excerpt}”
          </div>

          <div class="work-card-footer">
            <span style="font-family: var(--font-body); font-style: italic; display: inline-flex; align-items: center; gap: 0.35rem;">
              ${window.LiteraryIcons ? window.LiteraryIcons.get('clock', 'icon-sm') : ''} ${work.readTime}
            </span>
            <button class="work-read-btn" onclick="window.literaryReader.openWork('${work.id}')" style="display: inline-flex; align-items: center; gap: 0.35rem;">
              <span>Đọc tác phẩm</span> ${window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight', 'icon-sm') : '→'}
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- BỘ ICON VECTOR HỆ THỐNG DÀNH CHO TÁC GIẢ & THƯ VIỆN ---
  _getAuthorIcon(name, extraClass = 'icon-xs') {
    if (window.LiteraryIcons && typeof window.LiteraryIcons.get === 'function') {
      return window.LiteraryIcons.get(name, extraClass);
    }
    const icons = {
      mapPin: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      clock: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      feather: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`,
      award: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      bookmark: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
      flag: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`,
      globe: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
      layers: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
      bookOpen: `<svg class="editorial-icon ${extraClass}" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
    };
    return icons[name] || '';
  }

  // --- ĐIỀU KHIỂN CHẾ ĐỘ HIỂN THỊ TRANG TÁC GIẢ (LIST VS GRID) ---
  setAuthorViewMode(mode) {
    this.authorViewMode = mode;
    const btnList = document.getElementById('author-view-btn-list');
    const btnGrid = document.getElementById('author-view-btn-grid');
    if (btnList && btnGrid) {
      btnList.classList.toggle('active', mode === 'list');
      btnGrid.classList.toggle('active', mode === 'grid');
    }
    this.renderAuthors();
  }

  // --- LỌC XUẤT XỨ TÁC GIẢ (TẤT CẢ / VIỆT NAM / THẾ GIỚI) ---
  filterAuthorOrigin(origin) {
    this.authorOriginFilter = origin;
    const pills = document.querySelectorAll('#authors-origin-filters .authors-filter-pill');
    pills.forEach(p => {
      p.classList.toggle('active', p.dataset.origin === origin);
    });
    this.renderAuthors();
  }

  // --- TÌM KIẾM TÁC GIẢ THEO TỪ KHÓA ---
  searchAuthors(query) {
    this.authorSearchQuery = (query || '').toLowerCase().trim();
    this.renderAuthors();
  }

  // --- CHUYỂN NHANH ĐẾN THƯ VIỆN ĐỂ XEM TÁC PHẨM CỦA TÁC GIẢ ---
  filterByAuthorInLibrary(authorName) {
    if (window.literaryApp && typeof window.literaryApp.switchTab === 'function') {
      window.literaryApp.switchTab('library');
    }
    setTimeout(() => {
      const worksContainer = document.getElementById('works-scroll-container') || document.getElementById('tab-library');
      if (worksContainer) {
        worksContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }

  // --- RENDER CHÂN DUNG TÁC GIẢ (ĐỒNG BỘ VECTOR ICON & HỖ TRỢ DẠNG LIST / GRID) ---
  renderAuthors() {
    const container = document.getElementById('authors-container');
    if (!container) return;

    // Đồng bộ danh sách tác giả tùy chỉnh từ localStorage (nếu có)
    let authorsList = (window.LITERARY_DATA && window.LITERARY_DATA.authors) ? [...window.LITERARY_DATA.authors] : [];
    try {
      const saved = localStorage.getItem('van_uyen_custom_authors');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom) && custom.length > 0) {
          const map = new Map();
          authorsList.forEach(a => map.set(a.name.toLowerCase().trim(), a));
          custom.forEach(a => {
            const k = a.name.toLowerCase().trim();
            if (map.has(k)) {
              map.set(k, { ...map.get(k), ...a });
            } else {
              map.set(k, a);
            }
          });
          authorsList = Array.from(map.values());
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc danh mục tác giả tùy chỉnh:", e);
    }

    // Chỉ hiển thị các tác giả đã công bố (không bị tạm ẩn)
    authorsList = authorsList.filter(a => a.status !== 'hidden');

    // Lọc theo Xuất Xứ (Việt Nam / Thế Giới)
    if (this.authorOriginFilter === 'vn') {
      authorsList = authorsList.filter(a => {
        const c = (a.country || '').toLowerCase();
        return !c || c.includes('việt nam') || c.includes('vn');
      });
    } else if (this.authorOriginFilter === 'world') {
      authorsList = authorsList.filter(a => {
        const c = (a.country || '').toLowerCase();
        return c && !c.includes('việt nam') && !c.includes('vn');
      });
    }

    // Lọc theo Từ khóa tìm kiếm
    if (this.authorSearchQuery) {
      const q = this.authorSearchQuery;
      authorsList = authorsList.filter(a =>
        (a.name || '').toLowerCase().includes(q) ||
        (a.alias || '').toLowerCase().includes(q) ||
        (a.hometown || '').toLowerCase().includes(q) ||
        (a.style || '').toLowerCase().includes(q) ||
        (a.era || '').toLowerCase().includes(q) ||
        (a.masterpieces || '').toLowerCase().includes(q) ||
        (a.awards || '').toLowerCase().includes(q)
      );
    }

    // Cập nhật số lượng hiển thị
    const countBadge = document.getElementById('authors-count-badge');
    if (countBadge) {
      countBadge.textContent = `Đang hiển thị ${authorsList.length} tác giả`;
    }

    const allWorks = (window.LITERARY_DATA && window.LITERARY_DATA.works) ? window.LITERARY_DATA.works : [];

    // Nếu không có tác giả phù hợp bộ lọc
    if (authorsList.length === 0) {
      container.className = '';
      container.innerHTML = `
        <div style="text-align:center;padding:3.5rem 1rem;background:var(--paper-surface);border:1px dashed var(--paper-border);border-radius:var(--radius-sm);color:var(--ink-muted);">
          <div style="margin-bottom:0.75rem;">${this._getAuthorIcon('feather', 'icon-lg')}</div>
          <div style="font-family:var(--font-heading);font-size:1.1rem;color:var(--ink-secondary);margin-bottom:0.35rem;">Không tìm thấy tác giả phù hợp</div>
          <p style="font-size:0.875rem;margin:0;">Vui lòng thử từ khóa khác hoặc chuyển sang bộ lọc "Tất cả".</p>
        </div>
      `;
      return;
    }

    // 1. CHẾ ĐỘ HIỂN THỊ DẠNG DANH SÁCH (LIST VIEW - MẶC ĐỊNH)
    if (this.authorViewMode === 'list') {
      container.className = 'authors-list-wrapper';
      const rowsHtml = authorsList.map(author => {
        const initials = author.avatarInitials || author.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase();
        const safeName = author.name.replace(/'/g, "\\'");
        const count = allWorks.filter(w => (w.author || '').toLowerCase().includes(author.name.toLowerCase())).length;
        const isVn = !author.country || author.country.toLowerCase().includes('việt nam') || author.country.toLowerCase().includes('vn');

        const originBadge = isVn
          ? `<span class="origin-badge origin-vn">${this._getAuthorIcon('flag', 'icon-xs')}<span>Việt Nam</span></span>`
          : `<span class="origin-badge origin-world">${this._getAuthorIcon('globe', 'icon-xs')}<span>${author.country || 'Thế Giới'}</span></span>`;

        return `
          <tr>
            <td class="authors-table-avatar-cell">
              <div class="authors-table-avatar">
                ${author.avatar ? `
                  <img src="${author.avatar}" alt="${author.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';" />
                  <span style="display:none">${initials}</span>
                ` : `
                  <span>${initials}</span>
                `}
              </div>
            </td>
            <td>
              <div class="author-name-cell-wrap">
                <strong>${author.name}</strong>
                ${author.alias ? `<span class="author-alias-text">Tên chữ / Bút danh: ${author.alias}</span>` : ''}
                ${author.hometown ? `<div class="author-cell-icon-row">${this._getAuthorIcon('mapPin', 'icon-xs')}<span>${author.hometown}</span></div>` : ''}
              </div>
            </td>
            <td style="text-align:center;">
              ${originBadge}
            </td>
            <td>
              <div style="display:flex;flex-direction:column;gap:0.3rem;">
                <div class="author-cell-icon-row">${this._getAuthorIcon('clock', 'icon-xs')}<span>${author.years}</span></div>
                <span class="author-style-tag" style="margin:0;width:fit-content;">${author.era}</span>
              </div>
            </td>
            <td>
              ${author.style ? `<div class="author-style-quote">${this._getAuthorIcon('feather', 'icon-xs')}<span><em>${author.style}</em></span></div>` : ''}
              ${author.masterpieces ? `<div class="author-masterpieces-text">${this._getAuthorIcon('bookmark', 'icon-xs')}<span><strong>Kiệt tác:</strong> ${author.masterpieces}</span></div>` : ''}
            </td>
            <td>
              ${author.awards ? `<div class="badge-award">${this._getAuthorIcon('award', 'icon-xs')}<span>${author.awards}</span></div>` : '<span style="font-size:0.75rem;color:var(--ink-muted);font-style:italic">Đang cập nhật</span>'}
            </td>
            <td style="text-align:center;">
              <button type="button" class="author-works-link-btn" onclick="window.literaryLibrary.filterByAuthorInLibrary('${safeName}')" title="Xem các tác phẩm của ${author.name} trong phòng đọc">
                ${this._getAuthorIcon('bookOpen', 'icon-xs')}
                <span>${count > 0 ? count + ' bài' : 'Khảo cứu'}</span>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        <div class="authors-editorial-table-wrap">
          <table class="authors-editorial-table">
            <thead>
              <tr>
                <th style="width:70px;text-align:center;">Chân Dung</th>
                <th style="width:230px;">Tác Giả &amp; Bút Danh</th>
                <th style="width:115px;text-align:center;">Xuất Xứ</th>
                <th style="width:190px;">Niên Đại &amp; Thời Kỳ</th>
                <th>Phong Cách Nghệ Thuật &amp; Kiệt Tác</th>
                <th style="width:180px;">Tôn Vinh &amp; Giải Thưởng</th>
                <th style="width:115px;text-align:center;">Tác Phẩm</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    // 2. CHẾ ĐỘ HIỂN THỊ DẠNG LƯỚI THẺ (GRID VIEW)
    container.className = 'authors-grid';
    container.innerHTML = authorsList.map(author => {
      const initials = author.avatarInitials || author.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase();
      const safeName = author.name.replace(/'/g, "\\'");
      const count = allWorks.filter(w => (w.author || '').toLowerCase().includes(author.name.toLowerCase())).length;
      const isVn = !author.country || author.country.toLowerCase().includes('việt nam') || author.country.toLowerCase().includes('vn');

      const originBadge = isVn
        ? `<span class="origin-badge origin-vn" style="margin-top:0.4rem;">${this._getAuthorIcon('flag', 'icon-xs')}<span>Việt Nam</span></span>`
        : `<span class="origin-badge origin-world" style="margin-top:0.4rem;">${this._getAuthorIcon('globe', 'icon-xs')}<span>${author.country || 'Thế Giới'}</span></span>`;

      return `
        <div class="author-card">
          <div class="author-avatar-wrap">
            ${author.avatar ? `
              <img src="${author.avatar}" alt="${author.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
              <span style="display:none">${initials}</span>
            ` : `
              <span>${initials}</span>
            `}
          </div>
          <h3 class="author-name">${author.name}</h3>
          ${originBadge}
          ${author.hometown ? `<div class="author-cell-icon-row" style="justify-content:center;margin-top:0.35rem;">${this._getAuthorIcon('mapPin', 'icon-xs')}<span>${author.hometown}</span></div>` : ''}
          <div class="author-years" style="display:flex;align-items:center;justify-content:center;gap:0.3rem;margin-top:0.3rem;">${this._getAuthorIcon('clock', 'icon-xs')}<span>${author.years}</span></div>
          <span class="author-style-tag">${author.era}</span>
          ${author.style ? `<div style="font-size:0.82rem;color:var(--cerulean-800);font-weight:500;margin:0.35rem 0;display:flex;align-items:center;justify-content:center;gap:0.35rem;">${this._getAuthorIcon('feather', 'icon-xs')}<span>${author.style}</span></div>` : ''}
          ${author.awards ? `<div class="badge-award" style="margin:0 auto 0.5rem auto;display:inline-flex;">${this._getAuthorIcon('award', 'icon-xs')}<span>${author.awards}</span></div>` : ''}
          <p class="author-bio">${author.bio}</p>
          <div class="author-masterpieces" style="display:flex;align-items:flex-start;gap:0.35rem;text-align:left;">
            ${this._getAuthorIcon('bookmark', 'icon-xs')}
            <div><strong>Tác phẩm tiêu biểu:</strong> ${author.masterpieces}</div>
          </div>
          <div style="margin-top:0.85rem;">
            <button type="button" class="author-works-link-btn" style="width:100%;" onclick="window.literaryLibrary.filterByAuthorInLibrary('${safeName}')">
              ${this._getAuthorIcon('bookOpen', 'icon-xs')}
              <span>Khảo cứu tác phẩm (${count})</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RENDER TRƯỜNG PHÁI & THỜI KỲ ---
  renderMovements() {
    const container = document.getElementById('movements-container');
    if (!container) return;

    container.innerHTML = LITERARY_DATA.movements.map(m => {
      return `
        <div class="movement-item">
          <div class="movement-node"></div>
          <div class="movement-card">
            <div class="movement-era">${m.era}</div>
            <h3 class="movement-title">${m.name}</h3>
            <p class="movement-desc">${m.description}</p>
            <div class="movement-reps">
              <span style="font-weight: 700; color: var(--cerulean-800); margin-right: 0.25rem;">Tác giả tiêu biểu:</span>
              ${m.representatives.map(rep => `<span class="movement-tag">${rep}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RENDER ĐIỂN TÍCH BÁCH KHOA ---
  renderAllusions() {
    const container = document.getElementById('allusions-container');
    if (!container) return;

    container.innerHTML = LITERARY_DATA.allusions.map(item => {
      return `
        <div class="allusion-card">
          <div class="allusion-card-header">
            <h3 class="allusion-name">${item.name}</h3>
            <span class="allusion-origin">${item.origin}</span>
          </div>
          <div class="allusion-meaning">${item.meaning}</div>
          <div class="allusion-example">Ví dụ: ${item.example}</div>
        </div>
      `;
    }).join('');
  }

  // --- QUOTE STUDIO (XỬ LÝ DANH NGÔN TƯƠNG TÁC) ---
  initQuoteStudio() {
    const pickerList = document.getElementById('quote-picker-list');
    if (!pickerList) return;

    pickerList.innerHTML = LITERARY_DATA.quotes.map((q, idx) => {
      return `
        <div class="quote-pick-item ${idx === 0 ? 'active' : ''}" onclick="window.literaryLibrary.selectQuote(${idx})">
          <strong>${q.author}:</strong> “${q.text.substring(0, 55)}...”
        </div>
      `;
    }).join('');

    this.selectQuote(0);
  }

  selectQuote(index) {
    this.currentQuoteIndex = index;
    const q = LITERARY_DATA.quotes[index];
    if (!q) return;

    // Cập nhật card hiển thị
    const textEl = document.getElementById('interactive-quote-text');
    const authorEl = document.getElementById('interactive-quote-author');
    const sourceEl = document.getElementById('interactive-quote-source');
    const displayCard = document.getElementById('interactive-quote-display');

    if (textEl) textEl.textContent = `“${q.text}”`;
    if (authorEl) authorEl.textContent = q.author;
    if (sourceEl) sourceEl.textContent = `— ${q.work}`;

    // Active picker item
    document.querySelectorAll('.quote-pick-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });
  }

  setQuoteTheme(theme) {
    const displayCard = document.getElementById('interactive-quote-display');
    if (!displayCard) return;

    displayCard.className = `interactive-quote-display theme-${theme}`;

    document.querySelectorAll('.quote-theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  copyCurrentQuote() {
    const q = LITERARY_DATA.quotes[this.currentQuoteIndex];
    if (!q) return;

    const formatted = `“${q.text}”\n\n— ${q.author} (Tác phẩm: ${q.work})\n[Trích từ Văn Uyển Editorial]`;
    navigator.clipboard.writeText(formatted).then(() => {
      window.literaryApp.showToast("Đã sao chép trích dẫn vào bộ nhớ tạm!");
    });
  }

  // --- RENDER TỦ SÁCH CÁ NHÂN (BOOKMARKS) ---
  renderBookmarks() {
    const container = document.getElementById('bookmarks-container');
    if (!container) return;

    const bookmarks = JSON.parse(localStorage.getItem('vanuyen_bookmarks') || '[]');
    const savedWorks = LITERARY_DATA.works.filter(w => bookmarks.includes(w.id));

    if (savedWorks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; border: 2px dashed var(--paper-border-bold); background: var(--paper-surface);">
          <div style="color: var(--jasper-600); margin-bottom: 1rem;">${window.LiteraryIcons ? window.LiteraryIcons.get('library', 'icon-xl') : '§'}</div>
          <h3 style="font-family: var(--font-display); font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--cerulean-900);">Tủ sách đang còn trống</h3>
          <p style="color: var(--ink-muted); max-width: 500px; margin: 0 auto 1.5rem; font-family: var(--font-body);">
            Bạn chưa lưu tác phẩm nào. Hãy bấm biểu tượng đánh dấu trên mỗi thẻ tác phẩm hoặc trong phòng đọc để lưu lại đọc sau.
          </p>
          <button class="btn-primary" onclick="window.literaryApp.switchTab('library')" style="display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>Khám phá Thư viện tác phẩm</span> ${window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight', 'icon-sm') : '→'}
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="works-grid">
        ${savedWorks.map(work => `
          <article class="work-card">
            ${work.image ? `
              <div class="work-card-image-box" onclick="window.literaryReader.openWork('${work.id}')" title="Nhấp để đọc toàn văn: ${work.title}">
                <img src="${work.image}" alt="${work.title}" class="work-card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">
              </div>
            ` : ''}
            <div class="work-card-header">
              <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
                <span class="work-origin-badge ${work.origin === 'world' ? 'world' : 'vn'}">
                  ${work.origin === 'world' ? 'Thế Giới' : 'Việt Nam'}
                </span>
                <span class="work-badge">${work.category}</span>
                <span style="font-size: 0.68rem; font-family: var(--font-ui); color: var(--jasper-600); font-weight: 700; background: var(--jasper-50); padding: 0.15rem 0.45rem; border: 1px solid var(--jasper-200); border-radius: var(--radius-xs);">Toàn văn • Chuẩn SGK</span>
              </div>
              <button class="work-bookmark-btn bookmarked" 
                      title="Bỏ lưu khỏi tủ sách"
                      onclick="window.literaryApp.toggleBookmark('${work.id}')">
                ${window.LiteraryIcons ? window.LiteraryIcons.get('bookmarkFilled', 'icon-md') : '★'}
              </button>
            </div>
            <h3 class="work-card-title">
              <a href="javascript:void(0)" onclick="window.literaryReader.openWork('${work.id}')">
                ${work.title}
              </a>
            </h3>
            <div class="work-card-author">${work.author}</div>
            <div class="work-card-excerpt">“${work.excerpt}”</div>
            <div class="work-card-footer">
              <span style="font-family: var(--font-body); font-style: italic; display: inline-flex; align-items: center; gap: 0.35rem;">
                ${window.LiteraryIcons ? window.LiteraryIcons.get('clock', 'icon-sm') : ''} ${work.readTime}
              </span>
              <button class="work-read-btn" onclick="window.literaryReader.openWork('${work.id}')" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>Tiếp tục đọc</span> ${window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight', 'icon-sm') : '→'}
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }
}

window.literaryLibrary = new LiteraryLibrary();
