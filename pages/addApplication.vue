<template>
  <div>
    <v-breadcrumbs divider=">" class="pt-0">
      <v-breadcrumbs-item nuxt to="/" exact :disabled="false">Home</v-breadcrumbs-item>
      <v-breadcrumbs-item>Add Application</v-breadcrumbs-item>
    </v-breadcrumbs>
    <div class="display-2 mb-4">Add Application</div>
    <form>
      <v-text-field
        v-validate="'required|max:30|specialChars'"
        v-model="name"
        :counter="30"
        :error-messages="errors.collect('name')"
        label="Application Name"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-validate="'required|max:100'"
        v-model="description"
        :counter="100"
        :error-messages="errors.collect('description')"
        label="Application Description"
        data-vv-name="description"
        required
      ></v-text-field>
      <v-btn @click="submit" :loading="createApplicationObject.loading" color="primary">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
      <div
        class="error--text text-xs-center subheading"
        v-if="createApplicationObject.error"
      >{{ createApplicationObject.error }}. Click submit to retry.</div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "vee-validate";
import constants from "~/assets/constants.js";

Validator.extend("specialChars", constants.specialCharValidator);

export default {
  mounted() {
    this.admins.push(this.user);
    if (this.createApplicationObject.error) {
      this.$store.commit("applications/createApplicationReset");
    }
  },
  data: () => ({
    name: "",
    description: "",
    admins: [],
    items: []
  }),
  methods: {
    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.createApplication({
            name: this.name,
            descr: this.description,
            adminsById: this.admins
          });
        }
      });
    },
    clear() {
      this.name = "";
      this.description = "";
      this.admins = [];
    },
    remove(item) {
      this.admins.splice(this.admins.indexOf(item), 1);
      this.admins = [...this.admins];
    },
    ...mapActions({
      createApplication: "applications/createApplication"
    })
  },
  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    createApplicationObject() {
      return this.$store.state.applications.createApplication;
    }
  },
  watch: {
    createApplicationObject: {
      handler(newObject) {
        if (newObject.payload) {
          this.$router.push("/");
        }
      },
      deep: true
    }
  }
};
</script>