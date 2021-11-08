/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-02 10:30:57
 */
import { createStore } from "vuex";
import user from "./modules/app/user";
import app from "./modules/app";
import permission from "./modules/router/permission";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  modules: {
    app,
    user,
    permission,
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
