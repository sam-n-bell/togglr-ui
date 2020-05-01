<template >
  <v-dialog
    v-model="editFeatureDialog.showing"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="hideEditFeatureDialogEvent"
  >
    <v-card v-if="editFeatureDialog.feature">
      <v-toolbar color="primary">
        <v-btn icon @click.native="hideEditFeatureDialogEvent()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ editFeatureDialog.feature.descr }}</v-toolbar-title>
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
                @focus="comboChanged(key.keyName)"
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
    currentKey: ""
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
    hideEditFeatureDialogEvent() {
      // resetting the key so that the component doesn't try
      // to create a new config if the dialog is reopened
      this.currentKey = "";
      this.hideEditFeatureDialog();
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

            // removes the last ',<space>' characters
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
          if (this.configsLoaded && this.currentKey !== "") {
          //Adding an admin
          if (newConfigs.length > oldConfigs.length) {
            var configToAdd = newConfigs.filter(
              config => !oldConfigs.includes(config)
            );
            if (configToAdd.length > 0) {
              this.addConfig({
                appId: this.editFeatureDialog.appDetails.id,
                featureId: this.editFeatureDialog.feature.id,
                keyName: this.currentKey,
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
