/**
 * VĂN UYỂN — FIREBASE INSTANT FALLBACK & STORAGE ADAPTER
 * Đảm bảo window.firebaseService luôn sẵn sàng ngay lập tức từ frame 0.
 * Giúp việc lưu trữ, chỉnh sửa và đồng bộ Độc giả luôn hoạt động thông suốt
 * ngay cả khi ngoại tuyến, mạng chậm hoặc Firebase CDN bị chặn bởi AdBlocker.
 */

(function () {
  const LOCAL_STORAGE_KEY = 'van_uyen_custom_works';

  class InstantFallbackService {
    constructor() {
      this.isInitialized = true;
      this.isFallback = true;
      this.status = 'offline'; // 'connected' | 'offline' | 'permission-denied'
      this.listeners = [];
      this.cachedWorks = new Map();
      this._loadLocal();
    }

    _loadLocal() {
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            list.forEach(item => {
              if (item && item.id) this.cachedWorks.set(item.id, item);
            });
          }
        }
      } catch (e) {
        console.warn("[Fallback Storage] Không thể đọc cache:", e);
      }
    }

    _saveLocal(workData) {
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        let list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];
        const idx = list.findIndex(w => w.id === workData.id);
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...workData };
        } else {
          list.push(workData);
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        this.cachedWorks.set(workData.id, workData);

        // Phát sự kiện toàn cục để trang Reader cập nhật tức thời
        window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: workData }));
      } catch (e) {
        console.warn("[Fallback Storage] Lỗi lưu cache:", e);
      }
    }

    _deleteLocal(workId) {
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          let list = JSON.parse(raw);
          if (Array.isArray(list)) {
            list = list.filter(w => w.id !== workId);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
          }
        }
        this.cachedWorks.delete(workId);
        window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: { id: workId, _deleted: true } }));
      } catch (e) {
        console.warn("[Fallback Storage] Lỗi xóa cache:", e);
      }
    }

    onStatusChange(cb) {
      if (typeof cb === 'function') {
        this.listeners.push(cb);
        cb(this.status);
      }
    }

    notifyStatus(status, err = null) {
      this.status = status;
      this.listeners.forEach(cb => {
        try { cb(status, err); } catch (e) { console.error(e); }
      });
    }

    async getCustomWorks() {
      this._loadLocal();
      return Array.from(this.cachedWorks.values());
    }

    async getWork(workId) {
      if (!workId) return null;
      if (this.cachedWorks.has(workId)) {
        return this.cachedWorks.get(workId);
      }
      this._loadLocal();
      return this.cachedWorks.get(workId) || null;
    }

    async saveWork(workData) {
      if (!workData || !workData.id) {
        throw new Error("Dữ liệu tác phẩm thiếu mã định danh (id).");
      }
      const item = {
        ...workData,
        id: String(workData.id).trim(),
        updatedAt: new Date().toISOString(),
        lastModifiedBy: "Admin CMS (Bộ nhớ máy)"
      };
      this._saveLocal(item);
      return { success: true, workId: item.id, cloud: false };
    }

    async deleteWork(workId) {
      if (!workId) return false;
      this._deleteLocal(workId);
      return true;
    }

    async seedAllWorks(worksList, onProgress) {
      if (!Array.isArray(worksList) || worksList.length === 0) return { total: 0, successCount: 0 };
      const total = worksList.length;
      for (let i = 0; i < total; i++) {
        const work = worksList[i];
        this._saveLocal(work);
        if (typeof onProgress === 'function') {
          onProgress({ current: i + 1, total, workTitle: work.title, success: true });
        }
      }
      return { total, successCount: total };
    }

    async saveAuthor(authorData) {
      if (!authorData) return { success: false };
      const id = authorData.id || authorData.name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      return this._saveGenericDoc('van_uyen_custom_authors', { ...authorData, id });
    }

    async deleteAuthor(authorId) {
      return this._deleteGenericDoc('van_uyen_custom_authors', authorId);
    }

    async saveCategory(catData) {
      if (!catData) return { success: false };
      const id = catData.id || catData.title?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      return this._saveGenericDoc('van_uyen_custom_categories', { ...catData, id });
    }

    async deleteCategory(catId) {
      return this._deleteGenericDoc('van_uyen_custom_categories', catId);
    }

    async saveOrigin(originData) {
      if (!originData) return { success: false };
      const id = originData.id || originData.name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      return this._saveGenericDoc('van_uyen_custom_origins', { ...originData, id });
    }

    async deleteOrigin(originId) {
      return this._deleteGenericDoc('van_uyen_custom_origins', originId);
    }

    async saveUser(userData) {
      if (!userData) return { success: false };
      return this._saveGenericDoc('van_uyen_custom_users', userData);
    }

    _saveGenericDoc(localKey, item) {
      try {
        const raw = localStorage.getItem(localKey);
        let list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];
        const idx = list.findIndex(d => d.id === item.id);
        if (idx >= 0) list[idx] = { ...list[idx], ...item };
        else list.push(item);
        localStorage.setItem(localKey, JSON.stringify(list));
        return { success: true, id: item.id, cloud: false };
      } catch(e) {
        return { success: false, error: e.message };
      }
    }

    _deleteGenericDoc(localKey, id) {
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) {
          let list = JSON.parse(raw);
          if (Array.isArray(list)) {
            list = list.filter(d => d.id !== id);
            localStorage.setItem(localKey, JSON.stringify(list));
          }
        }
        return true;
      } catch(e) {
        return false;
      }
    }

    trackEvent(eventName, params) {
      // Offline / fallback stub
    }
  }

  // Khởi tạo ngay lập tức nếu chưa có
  if (!window.firebaseService) {
    window.firebaseService = new InstantFallbackService();
  }
})();
