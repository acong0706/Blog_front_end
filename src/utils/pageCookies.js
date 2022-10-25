import Cookies from 'js-cookie'

const TitleKey = 'qm-title'
const ContentKey = 'qm-content'
const TagsKey = 'qm-tags'

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

export function getTags() {
    return Cookies.get(TagsKey)
}

export function setTags(tags) {
    return Cookies.set(TagsKey, tags)
}

export function removeTags() {
    return Cookies.remove(TagsKey)
}