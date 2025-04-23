import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import MainView from "../views/MainView.vue";
import Cookies from "js-cookie";

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
        beforeEnter: (to, from, next) => {
          if (Cookies.get("session_id") !== undefined) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/components/LoginPage.vue"),
      },
      {
        path: "/folder",
        name: "folder",
        component: () => import("@/components/FolderPage.vue"),
      },
      {
        path: "/markdown-writer",
        name: "markdown-writer",
        component: () => import("@/components/MdWriter.vue"),
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
