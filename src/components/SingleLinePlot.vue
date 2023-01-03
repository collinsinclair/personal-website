<template>
  <div ref="plot"></div>
</template>

<script>
import * as Plotly from "plotly.js-dist";

export default {
  name: "SingleLinePlot",
  props: ["x", "y", "xlabel", "ylabel", "title", "refreshFlag"],
  methods: {
    drawPlot() {
      const trace = [
        {
          x: this.x,
          y: this.y,
          line: { shape: "spline" },
        },
      ];
      const layout = {
        title: this.title,
        xaxis: {
          title: this.xlabel,
        },
        yaxis: {
          title: this.ylabel,
        },
      };
      Plotly.newPlot(this.$refs.plot, trace, layout);
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
