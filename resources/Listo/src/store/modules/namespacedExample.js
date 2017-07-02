export default {
	namespaced: true,
	state:
	{
	},
	mutations:
	{
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
	},
}