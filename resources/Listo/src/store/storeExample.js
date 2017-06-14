Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		todos: [
			{ id: 1, text: '...', done: true },
			{ id: 2, text: '...', done: false }
		]
	},
	getters: { // Computed props
        doneTodos (state) {
			return state.todos.filter(todo => todo.done)
        },
		doneTodosCount (state, getters) {
			return getters.doneTodos.length
		},
        getTodoById (state, getters) {
        return (id) => {
            return state.todos.find(todo => todo.id === id)
        }},
	},
    mutations: { // sync methods
        increment (state, payload) {
            state.nodes[payload.id] += payload.amount;
        }
    },
    actions: {
        actionA ({ commit, state, getters, dispatch }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    dispatch('increment', { amount: 10 });
                    resolve()
                }, 1000)
            });
        },
    },
});