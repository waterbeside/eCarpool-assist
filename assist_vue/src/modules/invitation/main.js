// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import "../../assets/css/bootstrap/bootstrap.less";
import "../../assets/css/style_invitation.less";
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from '@/utils/axios';
import cFuns from '@/utils/cFuns';
import qs from 'qs';
import { focus } from 'vue-focus';



import {ViewBox,Countdown,CheckIcon,Spinner,Step,StepItem,ToastPlugin,Popup,PopupRadio,Msg,Qrcode  } from 'vux'

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

Vue.use(VueI18n);
var _language = cFuns.getLanguage();
var lang = cFuns.formatLanguage(_language);
if(localStorage){
  localStorage.setItem('language',_language);
}
const i18n = new VueI18n({
  // locale: _language, // 语言标识
    locale: lang, // 语言标识
    messages: {
       'zh': require('@/assets/lang/zh').default,
       'zh-TW': require('@/assets/lang/zh-TW').default,
       'zh-HK': require('@/assets/lang/zh-TW').default,
       'vi': require('@/assets/lang/vi').default,
       'en': require('@/assets/lang/en').default
   }
})


// Vue.config.productionTip = false

/*
axios.interceptors.request.use(config => {
   if(config.method  === 'post'){
     config.data = qs.stringify(config.data);
   }
   config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
},error =>{
    return Promise.reject(error)
})*/
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
