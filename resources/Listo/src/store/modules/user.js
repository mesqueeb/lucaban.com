export default {
	state:
	{
		user: null,
	},
	mutations:
	{
		updateUser(state, payload) // { id, field, value } or other
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