<template>
  <div class="common-layout">
    <el-container>
      <el-header id="headerOfMainPage">
        <el-affix>
          <main-header style="background-color: rgb(245,250,250);"/>
        </el-affix>
      </el-header>
      <el-main id="mainOfMainPage">
        <el-row style="width: 100%;">
          <el-col :xs="1" :sm="3" :md="3" :lg="3" :xl="3"></el-col>
          <el-col id="contentOfMainPage"
                  :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
            <slot/>
          </el-col>
          <el-col :xs="1" :sm="3" :md="3" :lg="3" :xl="3"></el-col>
        </el-row>
      </el-main>
      <el-footer id="footerOfMainPage">
        Copyright&nbsp;&copy;&nbsp;2022&nbsp;Cong的博客&nbsp;|&nbsp;{{ date }}
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";

export default {
  name: "MainBesidesContent",
  components: { mainHeader, },
  data() {
    return {
      date: this.nowTime(new Date())
    };
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = this.nowTime(new Date()); // 修改数据date
    }, 1000)
  },
  methods: {
    nowTime(date) {
      let yy = date.getFullYear()
      let mm = date.getMonth()+1
      let dd = date.getDate()
      let hh = date.getHours()
      let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()
      let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds()
      let time = yy + '年' + mm + '月' + dd + '日' + hh + '时' + mf + '分' + ss + '秒'
      return time
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>

<style scoped>
.common-layout {
  background: rgb(209, 239, 248);
  height: 100%;
}
#headerOfMainPage {
  padding: 0;
  height: auto;
}
#mainOfMainPage {
  padding: 0;
  display: flex;
  justify-content: center;
}
#contentOfMainPage {
  margin-top: 15px;
  margin-bottom: 10px;
}
#footerOfMainPage {
  background-color: rgb(245,250,250);
  text-align: center;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>