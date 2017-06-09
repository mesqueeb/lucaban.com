import languageContents from './lang.js';
import keybindings from './keybindings.js';
import { initializeState } from './stateInitializer.js';
import newSelection from './selection.js';
window.selection = new newSelection();

let a = {
    selection,
    languageContents,
    keybindings,
    debug: false,
    doneData: null,
    addingNewUnder: null,
    addingNewAsChild: false,
    addingNewAsFirstChild: false,
    editingItem: null,
    editingItemTags: null,
    editingDoneDateItem: null,
    loading: true,
    patching: true,
    popups: [],
    popouts: {'delete':[], 'timer':[], 'edit':[], 'guide':false },
    flashes: [], // e.g. {'type':'','msg':''}
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

export default () => Object.assign(a, initializeState(window.fetchedData));