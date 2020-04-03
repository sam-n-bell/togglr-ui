<template>
  <v-dialog v-model="ToggledDateDialog.showing" persistent width="500">
    <v-card dark>
      <v-card-title
        class="headline darkBackground white--text"
        primary-title
      >{{ ToggledDateDialog.title }}</v-card-title>
      <v-card-text>{{ ToggledDateDialog.description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" flat @click="cancelClicked">{{ ToggledDateDialog.cancelBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ToggledDateDialog() {
      return this.$store.state.notifications.ToggledDateDialog;
    }
  },
  methods: {
    
    cancelClicked() {
      if (this.ToggledDateDialog.cancelBtnAction) {
        this.ToggledDateDialog.cancelBtnAction();
      }
      this.hideToggledDateDialog();
    },
    ...mapActions({
      hideToggledDateDialog: "notifications/hideToggledDateDialog"
    })
  }
};
</script>