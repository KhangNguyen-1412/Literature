/**
 * VĂN UYỂN — FIREBASE, CLOUD FIRESTORE & ANALYTICS SERVICE
 * Dự án: litterarum-16c16
 * Web App: 1:279363852160:web:3ec3c8292a0d0dce505365
 * Measurement ID: G-MDRFTSNV8B
 * 
 * Tính năng:
 * - Khởi tạo Firebase App với cấu hình chính thức từ Google Firebase Console
 * - Kích hoạt Google Analytics theo dõi truy cập đọc sách văn học
 * - Cơ sở dữ liệu Cloud Firestore thời gian thực cho Tác phẩm, Tác giả, Thể loại, Xuất xứ & Tài khoản
 * - Tích hợp Firebase Authentication & Fallback lưu trữ cục bộ bảo toàn dữ liệu hai chiều
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics, isSupported as isAnalyticsSupported, logEvent } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Cấu hình Firebase Web App chính thức của dự án Văn Uyển (litterarum-16c16)
const firebaseConfig = {
  apiKey: "AIzaSyAR6cKL2djIKHT15itE74mV5Qunyh1SUjs",
  authDomain: "litterarum-16c16.firebaseapp.com",
  projectId: "litterarum-16c16",
  storageBucket: "litterarum-16c16.firebasestorage.app",
  messagingSenderId: "279363852160",
  appId: "1:279363852160:web:3ec3c8292a0d0dce505365",
  measurementId: "G-MDRFTSNV8B"
};

const LOCAL_STORAGE_KEY = 'van_uyen_custom_works';

class FirebaseService {
  constructor() {
    this.app = null;
    this.db = null;
    this.analytics = null;
    this.auth = null;
    this.isInitialized = false;
    this.status = 'connecting'; // 'connected' | 'offline' | 'error' | 'permission-denied'
    this.listeners = [];
    this.cachedCustomWorks = new Map();

    // Nạp trước dữ liệu từ LocalStorage để trang web phản hồi tức thì
    this._loadFromLocalStorage();
  }

  _loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(item => {
            if (item && item.id) {
              this.cachedCustomWorks.set(item.id, item);
            }
          });
        }
      }
    } catch (e) {
      console.warn("[Firebase Cache] Lỗi đọc bộ nhớ cục bộ:", e);
    }
  }

  _saveToLocalStorage(workData, skipBroadcast = false) {
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
      this.cachedCustomWorks.set(workData.id, workData);

      // Phát sự kiện toàn cục để trang Reader & Admin cập nhật tức thời
      if (!skipBroadcast) {
        window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: workData }));
      }
    } catch (e) {
      console.warn("[Firebase Cache] Lỗi ghi bộ nhớ cục bộ:", e);
    }
  }

  _deleteFromLocalStorage(workId) {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        let list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list = list.filter(w => w.id !== workId);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        }
      }
      this.cachedCustomWorks.delete(workId);
      window.dispatchEvent(new CustomEvent('customWorksUpdated', { detail: { id: workId, _deleted: true } }));
    } catch (e) {
      console.warn("[Firebase Cache] Lỗi xóa mục bộ nhớ cục bộ:", e);
    }
  }

  /**
   * Khởi tạo kết nối Firebase App, Firestore, Analytics & Auth
   */
  async init() {
    if (this.isInitialized && this.db) {
      return true;
    }

    try {
      // 1. Khởi tạo Firebase App
      this.app = initializeApp(firebaseConfig);

      // 2. Khởi tạo Cloud Firestore
      this.db = getFirestore(this.app);

      // 3. Khởi tạo Firebase Analytics nếu môi trường trình duyệt hỗ trợ
      try {
        if (typeof window !== 'undefined' && await isAnalyticsSupported()) {
          this.analytics = getAnalytics(this.app);
          console.log("%c[Firebase Analytics]%c Sẵn sàng ghi nhận sự kiện độc giả (Measurement ID: G-MDRFTSNV8B)", "color: #1a6b8a; font-weight: bold;", "color: inherit;");
        }
      } catch (analyticsErr) {
        console.info("[Firebase Analytics] Môi trường không yêu cầu Analytics hoặc bị chặn:", analyticsErr.message);
      }

      // 4. Khởi tạo Firebase Auth
      try {
        this.auth = getAuth(this.app);
      } catch (authErr) {
        console.info("[Firebase Auth] Khởi tạo Auth:", authErr.message);
      }

      this.isInitialized = true;
      this.status = 'connected';
      this.notifyStatusChange();
      console.log("%c[Cloud Firestore]%c Đã kết nối thành công dự án: litterarum-16c16", "color: #27ae60; font-weight: bold;", "color: inherit;");
      return true;
    } catch (err) {
      this.status = 'offline';
      this.notifyStatusChange(err);
      console.warn("[Firebase] Không thể kết nối Cloud Firestore trực tuyến, chuyển sang bộ đệm cục bộ an toàn:", err);
      return false;
    }
  }

  onStatusChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
      cb(this.status);
    }
  }

  notifyStatusChange(err = null) {
    this.listeners.forEach(cb => {
      try { cb(this.status, err); } catch (e) { console.error(e); }
    });
  }

  /**
   * Ghi nhận sự kiện Analytics (ví dụ: đọc tác phẩm, tạo bài viết mới, đăng nhập)
   */
  trackEvent(eventName, params = {}) {
    try {
      if (this.analytics) {
        logEvent(this.analytics, eventName, params);
      }
    } catch (e) {
      // Bỏ qua lỗi analytics để không ảnh hưởng luồng chính
    }
  }

  // ══════════════════════════════════════════════════════════
  // 1. QUẢN LÝ TÁC PHẨM (COLLECTION 'works')
  // ══════════════════════════════════════════════════════════

  async getCustomWorks() {
    if (!this.db && !this.isInitialized) {
      await this.init();
    }

    if (this.db) {
      try {
        const worksCol = collection(this.db, "works");
        const snapshot = await getDocs(worksCol);
        const customWorks = [];

        snapshot.forEach(docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            this._saveToLocalStorage({ ...data, id: docSnap.id }, true);
            customWorks.push({ ...data, id: docSnap.id });
          }
        });

        this.status = 'connected';
        this.notifyStatusChange();
        return customWorks;
      } catch (err) {
        console.warn("[Firebase] Lỗi nạp works từ Firestore, chuyển dùng bản lưu máy:", err);
        this.status = (err.code === 'permission-denied') ? 'permission-denied' : 'offline';
        this.notifyStatusChange(err);
      }
    }

    return Array.from(this.cachedCustomWorks.values());
  }

  async getWork(workId) {
    if (!workId) return null;

    if (!this.db && !this.isInitialized) {
      await this.init();
    }

    if (this.db) {
      try {
        const docRef = doc(this.db, "works", workId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = { ...snap.data(), id: snap.id };
          this._saveToLocalStorage(data, true);
          return data;
        }
      } catch (err) {
        console.warn(`[Firebase] Không thể đọc tác phẩm ${workId} từ Firestore:`, err);
      }
    }

    if (this.cachedCustomWorks.has(workId)) {
      return this.cachedCustomWorks.get(workId);
    }
    return null;
  }

  async saveWork(workData) {
    if (!workData || !workData.id) {
      throw new Error("Dữ liệu tác phẩm thiếu mã định danh (id) hợp lệ.");
    }

    const workId = String(workData.id).trim();
    const payload = {
      ...workData,
      id: workId,
      updatedAt: new Date().toISOString(),
      lastModifiedBy: "Admin CMS"
    };

    // Luôn lưu vào LocalStorage trước tiên
    this._saveToLocalStorage(payload, false);

    if (!this.db && !this.isInitialized) {
      await this.init();
    }

    if (this.db) {
      try {
        const docRef = doc(this.db, "works", workId);
        await setDoc(docRef, { ...payload, updatedAt: serverTimestamp() }, { merge: true });
        this.status = 'connected';
        this.notifyStatusChange();
        this.trackEvent('save_work', { work_id: workId, title: payload.title || '' });
        return { success: true, workId, cloud: true };
      } catch (err) {
        console.warn(`[Firebase] Không thể ghi tác phẩm ${workId} lên Firestore:`, err);
        const isPermission = (err && err.code === 'permission-denied');
        if (isPermission) {
          this.status = 'permission-denied';
          this.notifyStatusChange(err);
        }
        return {
          success: true,
          workId,
          cloud: false,
          warning: isPermission ? 'permission-denied' : (err.code || 'offline'),
          message: isPermission
            ? 'Security Rules của Firestore chưa mở quyền ghi. Dữ liệu đã lưu an toàn trong máy.'
            : `Đã lưu an toàn trong máy. (Firestore tạm ngắt kết nối: ${err.message || 'offline'})`
        };
      }
    }

    return { success: true, workId, cloud: false };
  }

  async deleteWork(workId) {
    if (!workId) return false;
    this._deleteFromLocalStorage(workId);

    if (!this.db && !this.isInitialized) {
      await this.init();
    }

    if (this.db) {
      try {
        const docRef = doc(this.db, "works", workId);
        await deleteDoc(docRef);
        this.trackEvent('delete_work', { work_id: workId });
        return true;
      } catch (err) {
        console.warn(`[Firebase] Không thể xóa tác phẩm ${workId} trên Firestore:`, err);
        return true;
      }
    }
    return true;
  }

  // ══════════════════════════════════════════════════════════
  // 2. QUẢN LÝ TÁC GIẢ (COLLECTION 'authors')
  // ══════════════════════════════════════════════════════════

  async saveAuthor(authorData) {
    if (!authorData) return { success: false };
    const id = authorData.id || authorData.name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    return this.saveDocument('authors', { ...authorData, id }, 'van_uyen_custom_authors');
  }

  async deleteAuthor(authorId) {
    return this.deleteDocument('authors', authorId, 'van_uyen_custom_authors');
  }

  async getAuthors() {
    return this.getCollection('authors', 'van_uyen_custom_authors');
  }

  // ══════════════════════════════════════════════════════════
  // 3. QUẢN LÝ THỂ LOẠI (COLLECTION 'categories')
  // ══════════════════════════════════════════════════════════

  async saveCategory(catData) {
    if (!catData) return { success: false };
    const id = catData.id || catData.title?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    return this.saveDocument('categories', { ...catData, id }, 'van_uyen_custom_categories');
  }

  async deleteCategory(catId) {
    return this.deleteDocument('categories', catId, 'van_uyen_custom_categories');
  }

  async getCategories() {
    return this.getCollection('categories', 'van_uyen_custom_categories');
  }

  // ══════════════════════════════════════════════════════════
  // 4. QUẢN LÝ XUẤT XỨ (COLLECTION 'origins')
  // ══════════════════════════════════════════════════════════

  async saveOrigin(originData) {
    if (!originData) return { success: false };
    const id = originData.id || originData.name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    return this.saveDocument('origins', { ...originData, id }, 'van_uyen_custom_origins');
  }

  async deleteOrigin(originId) {
    return this.deleteDocument('origins', originId, 'van_uyen_custom_origins');
  }

  async getOrigins() {
    return this.getCollection('origins', 'van_uyen_custom_origins');
  }

  // ══════════════════════════════════════════════════════════
  // 5. QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG (COLLECTION 'users')
  // ══════════════════════════════════════════════════════════

  async saveUser(userData) {
    if (!userData || (!userData.email && !userData.id)) return { success: false };
    const docId = (userData.email || userData.id).toLowerCase().replace(/[^a-z0-9]/g, '_');
    const payload = {
      ...userData,
      id: docId,
      updatedAt: new Date().toISOString()
    };
    return this.saveDocument('users', payload, 'van_uyen_custom_users');
  }

  async getUsers() {
    return this.getCollection('users', 'van_uyen_custom_users');
  }

  // ══════════════════════════════════════════════════════════
  // 6. PHƯƠNG THỨC FIRESTORE TỔNG QUÁT (GENERIC CRUD)
  // ══════════════════════════════════════════════════════════

  async getCollection(colName, localKey = null) {
    if (!this.db && !this.isInitialized) {
      await this.init();
    }

    if (this.db) {
      try {
        const colRef = collection(this.db, colName);
        const snapshot = await getDocs(colRef);
        const list = [];
        snapshot.forEach(docSnap => {
          if (docSnap.exists()) {
            list.push({ ...docSnap.data(), id: docSnap.id });
          }
        });
        if (localKey && list.length > 0) {
          try { localStorage.setItem(localKey, JSON.stringify(list)); } catch(e) {}
        }
        return list;
      } catch (err) {
        console.warn(`[Firebase] Không thể đọc collection '${colName}' từ Firestore:`, err);
      }
    }

    if (localKey) {
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) return JSON.parse(raw);
      } catch(e) {}
    }
    return [];
  }

  async getDocument(colName, docId, localKey = null) {
    if (!docId) return null;
    if (!this.db && !this.isInitialized) await this.init();

    if (this.db) {
      try {
        const docRef = doc(this.db, colName, String(docId));
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return { ...snap.data(), id: snap.id };
        }
      } catch(err) {
        console.warn(`[Firebase] Lỗi đọc doc '${docId}' trong '${colName}':`, err);
      }
    }

    if (localKey) {
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) return list.find(item => item.id === docId) || null;
        }
      } catch(e) {}
    }
    return null;
  }

  async saveDocument(colName, data, localKey = null) {
    if (!data || !data.id) return { success: false, error: 'Thiếu id' };
    const docId = String(data.id);

    // Lưu vào LocalStorage
    if (localKey) {
      try {
        const raw = localStorage.getItem(localKey);
        let list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];
        const idx = list.findIndex(item => item.id === docId);
        if (idx >= 0) list[idx] = { ...list[idx], ...data };
        else list.push(data);
        localStorage.setItem(localKey, JSON.stringify(list));
      } catch(e) {}
    }

    if (!this.db && !this.isInitialized) await this.init();

    if (this.db) {
      try {
        const docRef = doc(this.db, colName, docId);
        await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
        return { success: true, docId, cloud: true };
      } catch(err) {
        console.warn(`[Firebase] Lỗi ghi doc '${docId}' vào '${colName}':`, err);
        return { success: true, docId, cloud: false, warning: err.code };
      }
    }
    return { success: true, docId, cloud: false };
  }

  async deleteDocument(colName, docId, localKey = null) {
    if (!docId) return false;
    const sId = String(docId);

    if (localKey) {
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) {
          let list = JSON.parse(raw);
          if (Array.isArray(list)) {
            list = list.filter(item => item.id !== sId);
            localStorage.setItem(localKey, JSON.stringify(list));
          }
        }
      } catch(e) {}
    }

    if (!this.db && !this.isInitialized) await this.init();

    if (this.db) {
      try {
        const docRef = doc(this.db, colName, sId);
        await deleteDoc(docRef);
        return true;
      } catch(err) {
        console.warn(`[Firebase] Lỗi xóa doc '${sId}' khỏi '${colName}':`, err);
        return true;
      }
    }
    return true;
  }

  // ══════════════════════════════════════════════════════════
  // 7. ĐỒNG BỘ TOÀN DIỆN (SEED ALL DATA)
  // ══════════════════════════════════════════════════════════

  async seedAllWorks(worksList, onProgress) {
    if (!this.db && !this.isInitialized) await this.init();
    if (!Array.isArray(worksList) || worksList.length === 0) {
      throw new Error("Danh sách tác phẩm mẫu rỗng.");
    }

    let successCount = 0;
    const total = worksList.length;

    for (let i = 0; i < total; i++) {
      const work = worksList[i];
      try {
        const res = await this.saveWork(work);
        if (res.success) successCount++;
        if (typeof onProgress === 'function') {
          onProgress({ current: i + 1, total, workTitle: work.title, success: true });
        }
      } catch (err) {
        console.error(`[Firebase Seed] Lỗi tải lên ${work.id}:`, err);
        if (typeof onProgress === 'function') {
          onProgress({ current: i + 1, total, workTitle: work.title, success: false, error: err });
        }
      }
    }

    this.trackEvent('seed_all_works', { count: successCount, total });
    return { total, successCount };
  }

  // ══════════════════════════════════════════════════════════
  // 8. TÍCH HỢP FIREBASE AUTHENTICATION (OAUTH & EMAIL)
  // ══════════════════════════════════════════════════════════

  async signInWithGoogle() {
    if (!this.auth && !this.isInitialized) await this.init();
    if (!this.auth) throw new Error("Firebase Auth chưa sẵn sàng.");
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;
    const profile = {
      name: user.displayName || 'Độc giả Google',
      email: user.email,
      avatar: user.photoURL || '',
      role: 'Độc giả Văn Uyển',
      provider: 'google'
    };
    await this.saveUser(profile);
    this.trackEvent('login', { method: 'google' });
    return profile;
  }

  async signInWithGithub() {
    if (!this.auth && !this.isInitialized) await this.init();
    if (!this.auth) throw new Error("Firebase Auth chưa sẵn sàng.");
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;
    const profile = {
      name: user.displayName || user.email?.split('@')[0] || 'Cộng tác viên GitHub',
      email: user.email,
      avatar: user.photoURL || '',
      role: 'Cộng tác viên Văn Uyển',
      provider: 'github'
    };
    await this.saveUser(profile);
    this.trackEvent('login', { method: 'github' });
    return profile;
  }

  async signInWithEmail(email, password) {
    if (!this.auth && !this.isInitialized) await this.init();
    if (!this.auth) throw new Error("Firebase Auth chưa sẵn sàng.");
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const profile = {
      name: cred.user.displayName || email.split('@')[0],
      email: cred.user.email,
      role: 'Biên tập viên Văn Uyển'
    };
    await this.saveUser(profile);
    this.trackEvent('login', { method: 'email' });
    return profile;
  }

  async signUpWithEmail(email, password, displayName) {
    if (!this.auth && !this.isInitialized) await this.init();
    if (!this.auth) throw new Error("Firebase Auth chưa sẵn sàng.");
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const profile = {
      name: displayName || email.split('@')[0],
      email: cred.user.email,
      role: 'Thành viên mới'
    };
    await this.saveUser(profile);
    this.trackEvent('sign_up', { method: 'email' });
    return profile;
  }

  async sendPasswordReset(email) {
    if (!this.auth && !this.isInitialized) await this.init();
    if (!this.auth) throw new Error("Firebase Auth chưa sẵn sàng.");
    await sendPasswordResetEmail(this.auth, email);
    this.trackEvent('reset_password');
    return true;
  }
}

// Khởi tạo Singleton
const firebaseService = new FirebaseService();

// Kế thừa các listener đã đăng ký từ fallback nếu có
if (window.firebaseService && Array.isArray(window.firebaseService.listeners)) {
  firebaseService.listeners.push(...window.firebaseService.listeners);
}
window.firebaseService = firebaseService;

// Tự động kích hoạt kết nối ngầm và phát tín hiệu sẵn sàng
firebaseService.init().finally(() => {
  window.dispatchEvent(new CustomEvent('firebase-ready', { detail: firebaseService }));
});

export default firebaseService;
export { firebaseService };
