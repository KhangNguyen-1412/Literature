
const fs = require('fs');
const vm = require('vm');
const raw = fs.readFileSync('js/data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);
const d = sandbox.window.LITERARY_DATA || sandbox.LITERARY_DATA;
fs.writeFileSync('scratch/existing_data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Successfully extracted existing data.');
