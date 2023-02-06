<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>

<template>
  <v-app :theme="theme">
    <TheNavbar />
    <v-navigation-drawer></v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
