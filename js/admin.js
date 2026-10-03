/**
 * VĂN UYỂN — ADMIN CMS CONTROLLER
 * Điều khiển Giao diện Quản trị, Tương tác Firestore, Soạn thảo Toàn văn
 */

class LiteraryAdminApp {
  constructor() {
    this.works = [];
    this.customWorksMap = new Map();
    this.activeWork = null;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.isPreviewMode = false;
    this.hasUnsavedChanges = false;
    this.sortOrder = 'asc';
    this.viewMode = 'list'; // 'list' | 'grid'
    this.pendingDeleteId = null;
    this.currentPage = 1;
    this.pageSize = 8;
    this.currentSidebarTab = 'overview'; // 'overview' | 'works' | 'categories' | 'authors' | 'origins' | 'eras' | 'themes' | 'characters' | 'articles' | 'terms' | 'comments' | 'users'
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.activeEraFilter = null;
    this.activeThemeFilter = null;

    // Quản lý CRUD Thực thể danh mục (Categories, Authors, Origins)
    this.categories = [];
    this.authors = [];
    this.origins = [];
    this.pendingDeleteCategoryId = null;
    this.pendingDeleteAuthorId = null;
    this.pendingDeleteOriginId = null;
    this.authorViewMode = 'list'; // 'list' (mặc định) | 'grid'
    this.authorOriginFilter = 'all'; // 'all' | 'vn' | 'world'
    this.authorSearchQuery = '';

    // 7 Phân hệ nghiệp vụ văn học, tài liệu & vận hành mới
    this.eras = [];
    this.themes = [];
    this.characters = [];
    this.articles = [];
    this.terms = [];
    this.comments = [];
    this.users = [];
    this.characterSearchQuery = '';
    this.termSearchQuery = '';
    this.commentFilterStatus = 'all';
  }

  // Cuộn ngay lập tức lên đầu trang (Instant Scroll To Top)
  scrollToTop() {
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const main = document.querySelector('.admin-main-container');
      if (main) main.scrollTop = 0;
      const wrap = document.querySelector('.admin-page-wrap');
      if (wrap) wrap.scrollTop = 0;
      const tableContainer = document.querySelector('.admin-table-container');
      if (tableContainer) tableContainer.scrollTop = 0;
    } catch (e) {
      // Fallback
      window.scrollTo(0, 0);
    }
  }

  async init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    this.scrollToTop();
    this.initTheme();
    this.initElements();
    this.loadAdminProfile();
    this.bindEvents();
    this.setupFirestoreListener();
    await this.loadInitialData();
    this.switchSidebarTab(this.currentSidebarTab || 'overview');
    this.scrollToTop();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('van_uyen_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeUI(savedTheme);

    window.addEventListener('storage', (e) => {
      if (e.key === 'van_uyen_theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
        this.updateThemeUI(e.newValue);
      }
    });
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'default';
    const nextTheme = current === 'nocturne' ? 'default' : 'nocturne';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('van_uyen_theme', nextTheme);
    this.updateThemeUI(nextTheme);
    this.showToast(nextTheme === 'nocturne' ? 'Đã bật chế độ Đêm Văn Đàn' : 'Đã chuyển về màu Giấy Ngà');
  }

  updateThemeUI(theme) {
    const themeBtn = document.getElementById('admin-theme-btn');
    const themeText = document.getElementById('admin-theme-text');
    const themeIcon = document.getElementById('admin-theme-icon');
    if (!themeBtn) return;

    const isDark = theme === 'nocturne';
    if (themeText) {
      themeText.textContent = isDark ? 'Giấy ngà' : 'Đêm văn đàn';
    }
    if (themeIcon) {
      if (isDark) {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      } else {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      }
    }
    themeBtn.setAttribute('title', isDark ? 'Chuyển sang chế độ ban ngày Giấy Ngà' : 'Chuyển sang chế độ Đêm Văn Đàn');

    const modalThemeDesc = document.getElementById('modal-theme-desc');
    if (modalThemeDesc) {
      modalThemeDesc.textContent = isDark ? 'Hiện tại: Đêm Văn Đàn (Nhấp để đổi)' : 'Hiện tại: Giấy Ngà (Nhấp để đổi)';
    }
  }

  initElements() {
    // Topbar & Status
    this.statusPill = document.getElementById('admin-status-pill');
    this.statusText = document.getElementById('admin-status-text');

    // Table / Grid
    this.searchInput = document.getElementById('admin-search-input');
    this.worksCountEl = document.getElementById('admin-works-count');
    this.filterBtns = document.querySelectorAll('.admin-filter-btn');
    this.worksTableBody = document.getElementById('admin-works-tbody');
    this.worksGrid = document.getElementById('admin-works-grid');
    this.listViewEl = document.getElementById('admin-list-view');
    this.gridViewEl = document.getElementById('admin-grid-view');

    // Pagination
    this.paginationBar = document.getElementById('admin-pagination-bar');
    this.paginationSummary = document.getElementById('pagination-summary');
    this.paginationControls = document.getElementById('pagination-controls');
    this.pageSizeSelect = document.getElementById('pagination-pagesize');

    // Edit modal source badge
    this.activeSourceBadgeEl = document.getElementById('editor-source-badge');

    // Form Inputs (inside edit modal)
    this.inputMap = {
      id: document.getElementById('field-id'),
      title: document.getElementById('field-title'),
      author: document.getElementById('field-author'),
      authorId: document.getElementById('field-author-id'),
      origin: document.getElementById('field-origin'),
      originLabel: document.getElementById('field-origin-label'),
      country: document.getElementById('field-country'),
      category: document.getElementById('field-category'),
      era: document.getElementById('field-era'),
      year: document.getElementById('field-year'),
      readTime: document.getElementById('field-read-time'),
      badge: document.getElementById('field-badge'),
      image: document.getElementById('field-image'),
      imageCaption: document.getElementById('field-image-caption'),
      epigraph: document.getElementById('field-epigraph'),
      excerpt: document.getElementById('field-excerpt'),
      fullTextStatus: document.getElementById('field-fulltext-status'),
      sgkDetail: document.getElementById('field-sgk-detail'),
      content: document.getElementById('field-content'),
      criticism: document.getElementById('field-criticism'),
      tags: document.getElementById('field-tags')
    };

    // Content Editor & Preview
    this.visualEditor = document.getElementById('visual-content-editor');
    this.rawTextarea = document.getElementById('field-content');
    this.previewPanel = document.getElementById('content-preview-panel');
    this.charCountEl = document.getElementById('content-char-count');
    this.currentEditorMode = 'visual';

    // Action Buttons
    this.btnSave = document.getElementById('btn-save-firestore');
    this.btnViewReader = document.getElementById('btn-view-reader');
    this.btnRevert = document.getElementById('btn-revert-original');
    this.btnExportJson = document.getElementById('btn-export-json');
    this.btnSeedAll = document.getElementById('btn-seed-firestore');
    this.btnCreateNew = document.getElementById('btn-create-work');

    // Modals & Toast
    this.seedModal = document.getElementById('seed-modal');
    this.newWorkModal = document.getElementById('new-work-modal');
    this.smartFormatModal = document.getElementById('smart-format-modal');
    this.pdfModal = document.getElementById('pdf-import-modal');
    this.editModal = document.getElementById('edit-modal');
    this.detailModal = document.getElementById('detail-modal');
    this.deleteModal = document.getElementById('delete-confirm-modal');
    this.profileModal = document.getElementById('admin-profile-modal');
    this.toastEl = document.getElementById('admin-toast');

    // Overview, Sidebar & Subview elements
    this.sidebarEl = document.getElementById('admin-sidebar');
    this.overviewPanel = document.getElementById('admin-overview-panel');
    this.subviewPanel = document.getElementById('admin-subview-panel');
    this.tableToolbar = document.getElementById('admin-table-toolbar');
    this.activeFilterBanner = document.getElementById('admin-active-filter-banner');
    this.sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
    this.sidebarCountWorks = document.getElementById('sidebar-count-works');
    this.sidebarCountCategories = document.getElementById('sidebar-count-categories');
    this.sidebarCountAuthors = document.getElementById('sidebar-count-authors');
    this.sidebarCountOrigins = document.getElementById('sidebar-count-origins');
    this.sidebarCountEras = document.getElementById('sidebar-count-eras');
    this.sidebarCountThemes = document.getElementById('sidebar-count-themes');
    this.sidebarCountCharacters = document.getElementById('sidebar-count-characters');
    this.sidebarCountArticles = document.getElementById('sidebar-count-articles');
    this.sidebarCountTerms = document.getElementById('sidebar-count-terms');
    this.sidebarCountComments = document.getElementById('sidebar-count-comments');
    this.sidebarCountUsers = document.getElementById('sidebar-count-users');
    this.statSgkCount = document.getElementById('stat-sgk-count');
    this.statVnCount = document.getElementById('stat-vn-count');
    this.statWorldCount = document.getElementById('stat-world-count');

    // Đồng bộ Page Header
    this.adminPageHeader = document.getElementById('admin-page-header');
    this.adminBreadcrumbCurrent = document.getElementById('admin-breadcrumb-current');
    this.adminPageIcon = document.getElementById('admin-page-icon');
    this.adminPageTitle = document.getElementById('admin-page-title');
    this.adminPageBadge = document.getElementById('admin-page-badge');
    this.adminPageDesc = document.getElementById('admin-page-desc');
    this.adminPageHeaderActions = document.getElementById('admin-page-header-actions');

    // Cover Image Management
    this.coverInput = document.getElementById('cover-file-input');
    this.coverDropZone = document.getElementById('cover-drop-zone');
    this.coverBrowseBtn = document.getElementById('btn-browse-cover');
    this.coverRemoveBtn = document.getElementById('btn-remove-cover');
    this.coverPreviewImg = document.getElementById('cover-preview-img');
    this.coverPlaceholder = document.getElementById('cover-placeholder');
    this.coverStatus = document.getElementById('cover-upload-status');
  }

  bindEvents() {
    // Sự kiện quản lý ảnh bìa
    if (this.coverBrowseBtn && this.coverInput) {
      this.coverBrowseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.coverInput.click();
      });
    }

    if (this.coverDropZone && this.coverInput) {
      this.coverDropZone.addEventListener('click', (e) => {
        if (e.target.closest('#btn-remove-cover') || e.target.closest('#btn-browse-cover')) return;
        this.coverInput.click();
      });

      this.coverDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.coverDropZone.classList.add('dragover');
      });

      this.coverDropZone.addEventListener('dragleave', () => {
        this.coverDropZone.classList.remove('dragover');
      });

      this.coverDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.coverDropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleCoverUpload(e.dataTransfer.files[0]);
        }
      });
    }

    if (this.coverInput) {
      this.coverInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.handleCoverUpload(e.target.files[0]);
        }
      });
    }

    if (this.coverRemoveBtn) {
      this.coverRemoveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeCoverImage();
      });
    }

    if (this.inputMap.image) {
      this.inputMap.image.addEventListener('input', () => {
        this.updateCoverPreview(this.inputMap.image.value.trim());
      });
    }

    // Tự động sinh Mã ID Định Danh (Slug không dấu, nối bằng '-') từ Tên Tác Phẩm
    const newWorkTitle = document.getElementById('new-work-title');
    const newWorkId = document.getElementById('new-work-id');
    if (newWorkTitle) {
      newWorkTitle.addEventListener('input', (e) => this.handleNewWorkTitleInput(e.target.value));
      newWorkTitle.addEventListener('keyup', (e) => this.handleNewWorkTitleInput(e.target.value));
      newWorkTitle.addEventListener('paste', () => setTimeout(() => this.handleNewWorkTitleInput(newWorkTitle.value), 30));
    }
    if (newWorkId) {
      newWorkId.addEventListener('input', (e) => this.handleNewWorkIdInput(e.target.value));
      newWorkId.addEventListener('blur', (e) => {
        if (!e.target.value.trim() && newWorkTitle) {
          this.handleNewWorkTitleInput(newWorkTitle.value);
        }
      });
    }

    // Sự kiện kéo thả ảnh chân dung tác giả (Author Avatar Drag & Drop)
    const authorAvatarZone = document.getElementById('author-avatar-zone');
    if (authorAvatarZone) {
      authorAvatarZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        authorAvatarZone.classList.add('dragover');
      });
      authorAvatarZone.addEventListener('dragleave', () => {
        authorAvatarZone.classList.remove('dragover');
      });
      authorAvatarZone.addEventListener('drop', (e) => {
        e.preventDefault();
        authorAvatarZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleAuthorAvatarFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Tìm kiếm tác phẩm
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.currentPage = 1;
        this.renderTable();
      });
    }

    // Bộ lọc tác phẩm
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.currentPage = 1;
        this.renderTable();
      });
    });

    // Lắng nghe gõ trực tiếp trên Vùng Soạn Thảo Trực Quan WYSIWYG
    if (this.visualEditor) {
      this.visualEditor.addEventListener('input', () => {
        this.rawTextarea.value = this.visualEditor.innerHTML;
        this.updateCharCount();
        this.hasUnsavedChanges = true;
      });
    }

    // Đếm ký tự & đánh dấu thay đổi khi gõ nội dung thô (ở tab HTML)
    if (this.rawTextarea) {
      this.rawTextarea.addEventListener('input', () => {
        if (this.visualEditor) {
          this.visualEditor.innerHTML = this.rawTextarea.value;
        }
        this.updateCharCount();
        this.hasUnsavedChanges = true;
      });
    }

    // Lắng nghe thay đổi trên tất cả các input
    Object.values(this.inputMap).forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          this.hasUnsavedChanges = true;
        });
      }
    });

    // Các nút thao tác chính (trong edit modal)
    if (this.btnSave) {
      this.btnSave.addEventListener('click', () => this.saveCurrentWork());
    }
    if (this.btnViewReader) {
      this.btnViewReader.addEventListener('click', () => this.openInReader());
    }
    if (this.btnRevert) {
      this.btnRevert.addEventListener('click', () => this.revertToOriginal());
    }
    if (this.btnExportJson) {
      this.btnExportJson.addEventListener('click', () => this.exportCurrentJson());
    }
    if (this.btnSeedAll) {
      this.btnSeedAll.addEventListener('click', () => this.openSeedModal());
    }
    if (this.btnCreateNew) {
      this.btnCreateNew.addEventListener('click', () => this.openNewWorkModal());
    }

    // Xác nhận xóa tác phẩm
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', () => this.confirmDeleteWork());
    }

    // Xác nhận xóa thể loại, tác giả, xuất xứ
    const btnConfirmDeleteCat = document.getElementById('btn-confirm-delete-cat');
    if (btnConfirmDeleteCat) {
      btnConfirmDeleteCat.addEventListener('click', () => this.confirmDeleteCategory());
    }
    const btnConfirmDeleteAuthor = document.getElementById('btn-confirm-delete-author');
    if (btnConfirmDeleteAuthor) {
      btnConfirmDeleteAuthor.addEventListener('click', () => this.confirmDeleteAuthor());
    }
    const btnConfirmDeleteOrigin = document.getElementById('btn-confirm-delete-origin');
    if (btnConfirmDeleteOrigin) {
      btnConfirmDeleteOrigin.addEventListener('click', () => this.confirmDeleteOrigin());
    }

    // Đóng modal khi bấm vào backdrop
    const allModals = [
      this.seedModal, this.newWorkModal, this.smartFormatModal,
      this.pdfModal, this.editModal, this.detailModal, this.deleteModal,
      this.profileModal,
      document.getElementById('category-modal'),
      document.getElementById('category-delete-modal'),
      document.getElementById('author-modal'),
      document.getElementById('author-detail-modal'),
      document.getElementById('author-delete-modal'),
      document.getElementById('origin-modal'),
      document.getElementById('origin-delete-modal')
    ];
    allModals.forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.classList.remove('active');
        });
      }
    });

    // Đóng dropdown khi bấm ra ngoài
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.admin-dropdown')) {
        this.closeAllDropdowns();
      }
    });

    // Đóng modal và dropdown mượt mà khi bấm phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
        allModals.forEach(modal => {
          if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
          }
        });
      }
    });
  }

  waitForFirebase(timeout = 2500) {
    if (window.firebaseService && window.firebaseService.isInitialized) {
      return Promise.resolve(window.firebaseService);
    }
    return new Promise(resolve => {
      let resolved = false;
      const cleanup = () => {
        if (resolved) return;
        resolved = true;
        clearInterval(interval);
        clearTimeout(timer);
        window.removeEventListener('firebase-ready', handler);
      };
      const handler = (e) => {
        cleanup();
        resolve(e.detail || window.firebaseService);
      };
      window.addEventListener('firebase-ready', handler, { once: true });

      const interval = setInterval(() => {
        if (window.firebaseService) {
          cleanup();
          resolve(window.firebaseService);
        }
      }, 50);

      const timer = setTimeout(() => {
        cleanup();
        resolve(window.firebaseService || null);
      }, timeout);
    });
  }

  _createFallbackFirebaseService() {
    const LOCAL_KEY = 'van_uyen_custom_works';
    return {
      isInitialized: true,
      status: 'offline',
      onStatusChange(cb) { if (typeof cb === 'function') cb('offline'); },
      async getCustomWorks() {
        try {
          const raw = localStorage.getItem(LOCAL_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch { return []; }
      },
      async getWork(id) {
        const list = await this.getCustomWorks();
        return list.find(w => w.id === id) || null;
      },
      async saveWork(workData) {
        const list = await this.getCustomWorks();
        const idx = list.findIndex(w => w.id === workData.id);
        const item = { ...workData, updatedAt: new Date().toISOString() };
        if (idx >= 0) list[idx] = item;
        else list.push(item);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: item }));
        return { success: true, workId: workData.id, cloud: false };
      },
      async deleteWork(id) {
        const list = await this.getCustomWorks();
        const filtered = list.filter(w => w.id !== id);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: { id, _deleted: true } }));
        return true;
      }
    };
  }

  setupFirestoreListener() {
    const attach = (service) => {
      if (service && typeof service.onStatusChange === 'function') {
        service.onStatusChange((status, err) => {
          this.updateConnectionStatus(status, err);
        });
      }
    };

    if (window.firebaseService) {
      attach(window.firebaseService);
    }

    // Nếu firebaseService nạp sau khi trang mở, tự động gán listener và làm mới
    window.addEventListener('firebase-ready', (e) => {
      const fs = e.detail || window.firebaseService;
      attach(fs);
      this.loadInitialData().then(() => this.renderTable());
    }, { once: true });
  }

  updateConnectionStatus(status, err) {
    if (!this.statusPill || !this.statusText) return;

    this.statusPill.className = `status-pill ${status}`;
    if (status === 'connected') {
      this.statusText.textContent = "Firestore: Đã kết nối";
    } else if (status === 'connecting') {
      this.statusText.textContent = "Firestore: Đang kết nối...";
    } else if (status === 'permission-denied') {
      this.statusText.textContent = "Firestore: Cần mở quyền Rules";
    } else {
      this.statusText.textContent = "Firestore: Ngoại tuyến (Đã bật lưu máy)";
    }
  }

  async loadInitialData() {
    // 1. Nạp baseline từ LITERARY_DATA
    const baseWorks = (window.LITERARY_DATA && window.LITERARY_DATA.works) 
      ? JSON.parse(JSON.stringify(window.LITERARY_DATA.works)) 
      : [];

    this.works = baseWorks;

    // 2. Thử nạp bản tùy biến từ Firebase Service (Firestore hoặc Local Cache)
    try {
      let fs = window.firebaseService;
      if (!fs) fs = await this.waitForFirebase(1200);
      if (!fs) fs = this._createFallbackFirebaseService();

      if (fs) {
        const customWorks = await fs.getCustomWorks();
        if (customWorks && customWorks.length > 0) {
          customWorks.forEach(cw => {
            this.customWorksMap.set(cw.id, cw);
            const idx = this.works.findIndex(w => w.id === cw.id);
            if (idx >= 0) {
              this.works[idx] = { ...this.works[idx], ...cw, _isCustomFirestore: true };
            } else {
              this.works.push({ ...cw, _isCustomFirestore: true });
            }
          });
          console.log(`[Admin CMS] Đã nạp ${customWorks.length} tác phẩm tùy biến.`);
        }
      }
    } catch (err) {
      console.warn("[Admin CMS] Sử dụng dữ liệu nội bộ data.js:", err);
    }

    // 3. Nạp danh mục thể loại, tác giả, xuất xứ & 7 phân hệ chuyên biệt
    this.loadCategoriesData();
    this.loadAuthorsData();
    this.loadOriginsData();
    this.loadErasData();
    this.loadThemesData();
    this.loadCharactersData();
    this.loadArticlesData();
    this.loadTermsData();
    this.loadCommentsData();
    this.loadUsersData();
  }

  loadCategoriesData() {
    const defaultCategories = [
      {
        id: 'truyen-ngan',
        title: 'Truyện Ngắn & Ký',
        desc: 'Truyện ngắn hiện thực, tự sự trữ tình, ký họa nhân văn',
        filterKey: 'truyện, ký, tùy bút'
      },
      {
        id: 'tieu-thuyet',
        title: 'Tiểu Thuyết Kinh Điển',
        desc: 'Trường thiên tiểu thuyết, hiện thực phê phán, sử thi thế giới',
        filterKey: 'tiểu thuyết'
      },
      {
        id: 'tho-ca',
        title: 'Thơ Ca & Khúc Ngâm',
        desc: 'Trường ca lục bát, thơ mới, thơ kháng chiến ái quốc',
        filterKey: 'thơ, lục bát, khúc ngâm, trường ca'
      },
      {
        id: 'kich-ban',
        title: 'Kịch Bản Sân Khấu',
        desc: 'Bi kịch phục hưng, chính kịch thế sự, thoại kịch đương đại',
        filterKey: 'kịch'
      }
    ];

    try {
      const saved = localStorage.getItem('van_uyen_custom_categories');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          const map = new Map(defaultCategories.map(c => [c.id, c]));
          custom.forEach(c => map.set(c.id, c));
          this.categories = Array.from(map.values());
          return;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc danh mục thể loại lưu trữ:", e);
    }
    this.categories = defaultCategories;
  }

  loadAuthorsData() {
    const baselineAuthors = (window.LITERARY_DATA && window.LITERARY_DATA.authors)
      ? JSON.parse(JSON.stringify(window.LITERARY_DATA.authors))
      : [];

    const authorMap = new Map();
    baselineAuthors.forEach(a => {
      authorMap.set(a.name.trim().toLowerCase(), a);
    });

    // Đồng bộ và làm giàu thông tin Quốc gia, Vùng xuất xứ, Thời kỳ cho tác giả từ danh sách tác phẩm
    if (this.works) {
      this.works.forEach(w => {
        const aName = (w.author || '').trim();
        if (aName) {
          const key = aName.toLowerCase();
          const isVn = (w.origin === 'vn') || (w.country && w.country.toLowerCase().includes('việt nam'));
          const country = w.country || (isVn ? 'Việt Nam' : 'Quốc tế');
          const origin = w.origin || (isVn ? 'vn' : 'world');

          if (authorMap.has(key)) {
            const existing = authorMap.get(key);
            if (!existing.country) existing.country = country;
            if (!existing.origin) existing.origin = origin;
            if (!existing.era && w.era) existing.era = w.era;
          } else {
            authorMap.set(key, {
              id: w.authorId || aName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              name: aName,
              alias: '',
              years: '',
              era: w.era || '',
              country: country,
              origin: origin,
              avatarInitials: aName.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase(),
              bio: `Tác giả kiệt tác "${w.title}".`,
              masterpieces: w.title
            });
          }
        }
      });
    }

    // Đảm bảo mọi tác giả baseline đều có quốc gia và khu vực địa lý
    authorMap.forEach(a => {
      if (!a.country) {
        const nameLow = a.name.toLowerCase();
        if (nameLow.includes('kafka')) { a.country = 'Cộng hòa Séc'; a.origin = 'world'; }
        else if (nameLow.includes('márquez') || nameLow.includes('marquez')) { a.country = 'Colombia (Mỹ Latinh)'; a.origin = 'world'; }
        else if (nameLow.includes('hemingway')) { a.country = 'Hoa Kỳ'; a.origin = 'world'; }
        else if (nameLow.includes('aitmatov')) { a.country = 'Kyrgyzstan (Liên Xô)'; a.origin = 'world'; }
        else if (nameLow.includes('lỗ tấn')) { a.country = 'Trung Quốc'; a.origin = 'world'; }
        else if (nameLow.includes('chekhov')) { a.country = 'Nga'; a.origin = 'world'; }
        else if (nameLow.includes('cervantes')) { a.country = 'Tây Ban Nha'; a.origin = 'world'; }
        else if (nameLow.includes('shakespeare')) { a.country = 'Vương quốc Anh'; a.origin = 'world'; }
        else if (nameLow.includes('victor hugo')) { a.country = 'Pháp'; a.origin = 'world'; }
        else { a.country = 'Việt Nam'; a.origin = 'vn'; }
      }
    });

    // Dữ liệu chuẩn mực đặc thù môn Ngữ văn cho các tác giả kinh điển
    const authorEnrichment = {
      'nguyễn du': {
        hometown: 'Làng Tiên Điền, huyện Nghi Xuân, tỉnh Hà Tĩnh',
        style: 'Hiện thực sâu sắc, nhân đạo bao la, kết tinh ngôn từ lục bát tuyệt đỉnh',
        awards: 'Danh nhân văn hóa thế giới (UNESCO 1965), Đại thi hào dân tộc',
        status: 'published'
      },
      'nam cao': {
        hometown: 'Làng Đại Hoàng, tổng Cao Đà, huyện Lý Nhân, tỉnh Hà Nam',
        style: 'Hiện thực tâm lý sắc sảo, triết lý nhân sinh sâu sắc, văn phong lạnh lùng đôn hậu',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'thạch lam': {
        hometown: 'Làng Cẩm Giàng, huyện Cẩm Giàng, tỉnh Hải Dương',
        style: 'Lãng mạn nhẹ nhàng, giàu chất thơ, đi sâu vào nội tâm tinh tế và số phận nhỏ bé',
        awards: 'Thành viên cốt cán Tự Lực Văn Đoàn',
        status: 'published'
      },
      'vũ trọng phụng': {
        hometown: 'Làng Hảo, huyện Mỹ Hào, tỉnh Hưng Yên (sinh tại Hà Nội)',
        style: 'Trào phúng sắc lạnh, hoạt kê cay độc, hiện thực phê phán gay gắt',
        awards: 'Vua phóng sự đất Bắc',
        status: 'published'
      },
      'xuân diệu': {
        hometown: 'Làng Trảo Nha, huyện Can Lộc, tỉnh Hà Tĩnh (sinh tại Bình Định)',
        style: 'Nồng nàn, sôi nổi, đắm say, cảm quan thẩm mỹ phương Tây mới mẻ tinh tế',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'nguyễn tuân': {
        hometown: 'Làng Thượng Đình, Nhân Mục (nay thuộc Thanh Xuân, Hà Nội)',
        style: 'Uyên bác, tài hoa, cả đời đi tìm cái Đẹp và tôn vinh văn hóa cổ truyền',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'huy cận': {
        hometown: 'Làng Ân Phú, huyện Hương Sơn (nay là Vũ Quang), tỉnh Hà Tĩnh',
        style: 'Hàm súc, giàu chất suy tưởng triết lý và cảm thức vũ trụ mênh mông',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'ngô tất tố': {
        hometown: 'Làng Lộc Hà, huyện Đông Ngàn, phủ Từ Sơn (nay thuộc Đông Anh, Hà Nội)',
        style: 'Hiện thực phê phán gay gắt, bênh vực đến cùng quyền sống của người nông dân',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'kim lân': {
        hometown: 'Làng Phù Lưu, xã Tân Hồng, huyện Từ Sơn, tỉnh Bắc Ninh',
        style: 'Am hiểu sâu sắc phong tục làng quê, đôn hậu, hóm hỉnh, thuần hậu chất phác',
        awards: 'Giải thưởng Nhà nước về Văn học - Nghệ thuật (2001)',
        status: 'published'
      },
      'tô hoài': {
        hometown: 'Làng Cát Động, Thanh Oai, Hà Tây (quê ngoại Nghĩa Đô, Cầu Giấy, Hà Nội)',
        style: 'Vốn sống phong phú, ngôn ngữ tạo hình sinh động, tài quan sát phong tục',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (1996)',
        status: 'published'
      },
      'nguyễn minh châu': {
        hometown: 'Làng Thơi, xã Quỳnh Hải, huyện Quỳnh Lưu, tỉnh Nghệ An',
        style: 'Khám phá con người trong chiều sâu thế sự và triết lý nhân bản hậu chiến',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (2000)',
        status: 'published'
      },
      'nguyễn quang sáng': {
        hometown: 'Xã Mỹ Luông, huyện Chợ Mới, tỉnh An Giang',
        style: 'Hào sảng, phóng khoáng, mộc mạc, thấm thía tình cảm con người Nam Bộ',
        awards: 'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (2000)',
        status: 'published'
      },
      'nguyễn thành long': {
        hometown: 'Huyện Duy Xuyên, tỉnh Quảng Nam',
        style: 'Nhẹ nhàng, trong sáng, giàu chất thơ và cảm hứng ngợi ca cống hiến thầm lặng',
        awards: 'Giải thưởng Nhà nước về Văn học - Nghệ thuật (2007)',
        status: 'published'
      },
      'lê minh khuê': {
        hometown: 'Huyện Tĩnh Gia (nay là thị xã Nghi Sơn), tỉnh Thanh Hóa',
        style: 'Sắc sảo, gân guốc, tinh tế trong tâm lý người lính và chuyển biến hậu chiến',
        awards: 'Giải thưởng Nhà nước về Văn học - Nghệ thuật (2012)',
        status: 'published'
      },
      'hồ chí minh': {
        hometown: 'Làng Sen (Kim Liên), huyện Nam Đàn, tỉnh Nghệ An',
        style: 'Cổ điển kết hợp hiện đại, trữ tình chính luận thâm trầm, sắc sảo',
        awards: 'Anh hùng giải phóng dân tộc, Danh nhân văn hóa kiệt xuất',
        status: 'published'
      },
      'thanh tịnh': {
        hometown: 'Xóm Gia Lạc, ven sông Hương, ngoại ô thành phố Huế',
        style: 'Trong trẻo, êm dịu, đượm chất thơ lãng mạn hoài niệm',
        awards: 'Giải thưởng Nhà nước về Văn học - Nghệ thuật (2007)',
        status: 'published'
      },
      'quang dũng': {
        hometown: 'Làng Phượng Trì, huyện Đan Phượng, Hà Nội',
        style: 'Hào hoa, phóng khoáng, lãng mạn và bi tráng',
        awards: 'Giải thưởng Nhà nước về Văn học - Nghệ thuật (2001)',
        status: 'published'
      },
      'nguyễn dữ': {
        hometown: 'Xã Đỗ Tùng, huyện Trường Tân (nay thuộc Thanh Miện, Hải Dương)',
        style: 'Kỳ ảo biến hóa, ngụ ngôn thế sự thâm thúy, áng thiên cổ kỳ bút',
        awards: 'Danh sĩ thời Lê Sơ - Mạc',
        status: 'published'
      },
      'ernest hemingway': {
        hometown: 'Oak Park, Illinois, Hoa Kỳ',
        style: 'Nguyên lý Tảng băng trôi (Iceberg Theory), đanh thép, tinh giản, hào hùng',
        awards: 'Giải Nobel Văn học (1954), Giải Pulitzer (1953)',
        status: 'published'
      },
      'franz kafka': {
        hometown: 'Praha, Vương quốc Bohemia (nay thuộc Cộng hòa Séc)',
        style: 'Hiện sinh phi lý, kỳ dị, nắm bắt nỗi âu lo và lưu đày nội tâm con người',
        awards: 'Đại văn hào hiện đại châu Âu',
        status: 'published'
      },
      'gabriel garcía márquez': {
        hometown: 'Aracataca, Colombia',
        style: 'Chủ nghĩa Hiện thực Huyền ảo (Magic Realism) kiệt xuất của Mỹ Latinh',
        awards: 'Giải Nobel Văn học (1982)',
        status: 'published'
      },
      'chingiz aitmatov': {
        hometown: 'Làng Sheker, thung lũng Talas, Kyrgyzstan',
        style: 'Sử thi nhân ái bao la, kết hợp huyền thoại dân gian với trăn trở hiện đại',
        awards: 'Anh hùng Lao động Xã hội Chủ nghĩa, Giải thưởng Nhà nước Liên Xô',
        status: 'published'
      }
    };

    try {
      const saved = localStorage.getItem('van_uyen_custom_authors');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          custom.forEach(a => {
            const key = a.name.trim().toLowerCase();
            if (authorMap.has(key)) {
              authorMap.set(key, { ...authorMap.get(key), ...a });
            } else {
              authorMap.set(key, a);
            }
          });
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc tác giả lưu trữ:", e);
    }

    // Làm giàu và chuẩn hóa các trường thông tin cho toàn bộ tác giả
    authorMap.forEach((a, k) => {
      const enrich = authorEnrichment[k];
      if (enrich) {
        if (!a.hometown) a.hometown = enrich.hometown;
        if (!a.style) a.style = enrich.style;
        if (!a.awards) a.awards = enrich.awards;
        if (!a.status) a.status = enrich.status;
      }
      if (!a.status) a.status = 'published';
      if (!a.hometown) a.hometown = '';
      if (!a.style) a.style = '';
      if (!a.awards) a.awards = '';
      if (!a.avatar) a.avatar = '';
    });

    this.authors = Array.from(authorMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' })
    );
  }

  loadOriginsData() {
    const defaultOrigins = [
      { country: 'Việt Nam', region: 'vn', flag: '🇻🇳', desc: 'Văn học dân tộc từ trung đại chữ Hán Nôm đến hiện thực phê phán và kháng chiến ái quốc.' },
      { country: 'Nga', region: 'world', flag: '🇷🇺', desc: 'Văn học hiện thực tâm lý vĩ đại và chủ nghĩa nhân đạo sâu sắc.' },
      { country: 'Pháp', region: 'world', flag: '🇫🇷', desc: 'Cái nôi của chủ nghĩa nhân đạo, hiện thực phê phán và văn học ánh sáng.' },
      { country: 'Hoa Kỳ', region: 'world', flag: '🇺🇸', desc: 'Phong cách nguyên lý tảng băng trôi, hiện thực hiện sinh thế kỷ XX.' },
      { country: 'Colombia (Mỹ Latinh)', region: 'world', flag: '🇨🇴', desc: 'Chủ nghĩa hiện thực huyền ảo (Magic Realism) kiệt xuất của Mỹ Latinh.' },
      { country: 'Trung Quốc', region: 'world', flag: '🇨🇳', desc: 'Văn học cổ điển phương Đông và văn học phê phán quốc dân tính thời kỳ Tân văn hóa.' },
      { country: 'Tây Ban Nha', region: 'world', flag: '🇪🇸', desc: 'Thời kỳ Phục hưng rực rỡ và nghệ thuật tiểu thuyết hiệp sĩ kinh điển.' },
      { country: 'Vương quốc Anh', region: 'world', flag: '🇬🇧', desc: 'Bi kịch và hài kịch thời kỳ Phục hưng, chủ nghĩa lãng mạn.' },
      { country: 'Cộng hòa Séc', region: 'world', flag: '🇨🇿', desc: 'Cảm thức hiện sinh và văn học hiện đại châu Âu.' },
      { country: 'Kyrgyzstan (Liên Xô)', region: 'world', flag: '🇰🇬', desc: 'Văn học Trung Á thấm đẫm chất thơ và lòng nhân ái bao la.' },
      { country: 'Hy Lạp cổ đại', region: 'world', flag: '🇬🇷', desc: 'Cái nôi của văn minh phương Tây, thần thoại và sử thi Homer.' },
      { country: 'Nhật Bản', region: 'world', flag: '🇯🇵', desc: 'Mỹ cảm mono no aware, văn học cận hiện đại tinh tế sâu sắc.' },
      { country: 'Đức', region: 'world', flag: '🇩🇪', desc: 'Triết học Khai sáng, chủ nghĩa lãng mạn và văn học hiện sinh.' }
    ];

    const originMap = new Map();
    defaultOrigins.forEach(o => originMap.set(o.country.toLowerCase(), o));

    if (this.works) {
      this.works.forEach(w => {
        const c = (w.country || (w.origin === 'vn' ? 'Việt Nam' : '')).trim();
        if (c && !originMap.has(c.toLowerCase())) {
          originMap.set(c.toLowerCase(), {
            country: c,
            region: w.origin === 'vn' ? 'vn' : 'world',
            flag: w.origin === 'vn' ? '🇻🇳' : '🌐',
            desc: `Văn học quốc gia ${c}.`
          });
        }
      });
    }

    try {
      const saved = localStorage.getItem('van_uyen_custom_origins');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom)) {
          custom.forEach(o => originMap.set(o.country.toLowerCase(), o));
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc xuất xứ lưu trữ:", e);
    }

    this.origins = Array.from(originMap.values());
  }

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
        personality: 'Xấu xí "ma chê quỷ hờn", ngẩn ngơ, dở hơi, nghèo hèn dòng giống mả hủi. Nhưng bên trong vẻ ngoài thô kệch là trái tim nhân hậu, giàu tình thương mộc mạc, không bị vẩn đục bởi định kiến giai cấp.',
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
        personality: 'Người con gái Mèo xinh đẹp, tài hoa, hiếu thảo. Bị bắt làm con dâu gạt nợ nhà thống lý Pá Tra, bị bóc lột sức lao động và đày đọa tinh thần đến mức "lùi lũi như con rùa nuôi trong xó cửa". Nhưng ngọn lửa sống chưa bao giờ tắt: tiếng sáo đêm xuân đã đánh thức lòng yêu đời, và giọt nước mắt của A Phủ đã thôi thúc Mị cắt dây trói cùng chạy trốn tìm tự do.',
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
        symbolicMeaning: 'Khắc họa quy luật hiện thực sâu sắc: "Tức nước vỡ bờ" — sức mạnh phản kháng quật cường tiềm ẩn bên trong người phụ nữ nông dân hiền lành.'
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
        personality: 'Văn võ toàn tài, có tài viết chữ Hán "đẹp lắm, vuông lắm", hiên ngang bất khuất trước cường quyền và cái chết. Trân trọng tấm lòng yêu cái đẹp của viên quản ngục, sẵn lòng cho chữ trong buồng giam tăm tối.',
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
        symbolicMeaning: 'Bức tượng đài bi thương cho số phận người phụ nữ trong xã hội phong kiến, kết tinh tấm lòng nhân đạo bao la "trông về nỗi thương" của đại thi hào Nguyễn Du.'
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
        content: 'I. MỞ BÀI\n- Giới thiệu nhà văn Tô Hoài và truyện ngắn kiệt tác "Vợ chồng A Phủ" (1952).\n- Dẫn dắt vấn đề: Diễn biến tâm lý nhân vật Mị trong đêm tình mùa xuân ở Hồng Ngài — bản tình ca bất tử về sức sống tiềm tàng và khát vọng tự do của con người vùng cao.\n\nII. THÂN BÀI\n1. Bối cảnh không gian và các yếu tố ngoại cảnh tác động:\n- Mùa xuân Hồng Ngài: gió thổi vào cỏ gianh vàng ửng, những chiếc váy hoa phơi trên mỏm đá như con bướm sặc sỡ, men rượu cần ngày Tết.\n- Đặc biệt là "tiếng sáo" — biểu tượng của tình yêu đôi lứa, chiếc cầu nối kỳ diệu đưa Mị từ thực tại nô lệ trở về với quá khứ thanh xuân tươi đẹp.\n\n2. Quá trình hồi sinh tâm lý qua các giai đoạn:\n- Giai đoạn 1: Mị uống rượu "uống ực từng bát" như nuốt cay nuốt đắng vào lòng. Rượu làm say phần thể xác nhưng làm tỉnh phần tâm hồn.\n- Giai đoạn 2: Ý thức về bản thân thức dậy: "Mị thấy phơi phới trở lại", "Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi". Lần đầu tiên sau bao năm câm lặng, Mị ý thức được tuổi trẻ và quyền được sống như một con người.\n- Giai đoạn 3: Phản kháng lại hoàn cảnh bi đát: Mị bước vào buồng, thắp sáng ngọn đèn dầu, quấn lại tóc, với lấy chiếc váy hoa chuẩn bị đi chơi Tết.\n- Giai đoạn 4: Dù bị A Sử trói đứng vào cột nhà bằng cả thúng sợi đay, "Mị vẫn nghe tiếng sáo đưa Mị đi theo những cuộc chơi". Tâm hồn Mị đã vượt ra ngoài gông cùm thể xác.\n\nIII. KẾT BÀI\n- Đánh giá bút pháp miêu tả tâm lý bậc thầy của Tô Hoài.\n- Ý nghĩa nhân đạo sâu sắc: Sức sống của con người không bao giờ bị dập tắt, ngọn lửa khát vọng luôn âm ỉ cháy đợi ngày bùng lên thành ngọn lửa quật khởi.'
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
        content: 'I. MỞ BÀI\n- Nam Cao là cây bút hiện thực tâm lý xuất sắc nhất của văn xuôi Việt Nam trước 1945.\n- "Chí Phèo" là kiệt tác đỉnh cao thể hiện số phận bần cùng và bi kịch đau đớn nhất: bi kịch bị cự tuyệt quyền làm người.\n\nII. THÂN BÀI\n1. Tầng bi kịch thứ nhất: Bị tha hóa, đánh mất nhân hình lẫn nhân tính:\n- Vốn là nông dân lương thiện, tự trọng: "thấy nhục" khi bị bà Ba bắt bóp chân.\n- Bị đẩy vào tù, trở về với bộ dạng đầu bò: "cái đầu trọc lốc, răng cạo trắng hớn, mặt đầy những vết sẹo mảnh chai".\n- Trở thành công cụ đâm thuê chém mướn của Bá Kiến, cất tiếng chửi thay cho tiếng nói người.\n\n2. Sự thức tỉnh và khát vọng hoàn lương:\n- Cuộc gặp gỡ định mệnh với Thị Nở: bát cháo hành ấm áp khơi dậy bản tính thiện.\n- Lắng nghe âm thanh cuộc sống: tiếng chim hót, tiếng cười nói người đi chợ, tiếng anh thuyền chài gõ mái chèo.\n- Khát khao xây dựng tổ ấm bình dị: "Giá cứ thế này mãi thì thích nhỉ?".\n\n3. Đỉnh điểm bi kịch: Bị xã hội cự tuyệt quyền làm người:\n- Bà cô Thị Nở — hiện thân của định kiến làng Vũ Đại hà khắc chối bỏ Chí.\n- Chí uống rượu nhưng "càng uống càng tỉnh", mùi cháo hành cứ thoang thoảng.\n- Hành động cầm dao đến nhà Bá Kiến đâm chết kẻ thù và tự sát: Lời kêu cứu tuyệt vọng: "Tao muốn làm người lương thiện! Ai cho tao lương thiện?".\n\nIII. KẾT BÀI\n- Cái chết của Chí Phèo khẳng định chân lý: Nhân tính cao thượng thà chết để bảo toàn thiên lương chứ nhất quyết không quay lại kiếp quỷ dữ.'
      },
      {
        id: 'chat-tho-hai-dua-tre-thach-lam',
        title: 'Chất thơ và vẻ đẹp tình người trong thiên truyện ngắn "Hai đứa trẻ" (Thạch Lam)',
        category: 'Góc nhìn nghệ thuật',
        grade: 'Lớp 11',
        workTitle: 'Hai đứa trẻ (Thạch Lam)',
        author: 'Ban Biên Tập Văn Uyển',
        views: 1620,
        summary: 'Nghệ thuật tương phản giữa ánh sáng le lói và bóng tối mênh mông; nhịp điệu văn xuôi êm đềm như một bài thơ trữ tình đượm buồn nhân bản.',
        content: 'Truyện ngắn "Hai đứa trẻ" của Thạch Lam là một trong những áng văn xuôi giàu chất thơ nhất của văn học lãng mạn Việt Nam thời kỳ 1930 - 1945. Không có cốt truyện ly kỳ, tác phẩm như một khúc ca êm dịu mà day dứt về bức tranh phố huyện nghèo lúc chiều tàn cho tới đêm khuya, nơi những kiếp người tàn tạ mỏi mòn kiếm sống trong bóng tối và chuyến tàu đêm rực rỡ từ Hà Nội vút qua mang theo cả một thế giới ước mơ xa xăm.'
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
        content: 'Nguyễn Tuân là bậc thầy phù thủy ngôn từ của văn học Việt Nam. Trong thiên tùy bút "Người lái đò Sông Đà", ông đã biến dòng sông Tây Bắc thành một sinh thể sống động với hai nét tính cách độc đáo: vừa hùng vĩ, hiểm trở, hung bạo với các trùng vi thạch trận, vừa thơ mộng, trữ tình, "tuôn dài tuôn dài như một áng tóc trữ tình".'
      },
      {
        id: 'tinh-huong-truyen-vo-nhat-kim-lan',
        title: 'Nghệ thuật xây dựng tình huống truyện độc đáo trong tác phẩm "Vợ nhặt" (Kim Lân)',
        category: 'Đề thi & Đáp án',
        grade: 'Lớp 12 · Đề thi Quốc Gia',
        workTitle: 'Vợ nhặt (Kim Lân)',
        author: 'Hội đồng Học liệu Văn học',
        views: 2890,
        summary: 'Tình huống nhặt vợ vừa éo le, nghịch lý giữa nạn đói khốc liệt, vừa chan chứa tình người, khơi dậy khát vọng sống và niềm tin cách mạng.',
        content: 'Tình huống truyện "Vợ nhặt" của Kim Lân được xem là một trong những tình huống độc đáo và xuất sắc nhất của truyện ngắn hiện thực Việt Nam. Giữa lúc ranh giới giữa sự sống và cái chết mong manh như sợi tóc, anh Tràng nghèo khó, ngụ cư lại "nhặt" được vợ chỉ sau vài câu đùa và bốn bát bánh đúc. Tình huống éo le ấy không gieo rắc nỗi bi quan mà ngược lại, thắp lên ngọn lửa ấm áp của tình người và niềm lạc quan hướng về ngày mai tươi sáng.'
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
        example: '"Thuyền về có nhớ bến chăng / Bến thì một dạ khăng khăng đợi thuyền" (Ca dao tình nghĩa).\n-> "Thuyền" là hình ảnh ẩn dụ chỉ người con trai nay đây mai đó; "Bến" ẩn dụ cho người con gái thủy chung chờ đợi.',
        application: 'Khi phân tích thơ ca, cần chỉ ra hai vế tương đồng (vế ẩn và vế hiện) và làm nổi bật dụng ý nghệ thuật của tác giả trong việc kín đáo bộc lộ cảm xúc.'
      },
      {
        id: 'hoan-du',
        name: 'Hoán Dụ (Metonymy)',
        type: 'Biện pháp tu từ',
        definition: 'Biện pháp tu từ gọi tên sự vật, hiện tượng, khái niệm này bằng tên của một sự vật, hiện tượng khác có quan hệ gần gũi, đi liền với nhau trong thực tế khách quan.',
        example: '"Áo chàm đưa buổi phân ly / Cầm tay nhau biết nói gì hôm nay" (Việt Bắc - Tố Hữu).\n-> "Áo chàm" (trang phục đặc trưng) hoán dụ cho đồng bào các dân tộc thiểu số vùng chiến khu Việt Bắc.',
        application: 'Chỉ ra mối liên hệ thực tế cụ thể (dấu hiệu - đối tượng; bộ phận - toàn thể) để thấy được sự gắn bó ruột thịt và tình cảm tha thiết của nhân vật trữ tình.'
      },
      {
        id: 'tinh-huong-truyen',
        name: 'Tình Huống Truyện (Story Situation)',
        type: 'Lý luận văn học',
        definition: 'Hoàn cảnh, sự kiện đặc biệt mang tính nút thắt mà ở đó các nhân vật bộc lộ sâu sắc tính cách, tâm lý và tư tưởng cốt lõi của tác phẩm được phát sáng rực rỡ.',
        example: 'Tình huống anh Tràng "nhặt" được vợ giữa những ngày nạn đói năm 1945 khủng khiếp trong truyện ngắn "Vợ nhặt" của Kim Lân.',
        application: 'Bài thi đạt điểm cao khi phân tích được 3 phương diện: hoàn cảnh xuất hiện tình huống -> diễn biến tâm lý các nhân vật -> giá trị hiện thực và chiều sâu nhân đạo mà tác giả gửi gắm.'
      },
      {
        id: 'diem-nhin-nghe-thuat',
        name: 'Điểm Nhìn Nghệ Thuật (Narrative Perspective)',
        type: 'Thi pháp trần thuật',
        definition: 'Vị trí, khoảng cách và góc độ mà người kể chuyện hay nhân vật dùng để quan sát, cảm nhận, bình giá và trần thuật thế giới nghệ thuật.',
        example: 'Điểm nhìn của nghệ sĩ Phùng trong "Chiếc thuyền ngoài xa": chuyển dịch từ điểm nhìn thẩm mỹ lãng mạn thuần túy sang điểm nhìn thế sự, nhân sinh sâu sắc.',
        application: 'Phân tích sự đa thanh, sự chuyển dịch điểm nhìn từ bên ngoài vào bên trong tâm tư nhân vật để làm nổi bật chiều sâu tư tưởng hiện đại.'
      },
      {
        id: 'chu-nghia-hien-thuc-huyen-ao',
        name: 'Hiện Thực Huyền Ảo (Magic Realism)',
        type: 'Trường phái văn học',
        definition: 'Khuynh hướng sáng tác kết hợp hài hòa giữa hiện thực đời sống trần trụi với các yếu tố hoang đường, kỳ ảo, huyền thoại như những điều hoàn toàn bình thường hiển nhiên.',
        example: 'Tiểu thuyết "Trăm năm cô đơn" của Gabriel García Márquez (người bay lên trời, trận mưa hoa vàng rơi ngập lối, dòng họ mắc chứng mất ngủ quên lãng quá khứ).',
        application: 'Làm rõ các tầng nghĩa ẩn dụ biểu tượng về lịch sử, chính trị, bản sắc văn hóa và nỗi cô đơn của nhân loại trong bối cảnh xã hội biến thiên.'
      },
      {
        id: 'nguyen-ly-tang-bang-troi',
        name: 'Nguyên Lý Tảng Băng Trôi (Iceberg Theory)',
        type: 'Thi pháp văn xuôi',
        definition: 'Nguyên lý sáng tác của Ernest Hemingway: tác phẩm chỉ nên phô bày một phần bảy bề nổi (hành động, lời thoại ngắn gọn), còn sáu phần bảy chìm sâu dưới đáy biển (ý nghĩa tư tưởng, cảm xúc) để bạn đọc tự đồng sáng tạo giải mã.',
        example: 'Tác phẩm "Ông già và biển cả": Cuộc vật lộn bắt cá kiếm là bề nổi; khát vọng chinh phục lý tưởng, lòng kiêu hãnh và sức mạnh tinh thần con người là phần chìm.',
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
        example: '"Qua Đèo Ngang" của Bà Huyện Thanh Quan, chùm thơ Thu của Nguyễn Khuyến.',
        application: 'Khi phân tích cần chú ý nghệ thuật đối thanh, đối ý, cách hiệp vần chân và nghệ thuật "tả cảnh ngụ tình" kín đáo của thi nhân xưa.'
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
        content: 'Đoạn Kiều ở lầu Ngưng Bích có hệ thống điệp từ "Buồn trông" rất hay, mong BBT có thêm bài phân tích chuyên sâu về các cặp câu thơ lục bát này ạ!',
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



  updateSidebarCounts() {
    const totalWorks = this.works ? this.works.length : 0;
    const authorsCount = this.authors ? this.authors.length : 0;
    const categoriesCount = this.categories ? this.categories.length : 0;
    const originsCount = this.origins ? this.origins.length : 0;

    if (this.sidebarCountWorks) this.sidebarCountWorks.textContent = totalWorks;
    if (this.sidebarCountAuthors) this.sidebarCountAuthors.textContent = authorsCount;
    if (this.sidebarCountCategories) this.sidebarCountCategories.textContent = categoriesCount;
    if (this.sidebarCountOrigins) this.sidebarCountOrigins.textContent = originsCount;
    if (this.sidebarCountEras) this.sidebarCountEras.textContent = this.eras ? this.eras.length : 6;
    if (this.sidebarCountThemes) this.sidebarCountThemes.textContent = this.themes ? this.themes.length : 8;
    if (this.sidebarCountCharacters) this.sidebarCountCharacters.textContent = this.characters ? this.characters.length : 12;
    if (this.sidebarCountArticles) this.sidebarCountArticles.textContent = this.articles ? this.articles.length : 6;
    if (this.sidebarCountTerms) this.sidebarCountTerms.textContent = this.terms ? this.terms.length : 8;
    if (this.sidebarCountComments) {
      const pendingCount = this.comments ? this.comments.filter(c => c.status === 'pending').length : 0;
      this.sidebarCountComments.textContent = pendingCount || (this.comments ? this.comments.length : 6);
    }
    if (this.sidebarCountUsers) this.sidebarCountUsers.textContent = this.users ? this.users.length : 4;

    if (this.statVnCount) {
      this.statVnCount.textContent = this.works ? this.works.filter(w => w.origin === 'vn').length : 0;
    }
    if (this.statWorldCount) {
      this.statWorldCount.textContent = this.works ? this.works.filter(w => w.origin === 'world').length : 0;
    }
    if (this.statSgkCount) {
      this.statSgkCount.textContent = this.works ? this.works.filter(w => 
        (w.fullTextStatus && w.fullTextStatus.includes('SGK')) ||
        (w.sgkDetail && w.sgkDetail.length > 0) ||
        (w.tags && w.tags.some(t => t.includes('SGK')))
      ).length : 0;
    }
  }

  renderTable() {
    this.updateSidebarCounts();
    this._renderActiveSubfilterBanner();

    if (!this.listViewEl) this.listViewEl = document.getElementById('admin-list-view');
    if (!this.gridViewEl) this.gridViewEl = document.getElementById('admin-grid-view');
    if (!this.tableToolbar) this.tableToolbar = document.getElementById('admin-table-toolbar');
    if (!this.paginationBar) this.paginationBar = document.getElementById('admin-pagination-bar');

    const isWorksTab = this.currentSidebarTab === 'works';

    if (isWorksTab) {
      if (this.tableToolbar) this.tableToolbar.style.display = 'flex';
      this.setViewMode(this.viewMode || 'list');
    } else {
      if (this.tableToolbar) this.tableToolbar.style.display = 'none';
      if (this.listViewEl) this.listViewEl.style.display = 'none';
      if (this.gridViewEl) this.gridViewEl.style.display = 'none';
      if (this.paginationBar) this.paginationBar.style.display = 'none';
    }

    const filtered = this._getFilteredSortedWorks();
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    if (this.currentPage < 1) this.currentPage = 1;

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = Math.min(startIdx + this.pageSize, totalItems);
    const pagedWorks = filtered.slice(startIdx, endIdx);

    if (this.worksCountEl) {
      this.worksCountEl.textContent = `${totalItems} tác phẩm`;
    }

    this._renderListView(pagedWorks, totalItems);
    this._renderGridView(pagedWorks, totalItems);
    this._renderPagination(totalItems, totalPages, startIdx, endIdx);
  }

  _getFilteredSortedWorks() {
    let filtered = this.works;
    if (this.currentFilter === 'vn') filtered = filtered.filter(w => w.origin === 'vn');
    else if (this.currentFilter === 'world') filtered = filtered.filter(w => w.origin === 'world');
    else if (this.currentFilter === 'custom') filtered = filtered.filter(w => this.customWorksMap.has(w.id));

    // Bộ lọc chuyên sâu từ Sidebar Subview
    if (this.activeCategoryFilter) {
      const catObj = this.categories.find(c => c.id === this.activeCategoryFilter);
      const kws = catObj 
        ? (catObj.filterKey || catObj.title).toLowerCase().split(',').map(s => s.trim()).filter(Boolean)
        : [this.activeCategoryFilter.toLowerCase()];
      filtered = filtered.filter(w => {
        const catLow = (w.category || '').toLowerCase();
        const tagList = (w.tags || []).map(t => t.toLowerCase());
        return kws.some(k => catLow.includes(k) || tagList.some(t => t.includes(k)));
      });
    }
    if (this.activeAuthorFilter) {
      filtered = filtered.filter(w => (w.author && w.author.trim() === this.activeAuthorFilter.trim()));
    }
    if (this.activeOriginFilter) {
      if (this.activeOriginFilter === 'vn') {
        filtered = filtered.filter(w => w.origin === 'vn');
      } else if (this.activeOriginFilter === 'world') {
        filtered = filtered.filter(w => w.origin === 'world');
      } else {
        const origLow = this.activeOriginFilter.toLowerCase();
        filtered = filtered.filter(w => 
          (w.country && w.country.toLowerCase().includes(origLow)) ||
          (w.originLabel && w.originLabel.toLowerCase().includes(origLow))
        );
      }
    }
    if (this.activeEraFilter) {
      const eraObj = this.eras ? this.eras.find(e => e.id === this.activeEraFilter) : null;
      if (eraObj) {
        const kws = (eraObj.filterKeys || eraObj.name).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        filtered = filtered.filter(w => {
          const eraLow = (w.era || '').toLowerCase();
          const tagList = (w.tags || []).map(t => t.toLowerCase());
          const catLow = (w.category || '').toLowerCase();
          const titleLow = (w.title || '').toLowerCase();
          return kws.some(k => eraLow.includes(k) || tagList.some(t => t.includes(k)) || catLow.includes(k) || titleLow.includes(k));
        });
      }
    }
    if (this.activeThemeFilter) {
      const themeObj = this.themes ? this.themes.find(t => t.id === this.activeThemeFilter) : null;
      if (themeObj) {
        const kws = (themeObj.filterKeywords || themeObj.title).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        filtered = filtered.filter(w => {
          const titleLow = (w.title || '').toLowerCase();
          const tagList = (w.tags || []).map(t => t.toLowerCase());
          const catLow = (w.category || '').toLowerCase();
          const excerptLow = (w.excerpt || '').toLowerCase();
          return kws.some(k => titleLow.includes(k) || tagList.some(t => t.includes(k)) || catLow.includes(k) || excerptLow.includes(k));
        });
      }
    }

    if (this.searchQuery) {
      filtered = filtered.filter(w =>
        (w.title && w.title.toLowerCase().includes(this.searchQuery)) ||
        (w.author && w.author.toLowerCase().includes(this.searchQuery)) ||
        (w.category && w.category.toLowerCase().includes(this.searchQuery)) ||
        (w.id && w.id.toLowerCase().includes(this.searchQuery))
      );
    }
    return [...filtered].sort((a, b) => {
      const cmp = (a.title || '').localeCompare(b.title || '', 'vi', { sensitivity: 'base' });
      return this.sortOrder === 'desc' ? -cmp : cmp;
    });
  }

  _renderListView(filtered) {
    if (!this.worksTableBody) return;
    if (filtered.length === 0) {
      this.worksTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy tác phẩm nào.</td></tr>`;
      return;
    }
    this.worksTableBody.innerHTML = filtered.map((w, idx) => {
      const isCustom = this.customWorksMap.has(w.id);
      const thumbHtml = w.image
        ? `<img src="${w.image}" alt="${w.title}" class="admin-table-thumb" loading="lazy" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">`
        : `<div class="admin-table-thumb-placeholder"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:var(--text-muted);fill:none"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
      const statusBadge = isCustom
        ? `<span class="badge-cloud" style="font-size:0.72rem">&#9729; Cloud</span>`
        : `<span class="badge-local" style="font-size:0.72rem">Mặc định</span>`;
      const originBadge = w.origin === 'world'
        ? `<span style="font-size:0.75rem;color:var(--cerulean-700);font-weight:600">Thế Giới</span>`
        : `<span style="font-size:0.75rem;color:var(--jasper-700);font-weight:600">Việt Nam</span>`;
      return `
        <tr class="admin-table-row" style="animation-delay: ${(idx * 0.035).toFixed(3)}s">
          <td class="admin-table-thumb-cell">${thumbHtml}</td>
          <td>
            <div class="admin-table-title">${w.title || '—'}</div>
            <div class="admin-table-id" style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-ui)">${w.id}</div>
          </td>
          <td style="font-size:0.85rem">${w.author || '—'}</td>
          <td style="font-size:0.82rem;color:var(--text-secondary)">${w.category || '—'}</td>
          <td style="font-size:0.85rem;font-weight:600">${w.year || '—'}</td>
          <td>${originBadge}</td>
          <td>${statusBadge}</td>
          <td class="admin-table-actions">
            <button class="admin-action-btn admin-action-view" onclick="window.literaryAdmin.openDetailModal('${w.id}')" title="Xem chi tiết">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            <button class="admin-action-btn admin-action-edit" onclick="window.literaryAdmin.openEditModal('${w.id}')" title="Chỉnh sửa">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="admin-action-btn admin-action-delete" onclick="window.literaryAdmin.openDeleteModal('${w.id}')" title="Xóa">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  _renderGridView(filtered) {
    if (!this.worksGrid) return;
    if (filtered.length === 0) {
      this.worksGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy tác phẩm nào.</div>`;
      return;
    }
    this.worksGrid.innerHTML = filtered.map((w, idx) => {
      const isCustom = this.customWorksMap.has(w.id);
      const coverHtml = w.image
        ? `<img src="${w.image}" alt="${w.title}" class="admin-grid-card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">`
        : `<div class="admin-grid-card-img-placeholder"><svg viewBox="0 0 24 24" style="width:32px;height:32px;stroke:var(--text-muted);fill:none"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
      return `
        <div class="admin-grid-card" style="animation-delay: ${(idx * 0.04).toFixed(3)}s">
          <div class="admin-grid-card-cover">${coverHtml}</div>
          <div class="admin-grid-card-body">
            <div class="admin-grid-card-title">${w.title || '—'}</div>
            <div class="admin-grid-card-meta">${w.author || '—'} &bull; ${w.year || ''}</div>
            ${isCustom ? `<span class="badge-cloud" style="font-size:0.7rem">&#9729; Cloud</span>` : `<span class="badge-local" style="font-size:0.7rem">Mặc định</span>`}
          </div>
          <div class="admin-grid-card-actions">
            <button class="admin-action-btn admin-action-view" onclick="window.literaryAdmin.openDetailModal('${w.id}')" title="Xem">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            <button class="admin-action-btn admin-action-edit" onclick="window.literaryAdmin.openEditModal('${w.id}')" title="Sửa">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="admin-action-btn admin-action-delete" onclick="window.literaryAdmin.openDeleteModal('${w.id}')" title="Xóa">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  setViewMode(mode) {
    this.viewMode = mode;
    const btnList = document.getElementById('btn-view-list');
    const btnGrid = document.getElementById('btn-view-grid');
    if (!this.listViewEl) this.listViewEl = document.getElementById('admin-list-view');
    if (!this.gridViewEl) this.gridViewEl = document.getElementById('admin-grid-view');

    if (this.currentSidebarTab !== 'works') {
      if (this.listViewEl) this.listViewEl.style.display = 'none';
      if (this.gridViewEl) this.gridViewEl.style.display = 'none';
      return;
    }

    if (mode === 'list') {
      if (this.listViewEl) this.listViewEl.style.display = 'block';
      if (this.gridViewEl) this.gridViewEl.style.display = 'none';
      if (btnList) btnList.classList.add('active');
      if (btnGrid) btnGrid.classList.remove('active');
    } else {
      if (this.listViewEl) this.listViewEl.style.display = 'none';
      if (this.gridViewEl) this.gridViewEl.style.display = 'grid';
      if (btnList) btnList.classList.remove('active');
      if (btnGrid) btnGrid.classList.add('active');
    }
  }

  toggleSortOrder() {
    this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    const sortLabel = document.getElementById('admin-sort-label');
    if (sortLabel) sortLabel.textContent = this.sortOrder === 'asc' ? 'A \u2192 Z' : 'Z \u2192 A';
    this.currentPage = 1;
    this.renderTable();
  }

  // --- PHÂN TRANG (PAGINATION) ---
  _renderPagination(totalItems, totalPages, startIdx, endIdx) {
    if (!this.paginationSummary || !this.paginationControls) return;

    if (this.currentSidebarTab !== 'works' || totalItems === 0) {
      if (this.paginationBar) this.paginationBar.style.display = 'none';
      if (totalItems === 0) {
        this.paginationSummary.textContent = '0 tác phẩm phù hợp';
        this.paginationControls.innerHTML = '';
      }
      return;
    }

    if (this.paginationBar) this.paginationBar.style.display = 'flex';

    // Cập nhật dòng tóm tắt
    const displayStart = startIdx + 1;
    const displayEnd = endIdx;
    this.paginationSummary.innerHTML = `Hiển thị <strong>${displayStart}–${displayEnd}</strong> / <strong>${totalItems}</strong> tác phẩm <span style="color:var(--text-muted);margin-left:0.35rem">(Trang ${this.currentPage}/${totalPages})</span>`;

    // Đồng bộ số lượng mục / trang trong select
    if (this.pageSizeSelect && String(this.pageSizeSelect.value) !== String(this.pageSize)) {
      this.pageSizeSelect.value = String(this.pageSize);
    }

    // Xây dựng các nút điều hướng phân trang
    let html = '';

    // Nút Về trang đầu
    const isFirstDisabled = this.currentPage === 1;
    html += `
      <button class="page-btn" ${isFirstDisabled ? 'disabled' : ''} onclick="window.literaryAdmin.goToPage(1)" title="Trang đầu">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
      </button>
    `;

    // Nút Trang trước
    const isPrevDisabled = this.currentPage === 1;
    html += `
      <button class="page-btn" ${isPrevDisabled ? 'disabled' : ''} onclick="window.literaryAdmin.goToPage(${this.currentPage - 1})" title="Trang trước">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
    `;

    // Các số trang (kèm dấu ... thông minh nếu danh sách dài)
    const pages = this._getPageNumbers(this.currentPage, totalPages);
    pages.forEach(p => {
      if (p === '...') {
        html += `<span class="page-ellipsis">&hellip;</span>`;
      } else {
        const isActive = p === this.currentPage;
        html += `
          <button class="page-btn ${isActive ? 'active' : ''}" onclick="window.literaryAdmin.goToPage(${p})" ${isActive ? 'aria-current="page"' : ''}>
            ${p}
          </button>
        `;
      }
    });

    // Nút Trang sau
    const isNextDisabled = this.currentPage === totalPages;
    html += `
      <button class="page-btn" ${isNextDisabled ? 'disabled' : ''} onclick="window.literaryAdmin.goToPage(${this.currentPage + 1})" title="Trang kế tiếp">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    `;

    // Nút Về trang cuối
    const isLastDisabled = this.currentPage === totalPages;
    html += `
      <button class="page-btn" ${isLastDisabled ? 'disabled' : ''} onclick="window.literaryAdmin.goToPage(${totalPages})" title="Trang cuối">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
      </button>
    `;

    this.paginationControls.innerHTML = html;
  }

  _getPageNumbers(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);
    return pages;
  }

  goToPage(page) {
    const totalItems = this._getFilteredSortedWorks().length;
    const totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    this.currentPage = page;

    // Kích hoạt hiệu ứng chuyển trang mượt mà
    const tableContainer = document.querySelector('.admin-table-container');
    const gridView = document.getElementById('admin-grid-view');
    if (tableContainer) tableContainer.classList.add('page-transitioning');
    if (gridView) gridView.classList.add('page-transitioning');

    this.renderTable();
    this.scrollToTop();

    if (tableContainer) tableContainer.scrollTop = 0;
    if (gridView) gridView.scrollTop = 0;

    setTimeout(() => {
      if (tableContainer) tableContainer.classList.remove('page-transitioning');
      if (gridView) gridView.classList.remove('page-transitioning');
    }, 280);
  }

  changePageSize(newSize) {
    this.pageSize = parseInt(newSize, 10) || 8;
    this.currentPage = 1;
    this.renderTable();
    this.scrollToTop();
  }

  // --- MODAL: XEM CHI TIET ---
  openDetailModal(workId) {
    const work = this.works.find(w => w.id === workId);
    if (!work) return;
    this.activeWork = JSON.parse(JSON.stringify(work));

    const titleEl = document.getElementById('detail-modal-title');
    if (titleEl) titleEl.textContent = work.title || 'Chi Tiết Tác Phẩm';

    const body = document.getElementById('detail-modal-body');
    if (!body) return;
    const isCustom = this.customWorksMap.has(work.id);
    body.innerHTML = `
      <div class="detail-split-layout">
        <!-- CỘT TRÁI: BÌA & THÔNG TIN CƠ BẢN -->
        <div class="detail-col-sidebar">
          ${work.image ? `
            <div class="detail-cover-box">
              <img src="${work.image}" alt="${work.title}" class="detail-cover-img" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">
              ${work.imageCaption ? `<p class="detail-cover-caption">${work.imageCaption}</p>` : ''}
            </div>` : ''}
          <div class="detail-info-grid">
            <div class="detail-field"><label>Mã ID</label><span class="detail-id-chip">${work.id}</span></div>
            <div class="detail-field"><label>Tác Giả</label><span class="detail-value">${work.author || '—'}</span></div>
            <div class="detail-field"><label>Thể Loại</label><span class="detail-value">${work.category || '—'}</span></div>
            <div class="detail-field"><label>Năm Sáng Tác</label><span class="detail-value">${work.year || '—'}</span></div>
            <div class="detail-field"><label>Thời Đại</label><span class="detail-value">${work.era || '—'}</span></div>
            <div class="detail-field"><label>Quốc Gia</label><span class="detail-value">${work.country || '—'}</span></div>
            <div class="detail-field"><label>Xuất Xứ</label><span class="detail-value">${work.originLabel || (work.origin === 'world' ? 'Văn học Thế Giới' : 'Văn học Việt Nam')}</span></div>
            <div class="detail-field"><label>Thời Lượng</label><span class="detail-value">${work.readTime || '—'}</span></div>
            <div class="detail-field detail-full"><label>Trạng Thái</label><span>${isCustom ? '<span class="badge-cloud">☁ Đã lưu Firestore</span>' : '<span class="badge-local">Bản mặc định</span>'}</span></div>
            ${work.tags && work.tags.length ? `<div class="detail-field detail-full"><label>Thẻ Phân Loại</label><span class="detail-tags">${(Array.isArray(work.tags) ? work.tags : String(work.tags).split(',')).map(t => `<span class="detail-tag-chip">${t.trim()}</span>`).join('')}</span></div>` : ''}
          </div>
        </div>

        <!-- CỘT PHẢI: CÁC VÙNG SỔ XUỐNG THÔNG TIN TOÀN VĂN -->
        <div class="detail-col-main">
          <div class="detail-sections-toolbar">
            <span class="detail-sections-count">Chi Tiết &amp; Toàn Văn Tác Phẩm</span>
            <button type="button" class="btn-toggle-all-detail" onclick="window.literaryAdmin.toggleAllDetailSections(this)">
              <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
              <span>Thu gọn tất cả</span>
            </button>
          </div>

          ${work.epigraph ? `
            <div class="detail-collapsible-box detail-box-quote">
              <div class="detail-collapsible-header" onclick="this.closest('.detail-collapsible-box').classList.toggle('collapsed')">
                <div class="detail-header-left">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg>
                  <label class="detail-sec-label">Lời Đề Từ</label>
                </div>
                <svg class="detail-toggle-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="detail-collapsible-body">
                <p style="margin:0;font-style:italic;line-height:1.75;font-size:0.95rem">“${work.epigraph}”</p>
              </div>
            </div>` : ''}

          ${work.excerpt ? `
            <div class="detail-collapsible-box detail-box-excerpt">
              <div class="detail-collapsible-header" onclick="this.closest('.detail-collapsible-box').classList.toggle('collapsed')">
                <div class="detail-header-left">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  <label class="detail-sec-label">Trích Đoạn Giới Thiệu</label>
                </div>
                <svg class="detail-toggle-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="detail-collapsible-body">
                <p style="margin:0;line-height:1.75;font-size:0.95rem">${work.excerpt}</p>
              </div>
            </div>` : ''}

          ${work.sgkDetail ? `
            <div class="detail-collapsible-box detail-box-sgk">
              <div class="detail-collapsible-header" onclick="this.closest('.detail-collapsible-box').classList.toggle('collapsed')">
                <div class="detail-header-left">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  <label class="detail-sec-label">Trọng Tâm SGK</label>
                </div>
                <svg class="detail-toggle-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="detail-collapsible-body">
                <p style="margin:0;line-height:1.75;font-size:0.95rem">${work.sgkDetail}</p>
              </div>
            </div>` : ''}

          ${work.criticism ? `
            <div class="detail-collapsible-box detail-box-criticism">
              <div class="detail-collapsible-header" onclick="this.closest('.detail-collapsible-box').classList.toggle('collapsed')">
                <div class="detail-header-left">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  <label class="detail-sec-label">Nhận Định Phê Bình</label>
                </div>
                <svg class="detail-toggle-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="detail-collapsible-body">
                <p style="margin:0;line-height:1.75;font-size:0.95rem">${work.criticism}</p>
              </div>
            </div>` : ''}

          ${work.content ? `
            <div class="detail-collapsible-box detail-box-content">
              <div class="detail-collapsible-header" onclick="this.closest('.detail-collapsible-box').classList.toggle('collapsed')">
                <div class="detail-header-left">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  <div class="detail-content-label" style="font-weight:700;color:var(--cerulean-800)">Toàn Văn Tác Phẩm</div>
                </div>
                <svg class="detail-toggle-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="detail-collapsible-body">
                <div class="detail-content-body reader-page-content">${work.content}</div>
              </div>
            </div>` : ''}
        </div>
      </div>
    `;
    if (this.detailModal) this.detailModal.classList.add('active');
  }

  toggleAllDetailSections(btn) {
    const mainCol = document.querySelector('.detail-col-main');
    if (!mainCol) return;
    const boxes = mainCol.querySelectorAll('.detail-collapsible-box');
    const isAnyOpen = Array.from(boxes).some(b => !b.classList.contains('collapsed'));

    boxes.forEach(box => {
      box.classList.toggle('collapsed', isAnyOpen);
    });

    if (btn) {
      const icon = isAnyOpen
        ? `<svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polyline points="7 11 12 6 17 11"></polyline><polyline points="7 18 12 13 17 18"></polyline></svg>`
        : `<svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>`;
      btn.innerHTML = `${icon} <span>${isAnyOpen ? 'Mở rộng tất cả' : 'Thu gọn tất cả'}</span>`;
    }
  }

  closeDetailModal() {
    if (this.detailModal) this.detailModal.classList.remove('active');
  }

  openEditFromDetail() {
    this.closeDetailModal();
    if (this.activeWork) this.openEditModal(this.activeWork.id);
  }

  // --- MODAL: CHINH SUA (CRUD FORM) ---
  openEditModal(workId) {
    const work = this.works.find(w => w.id === workId);
    if (!work) return;
    this.activeWork = JSON.parse(JSON.stringify(work));
    this.hasUnsavedChanges = false;

    const titleEl = document.getElementById('edit-modal-title');
    if (titleEl) titleEl.textContent = `Chỉnh Sửa: ${work.title || work.id}`;

    const isCustom = this.customWorksMap.has(work.id);
    if (this.activeSourceBadgeEl) {
      this.activeSourceBadgeEl.innerHTML = isCustom
        ? `<span class="badge-cloud">☁ Đã lưu Firestore</span>`
        : `<span class="badge-local">Bản mặc định (data.js)</span>`;
    }

    // Đảm bảo tất cả các thẻ nhóm trường mở đầy đủ
    if (this.editModal) {
      this.editModal.querySelectorAll('.editor-card').forEach(c => c.classList.remove('collapsed'));
    }

    this.populateForm(this.activeWork);
    // Reset editor tab to visual
    this.switchEditorTab('visual');
    if (this.editModal) this.editModal.classList.add('active');
  }

  closeEditModal() {
    if (this.hasUnsavedChanges) {
      if (!confirm('B\u1ea1n c\u00f3 thay \u0111\u1ed5i ch\u01b0a l\u01b0u. \u0110\u00f3ng kh\u00f4ng?')) return;
    }
    if (this.editModal) this.editModal.classList.remove('active');
    this.hasUnsavedChanges = false;
  }

  // --- MODAL: XOA TAC PHAM ---
  openDeleteModal(workId) {
    const work = this.works.find(w => w.id === workId);
    if (!work) return;
    this.pendingDeleteId = workId;
    const msgEl = document.getElementById('delete-confirm-msg');
    if (msgEl) msgEl.innerHTML = `B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a t\u00e1c ph\u1ea9m <strong>&#8220;${work.title}&#8221;</strong> (ID: <code>${work.id}</code>) kh\u00f4ng?`;
    if (this.deleteModal) this.deleteModal.classList.add('active');
  }

  closeDeleteModal() {
    if (this.deleteModal) this.deleteModal.classList.remove('active');
    this.pendingDeleteId = null;
  }

  async confirmDeleteWork() {
    const workId = this.pendingDeleteId;
    if (!workId) return;
    try {
      if (window.firebaseService && this.customWorksMap.has(workId)) {
        await window.firebaseService.deleteWork(workId);
        this.customWorksMap.delete(workId);
      }
      // Khôi phục bản gốc hoặc xóa nếu là tác phẩm tạo mới
      const originalInData = window.LITERARY_DATA && window.LITERARY_DATA.works
        ? window.LITERARY_DATA.works.find(w => w.id === workId)
        : null;
      const idx = this.works.findIndex(w => w.id === workId);
      if (originalInData) {
        if (idx >= 0) this.works[idx] = JSON.parse(JSON.stringify(originalInData));
      } else {
        if (idx >= 0) this.works.splice(idx, 1);
      }
      this.closeDeleteModal();
      this.renderTable();
      this.showToast('\u0110\u00e3 x\u00f3a v\u00e0 kh\u00f4i ph\u1ee5c b\u1ea3n g\u1ed1c th\u00e0nh c\u00f4ng!', 'success');
    } catch (err) {
      this.showToast(`L\u1ed7i khi x\u00f3a: ${err.message}`, 'error');
    }
  }

  updateCoverPreview(src) {
    if (src) {
      if (this.coverPreviewImg) {
        this.coverPreviewImg.src = src;
        this.coverPreviewImg.style.display = 'block';
      }
      if (this.coverPlaceholder) this.coverPlaceholder.style.display = 'none';
      if (this.coverRemoveBtn) this.coverRemoveBtn.style.display = 'inline-flex';
    } else {
      if (this.coverPreviewImg) {
        this.coverPreviewImg.src = '';
        this.coverPreviewImg.style.display = 'none';
      }
      if (this.coverPlaceholder) this.coverPlaceholder.style.display = 'flex';
      if (this.coverRemoveBtn) this.coverRemoveBtn.style.display = 'none';
    }
  }

  removeCoverImage() {
    if (this.inputMap.image) {
      this.inputMap.image.value = '';
    }
    if (this.coverInput) {
      this.coverInput.value = '';
    }
    this.updateCoverPreview('');
    if (this.coverStatus) {
      this.coverStatus.innerHTML = '';
    }
    // ✅ Đồng bộ ngược vào activeWork để chuyển tác phẩm không bị khôi phục ảnh cũ
    if (this.activeWork) this.activeWork.image = '';
    const wIdx = this.works.findIndex(w => w.id === (this.activeWork && this.activeWork.id));
    if (wIdx >= 0) this.works[wIdx].image = '';
    this.hasUnsavedChanges = true;
    this.showToast('Đã gỡ ảnh bìa.');
  }

  async handleCoverUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Vui lòng chọn đúng tệp hình ảnh (PNG, JPG, WEBP, SVG)!');
      return;
    }

    if (this.coverStatus) {
      this.coverStatus.innerHTML = `
        <span class="badge-uploading">
          <svg class="editorial-icon icon-sm spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="4" fill="none"></circle></svg>
          Đang lưu ảnh vào thư mục dự án (assets/images/covers/)...
        </span>
      `;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      // Hiển thị ngay ảnh preview trực tiếp
      this.updateCoverPreview(dataUrl);

      const currentWorkId = this.inputMap.id.value || (this.activeWork ? this.activeWork.id : 'work');

      const uploadUrl = (window.location.protocol === 'http:' && window.location.port === '3000')
        ? '/api/upload-cover'
        : 'http://127.0.0.1:3000/api/upload-cover';

      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workId: currentWorkId,
            fileName: file.name,
            fileData: dataUrl
          })
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.filePath) {
            this.inputMap.image.value = resData.filePath;
            this.updateCoverPreview(resData.filePath);
            // ✅ Đồng bộ ngược đường dẫn ảnh vào activeWork để không bị reset khi chuyển tác phẩm
            if (this.activeWork) this.activeWork.image = resData.filePath;
            // ✅ Đồng bộ vào mảng works[] để sidebar và preview nhất quán
            const wIdx = this.works.findIndex(w => w.id === (this.activeWork && this.activeWork.id));
            if (wIdx >= 0) this.works[wIdx].image = resData.filePath;
            if (this.coverStatus) {
              this.coverStatus.innerHTML = `
                <span class="badge-success">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Đã lưu vào dự án: <b>${resData.filePath}</b>
                </span>
              `;
            }
            this.hasUnsavedChanges = true;
            this.showToast(`Đã lưu ảnh bìa vào: ${resData.filePath}`);
            return;
          }
        }
        throw new Error('Upload server response not ok');
      } catch (err) {
        console.warn('[Cover Upload] Máy chủ API chưa phản hồi:', err);
        // Fallback: Giữ bản xem trước Data URL
        this.inputMap.image.value = dataUrl;
        // ✅ Đồng bộ ngược Data URL vào activeWork để không bị reset khi chuyển tác phẩm
        if (this.activeWork) this.activeWork.image = dataUrl;
        const wIdxFb = this.works.findIndex(w => w.id === (this.activeWork && this.activeWork.id));
        if (wIdxFb >= 0) this.works[wIdxFb].image = dataUrl;
        if (this.coverStatus) {
          this.coverStatus.innerHTML = `
            <span class="badge-uploading" style="color:var(--cerulean-700)">
              ⚠️ Đang lưu bản xem trước Data URL. Nhấp đúp vào <code>Khoi-Dong.bat</code> hoặc chạy <code>npm run dev</code> để tự động lưu tệp vật lý vào dự án.
            </span>
          `;
        }
        this.hasUnsavedChanges = true;
        this.showToast('Đã nạp ảnh bìa (bản tạm). Hãy bật máy chủ để lưu tệp vật lý.');
      }
    };

    reader.readAsDataURL(file);
  }

  populateForm(data) {
    if (!data) return;

    this.inputMap.id.value = data.id || '';
    this.inputMap.title.value = data.title || '';
    this.inputMap.author.value = data.author || '';
    this.inputMap.authorId.value = data.authorId || '';
    this.inputMap.origin.value = data.origin || 'vn';
    this.inputMap.originLabel.value = data.originLabel || 'Văn học Việt Nam';
    this.inputMap.country.value = data.country || 'Việt Nam';
    this.inputMap.category.value = data.category || '';
    this.inputMap.era.value = data.era || '';
    this.inputMap.year.value = data.year || '';
    this.inputMap.readTime.value = data.readTime || '';
    this.inputMap.badge.value = data.badge || '';

    this.inputMap.image.value = data.image || '';
    this.inputMap.imageCaption.value = data.imageCaption || '';
    this.inputMap.epigraph.value = data.epigraph || '';
    this.inputMap.excerpt.value = data.excerpt || '';
    this.inputMap.fullTextStatus.value = data.fullTextStatus || 'Toàn Văn Tác Phẩm';
    this.inputMap.sgkDetail.value = data.sgkDetail || '';

    // Cập nhật Preview Ảnh Bìa
    this.updateCoverPreview(data.image || '');
    if (this.coverStatus) {
      this.coverStatus.innerHTML = data.image ? `<span class="badge-success">✓ Ảnh bìa: <b>${data.image}</b></span>` : '';
    }

    const content = data.content || '';
    this.inputMap.content.value = content;
    if (this.visualEditor) {
      this.visualEditor.innerHTML = content;
    }
    this.inputMap.criticism.value = data.criticism || '';
    this.inputMap.tags.value = Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || '');

    this.updateCharCount();
    if (window.editorialDropdown && this.inputMap.origin) {
      window.editorialDropdown.syncSelect(this.inputMap.origin);
    }
  }

  collectFormData() {
    const rawTags = this.inputMap.tags.value;
    const tagsArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);

    // Đồng bộ nội dung mới nhất từ Visual Editor
    let finalContent = this.inputMap.content.value;
    if (this.currentEditorMode === 'visual' && this.visualEditor) {
      finalContent = this.visualEditor.innerHTML;
      this.inputMap.content.value = finalContent;
    }

    return {
      id: this.inputMap.id.value.trim(),
      title: this.inputMap.title.value.trim(),
      author: this.inputMap.author.value.trim(),
      authorId: this.inputMap.authorId.value.trim(),
      origin: this.inputMap.origin.value,
      originLabel: this.inputMap.originLabel.value.trim(),
      country: this.inputMap.country.value.trim(),
      category: this.inputMap.category.value.trim(),
      era: this.inputMap.era.value.trim(),
      year: this.inputMap.year.value.trim(),
      readTime: this.inputMap.readTime.value.trim(),
      badge: this.inputMap.badge.value.trim(),
      image: this.inputMap.image.value.trim(),
      imageCaption: this.inputMap.imageCaption.value.trim(),
      epigraph: this.inputMap.epigraph.value.trim(),
      excerpt: this.inputMap.excerpt.value.trim(),
      fullTextStatus: this.inputMap.fullTextStatus.value.trim(),
      sgkDetail: this.inputMap.sgkDetail.value.trim(),
      content: finalContent,
      criticism: this.inputMap.criticism.value.trim(),
      tags: tagsArray
    };
  }

  async saveCurrentWork() {
    const formData = this.collectFormData();
    if (!formData.id) {
      alert("Vui lòng nhập Mã ID định danh cho tác phẩm!");
      return;
    }

    if (!formData.title) {
      alert("Vui lòng nhập Tên tác phẩm!");
      return;
    }

    // Hiển thị trạng thái đang lưu
    const origBtnText = this.btnSave.innerHTML;
    this.btnSave.disabled = true;
    this.btnSave.innerHTML = `
      <svg class="editorial-icon icon-sm spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="4" fill="none"></circle></svg>
      Đang lưu Firestore...
    `;

    try {
      let fs = window.firebaseService || this._createFallbackFirebaseService();
      const saveRes = await fs.saveWork(formData);

      // Cập nhật bộ nhớ cục bộ
      this.customWorksMap.set(formData.id, formData);
      const idx = this.works.findIndex(w => w.id === formData.id);
      if (idx >= 0) {
        this.works[idx] = { ...formData, _isCustomFirestore: true };
      } else {
        this.works.push({ ...formData, _isCustomFirestore: true });
      }

      this.activeWork = { ...formData };
      this.hasUnsavedChanges = false;

      // Cập nhật giao diện
      this.renderTable();
      if (this.activeSourceBadgeEl) {
        const isCloud = saveRes && saveRes.cloud;
        this.activeSourceBadgeEl.innerHTML = isCloud
          ? `<span class="badge-cloud">☁ Đã lưu Firestore</span>`
          : `<span class="badge-cloud" style="background:var(--cerulean-100);color:var(--cerulean-800)">💾 Đã lưu bộ nhớ máy</span>`;
      }
      // Đóng edit modal sau khi lưu thành công
      if (this.editModal) this.editModal.classList.remove('active');
      const isCloud = saveRes && saveRes.cloud;
      if (isCloud) {
        this.showToast("Đã lưu thành công lên Cloud Firestore & đồng bộ độc giả!", "success");
      } else {
        const msg = (saveRes && saveRes.message)
          ? saveRes.message
          : "Đã lưu an toàn vào bộ nhớ máy & đồng bộ độc giả tức thì!";
        this.showToast(msg, "success");
        if (saveRes && saveRes.warning === 'permission-denied') {
          setTimeout(() => this.showSecurityRulesGuide(), 800);
        }
      }

    } catch (err) {
      console.error("[Admin Save Error]", err);
      this.showToast(`Lỗi lưu: ${err.message}`, "error");
      if (err.message && err.message.includes("permission-denied")) {
        this.showSecurityRulesGuide();
      }
    } finally {
      this.btnSave.disabled = false;
      this.btnSave.innerHTML = origBtnText;
    }
  }

  async revertToOriginal() {
    if (!this.activeWork) return;
    const workId = this.activeWork.id;
    if (!confirm(`B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a b\u1ea3n s\u1eeda \u0111\u1ed5i tr\u00ean Cloud c\u1ee7a "${this.activeWork.title}" v\u00e0 kh\u00f4i ph\u1ee5c v\u1ec1 b\u1ea3n g\u1ed1c?`)) return;
    try {
      if (window.firebaseService && this.customWorksMap.has(workId)) {
        await window.firebaseService.deleteWork(workId);
        this.customWorksMap.delete(workId);
      }
      const original = (window.LITERARY_DATA && window.LITERARY_DATA.works)
        ? window.LITERARY_DATA.works.find(w => w.id === workId) : null;
      if (original) {
        const idx = this.works.findIndex(w => w.id === workId);
        if (idx >= 0) this.works[idx] = JSON.parse(JSON.stringify(original));
        this.openEditModal(workId);
      }
      this.renderTable();
      this.showToast('\u0110\u00e3 kh\u00f4i ph\u1ee5c v\u1ec1 b\u1ea3n g\u1ed1c m\u1eb7c \u0111\u1ecbnh!', 'success');
    } catch (err) {
      this.showToast(`L\u1ed7i khi kh\u00f4i ph\u1ee5c: ${err.message}`, 'error');
    }
  }

  openInReader() {
    if (!this.activeWork) return;
    window.open(`index.html#/tac-pham/${this.activeWork.id}`, '_blank');
  }

  // --- DROPDOWN CONTROL ---
  toggleDropdown(dropdownId) {
    const dd = document.getElementById(dropdownId);
    if (!dd) return;
    const isOpen = dd.classList.contains('open');
    this.closeAllDropdowns();
    if (!isOpen) {
      dd.classList.add('open');
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll('.admin-dropdown.open').forEach(d => d.classList.remove('open'));
  }

  // --- QUẢN LÝ TRANG CÁ NHÂN & THÔNG SỐ ADMIN CMS ---
  getInitials(name) {
    if (!name) return 'BT';
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  loadAdminProfile() {
    try {
      const defaultProfile = {
        name: 'Ban Biên Tập Văn Uyển',
        role: 'Tổng Biên Tập • Quản trị viên CMS'
      };
      const raw = localStorage.getItem('van_uyen_admin_profile');
      this.adminProfile = raw ? Object.assign(defaultProfile, JSON.parse(raw)) : defaultProfile;
      this.updateProfileUI(this.adminProfile);
    } catch (e) {
      console.warn('Lỗi nạp hồ sơ admin:', e);
      this.adminProfile = {
        name: 'Ban Biên Tập Văn Uyển',
        role: 'Tổng Biên Tập • Quản trị viên CMS'
      };
      this.updateProfileUI(this.adminProfile);
    }
  }

  updateProfileUI(profile) {
    if (!profile) return;
    const name = profile.name || 'Ban Biên Tập Văn Uyển';
    const role = profile.role || 'Tổng Biên Tập • Quản trị viên CMS';
    const email = profile.email || 'bientap@vanuyen.edu.vn';
    const bio = profile.bio || '';
    const quote = profile.quote || '';
    const specialty = profile.specialty || '';
    const initials = this.getInitials(name);

    const headerName = document.getElementById('header-profile-name');
    if (headerName) headerName.textContent = 'Trang cá nhân';

    const headerBadge = document.getElementById('header-profile-badge');
    if (headerBadge) headerBadge.textContent = name;

    const headerInitials = document.getElementById('admin-avatar-initials');
    if (headerInitials) headerInitials.textContent = initials;

    const cardName = document.getElementById('card-profile-name');
    if (cardName) cardName.textContent = name;

    const cardInitials = document.getElementById('card-avatar-initials');
    if (cardInitials) cardInitials.textContent = initials;

    const cardRole = document.querySelector('.profile-card-role');
    if (cardRole) cardRole.textContent = role;

    const modalTitle = document.getElementById('modal-profile-title');
    if (modalTitle) modalTitle.textContent = name;

    const modalRoleText = document.getElementById('modal-profile-role-text');
    if (modalRoleText) modalRoleText.textContent = role;

    const modalInitials = document.getElementById('modal-avatar-initials');
    if (modalInitials) modalInitials.textContent = initials;

    const inputName = document.getElementById('profile-input-name');
    if (inputName) inputName.value = name;

    const inputRole = document.getElementById('profile-input-role');
    if (inputRole) inputRole.value = role;

    const inputEmail = document.getElementById('profile-input-email');
    if (inputEmail) inputEmail.value = email;

    const inputBio = document.getElementById('profile-input-bio');
    if (inputBio) inputBio.value = bio;

    const inputQuote = document.getElementById('profile-input-quote');
    if (inputQuote) inputQuote.value = quote;

    const inputSpecialty = document.getElementById('profile-input-specialty');
    if (inputSpecialty) inputSpecialty.value = specialty;
  }

  switchProfileTab(tabName) {
    const tabs = ['info', 'activity', 'contributions', 'settings'];
    tabs.forEach(t => {
      const btn = document.getElementById(`profile-tab-btn-${t}`);
      const panel = document.getElementById(`profile-panel-${t}`);
      if (btn) btn.classList.toggle('active', t === tabName);
      if (panel) panel.classList.toggle('active', t === tabName);
    });
  }


  openProfileModal() {
    this.closeAllDropdowns();
    if (!this.profileModal) {
      this.profileModal = document.getElementById('admin-profile-modal');
    }
    if (!this.profileModal) return;

    this.switchProfileTab('info');

    if (!this.adminProfile) {
      this.loadAdminProfile();
    } else {
      this.updateProfileUI(this.adminProfile);
    }

    // Theme description
    const isDark = document.documentElement.getAttribute('data-theme') === 'nocturne';
    const modalThemeDesc = document.getElementById('modal-theme-desc');
    if (modalThemeDesc) {
      modalThemeDesc.textContent = isDark ? 'Hiện tại: Đêm Văn Đàn (Nhấp để đổi)' : 'Hiện tại: Giấy Ngà (Nhấp để đổi)';
    }

    // Stats cards
    const worksCount = this.works ? this.works.length : 0;
    const cloudCount = this.customWorksMap ? this.customWorksMap.size : 0;
    const authorsCount = this.authors ? this.authors.length : 0;
    const categoriesCount = this.categories ? this.categories.length : 0;

    const statWorksNum = document.getElementById('profile-stat-works-num');
    if (statWorksNum) statWorksNum.textContent = worksCount;
    const statCloudNum = document.getElementById('profile-stat-cloud-num');
    if (statCloudNum) statCloudNum.textContent = cloudCount;
    const statAuthorsNum = document.getElementById('profile-stat-authors-num');
    if (statAuthorsNum) statAuthorsNum.textContent = authorsCount;
    const statCategoriesNum = document.getElementById('profile-stat-categories-num');
    if (statCategoriesNum) statCategoriesNum.textContent = categoriesCount;

    // Bio counter
    const bioInput = document.getElementById('profile-input-bio');
    const bioCount = document.getElementById('profile-bio-count');
    if (bioInput && bioCount) {
      bioCount.textContent = bioInput.value.length;
      bioInput.oninput = () => { bioCount.textContent = bioInput.value.length; };
    }

    // Populate activity feed
    this.renderProfileActivityFeed();

    // Populate contributions
    this.renderProfileContributions();

    // Populate bookmarks
    this.renderProfileBookmarks();

    // Last login
    const lastLogin = document.getElementById('profile-last-login');
    if (lastLogin) {
      const now = new Date();
      lastLogin.textContent = `${now.toLocaleDateString('vi-VN')} • ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    }

    this.profileModal.classList.add('active');
  }


  closeProfileModal() {
    if (this.profileModal) {
      this.profileModal.classList.remove('active');
    } else {
      const modal = document.getElementById('admin-profile-modal');
      if (modal) modal.classList.remove('active');
    }
  }

  logoutUser() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống Văn Uyển?')) {
      try {
        localStorage.removeItem('van_uyen_current_user');
      } catch(e) {}
      this.showToast('Đang đăng xuất khỏi hệ thống...', 'info');
      setTimeout(() => {
        window.location.href = 'auth.html';
      }, 600);
    }
  }

  saveAdminProfile() {
    const inputName = document.getElementById('profile-input-name');
    const inputRole = document.getElementById('profile-input-role');
    const inputEmail = document.getElementById('profile-input-email');
    const inputBio = document.getElementById('profile-input-bio');
    const inputQuote = document.getElementById('profile-input-quote');
    const inputSpecialty = document.getElementById('profile-input-specialty');

    const name = inputName ? inputName.value.trim() : '';
    const role = inputRole ? inputRole.value.trim() : '';
    const email = inputEmail ? inputEmail.value.trim() : '';
    const bio = inputBio ? inputBio.value.trim() : '';
    const quote = inputQuote ? inputQuote.value.trim() : '';
    const specialty = inputSpecialty ? inputSpecialty.value.trim() : '';

    if (!name) {
      this.showToast('Vui lòng nhập tên người quản trị.', 'error');
      if (inputName) inputName.focus();
      return;
    }

    this.adminProfile = {
      name: name,
      role: role || 'Tổng Biên Tập • Quản trị viên CMS',
      email: email || 'bientap@vanuyen.edu.vn',
      bio: bio,
      quote: quote,
      specialty: specialty
    };

    try {
      localStorage.setItem('van_uyen_admin_profile', JSON.stringify(this.adminProfile));
    } catch (e) {
      console.warn('Lỗi lưu hồ sơ admin:', e);
    }

    this.updateProfileUI(this.adminProfile);
    this.closeProfileModal();
    this.showToast('Đã lưu thông tin Trang cá nhân thành công!', 'success');
  }

  // --- CÁC PHƯƠNG THỨC MỞ RỘNG CHO TRANG CÁ NHÂN ---

  changeCoverPhoto() {
    this.showToast('Tính năng đổi ảnh bìa sẽ được cập nhật trong phiên bản tiếp theo.', 'info');
  }

  changeAvatar() {
    this.showToast('Tính năng đổi ảnh đại diện sẽ được cập nhật trong phiên bản tiếp theo.', 'info');
  }

  logActivity(action, detail) {
    try {
      const logs = JSON.parse(localStorage.getItem('van_uyen_activity_log') || '[]');
      logs.unshift({
        action: action,
        detail: detail,
        timestamp: new Date().toISOString()
      });
      // Keep only the last 50 entries
      if (logs.length > 50) logs.length = 50;
      localStorage.setItem('van_uyen_activity_log', JSON.stringify(logs));
    } catch (e) {
      console.warn('Lỗi ghi log hoạt động:', e);
    }
  }

  renderProfileActivityFeed() {
    const container = document.getElementById('profile-activity-feed');
    if (!container) return;

    let logs = [];
    try {
      logs = JSON.parse(localStorage.getItem('van_uyen_activity_log') || '[]');
    } catch (e) { /* ignore */ }

    if (logs.length === 0) {
      container.innerHTML = `
        <div class="profile-activity-empty">
          <svg class="editorial-icon" viewBox="0 0 24 24" style="width:40px;height:40px;opacity:0.25;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <p>Chưa có hoạt động nào được ghi nhận.</p>
          <span>Bắt đầu thêm, chỉnh sửa tác phẩm để thấy nhật ký ở đây.</span>
        </div>`;
      return;
    }

    const items = logs.slice(0, 20).map(log => {
      const dotClass = log.action === 'add' ? 'add' : log.action === 'delete' ? 'delete' : 'edit';
      const actionText = log.action === 'add' ? 'Thêm mới' : log.action === 'delete' ? 'Xóa' : 'Chỉnh sửa';
      const timeAgo = this.getTimeAgo(log.timestamp);
      return `<div class="profile-activity-item">
        <div class="profile-activity-dot ${dotClass}"></div>
        <div class="profile-activity-content">
          <div class="profile-activity-text"><strong>${actionText}:</strong> ${this.escapeHtml(log.detail || 'Không rõ nội dung')}</div>
          <div class="profile-activity-time">${timeAgo}</div>
        </div>
      </div>`;
    }).join('');

    container.innerHTML = items;
  }

  getTimeAgo(isoString) {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      if (diff < 60) return 'Vừa xong';
      if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
      if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
      return date.toLocaleDateString('vi-VN');
    } catch (e) {
      return '';
    }
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  renderProfileContributions() {
    const container = document.getElementById('profile-contributions-list');
    const countEl = document.getElementById('profile-contrib-count');
    if (!container) return;

    // Show recently added/edited works (from customWorksMap if available, else from works)
    let contribs = [];
    if (this.customWorksMap && this.customWorksMap.size > 0) {
      this.customWorksMap.forEach((work, id) => {
        contribs.push({
          id: id,
          title: work.title || work.ten || id,
          author: work.author || work.tac_gia || '',
          date: work.updatedAt || work.createdAt || ''
        });
      });
    }

    if (countEl) countEl.textContent = contribs.length;

    if (contribs.length === 0) {
      container.innerHTML = `
        <div class="profile-contributions-empty">
          <svg class="editorial-icon" viewBox="0 0 24 24" style="width:40px;height:40px;opacity:0.25;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <p>Chưa có đóng góp nào trên Cloud.</p>
          <span>Các tác phẩm bạn thêm hoặc chỉnh sửa trên Firestore sẽ hiển thị tại đây.</span>
        </div>`;
      return;
    }

    const items = contribs.slice(0, 15).map(c => {
      return `<div class="profile-contrib-item" onclick="window.literaryAdmin.closeProfileModal(); window.literaryAdmin.switchSidebarTab('works');">
        <div class="profile-contrib-icon">
          <svg class="editorial-icon" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <div class="profile-contrib-info">
          <div class="profile-contrib-title">${this.escapeHtml(c.title)}</div>
          <div class="profile-contrib-meta">${this.escapeHtml(c.author)}</div>
        </div>
        ${c.date ? `<div class="profile-contrib-date">${new Date(c.date).toLocaleDateString('vi-VN')}</div>` : ''}
      </div>`;
    }).join('');

    container.innerHTML = items;
  }

  renderProfileBookmarks() {
    const container = document.getElementById('profile-bookmarks-list');
    const countEl = document.getElementById('profile-bookmarks-count');
    if (!container) return;

    let bookmarks = [];
    try {
      bookmarks = JSON.parse(localStorage.getItem('van_uyen_bookmarks') || '[]');
    } catch (e) { /* ignore */ }

    if (countEl) countEl.textContent = bookmarks.length;

    if (bookmarks.length === 0) {
      container.innerHTML = `
        <div class="profile-bookmarks-empty">
          <svg class="editorial-icon" viewBox="0 0 24 24" style="width:40px;height:40px;opacity:0.25;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          <p>Chưa có dấu trang nào.</p>
          <span>Đánh dấu tác phẩm yêu thích để dễ tìm lại sau.</span>
        </div>`;
      return;
    }

    const items = bookmarks.slice(0, 15).map(b => {
      return `<div class="profile-bookmark-item">
        <div class="profile-contrib-icon" style="background:rgba(180,100,60,0.1);color:#b4623c;">
          <svg class="editorial-icon" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="profile-contrib-info">
          <div class="profile-contrib-title">${this.escapeHtml(b.title || b.id || 'Không rõ')}</div>
          <div class="profile-contrib-meta">${this.escapeHtml(b.author || '')}</div>
        </div>
      </div>`;
    }).join('');

    container.innerHTML = items;
  }

  exportAllWorksJson() {
    this.closeAllDropdowns();
    const data = this.works;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `van-uyen-toan-bo-tac-pham-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast(`Đã xuất toàn bộ ${data.length} tác phẩm ra file JSON.`, "success");
  }

  exportCurrentJson() {
    const data = this.collectFormData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.id || 'tac-pham'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("Đã tải xuống tệp JSON sao lưu.", "success");
  }

  // --- TRÌNH SOẠN THẢO TRỰC QUAN (WYSIWYG) & CÔNG CỤ ĐỊNH DẠNG ---
  syncFromVisual() {
    if (this.visualEditor && this.rawTextarea) {
      this.rawTextarea.value = this.visualEditor.innerHTML;
      this.updateCharCount();
      this.hasUnsavedChanges = true;
    }
  }

  formatText(cmd, val = null) {
    if (this.currentEditorMode !== 'visual') {
      this.switchEditorTab('visual');
    }
    if (this.visualEditor) {
      this.visualEditor.focus();
      document.execCommand(cmd, false, val);
      this.syncFromVisual();
    }
  }

  insertVisualChapter() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    this.visualEditor.focus();
    const sel = window.getSelection();
    let text = sel ? sel.toString().trim() : '';
    if (!text) {
      text = prompt("Nhập tiêu đề chương mới:", "Hồi I: Tiêu đề chương");
    }
    if (!text) return;

    const html = `<h3 class="reader-chapter-title">${text}</h3><p><br></p>`;
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  insertVisualParagraph() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    this.visualEditor.focus();
    const html = `<p>Nhập nội dung đoạn văn mới tại đây...</p>`;
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  insertVisualSgkNotice() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    this.visualEditor.focus();
    const html = `
      <div class="sgk-notice-box">
        <div class="sgk-notice-header">
          <span class="sgk-badge">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Trọng Tâm Giảng Dạy Sách Giáo Khoa (SGK)
          </span>
          <span class="sgk-meta">Phân đoạn trọng tâm học tập</span>
        </div>
        <p class="sgk-notice-desc">Tóm tắt bối cảnh và ý nghĩa nghệ thuật của phân đoạn này...</p>
      </div>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  insertVisualIllustration() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    const imgUrl = prompt("Nhập đường dẫn tranh minh họa (ví dụ: assets/images/scenes/tatden_cover.png):", "assets/images/scenes/tatden_cover.png");
    if (!imgUrl) return;

    const caption = prompt("Nhập lời chú thích cho bức tranh:", "Khắc họa phân cảnh...");
    const html = `
      <div class="chapter-illustration-frame">
        <img src="${imgUrl}" alt="${caption || 'Minh họa'}" class="chapter-illustration-img" loading="lazy">
        <div class="chapter-illustration-caption">
          <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span>Tranh minh họa: ${caption || ''}</span>
        </div>
      </div>
      <p><br></p>
    `;
    this.visualEditor.focus();
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  insertVisualFootnote() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    const sel = window.getSelection();
    let text = sel ? sel.toString().trim() : '';
    if (!text) {
      text = prompt("Nhập từ ngữ cổ / điển tích cần chú thích:", "từ ngữ");
    }
    if (!text) return;

    const note = prompt(`Nhập lời giải nghĩa cho từ "${text}":`, "Giải nghĩa từ...");
    if (!note) return;

    const html = `<span class="footnote-ref" data-note="${note}">${text}</span> `;
    this.visualEditor.focus();
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  insertVisualEndMarker() {
    if (this.currentEditorMode !== 'visual') this.switchEditorTab('visual');
    if (!this.visualEditor) return;

    const title = this.inputMap.title.value || 'Tác phẩm';
    const author = this.inputMap.author.value || '';
    const html = `<div class="sgk-end-marker"><span>[ Kết thúc toàn văn ${title} • ${author} ]</span></div><p><br></p>`;
    this.visualEditor.focus();
    document.execCommand('insertHTML', false, html);
    this.syncFromVisual();
  }

  switchEditorTab(mode) {
    this.currentEditorMode = mode;
    const tabVisual = document.getElementById('btn-tab-visual');
    const tabPreview = document.getElementById('btn-tab-preview');
    const tabRaw = document.getElementById('btn-tab-raw');

    [tabVisual, tabPreview, tabRaw].forEach(btn => btn && btn.classList.remove('active'));

    if (mode === 'visual') {
      if (tabVisual) tabVisual.classList.add('active');
      if (this.visualEditor && this.rawTextarea) {
        this.visualEditor.innerHTML = this.rawTextarea.value;
        this.visualEditor.style.display = 'block';
      }
      if (this.rawTextarea) this.rawTextarea.style.display = 'none';
      if (this.previewPanel) this.previewPanel.classList.remove('active');
    } else if (mode === 'raw') {
      if (tabRaw) tabRaw.classList.add('active');
      if (this.visualEditor && this.rawTextarea) {
        this.rawTextarea.value = this.visualEditor.innerHTML;
        this.rawTextarea.style.display = 'block';
      }
      if (this.visualEditor) this.visualEditor.style.display = 'none';
      if (this.previewPanel) this.previewPanel.classList.remove('active');
    } else if (mode === 'preview') {
      if (tabPreview) tabPreview.classList.add('active');
      if (this.visualEditor) this.visualEditor.style.display = 'none';
      if (this.rawTextarea) this.rawTextarea.style.display = 'none';
      if (this.previewPanel) {
        this.previewPanel.classList.add('active');
        this.renderPreview();
      }
    }
  }

  renderPreview() {
    if (!this.previewPanel) return;
    const contentHtml = (this.visualEditor ? this.visualEditor.innerHTML : '') || this.rawTextarea.value || '<p style="color: var(--text-muted); font-style: italic;">Chưa có nội dung văn bản.</p>';
    this.previewPanel.innerHTML = `
      <div class="reader-page-content">
        ${contentHtml}
      </div>
    `;
  }

  updateCharCount() {
    const textSource = this.visualEditor ? this.visualEditor.innerText : (this.rawTextarea ? this.rawTextarea.value : '');
    const len = textSource.length;
    const words = textSource.trim().split(/\s+/).filter(Boolean).length;
    if (this.charCountEl) {
      this.charCountEl.textContent = `${words.toLocaleString()} từ • ${len.toLocaleString()} ký tự`;
    }
  }

  // --- CÔNG CỤ TỰ ĐỘNG DÀN TRANG & CHUẨN HÓA VĂN BẢN THÔ (SMART FORMATTER) ---
  openSmartFormatModal() {
    if (!this.smartFormatModal) return;
    const rawInput = document.getElementById('smart-raw-input');
    if (rawInput) rawInput.value = '';
    this.smartFormatModal.classList.add('active');
  }

  closeSmartFormatModal() {
    if (this.smartFormatModal) this.smartFormatModal.classList.remove('active');
  }

  executeSmartFormat() {
    const rawInput = document.getElementById('smart-raw-input');
    if (!rawInput || !rawInput.value.trim()) {
      alert("Vui lòng dán văn bản thô vào khung trước khi dàn trang!");
      return;
    }

    const opts = {
      fixlines: document.getElementById('smart-opt-fixlines')?.checked ?? true,
      chapters: document.getElementById('smart-opt-chapters')?.checked ?? true,
      dialogue: document.getElementById('smart-opt-dialogue')?.checked ?? true
    };

    const formattedHtml = this.formatRawLiteratureText(rawInput.value, opts);

    if (this.visualEditor) {
      this.visualEditor.innerHTML = formattedHtml;
    }
    if (this.rawTextarea) {
      this.rawTextarea.value = formattedHtml;
    }

    this.switchEditorTab('visual');
    this.updateCharCount();
    this.hasUnsavedChanges = true;
    this.closeSmartFormatModal();
    this.showToast("Đã tự động dàn trang và chia chương thành công!", "success");
  }

  formatRawLiteratureText(raw, opts) {
    let text = raw.trim();
    if (!text) return '';

    // 1. Chuẩn hóa dấu gạch ngang thoại
    if (opts.dialogue) {
      text = text.replace(/^[ \t]*[-–—][ \t]*/gm, '— ');
    }

    // 2. Nhận diện tiêu đề chương
    if (opts.chapters) {
      // Dòng chỉ có chữ số đơn lẻ (ví dụ: "1", "2", "12"...) đứng riêng 1 dòng
      text = text.replace(/^[ \t]*(\d+)[ \t]*$/gm, '###CHAPTER### Hồi $1');
      // Dòng có "Chương X", "Hồi X", "Phần X"
      text = text.replace(/^[ \t]*((Chương|Hồi|Phần|Tiết)\s+[IVXLCDM\d]+[^\n]*)$/gim, '###CHAPTER### $1');
    }

    // 3. Nối các dòng bị ngắt vụn do khổ sách/OCR
    if (opts.fixlines) {
      const rawLines = text.split('\n');
      const rebuiltLines = [];

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i].trim();
        if (!line) {
          rebuiltLines.push('');
          continue;
        }

        if (line.startsWith('###CHAPTER###')) {
          rebuiltLines.push('');
          rebuiltLines.push(line);
          rebuiltLines.push('');
          continue;
        }

        if (rebuiltLines.length === 0 || rebuiltLines[rebuiltLines.length - 1] === '') {
          rebuiltLines.push(line);
        } else {
          const prevLine = rebuiltLines[rebuiltLines.length - 1];
          // Nếu dòng trước kết thúc bằng dấu câu hoàn chỉnh (. ! ? … : ;) hoặc dòng hiện tại là lời thoại (—)
          if (/[.?!…:;]$/.test(prevLine) || line.startsWith('—') || prevLine.startsWith('###CHAPTER###')) {
            rebuiltLines.push(line);
          } else {
            // Nối dòng bị ngắt vụn vào dòng trước
            rebuiltLines[rebuiltLines.length - 1] = prevLine + ' ' + line;
          }
        }
      }
      text = rebuiltLines.join('\n');
    }

    // 4. Bọc các đoạn văn vào thẻ HTML chuẩn
    const paragraphs = text.split(/\n\s*\n+/);
    const htmlPieces = [];

    for (let p of paragraphs) {
      p = p.trim();
      if (!p) continue;

      if (p.startsWith('###CHAPTER###')) {
        const title = p.replace('###CHAPTER###', '').trim();
        htmlPieces.push(`\n<h3 class="reader-chapter-title">${title}</h3>\n`);
      } else {
        const formatted = p.replace(/\n/g, '<br>\n');
        htmlPieces.push(`<p>${formatted}</p>`);
      }
    }

    return htmlPieces.join('\n\n');
  }

  // --- TRÍCH XUẤT & XỬ LÝ FILE PDF TRỰC TIẾP TỪ MÁY TÍNH ---
  triggerPdfUpload() {
    const input = document.getElementById('admin-pdf-input');
    if (input) input.click();
  }

  async handlePdfUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (typeof window.pdfjsLib === 'undefined') {
      alert("Thư viện xử lý PDF đang được nạp từ CDN, vui lòng thử lại sau vài giây.");
      return;
    }

    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const modal = document.getElementById('pdf-import-modal');
    const fileNameEl = document.getElementById('pdf-file-name');
    const fillEl = document.getElementById('pdf-progress-fill');
    const statusEl = document.getElementById('pdf-progress-status');
    const percentEl = document.getElementById('pdf-progress-percent');

    if (modal) modal.classList.add('active');
    if (fileNameEl) fileNameEl.textContent = `Tệp: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      let rawParagraphs = [];
      let previousPageLines = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const percent = Math.round((pageNum / totalPages) * 100);
        if (fillEl) fillEl.style.width = `${percent}%`;
        if (percentEl) percentEl.textContent = `${percent}%`;
        if (statusEl) statusEl.textContent = `Đang đọc & lọc bỏ rác trang ${pageNum} / ${totalPages}...`;

        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1.0 });
        const pageHeight = viewport.height;

        // Gom các items theo dòng dựa trên tọa độ y
        const lineMap = new Map();
        textContent.items.forEach(item => {
          const str = item.str.trim();
          if (!str) return;

          // Bỏ qua số trang ở đầu trang hoặc cuối trang (8% lề trên và 8% lề dưới)
          const y = item.transform[5];
          if ((y < pageHeight * 0.08 || y > pageHeight * 0.92) && /^\d+$/.test(str)) {
            return;
          }

          // Làm tròn y theo dung sai 4px để gom các từ cùng dòng
          const roundedY = Math.round(y / 4) * 4;
          if (!lineMap.has(roundedY)) lineMap.set(roundedY, []);
          lineMap.get(roundedY).push({ x: item.transform[4], str: item.str });
        });

        // Sắp xếp các dòng từ trên xuống dưới
        const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
        const pageLines = [];

        sortedY.forEach(y => {
          // Sắp xếp các từ trong dòng từ trái qua phải
          const words = lineMap.get(y).sort((a, b) => a.x - b.x).map(w => w.str);
          const lineText = words.join(' ').replace(/\s+/g, ' ').trim();
          if (lineText && !/^\d+$/.test(lineText)) {
            pageLines.push(lineText);
          }
        });

        // Kiểm tra trang trùng lặp với trang trước
        const isDuplicate = previousPageLines.length > 5 && 
          pageLines.slice(0, 5).join(' ') === previousPageLines.slice(0, 5).join(' ');
        if (isDuplicate) {
          continue; // Bỏ qua trang quét lặp
        }
        previousPageLines = pageLines;

        // Hàn gắn từ nối gạch ngang cuối dòng và ghép các dòng vào đoạn
        pageLines.forEach(l => {
          if (rawParagraphs.length === 0) {
            rawParagraphs.push(l);
          } else {
            let last = rawParagraphs[rawParagraphs.length - 1];
            if (last.endsWith('-')) {
              rawParagraphs[rawParagraphs.length - 1] = last.slice(0, -1) + l;
            } else if (/[.?!…:;”"]$/.test(last) || l.startsWith('-') || l.startsWith('—') || /^(chương|hồi|phần|\d+[\.:])/i.test(l)) {
              rawParagraphs.push(l);
            } else {
              rawParagraphs[rawParagraphs.length - 1] = last + ' ' + l;
            }
          }
        });
      }

      if (statusEl) statusEl.textContent = "Đang tự động chia chương và dàn trang...";

      // Bọc thành các đoạn và chương chuẩn
      let formattedHtml = [];
      rawParagraphs.forEach(p => {
        p = p.trim();
        if (!p) return;

        // Phát hiện tiêu đề chương
        if (/^(chương|hồi|phần)\s+[ivxlcdm\d]+/i.test(p) || (p.length < 30 && /^\d+$/.test(p))) {
          const title = p.replace(/^\d+$/, `Hồi ${p}`);
          formattedHtml.push(`\n<h3 class="reader-chapter-title">${title}</h3>\n`);
        } else {
          const cleanP = p.replace(/^[ \t]*[-–—][ \t]*/, '— ');
          formattedHtml.push(`<p>${cleanP}</p>`);
        }
      });

      const finalHtml = formattedHtml.join('\n\n');

      if (this.visualEditor) this.visualEditor.innerHTML = finalHtml;
      if (this.rawTextarea) this.rawTextarea.value = finalHtml;

      this.switchEditorTab('visual');
      this.updateCharCount();
      this.hasUnsavedChanges = true;

      if (modal) modal.classList.remove('active');
      this.showToast(`Đã trích xuất & chuẩn hóa thành công ${totalPages} trang từ file PDF!`, "success");

    } catch (err) {
      console.error("[PDF Import Error]", err);
      alert("Lỗi khi đọc file PDF: " + err.message);
      if (modal) modal.classList.remove('active');
    } finally {
      event.target.value = '';
    }
  }

  // --- MODAL ĐỒNG BỘ TOÀN BỘ (SEED TO FIRESTORE) ---
  openSeedModal() {
    if (!this.seedModal) return;
    this.seedModal.classList.add('active');
    document.getElementById('seed-progress-fill').style.width = '0%';
    document.getElementById('seed-progress-text').textContent = `Sẵn sàng đồng bộ ${this.works.length} tác phẩm lên Cloud Firestore.`;
  }

  closeSeedModal() {
    if (this.seedModal) this.seedModal.classList.remove('active');
  }

  async startSeedAll() {
    const btn = document.getElementById('btn-start-seed');
    btn.disabled = true;
    btn.textContent = "Đang tải lên...";

    const progressFill = document.getElementById('seed-progress-fill');
    const progressText = document.getElementById('seed-progress-text');

    try {
      if (!window.firebaseService) throw new Error("Firebase Service chưa sẵn sàng");

      await window.firebaseService.seedAllWorks(this.works, (p) => {
        const percent = Math.round((p.current / p.total) * 100);
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `(${p.current}/${p.total}) Đang lưu: ${p.workTitle}...`;
      });

      progressText.textContent = `Hoàn tất! Đã đồng bộ toàn bộ ${this.works.length} tác phẩm lên Cloud.`;
      this.showToast('\u0110\u00e3 \u0111\u1ed3ng b\u1ed9 to\u00e0n b\u1ed9 t\u00e1c ph\u1ea9m th\u00e0nh c\u00f4ng!', 'success');
      await this.loadInitialData();
      this.renderTable();
    } catch (err) {
      progressText.textContent = `Lỗi: ${err.message}`;
      this.showToast(`Lỗi: ${err.message}`, "error");
      if (err.message.includes("permission-denied")) {
        this.showSecurityRulesGuide();
      }
    } finally {
      btn.disabled = false;
      btn.textContent = "Đóng";
      btn.onclick = () => this.closeSeedModal();
    }
  }

  _slugify(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-_]/g, '')
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // --- TẠO TÁC PHẨM MỚI (ĐỒNG BỘ CHUẨN DỮ LIỆU ĐANG CÓ) ---
  openNewWorkModal() {
    if (!this.newWorkModal) this.newWorkModal = document.getElementById('new-work-modal');
    if (!this.newWorkModal) return;

    // 1. Nạp danh sách tác giả hiện có vào datalist với chi tiết Quốc gia & Thời kỳ
    const datalist = document.getElementById('new-work-authors-datalist');
    if (datalist && this.authors) {
      datalist.innerHTML = this.authors.map(a => 
        `<option value="${a.name}">${a.country ? a.country + ' · ' : ''}${a.era || ''}</option>`
      ).join('');
    }

    // 2. Nạp danh mục thể loại chuẩn & các thể loại chi tiết hiện có trong kho tác phẩm
    const catSelect = document.getElementById('new-work-category');
    if (catSelect) {
      const coreCats = this.categories && this.categories.length > 0
        ? this.categories.map(c => c.title)
        : ['Truyện Ngắn & Ký', 'Tiểu Thuyết Kinh Điển', 'Thơ Ca & Khúc Ngâm', 'Kịch Bản Sân Khấu'];

      const specificCats = new Set();
      if (this.works) {
        this.works.forEach(w => {
          if (w.category && !coreCats.includes(w.category)) {
            specificCats.add(w.category);
          }
        });
      }

      catSelect.innerHTML = `
        <optgroup label="Danh Mục Chuẩn Editorial">
          ${coreCats.map(c => `<option value="${c}">${c}</option>`).join('')}
        </optgroup>
        <optgroup label="Thể Loại Chi Tiết Đang Có Trong Thư Viện">
          ${Array.from(specificCats).sort((a,b) => a.localeCompare(b, 'vi')).map(c => `<option value="${c}">${c}</option>`).join('')}
        </optgroup>
        <option value="__custom__">➕ Thể loại tùy chỉnh khác...</option>
      `;
    }

    // 3. Nạp danh sách quốc gia xuất xứ theo khu vực 'vn'
    this.handleNewWorkOriginChange('vn');

    // 4. Reset các trường về giá trị sạch & chuẩn
    const titleInput = document.getElementById('new-work-title');
    const idInput = document.getElementById('new-work-id');
    const authorInput = document.getElementById('new-work-author');
    const authorHint = document.getElementById('new-work-author-hint');
    const idFeedback = document.getElementById('new-work-id-feedback');
    const yearInput = document.getElementById('new-work-year');
    const readTimeInput = document.getElementById('new-work-readtime');
    const fullTextSelect = document.getElementById('new-work-fulltext-status');
    const badgeInput = document.getElementById('new-work-badge');
    const coverInput = document.getElementById('new-work-image');
    const coverPreview = document.getElementById('new-work-cover-preview');
    const epigraphInput = document.getElementById('new-work-epigraph');
    const excerptInput = document.getElementById('new-work-excerpt');
    const eraSelect = document.getElementById('new-work-era');
    const originSelect = document.getElementById('new-work-origin');
    const sgkSelect = document.getElementById('new-work-sgk');
    const catCustomGroup = document.getElementById('new-work-category-custom-group');
    const catCustomInput = document.getElementById('new-work-category-custom');

    if (titleInput) { titleInput.value = ''; }
    if (idInput) { idInput.value = ''; idInput.dataset.manual = 'false'; }
    this.lastGeneratedSlug = '';
    if (idFeedback) { idFeedback.style.display = 'none'; idFeedback.innerHTML = ''; }
    if (authorInput) { authorInput.value = ''; }
    if (authorHint) { authorHint.textContent = ''; }
    if (yearInput) { yearInput.value = ''; }
    if (readTimeInput) { readTimeInput.value = '15 phút đọc • Toàn văn tác phẩm'; }
    if (fullTextSelect) { fullTextSelect.value = 'Toàn Văn Tác Phẩm'; }
    if (badgeInput) { badgeInput.value = 'Kiệt Tác Tiêu Biểu'; }
    if (coverInput) { coverInput.value = 'assets/images/default-cover.jpg'; }
    if (coverPreview) { coverPreview.src = 'assets/images/default-cover.jpg'; }
    if (epigraphInput) { epigraphInput.value = ''; }
    if (excerptInput) { excerptInput.value = ''; }
    if (originSelect) { originSelect.value = 'vn'; }
    if (eraSelect) { eraSelect.value = 'Hiện thực Phê phán (1930 – 1945)'; }
    if (sgkSelect) { sgkSelect.value = 'Chương trình Ngữ Văn THPT (Trọng tâm SGK)'; }
    if (catCustomGroup) { catCustomGroup.style.display = 'none'; }
    if (catCustomInput) { catCustomInput.value = ''; }

    if (window.editorialDropdown) {
      window.editorialDropdown.enhanceAllSelects(this.newWorkModal);
      if (originSelect) window.editorialDropdown.syncSelect(originSelect);
      if (eraSelect) window.editorialDropdown.syncSelect(eraSelect);
      if (sgkSelect) window.editorialDropdown.syncSelect(sgkSelect);
      if (fullTextSelect) window.editorialDropdown.syncSelect(fullTextSelect);
      if (catSelect) window.editorialDropdown.syncSelect(catSelect);
      const countrySelect = document.getElementById('new-work-country');
      if (countrySelect) window.editorialDropdown.syncSelect(countrySelect);
    }

    this.newWorkModal.classList.add('active');
    setTimeout(() => titleInput?.focus(), 120);
  }

  closeNewWorkModal() {
    if (!this.newWorkModal) this.newWorkModal = document.getElementById('new-work-modal');
    if (this.newWorkModal) this.newWorkModal.classList.remove('active');
  }

  handleNewWorkTitleInput(val) {
    const idInput = document.getElementById('new-work-id');
    if (!idInput) return;

    // Tự động tạo mã ID slug không dấu, nối liền bằng dấu '-'
    const slug = this._slugify(val);
    const currentVal = (idInput.value || '').trim();

    // Tự động cập nhật nếu chưa bị sửa tay khác biệt, hoặc nếu đang trống, hoặc khớp với slug vừa tạo trước đó
    if (idInput.dataset.manual !== 'true' || !currentVal || currentVal === this.lastGeneratedSlug) {
      idInput.value = slug;
      this.lastGeneratedSlug = slug;
      this.checkNewWorkId(slug);
    }
  }

  handleNewWorkIdInput(val) {
    const idInput = document.getElementById('new-work-id');
    const titleInput = document.getElementById('new-work-title');
    const currentSlug = this._slugify(titleInput ? titleInput.value : '');

    if (idInput) {
      const trimmed = (val || '').trim().toLowerCase();
      // Nếu người dùng xóa trắng hoặc gõ lại đúng slug tự động từ tiêu đề, bật lại tự động hóa
      if (!trimmed || trimmed === currentSlug) {
        idInput.dataset.manual = 'false';
      } else {
        idInput.dataset.manual = 'true';
      }
    }
    this.checkNewWorkId((val || '').trim().toLowerCase());
  }

  checkNewWorkId(id) {
    const feedback = document.getElementById('new-work-id-feedback');
    if (!feedback) return;
    if (!id) {
      feedback.style.display = 'none';
      feedback.innerHTML = '';
      return;
    }
    feedback.style.display = 'block';
    const exists = this.works && this.works.some(w => w.id === id);
    if (exists) {
      feedback.style.color = 'var(--jasper-600)';
      feedback.innerHTML = `⚠️ Mã ID "<strong>${id}</strong>" đã tồn tại trong thư viện!`;
    } else {
      feedback.style.color = '#059669';
      feedback.innerHTML = `✓ Mã ID khả dụng`;
    }
  }

  handleNewWorkAuthorChange(val) {
    const authorHint = document.getElementById('new-work-author-hint');
    if (!val) {
      if (authorHint) authorHint.textContent = '';
      return;
    }
    const a = (this.authors || []).find(item => item.name.trim().toLowerCase() === val.trim().toLowerCase());
    if (a) {
      if (authorHint) {
        authorHint.textContent = `✓ Đã khớp tác giả: ${a.country ? a.country + ' · ' : ''}${a.era || ''}`;
      }
      const isVn = (a.origin === 'vn') || (a.country && a.country.toLowerCase().includes('việt nam'));
      const originSelect = document.getElementById('new-work-origin');
      if (originSelect) {
        originSelect.value = isVn ? 'vn' : 'world';
        this.handleNewWorkOriginChange(originSelect.value, a.country);
      }
      if (a.era) {
        const eraSelect = document.getElementById('new-work-era');
        if (eraSelect) {
          let found = false;
          const aEraLow = a.era.toLowerCase();
          for (let i = 0; i < eraSelect.options.length; i++) {
            const optVal = eraSelect.options[i].value.toLowerCase();
            if (optVal.includes(aEraLow) || aEraLow.includes(optVal)) {
              eraSelect.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) {
            const opt = document.createElement('option');
            opt.value = a.era;
            opt.textContent = `📍 ${a.era}`;
            opt.selected = true;
            eraSelect.appendChild(opt);
          }
        }
      }
    } else {
      if (authorHint) {
        authorHint.textContent = `(Tác giả mới: sẽ tự động thêm vào thư viện)`;
      }
    }
  }

  handleNewWorkOriginChange(originValue, preferredCountry = null) {
    const countrySelect = document.getElementById('new-work-country');
    if (!countrySelect) return;

    if (originValue === 'vn') {
      countrySelect.innerHTML = `<option value="Việt Nam" selected>🇻🇳 Việt Nam</option>`;
    } else {
      const worldOrigins = (this.origins || []).filter(o => o.region !== 'vn');
      const uniqueCountries = new Map();
      worldOrigins.forEach(o => uniqueCountries.set(o.country.toLowerCase(), { country: o.country, flag: o.flag || '🌐' }));

      // Bổ sung thêm các quốc gia thế giới thực tế từ this.works nếu chưa có
      if (this.works) {
        this.works.filter(w => w.origin === 'world').forEach(w => {
          const c = (w.country || '').trim();
          if (c && !uniqueCountries.has(c.toLowerCase())) {
            let flag = '🌐';
            const cLow = c.toLowerCase();
            if (cLow.includes('nga')) flag = '🇷🇺';
            else if (cLow.includes('pháp')) flag = '🇫🇷';
            else if (cLow.includes('mỹ') || cLow.includes('hoa kỳ')) flag = '🇺🇸';
            else if (cLow.includes('colombia')) flag = '🇨🇴';
            else if (cLow.includes('trung quốc')) flag = '🇨🇳';
            else if (cLow.includes('tây ban nha')) flag = '🇪🇸';
            else if (cLow.includes('anh')) flag = '🇬🇧';
            else if (cLow.includes('séc')) flag = '🇨🇿';
            else if (cLow.includes('kyrgyzstan')) flag = '🇰🇬';
            uniqueCountries.set(c.toLowerCase(), { country: c, flag });
          }
        });
      }

      countrySelect.innerHTML = Array.from(uniqueCountries.values()).map(o => 
        `<option value="${o.country}">${o.flag} ${o.country}</option>`
      ).join('') + `<option value="Quốc tế khác">🌐 Quốc tế khác...</option>`;

      if (preferredCountry) {
        const prefLow = preferredCountry.toLowerCase();
        let matchedVal = null;
        for (let i = 0; i < countrySelect.options.length; i++) {
          const optVal = countrySelect.options[i].value.toLowerCase();
          if (optVal === prefLow || optVal.includes(prefLow) || prefLow.includes(optVal)) {
            matchedVal = countrySelect.options[i].value;
            break;
          }
        }
        if (matchedVal) {
          countrySelect.value = matchedVal;
        } else {
          const opt = document.createElement('option');
          opt.value = preferredCountry;
          opt.textContent = `🌐 ${preferredCountry}`;
          opt.selected = true;
          countrySelect.appendChild(opt);
        }
      }
    }

    if (window.editorialDropdown) {
      window.editorialDropdown.syncSelect(countrySelect);
    }
  }

  handleNewWorkCategoryChange(val) {
    const customGroup = document.getElementById('new-work-category-custom-group');
    const customInput = document.getElementById('new-work-category-custom');
    if (val === '__custom__') {
      if (customGroup) customGroup.style.display = 'block';
      if (customInput) customInput.focus();
    } else {
      if (customGroup) customGroup.style.display = 'none';
    }
  }

  handleNewWorkCoverChange(url) {
    const preview = document.getElementById('new-work-cover-preview');
    if (preview) {
      preview.src = (url || '').trim() || 'assets/images/default-cover.jpg';
    }
  }

  handleNewWorkCoverFileUpload(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showToast('Vui lòng chọn tệp tin hình ảnh (.jpg, .png, .webp).', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const coverInput = document.getElementById('new-work-image');
      const coverPreview = document.getElementById('new-work-cover-preview');
      if (coverInput) coverInput.value = dataUrl;
      if (coverPreview) coverPreview.src = dataUrl;
      this.showToast('Đã nạp ảnh bìa trực tiếp thành công!', 'success');
    };
    reader.readAsDataURL(file);
  }

  setDefaultNewWorkCover() {
    const coverInput = document.getElementById('new-work-image');
    const coverPreview = document.getElementById('new-work-cover-preview');
    if (coverInput) coverInput.value = 'assets/images/default-cover.jpg';
    if (coverPreview) coverPreview.src = 'assets/images/default-cover.jpg';
  }

  submitNewWork() {
    const title = (document.getElementById('new-work-title')?.value || '').trim();
    let id = (document.getElementById('new-work-id')?.value || '').trim().toLowerCase();
    const authorName = (document.getElementById('new-work-author')?.value || '').trim() || 'Khuyết danh';
    
    let category = (document.getElementById('new-work-category')?.value || '').trim();
    if (category === '__custom__') {
      category = (document.getElementById('new-work-category-custom')?.value || '').trim() || 'Văn học chọn lọc';
    }
    if (!category) category = 'Truyện ngắn kinh điển';

    const origin = document.getElementById('new-work-origin')?.value || 'vn';
    const country = (document.getElementById('new-work-country')?.value || '').trim() || (origin === 'vn' ? 'Việt Nam' : 'Quốc tế');
    const era = (document.getElementById('new-work-era')?.value || '').trim() || (origin === 'vn' ? 'Hiện thực Phê phán (1930 – 1945)' : 'Hiện đại thế kỷ XX');
    const year = (document.getElementById('new-work-year')?.value || '').trim();
    const readTime = (document.getElementById('new-work-readtime')?.value || '').trim() || '15 phút đọc • Toàn văn tác phẩm';
    const fullTextStatus = (document.getElementById('new-work-fulltext-status')?.value || '').trim() || 'Toàn Văn Tác Phẩm';
    const badge = (document.getElementById('new-work-badge')?.value || '').trim() || 'Kiệt Tác Tiêu Biểu';
    const sgkDetail = (document.getElementById('new-work-sgk')?.value || '').trim() || 'Chương trình Ngữ Văn THPT (Trọng tâm SGK)';
    const coverImage = (document.getElementById('new-work-image')?.value || '').trim() || 'assets/images/default-cover.jpg';
    const epigraph = (document.getElementById('new-work-epigraph')?.value || '').trim();
    const excerpt = (document.getElementById('new-work-excerpt')?.value || '').trim() || `Kiệt tác văn học "${title}" của nhà văn ${authorName}.`;

    if (!title) {
      this.showToast('Vui lòng nhập tên tác phẩm.', 'warning');
      document.getElementById('new-work-title')?.focus();
      return;
    }

    if (!id) {
      id = this._slugify(title);
    }

    if (this.works.some(w => w.id === id)) {
      this.showToast(`Mã ID định danh "${id}" đã tồn tại! Vui lòng chọn mã khác.`, 'warning');
      document.getElementById('new-work-id')?.focus();
      return;
    }

    // Liên kết hoặc tự động tạo mới hồ sơ Tác Giả trong hệ thống
    let matchedAuthor = (this.authors || []).find(a => a.name.trim().toLowerCase() === authorName.toLowerCase());
    let authorId;
    if (matchedAuthor) {
      authorId = matchedAuthor.id || this._slugify(authorName);
    } else {
      authorId = this._slugify(authorName);
      const newAuthorObj = {
        id: authorId,
        name: authorName,
        alias: '',
        years: year ? `Năm sáng tác tiêu biểu: ${year}` : '',
        era: era,
        country: country,
        origin: origin,
        avatarInitials: authorName.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase(),
        bio: `Tác giả kiệt tác "${title}".`,
        masterpieces: title
      };
      this.authors.push(newAuthorObj);
      try {
        const savedAuthors = JSON.parse(localStorage.getItem('van_uyen_custom_authors') || '[]');
        savedAuthors.push(newAuthorObj);
        localStorage.setItem('van_uyen_custom_authors', JSON.stringify(savedAuthors));
      } catch (e) {
        console.warn("Lưu tác giả mới:", e);
      }
    }

    // Tự động bổ sung quốc gia vào this.origins nếu là xuất xứ mới
    if (country && !this.origins.some(o => o.country.toLowerCase() === country.toLowerCase())) {
      this.origins.push({
        country,
        region: origin,
        flag: origin === 'vn' ? '🇻🇳' : '🌐',
        desc: `Văn học xuất xứ ${country}.`
      });
    }

    const newWork = {
      id,
      title,
      author: authorName,
      authorId,
      origin,
      originLabel: origin === 'vn' ? 'Văn học Việt Nam' : 'Văn học Thế Giới',
      country,
      category,
      era,
      year: year || new Date().getFullYear().toString(),
      readTime,
      badge,
      image: coverImage,
      imageCaption: `Khắc họa bìa tác phẩm: ${title} (${authorName})`,
      epigraph,
      excerpt,
      fullTextStatus,
      sgkDetail,
      content: `\n<div class="reader-fulltext-banner">\n  <span class="reader-fulltext-tag">\n    <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>\n    ${fullTextStatus}: ${title}\n  </span>\n  <span style="color: var(--cerulean-800); font-weight: 700;">\n    ${sgkDetail}\n  </span>\n</div>\n\n<h3 class="reader-chapter-title">Chương I: Khởi Đầu</h3>\n<p>Nội dung toàn văn tác phẩm ${title} của tác giả ${authorName} bắt đầu tại đây...</p>\n`,
      criticism: `Tác phẩm đặc sắc "${title}" của nhà văn ${authorName}, kết tinh tài năng sáng tạo và mỹ cảm nhân văn sâu sắc.`,
      tags: [title, authorName, category, era, country, (sgkDetail.includes('SGK') || sgkDetail.includes('Lớp')) ? 'SGK' : ''].filter(Boolean),
      _isCustomFirestore: true
    };

    // Đưa vào danh sách tác phẩm
    this.works.unshift(newWork);
    this.customWorksMap.set(id, newWork);

    // Lưu vào Firebase / Local Cache
    try {
      if (window.firebaseService && typeof window.firebaseService.saveWork === 'function') {
        window.firebaseService.saveWork(newWork);
      } else {
        const localWorks = JSON.parse(localStorage.getItem('van_uyen_custom_works') || '[]');
        localWorks.unshift(newWork);
        localStorage.setItem('van_uyen_custom_works', JSON.stringify(localWorks));
      }
    } catch (e) {
      console.warn("Lưu tác phẩm mới:", e);
    }

    this.closeNewWorkModal();
    this.updateSidebarCounts();
    this.renderTable();
    this.openEditModal(id);
    this.showToast(`Đã tạo tác phẩm: "${title}" và mở trình soạn thảo`, 'success');
  }

  showToast(msg, type = 'success') {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.className = `admin-toast ${type} active`;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.remove('active');
    }, 3500);
  }

  showSecurityRulesGuide() {
    alert(
      "LƯU Ý VỀ QUYỀN GHI FIRESTORE:\n\n" +
      "Firestore Rules hiện tại của dự án 'litterarum-16c16' đang chặn quyền ghi (permission-denied).\n" +
      "Để cho phép lưu dữ liệu, bạn vui lòng truy cập Firebase Console > Firestore Database > Rules và đặt quy tắc cho phép ghi:\n\n" +
      "rules_version = '2';\n" +
      "service cloud.firestore {\n" +
      "  match /databases/{database}/documents {\n" +
      "    match /works/{workId} {\n" +
      "      allow read, write: if true;\n" +
      "    }\n" +
      "  }\n" +
      "}"
    );
  }

  // ==========================================================================
  // SIDEBAR BIÊN TẬP & ĐIỀU HƯỚNG DANH MỤC
  // (Tác Phẩm, Thể Loại, Tác Giả, Xuất Xứ)
  // ==========================================================================

  updateSidebarCounts() {
    if (!this.works || this.works.length === 0) return;
    const totalWorks = this.works.length;

    const authorsSet = new Set(this.works.map(w => (w.author || '').trim()).filter(Boolean));
    const countriesSet = new Set(this.works.map(w => (w.country || (w.origin === 'vn' ? 'Việt Nam' : 'Quốc tế')).trim()).filter(Boolean));

    const sgkCount = this.works.filter(w => 
      (w.fullTextStatus && w.fullTextStatus.includes('SGK')) || 
      (w.sgkDetail && w.sgkDetail.length > 0) || 
      (w.tags && w.tags.some(t => t.includes('SGK')))
    ).length;

    const vnCount = this.works.filter(w => w.origin === 'vn').length;
    const worldCount = this.works.filter(w => w.origin === 'world').length;

    if (this.sidebarCountWorks) this.sidebarCountWorks.textContent = totalWorks;
    if (this.sidebarCountCategories) this.sidebarCountCategories.textContent = `${this.categories.length || 4} nhóm`;
    if (this.sidebarCountAuthors) this.sidebarCountAuthors.textContent = this.authors.length || authorsSet.size;
    if (this.sidebarCountOrigins) this.sidebarCountOrigins.textContent = `${this.origins.length || countriesSet.size} quốc gia`;

    if (this.statSgkCount) this.statSgkCount.textContent = sgkCount;
    if (this.statVnCount) this.statVnCount.textContent = vnCount;
    if (this.statWorldCount) this.statWorldCount.textContent = worldCount;

    // Đồng bộ số liệu hiển thị trên tiêu đề trang
    this.updatePageHeader(this.currentSidebarTab || 'overview');
    if (this.currentSidebarTab === 'overview' && this.overviewPanel && this.overviewPanel.style.display !== 'none') {
      this._renderOverviewPage();
    }
  }

  updatePageHeader(tabName = this.currentSidebarTab) {
    if (!this.adminPageHeader) {
      this.adminPageHeader = document.getElementById('admin-page-header');
      this.adminBreadcrumbCurrent = document.getElementById('admin-breadcrumb-current');
      this.adminPageTitle = document.getElementById('admin-page-title');
      this.adminPageBadge = document.getElementById('admin-page-badge');
      this.adminPageHeaderActions = document.getElementById('admin-page-header-actions');
    }
    if (!this.adminPageHeader) return;

    const totalWorks = this.works ? this.works.length : 38;
    const authorsCount = this.authors ? this.authors.length : 32;
    const countriesCount = this.origins ? this.origins.length : 10;
    const categoriesCount = this.categories ? this.categories.length : 4;
    const vnCount = this.works ? this.works.filter(w => w.origin === 'vn').length : 28;
    const worldCount = this.works ? this.works.filter(w => w.origin === 'world').length : 10;

    const configs = {
      overview: {
        breadcrumb: 'Tổng Quan',
        title: 'Tổng Quan',
        badge: 'Bảng Điều Khiển',
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewWorkModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm tác phẩm</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.openNewAuthorModal()" title="Thêm tác giả mới vào danh mục">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Thêm tác giả</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Kho tác phẩm (${totalWorks})</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.openSeedModal()" title="Đồng bộ toàn bộ danh mục lên Cloud Firestore">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            <span>Đồng bộ Cloud</span>
          </button>
        `
      },
      works: {
        breadcrumb: 'Tác Phẩm',
        title: 'Tác Phẩm',
        badge: `${totalWorks} tác phẩm`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewWorkModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm tác phẩm</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.openSeedModal()" title="Đồng bộ toàn bộ danh mục lên Cloud Firestore">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            <span>Đồng bộ Cloud</span>
          </button>
        `
      },
      categories: {
        breadcrumb: 'Thể Loại',
        title: 'Thể Loại',
        badge: `${categoriesCount} nhóm`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewCategoryModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm thể loại</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Tất cả tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      authors: {
        breadcrumb: 'Tác Giả',
        title: 'Tác Giả',
        badge: `${authorsCount} tác gia`,
        actionsHtml: `
          <div class="admin-search-wrap" style="margin-bottom:0;width:180px;">
            <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="header-author-search" class="admin-search-input" placeholder="Tìm tác giả..." oninput="window.literaryAdmin.filterAuthorCards(this.value)">
          </div>
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewAuthorModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm tác giả</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Tất cả tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      origins: {
        breadcrumb: 'Xuất Xứ',
        title: 'Xuất Xứ',
        badge: `${countriesCount} quốc gia`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewOriginModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm xuất xứ</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.filterByOrigin('region', 'vn')" title="Lọc toàn bộ tác phẩm Việt Nam">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            <span>Việt Nam (${vnCount})</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.filterByOrigin('region', 'world')" title="Lọc toàn bộ văn học Thế Giới">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>Thế Giới (${worldCount})</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ tác phẩm">
            <span>Tất cả (${totalWorks})</span>
          </button>
        `
      },
      eras: {
        breadcrumb: 'Thời Kỳ',
        title: 'Thời Kỳ & Giai Đoạn Văn Học',
        badge: `${this.eras ? this.eras.length : 6} giai đoạn lịch sử`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewEraModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm thời kỳ</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Tất cả tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      themes: {
        breadcrumb: 'Chủ Đề & Đề Tài',
        title: 'Chủ Đề & Đề Tài Văn Học',
        badge: `${this.themes ? this.themes.length : 8} chủ đề tư tưởng`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewThemeModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm chủ đề</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Tất cả tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      characters: {
        breadcrumb: 'Nhân Vật',
        title: 'Nhân Vật Văn Học Kinh Điển',
        badge: `${this.characters ? this.characters.length : 12} hình tượng`,
        actionsHtml: `
          <div class="admin-search-wrap" style="margin-bottom:0;width:180px;">
            <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="header-character-search" class="admin-search-input" placeholder="Tìm nhân vật..." oninput="window.literaryAdmin.filterCharacters(this.value)">
          </div>
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewCharacterModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm nhân vật</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem toàn bộ kho tác phẩm">
            <span>Kho tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      articles: {
        breadcrumb: 'Bài Viết & Phân Tích',
        title: 'Bài Viết Phân Tích & Bình Luận',
        badge: `${this.articles ? this.articles.length : 6} bài học liệu`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewArticleModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Soạn bài phân tích</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem kho tác phẩm">
            <span>Kho tác phẩm (${totalWorks})</span>
          </button>
        `
      },
      terms: {
        breadcrumb: 'Từ Điển Thuật Ngữ',
        title: 'Từ Điển Thuật Ngữ & Thi Pháp',
        badge: `${this.terms ? this.terms.length : 8} khái niệm`,
        actionsHtml: `
          <div class="admin-search-wrap" style="margin-bottom:0;width:180px;">
            <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="header-term-search" class="admin-search-input" placeholder="Tìm thuật ngữ..." oninput="window.literaryAdmin.filterTerms(this.value)">
          </div>
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewTermModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm thuật ngữ</span>
          </button>
        `
      },
      comments: {
        breadcrumb: 'Bình Luận & Góp Ý',
        title: 'Bình Luận & Thảo Luận Bạn Đọc',
        badge: `${(this.comments ? this.comments.filter(c => c.status === 'pending').length : 0)} chờ duyệt`,
        actionsHtml: `
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.filterCommentsByStatus('pending')">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:12px;height:12px"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Chờ duyệt (${this.comments ? this.comments.filter(c => c.status === 'pending').length : 0})</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.filterCommentsByStatus('approved')">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:12px;height:12px;color:#10b981"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Đã duyệt</span>
          </button>
          <button type="button" class="btn-editorial-secondary" onclick="window.literaryAdmin.filterCommentsByStatus('all')">
            <span>Tất cả (${this.comments ? this.comments.length : 0})</span>
          </button>
        `
      },
      users: {
        breadcrumb: 'Người Dùng & Phân Quyền',
        title: 'Ban Biên Tập & Phân Quyền',
        badge: `${this.users ? this.users.length : 4} nhân sự`,
        actionsHtml: `
          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewUserModal()">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm thành viên</span>
          </button>
        `
      }
    };

    const cfg = configs[tabName] || configs.overview || configs.works;

    if (this.adminBreadcrumbCurrent) this.adminBreadcrumbCurrent.textContent = cfg.breadcrumb;
    if (this.adminPageTitle) this.adminPageTitle.textContent = cfg.title;
    if (this.adminPageBadge) this.adminPageBadge.textContent = cfg.badge;
    if (this.adminPageHeaderActions) this.adminPageHeaderActions.innerHTML = cfg.actionsHtml;
  }

  switchSidebarTab(tabName, preserveFilter = false) {
    this.currentSidebarTab = tabName;
    // Cuộn ngay lập tức lên đầu trang khi chuyển tab
    this.scrollToTop();

    if (this.sidebarNavItems) {
      this.sidebarNavItems.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.nav === tabName);
      });
    }

    // Đồng bộ tiêu đề trang chính xác theo mục đang chọn
    this.updatePageHeader(tabName);

    if (!this.overviewPanel) this.overviewPanel = document.getElementById('admin-overview-panel');
    if (!this.subviewPanel) this.subviewPanel = document.getElementById('admin-subview-panel');
    if (!this.tableToolbar) this.tableToolbar = document.getElementById('admin-table-toolbar');
    if (!this.listViewEl) this.listViewEl = document.getElementById('admin-list-view');
    if (!this.gridViewEl) this.gridViewEl = document.getElementById('admin-grid-view');
    if (!this.paginationBar) this.paginationBar = document.getElementById('admin-pagination-bar');
    if (!this.activeFilterBanner) this.activeFilterBanner = document.getElementById('admin-active-filter-banner');

    if (tabName === 'overview') {
      if (this.overviewPanel) {
        this.overviewPanel.style.display = 'flex';
        this._renderOverviewPage();
      }
      if (this.subviewPanel) this.subviewPanel.style.display = 'none';
      if (this.tableToolbar) this.tableToolbar.style.display = 'none';
      if (this.listViewEl) this.listViewEl.style.display = 'none';
      if (this.gridViewEl) this.gridViewEl.style.display = 'none';
      if (this.paginationBar) this.paginationBar.style.display = 'none';
      if (this.activeFilterBanner) this.activeFilterBanner.style.display = 'none';
    } else if (tabName === 'works') {
      if (this.overviewPanel) this.overviewPanel.style.display = 'none';
      if (this.subviewPanel) this.subviewPanel.style.display = 'none';
      if (!preserveFilter) {
        this.activeCategoryFilter = null;
        this.activeAuthorFilter = null;
        this.activeOriginFilter = null;
        this.activeEraFilter = null;
        this.activeThemeFilter = null;
        this.currentPage = 1;
      }
      this.renderTable();
      this.setViewMode(this.viewMode || 'list');
    } else {
      // Subviews: categories | authors | origins | eras | themes | characters | articles | terms | comments | users
      if (this.overviewPanel) this.overviewPanel.style.display = 'none';
      if (this.tableToolbar) this.tableToolbar.style.display = 'none';
      if (this.listViewEl) this.listViewEl.style.display = 'none';
      if (this.gridViewEl) this.gridViewEl.style.display = 'none';
      if (this.paginationBar) this.paginationBar.style.display = 'none';
      if (this.activeFilterBanner) this.activeFilterBanner.style.display = 'none';
      if (this.subviewPanel) {
        this.subviewPanel.style.display = 'block';
        if (tabName === 'categories') this._renderCategoriesSubview();
        else if (tabName === 'authors') this._renderAuthorsSubview();
        else if (tabName === 'origins') this._renderOriginsSubview();
        else if (tabName === 'eras') this._renderErasSubview();
        else if (tabName === 'themes') this._renderThemesSubview();
        else if (tabName === 'characters') this._renderCharactersSubview();
        else if (tabName === 'articles') this._renderArticlesSubview();
        else if (tabName === 'terms') this._renderTermsSubview();
        else if (tabName === 'comments') this._renderCommentsSubview();
        else if (tabName === 'users') this._renderUsersSubview();
      }
    }

    // Đảm bảo ở vị trí đầu trang tuyệt đối
    this.scrollToTop();
  }

  // Kết xuất trang Tổng Quan (Minimalist Overview Dashboard)
  _renderOverviewPage() {
    if (!this.overviewPanel) {
      this.overviewPanel = document.getElementById('admin-overview-panel');
    }
    if (!this.overviewPanel) return;

    const worksList = this.works || [];
    const totalWorks = worksList.length;
    const authorsSet = new Set(worksList.map(w => (w.author || '').trim()).filter(Boolean));
    const authorsCount = authorsSet.size || 32;
    const countriesSet = new Set(worksList.map(w => (w.country || (w.origin === 'vn' ? 'Việt Nam' : 'Quốc tế')).trim()).filter(Boolean));
    const countriesCount = countriesSet.size || 10;
    const vnCount = worksList.filter(w => w.origin === 'vn').length;
    const worldCount = worksList.filter(w => w.origin === 'world').length;
    const vnPct = totalWorks ? Math.round((vnCount / totalWorks) * 100) : 74;
    const worldPct = 100 - vnPct;
    const sgkCount = worksList.filter(w => 
      (w.fullTextStatus && w.fullTextStatus.includes('SGK')) || 
      (w.sgkDetail && w.sgkDetail.length > 0) || 
      (w.tags && w.tags.some(t => t.includes('SGK')))
    ).length;

    // Lấy 6 tác phẩm tiêu biểu
    const featuredIds = ['chi-pheo', 'truyen-kieu', 'so-do', 'ong-gia-va-bien-ca', 'lao-hac', 'tram-nam-co-don'];
    let recentWorks = worksList.filter(w => featuredIds.includes(w.id));
    if (recentWorks.length < 5) {
      recentWorks = worksList.slice(0, 6);
    }

    const recentRowsHtml = recentWorks.map(w => {
      const coverUrl = w.coverImage || w.image || 'assets/images/default-cover.jpg';
      const originName = w.country || (w.origin === 'vn' ? 'Việt Nam' : 'Quốc tế');
      return `
        <tr>
          <td style="padding: 0.4rem 0.6rem;">
            <img src="${coverUrl}" alt="${w.title}" style="width: 24px; height: 42px; object-fit: cover; border-radius: 2px; border: 1px solid var(--border-color); display: block;" onerror="this.onerror=null;this.src='assets/images/default-cover.jpg'">
          </td>
          <td>
            <div style="display:flex;align-items:center;gap:0.4rem;">
              <strong style="color: var(--text-primary); cursor: pointer;" onclick="window.literaryAdmin.openEditModal('${w.id}')">${w.title}</strong>
              ${w.badge ? `<span style="font-size: 0.7rem; padding: 1px 6px; background: var(--bg-secondary); border-radius: 4px; color: var(--text-muted); border: 1px solid var(--border-color);">${w.badge}</span>` : ''}
            </div>
          </td>
          <td style="color: var(--text-secondary); font-family: var(--font-heading);">${w.author || 'Khuyết danh'}</td>
          <td style="color: var(--text-muted); font-size: 0.82rem;">${w.category || 'Văn học'}</td>
          <td style="color: var(--text-muted); font-size: 0.82rem;">${w.year ? w.year + ' · ' : ''}${originName}</td>
          <td style="text-align: right; white-space: nowrap;">
            <button type="button" class="btn-editorial-secondary" style="padding: 0.25rem 0.6rem; font-size: 0.78rem; margin-right: 4px;" onclick="window.literaryAdmin.openEditModal('${w.id}')" title="Soạn thảo & Chỉnh sửa tác phẩm">Sửa</button>
            <button type="button" class="btn-editorial-secondary" style="padding: 0.25rem 0.6rem; font-size: 0.78rem;" onclick="window.open('index.html?work=${w.id}', '_blank')" title="Mở tác phẩm trên giao diện độc giả">Đọc ↗</button>
          </td>
        </tr>
      `;
    }).join('');

    this.overviewPanel.innerHTML = `
      <!-- 1. Lưới 4 chỉ số trọng yếu -->
      <div class="overview-metrics-grid">
        <div class="overview-metric-card" onclick="window.literaryAdmin.switchSidebarTab('works')" title="Xem danh mục Tác phẩm">
          <div class="overview-metric-header">
            <span class="overview-metric-label">TÁC PHẨM</span>
            <div class="overview-metric-icon">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
          </div>
          <div class="overview-metric-value">${totalWorks}</div>
          <div class="overview-metric-sub">Kiệt tác văn chương (${vnCount} VN · ${worldCount} Thế giới)</div>
        </div>

        <div class="overview-metric-card" onclick="window.literaryAdmin.switchSidebarTab('authors')" title="Xem danh mục Tác giả">
          <div class="overview-metric-header">
            <span class="overview-metric-label">TÁC GIẢ</span>
            <div class="overview-metric-icon">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <div class="overview-metric-value">${authorsCount}</div>
          <div class="overview-metric-sub">Đại thi hào & Danh nhân văn học</div>
        </div>

        <div class="overview-metric-card" onclick="window.literaryAdmin.switchSidebarTab('categories')" title="Xem danh mục Thể loại">
          <div class="overview-metric-header">
            <span class="overview-metric-label">THỂ LOẠI</span>
            <div class="overview-metric-icon">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
          </div>
          <div class="overview-metric-value">4</div>
          <div class="overview-metric-sub">Truyện ngắn, Tiểu thuyết, Thơ, Kịch</div>
        </div>

        <div class="overview-metric-card" onclick="window.literaryAdmin.switchSidebarTab('origins')" title="Xem phân vùng Xuất xứ">
          <div class="overview-metric-header">
            <span class="overview-metric-label">XUẤT XỨ</span>
            <div class="overview-metric-icon">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
          </div>
          <div class="overview-metric-value">${countriesCount}</div>
          <div class="overview-metric-sub">Quốc gia & Khu vực tiêu biểu</div>
        </div>
      </div>

      <!-- 2. Lưới 2 cột: Phân bổ địa lý & Tiến trình văn học -->
      <div class="overview-sections-grid">
        <div class="overview-card">
          <div class="overview-card-header">
            <h3 class="overview-card-title">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              Phân Bổ Tác Phẩm
            </h3>
            <span class="overview-card-link" onclick="window.literaryAdmin.switchSidebarTab('origins')">Chi tiết xuất xứ →</span>
          </div>
          <div class="overview-ratio-bar">
            <div class="ratio-segment-vn" style="width: ${vnPct}%" title="Việt Nam: ${vnCount} tác phẩm (${vnPct}%)"></div>
            <div class="ratio-segment-world" style="width: ${worldPct}%" title="Thế Giới: ${worldCount} tác phẩm (${worldPct}%)"></div>
          </div>
          <div class="overview-ratio-legend">
            <span style="display:inline-flex;align-items:center;gap:4px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="color:var(--jasper-700);"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> Việt Nam: <strong>${vnCount}</strong> tác phẩm (${vnPct}%)</span>
            <span style="display:inline-flex;align-items:center;gap:4px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="color:var(--cerulean-700);"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Thế Giới: <strong>${worldCount}</strong> tác phẩm (${worldPct}%)</span>
          </div>
          <div class="overview-pills-list">
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByOrigin('region', 'vn')" title="Lọc tác phẩm Việt Nam"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> <span>Văn học Dân tộc (${vnCount})</span></span>
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByOrigin('region', 'world')" title="Lọc văn học Thế giới"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>Văn học Nước ngoài (${worldCount})</span></span>
            <span class="overview-pill" style="display:inline-flex;align-items:center;gap:4px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> <span>Chuẩn SGK: ${sgkCount}</span></span>
          </div>
        </div>

        <div class="overview-card">
          <div class="overview-card-header">
            <h3 class="overview-card-title">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Thời Kỳ &amp; Dòng Chảy Văn Học
            </h3>
            <span class="overview-card-link" onclick="window.literaryAdmin.switchSidebarTab('eras')">Xem tất cả thời kỳ →</span>
          </div>
          <div class="overview-pills-list">
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByEra('trung-dai')" title="Lọc tác phẩm Văn học Trung đại"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> <span>Trung đại</span></span>
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByEra('hien-thuc-tho-moi')" title="Lọc Hiện thực & Thơ Mới 1930 - 1945"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg> <span>Hiện thực &amp; Thơ Mới</span></span>
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByEra('khang-chien-1945-1975')" title="Lọc Kháng chiến 1945 - 1975"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> <span>Kháng chiến ái quốc</span></span>
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByEra('doi-moi-1986')" title="Lọc Văn học Đổi mới 1986 - nay"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span>Đổi mới &amp; Đương đại</span></span>
            <span class="overview-pill" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="window.literaryAdmin.filterByEra('van-hoc-the-gioi')" title="Lọc Tinh hoa Văn học Thế giới"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>Văn học Thế giới</span></span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin-top: 0.2rem;">
            Tuyển tập ${totalWorks} kiệt tác kinh điển được phân kỳ chuẩn SGK Ngữ văn, kèm phân tích thi pháp, nhân vật và từ điển thuật ngữ.
          </div>
        </div>
      </div>

      <!-- 3. Tác phẩm tiêu biểu trong kho lưu trữ -->
      <div class="overview-card">
        <div class="overview-card-header">
          <h3 class="overview-card-title">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Tác Phẩm Tiêu Biểu Trong Kho Lưu Trữ
          </h3>
          <span class="overview-card-link" onclick="window.literaryAdmin.switchSidebarTab('works')">Xem tất cả (${totalWorks}) →</span>
        </div>
        <div style="overflow-x: auto;">
          <table class="overview-recent-table">
            <thead>
              <tr>
                <th style="width: 36px">Bìa</th>
                <th>Tác Phẩm</th>
                <th>Tác Giả</th>
                <th>Thể Loại</th>
                <th>Thời Kỳ / Xuất Xứ</th>
                <th style="text-align: right">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${recentRowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 4. Lối tắt thao tác nhanh -->
      <div class="overview-shortcuts-grid">
        <button type="button" class="overview-shortcut-btn" onclick="window.literaryAdmin.openNewWorkModal()">
          <span class="overview-shortcut-icon">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </span>
          <span>Soạn thảo tác phẩm mới</span>
        </button>
        <a href="index.html" target="_blank" class="overview-shortcut-btn">
          <span class="overview-shortcut-icon">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </span>
          <span>Trang Độc Giả Thư Viện ↗</span>
        </a>
        <button type="button" class="overview-shortcut-btn" onclick="window.literaryAdmin.openSeedModal()">
          <span class="overview-shortcut-icon">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </span>
          <span>Đồng bộ Cloud Firestore</span>
        </button>
        <button type="button" class="overview-shortcut-btn" onclick="window.literaryAdmin.exportJson()">
          <span class="overview-shortcut-icon">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </span>
          <span>Sao lưu tệp JSON</span>
        </button>
      </div>
    `;
  }


  _renderCategoriesSubview() {
    if (!this.subviewPanel) return;

    const parentMap = {
      'tho': 'Thơ Ca',
      'truyen': 'Truyện & Tiểu Thuyết',
      'ky': 'Ký & Tùy Bút',
      'kich': 'Kịch & Sân Khấu',
      'nghi-luan': 'Nghị Luận & Khảo Cứu'
    };

    const cardsHtml = this.categories.map(cat => {
      const kws = (cat.filterKey || cat.title).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const matchingWorks = this.works.filter(w => {
        const catLow = (w.category || '').toLowerCase();
        const tagList = (w.tags || []).map(t => t.toLowerCase());
        return kws.some(k => catLow.includes(k) || tagList.some(t => t.includes(k)));
      });
      const count = matchingWorks.length;
      const isActive = this.activeCategoryFilter === cat.id;

      const parentTitle = cat.parentId ? (parentMap[cat.parentId] || cat.parentId) : '';
      const statusClass = cat.status === 'hidden' ? 'hidden' : (cat.status === 'draft' ? 'draft' : 'published');
      const statusText = cat.status === 'hidden' ? 'Tạm ẩn' : (cat.status === 'draft' ? 'Bản nháp' : 'Công khai');

      return `
        <div class="subview-card ${isActive ? 'active' : ''}" onclick="window.literaryAdmin.filterByCategory('${cat.id}')">
          <div class="subview-card-top">
            <div style="display:flex;align-items:center;gap:0.45rem;">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="color:var(--cerulean-700);"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <h4 class="subview-card-title">${cat.title}</h4>
            </div>
            <span class="subview-card-count">${count} tác phẩm</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.4rem;margin:0.25rem 0 0.5rem 0;flex-wrap:wrap;">
            ${parentTitle ? `<span class="subview-status-tag" style="background:var(--cerulean-50);color:var(--cerulean-800);border:1px solid rgba(24,76,120,0.18);">Nhánh: ${parentTitle}</span>` : ''}
            <span class="subview-status-tag ${statusClass}">${statusText}</span>
            ${cat.order ? `<span style="font-size:0.72rem;color:var(--text-muted);font-weight:600;">#Thứ tự: ${cat.order}</span>` : ''}
          </div>
          <p class="subview-card-desc">${cat.desc || 'Danh mục phân loại thể loại văn học trong kho tác phẩm.'}</p>
          <div class="subview-card-actions">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByCategory('${cat.id}')" title="Xem tác phẩm thuộc thể loại này">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Tác phẩm (${count})</span>
            </button>
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditCategoryModal('${cat.id}')" title="Chỉnh sửa thể loại">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <span>Sửa</span>
            </button>
            <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.openDeleteCategoryModal('${cat.id}')" title="Xóa thể loại">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Xóa</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div class="subview-grid">
        ${cardsHtml}
      </div>
    `;
  }

  _renderAuthorsSubview() {
    if (!this.subviewPanel) return;

    this.authorViewMode = this.authorViewMode || 'list';
    this.authorOriginFilter = this.authorOriginFilter || 'all';
    const currentQ = (this.authorSearchQuery || '').toLowerCase().trim();

    // 1. Lọc tác giả theo xuất xứ (Tabs: Tất cả | Việt Nam | Quốc Tế)
    let originFiltered = this.authors;
    if (this.authorOriginFilter === 'vn') {
      originFiltered = originFiltered.filter(a => (a.country || '').toLowerCase().includes('việt nam'));
    } else if (this.authorOriginFilter === 'world') {
      originFiltered = originFiltered.filter(a => !(a.country || '').toLowerCase().includes('việt nam'));
    }

    // 2. Thống kê số lượng tác gia
    const totalAuthors = this.authors.length;
    const vnAuthorsCount = this.authors.filter(a => (a.country || '').toLowerCase().includes('việt nam')).length;
    const worldAuthorsCount = totalAuthors - vnAuthorsCount;

    // 3. Render Header Toolbar: Filter Pills, Search Bar, View Mode Toggle, Add Button
    const toolbarHtml = `
      <div class="authors-subview-toolbar" style="margin-bottom:1.15rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
        <!-- Nhóm Tabs Lọc Xuất Xứ -->
        <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
          <button type="button" class="filter-chip ${this.authorOriginFilter === 'all' ? 'active' : ''}" onclick="window.literaryAdmin.filterAuthorOrigin('all')" title="Xem tất cả tác gia">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span>Tất cả (${totalAuthors})</span>
          </button>
          <button type="button" class="filter-chip ${this.authorOriginFilter === 'vn' ? 'active' : ''}" onclick="window.literaryAdmin.filterAuthorOrigin('vn')" title="Chỉ xem tác gia Việt Nam">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            <span>Việt Nam (${vnAuthorsCount})</span>
          </button>
          <button type="button" class="filter-chip ${this.authorOriginFilter === 'world' ? 'active' : ''}" onclick="window.literaryAdmin.filterAuthorOrigin('world')" title="Chỉ xem tác gia quốc tế / thế giới">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>Thế Giới (${worldAuthorsCount})</span>
          </button>
        </div>

        <!-- Nhóm Công Cụ: Tìm Kiếm, Chuyển Dạng Xem (List / Grid), Nút Thêm -->
        <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
          <div class="admin-search-wrap" style="margin-bottom:0;width:230px;">
            <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="subview-author-search" class="admin-search-input" placeholder="Tìm tên, quê quán, thời kỳ..." value="${this.authorSearchQuery || ''}" oninput="window.literaryAdmin.filterAuthorRows(this.value)">
          </div>

          <!-- Nút chuyển đổi giao diện: Dạng List (Mặc định) / Dạng Lưới Thẻ -->
          <div class="admin-view-toggle" style="display:flex;align-items:center;border:1px solid var(--border-color);border-radius:var(--radius-sm);overflow:hidden;background:var(--bg-secondary);">
            <button type="button" class="view-toggle-btn ${this.authorViewMode === 'list' ? 'active' : ''}" onclick="window.literaryAdmin.setAuthorViewMode('list')" title="Hiển thị dạng danh sách chi tiết (List View)" style="padding:0.42rem 0.7rem;border:none;background:${this.authorViewMode === 'list' ? 'var(--bg-surface)' : 'transparent'};color:${this.authorViewMode === 'list' ? 'var(--cerulean-700)' : 'var(--text-muted)'};cursor:pointer;display:flex;align-items:center;gap:0.35rem;font-size:0.8rem;font-weight:600;box-shadow:${this.authorViewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'};">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:13px;height:13px"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              <span>Danh sách</span>
            </button>
            <button type="button" class="view-toggle-btn ${this.authorViewMode === 'grid' ? 'active' : ''}" onclick="window.literaryAdmin.setAuthorViewMode('grid')" title="Hiển thị dạng lưới thẻ (Grid Cards)" style="padding:0.42rem 0.7rem;border:none;background:${this.authorViewMode === 'grid' ? 'var(--bg-surface)' : 'transparent'};color:${this.authorViewMode === 'grid' ? 'var(--cerulean-700)' : 'var(--text-muted)'};cursor:pointer;display:flex;align-items:center;gap:0.35rem;font-size:0.8rem;font-weight:600;box-shadow:${this.authorViewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'};">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:13px;height:13px"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Lưới thẻ</span>
            </button>
          </div>

          <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewAuthorModal()" style="padding:0.42rem 0.85rem;font-size:0.82rem;">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:13px;height:13px"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Thêm tác giả</span>
          </button>
        </div>
      </div>
    `;

    // 4. Nếu ở chế độ DANH SÁCH (Bảng chi tiết - Mặc định theo yêu cầu)
    if (this.authorViewMode === 'list') {
      const rowsHtml = originFiltered.map(item => {
        const isVn = (item.country || '').toLowerCase().includes('việt nam');
        const originBadge = isVn
          ? `<span class="origin-badge origin-vn"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> <span>Việt Nam</span></span>`
          : `<span class="origin-badge origin-world"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>${item.country || 'Quốc tế'}</span></span>`;
        
        const authorWorks = this.works.filter(w => (w.author || '').trim().toLowerCase() === item.name.trim().toLowerCase());
        const count = authorWorks.length;
        const safeName = item.name.replace(/'/g, "\\'");
        const initials = item.avatarInitials || item.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase() || 'TG';
        const status = item.status || 'published';
        const statusLabel = status === 'published' ? 'Công bố' : (status === 'draft' ? 'Nháp' : 'Ẩn');
        const statusTitle = status === 'published' ? 'Đã công bố' : (status === 'draft' ? 'Bản nháp' : 'Tạm ẩn');
        const statusBadge = `<span class="subview-status-tag ${status}" title="Trạng thái: ${statusTitle}">${statusLabel}</span>`;

        const searchInfo = `${item.name} ${item.alias || ''} ${item.hometown || ''} ${item.style || ''} ${item.era || ''} ${item.country || ''} ${item.masterpieces || ''} ${item.awards || ''}`.toLowerCase();
        const isMatched = !currentQ || searchInfo.includes(currentQ);

        return `
          <tr class="admin-author-table-row" data-search-info="${searchInfo.replace(/"/g, '&quot;')}" data-author-name="${item.name.toLowerCase()}" style="${isMatched ? '' : 'display:none;'}">
            <td style="width:52px;text-align:center;">
              <div class="author-list-avatar" onclick="window.literaryAdmin.openAuthorDetailModal('${safeName}')" style="cursor:pointer;" title="Xem hồ sơ: ${item.name}">
                ${item.avatar ? `
                  <img src="${item.avatar}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                  <span style="display:none">${initials}</span>
                ` : `
                  <span>${initials}</span>
                `}
              </div>
            </td>
            <td>
              <div class="admin-author-table-name" onclick="window.literaryAdmin.openAuthorDetailModal('${safeName}')" title="Xem hồ sơ cuộc đời & sự nghiệp: ${item.name}">${item.name}</div>
              ${item.alias ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Bút danh: <span style="font-style:italic;color:var(--text-secondary);">${item.alias}</span></div>` : ''}
              ${item.awards ? `<div style="margin-top:3px;"><span class="badge-award" title="Giải thưởng & Vinh danh: ${item.awards}"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> <span>${item.awards}</span></span></div>` : ''}
            </td>
            <td>
              <div style="font-weight:600;font-size:0.85rem;color:var(--text-primary);">${item.years || '—'}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;display:flex;align-items:center;gap:4px;">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${item.era || '—'}</span>
              </div>
            </td>
            <td>
              <div style="font-size:0.82rem;color:var(--text-secondary);max-width:200px;line-height:1.35;display:flex;align-items:flex-start;gap:4px;" title="${item.hometown || 'Chưa cập nhật'}">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="margin-top:2px;color:var(--text-muted);"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${item.hometown ? item.hometown : '<span style="color:var(--text-muted);font-style:italic">—</span>'}</span>
              </div>
            </td>
            <td>${originBadge}</td>
            <td>
              ${item.style ? `<div style="font-size:0.8rem;color:var(--cerulean-700);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;display:flex;align-items:center;gap:4px;" title="Phong cách: ${item.style}">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                <span>${item.style}</span>
              </div>` : '<div style="color:var(--text-muted);font-size:0.8rem;font-style:italic">—</div>'}
              ${item.masterpieces ? `<div style="font-size:0.75rem;color:var(--text-muted);font-style:italic;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px;display:flex;align-items:center;gap:4px;" title="Kiệt tác tiêu biểu: ${item.masterpieces}">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span>${item.masterpieces}</span>
              </div>` : ''}
            </td>
            <td style="text-align:center;">
              <button type="button" class="author-works-count-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByAuthor('${safeName}')" title="Lọc các tác phẩm của tác giả '${item.name}' trong kho">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                <span>${count} tác phẩm</span>
              </button>
            </td>
            <td style="text-align:center;">${statusBadge}</td>
            <td style="text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:0.3rem;">
                <button type="button" class="admin-action-btn admin-action-view" onclick="event.stopPropagation(); window.literaryAdmin.openAuthorDetailModal('${safeName}')" title="Xem hồ sơ tiểu sử & sự nghiệp">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                <button type="button" class="admin-action-btn admin-action-edit" onclick="event.stopPropagation(); window.literaryAdmin.openEditAuthorModal('${safeName}')" title="Chỉnh sửa thông tin tác giả">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button type="button" class="admin-action-btn admin-action-delete" onclick="event.stopPropagation(); window.literaryAdmin.openDeleteAuthorModal('${safeName}')" title="Xóa tác giả khỏi danh mục">
                  <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      this.subviewPanel.innerHTML = `
        ${toolbarHtml}
        <div class="admin-table-container" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-sm);overflow-x:auto;">
          <table class="admin-authors-table">
            <thead>
              <tr>
                <th style="width:52px;text-align:center;">Chân Dung</th>
                <th>Tác Giả & Bút Danh</th>
                <th>Năm Sinh - Mất / Thời Kỳ</th>
                <th>Quê Quán / Nơi Sinh</th>
                <th>Xuất Xứ</th>
                <th>Phong Cách & Kiệt Tác</th>
                <th style="text-align:center;">Tác Phẩm</th>
                <th style="text-align:center;">Trạng Thái</th>
                <th style="text-align:center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
              <tr id="author-table-empty-row" style="display:${originFiltered.length === 0 ? '' : 'none'};">
                <td colspan="9" class="admin-authors-table-empty">
                  Không tìm thấy tác giả nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else {
      // 5. Nếu ở chế độ LƯỚI THẺ (Cards Grid)
      const cardsHtml = originFiltered.map(item => {
        const isVn = (item.country || '').toLowerCase().includes('việt nam');
        const originBadge = isVn
          ? `<span class="origin-badge origin-vn"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> <span>Việt Nam</span></span>`
          : `<span class="origin-badge origin-world"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>${item.country || 'Quốc tế'}</span></span>`;
        const isActive = this.activeAuthorFilter === item.name;
        const authorWorks = this.works.filter(w => (w.author || '').trim().toLowerCase() === item.name.trim().toLowerCase());
        const count = authorWorks.length;
        const safeName = item.name.replace(/'/g, "\\'");
        const initials = item.avatarInitials || item.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase() || 'TG';
        const status = item.status || 'published';
        const statusLabel = status === 'published' ? 'Công bố' : (status === 'draft' ? 'Nháp' : 'Ẩn');
        const statusTitle = status === 'published' ? 'Đã công bố' : (status === 'draft' ? 'Bản nháp' : 'Tạm ẩn');
        const statusBadge = `<span class="subview-status-tag ${status}" title="Trạng thái: ${statusTitle}">${statusLabel}</span>`;

        const searchInfo = `${item.name} ${item.alias || ''} ${item.hometown || ''} ${item.style || ''} ${item.era || ''} ${item.country || ''} ${item.masterpieces || ''} ${item.awards || ''}`.toLowerCase();
        const isMatched = !currentQ || searchInfo.includes(currentQ);

        return `
          <div class="subview-card author-card-item ${isActive ? 'active' : ''}" data-search-info="${searchInfo.replace(/"/g, '&quot;')}" data-author-name="${item.name.toLowerCase()}" onclick="window.literaryAdmin.filterByAuthor('${safeName}')" style="${isMatched ? 'display:flex;' : 'display:none;'}">
            <div class="subview-card-top">
              <div style="display:flex;align-items:center;gap:0.65rem;">
                <div class="subview-author-avatar-wrap">
                  ${item.avatar ? `
                    <img src="${item.avatar}" alt="${item.name}" class="subview-author-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                    <span class="subview-author-initials-text" style="display:none">${initials}</span>
                  ` : `
                    <span class="subview-author-initials-text">${initials}</span>
                  `}
                </div>
                <div>
                  <h4 class="subview-card-title">${item.name}</h4>
                  ${item.alias ? `<div style="font-size:0.75rem;color:var(--text-muted);font-style:italic">(${item.alias})</div>` : ''}
                </div>
              </div>
              <span class="subview-card-count">${count} tác phẩm</span>
            </div>
            <div class="subview-author-meta" style="display:flex;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-top:0.35rem">
              <span>${originBadge}</span>
              ${item.hometown ? `<span style="display:inline-flex;align-items:center;gap:3px;" title="Quê quán: ${item.hometown}"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>${item.hometown}</span></span>` : ''}
              ${item.years ? `<span style="display:inline-flex;align-items:center;gap:3px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span>${item.years}</span></span>` : (item.era ? `<span>· ${item.era}</span>` : '')}
              ${statusBadge}
            </div>
            ${item.awards ? `<div style="margin-top:0.3rem;"><span class="badge-award" title="${item.awards}"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> <span>${item.awards}</span></span></div>` : ''}
            ${item.style ? `<div style="font-size:0.75rem;color:var(--cerulean-700);margin-top:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:4px;" title="Phong cách: ${item.style}"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg> <span>${item.style}</span></div>` : ''}
            ${item.masterpieces ? `<div style="font-size:0.78rem;color:var(--text-muted);font-style:italic;margin-top:0.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:4px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> <span>Kiệt tác: ${item.masterpieces}</span></div>` : ''}
            <div class="subview-card-actions">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openAuthorDetailModal('${safeName}')" title="Xem hồ sơ cuộc đời & sự nghiệp">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>Hồ sơ</span>
              </button>
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditAuthorModal('${safeName}')" title="Chỉnh sửa thông tin tác giả">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.openDeleteAuthorModal('${safeName}')" title="Xóa tác giả khỏi danh mục">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                <span>Xóa</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      this.subviewPanel.innerHTML = `
        ${toolbarHtml}
        <div class="subview-grid" id="subview-authors-grid">
          ${cardsHtml}
          <div id="author-grid-empty-msg" style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic;display:${originFiltered.length === 0 ? 'block' : 'none'};">
            Không tìm thấy tác giả nào phù hợp với bộ lọc hiện tại.
          </div>
        </div>
      `;
    }
  }

  setAuthorViewMode(mode) {
    this.authorViewMode = mode;
    this._renderAuthorsSubview();
  }

  filterAuthorOrigin(origin) {
    this.authorOriginFilter = origin;
    this._renderAuthorsSubview();
  }

  filterAuthorRows(keyword) {
    const q = (keyword || '').toLowerCase().trim();
    this.authorSearchQuery = keyword || '';

    // Đồng bộ giá trị tìm kiếm giữa header và thanh công cụ subview
    const headerInput = document.getElementById('header-author-search');
    const inlineInput = document.getElementById('subview-author-search');
    if (headerInput && headerInput.value !== keyword) headerInput.value = keyword || '';
    if (inlineInput && inlineInput.value !== keyword) inlineInput.value = keyword || '';

    // 1. Lọc bảng danh sách (Table Rows)
    const rows = document.querySelectorAll('.admin-author-table-row');
    let visibleRows = 0;
    rows.forEach(row => {
      const searchInfo = row.dataset.searchInfo || '';
      const match = !q || searchInfo.includes(q);
      row.style.display = match ? '' : 'none';
      if (match) visibleRows++;
    });

    const emptyRow = document.getElementById('author-table-empty-row');
    if (emptyRow) {
      emptyRow.style.display = (rows.length > 0 && visibleRows === 0) ? '' : 'none';
    }

    // 2. Lọc lưới thẻ (Cards Grid)
    const cards = document.querySelectorAll('.author-card-item');
    let visibleCards = 0;
    cards.forEach(card => {
      const searchInfo = card.dataset.searchInfo || card.dataset.authorName || '';
      const match = !q || searchInfo.includes(q);
      card.style.display = match ? 'flex' : 'none';
      if (match) visibleCards++;
    });

    const emptyGrid = document.getElementById('author-grid-empty-msg');
    if (emptyGrid) {
      emptyGrid.style.display = (cards.length > 0 && visibleCards === 0) ? 'block' : 'none';
    }
  }

  filterAuthorCards(keyword) {
    this.filterAuthorRows(keyword);
  }

  _renderOriginsSubview() {
    if (!this.subviewPanel) return;

    const vnWorks = this.works.filter(w => w.origin === 'vn');
    const worldWorks = this.works.filter(w => w.origin === 'world');

    const vnOrigins = this.origins.filter(o => o.region === 'vn');
    const worldOrigins = this.origins.filter(o => o.region !== 'vn');

    const renderChipRow = (o) => {
      const safeCountry = o.country.replace(/'/g, "\\'");
      const isCountryActive = this.activeOriginFilter === o.country;
      const count = o.region === 'vn'
        ? vnWorks.length
        : this.works.filter(w => (w.country || '').trim().toLowerCase() === o.country.trim().toLowerCase()).length;

      const infoParts = [];
      if (o.language) infoParts.push(`Ngôn ngữ: ${o.language}`);
      if (o.keyAuthors) infoParts.push(`Tác giả: ${o.keyAuthors}`);
      if (o.desc) infoParts.push(o.desc);
      const titleAttr = infoParts.join(' • ') || o.country;

      return `
        <div class="origin-chip-row ${isCountryActive ? 'active' : ''}">
          <button type="button" class="origin-chip-btn" onclick="window.literaryAdmin.filterByOrigin('country', '${safeCountry}')" title="${titleAttr}">
            <span class="origin-chip-flag">${o.flag || '🌐'}</span>
            <span class="origin-chip-name">${o.country}</span>
            ${o.id ? `<span style="font-size:0.68rem;opacity:0.6;font-family:var(--font-mono, monospace);">#${o.id}</span>` : ''}
            <span style="opacity:0.65;font-size:0.75rem">(${count})</span>
          </button>
          <div class="origin-chip-actions">
            <button type="button" class="origin-chip-action-icon" onclick="event.stopPropagation(); window.literaryAdmin.openEditOriginModal('${safeCountry}')" title="Sửa xuất xứ ${o.country}">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button type="button" class="origin-chip-action-icon danger" onclick="event.stopPropagation(); window.literaryAdmin.openDeleteOriginModal('${safeCountry}')" title="Xóa xuất xứ ${o.country}">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:11px;height:11px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      `;
    };

    const vnChipsHtml = vnOrigins.length > 0
      ? vnOrigins.map(renderChipRow).join('')
      : `<span style="font-size:0.85rem;color:var(--text-muted);font-style:italic">Chưa có mục xuất xứ Việt Nam riêng biệt.</span>`;

    const worldChipsHtml = worldOrigins.length > 0
      ? worldOrigins.map(renderChipRow).join('')
      : `<span style="font-size:0.85rem;color:var(--text-muted);font-style:italic">Chưa có quốc gia nào được thêm.</span>`;

    this.subviewPanel.innerHTML = `
      <div class="subview-origin-grid">
        <!-- Khối Văn học Việt Nam -->
        <div class="origin-block">
          <div class="origin-block-header">
            <h4 class="origin-block-title" style="display:flex;align-items:center;gap:0.5rem">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="color:var(--jasper-600);"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              <span>Văn Học Việt Nam</span>
            </h4>
            <span class="subview-card-count">${vnWorks.length} tác phẩm</span>
          </div>
          <p style="font-size:0.83rem;color:var(--text-secondary);margin:0 0 0.8rem 0;line-height:1.5">
            Dòng chảy văn học dân tộc từ trung đại chữ Hán Nôm đến hiện thực 1930–1945, thơ kháng chiến ái quốc và văn học đổi mới.
          </p>
          <div class="origin-chips-list" style="margin-bottom:1rem">
            ${vnChipsHtml}
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            <button type="button" class="btn-editorial-primary origin-block-btn" onclick="window.literaryAdmin.filterByOrigin('region', 'vn')">
              <span>Lọc tác phẩm Việt Nam (${vnWorks.length})</span>
            </button>
            <button type="button" class="btn-editorial-secondary origin-block-btn" onclick="window.literaryAdmin.openNewOriginModal('vn')">
              <span>+ Thêm nhánh xuất xứ VN</span>
            </button>
          </div>
        </div>

        <!-- Khối Văn học Thế Giới -->
        <div class="origin-block">
          <div class="origin-block-header">
            <h4 class="origin-block-title" style="display:flex;align-items:center;gap:0.5rem">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="color:var(--cerulean-600);"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>Văn Học Thế Giới</span>
            </h4>
            <span class="subview-card-count">${worldWorks.length} tác phẩm</span>
          </div>
          <p style="font-size:0.83rem;color:var(--text-secondary);margin:0 0 0.8rem 0;line-height:1.5">
            Tuyển tập tinh hoa văn học các cường quốc và vùng lãnh thổ: Nga, Pháp, Mỹ, Colombia, Tây Ban Nha, Trung Quốc, Séc, Kyrgyzstan...
          </p>
          <div class="origin-chips-list" style="margin-bottom:1rem">
            ${worldChipsHtml}
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            <button type="button" class="btn-editorial-secondary origin-block-btn" onclick="window.literaryAdmin.filterByOrigin('region', 'world')">
              <span>Lọc văn học Thế Giới (${worldWorks.length})</span>
            </button>
            <button type="button" class="btn-editorial-primary origin-block-btn" onclick="window.literaryAdmin.openNewOriginModal('world')">
              <span>+ Thêm quốc gia / xuất xứ</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // CRUD THỂ LOẠI (CATEGORIES)
  // ==========================================
  openNewCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    const modeEl = document.getElementById('cat-form-mode');
    const origIdEl = document.getElementById('cat-original-id');
    const titleEl = document.getElementById('category-modal-title');
    const nameEl = document.getElementById('cat-title');
    const idEl = document.getElementById('cat-id');
    const parentEl = document.getElementById('cat-parent');
    const iconEl = document.getElementById('cat-icon');
    const orderEl = document.getElementById('cat-order');
    const statusEl = document.getElementById('cat-status');
    const filterEl = document.getElementById('cat-filter-key');
    const descEl = document.getElementById('cat-desc');

    if (modeEl) modeEl.value = 'create';
    if (origIdEl) origIdEl.value = '';
    if (titleEl) titleEl.textContent = 'Thêm Thể Loại Mới';
    if (nameEl) nameEl.value = '';
    if (idEl) idEl.value = '';
    if (parentEl) parentEl.value = '';
    if (iconEl) iconEl.value = '';
    if (orderEl) orderEl.value = (this.categories.length + 1);
    if (statusEl) statusEl.value = 'published';
    if (filterEl) filterEl.value = '';
    if (descEl) descEl.value = '';

    modal.classList.add('active');
    setTimeout(() => nameEl?.focus(), 100);
  }

  openEditCategoryModal(id) {
    const cat = this.categories.find(c => c.id === id);
    if (!cat) {
      this.showToast('Không tìm thấy thể loại.', 'error');
      return;
    }
    const modal = document.getElementById('category-modal');
    if (!modal) return;

    const modeEl = document.getElementById('cat-form-mode');
    const origIdEl = document.getElementById('cat-original-id');
    const titleEl = document.getElementById('category-modal-title');
    const nameEl = document.getElementById('cat-title');
    const idEl = document.getElementById('cat-id');
    const parentEl = document.getElementById('cat-parent');
    const iconEl = document.getElementById('cat-icon');
    const orderEl = document.getElementById('cat-order');
    const statusEl = document.getElementById('cat-status');
    const filterEl = document.getElementById('cat-filter-key');
    const descEl = document.getElementById('cat-desc');

    if (modeEl) modeEl.value = 'edit';
    if (origIdEl) origIdEl.value = cat.id;
    if (titleEl) titleEl.textContent = `Chỉnh Sửa: ${cat.title}`;
    if (nameEl) nameEl.value = cat.title || '';
    if (idEl) idEl.value = cat.id || '';
    if (parentEl) parentEl.value = cat.parentId || '';
    if (iconEl) iconEl.value = cat.icon || '';
    if (orderEl) orderEl.value = cat.order || 1;
    if (statusEl) statusEl.value = cat.status || 'published';
    if (filterEl) filterEl.value = cat.filterKey || '';
    if (descEl) descEl.value = cat.desc || '';

    modal.classList.add('active');
  }

  closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    modal.classList.remove('active');
  }

  saveCategory() {
    const mode = document.getElementById('cat-form-mode')?.value || 'create';
    const originalId = document.getElementById('cat-original-id')?.value || '';
    const title = (document.getElementById('cat-title')?.value || '').trim();
    let id = (document.getElementById('cat-id')?.value || '').trim();
    const parentId = (document.getElementById('cat-parent')?.value || '').trim();
    const icon = (document.getElementById('cat-icon')?.value || '').trim();
    const order = parseInt(document.getElementById('cat-order')?.value, 10) || 1;
    const status = (document.getElementById('cat-status')?.value || 'published').trim();
    const filterKey = (document.getElementById('cat-filter-key')?.value || '').trim();
    const desc = (document.getElementById('cat-desc')?.value || '').trim();

    if (!title) {
      this.showToast('Vui lòng nhập tên thể loại.', 'warning');
      document.getElementById('cat-title')?.focus();
      return;
    }

    if (!id) {
      id = title.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const item = {
      id,
      title,
      parentId,
      icon,
      order,
      status,
      filterKey: filterKey || title.toLowerCase(),
      desc
    };

    if (mode === 'edit') {
      const idx = this.categories.findIndex(c => c.id === originalId);
      if (idx >= 0) {
        this.categories[idx] = item;
      } else {
        this.categories.push(item);
      }
    } else {
      const existingIdx = this.categories.findIndex(c => c.id === id);
      if (existingIdx >= 0) {
        this.categories[existingIdx] = item;
      } else {
        this.categories.push(item);
      }
    }

    try {
      localStorage.setItem('van_uyen_custom_categories', JSON.stringify(this.categories));
      if (window.firebaseService && typeof window.firebaseService.saveCategory === 'function') {
        window.firebaseService.saveCategory(item).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi lưu danh mục thể loại:", e);
    }

    this.closeCategoryModal();
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'categories') {
      this._renderCategoriesSubview();
    }
    this.renderTable();
    this.showToast(`Đã lưu thể loại "${title}" thành công!`, 'success');
  }

  openDeleteCategoryModal(id) {
    const cat = this.categories.find(c => c.id === id);
    if (!cat) return;
    this.pendingDeleteCategoryId = id;
    const modal = document.getElementById('category-delete-modal');
    const msgEl = document.getElementById('cat-delete-msg');
    if (msgEl) {
      msgEl.innerHTML = `Bạn có chắc chắn muốn xóa thể loại "<strong>${cat.title}</strong>" khỏi danh mục hệ thống?`;
    }
    if (modal) modal.classList.add('active');
  }

  confirmDeleteCategory() {
    if (!this.pendingDeleteCategoryId) return;
    const id = this.pendingDeleteCategoryId;
    this.categories = this.categories.filter(c => c.id !== id);

    try {
      localStorage.setItem('van_uyen_custom_categories', JSON.stringify(this.categories));
      if (window.firebaseService && typeof window.firebaseService.deleteCategory === 'function') {
        window.firebaseService.deleteCategory(id).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi cập nhật xóa thể loại:", e);
    }

    this.closeCategoryDeleteModal();
    if (this.activeCategoryFilter === id) {
      this.activeCategoryFilter = null;
    }
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'categories') {
      this._renderCategoriesSubview();
    }
    this.renderTable();
    this.showToast('Đã xóa thể loại khỏi danh mục.', 'info');
  }

  closeCategoryDeleteModal() {
    this.pendingDeleteCategoryId = null;
    const modal = document.getElementById('category-delete-modal');
    if (modal) modal.classList.remove('active');
  }

  // ==========================================
  // CRUD TÁC GIẢ (AUTHORS) - NÂNG CẤP CHÂN DUNG, QUÊ QUÁN, PHONG CÁCH, GIẢI THƯỞNG, TRẠNG THÁI & SEO
  // ==========================================
  openNewAuthorModal() {
    const modal = document.getElementById('author-modal');
    if (!modal) return;
    const modeEl = document.getElementById('author-form-mode');
    const origNameEl = document.getElementById('author-original-name');
    const titleEl = document.getElementById('author-modal-title');
    const nameEl = document.getElementById('author-name');
    const idEl = document.getElementById('author-id');
    const aliasEl = document.getElementById('author-alias');
    const yearsEl = document.getElementById('author-years');
    const countryEl = document.getElementById('author-country');
    const eraEl = document.getElementById('author-era');
    const initialsEl = document.getElementById('author-initials');
    const masterEl = document.getElementById('author-masterpieces');
    const bioEl = document.getElementById('author-bio');
    const hometownEl = document.getElementById('author-hometown');
    const styleEl = document.getElementById('author-style');
    const awardsEl = document.getElementById('author-awards');
    const seoTitleEl = document.getElementById('author-seo-title');
    const seoDescEl = document.getElementById('author-seo-desc');
    const seoKeywordsEl = document.getElementById('author-seo-keywords');
    const avatarUrlEl = document.getElementById('author-avatar-url');
    const avatarDataEl = document.getElementById('author-avatar-data');

    if (modeEl) modeEl.value = 'create';
    if (origNameEl) origNameEl.value = '';
    if (titleEl) titleEl.textContent = 'Thêm Tác GiẢ Mới';
    if (nameEl) nameEl.value = '';
    if (idEl) {
      idEl.value = '';
      delete idEl.dataset.customized;
    }
    if (aliasEl) aliasEl.value = '';
    if (yearsEl) yearsEl.value = '';
    if (countryEl) countryEl.value = 'Việt Nam';
    if (eraEl) eraEl.value = '';
    if (initialsEl) initialsEl.value = '';
    if (masterEl) masterEl.value = '';
    if (bioEl) bioEl.value = '';
    if (hometownEl) hometownEl.value = '';
    if (styleEl) styleEl.value = '';
    if (awardsEl) awardsEl.value = '';
    if (seoTitleEl) seoTitleEl.value = '';
    if (seoDescEl) seoDescEl.value = '';
    if (seoKeywordsEl) seoKeywordsEl.value = '';
    if (avatarUrlEl) avatarUrlEl.value = '';
    if (avatarDataEl) avatarDataEl.value = '';

    // Trạng thái mặc định: published
    const statusRadio = document.querySelector('input[name="author-publish-status"][value="published"]');
    if (statusRadio) statusRadio.checked = true;

    // Reset avatar preview
    this.removeAuthorAvatar();
    const initialsPreview = document.getElementById('author-avatar-initials-preview');
    if (initialsPreview) initialsPreview.textContent = 'TG';

    // Đóng panel SEO và cập nhật preview Google
    const seoBox = document.querySelector('.author-seo-box');
    const seoBody = document.getElementById('author-seo-body');
    if (seoBox) seoBox.classList.remove('open');
    if (seoBody) seoBody.style.display = 'none';
    this.updateAuthorSeoPreview();

    modal.classList.add('active');
    setTimeout(() => nameEl?.focus(), 100);
  }

  openEditAuthorModal(idOrName) {
    const q = (idOrName || '').trim().toLowerCase();
    const author = this.authors.find(a => a.name.trim().toLowerCase() === q || (a.id && a.id.toLowerCase() === q));
    if (!author) {
      this.showToast('Không tìm thấy tác giả.', 'error');
      return;
    }

    const modal = document.getElementById('author-modal');
    if (!modal) return;

    const modeEl = document.getElementById('author-form-mode');
    const origNameEl = document.getElementById('author-original-name');
    const titleEl = document.getElementById('author-modal-title');
    const nameEl = document.getElementById('author-name');
    const idEl = document.getElementById('author-id');
    const aliasEl = document.getElementById('author-alias');
    const yearsEl = document.getElementById('author-years');
    const countryEl = document.getElementById('author-country');
    const eraEl = document.getElementById('author-era');
    const initialsEl = document.getElementById('author-initials');
    const masterEl = document.getElementById('author-masterpieces');
    const bioEl = document.getElementById('author-bio');
    const hometownEl = document.getElementById('author-hometown');
    const styleEl = document.getElementById('author-style');
    const awardsEl = document.getElementById('author-awards');
    const seoTitleEl = document.getElementById('author-seo-title');
    const seoDescEl = document.getElementById('author-seo-desc');
    const seoKeywordsEl = document.getElementById('author-seo-keywords');
    const avatarUrlEl = document.getElementById('author-avatar-url');
    const avatarDataEl = document.getElementById('author-avatar-data');

    if (modeEl) modeEl.value = 'edit';
    if (origNameEl) origNameEl.value = author.name;
    if (titleEl) titleEl.textContent = `Chỉnh Sửa Tác Giả: ${author.name}`;
    if (nameEl) nameEl.value = author.name || '';
    if (idEl) {
      idEl.value = author.id || '';
      idEl.dataset.customized = 'true';
    }
    if (aliasEl) aliasEl.value = author.alias || '';
    if (yearsEl) yearsEl.value = author.years || '';
    if (countryEl) countryEl.value = author.country || 'Việt Nam';
    if (eraEl) eraEl.value = author.era || '';
    if (initialsEl) initialsEl.value = author.avatarInitials || '';
    if (masterEl) masterEl.value = author.masterpieces || '';
    if (bioEl) bioEl.value = author.bio || '';
    if (hometownEl) hometownEl.value = author.hometown || '';
    if (styleEl) styleEl.value = author.style || '';
    if (awardsEl) awardsEl.value = author.awards || '';
    if (seoTitleEl) seoTitleEl.value = author.seoTitle || '';
    if (seoDescEl) seoDescEl.value = author.seoDesc || '';
    if (seoKeywordsEl) seoKeywordsEl.value = author.seoKeywords || '';
    if (avatarUrlEl) avatarUrlEl.value = author.avatar || '';
    if (avatarDataEl) avatarDataEl.value = author.avatar || '';

    // Trạng thái hiển thị
    const st = author.status || 'published';
    const statusRadio = document.querySelector(`input[name="author-publish-status"][value="${st}"]`);
    if (statusRadio) statusRadio.checked = true;

    // Chân dung đại diện
    const initials = author.avatarInitials || author.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase() || 'TG';
    const initialsPreview = document.getElementById('author-avatar-initials-preview');
    if (initialsPreview) initialsPreview.textContent = initials;

    const previewImg = document.getElementById('author-avatar-preview');
    const fallbackBox = document.getElementById('author-avatar-fallback');
    const removeBtn = document.getElementById('btn-remove-author-avatar');
    if (author.avatar) {
      if (previewImg) {
        previewImg.src = author.avatar;
        previewImg.style.display = 'block';
      }
      if (fallbackBox) fallbackBox.style.display = 'none';
      if (removeBtn) removeBtn.style.display = 'inline-flex';
    } else {
      if (previewImg) previewImg.style.display = 'none';
      if (fallbackBox) fallbackBox.style.display = 'flex';
      if (removeBtn) removeBtn.style.display = 'none';
    }

    // Đóng panel SEO và cập nhật preview Google
    const seoBox = document.querySelector('.author-seo-box');
    const seoBody = document.getElementById('author-seo-body');
    if (seoBox) seoBox.classList.remove('open');
    if (seoBody) seoBody.style.display = 'none';
    this.updateAuthorSeoPreview();

    modal.classList.add('active');
  }

  handleAuthorNameInput(name) {
    const mode = document.getElementById('author-form-mode')?.value || 'create';
    const idEl = document.getElementById('author-id');
    const initialsEl = document.getElementById('author-initials');
    const initialsPreview = document.getElementById('author-avatar-initials-preview');

    // Tự động sinh ID Slug nếu đang thêm mới hoặc ID chưa được can thiệp thủ công
    if (idEl && (mode === 'create' || !idEl.dataset.customized)) {
      idEl.value = this._slugify(name);
    }

    // Tự động gợi ý ký tự tắt (initials)
    const initials = name.trim().split(/\s+/).map(p => p[0]).join('').slice(0, 3).toUpperCase() || 'TG';
    if (initialsPreview) {
      initialsPreview.textContent = initialsEl && initialsEl.value ? initialsEl.value : initials;
    }

    this.updateAuthorSeoPreview();
  }

  async handleAuthorAvatarFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      this.showToast('Vui lòng chọn tệp hình ảnh (.jpg, .png, .webp)!', 'warning');
      return;
    }

    const previewImg = document.getElementById('author-avatar-preview');
    const fallbackBox = document.getElementById('author-avatar-fallback');
    const avatarDataEl = document.getElementById('author-avatar-data');
    const avatarUrlEl = document.getElementById('author-avatar-url');
    const statusEl = document.getElementById('author-avatar-status');
    const removeBtn = document.getElementById('btn-remove-author-avatar');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      if (previewImg) {
        previewImg.src = dataUrl;
        previewImg.style.display = 'block';
      }
      if (fallbackBox) fallbackBox.style.display = 'none';
      if (avatarDataEl) avatarDataEl.value = dataUrl;
      if (removeBtn) removeBtn.style.display = 'inline-flex';

      if (statusEl) {
        statusEl.innerHTML = `
          <span style="color:var(--cerulean-600);font-size:0.75rem;display:inline-flex;align-items:center;gap:0.3rem">
            <svg class="editorial-icon icon-sm spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="4" fill="none"></circle></svg>
            Đang tải ảnh lên máy chủ...
          </span>
        `;
      }

      const authorId = document.getElementById('author-id')?.value || this._slugify(document.getElementById('author-name')?.value || 'author');
      const uploadUrl = (window.location.protocol === 'http:' && window.location.port === '3000')
        ? '/api/upload'
        : 'http://127.0.0.1:3000/api/upload';

      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authorId: authorId,
            type: 'author',
            fileName: file.name,
            fileData: dataUrl
          })
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.filePath) {
            if (avatarDataEl) avatarDataEl.value = resData.filePath;
            if (avatarUrlEl) avatarUrlEl.value = resData.filePath;
            if (statusEl) {
              statusEl.innerHTML = `<span style="color:#059669;font-size:0.75rem;font-weight:600">✓ Đã lưu vào dự án (${resData.filePath})</span>`;
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Upload API không phản hồi, lưu ảnh dạng Base64:', err);
      }

      if (statusEl) {
        statusEl.innerHTML = `<span style="color:var(--text-muted);font-size:0.75rem">Đã lưu ảnh cục bộ (Base64)</span>`;
      }
    };
    reader.readAsDataURL(file);
  }

  handleAuthorAvatarUrlInput(url) {
    const previewImg = document.getElementById('author-avatar-preview');
    const fallbackBox = document.getElementById('author-avatar-fallback');
    const avatarDataEl = document.getElementById('author-avatar-data');
    const removeBtn = document.getElementById('btn-remove-author-avatar');
    const trimmed = (url || '').trim();

    if (trimmed) {
      if (previewImg) {
        previewImg.src = trimmed;
        previewImg.style.display = 'block';
        previewImg.onerror = () => {
          previewImg.style.display = 'none';
          if (fallbackBox) fallbackBox.style.display = 'flex';
        };
      }
      if (fallbackBox) fallbackBox.style.display = 'none';
      if (avatarDataEl) avatarDataEl.value = trimmed;
      if (removeBtn) removeBtn.style.display = 'inline-flex';
    } else {
      this.removeAuthorAvatar();
    }
  }

  removeAuthorAvatar() {
    const previewImg = document.getElementById('author-avatar-preview');
    const fallbackBox = document.getElementById('author-avatar-fallback');
    const avatarDataEl = document.getElementById('author-avatar-data');
    const avatarUrlEl = document.getElementById('author-avatar-url');
    const statusEl = document.getElementById('author-avatar-status');
    const removeBtn = document.getElementById('btn-remove-author-avatar');
    const fileInput = document.getElementById('author-avatar-file-input');

    if (previewImg) {
      previewImg.src = '';
      previewImg.style.display = 'none';
    }
    if (fallbackBox) fallbackBox.style.display = 'flex';
    if (avatarDataEl) avatarDataEl.value = '';
    if (avatarUrlEl) avatarUrlEl.value = '';
    if (statusEl) statusEl.innerHTML = '';
    if (removeBtn) removeBtn.style.display = 'none';
    if (fileInput) fileInput.value = '';
  }

  insertAuthorStyleTag(tag) {
    const styleEl = document.getElementById('author-style');
    if (!styleEl) return;
    const current = (styleEl.value || '').trim();
    if (!current) {
      styleEl.value = tag;
    } else if (!current.toLowerCase().includes(tag.toLowerCase())) {
      styleEl.value = `${current}, ${tag}`;
    }
    styleEl.focus();
    this.updateAuthorSeoPreview();
  }

  insertAuthorAwardTag(tag) {
    const awardsEl = document.getElementById('author-awards');
    if (!awardsEl) return;
    const current = (awardsEl.value || '').trim();
    if (!current) {
      awardsEl.value = tag;
    } else if (!current.toLowerCase().includes(tag.toLowerCase())) {
      awardsEl.value = `${current}; ${tag}`;
    }
    awardsEl.focus();
    this.updateAuthorSeoPreview();
  }

  toggleAuthorSeoPanel() {
    const seoBox = document.querySelector('.author-seo-box');
    const seoBody = document.getElementById('author-seo-body');
    if (!seoBox || !seoBody) return;
    const isOpen = seoBox.classList.toggle('open');
    seoBody.style.display = isOpen ? 'block' : 'none';
    if (isOpen) {
      this.updateAuthorSeoPreview();
    }
  }

  generateAuthorSEO() {
    const name = (document.getElementById('author-name')?.value || '').trim();
    const alias = (document.getElementById('author-alias')?.value || '').trim();
    const years = (document.getElementById('author-years')?.value || '').trim();
    const hometown = (document.getElementById('author-hometown')?.value || '').trim();
    const era = (document.getElementById('author-era')?.value || '').trim();
    const style = (document.getElementById('author-style')?.value || '').trim();
    const masterpieces = (document.getElementById('author-masterpieces')?.value || '').trim();

    if (!name) {
      this.showToast('Vui lòng nhập tên tác giả trước khi tạo SEO.', 'warning');
      document.getElementById('author-name')?.focus();
      return;
    }

    const titleEl = document.getElementById('author-seo-title');
    const descEl = document.getElementById('author-seo-desc');
    const kwEl = document.getElementById('author-seo-keywords');

    const autoTitle = `Tác giả ${name} - Cuộc đời, sự nghiệp & kiệt tác | Văn Uyển`;
    let autoDesc = `Tìm hiểu cuộc đời và sự nghiệp tác giả ${name}${alias ? ` (${alias})` : ''}${years ? ` (${years})` : ''}${hometown ? `, quê quán tại ${hometown}` : ''}.`;
    if (style) autoDesc += ` Phong cách nghệ thuật: ${style}.`;
    if (masterpieces) autoDesc += ` Kiệt tác tiêu biểu: ${masterpieces}.`;
    autoDesc += ` Tư liệu giảng dạy Ngữ văn chuẩn mực.`;

    const kwList = [
      `tác giả ${name.toLowerCase()}`,
      name.toLowerCase(),
      alias ? alias.toLowerCase() : '',
      hometown ? `quê quán ${hometown.toLowerCase()}` : '',
      era ? era.toLowerCase() : '',
      'văn học việt nam'
    ].filter(Boolean);

    if (titleEl) titleEl.value = autoTitle.slice(0, 70);
    if (descEl) descEl.value = autoDesc.slice(0, 160);
    if (kwEl) kwEl.value = kwList.join(', ');

    // Mở panel SEO nếu đang đóng
    const seoBox = document.querySelector('.author-seo-box');
    const seoBody = document.getElementById('author-seo-body');
    if (seoBox) seoBox.classList.add('open');
    if (seoBody) seoBody.style.display = 'block';

    this.updateAuthorSeoPreview();
    this.showToast('Đã tự động tạo tiêu đề, mô tả và từ khóa SEO chuẩn Google!', 'success');
  }

  updateAuthorSeoPreview() {
    const name = (document.getElementById('author-name')?.value || '').trim() || 'Tên Tác Giả';
    const id = (document.getElementById('author-id')?.value || '').trim() || this._slugify(name) || 'tac-gia';
    const seoTitle = (document.getElementById('author-seo-title')?.value || '').trim();
    const seoDesc = (document.getElementById('author-seo-desc')?.value || '').trim();

    // Counters
    const titleCountEl = document.getElementById('author-seo-title-count');
    const descCountEl = document.getElementById('author-seo-desc-count');
    if (titleCountEl) titleCountEl.textContent = `${seoTitle.length}/60`;
    if (descCountEl) descCountEl.textContent = `${seoDesc.length}/160`;

    // Google Preview Card
    const previewUrl = document.getElementById('google-preview-url-text');
    const previewTitle = document.getElementById('google-preview-title-text');
    const previewDesc = document.getElementById('google-preview-desc-text');

    if (previewUrl) {
      previewUrl.textContent = `https://vanuyen.edu.vn › tac-gia › ${id}`;
    }
    if (previewTitle) {
      previewTitle.textContent = seoTitle || `Tác giả ${name} - Cuộc đời, sự nghiệp và kiệt tác | Văn Uyển`;
    }
    if (previewDesc) {
      previewDesc.textContent = seoDesc || `Khám phá tiểu sử, quê quán, phong cách nghệ thuật và các kiệt tác văn học tiêu biểu của tác giả ${name}...`;
    }
  }

  openAuthorDetailModal(idOrName) {
    const q = (idOrName || '').trim().toLowerCase();
    const author = this.authors.find(a => a.name.trim().toLowerCase() === q || (a.id && a.id.toLowerCase() === q));
    if (!author) {
      this.showToast('Không tìm thấy thông tin tác giả.', 'error');
      return;
    }

    const modal = document.getElementById('author-detail-modal');
    const titleEl = document.getElementById('author-detail-title');
    const bodyEl = document.getElementById('author-detail-body');
    const editBtn = document.getElementById('btn-edit-from-author-detail');
    if (!modal || !bodyEl) return;

    if (titleEl) titleEl.textContent = `Hồ Sơ: ${author.name}`;
    if (editBtn) {
      editBtn.onclick = () => {
        this.closeAuthorDetailModal();
        this.openEditAuthorModal(author.name);
      };
    }

    const initials = author.avatarInitials || author.name.split(' ').map(p => p[0]).join('').slice(0, 3).toUpperCase() || 'TG';
    const isVn = (author.country || '').toLowerCase().includes('việt nam');
    const originTag = isVn
      ? `<span class="origin-badge origin-vn"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> <span>Việt Nam</span></span>`
      : `<span class="origin-badge origin-world"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> <span>${author.country || 'Quốc tế'}</span></span>`;
    const authorWorks = this.works.filter(w => (w.author || '').trim().toLowerCase() === author.name.trim().toLowerCase());

    const status = author.status || 'published';
    const statusLabel = status === 'published' ? 'Đã công bố' : (status === 'draft' ? 'Bản nháp' : 'Tạm ẩn');
    const statusPill = `<span class="subview-status-tag ${status}">${statusLabel}</span>`;

    const worksPillsHtml = authorWorks.length > 0
      ? authorWorks.map(w => `
          <button type="button" class="author-work-pill" onclick="window.literaryAdmin.closeAuthorDetailModal(); window.literaryAdmin.openEditModal('${w.id}')" title="Soạn thảo kiệt tác '${w.title}'">
            <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <span>${w.title}</span>
            <span style="opacity:0.6;font-size:0.7rem">(${w.year || w.category || 'Văn học'})</span>
          </button>
        `).join('')
      : `<span style="font-size:0.85rem;color:var(--text-muted);font-style:italic">Chưa có tác phẩm nào được liên kết trong kho dữ liệu.</span>`;

    bodyEl.innerHTML = `
      <div class="author-detail-layout">
        <!-- CỘT TRÁI: THẺ ĐỊNH DANH TÁC GIẢ -->
        <div class="author-detail-left-pane">
          ${author.avatar ? `
            <img src="${author.avatar}" alt="${author.name}" class="author-detail-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="author-avatar-big" style="display:none">${initials}</div>
          ` : `
            <div class="author-avatar-big">${initials}</div>
          `}
          <div class="author-detail-name" style="margin-top:0.25rem">${author.name}</div>
          ${author.alias ? `<div class="author-detail-alias" style="margin-top:-0.25rem">Bút danh: ${author.alias}</div>` : ''}
          <div style="margin-top:0.25rem">${statusPill}</div>
          <div class="author-detail-meta-pills" style="justify-content:center;margin-top:0.4rem;gap:0.4rem;flex-wrap:wrap">
            ${originTag}
            ${author.years ? `<span class="badge-tag" style="background:var(--bg-surface);border:1px solid var(--border-color);padding:0.2rem 0.6rem;border-radius:12px;font-size:0.75rem;display:inline-flex;align-items:center;gap:4px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span>${author.years}</span></span>` : ''}
          </div>
          ${author.hometown ? `
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.5rem;padding:0.4rem 0.65rem;background:var(--bg-surface);border-radius:var(--radius-xs);border:1px solid var(--border-color);width:100%;box-sizing:border-box;text-align:left;display:flex;align-items:flex-start;gap:5px;">
              <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="margin-top:2px;color:var(--text-muted);"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Quê quán: <strong>${author.hometown}</strong></span>
            </div>
          ` : ''}
          ${author.era ? `
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.4rem;padding:0.35rem 0.6rem;background:var(--bg-surface);border-radius:var(--radius-xs);border:1px solid var(--border-color);width:100%;box-sizing:border-box;text-align:left;display:flex;align-items:center;gap:5px;">
              <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <span>Thời kỳ: <strong>${author.era}</strong></span>
            </div>
          ` : ''}
          ${author.masterpieces ? `
            <div style="text-align:left;width:100%;margin-top:0.6rem;padding-top:0.6rem;border-top:1px dashed var(--border-color)">
              <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);font-weight:700;margin-bottom:0.25rem;display:flex;align-items:center;gap:4px;">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span>Kiệt Tác Tiêu Biểu</span>
              </div>
              <div style="font-size:0.85rem;color:var(--text-secondary);font-family:var(--font-heading);line-height:1.5">${author.masterpieces}</div>
            </div>
          ` : ''}
        </div>

        <!-- CỘT PHẢI: TIỂU SỬ, PHONG CÁCH, GIẢI THƯỞNG & DANH SÁCH TÁC PHẨM -->
        <div class="author-detail-right-pane">
          ${author.style ? `
            <div>
              <h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.35rem 0;display:flex;align-items:center;gap:5px;">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                <span>Phong Cách Nghệ Thuật &amp; Đặc Điểm Sáng Tác</span>
              </h4>
              <div class="author-detail-highlight-card" style="border-left:3px solid var(--cerulean-600)">
                ${author.style}
              </div>
            </div>
          ` : ''}

          ${author.awards ? `
            <div>
              <h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.35rem 0;display:flex;align-items:center;gap:5px;">
                <svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                <span>Giải Thưởng &amp; Danh Hiệu Lớn</span>
              </h4>
              <div class="author-detail-highlight-card" style="border-left:3px solid var(--amber-600);background:rgba(245,158,11,0.06)">
                ${author.awards}
              </div>
            </div>
          ` : ''}

          <div>
            <h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.4rem 0">Tiểu Sử &amp; Sự Nghiệp Văn Học</h4>
            <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:0.9rem 1.15rem;font-size:0.9rem;line-height:1.75;color:var(--text-primary);white-space:pre-line;max-height:180px;overflow-y:auto">
              ${author.bio || 'Chưa có thông tin tiểu sử chi tiết.'}
            </div>
          </div>

          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
              <h4 style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0">Tác Phẩm Trong Hệ Thống (${authorWorks.length})</h4>
              <button type="button" class="btn-editorial-secondary btn-sm" onclick="window.literaryAdmin.closeAuthorDetailModal(); window.literaryAdmin.filterByAuthor('${author.name.replace(/'/g, "\\'")}')">Lọc trong bảng</button>
            </div>
            <div class="author-works-pills" style="max-height:130px;overflow-y:auto;padding:2px">
              ${worksPillsHtml}
            </div>
          </div>

          ${(author.seoTitle || author.seoDesc) ? `
            <div style="padding-top:0.5rem;border-top:1px dashed var(--border-color);font-size:0.78rem;color:var(--text-muted);display:flex;align-items:center;gap:0.4rem">
              <span style="display:inline-flex;align-items:center;gap:3px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> <span>SEO Google:</span></span>
              <span style="color:var(--cerulean-700);font-weight:600">${author.seoTitle || author.name}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  closeAuthorDetailModal() {
    const modal = document.getElementById('author-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  closeAuthorModal() {
    const modal = document.getElementById('author-modal');
    if (modal) modal.classList.remove('active');
  }

  saveAuthor() {
    const mode = document.getElementById('author-form-mode')?.value || 'create';
    const originalName = document.getElementById('author-original-name')?.value || '';
    const name = (document.getElementById('author-name')?.value || '').trim();
    let id = (document.getElementById('author-id')?.value || '').trim();
    const alias = (document.getElementById('author-alias')?.value || '').trim();
    const years = (document.getElementById('author-years')?.value || '').trim();
    const country = (document.getElementById('author-country')?.value || '').trim() || 'Việt Nam';
    const era = (document.getElementById('author-era')?.value || '').trim();
    let initials = (document.getElementById('author-initials')?.value || '').trim();
    const masterpieces = (document.getElementById('author-masterpieces')?.value || '').trim();
    const bio = (document.getElementById('author-bio')?.value || '').trim();

    // Các trường mới:
    const avatar = (document.getElementById('author-avatar-data')?.value || document.getElementById('author-avatar-url')?.value || '').trim();
    const hometown = (document.getElementById('author-hometown')?.value || '').trim();
    const style = (document.getElementById('author-style')?.value || '').trim();
    const awards = (document.getElementById('author-awards')?.value || '').trim();
    const status = document.querySelector('input[name="author-publish-status"]:checked')?.value || 'published';
    const seoTitle = (document.getElementById('author-seo-title')?.value || '').trim();
    const seoDesc = (document.getElementById('author-seo-desc')?.value || '').trim();
    const seoKeywords = (document.getElementById('author-seo-keywords')?.value || '').trim();

    if (!name) {
      this.showToast('Vui lòng nhập họ tên tác giả.', 'warning');
      document.getElementById('author-name')?.focus();
      return;
    }

    if (!id) {
      id = this._slugify(name);
    }

    if (!initials) {
      initials = name.split(/\s+/).map(p => p[0]).join('').slice(0, 3).toUpperCase();
    }

    const item = {
      id,
      name,
      alias,
      years,
      country,
      era,
      avatar,
      avatarInitials: initials,
      hometown,
      style,
      awards,
      status,
      masterpieces,
      bio,
      seoTitle,
      seoDesc,
      seoKeywords
    };

    if (mode === 'edit') {
      const idx = this.authors.findIndex(a => a.name.trim().toLowerCase() === originalName.trim().toLowerCase());
      if (idx >= 0) {
        this.authors[idx] = item;
      } else {
        this.authors.push(item);
      }
    } else {
      const existingIdx = this.authors.findIndex(a => a.name.trim().toLowerCase() === name.toLowerCase());
      if (existingIdx >= 0) {
        this.authors[existingIdx] = item;
      } else {
        this.authors.push(item);
      }
    }

    // Sắp xếp danh sách tác giả theo tiếng Việt
    this.authors.sort((a, b) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }));

    try {
      localStorage.setItem('van_uyen_custom_authors', JSON.stringify(this.authors));
      if (window.firebaseService && typeof window.firebaseService.saveAuthor === 'function') {
        window.firebaseService.saveAuthor(item).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi lưu tác giả:", e);
    }

    this.closeAuthorModal();
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'authors') {
      this._renderAuthorsSubview();
    }
    this.renderTable();
    this.showToast(`Đã lưu thông tin tác giả "${name}"!`, 'success');
  }

  openDeleteAuthorModal(idOrName) {
    const q = (idOrName || '').trim().toLowerCase();
    const author = this.authors.find(a => a.name.trim().toLowerCase() === q || (a.id && a.id.toLowerCase() === q));
    if (!author) return;
    this.pendingDeleteAuthorId = author.name;
    const modal = document.getElementById('author-delete-modal');
    const msgEl = document.getElementById('author-delete-msg');
    if (msgEl) {
      msgEl.innerHTML = `Bạn có chắc chắn muốn xóa tác giả "<strong>${author.name}</strong>" khỏi danh mục tác giả?`;
    }
    if (modal) modal.classList.add('active');
  }

  confirmDeleteAuthor() {
    if (!this.pendingDeleteAuthorId) return;
    const name = this.pendingDeleteAuthorId;
    this.authors = this.authors.filter(a => a.name.trim().toLowerCase() !== name.trim().toLowerCase());

    try {
      localStorage.setItem('van_uyen_custom_authors', JSON.stringify(this.authors));
      if (window.firebaseService && typeof window.firebaseService.deleteAuthor === 'function') {
        window.firebaseService.deleteAuthor(name).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi xóa tác giả:", e);
    }

    this.closeAuthorDeleteModal();
    if (this.activeAuthorFilter === name) {
      this.activeAuthorFilter = null;
    }
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'authors') {
      this._renderAuthorsSubview();
    }
    this.renderTable();
    this.showToast('Đã xóa tác giả khỏi danh mục.', 'info');
  }

  closeAuthorDeleteModal() {
    this.pendingDeleteAuthorId = null;
    const modal = document.getElementById('author-delete-modal');
    if (modal) modal.classList.remove('active');
  }

  // ==========================================
  // CRUD XUẤT XỨ (ORIGINS)
  // ==========================================
  openNewOriginModal(preferredRegion = 'world') {
    const modal = document.getElementById('origin-modal');
    if (!modal) return;
    const modeEl = document.getElementById('origin-form-mode');
    const origCountryEl = document.getElementById('origin-original-country');
    const titleEl = document.getElementById('origin-modal-title');
    const countryEl = document.getElementById('origin-country-input');
    const idEl = document.getElementById('origin-id-input');
    const flagEl = document.getElementById('origin-flag-input');
    const regionEl = document.getElementById('origin-region-select');
    const langEl = document.getElementById('origin-lang-input');
    const authorsEl = document.getElementById('origin-authors-input');
    const descEl = document.getElementById('origin-desc-input');

    if (modeEl) modeEl.value = 'create';
    if (origCountryEl) origCountryEl.value = '';
    if (titleEl) titleEl.textContent = 'Thêm Xuất Xứ / Quốc Gia Mới';
    if (countryEl) countryEl.value = '';
    if (idEl) idEl.value = '';
    if (flagEl) flagEl.value = preferredRegion === 'vn' ? '🇻🇳' : '🌐';
    if (regionEl) regionEl.value = preferredRegion;
    if (langEl) langEl.value = preferredRegion === 'vn' ? 'Tiếng Việt' : '';
    if (authorsEl) authorsEl.value = '';
    if (descEl) descEl.value = '';

    if (countryEl && idEl && !countryEl._hasOriginSlugListener) {
      countryEl.addEventListener('input', () => {
        if (modeEl && modeEl.value === 'create') {
          idEl.value = this._slugify(countryEl.value);
        }
      });
      countryEl._hasOriginSlugListener = true;
    }

    if (window.editorialDropdown && regionEl) {
      window.editorialDropdown.syncSelect(regionEl);
    }

    modal.classList.add('active');
    setTimeout(() => countryEl?.focus(), 100);
  }

  openEditOriginModal(country) {
    const origin = this.origins.find(o => o.country.trim().toLowerCase() === (country || '').trim().toLowerCase());
    if (!origin) {
      this.showToast('Không tìm thấy xuất xứ.', 'error');
      return;
    }
    const modal = document.getElementById('origin-modal');
    if (!modal) return;

    const modeEl = document.getElementById('origin-form-mode');
    const origCountryEl = document.getElementById('origin-original-country');
    const titleEl = document.getElementById('origin-modal-title');
    const countryEl = document.getElementById('origin-country-input');
    const idEl = document.getElementById('origin-id-input');
    const flagEl = document.getElementById('origin-flag-input');
    const regionEl = document.getElementById('origin-region-select');
    const langEl = document.getElementById('origin-lang-input');
    const authorsEl = document.getElementById('origin-authors-input');
    const descEl = document.getElementById('origin-desc-input');

    if (modeEl) modeEl.value = 'edit';
    if (origCountryEl) origCountryEl.value = origin.country;
    if (titleEl) titleEl.textContent = `Chỉnh Sửa Xuất Xứ: ${origin.country}`;
    if (countryEl) countryEl.value = origin.country || '';
    if (idEl) idEl.value = origin.id || this._slugify(origin.country || '');
    if (flagEl) flagEl.value = origin.flag || '🌐';
    if (regionEl) regionEl.value = origin.region || 'world';
    if (langEl) langEl.value = origin.language || origin.lang || '';
    if (authorsEl) authorsEl.value = origin.keyAuthors || origin.authors || '';
    if (descEl) descEl.value = origin.desc || '';

    if (window.editorialDropdown && regionEl) {
      window.editorialDropdown.syncSelect(regionEl);
    }

    modal.classList.add('active');
  }

  closeOriginModal() {
    const modal = document.getElementById('origin-modal');
    if (modal) modal.classList.remove('active');
  }

  saveOrigin() {
    const mode = document.getElementById('origin-form-mode')?.value || 'create';
    const originalCountry = document.getElementById('origin-original-country')?.value || '';
    const country = (document.getElementById('origin-country-input')?.value || '').trim();
    let id = (document.getElementById('origin-id-input')?.value || '').trim();
    let flag = (document.getElementById('origin-flag-input')?.value || '').trim();
    const region = document.getElementById('origin-region-select')?.value || 'world';
    const language = (document.getElementById('origin-lang-input')?.value || '').trim();
    const keyAuthors = (document.getElementById('origin-authors-input')?.value || '').trim();
    const desc = (document.getElementById('origin-desc-input')?.value || '').trim();

    if (!country) {
      this.showToast('Vui lòng nhập tên quốc gia / vùng.', 'warning');
      document.getElementById('origin-country-input')?.focus();
      return;
    }

    if (!id) {
      id = this._slugify(country);
    }

    if (!flag) {
      flag = region === 'vn' ? '🇻🇳' : '🌐';
    }

    const item = {
      id,
      country,
      region,
      flag,
      language,
      keyAuthors,
      desc
    };

    if (mode === 'edit') {
      const idx = this.origins.findIndex(o => o.country.trim().toLowerCase() === originalCountry.trim().toLowerCase());
      if (idx >= 0) {
        this.origins[idx] = item;
      } else {
        this.origins.push(item);
      }
    } else {
      const existingIdx = this.origins.findIndex(o => o.country.trim().toLowerCase() === country.toLowerCase());
      if (existingIdx >= 0) {
        this.origins[existingIdx] = item;
      } else {
        this.origins.push(item);
      }
    }

    try {
      localStorage.setItem('van_uyen_custom_origins', JSON.stringify(this.origins));
      if (window.firebaseService && typeof window.firebaseService.saveOrigin === 'function') {
        window.firebaseService.saveOrigin(item).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi lưu xuất xứ:", e);
    }

    this.closeOriginModal();
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'origins') {
      this._renderOriginsSubview();
    }
    this.renderTable();
    this.showToast(`Đã lưu xuất xứ "${country}"!`, 'success');
  }

  openDeleteOriginModal(country) {
    const origin = this.origins.find(o => o.country.trim().toLowerCase() === (country || '').trim().toLowerCase());
    if (!origin) return;
    this.pendingDeleteOriginId = origin.country;
    const modal = document.getElementById('origin-delete-modal');
    const msgEl = document.getElementById('origin-delete-msg');
    if (msgEl) {
      msgEl.innerHTML = `Bạn có chắc chắn muốn xóa xuất xứ "<strong>${origin.country}</strong>" khỏi danh mục?`;
    }
    if (modal) modal.classList.add('active');
  }

  confirmDeleteOrigin() {
    if (!this.pendingDeleteOriginId) return;
    const country = this.pendingDeleteOriginId;
    this.origins = this.origins.filter(o => o.country.trim().toLowerCase() !== country.trim().toLowerCase());

    try {
      localStorage.setItem('van_uyen_custom_origins', JSON.stringify(this.origins));
      if (window.firebaseService && typeof window.firebaseService.deleteOrigin === 'function') {
        window.firebaseService.deleteOrigin(country).catch(console.warn);
      }
    } catch (e) {
      console.warn("Lỗi xóa xuất xứ:", e);
    }

    this.closeOriginDeleteModal();
    if (this.activeOriginFilter === country) {
      this.activeOriginFilter = null;
    }
    this.updateSidebarCounts();
    this.updatePageHeader(this.currentSidebarTab);
    if (this.currentSidebarTab === 'origins') {
      this._renderOriginsSubview();
    }
    this.renderTable();
    this.showToast('Đã xóa xuất xứ khỏi danh mục.', 'info');
  }

  closeOriginDeleteModal() {
    this.pendingDeleteOriginId = null;
    const modal = document.getElementById('origin-delete-modal');
    if (modal) modal.classList.remove('active');
  }

  
  _getEraVectorIcon(era) {
    if (era && era.icon && era.icon.trim().startsWith('<svg')) return era.icon;
    const id = ((era && era.id) || '').toLowerCase();
    if (id.includes('trung-dai') || id.includes('trung-co')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--jasper-700)"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10a3 3 0 0 1 6 0v11H9V10z"></path></svg>';
    }
    if (id.includes('giao-thoi')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--amber-700, #b45309)"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
    }
    if (id.includes('hien-thuc') || id.includes('tho-moi')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--cerulean-600)"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>';
    }
    if (id.includes('khang-chien') || id.includes('cach-mang')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--jasper-600)"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>';
    }
    if (id.includes('doi-moi') || id.includes('duong-dai')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:#10b981"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>';
    }
    if (id.includes('the-gioi')) {
      return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--cerulean-700)"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
    }
    return '<svg class="editorial-icon" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--cerulean-600)"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';
  }

  // ==========================================
  // PHÂN HỆ 1: THỜI KỲ / GIAI ĐOẠN VĂN HỌC (ERAS)
  // ==========================================
  _renderErasSubview() {
    if (!this.subviewPanel) return;

    const cardsHtml = (this.eras || []).map(era => {
      const kws = (era.filterKeys || era.name).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const matchingWorks = (this.works || []).filter(w => {
        const eraLow = (w.era || '').toLowerCase();
        const tagList = (w.tags || []).map(t => t.toLowerCase());
        const catLow = (w.category || '').toLowerCase();
        const titleLow = (w.title || '').toLowerCase();
        return kws.some(k => eraLow.includes(k) || tagList.some(t => t.includes(k)) || catLow.includes(k) || titleLow.includes(k));
      });
      const count = matchingWorks.length;
      const isActive = this.activeEraFilter === era.id;

      const worksPills = (era.featuredWorks || []).map(fw => {
        return `<span class="module-work-pill" onclick="event.stopPropagation(); window.literaryAdmin.quickSearchWork('${fw.replace(/'/g, "\\'")}')" title="Tra cứu tác phẩm '${fw}'">${fw}</span>`;
      }).join('');

      return `
        <div class="era-card ${isActive ? 'active' : ''}" onclick="window.literaryAdmin.filterByEra('${era.id}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.6rem">
              <span class="era-icon-box" style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--bg-secondary);border:1px solid var(--border-color);">${this._getEraVectorIcon(era)}</span>
              <h4 class="module-card-title">${era.name}</h4>
            </div>
            <span class="module-card-badge">${era.years}</span>
          </div>
          <p class="module-card-desc">${era.desc}</p>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.6rem">
            <strong>Tác giả tiêu biểu:</strong> ${era.keyAuthors || 'Đang cập nhật'}
          </div>
          <div class="module-card-works">
            ${worksPills}
          </div>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByEra('${era.id}')" title="Lọc các tác phẩm thuộc thời kỳ này">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Tác phẩm (${count})</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditEraModal('${era.id}')" title="Sửa thông tin thời kỳ">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteEra('${era.id}')" title="Xóa thời kỳ này">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div class="subview-eras-grid">
        ${cardsHtml}
      </div>
    `;
  }

  filterByEra(eraId) {
    this.activeEraFilter = eraId;
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.activeThemeFilter = null;
    this.currentPage = 1;
    this.switchSidebarTab('works', true);
    const eraObj = (this.eras || []).find(e => e.id === eraId);
    const eraName = eraObj ? eraObj.name : eraId;
    this.showToast(`Đang lọc thời kỳ: "${eraName}"`, 'info');
  }

  openNewEraModal() {
    const modal = document.getElementById('era-modal');
    if (!modal) return;
    document.getElementById('era-form-mode').value = 'create';
    document.getElementById('era-original-id').value = '';
    document.getElementById('era-modal-title').textContent = 'Thêm Thời Kỳ Văn Học Mới';
    document.getElementById('era-form-name').value = '';
    document.getElementById('era-form-years').value = '';
    document.getElementById('era-form-icon').value = 'layers';
    document.getElementById('era-form-keywords').value = '';
    document.getElementById('era-form-authors').value = '';
    document.getElementById('era-form-desc').value = '';
    modal.classList.add('active');
  }

  openEditEraModal(id) {
    const era = (this.eras || []).find(e => e.id === id);
    if (!era) return;
    const modal = document.getElementById('era-modal');
    if (!modal) return;
    document.getElementById('era-form-mode').value = 'edit';
    document.getElementById('era-original-id').value = era.id;
    document.getElementById('era-modal-title').textContent = `Chỉnh Sửa Thời Kỳ: ${era.name}`;
    document.getElementById('era-form-name').value = era.name || '';
    document.getElementById('era-form-years').value = era.years || '';
    document.getElementById('era-form-icon').value = era.icon || 'layers';
    document.getElementById('era-form-keywords').value = era.filterKeys || '';
    document.getElementById('era-form-authors').value = era.keyAuthors || '';
    document.getElementById('era-form-desc').value = era.desc || '';
    modal.classList.add('active');
  }

  closeEraModal() {
    const modal = document.getElementById('era-modal');
    if (modal) modal.classList.remove('active');
  }

  saveEra() {
    const mode = document.getElementById('era-form-mode')?.value || 'create';
    const originalId = document.getElementById('era-original-id')?.value || '';
    const name = (document.getElementById('era-form-name')?.value || '').trim();
    const years = (document.getElementById('era-form-years')?.value || '').trim();
    const icon = (document.getElementById('era-form-icon')?.value || '').trim() || 'layers';
    const filterKeys = (document.getElementById('era-form-keywords')?.value || '').trim();
    const keyAuthors = (document.getElementById('era-form-authors')?.value || '').trim();
    const desc = (document.getElementById('era-form-desc')?.value || '').trim();

    if (!name || !years) {
      this.showToast('Vui lòng nhập tên thời kỳ và mốc năm.', 'warning');
      return;
    }

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, name, years, icon, filterKeys, keyAuthors, desc, featuredWorks: [] };

    if (mode === 'edit') {
      const idx = this.eras.findIndex(e => e.id === originalId);
      if (idx !== -1) {
        item.featuredWorks = this.eras[idx].featuredWorks || [];
        this.eras[idx] = item;
      }
    } else {
      this.eras.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_eras', JSON.stringify(this.eras));
    } catch (e) {}

    this.closeEraModal();
    this.updateSidebarCounts();
    this.updatePageHeader('eras');
    this._renderErasSubview();
    this.showToast('Đã lưu thời kỳ văn học thành công!', 'success');
  }

  deleteEra(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa thời kỳ văn học này khỏi danh mục?')) return;
    this.eras = this.eras.filter(e => e.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_eras', JSON.stringify(this.eras));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('eras');
    this._renderErasSubview();
    this.showToast('Đã xóa thời kỳ thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 2: CHỦ ĐỀ & ĐỀ TÀI (THEMES)
  // ==========================================
  _renderThemesSubview() {
    if (!this.subviewPanel) return;

    const cardsHtml = (this.themes || []).map(theme => {
      const kws = (theme.filterKeywords || theme.title).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const matchingWorks = (this.works || []).filter(w => {
        const titleLow = (w.title || '').toLowerCase();
        const tagList = (w.tags || []).map(t => t.toLowerCase());
        const catLow = (w.category || '').toLowerCase();
        const excerptLow = (w.excerpt || '').toLowerCase();
        return kws.some(k => titleLow.includes(k) || tagList.some(t => t.includes(k)) || catLow.includes(k) || excerptLow.includes(k));
      });
      const count = matchingWorks.length;
      const isActive = this.activeThemeFilter === theme.id;

      const worksPills = (theme.featuredWorks || []).map(fw => {
        return `<span class="module-work-pill" onclick="event.stopPropagation(); window.literaryAdmin.quickSearchWork('${fw.replace(/'/g, "\\'")}')" title="Tra cứu '${fw}'">${fw}</span>`;
      }).join('');

      return `
        <div class="theme-card ${isActive ? 'active' : ''}" onclick="window.literaryAdmin.filterByTheme('${theme.id}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.5rem">
              <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${theme.color || 'var(--cerulean-600)'}"></span>
              <h4 class="module-card-title">${theme.title}</h4>
            </div>
            <span class="module-card-badge" style="color:${theme.color || 'var(--cerulean-800)'}">${count} tác phẩm</span>
          </div>
          <p class="module-card-desc">${theme.desc}</p>
          <div class="module-card-works">
            ${worksPills}
          </div>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByTheme('${theme.id}')" title="Lọc tác phẩm thuộc chủ đề này">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Lọc tác phẩm</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditThemeModal('${theme.id}')" title="Sửa chủ đề">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteTheme('${theme.id}')" title="Xóa chủ đề">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div class="subview-themes-grid">
        ${cardsHtml}
      </div>
    `;
  }

  filterByTheme(themeId) {
    this.activeThemeFilter = themeId;
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.activeEraFilter = null;
    this.currentPage = 1;
    this.switchSidebarTab('works', true);
    const themeObj = (this.themes || []).find(t => t.id === themeId);
    const themeTitle = themeObj ? themeObj.title : themeId;
    this.showToast(`Đang lọc chủ đề: "${themeTitle}"`, 'info');
  }

  openNewThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (!modal) return;
    document.getElementById('theme-form-mode').value = 'create';
    document.getElementById('theme-original-id').value = '';
    document.getElementById('theme-modal-title').textContent = 'Thêm Chủ Đề & Đề Tài Mới';
    document.getElementById('theme-form-title').value = '';
    document.getElementById('theme-form-color').value = '#d97706';
    document.getElementById('theme-form-keywords').value = '';
    document.getElementById('theme-form-works').value = '';
    document.getElementById('theme-form-desc').value = '';
    modal.classList.add('active');
  }

  openEditThemeModal(id) {
    const theme = (this.themes || []).find(t => t.id === id);
    if (!theme) return;
    const modal = document.getElementById('theme-modal');
    if (!modal) return;
    document.getElementById('theme-form-mode').value = 'edit';
    document.getElementById('theme-original-id').value = theme.id;
    document.getElementById('theme-modal-title').textContent = `Chỉnh Sửa Chủ Đề: ${theme.title}`;
    document.getElementById('theme-form-title').value = theme.title || '';
    document.getElementById('theme-form-color').value = theme.color || '#d97706';
    document.getElementById('theme-form-keywords').value = theme.filterKeywords || '';
    document.getElementById('theme-form-works').value = (theme.featuredWorks || []).join(', ');
    document.getElementById('theme-form-desc').value = theme.desc || '';
    modal.classList.add('active');
  }

  closeThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (modal) modal.classList.remove('active');
  }

  saveTheme() {
    const mode = document.getElementById('theme-form-mode')?.value || 'create';
    const originalId = document.getElementById('theme-original-id')?.value || '';
    const title = (document.getElementById('theme-form-title')?.value || '').trim();
    const color = (document.getElementById('theme-form-color')?.value || '').trim() || '#d97706';
    const filterKeywords = (document.getElementById('theme-form-keywords')?.value || '').trim();
    const worksStr = (document.getElementById('theme-form-works')?.value || '').trim();
    const desc = (document.getElementById('theme-form-desc')?.value || '').trim();

    if (!title) {
      this.showToast('Vui lòng nhập tên chủ đề / đề tài.', 'warning');
      return;
    }

    const featuredWorks = worksStr ? worksStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    const id = mode === 'edit' ? originalId : title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, title, color, filterKeywords, featuredWorks, desc };

    if (mode === 'edit') {
      const idx = this.themes.findIndex(t => t.id === originalId);
      if (idx !== -1) this.themes[idx] = item;
    } else {
      this.themes.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_themes', JSON.stringify(this.themes));
    } catch (e) {}

    this.closeThemeModal();
    this.updateSidebarCounts();
    this.updatePageHeader('themes');
    this._renderThemesSubview();
    this.showToast('Đã lưu chủ đề văn học thành công!', 'success');
  }

  deleteTheme(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa chủ đề văn học này?')) return;
    this.themes = this.themes.filter(t => t.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_themes', JSON.stringify(this.themes));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('themes');
    this._renderThemesSubview();
    this.showToast('Đã xóa chủ đề thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 3: NHÂN VẬT VĂN HỌC (CHARACTERS)
  // ==========================================
  _renderCharactersSubview() {
    if (!this.subviewPanel) return;

    const q = (this.characterSearchQuery || '').toLowerCase().trim();
    const list = (this.characters || []).filter(c => {
      if (!q) return true;
      return (c.name || '').toLowerCase().includes(q) ||
             (c.workTitle || '').toLowerCase().includes(q) ||
             (c.author || '').toLowerCase().includes(q) ||
             (c.role || '').toLowerCase().includes(q);
    });

    const cardsHtml = list.map(c => {
      const initials = c.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      const safeId = c.id.replace(/'/g, "\\'");
      return `
        <div class="character-card" onclick="window.literaryAdmin.openCharacterDetailModal('${safeId}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div class="character-avatar-box">${initials}</div>
              <div>
                <h4 class="module-card-title">${c.name}</h4>
                <div style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-heading)">
                  Trong: <strong style="color:var(--cerulean-700)">${c.workTitle}</strong> · ${c.author || ''}
                </div>
              </div>
            </div>
          </div>
          ${c.quote ? `<div class="character-quote-box">“${c.quote}”</div>` : ''}
          <p class="module-card-desc" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            ${c.personality || c.symbolicMeaning}
          </p>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openCharacterDetailModal('${safeId}')" title="Xem hồ sơ chi tiết và phân tích thi pháp">
              <span>Hồ sơ chi tiết</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditCharacterModal('${safeId}')" title="Chỉnh sửa nhân vật">
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteCharacter('${safeId}')" title="Xóa nhân vật">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:1rem;flex-wrap:wrap">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Danh mục <strong>${list.length}</strong> nhân vật kiệt tác trong chương trình Ngữ văn trung học và văn học nhân loại.
        </div>
        <div class="admin-search-wrap" style="margin:0;width:240px">
          <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="admin-search-input" placeholder="Tìm theo tên, tác phẩm..." value="${this.characterSearchQuery || ''}" oninput="window.literaryAdmin.filterCharacters(this.value)">
        </div>
      </div>
      <div class="subview-characters-grid">
        ${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy nhân vật nào phù hợp.</div>'}
      </div>
    `;
  }

  filterCharacters(keyword) {
    this.characterSearchQuery = keyword || '';
    const headerInput = document.getElementById('header-character-search');
    if (headerInput && headerInput.value !== keyword) headerInput.value = keyword;
    this._renderCharactersSubview();
  }

  openCharacterDetailModal(id) {
    const char = (this.characters || []).find(c => c.id === id);
    if (!char) return;
    const modal = document.getElementById('character-detail-modal');
    const body = document.getElementById('char-detail-body');
    const heading = document.getElementById('char-detail-heading');
    const readBtn = document.getElementById('btn-char-read-work');
    if (!modal || !body) return;

    if (heading) heading.textContent = `Hồ Sơ: ${char.name} (${char.workTitle})`;
    if (readBtn) {
      readBtn.onclick = () => {
        modal.classList.remove('active');
        if (char.workId) window.open(`index.html?work=${char.workId}`, '_blank');
        else window.literaryAdmin.quickSearchWork(char.workTitle);
      };
    }

    body.innerHTML = `
      <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem;padding:1rem;background:var(--bg-secondary);border-radius:var(--radius-sm);border:1px solid var(--border-color)">
        <div class="character-avatar-box" style="width:58px;height:58px;font-size:1.45rem;">
          ${char.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 style="font-family:var(--font-heading);font-size:1.4rem;color:var(--text-primary);margin:0 0 0.25rem 0;">${char.name}</h2>
          <div style="font-size:0.9rem;color:var(--text-secondary)">
            Xuất hiện trong tác phẩm: <strong style="color:var(--cerulean-700)">${char.workTitle}</strong> · Tác giả: <strong>${char.author || 'Khuyết danh'}</strong>
          </div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">
            ${char.role || 'Nhân vật văn học kinh điển'}
          </div>
        </div>
      </div>

      ${char.quote ? `
        <div style="background:var(--bg-secondary);border-left:4px solid var(--amber-600);padding:0.85rem 1.1rem;border-radius:var(--radius-xs);margin-bottom:1.25rem;font-style:italic;line-height:1.6;font-size:0.95rem;color:var(--text-primary)">
          “${char.quote}”
        </div>
      ` : ''}

      <div style="margin-bottom:1.2rem;">
        <h4 style="font-family:var(--font-heading);font-size:1rem;color:var(--cerulean-800);margin:0 0 0.4rem 0;display:flex;align-items:center;gap:0.4rem">
          <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:14px;height:14px;color:var(--cerulean-700)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Hoàn Cảnh Xuất Thân, Diện Mạo &amp; Tính Cách</span>
        </h4>
        <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-surface);padding:0.85rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          ${char.personality || 'Đang cập nhật phân tích hoàn cảnh và tính cách nhân vật...'}
        </div>
      </div>

      <div>
        <h4 style="font-family:var(--font-heading);font-size:1rem;color:var(--cerulean-800);margin:0 0 0.4rem 0;display:flex;align-items:center;gap:0.4rem">
          <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:14px;height:14px;color:var(--amber-700, #b45309)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>Ý Nghĩa Biểu Tượng &amp; Chiều Sâu Nhân Đạo Trong Đề Thi</span>
        </h4>
        <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-surface);padding:0.85rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          ${char.symbolicMeaning || 'Đang cập nhật ý nghĩa biểu tượng...'}
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  closeCharacterDetailModal() {
    const modal = document.getElementById('character-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  openNewCharacterModal() {
    const modal = document.getElementById('character-edit-modal');
    if (!modal) return;
    document.getElementById('char-form-mode').value = 'create';
    document.getElementById('char-original-id').value = '';
    document.getElementById('char-edit-modal-title').textContent = 'Thêm Nhân Vật Văn Học Mới';
    document.getElementById('char-form-name').value = '';
    document.getElementById('char-form-work').value = '';
    document.getElementById('char-form-author').value = '';
    document.getElementById('char-form-role').value = '';
    document.getElementById('char-form-quote').value = '';
    document.getElementById('char-form-personality').value = '';
    document.getElementById('char-form-symbolic').value = '';
    modal.classList.add('active');
  }

  openEditCharacterModal(id) {
    const char = (this.characters || []).find(c => c.id === id);
    if (!char) return;
    const modal = document.getElementById('character-edit-modal');
    if (!modal) return;
    document.getElementById('char-form-mode').value = 'edit';
    document.getElementById('char-original-id').value = char.id;
    document.getElementById('char-edit-modal-title').textContent = `Chỉnh Sửa Nhân Vật: ${char.name}`;
    document.getElementById('char-form-name').value = char.name || '';
    document.getElementById('char-form-work').value = char.workTitle || '';
    document.getElementById('char-form-author').value = char.author || '';
    document.getElementById('char-form-role').value = char.role || '';
    document.getElementById('char-form-quote').value = char.quote || '';
    document.getElementById('char-form-personality').value = char.personality || '';
    document.getElementById('char-form-symbolic').value = char.symbolicMeaning || '';
    modal.classList.add('active');
  }

  closeCharacterEditModal() {
    const modal = document.getElementById('character-edit-modal');
    if (modal) modal.classList.remove('active');
  }

  saveCharacter() {
    const mode = document.getElementById('char-form-mode')?.value || 'create';
    const originalId = document.getElementById('char-original-id')?.value || '';
    const name = (document.getElementById('char-form-name')?.value || '').trim();
    const workTitle = (document.getElementById('char-form-work')?.value || '').trim();
    const author = (document.getElementById('char-form-author')?.value || '').trim();
    const role = (document.getElementById('char-form-role')?.value || '').trim();
    const quote = (document.getElementById('char-form-quote')?.value || '').trim();
    const personality = (document.getElementById('char-form-personality')?.value || '').trim();
    const symbolicMeaning = (document.getElementById('char-form-symbolic')?.value || '').trim();

    if (!name || !workTitle) {
      this.showToast('Vui lòng nhập tên nhân vật và tác phẩm.', 'warning');
      return;
    }

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, name, workTitle, workId: id, author, role, quote, personality, symbolicMeaning };

    if (mode === 'edit') {
      const idx = this.characters.findIndex(c => c.id === originalId);
      if (idx !== -1) this.characters[idx] = item;
    } else {
      this.characters.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_characters', JSON.stringify(this.characters));
    } catch (e) {}

    this.closeCharacterEditModal();
    this.updateSidebarCounts();
    this.updatePageHeader('characters');
    this._renderCharactersSubview();
    this.showToast('Đã lưu nhân vật văn học thành công!', 'success');
  }

  deleteCharacter(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa nhân vật này khỏi danh mục tra cứu?')) return;
    this.characters = this.characters.filter(c => c.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_characters', JSON.stringify(this.characters));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('characters');
    this._renderCharactersSubview();
    this.showToast('Đã xóa nhân vật thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 4: BÀI VIẾT PHÂN TÍCH & BÌNH LUẬN (ARTICLES)
  // ==========================================
  _renderArticlesSubview() {
    if (!this.subviewPanel) return;

    const listHtml = (this.articles || []).map(art => {
      const safeId = art.id.replace(/'/g, "\\'");
      return `
        <div class="article-row-item">
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap">
              <span class="subview-status-tag published">${art.category || 'Văn mẫu'}</span>
              <span class="subview-status-tag draft" style="color:var(--cerulean-800);background:var(--cerulean-50)">${art.grade || 'Lớp 12'}</span>
              ${art.views ? `<span style="font-size:0.75rem;color:var(--text-muted);display:inline-flex;align-items:center;gap:3px;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="7" r="3"></circle></svg> ${art.views} lượt xem</span>` : ''}
            </div>
            <div class="article-title-text" style="cursor:pointer;" onclick="window.literaryAdmin.openArticleDetailModal('${safeId}')">
              ${art.title}
            </div>
            <div class="article-meta-row">
              <span>Tác phẩm: <strong style="color:var(--text-primary)">${art.workTitle || 'Chung'}</strong></span>
              <span>· Người biên soạn: <strong>${art.author || 'Ban Biên Tập'}</strong></span>
            </div>
            ${art.summary ? `<p style="font-size:0.85rem;color:var(--text-secondary);margin:0.5rem 0 0 0;line-height:1.5">${art.summary}</p>` : ''}
          </div>
          <div style="display:flex;gap:0.4rem;flex-shrink:0;align-items:center;">
            <button type="button" class="btn-editorial-primary" style="padding:0.35rem 0.8rem;font-size:0.82rem;" onclick="window.literaryAdmin.openArticleDetailModal('${safeId}')" title="Đọc toàn văn bài phân tích">
              Đọc bài viết
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.35rem 0.8rem;font-size:0.82rem;" onclick="window.literaryAdmin.openEditArticleModal('${safeId}')" title="Sửa bài viết">
              Sửa
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.35rem 0.8rem;font-size:0.82rem;color:var(--jasper-700);" onclick="window.literaryAdmin.deleteArticle('${safeId}')" title="Xóa bài viết">
              Xóa
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Kho tài liệu học liệu gồm <strong>${(this.articles || []).length}</strong> bài phân tích chuyên sâu, dàn ý và văn mẫu trọng tâm.
        </div>
        <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewArticleModal()">
          <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Soạn bài phân tích mới</span>
        </button>
      </div>
      <div class="subview-articles-list">
        ${listHtml || '<div style="text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Chưa có bài viết nào trong kho học liệu.</div>'}
      </div>
    `;
  }

  openArticleDetailModal(id) {
    const art = (this.articles || []).find(a => a.id === id);
    if (!art) return;
    const modal = document.getElementById('article-detail-modal');
    const body = document.getElementById('art-detail-body');
    const heading = document.getElementById('art-detail-heading');
    const editBtn = document.getElementById('btn-art-edit-this');
    if (!modal || !body) return;

    if (heading) heading.textContent = art.title;
    if (editBtn) {
      editBtn.onclick = () => {
        modal.classList.remove('active');
        window.literaryAdmin.openEditArticleModal(art.id);
      };
    }

    body.innerHTML = `
      <div style="margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid var(--border-color)">
        <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap">
          <span class="subview-status-tag published">${art.category || 'Văn mẫu chọn lọc'}</span>
          <span class="subview-status-tag draft" style="color:var(--cerulean-800);background:var(--cerulean-50)">${art.grade || 'Lớp 12'}</span>
          <span style="font-size:0.8rem;color:var(--text-muted)">Liên quan: <strong style="color:var(--cerulean-700)">${art.workTitle || 'Tổng hợp'}</strong></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">· Tác giả: <strong>${art.author || 'Ban Biên Tập'}</strong></span>
        </div>
        <h2 style="font-family:var(--font-heading);font-size:1.35rem;color:var(--text-primary);margin:0.25rem 0 0.5rem 0;line-height:1.4">
          ${art.title}
        </h2>
        ${art.summary ? `
          <div style="background:var(--bg-secondary);padding:0.75rem 1rem;border-radius:var(--radius-xs);border-left:3px solid var(--cerulean-600);font-size:0.88rem;color:var(--text-secondary);line-height:1.55">
            <strong>Dàn ý luận điểm:</strong> ${art.summary}
          </div>
        ` : ''}
      </div>
      <div style="font-size:0.95rem;line-height:1.75;color:var(--text-primary);white-space:pre-wrap;font-family:var(--font-body)">
${art.content || 'Nội dung bài viết đang được Ban Biên Tập hoàn thiện...'}
      </div>
    `;

    modal.classList.add('active');
  }

  closeArticleDetailModal() {
    const modal = document.getElementById('article-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  openNewArticleModal() {
    const modal = document.getElementById('article-edit-modal');
    if (!modal) return;
    document.getElementById('art-form-mode').value = 'create';
    document.getElementById('art-original-id').value = '';
    document.getElementById('art-edit-modal-title').textContent = 'Soạn Bài Viết Phân Tích Mới';
    document.getElementById('art-form-title').value = '';
    document.getElementById('art-form-category').value = 'Văn mẫu chọn lọc';
    document.getElementById('art-form-grade').value = 'Lớp 12 · Ôn thi THPT';
    document.getElementById('art-form-work').value = '';
    document.getElementById('art-form-author').value = 'Ban Biên Tập Văn Uyển';
    document.getElementById('art-form-summary').value = '';
    document.getElementById('art-form-content').value = '';
    modal.classList.add('active');
  }

  openEditArticleModal(id) {
    const art = (this.articles || []).find(a => a.id === id);
    if (!art) return;
    const modal = document.getElementById('article-edit-modal');
    if (!modal) return;
    document.getElementById('art-form-mode').value = 'edit';
    document.getElementById('art-original-id').value = art.id;
    document.getElementById('art-edit-modal-title').textContent = `Chỉnh Sửa: ${art.title}`;
    document.getElementById('art-form-title').value = art.title || '';
    document.getElementById('art-form-category').value = art.category || '';
    document.getElementById('art-form-grade').value = art.grade || '';
    document.getElementById('art-form-work').value = art.workTitle || '';
    document.getElementById('art-form-author').value = art.author || '';
    document.getElementById('art-form-summary').value = art.summary || '';
    document.getElementById('art-form-content').value = art.content || '';
    modal.classList.add('active');
  }

  closeArticleEditModal() {
    const modal = document.getElementById('article-edit-modal');
    if (modal) modal.classList.remove('active');
  }

  saveArticle() {
    const mode = document.getElementById('art-form-mode')?.value || 'create';
    const originalId = document.getElementById('art-original-id')?.value || '';
    const title = (document.getElementById('art-form-title')?.value || '').trim();
    const category = (document.getElementById('art-form-category')?.value || '').trim() || 'Văn mẫu chọn lọc';
    const grade = (document.getElementById('art-form-grade')?.value || '').trim();
    const workTitle = (document.getElementById('art-form-work')?.value || '').trim();
    const author = (document.getElementById('art-form-author')?.value || '').trim() || 'Ban Biên Tập Văn Uyển';
    const summary = (document.getElementById('art-form-summary')?.value || '').trim();
    const content = (document.getElementById('art-form-content')?.value || '').trim();

    if (!title || !content) {
      this.showToast('Vui lòng nhập tiêu đề và nội dung bài viết.', 'warning');
      return;
    }

    const id = mode === 'edit' ? originalId : title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, title, category, grade, workTitle, author, summary, content, views: 100 };

    if (mode === 'edit') {
      const idx = this.articles.findIndex(a => a.id === originalId);
      if (idx !== -1) {
        item.views = this.articles[idx].views || 100;
        this.articles[idx] = item;
      }
    } else {
      this.articles.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_articles', JSON.stringify(this.articles));
    } catch (e) {}

    this.closeArticleEditModal();
    this.updateSidebarCounts();
    this.updatePageHeader('articles');
    this._renderArticlesSubview();
    this.showToast('Đã lưu bài viết phân tích thành công!', 'success');
  }

  deleteArticle(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa bài phân tích này?')) return;
    this.articles = this.articles.filter(a => a.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_articles', JSON.stringify(this.articles));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('articles');
    this._renderArticlesSubview();
    this.showToast('Đã xóa bài viết thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 5: TỪ ĐIỂN THUẬT NGỮ VĂN HỌC (TERMS)
  // ==========================================
  _renderTermsSubview() {
    if (!this.subviewPanel) return;

    const q = (this.termSearchQuery || '').toLowerCase().trim();
    const list = (this.terms || []).filter(t => {
      if (!q) return true;
      return (t.name || '').toLowerCase().includes(q) ||
             (t.type || '').toLowerCase().includes(q) ||
             (t.definition || '').toLowerCase().includes(q);
    });

    const cardsHtml = list.map(t => {
      const safeId = t.id.replace(/'/g, "\\'");
      return `
        <div class="term-card" onclick="window.literaryAdmin.openTermDetailModal('${safeId}')">
          <div class="module-card-header">
            <h4 class="module-card-title">${t.name}</h4>
            <span class="module-card-badge" style="color:var(--cerulean-700)">${t.type}</span>
          </div>
          <p class="module-card-desc" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            ${t.definition}
          </p>
          ${t.example ? `
            <div style="background:var(--bg-secondary);padding:0.6rem 0.8rem;border-radius:var(--radius-xs);border-left:2px solid var(--amber-600);font-size:0.8rem;line-height:1.5;color:var(--text-primary);margin-bottom:0.75rem;font-style:italic">
              ${t.example}
            </div>
          ` : ''}
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openTermDetailModal('${safeId}')" title="Xem tra cứu chi tiết">
              <span>Xem chi tiết</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditTermModal('${safeId}')" title="Sửa thuật ngữ">
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteTerm('${safeId}')" title="Xóa thuật ngữ">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:1rem;flex-wrap:wrap">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Từ điển tra cứu <strong>${list.length}</strong> khái niệm lý luận, biện pháp tu từ &amp; thi pháp văn học.
        </div>
        <div class="admin-search-wrap" style="margin:0;width:240px">
          <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="admin-search-input" placeholder="Tìm thuật ngữ..." value="${this.termSearchQuery || ''}" oninput="window.literaryAdmin.filterTerms(this.value)">
        </div>
      </div>
      <div class="subview-terms-grid">
        ${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy thuật ngữ phù hợp.</div>'}
      </div>
    `;
  }

  filterTerms(keyword) {
    this.termSearchQuery = keyword || '';
    const headerInput = document.getElementById('header-term-search');
    if (headerInput && headerInput.value !== keyword) headerInput.value = keyword;
    this._renderTermsSubview();
  }

  openTermDetailModal(id) {
    const term = (this.terms || []).find(t => t.id === id);
    if (!term) return;
    const modal = document.getElementById('term-detail-modal');
    const body = document.getElementById('term-detail-body');
    const heading = document.getElementById('term-detail-heading');
    if (!modal || !body) return;

    if (heading) heading.textContent = `Thuật Ngữ: ${term.name}`;

    body.innerHTML = `
      <div style="margin-bottom:1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <h2 style="font-family:var(--font-heading);font-size:1.35rem;color:var(--text-primary);margin:0">${term.name}</h2>
          <span class="subview-status-tag published" style="font-size:0.8rem">${term.type}</span>
        </div>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0;display:flex;align-items:center;gap:0.4rem">
          <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:14px;height:14px;color:var(--cerulean-700)"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span>Định Nghĩa Khoa Học</span>
        </h4>
        <div style="font-size:0.92rem;line-height:1.65;color:var(--text-primary);background:var(--bg-secondary);padding:0.85rem 1rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          ${term.definition}
        </div>
      </div>

      ${term.example ? `
        <div style="margin-bottom:1.2rem;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0;display:flex;align-items:center;gap:0.4rem">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:14px;height:14px;color:var(--cerulean-700)"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
            <span>Ví Dụ Ngữ Liệu Văn Học Chuẩn SGK</span>
          </h4>
          <div style="font-size:0.9rem;line-height:1.65;color:var(--text-primary);background:var(--bg-surface);padding:0.85rem 1rem;border-radius:var(--radius-xs);border-left:3px solid var(--amber-600);border-top:1px solid var(--border-color);border-right:1px solid var(--border-color);border-bottom:1px solid var(--border-color);font-style:italic">
            ${term.example}
          </div>
        </div>
      ` : ''}

      ${term.application ? `
        <div>
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0;display:flex;align-items:center;gap:0.4rem">
            <svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:14px;height:14px;color:var(--amber-700, #b45309)"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>
            <span>Bí Quyết Vận Dụng Trong Bài Làm Đạt Điểm Cao</span>
          </h4>
          <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-secondary);padding:0.85rem 1rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
            ${term.application}
          </div>
        </div>
      ` : ''}
    `;

    modal.classList.add('active');
  }

  closeTermDetailModal() {
    const modal = document.getElementById('term-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  openNewTermModal() {
    const modal = document.getElementById('term-edit-modal');
    if (!modal) return;
    document.getElementById('term-form-mode').value = 'create';
    document.getElementById('term-original-id').value = '';
    document.getElementById('term-edit-modal-title').textContent = 'Thêm Thuật Ngữ Mới';
    document.getElementById('term-form-name').value = '';
    document.getElementById('term-form-type').value = 'Biện pháp tu từ';
    document.getElementById('term-form-def').value = '';
    document.getElementById('term-form-example').value = '';
    document.getElementById('term-form-app').value = '';
    modal.classList.add('active');
  }

  openEditTermModal(id) {
    const term = (this.terms || []).find(t => t.id === id);
    if (!term) return;
    const modal = document.getElementById('term-edit-modal');
    if (!modal) return;
    document.getElementById('term-form-mode').value = 'edit';
    document.getElementById('term-original-id').value = term.id;
    document.getElementById('term-edit-modal-title').textContent = `Chỉnh Sửa Thuật Ngữ: ${term.name}`;
    document.getElementById('term-form-name').value = term.name || '';
    document.getElementById('term-form-type').value = term.type || '';
    document.getElementById('term-form-def').value = term.definition || '';
    document.getElementById('term-form-example').value = term.example || '';
    document.getElementById('term-form-app').value = term.application || '';
    modal.classList.add('active');
  }

  closeTermEditModal() {
    const modal = document.getElementById('term-edit-modal');
    if (modal) modal.classList.remove('active');
  }

  saveTerm() {
    const mode = document.getElementById('term-form-mode')?.value || 'create';
    const originalId = document.getElementById('term-original-id')?.value || '';
    const name = (document.getElementById('term-form-name')?.value || '').trim();
    const type = (document.getElementById('term-form-type')?.value || '').trim() || 'Lý luận văn học';
    const definition = (document.getElementById('term-form-def')?.value || '').trim();
    const example = (document.getElementById('term-form-example')?.value || '').trim();
    const application = (document.getElementById('term-form-app')?.value || '').trim();

    if (!name || !definition) {
      this.showToast('Vui lòng nhập tên thuật ngữ và định nghĩa.', 'warning');
      return;
    }

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, name, type, definition, example, application };

    if (mode === 'edit') {
      const idx = this.terms.findIndex(t => t.id === originalId);
      if (idx !== -1) this.terms[idx] = item;
    } else {
      this.terms.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_terms', JSON.stringify(this.terms));
    } catch (e) {}

    this.closeTermEditModal();
    this.updateSidebarCounts();
    this.updatePageHeader('terms');
    this._renderTermsSubview();
    this.showToast('Đã lưu thuật ngữ văn học thành công!', 'success');
  }

  deleteTerm(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa thuật ngữ này khỏi từ điển?')) return;
    this.terms = this.terms.filter(t => t.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_terms', JSON.stringify(this.terms));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('terms');
    this._renderTermsSubview();
    this.showToast('Đã xóa thuật ngữ thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 6: BÌNH LUẬN & ĐÓNG GÓP (COMMENTS)
  // ==========================================
  _renderCommentsSubview() {
    if (!this.subviewPanel) return;

    const statusFilter = this.commentFilterStatus || 'all';
    const list = (this.comments || []).filter(c => {
      if (statusFilter === 'all') return true;
      return c.status === statusFilter;
    });

    const itemsHtml = list.map(c => {
      const safeId = c.id.replace(/'/g, "\\'");
      const statusBadge = c.status === 'approved'
        ? '<span class="subview-status-tag published"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:10px;height:10px;margin-right:3px"><polyline points="20 6 9 17 4 12"></polyline></svg> Đã duyệt</span>'
        : (c.status === 'replied' ? '<span class="subview-status-tag" style="background:#e0f2fe;color:#0369a1;"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:10px;height:10px;margin-right:3px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Đã phản hồi</span>' : '<span class="subview-status-tag draft"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:10px;height:10px;margin-right:3px"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Chờ duyệt</span>');

      return `
        <div class="comment-row-item ${c.status}">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
            <div style="display:flex;align-items:center;gap:0.6rem">
              <strong>${c.authorName}</strong>
              <span style="font-size:0.75rem;padding:2px 8px;background:var(--bg-secondary);border-radius:12px;color:var(--text-muted)">${c.authorRole}</span>
              ${statusBadge}
            </div>
            <div style="font-size:0.8rem;color:var(--text-muted)">
              Tác phẩm: <strong style="color:var(--cerulean-700)">${c.workTitle}</strong> · ${c.date}
            </div>
          </div>

          <div class="comment-quote-bubble">
            “${c.content}”
          </div>

          ${c.reply ? `
            <div class="comment-reply-bubble">
              <strong style="display:flex;align-items:center;gap:0.35rem;margin-bottom:0.25rem;font-size:0.8rem;color:var(--cerulean-800)"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> <span>Phản hồi của Ban Biên Tập Văn Uyển:</span></strong>
              ${c.reply}
            </div>
          ` : ''}

          <div style="display:flex;justify-content:flex-end;gap:0.4rem;margin-top:0.4rem">
            ${c.status === 'pending' ? `
              <button type="button" class="btn-editorial-primary" style="padding:0.3rem 0.75rem;font-size:0.8rem" onclick="window.literaryAdmin.approveComment('${safeId}')">
                Duyệt hiển thị
              </button>
            ` : ''}
            <button type="button" class="btn-editorial-secondary" style="padding:0.3rem 0.75rem;font-size:0.8rem" onclick="window.literaryAdmin.openCommentReplyModal('${safeId}')">
              ${c.reply ? 'Sửa phản hồi' : 'Viết phản hồi'}
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.3rem 0.75rem;font-size:0.8rem;color:var(--jasper-700)" onclick="window.literaryAdmin.deleteComment('${safeId}')">
              Xóa
            </button>
          </div>
        </div>
      `;
    }).join('');

    const pendingCount = (this.comments || []).filter(c => c.status === 'pending').length;
    const approvedCount = (this.comments || []).filter(c => c.status === 'approved').length;
    const repliedCount = (this.comments || []).filter(c => c.status === 'replied').length;

    this.subviewPanel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:0.8rem;flex-wrap:wrap">
        <div class="admin-filter-tabs">
          <button class="admin-filter-btn ${statusFilter === 'all' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('all')">
            Tất cả (${(this.comments || []).length})
          </button>
          <button class="admin-filter-btn ${statusFilter === 'pending' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('pending')">
            Chờ duyệt (${pendingCount})
          </button>
          <button class="admin-filter-btn ${statusFilter === 'approved' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('approved')">
            Đã duyệt (${approvedCount})
          </button>
          <button class="admin-filter-btn ${statusFilter === 'replied' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('replied')">
            Đã phản hồi (${repliedCount})
          </button>
        </div>
      </div>
      <div class="subview-comments-list">
        ${itemsHtml || '<div style="text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không có bình luận nào trong danh mục này.</div>'}
      </div>
    `;
  }

  filterCommentsByStatus(status) {
    this.commentFilterStatus = status;
    this._renderCommentsSubview();
  }

  approveComment(id) {
    const cmt = (this.comments || []).find(c => c.id === id);
    if (!cmt) return;
    cmt.status = 'approved';
    try {
      localStorage.setItem('van_uyen_custom_comments', JSON.stringify(this.comments));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('comments');
    this._renderCommentsSubview();
    this.showToast('Đã duyệt bình luận hiển thị công khai!', 'success');
  }

  openCommentReplyModal(id) {
    const cmt = (this.comments || []).find(c => c.id === id);
    if (!cmt) return;
    const modal = document.getElementById('comment-reply-modal');
    const infoBox = document.getElementById('reply-modal-comment-info');
    const inputId = document.getElementById('reply-comment-id');
    const textarea = document.getElementById('reply-modal-text');
    if (!modal) return;

    if (inputId) inputId.value = cmt.id;
    if (textarea) textarea.value = cmt.reply || '';
    if (infoBox) {
      infoBox.innerHTML = `
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.35rem">
          Độc giả: <strong style="color:var(--text-primary)">${cmt.authorName}</strong> (${cmt.authorRole}) · Tác phẩm: <strong>${cmt.workTitle}</strong>
        </div>
        <div style="font-size:0.9rem;font-style:italic;color:var(--text-primary)">
          “${cmt.content}”
        </div>
      `;
    }

    modal.classList.add('active');
  }

  closeCommentReplyModal() {
    const modal = document.getElementById('comment-reply-modal');
    if (modal) modal.classList.remove('active');
  }

  submitCommentReply() {
    const id = document.getElementById('reply-comment-id')?.value;
    const replyText = (document.getElementById('reply-modal-text')?.value || '').trim();
    if (!replyText) {
      this.showToast('Vui lòng nhập nội dung phản hồi.', 'warning');
      return;
    }
    const cmt = (this.comments || []).find(c => c.id === id);
    if (!cmt) return;
    cmt.reply = replyText;
    cmt.status = 'replied';

    try {
      localStorage.setItem('van_uyen_custom_comments', JSON.stringify(this.comments));
    } catch (e) {}

    this.closeCommentReplyModal();
    this.updateSidebarCounts();
    this.updatePageHeader('comments');
    this._renderCommentsSubview();
    this.showToast('Đã gửi phản hồi và phê duyệt bình luận!', 'success');
  }

  deleteComment(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
    this.comments = this.comments.filter(c => c.id !== id);
    try {
      localStorage.setItem('van_uyen_custom_comments', JSON.stringify(this.comments));
    } catch (e) {}
    this.updateSidebarCounts();
    this.updatePageHeader('comments');
    this._renderCommentsSubview();
    this.showToast('Đã xóa bình luận thành công!', 'info');
  }

  // ==========================================
  // PHÂN HỆ 7: NGƯỜI DÙNG & PHÂN QUYỀN (USERS)
  // ==========================================
  _renderUsersSubview() {
    if (!this.subviewPanel) return;

    const cardsHtml = (this.users || []).map(u => {
      const initials = u.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      const safeId = u.id.replace(/'/g, "\\'");
      const roleBadgeClass = u.role === 'admin' ? 'admin' : (u.role === 'editor' ? 'editor' : (u.role === 'moderator' ? 'moderator' : 'contributor'));

      const permsPills = (u.permissions || []).map(p => {
        return `<span style="font-size:0.75rem;padding:1px 6px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;color:var(--text-secondary)">${p}</span>`;
      }).join('');

      return `
        <div class="user-card-item">
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div class="user-avatar-circle">${initials}</div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap">
                <strong style="font-family:var(--font-heading);font-size:1.05rem;color:var(--text-primary)">${u.name}</strong>
                <span class="role-badge ${roleBadgeClass}">${u.role}</span>
              </div>
              <div style="font-size:0.82rem;color:var(--text-muted)">${u.email}</div>
              <div style="font-size:0.8rem;color:var(--cerulean-700);margin-top:0.15rem">${u.roleTitle}</div>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin:0.4rem 0">
            ${permsPills}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;color:var(--text-muted);border-top:1px dashed var(--border-color);padding-top:0.6rem">
            <span>Đóng góp: <strong>${u.articlesCount || 0} bài</strong></span>
            <span>Trạng thái: ${u.status === 'active' ? '<span class="subview-status-tag published" style="font-size:0.75rem;padding:2px 6px"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:10px;height:10px;margin-right:2px"><polyline points="20 6 9 17 4 12"></polyline></svg> Hoạt động</span>' : '<span class="subview-status-tag hidden" style="font-size:0.75rem;padding:2px 6px"><svg class="editorial-icon icon-xs" viewBox="0 0 24 24" style="width:10px;height:10px;margin-right:2px"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg> Khóa</span>'}</span>
          </div>

          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="window.literaryAdmin.openEditUserModal('${safeId}')" title="Phân quyền tài khoản">
              <span>Phân quyền</span>
            </button>
            <button type="button" class="subview-action-btn ${u.status === 'active' ? 'btn-danger' : ''}" onclick="window.literaryAdmin.toggleUserStatus('${safeId}')">
              <span>${u.status === 'active' ? 'Tạm khóa' : 'Kích hoạt'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.subviewPanel.innerHTML = `
      <div style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Hệ thống phân quyền Ban Biên Tập với <strong>${(this.users || []).length}</strong> tài khoản thành viên.
        </div>
        <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewUserModal()">
          <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Thêm thành viên</span>
        </button>
      </div>
      <div class="subview-users-grid">
        ${cardsHtml}
      </div>
    `;
  }

  openNewUserModal() {
    const modal = document.getElementById('user-modal');
    if (!modal) return;
    document.getElementById('user-form-mode').value = 'create';
    document.getElementById('user-original-id').value = '';
    document.getElementById('user-modal-title').textContent = 'Thêm Thành Viên Ban Biên Tập';
    document.getElementById('user-form-name').value = '';
    document.getElementById('user-form-email').value = '';
    document.getElementById('user-form-role').value = 'editor';
    document.getElementById('user-form-roletitle').value = 'Biên Tập Viên Nội Dung';
    document.getElementById('user-form-perms').value = 'Biên tập toàn văn SGK, Quản lý tác giả, Duyệt bình luận';
    modal.classList.add('active');
  }

  openEditUserModal(id) {
    const u = (this.users || []).find(user => user.id === id);
    if (!u) return;
    const modal = document.getElementById('user-modal');
    if (!modal) return;
    document.getElementById('user-form-mode').value = 'edit';
    document.getElementById('user-original-id').value = u.id;
    document.getElementById('user-modal-title').textContent = `Phân Quyền: ${u.name}`;
    document.getElementById('user-form-name').value = u.name || '';
    document.getElementById('user-form-email').value = u.email || '';
    document.getElementById('user-form-role').value = u.role || 'editor';
    document.getElementById('user-form-roletitle').value = u.roleTitle || '';
    document.getElementById('user-form-perms').value = (u.permissions || []).join(', ');
    modal.classList.add('active');
  }

  closeUserModal() {
    const modal = document.getElementById('user-modal');
    if (modal) modal.classList.remove('active');
  }

  saveUser() {
    const mode = document.getElementById('user-form-mode')?.value || 'create';
    const originalId = document.getElementById('user-original-id')?.value || '';
    const name = (document.getElementById('user-form-name')?.value || '').trim();
    const email = (document.getElementById('user-form-email')?.value || '').trim();
    const role = document.getElementById('user-form-role')?.value || 'editor';
    const roleTitle = (document.getElementById('user-form-roletitle')?.value || '').trim() || 'Biên Tập Viên';
    const permsStr = (document.getElementById('user-form-perms')?.value || '').trim();

    if (!name || !email) {
      this.showToast('Vui lòng nhập họ tên và email người dùng.', 'warning');
      return;
    }

    const permissions = permsStr ? permsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const item = { id, name, email, role, roleTitle, permissions, status: 'active', articlesCount: 0, lastActive: 'Vừa xong' };

    if (mode === 'edit') {
      const idx = this.users.findIndex(u => u.id === originalId);
      if (idx !== -1) {
        item.status = this.users[idx].status || 'active';
        item.articlesCount = this.users[idx].articlesCount || 0;
        this.users[idx] = item;
      }
    } else {
      this.users.push(item);
    }

    try {
      localStorage.setItem('van_uyen_custom_users', JSON.stringify(this.users));
    } catch (e) {}

    this.closeUserModal();
    this.updateSidebarCounts();
    this.updatePageHeader('users');
    this._renderUsersSubview();
    this.showToast('Đã lưu thông tin người dùng và phân quyền!', 'success');
  }

  toggleUserStatus(id) {
    const u = (this.users || []).find(user => user.id === id);
    if (!u) return;
    u.status = u.status === 'active' ? 'inactive' : 'active';
    try {
      localStorage.setItem('van_uyen_custom_users', JSON.stringify(this.users));
    } catch (e) {}
    this._renderUsersSubview();
    this.showToast(`Đã ${u.status === 'active' ? 'kích hoạt' : 'tạm khóa'} tài khoản thành viên.`, 'info');
  }

  // Tra cứu nhanh tác phẩm từ các pill liên kết
  quickSearchWork(title) {
    this.currentSidebarTab = 'works';
    this.sidebarNavItems.forEach(btn => btn.classList.toggle('active', btn.dataset.nav === 'works'));
    this.updatePageHeader('works');
    this.searchQuery = (title || '').toLowerCase().trim();
    if (this.searchInput) this.searchInput.value = title;
    this.currentPage = 1;
    this.renderTable();
    this.scrollToTop();
  }

  filterByCategory(catKey) {
    this.activeCategoryFilter = catKey;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.currentPage = 1;
    this.switchSidebarTab('works', true);
    const catObj = this.categories.find(c => c.id === catKey);
    const catName = catObj ? catObj.title : catKey;
    this.showToast(`Đang lọc thể loại: "${catName}"`, 'info');
  }

  filterByAuthor(authorName) {
    this.activeAuthorFilter = authorName;
    this.activeCategoryFilter = null;
    this.activeOriginFilter = null;
    this.currentPage = 1;
    this.switchSidebarTab('works', true);
    this.showToast(`Đang xem tác phẩm của: "${authorName}"`, 'info');
  }

  filterByOrigin(type, value) {
    this.activeOriginFilter = value;
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.currentPage = 1;
    this.switchSidebarTab('works', true);
    const label = value === 'vn' ? 'Việt Nam' : (value === 'world' ? 'Thế Giới' : value);
    this.showToast(`Đang lọc xuất xứ: "${label}"`, 'info');
  }

  clearSubviewFilter() {
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.activeEraFilter = null;
    this.activeThemeFilter = null;
    this.currentPage = 1;
    this.renderTable();
    if (this.currentSidebarTab === 'categories') this._renderCategoriesSubview();
    else if (this.currentSidebarTab === 'authors') this._renderAuthorsSubview();
    else if (this.currentSidebarTab === 'origins') this._renderOriginsSubview();
    else if (this.currentSidebarTab === 'eras') this._renderErasSubview();
    else if (this.currentSidebarTab === 'themes') this._renderThemesSubview();
    this.scrollToTop();
    this.showToast('Đã xóa bộ lọc danh mục.', 'info');
  }

  _renderActiveSubfilterBanner() {
    if (!this.activeFilterBanner) {
      this.activeFilterBanner = document.getElementById('admin-active-filter-banner');
    }
    if (!this.activeFilterBanner) return;

    let filterLabel = '';
    if (this.activeCategoryFilter) {
      const catObj = this.categories.find(c => c.id === this.activeCategoryFilter);
      filterLabel = `Thể Loại: "${catObj ? catObj.title : this.activeCategoryFilter}"`;
    } else if (this.activeAuthorFilter) {
      filterLabel = `Tác Giả: "${this.activeAuthorFilter}"`;
    } else if (this.activeOriginFilter) {
      const origText = this.activeOriginFilter === 'vn' ? 'Việt Nam' : (this.activeOriginFilter === 'world' ? 'Thế Giới' : this.activeOriginFilter);
      filterLabel = `Xuất Xứ: "${origText}"`;
    } else if (this.activeEraFilter) {
      const eraObj = (this.eras || []).find(e => e.id === this.activeEraFilter);
      filterLabel = `Thời Kỳ: "${eraObj ? eraObj.name : this.activeEraFilter}"`;
    } else if (this.activeThemeFilter) {
      const themeObj = (this.themes || []).find(t => t.id === this.activeThemeFilter);
      filterLabel = `Chủ Đề: "${themeObj ? themeObj.title : this.activeThemeFilter}"`;
    }

    if (!filterLabel) {
      this.activeFilterBanner.style.display = 'none';
      this.activeFilterBanner.innerHTML = '';
      return;
    }

    this.activeFilterBanner.style.display = 'flex';
    this.activeFilterBanner.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.6rem">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="stroke:var(--cerulean-700)"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        <span>Đang áp dụng bộ lọc: <span class="subfilter-tag">${filterLabel}</span></span>
      </div>
      <button type="button" class="btn-clear-subfilter" onclick="window.literaryAdmin.clearSubviewFilter()" title="Bỏ lọc danh mục">
        <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:14px;height:14px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <span>Bỏ Lọc</span>
      </button>
    `;
  }
}

// Khởi tạo ứng dụng Admin
window.addEventListener('DOMContentLoaded', () => {
  const adminApp = new LiteraryAdminApp();
  window.literaryAdmin = adminApp;
  adminApp.init();
});
