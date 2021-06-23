<template>
  <div class="oilInfo">
    <!-- NavBar-->
    <van-nav-bar
      title="油耗详情"
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    >
      <template #right>
        <van-icon name="add-o" size="18" @click="toaddoil" />
      </template>
    </van-nav-bar>

    <div class="showoillist">
      <div class="oilinfohead">
        <van-row type="flex" justify="center">
          <van-col span="6"> <span>加油日期</span></van-col>
          <van-col span="6"><span>单价(元/升)</span></van-col>
          <van-col span="6"><span>加油量(升)</span></van-col>
          <van-col span="6"><span>里程数(Km)</span></van-col>
        </van-row>
      </div>

      <div class="listinfo">
        <van-row
          v-for="(item2, index2) in fuels"
          :key="index2"
          type="flex"
          justify="center"
          class="listinfo"
        >
          <van-col span="6">{{ item2.time }}</van-col>
          <van-col span="6">{{ item2.price }}</van-col>
          <van-col span="6">{{ item2.volume }}</van-col>
          <van-col span="6">{{ item2.zlc }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowoilInfo",
  data() {
    return {
      tokenname: "",
      fuels: [
        {
          id: 0,
          time: "2021-06-23 00:09",
          price: "10",
          volume: "10",
          zlc: "120",
          syyl: 31,
        },
      ],
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }
    //读取LocalStorage数据
    this.fuels = JSON.parse(
      window.localStorage.getItem("fuels-" + this.tokenname) || null
    );
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: this.back });
      }
    },
    toaddoil() {
      this.$router.push("/addoil");
    },
  },
};
</script>
<style scoped>
.oilinfohead {
  padding: 10px;
  font-size: 16px;
  background-color: aqua;
  margin: 0;
}
.listinfo {
  font-size: 14px;
  padding: 5px;
}
</style>
