// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// this.$store.commit(method, params)

import store from '../'

import config from '@/configs'

export default {
  //更改参数语言
  updateParamLang(state,datas){
    state.paramLang = datas;
  },




}
