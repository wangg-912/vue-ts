/*
 * @Description: 功能描述
 * @Author: 作者
 * @Github: https: //github.com/xxx
 * @Date: 2019-07-27 17:38:00
 * @LastEditors: 最后编辑人
 * @LastEditTime: 2019-08-30 11:10:23
 */
import Vue from "vue";
import Router, {RouteConfig} from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

export const constantRoutes : RouteConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import ("@/views/Home.vue"),
        name: "home",
        meta: {
          title: "首页",
          icon: "home",
          affix: true
        }
      }
    ]
  }, {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    meta: {
      title: "关于",
      icon: "account_circle"
    },
    children: [
      {
        path: "index",
        component: () => import ("@/views/About.vue"),
        name: "index",
        meta: {
          title: "菜单一",
          icon: "account_circle"
        }
      }, {
        path: "lianxi",
        component: () => import ("@/views/About.vue"),
        name: "lianxi",
        meta: {
          title: "菜单二",
          icon: "account_circle"
        }
      }
    ]
  }, {
    path: "/404",
    component: () => import ("@/views/404/Page404.vue"),
    meta: {
      hidden: true
    }
  }
];

export const asyncRoutes : RouteConfig[] = [];

function ss() {}
const createRouter = () => new Router({
  mode: "history", // Disabled due to Github Pages doesn't support this,
  // enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
});

const router = createRouter();

// Detail see:
// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
