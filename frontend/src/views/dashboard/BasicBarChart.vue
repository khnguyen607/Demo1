<template>
  <b-card no-body class="card-revenue-budget p-2">
    <h4 class="card-title mb-100">{{ title }}</h4>
    <vue-apex-charts
      ref="chart"
      id="revenue-report-chart"
      type="bar"
      width="100%"
      :options="options"
      height="230"
    />
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

export default {
  components: {
    VueApexCharts,
    BDropdown,
    BDropdownItem,
    BCard,
    BButton,
    BRow,
    BCol,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: "#6E6B7B",
              fontSize: "0.86rem",
              fontFamily: "Montserrat",
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        chart: {
          // stacked: true,
          type: "bar",
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toLocaleString("vi-VN"); // Định dạng theo chuẩn tiếng Việt
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        colors: [$themeColors.info, $themeColors.warning],
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
