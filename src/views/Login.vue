<template>
  <div id="loginDiv" type="flex" justify="space-around" align="middle">
    <el-row>
      <el-col class="hidden-xs-only" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <el-row>
          <el-col :xs="1" :sm="5" :md="7" :lg="8" :xl="8"></el-col>
          <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="8">
            <el-form id="loginBlock">
              <h1>登&nbsp;录&nbsp;页&nbsp;面</h1>
              <el-form ref="loginForm" :model="ruleForm" :rules="rules" style="margin-top: 25px;">
                <el-form-item prop="account">
                  <el-input
                      placeholder="账号"
                      class="loginInput"
                      v-model="ruleForm.account"/>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input
                      type="password"
                      placeholder="密码"
                      class="loginInput"
                      v-model="ruleForm.pwd"/>
                </el-form-item>
              </el-form>
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
          </el-col>
          <el-col :xs="1" :sm="5" :md="7" :lg="8" :xl="8"></el-col>
        </el-row>
      </el-col>
      <el-col class="hidden-xs-only" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
    </el-row>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
//基于断点的隐藏类布局
import 'element-plus/theme-chalk/display.css'

let accountReg = /^[1-9][0-9]{4,10}$/

export default {
  name: "HelloWorld",
  data() {
    let validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不可为空'))
      } else {
        if (!accountReg.test(value)) {
          callback(new Error('账号应为5到11位的正整数'))
        }
        callback()
      }
    }
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不可为空'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        pwd: '',
      },
      rules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        pwd: [
          {validator: validatePwd, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('user/login', this.ruleForm)
          } catch (error) {
            console.log(error)
          }
        } else {
          ElMessage({
            message: '账号或密码不规范，请进行更正',
            grouping: true,
          })
        }
      })
    },
    ret() {
      window.history.back()
    },
  },
}
</script>

<style scoped>
#loginDiv {
  padding-top: 120px;
  background: url("../assets/sea.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

#loginBlock {
  margin-top: 50px;
  background-color: rgba(221, 230, 239, 0.75);
  text-align: center;
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*width: 25%;*/
  /*width: 340px;*/
  height: 265px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px #333333;
  padding: 25px 35px 20px 35px;
  overflow: auto;
  /*延迟过度*/
  transition: all 0.3s linear; /*0.3s过渡时间*/
}

#loginBlock:hover {
  /*边框*/
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*边角弧度*/
  border-radius: 15px;
  box-shadow: 7px 15px 30px #595d5d;
}

.loginInput {
  height: 40px;
}

a {
  text-decoration: none;
  color: #000;
}
</style>