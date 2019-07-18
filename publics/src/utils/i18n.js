import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cFuns from '@/utils/cFuns';


Vue.use(VueI18n)

var _language = cFuns.getLanguage();
var lang = cFuns.formatLanguage(_language);
if(localStorage){
  localStorage.setItem('language',_language);
}

const messages = {
  'zh': require('@/assets/lang/zh').default,
  'zh-TW': require('@/assets/lang/zh-TW').default,
  'zh-HK': require('@/assets/lang/zh-TW').default,
  'vi': require('@/assets/lang/vi').default,
  'en': require('@/assets/lang/en').default
}



const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n
