const fs = require('fs');
const vm = require('vm');
const raw = fs.readFileSync('js/data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);

const d = sandbox.window.LITERARY_DATA;
console.log('Keys in LITERARY_DATA:', Object.keys(d));
for (const k of Object.keys(d)) {
  if (Array.isArray(d[k])) {
    console.log(`- ${k}: Array of ${d[k].length} items`);
  } else {
    console.log(`- ${k}:`, typeof d[k]);
  }
}
