import router from "@/router";
import {ElMessage} from "element-plus";
import {
    getTitle,getContent,setTitle,setContent,removeTitle,removeContent
} from "@/utils/pageCookies";
import {publishApi} from "@/api/publish";

const state = {
    title: getTitle(),
    content: getContent(),
}

const mutations = {
    // 进行数据更新，改变数据状态
    setTitle(state, title) {
        state.title = title;
        setTitle(title)
    },
    removeTitle() {
        removeTitle()
        state.title = getTitle()
    },
    setContent(state, content) {
        state.content = content;
        setContent(content)
    },
    removeContent() {
        removeContent()
        state.content = getContent()
    },
}

const actions = {
    async publish(context, ruleForm) {
        const {data} = await publishApi(ruleForm)
        if (data.result) {
            ElMessage({
                type: 'success',
                message: '发布成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '发布失败，请重新尝试'
            })
        }
    }
}

const getters = {
    // 获取到最终的数据结果
    title: state => state.title,
    content: state => state.content,
}

// 导出
export default {
    namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
    state,
    mutations,
    actions,
    getters,
}