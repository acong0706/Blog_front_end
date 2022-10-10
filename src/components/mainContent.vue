<template>
  <el-card v-for="item in 10">
    <h1 style="margin-bottom: 5px;cursor: pointer;">
      <a @click="goBlogPage(item)">题目{{ item }}</a>
    </h1>
    <label style="cursor: pointer;">
      <a @click="goBlogPage(item)">测试{{ item }}</a>
    </label>
  </el-card>
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
    goBlogPage(item) {
      router.push({path:'/blogPage',query:{item: item}})
    },
  },
}
</script>

<style scoped>
</style>