<template>
  <v-container>
    <h1 class="text-h2">Activity</h1>
    <p class="text-body-1">
      On this page I detail my various activities and health/fitness metrics. A
      lot of this is experimental and for my own enjoyment, but feel free to
      look around!
    </p>
    <h2 class="text-h3">Weight</h2>
    <p class="text-body-1">
      Weight is not thought to be a sole indicator of health — and I am not
      necessarily trying to lose any — but it <em>is</em> an easily obtainable
      metric about the body. If there's anything I enjoy, it's plotting data!
    </p>
    <SingleLinePlot
      :x="weightDates"
      :y="weightValues"
      xlabel="Date"
      ylabel="Weight (lbs)"
      :refreshFlag="weightOpen"
    />
  </v-container>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "ActivityView",
  components: { SingleLinePlot },
  data() {
    return {
      weightValues: [177.7, 176.7, 176.6, 175.8, 175.7, 175.4, 177.7, 175],
      weightDates: [
        "2023-01-01",
        "2023-01-02",
        "2023-01-04",
        "2023-01-05",
        "2023-01-07",
        "2023-01-09",
        "2023-01-12",
        "2023-01-17",
      ],
      weightOpen: false,
      workoutsOpen: false,
      skiOpen: false,
    };
  },
};
</script>

<style scoped></style>
