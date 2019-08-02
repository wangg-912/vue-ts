import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";

import { RouteConfig } from "vue-router";
import { asyncRoutes, constantRoutes } from "@/router";
import store from "@/stroe";

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
};

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  routes: RouteConfig[] = [];
  dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = [...constantRoutes, ...routes];
    this.dynamicRoutes = routes;
  }

  @Action
  GenerateRoutes() {
    let accessedRoutes;
    accessedRoutes = asyncRoutes;
    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
