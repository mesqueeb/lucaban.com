import newSelection from './selection.js'
window.selection = new newSelection();
import languageContents from './lang.js'
import keybindings from './keybindings.js'
window.apiBaseURL = 'http://api.lucaban.dev/';
// import { initializeState } from './stateInitializer.js';
import initialItem from '../config/initialItem.json'
let nodes = {}
nodes[initialItem.id] = initialItem;

export default {
    selection,
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
    cancelThroughKeydown: false,
    manualMobile: false,
    newItem: {
        body: '',
        due_date: '0000-00-00 00:00:00',
        done_date: '0000-00-00 00:00:00',
        done: false,
        planned_time: '',
        preparedTags: [],
        children: '',
    },
    newTag: null,
    setLanguage: null,
};

// export default () => Object.assign(a, initializeState(window.fetchedData));