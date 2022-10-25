import {createRouter, createWebHistory} from "vue-router";
import Store from "@/store"
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
import HelloWorld from "@/views/HelloWorld";
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        meta: {
            title: 'Cong的博客',
            requireAuth: false,
        },
        component: MainPage,
        children: [
            {
                path: '/',
                component: mainContent,
                requireAuth: false,
            },
            {
                path: '/message',
                meta: {
                    title: '我的消息',
                    requireAuth: true,
                },
                component: Message,
            },
            {
                path: '/about',
                meta: {
                    title: '关于（联系）',
                    requireAuth: false,
                },
                component: About,
            },
            {
                path: '/history',
                meta: {
                    title: '足迹',
                    requireAuth: true,
                },
                component: History,
            },
            {
                path: '/blogPage',
                component: BlogPage,
                meta: {
                    requireAuth: false,
                }
            },
        ]
    },
    {
        path: '/publish',
        meta: {
            title: '博客发布',
            requireAuth: true,
        },
        component: Publish,
    },
    {
        path: '/login',
        meta: {
            title: '登录',
            requireAuth: false,
        },
        component: Login,
    },
    {
        path: '/register',
        meta: {
            title: '注册',
            requireAuth: false,
        },
        component: Register,
    },
    {
        path: '/forgetPwd',
        meta: {
            title: '忘记密码',
            requireAuth: false,
        },
        component: ForgetPwd,
    },
    {
        path: '/helloWorld',
        meta: {
            title: '测试页',
            requireAuth: false,
        },
        component: HelloWorld,
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
    if (to.meta.requireAuth) {
        if (Store.getters['user/refreshToken'] !== undefined) {
            next()
        } else {
            ElMessage({
                message: '用户尚未登录，请先登录',
                type: 'info',
            })
            next({path: '/login',})
        }
    } else {
        next()
    }
})
export default router;
