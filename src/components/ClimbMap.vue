<template>
  <MapboxMap
    style="height: 500px"
    :access-token="accessToken"
    :map-style="mapStyle"
    :center="rockyMountains"
    :zoom="defaultZoom"
  />
</template>

<script>
import { MapboxMap } from "@studiometa/vue-mapbox-gl";

export default {
  name: "ClimbMap",
  components: {
    MapboxMap,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiY29sbGluc2luY2xhaXIiLCJhIjoiY2w4dnl3b2U4MGlvbTNvc3Jna3I0cml4byJ9.GXhvyfjGlngMo7MpNEkMRA",
      mapStyle: "mapbox://styles/mapbox/outdoors-v12",
      rockyMountains: [-106.25, 39.75],
      defaultZoom: 8,
    };
  },
};
</script>

<style scoped>
@import "https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css";
</style>
