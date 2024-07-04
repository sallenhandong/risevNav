import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/normalize.css";
import "@/assets/css/common.less";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/theme.less";
//小组件
import "@/assets/css/note.less";

import 'animate.css';

const app = createApp(App);

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

app.use(ElementPlus).use(store).use(router).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}