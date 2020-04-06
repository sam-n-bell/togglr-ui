import constants from "~/assets/constants.js";

//The overall state for this store.  Saved in JSON format.
const state = () => ({
    myApps: {
        payload: [],
        loading: false,
        error: null
    },
    deletedApplications: {
        loading: false,
        payload: [],
        error: null
    },
    recoverApplication: {
        payload: null,
        loading: false,
        error: null
    },
    deletedFeatures: {
        loading: false,
        payload: [],
        error: null
    },
    recoverFeature: {
        payload: null,
        loading: false,
        error: null
    },
    deletedKeys: {
        loading: false,
        payload: [],
        error: null
    },
    recoverKey: {
        payload: null,
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
    applicationFeatureConfigs: {
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
    async recoverDeletedApplication({
        commit,
        dispatch
    }, app) {
        commit("recoverDeletedApplication")
        try {
            const recover = await this.$axios.$patch(`${constants.urlConstants.recoverDeletedApplication}${app.id}/recover`);
            commit("recoverDeletedApplicationSuccess", app);
        } catch (error) {
            commit("recoverDeletedApplicationFailure", error.message);
        }
    },
    async retrieveDeletedApplications({
        commit,
        dispatch
    }) {
        commit("retrieveDeletedApplications")
        try {
            const apps = await this.$axios.$get(constants.urlConstants.retrieveDeletedpplications);
            if (apps._embedded && apps._embedded.appEntities) {
               commit("retrieveDeletedApplicationsSuccess", apps._embedded.appEntities);
            } else {
                commit("retrieveDeletedApplicationsSuccess", []);
            }
        } catch (error) {
            commit("retrieveDeletedApplicationsFailure", error.message);
        } 
    },
    async recoverDeletedFeature({
        commit,
        dispatch
    }, feature) {
        commit("recoverDeletedFeature")
        try {
            await this.$axios.$patch(`${constants.urlConstants.recoverDeletedFeature}${feature.id}/recover`);
            commit("recoverDeletedFeatureSuccess", feature);
        } catch (error) {
            commit("recoverDeletedFeatureFailure", error.message);
        }
    },
    async retrieveDeletedFeatures({
        commit,
        dispatch
    }, appId) {
        commit("retrieveDeletedFeatures")
        try {
            const apps = await this.$axios.$get(`${constants.urlConstants.retrieveDeletedFeaturesForApp}${appId}`);
            if (apps._embedded && apps._embedded.featureEntities) {
               commit("retrieveDeletedFeaturesSuccess", apps._embedded.featureEntities);
            } else {
                commit("retrieveDeletedFeaturesSuccess", []);
            }
        } catch (error) {
            commit("retrieveDeletedFeaturesFailure", error.message);
        } 
    },
    async recoverDeletedKey({
        commit,
        dispatch
    }, payload) {
        commit("recoverDeletedKeys")
        try {
            let key = await this.$axios.$patch(`${constants.urlConstants.recoverDeletedKey}${payload.appId}_${payload.keyName}/recover`);
            commit("recoverDeletedKeySuccess", key);
        } catch (error) {
            commit("recoverDeletedKeysFailure", error.message);
        }
    },
    async retrieveDeletedKeys({
        commit,
        dispatch
    }, appId) {
        commit("retrieveDeletedKeys")
        try {
            const apps = await this.$axios.$get(`${constants.urlConstants.retrieveDeletedKeysForApp}${appId}`);
            if (apps._embedded && apps._embedded.keysEntities) {
               commit("retrieveDeletedKeysSuccess", apps._embedded.keysEntities);
            } else {
                commit("retrieveDeletedKeysSuccess", []);
            }
        } catch (error) {
            commit("retrieveDeletedKeysFailure", error.message);
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
    async retrieveConfigsByApplicationAndFeature({
        commit,
        dispatch
    }, payload) {
        commit("retrieveConfigsByApplicationAndFeature")
        try {
            const configs = await this.$axios.$get(
                `${constants.urlConstants.retrieveConfigsByApplicationAndFeature}${payload.appId}&featureId=${payload.featureId}`
            );
            if (configs._embedded && configs._embedded.configsEntities) {
                commit("retrieveConfigsByApplicationAndFeatureSuccess", configs._embedded.configsEntities);
                dispatch("notifications/setEditFeatureDialogConfigs", configs._embedded.configsEntities, {
                    root: true
                });
            } else {
                commit("retrieveConfigsByApplicationAndFeatureSuccess", []);
                dispatch("notifications/setEditFeatureDialogConfigs", [], {
                    root: true
                });
            }
        } catch (error) {
            commit("retrieveConfigsByApplicationAndFeatureFailure", error.message);
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
    retrieveDeletedApplications(state) {
        state.deletedApplications.loading = true;
        state.deletedApplications.payload = [];
        state.deletedApplications.error = null;
    },
    retrieveDeletedApplicationsSuccess(state, applications) {
        state.deletedApplications.loading = false;
        state.deletedApplications.payload = applications;
        state.deletedApplications.error = null;
    },
    retrieveDeletedApplicationsFailure(state, error) {
        state.deletedApplications.loading = false;
        state.deletedApplications.payload = [];
        state.deletedApplications.error = error;
    },
    recoverDeletedApplication(state) {
        state.recoverApplication.payload = null;
        state.recoverApplication.loading = true;
        state.recoverApplication.error = null
    },
    recoverDeletedApplicationSuccess(state, app) {
        state.recoverApplication.payload = app
        state.recoverApplication.loading = false;
        state.recoverApplication.error = null
        state.myApps.payload.push(app)
    },
    recoverDeletedApplicationFailure(state, error) {
        state.recoverApplication.payload = null;
        state.recoverApplication.loading = false;
        state.recoverApplication.error = error
    },
    retrieveDeletedFeatures(state) {
        state.deletedFeatures.loading = true;
        state.deletedFeatures.payload = [];
        state.deletedFeatures.error = null;
    },
    retrieveDeletedFeaturesSuccess(state, features) {
        state.deletedFeatures.loading = false;
        state.deletedFeatures.payload = features;
        state.deletedFeatures.error = null;
    },
    retrieveDeletedFeaturesFailure(state, error) {
        state.deletedFeatures.loading = false;
        state.deletedFeatures.payload = [];
        state.deletedFeatures.error = error;
    },
    recoverDeletedFeature(state) {
        state.recoverFeature.payload = null;
        state.recoverFeature.loading = true;
        state.recoverFeature.error = null
    },
    recoverDeletedFeatureSuccess(state, feature) {
        let index = state.deletedFeatures.payload.findIndex(
            feat => feat.id === feature.id
        )

        if (index > -1) {
            state.deletedFeatures.payload.splice(index, 1);
        }
        state.recoverFeature.payload = feature
        state.recoverFeature.loading = false;
        state.recoverFeature.error = null
        state.applicationFeatures.payload.push(feature)

    },
    recoverDeletedFeatureFailure(state, error) {
        state.recoverFeature.payload = null;
        state.recoverFeature.loading = false;
        state.recoverFeature.error = error
    },
    // Retrieve soft deleted keys for an appId
    retrieveDeletedKeys(state) {
        state.deletedKeys.loading = true;
        state.deletedKeys.payload = [];
        state.deletedKeys.error = null;
    },
    retrieveDeletedKeysSuccess(state, keys) {
        state.deletedKeys.loading = false;
        state.deletedKeys.payload = keys;
        state.deletedKeys.error = null;
    },
    retrieveDeletedKeysFailure(state, error) {
        state.deletedKeys.loading = false;
        state.deletedKeys.payload = [];
        state.deletedKeys.error = error;
    },
    // Recover a soft deleted key
    recoverDeletedKey(state) {
        state.recoverKey.payload = null;
        state.recoverKey.loading = true;
        state.recoverKey.error = null
    },
    recoverDeletedKeySuccess(state, key) {
        let index = state.deletedFeatures.payload.findIndex(
            appKey => appKey.keyName === key.keyName
        )

        if (index > -1) {
            state.deletedKeys.payload.splice(index, 1);
        }
        state.recoverKey.payload = key
        state.recoverKey.loading = false;
        state.recoverKey.error = null
        state.applicationKeys.payload.push(key)

    },
    recoverDeletedKeyFailure(state, error) {
        state.recoverKey.payload = null;
        state.recoverKey.loading = false;
        state.recoverKey.error = error
    },
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
    retrieveConfigsByApplicationAndFeature(state) {
        state.applicationFeatureConfigs.payload = []
        state.applicationFeatureConfigs.loading = false;
        state.applicationFeatureConfigs.error = null;
    },
    retrieveConfigsByApplicationAndFeatureSuccess(state, configs) {
        state.applicationFeatureConfigs.payload = configs;
        state.applicationFeatureConfigs.loading = false;
        state.applicationFeatureConfigs.error = null;
    },
    retrieveConfigsByApplicationAndFeatureFailure(state, error) {
        state.applicationFeatureConfigs.payload = []
        state.applicationFeatureConfigs.loading = false;
        state.applicationFeatureConfigs.error = error;
    },
    //Retrieve Application Keys (for sorting purposes usually)
    retrieveApplicationKeys(state) {
        state.applicationKeys.payload = []
        state.applicationKeys.loading = false;
        state.applicationKeys.error = null;
    },
    retrieveApplicationKeysSuccess(state, features) {
        state.applicationKeys.payload = features;
        state.applicationKeys.loading = false;
        state.applicationKeys.error = null;
    },
    retrieveApplicationKeysFailure(state, error) {
        state.applicationKeys.payload = []
        state.applicationKeys.loading = false;
        state.applicationKeys.error = error;
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
        state.applicationFeatures.payload.push(response);
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
        let index = state.applicationFeatures.payload.findIndex(
            feature => feature.id === filter.id
        )

        if (index > -1) {
            state.applicationFeatures.payload.splice(index, 1);
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
        let index = state.applicationKeys.payload.findIndex(
            key => key.keyName === filter.keyName
        )

        if (index > -1) {
            state.applicationKeys.payload.splice(index, 1);
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
        // finds index position of config being removed from applicationFeatureConfigs.payload
        let index = state.applicationFeatureConfigs.payload.findIndex(
            config => config.appId === filter.appId && config.featureId === filter.featureId && config.keyName === filter.keyName && config.configValue == filter.configValue
        )
        // removes it from the array
        if (index > -1) {
            state.applicationFeatureConfigs.payload.splice(index, 1);
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
        state.applicationKeys.payload.push(response);
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