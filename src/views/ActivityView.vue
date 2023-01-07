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
        <h2 class="accordion-header" id="workoutsHeading">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#workoutsCollapse"
            @click="workoutsOpen = !workoutsOpen"
          >
            Workouts
          </button>
        </h2>
        <div
          id="workoutsCollapse"
          class="accordion-collapse collapse"
          data-bs-parent="#activityAccordion"
        >
          <div class="accordion-body">
            <p>
              I've always been partial to cardio workouts — the reason I work
              out is to keep my heart healthy. I don't care much about the looks
              or physical strength (insofar as I haven't been let down by it
              yet). My preferred workouts these days are those that prepare my
              body for hiking/mountain climbing: incline walks and the stair
              stepper.
            </p>
            <p>
              Going into the new year, I have a hypothesis that if I
              consistently do 30-minute incline walks and stair stepper workouts
              (with same incline/speed/intensity for each workout) then I will
              see amount of calories burned during the workout decrease as my
              body gets more efficient. I am plotting the results below.
            </p>
            <WorkoutsPlot :refresh-flag="workoutsOpen" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";
import WorkoutsPlot from "@/components/WorkoutsPlot.vue";

export default {
  name: "ActivityView",
  components: { WorkoutsPlot, SingleLinePlot },
  data() {
    return {
      weightValues: [177.7, 176.7, 176.6, 175.8, 175.7],
      weightDates: [
        "2023-01-01",
        "2023-01-02",
        "2023-01-04",
        "2023-01-05",
        "2023-01-07",
      ],
      weightOpen: false,
      workoutsOpen: false,
    };
  },
};
</script>

<style scoped></style>
