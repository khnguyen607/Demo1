<template>
  <div>
    <!-- input search -->
    <div class="text-right mb-1">
      <b-button
        variant="primary"
        @click="
          showModal = true;
          edit = false;
          id = null;
        "
      >
        <feather-icon icon="PlusIcon" />
        Thêm mới
      </b-button>
    </div>

    <!-- Modal -->
    <b-modal
      id="add-item-modal"
      v-model="showModal"
      :title="edit ? 'Chỉnh sửa' : 'Thêm mới'"
      hide-footer
    >
      <TeamCreateOrEdit
        :edit="edit"
        :id="id"
        @submitted="
          getData();
          showModal = false;
          edit = false;
        "
      />
    </b-modal>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :pagination-options="{
        enabled: true,
        perPage: pageLength,
      }"
    >
      <template slot="table-row" slot-scope="props">
        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="showModalEdit(props.row.id)">
                <feather-icon icon="Edit2Icon" class="mr-50" />
                <span>Sửa</span>
              </b-dropdown-item>
              <b-dropdown-item @click="deleteItem(props.row.id)">
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span>Xóa</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
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
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
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
import TeamCreateOrEdit from "./team-create-or-edit.vue";

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    TeamCreateOrEdit,
  },
  data() {
    return {
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: "Tên team",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Thao tác",
          field: "action",
        },
      ],
      rows: [],
      showModal: false,
      edit: false,
      id: null,
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: "light-primary",
        Professional: "light-success",
        Rejected: "light-danger",
        Resigned: "light-warning",
        Applied: "light-info",
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
    await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi.get("/api/teams").then((res) => {
        this.rows = res.data.data.sort((a, b) => b.id - a.id);
        this.rows = res.data.data;
      });
    },
    showModalEdit(id) {
      this.id = id;
      this.edit = true;
      this.showModal = true;
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/teams/" + id)
        .then(async () => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Xóa thành công`,
              icon: "CheckIcon",
              variant: "success",
            },
          });
          await this.getData();
        })
        .catch(() => {
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
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
