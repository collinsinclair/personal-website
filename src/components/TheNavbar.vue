<template>
  <v-app-bar title="Collin Sinclair">
    <router-link to="/guidebooks/colorado-summit-hikes"
      >Colorado Summit Hikes
    </router-link>
    <v-btn @click="toggleTheme">
      <v-icon
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      ></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TheNavbar",
};

const theme = ref("light");

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style scoped></style>
