// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs';
import { focus } from 'vue-focus';

import {ViewBox,Countdown,CheckIcon,Spinner,Step,StepItem,ButtonTab, ButtonTabItem,ConfirmPlugin,ToastPlugin,Popup,PopupRadio,Loading,InlineLoading,Msg,Qrcode  } from 'vux'


import config from './configs/index'


// 全局注册vux的组件



Vue.component('ViewBox', ViewBox)
Vue.component('Loading', Loading)
Vue.component('Countdown', Countdown)
Vue.component('CheckIcon', CheckIcon)
Vue.component('Popup', Popup)
Vue.component('PopupRadio', PopupRadio)
Vue.component('Msg', Msg)
Vue.component('Qrcode', Qrcode)

Vue.component('Spinner', Spinner)
Vue.component('Step', Step)
Vue.component('StepItem', StepItem)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)

Vue.directive('focus', focus);

Vue.use(ToastPlugin);;
Vue.use(ConfirmPlugin);




// Vue.config.productionTip = false


axios.interceptors.request.use(config => {
   if(config.method  === 'post'){
     config.data = qs.stringify(config.data);
   }
   config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
},error =>{
    return Promise.reject(error)
})
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import "./assets/styles/font-awesome.min.css";
import "./assets/styles/bootstrap/bootstrap.less";
import "./assets/styles/style_assist.less";
