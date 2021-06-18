import {
  Tabbar,
  TabbarItem,
  Button,
  Cell,
  CellGroup,
  Calendar,
  NumberKeyboard,
  Field,
  Form,
  Toast,
  Swipe,
  SwipeItem,
  Popup,
} from "vant"; //指定需引⼊的组件
let vantUIs = [
  Tabbar,
  TabbarItem,
  Button,
  Cell,
  CellGroup,
  Calendar,
  NumberKeyboard,
  Field,
  Form,
  Toast,
  Swipe,
  SwipeItem,
  Popup,
]; //定义组件数组
export default {
  install(Vue) {
    vantUIs.forEach((vantUI) => {
      Vue.component(vantUI.name, vantUI); //注册组件
    });
  },
};
