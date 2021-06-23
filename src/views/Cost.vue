<template>
  <div class="Cost">
    <!-- NavBar-->
    <van-nav-bar
      title="我的消费"
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    >
      <template #right>
        <van-icon name="add-o" size="18" @click="toaddcost" />
      </template>
    </van-nav-bar>

    <div class="infobox">
      <div class="boxshow">
        <van-row type="flex" justify="center">
          <!-- <h3>最新油耗</h3> -->
          <van-col span="16" class="line1">平均消费</van-col>
          <van-col span="16" class="line2">元/月</van-col>
          <van-col span="16" class="line3">{{ npjmy }}</van-col>
        </van-row>
      </div>
      <div class="boxbtn">
        <van-row type="flex" justify="center">
          <van-col span="12" class="leftbtnbox" @click="toCarSet"
            >{{ this.carname }} &gt;</van-col
          >
          <van-col span="12" class="rightbtnbox" @click="toCostinfo"
            >消费记录 &gt;</van-col
          >
        </van-row>
      </div>
    </div>
    <van-divider />
    <van-divider />

    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox">
            <span class="boxtext1">累计支出</span>
            <br /><span class="boxtext2">{{ nljzc }}</span
            ><br /><span class="boxtext3">元</span></van-cell
          >
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">累计油费</span><br /><span
              class="boxtext2"
              >{{ nljyf }}</span
            ><br /><span class="boxtext3">元</span>
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">其他费用</span><br /><span
              class="boxtext2"
              >{{ nljqtfy }}</span
            ><br /><span class="boxtext3">元</span>
          </van-cell>
        </van-row>
      </van-grid-item>

      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1" style="font-size: 14px">每公里油费</span
            ><br /><span class="boxtext2">{{ nmglyf }}</span
            ><br /><span class="boxtext3">元</span>
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1" style="font-size: 14px">每公里综合</span
            ><br /><span class="boxtext2">{{ nmglzh }}</span
            ><br /><span class="boxtext3">元</span>
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">平均每天</span><br /><span
              class="boxtext2"
              >{{ npjmt }}</span
            ><br /><span class="boxtext3">元</span>
          </van-cell>
        </van-row>
      </van-grid-item>
    </van-grid>
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
      carname: "无车辆",
      showPopover: false,
      tokenname: "",
      flength: "",
      cslength: "",
      oilcost: "",
      ca: {
        type: "",
        brand: "",
        price: "",
        bulk: "",
        city: "",
        time: "",
      },
      costs: { id: 0, time: "", price: "", type: "", msg: "" },
      fuels: [
        {
          id: 0,
          time: "",
          price: "",
          volume: "",
          zlc: "",
          syyl: "",
        },
      ],
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
      this.carname = this.ca.brand; //汽车品牌
    }
  },
  mounted() {
    //读取LocalStorage数据
    this.fuels = JSON.parse(
      window.localStorage.getItem("fuels-" + this.tokenname)
    );

    this.costs = JSON.parse(
      window.localStorage.getItem("costs-" + this.tokenname)
    );
    // if (!this.fuels) {
    //   this.flength = 0;
    //   console.log("无油耗信息");
    // } else {
    //   this.flength = this.fuels.length;
    // }
    if (!this.fuels || this.fuels.length<1) {
      this.flength = 0;
      console.log("无油耗信息");
    } else {
      this.flength = this.fuels.length;
    }

    if (!this.costs || this.costs.length<=1) {
      this.cslength = 0;
      console.log("无消费信息1");
      // this.$toast.fail("无存储对s象，请先初始化！");
    } else {
      this.cslength = this.costs.length;
      // console.log("无消费信息2");
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
    toaddcost() {
      this.$router.push("/addcost");
    },
    toCarSet() {
      this.$router.push("/carset");
    },
    toCostinfo() {
      this.$router.push("/costinfo");
    },
  },
  computed: {
    nljzc: {
      //累计支出
      get() {
        let nl = this.flength - 1;
        let cnl = this.cslength - 1;
        var data = 0;
        if (nl < 1 && cnl < 1) {
          data = 0;
        } else {
          var sumtop = 0;
          var sumq = 0;
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          for (var j = cnl; j >= 1; j--) {
            sumq = parseInt(this.costs[j].price) + sumq;
          }

          data = sumtop + sumq;
        }
        data = data.toFixed(2);

        return data;
      },
      set() {},
    },
    nljyf: {
      //累计油费
      get() {
        let nl = this.flength - 1;
        // console.log(nl)
        var data = 0;
        if (nl < 1) {
          data = 0;
        } else {
          var sumtop = 0;
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          data = sumtop;
        }
        data = data.toFixed(2);

        return data;
      },
      set() {},
    },
    nljqtfy: {
      //其他费用
      get() {
        let nl = this.cslength - 1;
        var data = 0;
        if (nl < 1) {
          data = 0;
        } else {
          var sumq = 0;
          for (var i = nl; i >= 1; i--) {
            sumq = parseInt(this.costs[i].price) + sumq;
          }
          data = sumq;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    nmglyf: {
      //每公里油费
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 1) {
          data = 0;
        } else {
          var sumtop = 0;
          var zlc = parseInt(this.fuels[nl].zlc);
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          data = sumtop / zlc;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    nmglzh: {
      //每公里综合
      get() {
        let nl = this.flength - 1;
        let cnl = this.cslength - 1;
        var data = 0;
        if (nl < 1 && cnl < 1) {
          data = 0;
        } else {
          var sumtop = 0;
          var sumq = 0;
          var zlc = parseInt(this.fuels[nl].zlc);
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          for (var j = cnl; j >= 1; j--) {
            sumq = parseInt(this.costs[j].price) + sumq;
          }

          data = (sumtop + sumq) / zlc;
        }
        data = data.toFixed(2);

        return data;
      },
      set() {},
    },
    npjmt: {
      //平均每天
      get() {
        let nl = this.flength - 1;
        let cnl = this.cslength - 1;
        var data = 0;
        var day;
        if (nl < 1 || cnl < 1) {
          data = 0;
        } else {
          var date1 = new Date(this.fuels[nl].time);
          var date2 = new Date(this.fuels[1].time);
          var day1 = (date1 - date2) / 86400000;
          var date3 = new Date(this.costs[nl].time);
          var date4 = new Date(this.costs[1].time);
          var day2 = (date3 - date4) / 86400000;

          if (day1 > day2) {
            day = day1;
          } else {
            day = day2;
          }

          var sumtop = 0;
          var sumq = 0;
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          for (var j = cnl; j >= 1; j--) {
            sumq = parseInt(this.costs[j].price) + sumq;
          }

          data = (sumtop + sumq) / day;
        }
        data = data.toFixed(2);

        return data;
      },
      set() {},
    },
    npjmy: {
      //平均每月
      get() {
        let nl = this.flength - 1;
        let cnl = this.cslength - 1;
        var data = 0;
        var month;
        if (nl <= 1 || cnl <= 1) {
          data = 0;
        } else {
          var date1 = new Date(this.fuels[nl].time);
          var date2 = new Date(this.fuels[1].time);
          let month1 = Math.floor((date1 - date2) / (24 * 3600 * 1000)) / 30;
          var date3 = new Date(this.costs[nl].time);
          var date4 = new Date(this.costs[1].time);
          var month2 = Math.floor((date3 - date4) / (24 * 3600 * 1000)) / 30;

          if (month1 > month2) {
            month = month1;
          } else {
            month = month2;
          }

          var sumtop = 0;
          var sumq = 0;
          for (var i = nl; i >= 1; i--) {
            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          for (var j = cnl; j >= 1; j--) {
            sumq = parseInt(this.costs[j].price) + sumq;
          }

          data = (sumtop + sumq) / month;
        }
        data = data.toFixed(2);

        return data;
      },
      set() {},
    },
  },
};
</script>
<style scoped>
.infobox {
  width: 94%;
  margin: 10px;
  height: 200px;
  background: linear-gradient(90deg, #c28b26, #dbce11);
  box-shadow: 0 2px 5px #269090;
  border-radius: 6px;
}
.boxshow {
  margin: 0 auto;
  text-align: center;
}
.line1 {
  margin-top: 15px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: white;
}
.line2 {
  padding: 3%;
  font-size: 16px;
  color: white;
  font: 12px/1 Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
}
.line3 {
  font-size: 48px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}
.leftbtnbox {
  color: white;
  font-size: 18px;
  padding-right: 20px;
  padding-top: 3%;
}
.rightbtnbox {
  color: white;
  font-size: 18px;
  padding-left: 20px;
  padding-top: 3%;
}
.infosbox {
  background-color: #dfd7d0;
  width: 100%;
  box-shadow: 0 2px 5px #267290;
  border-radius: 5px;
}
.boxtext1 {
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  color: rgb(84, 170, 182);
}
.boxtext2 {
  margin: 0 auto;
  margin-left: 8%;
  text-align: center;
  font-size: 16px;
  color: rgb(129, 122, 165);
}
.boxtext3 {
  margin: 0 auto;
  margin-left: 40%;
  text-align: center;
  font-size: 12px;
  color: rgb(152, 161, 167);
}
</style>
