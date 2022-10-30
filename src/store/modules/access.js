import {getThreeAccess, updateAccess} from "@/api/Access";

const expire = 1000 * 60 * 60 * 3;

const state = {}

const mutations = {}

const actions = {
    async getThreeAccess(context, item) {
        const {data} = await getThreeAccess()
        console.log(item)
        if (item === 1) {
            if (Date.now()-window.localStorage.getItem('time') > expire) {
                await updateAccess(data.accessNums[0].id)
                window.localStorage.setItem('time', Date.now())
            }
        }
        return data.accessNums
    },
}

const getters = {}

// 导出
export default {
    namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
    state,
    mutations,
    actions,
    getters,
}