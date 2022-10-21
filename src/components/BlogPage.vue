<template>
  <el-card style="margin-bottom: 7px;border-radius: 10px;">
    <div style="text-align: center">
      <h1 style="margin-bottom: 10px;">题目{{ item }}</h1>
    </div>
    <el-card>
      <el-row style="margin-bottom: 5px;">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <label>
            <el-icon><User /></el-icon>
            {{ item }}
          </label>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <label>
            <el-icon><Clock /></el-icon>
            于&nbsp;{{ item }}&nbsp;发布
          </label>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <label>
            <el-icon><View /></el-icon>
            {{ item }}
          </label>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          标签：
          <el-tag size="large" class="tag">
            Springboot 0
          </el-tag>
          <el-tag type="warning" size="large" class="tag">
            Docker 0
          </el-tag>
        </el-col>
      </el-row>
    </el-card>
    <v-md-editor :model-value="markdown" mode="preview"/>
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
      goPage: -1,
      markdown: '## 项目介绍\n' +
          '\n' +
          '本项目目前主要由Cong独立完成，使用Vue3.0作为前端的框架的个人博客网站。\n' +
          '\n' +
          '网站页面主要参考了CSDN、Redbit等知名网站的结构进行设计。\n' +
          '\n' +
          '## 项目组成\n' +
          '\n' +
          '前端目前使用的组件库是element_plus，后续可能会添加其他组件进行网站的丰富完善。\n' +
          '\n' +
          '## 项目相关操作\n' +
          '\n' +
          '1. 设置（安装一些依赖）\n' +
          '\n' +
          '```\n' +
          'npm install\n' +
          '```\n' +
          '\n' +
          '2. 编译和热部署\n' +
          '\n' +
          '```\n' +
          'npm run serve\n' +
          '```\n' +
          '\n' +
          '3. 打包\n' +
          '\n' +
          '```\n' +
          'npm run build\n' +
          '```\n' +
          '\n' +
          '4. 修复\n' +
          '\n' +
          '```\n' +
          'npm run lint\n' +
          '```\n' +
          '\n' +
          '------',
    }
  },
  methods: {},
  mounted() {
    this.item = this.$route.query.item
    document.title = '题目' + this.item
  },
}
</script>

<style scoped>
.tag {
  margin-right: 10px;
}
</style>