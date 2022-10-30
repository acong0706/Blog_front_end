<template>
  <el-card style="margin-bottom: 15px;border-radius: 10px;">
    <template #header>
      <h2>网站访问量</h2>
    </template>
    <div v-loading="loading">
      <el-row class="hidden-sm-and-up">
        <div id="main1" style="width:275px;height:170px;margin: auto;"></div>
      </el-row>
      <el-row class="hidden-xs-only hidden-md-and-up">
        <div id="main2" style="width:180px;height:170px;margin: auto;"></div>
      </el-row>
      <el-row class="hidden-sm-and-down hidden-lg-and-up">
        <div id="main3" style="width:200px;height:170px;margin: auto;"></div>
      </el-row>
      <el-row class="hidden-md-and-down hidden-xl-only">
        <div id="main4" style="width:240px;height:170px;margin: auto;"></div>
      </el-row>
      <el-row class="hidden-lg-and-down">
        <div id="main5" style="width:200px;height:170px;margin: auto;"></div>
      </el-row>
    </div>
  </el-card>
  <el-card style="margin-bottom: 15px;border-radius: 10px;">
    <template #header>
      <div class="card-header">
        <h2>标签分类</h2>
        <el-link type="primary">更多</el-link>
      </div>
    </template>
    <el-tag size="large" class="tag">
      Springboot 0
    </el-tag>
    <el-tag type="warning" size="large" class="tag">
      Docker 0
    </el-tag>
    <el-tag type="success" size="large" class="tag">
      Vue 0
    </el-tag>
    <el-tag type="info" size="large" class="tag">
      React 0
    </el-tag>
    <el-tag type="warning" size="large" class="tag">
      Elementui 0
    </el-tag>
    <el-tag type="danger" size="large" class="tag">
      Antdv 0
    </el-tag>
    <el-tag type="success" size="large" class="tag">
      Nodejs 0
    </el-tag>
    <el-tag type="info" size="large" class="tag">
      Mysql 0
    </el-tag>
    <el-tag size="large" class="tag">
      Json
    </el-tag>
    <el-tag type="danger" size="large" class="tag">
      Nginx 0
    </el-tag>
  </el-card>
  <el-card style="margin-bottom: 15px;border-radius: 10px;">
    <template #header>
      <h2>热门Top5</h2>
    </template>
    <p v-for="article in articlesOfTop5" style="margin-bottom: 5px;cursor: pointer;">
      <a @click="goBlogPage(article.id)">{{ article.title }}</a>
    </p>
  </el-card>
  <el-card style="margin-bottom: 15px;border-radius: 10px;">
    <template #header>
      <h2>归档</h2>
    </template>
    <p v-for="article in articlesOfArchive" style="margin-bottom: 5px;cursor: pointer;">
      <a @click="getYearMonth(article.yearMonth, article.year_month)">{{ article.year_month }}</a>
    </p>
  </el-card>
  <el-card style="border-radius: 10px;">
    <template #header>
      <h2>备案信息</h2>
    </template>
    <el-link href="https://beian.miit.gov.cn/" type="primary">鲁ICP备2022032144号</el-link>
  </el-card>
</template>

<script>
import router from "@/router";
import * as echarts from "echarts";
import 'element-plus/theme-chalk/display.css'

export default {
  name: "Aside",
  data() {
    return {
      articlesOfTop5: [],
      articlesOfArchive: [],
      yData: [],
      loading: true,
    }
  },
  mounted() {
    this.top5()
    this.accessNum()
  },
  methods: {
    goBlogPage(item) {
      let goPage = router.resolve({
        path: '/blogPage',
        query: {item: item}
      })
      window.open(goPage.href, '_blank')
    },
    async top5() {
      let data = await this.$store.dispatch('article/top5')
      //==================================
      this.articlesOfTop5 = data.articles1
      //==================================
      this.articlesOfArchive = data.articles2
      for (let i = 0; i < this.articlesOfArchive.length; i++) {
        let tmp = this.articlesOfArchive[i].yearMonth
        this.articlesOfArchive[i].year_month = tmp.substring(0, 4) + '年' + tmp.substring(5, 8) + '月'
      }
    },
    async accessNum() {
      await this.$store.dispatch('access/getThreeAccess', 1)
      let accessNums = await this.$store.dispatch('access/getThreeAccess', 2)
      for (let i = 0; i < accessNums.length; i++) {
        this.yData[i] = accessNums[accessNums.length-1-i].num
      }
      this.loading = false
      this.echartsDraw()
    },
    getYearMonth(item, year_month) {
      router.push({
        path: '/archive',
        query: {
          item: item,
          year_month: year_month,
        }
      })
    },
    echartsDraw() {
      let tmp = ['main1', 'main2', 'main3', 'main4', 'main5']
      for (let i = 0; i < tmp.length; i++) {
        this.draw(tmp[i])
      }
    },
    draw(item) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(item));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ['前天', '昨天', '今天'],
        }, yAxis: {
          name: "访问量",
        }, series: [
          {
            type: 'line',
            data: this.yData,
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 15,
              },
            },
          }
        ],
        grid: {
          x: 20,
          y: 30,
          x2: 20,
          y2: 30,
        },
      });
    },
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  margin-right: 15px;
  margin-bottom: 10px;
}
</style>