<template>
  <div class="container">
    <h1 class="display-1 pt-3">Jupiter</h1>
    <p class="lead">
      Gabrielle and I adopted Jupiter on November 17, 2022. He is a red tabby —
      his namesake — (likely with some Maine Coon in him) who was found on the
      street. He is {{ jupiterAge }} months old.
    </p>
    <hr />
    <h2 class="card-title">Weight</h2>
    <SingleLinePlot
      :x="dates"
      :y="weights"
      :xlabel="axisLabels[0]"
      :ylabel="axisLabels[1]"
    />
    <hr />
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "JupiterView",
  components: { SingleLinePlot },
  data() {
    return {
      weights: [
        4.7, 4.5, 5, 4.6, 5.1, 5.4, 6.7, 6.9, 7, 7.2, 7.6, 7.6, 7.4, 7.8, 7.9,
        8.1,
      ],
      dates: [
        "2022-11-29",
        "2022-11-30",
        "2022-12-02",
        "2022-12-03",
        "2022-12-06",
        "2022-12-09",
        "2022-12-28",
        "2022-12-29",
        "2022-12-31",
        "2023-01-02",
        "2023-01-05",
        "2023-01-07",
        "2023-01-08",
        "2023-01-09",
        "2023-01-11",
        "2023-01-16",
      ],
      axisLabels: ["Date", "Weight (lbs)"],
      birthday: new Date("2022-08-08"),
    };
  },
  computed: {
    jupiterAge() {
      const today = new Date();

      function treatAsUTC(date) {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
      }

      function daysBetween(startDate, endDate) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (
          (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay
        );
      }

      const numDays = daysBetween(this.birthday, today);
      return Math.round(numDays / 30);
    },
  },
};
</script>

<style scoped></style>
