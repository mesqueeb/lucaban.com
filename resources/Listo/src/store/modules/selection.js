import { differenceInCalendarDays } from 'date-fns/esm'
function initialState() {
	return {
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
	}
}
export default {
	namespaced: true,
	state: initialState(),
	mutations:
	{
		resetStateData(state)
		{
			let newState = initialState();
			state = Object.assign(state, newState);
		},
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
					state.filter.doneDate.to = value;
				} else {
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
			return (differenceInCalendarDays(state.filter.dueDate.to, new Date())== 0);
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
		testAgainstTagSelection: (state, getters, rootState, rootGetters) =>
		(id, {flat = false} = { flat: false }) => {
			let passedTest = true;
			if (state.tags.length)
			{
				let hasAllTags = state.tags.every(tag => rootGetters.hasTag(id, tag));
				let hasHiddenTags = state.hiddenTags.some(tag => rootGetters.hasTag(id, tag));
				let hasParentWithTag = state.tags.every(tag => rootGetters.hasParentWithTag(id, tag));
				// IF I ever make an 'OR' selector:
				// hasParentWithTag = state.tags.some(tag => getters.hasParentWithTag(item.id, tag));				
				if (flat)
				{
					passedTest = (hasAllTags && !hasHiddenTags) ? true : false;
				}
				else
				{
					passedTest = (hasAllTags && !hasParentWithTag && !hasHiddenTags) ? true : false;
				}
			}
			return passedTest;
		},
		testAgainstDueDateSelection: (state, getters, rootState, rootGetters) =>
		(id, {flat = false} = { flat: false }) => {
			let passedTest = true;
			if (getters.dueTodayFiltered)
			{
				let isDueToday = rootGetters.isDueToday(id);
				let hasParentDueToday = rootGetters.hasParentDueToday(id);
				if (flat)
				{
				passedTest = (isDueToday || hasParentDueToday) ? true : false;
				}
				else
				{
				passedTest = (isDueToday && !hasParentDueToday) ? true : false;
				}
			}
			return passedTest;
		},
		testAgainstDoneSelection: (state, getters, rootState, rootGetters) =>
		(id) => {
			let passedTest = true;
			let item = rootState.nodes[id];
			if (!item){ return false; }
			if (getters.doneFiltered)
			{
				passedTest = (item.done) ? true : false ;
			}
			else
			{
				let doneDateDiff = differenceInCalendarDays(new Date(item.done_date), new Date());
				passedTest = (!item.done || doneDateDiff <= -1) ? true : false;
			}
			return passedTest;
		},
		testAgainstHiddenItems: (state, getters, rootState, rootGetters) =>
		(id) => {
			let passedTest = state.hiddenItems.every(i => i != id);
			return passedTest;
		},
		testAgainstAllSelection: (state, getters, rootState, rootGetters) =>
		(id, { flat = false } = { flat: false }) => {
			let passedAllTests = true;
			if (flat)
			{
				passedAllTests = ( getters.testAgainstTagSelection(id, {flat:true})
								&& getters.testAgainstDueDateSelection(id, {flat:true})
								&& getters.testAgainstDoneSelection(id)
								&& getters.testAgainstHiddenItems(id) );
			}
			else
			{
				let passedTagTest = getters.testAgainstTagSelection(id);
				let passedDoneTest = getters.testAgainstDoneSelection(id);
				let passedHiddenItemsTest = getters.testAgainstHiddenItems(id);
				if (state.tags.length && getters.dueTodayFiltered)
				{
					passedAllTests = ( passedTagTest
									&& getters.testAgainstDueDateSelection(id, {flat:true})
									&& passedDoneTest
									&& passedHiddenItemsTest );
				}
				else
				{
					passedAllTests = ( passedTagTest
									&& getters.testAgainstDueDateSelection(id, {flat:false})
									&& passedDoneTest
									&& passedHiddenItemsTest );
				}
			}
			return passedAllTests;
		},
	},
}