<template>
  <div class="MyHome">
    <div class="logobg">
      <p>小白油耗</p>
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="homebtn">
      <van-button
        type="default"
        class="btn"
        block
        round
        to="/login"
        color="skyblue"
      >
        用 户 登 录
      </van-button>
      <van-button
        type="default"
        class="btn"
        block
        round
        to="/register"
        color="#1badfa"
      >
        立 即 注 册
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHome",
};
</script>

<style lang="less" scoped>
.MyHome {
  .logobg {
    margin-top: 40%;
  }
  .homebtn {
    margin-top: 100x;
  }
  .btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
