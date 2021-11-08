/*
 * @Descripttion:用户api
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 18:19:48
 */
import request from "@/utils/request";

/**
 * @Author: xzh
 * @Descripttion:用户接口类
 * @Param:
 */
class api_user {
  /**
   * @Author: xzh
   * @Descripttion:获取用户信息
   * @Param:
   * @param {string} token
   */
  static getUserInfo = (token: string) =>
    request({
      url: "/User/GetUserInfo",
      method: "get",
      params: { token },
    });

  /**
   * @Author: xzh
   * @Descripttion:登录
   * @Param:
   * @param {object} data
   */
  static login = (data: object) =>
    request({
      url: "/User/Login",
      method: "post",
      data,
    });

  /**
   * @Author: xzh
   * @Descripttion:退出登录
   * @Param:
   */
  static logout = () =>
    request({
      url: "/User/Logout",
      method: "post",
    });
}

export default api_user;
