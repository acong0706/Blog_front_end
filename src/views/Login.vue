<template>
  <div id="loginDiv" type="flex" justify="space-around" align="middle">
    <el-form id="loginBlock">
      <h1>登&nbsp;录&nbsp;页&nbsp;面</h1>
      <el-input
          placeholder="账号"
          class="loginInput"
          v-model="account"/>
      <el-input
          type="password"
          placeholder="密码"
          class="loginInput"
          v-model="pwd"/>
      <div style="text-align: right; margin-top: 10px;">
        <el-row>
          <el-col :span="6">
            <el-checkbox>记住密码</el-checkbox>
          </el-col>
          <el-col :span="18">
            <span>
              <a href="/forgetPwd">找回密码</a> | <a href="/register">注册</a>
            </span>
          </el-col>
        </el-row>
      </div>
      <el-button
          type="primary"
          @click="login"
          style="margin-right: 15px;margin-top: 10px">登&nbsp;录
      </el-button>
      <el-button
          @click="ret"
          style="margin-left: 15px;margin-top: 10px">返&nbsp;回
      </el-button>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import router from "@/router";
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      account: '',
      pwd: '',
    }
  },
  methods: {
    login() {
      if (this.account === '' || this.pwd === '') {
        ElMessage({
          message: '账号或密码为空',
          type: 'warning',
        })
      } else {
        /*接下来就是验证账号和密码的正确性
        * 这里存在一个之前一直忽视的问题
        * 就是 token 的存在性问题
        */
        axios({
          url: '/api/user/login',
          method: 'POST',
          params: {
            account: this.account,
            pwd: this.pwd
          }
        }).then(resp => {
          console.log(resp)
          if(resp.data.result) {
            ElMessage({
              message: '登录成功',
              type: 'success',
            })
            setTimeout(function (){
              router.push('/')
            }, 1000)
          } else {
            ElMessage({
              message: '账号或密码错误',
              type: 'error',
            })
          }
        })
        // ElMessage({
        //   message: '登录成功',
        //   type: 'success',
        // })
        // setTimeout(function (){
        //   router.push('/')
        //   // alert(resp.data.test)
        // }, 1000)
      }
    },
    ret() {
      window.history.back()
    },
  },
}
</script>

<style scoped>
#loginDiv {
  padding-top: 180px;
  background: url("../assets/grass.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
#loginBlock {
  background-color: rgba(221, 230, 239, 0.75);
  text-align: center;
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*width: 30%;*/
  width: 340px;
  height: 260px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px #333333;
  padding: 25px 50px 20px 50px;
  overflow: auto;
  /*延迟过度*/
  transition: all 0.3s linear;/*0.3s过渡时间*/
}
#loginBlock:hover{
  /*边框*/
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*边角弧度*/
  border-radius: 15px;
  box-shadow: 7px 15px 30px #595d5d;
}
.loginInput {
  margin-top: 25px;
  height: 40px;
}
a {
  text-decoration: none;
  color: #000;
}
</style>