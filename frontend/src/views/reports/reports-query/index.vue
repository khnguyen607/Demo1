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
      <Marketing class="mt-2" v-if="activeFrom == 1" />
      <UserPerformance class="mt-2" v-else-if="activeFrom == 2" />
      <TeamPerformance class="mt-2" v-else-if="activeFrom == 3" />
      <IncomeHistory class="mt-2" v-else-if="activeFrom == 4" />
      <UserReview class="mt-2" v-else-if="activeFrom == 5" />
      <UserPromotion class="mt-2" v-else-if="activeFrom == 6" />
      <IncomeReal class="mt-2" v-else-if="activeFrom == 7" />
      <Sale class="mt-2" v-else-if="activeFrom == 8" />
      <Bonus class="mt-2" v-else-if="activeFrom == 9" />
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
import UserPerformance from "./userPerformance.vue";
import TeamPerformance from "./teamPerformance.vue";
import IncomeHistory from "./incomeHistory.vue";
import UserReview from "./userReview.vue";
import UserPromotion from "./userPromotion.vue";
import IncomeReal from "./incomeReal.vue";
import Sale from "./sale.vue";
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
    UserPerformance,
    TeamPerformance,
    IncomeHistory,
    UserReview,
    UserPromotion,
    IncomeReal,
    Sale,
    Bonus,
  },
  data() {
    return {
      activeFrom: 1,
      listForms: {
        1: "Marketing",
        2: "Báo cáo hiệu suất nhân viên",
        3: "Báo cáo hiệu suất team",
        4: "Báo cáo lịch sử kinh doanh năm",
        5: "Báo cáo đánh giá nhân viên",
        6: "Báo cáo thăng tiến/tăng lương",
        7: "Báo cáo doanh thu thực theo tháng",
        8: "Báo cáo sale theo tháng",
        9: "Báo cáo thưởng phạt",
      },
    };
  },
};
</script>
