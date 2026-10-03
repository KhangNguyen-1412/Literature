const fs = require('fs');
const assert = require('assert');

// 1. Check admin.html
const adminHtml = fs.readFileSync('admin.html', 'utf8');

// Header
assert(!adminHtml.includes('id="btn-create-work"'), 'Header should not have btn-create-work');
assert(adminHtml.includes('admin-profile-avatar-trigger'), 'Header should have avatar-only button');
assert(adminHtml.includes('onclick="window.literaryAdmin.openProfileModal()"'), 'Avatar button must directly call openProfileModal()');
assert(adminHtml.includes('profile-card-gear-btn'), 'Profile card must have gear button');
assert(adminHtml.includes('id="profile-tab-btn-settings"'), 'Profile modal must have settings tab');

// Category modal
assert(adminHtml.includes('id="cat-parent"'), 'Category modal must have cat-parent');
assert(adminHtml.includes('id="cat-id"'), 'Category modal must have cat-id');
assert(adminHtml.includes('id="cat-icon"'), 'Category modal must have cat-icon');
assert(adminHtml.includes('id="cat-order"'), 'Category modal must have cat-order');
assert(adminHtml.includes('id="cat-status"'), 'Category modal must have cat-status');

// Origin modal
assert(adminHtml.includes('id="origin-id-input"'), 'Origin modal must have origin-id-input');
assert(adminHtml.includes('id="origin-flag-input"'), 'Origin modal must have origin-flag-input');
assert(adminHtml.includes('id="origin-region-select"'), 'Origin modal must have origin-region-select');
assert(adminHtml.includes('id="origin-lang-input"'), 'Origin modal must have origin-lang-input');
assert(adminHtml.includes('id="origin-authors-input"'), 'Origin modal must have origin-authors-input');
assert(adminHtml.includes('id="origin-desc-input"'), 'Origin modal must have origin-desc-input');

console.log('✅ admin.html checks passed!');

// 2. Check css/admin.css
const adminCss = fs.readFileSync('css/admin.css', 'utf8');
assert(adminCss.includes('.admin-sidebar {') && adminCss.includes('overflow: hidden;'), 'Sidebar should have overflow: hidden');
assert(adminCss.includes('.admin-sidebar-nav {') && adminCss.includes('overflow-y: auto;'), 'Sidebar nav should have overflow-y: auto');
assert(adminCss.includes('.profile-card-gear-btn'), 'CSS must style .profile-card-gear-btn');

console.log('✅ css/admin.css checks passed!');

// 3. Check js/admin.js
const adminJs = fs.readFileSync('js/admin.js', 'utf8');
assert(adminJs.includes('origin-id-input'), 'admin.js must reference origin-id-input');
assert(adminJs.includes('origin-lang-input'), 'admin.js must reference origin-lang-input');
assert(adminJs.includes('origin-authors-input'), 'admin.js must reference origin-authors-input');
assert(adminJs.includes('_getEraVectorIcon'), 'admin.js must have _getEraVectorIcon');
assert(!adminJs.includes("span>🇻🇳</span> Văn Học Việt Nam"), 'admin.js must not have flag emoji in VN block header');
assert(!adminJs.includes("span>🌐</span> Văn Học Thế Giới"), 'admin.js must not have globe emoji in World block header');

console.log('✅ js/admin.js checks passed!');

// 4. Check index.html & library.js for author list view
const indexHtml = fs.readFileSync('index.html', 'utf8');
const libraryJs = fs.readFileSync('js/library.js', 'utf8');
assert(indexHtml.includes('authors-editorial-toolbar'), 'index.html must have authors-editorial-toolbar');
assert(libraryJs.includes('authorViewMode'), 'library.js must support authorViewMode');
assert(libraryJs.includes('authors-editorial-table'), 'library.js must render authors-editorial-table');

console.log('✅ index.html & js/library.js checks passed!');

console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
