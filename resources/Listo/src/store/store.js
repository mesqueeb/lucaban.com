import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
import user from './modules/user.js'
import api from './modules/api.js'
import selection from './modules/selection.js'

export default {
	state,
	getters,
    mutations,
    actions,
    modules: {
	    user,
	    api,
	    selection,
	},
}