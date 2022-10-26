<template>
  <main-except-content>
    <el-card class="publishCard">
      <el-row style="margin-bottom: 10px;" class="hidden-xs-only">
        <el-col :sm="5" :md="4" :lg="3" :xl="3">
          <el-button @click="ret">放弃修改</el-button>
        </el-col>
        <el-col :sm="14" :md="16" :lg="18" :xl="18">
          <el-input placeholder="请输入标题" v-model="form.title"/>
        </el-col>
        <el-col :sm="5" :md="4" :lg="3" :xl="3" style="text-align: right;">
          <el-button @click="edit" type="primary">保存修改</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;" class="hidden-sm-and-up">
        <el-col :span="12">
          <el-button size="large" @click="ret">放弃修改</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button @click="edit" size="large" type="primary">保存修改</el-button>
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
import MainExceptContent from "@/components/MainExceptContent";
import 'element-plus/theme-chalk/display.css'
import VMdEditor from "@kangc/v-md-editor"
import {ElMessage} from "element-plus";

export default {
  name: "Edit",
  components: {
    MainExceptContent,
    VMdEditor,
  },
  data() {
    return {
      form: {
        id: '',
        title: '',
        content: '',
        newTags: [],
        oldTags: [],
        removeTags: [],
        beforeTags: [],
        author: '',
        date: '',
      },
      chooseTags: [],
      beforeChangeTags: [],
      tagOfOptions: [],
      optionsForChoose: [],
      item: -1,
    }
  },
  created() {
    this.item = this.$route.query.item
    this.getTags()
    this.getArticle()
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
    async edit() {
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
          for (let i = 0; i < this.beforeChangeTags.length; i++) {
            if (!this.form.oldTags.includes(this.beforeChangeTags[i])) {
              this.form.removeTags.push(this.beforeChangeTags[i])
            }
          }
          for (let i = 0; i < this.form.oldTags.length; i++) {
            if (!this.beforeChangeTags.includes(this.form.oldTags[i])) {
              this.form.beforeTags.push(this.form.oldTags[i])
            }
          }
          this.form.id = this.item
          this.form.date = this.timestampToTime(new Date().getTime())
          this.form.author = window.localStorage.getItem("username")
          this.form.oldTags = this.arrayChange(this.form.oldTags)
          this.form.beforeTags = this.arrayChange(this.form.beforeTags)
          this.form.newTags = this.arrayChange(this.form.newTags)
          this.form.removeTags = this.arrayChange(this.form.removeTags)
          await this.$store.dispatch('article/edit', this.form)
          this.form.oldTags = []
          this.form.newTags = []
        }
      }
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
    async getArticle() {
      this.article = await this.$store.dispatch('article/getArticle', this.item)
      this.form.title = this.article.title
      this.form.content = this.article.content
      let tags = this.article.tags.split(",")
      this.chooseTags = tags
      this.beforeChangeTags = tags
    },
    arrayChange(tmp) {
      if (tmp.length > 0) {
        let tmpString = '0=' + tmp[0]
        for(let i = 1; i < tmp.length; i++) {
          tmpString += '&' + i + '=' + tmp[i]
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