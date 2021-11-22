import { createRouter, createWebHistory } from "vue-router";

const router = [
  {
    path: "/",
    redirect: "/zhihu",
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
    path: "/zhihu",
    component: () => import("../pages/zhihu.vue"),
  },
];

export default createRouter({
  routes: router,
  history: createWebHistory(),
});
