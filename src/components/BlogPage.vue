<template>
  <el-card style="margin-bottom: 7px;border-radius: 10px;">
    <div v-show="show" style="display:flex;justify-content: end;">
      <el-link @click="goEdit" type="primary">编辑</el-link>
    </div>
    <div style="text-align: center">
      <h1 style="margin-bottom: 10px;">{{ title }}</h1>
    </div>
    <el-card>
      <el-row class="hidden-sm-and-down" style="margin-bottom: 5px;">
        <el-col :md="7" :lg="7" :xl="7">
          <label><el-icon><User /></el-icon>{{ author }}</label>
        </el-col>
        <el-col :md="14" :lg="14" :xl="14">
          <label><el-icon><Clock /></el-icon>于&nbsp;{{ date }}&nbsp;发布</label>
        </el-col>
        <el-col :md="3" :lg="3" :xl="3">
          <label><el-icon><View /></el-icon>{{ views }}</label>
        </el-col>
      </el-row>
      <el-row class="hidden-md-and-up" style="margin-bottom: 5px;">
        <el-col :xs="10" :sm="10">
          <label><el-icon><User /></el-icon>{{ author }}</label>
        </el-col>
        <el-col :xs="14" :sm="14">
          <label><el-icon><View /></el-icon>{{ views }}</label>
        </el-col>
      </el-row>
      <el-row class="hidden-md-and-up" style="margin-bottom: 5px;">
        <el-col :xs="24" :sm="24">
          <label><el-icon><Clock /></el-icon>于&nbsp;{{ date }}&nbsp;发布</label>
        </el-col>
      </el-row>
      <el-row class="hidden-md-and-up" style="margin-bottom: 5px;" v-show="dateShow">
        <el-col :xs="24" :sm="24">
          <label><el-icon><Clock /></el-icon>于&nbsp;{{ editDate }}&nbsp;修改</label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          标签：
          <el-tag v-for="tag in tags" class="tag">{{ tag }}</el-tag>
        </el-col>
        <el-col class="hidden-sm-and-down" :md="10" :lg="10" :xl="10" v-show="dateShow">
          <label><el-icon><Clock /></el-icon>于&nbsp;{{ editDate }}&nbsp;修改</label>
        </el-col>
      </el-row>
    </el-card>
    <v-md-editor :model-value="content" mode="preview"/>
  </el-card>
</template>

<script>
import VMdEditor from "@kangc/v-md-editor"
import 'element-plus/theme-chalk/display.css'
import router from "@/router";
// import NProgress from "nprogress";

export default {
  name: "BlogPage",
  components: {
    VMdEditor
  },
  data() {
    return {
      item: -1,
      article: null,
      title: '无',
      content: '无',
      author: '聪',
      date: '2001-07-06 00:00:00',
      editDate: '2001-07-06 00:00:00',
      views: 1,
      tags: [],
      show: false,
      dateShow: true,
    }
  },
  created() {
    this.item = this.$route.query.item
    this.getArticle()
    this.addViews()
  },
  mounted() {
    document.addEventListener('visibilitychange',function(e){
      let state = document.visibilityState
      if(state == 'visible'){
        let username = window.localStorage.getItem("username")
        if (username == undefined) {
          location.reload()
        }
      }
    });
  },
  methods: {
    async getArticle() {
      this.article = await this.$store.dispatch('article/getArticle', this.item)
      // NProgress.done()
      console.log(this.article)
      this.title = this.article.title
      this.content = this.article.content
      this.author = this.article.author
      this.date = this.article.publishDate
      this.editDate = this.article.editDate
      if (this.editDate === this.date) {
        this.dateShow = false
      }
      this.tags = this.article.tags.split(",")
      this.views = this.article.views
      document.title = this.title
      let username = window.localStorage.getItem("username")
      if (username === this.author) {
        this.show = true
      }
    },
    async addViews() {
      await this.$store.dispatch('article/addViews', this.item)
    },
    goEdit() {
      router.push({
        path: '/edit',
        query: {
          item: this.item,
        }
      })
    }
  },
}
</script>

<style scoped>
.tag {
  margin-right: 10px;
}
</style>