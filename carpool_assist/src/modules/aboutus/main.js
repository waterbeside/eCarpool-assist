// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/styles/bootstrap/bootstrap.less";

import Vue from 'vue'
import App from './App'
import router from './router'

import {ViewBox,ToastPlugin  } from 'vux'

import config from '../../configs/index'


// 全局注册vux的组件



Vue.component('ViewBox', ViewBox)


Vue.use(ToastPlugin);;




// Vue.config.productionTip = false
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
