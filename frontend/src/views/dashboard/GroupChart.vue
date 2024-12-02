<template>
  <b-card v-if="data" no-body class="card-revenue-budget p-2">
    <h4 class="card-title mb-100">Tổng doanh số theo nhóm</h4>
    <vue-apex-charts
      id="revenue-report-chart"
      type="bar"
      width="100%"
      :options="revenueReport.chartOptions"
      :series="data.revenueReport.series"
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
import Ripple from "vue-ripple-directive";

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
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      revenue_report: {},
      revenueReport: {
        chartOptions: {
          chart: {
            stacked: true,
            type: "bar",
            toolbar: { show: false },
          },
          grid: {
            padding: {
              top: -20,
              bottom: -10,
            },
            yaxis: {
              lines: { show: false },
            },
          },
          xaxis: {
            categories: ["Đặng Sơn", "Ngọc Sơn", "Nga", "Chiến", "Hải", "Leader1", "Leader2", "Leader3", "Leader4"],
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
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.primary, $themeColors.warning],
          plotOptions: {
            bar: {
              columnWidth: "17%",
              endingShape: "rounded",
            },
            distributed: true,
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
        },
      },
      // budget chart
      budgetChart: {
        options: {
          chart: {
            height: 80,
            toolbar: { show: false },
            zoom: { enabled: false },
            type: "line",
            sparkline: { enabled: true },
          },
          stroke: {
            curve: "smooth",
            dashArray: [0, 5],
            width: [2],
          },
          colors: [$themeColors.primary, "#dcdae3"],
          tooltip: {
            enabled: false,
          },
        },
      },
    };
  },
};
</script>
