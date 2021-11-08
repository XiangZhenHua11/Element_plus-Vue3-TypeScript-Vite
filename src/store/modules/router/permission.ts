/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 10:45:12
 */
import { state_Inf, resData_Inf, routerMenu_Inf } from "./permission.d";
const state: state_Inf = {
  routeMenuArr: [],
  sidmenuArr: [],
};

const mutations = {
  /**
   * @Author: xzh
   * @Descripttion:设置路由
   * @Param:
   * @param {state} state
   * @param {Array} routeMenuArr
   */
  SET_ROUTEMENU: (state: state_Inf, routeMenuArr: Array<routerMenu_Inf>) => {
    state.routeMenuArr = routeMenuArr;
  },
  /**
   * @Author: xzh
   * @Descripttion:设置菜单
   * @Param:
   * @param {state} state
   * @param {Array} sidmenuArr
   */
  SET_SIDEMENU: (state: state_Inf, sidmenuArr: Array<resData_Inf>) => {
    state.sidmenuArr = sidmenuArr;
  },
};
const actions = {
  /**
   * @Author: xzh
   * @Descripttion:设置路由缓存
   * @Param:
   */
  setRouteArr({ commit }: any, { routeMenuArr, sidmenuArr }: any) {
    commit("SET_ROUTEMENU", routeMenuArr);
    commit("SET_SIDEMENU", sidmenuArr);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
