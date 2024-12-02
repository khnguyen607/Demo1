<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Báo cáo hiệu suất team</b-card-title>
      <b-button variant="success" class="btn-icon" @click="exportToExcel">
        <feather-icon icon="DownloadIcon" />
      </b-button>
    </b-card-header>
    <b-card-body>
      <div>
        <!-- table -->
        <vue-good-table
          ref="goodTableRef"
          :columns="columns"
          :rows="rows"
          :rtl="direction"
          :pagination-options="{
            enabled: true,
            perPage: pageLength,
          }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'adsRate'">
              {{ props.row.adsRate + "%" }}
            </span>
            <span v-else-if="props.column.field === 'incomeReal'">
              {{ normalize(props.row.incomeReal) }}
            </span>
            <span v-else-if="props.column.field === 'incomeAverageToUser'">
              {{ normalize(props.row.incomeAverageToUser) }}
            </span>
            <span v-else-if="props.column.field === 'completionRate'">
              {{ props.row.completionRate + "%" }}
            </span>
            <span v-else-if="props.column.field === 'completionProjection'">
              {{ props.row.completionProjection + "%" }}
            </span>
            <span v-else-if="props.column.field === 'adsReal'">
              {{ normalize(props.row.adsReal) }}
            </span>
            <span v-else-if="props.column.field === 'income'">
              {{ normalize(props.row.income) }}
            </span>
            <span v-else-if="props.column.field === 'incomeAverage'">
              {{ normalize(props.row.incomeAverage) }}
            </span>
            <span v-else-if="props.column.field === 'incomeProjection'">
              {{ normalize(props.row.incomeProjection) }}
            </span>
            <span v-else-if="props.column.field === 'progressReview'">
              <b-badge :variant="statusVariant(props.row.progressReview)">
                {{ props.row.progressReview }}
              </b-badge>
            </span>
            <span v-else-if="props.column.field === 'feeReview'">
              <b-badge :variant="statusVariant(props.row.feeReview)">
                {{ props.row.feeReview }}
              </b-badge>
            </span>
          </template>
          <!-- pagination -->
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap"> Showing 1 to </span>
                <b-form-select
                  v-model="pageLength"
                  :options="['3', '5', '10']"
                  class="mx-1"
                  @input="
                    (value) => props.perPageChanged({ currentPerPage: value })
                  "
                />
                <span class="text-nowrap"> of {{ props.total }} entries </span>
              </div>
              <div>
                <b-pagination
                  :value="1"
                  :total-rows="props.total"
                  :per-page="pageLength"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1 mb-0"
                  @input="(value) => props.pageChanged({ currentPage: value })"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </vue-good-table>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import { exportExcel } from "@/views/components/exportExcel/ExportExcel";

export default {
  components: {
    VueGoodTable,
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  data() {
    return {
      exportExcelData: {
        columns: [],
        rows: [],
      },
      userData: JSON.parse(localStorage.getItem("userData")),
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: "Tháng",
          field: "tern",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Team",
          field: "teamName",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chi nhánh",
          field: "branchName",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số mục tiêu",
          field: "income",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số thực tế",
          field: "incomeReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số trung bình/ngày",
          field: "incomeAverage",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số trung bình/nhân viên",
          field: "incomeAverageToUser",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ hoàn thành",
          field: "completionRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chi phí ads",
          field: "adsReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ ads",
          field: "adsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Mã win kế hoạch",
          field: "win",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Mã win thực tế",
          field: "winReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Dự báo doanh số cuối tháng",
          field: "incomeProjection",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Dự báo tỉ lệ hoàn thành",
          field: "completionProjection",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Đánh giá tiến độ",
          field: "progressReview",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Đánh giá chi phí",
          field: "feeReview",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
      ],
      rows: [],
    };
  },
  computed: {
    filteredRows() {
      // Lấy tất cả các hàng đang hiển thị (sau tìm kiếm và phân trang)
      const table = this.$refs.goodTableRef;
      return table ? table.filteredRows[0].children : [];
    },
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        "Xuất sắc": "light-success",
        "Tiêu chuẩn": "light-info",
        "Chậm tiến độ": "light-danger",
        "Quá ngưỡng": "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
  },
  async created() {
    this.exportExcelData.columns = this.columns.map((item) => {
      return {
        label: item.label,
        field: item.field,
        width: 30,
      };
    });
    await this.$callApi.get("/api/getReports/teamPerformance").then((res) => {
      const data = res.data.data.filter((item) => {
        switch (this.userData.role) {
          case "ADMIN":
            return true;
          case "LEADER":
            return item.teamId == this.userData.teamId;
          case "USER":
            return item.teamId == this.userData.teamId;
        }
      });
      console.log(data);

      this.rows = data.sort((a, b) => b.id - a.id);
      this.rows = data;
    });
  },
  methods: {
    exportToExcel() {
      exportExcel(
        "Report.xlsx",
        this.filteredRows,
        this.exportExcelData.columns
      );
    },
    normalize(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
