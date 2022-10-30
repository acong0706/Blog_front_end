<template>
  <main-except-content>
    <el-card class="publishCard">
      <el-row style="margin-bottom: 10px;" class="hidden-xs-only">
        <el-col :sm="3" :md="3" :lg="2" :xl="2">
          <el-button @click="ret">返回</el-button>
        </el-col>
        <el-col :sm="12" :md="14" :lg="16" :xl="17">
          <el-input placeholder="请输入标题" v-model="form.title"/>
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
          <el-input placeholder="请输入标题" v-model="form.title" size="large"/>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="24">
          <el-select
              v-model="chooseTags"
              :multiple="true"
              :filterable="true"
              :allow-create="true"
              :default-first-option="true"
              :reserve-keyword="false"
              placeholder="为你的文章进行分类（可多选）"
              style="width: 100%;">
            <el-option
                v-for="item in tagOfOptions"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </el-col>
      </el-row>
      <v-md-editor v-model="form.content" height="650px" @change="changeSave"/>
    </el-card>
    <el-backtop :right="70" :bottom="70" :visibility-height="150"/>
  </main-except-content>
</template>

<script>
import MainExceptContent from "@/views/MainExceptContent";
import 'element-plus/theme-chalk/display.css'
import VMdEditor from "@kangc/v-md-editor"
import {ElMessage, ElMessageBox} from "element-plus";
import store from "@/store"
import qs from "qs"

export default {
  name: "Publish",
  components: {
    MainExceptContent,
    VMdEditor,
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        newTags: [],
        oldTags: [],
        author: '',
        date: '',
      },
      saveLoading: false,
      chooseTags: [],
      tagOfOptions: [],
      optionsForChoose: [],
      saveOrNot: false,
    }
  },
  created() {
    this.getTags()
  },
  mounted() {
    // let _this = this;
    // window.onbeforeunload = function(e) {
    //   // 那个路由页面需要，就把path的名字修改成那个，比如我当前页面的path是/vue
    //   if (_this.$route.path === "/publish") {
    //     // 兼容IE8和Firefox 4之前的事件对象写法（不加也行，现在少有项目兼容老版本浏览器了）
    //     e = e || window.event;
    //     if (e) {
    //       e.returnValue = " ";
    //     }
    //     // Chrome支持, Safari支持, Firefox 4版本以后支持, Opera 12版本以后支持 , IE 9版本以后支持
    //     return " ";
    //   }
    // };
    let title = store.getters['article/title']
    let content = store.getters['article/content']
    let tags = store.getters['article/tags']
    if (tags !== undefined) {
      tags = tags.split(',')
    }
    if ((title !== undefined || content !== undefined || tags !== undefined)
        && (title !== '' || content !== '' || tags !== '')) {
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
        store.commit('article/removeTags')
        ElMessage({
          type: 'info',
          message: '草稿已删除',
        })
      }).catch(() => {
        this.form.title = title
        this.form.content = content
        this.chooseTags = tags
        ElMessage({
          type: 'success',
          message: '草稿加载完成',
        })
      })
    }
  },
  methods: {
    timestampToTime(timestamp) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    async publish() {
      if (this.title === '' || this.content === '') {
        ElMessage({
          message: '标题或内容为空',
          type: 'warning'
        })
      } else {
        if (this.chooseTags.length === 0) {
          ElMessage({
            message: '请选择文章分类',
            type: 'warning'
          })
        } else {
          for (let i = 0; i < this.chooseTags.length; i++) {
            if (this.optionsForChoose.includes(this.chooseTags[i])) {
              this.form.oldTags.push(this.chooseTags[i])
            } else {
              this.form.newTags.push(this.chooseTags[i])
            }
          }
          this.form.date = this.timestampToTime(new Date().getTime())
          this.form.publishDate = this.form.date
          this.form.editDate = this.form.date
          this.form.author = window.localStorage.getItem("username")
          this.form.oldTags = this.arrayChange(this.form.oldTags)
          this.form.newTags = this.arrayChange(this.form.newTags)
          this.form.removeTags = this.arrayChange([])
          this.form.beforeTags = this.arrayChange([])
          console.log(this.form)
          await this.$store.dispatch('article/publish', this.form)
          this.form.oldTags = []
          this.form.newTags = []
        }
      }
    },
    save() {
      store.commit('article/setTitle', this.form.title)
      store.commit('article/setContent', this.form.content)
      store.commit('article/setTags', this.chooseTags)
      this.saveLoading = true
      let that = this
      this.saveOrNot = true
      setTimeout(() => {
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
    changeSave() {
      if (this.saveOrNot) {
        this.saveOrNot = false
      }
    },
    async getTags() {
      const result = await this.$store.dispatch('article/getTags')
      console.log(result)
      this.tagOfOptions = result
      this.optionsForChoose = result
    },
    arrayChange(tmp) {
      if (tmp.length > 0) {
        let tmpString = '0=' + tmp[0]
        for(let i = 1; i < tmp.length; i++) {
          tmpString += i + '=' + tmp[i]
        }
        return tmpString
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped>
.publishCard {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.45);
  margin-bottom: 5px;
}
</style>