import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/Login"
import MainPage from "@/views/MainPage";
import Register from "@/views/Register";
import ForgetPwd from "@/views/ForgetPwd";
import About from "@/components/About";
import Publish from "@/views/Publish";
import mainContent from "@/components/mainContent";
import Message from "@/components/Message";
import History from "@/components/History";
import BlogPage from "@/components/BlogPage";

const routes = [
    {
        path: '/',
        meta: {
            title: 'Cong的博客'
        },
        component: MainPage,
        children: [
            {
                path: '/',
                component: mainContent,
            },
            {
                path: '/message',
                meta: {
                    title: '我的消息'
                },
                component: Message,
            },
            {
                path: '/about',
                meta: {
                    title: '关于（联系）'
                },
                component: About,
            },
            {
                path: '/history',
                meta: {
                    title: '足迹'
                },
                component: History,
            },
            {
                path: '/blogPage',
                meta: {
                    title: '某个页面'
                },
                component: BlogPage,
            },
        ]
    },
    {
        path: '/publish',
        meta: {
            title: '博客发布'
        },
        component: Publish,
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
