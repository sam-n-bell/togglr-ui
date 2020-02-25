import constants from "~/assets/constants.js";

//The overall state for this store.  Saved in JSON format.
const state = () => ({
    snackbar: {
        showing: false,
        timeout: 2000,
        text: "",
        extraBtnText: "Test",
        btnAction: null
    },
    editFeatureDialog: {
        showing: false,
        feature: null,
        appDetails: null
    },
    confirmCancelDialog: {
        showing: false,
        title: "",
        description: "",
        confirmBtnText: "",
        cancelBtnText: "",
        confirmBtnAction: null,
        cancelBtnAction: null
    }
});

//Getters are used if state needs to have logic applied before using value
const getters = {};

//Actions are like mutations but they are executed async instead of sync.  Actions call mutations.
const actions = {
    showSnackbar({
        commit
    }, payload) {
        commit("showSnackbar", payload);
        setTimeout(() => {
            commit("hideSnackbar");
        }, payload.timeout ? payload.timeout : 2000);
    },
    hideSnackbar({
        commit
    }) {
        commit("hideSnackbar");
    },
    showEditFeatureDialog({
        commit
    }, appConfig) {
        commit("showEditFeatureDialog", appConfig);
    },
    hideEditFeatureDialog({
        commit
    }) {
        commit("hideEditFeatureDialog");
    },
    editFeatureConfigDeleted({
        commit
    }, configId) {
        commit("editFeatureConfigDeleted", configId);
    },
    editFeatureConfigAdded({
        commit
    }, config) {
        commit("editFeatureConfigAdded", config);
    },
    showConfirmCancelDialog({
        commit
    }, options) {
        commit("showConfirmCancelDialog", options);
    },
    hideConfirmCancelDialog({
        commit
    }) {
        commit("hideConfirmCancelDialog");
    },
    async toggleFeatureNegation({
        commit,
        state
    }, featureId) {
        commit("toggleFeatureNegation");

        var toggle = {
            negation: !state.editFeatureDialog.feature.negation
        };

        try {
            const details = await this.$axios.$patch(
                constants.urlConstants.updateFeature + featureId,
                toggle
            );
            commit("toggleFeatureNegationSuccess", details);
        } catch (error) {
            commit("toggleFeatureNegationFailure", error.message);
        }
    }
};

//Mutations are used to change the state.  The state should only be changed through mutations to keep a record.
const mutations = {
    showSnackbar(state, payload) {
        state.snackbar.showing = true;
        state.snackbar.text = payload.text;
        state.snackbar.timeout = payload.timeout ? payload.timeout : 2000;
    },
    hideSnackbar(state) {
        state.snackbar.showing = false;
        state.snackbar.text = "";
        state.timeout = 2000;
    },
    showEditFeatureDialog(state, appConfig) {
        console.log('appconfig is')
        console.log(appConfig)
        state.editFeatureDialog.showing = true;
        state.editFeatureDialog.feature = appConfig.feature;
        state.editFeatureDialog.appDetails = appConfig.app;
        state.editFeatureDialog.configsById = appConfig.feature.configsById;
    },
    hideEditFeatureDialog(state) {
        state.editFeatureDialog.showing = false;
        state.editFeatureDialog.feature = null;
    },
    editFeatureConfigDeleted(state, configId) {
        var index = state.editFeatureDialog.feature.configsById.findIndex(
            config => config.appId === configId.appId &&
            config.keyName === configId.keyName &&
            config.configValue === configId.configValue &&
            config.featureId === configId.featureId
        );

        if (index > -1) {
            state.editFeatureDialog.feature.configsById.splice(index, 1);
        }
    },
    editFeatureCorpDeleted(state, corpId) {
        var index = state.editFeatureDialog.feature.corpsById.findIndex(
            corp => corp.id === corpId
        );

        if (index > -1) {
            state.editFeatureDialog.feature.corpsById.splice(index, 1);
        }
    },
    editFeatureConfigAdded(state, config) {
        state.editFeatureDialog.feature.configsById.push(config);
    },
    showConfirmCancelDialog(state, options) {
        state.confirmCancelDialog.showing = true;
        state.confirmCancelDialog.title = options.title;
        state.confirmCancelDialog.description = options.description;
        state.confirmCancelDialog.confirmBtnText = options.confirmBtnText;
        state.confirmCancelDialog.cancelBtnText = options.cancelBtnText;
        state.confirmCancelDialog.confirmBtnAction = options.confirmBtnAction;
        state.confirmCancelDialog.cancelBtnAction = options.cancelBtnAction;
    },
    hideConfirmCancelDialog(state) {
        state.confirmCancelDialog.showing = false;
        state.confirmCancelDialog.title = "";
        state.confirmCancelDialog.description = "";
        state.confirmCancelDialog.confirmBtnText = "";
        state.confirmCancelDialog.cancelBtnText = "";
        state.confirmCancelDialog.confirmBtnAction = null;
        state.confirmCancelDialog.cancelBtnAction = null;
    },
    //Feature toggle
    toggleFeatureNegation(state) {},
    toggleFeatureNegationSuccess(state) {
        state.editFeatureDialog.feature.negation = !state.editFeatureDialog.feature
            .negation;
    },
    toggleFeatureNegationFailure(state) {}
};

export default {
    state,
    getters,
    actions,
    mutations
};