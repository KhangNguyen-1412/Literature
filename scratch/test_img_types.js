const fs = require('fs');

global.window = {};
eval(fs.readFileSync('js/data.js', 'utf8'));
const works = global.window.LITERARY_DATA.works;
let svgs = 0, jpgs = 0;
works.forEach(w => {
  const matches = [...w.content.matchAll(/<img src="([^"]+)"/g)];
  matches.forEach(m => {
    if (m[1].endsWith('.jpg') || m[1].endsWith('.jpeg')) jpgs++;
    else if (m[1].endsWith('.svg')) svgs++;
  });
});
console.log('Tổng ảnh JPG mỹ thuật/hội họa thực thụ:', jpgs);
console.log('Ảnh SVG đồ họa:', svgs);
