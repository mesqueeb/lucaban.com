import languageContents from './lang.js'
import keybindings from './keybindings.js'
import setDefaultItemValues from './setDefaultItemValues.js'

window.apiBaseURL = 'http://api.lucaban.dev/';
let initialItem = setDefaultItemValues({id: 'z', depth: 0, temp: true});
let secondItem = JSON.parse(JSON.stringify(initialItem));
secondItem.id = 'y';
secondItem.depth = 1;
secondItem.body = 'thhe test body';
initialItem.children.push(secondItem);
initialItem.children_order.push(secondItem.id);
let nodes = {}
nodes[initialItem.id] = initialItem;
nodes[secondItem.id] = secondItem;

export default {
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
};