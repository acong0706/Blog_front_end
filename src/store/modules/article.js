import {ElMessage} from "element-plus";
import {
    getTitle, getContent, setTitle, setContent, removeTitle, removeContent, getTags, setTags, removeTags
} from "@/utils/pageCookies";
import {
    publishApi,
    get_tags,
    getArticles,
    getArticle,
    addViews,
    editApi,
    getArticlesByArchive, top5_ArchiveApi
} from "@/api/article";
import router from "@/router";

const state = {
    title: getTitle(),
    content: getContent(),
    tags: getTags(),
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
    setTags(state, tags) {
        state.tags = tags;
        setTags(tags)
    },
    removeTags() {
        removeTags()
        state.tags = getTags()
    },
}

const actions = {
    async publish(context, ruleForm) {
        const {data} = await publishApi(ruleForm)
        // console.log(data)
        if (data.result) {
            ElMessage({
                type: 'success',
                message: '发布成功'
            })
            await router.push({
                path: '/blogPage',
                query: {
                    item: data.articleId,
                }
            })
            context.commit('removeTitle')
            context.commit('removeContent')
            context.commit('removeTags')
        } else {
            ElMessage({
                type: 'error',
                message: '发布失败，请重新尝试'
            })
        }
    },
    async getTags(context) {
        const {data} = await get_tags()
        // console.log(data)
        return data.tags
    },
    async getArticles(context) {
        const {data} = await getArticles()
        // console.log(data)
        return data.articles
    },
    async getArticle(context, id) {
        const {data} = await getArticle(id)
        // console.log(data)
        return data.article
    },
    async addViews(context, id) {
        const {data} = await addViews(id)
        // console.log(data)
    },
    async edit(context, ruleForm) {
        const {data} = await editApi(ruleForm)
        // console.log(data)
        if (data.result.result) {
            ElMessage({
                type: 'success',
                message: '修改成功'
            })
            await router.push({
                path: '/blogPage',
                query: {
                    item: data.result.id,
                }
            })
        } else {
            ElMessage({
                type: 'error',
                message: '修改失败，请重新尝试'
            })
        }
    },
    async top5(context) {
        const {data} = await top5_ArchiveApi()
        return data
    },
    async getArticlesByArchive(context, item) {
        const {data} = await getArticlesByArchive(item)
        return data.articles
    }
}

const getters = {
    // 获取到最终的数据结果
    title: state => state.title,
    content: state => state.content,
    tags: state => state.tags,
}

// 导出
export default {
    namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
    state,
    mutations,
    actions,
    getters,
}