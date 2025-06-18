// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// ① 组件库
import Antd from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// ② 样式：v4 推荐 reset.css；若需老版经典样式可换成 antd.css
import 'ant-design-vue/dist/reset.css'
import 'dayjs/locale/zh-cn'

const app = createApp(App)
app.config.globalProperties.$ANTD_LOCALE = zhCN
app.use(Antd)
app.use(router)
app.mount('#app')
