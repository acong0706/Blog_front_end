<template>
  <el-select
      v-model="value"
      multiple="true"
      filterable="true"
      allow-create="true"
      default-first-option="true"
      :reserve-keyword="false"
      placeholder="Choose tags for your article"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-button @click="valueShow">测试</el-button>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      value: [],
      options: [
        {
          value: 'HTML',
          label: 'HTML',
        },
        {
          value: 'CSS',
          label: 'CSS',
        },
        {
          value: 'JavaScript',
          label: 'JavaScript',
        },
      ],
    }
  },
  methods: {
    valueShow() {
      console.log(this.value)
    },
  }
}
</script>