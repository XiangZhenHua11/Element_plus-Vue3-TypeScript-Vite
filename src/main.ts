/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-08 13:40:31
 */
import { createApp } from "vue";

import router from "./router";
//路由守卫
import "@/router/permission";

//全局css
import "@/styles/index.scss";

//引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//引入i18n，国际化语言包
import i18n from "@/international/i18n";

import App from "./App.vue";

createApp(App).use(router).use(i18n).use(ElementPlus).mount("#app");
