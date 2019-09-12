<template>
  <div class="display-inline" @click="navToHome">
    <img
      v-if="darkThemeEnabled"
      src="~/assets/images/tglr-logo-white.svg"
      class="mr-1"
      height="87px"
      width="100px"
    />

    <img v-else src="~/assets/images/tglr-logo-color.svg" class="mr-1" height="87px" width="100px" />
  </div>
</template>

<script>
import constants from "~/assets/constants.js";

export default {
  middleware: "anonymous",
  data() {
    return {
      appName: constants.systemConstants.appName
    };
  },
  computed: {
    darkThemeEnabled() {
      return this.$store.state.settings.darkThemeEnabled;
    }
  },
  methods: {
    navToHome() {
      this.$router.push("/");
    }
  }
};
</script>