<!--
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-06 14:56:39
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
let locale = reactive<any>(zhCn);
</script>
