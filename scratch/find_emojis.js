const fs = require('fs');
const code = fs.readFileSync('js/admin.js', 'utf8');
const lines = code.split('\n');

const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

lines.forEach((line, idx) => {
  if (emojiRegex.test(line)) {
    console.log(`${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
