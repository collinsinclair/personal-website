<template>
  <v-app-bar title="Collin Sinclair">
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
  emits: ["toggle-theme"],
  methods: {
    toggleTheme() {
      this.$emit("toggle-theme");
    },
  },
};
</script>

<style scoped></style>
