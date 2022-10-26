<template>
  <div id="mainHeadStyle">
    <el-row class="hidden-sm-and-up" style="margin-bottom: 10px;">
      <el-col>
        <h2><a href="/">Cong的博客</a></h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="8" :md="9" :lg="9" :xl="9"
              style="padding-left: 10px;text-align: left;margin-top: 5px;" class="hidden-xs-only">
        <h1><a href="/">Cong的博客</a></h1>
      </el-col>
      <el-col :xs="19" :sm="8" :md="6" :lg="6" :xl="6" style="margin-top: 5px;">
        <el-input v-model="msg" size="large" placeholder="搜索博客" style="margin-left: 10px;margin-right: 10px;">
          <template #append>
            <el-button :icon="Search" @click="search">
              搜索
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :md="9" :lg="9" :xl="9"
              style="padding-right: 10px;" class="hidden-sm-and-down">
        <el-row :gutter="15" justify="end">
          <el-col :span="4" v-if="loginOrNot">
            <el-dropdown>
              <el-avatar :size="50" fit="fill" :src="avatar" style="box-shadow: 2px 2px 5px #333333;"/>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <a @click="logout">退出</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="headerRight">
            <a href="/">首页</a>
          </el-col>
          <el-col :span="5" v-if="!loginOrNot" class="headerRight">
            <a href="/login">登录/注册</a>
          </el-col>
          <el-col :span="3" v-if="loginOrNot" class="headerRight">
            <a href="/history">足迹</a>
          </el-col>
          <el-col :span="3" v-if="loginOrNot" class="headerRight">
            <el-dropdown>
              <a href="/message" style="margin-top: 4px;font-size: 16px">消息</a>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <a href="/message">
                      评论
                    </a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="/message">
                      赞和收藏
                    </a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="/message">
                      新增粉丝
                    </a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="headerRight">
            <a href="/about">关于</a>
          </el-col>
          <el-col :span="4" style="padding-top: 10px;">
            <el-button @click="publish" type="primary">发布</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="4" :sm="7" :offset="1" style="padding-right: 10px;" class="hidden-md-and-up" align="right">
        <el-dropdown style="margin-top: 5px;" trigger="click">
          <span class="el-dropdown-link" style="margin-right: 10px;">
            <el-button size="large">菜单</el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item style="justify-content: center">
                <a href="/">首页</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="!loginOrNot" style="justify-content: center">
                <a href="/login">登录/注册</a>
              </el-dropdown-item>
              <el-dropdown-item style="justify-content: center">
                <a @click="publish">发布</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="loginOrNot" style="justify-content: center">
                <a href="/history">足迹</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="loginOrNot" style="justify-content: center">
                <a href="/message">评论</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="loginOrNot" style="justify-content: center">
                <a href="/message">赞和收藏</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="loginOrNot" style="justify-content: center">
                <a href="/message">新增粉丝</a>
              </el-dropdown-item>
              <el-dropdown-item style="justify-content: center">
                <a href="/about">关于</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="loginOrNot" style="justify-content: center">
                <a @click="logout">退出</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script type="ts">
import {Search} from '@element-plus/icons-vue'
import router from "../router";
import store from "../store";
import {ElMessage, ElMessageBox} from "element-plus";
import 'element-plus/theme-chalk/display.css'
import avatar1 from "../assets/avatar/avatar1.png"
import avatar2 from "../assets/avatar/avatar2.png"
import avatar3 from "../assets/avatar/avatar3.png"
import avatar4 from "../assets/avatar/avatar4.png"
import avatar5 from "../assets/avatar/avatar5.png"
import avatar6 from "../assets/avatar/avatar6.png"
import avatar7 from "../assets/avatar/avatar7.png"
import avatar8 from "../assets/avatar/avatar8.png"
import avatar9 from "../assets/avatar/avatar9.png"
import avatar10 from "../assets/avatar/avatar10.png"

export default {
  name: "Header",
  data() {
    return {
      Search,
      avatars: [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6,
        avatar7, avatar8, avatar9, avatar10],
      avatar: avatar1,
      loginOrNot: store.getters['user/refreshToken'] !== undefined,
      msg: '',
    }
  },
  created() {
    if (this.$route.query.msg !== undefined) {
      this.msg = this.$route.query.msg
    }
  },
  mounted() {
    if (this.loginOrNot) {
      let num = store.getters['user/avatarNum']
      this.avatar = this.avatars[num]
    }
  },
  methods: {
    search() {
      router.push({
        path: '/',
        query: {
          msg: this.msg,
        }
      })
    },
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
      ElMessageBox.confirm(
          '确认是否退出？',
          '再次确认',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        // 这里需要处理user信息缓存
        store.commit('user/removeRefreshTokenFn')
        store.commit('user/removeTokenFn')
        store.commit('user/removeNumFn')
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("account")
        ElMessage({
          message: '退出成功',
          type: 'success',
        })
        this.loginOrNot = false
        location.reload()
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '退出取消',
        })
      })
    },
  },
}
</script>

<style scoped>
#mainHeadStyle {
  padding: 10px 0;
  text-align: center;
  border-bottom: solid 2px rgba(209, 239, 248, 0.68);
}

.headerRight {
  padding-top: 15px;
}

a {
  text-decoration: none;
  color: #000;
}
</style>