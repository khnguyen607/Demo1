<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>{{ listForms[activeFrom] }}</b-card-title>
      <b-dropdown
        id="dropdown-forms"
        right
        variant="outline-primary"
        class="dropdown-forms"
        no-caret
      >
        <template #button-content>
          <feather-icon icon="FileTextIcon" size="18" />
        </template>
        <b-dropdown-item
          v-for="(form, index) in listForms"
          :key="index"
          @click="activeFrom = index"
          >{{ form }}</b-dropdown-item
        >
      </b-dropdown>
    </b-card-header>
    <b-card-body>
      <Marketing v-if="activeFrom == 1" />
      <Month v-else-if="activeFrom == 2" />
      <Sale v-else-if="activeFrom == 3" />
      <Income v-else-if="activeFrom == 4" />
      <Bonus v-else-if="activeFrom == 5" />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import Marketing from "./marketing.vue";
import Month from "./month.vue";
import Sale from "./sale.vue";
import Income from "./income.vue";
import Bonus from "./bonus.vue";

export default {
  components: {
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BDropdown,
    BDropdownItem,
    Marketing,
    Month,
    Sale,
    Income,
    Bonus,
  },
  data() {
    return {
      activeFrom: 1,
      listForms: {
        1: "Marketing",
        2: "Mục tiêu tháng",
        3: "Sale",
        4: "Doanh thu thực",
        5: "Thưởng, phạt",
      },
    };
  },
};
</script>
