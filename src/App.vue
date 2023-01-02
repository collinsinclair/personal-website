<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
</script>

<template>
  <TheNavbar />
</template>

<style scoped>
* {
  background-image: linear-gradient(
      180deg,
      rgba(var(--bs-body-bg-rgb), 0.01),
      rgba(var(--bs-body-bg-rgb), 1) 85%
    ),
    radial-gradient(
      ellipse at top left,
      rgba(var(--bs-primary-rgb), 0.5),
      transparent 50%
    ),
    radial-gradient(
      ellipse at top right,
      rgba(255, 228, 132, 0.5),
      transparent 50%
    ),
    radial-gradient(
      ellipse at center right,
      rgba(112.520718, 44.062154, 249.437846, 0.5),
      transparent 50%
    ),
    radial-gradient(
      ellipse at center left,
      rgba(214, 51, 132, 0.5),
      transparent 50%
    );
}
</style>
