/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-06 15:24:37
 */
import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
// import storeAction_user from "@storeAction/app/user";
// import storeAction_app from "@storeAction/app";
// import storeAction_router from "@storeAction/permission";
import { getToken } from "@/utils/cache/cookies";
import { RouteRecordRaw } from "vue-router";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to: any, _: any, next: any) => {
  // Start progress bar
  NProgress.start();
  // Determine whether the user has logged in
  if (!!getToken()) {
    if (to.path === "/login") {
      // If is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      // let hasGetUserInfo = storeAction_user.currentUserInfo()!.userName;
      // if (!!hasGetUserInfo && !!to.name) {
      //   next();
      // } else {
      //   try {
      //     // 获取用户信息
      //     const { account } = await storeAction_user.getUserInfo();
      //     // 基于角色生成可访问路由图
      //     const accessRoutes = <any>(
      //       await storeAction_router.generateRoutes(account || "")
      //     );
      //     accessRoutes.forEach((item: RouteRecordRaw) => {
      //       // 动态添加可访问路由
      //       router.addRoute(item);
      //     });
      //     // 设置replace:true，这样导航就不会留下历史记录
      //     next({ ...to, replace: true });
      //   } catch (error: any) {
      //     // 删除token并转到登录页面重新登录
      //     await storeAction_user.resetToken();
      //     ElMessage.error(error || "Has Error");
      //     next(`/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }
    }
  } else {
    // Has no token
    if (whiteList.includes(to.path)) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(async (to: any) => {
  // Finish progress bar
  NProgress.done();
  // 获取语言字段
  // const field = "title" + storeAction_app.getLanguage().suffix;
  //获取当前语言 设置 page title
  // document.title = to.meta[field];
});
