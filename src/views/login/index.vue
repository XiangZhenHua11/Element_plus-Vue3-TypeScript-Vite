<!--
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-11-08 15:37:17
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("login.title") }}</h3>
        <!-- 切换语言 -->
        <el-dropdown @command="changeLanguage" class="language-dropdown">
          <span class="el-dropdown-link">
            {{ $t("language." + currentLanguage) }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in languageArr"
                :key="item"
                :disabled="currentLanguage == item"
                :command="item"
                >{{ $t("language." + item) }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-form-item prop="account">
        <edit class="svg-container" />
        <el-input
          v-model="loginForm.account"
          ref="account"
          name="account"
          autocomplete="on"
          :placeholder="$t('login.account')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <edit class="svg-container" />
        <el-input
          v-model="loginForm.password"
          show-password
          autocomplete="on"
          ref="password"
          name="password"
          :placeholder="$t('login.password')"
        ></el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.prevent="loginOn">
        {{ $t("login.loginOn") }}
      </el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { object_Inf } from "@/utils";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ArrowDown, Edit } from "@element-plus/icons";
import storeAction_app from "@storeAction/app";
import storeAction_user from "@storeAction/app/user";

let I18n = useI18n();
let { t } = I18n;
let loading = ref<boolean>(false);
/**
 * @Author: xzh
 * @Descripttion:路由参数
 * @Param:
 */
let routerParam = reactive<object_Inf>({
  router: useRouter(), //路由实例
  redirect: "", //重定向地址
  otherQuery: "", //地址参数
});
let loginForm = reactive<object_Inf>({
  account: "system",
  password: "www",
});
let loginFormRef = ref<HTMLElement | null>(null);
/**
 * @Author: xzh
 * @Descripttion:登录验证规则
 * @Param:
 * @param {*} computed
 */
let loginRules = computed((): any => {
  return reactive({
    account: [
      {
        required: true,
        message: t("common.enter") + t("login.account"),
        trigger: "change",
      },
    ],
    password: [
      {
        required: true,
        message: t("common.enter") + t("login.password"),
        trigger: "change",
      },
      {
        min: 3,
        max: 5,
        message: t("login.passwordRule_length"),
        trigger: "change",
      },
    ],
  });
});
//获取语种数组
let languageArr = reactive<Array<string>>(I18n.availableLocales);
/**
 * @Author: xzh
 * @Descripttion: 获取当前语言
 * @Param:
 * @param {*} computed
 */
let currentLanguage = computed((): string => {
  return I18n.locale.value;
});
/**
 * @Author: xzh
 * @Descripttion: 切换语言
 * @Param:
 */
let changeLanguage = (item: string) => {
  I18n.locale.value = item;
  storeAction_app.toggleLanguage(item);
};
/**
 * @Author: xzh
 * @Descripttion: 获取路由其他参数
 * @Param:
 * @param {*} query
 */
let getOtherQuery = (query: any): any => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as any);
};
/**
 * @Author: xzh
 * @Descripttion:监听路由,记录路径
 * @Param:
 */
watch(
  () => routerParam.router,
  (route) => {
    let query = route.currentRoute.query;
    routerParam.redirect = <string>query.redirect;
    routerParam.otherQuery = getOtherQuery(query);
  },
  {
    immediate: true,
  }
);
/**
 * @Author: xzh
 * @Descripttion:登录
 * @Param:
 */
let loginOn = () => {
  (loginFormRef.value as any).validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true;
        let { router, redirect, otherQuery } = routerParam;
        await storeAction_user.login(loginForm);
        router.push({
          path: redirect || "/",
          query: otherQuery,
        });
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>
<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .language-dropdown {
    color: #eee;
    position: absolute;
    top: 0px;
    font-size: 18px;
    right: 0;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-button {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 35px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
