<template>
  <div class="user-box">
    <!-- NavBar-->
    <van-nav-bar
      title="个人中心"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <div class="user-info">
      <div class="info">
        <img src="..\assets\user-graduate.png" alt="" />
        <div class="user-desc">
          <table style="text-align: left">
            <tr>
              <td>昵称：</td>
              <td>{{ this.nickName }}</td>
            </tr>
            <tr>
              <td>用户名：</td>
              <td>{{ this.uname }}</td>
            </tr>
            <tr>
              <td>个性签名:</td>
              <td>{{ this.Bio }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <ul class="user-list">
      <li @click="goTo('setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('carset')">
        <span>车辆管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('')">
        <span>费用管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('')">
        <span>使用帮助</span>
        <van-icon name="arrow" />
      </li>

      <li @click="goTo('')">
        <span>一键反馈</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <FooterItem />
  </div>
</template>
<script>
// @ is an alias to /src
import FooterItem from "@/components/FooterItem.vue";
import storage from "../mydata/storage.js";
export default {
  name: "Me",
  components: {
    FooterItem,
  },
  data() {
    return {
      tokenname: "",
      uname: "",
      nickName: "",
      password: "",
      Bio: "",
    };
  },
  created() {
    let tokeninfo = this.$local.get("token");
    if (tokeninfo) {
      this.tokenname = tokeninfo.tokenname;
    }
  },
  mounted() {
    var data = storage.get("userinfo-" + this.tokenname);
    this.uname = data.uname;
    this.nickName = data.nickName;
    this.password = data.password;
    this.Bio = data.Bio;
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: this.back });
      }
    },
    goTo(r) {
      this.$router.push({ path: r });
    },
  },
};
</script>

<style lang="less" scoped>
.user-box {
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #1baeae, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 30px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>
