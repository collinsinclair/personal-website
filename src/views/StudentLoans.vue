<template>
  <v-container>
    <h1 class="display-1 pt-3">Student Loans</h1>
    <single-line-plot
      :x="dates"
      :y="cumSumPayments"
      xlabel="Date"
      ylabel="Total Amount Paid Back"
    />
  </v-container>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "StudentLoans",
  components: { SingleLinePlot },
  data() {
    return {
      payments: [
        4334.49, 4237.96, 2300, 1405.99, 1000, 3084.83, 5731, 18.39, 5000,
      ],
      dates: [
        new Date(2022, 6, 31),
        new Date(2022, 8, 2),
        new Date(2022, 9, 4),
        new Date(2022, 9, 24),
        new Date(2022, 10, 4),
        new Date(2022, 11, 5),
        new Date(2023, 0, 13),
        new Date(2023, 0, 20),
        new Date(2023, 1, 22),
      ],
    };
  },
  computed: {
    cumSumPayments() {
      let cumSum = 0;
      return this.payments.map((payment) => {
        cumSum += payment;
        return cumSum;
      });
    },
  },
};
</script>

<style scoped></style>
