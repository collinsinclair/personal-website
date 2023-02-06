<template>
  <div class="container">
    <h1 class="display-1 pt-3">Colorado Summit Climbs</h1>
    <h2>Dave Muller</h2>
    <hr />
    <ClimbMap />
    <v-data-table :items="hikes" :headers="headers">
      <template v-slot:item.elevation="{ item }">
        {{ item.value.elevation.toLocaleString() }}
      </template>
      <template v-slot:item.distance="{ item }">
        {{ item.value.distance.toLocaleString() }}
      </template>
      <template v-slot:item.gain="{ item }">
        {{ item.value.gain.toLocaleString() }}
      </template>
      <template v-slot:item.startElev="{ item }">
        {{ item.value.startElev.toLocaleString() }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import data from "./coloradoSummitHikes.json";
import ClimbMap from "@/components/ClimbMap.vue";

export default {
  name: "ColoradoSummitHikes",
  components: { ClimbMap },
  data() {
    return {
      hikes: data.hikes,
      headers: [
        { title: "Name", key: "name" },
        { title: "Difficulty", key: "difficulty" },
        { title: "Summit Elevation", key: "elevation" },
        { title: "Distance (mi)", key: "distance" },
        { title: "Elevation Gain (ft)", key: "gain" },
        { title: "Start Elevation", key: "startElev" },
        { title: "ETE (hr)", key: "ETE" },
        { title: "Nearest Landmark", key: "nearestLandmark" },
      ],
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
  created() {
    this.hikes = this.hikes.map((hike) => {
      hike.difficultyCSS = this.getDifficultyCSS(hike.difficulty);
      hike.ETE = this.getETEInHours(hike.upTime + hike.downTime);
      return hike;
    });
  },
};
</script>

<style scoped></style>
