<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col md="6">
        <b-form-group label="Email" label-for="mc-email">
          <b-form-input
            v-model="dataForm.email"
            id="mc-email"
            type="email"
            placeholder="Email"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Mật khẩu" label-for="mc-password">
          <b-form-input
            v-model="dataForm.password"
            id="mc-password"
            type="text"
            placeholder="Mật khẩu"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Họ và tên" label-for="mc-name">
          <b-form-input
            v-model="dataForm.name"
            id="mc-name"
            type="text"
            placeholder="Họ và tên"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Số điện thoại" label-for="mc-phone">
          <b-form-input
            v-model="dataForm.phone"
            id="mc-phone"
            type="text"
            placeholder="Số điện thoại"
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
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Team" label-for="mc-team">
          <b-form-select
            v-model="dataForm.teamId"
            id="mc-team"
            :options="options.team"
            placeholder="Team"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Chi nhánh" label-for="mc-branch">
          <b-form-select
            v-model="dataForm.branchId"
            id="mc-branch"
            :options="options.branch"
            placeholder="Chi nhánh"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Quyền hệ thống" label-for="mc-role">
          <b-form-select
            v-model="dataForm.role"
            id="mc-role"
            :options="options.role"
            placeholder="Quyền hệ thống"
          />
        </b-form-group>
      </b-col>
      <b-col md="6" v-if="edit">
        <b-form-group label="Trạng thái" label-for="mc-status">
          <b-form-select
            v-model="dataForm.status"
            id="mc-status"
            :options="options.status"
            placeholder="Trạng thái"
          />
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
          {{ edit ? "Chỉnh sửa" : "Thêm mới" }}
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="outline-secondary"
        >
          Đặt lại
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
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
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        email: null,
        password: null,
        name: null,
        phone: null,
        position: null,
        teamId: null,
        branchId: null,
        role: "USER",
        status: "Working",
      },
      options: {
        team: [],
        branch: [],
        role: [
          { value: "ADMIN", text: "Quản trị viên" },
          { value: "LEADER", text: "Leader" },
          { value: "USER", text: "Nhân viên" },
        ],
        status: [
          { value: "Working", text: "Đang làm việc" },
          { value: "NotWorking", text: "Nghỉ việc" },
        ],
        position: [
          { value: "MKT Học việc", text: "MKT Học việc" },
          { value: "MKT Thử việc", text: "MKT Thử việc" },
          { value: "Marketing", text: "Marketing" },
          { value: "Sale", text: "Sale" },
          { value: "CTV", text: "CTV" },
          { value: "CSKH", text: "CSKH" },
          { value: "Leader tập sự", text: "Leader tập sự" },
          { value: "Leader MKT", text: "Leader MKT" },
          { value: "Leader Sale", text: "Leader Sale" },
          { value: "Giám đốc", text: "Giám đốc" },
        ],
      },
    };
  },
  async created() {
    if (this.edit) {
      await this.$callApi
        .get("/api/users/" + this.id)
        .then((res) => (this.dataForm = res.data.data));
    }

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
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/users/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/users", this.dataForm);
        }
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thành công`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
        // Sau khi thành công, bắn sự kiện
        this.$emit("submitted");
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
