<template>
  <div class="container">
    <h1 class="display-1 pt-3">Ski</h1>
    <p>
      This year Gabby and I purchased the Ikon Base Pass which includes
      unlimited access to Copper Mountain, Winter Park, and Eldora; with limited
      access to Steamboat Springs and Arapahoe Basin. I paid $649 for my pass
      when I bought it. In this section, I plan to track and plot out my ski
      days. I'll probably also post some good pictures or videos.
    </p>
    <div ref="resort-visits-plot"></div>
    <h2>Season Summary</h2>
    <p>
      This season, I have skied a total of
      <strong>{{ totalRuns }} runs</strong>, spanning
      <strong>{{ totalHorizontalDistance }} miles</strong> and
      <strong>{{ totalVertical.toLocaleString() }} vertical feet</strong>.
    </p>
    <p>
      My average run is <strong>{{ averageRunDistance }} miles</strong> long and
      drops <strong>{{ averageRunVertical.toLocaleString() }} feet</strong>. I
      travel at an average speed of
      <strong>{{ averageSpeed }} miles per hour.</strong>
    </p>
    <p>
      My top speed so far has been
      <strong>{{ topSpeed }} miles per hour</strong>; my tallest run has spanned
      <strong>{{ tallestRun.toLocaleString() }} vertical feet</strong>; and my
      longest run has spanned <strong>{{ longestRun }} miles</strong>. My
      highest altitude this season has been
      <strong>{{ highestAltitude.toLocaleString() }} feet</strong>.
    </p>
    <h2>Cost of Ikon Pass Per Visit</h2>
    <p>
      Here I'll calculate how much the Ikon pass costs per trip to determine if
      it's worth it for me. I have gone skiing {{ daysSkiing }} days this
      season, which comes out to
      <strong>${{ costPerTrip }} per trip.</strong>
    </p>
  </div>
</template>

<script>
import * as Plotly from "plotly.js-dist";

export default {
  name: "SkiPage",
  data() {
    return {
      resorts: [
        "Arapahoe Basin",
        "Copper",
        "Eldora",
        "Steamboat",
        "Winter Park",
      ],
      visits: [0, 1, 0, 0, 1],
      totalVertical: 12500,
      totalRuns: 16,
      totalHorizontalDistance: 18.2,
      averageRunVertical: 781,
      averageRunDistance: 1.1,
      averageSpeed: 13,
      topSpeed: 26,
      tallestRun: 1758,
      highestAltitude: 12149,
      longestRun: 2.8,
    };
  },
  props: ["refreshFlag"],
  methods: {
    drawBarChart() {
      const data = [{ x: this.resorts, y: this.visits, type: "bar" }];
      Plotly.newPlot(
        this.$refs["resort-visits-plot"],
        data,
        {},
        { responsive: true }
      );
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
