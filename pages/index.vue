<template>
  <div>
    <div class="display-2">Home</div>
    <v-layout align-center justify-space-between row fill-height>
      <v-flex xs12 sm12 md6 lg5 xl5>
        <div
          class="subheading mt-3 description-font"
        >View and edit projects. Add new projects in the top right corner.</div>
      </v-flex>
      <v-flex xs4 sm4 md4 lg3 xl3 class="right-align">
          <v-text-field
            label="Search for Application"
            placeholder="Start typing the name..."
            v-model="searchCriteria"
          ></v-text-field>
      </v-flex>
      <v-flex xs5 sm5 md4 lg3 xl3 class="right-align">
        <v-btn outline color="primary" nuxt to="/addApplication">Add Application</v-btn>
      </v-flex>
      <v-flex xs3 sm3 md2 lg2 xl3 class="right-align">
        <v-btn outline color="error" @click="retrieveDeletedApplicationsEvent()">Recover Application</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="applications.loading">
      <v-flex xs12 md4 pa-2 v-for="i in 6" :key="i + 100">
        <LoadingCard class="pa-2" :graph="true" :height="225" />
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else-if="applications.error">
      <v-flex xs12 pa-2 text-xs-center>
        <div class="error--text subheading">{{ applications.error }}</div>
        <v-btn flat color="primary" class="pa-0 ma-0" @click="retrieveApplications">Retry</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else-if="deletedApplicationsDialog.showing">
      <DeletedApplicationsDialog/>
    </v-layout>
    <v-layout row wrap v-else mt-4>
      <v-flex v-if="applications.payload.length === 0" text-xs-center>No applications available. Click the button in the top right to add applications.</v-flex>
      <v-flex xs12 md4 pa-2 v-for="app in filteredData" :key="app.id">
        <ApplicationPreviewCard :app="app" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ApplicationPreviewCard from "~/components/applications/ApplicationPreviewCard";
import LoadingCard from "~/components/loading/LoadingCard";
import { mapActions, mapGetters } from "vuex";
import DeletedApplicationsDialog from "~/components/misc/DeletedApplicationsDialog";

export default {
  middleware: "auth",
  components: {
    ApplicationPreviewCard,
    LoadingCard,
    DeletedApplicationsDialog
  },
  data: () => ({
    searchCriteria: '',
    toggle_exclusive: 0,
  }),
  mounted() {
    this.retrieveApplications();
  },
  computed: {
    applications() {
      return this.$store.state.applications.myApps;
    },
    filteredData () {
      if (this.applications.payload) {
        if (this.searchCriteria.trim() !== '') {
          // If user has provided input (incl just a space character)
          return (this.applications.payload.filter(app => app.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) > -1));
        } else {
          // User has not entered characters into the search bar
          return this.applications.payload.filter(app => app !== null);
        }
      }
      return [];
    },
    retrieveDeletedApplicationsObject () {
      return this.$store.state.applications.deletedApplications;
    },
    deletedApplicationsDialog() {
      return this.$store.state.notifications.deletedApplicationsDialog;
    }
  },
  watch : {
    retrieveDeletedApplicationsObject: {
      handler(object) {
        if (object.payload) {
          this.showDeletedApplicationsDialog(object.payload);
        } 

        if (object.error) {
          this.showSnackbar({
            text: object.error
          });
        }
      },
      deep: true
    }
  },
  methods: {
    async retrieveDeletedApplicationsEvent () {
      await this.retrieveDeletedApplications();
    },
    ...mapActions({
      retrieveApplications: "applications/retrieveApplications",
      retrieveDeletedApplications: "applications/retrieveDeletedApplications",
      showDeletedApplicationsDialog: "notifications/showDeletedApplicationsDialog"
    })
  }
};
</script>