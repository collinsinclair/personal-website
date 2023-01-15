import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/jupiter",
      name: "jupiter",
      component: () => import("../views/JupiterView.vue"),
    },
    {
      path: "/activity",
      name: "activity",
      component: () => import("../views/ActivityView.vue"),
    },
    {
      path: "/guidebooks/colorado-snow-climbs",
      name: "colorado-snow-climbs",
      component: () => import("../views/guidebooks/ColoradoSnowClimbs.vue"),
    },
    {
      path: "/student-loans",
      name: "student-loans",
      component: () => import("../views/StudentLoans.vue"),
    },
  ],
});

export default router;
