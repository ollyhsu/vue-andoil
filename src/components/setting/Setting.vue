<template>
  <div class="setting">
    <!-- NavBar-->
    <van-nav-bar
      title="账户设置"
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <van-notice-bar mode="closeable"
      >用户名不可更改哦，修改密码进行身份验证！</van-notice-bar
    >
    <div class="seting-box">
      <div class="input-item">
        <van-field
          v-model="nickName"
          label="昵称"
          :clearable="true"
          :required="true"
        />
        <van-field
          v-model="uname"
          label="用户名"
          :clearable="true"
          disabled
          :required="true"
        />
        <van-field v-model="Bio" label="个性签名" :clearable="true" />
      </div>
      <van-cell is-link @click="changePwd">修改密码</van-cell>
      <van-button
        class="save-btn"
        color="#1baeae"
        type="primary"
        @click="save"
        round
        block
        >保存修改</van-button
      >
      <van-button
        class="save-btn"
        color="#c0c0c0"
        type="primary"
        @click="logout"
        block
        round
        >退出登录</van-button
      >
    </div>

    <!-- <FooterItem /> -->
  </div>
</template>

<script>
import storage from "@/mydata/storage.js";
// import FooterItem from "@/components/FooterItem.vue";
export default {
  name: "Setting",
  components: {
    // FooterItem,
  },
  data() {
    return {
      tokenname: "",
      uname: "",
      nickName: "",
      password: "",
      Bio: "",
      show: false,
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
    changePwd() {
      this.$dialog
        .confirm({
          title: "身份验证",
          message: "请确认是否继续修改密码",
        })
        .then(() => {
          // on confirm
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
          });
          this.$router.push("/changepwd");
        })
        .catch(() => {
          // on cancel
        });
    },
    save() {
      var userdata = storage.get("userinfo-" + this.tokenname);
      if (this.nickName == "") {
        this.$toast.fail("昵称不可为空");
      } else {
        var newdata = {
          uname: userdata.uname,
          nickName: this.nickName,
          password: userdata.password,
          Bio: this.Bio,
        };
        var keyname = "userinfo-" + this.tokenname;
        storage.set(keyname, newdata);
        this.$toast.success("修改成功");
      }
    },
    logout() {
      this.$toast.fail("已退出登录");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.seting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
