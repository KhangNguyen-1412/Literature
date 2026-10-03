const fs = require('fs');
const content = fs.readFileSync('js/admin.js', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
  if (line.includes('_renderAuthorsSubview') || 
      line.includes('renderAuthors') || 
      line.includes('filterAuthorCards') ||
      line.includes('openNewAuthorModal') ||
      line.includes('subview-author') ||
      line.includes("case 'authors':") ||
      line.includes("currentSidebarTab === 'authors'")) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
