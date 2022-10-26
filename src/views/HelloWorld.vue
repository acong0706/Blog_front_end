<template>
  <h1>dwad wa </h1>
</template>

<script>
export default {
  name: "mainContent",
  data() {
    return {
    }
  },
  mounted() {
    document.addEventListener('visibilitychange',function(e){
      console.log(document.visibilityState);
      let state = document.visibilityState
      if(state == 'hidden'){
        document.title = '用户离开了';
      }
      if(state == 'visible'){
        document.title = '回来了';
      }
    });
  },
}
</script>

<style scoped>
/*:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {*/
/*  background-color: #ff9800 !important; !*修改默认的背景色*!*/
/*}*/
</style>