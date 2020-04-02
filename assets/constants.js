var systemConstants = Object.freeze({
    appName: "Togglr",
    userSettingsCookieName: "togglr-settings-token",
    authCookieIdentifer: "X-TOGGLR-TOKEN",
    featureFlagAppId: 3,
    version: "0.9.0"
});

let baseURL = "/togglr-api/"
var urlConstants = Object.freeze({
    projection: `?projection=includeSubObjects`,
    retrieveApplications: `${baseURL}appEntities`,
    appEntites: `${baseURL}appEntities/`,
    addApplicationPOST: `${baseURL}appEntities`,
    retrieveAppDetailsGET: `${baseURL}appEntities/`,
    deleteApplication: `${baseURL}appEntities/`,
    retrieveDeletedpplications: `${baseURL}appEntities/deleted`,
    recoverDeletedApplication: `${baseURL}appEntities/`,
    retrieveDeletedFeaturesForApp: `${baseURL}/featureEntities/search/findByAppIdAndDeletedIsTrue?appId=`,
    recoverDeletedFeature: `${baseURL}/featureEntities/`,
    retrieveApplicationFeatures: `${baseURL}featureEntities/search/findByAppId?appId=`,
    retrieveApplicationKeys: `${baseURL}keysEntities/search/findByAppId?appId=`,
    retrieveConfigsByApplicationAndFeature: `${baseURL}configsEntities/search/findByAppIdAndFeatureId?appId=`,
    updateFeature: `${baseURL}featureEntities/`,
    updateKey: `${baseURL}keysEntities/`,
    adminEntity: `${baseURL}adminsEntities/`,
    configsEntity: `${baseURL}configsEntities/`,
    login: `${baseURL}login`,
    logout: `${baseURL}logout`
});

var disallowedChars = Object.freeze(["_", "/"]);

var specialCharValidator = {
    getMessage(field, args) {
        return "No special characters. Disallowed characters are: '_', '/'"
    },

    validate(value, args) {
        for (let i in disallowedChars) {
            if (value.includes(disallowedChars[i])) {
                return false
            }
        }
        return true
    }
}

export default Object.freeze({
    systemConstants: systemConstants,
    urlConstants: urlConstants,
    specialCharValidator: specialCharValidator
});