import Vue from "vue";

import * as elementUI from "element-ui";
import "@/styles/element-varibles.scss";
import "@/styles/index.scss";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/stroe/index";
import i18n from "@/lang";
import { AppModule } from "@/stroe/module/app";

import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(elementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
