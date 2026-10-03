global.window = {};
require('../js/data.js');

const works = window.LITERARY_DATA.works;
console.log('Total works:', works.length);

const aphuWorks = works.filter(w => 
  (w.title && w.title.toLowerCase().includes('phủ')) || 
  (w.id && w.id.toLowerCase().includes('phu')) ||
  (w.title && w.title.toLowerCase().includes('vợ chồng'))
);

console.log('A Phu works count:', aphuWorks.length);
aphuWorks.forEach((w, i) => {
  console.log(`\n--- Entry ${i + 1} ---`);
  console.log('ID:', w.id);
  console.log('Title:', w.title);
  console.log('ReadTime:', w.readTime);
  console.log('Year:', w.year);
  console.log('Author:', w.author);
  console.log('Content length:', w.content ? w.content.length : 0);
  console.log('Excerpt:', w.excerpt);
});
