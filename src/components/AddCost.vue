<template>
  <div class="Addoil">
    <!-- NavBar-->
    <van-nav-bar
      title="记支出"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <div class="notice">
      <van-notice-bar mode="closeable" left-icon="volume-o"
        >若Storage中无costs的Key，请先点击
        <van-tag plain type="primary" @click="CostInit">初始化</van-tag>
      </van-notice-bar>
    </div>

    <div class="inoilinfo">
      <!-- 记录消费时间 -->
      <van-row>
        <van-col span="22" offset="2">
          <van-field
            readonly
            clickable
            label="消费时间"
            :value="timeValue"
            v-model="timeValue"
            placeholder="请选择"
            @click="showPopup"
          />
        </van-col>
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
      </van-row>

      <!-- 消费金额 -->
      <van-row>
        <van-col span="22" offset="2">
          <van-field
            v-model="price"
            placeholder="请输入消费金额"
            type="number"
            label="金额(元)"
          />
        </van-col>
      </van-row>
      <!--消费类型-->
      <van-row>
        <van-col span="22" offset="2">
          <van-field
            readonly
            clickable
            label="消费类型"
            :value="type"
            placeholder="请选择"
            @click="showPicker = true"
          />
        </van-col>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirmLx"
          />
        </van-popup>
      </van-row>

      <!-- 备注消息 -->
      <van-row>
        <van-col span="22" offset="2">
          <van-field
            v-model="msg"
            rows="2"
            autosize
            label="备注"
            type="textarea"
            maxlength="50"
            placeholder="请输入备注信息"
            show-word-limit
          />
        </van-col>
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
  name: "AddCost",
  data() {
    return {
      date: "",
      show: false,
      minDate: new Date(2009, 12, 31),
      maxDate: new Date(),
      isLoadingShow: true,
      currentDate: new Date(),
      className: "",
      value: "",
      type: "",
      showPicker: false,
      timeValue: "",
      show2: false,
      msg: "",
      columns: [
        "小保养",
        "大保养",
        "保险",
        "罚款",
        "修车",
        "停车费",
        "洗车",
        "过路费",
        "其他",
      ],
      result: [],
      price: 0,
      costsInit: [{ id: 0, time: "", price: "", type: "", msg: "" }],
      cost: { id: 0, time: "", price: "", type: "", msg: "" },
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }
    //读取LocalStorage数据
    this.ck = JSON.parse(
      window.localStorage.getItem("costs-" + this.tokenname)
    );
    if (!this.ck) {
      this.$toast.fail("无存储对象，请先初始化！");
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
    CostInit() {
      let costsInit = this.costsInit;
      window.localStorage.setItem(
        "costs-" + this.tokenname,
        JSON.stringify(costsInit)
      );
    },
    cancelFn() {
      this.show = false;
    },
    onConfirmLx(type) {
      this.type = type;
      this.showPicker = false;
    },
    saveInfo() {
      if (this.timeValue == "" || this.price == 0) {
        this.$toast.fail("请完善花费记录");
      } else {
        let costs = this.costs;
        this.costs = JSON.parse(
          window.localStorage.getItem("costs-" + this.tokenname) || null
        );
        let cid = this.costs.length;
        this.cost.id = cid;
        this.cost.time = this.timeValue;
        this.cost.price = this.price;
        this.cost.type = this.type;
        this.cost.msg = this.msg;
        this.costs.push(this.cost);
        costs = this.costs;
        window.localStorage.setItem(
          "costs-" + this.tokenname,
          JSON.stringify(costs)
        );

        this.$toast.success("消费记录添加成功");
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
      // console.log(this.timeValue);
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
.mytext {
  font-size: 14px;
  text-align: left;
}
</style>
