<template>
  <v-switch
    color="primary"
    prepend-icon="wb_sunny"
    append-icon="brightness_3"
    :input-value="darkThemeEnabled"
    @change="toggleDarkTheme"
  ></v-switch>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      toggleDarkTheme: "settings/toggleDarkTheme"
    })
  },
  computed: {
    darkThemeEnabled() {
      return this.$store.state.settings.darkThemeEnabled;
    }
  }
};
</script>