import request from "@/utils/request"

export function getThreeAccess() {
    return request({
        url: '/access/getThreeAccess',
        method: 'GET'
    })
}

export function updateAccess(id) {
    return request({
        url: '/access/updateAccess',
        method: 'POST',
        params: {
            id: id,
        }
    })
}