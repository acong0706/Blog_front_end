<template>
  <div style="margin-bottom: 12px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <h2>
          <a href="/">首页</a>
        </h2>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <h2>{{ year_month }}</h2>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card v-for="article in currentArticles" style="margin-bottom: 7px;border-radius: 10px;">
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
                   :page-size="numOfPage"
                   :total="pageNum"
                   @current-change="changePage"/>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Archive",
  data() {
    return {
      item: '',
      year_month: '',
      articles: [],
      currentArticles: [],
      numOfPage: 10,
      pageNum: 1,
      changeNum: 1,
    }
  },
  created() {
    this.item = this.$route.query.item
    this.year_month = this.$route.query.year_month
    this.getArticles(this.item)
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
    async getArticles(item) {
      this.articles = await this.$store.dispatch('article/getArticlesByArchive', item)
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].tags = this.articles[i].tags.split(",")
      }
      this.pageNum = this.articles.length
      for (let i = 0; i < this.numOfPage && i < this.articles.length; i++) {
        this.currentArticles.push(this.articles[i])
      }
    },
    changePage(number) {
      this.changeNum = number
      this.currentArticles = []
      if (this.changeNum === 1) {
        for (let i = 0; i < this.numOfPage && i < this.articles.length; i++) {
          this.currentArticles.push(this.articles[i])
        }
      } else {
        for (let i = (this.changeNum - 1) * this.numOfPage; i < (this.changeNum - 1) * (this.numOfPage + 1)
        && i < this.articles.length; i++) {
          this.currentArticles.push(this.articles[i])
        }
      }
    },
  },
}
</script>

<style scoped>

</style>