<template>
  <div>
    <v-card :height="height" :width="width" v-if="graph" :class="flat ? 'elevation-0' : ''">
      <v-layout class="loading-card" justify-center row wrap py-2>
        <v-flex xs8>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'title-element']"
          >&nbsp;</div>
        </v-flex>
      </v-layout>
      <v-layout class="loading-card" justify-center row fill-height wrap>
        <v-flex xs11>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'block-element pb-3']"
          >&nbsp;</div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card :height="height" :width="width" v-else>
      <v-layout class="loading-card" align-space-around justify-start row fill-height py-3 pl-3>
        <v-flex xs4 sm2 lg1 mr-3>
          <div :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'element']">&nbsp;</div>
        </v-flex>
        <v-flex xs7 sm9 lg8>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'line-element']"
          >&nbsp;</div>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'line-element my-3 mr-3']"
          >&nbsp;</div>
          <div
            :class="[darkThemeEnabled ? 'dark-animation' : 'light-animation', 'line-element mr-5']"
          >&nbsp;</div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
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
.element {
  border-radius: 2px;
  height: 100%;
  background-color: #8e8e8e;
}

.line-element {
  border-radius: 2px;
  height: 21%;
  background-color: #8e8e8e;
}
.block-element {
  border-radius: 2px;
  height: 75%;
  background-color: #8e8e8e;
}

.title-element {
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