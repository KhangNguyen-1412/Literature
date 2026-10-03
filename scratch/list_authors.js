const fs = require('fs');
const vm = require('vm');
const raw = fs.readFileSync('js/data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);

const d = sandbox.window.LITERARY_DATA;
console.log('Current authors in data.js:');
d.authors.forEach(a => console.log(`- [${a.id}] ${a.name} (${a.years})`));
