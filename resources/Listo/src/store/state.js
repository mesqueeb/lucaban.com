import languageContents from './lang.js'
import keybindings from './keybindings.js'
window.apiBaseURL = 'http://api.lucaban.dev/';

let initialItem = {
    id: "z",
    created_by: null,
    parent_id: null,
    depth: 0,
    children: [],
    children_order: [],
    body: "ALL",
    memo: "",
    planned_time: 0,
    used_time: 0,
    completion_rate: "0.0000",
    due_date: "0000-00-00 00:00:00",
    done_date: "0000-00-00 00:00:00",
    done: 0,
    completion_memo: "",
    show_children: 1,
    deleted_at: null,
    created_at: "0000-00-00 00:00:00",
    updated_at: "0000-00-00 00:00:00",
    parents_bodies: "",
    tagged: [],
}
let nodes = {}
nodes[initialItem.id] = initialItem;

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
    cancelThroughKeydown: false,
    manualMobile: false,
    newTag: null,
    setLanguage: null,
};