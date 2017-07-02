function initialState() {
	return {
		user: null,
	}
}
export default {
	namespaced: true,
	state:initialState(),
	mutations:
	{
		resetStateData(state)
		{
			let newState = initialState();
			state = Object.assign(state, newState);
		},
		updateState(state, payload) // { id, field, value } or other
		{
			let key = payload.field;
			let val = payload.value;
			if (!key && !val)
			{
				key = Object.keys(payload)[0];
				val = payload[key];
			}
		    state[key] = val;
		},

	},
	actions:
	{
		// 
	},
	getters:
	{
		loggedIn: (state) => {
			return (state.user) ? true : false;
		},
	},
}