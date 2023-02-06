<template>
  <MapboxMap
    style="height: 75vh"
    :access-token="accessToken"
    :map-style="mapStyle"
    :center="mapCenter"
    :zoom="defaultZoom"
  >
    <MapboxMarker
      v-for="hike in hikes"
      :key="hike.name"
      :lng-lat="hike.summitCoords"
    >
      <v-icon
        :icon="hike.difficultyCSS.icon"
        :style="{ color: hike.difficultyCSS.color }"
      ></v-icon>
      <template v-slot:popup>
        <p>
          <strong>{{ hike.name }}</strong> ({{
            hike.elevation.toLocaleString()
          }}
          ft)
        </p>
        <p>Distance: {{ hike.distance }} mi</p>
        <p>Gain: {{ hike.gain.toLocaleString() }} ft</p>
      </template>
    </MapboxMarker>
    <MapboxMarker v-if="userLat && userLng" :lng-lat="[userLng, userLat]">
      <v-icon icon="mdi-map-marker" style="color:#3877ff">

      </v-icon>
    </MapboxMarker>
  </MapboxMap>
</template>

<script>
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";

export default {
  name: "ClimbMap",
  props: ["hikes"],
  components: {
    MapboxMap,
    MapboxMarker,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiY29sbGluc2luY2xhaXIiLCJhIjoiY2w4dnl3b2U4MGlvbTNvc3Jna3I0cml4byJ9.GXhvyfjGlngMo7MpNEkMRA",
      mapStyle: "mapbox://styles/mapbox/outdoors-v12",
      mapCenter: [-105.5, 39.63],
      defaultZoom: 7,
      userLat: null,
      userLng: null,
    };
  },
  created() {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.userLat = latitude;
      this.userLng = longitude;
      this.mapCenter = [longitude, latitude];
    };

    const error = (err) => {
      console.log(err);
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
  },
};
</script>

<style scoped>
@import "https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css";
</style>
