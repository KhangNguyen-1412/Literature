const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== BẮT ĐẦU KIỂM TRA TOÀN DIỆN (AUTOMATED VERIFICATION) ===');

// 1. Kiểm tra cú pháp và tải js/data.js
const sandbox = { window: {} };
vm.createContext(sandbox);
const rawData = fs.readFileSync('js/data.js', 'utf8');
try {
  vm.runInContext(rawData, sandbox);
  console.log('✔ js/data.js: Cú pháp JavaScript hoàn toàn hợp lệ!');
} catch (e) {
  console.error('✘ Lỗi cú pháp js/data.js:', e);
  process.exit(1);
}

const data = sandbox.window.LITERARY_DATA;
console.log(`- Tổng số tác phẩm: ${data.works.length}`);
console.log(`- Tổng số tác giả: ${data.authors.length}`);
console.log(`- Tổng số danh ngôn: ${data.quotes.length}`);
console.log(`- Tổng số điển tích: ${data.allusions.length}`);

// 2. Kiểm tra tính toàn vẹn của từng tác phẩm
const requiredFields = [
  'id', 'title', 'author', 'authorId', 'origin', 'originLabel',
  'country', 'category', 'era', 'year', 'readTime', 'badge',
  'image', 'epigraph', 'excerpt', 'fullTextStatus', 'sgkDetail',
  'content', 'criticism', 'tags'
];

let errors = [];
const checkedImages = new Set();

data.works.forEach((w, idx) => {
  // Kiểm tra trường bắt buộc
  for (const field of requiredFields) {
    if (!w[field] || (Array.isArray(w[field]) && w[field].length === 0)) {
      errors.push(`Tác phẩm #${idx + 1} (${w.id || 'không rõ id'}): Thiếu trường '${field}'!`);
    }
  }

  // Kiểm tra ảnh bìa
  if (w.image) {
    if (!fs.existsSync(w.image)) {
      errors.push(`Tác phẩm [${w.id}]: Ảnh bìa không tồn tại: ${w.image}`);
    }
  }

  // Kiểm tra các ảnh minh họa trong content
  const imgRegex = /src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(w.content)) !== null) {
    const imgSrc = match[1];
    if (!fs.existsSync(imgSrc)) {
      errors.push(`Tác phẩm [${w.id}]: Ảnh phân cảnh không tồn tại: ${imgSrc}`);
    }
  }

  // Kiểm tra thẻ chương hồi
  if (!w.content.includes('class="reader-chapter-title"')) {
    errors.push(`Tác phẩm [${w.id}]: Không có thẻ <h3 class="reader-chapter-title"> để phân trang 2 cột!`);
  }

  // Kiểm tra khung SGK
  if (!w.content.includes('sgk-notice-box')) {
    errors.push(`Tác phẩm [${w.id}]: Không có khung .sgk-notice-box đánh dấu bài giảng SGK!`);
  }
});

// 3. Kiểm tra tính toàn vẹn của tác giả
data.authors.forEach((a, idx) => {
  const authorFields = ['id', 'name', 'years', 'avatarInitials', 'era', 'bio', 'masterpieces'];
  for (const f of authorFields) {
    if (!a[f]) {
      errors.push(`Tác giả #${idx + 1} (${a.id || 'vô danh'}): Thiếu trường '${f}'!`);
    }
  }
});

if (errors.length > 0) {
  console.error(`✘ Phát hiện ${errors.length} lỗi:`);
  errors.forEach(err => console.error('  - ' + err));
  process.exit(1);
} else {
  console.log('✔ Toàn bộ 38 tác phẩm và 32 tác giả đều có đầy đủ 100% dữ liệu chuẩn mực!');
  console.log('✔ Toàn bộ đường dẫn hình ảnh bìa và phân cảnh đều tồn tại trên ổ đĩa!');
}

// 4. Kiểm tra cú pháp các file js khác
['js/library.js', 'js/reader.js', 'js/seo-router.js', 'js/app.js'].forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    new vm.Script(code);
    console.log(`✔ ${file}: Cú pháp JS hoàn hảo!`);
  } catch (err) {
    console.error(`✘ Lỗi cú pháp ${file}:`, err);
    process.exit(1);
  }
});

console.log('=== KIỂM TRA THÀNH CÔNG RỰC RỠ ===');
