/**
 * VĂN UYỂN - WRITING STUDIO & DRAFTPAD
 * Góc sáng tác văn thơ chuẩn Typography Editorial cho độc giả
 */

class LiteraryStudio {
  constructor() {
    this.titleInput = null;
    this.authorInput = null;
    this.genreSelect = null;
    this.contentInput = null;

    this.previewTitle = null;
    this.previewMeta = null;
    this.previewBody = null;
    this.counterEl = null;

    this.init();
  }

  init() {
    this.titleInput = document.getElementById('studio-title');
    this.authorInput = document.getElementById('studio-author');
    this.genreSelect = document.getElementById('studio-genre');
    this.contentInput = document.getElementById('studio-content');

    this.previewTitle = document.getElementById('preview-title');
    this.previewMeta = document.getElementById('preview-meta');
    this.previewBody = document.getElementById('preview-body');
    this.counterEl = document.getElementById('studio-word-count');

    // Nạp bản nháp đã lưu
    this.loadSavedDraft();

    // Lắng nghe sự kiện gõ phím
    if (this.contentInput) {
      this.contentInput.addEventListener('input', () => this.updatePreview());
    }
    if (this.titleInput) {
      this.titleInput.addEventListener('input', () => this.updatePreview());
    }
    if (this.authorInput) {
      this.authorInput.addEventListener('input', () => this.updatePreview());
    }
    if (this.genreSelect) {
      this.genreSelect.addEventListener('change', () => this.updatePreview());
    }
  }

  setGenre(genreVal, genreLabel) {
    if (this.genreSelect) {
      this.genreSelect.value = genreVal;
    }
    const textEl = document.querySelector('#studio-genre-dropdown .dropdown-selected-text');
    if (textEl && genreLabel) {
      textEl.textContent = genreLabel;
    }
    this.updatePreview();
  }

  updatePreview() {
    const title = this.titleInput ? this.titleInput.value.trim() || 'Tựa Đề Bản Thảo' : 'Tựa Đề';
    const author = this.authorInput ? this.authorInput.value.trim() || 'Khuyết Danh' : 'Khuyết Danh';
    const genre = this.genreSelect ? this.genreSelect.value : 'Tản văn';
    const text = this.contentInput ? this.contentInput.value : '';

    if (this.previewTitle) this.previewTitle.textContent = title;
    if (this.previewMeta) {
      const now = new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
      this.previewMeta.textContent = `Bút tích bởi: ${author} • Thể loại: ${genre} • Ngày chép: ${now}`;
    }

    if (this.previewBody) {
      if (!text.trim()) {
        this.previewBody.innerHTML = `
          <p style="color: var(--ink-subtle); font-style: italic;">
            Văn bản xem trước sẽ xuất hiện tại đây theo phong cách trang in tạp chí... Khởi bút cùng nguồn cảm hứng của bạn.
          </p>
        `;
      } else {
        // Tự động phân đoạn và hiển thị thơ hoặc văn xuôi
        const isPoetry = genre.toLowerCase().includes('thơ');
        const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');

        if (isPoetry) {
          this.previewBody.className = 'preview-rendered-body poetry-preview';
          this.previewBody.innerHTML = paragraphs.map(p => {
            return `<p style="margin-bottom: 1.5rem; text-align: center;">${p.replace(/\n/g, '<br>')}</p>`;
          }).join('');
        } else {
          this.previewBody.className = 'preview-rendered-body drop-cap';
          this.previewBody.innerHTML = paragraphs.map((p, index) => {
            return `<p style="margin-bottom: 1.25rem;">${p}</p>`;
          }).join('');
        }
      }
    }

    // Đếm số từ & ký tự
    if (this.counterEl) {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      this.counterEl.textContent = `${words} từ • ${chars} ký tự`;
    }

    // Tự động lưu bản nháp sau mỗi lần gõ
    this.saveDraftToStorage();
  }

  saveDraftToStorage() {
    const draft = {
      title: this.titleInput ? this.titleInput.value : '',
      author: this.authorInput ? this.authorInput.value : '',
      genre: this.genreSelect ? this.genreSelect.value : 'Tản văn',
      content: this.contentInput ? this.contentInput.value : ''
    };
    localStorage.setItem('vanuyen_saved_draft', JSON.stringify(draft));
  }

  loadSavedDraft() {
    const saved = localStorage.getItem('vanuyen_saved_draft');
    if (!saved) return;
    try {
      const draft = JSON.parse(saved);
      if (this.titleInput && draft.title) this.titleInput.value = draft.title;
      if (this.authorInput && draft.author) this.authorInput.value = draft.author;
      if (this.genreSelect && draft.genre) {
        this.genreSelect.value = draft.genre;
        const textEl = document.querySelector('#studio-genre-dropdown .dropdown-selected-text');
        if (textEl) {
          const item = document.querySelector(`#studio-genre-dropdown .editorial-dropdown-item[data-value="${draft.genre}"]`);
          if (item) {
            textEl.textContent = item.getAttribute('data-label') || draft.genre;
            document.querySelectorAll('#studio-genre-dropdown .editorial-dropdown-item').forEach(it => it.classList.remove('active'));
            item.classList.add('active');
          }
        }
      }
      if (this.contentInput && draft.content) this.contentInput.value = draft.content;
      this.updatePreview();
    } catch (e) {}
  }

  clearDraft() {
    if (confirm("Bạn có chắc chắn muốn làm mới bản thảo này không?")) {
      if (this.titleInput) this.titleInput.value = '';
      if (this.contentInput) this.contentInput.value = '';
      localStorage.removeItem('vanuyen_saved_draft');
      this.updatePreview();
      window.literaryApp.showToast("Đã làm mới bản thảo!");
    }
  }

  exportDraft() {
    const title = this.titleInput ? this.titleInput.value.trim() || 'Ban-thao-van-uyen' : 'Ban-thao';
    const author = this.authorInput ? this.authorInput.value.trim() || 'Tac-gia' : '';
    const text = this.contentInput ? this.contentInput.value : '';

    if (!text.trim()) {
      alert("Bản thảo còn trống, bạn hãy viết nội dung trước khi xuất tệp nhé!");
      return;
    }

    const exportContent = `# ${title}\nBút danh: ${author}\nĐăng tải qua: Văn Uyển Editorial\n\n${text}\n`;
    const blob = new Blob([exportContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    link.click();
    URL.revokeObjectURL(url);

    window.literaryApp.showToast("Đã xuất bản thảo thành công định dạng Markdown!");
  }
}

window.literaryStudio = null;
document.addEventListener('DOMContentLoaded', () => {
  window.literaryStudio = new LiteraryStudio();
});
