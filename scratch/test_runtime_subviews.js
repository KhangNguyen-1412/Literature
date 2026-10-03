const fs = require('fs');
const path = require('path');

// Read data.js and admin.js
const dataJs = fs.readFileSync(path.resolve(__dirname, '../js/data.js'), 'utf8');
const adminJs = fs.readFileSync(path.resolve(__dirname, '../js/admin.js'), 'utf8');

// Minimal mock DOM environment
const elements = new Map();
function createMockEl(id, tagName = 'div') {
  const el = {
    id,
    tagName: tagName.toUpperCase(),
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {}
    },
    dataset: {},
    innerHTML: '',
    textContent: '',
    value: '',
    children: [],
    appendChild: (child) => el.children.push(child),
    querySelectorAll: () => [],
    querySelector: () => null,
    setAttribute: () => {},
    getAttribute: () => null,
    focus: () => {},
    addEventListener: () => {}
  };
  elements.set(id, el);
  return el;
}

global.window = {
  addEventListener: () => {},
  scrollTo: () => {},
  open: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};
global.document = {
  documentElement: { setAttribute: () => {}, getAttribute: () => 'default', scrollTop: 0 },
  body: { scrollTop: 0 },
  getElementById: (id) => elements.get(id) || createMockEl(id),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {}
};
global.localStorage = global.window.localStorage;
global.history = { scrollRestoration: 'auto' };

const vm = require('vm');
const context = {
  window: global.window,
  document: global.document,
  localStorage: global.localStorage,
  history: global.history,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  LITERARY_DATA: null
};
vm.createContext(context);
vm.runInContext(dataJs, context);
vm.runInContext(adminJs + '; window.LiteraryAdminApp = LiteraryAdminApp;', context);

const LiteraryAdminApp = context.window.LiteraryAdminApp;

(async () => {
  console.log('Testing LiteraryAdminApp instantiation...');
  const app = new LiteraryAdminApp();
  app.initElements();
  await app.loadInitialData();

  console.log('Eras count:', app.eras.length);
  console.log('Themes count:', app.themes.length);
  console.log('Characters count:', app.characters.length);
  console.log('Articles count:', app.articles.length);
  console.log('Terms count:', app.terms.length);
  console.log('Comments count:', app.comments.length);
  console.log('Users count:', app.users.length);

  if (app.eras.length < 6) throw new Error('Eras not loaded properly');
  if (app.themes.length < 8) throw new Error('Themes not loaded properly');
  if (app.characters.length < 12) throw new Error('Characters not loaded properly');
  if (app.articles.length < 6) throw new Error('Articles not loaded properly');
  if (app.terms.length < 8) throw new Error('Terms not loaded properly');
  if (app.comments.length < 6) throw new Error('Comments not loaded properly');
  if (app.users.length < 4) throw new Error('Users not loaded properly');

  // Test subview renderers
  console.log('Testing subview renderers...');
  app.subviewPanel = createMockEl('admin-subview-panel');

  app._renderErasSubview();
  console.log('Eras rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderThemesSubview();
  console.log('Themes rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderCharactersSubview();
  console.log('Characters rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderArticlesSubview();
  console.log('Articles rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderTermsSubview();
  console.log('Terms rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderCommentsSubview();
  console.log('Comments rendered OK, length:', app.subviewPanel.innerHTML.length);

  app._renderUsersSubview();
  console.log('Users rendered OK, length:', app.subviewPanel.innerHTML.length);

  // Test filterByEra & filterByTheme
  app.filterByEra('trung-dai');
  console.log('Active era filter:', app.activeEraFilter);
  if (app.activeEraFilter !== 'trung-dai') throw new Error('filterByEra failed');

  app.filterByTheme('nguoi-nong-dan');
  console.log('Active theme filter:', app.activeThemeFilter);
  if (app.activeThemeFilter !== 'nguoi-nong-dan') throw new Error('filterByTheme failed');

  console.log('🎉 ALL RUNTIME TESTS PASSED PERFECTLY!');
})();
