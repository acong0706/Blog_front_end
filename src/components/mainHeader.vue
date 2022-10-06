<template>
  <div id="mainHeadStyle">
    <el-row>
      <el-col :span="8" style="padding-left: 10px;text-align: left">
        <h1>Cong的博客</h1>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="搜索博客" :prefix-icon="Search" style="width: 70%"/>
      </el-col>
      <el-col :span="8" style="padding-right: 10px;text-align: right">
        <a href="/login">登录</a>
      </el-col>
    </el-row>
  </div>
</template>

<script type="ts">
import { Search } from '@element-plus/icons-vue'

export default {
  name: "Header",
  data() {
    return {
      Search
    }
  },
}
</script>

<style scoped>
#mainHeadStyle {
  /*height: 35px;*/
  padding: 10px 0;
  background-color: #71c4d3;
}
</style>