<template>
  <div class="login-box">
    <h3>登录</h3>
    <van-form>
      <van-cell-group border>
        <van-field
          label="账号"
          ref="tokenname"
          v-model="uname"
          :clearable="true"
          :required="true"
          placeholder="输入用户名"
        ></van-field>
        <van-field
          label="密码"
          v-model="password"
          placeholder="请输入密码"
          :clearable="true"
          type="password"
          :required="true"
        ></van-field>
      </van-cell-group>

      <p class="registerchoice">
        没有有账号？<router-link to="/register">立即注册</router-link>
      </p>
      <van-button
        class="save-btn"
        color="#1baeae"
        type="primary"
        @click="onLogin"
        block
        round
        >登录</van-button
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
      password: "",
    };
  },
  methods: {
    async onLogin() {
      if (this.uname == "" || this.$md5(this.password) == "") {
        this.$toast.fail({
          message: "用户名和密码不能为空",
          forbidClick: true,
        });
      } else {
        var data = storage.get("userinfo-" + this.uname);
        if (data == null || data.length == 0) {
          // this.$toast("用户名不存在，请注册");
          this.$toast({
            message: "用户名不存在，请注册",
            forbidClick: true,
          });
          this.$router.push("/register");
          // alert("用户名不存在，请注册");
        } else if (
          this.uname != data.uname ||
          this.$md5(this.password) != data.password
        ) {
          // alert("用户名或密码错误");
          this.$toast("用户名或密码错误");
        } else {
          let tname = this.$refs.tokenname.value;
          this.$local.set("token", { tokenname: tname });
          // alert("登录成功");
          this.$toast.success("登录成功");
          this.$router.push("/youhao");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  .input-item {
    margin-top: 44px;
  }
  .registerchoice {
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
