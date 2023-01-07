<template>
  <div ref="plot"></div>
</template>

<script>
import * as Plotly from "plotly.js-dist";

export default {
  name: "WorkoutsPlot",
  props: ["refreshFlag"],
  data() {
    return {
      inclineWalkDates: ["2023-01-01", "2023-01-04"],
      inclineWalkActiveCalories: [442, 440],
      stairStepperDates: ["2023-01-02", "2023-01-05"],
      stairStepperActiveCalories: [484, 464],
    };
  },
  methods: {
    drawPlot() {
      const inclineWalkTrace = {
        name: "Incline Walk",
        x: this.inclineWalkDates,
        y: this.inclineWalkActiveCalories,
        line: { shape: "spline" },
      };
      const stairStepperTrace = {
        name: "Stair Stepper",
        x: this.stairStepperDates,
        y: this.stairStepperActiveCalories,
        line: { shape: "spline" },
      };
      const data = [inclineWalkTrace, stairStepperTrace];
      const layout = {
        xaxis: {
          title: "Date",
        },
        yaxis: {
          title: "Active Calories",
        },
      };
      Plotly.newPlot(this.$refs.plot, data, layout);
    },
  },
  mounted() {
    this.drawPlot();
  },
  watch: {
    refreshFlag() {
      this.drawPlot();
    },
  },
};
</script>

<style scoped></style>
