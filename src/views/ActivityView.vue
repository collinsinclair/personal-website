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
    </div>
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "ActivityView",
  components: { SingleLinePlot },
  data() {
    return {
      weightValues: [177.7, 176.7],
      weightDates: ["2023-01-01", "2023-01-02"],
      weightOpen: false,
    };
  },
};
</script>

<style scoped></style>
