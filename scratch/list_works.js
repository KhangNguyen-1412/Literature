const fs = require('fs');

const raw = fs.readFileSync('js/data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);

const data = sandbox.window.LITERARY_DATA || sandbox.LITERARY_DATA;
console.log('Total works in data.js:', data.works.length);
data.works.forEach((w, i) => {
  console.log(`${i + 1}. [${w.id}] - "${w.title}" by ${w.author} (origin: ${w.origin}, era: ${w.era}, category: ${w.category})`);
});
