<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Nhập báo cáo doanh thu thực</b-card-title>
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
            <b-form-group label="Vị trí" label-for="mc-position">
              <b-form-select
                v-model="dataForm.position"
                id="mc-position"
                :options="options.position"
                placeholder="Vị trí"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Kỳ báo cáo" label-for="mc-tern">
              <b-form-input
                v-model="dataForm.tern"
                id="mc-tern"
                type="month"
                placeholder="Kỳ báo cáo"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Doanh số thực" label-for="mc-income">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.income"
                  id="mc-income"
                  type="number"
                  placeholder="Doanh số thực"
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
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
        position: JSON.parse(localStorage.getItem("userData")).position,
        tern: null,
        income: null,
      },
      options: {
        position: [
          { text: "MKT Học việc", value: "MKT Học việc" },
          { text: "MKT Thử việc", value: "MKT Thử việc" },
          { text: "Marketing", value: "Marketing" },
          { text: "Sale", value: "Sale" },
          { text: "CTV", value: "CTV" },
          { text: "CSKH", value: "CSKH" },
          { text: "Leader tập sự", value: "Leader tập sự" },
          { text: "Leader MKT", value: "Leader MKT" },
          { text: "Leader Sale", value: "Leader Sale" },
          { text: "Giám đốc", value: "Giám đốc" },
        ],
        user: [],
      },
    };
  },
  async created() {
    this.$callApi.get("/api/users").then((res) => {
      this.options.user = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });
  },
  methods: {
    async onSubmit() {
      try {
        await this.$callApi.post("/api/incomeReports", this.dataForm);
        this.dataForm = {
          userId: JSON.parse(localStorage.getItem("userData")).id,
          position: JSON.parse(localStorage.getItem("userData")).position,
          tern: null,
          income: null,
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
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Lỗi`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: error,
          },
        });
      }
    },
  },
};
</script>
