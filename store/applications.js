import constants from "~/assets/constants.js";

//The overall state for this store.  Saved in JSON format.
const state = () => ({
    myApps: {
        payload: [],
        loading: false,
        error: null
    },
    createApplication: {
        payload: null,
        loading: false,
        error: null
    },
    appDetails: {
        payload: null,
        loading: false,
        error: null
    },
    deleteApplication: {
        payload: null,
        loading: false,
        error: null
    },
    updateFeature: {
        payload: null,
        loading: false,
        error: null
    },
    addAdmin: {
        payload: null,
        loading: false,
        error: null
    },
    deleteAdmin: {
        payload: null,
        loading: false,
        error: null
    },
    applicationFeatures: {
        payload: null,
        loading: false,
        error: null
    },
    applicationKeys: {
        payload: null,
        loading: false,
        error: null
    },
    addFeature: {
        payload: null,
        loading: false,
        error: null
    },
    deleteFeature: {
        payload: null,
        loading: false,
        error: null
    },
    addKey: {
        payload: null,
        loading: false,
        error: null
    },
    deleteKey: {
        payload: null,
        loading: false,
        error: null
    },
    deleteConfig: {
        payload: null,
        loading: false,
        error: null
    },
    addConfig: {
        payload: null,
        loading: false,
        error: null
    },
    updateWebhookObject: {
        payload: null,
        loading: false,
        error: null
    }
});

//Getters are used if state needs to have logic applied before using value
const getters = {
    getApplications: state => {
        return state.applications;
    },
    getApplicationDetails: state => appID => {
        var filtered = state.myApps.payload.filter(function(entity) {
            return entity.id.toString() === appID.toString();
        });
        return filtered;
    }
};

//Actions are like mutations but they are executed async instead of sync.  Actions call mutations.
const actions = {
    async retrieveApplications({
        commit
    }) {
        commit("retrieveApplications");
        //$get automatically grabs the requests .data object
        try {
            const applications = await this.$axios.$get(
                constants.urlConstants.retrieveApplications, {
                    timeout: 4000
                }
            );
            if (applications._embedded && applications._embedded.appEntities) {
                commit(
                    "retrieveApplicationsSuccess",
                    applications._embedded.appEntities
                );
            } else {
                commit("retrieveApplicationsSuccess", []);
            }
        } catch (error) {
            commit("retrieveApplicationsFailure", error.message);
        }
    },
    async createApplication({
        commit
    }, app) {
        commit("createApplication");
        var adminsById = [];

        app.adminsById.forEach(element => {
            adminsById.push({
                id: element
            });
        });

        app.adminsById = adminsById;

        try {
            const response = await this.$axios.$post(
                constants.urlConstants.addApplicationPOST,
                app, {
                    timeout: 4000
                }
            );
            commit("createApplicationSuccess", response);
        } catch (error) {
            commit("createApplicationFailure", error.message);
        }
    },
    async retrieveApplicationDetails({
        commit
    }, id) {
        commit("retrieveApplicationDetails");

        try {
            const details = await this.$axios.$get(
                constants.urlConstants.appEntites + id + constants.urlConstants.projection
            );
            commit("retrieveApplicationDetailsSuccess", details);
        } catch (error) {
            commit("retrieveApplicationDetailsFailure", error.message);
        }
    },
    async updateFeature({
        commit
    }, feature) {
        commit("updateFeature");

        var unchainedFeature = {
            active: !feature.active
        };

        try {
            const details = await this.$axios.$patch(
                constants.urlConstants.updateFeature + feature.id,
                unchainedFeature
            );
            commit("updateFeatureSuccess", feature);
        } catch (error) {
            commit("updateFeatureFailure", error.message);
        }
    },
    async addAdmin({
        commit
    }, payload) {
        commit("addAdmin");
        try {
            const details = await this.$axios.$post(
                constants.urlConstants.adminEntity,
                payload
            );
            commit("addAdminSuccess", details);
        } catch (error) {
            commit("addAdminFailure", error.message);
        }
    },
    async retrieveApplicationFeatures({
        commit,
        dispatch
    }, appId, sortBy="descr", sortOrder="asc") {
        commit("retrieveApplicationFeatures")
        try {
            const features = await this.$axios.$get(
                `${constants.urlConstants.retrieveApplicationFeatures}${appId}&sort=${sortBy},${sortOrder}`
            );
            if (features._embedded && features._embedded.featureEntities) {
                commit("retrieveApplicationFeaturesSuccess", features._embedded.featureEntities);
            } else {
                commit("retrieveApplicationFeaturesSuccess", []);
            }
        } catch (error) {
            commit("retrieveApplicationFeaturesFailure", error.message);
        }
    },
    async retrieveApplicationKeys({
        commit,
        dispatch
    }, appId, sortBy="keyName", sortOrder="asc") {
        commit("retrieveApplicationKeys")
        try {
            const keys = await this.$axios.$get(
                `${constants.urlConstants.retrieveApplicationKeys}${appId}&sort=${sortBy},${sortOrder}`
            );
            if (keys._embedded && keys._embedded.keysEntities) {
                commit("retrieveApplicationKeysSuccess", keys._embedded.keysEntities);
            } else {
                commit("retrieveApplicationKeysSuccess", []);
            }
        } catch (error) {
            commit("retrieveApplicationKeysFailure", error.message);
        }
    },
    async addFeature({
        commit,
        dispatch
    }, feature) {
        commit("addFeature");
        try {
            const details = await this.$axios.$post(
                constants.urlConstants.updateFeature,
                feature
            );
            commit("addFeatureSuccess", details);

            dispatch("notifications/showSnackbar", {
                text: `Feature ${feature.descr} added`
            }, {
                root: true
            });

        } catch (error) {
            commit("addFeatureFailure", error.message);
        }
    },
    async addKey({
        commit,
        dispatch
    }, key) {
        commit("addKey");
        try {
            const details = await this.$axios.$post(
                constants.urlConstants.updateKey,
                key, {
                    timeout: 5000
                }
            );
            commit("addKeySuccess", details);

            dispatch("notifications/showSnackbar", {
                text: `Key ${key.keyName} added`
            }, {
                root: true
            });

        } catch (error) {
            commit("addKeyFailure", error.message);
        }
    },
    async addConfig({
        commit,
        dispatch
    }, config) {
        commit("addConfig");
        try {
            const details = await this.$axios.$post(
                constants.urlConstants.configsEntity,
                config
            );
            commit("addConfigSuccess", details);
            dispatch("notifications/editFeatureConfigAdded", config, {
                root: true
            });

            dispatch("notifications/showSnackbar", {
                text: `Config ${config.configValue} added`
            }, {
                root: true
            });
        } catch (error) {
            commit("addConfigFailure", error.message);
        }
    },
    async deleteApplication({
        commit
    }, id) {
        commit("deleteApplication");

        try {
            const details = await this.$axios.$delete(
                constants.urlConstants.deleteApplication + id
            );
            commit("deleteApplicationSuccess", id);
        } catch (error) {
            commit("deleteApplicationFailure", error.message);
        }
    },
    async deleteAdmin({
        commit,
        dispatch
    }, payload) {
        commit("deleteAdmin");
        try {
            const details = await this.$axios.$delete(
                constants.urlConstants.adminEntity +
                payload.admin.id +
                "_" +
                payload.admin.appId
            );
            commit("deleteAdminSuccess", payload);
        } catch (error) {
            commit("deleteAdminFailure", error.message);
        }
    },
    async deleteFeature({
        commit
    }, feature) {
        commit("deleteFeature");
        try {
            const details = await this.$axios.$delete(
                constants.urlConstants.updateFeature + feature.id
            );
            commit("deleteFeatureSuccess", feature);
        } catch (error) {
            commit("deleteFeatureFailure", error.message);
        }
    },
    async deleteKey({
        commit
    }, key) {
        commit("deleteKey");
        try {
            const details = await this.$axios.$delete(
                constants.urlConstants.updateKey + key.appId + "_" + key.keyName
            );
            commit("deleteKeySuccess", key);
        } catch (error) {
            commit("deleteKeyFailure", error.message);
        }
    },
    async deleteConfig({
        commit,
        dispatch
    }, config) {
        commit("deleteConfig");
        try {
            const details = await this.$axios.$delete(
                constants.urlConstants.configsEntity + config["appId"].toString() + "_" + config.keyName + "_" + config.featureId + "_" + config.configValue
            );
            commit("deleteConfigSuccess", config);
            dispatch("notifications/editFeatureConfigDeleted", config, {
                root: true
            });
        } catch (error) {
            commit("deleteConfigFailure", error.message);
        }
    },
    async updateWebhook({
        commit
    }, details) {
        commit("updateWebhook");

        try {
            const response = await this.$axios.$patch(
                constants.urlConstants.appEntites + details.id,
                details, {
                    timeout: 4000
                }
            );
            commit("updateWebhookSuccess", response);
        } catch (error) {
            commit("updateWebhookFailure", error.message);
        }
    },
};

//Mutations are used to change the state.  The state should only be changed through mutations to keep a record.
const mutations = {
    //Retrieve Applications
    retrieveApplications(state) {
        state.myApps.payload = [];
        state.myApps.loading = true;
        state.myApps.error = null;
    },
    retrieveApplicationsSuccess(state, applications) {
        state.myApps.payload = applications;
        // state.myApps.payload.adminsById =
        state.myApps.loading = false;
        state.myApps.error = null;
    },
    retrieveApplicationsFailure(state, error) {
        state.myApps.payload = [];
        state.myApps.loading = false;
        state.myApps.error = error;
    },
    //Retrieve Application Features (for sorting purposes usually)
    retrieveApplicationFeatures(state) {
        state.applicationFeatures.payload = []
        state.applicationFeatures.loading = false;
        state.applicationFeatures.error = null;
    },
    retrieveApplicationFeaturesSuccess(state, features) {
        state.applicationFeatures.payload = features;
        state.applicationFeatures.loading = false;
        state.applicationFeatures.error = null;
    },
    retrieveApplicationFeaturesFailure(state, error) {
        state.applicationFeatures.payload = []
        state.applicationFeatures.loading = false;
        state.applicationFeatures.error = error;
    },
    //Retrieve Application Keys (for sorting purposes usually)
    retrieveApplicationKeys(state) {
        state.applicationKeys.payload = []
        state.applicationKeys.loading = false;
        state.applicationKeys.error = null;
    },
    retrieveApplicationKeysSuccess(state, features) {
        state.applicationFeatures.payload = features;
        state.applicationFeatures.loading = false;
        state.applicationFeatures.error = null;
    },
    retrieveApplicationKeysFailure(state, error) {
        state.applicationFeatures.payload = []
        state.applicationFeatures.loading = false;
        state.applicationFeatures.error = error;
    },
    //Create Application
    createApplication(state) {
        state.createApplication.payload = null;
        state.createApplication.loading = true;
        state.createApplication.error = null;
    },
    createApplicationSuccess(state, response) {
        state.createApplication.payload = response;
        state.createApplication.loading = false;
        state.createApplication.error = null;
    },
    createApplicationFailure(state, error) {
        state.createApplication.payload = null;
        state.createApplication.loading = false;
        state.createApplication.error = error;
    },
    createApplicationReset(state, error) {
        state.createApplication.payload = null;
        state.createApplication.loading = false;
        state.createApplication.error = null;
    },
    //Retrieve Application Details
    retrieveApplicationDetails(state) {
        state.appDetails.payload = null;
        state.appDetails.loading = true;
        state.appDetails.error = null;
    },
    retrieveApplicationDetailsSuccess(state, response) {
        state.appDetails.payload = response;
        state.appDetails.loading = false;
        state.appDetails.error = null;
    },
    retrieveApplicationDetailsFailure(state, error) {
        state.appDetails.payload = null;
        state.appDetails.loading = false;
        state.appDetails.error = error;
    },
    //Delete Application
    deleteApplication(state) {
        state.deleteApplication.payload = null;
        state.deleteApplication.loading = true;
        state.deleteApplication.error = null;
    },
    deleteApplicationSuccess(state, id) {
        state.deleteApplication.payload = id;
        state.deleteApplication.loading = false;
        state.deleteApplication.error = null;
    },
    deleteApplicationFailure(state, error) {
        state.deleteApplication.payload = null;
        state.deleteApplication.loading = false;
        state.deleteApplication.error = error;
    },
    //Update Application
    updateFeature(state) {
        state.updateFeature.payload = null;
        state.updateFeature.loading = true;
        state.updateFeature.error = null;
    },
    updateFeatureSuccess(state, feature) {
        feature.active = !feature.active;
        state.updateFeature.payload = response;
        state.updateFeature.loading = false;
        state.updateFeature.error = null;
    },
    updateFeatureFailure(state, error) {
        state.updateFeature.payload = null;
        state.updateFeature.loading = false;
        state.updateFeature.error = error;
    },
    //Add Admins
    addAdmin(state) {
        state.addAdmin.payload = null;
        state.addAdmin.loading = true;
        state.addAdmin.error = null;
    },
    addAdminSuccess(state, admin) {
        state.appDetails.payload.adminsById.push(admin);
        state.addAdmin.payload = payload;
        state.addAdmin.loading = false;
        state.addAdmin.error = null;
    },
    addAdminFailure(state, error) {
        state.addAdmin.payload = null;
        state.addAdmin.loading = false;
        state.addAdmin.error = error;
    },
    //Delete Admins
    deleteAdmin(state) {
        state.deleteAdmin.payload = null;
        state.deleteAdmin.loading = true;
        state.deleteAdmin.error = null;
    },
    deleteAdminSuccess(state, payload) {
        var index = state.appDetails.payload.adminsById.findIndex(
            admin => admin.id === payload.admin.id
        );

        if (index > -1) {
            state.appDetails.payload.adminsById.splice(index, 1);
        }

        state.deleteAdmin.payload = payload;
        state.deleteAdmin.loading = false;
        state.deleteAdmin.error = null;
    },
    deleteAdminFailure(state, error) {
        state.deleteAdmin.payload = null;
        state.deleteAdmin.loading = false;
        state.deleteAdmin.error = error;
    },
    //Add Feature
    addFeature(state) {
        state.addFeature.payload = null;
        state.addFeature.loading = true;
        state.addFeature.error = null;
    },
    addFeatureSuccess(state, response) {

        if (response.configsById === undefined) {
            response.configsById = [];
        }

        state.addFeature.payload = response;
        state.appDetails.payload.featuresById.push(response);
        state.addFeature.loading = false;
        state.addFeature.error = null;
    },
    addFeatureFailure(state, error) {
        state.addFeature.payload = null;
        state.addFeature.loading = false;
        state.addFeature.error = error;
    },
    //Delete Feature
    deleteFeature(state) {
        state.deleteFeature.payload = null;
        state.deleteFeature.loading = true;
        state.deleteFeature.error = null;
    },
    deleteFeatureSuccess(state, filter) {
        var index = state.appDetails.payload.featuresById.findIndex(
            feature => feature.id === filter.id
        );

        if (index > -1) {
            state.appDetails.payload.featuresById.splice(index, 1);
        }

        state.deleteFeature.payload = filter;
        state.deleteFeature.loading = false;
        state.deleteFeature.error = null;
    },
    deleteFeatureFailure(state, error) {
        state.deleteFeature.payload = null;
        state.deleteFeature.loading = false;
        state.deleteFeature.error = error;
    },
    //Delete Key
    deleteKey(state) {
        state.deleteFeature.payload = null;
        state.deleteFeature.loading = true;
        state.deleteFeature.error = null;
    },
    deleteKeySuccess(state, filter) {
        var index = state.appDetails.payload.keysById.findIndex(
            key => key.keyName === filter.keyName
        );

        if (index > -1) {
            state.appDetails.payload.keysById.splice(index, 1);
        }

        state.deleteFeature.payload = filter;
        state.deleteFeature.loading = false;
        state.deleteFeature.error = null;
    },
    deleteKeyFailure(state, error) {
        state.deleteFeature.payload = null;
        state.deleteFeature.loading = false;
        state.deleteFeature.error = error;
    },
    //Delete Config
    deleteConfig(state) {
        state.deleteConfig.payload = null;
        state.deleteConfig.loading = true;
        state.deleteConfig.error = null;
    },
    deleteConfigSuccess(state, filter) {
        var index = state.appDetails.payload.featuresById.findIndex(
            config => config.appId === filter.appId && config.featureId === filter.featureId && config.keyName === filter.keyName && config.configValue == filter.configValue
        );

        if (index > -1) {
            state.appDetails.payload.featuresById.splice(index, 1);
        }

        state.deleteConfig.payload = filter;
        state.deleteConfig.loading = false;
        state.deleteConfig.error = null;
    },
    deleteConfigFailure(state, error) {
        state.deleteConfig.payload = null;
        state.deleteConfig.loading = false;
        state.deleteConfig.error = error;
    },
    //Add Config
    addConfig(state) {
        state.addConfig.payload = null;
        state.addConfig.loading = true;
        state.addConfig.error = null;
    },
    addConfigSuccess(state, config) {
        state.addConfig.payload = config;
        state.addConfig.loading = false;
        state.addConfig.error = null;
    },
    addConfigFailure(state, error) {
        state.addConfig.payload = null;
        state.addConfig.loading = false;
        state.addConfig.error = error;
    },
    //Add Key
    addKey(state) {
        state.addKey.payload = null;
        state.addKey.loading = true;
        state.addKey.error = null;
    },
    addKeySuccess(state, response) {
        state.addKey.payload = response;
        state.appDetails.payload.keysById.push(response);
        state.addKey.loading = false;
        state.addKey.error = null;
    },
    addKeyFailure(state, error) {
        state.addKey.payload = null;
        state.addKey.loading = false;
        state.addKey.error = error;
    },

    //Update Webhooks
    updateWebhook(state) {
        state.updateWebhookObject.payload = null;
        state.updateWebhookObject.loading = true;
        state.updateWebhookObject.error = null;
    },
    updateWebhookSuccess(state) {
        state.updateWebhookObject.payload = "success";
        state.updateWebhookObject.loading = false;
        state.updateWebhookObject.error = null;
    },
    updateWebhookFailure(state) {
        state.updateWebhookObject.payload = null;
        state.updateWebhookObject.loading = false;
        state.updateWebhookObject.error = error;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};