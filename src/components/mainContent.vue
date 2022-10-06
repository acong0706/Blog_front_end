<template>
  <h1>Hello</h1>
  <h1>World</h1>
  <br>
  <h1>Hello</h1>
  <h1>World</h1>
  <br>
  <!--<el-button type="primary" @click="goLogin">点&nbsp;击&nbsp;登&nbsp;录</el-button>-->
</template>

<script>
import router from "@/router";

export default {
  name: "mainContent",
  data() {
    return {
      msg: '云聪',
    }
  },
  methods: {
    goLogin() {
      router.push('/login')
    },
  },
}
</script>

<style scoped>

</style>