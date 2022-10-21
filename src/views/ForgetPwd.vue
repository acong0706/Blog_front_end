<template>
  <div id="forgetPwdDiv" type="flex" justify="space-around" align="middle">
    <el-row>
      <el-col class="hidden-xs-only" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <el-row>
          <el-col :xs="1" :sm="5" :md="7" :lg="8" :xl="8"></el-col>
          <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="8">
            <el-form id="forgetPwdBlock">
              <h1>找&nbsp;回&nbsp;密&nbsp;码</h1>
              <div style="margin-top: 10px;">
                <label v-if="!verify">邮&nbsp;箱&nbsp;确&nbsp;认</label>
                <label v-if="verify">更&nbsp;改&nbsp;密&nbsp;码</label>
              </div>
              <el-form ref="forgetPwdForm" :model="ruleForm" :rules="rules" style="margin-top: 15px;">
                <el-form-item prop="pwd" v-if="verify">
                  <el-input
                      type="password"
                      placeholder="密码"
                      class="forgetPwdInput"
                      v-model="ruleForm.pwd"/>
                </el-form-item>
                <el-form-item prop="pwd2" v-if="verify">
                  <el-input
                      type="password"
                      placeholder="确认密码"
                      class="forgetPwdInput"
                      v-model="ruleForm.pwd2"/>
                </el-form-item>
                <el-form-item prop="email" v-if="!verify">
                  <el-input
                      placeholder="邮箱"
                      class="forgetPwdInput"
                      v-model="ruleForm.email">
                    <template #append>
                      <el-button @click="getCheckCode" :loading="loadingOrNot" :disabled="!show">
                        <span v-show="show">获取验证码</span>
                        <span v-show="!show" class="count">{{count}}s后重新获取</span>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code" v-if="!verify">
                  <el-input
                      placeholder="验证码"
                      class="forgetPwdInput"
                      v-model="ruleForm.code"/>
                </el-form-item>
              </el-form>
              <el-button
                  @click="confirmInfo"
                  type="primary"
                  style="margin-right: 15px;" v-if="!verify">提交
              </el-button>
              <el-button
                  @click="confirmInfo2"
                  type="primary"
                  style="margin-right: 15px;" v-if="verify">确认
              </el-button>
              <el-button
                  @click="ret"
                  style="margin-left: 15px;">返&nbsp;回
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
import axios from "axios";
import router from "@/router";

const TIME_COUNT = 60 // 设置一个全局的倒计时的时间
let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
let codeReg = /^[0-9]{6}$/

export default {
  name: "ForgetPwd",
  data() {
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不可为空'))
      } else {
        callback()
      }
    }
    let validatePwd2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不可为空'))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱不可为空'))
      } else {
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式不正确，请重新输入'))
        }
        callback()
      }
    }
    // 验证码校验
    let validateCheckCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不可为空'))
      } else {
        if (!codeReg.test(value)) {
          callback(new Error('请输入收到的6位随机验证码'))
        }
        callback()
      }
    }
    return {
      ruleForm: {
        pwd: '',
        pwd2: '',
        email: '',
        code: '',
      },
      loadingOrNot: false,
      show: true,
      count: '',
      timer: null,
      verify: false,
      rules: {
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        pwd2: [
          { validator: validatePwd2, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        code: [
          { validator: validateCheckCode, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    confirmInfo() {
      this.$refs.forgetPwdForm.validate(async valid => {
        if (valid) {
          // console.log(this.ruleForm)
          this.verify = await this.$store.dispatch('user/forgetPwd_email', this.ruleForm)
        } else {
          ElMessage({
            message: '信息有误，请仔细检查填写是否正确',
            grouping: true,
          })
        }
      })
    },
    confirmInfo2() {
      this.$refs.forgetPwdForm.validate(async valid => {
        if (valid) {
          await this.$store.dispatch('user/forgetPwd_password', this.ruleForm)
        } else {
          ElMessage({
            message: '信息有误，请仔细检查填写是否正确',
            grouping: true,
          })
        }
      })
    },
    ret() {
      window.history.back()
    },
    getCheckCode() {
      if (this.ruleForm.email !== '' && emailReg.test(this.ruleForm.email)) {
        this.loadingOrNot = true
        axios({
          url: '/api/mail/getCheckCode2',
          method: 'POST',
          params: {
            email: this.ruleForm.email,
          }
        }).then(resp => {
          console.log(resp)
          this.loadingOrNot = false
          ElMessage({
            message: '邮箱发送成功，请查看邮箱填写验证码',
            type: 'success',
          })
          //验证码倒计时
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
          this.loadingOrNot = false
          ElMessage({
            message: '邮箱发送失败，请重新尝试',
            type: 'error',
          })
        })
      } else {
        ElMessage({
          message: '请先输入正确的邮箱',
        })
      }
    },
  }
}
</script>

<style scoped>
#forgetPwdDiv {
  padding-top: 120px;
  background: url("../assets/sea.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

#forgetPwdBlock {
  margin-top: 70px;
  background-color: rgba(221, 230, 239, 0.75);
  text-align: center;
  border: solid 1px rgba(102, 146, 191, 0.68);
  height: 245px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px #333333;
  padding: 25px 35px 20px 35px;
  overflow: auto;
  transition: all 0.3s linear;/*0.3s过渡时间*/
}
#forgetPwdBlock:hover{
  /*边框*/
  border: solid 1px rgba(102, 146, 191, 0.68);
  /*边角弧度*/
  border-radius: 15px;
  box-shadow: 7px 15px 30px #595d5d;
}
.forgetPwdInput {
  /*margin-top: 25px;*/
  height: 40px;
}
</style>