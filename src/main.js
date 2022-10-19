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
// md-editor-v3
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

VMdEditor.use(githubTheme);

const app = createApp(App);
for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.use(router)
    .use(store)
    .use(ElementPlus)
    .use(VMdEditor)
    .use(MdEditor)
    .mount('#app');
