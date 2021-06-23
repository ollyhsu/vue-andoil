<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// export default {
//   created() {
//     let tokeninfo = this.$local.get("token");
//     if (tokeninfo) {
//       this.$router.push("#");
//     } else {
//       this.$router.push("/");
//     }
//   },
// };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
