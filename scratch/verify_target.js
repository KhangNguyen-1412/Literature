const fs = require('fs');

// We test splicing this into a copy of admin.js to verify syntax
const adminCode = fs.readFileSync('js/admin.js', 'utf8');

const targetStr = `  _renderAuthorsSubview() {
    if (!this.subviewPanel) return;

    const cardsHtml = this.authors.map(item => {`;

if (!adminCode.includes(targetStr)) {
  console.error('Target string not found in admin.js!');
  process.exit(1);
} else {
  console.log('Target string found OK!');
}
