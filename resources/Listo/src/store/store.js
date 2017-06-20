import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
import user from './modules/user.js'
import userSettings from './modules/userSettings.js'
import api from './modules/api.js'
import selection from './modules/selection.js'
import newItem from './modules/newItem.js'

export default {
	state,
	getters,
    mutations,
    actions,
    modules: {
	    user,
	    userSettings,
	    api,
	    selection,
	    newItem,
	},
}