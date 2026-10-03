const fs = require('fs');
const content = fs.readFileSync('js/admin.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('DEFAULT_AUTHORS') || line.includes('this.authors =') || line.includes('openAuthorDetailModal') || line.includes('openEditAuthorModal')) {
    console.log(`${idx + 1}: ${line.trim().slice(0, 120)}`);
  }
});
