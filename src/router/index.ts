import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
        name: "home",
        meta: {
          title: "首页",
          icon: "el-icon-menu",
          affix: true
        }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/about",
    children: [
      {
        path: "about",
        component: () => import("@/views/About.vue"),
        name: "about",
        meta: {
          title: "关于",
          icon: "el-icon-service",
          affix: true
        }
      }
    ]
  }
];

export const asyncRoutes: RouteConfig[] = [];

const createRouter = () =>
  new Router({
    mode: "history", // Disabled due to Github Pages doesn't support this,
    // enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
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
