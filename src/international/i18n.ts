/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-08 13:53:44
 */
import { createI18n } from "vue-i18n";
import storeAction_app from "@storeAction/app";
//Element语言包
import lang_cn from "element-plus/lib/locale/lang/zh-cn";
import lang_en from "element-plus/lib/locale/lang/en";
//自定义语言包
import locale_en from "./language/en.json";
import locale_cn from "./language/zh-cn.json";

//注册并引入语言文件
const i18n = createI18n({
  locale: storeAction_app.getLanguage().current,
  messages: {
    zh: {
      ...locale_cn,
      ...lang_cn,
    },
    en: {
      ...locale_en,
      ...lang_en,
    },
  },
  silentTranslationWarn: true, // 去除console中黄色报错
});
export default i18n;
