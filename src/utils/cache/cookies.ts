/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 17:51:23
 */
import Cookies from "js-cookie";

/**
 * @Author: xzh
 * @Descripttion:用户token
 * @Param:
 */
const tokenKey = "xzh_token";
export const getToken = () => Cookies.get(tokenKey) || "";
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);
