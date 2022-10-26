import router from "@/router";
import {ElMessage, ElMessageBox} from "element-plus";
import {
    getNum, setNum, removeNum,
    getRefreshToken, setRefreshToken, removeRefreshToken,
    getToken, setToken, removeToken
} from "@/utils/auth";
import {
    forgetPwd_email_Api, forgetPwd_password_Api,
    loginApi, registerApi
} from "@/api/userInfo"
import store from "@/store";

const state = {
    // 数据存储
    token: getToken(),  // token字符串
    refreshToken: getRefreshToken(),
    avatarNum: getNum(),
}

const mutations = {
    // 进行数据更新，改变数据状态
    setTokenFn(state, newToken) {
        state.token = newToken;
        setToken(newToken);
    },
    removeTokenFn() {
        removeToken()
        state.token = getToken()
    },
    setRefreshTokenFn(state, newRefreshToken) {
        state.refreshToken = newRefreshToken;
        setRefreshToken(newRefreshToken);
    },
    removeRefreshTokenFn() {
        removeRefreshToken()
        state.refreshToken = getRefreshToken()
    },
    setAvatarNumFn(state, num) {
        state.avatarNum = num;
        setNum(num)
    },
    removeNumFn() {
        removeNum()
        state.avatarNum = getNum()
    },
}

const actions = {
    // 执行动作，数据请求
    async login(context, ruleForm) {
        window.localStorage.setItem("account", ruleForm.account)
        const {data} = await loginApi(ruleForm)
        console.log(data)
        if (data.result) {
            context.commit('setTokenFn', data.token.token)
            context.commit('setRefreshTokenFn', data.token.refreshToken)
            window.localStorage.setItem('username', data.username)
            let num = Math.round(Math.random()*8)+1
            context.commit('setAvatarNumFn', num)
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            await router.push('/')
        } else {
            ElMessage({
                message: '账号或密码错误',
                type: 'error',
                grouping: true,
            })
        }
    },
    async register(context, ruleForm) {
        const {data} = await registerApi(ruleForm)
        if (data.result) {
            ElMessage({
                message: data.msg,
                type: 'success',
                showClose: true,
                duration: 0
            })
            await router.push('/login')
        } else {
            ElMessage({
                message: data.msg,
                type: 'error',
                grouping: true,
            })
        }
    },
    async forgetPwd_email(context, ruleForm) {
        const {data} = await forgetPwd_email_Api(ruleForm)
        if (data.have) {
            if (data.result) {
                ElMessage({
                    type: 'success',
                    message: data.msg,
                })
                return true
            } else {
                ElMessage({
                    message: data.msg,
                    type: 'error',
                    grouping: true,
                })
                return false
            }
        } else {
            ElMessageBox.confirm(
                data.msg,
                '提示',
                {
                    confirmButtonText: '进行注册',
                    cancelButtonText: '返回主页面',
                    type: 'warning',
                }
            ).then(() => {
                router.push('/register')
            }).catch(() => {
                router.push('/')
            })
        }

    },
    async forgetPwd_password(context, ruleForm) {
        const {data} = await forgetPwd_password_Api(ruleForm)
        if (data.result) {
            // msg: '密码修改成功'
            ElMessage({
                type: 'success',
                message: data.msg + "，返回登录页面",
            })
            await router.push('/login')
        } else {
            ElMessage({
                message: data.msg,
                type: 'error',
                grouping: true,
            })
        }
    },
}

const getters = {
    // 获取到最终的数据结果
    token: state => state.token,
    refreshToken: state => state.refreshToken,
    avatarNum: state => state.avatarNum,
}

// 导出
export default {
    namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
    state,
    mutations,
    actions,
    getters,
}
