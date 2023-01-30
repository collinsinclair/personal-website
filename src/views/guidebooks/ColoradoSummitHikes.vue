<template>
  <div class="container">
    <h1 class="display-1 pt-3">Colorado Summit Climbs</h1>
    <h2>Dave Muller</h2>
    <hr />
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Summit Elevation</th>
            <th scope="col">RT Distance (mi)</th>
            <th scope="col">Gain (ft)</th>
            <th scope="col">Starting Elevation</th>
            <th scope="col">ETE</th>
            <th scope="col">Season</th>
            <th scope="col">Nearest Landmark</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="hike in hikes" :key="hike.name">
            <th scope="col">{{ hike.name }}</th>
            <td class="text-center">
              <i
                :class="hike.difficultyCSS.className"
                :style="{ color: hike.difficultyCSS.color }"
              />
            </td>
            <td class="text-center">{{ hike.elevation.toLocaleString() }}</td>
            <td class="text-center">{{ hike.distance.toLocaleString() }}</td>
            <td class="text-center">{{ hike.gain.toLocaleString() }}</td>
            <td class="text-center">
              {{ hike["startElev"].toLocaleString() }}
            </td>
            <td class="text-center">
              {{ getETEInHours(hike["upTime"] + hike["downTime"]) }}
            </td>
            <td class="text-center">
              {{ getMonthName(hike["season"][0]) }} thru
              {{ getMonthName(hike["season"].at(-1)) }}
            </td>
            <td class="text-center">{{ hike["nearestLandmark"] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import data from "./coloradoSummitHikes.json";

export default {
  name: "ColoradoSummitHikes",
  data() {
    return {
      hikes: data.hikes,
    };
  },
  methods: {
    getETEInHours(ETEInMinutes) {
      return (ETEInMinutes / 60).toFixed(1).toLocaleString();
    },
    getMonthName(monthNumber) {
      switch (monthNumber) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sep";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
      }
    },
    getDifficultyCSS(difficulty) {
      const difficultyCSS = {
        className: "bi",
        color: "",
      };
      switch (difficulty) {
        case 0:
          difficultyCSS.className += " bi-circle-fill";
          difficultyCSS.color = "green";
          break;
        case 1:
          difficultyCSS.className += " bi-square-fill";
          difficultyCSS.color = "blue";
          break;
        case 2:
          difficultyCSS.className += " bi-diamond-fill";
          difficultyCSS.color = "black";
          break;
        case 3:
          difficultyCSS.className += " bi-exclamation-diamond-fill";
          difficultyCSS.color = "black";
      }
      return difficultyCSS;
    },
  },
  mounted() {
    this.hikes = this.hikes.map((hike) => {
      hike.difficultyCSS = this.getDifficultyCSS(hike.difficulty);
      return hike;
    });
  },
};
</script>

<style scoped></style>
