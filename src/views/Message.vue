<template>
  <div>
    <van-nav-bar
      title="消息"
      left-text=""
      left-arrow
      @click-left="goBack"
      safe-area-inset-top
    />
    <FooterItem />
  </div>
</template>
<script>
// @ is an alias to /src
import FooterItem from "@/components/FooterItem.vue";
export default {
  name: "Message",
  components: {
    FooterItem,
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: this.back });
      }
    },
  },
};
</script>
<style scoped></style>
