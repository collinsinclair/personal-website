<template>
  <v-container>
    <h1 class="text-h2">Jupiter</h1>
    <p class="text-body-1">
      Gabrielle and I adopted Jupiter on November 17, 2022. He is a red tabby
      Maine Coon who was found on the street. He is {{ jupiterAge }} months old.
    </p>
    <h2 class="text-h3 py-3">Weight</h2>
    <SingleLinePlot
      :x="dates"
      :y="weights"
      :xlabel="axisLabels[0]"
      :ylabel="axisLabels[1]"
    />
  </v-container>
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
        8.1, 8.2, 8.3, 8.7, 9.1, 9.4, 9.8, 9.8,
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
        "2023-01-19",
        "2023-01-25",
        "2023-01-28",
        "2023-02-01",
        "2023-02-06",
        "2023-02-09",
        "2023-02-19",
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
      return Math.floor(numDays / 30);
    },
  },
};
</script>

<style scoped></style>
