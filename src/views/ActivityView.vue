<template>
  <div class="container">
    <h1 class="display-1 pt-3">Activity</h1>
    <p class="lead">
      On this page I detail my various activities and health/fitness metrics. A
      lot of this is experimental and for my own enjoyment, but feel free to
      look around!
    </p>
    <div class="accordion accordion-flush" id="activityAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="weightHeading">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#weightCollapse"
            @click="weightOpen = !weightOpen"
          >
            Weight
          </button>
        </h2>
        <div
          id="weightCollapse"
          class="accordion-collapse collapse"
          data-bs-parent="#activityAccordion"
        >
          <div class="accordion-body">
            <p>
              Weight is not thought to be a sole indicator of health — and I am
              not necessarily trying to lose any — but it <em>is</em> an easily
              obtainable metric about the body. If there's anything I enjoy,
              it's plotting data!
            </p>
            <SingleLinePlot
              :x="weightDates"
              :y="weightValues"
              xlabel="Date"
              ylabel="Weight (lbs)"
              :refreshFlag="weightOpen"
            />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="skiHeading">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#skiCollapse"
            @click="skiOpen = !skiOpen"
          >
            Skiing
          </button>
        </h2>
        <div
          id="skiCollapse"
          class="accordion-collapse collapse"
          data-bs-parent="#activityAccordion"
        >
          <div class="accordion-body">
            <SkiChart :refresh-flag="skiOpen" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";
import SkiChart from "@/components/SkiChart.vue";

export default {
  name: "ActivityView",
  components: { SkiChart, SingleLinePlot },
  data() {
    return {
      weightValues: [177.7, 176.7, 176.6, 175.8, 175.7, 175.4, 177.7, 175],
      weightDates: [
        "2023-01-01",
        "2023-01-02",
        "2023-01-04",
        "2023-01-05",
        "2023-01-07",
        "2023-01-09",
        "2023-01-12",
        "2023-01-17",
      ],
      weightOpen: false,
      workoutsOpen: false,
      skiOpen: false,
    };
  },
};
</script>

<style scoped></style>
