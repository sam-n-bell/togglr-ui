import constants from "~/assets/constants.js";
import Cookie from "js-cookie";

export default function(context) {

    if (process.env.forwardedHost) {
        context.$axios.defaults.headers.common[
            'X-Forwarded-Host'
        ] = process.env.forwardedHost;
    }

    if (!context.store.getters["authentication/isUserAuthenticated"]) {

        const jwt = Cookie.get(constants.systemConstants.togglrAuthCookieIdentifer);
        const oauthBearer = Cookie.get(constants.systemConstants.oauthCookieIdentifier);
        
        if (oauthBearer) {
            context.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + oauthBearer
        }

        if (jwt) {
            context.$axios.defaults.headers.common[
                constants.systemConstants.togglrAuthCookieIdentifer
            ] = jwt;

            context.store.commit("authentication/saveJWT", jwt);
        } else {
            console.log("No jwt, redirecting to login");
            return context.redirect("/login");
        }
    } else {

        const jwt = Cookie.get(constants.systemConstants.togglrAuthCookieIdentifer);

        const oauthBearer = Cookie.get(constants.systemConstants.oauthCookieIdentifier);
        
        if (oauthBearer) {
            context.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + oauthBearer
        }
        
        if (jwt) {
            context.$axios.defaults.headers.common[
                constants.systemConstants.togglrAuthCookieIdentifer
            ] = jwt;

            context.store.commit("authentication/saveJWT", jwt);
        } else {
            console.log("No jwt/authentication, redirecting to login");
            return context.redirect("/login");
        }
    }
}