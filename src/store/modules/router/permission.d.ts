/*
 * @Descripttion:路由接口
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 10:29:17
 */
export interface state_Inf {
  routeMenuArr: Array<routerMenu_Inf>;
  sidmenuArr: Array<resData_Inf>;
}
/**
 * @Author: xzh
 * @Descripttion:返回数据类型接口
 * @Param:
 */
export interface resData_Inf {
  id: string; //主键
  guid: string; //唯一主键
  parentGuid: string; //父节点主键
  liName: string; //节点名称
  liName_en: string; //节点名称
  liDataName: string; //节点数据名称
  liIcon: string; //节点图标
  isChild: boolean; //是否有子级
  isEnable: boolean; //是否有效
  element_liHref: string; //节点地址
}
/**
 * @Author: xzh
 * @Descripttion: 路由节点接口
 * @Param:
 */
export interface routerMenu_Inf {
  path?: string;
  component?: any;
  guid?: string;
  name?: string;
  children: Array<any>;
  meta?: any;
  redirect?: string;
}
