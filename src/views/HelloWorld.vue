<template>
  <main-except-content>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-button>菜单</el-button>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="!loginOrNot">
            <a href="/login">登录/注册</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="publish">发布</a>
          </el-dropdown-item>
          <el-dropdown-item v-if="loginOrNot">
            <a href="/history">足迹</a>
          </el-dropdown-item>
          <el-dropdown-item v-if="loginOrNot">
            <a href="/message">评论</a>
          </el-dropdown-item>
          <el-dropdown-item v-if="loginOrNot">
            <a href="/message">赞和收藏</a>
          </el-dropdown-item>
          <el-dropdown-item v-if="loginOrNot">
            <a href="/message">新增粉丝</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="/about">关于</a>
          </el-dropdown-item>
          <el-dropdown-item v-if="loginOrNot">
            <a @click="logout">退出</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </main-except-content>
</template>

<script>
import MainExceptContent from "@/components/MainExceptContent";
import Aside from "@/components/Aside";
import {Search, UserFilled} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "HelloWorld",
  components: {MainExceptContent, Aside},
  data() {
    return {
      Search,
      UserFilled,
      loginOrNot: false,
    }
  },
  methods: {
    publish() {
      if (this.loginOrNot) {
        router.push('/publish')
      } else {
        ElMessage({
          message: '请登录账号',
          type: 'warning',
        })
        setTimeout(function () {
          router.push('/login')
        }, 1000)
      }
    },
    logout() {
      // 这里需要处理user信息缓存
      ElMessage({
        message: '退出成功',
        type: 'success',
      })
      this.loginOrNot = false
    },
  }
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
  color: #000;
}
</style>