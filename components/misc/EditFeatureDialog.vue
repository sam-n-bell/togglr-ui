<template >
  <v-dialog
    v-model="editFeatureDialog.showing"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="resetKeyNameTrackersHideDialog"
  >
    <v-card v-if="editFeatureDialog.feature">
      <v-toolbar color="primary">
        <v-btn icon @click.native="resetKeyNameTrackersHideDialog()">
          <!-- @keyup.esc="hideEditFeatureDialog()" -->
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ editFeatureDialog.feature.descr }}</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat @click.native="hideEditFeatureDialog()">Save</v-btn>
        </v-toolbar-items>-->
      </v-toolbar>

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>Rule Summary</v-flex>
          <v-flex xs12>
            <v-card color="darkBackground" class="pa-2">
              <span>{{ ruleSummary }}</span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card v-for="key in editFeatureDialog.appDetails.keysById" :key="key.keyName">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12>{{key.keyName}}</v-flex>
            <v-flex xs12>
              <v-combobox
                :append="null"
                :data-vv-name="key.keyName"
                :error-messages="errors.collect(key.keyName)"
                v-model="configsById"
                :label="key.keyName"
                @keyup="trackKeyFieldLastTypedIn(key.keyName)"
                @click="comboChanged(key.keyName)"
                :append-icon="null"
                chips
                solo
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    v-if="data.item.keyName === key.keyName"
                    :selected="data.selected"
                    close
                    @input="deleteConfigClicked(key.keyName, data.item)"
                  >
                    <strong>{{data.item.configValue }}</strong>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-layout>
        </v-container>

        <v-divider></v-divider>
      </v-card>

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>Negation</v-flex>
          <v-flex xs12>
            <v-switch
              v-if="editFeatureDialog && editFeatureDialog.feature"
              class="mt-2"
              :input-value="editFeatureDialog.feature.negation"
              @change="toggleFeatureNegation(editFeatureDialog.feature.id)"
            ></v-switch>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    ruleSummary: "",
    configsLoaded: false,
    configsById: [],
    currentKey: "",
    lastKeyFieldEntered:""
  }),
  computed: {
    editFeatureDialog() {
      return this.$store.state.notifications.editFeatureDialog;
    },
    deleteConfigObject() {
      return this.$store.state.applications.deleteConfig;
    }
  },
  methods: {
    resetKeyNameTrackersHideDialog () {
      this.currentKey = "";
      this.lastKeyFieldEntered = "";
      this.hideEditFeatureDialog();
    },
    trackKeyFieldLastTypedIn (keyName) {
      this.lastKeyFieldEntered = keyName;
    },
    deleteConfigClicked(keyName, item) {
      this.comboChanged(keyName);
      this.deleteConfig(item);
    },
    updateRuleSummary() {
      var summary = "";

      this.editFeatureDialog.appDetails.keysById.forEach(key => {
        if (
          this.editFeatureDialog.configsById &&
          this.editFeatureDialog.feature != null &&
          this.editFeatureDialog.feature.negation !== undefined
        ) {
          var configs = this.editFeatureDialog.configsById.filter(
            config => config.keyName == key.keyName
          );

          if (configs.length > 0) {
            configs.forEach(config => {
              summary += key.keyName + " " + config.configValue + ", ";
            });

            summary = summary.substring(0, summary.length - 2);

            summary += this.editFeatureDialog.feature.negation
              ? " will not have access."
              : " will have access.";
            summary += "\n";
          }
        }
      });

      this.ruleSummary = summary;
    },
    comboChanged(keyName) {
      this.currentKey = keyName;
    },
    ...mapActions({
      hideEditFeatureDialog: "notifications/hideEditFeatureDialog",
      addConfig: "applications/addConfig",
      deleteConfig: "applications/deleteConfig",
      toggleFeatureNegation: "notifications/toggleFeatureNegation",
      showSnackbar: "notifications/showSnackbar"
    })
  },
  watch: {
    editFeatureDialog: {
      handler(object) {
        if (object.feature) {
          if (object.feature.configsById) {
            this.configsById = JSON.parse(
              JSON.stringify(object.feature.configsById)
            );
          } else {
            this.configsById = [];
          }
        }

        if (!object.showing) {
          this.configsLoaded = false;
        }

        this.updateRuleSummary();
      },
      deep: true
    },
    deleteConfigObject: {
      handler(object) {
        if (object.error) {
          this.showSnackbar({
            text: object.error
          });
        }
      },
      deep: true
    },
    configsById: {
      handler(newConfigs, oldConfigs) {

        // below if condition handles scenario where user will type in one combobox and then click into another
        // it makes sure the config is saved to the correct rule
        let keyToUpdate = this.currentKey;
        if (this.lastKeyFieldEntered !== this.currentKey) {
          keyToUpdate = this.lastKeyFieldEntered
        }

        if (this.configsLoaded) {
          //Adding an admin
          if (newConfigs.length > oldConfigs.length) {
            var configToAdd = newConfigs.filter(
              config => !oldConfigs.includes(config)
            );
            if (configToAdd.length > 0) {
              this.addConfig({
                appId: this.editFeatureDialog.appDetails.id,
                featureId: this.editFeatureDialog.feature.id,
                keyName: keyToUpdate,
                configValue: configToAdd[0]
              });
            }
          }
        }

        this.configsLoaded = true;
        this.updateRuleSummary();
      }
    }
  }
};
</script>
