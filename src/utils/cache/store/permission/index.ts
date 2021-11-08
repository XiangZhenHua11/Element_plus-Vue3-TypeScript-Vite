/*
 * @Descripttion:路由store操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 10:45:21
 */
import store from "@/store";
import Layout from "@/layout/index.vue";
import api_home from "@/api/app/home";
import { routerMenu_Inf, resData_Inf } from "@store/router/permission.d";
/**
 * @Author: xzh
 * @Descripttion:路由store操作类
 * @Param:
 */
class storeAction_router {
  /**
   * @Author: xzh
   * @Descripttion:获取菜单
   * @Param:
   * @param {string} account-账号
   */
  static generateRoutes = async (account: string) => {
    let sidmenuArr = store.getters.sidmenuArr;
    if (sidmenuArr.length == 0) {
      // 获取菜单数据,把数据添加到路由
      sidmenuArr = (await api_home.loadSideMenu()).data;
    }
    // 获取格式化后菜单数据
    var routeMenuArr: Array<routerMenu_Inf> = storeAction_router.generaMenu(
      sidmenuArr
    );
    store.dispatch("permission/setRouteArr", { routeMenuArr, sidmenuArr });
    return routeMenuArr;
  };
  /**
   * @Author: xzh
   * @Descripttion:后台查询的菜单数据拼装成路由格式的数据
   * @Param:
   * @param {any} data
   */
  static generaMenu = (data: any): Array<routerMenu_Inf> => {
    // 按照排序进行排序
    data = data.sort();
    // 查询根节点
    var rootMenu = data.filter(
      (x: resData_Inf) =>
        x.isChild === true && x.parentGuid === null && x.isEnable === true
    );
    var menuArr: Array<routerMenu_Inf> = [];
    rootMenu.forEach((item: resData_Inf) => {
      const menu: routerMenu_Inf = {
        path:
          "/" +
          item.liDataName.replace(
            item.liDataName[0],
            item.liDataName[0].toLowerCase()
          ), //首字母替换换成小写,
        component: Layout,
        // guid: item.guid, // 父节点唯一标识
        name: item.liDataName,
        children: [],
        meta: {
          title: item.liName,
          title_en: item.liName_en,
          id: item.guid,
          icon: item.liIcon,
        },
      };
      //获取子节点
      menu.children = storeAction_router.joinChildMemu(menu, data);
      menuArr.push(menu);
    });
    //重定向默认主页
    let first = menuArr.findIndex((x: routerMenu_Inf) => x.children.length > 0);
    menuArr[first].redirect =
      menuArr[first].path +
      "/" +
      menuArr[first].children.find(
        (x: routerMenu_Inf) => x.children.length == 0
      ).path;

    // 404 page must be placed at the end !!!
    // menuArr.push({ path: "*", redirect: "/404", meta: { hidden: true }});
    return menuArr;
  };
  /**
   * @Author: xzh
   * @Descripttion:获取菜单子节点数据
   * @Param:
   * @param {routerMenu_Inf} menu
   * @param {Array} data
   */
  static joinChildMemu = (menu: routerMenu_Inf, data: Array<any>) => {
    const rootMenu = data.filter(
      (x: resData_Inf) => x.parentGuid === menu.meta.id && x.isEnable === true
    );
    const childMenuArr: Array<routerMenu_Inf> = [];
    rootMenu.forEach((item: resData_Inf) => {
      const chlidMenu: routerMenu_Inf = {
        path:
          (item.isChild ? "/" : "") +
          item.liDataName.replace(
            item.liDataName[0],
            item.liDataName[0].toLowerCase()
          ), //首字母替换换成小写
        component: item.isChild
          ? Layout
          : () => import(`@/views/${item.element_liHref}`),
        // guid: item.guid, // 父节点唯一标识
        name: item.liDataName,
        children: [],
        meta: {
          title: item.liName,
          title_en: item.liName_en,
          id: item.guid,
          icon: item.liIcon,
          affix:
            item.guid == "1E8F313A-BE70-A7AF-6706-135A646B9F52" ? true : false, //固定页签
        },
      };
      chlidMenu.children = storeAction_router.joinChildMemu(chlidMenu, data);
      if (chlidMenu.children.length > 0) {
        //重定向
        chlidMenu.redirect =
          chlidMenu.path +
          "/" +
          chlidMenu.children.find((x) => x.children.length == 0).path;
      }
      childMenuArr.push(chlidMenu);
    });
    return childMenuArr;
  };
}

export default storeAction_router;
