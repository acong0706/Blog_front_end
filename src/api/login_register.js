import request from "@/utils/request";

export function loginApi(loginForm) {
    return request({
        url: '/user/login',
        method: 'POST',
        params: loginForm
    })
}

export function registerApi(registerForm) {
    return request({
        url: '/user/register',
        method: 'POST',
        params: registerForm
    })
}