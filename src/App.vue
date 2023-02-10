<template>
  <v-app :theme="theme">
    <TheNavbar
      @toggle-theme="toggleTheme"
      @open-drawer="
        () => {
          this.drawer = true;
        }
      "
      @close-drawer="
        () => {
          this.drawer = false;
        }
      "
      :drawer="drawer"
    />
    <NavDrawer :drawer="drawer" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import NavDrawer from "@/components/NavDrawer.vue";

export default {
  data() {
    return {
      theme: "light",
      drawer: false,
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
  components: {
    TheNavbar,
    NavDrawer,
  },
};
</script>

<style scoped></style>
