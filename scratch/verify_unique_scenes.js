const fs = require('fs');

global.window = {};
eval(fs.readFileSync('js/data.js', 'utf8'));
const works = global.window.LITERARY_DATA.works;

console.log('--- KIỂM TRA ĐỘ ĐỘC BẢN VÀ CHÍNH XÁC CỦA MINH HỌA TỪNG PHÂN ĐOẠN ---');
let totalChapters = 0;
let totalMissingFiles = 0;

works.forEach(w => {
  const matches = [...w.content.matchAll(/<img src="([^"]+)" alt="([^"]+)" class="chapter-illustration-img"/g)];
  const srcs = matches.map(m => m[1]);
  const uniqueSrcs = new Set(srcs);
  const isAllUnique = (srcs.length === uniqueSrcs.size);
  
  // Kiểm tra file có tồn tại trên đĩa không
  let fileCheck = true;
  srcs.forEach(s => {
    if (!fs.existsSync(s)) {
      console.error(`[LỖI] File không tồn tại: ${s}`);
      fileCheck = false;
      totalMissingFiles++;
    }
  });

  console.log(`${w.id.padEnd(20)} | Số hồi: ${String(srcs.length).padStart(2)} | Không trùng lặp: ${isAllUnique ? '✓ 100% ĐỘC BẢN' : '✗ CÒN TRÙNG'} | Tệp tồn tại: ${fileCheck ? '✓ OK' : '✗ THIẾU'}`);
  totalChapters += srcs.length;
});

console.log(`\nTổng số phân đoạn minh họa: ${totalChapters}`);
console.log(`Số tệp lỗi: ${totalMissingFiles}`);
