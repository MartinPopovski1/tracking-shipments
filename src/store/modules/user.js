

const getDefaultState = () => {
    return {
        user: {},

    }
};

export default {
    namespaced: true,
    actions: {
        resetCommonState ({ commit }) {
            commit('resetState')
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        }
    },

    mutations: {
        resetState (state) {
            Object.assign(state, getDefaultState());
        },

        setUser(state, payload) {
            state.user = payload;
        },

    },

    getters: {},

    state: getDefaultState()
}
