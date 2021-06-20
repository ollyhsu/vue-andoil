import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/youhao",
    name: "Youhao",
    component: () => import("@/views/Youhao.vue"),
  },
  {
    path: "/cost",
    name: "Cost",
    component: () => import("@/views/Cost.vue"),
  },
  {
    path: "/discover",
    name: "Discover",
    component: () => import("@/views/Discover.vue"),
  },
  {
    path: "/msg",
    name: "Message",
    component: () => import("@/views/Message.vue"),
  },
  {
    path: "/me",
    name: "Me",
    component: () => import("@/views/Me.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/components/setting/Setting.vue"),
  },
  {
    path: "/changepwd",
    name: "ChangePwd",
    component: () => import("@/components/setting/ChangePwd.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
