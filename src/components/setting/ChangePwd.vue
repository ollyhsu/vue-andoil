<template>
  <div class="changePwd">
    <!-- NavBar-->
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <div class="seting-box">
      <div class="input-item">
        <van-field
          v-model="uname"
          label="用户名"
          :clearable="true"
          disabled
          :required="true"
        />
        <van-field
          v-model="oldpwd"
          label="旧密码"
          :clearable="true"
          :required="true"
          placeholder="请输入旧密码"
          type="password"
        />
        <van-field
          v-model="newpwd1"
          label="新密码"
          :clearable="true"
          :required="true"
          placeholder="请输入新密码"
          type="password"
        />
        <van-field
          v-model="newpwd2"
          label="确认密码"
          :clearable="true"
          :required="true"
          placeholder="请再次确认新密码"
          type="password"
        />
      </div>
      <van-button
        class="btn"
        color="#1baeae"
        type="primary"
        @click="savePwd"
        round
        block
        >保存修改</van-button
      >
    </div>
  </div>
</template>

<script>
import storage from "@/mydata/storage.js";
export default {
  name: "Setting",
  components: {
    // FooterItem,
  },
  data() {
    return {
      tokenname: "",
      uname: "",
      oldpwd: "",
      newpwd1: "",
      newpwd2: "",
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
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: this.back });
      }
    },
    savePwd() {
      var userdata = storage.get("userinfo-" + this.tokenname);
      //   console.log(userdata.password);
      if (this.oldpwd == "" || this.newpwd1 == "" || this.newpwd2 == "") {
        this.$toast.fail("密码输入不能为空");
      } else if (this.newpwd1 != this.newpwd2) {
        this.$toast.fail("两次密码输入不一致");
      } else if (this.$md5(this.oldpwd) != userdata.password) {
        this.$toast.fail("旧密码错误");
      } else if (this.$md5(this.newpwd1) == userdata.password) {
        this.$toast.fail("新旧密码不能一样");
      } else {
        var newdata = {
          uname: userdata.uname,
          nickName: userdata.uname,
          password: this.$md5(this.newpwd1),
          Bio: userdata.Bio,
        };
        var keyname = "userinfo-" + this.uname;
        storage.set(keyname, newdata);
        this.$toast.success("密码修改成功");
        this.$router.push("/me");
      }
    },
  },
};
</script>

<style scoped>
.btn {
  width: 80%;
  margin: 20px auto;
}
</style>
