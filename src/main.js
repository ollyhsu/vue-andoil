import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vant from "./components/vant";
import local from "./lib/until";
import md5 from "js-md5";
Vue.use(local);
Vue.prototype.$md5 = md5;
import "amfe-flexible";
Vue.config.productionTip = false;
Vue.use(vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
