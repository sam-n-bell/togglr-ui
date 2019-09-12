//The overall state for this store.  Saved in JSON format.
const state = () => ({
    appDetail: null
});

//Getters are used if state needs to have logic applied before using value
const getters = {};

//Actions are like mutations but they are executed async instead of sync.  Actions call mutations.
const actions = {
    storeAppDetail({
        commit
    }, app) {
        commit("storeAppDetail", app);
    }
};

//Mutations are used to change the state.  The state should only be changed through mutations to keep a record.
const mutations = {
    storeAppDetail(state, app) {
        state.appDetail = app;
    },
    clearAppDetail(state, app) {
        state.appDetail = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};