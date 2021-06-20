<template>
  <div class="youhao">
    <!-- NavBar-->
    <van-nav-bar title="我的油耗">
      <template #left>
        <div>
          <router-link to="/me"
            ><van-icon name="user-circle-o" size="18"
          /></router-link>
        </div>
      </template>

      <template #right>
        <van-popover
          v-model="showPopover"
          trigger="click"
          placement="bottom-end"
        >
          <van-cell title="记油耗" icon="fire-o"> </van-cell>

          <van-cell title="记支出" icon="gold-coin-o"> </van-cell>

          <van-cell title="记收入" icon="after-sale"> </van-cell>
          <template #reference>
            <van-icon name="add-o" size="18" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>

    <h2>油耗</h2>

    <!-- <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      文字
    </van-divider>

    <van-grid :border="false" :column-num="3">
      <van-grid-item> 1 </van-grid-item>
      <van-grid-item> 2 </van-grid-item>
      <van-grid-item> 3 </van-grid-item>

      <van-grid-item> 1 </van-grid-item>
      <van-grid-item> 2 </van-grid-item>
      <van-grid-item> 3 </van-grid-item>
    </van-grid> -->
    <FooterItem />
  </div>
</template>
<script>
// @ is an alias to /src
import FooterItem from "@/components/FooterItem.vue";
export default {
  name: "Youhao",
  components: {
    FooterItem,
  },
  data() {
    return {
      showPopover: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$toast("返回");
    },
    onClickRight() {
      this.$toast("按钮");
    },
    onSelect(action) {
      this.$toast(action.text);
    },
  },
};
</script>
