<template>
  <div id="mainHeadStyle">
    <el-row>
      <el-col :span="9" style="padding-left: 10px;text-align: left">
        <h1>Cong的博客</h1>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="搜索博客" style="width: 80%;">
          <template #append>
            <el-button :icon="Search">
              搜索
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9" style="padding-right: 30px">
        <el-row :gutter="15" justify="end">
          <el-col :span="3">
            <a href="/">首页</a>
          </el-col>
          <el-col :span="3" v-if="!loginOrNot">
            <a href="/login">登录</a>
          </el-col>
          <el-col :span="3" v-if="!loginOrNot">
            <a href="/register">注册</a>
          </el-col>
          <el-col :span="3">
            <a href="/about">关于</a>
          </el-col>
          <el-col :span="3">
            <el-button @click="publish" type="primary">发布</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type="ts">
import {Search} from '@element-plus/icons-vue'
import router from "../router";
import {ElMessage} from "element-plus";

export default {
  name: "Header",
  data() {
    return {
      Search,
      loginOrNot: false,
    }
  },
  methods: {
    publish() {
      if(this.loginOrNot) {
        router.push('/publish')
      } else {
        ElMessage({
          message: '请登录账号',
          type: 'warning',
        })
        setTimeout(function (){
          router.push('/login')
        }, 1000)
      }
    },
  },
}
</script>

<style scoped>
#mainHeadStyle {
  /*height: 35px;*/
  padding: 10px 0;
  background-color: #71c4d3;
}

a {
  text-decoration: none;
  color: #000;
}
</style>