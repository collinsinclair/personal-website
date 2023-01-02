<template>
  <div class="container">
    <h1 class="display-1 pt-3">Jupiter</h1>
    <p class="lead">
      Gabrielle and I adopted Jupiter on November 17, 2022. He is a red tabby
      (likely with some Maine Coon in him) who was found on the street.
    </p>
    <hr />
    <h2 class="card-title">Weight</h2>
    <SingleLinePlot
      :x="dates"
      :y="weights"
      :xlabel="axisLabels[0]"
      :ylabel="axisLabels[1]"
    />
    <hr />
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "JupiterView",
  components: { SingleLinePlot },
  data() {
    return {
      weights: [4.7, 4.5, 5, 4.6, 5.1, 5.4, 6.7, 6.9, 7, 7.2],
      dates: [
        "2022-11-29",
        "2022-11-30",
        "2022-12-02",
        "2022-12-03",
        "2022-12-06",
        "2022-12-09",
        "2022-12-28",
        "2022-12-29",
        "2022-12-31",
        "2023-01-02",
      ],
      axisLabels: ["Date", "Weight (lbs)"],
    };
  },
};
</script>

<style scoped></style>
