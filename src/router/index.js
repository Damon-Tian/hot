import { createRouter, createWebHistory } from "vue-router";

const router = [
  {
    path: "/",
    alias: "/zhihu",
    component: () => import("../pages/zhihu.vue"),
  },
  {
    path: "/home",
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/bilibili",
    component: () => import("../pages/bilibili.vue"),
  },
  {
    path: "/douban",
    component: () => import("../pages/douban.vue"),
  },
  {
    path: "/pic",
    component: () => import("../pages/pic.vue"),
  },
];

export default createRouter({
  routes: router,
  history: createWebHistory(),
});
