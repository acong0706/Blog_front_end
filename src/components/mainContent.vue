<template>
  <el-card v-for="item in 10" style="margin-bottom: 7px;border-radius: 10px;">
    <h1 style="margin-bottom: 5px;cursor: pointer;">
      <a @click="goBlogPage(item)">题目{{ item+(changeNum-1)*10 }}</a>
    </h1>
    <label style="cursor: pointer;">
      <a @click="goBlogPage(item)">测试{{ item+(changeNum-1)*10 }}</a>
    </label>
  </el-card>
  <div style="display: flex;justify-content: center;margin-top: 12px;margin-bottom: 5px;">
    <el-pagination background
                   layout="prev, pager, next"
                   :total="pageNum"
                   @current-change="changePage"/>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "mainContent",
  data() {
    return {
      msg: '云聪',
      pageNum: 100,
      changeNum: 1
    }
  },
  methods: {
    goBlogPage(item) {
      // router.push({path:'/blogPage',query:{item: item+(this.changeNum-1)*10}})
      let goPage = router.resolve({
        path: '/blogPage',
        query: {
          item: item+(this.changeNum-1)*10,
        }
      })
      window.open(goPage.href, '_blank')
    },
    changePage(number) {
      this.changeNum = number
    },
  },
}
</script>

<style scoped>
/*:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {*/
/*  background-color: #ff9800 !important; !*修改默认的背景色*!*/
/*}*/
</style>