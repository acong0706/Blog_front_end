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

export function forgetPwd_email_Api(forgetPwd_email_form) {
    // console.log(forgetPwd_email_form)
    return request({
        url: '/user/forgetPwdByEmail',
        method: 'POST',
        params: forgetPwd_email_form
    })
}

export function forgetPwd_password_Api(forgetPwd_password_form) {
    // console.log(forgetPwd_password_form)
    return request({
        url: '/user/forgetPwdByPassword',
        method: 'POST',
        params: forgetPwd_password_form
    })
}