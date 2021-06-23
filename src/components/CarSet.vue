<template>
  <div class="CarSet">
    <!-- NavBar-->
    <van-nav-bar
      title="我的爱车信息"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <div class="carInfo">
      <van-cell-group>
        <van-cell
          center
          v-for="(item, index) in car"
          :key="index"
          :title="item.pro"
          :value="item.value"
        />
      </van-cell-group>
    </div>
    <div class="savebtn">
      <van-button
        class="btn"
        color="#1baeae"
        type="primary"
        @click="saveInfo"
        round
        block
        >添加 / 修改</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      tokenname: "",
      car: [
        { pro: "汽车类型", value: "无车辆信息" },
        { pro: "车型品牌", value: "无车辆信息" },
        { pro: "购买价格（万）", value: "无车辆信息" },
        { pro: "油箱容积（L）", value: "无车辆信息" },
        { pro: "用车城市", value: "无车辆信息" },
        { pro: "提车时间", value: "无车辆信息" },
      ],
      ca: {
        type: "",
        brand: "",
        price: "",
        bulk: "",
        city: "",
        time: "",
      },
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }
    this.ca = JSON.parse(
      window.localStorage.getItem("car-" + this.tokenname) || null
    );
    if (!this.ca) {
      this.$toast.fail("无车辆信息");
    } else {
      this.car[0].value = this.ca.type; //汽车类型
      this.car[1].value = this.ca.brand; //汽车品牌
      this.car[2].value = this.ca.price; //购买价格
      this.car[3].value = this.ca.bulk; //油箱容积
      this.car[4].value = this.ca.city; //用车城市
      this.car[5].value = this.ca.time; //提车时间
    }
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: this.back });
      }
    },
    saveInfo() {
      this.$router.push("/addcar");
    },
  },
};
</script>

<style scoped>
.carInfo {
  margin: 0 auto;
  margin-top: 30px;
}
.btn {
  width: 80%;
  margin: 30px auto;
}
</style>
