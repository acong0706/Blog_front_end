import Cookies from 'js-cookie'

const TokenKey = 'qm-token'
const RefreshTokenKey = 'qm-refreshToken'
const NumKey = 'qm-num'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
    return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(refreshToken) {
    return Cookies.set(RefreshTokenKey, refreshToken)
}

export function removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey)
}

export function getNum() {
    return Cookies.get(NumKey)
}

export function setNum(num) {
    return Cookies.set(NumKey, num)
}

export function removeNum() {
    return Cookies.remove(NumKey)
}