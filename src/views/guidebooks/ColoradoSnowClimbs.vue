<template>
  <div class="container">
    <h1 class="display-1 pt-3">Colorado Snow Climbs</h1>
    <h2>Dave Cooper</h2>
    <hr />
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">
              Name
              <i :class="getSortIcon('name')" @click="setSortParam('name')" />
            </th>
            <th scope="col">
              Difficulty
              <i
                :class="getSortIcon('difficulty')"
                @click="setSortParam('difficulty')"
              />
            </th>
            <th scope="col">
              Gain (ft)
              <i :class="getSortIcon('gain')" @click="setSortParam('gain')" />
            </th>
            <th scope="col">
              Distance (mi)
              <i
                :class="getSortIcon('distance')"
                @click="setSortParam('distance')"
              />
            </th>
            <th scope="col">
              Start Elevation
              <i
                :class="getSortIcon('startElev')"
                @click="setSortParam('startElev')"
              />
            </th>
            <th scope="col">
              Highest Elevation
              <i
                :class="getSortIcon('highestElev')"
                @click="setSortParam('highestElev')"
              />
            </th>
            <th scope="col">
              Best Months
              <button
                type="button"
                :class="[
                  'btn',
                  'ms-1',
                  currentMonthOnly ? 'btn-danger' : 'btn-light',
                ]"
                style="
                  --bs-btn-padding-y: 0;
                  --bs-btn-padding-x: 0.5rem;
                  --bs-btn-font-size: 0.75rem;
                "
                @click="() => (currentMonthOnly = !currentMonthOnly)"
              >
                {{ currentMonthOnly ? "Show All" : getThisMonth + " Only" }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="climb in sortedClimbs" :key="climb.name">
            <th scope="col">{{ climb.name }}</th>
            <td class="text-center">
              <i
                :class="getDifficultyIcon(climb.difficulty)"
                :style="{ color: getDifficultyColor(climb.difficulty) }"
              />
            </td>
            <td class="text-center">{{ climb.gain.toLocaleString() }}</td>
            <td class="text-center">{{ climb.distance.toLocaleString() }}</td>
            <td class="text-center">
              {{ climb.startElev.toLocaleString() }}
            </td>
            <td class="text-center">
              {{ climb.highestElev.toLocaleString() }}
            </td>
            <td>{{ getBestMonthString(climb.bestMonths) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <h3>Statistics</h3>
    <div ref="gain-histogram"></div>
    <div ref="distance-histogram"></div>
    <div ref="start-elevation-histogram"></div>
    <div ref="end-elevation-histogram"></div>
  </div>
</template>

<script>
import climbs from "./coloradoSnowClimbs.json";
import * as Plotly from "plotly.js-dist";

export default {
  name: "ColoradoSnowClimbs",
  data() {
    return {
      climbs: climbs.climbs,
      sortParam: null,
      sortAscending: false,
      currentMonthOnly: false,
    };
  },
  methods: {
    setSortParam(name) {
      if (name === this.sortParam) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = false;
        this.sortParam = name;
      }
    },
    getDifficultyIcon(difficulty) {
      switch (difficulty) {
        case "easy":
          return "bi bi-circle-fill";
        case "moderate":
          return "bi bi-square-fill";
        case "strenuous":
          return "bi bi-diamond-fill";
      }
    },
    getDifficultyColor(difficulty) {
      switch (difficulty) {
        case "easy":
          return "green";
        case "moderate":
          return "blue";
        case "strenuous":
          return "black";
      }
    },
    getBestMonthString(bestMonths) {
      const startMonth = bestMonths[0];
      const endMonth = bestMonths.at(-1);
      return `${this.numberToMonthString(
        startMonth
      )} through ${this.numberToMonthString(endMonth)}`;
    },
    numberToMonthString(num) {
      switch (num) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
      }
    },
    getSortIcon(a) {
      if (a === this.sortParam) {
        if (this.sortAscending) {
          return "bi-caret-up-square";
        } else {
          return "bi-caret-down-square";
        }
      } else {
        return "bi bi-dash";
      }
    },
    drawHistrogram(_ref, _data, xlabel) {
      const trace = {
        x: _data,
        type: "histogram",
      };
      const layout = {
        bargap: 0.05,
        // bargroupgap: 0.2,
        // title: "Sampled Results",
        xaxis: { title: xlabel },
        // yaxis: { title: "Count" },
      };
      Plotly.newPlot(_ref, [trace], layout);
    },
    drawHistograms() {
      const gainData = this.sortedClimbs.map((climb) => climb.gain);
      this.drawHistrogram(this.$refs["gain-histogram"], gainData, "Gain (ft)");

      const distanceData = this.sortedClimbs.map((climb) => climb.distance);
      this.drawHistrogram(
        this.$refs["distance-histogram"],
        distanceData,
        "Distance (mi)"
      );

      const startElevationData = this.sortedClimbs.map(
        (climb) => climb.startElev
      );
      this.drawHistrogram(
        this.$refs["start-elevation-histogram"],
        startElevationData,
        "Start Elevation (ft)"
      );

      const endElevationData = this.sortedClimbs.map(
        (climb) => climb.highestElev
      );
      this.drawHistrogram(
        this.$refs["end-elevation-histogram"],
        endElevationData,
        "End Elevation (ft)"
      );
    },
  },
  watch: {
    sortParam() {
      console.log(this.sortParam);
    },
  },
  computed: {
    getThisMonth() {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const d = new Date();
      return monthNames[d.getMonth()];
    },
    filteredClimbs() {
      if (this.currentMonthOnly) {
        console.log("filtered called!");
        const d = new Date();
        const monthNum = d.getMonth() + 1;
        return this.climbs.filter((climb) => {
          if (climb.bestMonths.includes(monthNum)) {
            return climb;
          }
        });
      } else {
        return this.climbs;
      }
    },
    sortedClimbs() {
      if (this.sortParam === null) {
        return this.filteredClimbs;
      }
      const _sortedClimbs = [...this.filteredClimbs];
      return _sortedClimbs.sort((a, b) => {
        let comparison;
        if (typeof a[this.sortParam] === "number") {
          comparison = a[this.sortParam] - b[this.sortParam];
        } else {
          comparison = a[this.sortParam].localeCompare(b[this.sortParam]);
        }
        return this.sortAscending ? comparison : -comparison;
      });
    },
  },
  mounted() {
    this.drawHistograms();
  },
};
</script>

<style scoped>
th i:hover {
  background-color: lightgray;
  border-radius: 5px;
}
</style>
