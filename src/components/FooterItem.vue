<template>
  <div class="footer">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <!-- 给tabbar--route属性  然后给每一项to属性就可以路由跳转了 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="fire-o" to="/youhao">油耗</van-tabbar-item>
      <van-tabbar-item icon="balance-o" to="/cost">消费</van-tabbar-item>
      <!-- <van-tabbar-item icon="chat-o" to="/discover">发现</van-tabbar-item> -->
      <van-tabbar-item icon="user-circle-o" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterItem",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
