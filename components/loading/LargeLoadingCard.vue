<template>
  <v-card>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs10 pb-5>
          <v-card :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title']" flat>
            <v-card-text>&nbsp;</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs2>
          <v-card :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title']" flat>
            <v-card-text>&nbsp;</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs9 order-xs5>
          <v-layout column>
            <v-flex d-flex pb-4>
              <v-card
                :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'graph']"
                flat
              >
                <v-card-text>&nbsp;</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-card
                :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'graph mr-2']"
                flat
              >
                <v-card-text>&nbsp;</v-card-text>
              </v-card>
              <v-card
                :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'graph ml-2']"
                flat
              >
                <v-card-text>&nbsp;</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs3 order-xs5>
          <v-layout column>
            <v-flex d-flex pl-4>
              <v-card
                :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'contacts']"
                flat
              >
                <v-card-text>&nbsp;</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs4 sm4 pb-3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card
                :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title']"
                flat
              >
                <v-card-text>&nbsp;</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["height", "width", "graph", "flat"],
  computed: {
    darkThemeEnabled() {
      return this.$store.state.settings.darkThemeEnabled;
    }
  }
};
</script>

<style lang='scss' scoped>
.loading-card {
  border-radius: 5px;
}
.title {
  height: 25px;
}
.graph-title {
  height: 25px;
}
.graph {
  height: 250px;
}
.contacts {
  height: 400px;
}
.element {
  border-radius: 2px;
  height: 100%;
  background-color: #8e8e8e;
}

.light-animation {
  animation: lightAnimation 750ms ease-in 0s infinite alternate-reverse none;
}
.dark-animation {
  animation: darkLoading 750ms ease-in 0s infinite alternate-reverse none;
}
</style>