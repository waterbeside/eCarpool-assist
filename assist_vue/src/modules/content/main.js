// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vue2-toast/lib/toast.css';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style_content.less';

import Vue from 'vue'
import Toast from 'vue2-toast';
import App from './App'
import router from './router'
import axios from '@/utils/axios';
import config from '@/configs'

Vue.prototype.$http = axios;
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
