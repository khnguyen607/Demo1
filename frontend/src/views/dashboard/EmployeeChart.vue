<template>
  <b-card no-body class="card-employee-task">
    <b-card-header>
      <b-card-title>{{ title }}</b-card-title>
    </b-card-header>

    <!-- body -->
    <b-card-body>
      <div
        v-for="(employee, index) in data"
        :key="employee.userName"
        class="employee-task d-flex justify-content-between align-items-center"
      >
        <b-media no-body>
          <b-media-body class="my-auto">
            <h6 class="mb-0">
              {{ employee.userName }}
            </h6>
            <small>{{ employee.teamName }}</small>
          </b-media-body>
        </b-media>
        <div class="d-flex align-items-center">
          <small class="text-muted mr-75"
            >{{ normalize(employee.income) }} ₫</small
          >
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardTitle,
  BCardHeader,
  BCardBody,
  BMedia,
  BMediaBody,
} from "bootstrap-vue";
export default {
  components: {
    BCard,
    BCardTitle,
    BCardHeader,
    BCardBody,
    BMedia,
    BMediaBody,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      employeeData: [],
    };
  },
  methods: {
    normalize(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
