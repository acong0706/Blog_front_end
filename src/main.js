import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router';
// 存储
import store from './store';
// Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'
// v-md-editor
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
//nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

// highlightjs
import hljs from 'highlight.js';
// Echarts
import * as echarts from 'echarts';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.config.globalProperties.$echarts = echarts;

app.use(router)
    .use(store)
    .use(ElementPlus)
    .use(VMdEditor)
    .use(NProgress)
    .mount('#app');
