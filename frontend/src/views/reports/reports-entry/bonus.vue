<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Nhập báo cáo thưởng phạt</b-card-title>
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
            <b-form-group label="Bộ phận" label-for="mc-department">
              <b-form-input
                v-model="dataForm.department"
                id="mc-department"
                type="text"
                placeholder="Bộ phận"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Ngày ra quyết định" label-for="mc-date">
              <b-form-input
                v-model="dataForm.date"
                id="mc-date"
                type="date"
                placeholder="Ngày ra quyết định"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Kỳ áp dụng" label-for="mc-tern">
              <b-form-input
                v-model="dataForm.tern"
                id="mc-tern"
                type="month"
                placeholder="Kỳ áp dụng"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Mã quyết định/ biên bản" label-for="mc-record">
              <b-form-input
                v-model="dataForm.record"
                id="mc-record"
                type="text"
                placeholder="Mã quyết định/ biên bản"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Nội dung" label-for="mc-content">
              <b-form-input
                v-model="dataForm.content"
                id="mc-content"
                type="text"
                placeholder="Nội dung"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Văn bản tham chiếu"
              label-for="mc-document-reference"
            >
              <b-form-input
                v-model="dataForm.documentReference"
                id="mc-document-reference"
                type="text"
                placeholder="Văn bản tham chiếu"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Tiền thưởng" label-for="mc-bonus">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.bonus"
                  id="mc-bonus"
                  type="number"
                  placeholder="Tiền thưởng"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Tiền phạt" label-for="mc-penalty">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.penalty"
                  id="mc-penalty"
                  type="number"
                  placeholder="Tiền phạt"
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
        department: null,
        date: new Date().toISOString().split("T")[0],
        tern: null,
        record: null,
        content: null,
        documentReference: null,
        bonus: null,
        penalty: null,
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
        await this.$callApi.post("/api/bonusReports", this.dataForm);
        this.dataForm = {
          userId: JSON.parse(localStorage.getItem("userData")).id,
          position: JSON.parse(localStorage.getItem("userData")).position,
          department: null,
          date: new Date().toISOString().split("T")[0],
          tern: null,
          record: null,
          content: null,
          documentReference: null,
          bonus: null,
          penalty: null,
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
