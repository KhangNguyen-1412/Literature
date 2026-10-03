/**
 * VĂN UYỂN - HỆ THỐNG DANH SÁCH DROPDOWN ĐỒNG BỘ EDITORIAL
 * Quản lý đóng/mở, tương tác bàn phím, click-outside và tự động đồng bộ hóa
 * tất cả các thẻ <select class="form-select"> thành Custom Editorial Dropdown.
 * 
 * Hỗ trợ FLOATING PORTAL: Hiển thị dropdown trực tiếp lên trên toàn bộ Modal,
 * không bị che khuất hoặc cắt xén bởi overflow-y: auto / hidden của modal.
 */

class EditorialDropdownManager {
  constructor() {
    this.activeDropdown = null;
    this.enhancedSelects = new Map();
    this.init();
  }

  init() {
    // 1. Lắng nghe click tương tác toàn cục
    document.addEventListener('click', (e) => {
      // Nhấp vào nút mở Dropdown
      const toggleBtn = e.target.closest('.editorial-dropdown-btn, .editorial-dropdown > button, .custom-select-btn');

      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggleBtn.closest('.editorial-dropdown');
        if (dropdown) {
          const isOpen = dropdown.classList.contains('open');
          if (isOpen) {
            this.closeAll();
          } else {
            this.openDropdown(dropdown, toggleBtn);
          }
        }
        return;
      }

      // Không đóng dropdown khi thao tác bên trong ô tìm kiếm
      if (e.target.closest('.reader-dropdown-search-wrap, .dropdown-filter-input, .form-select-search-wrap, .form-select-search-input')) {
        return;
      }

      // 2. Xử lý khi chọn một mục bên trong Custom Select
      const selectItem = e.target.closest('.form-select-item');
      if (selectItem) {
        const menu = selectItem.closest('.custom-select-menu, .editorial-dropdown-menu');
        const dropdown = selectItem.closest('.editorial-dropdown') || (menu && menu._ownerDropdown);
        const sel = (dropdown && dropdown._targetSelect) || (menu && menu._targetSelect);

        if (sel) {
          const val = selectItem.getAttribute('data-value');

          // Cập nhật giá trị cho select gốc
          sel.value = val;

          // Phát sự kiện change và input để toàn bộ logic hệ thống cập nhật
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          sel.dispatchEvent(new Event('input', { bubbles: true }));

          // Kích hoạt inline onchange nếu có
          if (typeof sel.onchange === 'function') {
            sel.onchange.call(sel, new Event('change'));
          }

          this.syncSelect(sel);
          this.closeAll();
          return;
        }
      }

      // 3. Xử lý các dropdown thông thường (reader toc, library sort, studio genre...)
      const dropdownItem = e.target.closest('.editorial-dropdown-item');
      if (dropdownItem) {
        const menu = dropdownItem.closest('.editorial-dropdown-menu');
        const dropdown = dropdownItem.closest('.editorial-dropdown') || (menu && menu._ownerDropdown);
        if (dropdown) {
          const value = dropdownItem.getAttribute('data-value');
          const label = dropdownItem.getAttribute('data-label') || dropdownItem.textContent.trim();

          dropdown.querySelectorAll('.editorial-dropdown-item').forEach(it => it.classList.remove('active'));
          dropdownItem.classList.add('active');

          const valueTextEl = dropdown.querySelector('.dropdown-selected-text');
          if (valueTextEl && value !== null && value !== undefined) {
            valueTextEl.textContent = label;
          }

          if (typeof dropdown._onSelect === 'function') {
            dropdown._onSelect(value, label, dropdownItem);
          }

          this.closeAll();
        }
        return;
      }

      // 4. Nhấp ra ngoài thì đóng toàn bộ
      if (!e.target.closest('.editorial-dropdown-menu, .custom-select-menu, .floating-portal-menu')) {
        this.closeAll();
      }
    });

    // 5. Hỗ trợ phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });

    // 6. Đóng dropdown khi người dùng cuộn modal hoặc trang chính (không đóng nếu cuộn bên trong menu)
    window.addEventListener('scroll', (e) => {
      if (e.target && e.target.closest && e.target.closest('.custom-select-menu, .editorial-dropdown-menu')) {
        return;
      }
      if (this.activeDropdown) {
        this.closeAll();
      }
    }, true);

    window.addEventListener('resize', () => {
      if (this.activeDropdown) {
        this.closeAll();
      }
    });

    // 7. Tự động chuyển đổi các thẻ <select> thành Editorial Dropdown
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.enhanceAllSelects());
    } else {
      this.enhanceAllSelects();
    }

    // 8. Theo dõi các phần tử <select> mới được thêm động vào DOM
    if (window.MutationObserver) {
      const domObserver = new MutationObserver((mutations) => {
        let shouldEnhance = false;
        for (const m of mutations) {
          if (m.addedNodes.length > 0) {
            for (const n of m.addedNodes) {
              if (n.nodeType === 1) {
                if (n.matches && (n.matches('select.form-select') || n.querySelector('select.form-select'))) {
                  shouldEnhance = true;
                  break;
                }
              }
            }
          }
          if (shouldEnhance) break;
        }
        if (shouldEnhance) {
          this.enhanceAllSelects();
        }
      });
      domObserver.observe(document.body || document.documentElement, { childList: true, subtree: true });
    }
  }

  // Mở dropdown và kích hoạt Floating Portal nếu nằm trong modal hoặc container overflow
  openDropdown(dropdown, toggleBtn) {
    this.closeAll();
    dropdown.classList.add('open');
    this.activeDropdown = dropdown;

    const btn = toggleBtn || dropdown.querySelector('.editorial-dropdown-btn, .custom-select-btn');
    const menu = dropdown.querySelector('.editorial-dropdown-menu, .custom-select-menu');
    if (!btn || !menu) return;

    if (dropdown._targetSelect) {
      this.syncSelect(dropdown._targetSelect);
    }

    // Kiểm tra xem dropdown có nằm trong modal hay container overflow không
    const isInsideModal = !!dropdown.closest('.admin-modal, .admin-modal-body, .admin-modal-backdrop, [style*="overflow"]');
    if (isInsideModal || dropdown.classList.contains('form-select-custom')) {
      this.portalMenuToBody(dropdown, btn, menu);
    } else {
      this.adjustDropup(dropdown);
    }

    // Tự động focus ô tìm kiếm
    const searchInput = menu.querySelector('.reader-dropdown-search-input, .dropdown-filter-input, .form-select-search-input');
    if (searchInput) {
      searchInput.value = '';
      menu.querySelectorAll('.form-select-item').forEach(it => it.style.display = 'flex');
      menu.querySelectorAll('.form-select-group-header').forEach(h => h.style.display = 'flex');
      setTimeout(() => searchInput.focus(), 80);
    }
  }

  // Đưa menu trực tiếp ra document.body để nổi lên trên toàn bộ Modal mà không bị cắt xén
  portalMenuToBody(dropdown, btn, menu) {
    if (!menu._originalParent) {
      menu._originalParent = dropdown;
    }
    menu._ownerDropdown = dropdown;
    if (dropdown._targetSelect) {
      menu._targetSelect = dropdown._targetSelect;
    }

    // Đưa ra body
    if (menu.parentNode !== document.body) {
      document.body.appendChild(menu);
    }

    // Đồng bộ theme của document
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    menu.setAttribute('data-theme', currentTheme);
    menu.classList.add('floating-portal-menu', 'open');

    // Căn chỉnh vị trí fixed theo viewport
    this.repositionPortalMenu(btn, menu);
  }

  // Tính toán tọa độ fixed theo viewport cho menu floating
  repositionPortalMenu(btn, menu) {
    if (!btn || !menu) return;

    const rect = btn.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const maxMenuHeight = 340;

    menu.style.position = 'fixed';
    menu.style.left = `${Math.max(8, rect.left)}px`;
    menu.style.width = `${Math.min(rect.width, viewportWidth - 16)}px`;
    menu.style.zIndex = '1000050';

    // Nếu khoảng trống bên dưới bé hơn 240px và bên trên rộng hơn, mở lên trên (Dropup)
    if (spaceBelow < 240 && spaceAbove > spaceBelow) {
      menu.style.top = 'auto';
      menu.style.bottom = `${viewportHeight - rect.top + 4}px`;
      menu.style.maxHeight = `${Math.min(maxMenuHeight, spaceAbove - 20)}px`;
      menu.classList.add('dropup');
    } else {
      menu.style.top = `${rect.bottom + 4}px`;
      menu.style.bottom = 'auto';
      menu.style.maxHeight = `${Math.min(maxMenuHeight, spaceBelow - 20)}px`;
      menu.classList.remove('dropup');
    }
  }

  // Đóng toàn bộ dropdown đang mở và thu hồi floating menu về lại parent gốc
  closeAll() {
    document.querySelectorAll('.editorial-dropdown.open').forEach(d => {
      d.classList.remove('open');
      const menu = d.querySelector('.editorial-dropdown-menu, .custom-select-menu');
      if (menu) menu.classList.remove('dropup');
    });

    // Thu hồi các floating menu đang gắn vào document.body về lại parent gốc
    document.querySelectorAll('.custom-select-menu.floating-portal-menu, .editorial-dropdown-menu.floating-portal-menu').forEach(menu => {
      menu.classList.remove('open', 'floating-portal-menu', 'dropup');
      menu.style.position = '';
      menu.style.top = '';
      menu.style.bottom = '';
      menu.style.left = '';
      menu.style.width = '';
      menu.style.maxHeight = '';
      menu.style.zIndex = '';

      if (menu._originalParent && menu.parentNode !== menu._originalParent) {
        menu._originalParent.appendChild(menu);
      }
    });

    this.activeDropdown = null;
  }

  // Căn chỉnh dropdown mở lên trên (dropup) đối với dropdown tĩnh không portal
  adjustDropup(dropdown) {
    const btn = dropdown.querySelector('.editorial-dropdown-btn');
    const menu = dropdown.querySelector('.editorial-dropdown-menu');
    if (!btn || !menu) return;

    const rect = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 260 && spaceAbove > spaceBelow) {
      menu.classList.add('dropup');
    } else {
      menu.classList.remove('dropup');
    }
  }

  // Chuyển đổi toàn bộ các thẻ <select> sang Custom Editorial Dropdown
  enhanceAllSelects(root = document) {
    const selects = root.querySelectorAll('select.form-select:not(.form-select-native-hidden)');
    selects.forEach(sel => this.enhanceSelect(sel));
  }

  // Chuyển đổi 1 thẻ <select> cụ thể
  enhanceSelect(selectEl) {
    if (!selectEl || selectEl.dataset.enhanced === 'true') {
      if (selectEl) this.syncSelect(selectEl);
      return;
    }

    // Ẩn select gốc an toàn (vẫn ở trong DOM để form submit / validation hoạt động)
    selectEl.classList.add('form-select-native-hidden');
    selectEl.dataset.enhanced = 'true';

    // Tạo wrapper custom dropdown
    const wrapper = document.createElement('div');
    wrapper.className = 'editorial-dropdown form-select-custom';
    if (selectEl.id) {
      wrapper.setAttribute('data-for-select', selectEl.id);
    }

    // Tạo nút bấm trigger
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'editorial-dropdown-btn custom-select-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.innerHTML = `
      <span class="custom-select-label"></span>
      <svg class="editorial-dropdown-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
    `;
    wrapper.appendChild(btn);

    // Tạo menu sổ xuống
    const menu = document.createElement('div');
    menu.className = 'editorial-dropdown-menu custom-select-menu';
    menu.setAttribute('role', 'listbox');
    menu._originalParent = wrapper;
    wrapper.appendChild(menu);

    wrapper._targetSelect = selectEl;
    this.enhancedSelects.set(selectEl, wrapper);

    // Chèn wrapper ngay sau select gốc
    if (selectEl.parentNode) {
      selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
    }

    // Render danh sách tùy chọn
    this.renderSelectOptions(selectEl, wrapper);

    // Lắng nghe khi options của select bị thay đổi động bằng script (innerHTML)
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        this.renderSelectOptions(selectEl, wrapper);
      });
      observer.observe(selectEl, { childList: true });
      wrapper._selectObserver = observer;
    }

    // Lắng nghe sự kiện change từ select gốc
    selectEl.addEventListener('change', () => {
      this.syncSelect(selectEl);
    });
  }

  // Render danh sách option và optgroup bên trong menu custom
  renderSelectOptions(selectEl, wrapper) {
    const menu = wrapper.querySelector('.custom-select-menu') || document.querySelector(`.custom-select-menu[data-for-select="${selectEl.id}"]`);
    if (!menu) return;

    menu.innerHTML = '';

    const options = Array.from(selectEl.querySelectorAll('option'));
    const hasManyOptions = options.length > 7;

    // Hộp tìm kiếm nhanh nếu danh sách dài (> 7 tùy chọn)
    if (hasManyOptions) {
      const searchWrap = document.createElement('div');
      searchWrap.className = 'form-select-search-wrap';
      searchWrap.innerHTML = `
        <input type="text" class="form-select-search-input" placeholder="🔍 Tìm kiếm nhanh..." autocomplete="off">
      `;
      const searchInput = searchWrap.querySelector('.form-select-search-input');
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = menu.querySelectorAll('.form-select-item');
        const groups = menu.querySelectorAll('.form-select-group');

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          const matches = !query || text.includes(query);
          item.style.display = matches ? 'flex' : 'none';
        });

        // Ẩn nhóm nếu tất cả con bên trong bị ẩn
        groups.forEach(g => {
          const visibleItems = g.querySelectorAll('.form-select-item:not([style*="display: none"])');
          const header = g.querySelector('.form-select-group-header');
          if (header) {
            header.style.display = visibleItems.length > 0 ? 'flex' : 'none';
          }
        });
      });
      menu.appendChild(searchWrap);
    }

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-select-options-wrap';

    // Duyệt qua các phần tử con: <optgroup> hoặc <option>
    Array.from(selectEl.children).forEach(child => {
      if (child.tagName === 'OPTGROUP') {
        const groupEl = document.createElement('div');
        groupEl.className = 'form-select-group';

        const header = document.createElement('div');
        header.className = 'form-select-group-header';
        header.textContent = child.label;
        groupEl.appendChild(header);

        Array.from(child.children).forEach(opt => {
          if (opt.tagName === 'OPTION') {
            groupEl.appendChild(this._createOptionItem(opt, selectEl));
          }
        });
        optionsContainer.appendChild(groupEl);
      } else if (child.tagName === 'OPTION') {
        optionsContainer.appendChild(this._createOptionItem(child, selectEl));
      }
    });

    menu.appendChild(optionsContainer);
    this.syncSelect(selectEl);
  }

  _createOptionItem(opt, selectEl) {
    const item = document.createElement('div');
    item.className = 'editorial-dropdown-item form-select-item';
    item.setAttribute('data-value', opt.value);
    item.setAttribute('data-label', opt.text);
    item.setAttribute('role', 'option');

    const isSelected = opt.value === selectEl.value || (opt.selected && !selectEl.value);
    if (isSelected) item.classList.add('active');

    item.innerHTML = `
      <span class="item-text">${opt.text}</span>
      <span class="item-check">✓</span>
    `;
    return item;
  }

  // Đồng bộ nhãn hiển thị và mục active từ select gốc sang custom dropdown
  syncSelect(selectEl) {
    if (!selectEl) return;
    const wrapper = this.enhancedSelects.get(selectEl) || document.querySelector(`.form-select-custom[data-for-select="${selectEl.id}"]`);
    if (!wrapper) return;

    const labelSpan = wrapper.querySelector('.custom-select-label');
    const safeVal = (typeof CSS !== 'undefined' && CSS.escape) ? CSS.escape(selectEl.value || '') : (selectEl.value || '').replace(/(["\\])/g, '\\$1');
    const selectedOption = (selectEl.selectedIndex >= 0 && selectEl.options[selectEl.selectedIndex]) 
      ? selectEl.options[selectEl.selectedIndex] 
      : selectEl.querySelector(`option[value="${safeVal}"]`);
    const displayText = selectedOption ? selectedOption.text : selectEl.value;

    if (labelSpan) {
      labelSpan.textContent = displayText || 'Chọn tùy chọn...';
    }

    // Cập nhật class active trong cả wrapper lẫn floating menu nếu đang ở body
    const targetMenus = [wrapper.querySelector('.custom-select-menu'), document.querySelector('.custom-select-menu.floating-portal-menu')].filter(Boolean);
    targetMenus.forEach(m => {
      m.querySelectorAll('.form-select-item').forEach(item => {
        const val = item.getAttribute('data-value');
        const isActive = val === selectEl.value;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    });
  }

  bind(dropdownSelector, onSelectCallback) {
    const el = typeof dropdownSelector === 'string' ? document.querySelector(dropdownSelector) : dropdownSelector;
    if (el) {
      el._onSelect = onSelectCallback;
    }
  }
}

// Khởi tạo Singleton toàn cục
window.editorialDropdown = new EditorialDropdownManager();
