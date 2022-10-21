import Cookies from 'js-cookie'

const TitleKey = 'qm-title'
const ContentKey = 'qm-content'

export function getTitle() {
    return Cookies.get(TitleKey)
}

export function setTitle(title) {
    return Cookies.set(TitleKey, title)
}

export function removeTitle() {
    return Cookies.remove(TitleKey)
}

export function getContent() {
    return Cookies.get(ContentKey)
}

export function setContent(content) {
    return Cookies.set(ContentKey, content)
}

export function removeContent() {
    return Cookies.remove(ContentKey)
}