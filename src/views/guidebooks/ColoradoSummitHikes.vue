<template>
  <v-container>
    <h1 class="display-1 pt-3">Colorado Summit Climbs</h1>
    <h2>Dave Muller</h2>
    <ClimbMap :hikes="hikes" />
    <v-data-table
      :items="hikes"
      :headers="headers"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:item.difficulty="{ item }">
        <v-icon
          :icon="item.value.difficultyCSS.icon"
          :style="{ color: item.value.difficultyCSS.color }"
        ></v-icon>
      </template>
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
  </v-container>
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
      itemsPerPage: 10,
    };
  },
  methods: {
    getETEInHours(ETEInMinutes) {
      return (ETEInMinutes / 60).toFixed(1).toLocaleString();
    },
    getDifficultyCSS(difficulty) {
      const difficultyCSS = {
        icon: "mdi-",
        color: "",
      };
      switch (difficulty) {
        case 0:
          difficultyCSS.icon += "circle";
          difficultyCSS.color = "green";
          break;
        case 1:
          difficultyCSS.icon += "square-rounded";
          difficultyCSS.color = "blue";
          break;
        case 2:
          difficultyCSS.icon += "rhombus";
          difficultyCSS.color = "black";
          break;
        case 3:
          difficultyCSS.icon += "skull";
          difficultyCSS.color = "red";
      }
      return difficultyCSS;
    },
    parseLatLng(lat, lng) {
      const coords = [lng, lat];
      const newCoords = [];
      coords.forEach((coord) => {
        if (typeof coord !== "string") {
          throw new Error(`Invalid input: ${coord} is not a string`);
        }
        const match = coord.match(/(-?\d+)d(\d+)m(\d+\.?\d*)s/);
        if (match) {
          const [, degrees, minutes, seconds] = match.map(Number);
          let decimal = degrees + minutes / 60 + seconds / 3600;
          if (decimal > 50) {
            decimal *= -1;
          }
          newCoords.push(decimal);
        } else if (!isNaN(Number(coord))) {
          if (coord > 50) {
            coord *= -1;
          }
          newCoords.push(Number(coord));
        } else {
          throw new Error(
            `Invalid input: ${coord} is not a valid coordinate string`
          );
        }
      });
      return newCoords;
    },
  },
  created() {
    this.hikes = this.hikes.map((hike) => {
      hike.difficultyCSS = this.getDifficultyCSS(hike["difficulty"]);
      hike.ETE = this.getETEInHours(hike["upTime"] + hike["downTime"]);
      hike.summitCoords = this.parseLatLng(hike.lat, hike.long);
      return hike;
    });
    this.itemsPerPage = this.hikes.length;
  },
};
</script>

<style scoped></style>
