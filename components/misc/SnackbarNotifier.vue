<template>
  <v-snackbar v-model="snackbarObject.showing" bottom :timeout="0">
    {{ snackbarObject.text ? snackbarObject.text : "Something somewhere went wrong..." }}
    <v-btn
      v-if="snackbarObject.extraBtnText && snackbarObject.btnAction"
      color="primary"
      flat
      @click="snackbarObject.btnAction"
    >{{ snackbarObject.extraBtnText }}</v-btn>
    <v-btn color="accent" flat @click="hideSnackbar">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      hideSnackbar: "notifications/hideSnackbar"
    })
  },
  computed: {
    snackbarObject() {
      return this.$store.state.notifications.snackbar;
    }
  }
};
</script>