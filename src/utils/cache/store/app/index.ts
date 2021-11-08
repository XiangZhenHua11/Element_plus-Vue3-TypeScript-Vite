/*
 * @Descripttion:app store统一操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-04 11:55:13
 */
import store from "@/store";
import { sidebar_Inf, language_Inf } from "@store/app/index.d";
/**
 * @Author: xzh
 * @Descripttion:app store统一操作类
 * @Param:
 */
class storeAction_app {
  /**
   * @Author: xzh
   * @Descripttion:菜单栏状态
   * @Param:
   */
  static getSidebar = (): sidebar_Inf => store.getters.sidebar || {};
  /**
   * @Author: xzh
   * @Descripttion:首页菜单
   * @Param:
   */
  static getRouteMenuArr = (): Array<object> =>
    store.getters.routeMenuArr || [];
  /**
   * @Author: xzh
   * @Descripttion:语言
   * @Param:
   */
  static getLanguage = (): language_Inf => store.getters.language || {};
  /**
   * @Author: xzh
   * @Descripttion::切换菜单收起/展开状态
   * @Param:
   * @param {*} void
   */
  static toggleSideBar = (): void => {
    store.dispatch("app/toggleSideBar");
  };
  /**
   * @Author: xzh
   * @Descripttion:切换语言
   * @Param:
   * @param {string} language-语言类型
   */
  static toggleLanguage = (language: string): void => {
    store.dispatch("app/toggleLanguage", language);
  };
}
export default storeAction_app;
