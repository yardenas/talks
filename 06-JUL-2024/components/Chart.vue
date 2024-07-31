<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const options = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 81],
  },
];
</script>

<template>
  <div>
    <VueApexCharts
      width="500"
      type="bar"
      :options="options"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<style scoped>
button {
  background: #26e6a4;
  border: 0;
  font-size: 16px;
  color: "#fff";
  padding: 10px;
  margin-left: 28px;
}
</style>
