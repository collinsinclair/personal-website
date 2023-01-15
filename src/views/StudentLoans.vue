<template>
  <div class="container">
    <h1 class="display-1 pt-3">Student Loans</h1>
    <single-line-plot
      :x="dates"
      :y="cumSumPayments"
      xlabel="Date"
      ylabel="Total Amount Paid Back"
    />
  </div>
</template>

<script>
import SingleLinePlot from "@/components/SingleLinePlot.vue";

export default {
  name: "StudentLoans",
  components: { SingleLinePlot },
  data() {
    return {
      payments: [4334.49, 4237.96, 2300, 1405.99, 1000, 3084.83, 5731],
      dates: [
        new Date(2022, 6, 31),
        new Date(2022, 8, 2),
        new Date(2022, 9, 4),
        new Date(2022, 9, 24),
        new Date(2022, 10, 4),
        new Date(2022, 11, 5),
        new Date(2023, 0, 13),
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
