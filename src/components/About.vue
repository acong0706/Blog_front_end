<template>
  <el-card style="margin-bottom: 7px;border-radius: 10px;">
    <template #header>
      <h1>关于</h1>
    </template>
    <el-row style="margin-bottom: 10px;">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="text-align: center;">
        <el-avatar :size="180" :src="avatar1"/>
      </el-col>
      <el-col :md="16" :lg="16" :xl="16" class="hidden-sm-and-down" style="text-align: center">
        <span>一位默默无闻的码农</span><br><br>
        <label>QQ:2959747634</label><br><br>
        <label>Email:2959747634@qq.com</label>
      </el-col>
    </el-row>
    <el-row class="hidden-md-and-up">
      <el-col :span="24" style="text-align: center">
        <span>一位默默无闻的码农</span><br><br>
        <label>QQ:2959747634</label><br><br>
        <label>Email:2959747634@qq.com</label>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import avatar1 from '../assets/avatar/avatar1.png'
import 'element-plus/theme-chalk/display.css'

export default {
  name: "About",
  data() {
    return {
      avatar1
    }
  },
}
</script>

<style scoped>
</style>