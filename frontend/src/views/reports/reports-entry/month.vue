<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Đăng ký mục tiêu tháng</b-card-title>
    </b-card-header>
    <b-card-body>
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group label="Họ và tên" label-for="mc-name">
              <b-form-select
                v-model="dataForm.userId"
                :options="options.user"
                id="mc-name"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Team" label-for="mc-team">
              <b-form-select
                v-model="dataForm.teamId"
                :options="options.team"
                id="mc-team"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Chi nhánh" label-for="mc-branch">
              <b-form-select
                v-model="dataForm.branchId"
                :options="options.branch"
                id="mc-branch"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Kỳ đăng ký" label-for="mc-tern">
              <b-form-input
                v-model="dataForm.tern"
                id="mc-tern"
                type="month"
                placeholder="Kỳ đăng ký"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Doanh số mục tiêu" label-for="mc-income">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.income"
                  id="mc-income"
                  type="number"
                  placeholder="Doanh số mục tiêu"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Chi phí ads mục tiêu (%)" label-for="mc-ads">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.ads"
                  id="mc-ads"
                  type="number"
                  placeholder="Chi phí ads mục tiêu (%)"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Sản phẩm win mục tiêu" label-for="mc-win">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.win"
                  id="mc-win"
                  type="number"
                  placeholder="Sản phẩm win mục tiêu"
                />
              </div>
            </b-form-group>
          </b-col>
          <!-- submit and reset -->
          <b-col md="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="onSubmit"
            >
              Gửi
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCardBody,
  BCardTitle,
  BCardHeader,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCardBody,
    BCardTitle,
    BCardHeader,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      dataForm: {
        userId: JSON.parse(localStorage.getItem("userData")).id,
        tern: null,
        income: null,
        ads: null,
        teamId: JSON.parse(localStorage.getItem("userData")).teamId,
        branchId: JSON.parse(localStorage.getItem("userData")).branchId,
        win: null,
      },
      options: {
        team: [],
        branch: [],
        user: [],
      },
    };
  },
  async created() {
    this.$callApi.get("/api/teams").then((res) => {
      this.options.team = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });

    this.$callApi.get("/api/branches").then((res) => {
      this.options.branch = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });

    this.$callApi.get("/api/users").then((res) => {
      this.options.user = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });
  },
  methods: {
    async onSubmit() {
      try {
        await this.$callApi.post("/api/monthReports", this.dataForm);
        this.dataForm = {
          userId: JSON.parse(localStorage.getItem("userData")).id,
          tern: null,
          income: null,
          ads: null,
          teamId: JSON.parse(localStorage.getItem("userData")).teamId,
          branchId: JSON.parse(localStorage.getItem("userData")).branchId,
          win: null,
        };
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thành công`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
      } catch (error) {
        // Kiểm tra mã lỗi
        let message = "Đã xảy ra lỗi không xác định.";
        if (error.response) {
          if (error.response.status === 409) {
            message = "Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.";
          } else if (error.response.status === 400) {
            message = "Dữ liệu không hợp lệ. Vui lòng nhập lại.";
          } else if (error.response.status === 500) {
            message = "Lỗi máy chủ. Vui lòng thử lại sau.";
          }
        } else {
          message = "Không thể kết nối đến máy chủ.";
        }
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Lỗi`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: message,
          },
        });
      }
    },
  },
};
</script>
