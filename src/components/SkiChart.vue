<template>
  <p>
    This year Gabby and I purchased the Ikon Base Pass which includes unlimited
    access to Copper Mountain, Winter Park, and Eldora; with limited access to
    Steamboat Springs and Arapahoe Basin. I paid $649 for my pass when I bought
    it. In this section, I plan to track and plot out my ski days. I'll probably
    also post some good pictures or videos.
  </p>
  <div ref="plot"></div>
  <h3>Cost of Ikon Pass Per Visit</h3>
  <p>
    Here I'll calculate how much the Ikon pass costs per trip to determine if
    it's worth it for me. I have gone skiing {{ daysSkiing }} days this season,
    which comes out to
    <strong>${{ costPerTrip }} per trip.</strong>
  </p>
</template>

<script>
import * as Plotly from "plotly.js-dist";

export default {
  name: "SkiChart",
  data() {
    return {
      resorts: [
        "Arapahoe Basin",
        "Copper",
        "Eldora",
        "Steamboat",
        "Winter Park",
      ],
      visits: [0, 0, 0, 0, 0],
    };
  },
  props: ["refreshFlag"],
  methods: {
    drawBarChart() {
      const data = [{ x: this.resorts, y: this.visits, type: "bar" }];
      Plotly.newPlot(this.$refs.plot, data);
    },
  },
  mounted() {
    this.drawBarChart();
  },
  watch: {
    refreshFlag() {
      this.drawBarChart();
    },
  },
  computed: {
    daysSkiing() {
      return this.visits.reduce((a, b) => a + b);
    },
    costPerTrip() {
      if (this.daysSkiing === 0) {
        return 649;
      } else {
        return Math.round(649 / this.daysSkiing);
      }
    },
  },
};
</script>

<style scoped></style>
