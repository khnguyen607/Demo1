<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col md="6">
        <b-form-group label="Tên team" label-for="mc-name">
          <b-form-input
            v-model="dataForm.name"
            id="mc-name"
            type="text"
            placeholder="Tên team"
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
          @click="onSubmit()"
        >
          {{ edit ? "Chỉnh sửa" : "Thêm" }}
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
  async created() {
    if (this.edit) {
      await this.$callApi
        .get("/api/teams/" + this.id)
        .then((res) => (this.dataForm = res.data.data));
    }
  },
  data() {
    return {
      dataForm: {
        name: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/teams/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/teams", this.dataForm);
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
