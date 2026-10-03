/**
 * VĂN UYỂN - MAIN APPLICATION CONTROLLER
 * Điều hướng tab, Tìm kiếm toàn cục, Bookmark, Chế độ xem & Khởi tạo
 */

class LiteraryApp {
  constructor() {
    this.currentTab = 'cover';
    this.searchModal = null;
    this.searchInput = null;
    this.searchResults = null;
    this.toastEl = null;
    this.toastTimer = null;
  }

  init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    this.scrollToTop();
    this.initTheme();
    this.initElements();
    this.bindEvents();
    this.updateDateDisplay();
    // 1. Đồng bộ ngay từ LocalStorage trước khi render để nạp ngay bản sửa mới nhất
    this.syncFromLocalStorage();
    this.renderInitialData();
    this.updateBookmarkCounter();
    // 2. Tiếp tục đồng bộ từ Cloud Firestore và thiết lập bộ lắng nghe thời gian thực
    this.setupRealtimeListeners();
    this.syncWithFirestore();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  syncFromLocalStorage() {
    try {
      const raw = localStorage.getItem('van_uyen_custom_works');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          this.mergeCustomWorks(list, 'Bộ nhớ máy');
        }
      }
    } catch (e) {
      console.warn("[Độc Giả] Lỗi đọc bản lưu cục bộ:", e);
    }
  }

  setupRealtimeListeners() {
    // Lắng nghe sự kiện phát ra khi Admin lưu hoặc sửa trong cùng tab/cửa sổ
    window.addEventListener('customWorksUpdated', (e) => {
      if (e && e.detail) {
        this.handleWorkUpdated(e.detail);
      }
    });

    // Lắng nghe sự kiện storage khi Admin sửa ở tab/cửa sổ khác
    window.addEventListener('storage', (e) => {
      if (e.key === 'van_uyen_custom_works') {
        this.syncFromLocalStorage();
        this.refreshViews();
      }
    });

    // Lắng nghe khi Firebase Service hoàn tất kết nối
    window.addEventListener('firebase-ready', () => {
      this.syncWithFirestore();
    });
  }

  mergeCustomWorks(customWorks, source = 'Cloud') {
    if (!Array.isArray(customWorks) || !window.LITERARY_DATA || !window.LITERARY_DATA.works) return;
    customWorks.forEach(cw => {
      if (!cw || !cw.id) return;
      const idx = window.LITERARY_DATA.works.findIndex(w => w.id === cw.id);
      if (idx >= 0) {
        window.LITERARY_DATA.works[idx] = { ...window.LITERARY_DATA.works[idx], ...cw, _customUpdated: true };
      } else {
        window.LITERARY_DATA.works.push({ ...cw, _customUpdated: true });
      }
    });
  }

  handleWorkUpdated(work) {
    if (!work || !work.id || !window.LITERARY_DATA || !window.LITERARY_DATA.works) return;

    if (work._deleted) {
      const idx = window.LITERARY_DATA.works.findIndex(w => w.id === work.id);
      if (idx >= 0) {
        window.LITERARY_DATA.works.splice(idx, 1);
      }
    } else {
      const idx = window.LITERARY_DATA.works.findIndex(w => w.id === work.id);
      if (idx >= 0) {
        window.LITERARY_DATA.works[idx] = { ...window.LITERARY_DATA.works[idx], ...work, _customUpdated: true };
      } else {
        window.LITERARY_DATA.works.push({ ...work, _customUpdated: true });
      }
    }

    this.refreshViews();

    // Nếu Độc giả đang mở chính tác phẩm này trong phòng đọc, cập nhật tức thời
    if (window.literaryReader && window.literaryReader.currentWorkId === work.id && !work._deleted) {
      window.literaryReader.openWork(work.id);
    }
  }

  refreshViews() {
    if (window.literaryLibrary) {
      if (typeof window.literaryLibrary.setOriginFilter === 'function') {
        window.literaryLibrary.setOriginFilter(window.literaryLibrary.currentOrigin || 'all');
      } else {
        window.literaryLibrary.renderWorks(window.literaryLibrary.currentCategory || 'all');
      }
      if (typeof window.literaryLibrary.renderNavQuickList === 'function') {
        window.literaryLibrary.renderNavQuickList();
      }
    }
    if (window.literaryReader && typeof window.literaryReader.renderReaderWorksMenu === 'function') {
      window.literaryReader.renderReaderWorksMenu();
    }
  }

  async syncWithFirestore() {
    try {
      if (!window.firebaseService) return;
      const customWorks = await window.firebaseService.getCustomWorks();
      if (customWorks && customWorks.length > 0) {
        this.mergeCustomWorks(customWorks, 'Cloud Firestore');
        this.refreshViews();
        console.log(`[Độc Giả] Đã đồng bộ ${customWorks.length} tác phẩm mới nhất từ Ban Biên Tập.`);
      }
    } catch (err) {
      console.warn("[Độc Giả] Đồng bộ Firestore chạy ở chế độ dự phòng:", err);
    }
  }

  initElements() {
    this.searchModal = document.getElementById('search-modal-backdrop');
    this.searchInput = document.getElementById('search-input-field');
    this.searchResults = document.getElementById('search-results-list');
    this.toastEl = document.getElementById('editorial-toast');
  }

  bindEvents() {
    // Phím tắt bàn phím toàn cục (Ctrl + K hoặc / để tìm kiếm)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.openSearch();
      } else if (e.key === 'Escape' && this.searchModal && this.searchModal.classList.contains('active')) {
        this.closeSearch();
      }
    });

    // Lắng nghe gõ tìm kiếm
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Gắn kết nối sự kiện cho các Dropdown chuẩn Editorial
    if (window.editorialDropdown) {
      window.editorialDropdown.bind('#library-sort-dropdown', (val) => {
        if (window.literaryLibrary) {
          window.literaryLibrary.setSort(val);
        }
      });

      window.editorialDropdown.bind('#studio-genre-dropdown', (val, label) => {
        if (window.literaryStudio) {
          window.literaryStudio.setGenre(val, label);
        }
      });
    }
  }

  updateDateDisplay() {
    const dateEl = document.getElementById('topbar-current-date');
    if (dateEl) {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('vi-VN', options);
    }
  }

  renderInitialData() {
    // Khởi tạo Thư viện
    if (window.literaryLibrary) {
      window.literaryLibrary.renderWorks('all');
      window.literaryLibrary.renderAuthors();
      window.literaryLibrary.renderMovements();
      window.literaryLibrary.renderAllusions();
      window.literaryLibrary.initQuoteStudio();
    }
  }

  // --- ĐIỀU HƯỚNG TAB ---
  switchTab(tabId, updateUrl = true) {
    this.currentTab = tabId;

    // Cập nhật trạng thái link trên menu
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });

    // Ẩn/hiện các tab content
    document.querySelectorAll('.tab-section').forEach(sec => {
      sec.style.display = (sec.id === `tab-${tabId}`) ? 'block' : 'none';
    });

    // Chạy ngay lập tức lên đầu trang khi chuyển tab
    this.scrollToTop();

    // Cập nhật dữ liệu đặc thù theo từng tab nếu cần
    if (tabId === 'bookmarks' && window.literaryLibrary) {
      window.literaryLibrary.renderBookmarks();
    }

    // Đồng bộ Friendly URL & SEO
    if (updateUrl && window.literarySEO) {
      window.literarySEO.syncTab(tabId);
    }
  }

  // --- QUẢN LÝ BOOKMARK ---
  toggleBookmark(workId) {
    let bookmarks = JSON.parse(localStorage.getItem('vanuyen_bookmarks') || '[]');
    let isSaved = false;

    if (bookmarks.includes(workId)) {
      bookmarks = bookmarks.filter(id => id !== workId);
      this.showToast("Đã xóa khỏi Tủ sách cá nhân.");
      isSaved = false;
    } else {
      bookmarks.push(workId);
      this.showToast("★ Đã lưu vào Tủ sách cá nhân!");
      isSaved = true;
    }

    localStorage.setItem('vanuyen_bookmarks', JSON.stringify(bookmarks));
    this.updateBookmarkCounter();

    // Rerender lại giao diện nếu đang ở thư viện hoặc tủ sách
    if (window.literaryLibrary) {
      window.literaryLibrary.renderWorks(window.literaryLibrary.currentCategory);
      if (this.currentTab === 'bookmarks') {
        window.literaryLibrary.renderBookmarks();
      }
    }

    return isSaved;
  }

  updateBookmarkCounter() {
    const bookmarks = JSON.parse(localStorage.getItem('vanuyen_bookmarks') || '[]');
    const counterEl = document.getElementById('nav-bookmark-count');
    if (counterEl) {
      counterEl.textContent = bookmarks.length;
      counterEl.style.display = bookmarks.length > 0 ? 'inline-block' : 'none';
    }
  }

  // --- TÌM KIẾM TOÀN CỤC (GLOBAL SEARCH) ---
  openSearch() {
    if (!this.searchModal) return;
    this.searchModal.classList.add('active');
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.focus();
        this.searchInput.value = '';
        this.handleSearch('');
      }
    }, 50);
  }

  closeSearch() {
    if (this.searchModal) {
      this.searchModal.classList.remove('active');
    }
  }

  handleSearch(query) {
    if (!this.searchResults) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      this.searchResults.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--ink-muted);">
          <p style="font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 0.35rem;">Tìm kiếm trong toàn bộ thư tịch</p>
          <p style="font-size: 0.85rem;">Nhập tên tác phẩm, tác giả, điển tích hoặc trường phái văn học...</p>
        </div>
      `;
      return;
    }

    const matchedWorks = LITERARY_DATA.works.filter(w => 
      w.title.toLowerCase().includes(q) ||
      w.author.toLowerCase().includes(q) ||
      w.excerpt.toLowerCase().includes(q)
    );

    const matchedAuthors = LITERARY_DATA.authors.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.bio.toLowerCase().includes(q)
    );

    const matchedAllusions = LITERARY_DATA.allusions.filter(al =>
      al.name.toLowerCase().includes(q) ||
      al.meaning.toLowerCase().includes(q)
    );

    let html = '';

    if (matchedWorks.length > 0) {
      const arrowIcon = window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight') : '→';
      html += `<div style="font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--jasper-600); margin: 0.5rem 0.5rem 0.25rem;">Tác phẩm (${matchedWorks.length})</div>`;
      html += matchedWorks.map(w => `
        <div class="search-result-item" onclick="window.literaryApp.selectSearchResult('work', '${w.id}')">
          <div>
            <div class="search-result-title">${w.title}</div>
            <div class="search-result-meta">${w.author} • ${w.category}</div>
          </div>
          <span style="color: var(--cerulean-600); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.25rem;">Đọc ${arrowIcon}</span>
        </div>
      `).join('');
    }

    if (matchedAuthors.length > 0) {
      const arrowIcon = window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight') : '→';
      html += `<div style="font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--cerulean-700); margin: 1rem 0.5rem 0.25rem;">Tác giả (${matchedAuthors.length})</div>`;
      html += matchedAuthors.map(a => `
        <div class="search-result-item" onclick="window.literaryApp.selectSearchResult('author', '${a.id}')">
          <div>
            <div class="search-result-title">${a.name}</div>
            <div class="search-result-meta">${a.years} • ${a.era}</div>
          </div>
          <span style="color: var(--cerulean-600); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.25rem;">Xem ${arrowIcon}</span>
        </div>
      `).join('');
    }

    if (matchedAllusions.length > 0) {
      const arrowIcon = window.LiteraryIcons ? window.LiteraryIcons.get('arrowRight') : '→';
      html += `<div style="font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--ink-muted); margin: 1rem 0.5rem 0.25rem;">Điển tích (${matchedAllusions.length})</div>`;
      html += matchedAllusions.map(al => `
        <div class="search-result-item" onclick="window.literaryApp.selectSearchResult('allusion', '${al.name}')">
          <div>
            <div class="search-result-title">${al.name}</div>
            <div class="search-result-meta">${al.origin}</div>
          </div>
          <span style="color: var(--cerulean-600); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.25rem;">Tra cứu ${arrowIcon}</span>
        </div>
      `).join('');
    }

    if (!html) {
      html = `
        <div style="padding: 2rem; text-align: center; color: var(--ink-muted); font-family: var(--font-body);">
          Không tìm thấy kết quả nào phù hợp với từ khóa "<strong>${query}</strong>".
        </div>
      `;
    }

    this.searchResults.innerHTML = html;
  }

  selectSearchResult(type, id) {
    this.closeSearch();
    if (type === 'work') {
      window.literaryReader.openWork(id);
    } else if (type === 'author') {
      this.switchTab('authors');
    } else if (type === 'allusion') {
      this.switchTab('quotes');
    }
  }

  // --- CHẾ ĐỘ GIAO DIỆN (THEME TOGGLE) ---
  initTheme() {
    const savedTheme = localStorage.getItem('van_uyen_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonUI(savedTheme);

    window.addEventListener('storage', (e) => {
      if (e.key === 'van_uyen_theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
        this.updateThemeButtonUI(e.newValue);
      }
    });
  }

  toggleGlobalTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'default';
    const nextTheme = current === 'nocturne' ? 'default' : 'nocturne';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('van_uyen_theme', nextTheme);
    this.updateThemeButtonUI(nextTheme);
    this.showToast(nextTheme === 'nocturne' ? "Đã bật chế độ Đêm Văn Đàn" : "Đã chuyển về màu Giấy Ngà");
  }

  updateThemeButtonUI(theme) {
    const themeBtn = document.getElementById('global-theme-btn');
    if (themeBtn && window.LiteraryIcons) {
      const isDark = theme === 'nocturne';
      const icon = isDark 
        ? window.LiteraryIcons.get('sun', 'icon-sm') 
        : window.LiteraryIcons.get('moon', 'icon-sm');
      const text = isDark ? 'Giấy ngà' : 'Đêm văn đàn';
      themeBtn.innerHTML = `${icon} <span>${text}</span>`;
      themeBtn.setAttribute('title', isDark ? 'Chuyển sang màu Giấy Ngà' : 'Chuyển sang Chế độ Đêm Văn Đàn');
    }
  }

  // --- TOAST THÔNG BÁO ---
  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 3000);
  }
}

window.literaryApp = new LiteraryApp();
document.addEventListener('DOMContentLoaded', () => {
  window.literaryApp.init();
});
