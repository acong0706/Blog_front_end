import axios from 'axios'
import store from '@/store'
import router from "@/router";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: '/api',
    timeout: 15000
})

// 请求拦截器
request.interceptors.request.use(function (request) {
    const token = store.state.user.token
    if (token) {
        request.headers.Authorization = token
    }
    return request
}, function (error) {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
    return response
}, async function (error) {
    console.log(error.response)
    if (error.response.status === 401) {
        console.log(
            'token过期了，一个小时过去了，需要通过refresh_token去刷新token'
        )
        const refreshToken = store.state.user.refreshToken
        // console.log(store.state.user.token)
        // console.log(refreshToken)
        if (refreshToken) {
            try {
                console.log('存在refreshToken，需要进行刷新token操作')
                const {data} = await axios({
                    url: '/api/token/getNewToken',
                    method: 'POST',
                    params: {
                        refreshToken
                    }
                })
                const newToken = data.token.token
                store.commit('user/setTokenFn',newToken)
                store.commit('user/removeRefreshTokenFn', refreshToken)
                // console.log('>>>>>>>>>>.', error.config)
                // sleep 10s
                // for(let t = Date.now();Date.now() - t <= 10000;);
                return request(error.config)
            } catch (error) {
                console.log('使用refreshToken获取新token失败')
                store.commit('user/removeTokenFn')
                await router.push({
                    path: '/login'
                })
            }
        } else {
            ElMessage({
                message: '认证失败，请重新登录',

            })
            store.commit('user/removeTokenFn')
            await router.push({
                path: '/login'
            })
        }
    }
    return Promise.reject(error)
})

export default request;