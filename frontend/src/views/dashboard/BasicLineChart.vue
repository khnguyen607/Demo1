<template>
  <b-card v-if="data" no-body class="card-revenue-budget p-2">
    <h4 class="card-title mb-100">{{ title }}</h4>
    <vue-apex-charts
      ref="chart"
      id="revenue-report-chart"
      type="line"
      width="100%"
      :options="chartOptions"
      height="230"
    />
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

export default {
  components: {
    VueApexCharts,
    BCard,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "line",
          toolbar: { show: false },
        },
        grid: {
          padding: {
            top: -20,
            bottom: -10,
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#6E6B7B",
              fontSize: "0.86rem",
              fontFamily: "Montserrat",
            },
          },
        },
        colors: [$themeColors.info],
      },
    };
  },
  mounted() {
    this.updateChartData(this.data.categories, this.data.series);
  },
  methods: {
    updateChartData(categories, series) {
      this.$refs.chart.updateOptions({
        xaxis: {
          categories: categories,
        },
        series: series,
      });
    },
  },
};
</script>
