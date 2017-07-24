import languageContents from './lang.js'
import keybindings from './keybindings.js'
import setDefaultItemValues from './setDefaultItemValues.js'
import ItemComputedProperties from './ItemComputedProperties.js'

if (DEV) {
    window.apiBaseURL = 'http://api.lucaban.dev/';
}
if (PROD) {
    window.apiBaseURL = 'http://api.lucaban.com/';
}
let initialItem = setDefaultItemValues({id: 'z', depth: 0, temp: true, body: 'ALL'});
let nodes = {}
nodes[initialItem.id] = initialItem;

// TEST ITEMS
if (DEV) {
    let aa = JSON.parse(JSON.stringify(initialItem));
    let bb = JSON.parse(JSON.stringify(initialItem));
    let cc = JSON.parse(JSON.stringify(initialItem));
    aa.id = 'aa';
    bb.id = 'bb';
    cc.id = 'cc';
    aa.body = 'aa';
    bb.body = 'bb';
    cc.body = 'cc';
    aa.depth = 1;
    bb.depth = 1;
    cc.depth = 1;
    aa.temp = true;
    bb.temp = true;
    cc.temp = true;
    aa.parent_id = 'z';
    bb.parent_id = 'z';
    cc.parent_id = 'z';
    nodes[aa.id] = aa;
    nodes[bb.id] = bb;
    nodes[cc.id] = cc;
    nodes[initialItem.id].children = [aa,bb,cc];
    nodes[initialItem.id].children_order = [aa.id,bb.id,cc.id];
}

export default function(){
  return {
    languageContents,
    keybindings,
    nodes,
    source: initialItem,
    root: initialItem,
    apiBaseURL: apiBaseURL,
    orphans: [],
    debug: false,
    doneData: null,
    addingNewUnder: null,
    addingNewAsChild: false,
    addingNewAsFirstChild: false,
    editingItem: null,
    editingItemTags: null,
    editingDoneDateItem: null,
    loading: false,
    patching: false,
    computing: false,
    allTags: [],
    popups: [],
    popouts: {'delete':[], 'timer':[], 'edit':[], 'guide':false },
    flashes: [], // e.g. {type:'', msg:''}
    timerItems: [],
    beforeEditCache_body: null,
    beforeEditCache_planned_time: null,
    fetchedDone: false,
    blockBlur: false,
    manualMobile: false,
    newTag: null,
    setLanguage: null,
  }
}