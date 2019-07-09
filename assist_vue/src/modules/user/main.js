// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/css/bootstrap/bootstrap.less";

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/utils/axios';
import cFuns from '@/utils/cFuns';
import i18n from '@/utils/i18n'

import {ViewBox,Countdown,CheckIcon,Spinner,ToastPlugin,Msg  } from 'vux'



// 全局注册vux的组件

Vue.component('ViewBox', ViewBox)
Vue.component('Countdown', Countdown)
Vue.component('CheckIcon', CheckIcon)
Vue.component('Msg', Msg)
Vue.component('Spinner', Spinner)

Vue.directive('focus', focus);

Vue.use(ToastPlugin);
Vue.prototype.$http = axios;


// Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App }
})
