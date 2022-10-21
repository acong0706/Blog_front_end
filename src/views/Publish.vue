<template>
  <main-except-content>
    <el-card class="publishCard">
      <el-row style="margin-bottom: 10px;" class="hidden-xs-only">
        <el-col :sm="3" :md="3" :lg="2" :xl="2">
          <el-button @click="ret">返回</el-button>
        </el-col>
        <el-col :sm="12" :md="14" :lg="16" :xl="17">
          <el-input placeholder="请输入标题" v-model="title"/>
        </el-col>
        <el-col :sm="9" :md="7" :lg="6" :xl="5" style="text-align: right;">
          <el-button :loading="saveLoading" @click="save" type="warning">保存草稿</el-button>
          <el-button @click="publish" type="primary">发布文章</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;" class="hidden-sm-and-up">
        <el-col :span="8">
          <el-button size="large" @click="ret">返回</el-button>
        </el-col>
        <el-col :span="16" style="text-align: right;">
          <el-button :loading="saveLoading" @click="save" size="large" type="warning">保存草稿</el-button>
          <el-button @click="publish" size="large" type="primary">发布文章</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;" class="hidden-sm-and-up">
        <el-col>
          <el-input placeholder="请输入标题" v-model="title" size="large"/>
        </el-col>
      </el-row>
      <v-md-editor v-model="content" height="650px"/>
    </el-card>
  </main-except-content>
</template>

<script>
import MainExceptContent from "@/components/MainExceptContent";
import 'element-plus/theme-chalk/display.css'
import VMdEditor from "@kangc/v-md-editor"
import {ElMessage, ElMessageBox} from "element-plus";
import store from "@/store"

// 布局明天再改，今天先解决发布信息的获取
// :xs="24" :sm="8" :md="8" :lg="8" :xl="8"

export default {
  name: "Publish",
  components: {
    MainExceptContent,
    VMdEditor,
  },
  data() {
    return {
      title: '',
      content: '',
      saveLoading: false,
    }
  },
  mounted() {
    let title = store.getters['article/title']
    let content = store.getters['article/content']
    if ((title !== undefined || content !== undefined) && (title !== '' || content !== '')) {
      ElMessageBox.confirm(
          '是否选择抛弃草稿',
          '还有草稿尚未提交',
          {
            confirmButtonText: '重新开始',
            cancelButtonText: '继续草稿',
            type: 'warning',
          }
      ).then(() => {
        store.commit('article/removeTitle')
        store.commit('article/removeContent')
        ElMessage({
          type: 'info',
          message: '草稿已删除',
        })
      }).catch(() => {
        this.title = title
        this.content = content
        ElMessage({
          type: 'success',
          message: '草稿加载完成',
        })
      })
    }
  },
  methods: {
    publish() {
      if (this.title === '' || this.content === '') {
        ElMessage({
          message: '标题或内容为空',
          type: 'warning'
        })
      } else {

      }
    },
    save() {
      store.commit('article/setTitle', this.title)
      store.commit('article/setContent', this.content)
      this.saveLoading = true
      let that = this
      setTimeout(()=>{
        that.saveLoading = false
        ElMessageBox.confirm(
            '草稿保存完成，是否返回上一页',
            '',
            {
              confirmButtonText: '返回上一页',
              cancelButtonText: '留在本页',
            }
        ).then(() => {
          window.history.back()
        })
      }, 1000)
    },
    ret() {
      window.history.back()
    },
  },
}
</script>

<style scoped>
.publishCard {
  border-radius: 20px;
  background: rgba(255,255,255,0.45);
  margin-bottom: 5px;
}
</style>