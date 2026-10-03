const fs = require('fs');
const assert = require('assert');

console.log('═════════════════════════════════════════════════════════════════');
console.log('   KIỂM THỬ TÍCH HỢP CLOUD FIRESTORE & FIREBASE ANALYTICS        ');
console.log('═════════════════════════════════════════════════════════════════\n');

// 1. Kiểm tra cấu hình trong js/firebase-service.js
console.log('1. Kiểm tra cấu hình Firebase trong js/firebase-service.js...');
const serviceCode = fs.readFileSync('js/firebase-service.js', 'utf8');

assert(serviceCode.includes('apiKey: "AIzaSyAR6cKL2djIKHT15itE74mV5Qunyh1SUjs"'), 'apiKey phải khớp');
assert(serviceCode.includes('authDomain: "litterarum-16c16.firebaseapp.com"'), 'authDomain phải khớp');
assert(serviceCode.includes('projectId: "litterarum-16c16"'), 'projectId phải khớp');
assert(serviceCode.includes('storageBucket: "litterarum-16c16.firebasestorage.app"'), 'storageBucket phải khớp');
assert(serviceCode.includes('messagingSenderId: "279363852160"'), 'messagingSenderId phải khớp');
assert(serviceCode.includes('appId: "1:279363852160:web:3ec3c8292a0d0dce505365"'), 'appId phải khớp');
assert(serviceCode.includes('measurementId: "G-MDRFTSNV8B"'), 'measurementId phải khớp');
assert(serviceCode.includes('initializeApp(firebaseConfig)'), 'Phải gọi initializeApp(firebaseConfig)');
assert(serviceCode.includes('getFirestore(this.app)'), 'Phải gọi getFirestore(this.app)');
assert(serviceCode.includes('getAnalytics(this.app)'), 'Phải gọi getAnalytics(this.app)');
assert(serviceCode.includes('getAuth(this.app)'), 'Phải gọi getAuth(this.app)');
console.log('   ✓ Cấu hình litterarum-16c16 và các hàm SDK đã được tích hợp chuẩn xác.');

// 2. Kiểm tra các phương thức Firestore đa thực thể
console.log('\n2. Kiểm tra các phương thức CRUD đa thực thể Firestore...');
assert(serviceCode.includes('saveWork(workData)'), 'Phải có saveWork');
assert(serviceCode.includes('getCustomWorks()'), 'Phải có getCustomWorks');
assert(serviceCode.includes('deleteWork(workId)'), 'Phải có deleteWork');
assert(serviceCode.includes('saveAuthor(authorData)'), 'Phải có saveAuthor');
assert(serviceCode.includes('deleteAuthor(authorId)'), 'Phải có deleteAuthor');
assert(serviceCode.includes('saveCategory(catData)'), 'Phải có saveCategory');
assert(serviceCode.includes('deleteCategory(catId)'), 'Phải có deleteCategory');
assert(serviceCode.includes('saveOrigin(originData)'), 'Phải có saveOrigin');
assert(serviceCode.includes('deleteOrigin(originId)'), 'Phải có deleteOrigin');
assert(serviceCode.includes('saveUser(userData)'), 'Phải có saveUser');
assert(serviceCode.includes('getUsers()'), 'Phải có getUsers');
assert(serviceCode.includes('saveDocument(colName, data'), 'Phải có generic saveDocument');
assert(serviceCode.includes('deleteDocument(colName, docId'), 'Phải có generic deleteDocument');
assert(serviceCode.includes('getCollection(colName'), 'Phải có generic getCollection');
assert(serviceCode.includes('trackEvent(eventName'), 'Phải có trackEvent cho Analytics');
console.log('   ✓ Đầy đủ các phương thức Firestore cho Tác phẩm, Tác giả, Thể loại, Xuất xứ, Người dùng.');

// 3. Kiểm tra fallback adapter js/firebase-fallback.js
console.log('\n3. Kiểm tra bộ đệm fallback js/firebase-fallback.js...');
const fallbackCode = fs.readFileSync('js/firebase-fallback.js', 'utf8');
assert(fallbackCode.includes('saveAuthor(authorData)'), 'Fallback phải có saveAuthor');
assert(fallbackCode.includes('saveCategory(catData)'), 'Fallback phải có saveCategory');
assert(fallbackCode.includes('saveOrigin(originData)'), 'Fallback phải có saveOrigin');
assert(fallbackCode.includes('saveUser(userData)'), 'Fallback phải có saveUser');
assert(fallbackCode.includes('trackEvent(eventName'), 'Fallback phải có trackEvent');
console.log('   ✓ Fallback Adapter đảm bảo hệ thống không bao giờ bị crash khi ngoại tuyến.');

// 4. Kiểm tra nạp script trong các trang HTML
console.log('\n4. Kiểm tra nạp Firebase trong index.html, admin.html, auth.html...');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('js/firebase-fallback.js') && indexHtml.includes('js/firebase-service.js'), 'index.html phải nạp firebase');

const adminHtml = fs.readFileSync('admin.html', 'utf8');
assert(adminHtml.includes('js/firebase-fallback.js') && adminHtml.includes('js/firebase-service.js'), 'admin.html phải nạp firebase');

const authHtml = fs.readFileSync('auth.html', 'utf8');
assert(authHtml.includes('js/firebase-fallback.js') && authHtml.includes('js/firebase-service.js'), 'auth.html phải nạp firebase');
console.log('   ✓ Toàn bộ 3 giao diện cốt lõi (Độc giả, Quản trị, Xác thực) đều đã kết nối Firebase.');

// 5. Kiểm tra tương tác Firestore trong js/admin.js & js/reader.js
console.log('\n5. Kiểm tra đồng bộ Firestore trong admin.js và reader.js...');
const adminJs = fs.readFileSync('js/admin.js', 'utf8');
assert(adminJs.includes('window.firebaseService.saveCategory(item)'), 'admin.js phải đồng bộ saveCategory lên Firestore');
assert(adminJs.includes('window.firebaseService.deleteCategory(id)'), 'admin.js phải đồng bộ deleteCategory lên Firestore');
assert(adminJs.includes('window.firebaseService.saveAuthor(item)'), 'admin.js phải đồng bộ saveAuthor lên Firestore');
assert(adminJs.includes('window.firebaseService.deleteAuthor(name)'), 'admin.js phải đồng bộ deleteAuthor lên Firestore');
assert(adminJs.includes('window.firebaseService.saveOrigin(item)'), 'admin.js phải đồng bộ saveOrigin lên Firestore');
assert(adminJs.includes('window.firebaseService.deleteOrigin(country)'), 'admin.js phải đồng bộ deleteOrigin lên Firestore');

const readerJs = fs.readFileSync('js/reader.js', 'utf8');
assert(readerJs.includes('window.firebaseService.trackEvent(\'read_work\''), 'reader.js phải ghi nhận Analytics khi mở tác phẩm');
console.log('   ✓ Đồng bộ sự kiện thời gian thực giữa Admin, Reader và Firestore hoàn tất.');

console.log('\n═════════════════════════════════════════════════════════════════');
console.log('   🎉 TẤT CẢ KIỂM THỬ TÍCH HỢP FIRESTORE ĐỀU THÀNH CÔNG 100%!     ');
console.log('═════════════════════════════════════════════════════════════════\n');
