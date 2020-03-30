<template >
  <v-dialog
    v-model="deletedApplicationsDialog.showing"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition"
    @keyup.esc="hideDeletedApplicationsDialog()"
  >
    <!-- <v-card v-if="deletedApplicationsDialog.error === null"> -->
      <v-card>
        <v-toolbar color="primary">
        <v-btn icon @click.native="hideDeletedApplicationsDialog()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Recover A Deleted Application</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>Rule Summary</v-flex>
          <v-flex xs12>
            <v-card color="darkBackground" class="pa-2">
              <span>hello</span>
              <!-- <pre>{{deletedApplicationsDialog.applications}}</pre> -->
              <v-card flat>
            <v-data-table :headers="appHeaders" :items="deletedApplicationsDialog.applications">
              <template slot="items" slot-scope="props">
                <tr>
                  <td >{{ props.item.id }}</td>
                  <td >{{ props.item.name }}</td>
                  <td>{{ props.item.descr }}</td>
                  <td>{{ props.item.webhookUrl }}</td>
                  <td>
                    <v-btn color="success" outline @click="recoverApplicationEvent(props.item)">
                      <span>Recover</span>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            </v-card>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    appHeaders: [
      { text: "ID", value: "id", sortable: true, align: 'left'},
      { text: "Name", value: "name", sortable: true, align: 'left'},
      { text: "Description", value: "descr", sortable: true, align: 'left'},
      { text: "Webhook URL", value: "webhookUrl", sortable: true, align: 'left'},
      { text: "Action", sortable: false, align: 'left'}
    ],
  }),
  computed: {
    editFeatureDialog() {
      return this.$store.state.notifications.editFeatureDialog;
    },
    deleteConfigObject() {
      return this.$store.state.applications.deleteConfig;
    },
    deletedApplicationsDialog() {
      return this.$store.state.notifications.deletedApplicationsDialog;
    },
    recoverApplicationObject() {
      return this.$store.state.applications.recoverApplication;
    }
  },
  methods: {
    async recoverApplicationEvent (app) {
      await this.recoverDeletedApplication(app);
      if (this.recoverApplicationObject.error === null) {
        this.showSnackbar({
            text: "Application recovered"
          });
        this.hideDeletedApplicationsDialog();
      }
    },
    ...mapActions({
      showSnackbar: "notifications/showSnackbar",
      retrieveDeletedApplications: "notifications/retrieveDeletedApplications",
      showDeletedApplicationsDialog: "notifications/showDeletedApplicationsDialog",
      hideDeletedApplicationsDialog: "notifications/hideDeletedApplicationsDialog",
      recoverDeletedApplication: "applications/recoverDeletedApplication",
      retrieveApplications: "applications/retrieveApplications",
      showSnackbar: "notifications/showSnackbar"
    })
  },
  watch: {
    
  }
};
</script>