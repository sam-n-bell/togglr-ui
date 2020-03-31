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
        configs: [],
        appDetails: null
    },
    deletedApplicationsDialog: {
        showing: false,
        applications: []
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
    showDeletedApplicationsDialog({commit}, applications) {
        commit("showDeletedApplicationsDialog", applications)
    },
    hideDeletedApplicationsDialog({commit}) {
        commit("hideDeletedApplicationsDialog")
    },
    setEditFeatureDialogConfigs({
        commit
    }, configs) {
        commit("setEditFeatureDialogConfigs", configs);
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
    retrieveDeletedApplications(state) {
        state.deletedApplicationsDialog.showing = false;
        state.deletedApplicationsDialog.applications = [];
    },
    showDeletedApplicationsDialog(state, applications) {
        state.deletedApplicationsDialog.showing = true;
        state.deletedApplicationsDialog.applications = applications;
    },
    hideDeletedApplicationsDialog(state) {
        state.deletedApplicationsDialog.showing = false;
        state.deletedApplicationsDialog.applications = [];
        state.deletedApplicationsDialog.error = null;
    },
    showEditFeatureDialog(state, appConfig) {
        state.editFeatureDialog.showing = true;
        state.editFeatureDialog.feature = appConfig.feature;
        state.editFeatureDialog.appDetails = appConfig.app;
        state.editFeatureDialog.configsById = appConfig.feature.configsById;
        state.editFeatureDialog.configs = []
    },
    hideEditFeatureDialog(state) {
        state.editFeatureDialog.showing = false;
        state.editFeatureDialog.feature = null;
    },
    setEditFeatureDialogConfigs(state, configs) {
        state.editFeatureDialog.configs = configs;
    },
    editFeatureConfigDeleted(state, deletedConfig) {
        // finds where (index position) in the editFeatureDialog.configs the recently deleted config is
        let index = state.editFeatureDialog.configs.findIndex(
            config => config.appId === deletedConfig.appId &&
            config.keyName === deletedConfig.keyName &&
            config.configValue === deletedConfig.configValue &&
            config.featureId === deletedConfig.featureId
        );

        // removes it from that array that is populating the UI
        if (index > -1 ) {
            state.editFeatureDialog.configs.splice(index, 1);
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
        // state.editFeatureDialog.feature.configsById.push(config);
        state.editFeatureDialog.configs.push(config);
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