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
      <br/>
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
        <v-card v-for="key in applicationKeys.payload" :key="key.keyName">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12>{{key.keyName}}</v-flex>
            <v-flex xs12>
              <v-combobox
                :append="null"
                :data-vv-name="key.keyName"
                :error-messages="errors.collect(key.keyName)"
                v-model="featureConfigs"
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
    featureConfigs: [],
    currentKey: "",
    lastKeyFieldEntered:""
  }),
  computed: {
    editFeatureDialog() {
      return this.$store.state.notifications.editFeatureDialog;
    },
    deleteConfigObject() {
      return this.$store.state.applications.deleteConfig;
    },
    applicationFeatureConfigs() {
      return this.$store.state.applications.applicationFeatureConfigs;
    },
    applicationKeys () {
      return this.$store.state.applications.applicationKeys;
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

      this.applicationKeys.payload.forEach(key => {
        if (
          this.editFeatureDialog.configs &&
          this.editFeatureDialog.feature != null &&
          this.editFeatureDialog.feature.negation !== undefined
        ) {
          // for each key, match configs to keys based on the keyName in both properties
          let configs = this.editFeatureDialog.configs.filter(
            config => config.keyName == key.keyName
          )

          if (configs.length > 0) {
            configs.forEach(config => {
              summary += key.keyName + " " + config.configValue + ", ";
            });

            // - 2 removes the last ',<space>'
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
      showSnackbar: "notifications/showSnackbar",
      retrieveConfigsByApplicationAndFeature: "applications/retrieveConfigsByApplicationAndFeature",
      showEditFeatureDialog: "notifications/showEditFeatureDialog"
    })
  },
  watch: {
    editFeatureDialog: {
      handler(object) {
        if (object.feature) {
          if (object.configs) {
            this.featureConfigs = JSON.parse(
              JSON.stringify(object.configs)
            );
          } else {
            this.featureConfigs = [];
          }
        }

        if (!object.showing) {
          this.configsLoaded = false;
        }
        this.configsLoaded = true;
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
    featureConfigs: {
       handler(newConfigs, oldConfigs) {
        // below if condition handles scenario where user will type in one combobox and then click into another
        // it makes sure the config is saved to the correct rule
        let keyToUpdate = this.currentKey;
        if (this.lastKeyFieldEntered !== this.currentKey) {
          keyToUpdate = this.lastKeyFieldEntered
        }
        // keyToUpdate in this if prevents the watcher from trying to POST a new config 
        // when the configs for this feature are returned from the API and added to 
        // editFeatureDialog.configs in the store. The watcher correctly sees that as a change to the object.
        if (this.configsLoaded && keyToUpdate) {
          //Adding an admin
          if (newConfigs.length > oldConfigs.length) {
            // figure out which config is the new one that the user just typed in
            var configToAdd = newConfigs.filter(
              config => !oldConfigs.includes(config)
            );
            if (configToAdd.length > 0) {
                //removes _ characters - underscores cause issue with key removals later
                configToAdd = configToAdd[0].replace(/_/, ''); 
              if (configToAdd.trim().length > 0) {
                this.addConfig({
                  appId: this.editFeatureDialog.appDetails.id,
                  featureId: this.editFeatureDialog.feature.id,
                  keyName: keyToUpdate,
                  configValue: configToAdd
                });
              } else {
                // remove invalid config
                var index = this.configsById.findIndex(
                    config => config === configToAdd
                );
                this.configsById.splice(index, 1);
              }
              
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
