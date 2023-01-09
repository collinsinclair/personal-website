<template>
  <div class="container">
    <h1 class="display-1 pt-3">Colorado Snow Climbs</h1>
    <h2>Dave Cooper</h2>
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
            <th scope="col">Best Months</th>
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
  </div>
</template>

<script>
import climbs from "./coloradoSnowClimbs.json";

export default {
  name: "ColoradoSnowClimbs",
  data() {
    return {
      climbs: climbs.climbs,
      sortParam: null,
      sortAscending: false,
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
  },
  watch: {
    sortParam() {
      console.log(this.sortParam);
    },
  },
  computed: {
    sortedClimbs() {
      if (this.sortParam === null) {
        return this.climbs;
      }
      const climbCopy = [...this.climbs];
      return climbCopy.sort((a, b) => {
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
};
</script>

<style scoped>
i:hover {
  background-color: lightgray;
  border-radius: 5px;
}
</style>
