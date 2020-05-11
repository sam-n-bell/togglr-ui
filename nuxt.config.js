const pkg = require("./package");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "spa",
    router: {
        base: "/togglr/",
        middleware: "check-auth"
    },

    env: {
        forwardedHost: process.env.FORWARDED_HOST
    },

    /*
     ** Headers of the page
     */
    head: {
        title: "Togglr",
        meta: [{
                charset: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: pkg.description
            }
        ],
        link: [{
                rel: "icon",
                type: "image/x-icon",
                href: "~/assets/images/favicon.ico"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "#FFFFFF"
    },

    /*
     ** Global CSS
     */
    css: ["~/assets/global.scss", "vuetify/src/stylus/main.styl"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: ["@/plugins/vuetify", "@/plugins/vee-validate", "~/plugins/axios", "@/plugins/vue-clipboard"],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/proxy",
        "@nuxtjs/axios",
        "@nuxtjs/moment"
    ],
    /*
     ** Axios module configuration
     *
     * See https://github.com/nuxt-community/axios-module#options
     */
    axios: {
        proxy: true
    },

    // Proxies any request to /togglr-api/ to ENV Variable NUXT_PROXY_TARGET: Example -> https://togglr.df.nonprod.gcp.heb.com
    proxy: {
        '/togglr-api/': {
            target: `${process.env.NUXT_PROXY_TARGET}`
        }
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vuetify/]
                    })
                ];
            }
        },
        vendor: ["babel-polyfill"],
        babel: {
            presets: [
                [
                    "vue-app",
                    {
                        useBuiltIns: true,
                        targets: {
                            ie: 11,
                            uglify: true
                        }
                    }
                ]
            ]
        }
    }
};

console.log(module.exports);
