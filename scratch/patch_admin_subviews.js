const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../js/admin.js');
let code = fs.readFileSync(targetFile, 'utf8');

// 2. SUBVIEWS & CRUD IMPLEMENTATIONS CODE
const subviewsCode = `
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
        return \`<span class="module-work-pill" onclick="event.stopPropagation(); window.literaryAdmin.quickSearchWork('\${fw.replace(/'/g, "\\\\'")}')" title="Tra cứu tác phẩm '\${fw}'">\${fw}</span>\`;
      }).join('');

      return \`
        <div class="era-card \${isActive ? 'active' : ''}" onclick="window.literaryAdmin.filterByEra('\${era.id}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.5rem">
              <span style="font-size:1.4rem;">\${era.icon || '⏳'}</span>
              <h4 class="module-card-title">\${era.name}</h4>
            </div>
            <span class="module-card-badge">\${era.years}</span>
          </div>
          <p class="module-card-desc">\${era.desc}</p>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.6rem">
            <strong>Tác giả tiêu biểu:</strong> \${era.keyAuthors || 'Đang cập nhật'}
          </div>
          <div class="module-card-works">
            \${worksPills}
          </div>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByEra('\${era.id}')" title="Lọc các tác phẩm thuộc thời kỳ này">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Tác phẩm (\${count})</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditEraModal('\${era.id}')" title="Sửa thông tin thời kỳ">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteEra('\${era.id}')" title="Xóa thời kỳ này">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div class="subview-eras-grid">
        \${cardsHtml}
      </div>
    \`;
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
    this.showToast(\`Đang lọc thời kỳ: "\${eraName}"\`, 'info');
  }

  openNewEraModal() {
    const modal = document.getElementById('era-modal');
    if (!modal) return;
    document.getElementById('era-form-mode').value = 'create';
    document.getElementById('era-original-id').value = '';
    document.getElementById('era-modal-title').textContent = 'Thêm Thời Kỳ Văn Học Mới';
    document.getElementById('era-form-name').value = '';
    document.getElementById('era-form-years').value = '';
    document.getElementById('era-form-icon').value = '🏛️';
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
    document.getElementById('era-modal-title').textContent = \`Chỉnh Sửa Thời Kỳ: \${era.name}\`;
    document.getElementById('era-form-name').value = era.name || '';
    document.getElementById('era-form-years').value = era.years || '';
    document.getElementById('era-form-icon').value = era.icon || '🏛️';
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
    const icon = (document.getElementById('era-form-icon')?.value || '').trim() || '🏛️';
    const filterKeys = (document.getElementById('era-form-keywords')?.value || '').trim();
    const keyAuthors = (document.getElementById('era-form-authors')?.value || '').trim();
    const desc = (document.getElementById('era-form-desc')?.value || '').trim();

    if (!name || !years) {
      this.showToast('Vui lòng nhập tên thời kỳ và mốc năm.', 'warning');
      return;
    }

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
        return \`<span class="module-work-pill" onclick="event.stopPropagation(); window.literaryAdmin.quickSearchWork('\${fw.replace(/'/g, "\\\\'")}')" title="Tra cứu '\${fw}'">\${fw}</span>\`;
      }).join('');

      return \`
        <div class="theme-card \${isActive ? 'active' : ''}" onclick="window.literaryAdmin.filterByTheme('\${theme.id}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.5rem">
              <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:\${theme.color || 'var(--cerulean-600)'}"></span>
              <h4 class="module-card-title">\${theme.title}</h4>
            </div>
            <span class="module-card-badge" style="color:\${theme.color || 'var(--cerulean-800)'}">\${count} tác phẩm</span>
          </div>
          <p class="module-card-desc">\${theme.desc}</p>
          <div class="module-card-works">
            \${worksPills}
          </div>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.filterByTheme('\${theme.id}')" title="Lọc tác phẩm thuộc chủ đề này">
              <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <span>Lọc tác phẩm</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditThemeModal('\${theme.id}')" title="Sửa chủ đề">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteTheme('\${theme.id}')" title="Xóa chủ đề">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div class="subview-themes-grid">
        \${cardsHtml}
      </div>
    \`;
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
    this.showToast(\`Đang lọc chủ đề: "\${themeTitle}"\`, 'info');
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
    document.getElementById('theme-modal-title').textContent = \`Chỉnh Sửa Chủ Đề: \${theme.title}\`;
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
    const id = mode === 'edit' ? originalId : title.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
      const safeId = c.id.replace(/'/g, "\\\\'");
      return \`
        <div class="character-card" onclick="window.literaryAdmin.openCharacterDetailModal('\${safeId}')">
          <div class="module-card-header">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div class="character-avatar-box">\${initials}</div>
              <div>
                <h4 class="module-card-title">\${c.name}</h4>
                <div style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-heading)">
                  Trong: <strong style="color:var(--cerulean-700)">\${c.workTitle}</strong> · \${c.author || ''}
                </div>
              </div>
            </div>
          </div>
          \${c.quote ? \`<div class="character-quote-box">“\${c.quote}”</div>\` : ''}
          <p class="module-card-desc" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            \${c.personality || c.symbolicMeaning}
          </p>
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openCharacterDetailModal('\${safeId}')" title="Xem hồ sơ chi tiết và phân tích thi pháp">
              <span>Hồ sơ chi tiết</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditCharacterModal('\${safeId}')" title="Chỉnh sửa nhân vật">
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteCharacter('\${safeId}')" title="Xóa nhân vật">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:1rem;flex-wrap:wrap">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Danh mục <strong>\${list.length}</strong> nhân vật kiệt tác trong chương trình Ngữ văn trung học và văn học nhân loại.
        </div>
        <div class="admin-search-wrap" style="margin:0;width:240px">
          <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="admin-search-input" placeholder="Tìm theo tên, tác phẩm..." value="\${this.characterSearchQuery || ''}" oninput="window.literaryAdmin.filterCharacters(this.value)">
        </div>
      </div>
      <div class="subview-characters-grid">
        \${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy nhân vật nào phù hợp.</div>'}
      </div>
    \`;
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

    if (heading) heading.textContent = \`Hồ Sơ: \${char.name} (\${char.workTitle})\`;
    if (readBtn) {
      readBtn.onclick = () => {
        modal.classList.remove('active');
        if (char.workId) window.open(\`index.html?work=\${char.workId}\`, '_blank');
        else window.literaryAdmin.quickSearchWork(char.workTitle);
      };
    }

    body.innerHTML = \`
      <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem;padding:1rem;background:var(--bg-secondary);border-radius:var(--radius-sm);border:1px solid var(--border-color)">
        <div class="character-avatar-box" style="width:58px;height:58px;font-size:1.45rem;">
          \${char.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 style="font-family:var(--font-heading);font-size:1.4rem;color:var(--text-primary);margin:0 0 0.25rem 0;">\${char.name}</h2>
          <div style="font-size:0.9rem;color:var(--text-secondary)">
            Xuất hiện trong tác phẩm: <strong style="color:var(--cerulean-700)">\${char.workTitle}</strong> · Tác giả: <strong>\${char.author || 'Khuyết danh'}</strong>
          </div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">
            \${char.role || 'Nhân vật văn học kinh điển'}
          </div>
        </div>
      </div>

      \${char.quote ? \`
        <div style="background:var(--bg-secondary);border-left:4px solid var(--amber-600);padding:0.85rem 1.1rem;border-radius:var(--radius-xs);margin-bottom:1.25rem;font-style:italic;line-height:1.6;font-size:0.95rem;color:var(--text-primary)">
          “\${char.quote}”
        </div>
      \` : ''}

      <div style="margin-bottom:1.2rem;">
        <h4 style="font-family:var(--font-heading);font-size:1rem;color:var(--cerulean-800);margin:0 0 0.4rem 0;display:flex;align-items:center;gap:0.4rem">
          <span>👤</span> Hoàn Cảnh Xuất Thân, Diện Mạo &amp; Tính Cách
        </h4>
        <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-surface);padding:0.85rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          \${char.personality || 'Đang cập nhật phân tích hoàn cảnh và tính cách nhân vật...'}
        </div>
      </div>

      <div>
        <h4 style="font-family:var(--font-heading);font-size:1rem;color:var(--cerulean-800);margin:0 0 0.4rem 0;display:flex;align-items:center;gap:0.4rem">
          <span>🌟</span> Ý Nghĩa Biểu Tượng &amp; Chiều Sâu Nhân Đạo Trong Đề Thi
        </h4>
        <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-surface);padding:0.85rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          \${char.symbolicMeaning || 'Đang cập nhật ý nghĩa biểu tượng...'}
        </div>
      </div>
    \`;

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
    document.getElementById('char-edit-modal-title').textContent = \`Chỉnh Sửa Nhân Vật: \${char.name}\`;
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

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
      const safeId = art.id.replace(/'/g, "\\\\'");
      return \`
        <div class="article-row-item">
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap">
              <span class="subview-status-tag published">\${art.category || 'Văn mẫu'}</span>
              <span class="subview-status-tag draft" style="color:var(--cerulean-800);background:var(--cerulean-50)">\${art.grade || 'Lớp 12'}</span>
              \${art.views ? \`<span style="font-size:0.75rem;color:var(--text-muted)">👁️ \${art.views} lượt xem</span>\` : ''}
            </div>
            <div class="article-title-text" style="cursor:pointer;" onclick="window.literaryAdmin.openArticleDetailModal('\${safeId}')">
              \${art.title}
            </div>
            <div class="article-meta-row">
              <span>Tác phẩm: <strong style="color:var(--text-primary)">\${art.workTitle || 'Chung'}</strong></span>
              <span>· Người biên soạn: <strong>\${art.author || 'Ban Biên Tập'}</strong></span>
            </div>
            \${art.summary ? \`<p style="font-size:0.85rem;color:var(--text-secondary);margin:0.5rem 0 0 0;line-height:1.5">\${art.summary}</p>\` : ''}
          </div>
          <div style="display:flex;gap:0.4rem;flex-shrink:0;align-items:center;">
            <button type="button" class="btn-editorial-primary" style="padding:0.35rem 0.8rem;font-size:0.82rem;" onclick="window.literaryAdmin.openArticleDetailModal('\${safeId}')" title="Đọc toàn văn bài phân tích">
              Đọc bài viết
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.35rem 0.8rem;font-size:0.82rem;" onclick="window.literaryAdmin.openEditArticleModal('\${safeId}')" title="Sửa bài viết">
              Sửa
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.35rem 0.8rem;font-size:0.82rem;color:var(--jasper-700);" onclick="window.literaryAdmin.deleteArticle('\${safeId}')" title="Xóa bài viết">
              Xóa
            </button>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Kho tài liệu học liệu gồm <strong>\${(this.articles || []).length}</strong> bài phân tích chuyên sâu, dàn ý và văn mẫu trọng tâm.
        </div>
        <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewArticleModal()">
          <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Soạn bài phân tích mới</span>
        </button>
      </div>
      <div class="subview-articles-list">
        \${listHtml || '<div style="text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Chưa có bài viết nào trong kho học liệu.</div>'}
      </div>
    \`;
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

    body.innerHTML = \`
      <div style="margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid var(--border-color)">
        <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap">
          <span class="subview-status-tag published">\${art.category || 'Văn mẫu chọn lọc'}</span>
          <span class="subview-status-tag draft" style="color:var(--cerulean-800);background:var(--cerulean-50)">\${art.grade || 'Lớp 12'}</span>
          <span style="font-size:0.8rem;color:var(--text-muted)">Liên quan: <strong style="color:var(--cerulean-700)">\${art.workTitle || 'Tổng hợp'}</strong></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">· Tác giả: <strong>\${art.author || 'Ban Biên Tập'}</strong></span>
        </div>
        <h2 style="font-family:var(--font-heading);font-size:1.35rem;color:var(--text-primary);margin:0.25rem 0 0.5rem 0;line-height:1.4">
          \${art.title}
        </h2>
        \${art.summary ? \`
          <div style="background:var(--bg-secondary);padding:0.75rem 1rem;border-radius:var(--radius-xs);border-left:3px solid var(--cerulean-600);font-size:0.88rem;color:var(--text-secondary);line-height:1.55">
            <strong>Dàn ý luận điểm:</strong> \${art.summary}
          </div>
        \` : ''}
      </div>
      <div style="font-size:0.95rem;line-height:1.75;color:var(--text-primary);white-space:pre-wrap;font-family:var(--font-body)">
\${art.content || 'Nội dung bài viết đang được Ban Biên Tập hoàn thiện...'}
      </div>
    \`;

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
    document.getElementById('art-edit-modal-title').textContent = \`Chỉnh Sửa: \${art.title}\`;
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

    const id = mode === 'edit' ? originalId : title.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
      const safeId = t.id.replace(/'/g, "\\\\'");
      return \`
        <div class="term-card" onclick="window.literaryAdmin.openTermDetailModal('\${safeId}')">
          <div class="module-card-header">
            <h4 class="module-card-title">\${t.name}</h4>
            <span class="module-card-badge" style="color:var(--cerulean-700)">\${t.type}</span>
          </div>
          <p class="module-card-desc" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            \${t.definition}
          </p>
          \${t.example ? \`
            <div style="background:var(--bg-secondary);padding:0.6rem 0.8rem;border-radius:var(--radius-xs);border-left:2px solid var(--amber-600);font-size:0.8rem;line-height:1.5;color:var(--text-primary);margin-bottom:0.75rem;font-style:italic">
              \${t.example}
            </div>
          \` : ''}
          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openTermDetailModal('\${safeId}')" title="Xem tra cứu chi tiết">
              <span>Xem chi tiết</span>
            </button>
            <div style="display:flex;gap:0.35rem">
              <button type="button" class="subview-action-btn" onclick="event.stopPropagation(); window.literaryAdmin.openEditTermModal('\${safeId}')" title="Sửa thuật ngữ">
                <span>Sửa</span>
              </button>
              <button type="button" class="subview-action-btn btn-danger" onclick="event.stopPropagation(); window.literaryAdmin.deleteTerm('\${safeId}')" title="Xóa thuật ngữ">
                <svg class="editorial-icon icon-sm" viewBox="0 0 24 24" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:1rem;flex-wrap:wrap">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Từ điển tra cứu <strong>\${list.length}</strong> khái niệm lý luận, biện pháp tu từ &amp; thi pháp văn học.
        </div>
        <div class="admin-search-wrap" style="margin:0;width:240px">
          <svg class="editorial-icon icon-sm admin-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="admin-search-input" placeholder="Tìm thuật ngữ..." value="\${this.termSearchQuery || ''}" oninput="window.literaryAdmin.filterTerms(this.value)">
        </div>
      </div>
      <div class="subview-terms-grid">
        \${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không tìm thấy thuật ngữ phù hợp.</div>'}
      </div>
    \`;
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

    if (heading) heading.textContent = \`Thuật Ngữ: \${term.name}\`;

    body.innerHTML = \`
      <div style="margin-bottom:1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <h2 style="font-family:var(--font-heading);font-size:1.35rem;color:var(--text-primary);margin:0">\${term.name}</h2>
          <span class="subview-status-tag published" style="font-size:0.8rem">\${term.type}</span>
        </div>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0">📖 Định Nghĩa Khoa Học</h4>
        <div style="font-size:0.92rem;line-height:1.65;color:var(--text-primary);background:var(--bg-secondary);padding:0.85rem 1rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
          \${term.definition}
        </div>
      </div>

      \${term.example ? \`
        <div style="margin-bottom:1.2rem;">
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0">🌿 Ví Dụ Ngữ Liệu Văn Học Chuẩn SGK</h4>
          <div style="font-size:0.9rem;line-height:1.65;color:var(--text-primary);background:var(--bg-surface);padding:0.85rem 1rem;border-radius:var(--radius-xs);border-left:3px solid var(--amber-600);border-top:1px solid var(--border-color);border-right:1px solid var(--border-color);border-bottom:1px solid var(--border-color);font-style:italic">
            \${term.example}
          </div>
        </div>
      \` : ''}

      \${term.application ? \`
        <div>
          <h4 style="font-family:var(--font-heading);font-size:0.95rem;color:var(--cerulean-800);margin:0 0 0.35rem 0">💡 Bí Quyết Vận Dụng Trong Bài Làm Đạt Điểm Cao</h4>
          <div style="font-size:0.9rem;line-height:1.65;color:var(--text-secondary);background:var(--bg-secondary);padding:0.85rem 1rem;border-radius:var(--radius-xs);border:1px solid var(--border-color)">
            \${term.application}
          </div>
        </div>
      \` : ''}
    \`;

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
    document.getElementById('term-edit-modal-title').textContent = \`Chỉnh Sửa Thuật Ngữ: \${term.name}\`;
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

    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
      const safeId = c.id.replace(/'/g, "\\\\'");
      const statusBadge = c.status === 'approved'
        ? '<span class="subview-status-tag published">🟢 Đã duyệt</span>'
        : (c.status === 'replied' ? '<span class="subview-status-tag" style="background:#e0f2fe;color:#0369a1;">🔵 Đã phản hồi</span>' : '<span class="subview-status-tag draft">🟡 Chờ duyệt</span>');

      return \`
        <div class="comment-row-item \${c.status}">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
            <div style="display:flex;align-items:center;gap:0.6rem">
              <strong>\${c.authorName}</strong>
              <span style="font-size:0.75rem;padding:2px 8px;background:var(--bg-secondary);border-radius:12px;color:var(--text-muted)">\${c.authorRole}</span>
              \${statusBadge}
            </div>
            <div style="font-size:0.8rem;color:var(--text-muted)">
              Tác phẩm: <strong style="color:var(--cerulean-700)">\${c.workTitle}</strong> · \${c.date}
            </div>
          </div>

          <div class="comment-quote-bubble">
            “\${c.content}”
          </div>

          \${c.reply ? \`
            <div class="comment-reply-bubble">
              <strong style="display:block;margin-bottom:0.25rem;font-size:0.8rem;color:var(--cerulean-800)">✍️ Phản hồi của Ban Biên Tập Văn Uyển:</strong>
              \${c.reply}
            </div>
          \` : ''}

          <div style="display:flex;justify-content:flex-end;gap:0.4rem;margin-top:0.4rem">
            \${c.status === 'pending' ? \`
              <button type="button" class="btn-editorial-primary" style="padding:0.3rem 0.75rem;font-size:0.8rem" onclick="window.literaryAdmin.approveComment('\${safeId}')">
                Duyệt hiển thị
              </button>
            \` : ''}
            <button type="button" class="btn-editorial-secondary" style="padding:0.3rem 0.75rem;font-size:0.8rem" onclick="window.literaryAdmin.openCommentReplyModal('\${safeId}')">
              \${c.reply ? 'Sửa phản hồi' : 'Viết phản hồi'}
            </button>
            <button type="button" class="btn-editorial-secondary" style="padding:0.3rem 0.75rem;font-size:0.8rem;color:var(--jasper-700)" onclick="window.literaryAdmin.deleteComment('\${safeId}')">
              Xóa
            </button>
          </div>
        </div>
      \`;
    }).join('');

    const pendingCount = (this.comments || []).filter(c => c.status === 'pending').length;
    const approvedCount = (this.comments || []).filter(c => c.status === 'approved').length;
    const repliedCount = (this.comments || []).filter(c => c.status === 'replied').length;

    this.subviewPanel.innerHTML = \`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:0.8rem;flex-wrap:wrap">
        <div class="admin-filter-tabs">
          <button class="admin-filter-btn \${statusFilter === 'all' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('all')">
            Tất cả (\${(this.comments || []).length})
          </button>
          <button class="admin-filter-btn \${statusFilter === 'pending' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('pending')">
            Chờ duyệt (\${pendingCount})
          </button>
          <button class="admin-filter-btn \${statusFilter === 'approved' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('approved')">
            Đã duyệt (\${approvedCount})
          </button>
          <button class="admin-filter-btn \${statusFilter === 'replied' ? 'active' : ''}" onclick="window.literaryAdmin.filterCommentsByStatus('replied')">
            Đã phản hồi (\${repliedCount})
          </button>
        </div>
      </div>
      <div class="subview-comments-list">
        \${itemsHtml || '<div style="text-align:center;padding:3rem;color:var(--text-muted);font-style:italic">Không có bình luận nào trong danh mục này.</div>'}
      </div>
    \`;
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
      infoBox.innerHTML = \`
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.35rem">
          Độc giả: <strong style="color:var(--text-primary)">\${cmt.authorName}</strong> (\${cmt.authorRole}) · Tác phẩm: <strong>\${cmt.workTitle}</strong>
        </div>
        <div style="font-size:0.9rem;font-style:italic;color:var(--text-primary)">
          “\${cmt.content}”
        </div>
      \`;
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
      const safeId = u.id.replace(/'/g, "\\\\'");
      const roleBadgeClass = u.role === 'admin' ? 'admin' : (u.role === 'editor' ? 'editor' : (u.role === 'moderator' ? 'moderator' : 'contributor'));

      const permsPills = (u.permissions || []).map(p => {
        return \`<span style="font-size:0.75rem;padding:1px 6px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;color:var(--text-secondary)">\${p}</span>\`;
      }).join('');

      return \`
        <div class="user-card-item">
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div class="user-avatar-circle">\${initials}</div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap">
                <strong style="font-family:var(--font-heading);font-size:1.05rem;color:var(--text-primary)">\${u.name}</strong>
                <span class="role-badge \${roleBadgeClass}">\${u.role}</span>
              </div>
              <div style="font-size:0.82rem;color:var(--text-muted)">\${u.email}</div>
              <div style="font-size:0.8rem;color:var(--cerulean-700);margin-top:0.15rem">\${u.roleTitle}</div>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin:0.4rem 0">
            \${permsPills}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;color:var(--text-muted);border-top:1px dashed var(--border-color);padding-top:0.6rem">
            <span>Đóng góp: <strong>\${u.articlesCount || 0} bài</strong></span>
            <span>Trạng thái: \${u.status === 'active' ? '<strong style="color:#10b981">🟢 Hoạt động</strong>' : '<strong style="color:var(--jasper-700)">🔴 Khóa</strong>'}</span>
          </div>

          <div class="module-card-footer">
            <button type="button" class="subview-action-btn" onclick="window.literaryAdmin.openEditUserModal('\${safeId}')" title="Phân quyền tài khoản">
              <span>Phân quyền</span>
            </button>
            <button type="button" class="subview-action-btn \${u.status === 'active' ? 'btn-danger' : ''}" onclick="window.literaryAdmin.toggleUserStatus('\${safeId}')">
              <span>\${u.status === 'active' ? 'Tạm khóa' : 'Kích hoạt'}</span>
            </button>
          </div>
        </div>
      \`;
    }).join('');

    this.subviewPanel.innerHTML = \`
      <div style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem">
        <div style="font-size:0.9rem;color:var(--text-secondary)">
          Hệ thống phân quyền Ban Biên Tập với <strong>\${(this.users || []).length}</strong> tài khoản thành viên.
        </div>
        <button type="button" class="btn-editorial-primary" onclick="window.literaryAdmin.openNewUserModal()">
          <svg class="editorial-icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Thêm thành viên</span>
        </button>
      </div>
      <div class="subview-users-grid">
        \${cardsHtml}
      </div>
    \`;
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
    document.getElementById('user-modal-title').textContent = \`Phân Quyền: \${u.name}\`;
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
    const id = mode === 'edit' ? originalId : name.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
    this.showToast(\`Đã \${u.status === 'active' ? 'kích hoạt' : 'tạm khóa'} tài khoản thành viên.\`, 'info');
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
`;

// Insert subviewsCode right before filterByCategory(catKey) {
const filterCatPattern = 'filterByCategory(catKey) {';
if (!code.includes(filterCatPattern)) {
  console.error('Cannot find filterCatPattern in code!');
  process.exit(1);
}

code = code.replace(filterCatPattern, subviewsCode + '\n  ' + filterCatPattern);

// Also update clearSubviewFilter to clear activeEraFilter and activeThemeFilter
const oldClearPattern = `  clearSubviewFilter() {
    this.activeCategoryFilter = null;
    this.activeAuthorFilter = null;
    this.activeOriginFilter = null;
    this.currentPage = 1;
    this.renderTable();
    if (this.currentSidebarTab === 'categories') this._renderCategoriesSubview();
    else if (this.currentSidebarTab === 'authors') this._renderAuthorsSubview();
    else if (this.currentSidebarTab === 'origins') this._renderOriginsSubview();
    this.scrollToTop();
    this.showToast('Đã xóa bộ lọc danh mục.', 'info');
  }`;

const newClearPattern = `  clearSubviewFilter() {
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
  }`;

if (code.includes(oldClearPattern)) {
  code = code.replace(oldClearPattern, newClearPattern);
}

// Update _renderActiveSubfilterBanner
const oldBannerCheck = `    } else if (this.activeOriginFilter) {
      const origText = this.activeOriginFilter === 'vn' ? 'Việt Nam' : (this.activeOriginFilter === 'world' ? 'Thế Giới' : this.activeOriginFilter);
      filterLabel = \`Xuất Xứ: "\${origText}"\`;
    }`;

const newBannerCheck = `    } else if (this.activeOriginFilter) {
      const origText = this.activeOriginFilter === 'vn' ? 'Việt Nam' : (this.activeOriginFilter === 'world' ? 'Thế Giới' : this.activeOriginFilter);
      filterLabel = \`Xuất Xứ: "\${origText}"\`;
    } else if (this.activeEraFilter) {
      const eraObj = (this.eras || []).find(e => e.id === this.activeEraFilter);
      filterLabel = \`Thời Kỳ: "\${eraObj ? eraObj.name : this.activeEraFilter}"\`;
    } else if (this.activeThemeFilter) {
      const themeObj = (this.themes || []).find(t => t.id === this.activeThemeFilter);
      filterLabel = \`Chủ Đề: "\${themeObj ? themeObj.title : this.activeThemeFilter}"\`;
    }`;

if (code.includes(oldBannerCheck)) {
  code = code.replace(oldBannerCheck, newBannerCheck);
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully patched subviews & handlers into js/admin.js');
