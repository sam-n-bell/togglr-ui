import constants from "~/assets/constants.js";
import Cookie from "js-cookie";
import jsonwebtoken from 'jsonwebtoken';

const qs = require('qs');


const state = () => ({
    loginInProgress: false,
    loginError: null,
    logoutDialogShowing: false,
    jwt: null,
    user: "",
    corpId: 1
});

const getters = {
    isUserAuthenticated: state => {

        const token = Cookie.get(
            constants.systemConstants.togglrAuthCookieIdentifer
        );

        return !!state.user || !!token;
    },
    getUsernameIntial: state => {
        if (state.user) {
            return state.user.charAt(0).toUpperCase();
        } else {
            return "-";
        }
    }
};

const actions = {

    async login({
        commit
    }, user) {
        commit("login");

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 4000
        }

        try {
            await this.$axios.$post(
                constants.urlConstants.login,
                qs.stringify(user),
                config
            );

            commit("loginSuccess", user);
        } catch (error) {
            if(error.response.status==401){
              commit("loginFailure", "There was an error with your Username/Password combination. Please try again.");
            } else {
              commit("loginFailure", "An error occurred, please contact application support team.");
            }
        }

    },
    async logout({
        commit
    }) {
        try {
            await this.$axios.$post(
                constants.urlConstants.logout, {
                    timeout: 10000
                }
            );
            commit("logout");
        } catch (error) {
            commit("logout");
            console.log("Logout failure:", error.message);
        }
    },
    showLogoutDialog({
        commit
    }) {
        commit("showLogoutDialog");
    },
    hideLogoutDialog({
        commit
    }) {
        commit("hideLogoutDialog");
    }
};

const mutations = {
    saveJWT(state, jwt) {
        state.jwt = jwt;
        let decoded = jsonwebtoken.decode(jwt);
        state.user = decoded.details.username;
        console.log(state.user);
    },
    login(state) {
        state.loginInProgress = true;
        state.logoutDialogShowing = false;
        state.jwt = null;
        state.loginError = null;
        state.user = null;
    },
    loginSuccess(state, user) {
        state.loginInProgress = false;
        state.logoutDialogShowing = false;
        state.loginError = null;
        state.user = user.username;
    },
    loginFailure(state, error) {
        state.loginInProgress = false;
        state.logoutDialogShowing = false;
        state.jwt = null;
        state.loginError = error;
        state.user = null;
    },
    logout(state) {
        state.loginInProgress = false;
        state.logoutDialogShowing = false;
        state.user = null;
        state.jwt = null;
        Cookie.remove(constants.systemConstants.togglrAuthCookieIdentifer, {path: '/'});
        Cookie.remove(constants.systemConstants.oauthCookieIdentifier, {path:'/'})
    },
    showLogoutDialog(state) {
        state.logoutDialogShowing = true;
    },
    hideLogoutDialog(state) {
        state.logoutDialogShowing = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
