import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stroe';
import * as elementUI from 'element-ui';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(elementUI)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
