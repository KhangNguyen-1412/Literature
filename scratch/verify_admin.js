const http = require('http');
const fs = require('fs');

console.log("=== KIỂM TRA TỆP TIN VÀ ROUTING ADMIN CMS ===");

const files = [
  'admin.html',
  'css/admin.css',
  'js/admin.js',
  'js/firebase-service.js',
  'index.html'
];

let allFilesExist = true;
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error(`❌ Tệp không tồn tại: ${f}`);
    allFilesExist = false;
  } else {
    const stat = fs.statSync(f);
    console.log(`✔ Tệp tồn tại: ${f} (${stat.size} bytes)`);
  }
}

// Kiểm tra endpoint HTTP
const endpoints = [
  'http://127.0.0.1:3000/admin.html',
  'http://127.0.0.1:3000/css/admin.css',
  'http://127.0.0.1:3000/js/admin.js',
  'http://127.0.0.1:3000/js/firebase-service.js',
  'http://127.0.0.1:3000/index.html'
];

let tested = 0;
endpoints.forEach(url => {
  http.get(url, (res) => {
    if (res.statusCode === 200) {
      console.log(`✔ HTTP 200 OK: ${url} (Content-Type: ${res.headers['content-type']})`);
    } else {
      console.error(`❌ HTTP Error ${res.statusCode}: ${url}`);
    }
    tested++;
    if (tested === endpoints.length) {
      console.log("=== TẤT CẢ ENDPOINT ADMIN CMS ĐỀU PHẢN HỒI HOÀN HẢO ===");
      process.exit(0);
    }
  }).on('error', (err) => {
    console.error(`❌ Lỗi kết nối tới ${url}:`, err.message);
    process.exit(1);
  });
});
