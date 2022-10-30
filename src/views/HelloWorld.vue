<template>
  <el-row justify="center" style="margin-top: 50px;">
    <el-tag :type="testType" class="test_tag" @click="tagTest" size="large">测&nbsp;试</el-tag>
  </el-row>

</template>

<script>
import {tagTypes} from "@/utils/tagStyle";

export default {
  name: "mainContent",
  data() {
    return {
      testType: tagTypes[Math.floor(Math.random()*5)],
    }
  },
  mounted() {
    document.addEventListener('visibilitychange',function(e){
      // console.log(document.visibilityState);
      let state = document.visibilityState
      if(state === 'hidden'){
        document.title = '离开了';
      }
      if(state === 'visible'){
        document.title = '回来了';
        location.reload()
      }
    });
  },
  methods: {
    tagTest() {
      alert('Hello')
    }
  },
}
</script>

<style scoped>
.test_tag {
  cursor: pointer;
}
</style>