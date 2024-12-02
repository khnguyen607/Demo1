<template>
  <b-card class="d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h6>{{ data.name }}</h6>
      <h2 class="font-weight-bolder mb-1">{{ data.value }}</h2>
    </div>
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";

export default {
  components: {
    BCard,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
