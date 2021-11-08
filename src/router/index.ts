/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-06 14:37:43
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: {
      hidden: true,
      title: "登录",
    },
    component: () => import("../views/login/index.vue"),
  },
  // {
  //   path: "/404",
  //   component: () => import("@/views/404.vue"),
  //   meta: { hidden: true },
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   name: "homePage",
  //   redirect: "/homePage",
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
