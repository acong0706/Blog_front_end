<template>
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
    <p v-for="item in 5" style="margin-bottom: 5px;cursor: pointer;">
      <a @click="goBlogPage(item)">题目{{ item }}</a>
    </p>
  </el-card>
  <el-card style="margin-bottom: 15px;border-radius: 10px;">
    <template #header>
      <h2>归档</h2>
    </template>
    <p v-for="item in 4" style="margin-bottom: 5px;">2022年{{ item }}月</p>
  </el-card>
  <el-card style="border-radius: 10px;">
    <template #header>
      <h2>备案信息</h2>
    </template>
    <el-link href="https://beian.miit.gov.cn/" type="primary">鲁ICP备2022032144号</el-link>
    <!--<a href="https://beian.miit.gov.cn/">鲁ICP备2022032144号</a>-->
  </el-card>
</template>

<script>
import router from "@/router";

export default {
  name: "Aside",
  methods: {
    goBlogPage(item) {
      let goPage = router.resolve({
        path: '/blogPage',
        query: {item: item}
      })
      window.open(goPage.href, '_blank')
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