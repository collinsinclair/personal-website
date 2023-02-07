<template>
  <v-navigation-drawer>
    <v-list nav density="compact">
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        @click="goToRoute(route)"
      >
        <v-list-item-title>
          <v-icon v-if="route.icon" :icon="route.icon"></v-icon>
          {{ route.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  data() {
    return {
      routes: [
        {
          path: "/",
          name: "Home",
          icon: "mdi-home",
        },
        {
          path: "/about",
          name: "About",
          icon: "mdi-account",
        },
        {
          path: "/jupiter",
          name: "Jupiter",
          icon: "mdi-cat",
        },
        {
          path: "/activity",
          name: "Activity",
          icon: "mdi-chart-line",
        },
        {
          path: "/guidebooks/colorado-snow-climbs",
          name: "Colorado Snow Climbs",
          icon: "mdi-snowflake",
        },
        {
          path: "/student-loans",
          name: "Student Loans",
          icon: "mdi-school",
        },
        {
          path: "/ski",
          name: "Ski",
          icon: "mdi-ski",
        },
        {
          path: "/guidebooks/colorado-summit-hikes",
          name: "Colorado Summit Hikes",
          icon: "mdi-hiking",
        },
      ],
    };
  },
  methods: {
    goToRoute(route) {
      this.$router.push({ path: route.path });
    },
  },
};
</script>

<style scoped></style>
