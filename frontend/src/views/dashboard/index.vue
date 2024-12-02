<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col md="12">
        <b-card no-body class="card-statistics">
          <b-card-header>
            <b-card-title
              >Tổng quan hoạt động kinh doanh của MACAS</b-card-title
            >
            <b-card-text
              class="font-small-2 mr-25 mb-0 d-flex align-items-center"
            >
              <b-form-group label="Chọn giá trị:" class="mb-0">
                <b-form-input
                  v-model="selectedDate"
                  id="mc-tern"
                  type="month"
                  @change="refreshDashboard"
                />
              </b-form-group>
            </b-card-text>
          </b-card-header>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col md="4">
        <b-card no-body class="card-statistics">
          <b-card-header>
            <b-card-title style="font-weight: bold; font-size: 1.2rem"
              >I. Báo cáo tháng</b-card-title
            >
          </b-card-header>
        </b-card>
      </b-col>
    </b-row>

    <b-row
      class="match-height justify-content-between"
      style="display: flex; gap: 10px"
    >
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'TỔNG DOANH SỐ (VNĐ)',
            value: normalize(dashboard.totalIncome) || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'SẢN PHẨM WIN (SP)',
            value: dashboard.totalWin || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'NGÂN SÁCH CHI TIÊU (VNĐ)',
            value: normalize(dashboard.totalAds) || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'TỈ LỆ ADS/DOANH THU',
            value: `${dashboard.totalAdsToIncomeRate}%` || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'MỨC ĐỘ HOÀN THÀNH MỤC TIÊU',
            value: `${dashboard.completionRate}%` || 0,
          }"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalIncomeByTeam.title"
          :data="charts.totalIncomeByTeam.data"
          :key="charts.totalIncomeByTeam.key"
        />
      </b-col>

      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalWinByTeam.title"
          :data="charts.totalWinByTeam.data"
          :key="charts.totalWinByTeam.key"
        />
      </b-col>

      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalAdsByTeam.title"
          :data="charts.totalAdsByTeam.data"
          :key="charts.totalAdsByTeam.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <BasicLineChart
          :title="charts.totalIncomeByTeamDaily.title"
          :data="charts.totalIncomeByTeamDaily.data"
          :key="charts.totalIncomeByTeamDaily.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <EmployeeChart
          :title="employee.best.title"
          :data="employee.best.data"
        />
      </b-col>
      <b-col lg="6">
        <EmployeeChart
          :title="employee.worst.title"
          :data="employee.worst.data"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <BasicBarChart
          :title="charts.incomeCompletion.title"
          :data="charts.incomeCompletion.data"
          :key="charts.incomeCompletion.key"
        />
      </b-col>

      <b-col lg="6">
        <BasicBarChart
          :title="charts.incomeCompletionRate.title"
          :data="charts.incomeCompletionRate.data"
          :key="charts.incomeCompletionRate.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col md="4">
        <b-card no-body class="card-statistics">
          <b-card-header>
            <b-card-title style="font-weight: bold; font-size: 1.2rem"
              >II. Báo cáo năm</b-card-title
            >
          </b-card-header>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalIncomeByMonth.title"
          :data="charts.totalIncomeByMonth.data"
          :key="charts.totalIncomeByMonth.key"
        />
      </b-col>

      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalIncomeToAdsByMonth.title"
          :data="charts.totalIncomeToAdsByMonth.data"
          :key="charts.totalIncomeToAdsByMonth.key"
        />
      </b-col>

      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalIncomeToIncomeByMonth.title"
          :data="charts.totalIncomeToIncomeByMonth.data"
          :key="charts.totalIncomeToIncomeByMonth.key"
        />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BButton,
  BFormInput,
  BFormSelect,
} from "bootstrap-vue";

import { getUserData } from "@/auth/utils";
import BasicLineChart from "./BasicLineChart.vue";
import BasicBarChart from "./BasicBarChart.vue";
import EmployeeChart from "./EmployeeChart.vue";
import Statistics from "./Statistics.vue";
import BasicCard from "./BasicCard.vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BButton,
    EmployeeChart,
    BasicLineChart,
    BasicBarChart,
    Statistics,
    BasicCard,
    BFormInput,
    BFormSelect,
  },
  data() {
    return {
      selectedDate: new Date().toISOString().slice(0, 7),
      dashboard: {
        totalIncome: 0,
        totalWin: 0,
        totalAds: 0,
        totalAdsToIncomeRate: 0,
        completionRate: 0,
      },
      charts: {
        totalIncomeByTeam: {
          title: "Tổng doanh số theo team",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalIncomeByTeamDaily: {
          title: "Biểu đồ biến động doanh số theo ngày",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalWinByTeam: {
          title: "So sánh số sản phẩm win giữa các team",
          data: {
            series: [
              {
                name: "Sản phẩm win",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalAdsByTeam: {
          title: "Chi phí marketing theo team",
          data: {
            series: [
              {
                name: "Chi phí marketing",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        incomeCompletion: {
          title: "Doanh số thực tế và so với kế hoạch",
          data: {
            series: [
              {
                name: "Thực tế",
                data: [],
              },
              {
                name: "Kế hoạch",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        incomeCompletionRate: {
          title: "Tỉ lệ hoàn thành mục tiêu theo team",
          data: {
            series: [
              {
                name: "Tỉ lệ (%)",
                data: [20, 70, 60, 80, 100, 20, 30],
              },
            ],
            categories: [
              "Team 1",
              "Team 2",
              "Team 3",
              "Team 4",
              "Team 5",
              "Team 6",
              "Team 7",
            ],
          },
        },
        totalIncomeByMonth: {
          title: "Tổng doanh số toàn công ty qua các tháng trong năm",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalIncomeToAdsByMonth: {
          title:
            "Tổng doanh số và tổng chi phí từng team qua các tháng trong năm",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
              {
                name: "Chi phí",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalIncomeToIncomeByMonth: {
          title:
            "So sánh doanh số thực tế và kế hoạch theo các tháng trong năm",
          data: {
            series: [
              {
                name: "Thực tế",
                data: [],
              },
              {
                name: "Kế hoạch",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
      },
      employee: {
        best: {
          title: "Top 5 nhân viên doanh số cao nhất",
          data: [],
        },
        worst: {
          title: "Top 5 nhân viên doanh số thấp nhất",
          data: [],
        },
      },
      rawData: {},
      rawDataDaily: {},
      rawDataYeah: {},
    };
  },
  async created() {
    await this.refreshDashboard();
  },
  methods: {
    async refreshDashboard() {
      this.getDashboard();
      this.getChartData();
      this.getEmployeeData();
    },
    async getDashboard() {
      await this.$callApi
        .post("/api/getReports/getDashboard", {
          tern: `${this.selectedDate.split("-")[1]}/${
            this.selectedDate.split("-")[0]
          }`,
        })
        .then((res) => {
          const data = res.data.data;
          if (data) {
            this.dashboard = data;
          } else {
            this.dashboard = {
              totalIncome: 0,
              totalWin: 0,
              totalAds: 0,
              totalAdsToIncomeRate: 0,
              completionRate: 0,
            };
          }
        });
    },
    async getChartData() {
      await this.$callApi.get("/api/getReports/teamPerformance").then((res) => {
        const data = res.data.data;
        this.rawData = data.filter(
          (item) =>
            item.tern ===
            `${this.selectedDate.split("-")[1]}/${
              this.selectedDate.split("-")[0]
            }`
        );
        this.rawDataYear = data;
      });
      await this.$callApi
        .post("/api/getReports/getIncomeDaily", {
          tern: this.selectedDate,
        })
        .then((res) => {
          const data = res.data.data;
          this.rawDataDaily = data;
        });
      await this.updateChartData();
    },
    async getEmployeeData() {
      await this.$callApi.get("/api/getReports/userPerformance").then((res) => {
        const data = res.data.data;
        // Lọc ra dữ liệu chỉ thuộc kỳ "11/2024"
        const filteredData = data.filter((item) => item.tern === "11/2024");
        console.log(filteredData);
        // Sắp xếp theo income giảm dần
        const sortedByIncomeDesc = [...filteredData].sort(
          (a, b) => b.income - a.income
        );
        // Sắp xếp theo income tăng dần
        const sortedByIncomeAsc = [...filteredData].sort(
          (a, b) => a.income - b.income
        );
        // Lấy top 5 nhân viên có income cao nhất
        const topHighestIncome = sortedByIncomeDesc.slice(0, 5);
        // Lấy top 5 nhân viên có income thấp nhất
        const topLowestIncome = sortedByIncomeAsc.slice(0, 5);

        this.employee.best.data = topHighestIncome;
        this.employee.worst.data = topLowestIncome;
      });
    },
    async updateChartData() {
      // clear data
      this.charts.totalIncomeByTeam.data.series[0].data = [];
      this.charts.totalIncomeByTeam.data.categories = [];
      this.charts.totalWinByTeam.data.series[0].data = [];
      this.charts.totalWinByTeam.data.categories = [];
      this.charts.totalAdsByTeam.data.series[0].data = [];
      this.charts.totalAdsByTeam.data.categories = [];
      this.charts.incomeCompletion.data.series[0].data = [];
      this.charts.incomeCompletion.data.series[1].data = [];
      this.charts.incomeCompletion.data.categories = [];
      this.charts.incomeCompletionRate.data.series[0].data = [];
      this.charts.incomeCompletionRate.data.categories = [];
      // dump data
      this.rawData.forEach((item) => {
        this.charts.totalIncomeByTeam.data.series[0].data.push(item.incomeReal);
        this.charts.totalIncomeByTeam.data.categories.push(item.teamName);

        this.charts.totalWinByTeam.data.series[0].data.push(item.winReal);
        this.charts.totalWinByTeam.data.categories.push(item.teamName);

        this.charts.totalAdsByTeam.data.series[0].data.push(item.adsReal);
        this.charts.totalAdsByTeam.data.categories.push(item.teamName);

        this.charts.incomeCompletion.data.series[0].data.push(item.incomeReal);
        this.charts.incomeCompletion.data.series[1].data.push(item.income);
        this.charts.incomeCompletion.data.categories.push(item.teamName);

        this.charts.incomeCompletionRate.data.series[0].data.push(
          item.completionRate
        );
        this.charts.incomeCompletionRate.data.categories.push(item.teamName);
      });
      // refreshData
      this.charts.totalIncomeByTeam.key += 1;
      this.charts.totalWinByTeam.key += 1;
      this.charts.totalAdsByTeam.key += 1;
      this.charts.incomeCompletion.key += 1;
      this.charts.incomeCompletionRate.key += 1;

      // CHART DAILY
      this.charts.totalIncomeByTeamDaily.data.series[0].data = [];
      this.charts.totalIncomeByTeamDaily.data.categories = [];
      this.rawDataDaily.forEach((item) => {
        this.charts.totalIncomeByTeamDaily.data.series[0].data.push(
          item.income
        );
        this.charts.totalIncomeByTeamDaily.data.categories.push(
          item.date.split("T")[0].split("-")[2]
        );
      });
      this.charts.totalIncomeByTeamDaily.key += 1;

      // CHART YEAR
      // clear data
      this.charts.totalIncomeByMonth.data.series[0].data = [];
      this.charts.totalIncomeByMonth.data.categories = [];
      // this.charts.totalIncomeToAdsByMonth.data.series[0].data = [];
      // this.charts.totalIncomeToAdsByMonth.data.series[1].data = [];
      // this.charts.totalIncomeToAdsByMonth.data.categories = [];
      // dump data
      this.rawData.forEach((item) => {
        this.charts.totalIncomeToAdsByMonth.data.series[0].data.push(item.incomeReal);
        this.charts.totalIncomeToAdsByMonth.data.categories.push(item.teamName);

        // this.charts.totalIncomeToAdsByMonth.data.series[0].data.push(
        //   item.incomeReal
        // );
        // this.charts.totalIncomeToAdsByMonth.data.series[1].data.push(item.income);
        // this.charts.totalIncomeToAdsByMonth.data.categories.push(item.teamName);
      });
      // refreshData
      this.charts.totalIncomeByMonth.key += 1;
    },
    normalize(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
