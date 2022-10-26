import request from "@/utils/request"

export function publishApi(publishForm) {
    return request({
        url: '/article/publish',
        method: 'POST',
        params: publishForm,
    })
}

export function get_tags() {
    return request({
        url: '/tags/getAllTags',
        method: 'GET'
    })
}

export function getArticles() {
    return request({
        url: '/article/getArticles',
        method: 'GET'
    })
}

export function getArticle(id) {
    return request({
        url: '/article/getArticle',
        method: 'POST',
        params: {
            id: id,
        },
    })
}

export function addViews(id) {
    return request({
        url: '/article/addViews',
        method: 'POST',
        params: {
            id: id,
        },
    })
}

export function editApi(editForm) {
    return request({
        url: '/article/edit',
        method: 'POST',
        params: editForm,
    })
}