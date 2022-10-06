<template>
  <div id="registerDiv" type="flex" justify="space-around" align="middle">
    <el-form id="registerBlock">
      <h1>注&nbsp;册&nbsp;页&nbsp;面</h1>
      <el-input
          autofocus="true"
          placeholder="用户名"
          class="registerInput"/>
      <el-input
          type="password"
          placeholder="密码"
          class="registerInput"/>
      <el-input
          type="password"
          placeholder="确认密码"
          class="registerInput"/>
      <el-button
          type="primary"
          @click="register"
          style="margin-right: 15px;margin-top: 15px">注&nbsp;册
      </el-button>
      <el-button
          @click="ret"
          style="margin-left: 15px;margin-top: 15px;">返&nbsp;回
      </el-button>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import router from "@/router"

export default {
  name: "Register",
  data() {
    return {
      account: '',
      pwd: '',
    }
  },
  methods: {
    register() {
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
      setTimeout(function (){
        router.push('/login')
      }, 1000)
    },
    ret() {
      window.history.back()
    },
  },
}
</script>

<style scoped>
#registerDiv {
  padding-top: 180px;
  background: url("../assets/sky1.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

#registerBlock {
  background-color: rgba(221, 230, 239, 0.75);
  text-align: center;
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*width: 30%;*/
  width: 340px;
  height: 285px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px #333333;
  padding: 25px 50px 20px 50px;
  overflow: auto;
  transition: all 0.3s linear;/*0.3s过渡时间*/
}
#registerBlock:hover{
  /*边框*/
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*边角弧度*/
  border-radius: 15px;
  box-shadow: 7px 15px 30px #285a63;
}
.registerInput {
  margin-top: 25px;
  height: 40px;
}
</style>