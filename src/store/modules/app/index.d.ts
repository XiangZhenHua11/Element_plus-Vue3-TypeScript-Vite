/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 11:59:56
 */
/**
 * @Author: xzh
 * @Descripttion:app缓存接口
 * @Param:
 */
export interface app_Inf {
  sidebar: sidebar_Inf; //菜单
  language: language_Inf; //语言
}
/**
 * @Author: xzh
 * @Descripttion:菜单接口
 * @Param:
 */
export interface sidebar_Inf {
  opened: boolean;
}
/**
 * @Author: xzh
 * @Descripttion:语言接口
 * @Param:
 */
export interface language_Inf {
  current: string;
  suffix: string;
}
