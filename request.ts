/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-08 13:34:34
 */
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import storeAction_user from "@storeAction/app/user";
import { getToken } from "@/utils/cache/cookies";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  (config: any) => {
    config.headers["login-mark"] = "xzh";
    if (!!getToken()) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 200) {
      ElMessage({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm(
          "You have been logged out, try to login again.",
          "Log out",
          {
            confirmButtonText: "Relogin",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          storeAction_user.resetToken();
          location.reload();
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
