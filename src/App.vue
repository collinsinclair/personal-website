<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import { ref } from "vue";
import NavDrawer from "@/components/NavDrawer.vue";

const theme = ref("light");

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
  <v-app :theme="theme">
    <TheNavbar @toggle-theme="toggleTheme" />
    <NavDrawer />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
