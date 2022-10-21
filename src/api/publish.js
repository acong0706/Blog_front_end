import request from "@/utils/request"

export function publishApi(publishForm) {
    return request({
        url: 'article/publish',
        method: 'POST',
        params: publishForm
    })
}