<template>
  <el-card style="margin-bottom: 7px;border-radius: 10px;">
    <div style="text-align: center">
      <h1 style="margin-bottom: 10px;">{{ title }}</h1>
    </div>
    <el-card>
      <el-row style="margin-bottom: 5px;">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <label><el-icon><User /></el-icon>{{ author }}</label>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <label><el-icon><Clock /></el-icon>于&nbsp;{{ date }}&nbsp;发布</label>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <label><el-icon><View /></el-icon>{{ views }}</label>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          标签：
          <el-tag v-for="tag in tags" class="tag">{{ tag }}</el-tag>
        </el-col>
      </el-row>
    </el-card>
    <v-md-editor :model-value="content" mode="preview"/>
  </el-card>
</template>

<script>
import VMdEditor from "@kangc/v-md-editor"

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
      views: 1,
      tags: [],
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      document.title = '正在加载'
      this.item = this.$route.query.item
      this.article = await this.$store.dispatch('article/getArticle', this.item)
      console.log(this.article)
      this.title = this.article.title
      this.content = this.article.content
      this.author = this.article.author
      this.date = this.article.publishDate
      this.tags = this.article.tags.split(",")
      document.title = this.title
    },
  },
}
</script>

<style scoped>
.tag {
  margin-right: 10px;
}
</style>