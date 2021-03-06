import {
  Button,
  Cell,
  CellGroup,
  Icon,
  Image as VanImage,
  Col,
  Row,
  Popup,
  Toast,
  Calendar,
  Cascader,
  Checkbox,
  CheckboxGroup,
  DatetimePicker,
  Field,
  Form,
  PasswordInput,
  NumberKeyboard,
  Picker,
  RadioGroup,
  Radio,
  Rate,
  Search,
  Slider,
  Stepper,
  Switch,
  Uploader,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notify,
  PullRefresh,
  ShareSheet,
  SwipeCell,
  Badge,
  Circle,
  Collapse,
  CollapseItem,
  Divider,
  Empty,
  ImagePreview,
  List,
  NoticeBar,
  Popover,
  Step,
  Steps,
  Sticky,
  Swipe,
  SwipeItem,
  Tag,
  Grid,
  GridItem,
  IndexBar,
  IndexAnchor,
  NavBar,
  Pagination,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  TreeSelect,
  AddressEdit,
  AddressList,
  Area,
  Card,
} from "vant"; //指定需引⼊的组件
let vantUIs = [
  Button,
  Cell,
  CellGroup,
  Icon,
  VanImage,
  Col,
  Row,
  Popup,
  Toast,
  Calendar,
  Cascader,
  Checkbox,
  CheckboxGroup,
  DatetimePicker,
  Field,
  Form,
  NumberKeyboard,
  PasswordInput,
  Picker,
  RadioGroup,
  Radio,
  Rate,
  Search,
  Slider,
  Stepper,
  Switch,
  Uploader,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notify,
  PullRefresh,
  ShareSheet,
  SwipeCell,
  Badge,
  Circle,
  Collapse,
  CollapseItem,
  Divider,
  Empty,
  ImagePreview,
  List,
  NoticeBar,
  Popover,
  Step,
  Steps,
  Sticky,
  Swipe,
  SwipeItem,
  Tag,
  Grid,
  GridItem,
  IndexBar,
  IndexAnchor,
  NavBar,
  Pagination,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  TreeSelect,
  AddressEdit,
  AddressList,
  Area,
  Card,
]; //定义组件数组
export default {
  install(Vue) {
    vantUIs.forEach((vantUI) => {
      Vue.component(vantUI.name, vantUI); //注册组件
    });
  },
};
