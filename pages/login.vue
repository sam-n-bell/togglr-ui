<template>
  <v-layout align-center justify-center wrap>
    <v-flex xs12 sm6 md6 lg3 class="text-xs-center">
      <img src="~/assets/images/tglr-logo-wht-lg.svg" class="mr-1" height="125px" width="200px" />
      <v-card dark class="elevation-12">
        <v-toolbar dark color="charcoal" class="pt-2">
          <span class="subheading">Log into your account</span>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required'"
              v-model="username"
              required
              data-vv-name="username"
              data-vv-as="Username"
              name="username"
              label="Username"
              type="text"
              :error-messages="errors.collect('username')"
            ></v-text-field>
            <v-text-field
              v-validate="'required'"
              v-model="password"
              required
              data-vv-name="password"
              data-vv-as="Password"
              name="password"
              label="Password"
              type="password"
              v-on:keyup.enter="attemptLogin"
              :error-messages="errors.collect('password')"
            ></v-text-field>
          </v-form>
          <v-flex xs-12 class="text-xs-center">
            <div class="error--text mt-2" v-if="loginError">Login Failure: {{ loginError }}</div>
          </v-flex>
        </v-card-text>
        <v-card-actions class="card-actions">
          <v-btn
            color="primary"
            class="mb-4 ml-3 mr-3"
            block
            :disabled="errors.any()"
            @click="attemptLogin"
            :loading="loginInProgress"
          >Log In</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>



  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import constants from "~/assets/constants.js";

export default {
  layout: "loginLayout",
  middleware: "anonymous",
  data: () => ({
    username: "",
    password: "",
    appName: constants.systemConstants.appName
  }),
  computed: {
    loginInProgress() {
      return this.$store.state.authentication.loginInProgress;
    },
    loginError() {
      return this.$store.state.authentication.loginError;
    },
    ...mapGetters({
      isUserAuthenticated: "authentication/isUserAuthenticated"
    })
  },
  methods: {
    attemptLogin() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.login({
            username: this.username,
            password: this.password
          });
        }
      });
    },
    ...mapActions({
      login: "authentication/login"
    })
  },
  watch: {
    isUserAuthenticated(newAuthenticated, oldAuthenticated) {
      if (newAuthenticated) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-actions {
  text-align: center;
  display: flex;
  align-content: center;
  align-items: center;
}
</style>


