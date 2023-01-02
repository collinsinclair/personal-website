<script></script>

<template>
  <main>
    <div class="container">
      <h1 class="display-1 pt-3">Welcome!</h1>
      <p class="lead">
        This is my personal website. I use it mostly to try new things and keep
        track of various stats, like my activity or the weight of my kitten,
        Jupiter.
      </p>
    </div>
  </main>
</template>

<style>
main {
  height: 100vh;
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
