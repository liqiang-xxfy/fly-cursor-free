import "./assets/main.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import i18n from "./i18n"; // Import i18n

const app = createApp(App);

app.use(createPinia());
app.use(i18n); // Use i18n
app.use(ElementPlus, {
    locale: zhCn,
});
app.mount("#app");