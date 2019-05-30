// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/css/bootstrap/bootstrap.less";

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import axios from '@/utils/axios';
import cFuns from '@/utils/cFuns';

import {ViewBox,Countdown,CheckIcon,Spinner,ToastPlugin,Msg  } from 'vux'
import config from '@/configs'





// 全局注册vux的组件

Vue.component('ViewBox', ViewBox)
Vue.component('Countdown', Countdown)
Vue.component('CheckIcon', CheckIcon)
Vue.component('Msg', Msg)
Vue.component('Spinner', Spinner)

Vue.directive('focus', focus);

Vue.use(ToastPlugin);
Vue.prototype.$http = axios;

Vue.use(VueI18n);
var _language = cFuns.getLanguage(1);
var lang = cFuns.formatLanguage(_language);
localStorage.setItem('language',_language);
console.log(lang);
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


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App }
})
