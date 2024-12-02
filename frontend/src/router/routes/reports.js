export default [
  {
    path: "/reports/entry/marketing",
    name: "reports-entry-marketing",
    component: () => import("@/views/reports/reports-entry/marketing.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/month",
    name: "reports-entry-month",
    component: () => import("@/views/reports/reports-entry/month.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/sale",
    name: "reports-entry-sale",
    component: () => import("@/views/reports/reports-entry/sale.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/income",
    name: "reports-entry-income",
    component: () => import("@/views/reports/reports-entry/income.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/bonus",
    name: "reports-entry-bonus",
    component: () => import("@/views/reports/reports-entry/bonus.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },

  {
    path: "/reports/query/marketing",
    name: "reports-query-marketing",
    component: () => import("@/views/reports/reports-query/marketing.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userPerformance",
    name: "reports-query-user-performance",
    component: () => import("@/views/reports/reports-query/userPerformance.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/teamPerformance",
    name: "reports-query-team-performance",
    component: () => import("@/views/reports/reports-query/teamPerformance.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/incomeHistory",
    name: "reports-query-income-history",
    component: () => import("@/views/reports/reports-query/incomeHistory.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userReview",
    name: "reports-query-user-review",
    component: () => import("@/views/reports/reports-query/userReview.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userPromotion",
    name: "reports-query-user-promotion",
    component: () => import("@/views/reports/reports-query/userPromotion.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/incomeReal",
    name: "reports-query-income-real",
    component: () => import("@/views/reports/reports-query/incomeReal.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/sale",
    name: "reports-query-sale",
    component: () => import("@/views/reports/reports-query/sale.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/bonus",
    name: "reports-query-bonus",
    component: () => import("@/views/reports/reports-query/bonus.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
];
