import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/Login"
import MainPage from "@/views/MainPage";
import Register from "@/views/Register";
import ForgetPwd from "@/views/ForgetPwd";
import About from "@/views/About";
import Publish from "@/views/Publish";

const routes = [
    {
        path: '/',
        meta: {
            title: 'Cong的博客'
        },
        component: MainPage,
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: Login,
    },
    {
        path: '/register',
        meta: {
            title: '注册'
        },
        component: Register,
    },
    {
        path: '/forgetPwd',
        meta: {
            title: '忘记密码'
        },
        component: ForgetPwd,
    },
    {
        path: '/about',
        meta: {
            title: '关于我们'
        },
        component: About,
    },
    {
        path: '/publish',
        meta: {
            title: '博客发布'
        },
        component: Publish,
    },
];
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),    //去掉＃
    routes,
});
router.beforeEach((to, from, next) => {
    // 用于设置 浏览器的 title 显示
    if (to.meta.title) { //如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})
export default router;
