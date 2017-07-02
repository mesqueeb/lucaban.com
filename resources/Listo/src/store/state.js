import languageContents from './lang.js'
import keybindings from './keybindings.js'
import setDefaultItemValues from './setDefaultItemValues.js'

if (DEV) {
    window.apiBaseURL = 'http://api.lucaban.dev/';
}
if (PROD) {
    window.apiBaseURL = 'http://api.lucaban.com/';
}
let initialItem = setDefaultItemValues({id: 'z', depth: 0, temp: true});
let nodes = {}
nodes[initialItem.id] = initialItem;

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