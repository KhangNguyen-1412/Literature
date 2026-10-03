const fs = require('fs');

let code = fs.readFileSync('js/data.js', 'utf8');

const replacements = [
  { id: 'truyen-kieu', newImg: 'assets/images/covers/truyen-kieu.png' },
  { id: 'chu-nguoi-tu-tu', newImg: 'assets/images/covers/chu-nguoi-tu-tu.png' },
  { id: 'chi-pheo', newImg: 'assets/images/covers/chi-pheo.png' },
  { id: 'lao-hac', newImg: 'assets/images/covers/lao-hac.png' },
  { id: 'hai-dua-tre', newImg: 'assets/images/covers/hai-dua-tre.jpg' },
  { id: 'doi-thua', newImg: 'assets/images/covers/doi-thua.png' },
  { id: 'toi-di-hoc', newImg: 'assets/images/covers/toi-di-hoc.jpg' },
  { id: 'so-do', newImg: 'assets/images/covers/so-do.png' },
  { id: 'voi-vang', newImg: 'assets/images/covers/voi-vang.png' },
  { id: 'trang-giang', newImg: 'assets/images/covers/trang-giang.png' },
  { id: 'bien-than', newImg: 'assets/images/covers/bien-than.png' },
  { id: 'tram-nam-co-don', newImg: 'assets/images/covers/tram-nam-co-don.jpg' },
  { id: 'ong-gia-va-bien-ca', newImg: 'assets/images/covers/ong-gia-va-bien-ca.jpg' },
  { id: 'nguoi-thay-dau-tien', newImg: 'assets/images/covers/nguoi-thay-dau-tien.jpg' }
];

replacements.forEach(r => {
  const pattern = new RegExp('("id":\\s*"' + r.id + '"[\\s\\S]*?"image":\\s*")[^"]+(")', 'm');
  if (pattern.test(code)) {
    code = code.replace(pattern, '$1' + r.newImg + '$2');
    console.log('Updated ' + r.id + ' -> ' + r.newImg);
  } else {
    console.warn('Could not match: ' + r.id);
  }
});

fs.writeFileSync('js/data.js', code, 'utf8');
console.log('js/data.js updated successfully!');
