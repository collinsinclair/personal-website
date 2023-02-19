<template>
  <v-container>
    <h1 class="text-h2">Ski</h1>
    <p class="text-body-1">
      This year Gabby and I purchased the Ikon Base Pass which includes
      unlimited access to Copper Mountain, Winter Park, and Eldora; with limited
      access to Steamboat Springs and Arapahoe Basin. I paid $649 for my pass
      when I bought it. In this section, I plan to track and plot out my ski
      days. I'll probably also post some good pictures or videos.
    </p>
    <div ref="resort-visits-plot"></div>
    <h2 class="text-h3">Season Summary</h2>
    <p class="text-body-1">
      This season, I have skied a total of
      <strong>{{ totalRuns }} runs</strong>, spanning
      <strong>{{ totalHorizontalDistance }} miles</strong> and
      <strong>{{ totalVertical.toLocaleString() }} vertical feet</strong>.
    </p>
    <p class="text-body-1">
      My average run is <strong>{{ averageRunDistance }} miles</strong> long and
      drops <strong>{{ averageRunVertical.toLocaleString() }} feet</strong>. I
      travel at an average speed of
      <strong>{{ averageSpeed }} miles per hour.</strong>
    </p>
    <p class="text-body-1">
      My top speed so far has been
      <strong>{{ topSpeed }} miles per hour</strong>; my tallest run has spanned
      <strong>{{ tallestRun.toLocaleString() }} vertical feet</strong>; and my
      longest run has spanned <strong>{{ longestRun }} miles</strong>. My
      highest altitude this season has been
      <strong>{{ highestAltitude.toLocaleString() }} feet</strong>.
    </p>
    <h2 class="text-h3">Cost of Ikon Pass Per Visit</h2>
    <p class="text-body-1">
      Here I'll calculate how much the Ikon pass costs per trip to determine if
      it's worth it for me. I have gone skiing {{ daysSkiing }} days this
      season, which comes out to
      <strong>${{ costPerTrip }} per trip.</strong>
    </p>
  </v-container>
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
      visits: [0, 1, 0, 1, 4],
      totalVertical: 67900,
      totalRuns: 64,
      totalHorizontalDistance: 84.8,
      averageRunVertical: 1061,
      averageRunDistance: 1.3,
      averageSpeed: 13.4,
      topSpeed: 31.8,
      tallestRun: 2472,
      highestAltitude: 12149,
      longestRun: 4,
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
