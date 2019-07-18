// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import "../../assets/css/bootstrap/bootstrap.less";
import "../../assets/css/style_invitation.less";


import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from '@/utils/axios';
import cFuns from '@/utils/cFuns';
import i18n from '@/utils/i18n'
import { focus } from 'vue-focus';



import {ViewBox,Countdown,CheckIcon,Spinner,Step,StepItem,ToastPlugin,Popup,PopupRadio,Msg,Qrcode ,LoadingPlugin } from 'vux'
import config from '@/configs'


// 全局注册vux的组件


Vue.component('ViewBox', ViewBox)
// Vue.component('Loading', Loading)
Vue.component('Countdown', Countdown)
Vue.component('CheckIcon', CheckIcon)
Vue.component('Popup', Popup)
Vue.component('PopupRadio', PopupRadio)
Vue.component('Msg', Msg)
Vue.component('Qrcode', Qrcode)

Vue.component('Spinner', Spinner)
Vue.component('Step', Step)
Vue.component('StepItem', StepItem)


Vue.directive('focus', focus);

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin)



// Vue.config.productionTip = false


Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
