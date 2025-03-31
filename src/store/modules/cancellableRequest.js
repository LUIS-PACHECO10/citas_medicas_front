export default {
	namespaced: true,

	state: {
		controller: new AbortController()
	},
	
	getters: {
		controller: (state) => state.controller,
	},

	mutations: {
		RESET_CONTROLLER(state) {
			state.controller = new AbortController()
		},
	},

	actions: {
		abortRequests({ commit, state }, reason) {
			state.controller.abort(reason);
			commit('RESET_CONTROLLER');
		},

		getNewAbortController() {
			return new AbortController()
		},
	},
};