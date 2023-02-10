<template>
  <v-app-bar title="Collin Sinclair">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-btn @click="toggleTheme">
      <v-icon
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      ></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheNavbar",
  props: ["drawer"],
  emits: ["toggle-theme", "open-drawer", "close-drawer"],
  methods: {
    toggleTheme() {
      this.$emit("toggle-theme");
    },
    toggleDrawer() {
      if (this.drawer) {
        this.$emit("close-drawer");
      } else {
        this.$emit("open-drawer");
      }
    },
  },
};
</script>

<style scoped></style>
