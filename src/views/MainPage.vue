<template>
  <div class="common-layout">
    <el-container>
      <el-header id="headerOfMainPage">
        <el-affix>
          <main-header/>
        </el-affix>
      </el-header>
      <el-main id="mainOfMainPage">
        <div id="contentOfMainPage">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";

export default {
  name: 'HelloWorld',
  components: { mainHeader },
}
</script>

<style>
#headerOfMainPage {
  padding: 0;
  height: auto;
}
#mainOfMainPage {
  padding: 0;
  background-color: #cfe8ec;
  display: flex;
  justify-content: center;
  /*height: 500px;*/
}
#contentOfMainPage {
  margin-top: 15px;
  /*margin-bottom: 10px;*/
  width: 80%;
  background-color: #6dcede;
}
</style>