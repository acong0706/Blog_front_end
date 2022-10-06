<template>
  <div class="common-layout">
    <el-container>
      <el-header id="headerOfMainPage">
        <el-affix>
          <main-header/>
        </el-affix>
      </el-header>
      <el-main style="background-color: #b2dce3;">
        <main-content/>
        <main-content/>
        <main-content/>
        <main-content/>
        <main-content/>
        <main-content/>
        <main-content/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";
import mainContent from "@/components/mainContent";

export default {
  name: 'HelloWorld',
  components: { mainHeader, mainContent },
}
</script>

<style>
#headerOfMainPage {
  padding: 0;height: auto;
}
</style>