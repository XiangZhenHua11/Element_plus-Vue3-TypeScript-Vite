/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-08 16:08:51
 */
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //解析别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@store": path.resolve(__dirname, "src/store/modules"),
      "@storeAction": path.resolve(__dirname, "src/utils/cache/store"),
    },
  },
  server: {
    open: true,
    proxy: {
      // 代理网址
      "/api": {
        target: "http://localhost:64482/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/", "/"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import 'src/styles/variables.scss';`,
      },
    },
  },
});
