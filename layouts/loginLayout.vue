<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="background-style">
        <nuxt />
      </v-container>
      <v-container
        fluid
        fill-width
        grid-list-md
        row-wrap
        text-xs-center
        class="bottom-message-container dark-background"
      >
        <v-layout row wrap>
          <v-flex xs12 sm4 mt-1>
            <span class="bottom-message-smaller">Copyright &#9400; 2019 H-E-B</span>
          </v-flex>
          <v-flex xs12 sm4>
            <span class="bottom-message">Feature Flag System</span>
          </v-flex>
          <v-flex xs12 sm4>
            <div class="mt-1">
              <span class="text-link bottom-message-smaller" @click="navToGithubSpace">Github</span>
              <VerticalDivider class="divider-style ml-1 mr-1" />
              <span class="text-link bottom-message-smaller">Version - {{ version }}</span>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VerticalDivider from "~/components/dividers/VerticalDivider";
import constants from "~/assets/constants.js";

export default {
  middleware: "anonymous",
  mounted() {
    this.$router.push("/");
  },
  methods: {
    navToGithubSpace() {
      var win = window.open("https://github.com/HEB/togglr", "_blank");
      win.focus();
    }
  },
  data() {
    return {
      version: constants.systemConstants.version
    };
  },
  components: {
    VerticalDivider
  }
};
</script>

<style lang="scss" scoped>
.background-style {
  background-image: url("~/assets/images/login-pattern-blue.png");
  background-repeat: repeat;
}

.bottom-message-container {
  position: absolute;
  bottom: 0;
}

.dark-background {
  background: rgba(59, 59, 59, 0.95) !important;
  color: white !important;
}

.text-link {
  color: white !important;
  display: inline;
  cursor: pointer;
}

.divider-style {
  display: inline;
  border-left: 1px solid white;
}

.bottom-message {
  font-size: 18px;
}

.bottom-message-smaller {
  font-size: 15px;
}
</style>

