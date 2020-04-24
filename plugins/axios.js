import Cookie from "js-cookie";
import constants from "~/assets/constants.js";

export default function(context) {
    context.$axios.onRequest(config => {
        console.log("Making request to " + config.url);

        const token = Cookie.get(constants.systemConstants.authCookieIdentifer);

        if (!token && !config.url.endsWith("logout") && !config.url.endsWith("login")) {
            console.log("No token on request");
            context.store.commit("authentication/logout");
        }
    });

    context.$axios.onResponse(response => {
        console.log("response: ", response);

        const token = Cookie.get(constants.systemConstants.authCookieIdentifer);

        if (!token && !response.config.url.endsWith("logout")) {
            console.log("No token on response");
            context.store.commit("authentication/logout");
        }
    });

    context.$axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code > 400) {
            context.redirect("/400");
        }
    });
}