<template>
  <div class="common-layout">
    <el-container>
      <el-header id="headerOfMainPage">
        <el-affix>
          <main-header style="background-color: rgb(253,253,254);"/>
        </el-affix>
      </el-header>
      <el-main id="mainOfMainPage">
        <div id="contentOfMainPage">
          <el-row>
            <el-col :span="16">
              <router-view></router-view>
            </el-col>
            <el-col :span="7" :offset="1">
              <Aside></Aside>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";
import Aside from "@/components/Aside";

export default {
  name: 'MainPage',
  components: { mainHeader, Aside },
}
</script>

<style>
.common-layout {
  background: url("../assets/sea.jpg") no-repeat center top fixed;
}
#headerOfMainPage {
  padding: 0;
  height: auto;
}
#mainOfMainPage {
  padding: 0;
  /*background-color: #cfe8ec;*/
  display: flex;
  justify-content: center;
  /*opacity: 0.9;*/
  /*height: 500px;*/
}
#contentOfMainPage {
  margin-top: 15px;
  margin-bottom: 10px;
  width: 80%;
  /*background-color: #6dcede;*/
}
</style>