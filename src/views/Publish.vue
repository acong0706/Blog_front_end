<template>
  <main-except-content>
    <el-row>
      <el-col :span="24">
        <el-row style="margin-bottom: 10px;">
          <el-col :span="2">
            <el-button size="large">返回</el-button>
          </el-col>
          <el-col :span="17">
            <el-input placeholder="请输入标题" v-model="title" size="large"/>
          </el-col>
          <el-col :span="5" style="text-align: right;">
            <el-button size="large" type="warning">保存草稿</el-button>
            <el-button size="large" type="primary">发布文章</el-button>
          </el-col>
        </el-row>
        <v-md-editor v-model="content" height="650px"></v-md-editor>
      </el-col>
    </el-row>
  </main-except-content>
</template>

<script>
import MainExceptContent from "@/components/MainExceptContent";

export default {
  name: "Publish",
  components: { MainExceptContent },
  data() {
    return {
      content: '',
      title: '',
    }
  },
}
</script>

<style scoped>
</style>