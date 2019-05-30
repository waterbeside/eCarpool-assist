// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../../assets/css/bootstrap/bootstrap.less";
import 'vue-easytable/libs/themes-base/index.css'
import "../../assets/css/style_reports.less";

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import axios from '@/utils/axios';
import cFuns from '@/utils/cFuns';
import qs from 'qs';

import {ViewBox,ToastPlugin,LoadingPlugin } from 'vux'

import config from '../../configs/index'


// 全局注册vux的组件



Vue.component('ViewBox', ViewBox)


Vue.use(ToastPlugin);
Vue.use(LoadingPlugin)

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
  template: '<App/>',
  components: { App }
})
