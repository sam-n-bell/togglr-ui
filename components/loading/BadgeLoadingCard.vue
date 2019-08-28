<template>
  <v-card :height="height" :width="width" v-if="graph" :class="flat ? 'elevation-0' : ''">
    <v-container>
      <v-layout class="loading-card" row wrap>
        <v-flex xs4 pb-4>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1></v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1></v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1></v-flex>
      </v-layout>
    </v-container>
  </v-card>
  <v-card :height="height" :width="width" v-else>
    <v-container>
      <v-layout class="loading-card" row wrap>
        <v-flex xs4 pb-4>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1></v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1 pr-1></v-flex>
        <v-flex xs3 mb-1></v-flex>

        <v-flex xs4 pb-4 mt-5>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1 pr-1>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs3 mb-1></v-flex>
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
.title-element {
  border-radius: 2px;
  height: 100%;
  background-color: #8e8e8e;
}
.element {
  border-radius: 2px;
  height: 40px;
  background-color: #8e8e8e;
}

.light-animation {
  animation: lightAnimation 750ms ease-in 0s infinite alternate-reverse none;
}
.dark-animation {
  animation: darkLoading 750ms ease-in 0s infinite alternate-reverse none;
}
</style>