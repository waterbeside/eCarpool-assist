// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/css/bootstrap/bootstrap.less";
import "../../assets/css/style_common.less";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs';
import { focus } from 'vue-focus';

import tokenAxios from '../../utils/axios';


import {ViewBox,ToastPlugin  } from 'vux'

import config from '../../configs'


// 全局注册vux的组件



Vue.component('ViewBox', ViewBox)


Vue.use(ToastPlugin);;




Vue.prototype.$http = tokenAxios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
