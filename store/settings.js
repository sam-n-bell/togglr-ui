import Cookie from "js-cookie";
import constants from "~/assets/constants.js";

//The overall state for this store.  Saved in JSON format.
const state = () => ({
    darkThemeEnabled: true,
    backgroundTheme: "darkBackground",
    cookiesRead: false
});

//Getters are used if state needs to have logic applied before using value
const getters = {

};

//Actions are like mutations but they are executed async instead of sync.  Actions call mutations.
const actions = {
    toggleDarkTheme({
        commit
    }) {
        commit("toggleDarkTheme");
    },
    syncUserSettings({
        commit
    }) {
        commit("syncUserSettings");
    },
    updateUserSettingsCookie({
        state
    }) {
        Cookie.set(
            constants.systemConstants.userSettingsCookieName,
            JSON.stringify(state)
        );
    }
};

//Mutations are used to change the state.  The state should only be changed through mutations to keep a record.
const mutations = {

    syncUserSettings(state) {
        if (!state.cookiesRead) {
            const userSettingsCookie = Cookie.getJSON(
                constants.systemConstants.userSettingsCookieName
            );

            if (userSettingsCookie) {
                for (var property in state) {
                    if (userSettingsCookie.hasOwnProperty(property)) {
                        state[property] = userSettingsCookie[property];
                    }
                }
            } else {
                Cookie.set(
                    constants.systemConstants.userSettingsCookieName,
                    JSON.stringify(state)
                );
            }
        }
        state.cookiesRead = true;
    },
    toggleDarkTheme(state) {
        state.darkThemeEnabled = !state.darkThemeEnabled;
        state.backgroundTheme = state.darkThemeEnabled ?
            "darkBackground" :
            "background";
        state.graphLabelColor = state.darkThemeEnabled ? "#FFFFFF" : "#3F473F";

        Cookie.set(
            constants.systemConstants.userSettingsCookieName,
            JSON.stringify(state)
        );
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};