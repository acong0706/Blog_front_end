<template>
  <div style="margin-bottom: 7px;" v-show="msgShow">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>搜索</el-breadcrumb-item>
      <el-breadcrumb-item>[&nbsp;{{msg}}&nbsp;]&nbsp;————&nbsp;搜索到&nbsp;{{pageNum}}&nbsp;条数据</el-breadcrumb-item>
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
import {ElNotification} from "element-plus";

const judge = /^\/\?msg=/

export default {
  name: "mainContent",
  data() {
    return {
      pageNum: 1,
      changeNum: 1,
      articles: [],
      selectArticles: [],
      currentArticles: [],
      numOfPage: 10,
      msg: '',
      msgShow: false,
    }
  },
  created() {
    this.getArticles()
  },
  watch: {
    '$route' (to, from){
      if (to.path === '/' || judge.test(to.path)) {
        if (this.$route.query.msg !== undefined) {
          this.msg = this.$route.query.msg
        }
        this.selectArticles = []
        this.currentArticles = []
        this.selectSomeArticles()
      }
    }
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
      this.currentArticles = []
      if (this.msg === '') {
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
      } else {
        if (this.changeNum === 1) {
          for (let i = 0; i < this.numOfPage && i < this.selectArticles.length; i++) {
            this.currentArticles.push(this.selectArticles[i])
          }
        } else {
          for (let i = (this.changeNum - 1) * this.numOfPage; i < (this.changeNum - 1) * (this.numOfPage + 1)
          && i < this.selectArticles.length; i++) {
            this.currentArticles.push(this.selectArticles[i])
          }
        }
      }
    },
    async getArticles() {
      this.articles = await this.$store.dispatch('article/getArticles')
      console.log(this.articles)
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].tags = this.articles[i].tags.split(",")
      }
      this.pageNum = this.articles.length
      for (let i = 0; i < this.numOfPage && i < this.articles.length; i++) {
        this.currentArticles.push(this.articles[i])
      }
      if (this.$route.query.msg !== undefined) {
        this.msg = this.$route.query.msg
        this.selectArticles = []
        this.currentArticles = []
        this.selectSomeArticles()
      }
    },
    selectSomeArticles() {
      this.msgShow = true
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].title.includes(this.msg))
          this.selectArticles.push(this.articles[i])
      }
      this.pageNum = this.selectArticles.length
      // ElNotification({
      //   title: '搜索结果',
      //   message: '搜索到 ' + this.pageNum + ' 条数据',
      //   type: 'success',
      //   position: 'bottom-right',
      // })
      for (let i = 0; i < this.numOfPage && i < this.selectArticles.length; i++) {
        this.currentArticles.push(this.selectArticles[i])
      }
    },
  },
}
</script>

<style scoped>
/*:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {*/
/*  background-color: #ff9800 !important; !*修改默认的背景色*!*/
/*}*/
</style>