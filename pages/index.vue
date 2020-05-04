<template>
  <div>
    <div class="display-2">Home</div>
    <v-layout align-center justify-space-between row fill-height>
      <v-flex xs12 sm12 md8 lg9 xl9>
        <div
          class="subheading mt-3 description-font"
        >View and edit projects. Add new projects in the top right corner.</div>
      </v-flex>
      <v-flex xs6 sm5 md4 lg3 xl3 class="right-align">
          <v-text-field
            label="Search for Application"
            placeholder="Search by name or ID..."
            v-model="searchCriteria"
          ></v-text-field>
      </v-flex>
      <v-flex xs8 sm8 md4 lg3 xl3 class="right-align">
        <v-btn outline color="primary" nuxt to="/addApplication">Add Application</v-btn>
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
    <v-layout row wrap v-else mt-4>
      <v-flex v-if="applications.payload.length === 0 || filteredData.length === 0" text-xs-center>No applications available. Click the button in the top right to add applications.</v-flex>
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

export default {
  middleware: "auth",
  components: {
    ApplicationPreviewCard,
    LoadingCard
  },
  data: () => ({
    searchCriteria: '',
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
        if (this.searchCriteria.trim() !== "") {
          // If user has provided input (incl. just a space character)
          return (this.applications.payload.filter(
            // search for matches in application name or id
            app => app.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) > -1
              || app.id.toString().indexOf(this.searchCriteria.trim()) > -1))
        } else {
          // User has not entered characters into the search bar
          return this.applications.payload.filter(app => app !== null);
        }
      }
      return [];
    },
  },
  methods: {
    ...mapActions({
      retrieveApplications: "applications/retrieveApplications"
    })
  }
};
</script>