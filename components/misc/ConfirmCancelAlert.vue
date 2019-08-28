<template>
  <v-dialog v-model="confirmCancelDialog.showing" persistent width="500">
    <v-card dark>
      <v-card-title
        class="headline darkBackground white--text"
        primary-title
      >{{ confirmCancelDialog.title }}</v-card-title>
      <v-card-text>{{ confirmCancelDialog.description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" flat @click="confirmClicked">{{ confirmCancelDialog.confirmBtnText }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="canceClicked">{{ confirmCancelDialog.cancelBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    confirmCancelDialog() {
      return this.$store.state.notifications.confirmCancelDialog;
    }
  },
  methods: {
    confirmClicked() {
      if (this.confirmCancelDialog.confirmBtnAction) {
        this.confirmCancelDialog.confirmBtnAction();
      }
      this.hideConfirmCancelDialog();
    },
    canceClicked() {
      if (this.confirmCancelDialog.cancelBtnAction) {
        this.confirmCancelDialog.cancelBtnAction();
      }
      this.hideConfirmCancelDialog();
    },
    ...mapActions({
      hideConfirmCancelDialog: "notifications/hideConfirmCancelDialog"
    })
  }
};
</script>