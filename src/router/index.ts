import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import MainView from "../views/MainView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/components/MainPage.vue"),
      },
      {
        path: "/folder",
        name: "folder",
        component: () => import("@/components/FolderPage.vue"),
      },
      {
        path: "/error",
        name: "error",
        component: () => import("@/components/ErrorPage.vue"),
      },
      // match all route
      {
        path: ":pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/components/ErrorPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
