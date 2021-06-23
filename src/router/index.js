import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "小白油耗",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      title: "注册",
    },
  },
  {
    path: "/youhao",
    name: "Youhao",
    component: () => import("@/views/Youhao.vue"),
    meta: {
      title: "我的油耗",
    },
  },

  {
    path: "/cost",
    name: "Cost",
    component: () => import("@/views/Cost.vue"),
    meta: {
      title: "我的消费",
    },
  },
  {
    path: "/discover",
    name: "Discover",
    component: () => import("@/views/Discover.vue"),
    meta: {
      title: "发现",
    },
  },
  {
    path: "/msg",
    name: "Message",
    component: () => import("@/views/Message.vue"),
    meta: {
      title: "我的消息",
    },
  },
  {
    path: "/me",
    name: "Me",
    component: () => import("@/views/Me.vue"),
    meta: {
      title: "我的个人中心",
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/components/setting/Setting.vue"),
    meta: {
      title: "用户设置",
    },
  },
  {
    path: "/changepwd",
    name: "ChangePwd",
    component: () => import("@/components/setting/ChangePwd.vue"),
    meta: {
      title: "修改密码",
    },
  },
  {
    path: "/carset",
    name: "CarSet",
    component: () => import("@/components/CarSet.vue"),
    meta: {
      title: "车辆管理",
    },
  },
  {
    path: "/addcar",
    name: "AddCar",
    component: () => import("@/components/AddCar.vue"),
    meta: {
      title: "添加车辆",
    },
  },
  {
    path: "/addoil",
    name: "AddOil",
    component: () => import("@/components/AddOil.vue"),
    meta: {
      title: "记录油耗",
    },
  },
  {
    path: "/addcost",
    name: "AddCost",
    component: () => import("@/components/AddCost.vue"),
    meta: {
      title: "记录支出",
    },
  },
  {
    path: "/oilinfo",
    name: "OilInfo",
    component: () => import("@/components/showOilInfo.vue"),
    meta: {
      title: "油耗记录",
    },
  },
  {
    path: "/costinfo",
    name: "CostInfo",
    component: () => import("@/components/showCostInfo.vue"),
    meta: {
      title: "消费记录",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //如果设置标题，拦截后设置标题
    document.title = to.meta.title;
  }
  const isLogin = window.localStorage.getItem("token"); //获取本地存储的登陆信息
  if (to.name == "Home") {
    if (isLogin) {
      //判断是否登陆
      next({
        name: "Youhao",
      }); //已登录，跳转首页
    } else {
      next(); //没登录，继续进入login页
    }
  } else if (to.name == "login") {
    //判断是否进入的login页
    if (isLogin) {
      //判断是否登陆
      next({
        name: "Youhao",
      }); //已登录，跳转首页（a页面）
    } else {
      next(); //没登录，继续进入login页
    }
  } else if (to.name == "register") {
    //判断是否进入的login页
    if (isLogin) {
      //判断是否登陆
      next({
        name: "Youhao",
      }); //已登录，跳转首页（a页面）
    } else {
      next(); //没登录，继续进入login页
    }
  } else {
    //如果进入的非login页
    if (isLogin) {
      //同样判断是否登陆
      next(); //已登录，正常进入
    } else {
      next({
        name: "Home",
      }); //没登录，跳转到首页页
    }
  }
});
export default router;