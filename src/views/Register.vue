<template>
  <div class="register-box">
    <h3>注册</h3>
    <van-form>
      <van-cell-group border class="input-item">
        <van-field
          label="账号"
          v-model="uname"
          placeholder="输入用户名"
          :required="true"
        ></van-field>
        <van-field
          label="密码"
          v-model="password1"
          placeholder="请输入密码"
          type="password"
          :required="true"
        ></van-field>
        <van-field
          label="确认密码"
          v-model="password2"
          placeholder="请再次输入密码"
          type="password"
          :required="true"
        ></van-field>
      </van-cell-group>

      <p class="loginchoice">
        已有账号？<router-link to="/login">立即登录</router-link>
      </p>
      <van-button
        class="save-btn"
        color="#1baeae"
        type="primary"
        @click="register"
        block
        round
        >注册</van-button
      >
    </van-form>
  </div>
</template>

<script>
import storage from "@/mydata/storage.js";
export default {
  data() {
    return {
      uname: "",
      nickName: "",
      password1: "",
      password2: "",
      Bio: "用心记录美好生活！",
    };
  },
  methods: {
    register: function () {
      if (this.uname == "" || this.password1 == "" || this.password2 == "") {
        // alert("用户名和密码不能为空");
        this.$toast.fail({
          message: "用户名和密码不能为空",
          forbidClick: true,
        });
      } else if (this.password2 != this.password1) {
        // alert("两次密码不一样");
        this.$toast.fail({ message: "两次密码不一样", forbidClick: true });
      } else {
        var data = {
          uname: this.uname,
          nickName: this.uname,
          password: this.$md5(this.password1),
          Bio: this.Bio,
        };
        var keyname = "userinfo-" + this.uname;
        storage.set(keyname, data);
        this.$toast.success("注册成功");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-box {
  .input-item {
    margin-top: 44px;
  }
  .loginchoice {
    padding-right: 10px;
    font-size: 12px;
    text-align: right;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
