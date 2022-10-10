<template>
  <h1 style="margin-bottom: 5px;">题目{{ item }}</h1>
  <label>测试{{ item }}</label>
</template>

<script>
export default {
  name: "BlogPage",
  data() {
    return {
      item: -1
    }
  },
  mounted() {
    console.log(this.$route)
    this.item = this.$route.query.item
  },
}
</script>

<style scoped>

</style>