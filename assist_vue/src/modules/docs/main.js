// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/css/bootstrap/bootstrap.less";

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/utils/axios';


import {ViewBox,ToastPlugin  } from 'vux'

import config from '@/configs'


// 全局注册vux的组件



Vue.component('ViewBox', ViewBox)


Vue.use(ToastPlugin);;


Vue.prototype.$http = axios;


// Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
