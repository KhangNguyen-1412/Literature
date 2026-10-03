const fs = require('fs');

// Mock browser globals for testing
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: (id) => {
    if (!global.document._elements[id]) {
      global.document._elements[id] = {
        id,
        innerHTML: '',
        style: {},
        value: '',
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        querySelectorAll: () => [],
        querySelector: () => null,
        dataset: {}
      };
    }
    return global.document._elements[id];
  },
  querySelectorAll: (selector) => {
    return [];
  },
  querySelector: (selector) => null,
  addEventListener: () => {},
  removeEventListener: () => {},
  documentElement: { scrollTop: 0, setAttribute: () => {}, getAttribute: () => null },
  body: { scrollTop: 0, classList: { add: () => {}, remove: () => {} } },
  _elements: {}
};
global.localStorage = {
  _data: {},
  getItem: (k) => global.localStorage._data[k] || null,
  setItem: (k, v) => { global.localStorage._data[k] = v; },
  removeItem: (k) => { delete global.localStorage._data[k]; }
};
global.scrollTo = () => {};

// Load admin.js
const adminJs = fs.readFileSync('js/admin.js', 'utf8');
eval(adminJs + '; global.LiteraryAdminApp = LiteraryAdminApp;');

console.log('Testing LiteraryAdminApp Author List View...');

const app = new LiteraryAdminApp();
window.literaryAdmin = app;

// Setup mock subview panel
app.subviewPanel = {
  innerHTML: '',
  style: {}
};

// Populate test authors and works
app.authors = [
  {
    name: 'Nguyễn Du',
    alias: 'Tố Như',
    country: 'Việt Nam',
    years: '1765 - 1820',
    era: 'Văn học Trung đại',
    hometown: 'Làng Tiên Điền, huyện Nghi Xuân, Hà Tĩnh',
    style: 'Bậc thầy ngôn từ Nôm, đậm tính nhân đạo',
    masterpieces: 'Truyện Kiều, Văn chiêu hồn',
    awards: 'Danh nhân văn hóa thế giới (UNESCO)',
    status: 'published',
    avatar: ''
  },
  {
    name: 'Ernest Hemingway',
    alias: 'Papa',
    country: 'Hoa Kỳ',
    years: '1899 - 1961',
    era: 'Văn học Hiện đại',
    hometown: 'Oak Park, Illinois, Hoa Kỳ',
    style: 'Nguyên lý Tảng băng trôi (Iceberg Theory)',
    masterpieces: 'Ông già và biển cả',
    awards: 'Giải Nobel Văn học (1954)',
    status: 'published',
    avatar: 'https://example.com/hemingway.jpg'
  }
];

app.works = [
  { id: 'truyen-kieu', title: 'Truyện Kiều', author: 'Nguyễn Du', origin: 'vn' },
  { id: 'ong-gia-va-bien-ca', title: 'Ông Già Và Biển Cả', author: 'Ernest Hemingway', origin: 'world' }
];

// Test 1: Check default authorViewMode is 'list'
console.log('1. Checking default authorViewMode...');
if (app.authorViewMode !== 'list') {
  throw new Error(`Expected authorViewMode to be 'list', got: ${app.authorViewMode}`);
}
console.log('✓ Default authorViewMode is "list"');

// Test 2: Render author subview in list mode
console.log('2. Rendering authors subview in list mode...');
app._renderAuthorsSubview();
const html = app.subviewPanel.innerHTML;

if (!html.includes('admin-authors-table')) {
  throw new Error('Expected HTML to contain "admin-authors-table"');
}
console.log('✓ HTML contains .admin-authors-table');

if (!html.includes('Nguyễn Du') || !html.includes('Ernest Hemingway')) {
  throw new Error('Expected HTML to contain both authors');
}
console.log('✓ HTML contains author names');

if (!html.includes('Chân Dung') || !html.includes('Tác Giả & Bút Danh') || !html.includes('Phong Cách & Kiệt Tác') || !html.includes('Thao Tác')) {
  throw new Error('Expected HTML to contain standard table columns');
}
console.log('✓ HTML contains standard table headers');

if (!html.includes('author-works-count-btn') || !html.includes('1 bài')) {
  throw new Error('Expected HTML to contain author works count button');
}
console.log('✓ HTML contains works count button');

// Test 3: Test setAuthorViewMode('grid')
console.log('3. Testing setAuthorViewMode("grid")...');
app.setAuthorViewMode('grid');
if (app.authorViewMode !== 'grid') throw new Error('Failed to set grid mode');
if (!app.subviewPanel.innerHTML.includes('subview-authors-grid')) {
  throw new Error('Expected subview-authors-grid in grid mode');
}
console.log('✓ Grid view mode works');

// Test 4: Test setAuthorViewMode('list') back
console.log('4. Testing switching back to "list"...');
app.setAuthorViewMode('list');
if (app.authorViewMode !== 'list') throw new Error('Failed to set list mode');
if (!app.subviewPanel.innerHTML.includes('admin-authors-table')) {
  throw new Error('Expected admin-authors-table in list mode');
}
console.log('✓ Switch back to list view mode works');

// Test 5: Test filterAuthorOrigin
console.log('5. Testing filterAuthorOrigin("vn")...');
app.filterAuthorOrigin('vn');
if (!app.subviewPanel.innerHTML.includes('Nguyễn Du')) throw new Error('Expected Nguyễn Du in VN filter');
if (app.subviewPanel.innerHTML.includes('Ernest Hemingway')) throw new Error('Did not expect Hemingway in VN filter');
console.log('✓ filterAuthorOrigin("vn") works correctly');

console.log('6. Testing filterAuthorOrigin("world")...');
app.filterAuthorOrigin('world');
if (app.subviewPanel.innerHTML.includes('Nguyễn Du')) throw new Error('Did not expect Nguyễn Du in world filter');
if (!app.subviewPanel.innerHTML.includes('Ernest Hemingway')) throw new Error('Expected Hemingway in world filter');
console.log('✓ filterAuthorOrigin("world") works correctly');

app.filterAuthorOrigin('all');
console.log('✓ All Author List View Tests PASSED perfectly!');
