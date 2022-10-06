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


const app = createApp(App);
for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}
app.use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app');
