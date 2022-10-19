import router from "@/router";
import {ElMessage} from "element-plus";
import {
    getNum, setNum, removeNum,
    getRefreshToken, setRefreshToken, removeRefreshToken,
    getToken, setToken, removeToken
} from "@/utils/auth";
import {
    loginApi, registerApi
} from "@/api/login_register"

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
    },
    setRefreshTokenFn(state, newRefreshToken) {
        state.refreshToken = newRefreshToken;
        setRefreshToken(newRefreshToken);
    },
    removeRefreshTokenFn() {
        removeRefreshToken()
    },
    setAvatarNumFn(state, num) {
        state.avatarNum = num;
        setNum(num)
    },
    removeNumFn() {
        removeNum()
    }
}

const actions = {
    // 执行动作，数据请求
    async login(context, ruleForm) {
        const {data} = await loginApi(ruleForm)
        if (data.result) {
            context.commit('setTokenFn', data.token.token)
            context.commit('setRefreshTokenFn', data.token.refreshToken)
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
    }
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
