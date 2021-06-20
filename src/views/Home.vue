<template>
  <div class="MyHome">
    <div class="logo">
      <p>小白油耗</p>
    </div>
    <div class="button">
      <van-button type="default" block round to="/login">
        用 户 登 录
      </van-button>
      <van-button type="default" block round to="/register">
        立 即 注 册
      </van-button>
      <van-button type="succes" block round to="/youhao">
        免 登 录 体 验
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHome",
};
</script>
