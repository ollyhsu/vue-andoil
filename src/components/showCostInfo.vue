<template>
  <div class="CostInfo">
    <!-- <p>花费展示页</p> -->
    <!-- NavBar-->
    <van-nav-bar
      title="消费详情"
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    >
      <template #right>
        <van-icon name="add-o" size="18" @click="toaddcost" />
      </template>
    </van-nav-bar>

    <div class="showCostInfo">
      <div class="costInfoHead">
        <van-row type="flex" justify="center">
          <van-col span="8">日期</van-col>
          <van-col span="8">金额(元)</van-col>
          <van-col span="8">类型</van-col>
        </van-row>
      </div>

      <div class="list">
        <van-row
          v-for="(item2, index2) in costs"
          :key="index2"
          type="flex"
          justify="center"
          class="listinfo"
        >
          <van-col span="8">{{ item2.time }}</van-col>
          <van-col span="8">{{ item2.price }}</van-col>
          <van-col span="8">{{ item2.type }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CostInfo",
  data() {
    return {
      tokenname: "",
      costs: [
        {
          id: 0,
          time: "null",
          price: "null",
          type: "null",
          msg: "null",
          uname: "qqq",
        },
      ],
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }

    this.costs = JSON.parse(
      window.localStorage.getItem("costs-" + this.tokenname) || null
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
    toaddcost() {
      this.$router.push("/addcost");
    },
  },
};
</script>

<style scoped>
.costInfoHead {
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
