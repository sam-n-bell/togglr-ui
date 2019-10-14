<template>
  <v-app :dark="darkThemeEnabled">
    <v-navigation-drawer v-model="drawer" clipped fixed app :mini-variant.sync="mini">
      <v-list dense>
        <v-list-tile @click="navigateToLink('/')">
          <v-list-tile-action>
            <v-icon :color="getIconColor('/')" class="pr-0">home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :class="getTextColor('/')">HOME</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="changeNavbar"></v-toolbar-side-icon>
      <Logo class="mt-1" />
      <v-spacer />
      <div>
        <v-menu offset-y transition="slide-y-transition" left>
          <v-avatar slot="activator" :tile="false" :size="45" color="primary">
            <span class="white--text headline">{{ getUsernameIntial }}</span>
          </v-avatar>
          <v-list>
            <v-list-tile :key="'logout'" @click="logUserOut">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
            <v-list-tile :key="'darkModeToggle'">
              <DarkModeSwitch />
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <v-content>
      <!-- Add fill-height to v-container for it to fill screen -->
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <SnackbarNotifier />
    <ConfirmCancelAlert />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import constants from "~/assets/constants.js";
import Logo from "~/components/misc/Logo";
import ConfirmCancelAlert from "~/components/misc/ConfirmCancelAlert";
import DarkModeSwitch from "~/components/misc/DarkModeSwitch";
import SnackbarNotifier from "~/components/misc/SnackbarNotifier";

export default {
  middleware: "auth",
  components: {
    Logo,
    SnackbarNotifier,
    ConfirmCancelAlert,
    DarkModeSwitch
  },
  mounted() {
    this.$store.dispatch("settings/syncUserSettings");
  },
  data: () => ({
    mini: false,
    appName: constants.systemConstants.appName,
    drawer: false
  }),
  methods: {
    changeNavbar() {
      this.mini = !this.mini;
      if (!this.drawer) {
        this.drawer = true;
        this.mini = false;
      }
    },
    navigateToLink(link) {
      this.$router.push(link);
    },
    getIconColor(link) {
      if (link === this.$route.path) {
        return "primary";
      } else {
        if (this.$route.path.startsWith(link) && link !== "/") {
          return "primary";
        } else {
          return "";
        }
      }
    },
    getTextColor(link) {
      if (link === this.$route.path) {
        return "primary--text";
      } else {
        if (this.$route.path.startsWith(link) && link !== "/") {
          return "primary--text";
        } else {
          return "";
        }
      }
    },
    logUserOut() {
      this.logout();
    },
    ...mapActions({
      logout: "authentication/logout"
    })
  },
  computed: {
    jwt() {
      return this.$store.state.authentication.jwt;
    },
    darkThemeEnabled() {
      return this.$store.state.settings.darkThemeEnabled;
    },
    ...mapGetters({
      getUsernameIntial: "authentication/getUsernameIntial"
    })
  },
  watch: {
    jwt: {
      handler(newObject) {
        if (newObject === null) {
          console.log("JWT Null In Default, Redirecting To Login");

          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
