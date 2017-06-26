export default {
	namespaced: true,
	state:
	{
		selectedId: null,
		lastSelectedId: null,
		filter: [],
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
			state.filter = [];
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
			state.filter = [];
			state.hiddenBookmarks = [];
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
				if (operator == 'NOT' && keyword == 'journal')
				{
					state.hiddenBookmarks.push(keyword);
					return;
				}
				if (keyword == 'journal')
				{
					if (state.view == 'journal'){ return; }
					state.view = 'journal';
				} else if (value) {
					state.view = 'tree';
					if (state.filter.includes(value)){ return; }
					state.filter.push(value);
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
			let n = (  !state.tags.length
					&& !state.hiddenTags.length
					&& !state.hiddenItems.length
					&& !state.hiddenBookmarks.length
					&& !state.filter.length );
			return n;
		},
		noFilterOrTag: (state, getters) => {
			let n = ( !state.tags.length
					  && !state.filter.length );
			return n;
		},
		getHiddenItemsTotalUsedTime: (state, getters) => {
			if(!state.hiddenItems.length){ return 0; }
			return state.hiddenItems.reduce(function(a,id){
				let b = state.nodes[id].used_time;
				console.log(b);
				return a + b;
			}, 0);
		},
		getHiddenItemsTotalPlannedTime: (state, getters) => {
			if(!state.hiddenItems.length){ return 0; }		
			return state.hiddenItems.reduce(function(a,id){
				let b = state.nodes[id].planned_time;
				console.log(b);
				return a + b;
			}, 0);
		},
	},
}