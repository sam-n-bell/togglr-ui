<template>
  <v-card height="150">
    <v-layout row wrap align-center>
      <v-flex sm10 pl-3>
        <span class="headline">{{ app.name }}</span>
      </v-flex>
      <v-flex sm2 class="text-xs-right">
        <v-btn flat icon @click="nav(app)">
          <v-icon>create</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 pl-3 pb-2>
        <div class="body-2">Application ID</div>
        <span>{{ app.id }}</span>
      </v-flex>
      <v-flex xs12 pl-3 pb-3>
        <div class="body-2">Description</div>
        <span>{{ app.descr }}</span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["app"],
  methods: {
    nav(app) {
      this.storeAppDetail(app);
      this.$router.push("/applicationDetails");
    },
    ...mapActions({
      storeAppDetail: "routeStorage/storeAppDetail"
    })
  }
};
</script>