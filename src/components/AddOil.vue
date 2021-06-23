<template>
  <div class="Addoil">
    <!-- NavBar-->
    <van-nav-bar
      title="记油耗"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <div class="notice">
      <van-notice-bar mode="closeable" left-icon="volume-o"
        >若Storage中无fuels的Key，请先点击
        <van-tag plain type="primary" @click="OilInit">初始化</van-tag>
      </van-notice-bar>
    </div>

    <div class="inoilinfo">
      <!-- 设置加油时间 -->
      <div class="seller">
        <van-cell
          title="加油时间"
          is-link
          :value-class="className"
          :value="timeValue"
          @click="showPopup"
        />
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择时间"
            :loading="isLoadingShow"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @cancel="cancelFn"
            @confirm="confirmPicker"
          />
        </van-popup>
      </div>
      <!-- 设置当前总里程数 -->
      <van-row>
        <van-cell-group>
          <van-col offset="2" span="22">
            <van-field
              v-model="zlc"
              type="number"
              :placeholder="licheng"
              label="总里程(km)"
            />
          </van-col>
        </van-cell-group>
      </van-row>
      <van-divider />
      <!-- 设置加油金额 -->
      <van-row>
        <van-col offset="1" span="23">
          <span class="lab1">油量（升） x 单价（元/升）= 总金额（元）*</span>
        </van-col>
        <van-col span="5" offset="2">
          <van-field
            v-model="volume"
            type="number"
            placeholder="0"
            class="pinput"
          />
        </van-col>
        <van-col span="2">
          <span class="lab1"> x </span>
        </van-col>
        <van-col span="5">
          <van-field
            v-model="price"
            type="number"
            placeholder="0"
            class="pinput"
          />
        </van-col>
        <van-col span="2">
          <span class="lab1"> = </span>
        </van-col>
        <van-col span="6">
          <van-field
            v-model="sum"
            type="number"
            placeholder="0"
            disabled
            class="pinput"
          />
        </van-col>
      </van-row>

      <van-divider />
      <van-row>
        <van-col span="24">
          <span class="lab1">加油前剩余油量 {{ this.syyl }}% </span>
        </van-col>
      </van-row>

      <van-row style="padding: 30px" type="flex" justify="center">
        <van-col span="18">
          <van-slider v-model="syyl" />
        </van-col>
      </van-row>

      <van-row>
        <van-cell title="是否加满" value="">
          <template #right-icon>
            <van-switch v-model="checked1" size="24" />
          </template>
        </van-cell>

        <van-cell title="上次是否漏记" value="">
          <template #right-icon>
            <van-switch v-model="checked2" size="24" />
          </template>
        </van-cell>
      </van-row>
    </div>
    <van-button
      class="btn"
      color="#1baeae"
      type="primary"
      @click="saveInfo"
      round
      block
      >保存修改</van-button
    >
  </div>
</template>
<script>
export default {
  name: "AddOil",
  data() {
    return {
      tokenname: "",
      date: "",
      show: false,
      minDate: new Date(2009, 12, 31),
      maxDate: new Date(),
      isLoadingShow: true,
      currentDate: new Date(),
      className: "",
      timeValue: "请选择时间",
      price: 0,
      volume: 0,
      licheng: "当前总里程数",
      zlc: "",
      syyl: 50,
      checked1: true,
      checked2: false,
      fuel: {
        id: 0,
        time: "",
        price: "",
        volume: "",
        zlc: "",
        syyl: "",
      },
      fuelsInit: [
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
    //读取LocalStorage数据
    this.ck = JSON.parse(
      window.localStorage.getItem("fuels-" + this.tokenname)
    );
    if (!this.ck) {
      this.$toast.fail("无存储对象，请先初始化！");
    }
  },
  computed: {
    sum: {
      get() {
        return this.price * this.volume;
      },
      set() {},
    },
  },
  methods: {
    goBack() {
      this.$router.push("/youhao");
    },
    OilInit() {
      let fuelsInit = this.fuelsInit;
      window.localStorage.setItem(
        "fuels-" + this.tokenname,
        JSON.stringify(fuelsInit)
      );
    },
    cancelFn() {
      this.show = false;
    },
    saveInfo() {
      if (
        this.timeValue == "" ||
        this.price == 0 ||
        this.volume == 0 ||
        this.zlc == ""
      ) {
        this.$toast.fail("请完整填写油耗记信息");
      } else {
        let fuels = this.fuels;
        this.fuels = JSON.parse(
          window.localStorage.getItem("fuels-" + this.tokenname) || null
        );
        let fid = this.fuels.length;
        this.fuel.id = fid;
        this.fuel.time = this.timeValue;
        this.fuel.price = this.price;
        this.fuel.volume = this.volume;
        this.fuel.zlc = this.zlc;
        this.fuel.syyl = this.syyl;
        this.fuels.push(this.fuel);
        fuels = this.fuels;
        window.localStorage.setItem(
          "fuels-" + this.tokenname,
          JSON.stringify(fuels)
        );
        this.$toast.success("油耗记录成功");
        if (!this.back) {
          this.$router.go(-1);
        } else {
          this.$router.push({ path: this.back });
        }
      }
    },
    /*日期*/
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    // 显示弹窗
    showPopup() {
      this.show = true;
      this.isLoadingShow = true;
      setTimeout(() => {
        this.isLoadingShow = false;
      }, 500);
    },
    // 确认选择的时间
    confirmPicker(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`;
      console.log(this.timeValue);
      this.show = false;
    },
    // 选项格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value;
    },
  },
};
</script>

<style scoped>
.seller .timeClass {
  color: rgb(34, 27, 27);
}
.inoilinfo {
  margin: 0 auto;
  padding-top: 20px;
}

.lab1 {
  font-size: 16px;
}
.pinput {
  color: blue;
  background-color: #eeeef0;
  border-radius: 10%;
}
.btn {
  width: 80%;
  margin: 20px auto;
}
</style>
