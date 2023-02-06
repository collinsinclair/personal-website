<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import { ref } from "vue";

const theme = ref("light");

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
  <v-app :theme="theme">
    <TheNavbar @toggle-theme="toggleTheme" />
    <v-navigation-drawer></v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
