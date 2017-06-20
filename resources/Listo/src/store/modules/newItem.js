import { Utilities, uniq } from '../../helpers/globalFunctions.js'
export default {
	namespaced: true,
	state:
	{
		body: '',
        due_date: '0000-00-00 00:00:00',
        done_date: '0000-00-00 00:00:00',
        done: false,
        planned_time: '',
        preparedTags: [],
        children: '',
        newItem: true,
	},
	mutations:
	{
		deleteTag (state, { tag })
		{
			state.preparedTags = state.preparedTags.filter(t => t != tag);
		},
	},
	actions:
	{
		someAction ({ state, rootState, getters, rootGetters, dispatch, commit },
			{id} = {})
		{
			getters.someOtherGetter // -> 'foo/someOtherGetter'
			rootGetters.someOtherGetter // -> 'someOtherGetter'

	        dispatch('someOtherAction') // -> 'foo/someOtherAction'
	        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

	        commit('someMutation') // -> 'foo/someMutation'
	        commit('someMutation', null, { root: true }) // -> 'someMutation'
		},
	},
	getters:
	{
		someGetter: (state, getters, rootState, rootGetters) =>
		(id) => {
			getters.someOtherGetter // -> 'foo/someOtherGetter'
			rootGetters.someOtherGetter // -> 'someOtherGetter'
		},
		parent_id: (state, getters, rootState, rootGetters) => {
			if (!rootState.addingNewUnder || rootState.addingNewUnder == rootState.root.id)
			{
				return rootState.root.id;
			}
			if (rootState.addingNewAsChild || rootState.addingNewAsFirstChild)
			{
				return rootState.addingNewUnder;
				
			}
			return rootState.nodes[rootState.addingNewUnder].parent_id;
		},
		preparedPlusComputedTags: (state, getters, rootState, rootGetters) => {
			let alltags = state.preparedTags;
			let parentTags = rootGetters.tagsArray(getters.parent_id);
			alltags = alltags.concat(parentTags);
			alltags = alltags.concat(rootState.selection.tags.map(tag => Utilities.tagSlugToName(tag)));
			// if (this.get.isTopLvlItemInFilteredRoot(this.state.addingNewUnder))
			// {
			// 	if (this.state.nodes[this.item.parent_id])
			// 	{
			// 		let tagzies = this.get.tagsArray(this.item.parent_id);
			// 		alltags = alltags.concat(tagzies);
			// 	}
			// }
			alltags = uniq(alltags);
			return alltags.sort();
		},
	},
}