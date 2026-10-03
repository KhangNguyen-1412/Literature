const fs = require('fs');
global.window = {};
eval(fs.readFileSync('js/data.js', 'utf8'));
const works = global.window.LITERARY_DATA.works;
console.log('--- KIỂM TRA MINH HỌA MỖI KHÚC / CHƯƠNG / HỒI ---');
works.forEach(w => {
  const chapters = (w.content.match(/<h3 class="reader-chapter-title"/gi) || []).length;
  const illus = (w.content.match(/class="chapter-illustration-frame"/gi) || []).length;
  console.log(`${w.id.padEnd(20)} | Số hồi/chương: ${String(chapters).padStart(2)} | Số ảnh minh họa: ${String(illus).padStart(2)} | Khớp 100%: ${chapters === illus ? '✓ ĐẦY ĐỦ' : 'CHƯA ĐỦ'}`);
});
