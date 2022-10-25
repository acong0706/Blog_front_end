<template>
  <el-card v-for="article in articles" style="margin-bottom: 7px;border-radius: 10px;">
    <h2 style="margin-bottom: 5px;cursor: pointer;">
      <a @click="goBlogPage(article.id)">{{ article.title }}</a>
    </h2>
    <label style="cursor: pointer;font-size: small;color: #0170c9;">
      <a @click="goBlogPage(article.id)" style="margin-right: 5px;">作者: {{ article.author }}</a>/
      <a @click="goBlogPage(article.id)">
        <el-tag v-for="tag in article.tags" style="margin-right: 5px;">{{ tag }}</el-tag>
      </a>/
      <a @click="goBlogPage(article.id)">{{ article.publishDate }}</a>
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
      pageNum: 1,
      changeNum: 1,
      articles: [],
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    goBlogPage(item) {
      // router.push({path:'/blogPage',query:{item: item+(this.changeNum-1)*10}})
      let goPage = router.resolve({
        path: '/blogPage',
        query: {
          item: item,
        }
      })
      window.open(goPage.href, '_blank')
    },
    changePage(number) {
      this.changeNum = number
    },
    async getArticles() {
      this.articles = await this.$store.dispatch('article/getArticles')
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].tags = this.articles[i].tags.split(",")
      }
      // console.log(this.articles)
      this.pageNum = this.articles.length
    }
  },
}
</script>

<style scoped>
/*:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {*/
/*  background-color: #ff9800 !important; !*修改默认的背景色*!*/
/*}*/
</style>