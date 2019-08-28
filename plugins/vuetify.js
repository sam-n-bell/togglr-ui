import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
    theme: {
        primary: "#008DC7", // a color that is not in the material colors palette
        accent: colors.teal.base,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.red.base,
        success: colors.green.accent3,
        link: "#167EF9",
        charcoal: "#3B3B3B",
        background: "#FAFAFA",
        background2: "#d8d8d8",
        darkBackground: "#595757",
        badgeBlue: "#1D4D95",
        lightGrey: "#D3D2D3",
        brightGreen: "#4DCE36",
        darkGreen: "#38AD3D"
    }
});