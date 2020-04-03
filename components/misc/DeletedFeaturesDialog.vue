<template >
  <v-dialog
    v-model="deletedFeaturesDialog.showing"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition"
    @keydown.esc="hideDeletedFeaturesDialog()"
  >
      <v-card>
        <v-toolbar color="primary">
        <v-btn icon @click.native="hideDeletedFeaturesDialog()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Recover A Deleted Feature</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="darkBackground" class="pa-2" v-if="retrieveDeletedFeaturesObject.error === null || retrieveDeletedFeaturesObject.payload.length < 1">
              <v-card flat>
                <v-data-table :headers="featureHeaders" :items="deletedFeaturesDialog.features">
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td >{{ props.item.id }}</td>
                      <td>{{ props.item.descr }}</td>
                      <td>
                        <v-btn color="success" outline @click="recoverFeatureEvent(props.item)">
                          <span>Recover</span>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>

            
            </v-card>
            <v-card v-else>
              <span v-if="retrieveDeletedFeaturesObject.error">{{retrieveDeletedFeaturesObject.error}}</span>
              <span v-else> You don't have any deleted features for this app </span>
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
    featureHeaders: [
      { text: "ID", value: "id", sortable: true, align: 'left'},
      { text: "Description", value: "descr", sortable: true, align: 'left'},
      { text: "Action", sortable: false, align: 'left'}
    ],
  }),
  computed: {
    deletedFeaturesDialog() {
      return this.$store.state.notifications.deletedFeaturesDialog;
    },
    retrieveDeletedFeaturesObject () {
      return this.$store.state.applications.deletedFeatures;
    },
    recoverFeatureObject() {
      return this.$store.state.applications.recoverFeature;
    }
  },
  methods: {
    async recoverFeatureEvent (feature) {
      await this.recoverDeletedFeature(feature);
      console.log(this.recoverFeatureObject)
      if (this.recoverFeatureObject.error === null) {
        this.showSnackbar({
            text: "Feature recovered"
          });
        this.hideDeletedFeaturesDialog();
      }
    },
    ...mapActions({
      showSnackbar: "notifications/showSnackbar",
      hideDeletedFeaturesDialog: "notifications/hideDeletedFeaturesDialog",
      recoverDeletedFeature: "applications/recoverDeletedFeature",
    })
  },
  watch: {
    
  }
};
</script>