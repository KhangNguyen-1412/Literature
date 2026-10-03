const fs = require('fs');

const adminHtml = fs.readFileSync('admin.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const adminJs = fs.readFileSync('js/admin.js', 'utf8');

// Check sidebar icons in admin.html
console.log('--- SIDEBAR ICONS IN admin.html ---');
const sidebarMatches = adminHtml.match(/<a[^>]*class="admin-nav-item[^"]*"[^>]*>[\s\S]*?<\/a>/g) || [];
sidebarMatches.forEach(m => {
  const text = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const svg = (m.match(/<svg[\s\S]*?<\/svg>/) || [''])[0];
  console.log(text, '=>', svg.replace(/\s+/g, ' ').slice(0, 80));
});

console.log('\n--- EMOJI OCCURRENCES IN _renderAuthorsSubview ---');
const lines = adminJs.split('\n');
let inAuthorsSubview = false;
lines.forEach((l, idx) => {
  if (l.includes('_renderAuthorsSubview() {')) inAuthorsSubview = true;
  if (inAuthorsSubview && l.includes('_renderOriginsSubview() {')) inAuthorsSubview = false;
  if (inAuthorsSubview) {
    if (l.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u)) {
      console.log(`${idx + 1}: ${l.trim()}`);
    }
  }
});
