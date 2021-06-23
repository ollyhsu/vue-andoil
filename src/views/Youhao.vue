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
          <van-cell title="记油耗" icon="fire-o" @click="toaddoil"> </van-cell>

          <van-cell title="记支出" icon="gold-coin-o" @click="toaddcost">
          </van-cell>

          <van-cell title="记收入" icon="after-sale"> </van-cell>
          <template #reference>
            <van-icon name="add-o" size="18" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>

    <!-- <h2>油耗</h2> -->

    <div class="infobox">
      <div class="boxshow">
        <van-row type="flex" justify="center">
          <!-- <h3>最新油耗</h3> -->
          <van-col span="16" class="line1">最新油耗</van-col>
          <van-col span="16" class="line2">升/百公里</van-col>
          <van-col span="16" class="line3">{{ zxyh }}</van-col>
        </van-row>
      </div>
      <div class="boxbtn">
        <van-row type="flex" justify="center">
          <van-col span="12" class="leftbtnbox" @click="toCarSet"
            >{{ this.carname }} &gt;</van-col
          >
          <van-col span="12" class="rightbtnbox" @click="toOilInfo"
            >油耗记录 &gt;</van-col
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
            <span class="boxtext1">平均油耗</span>

            <br /><span class="boxtext2">{{ npjyh }}</span
            ><br /><span class="boxtext3" style="margin-left: 12%"
              >升/百公里</span
            ></van-cell
          >
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">平均行程</span><br /><span
              class="boxtext2"
              >{{ npjxc }}</span
            ><br /><span class="boxtext3" style="margin-left: 20%"
              >公里/天</span
            >
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">平均油费</span><br /><span
              class="boxtext2"
              >{{ npjyf }}</span
            ><br /><span class="boxtext3" style="margin-left: 22%"
              >元/公里</span
            >
          </van-cell>
        </van-row>
      </van-grid-item>

      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">累计里程</span><br /><span
              class="boxtext2"
              >{{ nljlc }}</span
            ><br /><span class="boxtext3" style="margin-left: 28%">公里</span>
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">累计加油</span><br /><span
              class="boxtext2"
              >{{ nljjy }}</span
            ><br /><span class="boxtext3" style="margin-left: 40%">升</span>
          </van-cell>
        </van-row>
      </van-grid-item>
      <van-grid-item>
        <van-row>
          <van-cell class="infosbox"
            ><span class="boxtext1">加油周期</span><br /><span
              class="boxtext2"
              >{{ njyzq }}</span
            ><br /><span class="boxtext3" style="margin-left: 40%">天</span>
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
      ljyh: "null",
      pjxs: "null",
      jyzq: "null",
      ljlc: "null",
      ljjy: "null",
      pjyf: "null",
      ca: {
        type: "",
        brand: "",
        price: "",
        bulk: "",
        city: "",
        time: "",
      },
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
    if (this.fuels == null) {
      this.flength = 0;
      console.log("无油耗信息");
      // this.$toast.fail("无油耗信息");
    } else {
      // this.carname = this.ca.brand; //汽车品牌

      this.flength = this.fuels.length;
    }
  },

  methods: {
    toaddoil() {
      this.$router.push("/addoil");
    },
    toaddcost() {
      this.$router.push("/addcost");
    },
    toCarSet() {
      this.$router.push("/carset");
    },
    toOilInfo() {
      this.$router.push("/oilinfo");
    },
  },
  computed: {
    zxyh: {
      // 最新油耗
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 2) {
          data = 0;
        } else {
          var volc =
            parseInt(this.fuels[nl].volume) -
            parseInt(this.fuels[nl - 1].volume);

          var lcc =
            parseInt(this.fuels[nl].zlc) - parseInt(this.fuels[nl - 1].zlc);

          data = (volc / lcc) * 100.0;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    npjyh: {
      //平均油耗
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 2) {
          data = 0;
        } else {
          var youhao =
            parseInt(this.fuels[nl].volume) - parseInt(this.fuels[1].volume);
          var zlcc = parseInt(this.fuels[nl].zlc) - parseInt(this.fuels[1].zlc);
          data = (youhao / zlcc) * 100;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    npjxc: {
      //平均行程
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 2) {
          data = 0;
        } else {
          var date0 = new Date(this.fuels[1].time);
          var date2 = new Date(this.fuels[nl].time);
          var date = (date2 - date0) / 86400000;

          var zlcs = this.fuels[nl].zlc;
          data = zlcs / date;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    npjyf: {
      // 平均油费
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 2) {
          data = 0;
        } else {
          var vsum = 0,
            sumtop = 0;
          var sumlc = this.fuels[nl].zlc;
          for (var i = nl; i >= 1; i--) {
            vsum = parseInt(this.fuels[i].volume) + vsum;

            sumtop =
              parseInt(this.fuels[i].volume) * parseInt(this.fuels[i].price) +
              sumtop;
          }
          data = sumtop / sumlc;
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    nljlc: {
      // 累计里程数
      get() {
        let nl = this.flength - 1;
        var data;
        if (nl < 1) {
          data = 0;
        } else {
          data = parseInt(this.fuels[nl].zlc);
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    nljjy: {
      // 累计加油次数
      get() {
        let nl = this.flength - 1;
        var data = 0;
        if (nl < 1) {
          data = 0;
        } else {
          for (var i = nl; i >= 1; i--) {
            data = parseInt(this.fuels[i].volume) + data;
          }
        }
        data = data.toFixed(2);
        return data;
      },
      set() {},
    },
    njyzq: {
      // 加油周期
      get() {
        let nl = this.flength - 1;
        var data = 0.0;
        if (nl < 2) {
          data = 0.0;
        } else {
          var date1 = new Date(this.fuels[nl].time);
          var date2 = new Date(this.fuels[nl - 1].time);
          var date = (date1 - date2) / 86400000;
          data = date;
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
  background: linear-gradient(90deg, #b32fce, #73abc5);
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
  background-color: #c9eff1;
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
  text-align: center;
  font-size: 12px;
  color: rgb(152, 161, 167);
}
</style>
