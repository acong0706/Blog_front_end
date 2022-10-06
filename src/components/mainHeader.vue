<template>
  <div id="mainHeadStyle">
    <el-row>
      <el-col :span="9" style="padding-left: 10px;text-align: left">
        <h1>
          <a href="/">Cong的博客</a>
        </h1>
      </el-col>
      <el-col :span="6">
        <el-input size="large" placeholder="搜索博客">
          <template #append>
            <el-button :icon="Search">
              搜索
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9" style="padding-right: 30px">
        <el-row :gutter="15" justify="end">
          <el-col :span="3" v-if="loginOrNot">
            <el-dropdown>
              <el-avatar :icon="UserFilled"/>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <a @click="logout">退出</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="4" v-if="!loginOrNot" class="headerRight">
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
          <el-col :span="3">
            <el-button @click="publish" type="primary">发布</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type="ts">
import {Search, UserFilled} from '@element-plus/icons-vue'
import router from "../router";
import {ElMessage} from "element-plus";

export default {
  name: "Header",
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
  },
}
</script>

<style scoped>
#mainHeadStyle {
  /*height: 35px;*/
  padding: 11px 0;
  background-color: #9edce7;
  text-align: center;
}

.headerRight {
  padding-top: 5px;
}

a {
  text-decoration: none;
  color: #000;
}
</style>