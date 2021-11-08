/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-30 17:31:27
 */
/**
 * @Author: xzh
 * @Descripttion:用户缓存接口
 * @Param:
 */
export interface userStroe_Inf {
  token: string; //token
  userInfo: user_Inf;
}
/**
 * @Author: xzh
 * @Descripttion:用户接口
 * @Param:
 */
export interface user_Inf {
  userName?: string; // 用户名
  headImg?: string; //头像
  account?: string; //账号
  password?: string; //密码
}
