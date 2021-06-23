<template>
  <div class="addcar">
    <!-- NavBar-->
    <van-nav-bar
      title="添加/修改爱车信息"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />

    <div class="inputbox">
      <van-row>
        <van-cell-group>
          <van-col span="16" offset="3">
            <van-form>
              <!--汽车类型-->
              <van-field
                readonly
                clickable
                name="picker"
                :value="type"
                label="汽车类型"
                placeholder="请选择"
                @click="showPicker1 = true"
              />
              <van-popup v-model="showPicker1" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="columns"
                  @confirm="onConfirm1"
                  @cancel="showPicker1 = false"
                />
              </van-popup>

              <!--车型品牌-->
              <van-field
                readonly
                clickable
                name="picker"
                :value="brand"
                label="车型品牌"
                placeholder="请选择"
                @click="showPicker2 = true"
              />
              <van-popup v-model="showPicker2" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="brands"
                  @confirm="onConfirm2"
                  @cancel="showPicker2 = false"
                />
              </van-popup>

              <!--购买价格-->
              <van-field
                v-model="price"
                label="购买价格（万）"
                placeholder="请输入"
              />

              <!--油箱容积-->
              <van-field
                v-model="bulk"
                label="油箱容积（升）"
                placeholder="请输入"
              />
            </van-form>
          </van-col>
        </van-cell-group>
      </van-row>
    </div>

    <div class="mycarcity">
      <van-cell
        is-link
        v-model="mycarmodel"
        title="省/市/区"
        value=""
        @click="showcarcity = true"
      ></van-cell>
      <van-popup v-model="showcarcity" position="bottom">
        <van-area
          ref="area"
          value="110000"
          :area-list="areaList"
          @change="onChange"
          @confirm="showcarcity = false"
          @cancel="showcarcity = false"
        />
      </van-popup>
    </div>
    <div class="buytime">
      <van-cell
        title="购买时间"
        is-link
        :value-class="className"
        :value="timeValue"
        @click="showPopup"
      />
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="请选择"
          :loading="isLoadingShow"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="show2 = false"
          @confirm="confirmPicker"
        />
      </van-popup>
    </div>
    <div class="savebtn">
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
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
  name: "Car",
  data() {
    return {
      tokenname: "",
      areaList,
      date: "",
      show: false,
      minDate: new Date(2019, 12, 31),
      maxDate: new Date(),
      isLoadingShow: true,
      currentDate: new Date(),
      className: "",
      timeValue: "",
      show2: false,
      show3: false,
      fieldValue: "",
      type: "",
      brand: "",
      price: "",
      bulk: "",
      car: {
        type: "",
        brand: "",
        price: "",
        bulk: "",
        city: "",
        time: "",
      },
      columns: ["轿车", "SUV", "MPV", "跑车", "微面", "微卡", "轻客", "皮卡"],
      brands: [
        "奥迪",
        "阿斯顿·马丁",
        "奔驰",
        "宝马",
        "本田",
        "别克",
        "保时捷",
        "宾利",
        "大众",
        "丰田",
        "法拉利",
        "海马",
        "观致",
        "红旗",
        "吉利汽车",
      ],
      showPicker1: false,
      showPicker2: false,
      showcarcity: false,
      mycarmodel: "",
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/me");
    },
    saveInfo() {
      if (
        this.timeValue == "" ||
        this.type == "" ||
        this.brand == "" ||
        this.price == "" ||
        this.bulk == "" ||
        this.mycarmodel == ""
      ) {
        this.$toast.fail("请完善爱车信息");
      } else {
        this.car.type = this.type;
        this.car.brand = this.brand;
        this.car.price = this.price;
        this.car.bulk = this.bulk;
        this.car.city = this.mycarmodel;
        this.car.time = this.timeValue;
        window.localStorage.setItem(
          "car-" + this.tokenname,
          JSON.stringify(this.car)
        );
        this.$toast.success("爱车信息添加成功");
        if (!this.back) {
          this.$router.go(-1);
        } else {
          this.$router.push({ path: this.back });
        }
      }
    },
    onChange(picker, value, index) {
      console.log("当前值：" + value + "当前索引：" + index);
      console.log(value);
      let areaName = "";
      for (var i = 0; i < value.length; i++) {
        areaName = areaName + value[i].name + " ";
      }
      this.mycarmodel = areaName;
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
    onConfirm1(value) {
      this.type = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.brand = value;
      this.showPicker2 = false;
    },
  },
};
</script>

<style scoped>
.seller .timeClass {
  color: #333;
}
.inputbox {
  margin: 0 auto;
  margin-top: 30px;
}
.btn {
  width: 80%;
  margin: 30px auto;
}
</style>
