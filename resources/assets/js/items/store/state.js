import langContentsItems from './lang.js';
import { initializeState } from './stateInitializer.js';
let a = {
    doneData: null,
    selection: window.selection,
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
        planned_time:0,
        preparedTags:[],
        due_date: '0000-00-00 00:00:00',
        children: '',
    },
    newTag: null,
    setLanguage: null,
    langContentsItems,
};

// console.log(Object.assign(data, ););
// Object.assign(data, initializeState(window.fetchedData));
export default () => Object.assign(a, initializeState(window.fetchedData));