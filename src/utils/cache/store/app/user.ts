/*
 * @Descripttion:用户store统一操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 10:48:13
 */
import store from "@/store";
import { user_Inf } from "@/store/modules/app/user.d";
/**
 * @Author: xzh
 * @Descripttion:用户store统一操作类
 * @Param:
 */
class storeAction_user {
  /**
   * @Author: xzh
   * @Descripttion:当前用户信息
   * @Param:
   */
  static currentUserInfo = (): user_Inf => store.getters.userInfo || {};
  /**
   * @Author: xzh
   * @Descripttion:获取token
   * @Param:
   */
  static getToken = (): string => store.getters.token;
  /**
   * @Author: xzh
   * @Descripttion:获取用户信息
   * @Param:
   */
  static getUserInfo = async () => {
    let userInfo: user_Inf = store.getters.userInfo || {};
    if (!userInfo!.account) {
      userInfo = await store.dispatch("user/getUserInfo");
    }
    return userInfo;
  };
  /**
   * @Author: xzh
   * @Descripttion:退出登录
   * @Param:
   */
  static login = async (userInfo: user_Inf) => {
    await store.dispatch("user/login", userInfo);
  };
  /**
   * @Author: xzh
   * @Descripttion:退出登录
   * @Param:
   */
  static logout = async () => {
    await store.dispatch("user/logout");
  };

  /**
   * @Author: xzh
   * @Descripttion:清除token
   * @Param:
   */
  static resetToken = (): void => {
    store.dispatch("user/resetToken");
  };
}

export default storeAction_user;
