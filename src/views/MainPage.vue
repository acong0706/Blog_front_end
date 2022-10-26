<template>
  <MainExceptContent>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <router-view></router-view>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <Aside></Aside>
      </el-col>
    </el-row>
    <el-backtop :right="70" :bottom="70" :visibility-height="150"/>
  </MainExceptContent>
</template>

<script>
import Aside from "@/components/Aside";
import MainExceptContent from "@/components/MainExceptContent";

export default {
  name: 'MainPage',
  components: { Aside, MainExceptContent },
  mounted() {
    document.addEventListener('visibilitychange',function(e){
      let state = document.visibilityState
      if(state == 'visible'){
        let username = window.localStorage.getItem("username")
        if (username == undefined) {
          location.reload()
        }
      }
    });
  },
}
</script>

<style>
</style>