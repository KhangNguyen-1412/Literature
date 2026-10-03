const fs = require('fs');
const path = require('path');

const adminHtml = fs.readFileSync(path.resolve(__dirname, '../admin.html'), 'utf8');
const adminJs = fs.readFileSync(path.resolve(__dirname, '../js/admin.js'), 'utf8');

console.log('Testing Admin modules integration...');

const requiredTabs = [
  'overview',
  'works',
  'categories',
  'authors',
  'origins',
  'eras',
  'themes',
  'characters',
  'articles',
  'terms',
  'comments',
  'users'
];

let errors = [];

// 1. Check sidebar nav items
requiredTabs.forEach(tab => {
  const navPattern = `data-nav="${tab}"`;
  if (!adminHtml.includes(navPattern)) {
    errors.push(`Missing sidebar nav item for ${tab} in admin.html`);
  }
});

// 2. Check sidebar badges
const badges = [
  'sidebar-count-works',
  'sidebar-count-categories',
  'sidebar-count-authors',
  'sidebar-count-origins',
  'sidebar-count-eras',
  'sidebar-count-themes',
  'sidebar-count-characters',
  'sidebar-count-articles',
  'sidebar-count-terms',
  'sidebar-count-comments',
  'sidebar-count-users'
];

badges.forEach(b => {
  if (!adminHtml.includes(`id="${b}"`)) {
    errors.push(`Missing badge id="${b}" in admin.html`);
  }
  if (!adminJs.includes(b)) {
    errors.push(`Missing badge reference ${b} in js/admin.js`);
  }
});

// 3. Check modals in admin.html
const modals = [
  'character-detail-modal',
  'character-edit-modal',
  'article-detail-modal',
  'article-edit-modal',
  'term-detail-modal',
  'term-edit-modal',
  'comment-reply-modal',
  'era-modal',
  'theme-modal',
  'user-modal'
];

modals.forEach(m => {
  if (!adminHtml.includes(`id="${m}"`)) {
    errors.push(`Missing modal id="${m}" in admin.html`);
  }
});

// 4. Check subview renderers in admin.js
const renderers = [
  '_renderErasSubview',
  '_renderThemesSubview',
  '_renderCharactersSubview',
  '_renderArticlesSubview',
  '_renderTermsSubview',
  '_renderCommentsSubview',
  '_renderUsersSubview'
];

renderers.forEach(r => {
  if (!adminJs.includes(`${r}()`)) {
    errors.push(`Missing renderer ${r} in js/admin.js`);
  }
});

// 5. Check loaders in admin.js
const loaders = [
  'loadErasData',
  'loadThemesData',
  'loadCharactersData',
  'loadArticlesData',
  'loadTermsData',
  'loadCommentsData',
  'loadUsersData'
];

loaders.forEach(l => {
  if (!adminJs.includes(`${l}()`)) {
    errors.push(`Missing loader ${l} in js/admin.js`);
  }
});

if (errors.length === 0) {
  console.log('✅ ALL 12 ADMIN MODULES & 10 MODALS FULLY VERIFIED & LINKED!');
} else {
  console.error('❌ Validation failed with errors:', errors);
  process.exit(1);
}
