/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 09:20:41
 */
const getters = {
  sidebar: (state: any) => state.app.sidebar,
  language: (state: any) => state.app.language,
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  routeMenuArr: (state: any) => state.permission.routeMenuArr,
  sidmenuArr: (state: any) => state.permission.sidmenuArr,
};
export default getters;
