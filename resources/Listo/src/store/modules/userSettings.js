export default {
	state:
	{
		plannedDurations: [10, 15, 25, 50],
		language: 'en',
	},
	mutations:
	{
		updateSettings(state, payload) // { id, field, value } or other
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
		// 
	},
}