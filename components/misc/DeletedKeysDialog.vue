<template >
  <v-dialog
    v-model="deletedKeysDialog.showing"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition"
    @keydown.esc="hideDeletedKeysDialog()"
  >
      <v-card>
        <v-toolbar color="primary">
        <v-btn icon @click.native="hideDeletedKeysDialog()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Recover A Deleted Key</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="darkBackground" class="pa-2" v-if="retrieveDeletedKeysObject.error === null || retrieveDeletedKeysObject.payload.length < 1">
              <v-card flat>
                <v-data-table :headers="keyHeaders" :items="deletedKeysDialog.keys">
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td >{{ props.item.appId }}</td>
                      <td>{{ props.item.keyName }}</td>
                      <td>
                        <v-btn color="success" outline @click="recoverKeyEvent(props.item)">
                          <span>Recover</span>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>

            
            </v-card>
            <v-card v-else>
              <span v-if="retrieveDeletedKeysObject.error">{{retrieveDeletedKeysObject.error}}</span>
              <span v-else> You don't have any deleted keys for this app </span>
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
    keyHeaders: [
      { text: "App ID", value: "appId", sortable: true, align: 'left'},
      { text: "Key Name", value: "keyName", sortable: true, align: 'left'},
      { text: "Action", sortable: false, align: 'left'}
    ],
  }),
  computed: {
    deletedKeysDialog() {
      return this.$store.state.notifications.deletedKeysDialog;
    },
    retrieveDeletedKeysObject () {
      return this.$store.state.applications.deletedKeys;
    },
    recoverKeyObject() {
      return this.$store.state.applications.recoverKey;
    }
  },
  methods: {
    async recoverKeyEvent (appId, keyName) {
      await this.recoverDeletedKey(appId, keyName);
      if (this.recoverKeyObject.error === null) {
        this.showSnackbar({
            text: "Key recovered"
          });
        this.hideDeletedKeysDialog();
      }
    },
    ...mapActions({
      showSnackbar: "notifications/showSnackbar",
      hideDeletedKeysDialog: "notifications/hideDeletedKeysDialog",
      recoverDeletedKey: "applications/recoverDeletedKey",
    })
  },
  watch: {
    
  }
};
</script>