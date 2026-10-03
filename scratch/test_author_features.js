// Test script to verify author features in admin.js
const fs = require('fs');

console.log("Checking admin.html for author modal fields...");
const html = fs.readFileSync('admin.html', 'utf-8');

const requiredIds = [
  'author-modal',
  'author-modal-title',
  'author-form-mode',
  'author-original-name',
  'author-avatar-data',
  'author-avatar-zone',
  'author-avatar-preview',
  'author-avatar-fallback',
  'author-avatar-initials-preview',
  'author-avatar-file-input',
  'btn-remove-author-avatar',
  'author-avatar-url',
  'author-avatar-status',
  'author-hometown',
  'author-country',
  'author-initials',
  'author-name',
  'author-id',
  'author-alias',
  'author-years',
  'author-era',
  'author-masterpieces',
  'author-style',
  'author-style-tags',
  'author-awards',
  'author-awards-tags',
  'author-bio',
  'author-seo-chevron',
  'author-seo-body',
  'author-seo-title',
  'author-seo-desc',
  'author-seo-keywords',
  'google-preview-url-text',
  'google-preview-title-text',
  'google-preview-desc-text',
  'author-detail-modal',
  'author-detail-body'
];

let missingIds = [];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
}

if (missingIds.length > 0) {
  console.error("Missing IDs in admin.html:", missingIds);
  process.exit(1);
} else {
  console.log("✓ All required IDs found in admin.html!");
}

console.log("Checking admin.js methods...");
const adminJs = fs.readFileSync('js/admin.js', 'utf-8');
const requiredMethods = [
  'openNewAuthorModal',
  'openEditAuthorModal',
  'handleAuthorNameInput',
  'handleAuthorAvatarFile',
  'handleAuthorAvatarUrlInput',
  'removeAuthorAvatar',
  'insertAuthorStyleTag',
  'insertAuthorAwardTag',
  'toggleAuthorSeoPanel',
  'generateAuthorSEO',
  'updateAuthorSeoPreview',
  'openAuthorDetailModal',
  'closeAuthorDetailModal',
  'closeAuthorModal',
  'saveAuthor',
  '_renderAuthorsSubview'
];

let missingMethods = [];
for (const m of requiredMethods) {
  if (!adminJs.includes(m)) {
    missingMethods.push(m);
  }
}

if (missingMethods.length > 0) {
  console.error("Missing methods in admin.js:", missingMethods);
  process.exit(1);
} else {
  console.log("✓ All required author methods exist in admin.js!");
}

console.log("Checking admin.css classes...");
const css = fs.readFileSync('css/admin.css', 'utf-8');
const requiredClasses = [
  '.author-form-grid',
  '.author-form-sidebar',
  '.author-form-main',
  '.author-avatar-card',
  '.author-avatar-upload-zone',
  '.author-status-selector',
  '.quick-tags-container',
  '.quick-tag-chip',
  '.author-seo-box',
  '.google-preview-card',
  '.subview-author-avatar-wrap',
  '.subview-status-tag'
];

let missingClasses = [];
for (const c of requiredClasses) {
  if (!css.includes(c)) {
    missingClasses.push(c);
  }
}

if (missingClasses.length > 0) {
  console.error("Missing CSS classes in admin.css:", missingClasses);
  process.exit(1);
} else {
  console.log("✓ All required CSS classes found in admin.css!");
}

console.log("ALL CHECKS PASSED SUCCESSFULLY!");
