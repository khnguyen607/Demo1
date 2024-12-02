export default [
  {
    path: "/settings/users",
    name: "settings-users",
    component: () => import("@/views/settings/users/user-list.vue"),
  },
  {
    path: "/settings/teams",
    name: "settings-teams",
    component: () => import("@/views/settings/teams/team-list.vue"),
  },
  {
    path: "/settings/branches",
    name: "settings-branches",
    component: () => import("@/views/settings/branches/branch-list.vue"),
  },
];
