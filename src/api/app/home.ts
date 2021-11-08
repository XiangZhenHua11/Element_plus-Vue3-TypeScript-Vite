/*
 * @Descripttion:首页接口
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 18:17:21
 */
import request from "@/utils/request";
/**
 * @Author: xzh
 * @Descripttion:首页接口类
 * @Param:
 */
class api_home {
  /**
   * @Author: xzh
   * @Descripttion:获取菜单数据源
   * @Param:
   */
  static loadSideMenu = () =>
    request({
      url: "/Home/LoadSideMenu",
      method: "post",
    });
}
export default api_home;
