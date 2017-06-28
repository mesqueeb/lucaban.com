// we import all of `date`
import { date } from 'quasar'
// destructuring to keep only what is needed
const { getDateDiff } = date;

export default {
	namespaced: true,
	state:
	{
		selectedId: null,
		lastSelectedId: null,
		filter: {
			dueDate: { from: null, to:null },
			doneDate: { from: null, to:null },
		},
		tags: [],
		hiddenTags: [],
		hiddenItems: [],
		hiddenBookmarks: [],
		view: 'tree',
	},
	mutations:
	{
		clear (state)
		{
			state.filter = {
				dueDate: { from: null, to:null },
				doneDate: { from: null, to:null },
			},
			state.tags = [];
			state.hiddenTags = [];
			state.hiddenItems = [];
			state.hiddenBookmarks = [];
		},
		clearTags (state)
		{
			state.hiddenTags = [];
			state.tags = [];
		},
		clearFilters (state)
		{
			state.filter = {
				dueDate: { from: null, to:null },
				doneDate: { from: null, to:null },
			},
			state.hiddenBookmarks = [];
		},
		updateState(state, payload) // { id, field, value } or other
		{
			let key = payload.field;
			let val = payload.value;
			if (!key && !val)
			{
				key = Object.keys(payload).filter(k => k != 'id')[0];
				val = payload[key];
			}
			if (payload.id)
			{
				state.nodes[payload.id][key] = val;
		        return;
			}
		    state[key] = val;
		},
	},
	actions:
	{
		addKeywords ({ state, rootState, getters, rootGetters, dispatch, commit },
			{keyword, value, operator})
		{
			if (keyword == 'tag')
			{
				if (operator == 'NOT')
				{
					if (state.hiddenTags.includes(value)){ return; }
					state.hiddenTags.push(value);
					state.tags = state.tags.filter(tag => tag !== value);
				}
				else if (state.tags.includes(value))
				{
					state.tags = state.tags.filter(tag => tag !== value);
				}
				else if (state.hiddenTags.includes(value))
				{
					state.hiddenTags = state.hiddenTags.filter(tag => tag !== value);
				}	
				else
				{
					if (!operator){ commit('clearTags') }
					state.tags.push(value);
				}
			} else {
				if (!operator || keyword == 'all')
				{
					commit('clearFilters');
				}
				if (keyword == 'all')
				{
					state.view = 'tree';
				}
				if (operator == 'NOT' && keyword == 'journal')
				{
					state.hiddenBookmarks.push(keyword);
					return;
				}
				if (keyword == 'journal')
				{
					state.view = 'journal';
				} else if (value) {
					state.view = 'tree';
				}
				if (keyword == 'duedate')
				{
					state.filter.dueDate.to = value;
				}
			}
			Vue.nextTick(()=>{
				if (!rootGetters.filteredItemsFlat.map(i => i.id).includes(state.selectedId))
				{
					state.selectedId = null;
				}
			});
		},
	},
	getters:
	{
		nothingSelected: (state, getters) => {
			return getters.noTagsSelected
				&& getters.noFiltersSelected
				&& !(state.hiddenItems.length)
				&& !(state.hiddenBookmarks.length);
		},
		noFilterOrTag: (state, getters) => {
			return getters.noTagsSelected
				&& getters.noFiltersSelected;
		},
		noTagsSelected: (state) => {
			return !(state.tags.length)
				&& !(state.hiddenTags.length);
		},
		noFiltersSelected: (state, getters) => {
			return !(getters.dueDateFiltered)
				&& !(getters.doneFiltered);
		},
		dueDateFiltered: (state) => {
			return state.filter.dueDate.from != null
				|| state.filter.dueDate.to != null;
		},
		doneFiltered: (state) => {
			return state.filter.doneDate.from != null
				|| state.filter.doneDate.to != null;
		},
		dueTodayFiltered: (state) => {
			return (getDateDiff(state.filter.dueDate.to, new Date(), 'days') == 0);
		},
		getHiddenItemsTotalUsedTime: (state, getters) => {
			if(!state.hiddenItems.length){ return 0; }
			return state.hiddenItems.reduce(function(a,id){
				let item = state.nodes[id];
				if (!item){ return a; }
				let b = item.used_time;
				console.log(b);
				return a + b;
			}, 0);
		},
		getHiddenItemsTotalPlannedTime: (state, getters) => {
			if(!state.hiddenItems.length){ return 0; }		
			return state.hiddenItems.reduce(function(a,id){
				let item = state.nodes[id];
				if (!item){ return a; }
				let b = item.planned_time;
				console.log(b);
				return a + b;
			}, 0);
		},
	},
}